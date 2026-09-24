import{D as kv,E as kL,I as zp,M as tD,_ as Yp,i as Bp,p as Rv,v as aI}from"./main-MSHIKNC6.js";import{a as tt,i as ot,n as it,r as j,t as et}from"./chunk-B21hzAvl.js";var pe=`attribute vec2 position;
attribute float aAngle;
attribute float aLength;

uniform vec2 uResolution;

varying float vAngle;
varying float vLen;

void main() {
    vAngle = aAngle;
    vLen = sqrt(aLength);

    vec2 clipSpace = position / (uResolution * 0.5);

    gl_Position = vec4(clipSpace.x, clipSpace.y, 0.0, 1.0);
    
    gl_PointSize = 22.0;
}`;var me=`precision highp float;

varying float vAngle;
varying float vLen;

vec2 rotate(vec2 uv, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return vec2(uv.x * c - uv.y * s, uv.x * s + uv.y * c);
}

float approxTanh(float x) {
    float e2x = exp(2.0 * x);
    return (e2x - 1.0) / (e2x + 1.0);
}

void main() {
    vec2 st = gl_PointCoord - vec2(0.5);
    st = rotate(st, vAngle);

    float k = 0.3; 
    float normSpeed = approxTanh(vLen * k);

    float headTip = 0.30;
    float headBase = 0.08;
    
    float tailStart = mix(-0.08, -0.32, normSpeed);

    float line = step(tailStart, st.x) * step(st.x, headBase) * step(-0.02, st.y) * step(st.y, 0.02);
    
    float head = step(headBase, st.x) * step(st.x, headTip) * step(abs(st.y), (headTip - st.x) * 0.45);

    if (max(line, head) < 0.5) discard;

    vec3 c0 = vec3(0.02, 0.05, 0.15); // Ciemny fiolet/granat
    vec3 c1 = vec3(0.00, 0.35, 0.65); // G\u0142\u0119boki b\u0142\u0119kit
    vec3 c2 = vec3(0.00, 0.75, 0.55); // Morska ziele\u0144 / cyjan
    vec3 c3 = vec3(0.85, 0.95, 0.35); // Limonka / \u017B\xF3\u0142\u0107 dla pik\xF3w

    vec3 color;
    if (normSpeed < 0.3) {
        color = mix(c0, c1, normSpeed / 0.3);
    } else if (normSpeed < 0.7) {
        color = mix(c1, c2, (normSpeed - 0.3) / 0.4);
    } else {
        color = mix(c2, c3, (normSpeed - 0.7) / 0.3);
    }

    gl_FragColor = vec4(color, 0.55);
}`;var _e=.3333333333333333;var u=1/6;var m=new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]);var de=new Uint8Array(256);for(let s=0;s<256;s++)de[s]=Math.floor(Math.random()*256);var v=new Uint8Array(512);var I=new Uint8Array(512);for(let s=0;s<512;s++)v[s]=de[s&255],I[s]=v[s]%12;function ue(s,e,t){let i,o,r,a,n=(s+e+t)*_e,c=Math.floor(s+n),l=Math.floor(e+n),b=Math.floor(t+n),x=(c+l+b)*u,W=c-x,K=l-x,Ae=b-x,g=s-W,f=e-K,d=t-Ae,y,w,A,M,S,_;g>=f?f>=d?(y=1,w=0,A=0,M=1,S=1,_=0):g>=d?(y=1,w=0,A=0,M=1,S=0,_=1):(y=0,w=0,A=1,M=1,S=0,_=1):f<d?(y=0,w=0,A=1,M=0,S=1,_=1):g<d?(y=0,w=1,A=0,M=0,S=1,_=1):(y=0,w=1,A=0,M=1,S=1,_=0);let X=g-y+u,j=f-w+u,q=d-A+u,Z=g-M+2*u,J=f-S+2*u,Q=d-_+2*u,$=g-1+3*u,ee=f-1+3*u,te=d-1+3*u,k=c&255,T=l&255,E=b&255,D=.6-g*g-f*f-d*d;if(D<0)i=0;else{D*=D;let h=I[k+v[T+v[E]]]*3;i=D*D*(m[h]*g+m[h+1]*f+m[h+2]*d)}let z=.6-X*X-j*j-q*q;if(z<0)o=0;else{z*=z;let h=I[k+y+v[T+w+v[E+A]]]*3;o=z*z*(m[h]*X+m[h+1]*j+m[h+2]*q)}let R=.6-Z*Z-J*J-Q*Q;if(R<0)r=0;else{R*=R;let h=I[k+M+v[T+S+v[E+_]]]*3;r=R*R*(m[h]*Z+m[h+1]*J+m[h+2]*Q)}let F=.6-$*$-ee*ee-te*te;if(F<0)a=0;else{F*=F;let h=I[k+1+v[T+1+v[E+1]]]*3;a=F*F*(m[h]*$+m[h+1]*ee+m[h+2]*te)}return 32*(i+o+r+a)}function L(s,e,t,i=3){let o=0,r=1,a=1,n=0;for(let c=0;c<i;c++)o+=ue(s*a,e*a,t*a)*r,n+=r,a*=2,r*=.5;return o/n}function G(s,e,t=0,i=.0018,o=2){let a=s*i,n=e*i;return{vx:(L(a,n+.001,t,o)-L(a,n-.001,t,o))/(2*.001),vy:-((L(a+.001,n,t,o)-L(a-.001,n,t,o))/(2*.001))}}var V=class{constructor(e){this.viewport=e}viewport;mesh;GRID_SPACING=15;resolution=new Float32Array([1,1]);positions;angles;lengths;rows=0;cols=0;init(e){let t=new it(e,{vertex:pe,fragment:me,uniforms:{uResolution:{value:this.resolution}},transparent:!0,cullFace:null});this.mesh=new ot(e,{mode:e.POINTS,program:t,geometry:new et(e,{position:{size:2,data:new Float32Array(0)}})})}resize(){if(this.resolution[0]=this.viewport.size.width,this.resolution[1]=this.viewport.size.height,this.cols=Math.floor(this.viewport.size.width/this.GRID_SPACING),this.rows=Math.floor(this.viewport.size.height/this.GRID_SPACING),this.cols<=0||this.rows<=0)return;let e=this.cols*this.rows;this.positions=new Float32Array(e*2),this.angles=new Float32Array(e),this.lengths=new Float32Array(e);let t=(this.viewport.size.width-(this.cols-1)*this.GRID_SPACING)/2,i=(this.viewport.size.height-(this.rows-1)*this.GRID_SPACING)/2,o=0;for(let r=0;r<this.rows;r++)for(let a=0;a<this.cols;a++){let n=t+a*this.GRID_SPACING,c=i+r*this.GRID_SPACING,l=this.viewport.screenToWorld(new tt(n,c));this.positions[o*2]=l.x,this.positions[o*2+1]=l.y,o++}this.mesh.geometry=new et(this.mesh.gl,{position:{size:2,data:this.positions},aAngle:{size:1,data:this.angles},aLength:{size:1,data:this.lengths}})}update(e){let t=0;for(let i=0;i<this.rows;i++)for(let o=0;o<this.cols;o++){let r=this.positions[t*2],a=this.positions[t*2+1],n=G(r,a,e.clock.time);this.angles[t]=Math.atan2(n.vy,n.vx),this.lengths[t]=Math.hypot(n.vx,n.vy),t++}return this.mesh.geometry.attributes.aAngle.needsUpdate=!0,this.mesh.geometry.attributes.aLength.needsUpdate=!0,this.mesh}};var ve=`attribute vec2 aPosition;
attribute vec2 aVelocity;
attribute float aID;
attribute float aAnger;

uniform mat4 uProjectionMatrix;
uniform float uTime;

varying float vAngle;
varying float vSpeed;
varying vec2 vPosition;
varying float vID;
varying float vAnger;

void main() {
    vAngle = atan(aVelocity.y, aVelocity.x);
    vSpeed = length(aVelocity);
    vPosition = aPosition;
    vID = aID;
    vAnger = aAnger;
    
    gl_PointSize = 8.0;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}`;var ge=`precision highp float;

varying float vAngle;
varying float vSpeed;
varying float vID;
varying float vAnger;

uniform float uTime;

// STA\u0141E PALETY - SPOKOJNA (NIEBIESKA)
const vec3 C_CALM_CORE_A = vec3(1.2, 1.2, 1.3);
const vec3 C_CALM_MID_A  = vec3(0.1, 0.45, 0.95);
const vec3 C_CALM_CORE_B = vec3(0.8, 0.8, 1.4);
const vec3 C_CALM_MID_B  = vec3(0.2, 0.65, 1.0);

// STA\u0141E PALETY - W\u015ACIEK\u0141A (CZERWONA/OGNISTA)
const vec3 C_ANGRY_CORE_A = vec3(1.9, 0.05, 0.0);
const vec3 C_ANGRY_MID_A  = vec3(0.8, 0.01, 0.0);

const vec3 C_ANGRY_CORE_B = vec3(1.6, 0.5, 0.3); 
const vec3 C_ANGRY_MID_B  = vec3(1.0, 0.25, 0.1);

float hash(float n) {
    return fract(sin(n * 12.9898) * 43758.5453123);
}

vec2 rotate(vec2 uv, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return vec2(uv.x * c - uv.y * s, uv.x * s + uv.y * c);
}

void main() {
    vec2 uv = rotate(gl_PointCoord - vec2(0.5), vAngle);
    float uniqueSeed = hash(vID); 

    // 1. KSZTA\u0141T OGNIKA
    float flameShape = smoothstep(0.45, 0.05, length(vec2(uv.x * 0.85, uv.y * (1.1 + uv.x * 1.3))));

    // 2. CZYNIK ANGER (Szybkie przej\u015Bcie w czerwie\u0144)
    float angerFactor = smoothstep(0.02, 0.4, clamp(vAnger, 0.0, 1.0)); 

    // 3. MIX W EWOLUCJI CZASOWEJ (A <-> B dla obu stan\xF3w)
    float colorPulse = sin(uTime * 4.0 + uniqueSeed * 6.2831) * 0.5 + 0.5;

    // Pobranie koloru spokojnego i w\u015Bciek\u0142ego dla danej klatki
    vec3 cCoreCalm = mix(C_CALM_CORE_A, C_CALM_CORE_B, colorPulse);
    vec3 cMidCalm  = mix(C_CALM_MID_A, C_CALM_MID_B, colorPulse);

    vec3 cCoreAngry = mix(C_ANGRY_CORE_A, C_ANGRY_CORE_B, colorPulse);
    vec3 cMidAngry  = mix(C_ANGRY_MID_A, C_ANGRY_MID_B, colorPulse);

    // 4. LERP SPOKOJNY -> W\u015ACIEK\u0141Y
    vec3 cCore = mix(cCoreCalm, cCoreAngry, angerFactor);
    vec3 cMid  = mix(cMidCalm, cMidAngry, angerFactor);

    // 5. MIESZANIE KANA\u0141\xD3W OD \u015ARODKA DO KRAW\u0118DZI
    float r = length(uv - vec2(0.05, 0.0)) * 2.2; 
    vec3 color = mix(cCore, cMid, smoothstep(0.0, 0.3, r));
    color = mix(color, vec3(0.0), smoothstep(0.3, 0.8, r));

    // 6. DYNAMIKA PULSOWANIA I JASNO\u015A\u0106
    float pulseSpeed = mix(6.0, 22.0, angerFactor);
    float wave = sin(uTime * pulseSpeed + uniqueSeed * 12.34) * 0.7 +
                 cos(uTime * (pulseSpeed * 1.5) + uniqueSeed * 45.67) * 0.3;

    float dimming = 0.9 + wave * mix(0.1, 0.4, angerFactor);
    float speedBrightness = 0.7 + clamp(vSpeed * 0.1, 0.0, 1.0);

    float intensity = flameShape * dimming * speedBrightness;

    gl_FragColor = vec4(color * intensity, intensity);
}`;var fe=400;var ye=.002;var Ce=10;var ie=200;var Pe=ie*ie;var B=class{constructor(e){this.originPosition=e;this.position=new tt(e.x,e.y)}originPosition;position;velocity=new tt(0,0);anger=0;mouseForce=new tt;update(e,t){this.recalculateVelocity(e,t),this.position.x+=this.velocity.x*e.deltaTime*fe,this.position.y+=this.velocity.y*e.deltaTime*fe;let i=3;this.anger=Math.max(0,this.anger-e.deltaTime*i)}recalculateVelocity(e,t){let i=G(this.position.x,this.position.y,e.time),o=(this.originPosition.x-this.position.x)*ye,r=(this.originPosition.y-this.position.y)*ye;this.recalculateMouseForce(t),this.velocity.set(i.vx+o+this.mouseForce.x,i.vy+r+this.mouseForce.y)}recalculateMouseForce(e){if(this.mouseForce.set(0,0),e){let t=this.position.x-e.position.x,i=this.position.y-e.position.y,o=t*t+i*i;if(o<Pe&&o>0){let r=Math.sqrt(o),a=1-r/ie,c=a*Math.abs(e.forceMultiplier);this.anger=Math.min(1,Math.max(this.anger,c));let l=a*Ce*e.forceMultiplier;this.mouseForce.set(t/r*l,i/r*l)}}}};var U=class{constructor(e){this.viewport=e}viewport;mesh;program;timeUniform={value:0};resolutionUniform={value:new Float32Array([1,1])};positions;velocities;ids;angers;sparks=[];init(e,t){this.program=new it(e,{vertex:ve,fragment:ge,uniforms:{uResolution:this.resolutionUniform,uTime:this.timeUniform},transparent:!0,depthTest:!1}),this.mesh=new ot(e,{mode:e.POINTS,program:this.program,geometry:new et(e)}),this.initSparks(t)}initSparks(e){let i=Math.floor(e.width*1.3/15),o=Math.floor(e.height*1.3/15),r=(this.viewport.size.width-(i-1)*15)/2,a=(this.viewport.size.height-(o-1)*15)/2,n=i*o;this.positions=new Float32Array(n*2),this.velocities=new Float32Array(n*2),this.angers=new Float32Array(n),this.ids=Float32Array.from({length:n},(c,l)=>l);for(let c=0;c<o;c++)for(let l=0;l<i;l++){let b=(Math.random()-.5)*2*15,x=(Math.random()-.5)*2*15,W=r+l*15+b,K=a+c*15+x;this.sparks.push(new B(new tt(W,K)))}}resize(){this.resolutionUniform.value[0]=this.viewport.size.width,this.resolutionUniform.value[1]=this.viewport.size.height,this.mesh.geometry=new et(this.mesh.gl,{aPosition:{size:2,data:this.positions},aVelocity:{size:2,data:this.velocities},aID:{size:1,data:this.ids},aAnger:{size:1,data:this.angers}})}update(e){this.timeUniform.value=e.clock.time;for(let t=0;t<this.sparks.length;t++){let i=this.sparks[t];i.update(e.clock,e.mouse);let o=this.viewport.worldToNdc(i.position);this.positions[t*2]=o.x,this.positions[t*2+1]=o.y,this.velocities[t*2]=i.velocity.x,this.velocities[t*2+1]=i.velocity.y,this.angers[t]=i.anger}return this.mesh.geometry.attributes.aVelocity.needsUpdate=!0,this.mesh.geometry.attributes.aPosition.needsUpdate=!0,this.mesh.geometry.attributes.aAnger.needsUpdate=!0,this.mesh}};var Y=class{size={width:1,height:1};zoom=1;cameraPosition=new tt;resize(e){this.size=e}worldToNdc(e){return new tt((e.x-this.cameraPosition.x)*this.zoom/(this.size.width/2),(e.y-this.cameraPosition.y)*this.zoom/(this.size.height/2))}ndcToWorld(e){return new tt(e.x*(this.size.width/2)/this.zoom+this.cameraPosition.x,e.y*(this.size.height/2)/this.zoom+this.cameraPosition.y)}screenToWorld(e){let t=e.x/this.size.width*2-1,i=-(e.y/this.size.height)*2+1;return this.ndcToWorld(new tt(t,i))}};var H=class{time=0;deltaTime=0;timeScale=.2;lastFrameTime=performance.now();update(){let e=performance.now(),t=(e-this.lastFrameTime)*.001;this.lastFrameTime=e;let i=Math.min(t,.1);this.deltaTime=i*this.timeScale,this.time+=this.deltaTime}};var De=[`canvas`];var we=class s{canvasRef=kL.required(`canvas`);renderer;animationFrameId=0;viewport=new Y;clock=new H;mousePos;isMouseDown=!1;vectorFieldMesh=new V(this.viewport);sparksMesh=new U(this.viewport);ngAfterViewInit(){this.initOGL(),this.onResize(),this.animate()}initOGL(){let e=this.canvasRef().nativeElement;this.renderer=new j({canvas:e,antialias:!0,alpha:!0,dpr:Math.min(window.devicePixelRatio||1,2)});let t=this.getSize(),i=this.renderer.gl;this.vectorFieldMesh.init(i),this.sparksMesh.init(i,t)}onResize(){let e=this.getSize();this.viewport.resize(e),this.renderer.setSize(e.width,e.height),this.vectorFieldMesh.resize(),this.sparksMesh.resize()}getSize(){let t=this.canvasRef().nativeElement.parentElement;return{width:t?.clientWidth??1,height:t?.clientHeight??1}}animate=()=>{this.animationFrameId=requestAnimationFrame(this.animate),this.renderer.gl.enable(this.renderer.gl.BLEND),this.renderer.gl.blendFunc(this.renderer.gl.ALPHA,this.renderer.gl.ONE),this.clock.update();let e={clock:this.clock,mouse:this.mousePos?{position:this.mousePos,forceMultiplier:this.isMouseDown?-1:1}:void 0};this.renderer.gl.clear(this.renderer.gl.COLOR_BUFFER_BIT),this.renderer.render({scene:this.sparksMesh.update(e)})};ngOnDestroy(){this.animationFrameId&&cancelAnimationFrame(this.animationFrameId)}onMouseMove(e){this.mousePos=this.viewport.screenToWorld(new tt(e.clientX,e.clientY))}onMouseOut(e){(!e.relatedTarget||e.relatedTarget.nodeName===`HTML`)&&this.onMouseLeave()}onMouseLeave(){this.mousePos=void 0}onPointerDown(){this.isMouseDown=!0}onPointerUp(){this.isMouseDown=!1}static ɵfac=function(t){return new(t||s)};static ɵcmp=aI({type:s,selectors:[[`app-sparks-page`]],viewQuery:function(t,i){t&1&&Yp(i.canvasRef,De,5),t&2&&tD()},hostBindings:function(t,i){t&1&&zp(`resize`,function(){return i.onResize()},Rv)(`pointermove`,function(r){return i.onMouseMove(r)},Rv)(`mouseout`,function(r){return i.onMouseOut(r)},kv)(`blur`,function(){return i.onMouseLeave()},Rv)(`pointerdown`,function(){return i.onPointerDown()},Rv)(`pointerup`,function(){return i.onPointerUp()},Rv)},decls:2,vars:0,consts:[[`canvas`,``]],template:function(t,i){t&1&&Bp(0,`canvas`,null,0)},styles:[`[_nghost-%COMP%]{display:flex;height:100vh;width:100vw;background:radial-gradient(circle,#0a0a11,#0b0c11);overflow:hidden}canvas[_ngcontent-%COMP%]{width:100%;height:100%;display:block}`]})};export{we as SparksPage};