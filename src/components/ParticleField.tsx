import React, { useEffect, useRef } from 'react';
// shortcut: @types/three is pinned to 0.170 (the last release that supports TypeScript 4.9) while the runtime is
// 0.187; only long-stable core APIs are used here. Unpin it when the project moves to TypeScript 5.
import type * as ThreeNS from 'three';

interface Props {
  start: boolean; // begin gathering the dust into the globe
  exit: React.MutableRefObject<number>; // hero scroll-exit progress, 0..1 (driven by GSAP in Hero)
}

const POINTS = 12000; // spread over the whole sphere; about half face the viewer at any time
const ASSEMBLE = 1.6; // seconds for one particle to fly home
const SPIN = 0.12; // rad/s around the vertical axis
const TILT = 0.38; // rad; the axis leans toward the viewer
const MOUSE_TILT = [0.35, 0.22]; // rad of extra yaw / pitch toward the pointer
const REPEL_R = 110; // px; the pointer pushes particles within this radius...
const REPEL_F = 38; // ...by up to this many px
const FOV = 35;
const ZOOM = 3.2; // extra sphere scale at the end of the scroll exit (it flies past the camera)

const GLOBE_VERT = /* glsl */ `
  uniform mat3 uRot;
  uniform vec3 uCenter;
  uniform vec2 uHalf;
  uniform float uTime;
  uniform float uZoom;
  uniform float uFade;
  uniform vec2 uPointer;
  uniform float uPush;
  uniform vec2 uRes;
  uniform float uDot;
  uniform float uPR;
  uniform vec3 uLight;
  attribute vec3 aHome;
  attribute float aTex;
  attribute float aDelay;
  attribute float aTint;
  varying float vAlpha;
  varying float vTint;

  void main() {
    vec3 s = uRot * position; // unit sphere, spun and tilted
    float p = clamp((uTime - aDelay) / ${ASSEMBLE.toFixed(2)}, 0.0, 1.0);
    float k = 1.0 - pow(1.0 - p, 3.0);
    vec3 world = mix(vec3(aHome.xy * uHalf, aHome.z), uCenter + s * uZoom, k);
    vec4 clip = projectionMatrix * modelViewMatrix * vec4(world, 1.0);

    // Push away from the pointer in screen pixels.
    vec2 px = vec2(clip.x / clip.w * 0.5 + 0.5, 0.5 - clip.y / clip.w * 0.5) * uRes;
    vec2 d = px - uPointer;
    float dist = max(length(d), 0.001);
    float f = uPush * k * pow(max(0.0, 1.0 - dist / ${REPEL_R.toFixed(1)}), 2.0) * ${REPEL_F.toFixed(1)};
    clip.xy += vec2(d.x, -d.y) / dist * f / uRes * 2.0 * clip.w;
    gl_Position = clip;

    float front = s.z; // toward the camera
    float lambert = max(0.0, dot(s, uLight));
    float b = min(1.0, (0.08 + 0.92 * pow(lambert, 1.2)) * aTex + pow(1.0 - max(front, 0.0), 4.0) * 0.35);
    float facing = front > 0.0 ? min(1.0, front * 5.0) : 0.09 * k; // far side stays faintly visible, for depth
    float a = (0.25 + 0.75 * k * b) * facing;
    float h = fract(sin(dot(vec2(aDelay * 997.0, floor(uTime * 30.0)), vec2(12.9898, 78.233))) * 43758.5453);
    if (h < 0.01) a *= 0.3; // shimmer
    vAlpha = a * uFade;
    vTint = aTint;
    float size = (1.2 + (uDot - 1.2) * k) * (0.75 + 0.35 * front) * mix(1.0, uZoom, 0.5 * k); // nearer = bigger
    gl_PointSize = max(1.0, size) * uPR;
  }
`;

const GLOBE_FRAG = /* glsl */ `
  varying float vAlpha;
  varying float vTint;
  void main() {
    vec3 c = mix(vec3(0.902, 0.910, 0.925), vec3(0.667, 0.722, 0.902), vTint); // grey-white, blue-grey
    gl_FragColor = vec4(c * vAlpha, vAlpha); // premultiplied
  }
`;

const STAR_VERT = /* glsl */ `
  uniform vec2 uHalf;
  uniform float uTime;
  uniform float uFade;
  uniform float uWarp;
  uniform float uPR;
  attribute vec2 aStar; // base alpha, phase
  varying float vAlpha;
  void main() {
    vec3 w = vec3(position.xy * uHalf * uWarp, position.z);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(w, 1.0);
    vAlpha = aStar.x * uFade * (0.65 + 0.35 * sin(uTime * 1.5 + aStar.y));
    gl_PointSize = 1.2 * uPR;
  }
`;

