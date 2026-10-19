export type Lang = 'en' | 'pt';

const en = {
  htmlLang: 'en',
  siteTitle: 'Portfolio',
  siteDescription: (name: string, title: string) => `Personal portfolio of ${name}, ${title}.`,
  langSwitchLabel: 'Switch language to Portuguese',
  langSwitchShort: 'PT',

  nav: {
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    blog: 'Blog',
    contact: 'Contact',
    home: 'Home',
    main: 'Main navigation',
    mobile: 'Mobile navigation',
    toggleMenu: 'Toggle menu',
  },

  hero: {
    aria: 'Hero section',
    greeting: '> Hello, world',
    viewProjects: 'View Projects',
    contactMe: 'Contact Me',
    scroll: 'scroll',
  },

  about: {
    aria: 'About me',
    title: 'About Me',
    portraitOf: (name: string) => `Portrait of ${name}`,
  },

  skills: {
    aria: 'Skills and tech stack',
    title: 'Skills & Tech Stack',
    categories: { frontend: 'Frontend', backend: 'Backend', devops: 'DevOps', tools: 'Tools' },
  },

  projects: {
    aria: 'Projects',
    title: 'Projects',
    carouselLabel: 'Projects',
    previous: 'Previous project',
    next: 'Next project',
    choose: 'Choose project',
    show: 'Show {title}',
    screenshotOf: 'Screenshot of {title}',
    featured: 'featured',
    source: 'Source',
    liveDemo: 'Live Demo',
    repoAria: 'GitHub repository for {title}',
    liveAria: 'Live demo for {title}',
  },

  blog: {
    aria: 'Blog',
    title: 'Blog',
    readMore: 'Read more',
    readMoreAria: 'Read more: {title}',
    carouselLabel: 'Blog posts',
    previous: 'Previous post',
    next: 'Next post',
    choose: 'Choose post',
    showPost: 'Show {title}',
    backToBlog: 'Back to blog',
    backToBlogAria: 'Back to blog list',
  },

  contact: {
    aria: 'Contact',
    title: 'Contact',
    textLine1: 'Have a project in mind, want to collaborate, or just want to say hi?',
    textLine2: 'Find me on the links below.',
    githubAria: 'GitHub profile',
    linkedinAria: 'LinkedIn profile',
    mediumAria: 'Medium profile',
  },

  footer: {
    builtWith: 'Built with Astro',
  },
};

const pt: typeof en = {
  htmlLang: 'pt-BR',
  siteTitle: 'Portfólio',
  siteDescription: (name, title) => `Portfólio pessoal de ${name}, ${title}.`,
  langSwitchLabel: 'Mudar o idioma para inglês',
  langSwitchShort: 'EN',

  nav: {
    about: 'Sobre',
    skills: 'Habilidades',
    projects: 'Projetos',
    blog: 'Blog',
    contact: 'Contato',
    home: 'Início',
    main: 'Navegação principal',
    mobile: 'Navegação mobile',
    toggleMenu: 'Abrir/fechar menu',
  },

  hero: {
    aria: 'Seção inicial',
    greeting: '> Olá, mundo',
    viewProjects: 'Ver Projetos',
    contactMe: 'Fale Comigo',
    scroll: 'role',
  },

  about: {
    aria: 'Sobre mim',
    title: 'Sobre Mim',
    portraitOf: (name) => `Retrato de ${name}`,
  },

  skills: {
    aria: 'Habilidades e stack de tecnologias',
    title: 'Habilidades & Stack',
    categories: { frontend: 'Frontend', backend: 'Backend', devops: 'DevOps', tools: 'Ferramentas' },
  },

  projects: {
    aria: 'Projetos',
    title: 'Projetos',
    carouselLabel: 'Projetos',
    previous: 'Projeto anterior',
    next: 'Próximo projeto',
    choose: 'Escolher projeto',
    show: 'Mostrar {title}',
    screenshotOf: 'Captura de tela de {title}',
    featured: 'destaque',
    source: 'Código',
    liveDemo: 'Demo',
    repoAria: 'Repositório no GitHub de {title}',
    liveAria: 'Demo ao vivo de {title}',
  },

  blog: {
    aria: 'Blog',
    title: 'Blog',
    readMore: 'Ler mais',
    readMoreAria: 'Ler mais: {title}',
    carouselLabel: 'Artigos do blog',
    previous: 'Artigo anterior',
    next: 'Próximo artigo',
    choose: 'Escolher artigo',
    showPost: 'Mostrar {title}',
    backToBlog: 'Voltar ao blog',
    backToBlogAria: 'Voltar à lista de artigos',
  },

  contact: {
    aria: 'Contato',
    title: 'Contato',
    textLine1: 'Tem um projeto em mente, quer colaborar ou só quer dar um oi?',
    textLine2: 'Me encontre nos links abaixo.',
    githubAria: 'Perfil no GitHub',
    linkedinAria: 'Perfil no LinkedIn',
    mediumAria: 'Perfil no Medium',
  },

  footer: {
    builtWith: 'Feito com Astro',
  },
};

export const ui = { en, pt };
