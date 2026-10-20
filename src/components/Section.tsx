import type { ReactNode } from "react";
import styles from "./Layout.module.css";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  withContainer?: boolean;
  fullHeight?: boolean;
  centered?: boolean;
  withDefaultSpacing?: boolean;
  snap?: boolean;
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
  snap = true,
}: SectionProps) {
  const sectionClassName = cx(
    styles.section,
    withDefaultSpacing ? "py-24" : undefined,
    fullHeight ? styles.fullHeight : undefined,
    centered ? "flex items-center" : undefined,
    snap ? "snap-start snap-always" : undefined,
    className,
  );

  return (
    <section id={id} className={sectionClassName}>
      {withContainer ? (
        <div className={cx(styles.container, "mx-auto w-full", contentClassName)}>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
