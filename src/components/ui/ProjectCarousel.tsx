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
  e.currentTarget.style.setProperty('--px', `${((e.clientX - r.left) / r.width - 0.5) * 2}`);
  e.currentTarget.style.setProperty('--py', `${((e.clientY - r.top) / r.height - 0.5) * 2}`);
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
        stageHeight="700px"
        stageHeightSmall="740px"
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
                <span className="project-index font-mono">
                  {String(i + 1).padStart(2, '0')}<em>/{String(projects.length).padStart(2, '0')}</em>
                </span>
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
                      className="primary"
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
        @property --border-angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }

        /* ---------- ambient backdrop ---------- */
        .carousel:has(.project-card-inner) .carousel-stage::before,
        .carousel:has(.project-card-inner) .carousel-stage::after {
          content: ''; position: absolute; z-index: 0; pointer-events: none;
          width: 460px; height: 460px; border-radius: 50%; filter: blur(90px);
          animation: orb-float 14s ease-in-out infinite alternate;
        }
        .carousel:has(.project-card-inner) .carousel-stage::before {
          top: 5%; left: 12%;
          background: radial-gradient(circle, rgba(0,255,224,0.22), transparent 70%);
        }
        .carousel:has(.project-card-inner) .carousel-stage::after {
          bottom: 0; right: 10%; animation-delay: -7s;
          background: radial-gradient(circle, rgba(120,90,255,0.2), transparent 70%);
        }
        @keyframes orb-float {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(60px, 40px) scale(1.15); }
        }

        /* ---------- glass card ---------- */
        .carousel-card:has(.project-card-inner) {
          bottom: 1rem;
          width: min(420px, 82vw);
          border-color: transparent !important;
          border-radius: 1.25rem;
          background: linear-gradient(155deg, rgba(34,34,38,0.78) 0%, rgba(14,14,16,0.82) 60%);
          -webkit-backdrop-filter: blur(18px) saturate(140%);
          backdrop-filter: blur(18px) saturate(140%);
        }
        .carousel-card:has(.project-card-inner)::before {
          content: ''; position: absolute; inset: 0; z-index: 3; pointer-events: none;
          border-radius: inherit; padding: 1.5px;
          background: conic-gradient(from var(--border-angle), rgba(255,255,255,0.08), var(--color-accent), rgba(120,90,255,0.9), rgba(255,255,255,0.08) 60%);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          opacity: 0.55; transition: opacity 0.4s;
          animation: border-spin 5s linear infinite;
        }
        .carousel-card:has(.project-card-inner):hover::before { opacity: 1; }
        @keyframes border-spin { to { --border-angle: 360deg; } }

        .project-card-inner {
          position: relative; flex: 1; display: flex; flex-direction: column;
          --mx: 50%; --my: 0%; --px: 0; --py: 0;
        }
        .project-card-inner::after {
          content: ''; position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background: radial-gradient(320px circle at var(--mx) var(--my), rgba(0,255,224,0.16), transparent 65%);
          opacity: 0; transition: opacity 0.3s;
        }
        .project-card-inner:hover::after { opacity: 1; }

        /* ---------- image with parallax ---------- */
        .project-img-wrap {
          position: relative; height: 240px; margin: 0.75rem 0.75rem 0;
          border-radius: 0.9rem; overflow: hidden; background: var(--color-surface-2);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06);
        }
        .project-img-wrap img {
          width: 100%; height: 100%; object-fit: cover; object-position: top;
          transform: scale(1.1) translate(calc(var(--px) * -8px), calc(var(--py) * -8px));
          transition: transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .project-img-wrap::after {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(to top, rgba(14,14,16,0.95) 0%, rgba(14,14,16,0) 55%);
        }
        .project-index {
          position: absolute; left: 1rem; bottom: 0.75rem; z-index: 1;
          font-size: 2rem; font-weight: 800; line-height: 1; letter-spacing: -0.04em;
          color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.55);
        }
        .project-index em { font-style: normal; font-size: 0.8rem; -webkit-text-stroke: 0; color: var(--color-muted); margin-left: 0.2rem; }
        .project-badge {
          position: absolute; top: 0.75rem; right: 0.75rem; z-index: 1;
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
          color: var(--color-bg); background: var(--color-accent);
          padding: 0.25rem 0.7rem; border-radius: 9999px;
          box-shadow: 0 0 18px rgba(0,255,224,0.45);
        }

        /* ---------- content ---------- */
        .carousel-card:has(.project-card-inner) .card-content { flex: 1; position: relative; z-index: 1; padding: 1.1rem 1.25rem 1.25rem; }
        .carousel-card:has(.project-card-inner) .card-content h3 {
          font-size: 1.25rem; letter-spacing: -0.02em;
          background: linear-gradient(90deg, #fff, var(--color-accent));
          -webkit-background-clip: text; background-clip: text; color: transparent;
          width: fit-content;
        }
        .carousel-card:has(.project-card-inner) .card-content p { font-size: 0.9rem; }
        .carousel-card:has(.project-card-inner) .card-tags span {
          border-radius: 9999px; padding: 0.2rem 0.7rem;
          background: rgba(255,255,255,0.04); color: var(--color-text);
          border: 1px solid rgba(255,255,255,0.1);
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .carousel-card:has(.project-card-inner) .card-tags span:hover {
          background: rgba(0,255,224,0.12); border-color: var(--color-accent); color: var(--color-accent);
        }
        .carousel-card:has(.project-card-inner) .card-links { gap: 0.6rem; }
        .carousel-card:has(.project-card-inner) .card-links a {
          padding: 0.55rem 1rem; border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.14); color: var(--color-text);
          transition: color 0.2s, border-color 0.2s, background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .carousel-card:has(.project-card-inner) .card-links a:hover {
          border-color: var(--color-accent); color: var(--color-accent); transform: translateY(-2px);
        }
        .carousel-card:has(.project-card-inner) .card-links a.primary {
          background: var(--color-accent); border-color: var(--color-accent); color: var(--color-bg); font-weight: 700;
        }
        .carousel-card:has(.project-card-inner) .card-links a.primary:hover {
          color: var(--color-bg); box-shadow: 0 0 22px rgba(0,255,224,0.5);
        }

        /* ---------- controls ---------- */
        .carousel:has(.project-card-inner) .carousel-controls > button {
          width: 3rem; height: 3rem; background: rgba(255,255,255,0.04);
          -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
          border-color: rgba(255,255,255,0.12);
        }
        .carousel:has(.project-card-inner) .carousel-controls > button:hover {
          transform: scale(1.08); background: var(--color-accent-dim);
        }
        .carousel:has(.project-card-inner) .dot.active { box-shadow: 0 0 12px var(--color-accent); }

        @media (prefers-reduced-motion: reduce) {
          .carousel-stage::before, .carousel-stage::after,
          .carousel-card:has(.project-card-inner)::before { animation: none; }
          .project-img-wrap img { transform: scale(1.05); transition: none; }
        }
      `}</style>
    </>
  );
}
