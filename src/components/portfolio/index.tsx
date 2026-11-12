import React, { ReactNode, useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import ParticlesBackground from "../particleBackground";
import {
  profile,
  sections,
  experience,
  projects,
  skills,
  certifications,
  education,
} from "../../data/resume";

function Arrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 18 18 6M6 6h12v12" />
    </svg>
  );
}

function SocialIcon({ name }: { name: "github" | "linkedin" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === "linkedin" ? (
        <>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M7.5 10v7m0-10v.1M11 17v-7m0 3c0-4 6-4 6 0v4" />
        </>
      ) : (
        <path d="M9 19c-4.3 1.3-4.3-2-6-2m12 5v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.9a5.4 5.4 0 0 0-1.5-3.7 5 5 0 0 0-.1-3.7s-1.2-.4-3.8 1.4a12.8 12.8 0 0 0-6.9 0C5.4.8 4.2 1.2 4.2 1.2a5 5 0 0 0-.1 3.7A5.4 5.4 0 0 0 2.6 8.6c0 5.4 3.2 6.6 6.2 6.9a3.4 3.4 0 0 0-.9 2.6V22" />
      )}
    </svg>
  );
}

function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <Arrow />
    </a>
  );
}

function ResumeSection({ id, children }: { id: string; children: ReactNode }) {
  const index = sections.findIndex((section) => section.id === id);
  return (
    <section
      className="resume-section reveal"
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <div className="section-heading">
        <span className="section-index" aria-hidden="true">
          {String(index).padStart(2, "0")}
        </span>
        <h2 id={`${id}-title`}>{sections[index]?.label}</h2>
        <span className="heading-line" />
      </div>
      {children}
    </section>
  );
}

