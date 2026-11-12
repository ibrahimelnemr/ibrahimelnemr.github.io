import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";

export default function ParticlesBackground({
  paused = false,
}: {
  paused?: boolean;
}) {
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const container = useRef<Container>();
  const shouldPause = useRef(false);
  shouldPause.current = paused || reduced;

  useEffect(() => {
    let mounted = true;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener("change", update);
    initParticlesEngine((engine) => loadFull(engine)).then(() => {
      if (mounted) setReady(true);
    });
    return () => {
      mounted = false;
      preference.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (paused || reduced) container.current?.pause();
    else container.current?.play();
  }, [paused, reduced]);

  const loaded = useCallback(async (instance?: Container) => {
    container.current = instance;
    if (shouldPause.current) instance?.pause();
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: { color: { value: "#0b1020" } },
      fullScreen: { enable: true, zIndex: 0 },
      fpsLimit: 45,
      motion: { disable: true, reduce: { value: true, factor: 4 } },
      interactivity: {
        events: { onClick: { enable: false }, onHover: { enable: false } },
      },
      particles: {
        color: { value: "#93b1e8" },
        links: {
          color: "#93b1e8",
          distance: 150,
          enable: true,
          opacity: 0.12,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: { default: OutMode.out },
          speed: 0.45,
          straight: false,
        },
        number: { density: { enable: true }, value: 42 },
        opacity: { value: 0.25 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 2 } },
      },
      detectRetina: true,
    }),
    [],
  );

  return ready ? (
    <div aria-hidden="true" className="particle-background">
      <Particles id="tsparticles" particlesLoaded={loaded} options={options} />
    </div>
  ) : null;
}
