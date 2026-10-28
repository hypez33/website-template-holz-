import { expect, test, type Page } from "@playwright/test";

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  return errors;
}

test("Seite lädt ohne Konsolenfehler und ohne horizontalen Überlauf", async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Erst die");
  for (const width of [320, 360, 390, 768, 1280, 1920]) {
    await page.setViewportSize({ width, height: 800 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, `Überlauf bei ${width}px`).toBeLessThanOrEqual(0);
  }
  expect(errors).toEqual([]);
});

test("Konzeptstudie ist gekennzeichnet", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Konzeptstudie · fiktives Unternehmen")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toContainText("FALZ ist ein fiktives Unternehmen");
});

test("Primäre Handlung führt zur Anfrage", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Projekt anfragen" }).click();
  await expect(page).toHaveURL(/#anfrage$/);
  // Regression: Das Sprungziel darf nach der Hydration nicht verrutschen (Montage-Höhe fix)
  await expect(page.getByRole("heading", { name: /Erzählen Sie uns von Ihrem Raum/ })).toBeInViewport();
});

test("Mobilmenü: öffnen, Escape, Fokus zurück, Kapitel anspringen", async ({ page }, info) => {
  test.skip(info.project.name !== "mobil", "Menüknopf nur mobil");
  await page.goto("/");
  const opener = page.getByRole("button", { name: "Menü öffnen" });
  await opener.click();
  const dialog = page.getByRole("dialog", { name: "Menü" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();

  await opener.click();
  await dialog.getByRole("link", { name: /Material/ }).click();
  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/#material$/);
  await expect(page.getByRole("heading", { name: /Holz arbeitet/ })).toBeInViewport();
});

test("Materialwahl per Tippen und Pfeiltasten", async ({ page }) => {
  await page.goto("/#material");
  const tabs = page.getByRole("tablist", { name: "Holzart wählen" });
  await tabs.getByRole("tab", { name: /Nussbaum/ }).click();
  await expect(tabs.getByRole("tab", { name: /Nussbaum/ })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("lebhaft gemasert");
  await page.keyboard.press("ArrowRight");
  await expect(tabs.getByRole("tab", { name: /Esche/ })).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText("zäh und elastisch");
});

test("Anfrage: Fehler am Feld, Fokus auf erstem Fehler", async ({ page }) => {
  await page.goto("/#anfrage");
  await page.getByRole("button", { name: /Anfrage prüfen/ }).click();
  await expect(page.getByText("Bitte wählen Sie mindestens eine Projektart.")).toBeVisible();
  await expect(page.getByText(/gültige E-Mail-Adresse/)).toBeVisible();
  await expect(page.getByRole("checkbox", { name: "Einbauschrank" })).toBeFocused();
  const email = page.getByLabel("E-Mail");
  await expect(email).toHaveAttribute("aria-invalid", "true");
  await expect(email).toHaveAttribute("aria-describedby", "email-error");
  // Korrektur entfernt die Meldung
  await page.getByRole("checkbox", { name: "Küche" }).check();
  await expect(page.getByText("Bitte wählen Sie mindestens eine Projektart.")).toBeHidden();
});

test("Anfrage: Erfolg als Demo, ohne Versand", async ({ page }) => {
  await page.goto("/#anfrage");
  await page.getByRole("checkbox", { name: "Einbauschrank" }).check();
  await page.getByRole("radio", { name: "In 3–6 Monaten" }).check();
  await page.getByLabel("Erzählen Sie vom Raum").fill("Flur mit Dachschräge, wir brauchen Stauraum für Jacken und Schuhe.");
  await page.getByLabel("Ihr Name").fill("Erika Muster");
  await page.getByLabel("E-Mail").fill("erika@example.org");
  await expect(page.getByText("5 von 6 Pflichtangaben")).toBeVisible();
  await page.getByRole("checkbox", { name: /einverstanden/ }).check();
  await expect(page.getByText("Alle Pflichtangaben vollständig")).toBeVisible();
  await page.getByRole("button", { name: /Anfrage prüfen/ }).click();
  await expect(page.getByRole("heading", { name: "Danke, Erika." })).toBeFocused();
  await expect(page.getByText("Demo · nichts wurde versendet")).toBeVisible();
  await page.getByRole("button", { name: "Neue Anfrage beginnen" }).click();
  await expect(page.getByLabel("Ihr Name")).toHaveValue("");
});

test("Skip-Link ist per Tastatur erreichbar", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Zum Inhalt springen" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
});

test("Holz arbeitet: Querschnitte reagieren auf den Scrollfortschritt", async ({ page }) => {
  await page.goto("/");
  const board = page.locator(".wm__board").first();
  await page.locator(".wm").evaluate((el) =>
    window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - innerHeight * 0.9, behavior: "instant" }),
  );
  await expect.poll(() => board.getAttribute("d")).toBeTruthy();
  const wet = await board.getAttribute("d");
  await page.locator(".wm").evaluate((el) =>
    window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - innerHeight * 0.1, behavior: "instant" }),
  );
  await expect.poll(() => board.getAttribute("d")).not.toBe(wet);
});

