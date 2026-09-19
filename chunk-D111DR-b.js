import{D as eh,E as ch,I as th,L as uh,M as rD,P as ri,S as YL,_ as Su,a as GD,b as Xp,f as OD,g as Qv,k as nD,m as Py,n as Cc,o as ID,s as II,w as ZL,y as XD}from"./main-XVGF4D5C.js";import{i as ot,n as it,r as j$1,t as et}from"./chunk-B21hzAvl.js";var d=`#version 300 es
in vec2 position;
in vec2 uv;

out vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
}`;var T=[`canvas`];var c=class t{fragmentShader=YL.required();canvasRef=ZL.required(`canvas`);renderer;program;mesh;animationFrameId;timeOffset=0;timeUniform={value:0};resolutionUniform={value:new Float32Array(2)};updateShader=Su(()=>{this.program.setShaders({vertex:d,fragment:this.fragmentShader()}),this.timeOffset=performance.now()});ngOnInit(){let a=this.canvasRef().nativeElement;this.renderer=new j$1({canvas:a,dpr:Math.min(window.devicePixelRatio,2),alpha:!0});let e=this.renderer.gl,o=new et(e,{position:{size:2,data:new Float32Array([-1,-1,3,-1,-1,3])},uv:{size:2,data:new Float32Array([0,0,2,0,0,2])}});this.program=new it(e,{vertex:d,fragment:this.fragmentShader(),uniforms:{uTime:this.timeUniform,uResolution:this.resolutionUniform},transparent:!0}),this.mesh=new ot(e,{geometry:o,program:this.program}),this.resize(),this.animate(0)}animate=a=>{this.timeUniform.value=(a-this.timeOffset)*.001,this.renderer.render({scene:this.mesh}),this.animationFrameId=requestAnimationFrame(this.animate)};resize(){let a=this.canvasRef().nativeElement,e=a.clientWidth||window.innerWidth,o=a.clientHeight||window.innerHeight;this.renderer.setSize(e,o);let i=this.renderer.gl;this.resolutionUniform.value[0]=i.canvas.width,this.resolutionUniform.value[1]=i.canvas.height}ngOnDestroy(){cancelAnimationFrame(this.animationFrameId)}static ɵfac=function(e){return new(e||t)};static ɵcmp=II({type:t,selectors:[[`app-shader-preview`]],viewQuery:function(e,o){e&1&&uh(o.canvasRef,T,5),e&2&&ID()},hostBindings:function(e,o){e&1&&ch(`resize`,function(){return o.resize()},Qv)},inputs:{fragmentShader:[1,`fragmentShader`]},decls:2,vars:0,consts:[[`canvas`,``]],template:function(e,o){e&1&&th(0,`canvas`,null,0)},styles:[`[_nghost-%COMP%]{width:100%;height:100%}canvas[_ngcontent-%COMP%]{width:100%!important;height:100%!important;display:block}`]})};var j=`#version 300 es
precision highp float;
  
uniform vec2 uResolution;
uniform float uTime;
out vec4 fragColor;

// Klasyczny Perlin Noise 3D w GLSL
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec3 P) {
  vec3 Pi0 = floor(P); // Cz\u0119\u015B\u0107 ca\u0142kowita
  vec3 Pi1 = Pi0 + vec3(1.0); // S\u0105siednie wierzcho\u0142ki sze\u015Bcianu
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P); // Cz\u0119\u015B\u0107 u\u0142amkowa
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g100, g100), dot(g010, g010), dot(g110, g110)));
  g000 *= norm0.x;
  g100 *= norm0.y;
  g010 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g101, g101), dot(g011, g011), dot(g111, g111)));
  g001 *= norm1.x;
  g101 *= norm1.y;
  g011 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}

void main() {
  // 1. Sprowadzamy piksele z zakresu (0..1920, 0..1080) do zakresu (-1..1) z zachowaniem proporcji
  vec2 st = (2.0 * gl_FragCoord.xy - uResolution.xy) / uResolution.y;

  // 2. Skalujemy przestrze\u0144 do ma\u0142ych warto\u015Bci (np. 1.5), \u017Ceby uciec od ogranicze\u0144 precyzji mod289
  vec3 pos = vec3(st * 1.5, uTime * 0.3);

  // 3. Liczymy szum Simplex
  float n = cnoise(pos);

  // 4. Liniowa szaro\u015B\u0107: sprowadzamy wynik n z zakresu [-1, 1] do czystej szaro\u015Bci [0, 1]
  float gray = n * 0.5 + 0.5;

  fragColor = vec4(vec3(gray), 1.0);
}`;var N=`#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;

in vec2 vUv;
out vec4 fragColor;

// Prosta funkcja losuj\u0105ca
float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

// Dwuwymiarowy szum Value Noise
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

// FBM: Sumowanie 5 warstw szumu o r\xF3\u017Cnej cz\u0119stotliwo\u015Bci i ambilitudzie
float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    
    // Obr\xF3t zapobiega nak\u0142adaniu si\u0119 kraw\u0119dzi w kolejnych oktawach
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));

    for (int i = 0; i < 5; i++) {
        value += amplitude * noise(st);
        st = rot * st * 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vec2 st = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;

    // Przesuwamy szum w g\xF3r\u0119 (uTime * 0.2), imituj\u0105c unosz\u0105cy si\u0119 dym
    vec2 smokeUV = st * 3.0 - vec2(0.0, uTime * 0.2);

    // Generujemy warstwy dymu
    float density = fbm(smokeUV);

    // Zanikanie dymu ku g\xF3rze i kraw\u0119dziom
    float mask = smoothstep(1.0, -0.5, st.y);
    density *= mask;

    // Kolor dymu (szaro-bia\u0142y z przezroczysto\u015Bci\u0105)
    vec3 smokeColor = vec3(0.8, 0.85, 0.9);
    
    fragColor = vec4(smokeColor, density * 0.7);
}`;var D=`#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;

out vec4 fragColor;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
    float n = 0.0;
    n += 0.5000 * noise(p); p *= 2.02;
    n += 0.2500 * noise(p); p *= 2.03;
    n += 0.1250 * noise(p);
    return n;
}

void main() {
    // 1. Wycentrowanie i dopasowanie UV
    vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
    float r = length(uv);
    float angle = atan(uv.y, uv.x);

    // --- NOWA SEKCJA: ANIMACJA WEJ\u015ACIA ---
    
    // Docelowy rozmiar horyzontu zdarze\u0144 (to co by\u0142o wcze\u015Bniej)
    float baseEventHorizon = 0.18;
    
    // Szybko\u015B\u0107 animacji (wy\u017Cszy numer = szybsze wej\u015Bcie)
    float animSpeed = 4.0; 
    
    // MODYFIKACJA: Dodajemy powolny start.
    // uTime ^ 1.5 sprawia, \u017Ce pierwsze chwile s\u0105 znacznie wolniejsze,
    // a potem szybko nadrabia. Dzi\u0119ki temu oko dostrzega start od punktu.
    float adjustedTime = pow(max(uTime, 0.0), 1.5);
    
    // Funkcja wzrostu na poprawionym czasie
    float growth = 1.0 - exp(-adjustedTime * animSpeed);
    
    // Animowany horyzont zdarze\u0144
    float animatedEventHorizon = baseEventHorizon * growth;
    
    // ------------------------------------

    // 2. Bezszwowe, zagi\u0119te grawitacyjnie pr\xF3bowanie szumu (u\u017Cywamy animowanego promienia)
    float speed = uTime * 1.2;
    vec2 polarUv = vec2(cos(angle), sin(angle));

    // U\u017Cywamy animatedEventHorizon, \u017Ceby pasma te\u017C "ros\u0142y"
    float distortedRadius = (1.0 / (r - animatedEventHorizon + 0.02));
    
    // Generowanie ostrych strukturalnych pasm
    float diskNoise = fbm(polarUv * 3.0 + vec2(speed, distortedRadius * 0.15));

    // 3. Rozk\u0142ad jasno\u015Bci dysku i g\u0142adki pier\u015Bcie\u0144 fotonowy
    // U\u017Cywamy animatedEventHorizon, \u017Ceby jasno\u015B\u0107 ros\u0142a razem z dziur\u0105
    float diskGlow = exp(-5.0 * (r - animatedEventHorizon));
    float photonRing = exp(-40.0 * (r - animatedEventHorizon)) * 3.5;

    // 4. Koloryzacja: ogie\u0144 + bia\u0142e j\u0105dro na samej kraw\u0119dzi
    vec3 fireColor = vec3(1.0, 0.35, 0.05) * pow(diskNoise, 1.5) * diskGlow * 4.0;
    vec3 ringColor = vec3(1.0, 0.95, 0.85) * photonRing;
    vec3 outerGlow = vec3(0.8, 0.2, 0.01) * exp(-2.0 * r);

    vec3 col = fireColor + ringColor + outerGlow;

    // 5. Antyaliasing na samej kraw\u0119dzi (u\u017Cywamy animowanego promienia)
    float delta = fwidth(r);
    float holeMask = smoothstep(animatedEventHorizon - delta, animatedEventHorizon + delta, r);

    // Czyste odci\u0119cie wn\u0119trza
    col *= holeMask;

    fragColor = vec4(col, 1.0);
}`;function q(t,a){t&1&&GD(0,` Smoke `)}function B(t,a){t&1&&(GD(0,` Black`),eh(1,`br`),GD(2,`hole `))}function G(t,a){t&1&&GD(0,` Noise `)}var W={noise:j,smoke:N,"black-hole":D};var E=class t{type=YL.required();fragmentShader=XD(()=>W[this.type()]);static ɵfac=function(e){return new(e||t)};static ɵcmp=II({type:t,selectors:[[`app-shaders-page`]],hostVars:2,hostBindings:function(e,o){e&2&&OD(o.type())},inputs:{type:[1,`type`]},decls:5,vars:2,consts:[[1,`noise-container`,3,`fragmentShader`],[1,`title-section`]],template:function(e,o){if(e&1&&(eh(0,`app-shader-preview`,0),ri(1,`h1`,1),nD(2,q,1,0)(3,B,3,0)(4,G,1,0),Cc()),e&2){let i;Xp(`fragmentShader`,o.fragmentShader()),Py(2),rD((i=o.type())===`smoke`?2:i===`black-hole`?3:4)}},dependencies:[c],styles:[`[_nghost-%COMP%]{display:flex;width:100%;min-height:100vh;--%NS%shaders-page-background: unset;--%NS%shaders-page-label-color: black;--%NS%shaders-page-label-blend-mode: unset}.smoke[_nghost-%COMP%]{--%NS%shaders-page-background: #111;--%NS%shaders-page-label-color: white}.black-hole[_nghost-%COMP%]{--%NS%shaders-page-label-blend-mode: overlay}.noise-container[_ngcontent-%COMP%]{position:fixed;background:var(--%NS%shaders-page-background);z-index:-1}.title-section[_ngcontent-%COMP%]{margin:auto;text-align:center;font-size:clamp(8rem,15vw,30rem);font-family:sans-serif;text-transform:uppercase;color:var(--%NS%shaders-page-label-color);mix-blend-mode:var(--%NS%shaders-page-label-blend-mode)}`]})};export{E as ShadersPage};