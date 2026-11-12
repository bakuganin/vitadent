import { ArrowUpRight, ShoppingBag } from "lucide-react";

type Language = "et" | "ru" | "fi" | "en";

// UTM tags let the OralBless analytics stream attribute visits to the clinic site.
export function shopUrl(placement: "header" | "menu" | "section" | "footer") {
  return `https://shop.vitadent.ee/?utm_source=vitadent.ee&utm_medium=referral&utm_campaign=clinic_site&utm_content=${placement}`;
}

export const shopNavLabel: Record<Language, string> = { et: "E-pood", ru: "Магазин", fi: "Verkkokauppa", en: "Shop" };

const copy: Record<Language, { eyebrow: string; title: string; titleStrong: string; text: string; categories: string[]; cta: string }> = {
  et: {
    eyebrow: "OralBless by Vitadent",
    title: "Meie",
    titleStrong: "e-pood",
    text: "Hambaarstide valitud suuhooldustooted koju tellimiseks: kõik, mida vajad igapäevaseks hoolduseks pärast vastuvõttu.",
    categories: ["Elektrilised hambaharjad", "Suuduššid", "Hambaniit", "Hambapastad", "Suuveed", "Tarvikud"],
    cta: "Ava e-pood",
  },
  ru: {
    eyebrow: "OralBless by Vitadent",
    title: "Наш",
    titleStrong: "магазин",
    text: "Средства для ухода за полостью рта, которые подбирают наши стоматологи, с доставкой домой: всё для ежедневного ухода после приёма.",
    categories: ["Электрические щётки", "Ирригаторы", "Зубные нити", "Зубные пасты", "Ополаскиватели", "Аксессуары"],
    cta: "Перейти в магазин",
  },
  fi: {
    eyebrow: "OralBless by Vitadent",
    title: "Meidän",
    titleStrong: "verkkokauppa",
    text: "Hammaslääkäriemme valitsemat suunhoitotuotteet kotiin tilattuna: kaikki päivittäiseen hoitoon vastaanoton jälkeen.",
    categories: ["Sähköhammasharjat", "Suihkuttimet", "Hammaslangat", "Hammastahnat", "Suuvedet", "Tarvikkeet"],
    cta: "Avaa verkkokauppa",
  },
  en: {
    eyebrow: "OralBless by Vitadent",
    title: "Our",
    titleStrong: "online shop",
    text: "Oral care products chosen by our dentists, delivered to your home: everything for daily care after your visit.",
    categories: ["Electric toothbrushes", "Water flossers", "Dental floss", "Toothpaste", "Mouthwash", "Accessories"],
    cta: "Visit the shop",
  },
};

export default function ShopPromo({ language }: { language: Language }) {
  const t = copy[language];

  return (
    <div className="shop-promo">
      <div className="shop-promo-copy">
        <span className="section-eyebrow">{t.eyebrow}</span>
        <h3>
          {t.title}
          <strong>{t.titleStrong}</strong>
        </h3>
        <p>{t.text}</p>
      </div>

      <div className="shop-promo-panel">
        <ShoppingBag aria-hidden="true" />
        <ul>
          {t.categories.map((category) => <li key={category}>{category}</li>)}
        </ul>
        <a href={shopUrl("section")} target="_blank" rel="noopener">
          {t.cta}
          <ArrowUpRight aria-hidden="true" />
        </a>
        <span className="shop-promo-domain">shop.vitadent.ee</span>
      </div>
    </div>
  );
}
