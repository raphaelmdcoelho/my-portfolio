import { useState, type CSSProperties, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  count: number;
  label: string;
  /** Accessible label of each dot / slide, in order. */
  itemLabels: string[];
  labels: { previous: string; next: string; choose: string };
  stageHeight: string;
  stageHeightSmall?: string;
  renderCard: (index: number, active: boolean) => ReactNode;
}

const SWIPE_THRESHOLD = 60;

export default function Coverflow({
  count,
  label,
  itemLabels,
  labels,
  stageHeight,
  stageHeightSmall = stageHeight,
  renderCard,
}: Props) {
  const [index, setIndex] = useState(0);

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
      aria-label={label}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(index - 1);
        if (e.key === 'ArrowRight') go(index + 1);
      }}
    >
      <div
        className="carousel-stage"
        style={{ '--stage-h': stageHeight, '--stage-h-sm': stageHeightSmall } as CSSProperties}
      >
        {Array.from({ length: count }, (_, i) => {
          const offset = offsetOf(i);
          const active = offset === 0;
          const hidden = Math.abs(offset) > 1;
          return (
            <motion.article
              key={i}
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
              {renderCard(i, active)}
            </motion.article>
          );
        })}
      </div>

      <div className="carousel-controls">
        <button type="button" onClick={() => go(index - 1)} aria-label={labels.previous}>←</button>
        <div className="carousel-dots" role="tablist" aria-label={labels.choose}>
          {itemLabels.map((itemLabel, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={itemLabel}
              className={i === index ? 'dot active' : 'dot'}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button type="button" onClick={() => go(index + 1)} aria-label={labels.next}>→</button>
      </div>

      <style>{`
        .carousel { outline: none; }
        .carousel-stage {
          position: relative;
          height: var(--stage-h);
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
          .carousel-stage { height: var(--stage-h-sm); }
        }
      `}</style>
    </div>
  );
}
