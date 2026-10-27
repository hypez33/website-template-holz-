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
  await page.getByRole("checkbox", { name: /einverstanden/ }).check();
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

test.describe("Reduzierte Bewegung", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });
  test("Endzustände sofort, keine Türen, Montage gefügt", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".joint")).toHaveAttribute("data-motion", "off");
    await page.locator("#raum").scrollIntoViewIfNeeded();
    await expect(page.locator(".raum__media")).not.toHaveAttribute("data-armed", /.+/);
    const anim = await page.evaluate(() => getComputedStyle(document.querySelector(".chalk__string path")!).animationName);
    expect(anim).toBe("none");
  });
});

test("Rechtliche Platzhalter und 404", async ({ page }) => {
  await page.goto("/impressum");
  await expect(page.getByRole("heading", { level: 1, name: "Impressum" })).toBeVisible();
  const res = await page.goto("/gibt-es-nicht");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Nicht im Plan." })).toBeVisible();
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
