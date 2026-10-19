import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../../data/projects';

interface Props {
  projects: Project[];
}

const SWIPE_THRESHOLD = 60;

export default function ProjectCarousel({ projects }: Props) {
  const [index, setIndex] = useState(0);
  const count = projects.length;

  const go = (next: number) => setIndex(((next % count) + count) % count);

  // Shortest signed distance from the active card, wrapping around the ends.
  const offsetOf = (i: number) => {
    let d = i - index;
    if (d > count / 2) d -= count;
    if (d < -count / 2) d += count;
    return d;
  };

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Projects"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(index - 1);
        if (e.key === 'ArrowRight') go(index + 1);
      }}
    >
      <div className="carousel-stage">
        {projects.map((project, i) => {
          const offset = offsetOf(i);
          const active = offset === 0;
          const hidden = Math.abs(offset) > 1;
          return (
            <motion.article
              key={project.id}
              className="carousel-card"
              aria-hidden={!active}
              aria-roledescription="slide"
              initial={false}
              animate={{
                x: `${offset * 62}%`,
                scale: active ? 1 : 0.8,
                opacity: hidden ? 0 : active ? 1 : 0.45,
                rotateY: active ? 0 : offset * -18,
                filter: active ? 'blur(0px)' : 'blur(1.5px)',
              }}
              transition={{ type: 'spring', stiffness: 220, damping: 28 }}
              style={{
                zIndex: 10 - Math.abs(offset),
                pointerEvents: active ? 'auto' : hidden ? 'none' : 'auto',
                cursor: active ? 'grab' : 'pointer',
                borderColor: active ? 'var(--color-accent)' : 'var(--color-border)',
                boxShadow: active
                  ? '0 0 30px var(--color-accent-dim), 0 20px 50px rgba(0,0,0,0.6)'
                  : 'none',
              }}
              drag={active ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x < -SWIPE_THRESHOLD) go(index + 1);
                else if (info.offset.x > SWIPE_THRESHOLD) go(index - 1);
              }}
              onClick={() => !active && go(i)}
            >
              <div className="carousel-img-wrap">
                <img
                  src={project.imageUrl}
                  alt={`Screenshot of ${project.title}`}
                  draggable={false}
                  loading="lazy"
                />
                {project.featured && <span className="carousel-badge font-mono">featured</span>}
              </div>

              <div className="carousel-content">
                <h3 className="font-mono">{project.title}</h3>
                <p>{project.description}</p>
                <div className="carousel-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="font-mono">{tag}</span>
                  ))}
                </div>
                <div className="carousel-links font-mono">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={active ? 0 : -1}
                      aria-label={`GitHub repository for ${project.title}`}
                    >
                      Source ↗
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={active ? 0 : -1}
                      aria-label={`Live demo for ${project.title}`}
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="carousel-controls">
        <button type="button" onClick={() => go(index - 1)} aria-label="Previous project">←</button>
        <div className="carousel-dots" role="tablist" aria-label="Choose project">
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show ${p.title}`}
              className={i === index ? 'dot active' : 'dot'}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button type="button" onClick={() => go(index + 1)} aria-label="Next project">→</button>
      </div>

      <style>{`
        .carousel { outline: none; }
        .carousel-stage {
          position: relative;
          height: 640px;
          perspective: 1200px;
          display: flex;
          justify-content: center;
          overflow: hidden;
        }
        .carousel-card {
          position: absolute;
          top: 1rem;
          width: min(380px, 78vw);
          display: flex;
          flex-direction: column;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 0.75rem;
          overflow: hidden;
          user-select: none;
          touch-action: pan-y;
        }
        .carousel-img-wrap {
          position: relative;
          height: 220px;
          margin: 1rem 1rem 0;
          border-radius: 0.5rem;
          overflow: hidden;
          background: var(--color-surface-2);
        }
        .carousel-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
        }
        .carousel-badge {
          position: absolute; top: 0.75rem; right: 0.75rem;
          background: var(--color-accent); color: var(--color-bg);
          font-size: 0.75rem; font-weight: 700;
          padding: 0.25rem 0.5rem; border-radius: 0.25rem;
        }
        .carousel-content { padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; }
        .carousel-content h3 { color: var(--color-text); font-size: 1rem; font-weight: 700; }
        .carousel-content p { color: var(--color-muted); font-size: 0.875rem; line-height: 1.6; }
        .carousel-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .carousel-tags span {
          background: var(--color-surface-2); color: var(--color-accent);
          border: 1px solid var(--color-border);
          font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: 0.25rem;
        }
        .carousel-links { display: flex; gap: 1rem; font-size: 0.75rem; }
        .carousel-links a { color: var(--color-muted); text-decoration: none; transition: color 0.2s; }
        .carousel-links a:hover { color: var(--color-accent); }
        .carousel-controls {
          display: flex; align-items: center; justify-content: center; gap: 1.5rem;
          margin-top: 1.5rem;
        }
        .carousel-controls > button {
          width: 2.5rem; height: 2.5rem; border-radius: 9999px;
          background: var(--color-surface); color: var(--color-accent);
          border: 1px solid var(--color-border); cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .carousel-controls > button:hover {
          border-color: var(--color-accent);
          box-shadow: 0 0 12px var(--color-accent-dim);
        }
        .carousel-dots { display: flex; gap: 0.5rem; }
        .dot {
          width: 0.5rem; height: 0.5rem; border-radius: 9999px; border: none; padding: 0;
          background: var(--color-border); cursor: pointer;
          transition: width 0.3s, background 0.3s;
        }
        .dot.active { width: 1.5rem; background: var(--color-accent); }
        @media (max-width: 480px) {
          .carousel-stage { height: 680px; }
        }
      `}</style>
    </div>
  );
}
