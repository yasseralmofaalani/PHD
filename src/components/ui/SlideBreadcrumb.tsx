import React from "react";

interface SlideBreadcrumbProps {
  part: string;
  partLabel: string;
  chapter?: string;
  variant?: "light" | "dark";
}

const SlideBreadcrumb: React.FC<SlideBreadcrumbProps> = () => {
  // Breadcrumb is already displayed globally in the top header bar (TopBar).
  return null;
};

export default SlideBreadcrumb;
