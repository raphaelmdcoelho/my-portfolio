export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  email: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'devops' | 'tools';
}

export interface SiteConfig {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  avatar: string;
  social: SocialLinks;
  skills: Skill[];
}

export const config: SiteConfig = {
  name: 'Raphael Moreira Damasceno Coelho',
  title: 'Software Developer',
  tagline: 'Building digital experiences from idea to deployment.',
  bio: `I'm a software developer with a passion for building reliable, well-crafted applications.
I take pride in my strong teamwork skills — I believe the best software is built collaboratively, through clear communication, shared ownership, and mutual respect.
I enjoy tackling new challenges, learning continuously, and contributing to teams where everyone grows together.`,
  avatar: '/images/avatar.jpg',
  social: {
    github: 'https://github.com/alexdev',
    linkedin: 'https://linkedin.com/in/alexdev',
    twitter: 'https://twitter.com/alexdev',
    email: 'hello@alexdev.io',
  },
  skills: [
    { name: 'TypeScript', icon: 'ts', category: 'frontend' },
    { name: 'React', icon: 'react', category: 'frontend' },
    { name: 'Astro', icon: 'astro', category: 'frontend' },
    { name: 'Next.js', icon: 'nextjs', category: 'frontend' },
    { name: 'Tailwind CSS', icon: 'tailwind', category: 'frontend' },
    { name: 'Node.js', icon: 'nodejs', category: 'backend' },
    { name: 'Python', icon: 'python', category: 'backend' },
    { name: 'PostgreSQL', icon: 'postgres', category: 'backend' },
    { name: 'Docker', icon: 'docker', category: 'devops' },
    { name: 'Git', icon: 'git', category: 'tools' },
    { name: 'Linux', icon: 'linux', category: 'devops' },
    { name: 'VS Code', icon: 'vscode', category: 'tools' },
  ],
};
