/**
 * ringSketch.ts
 * -------------
 * The interactive ring scene for the landing page, adapted to the
 * site's warm cream palette. Three concentric rings of image tiles
 * that spin with scroll/drag, behind a soft grain + vignette shader.
 *
 * Based on a kokomi.js demo; recolored & wrapped for React use.
 */

import * as kokomi from "kokomi.js";
import * as THREE from "three";
import gsap from "gsap";

const CREAM = "#060606"; // dark background
const TILE_TINT = "#EDE0CC"; // warm tint over grayscale tiles — richer against dark

const fragmentShader = /* glsl */ `
uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

uniform sampler2D tDiffuse;

varying vec2 vUv;

uniform vec3 uBgColor;
uniform float uRGBShiftIntensity;
uniform float uGrainIntensity;
uniform float uVignetteIntensity;
uniform float uTransitionProgress;

highp float random(vec2 co)
{
    highp float a=12.9898;
    highp float b=78.233;
    highp float c=43758.5453;
    highp float dt=dot(co.xy,vec2(a,b));
    highp float sn=mod(dt,3.14);
    return fract(sin(sn)*c);
}

vec3 grain(vec2 uv,vec3 col,float amount){
    float noise=random(uv+iTime);
    col+=(noise-.5)*amount;
    return col;
}

vec4 RGBShift(sampler2D tex,vec2 uv,float amount){
    vec2 rUv=uv;
    vec2 gUv=uv;
    vec2 bUv=uv;
    float noise=random(uv+iTime)*.5+.5;
    vec2 offset=amount*vec2(cos(noise),sin(noise));
    rUv+=offset;
    gUv+=offset*.5;
    bUv+=offset*.25;
    vec4 rTex=texture(tex,rUv);
    vec4 gTex=texture(tex,gUv);
    vec4 bTex=texture(tex,bUv);
    vec4 col=vec4(rTex.r,gTex.g,bTex.b,gTex.a);
    return col;
}

vec3 vignette(vec2 uv,vec3 col,vec3 vigColor,float amount){
    vec2 p=uv;
    p-=.5;
    float d=length(p);
    float mask=smoothstep(.5,.3,d);
    mask=pow(mask,.6);
    float mixFactor=(1.-mask)*amount;
    col=mix(col,vigColor,mixFactor);
    return col;
}

float sdCircle(vec2 p,float r)
{
    return length(p)-r;
}

vec3 transition(vec2 uv,vec3 col,float progress){
    float ratio=iResolution.x/iResolution.y;

    // circle wipe, in the site's cream
    vec2 p=uv;
    p-=.5;
    p.x*=ratio;
    float d=sdCircle(p,progress*sqrt(2.2));
    float c=smoothstep(-.2,0.,d);
    col=mix(vec3(0.024,0.024,0.024),col,1.-c);
    return col;
}

void main(){
    vec2 uv=vUv;
    vec4 tex=RGBShift(tDiffuse,uv,uRGBShiftIntensity);
    vec3 col=tex.xyz;
    col=grain(uv,col,uGrainIntensity);
    col=vignette(uv,col,uBgColor,uVignetteIntensity);
    col=transition(uv,col,uTransitionProgress);
    gl_FragColor=vec4(col,1.);
}
`;

export type RingSketchOptions = {
  /** Custom image URLs for the tiles; cycled to fill all rings. */
  images?: string[];
  /** Called once all textures are loaded and the scene animates in. */
  onReady?: () => void;
};

export type RingSketchHandle = {
  /** Plays the exit animation (circle wipe back to cream). */
  exit: () => Promise<void>;
  /** Tears the scene down. */
  destroy: () => void;
};

const sumFormula = (n: number) => (n * (n + 1)) / 2;
const isOdd = (n: number) => n % 2 === 1;

class RingSketch extends kokomi.Base {
  params = {
    transitionProgress: 0,
    enterProgress: 0,
    rotateSpeed: 15,
  };
  ce: any;
  images: string[] = [];
  onReady?: () => void;
  destroyed = false;

