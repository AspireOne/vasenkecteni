
export type Page = {
  path: string;
  title: string;
}

export const pages = Object.freeze({
  home: {
    path: '/',
    title: 'Domů',
  },
  about: {
    path: '/o-nas',
    title: 'O nás',
  },
  contact: {
    path: '/kontakt',
    title: 'Kontakt',
  },
  partners: {
    path: '/partneri',
    title: 'Partneři',
  },
  whatWeDo: {
    path: '/co-delame',
    title: 'Co děláme',
  },
});