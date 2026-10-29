"use client";

import { useEffect, useRef } from "react";
import { Camera, Mesh, Plane, Program, Renderer, Texture } from "ogl";

// Port of olivierlarose/mouse-image-distortion to ogl: a plane that follows the mouse with a lag and bends
// in the direction of travel. The picture is about 22.5% of the viewport, as in the original.
const SIZE_FACTOR = 0.225;
const AMPLITUDE = 0.0005;
const FADE_SECONDS = 0.2;

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec2 uv;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform vec2 uDelta;
  uniform float uAmplitude;
  varying vec2 vUv;
  float PI = 3.141592653589793238;

  void main() {
    vUv = uv;
    vec3 newPosition = position;
    newPosition.x += sin(uv.y * PI) * uDelta.x * uAmplitude;
    newPosition.y += sin(uv.x * PI) * uDelta.y * uAmplitude;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uAlpha;

  void main() {
    vec3 color = texture2D(uTexture, vUv).rgb;
    gl_FragColor = vec4(color * uAlpha, uAlpha);
  }
`;

type Props = { images: Record<string, string>; active: string | null };

export function HoverImagePreview({ images, active }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef<string | null>(active);
  const imagesKey = JSON.stringify(images);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    // Touch screens have no hover, so there is nothing to follow.
    if (!canvas || !window.matchMedia("(hover: hover)").matches) return;

    const renderer = new Renderer({ canvas, alpha: true, premultipliedAlpha: true, dpr: Math.min(window.devicePixelRatio, 2) });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    const camera = new Camera(gl);

    const program = new Program(gl, {
      vertex,
      fragment,
      transparent: true,
      depthTest: false,
      uniforms: {
        uDelta: { value: [0, 0] },
        uAmplitude: { value: AMPLITUDE },
        uTexture: { value: new Texture(gl) },
        uAlpha: { value: 0 },
      },
    });
    // If the shader did not link, there is nothing to draw: leave the page as it is.
    if (!program.uniformLocations) return;
    program.setBlendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    const mesh = new Mesh(gl, { geometry: new Plane(gl, { width: 1, height: 1, widthSegments: 15, heightSegments: 15 }), program });

    const textures: Record<string, { texture: Texture; width: number; height: number }> = {};
    for (const [key, src] of Object.entries(JSON.parse(imagesKey) as Record<string, string>)) {
      const entry = { texture: new Texture(gl), width: 16, height: 10 };
      textures[key] = entry;
      const img = new Image();
      img.onload = () => {
        entry.texture.image = img;
        entry.width = img.naturalWidth;
        entry.height = img.naturalHeight;
        if (shown === key) fit(entry);
      };
      img.src = src;
    }

    // Same sizing as drei's useAspect: the image covers the viewport, scaled down by the factor.
    const fit = (entry: { width: number; height: number }) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const k = vw / vh > entry.width / entry.height ? vw / entry.width : vh / entry.height;
      mesh.scale.set(entry.width * k * SIZE_FACTOR, entry.height * k * SIZE_FACTOR, 1);
    };

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.orthographic({ left: -window.innerWidth / 2, right: window.innerWidth / 2, bottom: -window.innerHeight / 2, top: window.innerHeight / 2, near: -1, far: 1 });
      if (shown && textures[shown]) fit(textures[shown]);
    };
    let shown: string | null = null;
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    const onMove = (event: PointerEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    window.addEventListener("pointermove", onMove);

    let alpha = 0;
    let last = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const current = activeRef.current;
      if (current && current !== shown && textures[current]) {
        // A picture that shows up starts at the cursor instead of flying in from where it was left.
        if (alpha < 0.01) {
          smooth.x = mouse.x;
          smooth.y = mouse.y;
        }
        shown = current;
        program.uniforms.uTexture.value = textures[current].texture;
        fit(textures[current]);
      }

      // Opacity goes linearly to 1 or 0 in 0.2 seconds.
      const step = dt / FADE_SECONDS;
      alpha = current ? Math.min(1, alpha + step) : Math.max(0, alpha - step);
      if (alpha === 0 && !current) {
        gl.clear(gl.COLOR_BUFFER_BIT);
        return;
      }

      // The mouse is followed with a lag of 10% per frame, and the gap is what bends the plane.
      const dx = mouse.x - smooth.x;
      const dy = mouse.y - smooth.y;
      if (Math.abs(dx) > 1) {
        program.uniforms.uDelta.value = [dx, -dy];
        smooth.x += dx * 0.1;
        smooth.y += dy * 0.1;
      } else {
        program.uniforms.uDelta.value = [0, 0];
      }

      mesh.position.set(smooth.x - window.innerWidth / 2, window.innerHeight / 2 - smooth.y, 0);
      program.uniforms.uAlpha.value = alpha;
      renderer.render({ scene: mesh, camera });
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [imagesKey]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 h-dvh w-screen" />;
}
