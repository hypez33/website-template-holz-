/*
 * Inhalte der Konzeptstudie. FALZ ist ein fiktives Unternehmen;
 * Kontaktdaten und Rechtstexte fehlen bewusst (siehe TODO(content)).
 */

export const chapters = [
  { id: "raum", no: "01", title: "Raum" },
  { id: "zeichnung", no: "02", title: "Zeichnung" },
  { id: "material", no: "03", title: "Material" },
  { id: "fuegung", no: "04", title: "Fügung" },
  { id: "arbeitsweise", no: "05", title: "Arbeitsweise" },
  { id: "anfrage", no: "06", title: "Anfrage" },
] as const;

export type MaterialId = "eiche" | "nussbaum" | "esche" | "multiplex";

export const materials: ReadonlyArray<{
  id: MaterialId;
  name: string;
  short: string;
  traits: readonly string[];
  /** Fokuspunkt im Musterbild, in Prozent */
  focus: { x: number; y: number };
}> = [
  {
    id: "eiche",
    name: "Eiche",
    short: "Hart, schwer, mit offener Pore. Dunkelt mit den Jahren warm nach.",
    traits: ["Fronten und Korpusse", "Tischplatten", "Treppen und Böden"],
    focus: { x: 19.5, y: 48 },
  },
  {
    id: "nussbaum",
    name: "Nussbaum",
    short: "Dunkel und lebhaft gemasert. Wird unter Licht mit der Zeit etwas heller.",
    traits: ["Küchenfronten", "Einzelmöbel", "Akzentflächen"],
    focus: { x: 40.5, y: 48 },
  },
  {
    id: "esche",
    name: "Esche",
    short: "Hell, zäh und elastisch. Deutliche Jahresringe, ruhige Farbe.",
    traits: ["Helle Räume", "Sitzmöbel", "Regale"],
    focus: { x: 61.5, y: 48 },
  },
  {
    id: "multiplex",
    name: "Birke-Multiplex",
    short: "Kreuzweise verleimte Schichten, sehr formstabil. Die Kante wird zum Muster.",
    traits: ["Einbauten mit sichtbarer Kante", "Werkstattmöbel", "Kinderzimmer"],
    focus: { x: 80, y: 48 },
  },
];

export const steps = [
  {
    no: "01",
    title: "Gespräch",
    body: "Am Telefon oder in der Werkstatt. Sie erzählen, wie der Raum genutzt wird und was ihn heute stört — Maße braucht es dafür noch nicht.",
  },
  {
    no: "02",
    title: "Aufmaß vor Ort",
    body: "Wir messen den Raum selbst: Wandfluchten, Schiefstände, Leitungen, Fensterlaibungen und wo das Licht hinfällt.",
  },
  {
    no: "03",
    title: "Entwurf und Muster",
    body: "Grundriss, Ansicht und Schnitt von Hand und im CAD, dazu Materialmuster zum Anfassen. Daraus entsteht ein verbindliches Angebot.",
  },
  {
    no: "04",
    title: "Werkplanung und Fertigung",
    body: "Jedes Teil wird in der eigenen Werkstatt gefertigt. Größere Einbauten bauen wir dort einmal komplett auf, bevor sie das Haus verlassen.",
  },
  {
    no: "05",
    title: "Montage",
    body: "Eingebaut wird von den Leuten, die gebaut haben. Zur Übergabe gibt es Pflegehinweise für die gewählte Oberfläche.",
  },
] as const;

export const services = [
  { title: "Einbauschränke und Nischen", note: "Dachschrägen, Flure, Raum unter der Treppe", icon: "schrank" },
  { title: "Küchen", note: "Fronten, Korpusse und Arbeitsplatten nach Maß", icon: "kueche" },
  { title: "Regale und Bibliotheken", note: "raumhoch, mit Leiter oder Sitzbank", icon: "regal" },
  { title: "Wand- und Deckenverkleidungen", note: "Paneele, Akustikflächen, Fensterbänke", icon: "verkleidung" },
  { title: "Einzelmöbel", note: "Tische, Sideboards, Betten", icon: "moebel" },
  { title: "Innentüren", note: "flächenbündig, passend zur Wandverkleidung", icon: "tuer" },
] as const;

export const projectTypes = [
  "Einbauschrank",
  "Küche",
  "Regal",
  "Verkleidung",
  "Einzelmöbel",
  "Noch offen",
] as const;

export const timeframes = [
  "So bald wie möglich",
  "In 3–6 Monaten",
  "In 6–12 Monaten",
  "Noch unklar",
] as const;

export const imageCredits = [
  {
    subject: "Hirnholz mit Hobelspan",
    origin: "KI-generiert (GPT Image 2.5 über Higgsfield), 27.10.2026",
  },
  { subject: "Einbauwand mit Fenstersitz", origin: "KI-generiert (GPT Image 2.5 über Higgsfield), 27.10.2026" },
  { subject: "Entwurfszeichnung mit Zollstock", origin: "KI-generiert (GPT Image 2.5 über Higgsfield), 27.10.2026" },
  { subject: "Holzmuster auf Kalkputz", origin: "KI-generiert (GPT Image 2.5 über Higgsfield), 27.10.2026" },
  { subject: "Schwalbenschwanzzinken", origin: "KI-generiert (GPT Image 2.5 über Higgsfield), 27.10.2026" },
  { subject: "Hände mit Handhobel", origin: "KI-generiert (GPT Image 2.5 über Higgsfield), 27.10.2026" },
  { subject: "Werkstatt mit Hobelbank", origin: "KI-generiert (GPT Image 2.5 über Higgsfield), 27.10.2026" },
  { subject: "Küche mit Nussbaumfronten", origin: "KI-generiert (GPT Image 2.5 über Higgsfield), 27.10.2026" },
  {
    subject: "„Carpenter’s square, ink-line (chalk line), marker“, Zeichnung, Japan 1878",
    origin: "Library of Congress, Japanese Fine Prints, LCCN 2009630306 — gemeinfrei, via Wikimedia Commons",
    href: "https://www.loc.gov/pictures/item/2009630306/",
  },
] as const;
