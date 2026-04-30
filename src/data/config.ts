export interface SocialLinks {
  github: string;
  linkedin: string;
  medium: string;
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
  avatar: '/my-portfolio/images/avatar.jpeg',
  social: {
    github: 'https://github.com/raphaelmdcoelho',
    linkedin: 'https://www.linkedin.com/in/rmdcoelho/',
    medium: 'https://medium.com/@raphaelcoelho_94891',
  },
  skills: [
    { name: 'TypeScript', icon: 'ts', category: 'frontend' },
    { name: 'Angular', icon: 'angular', category: 'frontend' },
    { name: 'Astro', icon: 'astro', category: 'frontend' },
    { name: 'JavaScript', icon: 'js', category: 'frontend' },
    { name: 'C#', icon: 'csharp', category: 'backend' },
    { name: 'ASP.NET Core', icon: 'dotnet', category: 'backend' },
    { name: 'Node.js', icon: 'nodejs', category: 'backend' },
    { name: 'Python', icon: 'python', category: 'backend' },
    { name: 'PostgreSQL', icon: 'postgres', category: 'backend' },
    { name: 'SQL Server', icon: 'sqlserver', category: 'backend' },
    { name: 'Docker', icon: 'docker', category: 'devops' },
    { name: 'Azure', icon: 'azure', category: 'devops' },
    { name: 'Linux', icon: 'linux', category: 'devops' },
    { name: 'Git', icon: 'git', category: 'tools' },
    { name: 'GitHub Copilot', icon: 'copilot', category: 'tools' },
    { name: 'Claude Code', icon: 'claude', category: 'tools' },
  ],
};
