import type { ReactNode } from "react";

import "./SectionShell.css";

type SectionShellProps = {
  children: ReactNode;
  className?: string;
};

export const SectionShell = ({
  children,
  className = "",
}: SectionShellProps) => {
  const shellClassName = ["section-shell", className].filter(Boolean).join(" ");

  return <div className={shellClassName}>{children}</div>;
};
