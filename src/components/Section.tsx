import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  contained?: boolean;
};

export default function Section({ id, children, className = "", contained = true }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative py-32 md:py-40 px-6 ${className}`}
      style={{ scrollMarginTop: 96 }}
    >
      {contained ? (
        <div className="mx-auto w-full max-w-6xl">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
