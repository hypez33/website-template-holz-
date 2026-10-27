import Image, { getImageProps } from "next/image";
import werkstatt from "@/assets/images/werkstatt.webp";
import werkstattMobil from "@/assets/images/werkstatt-mobil.webp";
import kueche from "@/assets/images/kueche.webp";
import { services } from "@/lib/content";
import { ChapterMark } from "./chapter-mark";
import { DoorReveal } from "./door-reveal";
import { ProcessChain } from "./process-chain";
import { ServiceIcon } from "./service-icon";

const workshopAlt =
  "Konzeptbild: ruhige Werkstatt mit gekalkten Wänden, Eichenbretter im Wandregal, eine Hobelbank mit Handhobel, Abendlicht fällt in einem langen Streifen über den Betonboden.";

function WorkshopBand() {
  const common = { alt: workshopAlt, placeholder: "blur" as const };
  const {
    props: { srcSet: wide },
  } = getImageProps({ ...common, src: werkstatt, sizes: "100vw" });
  const {
    props: { srcSet: narrow, ...rest },
  } = getImageProps({ ...common, src: werkstattMobil, sizes: "100vw" });

  return (
    <picture>
      <source media="(min-width: 700px)" srcSet={wide} />
      <source media="(max-width: 699px)" srcSet={narrow} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt steckt in rest */}
      <img {...rest} className="werkstatt__img" />
    </picture>
  );
}

export function ChapterArbeitsweise() {
  return (
    <section id="arbeitsweise" className="chapter arbeitsweise" aria-labelledby="arbeitsweise-title">
      <div className="frame">
        <ChapterMark no="05" title="Arbeitsweise" />
      </div>

      <div className="werkstatt">
        <WorkshopBand />
        <h2 id="arbeitsweise-title" className="display werkstatt__title frame">
          <span>Eine Werkstatt,</span>
          <span>dieselben Hände.</span>
        </h2>
      </div>

      <div className="frame arbeitsweise__grid">
        <p className="arbeitsweise__lead">
          Vom ersten Gespräch bis zur Montage bleiben dieselben Leute an Ihrem Projekt. Fünf
          Schritte, und Sie wissen bei jedem, was als Nächstes kommt.
        </p>
        <ProcessChain />
      </div>

      <div className="frame leistungen">
        <h3 className="label leistungen__label">Was in der Werkstatt entsteht</h3>
        <ul className="leistungen__list">
          {services.map((s, i) => (
            <li key={s.title}>
              <span className="label text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="leistungen__title">{s.title}</span>
              <span className="leistungen__note">{s.note}</span>
              <ServiceIcon kind={s.icon} index={i} />
            </li>
          ))}
        </ul>
        <figure className="leistungen__figure">
        <DoorReveal className="leistungen__media">
          <Image
            src={kueche}
            alt="Konzeptbild: grifflose Küchenzeile mit Nussbaumfronten, schmaler heller Steinplatte und hohem Eichenschrank, seitliches Abendlicht."
            placeholder="blur"
            sizes="(min-width: 900px) 58vw, 100vw"
          />
        </DoorReveal>
        <figcaption className="label leistungen__caption text-muted">
          Küche in Nussbaum und Eiche · Konzeptbild (KI-generiert), keine Kundenarbeit
        </figcaption>
        </figure>
      </div>
    </section>
  );
}