  create() {
    this.renderer.setClearColor(new THREE.Color(CREAM), 1);
    this.camera.position.set(0, 0, 16);

    const circleCount = 3;
    const circleImgCountUnit = 12;
    const circleImgTotalCount = circleImgCountUnit * sumFormula(circleCount);

    const indices = Array.from({ length: circleImgTotalCount }, (_, i) => i);
    const urls =
      this.images.length > 0
        ? indices.map((i) => this.images[i % this.images.length])
        : // grayscale placeholders, warm-tinted below for a cohesive look
          indices.map((i) => `https://picsum.photos/id/${i + 1}/320/400?grayscale`);

    const resourceList = urls.map((path, i) => ({
      name: `tex${i + 1}`,
      type: "texture" as const,
      path,
    }));

    const am: any = new (kokomi as any).AssetManager(this, resourceList);

    am.on("ready", () => {
      if (this.destroyed) return;

      const material = new THREE.MeshBasicMaterial();
      const r = 6.4;
      const scale = 0.8;

      const rings: THREE.Group[] = [];
      const lines: THREE.Group[] = [];

      for (let i = 0; i < circleCount; i++) {
        const c1 = sumFormula(i) * circleImgCountUnit;
        const c2 = sumFormula(i + 1) * circleImgCountUnit;
        const textures = Object.values(am.items).slice(c1, c2) as THREE.Texture[];

        const ring = new THREE.Group();
        this.scene.add(ring);
        rings.push(ring);

        textures.forEach((tex, j) => {
          const line = new THREE.Group();
          ring.add(line);
          lines.push(line);
          const imgScale = 0.005 * scale * (i * 0.36 + 1);
          const width = (tex.image?.width ?? 320) * imgScale;
          const height = (tex.image?.height ?? 400) * imgScale;
          const geometry = new THREE.PlaneGeometry(width, height);
          const mat = material.clone();
          mat.map = tex;
          // warm tint multiplied over the (grayscale) image
          mat.color = new THREE.Color(TILE_TINT);
          mat.needsUpdate = true;
          const mesh = new THREE.Mesh(geometry, mat);
          const r2 = r * (i + 1);
          const ratio = j / (c2 - c1);
          const angle = ratio * Math.PI * 2;
          mesh.position.x = r2;
          mesh.rotation.z = -Math.PI / 2;
          line.rotation.z = angle;
          line.add(mesh);
        });
      }

      const ce: any = new (kokomi as any).CustomEffect(this, {
        fragmentShader,
        uniforms: {
          uBgColor: { value: new THREE.Color(CREAM) },
          uRGBShiftIntensity: { value: 0.0018 },
          uGrainIntensity: { value: 0.045 },
          uVignetteIntensity: { value: 0.85 },
          uTransitionProgress: { value: 0 },
        },
      });
      ce.addExisting();
      this.ce = ce;

      const wheelScroller: any = new (kokomi as any).WheelScroller();
      wheelScroller.listenForScroll();

      const dragDetecter: any = new (kokomi as any).DragDetecter(this);
      dragDetecter.detectDrag();
      dragDetecter.on("drag", (delta: { x: number; y: number }) => {
        wheelScroller.scroll.target -= (delta.x || delta.y) * 2;
      });

      this.update(() => {
        if (this.destroyed) return;
        wheelScroller.syncScroll();

        rings.forEach((ring, i) => {
          ring.rotation.z +=
            0.0025 *
            (isOdd(i) ? -1 : 1) *
            (1 + wheelScroller.scroll.delta) *
            this.params.rotateSpeed;
        });

        lines.forEach((line) => {
          line.position.z =
            -THREE.MathUtils.lerp(
              0,
              100,
              THREE.MathUtils.mapLinear(
                wheelScroller.scroll.delta,
                0,
                1000,
                0,
                1
              )
            ) + THREE.MathUtils.lerp(10, 0, this.params.enterProgress);
        });

        this.ce.customPass.material.uniforms.uTransitionProgress.value =
          this.params.transitionProgress;
      });

      // entrance: cream circle opens, tiles fly in, spin settles
      const tl = gsap.timeline();
      tl.to(this.params, {
        transitionProgress: 1,
        duration: 1,
        ease: "power1.inOut",
      }).fromTo(
        this.params,
        { enterProgress: 0, rotateSpeed: 10 },
        {
          enterProgress: 1,
          rotateSpeed: 1,
          duration: 1.5,
          ease: "power1.inOut",
        },
        "-=1"
      );

      this.onReady?.();
    });
  }

  exit(): Promise<void> {
    return new Promise((resolve) => {
      gsap.to(this.params, {
        transitionProgress: 0,
        rotateSpeed: 8,
        duration: 0.9,
        ease: "power2.inOut",
        onComplete: () => resolve(),
      });
    });
  }

  destroyAll() {
    this.destroyed = true;
    try {
      (this.renderer as any)?.setAnimationLoop?.(null);
      this.renderer?.dispose();
      const gl = this.renderer?.getContext();
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
      this.renderer?.domElement.remove();
    } catch {
      /* noop */
    }
  }
}

export function createRingSketch(
  container: HTMLElement,
  opts: RingSketchOptions = {}
): RingSketchHandle {
  if (!container.id) container.id = `ring-sketch-${Date.now()}`;

  const sketch = new RingSketch(`#${container.id}`);
  sketch.images = opts.images ?? [];
  sketch.onReady = opts.onReady;
  sketch.create();

  return {
    exit: () => sketch.exit(),
    destroy: () => {
      sketch.destroyAll();
      container.innerHTML = "";
    },
  };
}
