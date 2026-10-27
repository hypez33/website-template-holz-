import { ChapterAnfrage } from "@/components/chapter-anfrage";
import { ChapterArbeitsweise } from "@/components/chapter-arbeitsweise";
import { ChapterFuegung } from "@/components/chapter-fuegung";
import { ChapterMaterial } from "@/components/chapter-material";
import { ChapterRaum } from "@/components/chapter-raum";
import { ChapterZeichnung } from "@/components/chapter-zeichnung";
import { Opening } from "@/components/opening";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="inhalt">
        <Opening />
        <ChapterRaum />
        <ChapterZeichnung />
        <ChapterMaterial />
        <ChapterFuegung />
        <ChapterArbeitsweise />
        <ChapterAnfrage />
      </main>
      <SiteFooter />
    </>
  );
}
