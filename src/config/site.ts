export const WHATSAPP_NUMBER = +2349028530184;

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/mikasounds/",
  twitter: "https://twitter.com/mikasounds",
  instagram: "https://instagram.com/mikasounds",
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
} as const;

export const SITE_CONFIG = {
  whatsappNumber: WHATSAPP_NUMBER,
  socialLinks: SOCIAL_LINKS,
} as const;