export default function Portfolio({
  initialSection,
}: {
  initialSection?: string;
}) {
  const router = useRouter();
  const [active, setActive] = useState("about");
  const requestedSection = useRef(false);
  const navigation = useRef<HTMLElement>(null);
  const navigationTarget = useRef<string | null>(null);

  useEffect(() => {
    const nav = navigation.current;
    if (!nav || !matchMedia("(max-width: 720px)").matches) return;
    const link = nav.querySelector('[aria-current="location"]');
    if (!link) return;
    const item = link.getBoundingClientRect(),
      bounds = nav.getBoundingClientRect();
    nav.scrollTo({
      left:
        nav.scrollLeft +
        item.left -
        bounds.left -
        (bounds.width - item.width) / 2,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, [active]);

  useEffect(() => {
    if (!initialSection || !router.isReady || requestedSection.current) return;
    requestedSection.current = true;
    router
      .replace(`/#${initialSection}`, undefined, { scroll: false })
      .then(() => {
        document
          .getElementById(initialSection)
          ?.scrollIntoView({ behavior: "auto" });
      });
  }, [initialSection, router]);

  useEffect(() => {
    let frame = 0;
    function update() {
      if (navigationTarget.current) {
        frame = 0;
        return;
      }
      let current = "about";
      for (const section of sections) {
        if (
          (document.getElementById(section.id)?.getBoundingClientRect().top ??
            Infinity) <=
          innerHeight * 0.3
        )
          current = section.id;
      }
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 8)
        current = "contact";
      setActive(current);
      frame = 0;
    }
    function scroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    function manualScroll(event: Event) {
      if (
        event instanceof KeyboardEvent &&
        ![
          "ArrowUp",
          "ArrowDown",
          "PageUp",
          "PageDown",
          "Home",
          "End",
          " ",
        ].includes(event.key)
      )
        return;
      navigationTarget.current = null;
      scroll();
    }
    function hashNavigation() {
      const id = window.location.hash.slice(1);
      if (sections.some((section) => section.id === id)) {
        navigationTarget.current = id;
        setActive(id);
      } else {
        navigationTarget.current = null;
        scroll();
      }
    }
    update();
    hashNavigation();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    window.addEventListener("wheel", manualScroll, { passive: true });
    window.addEventListener("touchmove", manualScroll, { passive: true });
    window.addEventListener("keydown", manualScroll);
    window.addEventListener("pointerdown", manualScroll, { passive: true });
    window.addEventListener("popstate", hashNavigation);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      window.removeEventListener("wheel", manualScroll);
      window.removeEventListener("touchmove", manualScroll);
      window.removeEventListener("keydown", manualScroll);
      window.removeEventListener("pointerdown", manualScroll);
      window.removeEventListener("popstate", hashNavigation);
    };
  }, []);

  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 },
    );
    document.documentElement.classList.add("scroll-motion");
    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("scroll-motion");
    };
  }, []);

  return (
    <>
      <Head>
        <title>Ibrahim El Nemr | Software Engineer</title>
        <meta name="description" content={profile.bio} />
        <meta name="theme-color" content="#0b1020" />
      </Head>
      <a className="skip-link" href="#resume-content">
        Skip to content
      </a>
      <ParticlesBackground />
      <div className="ambient-light" aria-hidden="true" />
      <div className="page-layout">
        <aside className="section-nav">
          <p className="nav-caption">Ibrahim El Nemr</p>
          <nav ref={navigation} aria-label="Page sections">
            <ol>
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={() => {
                      navigationTarget.current = section.id;
                      setActive(section.id);
                    }}
                    className={active === section.id ? "current" : ""}
                    aria-current={
                      active === section.id ? "location" : undefined
                    }
                  >
                    <span className="nav-track" aria-hidden="true" />
                    <span className="nav-number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
        <main className="resume-content" id="resume-content">
          <section className="intro" id="about" aria-labelledby="about-title">
            <div className="intro-heading">
              <h1 id="about-title">
                Ibrahim <span>El Nemr.</span>
              </h1>
              <img
                className="profile-photo"
                src={profile.avatar}
                alt="Ibrahim El Nemr"
                width="104"
                height="104"
              />
            </div>
            <p className="intro-bio">{profile.bio}</p>
            <div className="intro-links">
              <ExternalLink href={profile.github}>
                <SocialIcon name="github" />
                GitHub
              </ExternalLink>
              <ExternalLink href={profile.linkedin}>
                <SocialIcon name="linkedin" />
                LinkedIn
              </ExternalLink>
              <a href={`mailto:${profile.email}`}>
                Email <Arrow />
              </a>
            </div>
            <a className="scroll-note" href="#experience">
              Scroll to explore <span aria-hidden="true">↓</span>
            </a>
          </section>
          <ResumeSection id="experience">
            <div className="experience-list">
              {experience.map((job) => (
                <article className="experience-entry" key={job.company}>
                  <div className="entry-top">
                    <div>
                      <h3>{job.company}</h3>
                      <p className="entry-role">{job.role}</p>
                    </div>
                    <span className="entry-date">{job.date}</span>
                  </div>
                  <ul>
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </ResumeSection>
          <ResumeSection id="projects">
            <div className="project-list">
              {projects.map((project) => (
                <article className="project-entry" key={project.name}>
                  <div className="entry-top">
                    <h3>
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.name}
                        <Arrow />
                      </a>
                    </h3>
                    <span className="project-type">{project.type}</span>
                  </div>
                  <p>{project.description}</p>
                  <div className="project-bottom">
                    <span className="project-stack">{project.stack}</span>
                    <ExternalLink href={project.href}>
                      {project.linkLabel}
                    </ExternalLink>
                  </div>
                </article>
              ))}
            </div>
            <ExternalLink
              className="all-projects"
              href={`${profile.github}?tab=repositories`}
            >
              All repositories on GitHub
            </ExternalLink>
          </ResumeSection>
          <ResumeSection id="skills">
            <dl className="skills-list">
              {skills.map((group) => (
                <div className="skill-group" key={group.label}>
                  <dt>{group.label}</dt>
                  <dd>
                    {group.items.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </ResumeSection>
          <ResumeSection id="certifications">
            <div className="credential-list">
              {certifications.map((cert) => (
                <a
                  className="credential"
                  key={cert.title}
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="credential-icon" aria-hidden="true">
                    ✧
                  </span>
                  <span>
                    <h3>{cert.title}</h3>
                    <span className="credential-issuer">{cert.issuer}</span>
                  </span>
                  <Arrow />
                </a>
              ))}
            </div>
          </ResumeSection>
          <ResumeSection id="education">
            <div className="education-list">
              {education.map((item) => (
                <article className="education-entry" key={item.institution}>
                  <div className="entry-top">
                    <h3>{item.institution}</h3>
                    <span className="entry-date">{item.date}</span>
                  </div>
                  <p>{item.qualification}</p>
                </article>
              ))}
            </div>
            <p className="languages">
              English &amp; Arabic · Fluent <span>French · Intermediate</span>
            </p>
          </ResumeSection>
          <ResumeSection id="contact">
            <p className="contact-copy">{profile.contact}</p>
            <a className="contact-email" href={`mailto:${profile.email}`}>
              {profile.email}
              <Arrow />
            </a>
            <div className="contact-links">
              <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
              <ExternalLink href={profile.github}>GitHub</ExternalLink>
            </div>
          </ResumeSection>
          <footer className="resume-footer">
            <span>© {new Date().getFullYear()} Ibrahim El Nemr</span>
            <a href="#about">Back to top ↑</a>
          </footer>
        </main>
      </div>
    </>
  );
}
