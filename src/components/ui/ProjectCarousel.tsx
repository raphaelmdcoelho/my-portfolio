import type { ResolvedProject } from '../../data/projects';
import type { ui } from '../../i18n/ui';
import Coverflow from './Coverflow';

interface Props {
  projects: ResolvedProject[];
  labels: (typeof ui)['en']['projects'];
}

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
            <>
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
            </>
          );
        }}
      />
      <style>{`
        .carousel-card:has(.project-img-wrap) { bottom: 1rem; }
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
        .carousel-card:has(.project-img-wrap) .card-content { flex: 1; }
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
      `}</style>
    </>
  );
}
