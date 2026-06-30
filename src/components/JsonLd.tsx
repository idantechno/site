import {
  SITE_URL,
  BUSINESS_BRAND,
  BUSINESS_OWNER_NAME,
  EMAIL,
  PHONE_TEL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
} from "@/lib/constants";

/**
 * Organization / ProfessionalService structured data (JSON-LD).
 * Helps search engines understand who the business is and where it operates.
 */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: BUSINESS_BRAND,
    legalName: BUSINESS_OWNER_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image.png`,
    description:
      "מערכת AI לניהול עסקים מבוססת מנוי — פתרונות חכמים, אנושיים ומותאמים אישית לעסק שלך.",
    email: EMAIL,
    telephone: PHONE_TEL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "הרקפת 12",
      addressLocality: "מגדל העמק",
      addressCountry: "IL",
    },
    areaServed: "IL",
    inLanguage: "he-IL",
    sameAs: [FACEBOOK_URL, INSTAGRAM_URL],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
