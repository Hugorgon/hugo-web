import {
  useEffect,
  useRef,
  useState,
  type ImgHTMLAttributes,
  type SyntheticEvent,
} from 'react';
import { ImageOff } from 'lucide-react';

/**
 * <img> with a graceful fallback that matches the Hugo dark theme.
 *
 * If the network image fails to load, the component swaps to a card-surface
 * coloured placeholder with a muted icon, so the cinematic dark aesthetic is
 * preserved instead of flashing a light gray block on the page.
 *
 * Loading polish:
 * - Image renders at opacity 0 and fades to 100 over 700ms on load, so cards
 *   never "pop" — they reveal against the matching dark surface beneath.
 * - Cached images detect `complete` on mount and skip the fade entirely,
 *   so revisits feel instant.
 * - `decoding="async"` lets the browser decode off the main thread.
 *
 * Drop-in replacement for any <img>: same props, same className/style, same
 * sizing — only the error path and the entry transition differ from the
 * platform default.
 */
export function ImageWithFallback(props: ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false);
  const [didLoad, setDidLoad] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const { src, alt, style, className, onLoad, ...rest } = props;

  // Catch images that finished loading before React attached onLoad
  // (typically when the browser has them cached).
  useEffect(() => {
    const node = imgRef.current;
    if (node && node.complete && node.naturalWidth > 0) {
      setDidLoad(true);
    }
  }, [src]);

  if (didError) {
    return (
      <div
        className={`flex items-center justify-center bg-[#161618] text-[#9CA3AF] ${className ?? ''}`}
        style={style}
        role="img"
        aria-label={typeof alt === 'string' ? alt : 'Obrázek není dostupný'}
        data-original-url={src}
      >
        <ImageOff size={32} aria-hidden="true" />
      </div>
    );
  }

  function handleLoad(event: SyntheticEvent<HTMLImageElement>) {
    setDidLoad(true);
    onLoad?.(event);
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      decoding="async"
      {...rest}
      className={`${className ?? ''} transition duration-700 ease-soft ${didLoad ? 'opacity-100' : 'opacity-0'}`}
      style={style}
      onLoad={handleLoad}
      onError={() => setDidError(true)}
    />
  );
}
