import type { MouseEvent } from 'react';
import type { ResolvedProject } from '../../data/projects';
import type { ui } from '../../i18n/ui';
import Coverflow from './Coverflow';

interface Props {
  projects: ResolvedProject[];
  labels: (typeof ui)['en']['projects'];
}

const trackPointer = (e: MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

const fill = (template: string, title: string) => template.replace('{title}', title);

export default function ProjectCarousel({ projects, labels }: Props) {
  return (
    <>
      <Coverflow
        count={projects.length}
        label={labels.carouselLabel}
        itemLabels={projects.map((p) => fill(labels.show, p.title))}
        labels={labels}
        stageHeight="640px"
        stageHeightSmall="680px"
        renderCard={(i, active) => {
          const project = projects[i];
          return (
            <div className="project-card-inner" onMouseMove={trackPointer}>
              <div className="project-img-wrap">
                <img
                  src={project.imageUrl}
                  alt={fill(labels.screenshotOf, project.title)}
                  draggable={false}
                  loading="lazy"
                />
                {project.featured && <span className="project-badge font-mono">{labels.featured}</span>}
              </div>

              <div className="card-content">
                <h3 className="font-mono">{project.title}</h3>
                <p>{project.description}</p>
                <div className="card-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="font-mono">{tag}</span>
                  ))}
                </div>
                <div className="card-links font-mono">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={active ? 0 : -1}
                      aria-label={fill(labels.repoAria, project.title)}
                    >
                      {labels.source} ↗
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={active ? 0 : -1}
                      aria-label={fill(labels.liveAria, project.title)}
                    >
                      {labels.liveDemo} ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        }}
      />
      <style>{`
        .project-img-wrap {
          position: relative;
          height: 220px;
          margin: 1rem 1rem 0;
          border-radius: 0.5rem;
          overflow: hidden;
          background: var(--color-surface-2);
        }
        .project-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
        }
        .project-badge {
          position: absolute; top: 0.75rem; right: 0.75rem;
          background: var(--color-accent); color: var(--color-bg);
          font-size: 0.75rem; font-weight: 700;
          padding: 0.25rem 0.5rem; border-radius: 0.25rem;
        }
        .card-content { padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; }
        .card-content h3 { color: var(--color-text); font-size: 1rem; font-weight: 700; }
        .card-content p { color: var(--color-muted); font-size: 0.875rem; line-height: 1.6; }
        .card-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .card-tags span {
          background: var(--color-surface-2); color: var(--color-accent);
          border: 1px solid var(--color-border);
          font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: 0.25rem;
        }
        .card-links { margin-top: auto; display: flex; gap: 1rem; font-size: 0.75rem; }
        .card-links a { color: var(--color-muted); text-decoration: none; transition: color 0.2s; }
        .card-links a:hover { color: var(--color-accent); }
        @property --border-angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
        .carousel-card:has(.project-card-inner) {
          bottom: 1rem;
          border-color: transparent !important;
          border-radius: 1rem;
          background: linear-gradient(160deg, var(--color-surface-2) 0%, var(--color-surface) 55%);
        }
        .carousel-card:has(.project-card-inner)::before {
          content: ''; position: absolute; inset: 0; z-index: 3; pointer-events: none;
          border-radius: inherit; padding: 1px;
          background: conic-gradient(from var(--border-angle), var(--color-border), var(--color-accent), var(--color-border) 40%, var(--color-border));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          opacity: 0.5; transition: opacity 0.4s;
          animation: border-spin 6s linear infinite;
        }
        .carousel-card:has(.project-card-inner):hover::before { opacity: 1; }
        @keyframes border-spin { to { --border-angle: 360deg; } }
        .project-card-inner {
          position: relative; flex: 1; display: flex; flex-direction: column;
          --mx: 50%; --my: 0%;
        }
        .project-card-inner::after {
          content: ''; position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background: radial-gradient(240px circle at var(--mx) var(--my), var(--color-accent-dim), transparent 70%);
          opacity: 0; transition: opacity 0.3s;
        }
        .project-card-inner:hover::after { opacity: 1; }
        .project-img-wrap { border-radius: 0.75rem; }
        .project-img-wrap::after {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(to top, var(--color-surface) 0%, transparent 45%);
          opacity: 0.7;
        }
        .project-img-wrap img { transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1); }
        .project-card-inner:hover .project-img-wrap img { transform: scale(1.06); }
        .project-badge {
          z-index: 1; border-radius: 9999px; padding: 0.25rem 0.65rem;
          box-shadow: 0 0 14px var(--color-accent-dim);
        }
        .carousel-card:has(.project-card-inner) .card-content { flex: 1; position: relative; z-index: 1; }
        .carousel-card:has(.project-card-inner) .card-content h3 { font-size: 1.1rem; letter-spacing: -0.01em; }
        .carousel-card:has(.project-card-inner) .card-tags span {
          border-radius: 9999px; padding: 0.2rem 0.65rem;
          background: color-mix(in srgb, var(--color-accent) 8%, transparent);
          border-color: color-mix(in srgb, var(--color-accent) 25%, transparent);
          transition: background 0.2s, border-color 0.2s;
        }
        .carousel-card:has(.project-card-inner) .card-tags span:hover {
          background: color-mix(in srgb, var(--color-accent) 18%, transparent);
          border-color: var(--color-accent);
        }
        .carousel-card:has(.project-card-inner) .card-links a {
          padding: 0.4rem 0.8rem; border-radius: 9999px;
          border: 1px solid var(--color-border);
          transition: color 0.2s, border-color 0.2s, background 0.2s, transform 0.2s;
        }
        .carousel-card:has(.project-card-inner) .card-links a:hover {
          border-color: var(--color-accent); background: var(--color-accent-dim); transform: translateY(-2px);
        }
        @media (prefers-reduced-motion: reduce) {
          .carousel-card:has(.project-card-inner)::before { animation: none; }
          .project-img-wrap img { transition: none; }
          .project-card-inner:hover .project-img-wrap img { transform: none; }
        }
      `}</style>
    </>
  );
}
