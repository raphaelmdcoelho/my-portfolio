export interface Project {
  id: string;
  title: string;
  description: string;
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
    description:
      'A browser-based RPG adventure game. Fight monsters in dungeons, manage your inventory, grow crops on a farm, equip gear, and level up your hero. Fully playable in the browser with no downloads required.',
    tags: ['JavaScript', 'HTML', 'CSS', 'Browser Game', 'RPG'],
    repoUrl: '',
    liveUrl: 'https://mero-ybo9.onrender.com/game.html',
    imageUrl: '/my-portfolio/images/poster.png',
    featured: true,
  },
  {
    id: 'grass-ds',
    title: 'grass-ds — Design System',
    description:
      'A grass-inspired design system. A single W3C DTCG token source feeds a framework-agnostic CSS layer and an Angular implementation, with light/dark themes, WCAG AA contrast checks, and a Storybook catalog published to GitHub Pages.',
    tags: ['TypeScript', 'CSS', 'Design Tokens', 'Angular', 'Storybook'],
    repoUrl: 'https://github.com/raphaelmdcoelho/grass-ds',
    liveUrl: 'https://raphaelmdcoelho.github.io/grass-ds/',
    imageUrl: '/my-portfolio/images/grass-thumbnail.png',
  },
];
