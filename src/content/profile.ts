export const profile = {
  name: 'Haroon Kasor',
  email: 'haroonkasor.dev@gmail.com',
  phone: '062-496-9217',
  github: 'https://github.com/HaroonKasor',
  githubUser: 'HaroonKasor',
  githubLabel: 'github.com/HaroonKasor',
  lineId: 'harunfy',
  lineUrl: 'https://line.me/ti/p/g2zxCyDgt1',
  lineQr: '/images/line-qr.png',
  location: 'Bangkok, Thailand',
  cvFiles: {
    en: '/cv/haroon-kasor-en.pdf',
    th: '/cv/haroon-kasor-th.pdf',
  },
} as const;

/** Testimonials live in ./testimonials.ts — the section shows itself once that list is non-empty. */
export { SHOW_TESTIMONIAL } from "./testimonials";
