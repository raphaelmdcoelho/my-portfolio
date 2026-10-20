import type { Localized } from '../i18n/utils';

export interface BlogPost {
  id: string;
  title: Localized;
  date: string;
  excerpt: Localized;
  tags?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 'strategies-for-structured-prompts',
    title: {"en": "Strategies for Structured Prompts", "pt": "Estratégias para Prompts Estruturados"},
    date: '2026-10-20',
    excerpt: {"en": "A good prompt is less like a wish and more like a well-written interface. Learn how to organize instructions, examples, and output contracts so your LLM spends less time guessing what you meant.", "pt": "Um bom prompt se parece menos com um desejo e mais com uma interface bem definida. Aprenda a organizar instruções, exemplos e contratos de saída para que seu LLM passe menos tempo adivinhando o que você quis dizer."},
    tags: ['AI', 'Prompt Engineering', 'LLM'],
  },
  {
    id: 'how-stream-works-in-csharp',
    title: {
      en: 'How does Stream work in C#?',
      pt: 'Como funciona o Stream em C#?',
    },
    date: '2026-04-29',
    excerpt: {
      en:
        'Streams are a fundamental concept in C# for handling large amounts of data, network communication, and file I/O operations. Learn how they work, when to use them, and best practices for managing their lifecycle.',
      pt:
        'Streams são um conceito fundamental em C# para lidar com grandes volumes de dados, comunicação de rede e operações de E/S de arquivos. Aprenda como funcionam, quando usá-los e boas práticas para gerenciar seu ciclo de vida.',
    },
    tags: ['C#', '.NET', 'Streams', 'I/O'],
  },
  {
    id: 'accessing-windows-directories-from-linux',
    title: {
      en: 'Accessing Windows Directories from Linux: A Guide to Mounting',
      pt: 'Acessando diretórios do Windows a partir do Linux: um guia de montagem',
    },
    date: '2026-04-30',
    excerpt: {
      en:
        'In a mixed OS environment, accessing Windows shares from Linux can be tricky. Learn how to use CIFS to mount Windows directories on Linux, set up credentials securely, and automate mounts with fstab.',
      pt:
        'Em um ambiente com sistemas operacionais mistos, acessar compartilhamentos do Windows a partir do Linux pode ser complicado. Aprenda a usar CIFS para montar diretórios do Windows no Linux, configurar credenciais com segurança e automatizar as montagens com o fstab.',
    },
    tags: ['Linux', 'DevOps', 'CIFS'],
  },
];
