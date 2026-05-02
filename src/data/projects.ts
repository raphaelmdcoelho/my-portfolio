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
    id: 'func-viewer',
    title: 'Func Viewer',
    description:
      'A handwriting recognition app for linear expressions. Draw a function like 2x+1 on the canvas and the app instantly parses the slope and intercept, rendering the corresponding graph in real time.',
    tags: ['JavaScript', 'Canvas', 'Math', 'Handwriting Recognition'],
    repoUrl: 'https://github.com/raphaelmdcoelho/func-viewer',
    liveUrl: 'https://raphaelmdcoelho.github.io/func-viewer/',
    imageUrl: '',
    featured: false,
  },
];
