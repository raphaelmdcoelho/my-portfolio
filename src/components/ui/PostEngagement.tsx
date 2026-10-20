import { useEffect, useRef, useState, type FormEvent } from 'react';
import { SUPABASE_KEY, SUPABASE_URL } from '../../data/supabase';
import type { Lang, ui } from '../../i18n/ui';

interface Props {
  postId: string;
  lang: Lang;
  labels: (typeof ui)['en']['engagement'];
}

interface Comment {
  id: string;
  name: string;
  body: string;
  created_at: string;
}

interface LikeStats {
  count: number;
  liked: boolean;
}

const headers = { apikey: SUPABASE_KEY, 'Content-Type': 'application/json' };

async function rpc<T>(fn: string, args: object): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(args),
  });
  if (!res.ok) throw new Error(`${fn}: ${res.status}`);
  return res.json();
}

/** Anonymous, per-browser id so one visitor counts once per post. */
function getVisitorId(): string {
  try {
    const saved = localStorage.getItem('blog-visitor-id');
    if (saved) return saved;
    const id = crypto.randomUUID();
    localStorage.setItem('blog-visitor-id', id);
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

/** Picks the singular or plural template and fills in the number (strings only: Astro can't pass functions to islands). */
const plural = (n: number, one: string, many: string) => (n === 1 ? one : many).replace('{n}', String(n));

export default function PostEngagement({ postId, lang, labels }: Props) {
  const visitor = useRef('');
  const [likes, setLikes] = useState<LikeStats | null>(null);
  const [likeBusy, setLikeBusy] = useState(false);
  const [likeFailed, setLikeFailed] = useState(false);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [trap, setTrap] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useEffect(() => {
    visitor.current = getVisitorId();
    rpc<LikeStats>('like_stats', { p_post: postId, p_visitor: visitor.current })
      .then(setLikes)
      .catch(() => setLikes({ count: 0, liked: false }));

    fetch(
      `${SUPABASE_URL}/rest/v1/comments?post_id=eq.${encodeURIComponent(postId)}` +
        '&select=id,name,body,created_at&order=created_at.asc',
      { headers },
    )
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(setComments)
      .catch(() => setLoadFailed(true));
  }, [postId]);

  const toggleLike = async () => {
    if (!likes || likeBusy) return;
    const next = !likes.liked;
    const previous = likes;
    setLikeBusy(true);
    setLikeFailed(false);
    setLikes({ count: Math.max(0, likes.count + (next ? 1 : -1)), liked: next });
    try {
      setLikes(await rpc<LikeStats>('set_like', { p_post: postId, p_visitor: visitor.current, p_liked: next }));
    } catch {
      setLikes(previous);
      setLikeFailed(true);
    } finally {
      setLikeBusy(false);
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    // Hidden field only bots fill in: pretend it worked.
    if (trap) {
      setStatus('sent');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/comments`, {
        method: 'POST',
        headers: { ...headers, Prefer: 'return=minimal' },
        body: JSON.stringify({ post_id: postId, name: name.trim(), body: body.trim() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setBody('');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const liked = likes?.liked ?? false;

  return (
    <section className="engage" aria-label={labels.commentsTitle}>
      <div className="like-row">
        <button
          type="button"
          className={liked ? 'like-btn liked' : 'like-btn'}
          onClick={toggleLike}
          disabled={!likes || likeBusy}
          aria-pressed={liked}
          aria-label={liked ? labels.unlike : labels.like}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 21s-7.5-4.6-9.6-9.3C.9 8.3 2.7 5 6 5c2 0 3.4 1.1 4.2 2.4h3.6C14.6 6.1 16 5 18 5c3.3 0 5.1 3.3 3.6 6.7C19.5 16.4 12 21 12 21z"
              fill={liked ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span className="like-count font-mono" aria-live="polite">
          {likes ? plural(likes.count, labels.likesOne, labels.likesMany) : '…'}
        </span>
        {likeFailed && <span className="note error" role="alert">{labels.likeError}</span>}
      </div>

      <h2 className="engage-title font-mono">
        {labels.commentsTitle}
        {comments && <span className="engage-count"> · {plural(comments.length, labels.commentsOne, labels.commentsMany)}</span>}
      </h2>

      {loadFailed && <p className="note error">{labels.loadError}</p>}
      {comments && comments.length === 0 && <p className="note">{labels.noComments}</p>}
      {comments && comments.length > 0 && (
        <ul className="comment-list">
          {comments.map((c) => (
            <li key={c.id} className="comment">
              <div className="comment-head">
                <span className="comment-name font-mono">{c.name}</span>
                <time className="comment-date font-mono" dateTime={c.created_at}>{formatDate(c.created_at)}</time>
              </div>
              <p className="comment-body">{c.body}</p>
            </li>
          ))}
        </ul>
      )}

      <form className="comment-form" onSubmit={submit}>
        <h3 className="form-title font-mono">{labels.formTitle}</h3>
        <label className="field">
          <span className="font-mono">{labels.nameLabel}</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={labels.namePlaceholder}
            maxLength={60}
            required
            autoComplete="name"
          />
        </label>
        <label className="field">
          <span className="font-mono">{labels.commentLabel}</span>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={labels.commentPlaceholder}
            maxLength={2000}
            rows={4}
            required
          />
        </label>
        {/* Honeypot: invisible to people, tempting to bots. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="trap"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
        />
        <div className="form-foot">
          <button type="submit" className="send font-mono" disabled={status === 'sending'}>
            {status === 'sending' ? labels.sending : labels.send}
          </button>
          <span className="note">{labels.moderationNote}</span>
        </div>
        {status === 'sent' && <p className="note ok" role="status">{labels.sent}</p>}
        {status === 'error' && <p className="note error" role="alert">{labels.sendError}</p>}
      </form>

      <style>{`
        .engage { margin-top: 4.5rem; padding-top: 2.5rem; border-top: 1px solid var(--color-border); }
        .like-row { display: flex; align-items: center; gap: 0.9rem; flex-wrap: wrap; margin-bottom: 2.5rem; }
        .like-btn {
          display: grid; place-items: center; width: 3rem; height: 3rem; border-radius: 9999px; cursor: pointer;
          color: var(--color-muted); background: var(--color-surface); border: 1px solid var(--color-border);
          transition: color 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .like-btn:hover:not(:disabled) { color: var(--color-accent); border-color: var(--color-accent); transform: translateY(-2px); }
        .like-btn.liked { color: var(--color-accent); border-color: var(--color-accent); box-shadow: 0 0 18px var(--color-accent-dim); }
        .like-btn.liked svg { animation: like-pop 0.35s ease; }
        .like-btn:disabled { cursor: progress; opacity: 0.7; }
        @keyframes like-pop { 0% { transform: scale(1); } 45% { transform: scale(1.3); } 100% { transform: scale(1); } }
        .like-count { color: var(--color-text); font-size: 0.9rem; }

        .engage-title { color: var(--color-text); font-size: 1.25rem; font-weight: 700; margin-bottom: 1.25rem; }
        .engage-count { color: var(--color-muted); font-weight: 400; font-size: 0.95rem; }
        .note { color: var(--color-muted); font-size: 0.85rem; line-height: 1.6; }
        .note.ok { color: var(--color-accent); margin-top: 0.9rem; }
        .note.error { color: #ff6b6b; }

        .comment-list { list-style: none; padding: 0; margin: 0 0 2.5rem; display: grid; gap: 0.9rem; }
        .comment { padding: 1rem 1.15rem; border-radius: 0.75rem; background: var(--color-surface); border: 1px solid var(--color-border); }
        .comment-head { display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 0.25rem 1rem; margin-bottom: 0.4rem; }
        .comment-name { color: var(--color-accent); font-size: 0.85rem; font-weight: 700; }
        .comment-date { color: var(--color-muted); font-size: 0.72rem; }
        .comment-body { color: var(--color-text); font-size: 0.92rem; line-height: 1.65; white-space: pre-wrap; overflow-wrap: anywhere; }

        .comment-form { margin-top: 2rem; display: grid; gap: 1rem; }
        .form-title { color: var(--color-text); font-size: 1rem; font-weight: 700; }
        .field { display: grid; gap: 0.4rem; }
        .field span { color: var(--color-muted); font-size: 0.75rem; }
        .field input, .field textarea {
          width: 100%; font: inherit; font-size: 0.92rem; color: var(--color-text);
          background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 0.6rem;
          padding: 0.7rem 0.9rem; outline: none; transition: border-color 0.2s, box-shadow 0.2s; resize: vertical;
        }
        .field input:focus, .field textarea:focus { border-color: var(--color-accent); box-shadow: 0 0 0 3px var(--color-accent-dim); }
        .trap { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
        .form-foot { display: flex; align-items: center; flex-wrap: wrap; gap: 0.75rem 1.25rem; }
        .send {
          font-size: 0.82rem; font-weight: 700; cursor: pointer; padding: 0.65rem 1.3rem; border-radius: 9999px;
          color: var(--color-bg); background: var(--color-accent); border: 1px solid var(--color-accent);
          transition: box-shadow 0.2s, transform 0.2s, opacity 0.2s;
        }
        .send:hover:not(:disabled) { box-shadow: 0 0 22px rgba(0, 255, 224, 0.45); transform: translateY(-2px); }
        .send:disabled { opacity: 0.6; cursor: progress; }
        @media (prefers-reduced-motion: reduce) {
          .like-btn, .like-btn:hover, .send, .send:hover { transition: none; transform: none; }
          .like-btn.liked svg { animation: none; }
        }
      `}</style>
    </section>
  );
}
