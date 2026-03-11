import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  withContainer?: boolean;
  fullHeight?: boolean;
  centered?: boolean;
  withDefaultSpacing?: boolean;
};

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Section({
  id,
  children,
  className,
  contentClassName,
  withContainer = true,
  fullHeight = true,
  centered = true,
  withDefaultSpacing = true,
}: SectionProps) {
  const sectionClassName = cx(
    withDefaultSpacing ? "px-6 py-24" : undefined,
    fullHeight ? "min-h-screen" : undefined,
    centered ? "flex items-center" : undefined,
    className,
  );

  return (
    <section id={id} className={sectionClassName}>
      {withContainer ? (
        <div className={cx("mx-auto w-full max-w-5xl", contentClassName)}>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
