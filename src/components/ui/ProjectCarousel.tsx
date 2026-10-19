import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ResolvedProject } from '../../data/projects';
import type { ui } from '../../i18n/ui';

interface Props {
  projects: ResolvedProject[];
  labels: (typeof ui)['en']['projects'];
}

const AUTOPLAY_MS = 7000;

const fill = (template: string, title: string) => template.replace('{title}', title);

const host = (url: string) => {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
};

export default function ProjectCarousel({ projects, labels }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);
  const count = projects.length;
  const project = projects[index];
  const panel = useRef<HTMLDivElement>(null);

  const go = (next: number) => {
    setIndex(((next % count) + count) % count);
    setTick((t) => t + 1);
  };

  useEffect(() => {
    if (paused) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const id = window.setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, tick]);

  const track = (e: MouseEvent<HTMLDivElement>) => {
    const el = panel.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${(-y * 8).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(x * 10).toFixed(2)}deg`);
    el.style.setProperty('--mx', `${(x + 0.5) * 100}%`);
    el.style.setProperty('--my', `${(y + 0.5) * 100}%`);
  };

  const reset = () => {
    const el = panel.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <div
      className="showcase"
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.carouselLabel}
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        reset();
      }}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') go(index - 1);
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(index + 1);
      }}
    >
      <div className="showcase-glow" aria-hidden="true" />

      <div className="showcase-grid">
        {/* ---------- project list ---------- */}
        <div className="showcase-list" role="tablist" aria-label={labels.choose} aria-orientation="vertical">
          {projects.map((p, i) => {
            const active = i === index;
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={fill(labels.show, p.title)}
                className={active ? 'tab active' : 'tab'}
                onClick={() => go(i)}
              >
                <span className="tab-num font-mono">{String(i + 1).padStart(2, '0')}</span>
                <span className="tab-title">{p.title}</span>
                <span className="tab-bar" aria-hidden="true">
                  {active && (
                    <span
                      key={`${index}-${tick}`}
                      className="tab-bar-fill"
                      style={{
                        animationDuration: `${AUTOPLAY_MS}ms`,
                        animationPlayState: paused ? 'paused' : 'running',
                      }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* ---------- preview ---------- */}
        <div className="showcase-stage" onMouseMove={track}>
          <div className="window" ref={panel}>
            <div className="window-chrome">
              <span className="dots" aria-hidden="true">
                <i /><i /><i />
              </span>
              <span className="url font-mono">{host(project.liveUrl || project.repoUrl)}</span>
              {project.featured && <span className="badge font-mono">★ {labels.featured}</span>}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={project.id}
                className="window-body"
                initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <div className="shot">
                  <img
                    src={project.imageUrl}
                    alt={fill(labels.screenshotOf, project.title)}
                    draggable={false}
                  />
                </div>

                <div className="info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="font-mono">{tag}</span>
                    ))}
                  </div>
                  <div className="actions font-mono">
                    {project.liveUrl && (
                      <a
                        className="btn primary"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={fill(labels.liveAria, project.title)}
                      >
                        {labels.liveDemo} <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        className="btn"
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={fill(labels.repoAria, project.title)}
                      >
                        {labels.source} <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        .showcase { position: relative; outline: none; }
        @media (min-width: 1100px) {
          .showcase { width: min(1180px, calc(100vw - 4rem)); left: 50%; transform: translateX(-50%); }
        }
        .showcase:focus-visible { outline: 1px dashed var(--color-accent); outline-offset: 8px; }

        .showcase-glow {
          position: absolute; inset: -4rem -2rem; z-index: 0; pointer-events: none;
          background:
            radial-gradient(40% 50% at 20% 20%, rgba(0,255,224,0.16), transparent 70%),
            radial-gradient(40% 50% at 85% 80%, rgba(124,92,255,0.18), transparent 70%);
          filter: blur(30px);
        }

        .showcase-grid {
          position: relative; z-index: 1;
          display: grid; grid-template-columns: minmax(220px, 300px) 1fr; gap: 2.5rem;
          align-items: center;
        }

        /* ---------- tabs ---------- */
        .showcase-list { display: flex; flex-direction: column; gap: 0.25rem; }
        .tab {
          position: relative; display: grid; grid-template-columns: 2.25rem 1fr; align-items: baseline;
          text-align: left; padding: 0.9rem 0.5rem 1rem; background: none; border: 0; cursor: pointer;
          color: var(--color-muted); transition: color 0.25s, transform 0.25s;
        }
        .tab:hover { color: var(--color-text); transform: translateX(4px); }
        .tab-num { font-size: 0.75rem; opacity: 0.6; }
        .tab-title {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 1.05rem; font-weight: 600; letter-spacing: -0.01em; line-height: 1.25;
          transition: font-size 0.25s;
        }
        .tab.active { color: #fff; }
        .tab.active .tab-num { color: var(--color-accent); opacity: 1; }
        .tab.active .tab-title { font-size: 1.35rem; font-weight: 800; }
        .tab-bar {
          position: absolute; left: 0.5rem; right: 0.5rem; bottom: 0; height: 2px;
          background: rgba(255,255,255,0.08); overflow: hidden;
        }
        .tab-bar-fill {
          display: block; height: 100%; width: 100%; transform-origin: left;
          background: linear-gradient(90deg, var(--color-accent), #7c5cff);
          animation: fill-bar linear forwards;
        }
        @keyframes fill-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }

        /* ---------- window ---------- */
        .showcase-stage { perspective: 1400px; }
        .window {
          --rx: 0deg; --ry: 0deg; --mx: 50%; --my: 50%;
          position: relative; border-radius: 1.1rem; overflow: hidden;
          background: linear-gradient(160deg, rgba(30,30,36,0.9), rgba(12,12,15,0.92));
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.09),
            0 40px 80px -20px rgba(0,0,0,0.7),
            0 0 80px -20px rgba(0,255,224,0.25);
          transform: rotateX(var(--rx)) rotateY(var(--ry));
          transition: transform 0.25s ease-out;
          will-change: transform;
        }
        .window::after {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(500px circle at var(--mx) var(--my), rgba(255,255,255,0.08), transparent 60%);
        }
        .window-chrome {
          display: flex; align-items: center; gap: 0.9rem; padding: 0.7rem 1rem;
          background: rgba(255,255,255,0.04); border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .dots { display: flex; gap: 0.4rem; }
        .dots i { width: 0.65rem; height: 0.65rem; border-radius: 50%; background: rgba(255,255,255,0.18); }
        .dots i:nth-child(1) { background: #ff5f57; }
        .dots i:nth-child(2) { background: #febc2e; }
        .dots i:nth-child(3) { background: #28c840; }
        .url {
          flex: 1; max-width: 22rem; font-size: 0.72rem; color: var(--color-muted);
          background: rgba(0,0,0,0.35); border-radius: 9999px; padding: 0.3rem 0.9rem;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .badge {
          margin-left: auto; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
          color: var(--color-bg); background: var(--color-accent); padding: 0.25rem 0.7rem; border-radius: 9999px;
          box-shadow: 0 0 18px rgba(0,255,224,0.45);
        }

        .window-body { display: grid; grid-template-columns: 1.15fr 1fr; min-height: 380px; }
        .shot { position: relative; overflow: hidden; background: var(--color-surface-2); }
        .shot img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: top;
        }
        .shot::after {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(90deg, transparent 60%, rgba(12,12,15,0.9));
        }
        .info { display: flex; flex-direction: column; gap: 1rem; padding: 1.75rem 1.75rem 1.75rem 1.25rem; }
        .info h3 {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 1.5rem; font-weight: 800; letter-spacing: -0.03em; line-height: 1.15;
          background: linear-gradient(90deg, #fff 30%, var(--color-accent));
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .info p { color: #b5b5b8; font-size: 0.9rem; line-height: 1.65; }
        .tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .tags span {
          font-size: 0.7rem; padding: 0.25rem 0.65rem; border-radius: 9999px;
          color: var(--color-text); background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .tags span:hover { color: var(--color-accent); border-color: var(--color-accent); background: rgba(0,255,224,0.1); }
        .actions { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: auto; }
        .btn {
          font-size: 0.78rem; padding: 0.6rem 1.1rem; border-radius: 9999px; text-decoration: none;
          color: var(--color-text); border: 1px solid rgba(255,255,255,0.18);
          transition: transform 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
        }
        .btn:hover { transform: translateY(-2px); color: var(--color-accent); border-color: var(--color-accent); }
        .btn.primary { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-bg); font-weight: 700; }
        .btn.primary:hover { color: var(--color-bg); box-shadow: 0 0 26px rgba(0,255,224,0.55); }

        /* ---------- responsive ---------- */
        @media (max-width: 960px) {
          .showcase-grid { grid-template-columns: 1fr; gap: 1.25rem; }
          .showcase-list { flex-direction: row; overflow-x: auto; gap: 0.5rem; padding-bottom: 0.25rem; scrollbar-width: none; }
          .tab { flex: 0 0 auto; grid-template-columns: auto; padding: 0.6rem 0.9rem 0.8rem; }
          .tab-num { display: none; }
          .tab-title, .tab.active .tab-title { font-size: 0.9rem; white-space: nowrap; }
        }
        @media (max-width: 680px) {
          .window-body { grid-template-columns: 1fr; }
          .shot { height: 220px; }
          .shot::after { background: linear-gradient(0deg, rgba(12,12,15,0.9), transparent 50%); }
          .info { padding: 1.25rem; }
          .url { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .window { transform: none !important; transition: none; }
          .tab-bar-fill { animation: none; transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