const STAR_FRAG = /* glsl */ `
  varying float vAlpha;
  void main() { gl_FragColor = vec4(vec3(vAlpha), vAlpha); }
`;

// A slowly spinning WebGL globe of square particles that gathers out of a dust field behind the hero word,
// plus a faint starfield. It leans toward the pointer and the pointer pushes particles aside; on the scroll
// exit it flies past the camera. Three.js is loaded on mount (during the intro), so it stays out of the main bundle.
const ParticleField: React.FC<Props> = ({ start, exit }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    if (start && startedAt.current === null) startedAt.current = performance.now();
  }, [start]);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    import('three')
      .then((THREE) => {
        if (!disposed && canvasRef.current) cleanup = mount(THREE, canvasRef.current, startedAt, exit);
      })
      .catch(() => {}); // chunk failed to load: the hero simply has no globe
    return () => {
      disposed = true;
      cleanup();
    };
  }, [exit]);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
};

function mount(
  THREE: typeof ThreeNS,
  canvas: HTMLCanvasElement,
  startedAt: React.MutableRefObject<number | null>,
  exit: React.MutableRefObject<number>
): () => void {
  let renderer: ThreeNS.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' });
  } catch {
    return () => {}; // no WebGL: the hero simply has no globe
  }
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);

  // Fibonacci sphere with a banded surface pattern, so the rotation reads.
  const pos = new Float32Array(POINTS * 3);
  const home = new Float32Array(POINTS * 3);
  const tex = new Float32Array(POINTS);
  const delay = new Float32Array(POINTS);
  const tint = new Float32Array(POINTS);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < POINTS; i++) {
    const y = 1 - (2 * (i + 0.5)) / POINTS;
    const r = Math.sqrt(1 - y * y);
    const phi = i * golden;
    pos.set([Math.cos(phi) * r, y, Math.sin(phi) * r], i * 3);
    const lat = Math.asin(y);
    const band = 0.5 + 0.5 * Math.sin(3 * phi + 2.2 * Math.sin(2 * lat)) * Math.cos(1.7 * lat);
    tex[i] = Math.min(1, (0.3 + 0.7 * band) * (0.75 + 0.5 * Math.random()));
    delay[i] = Math.random() * 0.8;
    tint[i] = Math.random() < 0.3 ? 1 : 0;
    home.set([Math.random() * 2 - 1, Math.random() * 2 - 1, (Math.random() * 2 - 1) * 0.6], i * 3); // scaled by uHalf
  }
  const globeGeo = new THREE.BufferGeometry();
  globeGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  globeGeo.setAttribute('aHome', new THREE.BufferAttribute(home, 3));
  globeGeo.setAttribute('aTex', new THREE.BufferAttribute(tex, 1));
  globeGeo.setAttribute('aDelay', new THREE.BufferAttribute(delay, 1));
  globeGeo.setAttribute('aTint', new THREE.BufferAttribute(tint, 1));

  const light = new THREE.Vector3(-0.5, 0.55, 0.67).normalize(); // upper left, in front
  const g = {
    uRot: { value: new THREE.Matrix3() },
    uCenter: { value: new THREE.Vector3() },
    uHalf: { value: new THREE.Vector2(1, 1) },
    uTime: { value: 0 },
    uZoom: { value: 1 },
    uFade: { value: 0 },
    uPointer: { value: new THREE.Vector2(-1e4, -1e4) },
    uPush: { value: 0 },
    uRes: { value: new THREE.Vector2(1, 1) },
    uDot: { value: 3 },
    uPR: { value: 1 },
    uLight: { value: light },
  };
  const blend = { transparent: true, depthTest: false, depthWrite: false, premultipliedAlpha: true };
  const globeMat = new THREE.ShaderMaterial({ uniforms: g, vertexShader: GLOBE_VERT, fragmentShader: GLOBE_FRAG, ...blend });
  scene.add(new THREE.Points(globeGeo, globeMat));

  const starGeo = new THREE.BufferGeometry();
  const s = { uHalf: g.uHalf, uTime: g.uTime, uPR: g.uPR, uFade: { value: 0 }, uWarp: { value: 1 } };
  const starMat = new THREE.ShaderMaterial({ uniforms: s, vertexShader: STAR_VERT, fragmentShader: STAR_FRAG, ...blend });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  let W = 0;
  let H = 0;
  let cx = 0;
  let cy = 0;
  const build = () => {
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    const pr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(pr);
    renderer.setSize(W, H, false);
    const R = Math.min(W * 0.42, H * 0.29); // globe radius in px
    cx = W / 2;
    cy = H * 0.42;
    // Put the camera where a unit sphere at the origin projects to R px, then lift the sphere to cy.
    const tanH = Math.tan((FOV * Math.PI) / 360);
    const dist = H / (2 * R * tanH);
    camera.aspect = W / H;
    camera.position.set(0, 0, dist);
    camera.updateProjectionMatrix();
    const halfH = dist * tanH;
    g.uHalf.value.set(halfH * camera.aspect, halfH);
    g.uCenter.value.set(0, (0.5 - 0.42) * 2 * halfH, 0);
    g.uRes.value.set(W, H);
    g.uDot.value = Math.max(1.6, R / 95);
    g.uPR.value = pr;

    const count = Math.round((W * H) / 4500);
    const sp = new Float32Array(count * 3);
    const sa = new Float32Array(count * 2);
    for (let i = 0; i < count; i++) {
      sp.set([Math.random() * 2 - 1, Math.random() * 2 - 1, 0], i * 3); // on the globe's plane, so they fill the view
      sa.set([0.08 + Math.random() * 0.4, Math.random() * 6.28], i * 2);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
    starGeo.setAttribute('aStar', new THREE.BufferAttribute(sa, 2));
    starGeo.setDrawRange(0, count);
  };

  // Pointer state, smoothed per frame so the push and the lean ease in and out.
  const target = { x: -1e4, y: -1e4, on: false };
  const ptr = { x: -1e4, y: -1e4 };
  const lean = { x: 0, y: 0 };
  const rotY = new THREE.Matrix4();
  const rotX = new THREE.Matrix4();
  let raf = 0;
  let wasVisible = false;

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const started = startedAt.current;
    const p = exit.current;
    const visible = started !== null && p < 1;
    if (!visible && !wasVisible) return; // not cued yet, or scrolled away (after one last, empty frame)
    wasVisible = visible;
    const t = started === null ? 0 : (now - started) / 1000;

    if (target.on) {
      if (ptr.x < -1e3) Object.assign(ptr, { x: target.x, y: target.y });
      ptr.x += (target.x - ptr.x) * 0.35;
      ptr.y += (target.y - ptr.y) * 0.35;
    }
    g.uPush.value += ((target.on ? 1 : 0) - g.uPush.value) * 0.12;
    g.uPointer.value.set(ptr.x, ptr.y);
    const lx = target.on ? Math.max(-1, Math.min(1, (target.x - cx) / (W / 2))) : 0;
    const ly = target.on ? Math.max(-1, Math.min(1, (target.y - cy) / (H / 2))) : 0;
    lean.x += (lx - lean.x) * 0.05;
    lean.y += (ly - lean.y) * 0.05;

    rotY.makeRotationY(t * SPIN + lean.x * MOUSE_TILT[0]);
    rotX.makeRotationX(TILT + lean.y * MOUSE_TILT[1]);
    g.uRot.value.setFromMatrix4(rotX.multiply(rotY));

    const fadeIn = Math.min(1, t / 0.8);
    const fadeOut = 1 - Math.min(1, Math.max(0, (p - 0.55) / 0.45));
    g.uTime.value = t;
    g.uZoom.value = 1 + ZOOM * p * p;
    g.uFade.value = fadeIn * fadeOut;
    s.uFade.value = fadeIn * fadeOut;
    s.uWarp.value = 1 + 0.6 * p;
    renderer.render(scene, camera);
  };

  const onMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    target.x = e.clientX - r.left;
    target.y = e.clientY - r.top;
    target.on = true;
  };
  const onAway = () => (target.on = false);
  const onUp = (e: PointerEvent) => e.pointerType !== 'mouse' && onAway(); // a lifted finger stops pushing
  let resizeTimer = 0;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (canvas.clientWidth !== W || canvas.clientHeight !== H) build();
    }, 150);
  };

  build();
  raf = requestAnimationFrame(frame);
  window.addEventListener('resize', onResize);
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerup', onUp);
  window.addEventListener('blur', onAway);
  document.documentElement.addEventListener('pointerleave', onAway);
  return () => {
    cancelAnimationFrame(raf);
    clearTimeout(resizeTimer);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('blur', onAway);
    document.documentElement.removeEventListener('pointerleave', onAway);
    globeGeo.dispose();
    starGeo.dispose();
    globeMat.dispose();
    starMat.dispose();
    renderer.dispose();
  };
}

export default ParticleField;
