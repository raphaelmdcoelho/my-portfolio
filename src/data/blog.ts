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
    date: '2024-01-01',
    excerpt:
      'Streams are a fundamental concept in C# for handling large amounts of data, network communication, and file I/O operations. Learn how they work, when to use them, and best practices for managing their lifecycle.',
    url: '/my-portfolio/blog/how-stream-works-in-csharp',
    tags: ['C#', '.NET', 'Streams', 'I/O'],
  },
];
