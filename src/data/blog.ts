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
    id: 'how-stream-works-in-csharp',
    title: 'How does Stream work in C#?',
    date: '2026-04-29',
    excerpt:
      'Streams are a fundamental concept in C# for handling large amounts of data, network communication, and file I/O operations. Learn how they work, when to use them, and best practices for managing their lifecycle.',
    url: '/my-portfolio/blog/how-stream-works-in-csharp',
    tags: ['C#', '.NET', 'Streams', 'I/O'],
  },
  {
    id: 'accessing-windows-directories-from-linux',
    title: 'Accessing Windows Directories from Linux: A Guide to Mounting',
    date: '2026-04-30',
    excerpt:
      'In a mixed OS environment, accessing Windows shares from Linux can be tricky. Learn how to use CIFS to mount Windows directories on Linux, set up credentials securely, and automate mounts with fstab.',
    url: '/my-portfolio/blog/accessing-windows-directories-from-linux',
    tags: ['Linux', 'DevOps', 'CIFS'],
  },
];
