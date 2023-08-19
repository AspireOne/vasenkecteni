export type Page = {
  path: string;
  title: string;
}

export const pages = Object.freeze({
  home: {
    path: '/',
    title: 'Domů',
    navbar: true,
    donateId: "prispet",
  },
  about: {
    path: '/o-nas',
    title: 'O nás',
    navbar: true,
    joinId: "pripojit-se",
  },
  contact: {
    path: '/kontakt',
    title: 'Kontakt',
    navbar: true,
  },
  partners: {
    path: '/partneri',
    title: 'Partneři',
    navbar: false, // TODO: Enable when ready.
  },
  whatWeDo: {
    path: '/co-delame',
    title: 'Co děláme',
    navbar: false, // TODO: Enable when ready.
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
  },
  orderResult: {
    path: '/dekujeme',
    title: "Příspěvek",
    navbar: false
  },
  paymentManagement: {
    path: '/platby',
    title: "Vaše příspěvky",
    navbar: false
  }
});

export function getPageWithHash(page: Page, id: string) {
  let path = page.path + (page.path.endsWith('/') ? '' : '/');
  path += (id.startsWith('#') ? id : '#' + id);
  return path;
}

export function getNavbarPages() {
  return Object.values(pages).filter(page => page.navbar);
}