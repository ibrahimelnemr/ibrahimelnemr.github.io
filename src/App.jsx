import { useEffect, useRef, useState } from "react";
import { apps, capabilities, experience, profile } from "./data/profile.js";
import Icon from "./components/Icon.jsx";
import Portrait from "./components/Portrait.jsx";
import Projects from "./components/Projects.jsx";

function usePageMotion() {
  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || "light",
  );
  const [active, setActive] = useState("");
  const menuButton = useRef(null);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content =
      theme === "dark" ? "#17191c" : "#f7f6f2";
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      /* Theme still works without storage. */
    }
  }, [theme]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    function close(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menuOpen]);
  return (
    <header className="site-header">
      <div className="nav-shell">
        <a
          className="wordmark"
          href="#home"
          aria-label="Ibrahim El Nemr, home"
          onClick={() => setMenuOpen(false)}
        >
          <span className="monogram">
            ie<span>.</span>
          </span>
          <span className="wordmark-name">Ibrahim El Nemr</span>
        </a>
        <nav
          className={menuOpen ? "navigation is-open" : "navigation"}
          id="main-navigation"
          aria-label="Main navigation"
        >
          {[
            ["work", "Work"],
            ["about", "About"],
            ["contact", "Contact"],
          ].map(([id, label]) => (
            <a
              href={`#${id}`}
              key={id}
              className={active === id ? "active" : ""}
              aria-current={active === id ? "location" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
              <span />
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="icon-button theme-toggle"
            type="button"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          >
            <Icon name={theme === "light" ? "moon" : "sun"} size={19} />
          </button>
          <a className="nav-hello" href={`mailto:${profile.email}`}>
            Say hello <Icon name="diagonal" size={16} />
          </a>
          <button
            ref={menuButton}
            className="icon-button menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero section" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="hero-intro">
          <span className="tiny-star" aria-hidden="true">
            ✳
          </span>
          <span className="eyebrow">
            SOFTWARE ENGINEER &amp; INDEPENDENT BUILDER
          </span>
        </div>
        <h1 id="hero-title">
          <em>Curiosity,</em>
          <br />
          put to work<span className="blue-dot">.</span>
        </h1>
        <p className="hero-description">{profile.bio}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#work">
            Explore my work <Icon name="down" size={18} />
          </a>
          <a
            className="hero-social"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ibrahim on GitHub"
          >
            <Icon name="github" size={21} />
          </a>
          <a
            className="hero-social"
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ibrahim on LinkedIn"
          >
            <Icon name="linkedin" size={21} />
          </a>
        </div>
      </div>
      <Portrait />
      <div className="hero-foot">
        <span>
          <span className="status-dot" /> Based in Cairo. Building for
          everywhere.
        </span>
        <a href="#work">
          A little further down <Icon name="down" size={14} />
        </a>
      </div>
    </section>
  );
}

function Ticker() {
  const words = [
    "Full-stack development",
    "Applied AI",
    "Mobile experiences",
    "Cloud technologies",
  ];
  return (
    <div className="ticker" role="img" aria-label={words.join(", ")}>
      <div className="ticker-track" aria-hidden="true">
        {[...words, ...words].map((word, index) => (
          <span key={index}>
            {word}
            <b>✳</b>
          </span>
        ))}
      </div>
    </div>
  );
}

function AppShowcase({ app }) {
  return (
    <article className={`app-showcase app-${app.id} reveal`}>
      <div className="app-story">
        <div className="app-identity">
          <img
            src={`/images/${app.id}-icon.jpg`}
            alt=""
            width="52"
            height="52"
            loading="lazy"
          />
          <div>
            <span className="eyebrow">{app.category}</span>
            <h3>{app.name}</h3>
          </div>
          <span className="app-number">/{app.number}</span>
        </div>
        <h4>
          {app.headline.split("\n").map((line, index) => (
            <span key={line}>
              {index > 0 && <br />}
              {line}
            </span>
          ))}
        </h4>
        <p>{app.description}</p>
        <div className="tags">
          {app.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="app-links">
          <a
            className="button button-dark"
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="apple" size={19} />
            View on the App Store <Icon name="diagonal" size={16} />
          </a>
          <a
            className="small-link"
            href={app.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            About the app <Icon name="diagonal" size={15} />
          </a>
        </div>
      </div>
      <div className="app-art">
        <span className="art-word" aria-hidden="true">
          {app.id === "translate" ? "hello." : "bonjour."}
        </span>
        <img
          className="app-shot shot-back"
          src={`/images/${app.id}-2.jpg`}
          alt={`${app.name} App Store preview showing another app feature`}
          width="637"
          height="1380"
          loading="lazy"
        />
        <img
          className="app-shot shot-front"
          src={`/images/${app.id}-1.jpg`}
          alt={
            app.id === "translate"
              ? "Beisa Translate translating Arabic to English privately on an iPhone"
              : "Beisa Learn running an on-device Spanish tutoring conversation"
          }
          width="637"
          height="1380"
          loading="lazy"
        />
        <span className="art-caption">
          <span className="status-dot" />
          {app.detail}
        </span>
      </div>
    </article>
  );
}

function Work() {
  return (
    <section
      className="section work-section"
      id="work"
      aria-labelledby="work-title"
    >
      <div className="section-top reveal">
        <span className="eyebrow">01 / SELECTED WORK</span>
        <span className="section-aside">
          Independently built. Out in the world.
        </span>
      </div>
      <div className="section-heading reveal">
        <h2 id="work-title">
          From “what if”
          <br />
          to <em>on your phone.</em>
        </h2>
        <p>
          Personal projects that became real products.
          <br />
          Designed, developed, and published by me.
        </p>
      </div>
      <div className="app-list">
        {apps.map((app) => (
          <AppShowcase app={app} key={app.id} />
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="section">
        <div className="section-top reveal">
          <span className="eyebrow">03 / THE PERSON BEHIND THE CODE</span>
          <span className="about-doodle" aria-hidden="true">
            ✳
          </span>
        </div>
        <div className="about-intro reveal">
          <h2 id="about-title">
            An engineer’s mind.
            <br />
            <em>A builder’s instinct.</em>
          </h2>
          <div className="about-copy">
            <p>
              I like understanding how things work. I like making them work even
              more.
            </p>
            <p>
              My work spans enterprise applications, AI-powered systems, and
              mobile apps of my own. I enjoy connecting the pieces—from a
              thoughtful interface to the services and intelligence behind it.
            </p>
            <p>
              Outside the code, I’m an Economics graduate from the American
              University in Cairo, with a minor in Computer Science. Different
              perspectives tend to make better software.
            </p>
          </div>
        </div>
        <div className="capabilities">
          {capabilities.map((item) => (
            <article className="capability reveal" key={item.title}>
              <span className="capability-number">/{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <div className="capability-tech">
                {item.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="experience-block reveal">
          <div className="experience-label">
            <span className="eyebrow">ALONG THE WAY</span>
            <p>
              Some places I’ve
              <br />
              put that into practice.
            </p>
          </div>
          <div className="experience-list">
            {experience.map((job) => (
              <article className="experience" key={job.company}>
                <div className="experience-title">
                  <h3>{job.company}</h3>
                  <span>{job.date}</span>
                </div>
                <span className="experience-role">{job.role}</span>
                <p>{job.description}</p>
              </article>
            ))}
            <div className="certification">
              <Icon name="globe" size={18} />
              <span>
                Google Cloud Certified{" "}
                <b>Professional Cloud Architect · Associate Cloud Engineer</b>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [copyState, setCopyState] = useState("idle");
  const timeout = useRef(null);
  useEffect(() => () => clearTimeout(timeout.current), []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setCopyState("idle"), 3500);
  }
  return (
    <section
      className="contact-section section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-top reveal">
        <span className="eyebrow">
          04 / GOOD THINGS START WITH A CONVERSATION
        </span>
        <span className="contact-sparkle" aria-hidden="true">
          ✳
        </span>
      </div>
      <h2 className="reveal" id="contact-title">
        Something in mind?
        <br />
        <a href={`mailto:${profile.email}`}>
          <em>Let’s talk.</em>
          <Icon name="diagonal" />
        </a>
      </h2>
      <div className="contact-bottom reveal">
        <p>{profile.contact}</p>
        <div className="email-row">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <button
            className="icon-button copy-button"
            type="button"
            onClick={copyEmail}
            aria-label="Copy email address"
          >
            <Icon name={copyState === "copied" ? "check" : "copy"} size={18} />
          </button>
          <span className="copy-status" role="status">
            {copyState === "copied"
              ? "Copied!"
              : copyState === "failed"
                ? "Please copy the address above."
                : ""}
          </span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const [time, setTime] = useState(() => new Date());
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "running";
  }, [paused]);
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);
  const cairoTime = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Cairo",
    hour: "2-digit",
    minute: "2-digit",
  }).format(time);
  return (
    <footer className="site-footer section">
      <div className="footer-signature">
        <a className="monogram" href="#home" aria-label="Back to top">
          ie<span>.</span>
        </a>
        <span>
          Built with curiosity.
          <br />© {time.getFullYear()} Ibrahim El Nemr
        </span>
      </div>
      <span className="footer-time">
        <span className="status-dot" /> Cairo, EG <time>{cairoTime}</time>
      </span>
      <div className="footer-links">
        <button
          className="motion-toggle"
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          {paused ? "Resume motion" : "Pause motion"}
        </button>
        <a href={profile.github} target="_blank" rel="noopener noreferrer">
          GitHub <Icon name="diagonal" size={14} />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn <Icon name="diagonal" size={14} />
        </a>
        <a href="#home" className="back-to-top" aria-label="Back to top">
          <Icon name="down" size={17} />
        </a>
      </div>
    </footer>
  );
}

export default function App() {
  usePageMotion();
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <Ticker />
        <Work />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
