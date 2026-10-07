import React from "react";

/** Shared slide canvas: clean parchment, no mesh or grid. */
export const ParchmentBackdrop: React.FC = () => (
  <div
    aria-hidden
    style={{
      position: "absolute",
      inset: 0,
      background: "#edebe0",
      pointerEvents: "none",
      zIndex: 0,
    }}
  />
);
