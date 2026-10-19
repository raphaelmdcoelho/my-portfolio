import type { Localized } from '../i18n/utils';

export interface Project {
  id: string;
  title: string;
  description: Localized;
  tags: string[];
  repoUrl: string;
  liveUrl: string;
  imageUrl: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'mero',
    title: 'Mero — Adventure',
    description: {
      en:
        'A browser-based RPG adventure game. Fight monsters in dungeons, manage your inventory, grow crops on a farm, equip gear, and level up your hero. Fully playable in the browser with no downloads required.',
      pt:
        'Um jogo de aventura RPG para navegador. Enfrente monstros em masmorras, gerencie seu inventário, plante em uma fazenda, equipe itens e suba o nível do seu herói. Totalmente jogável no navegador, sem downloads.',
    },
    tags: ['JavaScript', 'HTML', 'CSS', 'Browser Game', 'RPG'],
    repoUrl: '',
    liveUrl: 'https://mero-ybo9.onrender.com/game.html',
    imageUrl: '/my-portfolio/images/poster.png',
    featured: true,
  },
  {
    id: 'grass-ds',
    title: 'grass-ds — Design System',
    description: {
      en:
        'A grass-inspired design system. A single W3C DTCG token source feeds a framework-agnostic CSS layer and an Angular implementation, with light/dark themes, WCAG AA contrast checks, and a Storybook catalog published to GitHub Pages.',
      pt:
        'Um design system inspirado em grama. Uma única fonte de tokens W3C DTCG alimenta uma camada CSS independente de framework e uma implementação em Angular, com temas claro/escuro, verificações de contraste WCAG AA e um catálogo Storybook publicado no GitHub Pages.',
    },
    tags: ['TypeScript', 'CSS', 'Design Tokens', 'Angular', 'Storybook'],
    repoUrl: 'https://github.com/raphaelmdcoelho/grass-ds',
    liveUrl: 'https://raphaelmdcoelho.github.io/grass-ds/',
    imageUrl: '/my-portfolio/images/grass-thumbnail.png',
  },
  {
    id: 'pull-binder',
    title: 'pull-binder — Pokémon TCG Manager',
    description: {
      en:
        'A web app to manage my Pokémon Trading Card Game collection. Keep track of the cards I own and organize them in a digital binder.',
      pt:
        'Um aplicativo web para gerenciar minha coleção de Pokémon Trading Card Game. Acompanhe as cartas que eu tenho e organize-as em um fichário digital.',
    },
    tags: ['Angular', 'TypeScript', 'CSS', 'Supabase'],
    repoUrl: 'https://github.com/raphaelmdcoelho/pull-binder',
    liveUrl: 'https://pull-binder.pages.dev/login',
    imageUrl: '/my-portfolio/images/pull-binder-thumbnail.png',
  },
];

/** A project with its text resolved to a single language. */
export type ResolvedProject = Omit<Project, 'description'> & { description: string };
