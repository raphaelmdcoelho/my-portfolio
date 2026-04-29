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
    imageUrl: '/images/project-mero.png',
    featured: true,
  },
];
