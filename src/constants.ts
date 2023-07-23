export type Page = {
  path: string;
  title: string;
}

export const pages = Object.freeze({
  home: {
    path: '/',
    title: 'Domů',
    navbar: true,
  },
  about: {
    path: '/o-nas',
    title: 'O nás',
    navbar: true,
  },
  contact: {
    path: '/kontakt',
    title: 'Kontakt',
    navbar: true,
  },
  partners: {
    path: '/partneri',
    title: 'Partneři',
    navbar: true,
  },
  whatWeDo: {
    path: '/co-delame',
    title: 'Co děláme',
    navbar: true,
  },
  privacyPolicy: {
    path: '/ochrana-osobnich-udaju',
    title: 'Ochrana osobních údajů',
    navbar: false,
  },
  termsAndConditions: {
    path: '/obchodni-podminky',
    title: 'Obchodní podmínky',
    navbar: false,
  },
  donationTemplate: {
    path: '/darovaci-smlouva',
    title: 'Darovací smlouva',
    navbar: false,
  }
});

export function getNavbarPages() {
  return Object.values(pages).filter(page => page.navbar);
}