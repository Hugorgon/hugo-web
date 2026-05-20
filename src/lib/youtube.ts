/**
 * Parse a YouTube URL into a privacy-enhanced embed URL.
 *
 * Supported input forms:
 *   https://www.youtube.com/watch?v=<id>           (standard watch URL)
 *   https://youtu.be/<id>                          (short link)
 *   https://www.youtube.com/embed/<id>             (already an embed URL)
 *   https://www.youtube.com/shorts/<id>            (Shorts URL)
 *   https://m.youtube.com/...                      (mobile)
 *   <id>                                           (bare 11-char video ID)
 *
 * Extra `?t=`, `&list=`, etc. on the input are ignored — only the video ID is
 * extracted, then a clean embed URL is rebuilt. Returns `null` for empty,
 * malformed, or non-YouTube input so the caller can fall back to a placeholder.
 */
const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

const HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'music.youtube.com',
  'youtu.be',
]);

export function getYouTubeVideoId(input: string | undefined | null): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Bare 11-character ID
  if (YOUTUBE_ID.test(trimmed)) return trimmed;

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return null;
  }

  const host = url.hostname.toLowerCase();
  if (!HOSTS.has(host)) return null;

  // youtu.be/<id>
  if (host === 'youtu.be') {
    const id = url.pathname.slice(1).split('/')[0];
    return YOUTUBE_ID.test(id) ? id : null;
  }

  // watch?v=<id>
  const v = url.searchParams.get('v');
  if (v && YOUTUBE_ID.test(v)) return v;

  // /embed/<id> or /shorts/<id> or /v/<id> or /live/<id>
  const segments = url.pathname.split('/').filter(Boolean);
  if (segments.length >= 2) {
    const [kind, id] = segments;
    if (
      (kind === 'embed' || kind === 'shorts' || kind === 'v' || kind === 'live') &&
      YOUTUBE_ID.test(id)
    ) {
      return id;
    }
  }

  return null;
}

/**
 * Returns a privacy-enhanced embed URL (`youtube-nocookie.com`) for the given
 * input, or `null` if the input cannot be resolved to a YouTube video ID.
 */
export function getYouTubeEmbedUrl(input: string | undefined | null): string | null {
  const id = getYouTubeVideoId(input);
  if (!id) return null;
  return `https://www.youtube-nocookie.com/embed/${id}`;
}
