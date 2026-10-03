import{C as dD,D as fD,E as ey,G as vh,H as uT,K as wD,L as oh,M as ii,O as fh,P as nP,R as rh,T as eP,U as ur,V as uD,W as v,_ as XL,a as DD,c as Ie,d as ND,f as No,h as Uy,j as ih,k as hh,l as JD,n as Ac,p as Ru,q as wh,r as CD,s as Hf,u as Mc,v as _I,w as dh,x as bc,y as _c,z as tP}from"./main-KYUCX7UX.js";import{n as ql,t as W$1}from"./chunk-gXWSgGua.js";import{t as o}from"./chunk-CiIByoEx.js";import{a as nt,i as j$1,o as ot,r as it,s as xt,t as P}from"./chunk-DZLnhqGc.js";ql.registerPlugin(W$1);var q=class n{hostRef=v(ur);onDestroy=v(Ie);step=No(`title`);constructor(){let t;Hf(()=>t=this.initAnimation()),this.onDestroy.onDestroy(()=>t?.revert())}initAnimation(){return ql.context(()=>{W$1.create({trigger:this.hostRef.nativeElement,start:`top top`,end:`+=120%`,pin:!0,anticipatePin:1,onUpdate:t=>{let e=t.progress;e<.35?this.step.set(`title`):e>=.35&&e<.7?this.step.set(`subtitle`):this.step.set(`quote`)}})},this.hostRef.nativeElement)}static ɵfac=function(e){return new(e||n)};static ɵcmp=_I({type:n,selectors:[[`app-michael-intro`]],decls:15,vars:8,consts:[[1,`text-stage`],[1,`intro-text`,`title`],[1,`sub`],[1,`main`],[1,`intro-text`,`subtitle`],[1,`intro-text`,`quote`],[1,`scroll-hint`],[1,`scroll-hint__text`]],template:function(e,i){e&1&&(_c(0,`div`,0)(1,`header`,1)(2,`p`,2),JD(3,`Prawdziwa, Nieocenzurowana:`),Mc(),_c(4,`h1`,3),JD(5,`Legenda o Niemym Michałku`),Mc()(),_c(6,`h2`,4),JD(7,` Pół legenda, pół prawda, pół nieprawda. `),Mc(),_c(8,`p`,5),JD(9,` „Wszyscy we wsi myśleli, że narodził się bez głosu.`),ih(10,`br`),JD(11,` Prawda okazała się znacznie gorsza.” `),Mc()(),_c(12,`div`,6)(13,`span`,7),JD(14,`Przewiń, by poznać prawdę`),Mc()()),e&2&&(Uy(),vh(`active`,i.step()===`title`),Uy(5),vh(`active`,i.step()===`subtitle`),Uy(2),vh(`active`,i.step()===`quote`),Uy(4),vh(`is-scrolled`,i.step()!==`title`))},styles:[`[_nghost-%COMP%]{width:100%;height:100vh;display:flex;justify-content:center;align-items:center}.text-stage[_ngcontent-%COMP%]{display:grid;place-items:center;width:70%;text-align:center}.intro-text[_ngcontent-%COMP%]{grid-area:1 / 1;margin:0;width:100%;pointer-events:none;opacity:0;filter:blur(10px);transform:scale(.9);transition:opacity 1.2s cubic-bezier(.25,1,.5,1),filter 1.2s cubic-bezier(.25,1,.5,1),transform 1.2s cubic-bezier(.25,1,.5,1)}.intro-text.active[_ngcontent-%COMP%]{opacity:1;filter:blur(0px);transform:scale(1)}.title[_ngcontent-%COMP%]   .sub[_ngcontent-%COMP%]{font-size:1.5rem;text-transform:uppercase;letter-spacing:.3em}.title[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]{font-size:5rem;text-transform:uppercase;letter-spacing:.12em;font-weight:900;color:var(--%NS%story-accent);text-shadow:0 0 10px var(--%NS%story-glow-level-3),0 0 30px var(--%NS%story-glow-level-2),0 0 60px var(--%NS%story-glow-level-1)}.subtitle[_ngcontent-%COMP%]{font-size:4.5rem;font-weight:400;font-style:italic;line-height:1.4;transform:translateY(10px) scale(.95);text-shadow:0 0 8px var(--%NS%story-glow-level-2),0 0 28px var(--%NS%story-glow-level-1)}.subtitle.active[_ngcontent-%COMP%]{transform:translateY(0) scale(1)}.quote[_ngcontent-%COMP%]{font-size:3rem;line-height:1.5;text-shadow:0 0 6px var(--%NS%story-glow-level-2),0 0 22px var(--%NS%story-glow-level-1)}.scroll-hint[_ngcontent-%COMP%]{position:absolute;bottom:10%;display:flex;flex-direction:column;align-items:center;gap:.5rem;opacity:1;visibility:visible;transition:opacity .5s ease,visibility 0s linear 0s}.scroll-hint.is-scrolled[_ngcontent-%COMP%]{opacity:0;visibility:hidden;pointer-events:none;transition:opacity .5s ease,visibility 0s linear .5s}.scroll-hint[_ngcontent-%COMP%]   .scroll-hint__text[_ngcontent-%COMP%]{font-size:.75rem;letter-spacing:.4em;text-transform:uppercase;animation:_ngcontent-%COMP%_cinematicBreath 2s ease-in-out infinite alternate}@keyframes _ngcontent-%COMP%_cinematicBreath{0%{opacity:.1;text-shadow:0 0 2px var(--%NS%story-glow-level-1)}to{opacity:.4;text-shadow:0 0 10px var(--%NS%story-glow-level-2)}}`]})};function ue(n,t){if(n&1&&(_c(0,`span`,3),JD(1),Mc()),n&2){let e=t.$implicit,i=t.$index;vh(`highlighted`,i<DD().visibleWordsCount()),Uy(),Ac(` `,e,` `)}}ql.registerPlugin(W$1);var B=class n{hostRef=v(ur);onDestroy=v(Ie);isDone=No(!1);visibleWordsCount=No(0);rawQuote=`\u201EKto z pazerno\u015Bci chce wy\u017C\u0105\u0107 wszystko do samego dna,
 ten wzrok z chciwo\u015Bci postrada, a wstyd go spali do cna.\u201D`;words=this.rawQuote.split(` `);constructor(){let t;Hf(()=>t=this.initAnimation()),this.onDestroy.onDestroy(()=>t?.revert())}initAnimation(){return ql.context(()=>{W$1.create({trigger:this.hostRef.nativeElement,start:`top top`,end:`+=150%`,pin:!0,anticipatePin:1,scrub:.3,onUpdate:t=>{let e=t.progress,i=Math.min(e/.75,1),r=Math.floor(i*this.words.length);this.visibleWordsCount.set(r),this.isDone.set(e>.8)}})},this.hostRef.nativeElement)}static ɵfac=function(e){return new(e||n)};static ɵcmp=_I({type:n,selectors:[[`app-michael-epilogue`]],decls:5,vars:4,consts:[[1,`quote-stage`,`quote-text`],[1,`word`,3,`highlighted`],[1,`end-stage`,`end-label`],[1,`word`]],template:function(e,i){e&1&&(_c(0,`h3`,0),dD(1,ue,2,3,`span`,1,uD),Mc(),_c(3,`h2`,2),JD(4,`Koniec`),Mc()),e&2&&(vh(`is-done`,i.isDone()),Uy(),fD(i.words),Uy(2),vh(`active`,i.isDone()))},styles:[`[_nghost-%COMP%]{display:grid;place-items:center;width:100%;height:100vh;position:relative}.quote-stage[_ngcontent-%COMP%], .end-stage[_ngcontent-%COMP%]{grid-area:1 / 1;width:70%;text-align:center;transition:opacity 1.4s cubic-bezier(.16,1,.3,1),transform 1.4s cubic-bezier(.16,1,.3,1),filter 1.4s cubic-bezier(.16,1,.3,1)}.quote-text[_ngcontent-%COMP%]{font-size:3rem;margin:0;display:flex;flex-wrap:wrap;justify-content:center;gap:.4em}.quote-text[_ngcontent-%COMP%]   .word[_ngcontent-%COMP%]{opacity:.2;transition:color .5s ease,opacity .5s ease,text-shadow .5s ease}.quote-text[_ngcontent-%COMP%]   .word.highlighted[_ngcontent-%COMP%]{opacity:1;text-shadow:0 0 12px var(--%NS%story-glow-level-2)}.quote-stage.is-done[_ngcontent-%COMP%]{opacity:0;filter:blur(8px);transform:scale(.95)}.end-stage[_ngcontent-%COMP%]{opacity:0;filter:blur(16px);transform:scale(.8);pointer-events:none}.end-stage.active[_ngcontent-%COMP%]{opacity:1;filter:blur(0px);transform:scale(1)}.end-label[_ngcontent-%COMP%]{font-size:6rem;margin:0;text-shadow:0 0 30px var(--%NS%story-glow-level-1)}`]})};var me=[`*`];var N=class n{title=eP.required();clicked=XL();static ɵfac=function(e){return new(e||n)};static ɵcmp=_I({type:n,selectors:[[`app-act`]],inputs:{title:[1,`title`]},outputs:{clicked:`clicked`},ngContentSelectors:me,decls:5,vars:1,consts:[[`href`,`#step`,3,`click`],[1,`description`],[1,`description__inner`]],template:function(e,i){e&1&&(CD(),_c(0,`a`,0),fh(`click`,function(o){return i.clicked.emit(o)}),JD(1),Mc(),_c(2,`div`,1)(3,`div`,2),wD(4),Mc()()),e&2&&(Uy(),wh(i.title()))},styles:[`[_nghost-%COMP%]{display:block}[_nghost-%COMP%]   a[_ngcontent-%COMP%]:hover{opacity:.7;text-shadow:0 0 10px var(--%NS%story-glow-level-1)}.selected[_nghost-%COMP%]   a[_ngcontent-%COMP%]{opacity:1;text-shadow:0 0 8px var(--%NS%story-glow-level-2),0 0 28px var(--%NS%story-glow-level-1)}.selected[_nghost-%COMP%]   .description[_ngcontent-%COMP%]{grid-template-rows:1fr;padding-top:8px;padding-bottom:12px}.selected[_nghost-%COMP%]   .description__inner[_ngcontent-%COMP%]{opacity:.9!important;transition:opacity .3s ease .12s}[_nghost-%COMP%]   a[_ngcontent-%COMP%]{font-size:clamp(2rem,3vw,3.2rem);color:var(--%NS%story-primary);opacity:.35;text-decoration:none;cursor:pointer;display:block;transition:opacity .3s ease,transform .3s cubic-bezier(.16,1,.3,1),text-shadow .3s ease}[_nghost-%COMP%]   .description[_ngcontent-%COMP%]{display:grid;grid-template-rows:0fr;transition:grid-template-rows .3s cubic-bezier(.4,0,.2,1),padding .3s ease;overflow:hidden;width:100%;max-width:700px;font-size:1.25rem;line-height:1.6;color:#ebe1d2d9}[_nghost-%COMP%]   .description[_ngcontent-%COMP%]   .description__inner[_ngcontent-%COMP%]{min-height:0;opacity:0;transform:translateY(10px);transition:opacity .15s ease,transform .15s ease}`]})};var ae=`#version 300 es
precision highp float;

uniform sampler2D uTexture;
uniform float uTime;
uniform float uProgress;
uniform vec2 uResolution;

in vec2 vUv;
out vec4 FragColor;

vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0)
    ) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n = 1.0 / 7.0;
    vec3 ns = n * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = inversesqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m *= m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

float fbm(vec3 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    // P\u0119tla 4 oktaw \u2013 nak\u0142adanie drobnoskalowego szumu na du\u017Cy
    for (int i = 0; i < 4; i++) {
        value += amplitude * snoise(st * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vec2 uv = vUv;
    vec4 texColor = texture(uTexture, uv);
    vec2 noiseUv = (uv - vec2(0.5)) * vec2(uResolution.x / uResolution.y, 1.0);

    // =========================================================
    // 1. KRAW\u0118D\u0179 G\xD3RA/D\xD3\u0141 (Wielo-oktawowy FBM)
    // =========================================================
    // Odleg\u0142o\u015B\u0107 od g\xF3ry/do\u0142u (0 w \u015Brodku, 1 na kraw\u0119dzi Y)
    float distY = abs(uv.y - 0.5) * (1.5 + uProgress * 0.5);
    float distX = abs(uv.x - 0.5) * (1.5 + uProgress * 0.5);

    // Skupiamy si\u0119 mocno na g\xF3rze i dole
    float edgeFactor = max(distY * 1.2, distX * 0.3);

    float edgeActivity = smoothstep(0.0, 1.0, clamp(uProgress, 0.0, 1.0));
    float distFromCenter = length(noiseUv);
    float radialStrength = pow(smoothstep(0.0, 0.707, distFromCenter), 1.2);
    float edgeAlphaMultiplier = mix(0.65, 1.5, radialStrength);
    edgeFactor *= mix(1.0, edgeAlphaMultiplier, edgeActivity);

    float edgeRoughness = edgeActivity * edgeActivity;
    vec3 fogPosition = vec3(noiseUv * 2.4, uTime * 0.07);
    float fogNoise = fbm(fogPosition) * mix(0.25, 0.42, edgeRoughness);
    float fineNoise = snoise(vec3(noiseUv * 12.0, uTime * 0.07));
    float edgeDetail = fineNoise * 0.18 * edgeRoughness;

    // Bardzo mi\u0119kkie przej\u015Bcie kraw\u0119dziowe (bardzo du\u017Cy rozst\u0119p warto\u015Bci w smoothstep)
    // Dzi\u0119ki szerokiemu zakresowi 0.40 -> 0.98 nie ma ostrych kresek ani pasm!
    float edgeAlpha = 1.0 - smoothstep(0.40, 0.98, edgeFactor + fogNoise + edgeDetail);

    // =========================================================
    // 2. \u015ARODEK (Nasi\u0105kanie/Mroczenie zasilane uProgress)
    // =========================================================
    // Osobny, subtelny FBM dla \u015Brodka obrazu
    vec3 centerPosition = vec3(noiseUv * 3.0, uTime * 0.05);
    float centerNoise = fbm(centerPosition);

    // Wi\u0119ksze plamy z \u0142agodnym wp\u0142ywem progressu i dystansu
    float stain = smoothstep(-0.6, 0.8, centerNoise + (uProgress * 0.4) - (distFromCenter * 0.5));
    
    // \u0141agodne os\u0142abienie alfy w miejscach plam
    float centerAlpha = mix(1.0, 0.72, stain * uProgress);

    // Subtelne przyciemnienie towarzysz\u0105ce pulsowaniu
    vec3 finalRgb = mix(texColor.rgb, texColor.rgb * 0.85, stain * uProgress * 0.4);

    // =========================================================
    // 3. PO\u0141\u0104CZENIE I KLAMP
    // =========================================================
    float finalAlpha = edgeAlpha * centerAlpha;

    FragColor = vec4(finalRgb, texColor.a * finalAlpha);
}`;var se=`#version 300 es
precision highp float;

uniform sampler2D uPreviousTexture;
uniform sampler2D uCurrentTexture;
uniform float uProgress;
uniform vec2 uResolution;
uniform vec2 uPreviousImageResolution;
uniform vec2 uCurrentImageResolution;

in vec2 vUv;
out vec4 FragColor;

vec2 getCoverUv(vec2 uv, vec2 canvasRes, vec2 imgRes) {
    float canvasRatio = canvasRes.x / canvasRes.y;
    float imageRatio = imgRes.x / imgRes.y;

    if (canvasRatio > imageRatio) {
        uv.y = (uv.y - 0.5) * (imageRatio / canvasRatio) + 0.5;
    } else {
        uv.x = (uv.x - 0.5) * (canvasRatio / imageRatio) + 0.5;
    }

    return uv;
}

void main() {
    vec2 previousUv = getCoverUv(vUv, uResolution, uPreviousImageResolution);
    vec2 currentUv = getCoverUv(vUv, uResolution, uCurrentImageResolution);
    vec4 previousColor = texture(uPreviousTexture, previousUv);
    vec4 currentColor = texture(uCurrentTexture, currentUv);

    FragColor = mix(previousColor, currentColor, clamp(uProgress, 0.0, 1.0));
}`;var W=class{constructor(t,e){this.renderer=t;let i=t.gl;this.previousTexture=new P(i,{generateMipmaps:!1}),this.currentTexture=new P(i,{generateMipmaps:!1}),this.target=new xt(i,{width:1,height:1,depth:!1,minFilter:i.LINEAR,magFilter:i.LINEAR});let r=new nt(i,{vertex:o,fragment:se,uniforms:{uPreviousTexture:{value:this.previousTexture},uCurrentTexture:{value:this.currentTexture},uResolution:this.resolution,uPreviousImageResolution:this.previousImageResolution,uCurrentImageResolution:this.currentImageResolution,uProgress:this.progress}});this.mesh=new ot(i,{geometry:e,program:r})}renderer;previousTexture;currentTexture;target;previousImageResolution={value:new Float32Array([1,1])};currentImageResolution={value:new Float32Array([1,1])};resolution={value:new Float32Array([1,1])};progress={value:1};mesh;sourcePair;imageRequest=0;transitionStartTime;transitionDuration=400;get texture(){return this.target.texture}setSources(t,e){if(this.sourcePair?.[0]===t&&this.sourcePair[1]===e)return;let i=this.sourcePair===void 0;this.sourcePair=[t,e];let r=++this.imageRequest;Promise.all([this.loadImage(t),this.loadImage(e)]).then(([o,I])=>{r===this.imageRequest&&(this.previousTexture.image=o,this.currentTexture.image=I,this.previousImageResolution.value.set([o.naturalWidth,o.naturalHeight]),this.currentImageResolution.value.set([I.naturalWidth,I.naturalHeight]),this.progress.value=i?1:0,this.transitionStartTime=void 0)}).catch(o=>console.error(`Unable to load transition images.`,o))}resize(t,e){this.target.setSize(t,e),this.resolution.value.set([t,e])}render(t){if(this.progress.value<1){this.transitionStartTime??=t;let e=Math.min((t-this.transitionStartTime)/this.transitionDuration,1);this.progress.value=e*e*(3-2*e)}this.renderer.render({scene:this.mesh,target:this.target})}loadImage(t){return new Promise((e,i)=>{let r=new Image;r.crossOrigin=`anonymous`,r.onload=()=>e(r),r.onerror=()=>i(new Error(`Unable to load image: ${t}`)),r.src=t})}};var ge=[`canvas`];var j=class n{currentSrc=eP.required();prevSrc=eP.required();progress=eP.required();canvasRef=tP.required(`canvas`);renderer;transitionPass;storyEffect;storyUniforms={uTexture:{value:null},uTime:{value:0},uProgress:{value:0},uResolution:{value:new Float32Array(2)}};animationFrameId;previousFrameTime;currentProgress=0;sourceChange=Ru(()=>{this.transitionPass.setSources(this.prevSrc(),this.currentSrc())});ngOnInit(){this.initRenderer(),this.transitionPass.setSources(this.prevSrc(),this.currentSrc()),this.resize(),this.animationFrameId=requestAnimationFrame(this.animate)}initRenderer(){let t=this.canvasRef().nativeElement;this.renderer=new j$1({canvas:t,dpr:Math.min(window.devicePixelRatio,2),alpha:!0});let e=this.renderer.gl,i=new it(e,{position:{size:2,data:new Float32Array([-1,-1,3,-1,-1,3])},uv:{size:2,data:new Float32Array([0,0,2,0,0,2])}});this.transitionPass=new W(this.renderer,i),this.storyEffect=new ot(e,{geometry:i,program:new nt(e,{vertex:o,fragment:ae,uniforms:this.storyUniforms,transparent:!0})})}animate=t=>{let e=Math.min((t-(this.previousFrameTime??t))*.001,.05);this.previousFrameTime=t,this.currentProgress+=(this.progress()-this.currentProgress)*.05,this.transitionPass.render(t),this.storyUniforms.uTexture.value=this.transitionPass.texture,this.storyUniforms.uTime.value+=e*(1+this.currentProgress*3),this.storyUniforms.uProgress.value=this.currentProgress,this.renderer.render({scene:this.storyEffect}),this.animationFrameId=requestAnimationFrame(this.animate)};resize(){let t=this.canvasRef().nativeElement,e=t.clientWidth||window.innerWidth,i=t.clientHeight||window.innerHeight;this.renderer.setSize(e,i);let r=this.renderer.gl;this.transitionPass.resize(r.canvas.width,r.canvas.height),this.storyUniforms.uResolution.value[0]=e,this.storyUniforms.uResolution.value[1]=i}ngOnDestroy(){cancelAnimationFrame(this.animationFrameId)}static ɵfac=function(e){return new(e||n)};static ɵcmp=_I({type:n,selectors:[[`app-dynamic-image`]],viewQuery:function(e,i){e&1&&hh(i.canvasRef,ge,5),e&2&&ND()},hostBindings:function(e,i){e&1&&dh(`resize`,function(){return i.resize()},ey)},inputs:{currentSrc:[1,`currentSrc`],prevSrc:[1,`prevSrc`],progress:[1,`progress`]},decls:2,vars:0,consts:[[`canvas`,``]],template:function(e,i){e&1&&ih(0,`canvas`,null,0)},styles:[`canvas[_ngcontent-%COMP%]{width:100%!important;height:100%!important;display:block}`]})};var ve=[`fill`];ql.registerPlugin(W$1);var H=class n{hostRef=v(ur);stepItems=nP(N);fill=tP.required(`fill`);destroyRef=v(Ie);previousIndex=No(0);activeIndex=No(0);progress=No(0);currentImageSrc=uT(()=>`michael/act-${this.activeIndex()+1}.webp`);previousImageSrc=uT(()=>`michael/act-${this.previousIndex()+1}.webp`);st;constructor(){let t;Hf(()=>t=this.initAnimation()),this.destroyRef.onDestroy(()=>t?.revert())}initAnimation(){return ql.context(()=>{let t=this.stepItems().length;this.st=W$1.create({trigger:this.hostRef.nativeElement,start:`top top`,end:()=>`+=`+t*100+`%`,pin:!0,onUpdate:e=>{this.progress.set(e.progress);let i=Math.min(Math.floor(e.progress*t),t-1);i!==this.activeIndex()&&(this.previousIndex.set(this.activeIndex()),this.activeIndex.set(i))}}),ql.to(this.fill().nativeElement,{height:`100%`,ease:`none`,scrollTrigger:{trigger:this.hostRef.nativeElement,start:`top top`,end:()=>`+=`+t*100+`%`,scrub:!0}})})}goToStep(t,e){t.preventDefault();let i=this.stepItems().length;if(i<=1)return;let r=e/(i-1),o=this.st,I=o.start+(o.end-o.start)*r;window.scrollTo({top:I,behavior:`smooth`})}static ɵfac=function(e){return new(e||n)};static ɵcmp=_I({type:n,selectors:[[`app-michael-acts`]],viewQuery:function(e,i){e&1&&hh(i.stepItems,N,5)(i.fill,ve,5),e&2&&ND(2)},decls:19,vars:13,consts:[[`fill`,``],[1,`content`],[1,`fill-track`],[1,`fill`],[1,`list`],[`title`,`Lament nad Ciszą`,3,`clicked`],[`title`,`Odpustowy Kupiec`,3,`clicked`],[`title`,`Trzy Dni Męki`,3,`clicked`],[`title`,`Ciemność Bolesna`,3,`clicked`],[`title`,`Wielki Wrzask i Wielki Wstyd`,3,`clicked`],[1,`curse`],[1,`right`,3,`prevSrc`,`currentSrc`,`progress`]],template:function(e,i){e&1&&(ii(0,`div`,1)(1,`div`,2),oh(2,`div`,3,0),bc(),ii(4,`nav`,4)(5,`app-act`,5),dh(`clicked`,function(o){return i.goToStep(o,0)}),JD(6,` Michałek od dziecka nie wykrztusił ani słowa. Matka płakała w poduszkę, batiuszka odprawiał egzorcyzmy, a wieś współczuła chłopcu, który żył w wiecznym, głębokim milczeniu. `),bc(),ii(7,`app-act`,6),dh(`clicked`,function(o){return i.goToStep(o,1)}),JD(8,` Podczas odpustu św. Antoniego, Michałek oddał pięćdziesiąt groszy skradzionych ze skarbonki sołtysa wędrownemu handlarzowi. W zamian otrzymał zakazany owoc cywilizacji: gumę Turbo z obrazkiem auta. `),bc(),ii(9,`app-act`,7),dh(`clicked`,function(o){return i.goToStep(o,2)}),JD(10,` Smak owoców leśnych zniknął po dziesięciu sekundach, ale Michałek nie odpuszczał. Żuł Tę Samą Gumę przez trzy dni i trzy noce. Mięśnie żuchwy pracowały jak tłoki w parowozie, a guma zmieniła się w twardy jak skała kauczuk. `),bc(),ii(11,`app-act`,8),dh(`clicked`,function(o){return i.goToStep(o,3)}),JD(12,` Trzeciego dnia ciśnienie w czaszce osiągnęło poziom krytyczny. Zgromadzona siła w żuchwie wystrzeliła w nerwy wzrokowe. W oczach Michałka zapadła absolutna, nieprzenikniona ciemność. Oślepł jak kret. `),bc(),ii(13,`app-act`,9),dh(`clicked`,function(o){return i.goToStep(o,4)}),JD(14,` Obojętny dotąd chłopak, przerażony nagłą utratą wzroku, zapomniał o swojej roli. Rozwarł usta i wrzasnął na całą wieś: `),ii(15,`strong`,10),JD(16,`„O, KURWA!”`),bc(),JD(17,`. Po czym, zorientowawszy się co zrobił i spłonąwszy ze wstydu przed ludźmi – zamilkł już na wieki. `),bc()(),oh(18,`app-dynamic-image`,11),bc()),e&2&&(Uy(5),vh(`selected`,i.activeIndex()===0),Uy(2),vh(`selected`,i.activeIndex()===1),Uy(2),vh(`selected`,i.activeIndex()===2),Uy(2),vh(`selected`,i.activeIndex()===3),Uy(2),vh(`selected`,i.activeIndex()===4),Uy(5),rh(`prevSrc`,i.previousImageSrc())(`currentSrc`,i.currentImageSrc())(`progress`,i.progress()))},dependencies:[N,j],styles:[`[_nghost-%COMP%]{width:100%;height:100vh;display:flex;justify-content:center;align-items:center;overflow:hidden}.content[_ngcontent-%COMP%]{width:100%;max-width:1300px;margin:0 auto;display:flex;padding:0 2rem;position:relative;align-items:center;gap:4rem}.content[_ngcontent-%COMP%]   .fill-track[_ngcontent-%COMP%]{position:absolute;left:0;top:0;bottom:0;width:2px;z-index:1;background-color:#ffffff14}.content[_ngcontent-%COMP%]   .fill-track[_ngcontent-%COMP%]   .fill[_ngcontent-%COMP%]{width:100%;height:0;background-color:var(--%NS%story-accent);box-shadow:0 0 12px var(--%NS%story-accent)}.content[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:10px;flex:1;position:relative;z-index:1}.content[_ngcontent-%COMP%]   .curse[_ngcontent-%COMP%]{color:var(--%NS%story-accent);text-shadow:0 0 10px var(--%NS%story-glow-level-2);font-weight:700}.content[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%]{position:absolute;left:50%;top:50%;width:100vw;height:100vh;transform:translate(-50%,-50%);z-index:0;pointer-events:none}`]})};var ce=`#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uProgress;

in vec2 vUv;
out vec4 fragColor;

const mat2 m = mat2(0.80,  0.60, -0.60,  0.80);

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float noise(in vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
               mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
}

float fbm(vec2 p) {
    float f = 0.0;
    f += 0.5000 * noise(p); p = m * p * 2.02;
    f += 0.2500 * noise(p); p = m * p * 2.03;
    f += 0.1250 * noise(p); p = m * p * 2.01;
    f += 0.0625 * noise(p);
    return f;
}

void main() {
    vec2 st = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;

    // ODWR\xD3CENIE STAN\xD3W: 1.0 na samej g\xF3rze (uProgress = 0.0), 0.0 na dole (uProgress = 1.0)
    float tension = pow(1.0 - uProgress, 1.3);

    // uTime is accumulated using the current progress-dependent flow speed.
    float flowTime = uTime;

    // Dynamiczna skala szumu (wi\u0119ksza g\u0119sto\u015B\u0107/skala na g\xF3rze, g\u0142adka/du\u017Ca na dole)
    float scale = mix(1.8, 3.2, tension);

    // Wektor stale p\u0142yn\u0105cego dymu w tle
    vec2 flowVector = vec2(sin(flowTime * 0.5) * 0.2, flowTime * 0.4);

    // Warstwa 1: Podstawowy p\u0142yn\u0105cy ruch
    vec2 q = vec2(
        fbm(st * scale + flowVector),
        fbm(st * scale + flowVector + vec2(5.2, 1.3))
    );

    // Warstwa 2: Zawirowania t\u0142a
    vec2 r = vec2(
        fbm(st * scale + 1.2 * q + vec2(1.7, 9.2) + flowVector * 0.5),
        fbm(st * scale + 1.2 * q + vec2(8.3, 2.8) + flowVector * 0.3)
    );

    float f = fbm(st * scale + r);

    // Ziarno obecne na g\xF3rze, zanikaj\u0105ce ku do\u0142owi
    float liveGrain = (hash(st * 80.0 + vec2(uTime * 2.0)) - 0.5) * 0.06 * tension;

    // Przezroczysto\u015B\u0107 \u2013 na g\xF3rze wyra\u017Ana (mix 0.3->0.6), na dole schodzi do rzadkiej mgie\u0142ki (0.1->0.3)
    float alpha = smoothstep(0.1, 0.75, f) * mix(0.3, 0.6, tension) + liveGrain;

    // Kolorystyka (zachowana Twoja zmiana z czerwonawych na odcienie bieli/szaro\u015Bci)
    vec3 calmColor = vec3(0.78, 0.80, 0.83); 
    vec3 tensionColor = vec3(0.4, 0.4, 0.4); 

    vec3 color = mix(calmColor, tensionColor, tension * 0.8);

    fragColor = vec4(color, clamp(alpha, 0.0, 0.75));
}`;var fe=[`canvas`];var L=class n{progress=eP.required();destroyRef=v(Ie);currentProgress=0;canvasRef=tP.required(`canvas`);renderer;geometry;program;mesh;animationFrameId;previousFrameTime;timeUniform={value:0};resolutionUniform={value:new Float32Array(2)};progressUniform={value:0};constructor(){Hf(()=>{this.initRenderer(),this.resize(),this.animationFrameId=requestAnimationFrame(this.animate)}),this.destroyRef.onDestroy(()=>this.dispose())}initRenderer(){let t=this.canvasRef().nativeElement;this.renderer=new j$1({canvas:t,dpr:Math.min(window.devicePixelRatio,2),alpha:!0});let e=this.renderer.gl;this.geometry=new it(e,{position:{size:2,data:new Float32Array([-1,-1,3,-1,-1,3])},uv:{size:2,data:new Float32Array([0,0,2,0,0,2])}}),this.program=new nt(e,{vertex:o,fragment:ce,uniforms:{uTime:this.timeUniform,uResolution:this.resolutionUniform,uProgress:this.progressUniform},transparent:!0}),this.mesh=new ot(e,{geometry:this.geometry,program:this.program})}animate=t=>{let e=Math.min((t-(this.previousFrameTime??t))*.001,.05);this.previousFrameTime=t,this.currentProgress+=(this.progress()-this.currentProgress)*.01;let i=Math.pow(1-this.currentProgress,1.3);this.timeUniform.value+=e*(.3+.5*i),this.progressUniform.value=this.currentProgress,this.renderer.render({scene:this.mesh}),this.animationFrameId=requestAnimationFrame(this.animate)};resize(){let t=this.canvasRef().nativeElement,e=t.clientWidth||window.innerWidth,i=t.clientHeight||window.innerHeight;this.renderer.setSize(e,i);let r=this.renderer.gl;this.resolutionUniform.value[0]=r.canvas.width,this.resolutionUniform.value[1]=r.canvas.height}dispose(){cancelAnimationFrame(this.animationFrameId),this.geometry.remove(),this.program.remove()}static ɵfac=function(e){return new(e||n)};static ɵcmp=_I({type:n,selectors:[[`app-michael-background`]],viewQuery:function(e,i){e&1&&hh(i.canvasRef,fe,5),e&2&&ND()},hostBindings:function(e,i){e&1&&dh(`resize`,function(){return i.resize()},ey)},inputs:{progress:[1,`progress`]},decls:2,vars:0,consts:[[`canvas`,``]],template:function(e,i){e&1&&ih(0,`canvas`,null,0)},styles:[`[_nghost-%COMP%]{width:100%;height:100%;position:fixed}canvas[_ngcontent-%COMP%]{width:100%!important;height:100%!important;display:block}`]})};ql.registerPlugin(W$1);var le=class n{hostRef=v(ur);destroyRef=v(Ie);progress=No(0);constructor(){let t;Hf(()=>t=this.initAnimation()),this.destroyRef.onDestroy(()=>t?.kill())}initAnimation(){return W$1.create({trigger:this.hostRef.nativeElement,start:`top top`,end:`bottom bottom`,scrub:!0,onUpdate:t=>this.progress.set(t.progress)})}static ɵfac=function(e){return new(e||n)};static ɵcmp=_I({type:n,selectors:[[`app-sticky-accordion`]],decls:7,vars:1,consts:[[3,`progress`]],template:function(e,i){e&1&&(oh(0,`app-michael-background`,0),ii(1,`section`),oh(2,`app-michael-intro`),bc(),ii(3,`section`),oh(4,`app-michael-acts`),bc(),ii(5,`section`),oh(6,`app-michael-epilogue`),bc()),e&2&&rh(`progress`,i.progress())},dependencies:[q,H,B,L],styles:[`[_nghost-%COMP%]{--%NS%color-primary: #fffce1;--%NS%story-accent: #ffffff;--%NS%story-background: #0e100f;--%NS%story-glow-level-1: rgba(255, 252, 225, .2);--%NS%story-glow-level-2: rgba(255, 252, 225, .4);--%NS%story-glow-level-3: rgba(255, 252, 225, .8);display:block;background:var(--%NS%story-background);font-family:Cormorant Garamond,serif;color:var(--%NS%color-primary)}`]})};export{le as StickyAccordion};