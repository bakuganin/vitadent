import { ArrowRight, ArrowUpRight } from "lucide-react";

type Language = "et" | "ru" | "fi" | "en";

// UTM tags let the OralBless analytics stream attribute visits to the clinic site.
// The shop uses hash routing, so a product path goes after the query string.
export function shopUrl(placement: string, productSlug?: string) {
  const query = `utm_source=vitadent.ee&utm_medium=referral&utm_campaign=clinic_site&utm_content=${placement}`;
  return `https://shop.vitadent.ee/?${query}${productSlug ? `#/product/${productSlug}` : ""}`;
}

export const shopNavLabel: Record<Language, string> = { et: "E-pood", ru: "Магазин", fi: "Verkkokauppa", en: "Shop" };

const copy: Record<Language, Record<
  | "eyebrow" | "title1" | "titleStrong" | "copy" | "cta" | "viewCta"
  | "dentureTitle" | "dentureSub" | "orthoTitle" | "orthoSub" | "pasteTitle" | "pasteSub",
  string
>> = {
  et: {
    eyebrow: "OralBless e-pood",
    title1: "Suuhooldus",
    titleStrong: "koju",
    copy: "Proteeside ja breketite hooldusvahendid, hambaniidid ja valgendav hambapasta VITADENT OÜ e-poest.",
    cta: "Kogu e-pood",
    viewCta: "Vaata",
    dentureTitle: "Proteeside hooldus",
    dentureSub: "Puhastuskomplekt, harjad ja karbid",
    orthoTitle: "Breketid ja kapid",
    orthoSub: "IsoDent puhastuskomplekt",
    pasteTitle: "Valgendav hambapasta",
    pasteSub: "Opalescence fluoriidiga, 100 ml",
  },
  ru: {
    eyebrow: "Интернет-магазин OralBless",
    title1: "Уход за зубами",
    titleStrong: "дома",
    copy: "Средства ухода за протезами и брекетами, зубные нити и отбеливающая паста в интернет-магазине VITADENT OÜ.",
    cta: "Весь магазин",
    viewCta: "Смотреть",
    dentureTitle: "Уход за протезами",
    dentureSub: "Набор для очистки, щётки и футляры",
    orthoTitle: "Брекеты и капы",
    orthoSub: "Набор для очистки IsoDent",
    pasteTitle: "Отбеливающая паста",
    pasteSub: "Opalescence с фтором, 100 мл",
  },
  fi: {
    eyebrow: "OralBless-verkkokauppa",
    title1: "Suunhoito",
    titleStrong: "kotiin",
    copy: "Proteesien ja oikomiskojeiden hoitotuotteet, hammaslangat ja valkaiseva hammastahna VITADENT OÜ:n verkkokaupasta.",
    cta: "Koko kauppa",
    viewCta: "Katso",
    dentureTitle: "Proteesien hoito",
    dentureSub: "Puhdistussarja, harjat ja rasiat",
    orthoTitle: "Oikomiskojeet",
    orthoSub: "IsoDent-puhdistussarja",
    pasteTitle: "Valkaiseva hammastahna",
    pasteSub: "Opalescence fluorilla, 100 ml",
  },
  en: {
    eyebrow: "OralBless online store",
    title1: "Oral care",
    titleStrong: "at home",
    copy: "Denture and braces care, dental floss and whitening toothpaste from the VITADENT OÜ online store.",
    cta: "All products",
    viewCta: "View",
    dentureTitle: "Denture care",
    dentureSub: "Cleaning kit, brushes and cases",
    orthoTitle: "Braces and aligners",
    orthoSub: "IsoDent cleaning kit",
    pasteTitle: "Whitening toothpaste",
    pasteSub: "Opalescence with fluoride, 100 ml",
  },
};

export default function ShopPromo({ language }: { language: Language }) {
  const t = copy[language];

  return (
    <>
      <div className="shop-copy">
        <span className="section-eyebrow">{t.eyebrow}</span>
        <h3 id="shop-title">
          {t.title1}
          <strong>{t.titleStrong}</strong>
        </h3>
        <div className="shop-copy-side">
          <p>{t.copy}</p>
          <a className="shop-all-link" href={shopUrl("section")} target="_blank" rel="noopener">
            {t.cta}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="shop-banners">
        {([
          ["is-denture", "isodent-denture-cleaning-kit", "/shop/denture-care.webp", t.dentureTitle, t.dentureSub],
          ["is-ortho", "isodent-ortho-cleaning-kit", "/shop/ortho-cleaner.webp", t.orthoTitle, t.orthoSub],
          ["is-paste", "opalescence-whitening-toothpaste-cool-mint", "/shop/opalescence-toothpaste.webp", t.pasteTitle, t.pasteSub],
        ] as const).map(([variant, product, image, title, subtitle]) => (
          <a
            key={variant}
            className={`shop-banner ${variant}`}
            href={shopUrl(`banner_${variant.slice(3)}`, product)}
            target="_blank"
            rel="noopener"
          >
            <img className="shop-banner-product" src={image} alt="" loading="lazy" aria-hidden="true" />
            <span className="shop-banner-text">
              <strong>{title}</strong>
              <span>{subtitle}</span>
            </span>
            <span className="shop-banner-cta">
              {t.viewCta}
              <ArrowRight aria-hidden="true" />
            </span>
          </a>
        ))}
      </div>
    </>
  );
}
