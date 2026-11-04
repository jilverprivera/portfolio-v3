'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { gsap } from 'gsap';

import './CircularText.css';

const HOVER_SPEED = { slowDown: 0.5, speedUp: 4, pause: 0, goBonkers: 20 };
const MAX_FLING = 1440;

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

const REDUCE = '(prefers-reduced-motion: reduce)';
const subscribeReduced = onChange => {
  const query = window.matchMedia(REDUCE);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};
const useReducedMotion = () =>
  useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCE).matches, () => false);

const follow = (ref, prop, vars) => ({
  set: value => ref.current && gsap.to(ref.current, { [prop]: value, overwrite: 'auto', ...vars })
});

const CircularText = ({
  text,
  spinDuration = 20,
  onHover = 'speedUp',
  direction = 'clockwise',
  size = 200,
  fontSize = 24,
  fontWeight = 900,
  letterSpacing = 0,
  color = '',
  startAngle = 0,
  fill = true,
  repeat = 1,
  ring = false,
  ringColor = '',
  tilt = 0,
  hoverTilt = 0,
  draggable = false,
  children,
  className = ''
}) => {
  const rootRef = useRef(null);
  const tiltRef = useRef(null);
  const ringRef = useRef(null);
  const glyphRefs = useRef([]);
  const stateRef = useRef({
    dragging: false,
    hovering: false,
    fling: 0,
    cruise: 0,
    angle: null,
    travel: 0,
    samples: []
  });
  const [advances, setAdvances] = useState(null);
  const [settled, setSettled] = useState(false);
  const [dragging, setDragging] = useState(false);
  const reduceMotion = useReducedMotion();
  // The ring's angle and its speed multiplier live outside React: GSAP eases the speed, and the ticker turns the ring.
  const motionRef = useRef({ rotation: 0, speed: 1 });
  const rotation = useMemo(
    () => ({
      get: () => motionRef.current.rotation,
      set: value => {
        motionRef.current.rotation = value;
        if (ringRef.current) gsap.set(ringRef.current, { rotation: value });
      }
    }),
    []
  );
  const speed = useMemo(
    () => ({
      get: () => motionRef.current.speed,
      set: value => gsap.to(motionRef.current, { speed: value, duration: 0.9, ease: 'power2.out', overwrite: true })
    }),
    []
  );
  // Scale and tilt follow the pointer with short eased tweens, which feel like the springs they replace.
  const scale = useMemo(() => follow(tiltRef, 'scale', { duration: 0.45, ease: 'back.out(2.2)' }), []);
  const tiltX = useMemo(() => follow(tiltRef, 'rotationX', { duration: 0.6, ease: 'power3.out' }), []);
  const tiltY = useMemo(() => follow(tiltRef, 'rotationY', { duration: 0.6, ease: 'power3.out' }), []);

  const glyphs = useMemo(() => Array.from(text ?? ''), [text]);
  const copies = Math.max(1, Math.round(repeat) || 1);
  const letters = useMemo(() => Array.from({ length: copies }, () => glyphs).flat(), [glyphs, copies]);

  const angles = useMemo(() => {
    const count = glyphs.length;
    if (!count) return [];
    if (fill) return letters.map((_, i) => startAngle + (360 / letters.length) * i);
    const known = advances && advances.length === count ? advances : null;
    const toDegrees = 180 / (Math.PI * Math.max(size / 2 - fontSize * 0.6, 1));
    const arcs = glyphs.map((glyph, i) => {
      const width = known ? known[i] : fontSize * (glyph === ' ' ? 0.3 : 0.6);
      return Math.max(0, width + letterSpacing * fontSize) * toDegrees;
    });
    const span = arcs.reduce((sum, arc) => sum + arc, 0);
    const fit = span > 0 ? Math.min(1, 360 / (span * copies)) : 1;
    const result = [];
    for (let copy = 0; copy < copies; copy += 1) {
      let cursor = startAngle + (360 / copies) * copy - (arcs[0] * fit) / 2;
      for (let i = 0; i < count; i += 1) {
        const arc = arcs[i] * fit;
        result.push(cursor + arc / 2);
        cursor += arc;
      }
    }
    return result;
  }, [glyphs, letters, copies, fill, startAngle, size, fontSize, letterSpacing, advances]);

  useIsomorphicLayoutEffect(() => {
    if (fill) return undefined;
    let alive = true;
    const measure = () => {
      if (!alive) return;
      const widths = glyphs.map((_, i) => glyphRefs.current[i]?.offsetWidth ?? 0);
      setAdvances(prev =>
        prev && prev.length === widths.length && prev.every((width, i) => width === widths[i]) ? prev : widths
      );
    };
    measure();
    document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      alive = false;
    };
  }, [fill, glyphs, fontSize, fontWeight, className]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setSettled(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const state = stateRef.current;
    const turn = direction === 'counterclockwise' ? -1 : 1;
    state.cruise = spinDuration > 0 && !reduceMotion ? (360 / spinDuration) * turn : 0;
    if (!root || reduceMotion) return undefined;

    const spin = (_time, delta) => {
      if (state.dragging) return;
      const dt = Math.min(delta, 100) / 1000;
      state.fling *= Math.exp(-dt / 0.7);
      if (Math.abs(state.fling) < 1) state.fling = 0;
      const velocity = state.cruise * speed.get() + state.fling;
      if (velocity) rotation.set((rotation.get() + velocity * dt) % 360);
    };

    let running = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting === running) return;
      running = entry.isIntersecting;
      if (running) gsap.ticker.add(spin);
      else gsap.ticker.remove(spin);
    });
    observer.observe(root);

    return () => {
      observer.disconnect();
      gsap.ticker.remove(spin);
    };
  }, [spinDuration, direction, reduceMotion, rotation, speed]);

  useEffect(() => {
    if (hoverTilt && !reduceMotion) return;
    tiltX.set(0);
    tiltY.set(0);
  }, [hoverTilt, reduceMotion, tiltX, tiltY]);

  const applyScale = () => {
    const state = stateRef.current;
    const bonkers = state.hovering && onHover === 'goBonkers' && !reduceMotion;
    scale.set((bonkers ? 0.8 : 1) * (state.dragging ? 0.96 : 1));
  };

  const pointerAngle = e => {
    const root = rootRef.current;
    if (!root) return null;
    const rect = root.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    if (Math.hypot(dx, dy) < rect.width * 0.06) return null;
    return (Math.atan2(dy, dx) * 180) / Math.PI;
  };

  const handleEnter = () => {
    stateRef.current.hovering = true;
    if (onHover && !reduceMotion) speed.set(HOVER_SPEED[onHover] ?? 1);
    applyScale();
  };

  const handleLeave = () => {
    stateRef.current.hovering = false;
    speed.set(1);
    tiltX.set(0);
    tiltY.set(0);
    applyScale();
  };

  const handleMove = e => {
    const state = stateRef.current;
    const root = rootRef.current;
    if (!root) return;

    if (state.dragging) {
      const angle = pointerAngle(e);
      if (angle !== null) {
        if (state.angle !== null) {
          let delta = angle - state.angle;
          if (delta > 180) delta -= 360;
          if (delta < -180) delta += 360;
          state.travel += delta;
          rotation.set((rotation.get() + delta) % 360);
          state.samples.push([e.timeStamp, state.travel]);
          while (state.samples.length > 2 && e.timeStamp - state.samples[0][0] > 100) state.samples.shift();
        }
        state.angle = angle;
      }
    }

    if (!hoverTilt || reduceMotion || e.pointerType === 'touch') return;
    const rect = root.getBoundingClientRect();
    const nx = clamp(((e.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
    const ny = clamp(((e.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
    tiltX.set(-ny * hoverTilt);
    tiltY.set(nx * hoverTilt);
  };

  const handleDown = e => {
    if (!draggable || (e.pointerType === 'mouse' && e.button !== 0)) return;
    const state = stateRef.current;
    state.dragging = true;
    state.fling = 0;
    state.angle = pointerAngle(e);
    state.travel = 0;
    state.samples = [[e.timeStamp, 0]];
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setDragging(true);
    applyScale();
  };

  const handleUp = e => {
    const state = stateRef.current;
    if (!state.dragging) return;
    state.dragging = false;
    setDragging(false);
    applyScale();
    const [startTime, startTravel] = state.samples[0];
    const lastTime = state.samples[state.samples.length - 1][0];
    const elapsed = e.timeStamp - startTime;
    const velocity = elapsed > 0 && e.timeStamp - lastTime < 80 ? ((state.travel - startTravel) / elapsed) * 1000 : 0;
    state.fling = reduceMotion ? 0 : clamp(velocity, -MAX_FLING, MAX_FLING) - state.cruise * speed.get();
  };

  return (
    <div
      ref={rootRef}
      className={`circular-text ${className}`}
      data-settled={settled ? '' : undefined}
      style={{
        width: size,
        height: size,
        fontSize,
        fontWeight,
        color: color || undefined,
        perspective: size * 2.5,
        cursor: draggable ? (dragging ? 'grabbing' : 'grab') : undefined,
        touchAction: draggable ? 'none' : undefined,
        userSelect: draggable ? 'none' : undefined,
        WebkitUserSelect: draggable ? 'none' : undefined
      }}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      onPointerMove={handleMove}
      onPointerDown={handleDown}
      onPointerUp={handleUp}
      onPointerCancel={handleUp}
    >
      <div ref={tiltRef} className="circular-text__tilt">
        <div className="circular-text__plane" style={{ transform: tilt ? `rotateX(${tilt}deg)` : undefined }}>
          <span
            className="circular-text__line"
            style={{
              borderWidth: Math.max(1, fontSize / 16),
              borderColor: ringColor || undefined,
              opacity: ring ? 1 : 0
            }}
          />
          <div ref={ringRef} className="circular-text__ring" role="img" aria-label={text}>
            {letters.map((letter, i) => (
              <span key={i} className="circular-text__letter" style={{ transform: `rotate(${angles[i] ?? 0}deg)` }}>
                <span
                  ref={
                    i < glyphs.length
                      ? el => {
                          glyphRefs.current[i] = el;
                        }
                      : undefined
                  }
                >
                  {letter}
                </span>
              </span>
            ))}
          </div>
        </div>
        {children != null && children !== false ? <div className="circular-text__center">{children}</div> : null}
      </div>
    </div>
  );
};

export default CircularText;