test("Szenen: Schnitt, Plan und Kamerafahrt folgen dem Scrollen", async ({ page }) => {
  await page.goto("/");
  // Schnitt: Hälften erscheinen nach der Messung, beim Scrollen wächst --c
  await expect(page.locator(".cut[data-cut]")).toBeAttached();
  await page.evaluate(() => window.scrollTo({ top: 400, behavior: "instant" }));
  await expect
    .poll(() => page.locator(".opening__figure").evaluate((el) => Number(el.style.getPropertyValue("--c"))))
    .toBeGreaterThan(0);

  const progressOf = (sel: string) =>
    page.locator(sel).evaluate((el) => Number((el as HTMLElement).style.getPropertyValue("--p")));
  const scrollTo = (sel: string, offset: number) =>
    page.locator(sel).evaluate(
      (el, o) => window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - innerHeight * o, behavior: "instant" }),
      offset,
    );

  await scrollTo(".plan", 0.6);
  await expect.poll(() => progressOf(".plan")).toBeGreaterThan(0);
  await expect.poll(() => progressOf(".plan")).toBeLessThan(1);

  // Kamerafahrt: beim Halt an der Hobelbank herangezoomt, Erläuterung sichtbar
  await page.locator(".pan").evaluate((el) => {
    const r = el.getBoundingClientRect();
    const from = innerHeight * 0.06, to = innerHeight - r.height;
    window.scrollTo({ top: r.top + scrollY - (from - 0.55 * (from - to)), behavior: "instant" });
  });
  await expect.poll(() => progressOf(".pan")).toBeGreaterThan(0.5);
  const cam = await page.locator(".pan__strip").evaluate((el) => new DOMMatrix(getComputedStyle(el).transform));
  expect(cam.a).toBeGreaterThan(1.2);
  expect(cam.m41).toBeLessThan(0);
  await expect(page.locator(".pan__card").nth(1)).toHaveCSS("opacity", "1");
  await expect(page.locator(".pan__card").nth(0)).toHaveCSS("opacity", "0");
});

test.describe("Reduzierte Bewegung", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });
  test("Endzustände sofort, keine Türen, Montage gefügt", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".joint")).toHaveAttribute("data-motion", "off");
    await page.locator("#raum").scrollIntoViewIfNeeded();
    await expect(page.locator(".raum__media")).not.toHaveAttribute("data-armed", /.+/);
    const anim = await page.evaluate(() => getComputedStyle(document.querySelector(".chalk__string path")!).animationName);
    expect(anim).toBe("none");
    // Kein Schnitt, keine Sticky-Bühne: Panorama steht, Stationen als Liste
    await expect(page.locator(".cut[data-cut]")).toHaveCount(0);
    expect(await page.locator(".pan__stage").evaluate((el) => getComputedStyle(el).position)).toBe("relative");
    await expect(page.locator(".pan__card").getByText("Hobelbank")).toBeVisible();
  });
});

test("Rechtliche Platzhalter und 404", async ({ page }) => {
  await page.goto("/impressum");
  await expect(page.getByRole("heading", { level: 1, name: "Impressum" })).toBeVisible();
  const res = await page.goto("/gibt-es-nicht");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Nicht im Plan." })).toBeVisible();
});

test.describe("Ohne JavaScript, Bewegung erlaubt", () => {
  test.use({ javaScriptEnabled: false });
  test("Werkstatt-Stationen stehen als Liste", async ({ page }) => {
    await page.goto("/");
    expect(await page.locator(".pan__stage").evaluate((el) => getComputedStyle(el).position)).toBe("relative");
    for (const name of ["Holzlager", "Hobelbank", "Tageslicht"]) {
      await expect(page.locator(".pan__card").getByText(name)).toBeVisible();
    }
  });
});

test.describe("Ohne JavaScript", () => {
  // Natives `scroll-behavior: smooth` lässt Felder während Playwrights Anscrollen wandern;
  // reduzierte Bewegung schaltet es ab und macht den Ablauf deterministisch.
  test.use({ javaScriptEnabled: false, contextOptions: { reducedMotion: "reduce" } });
  test("Inhalte sichtbar, Anfrage wird serverseitig geprüft", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("img", { name: /Schwalbenbrett aus Nussbaum/ })).toBeVisible();
    await page.getByRole("checkbox", { name: "Regal" }).check();
    await page.getByRole("radio", { name: "Noch unklar" }).check();
    await page.getByLabel("Erzählen Sie vom Raum").fill("Wohnzimmerwand, raumhohes Regal mit Leiter.");
    await page.getByLabel("Ihr Name").fill("Jona Beispiel");
    await page.getByLabel("E-Mail").fill("keine-adresse");
    await page.getByRole("checkbox", { name: /einverstanden/ }).check();
    await page.getByRole("button", { name: /Anfrage prüfen/ }).click();
    await expect(page.getByText(/gültige E-Mail-Adresse/)).toBeVisible();
  });
});
