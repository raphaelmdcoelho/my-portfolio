export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  url: string;
  tags?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 'astro-vs-nextjs',
    title: 'Astro vs Next.js: Choosing the Right Framework for Your Project',
    date: '2026-03-15',
    excerpt:
      'A deep dive into the trade-offs between Astro and Next.js. When should you pick one over the other, and why Astro might be the answer for content-heavy sites.',
    url: '/blog/astro-vs-nextjs',
    tags: ['Astro', 'Next.js', 'Web Dev'],
  },
  {
    id: 'tailwind-v4-what-changed',
    title: 'Tailwind CSS v4: What Changed and Why It Matters',
    date: '2026-02-28',
    excerpt:
      'Tailwind v4 rewrote the engine with a new Rust-based compiler. Here is what that means for your workflow, build times, and configuration.',
    url: '/blog/tailwind-v4-what-changed',
    tags: ['CSS', 'Tailwind', 'Performance'],
  },
  {
    id: 'typescript-strict-mode',
    title: 'Why You Should Enable TypeScript Strict Mode Today',
    date: '2026-01-10',
    excerpt:
      'Strict mode catches entire categories of bugs at compile time. Here is a practical guide to enabling it in an existing project without losing your mind.',
    url: '/blog/typescript-strict-mode',
    tags: ['TypeScript', 'Best Practices'],
  },
  {
    id: 'docker-for-developers',
    title: 'Docker for Developers: The Setup I Actually Use',
    date: '2025-12-05',
    excerpt:
      'Not a Docker tutorial — a real-world walkthrough of the compose setup, volume strategies, and dev container config I reach for on every project.',
    url: '/blog/docker-for-developers',
    tags: ['Docker', 'DevOps', 'Workflow'],
  },
];
