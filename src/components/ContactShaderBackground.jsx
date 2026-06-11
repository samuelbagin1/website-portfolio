import React, { useEffect, useState } from "react";
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";

export default function ContactShaderBackground() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return (
    <ShaderGradientCanvas
      style={{ position: "absolute", inset: 0 }}
      pixelDensity={Math.min(window.devicePixelRatio || 1, 2.7)}
      fov={45}
      pointerEvents="none"
      powerPreference="high-performance"
    >
      <ShaderGradient
        control="props"
        animate={reduceMotion ? "off" : "on"}
        brightness={0.9}
        cAzimuthAngle={180}
        cDistance={3.6}
        cPolarAngle={90}
        cameraZoom={1}
        color1="#ff3df2"
        color2="#ff0d62"
        color3="#1646e1"
        envPreset="lobby"
        grain="off"
        lightType="env"
        positionX={-1.4}
        positionY={0}
        positionZ={0}
        range="disabled"
        rangeEnd={40}
        rangeStart={0}
        reflection={0.2}
        rotationX={0}
        rotationY={10}
        rotationZ={50}
        shader="defaults"
        type="waterPlane"
        uAmplitude={1}
        uDensity={2.3}
        uFrequency={5.5}
        uSpeed={0.3}
        uStrength={1.7}
        uTime={0}
        wireframe={false}
      />
    </ShaderGradientCanvas>
  );
}
