import type { ui } from '../../i18n/ui';
import Coverflow from './Coverflow';

export interface ResolvedPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  formattedDate: string;
  href: string;
  tags?: string[];
}

interface Props {
  posts: ResolvedPost[];
  labels: (typeof ui)['en']['blog'];
}

export default function BlogCarousel({ posts, labels }: Props) {
  return (
    <>
      <Coverflow
        count={posts.length}
        label={labels.carouselLabel}
        itemLabels={posts.map((p) => labels.showPost.replace('{title}', p.title))}
        labels={labels}
        stageHeight="440px"
        stageHeightSmall="480px"
        renderCard={(i, active) => {
          const post = posts[i];
          return (
            <div className="post-content">
              <div className="post-meta">
                <time dateTime={post.date} className="post-date font-mono">{post.formattedDate}</time>
                {post.tags?.map((tag) => (
                  <span key={tag} className="post-tag font-mono">{tag}</span>
                ))}
              </div>
              <h3 className="post-title font-mono">{post.title}</h3>
              <p className="post-excerpt">{post.excerpt}</p>
              <a
                href={post.href}
                className="post-link font-mono"
                tabIndex={active ? 0 : -1}
                aria-label={labels.readMoreAria.replace('{title}', post.title)}
              >
                {labels.readMore} →
              </a>
            </div>
          );
        }}
      />
      <style>{`
        .post-content { padding: 1.75rem; display: flex; flex-direction: column; gap: 0.75rem; }
        .post-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 0.5rem 0.75rem; }
        .post-date { color: var(--color-accent); font-size: 0.75rem; }
        .post-tag {
          background: var(--color-surface-2); color: var(--color-accent);
          border: 1px solid var(--color-border);
          font-size: 0.75rem; padding: 0.125rem 0.5rem; border-radius: 0.25rem;
        }
        .post-title { color: var(--color-text); font-size: 1rem; font-weight: 700; line-height: 1.4; }
        .post-excerpt { color: var(--color-muted); font-size: 0.875rem; line-height: 1.6; }
        .post-link {
          color: var(--color-accent); font-size: 0.875rem; text-decoration: none;
          margin-top: 0.5rem; width: fit-content;
        }
        .post-link:hover { text-decoration: underline; }
      `}</style>
    </>
  );
}
