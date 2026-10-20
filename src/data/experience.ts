export interface Company {
  id: string;
  name: string;
  url: string;
  /** Short form of the site address shown under the name. */
  displayUrl: string;
  logo: string;
}

export const companies: Company[] = [
  {
    id: 'systra',
    name: 'Systra',
    url: 'https://www.systra.com/brazil/en/',
    displayUrl: 'systra.com/brazil',
    logo: '/my-portfolio/images/companies/systra.png',
  },
  {
    id: 'egl',
    name: 'EGL Engenharia',
    url: 'https://egl.eng.br/',
    displayUrl: 'egl.eng.br',
    logo: '/my-portfolio/images/companies/egl.png',
  },
  {
    id: 'stefanini',
    name: 'Stefanini',
    url: 'https://stefanini.com/pt/',
    displayUrl: 'stefanini.com',
    logo: '/my-portfolio/images/companies/stefanini.png',
  },
  {
    id: 'globalweb',
    name: 'Globalweb',
    url: 'https://www.globalweb.com.br/',
    displayUrl: 'globalweb.com.br',
    logo: '/my-portfolio/images/companies/globalweb.png',
  },
  {
    id: 'dnit',
    name: 'DNIT',
    url: 'https://www.gov.br/dnit/pt-br',
    displayUrl: 'gov.br/dnit',
    logo: '/my-portfolio/images/companies/dnit.png',
  },
  {
    id: 'aneel',
    name: 'ANEEL',
    url: 'https://www.gov.br/aneel/pt-br',
    displayUrl: 'gov.br/aneel',
    logo: '/my-portfolio/images/companies/aneel.png',
  },
  {
    id: 'programmers',
    name: 'Programmers',
    url: 'https://www.programmers.com.br/',
    displayUrl: 'programmers.com.br',
    logo: '/my-portfolio/images/companies/programmers.png',
  },
];
