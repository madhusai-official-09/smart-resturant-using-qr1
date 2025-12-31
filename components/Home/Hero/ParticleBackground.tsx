"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

interface ParticlesHeroProps {
  className?: string;
}

export default function ParticlesHero({ className }: ParticlesHeroProps) {
  const [init, setInit] = useState(false);

  // ⭐ CHOOSE EFFECT
  const MODE: "GALAXY" | "RAIN" | "COMET" | "SNOW" = "SNOW";

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesLoaded = async (_?: Container) => {};

  const options: ISourceOptions = useMemo(() => {
    // 🌨️ SNOW MODE
    if (MODE === "SNOW") {
      return {
        background: { color: "transparent" },
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
          number: { value: 120, density: { enable: true, area: 800 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.9, random: true },
          size: { value: { min: 1, max: 4 }, random: true },
          move: {
            enable: true,
            direction: "bottom",
            speed: 1.2,
            straight: false,
            outModes: { default: "out" },
            drift: 0
          }
        },
        detectRetina: true
      };
    }

    // 🌧️ RAIN MODE
    if (MODE === "RAIN") {
      return {
        background: { color: "transparent" },
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
          number: { value: 75, density: { enable: true, area: 900 } },
          color: { value: ["#ffb347", "#ff7b00", "#ffd166", "#ffa600"] },
          links: { enable: false },
          move: {
            enable: true,
            direction: "bottom",
            speed: 4,
            straight: true,
            outModes: { default: "out" },
            drift: 1.5
          },
          opacity: { value: 0.9 },
          shape: { type: ["circle", "triangle"] },
          size: { value: { min: 3, max: 9 } }
        },
        detectRetina: true
      };
    }

    // 💥 COMET MODE
    if (MODE === "COMET") {
      return {
        background: { color: "transparent" },
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
          number: { value: 60, density: { enable: true, area: 900 } },
          color: { value: ["#ffb347", "#ff7b00", "#ffd166", "#ffa600"] },
          links: { enable: false },
          move: {
            enable: true,
            speed: 4,
            random: true,
            direction: "none",
            outModes: { default: "out" },
            trail: { enable: true, length: 8, fillColor: "#000000" }
          },
          opacity: { value: 1 },
          shadow: { enable: true, color: "#ff8c00", blur: 10 },
          size: { value: { min: 4, max: 12 } },
          shape: { type: ["circle", "star"] }
        },
        detectRetina: true
      };
    }

    // 🌪️ GALAXY DEFAULT
    return {
      background: { color: "transparent" },
      fullScreen: { enable: false },
      fpsLimit: 60,
      particles: {
        number: { value: 90, density: { enable: true, area: 900 } },
        color: { value: ["#ffb347", "#ff7b00", "#ffd166", "#ffa600"] },
        links: { enable: false },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          outModes: { default: "out" },
          orbit: {
            enable: true,
            rotation: 45,
            color: "#ff8c00",
            width: 1,
            opacity: 1
          }
        },
        rotate: {
          random: true,
          animation: { enable: true, speed: 10 }
        },
        opacity: { value: 0.9 },
        shape: {
          type: ["circle", "star", "polygon"],
          polygon: { sides: 5 }
        },
        size: { value: { min: 3, max: 10 } }
      },
      detectRetina: true
    };
  }, [MODE]);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={options}
      className={className ?? "absolute inset-0 pointer-events-none"}
    />
  );
}
