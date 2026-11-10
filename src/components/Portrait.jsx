import { useRef } from "react";
import { profile } from "../data/profile.js";
import Icon from "./Icon.jsx";

export default function Portrait() {
  const ref = useRef(null);
  function move(event) {
    if (
      event.pointerType === "touch" ||
      document.documentElement.dataset.motion === "paused" ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    ref.current.style.setProperty(
      "--mx",
      `${((event.clientX - bounds.left) / bounds.width - 0.5) * 18}px`,
    );
    ref.current.style.setProperty(
      "--my",
      `${((event.clientY - bounds.top) / bounds.height - 0.5) * 18}px`,
    );
  }
  function reset() {
    ref.current.style.setProperty("--mx", "0px");
    ref.current.style.setProperty("--my", "0px");
  }
  return (
    <div
      className="portrait-scene"
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      <div className="portrait-grid" aria-hidden="true" />
      <div className="portrait-orbit orbit-one" aria-hidden="true">
        <span />
      </div>
      <div className="portrait-orbit orbit-two" aria-hidden="true">
        <span />
      </div>
      <span className="scene-cross cross-one" aria-hidden="true">
        +
      </span>
      <span className="scene-cross cross-two" aria-hidden="true">
        +
      </span>
      <div className="portrait-photo">
        <img
          src={profile.avatar}
          alt="Ibrahim El Nemr"
          width="768"
          height="768"
          fetchPriority="high"
        />
        <div className="portrait-caption">
          <span className="status-dot" /> Always building something.
        </div>
      </div>
      <div className="floating-note note-code">
        <Icon name="code" size={18} />
        <span>full-stack &amp; beyond</span>
      </div>
      <div className="floating-note note-ai">
        <span className="sparkle" aria-hidden="true">
          ✳
        </span>
        <span>a little AI magic</span>
      </div>
      <div className="portrait-sticker" aria-hidden="true">
        <span>IDEAS INTO</span>
        <b>↗</b>
        <span>REAL THINGS</span>
      </div>
      <span className="scene-coordinate" aria-hidden="true">
        30.04° N · 31.24° E
      </span>
    </div>
  );
}
