import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import "./sections.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "FALZ — Maßmöbel und Innenausbau · Konzeptstudie",
  description:
    "Fiktive Konzeptstudie: eine Tischlerei, die Möbel und Einbauten für genau einen Raum plant und baut — vom Aufmaß bis zur Montage.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "FALZ — Erst die Linie. Dann das Holz.",
    description: "Fiktive Konzeptstudie einer Tischlerei für Maßmöbel und Innenausbau.",
    locale: "de_DE",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ece8e0",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>
        <a href="#inhalt" className="skip-link">
          Zum Inhalt springen
        </a>
        {children}
      </body>
    </html>
  );
}
