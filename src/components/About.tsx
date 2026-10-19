"use client";

import Image from "next/image";
import { useT } from "@/contexts/LanguageContext";
import SectionHeading from "./SectionHeading";
import Section from "./Section";
import styles from "./About.module.css";
import glass from "./Glass.module.css";

export default function About() {
  const { t } = useT();
  const entries = [
    {
      id: "martin-glas",
      company: "Martin Glas",
      location: "Eindhoven",
      role: t.history_developer_role,
      period: t.history_martin_period,
      description: t.history_martin_desc,
      image: "/images/background/martin-glas.jpg",
      imagePosition: "center 76%",
    },
    {
      id: "basic-fit",
      company: "Basic-Fit",
      location: "Tilburg",
      role: t.history_developer_role,
      period: t.history_basicfit_period,
      description: t.history_basicfit_desc,
      image: "/images/background/basic-fit.jpg",
      imagePosition: "center 48%",
    },
    {
      id: "codam",
      company: "Codam Coding College",
      location: "Amsterdam",
      role: t.history_codam_role,
      period: t.history_codam_period,
      description: t.history_codam_desc,
      image: "/images/background/codam.jpg",
      imagePosition: "center 45%",
    },
  ];

  return (
    <Section id="about" withDefaultSpacing={false} className="px-6 py-20 md:py-16">
      <SectionHeading>{t.section_about}</SectionHeading>

      <div className="space-y-4">
        {entries.map((entry) => (
          <article key={entry.id} className={`${glass.surface} ${styles.entry}`} data-light-reactive aria-labelledby={`${entry.id}-title`}>
            <div className={styles.image} aria-hidden="true">
              <Image
                src={entry.image}
                alt=""
                fill
                unoptimized
                sizes="(max-width: 640px) 100vw, 650px"
                className="object-cover"
                style={{ objectPosition: entry.imagePosition }}
              />
            </div>

            <div className={`${styles.content} ${glass.copy}`} data-light-reactive>
              <p className="mb-2 text-xs font-medium tracking-wide text-muted">
                {entry.period}
              </p>
              <h3 id={`${entry.id}-title`} className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {entry.company}
              </h3>
              <p className="mt-1 text-xs font-medium text-accent-from sm:text-sm">
                {entry.role}<span className="mx-2 text-muted-2" aria-hidden="true">/</span>{entry.location}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {entry.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
