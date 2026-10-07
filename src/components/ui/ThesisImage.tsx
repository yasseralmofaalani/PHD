import React, { useState } from "react";
import { assetUrl } from "../../lib/assets";

interface ThesisImageProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Eager thesis-figure image. Never lazy-loads, never starts hidden.
 * Resolves paths with import.meta.env.BASE_URL for production / GitHub Pages.
 */
export const ThesisImage: React.FC<ThesisImageProps> = ({
  src,
  alt,
  style,
  className,
}) => {
  const [failed, setFailed] = useState(false);
  const href = assetUrl(src);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        style={{
          width: "100%",
          height: "100%",
          minHeight: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          fontWeight: 700,
          color: "rgba(15,23,42,0.55)",
          textAlign: "center",
          padding: 12,
          ...style,
        }}
      >
        {alt}
      </div>
    );
  }

  return (
    <img
      className={className}
      src={href}
      alt={alt}
      loading="eager"
      decoding="async"
      fetchPriority="high"
      onError={() => setFailed(true)}
      style={{
        display: "block",
        opacity: 1,
        visibility: "visible",
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
        ...style,
      }}
    />
  );
};
