import{C as Yv,E as ch,I as th,L as uh,g as Qv,o as ID,s as II,w as ZL}from"./main-QRHSW4OC.js";import{a as tt,i as ot,n as it,r as j,t as et}from"./chunk-B21hzAvl.js";var me=`attribute vec2 position;
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
}`;var pe=`precision highp float;

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
}`;var ze=.3333333333333333;var u=1/6;var p=new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]);var de=new Uint8Array(256);for(let n=0;n<256;n++)de[n]=Math.floor(Math.random()*256);var v=new Uint8Array(512);var I=new Uint8Array(512);for(let n=0;n<512;n++)v[n]=de[n&255],I[n]=v[n]%12;function ue(n,e,t){let i,o,r,s,a=(n+e+t)*ze,c=Math.floor(n+a),m=Math.floor(e+a),S=Math.floor(t+a),P=(c+m+S)*u,j=c-P,W=m-P,be=S-P,f=n-j,g=e-W,d=t-be,y,w,b,M,x,z;f>=g?g>=d?(y=1,w=0,b=0,M=1,x=1,z=0):f>=d?(y=1,w=0,b=0,M=1,x=0,z=1):(y=0,w=0,b=1,M=1,x=0,z=1):g<d?(y=0,w=0,b=1,M=0,x=1,z=1):f<d?(y=0,w=1,b=0,M=0,x=1,z=1):(y=0,w=1,b=0,M=1,x=1,z=0);let X=f-y+u,q=g-w+u,K=d-b+u,Z=f-M+2*u,Q=g-x+2*u,J=d-z+2*u,$=f-1+3*u,ee=g-1+3*u,te=d-1+3*u,R=c&255,B=m&255,V=S&255,F=.6-f*f-g*g-d*d;if(F<0)i=0;else{F*=F;let h=I[R+v[B+v[V]]]*3;i=F*F*(p[h]*f+p[h+1]*g+p[h+2]*d)}let _=.6-X*X-q*q-K*K;if(_<0)o=0;else{_*=_;let h=I[R+y+v[B+w+v[V+b]]]*3;o=_*_*(p[h]*X+p[h+1]*q+p[h+2]*K)}let C=.6-Z*Z-Q*Q-J*J;if(C<0)r=0;else{C*=C;let h=I[R+M+v[B+x+v[V+z]]]*3;r=C*C*(p[h]*Z+p[h+1]*Q+p[h+2]*J)}let T=.6-$*$-ee*ee-te*te;if(T<0)s=0;else{T*=T;let h=I[R+1+v[B+1+v[V+1]]]*3;s=T*T*(p[h]*$+p[h+1]*ee+p[h+2]*te)}return 32*(i+o+r+s)}function k(n,e,t,i=3){let o=0,r=1,s=1,a=0;for(let c=0;c<i;c++)o+=ue(n*s,e*s,t*s)*r,a+=r,s*=2,r*=.5;return o/a}function O(n,e,t=0,i=.0018,o=2){let s=n*i,a=e*i;return{vx:(k(s,a+.001,t,o)-k(s,a-.001,t,o))/(2*.001),vy:-((k(s+.001,a,t,o)-k(s-.001,a,t,o))/(2*.001))}}var G=class{constructor(e){this.viewport=e}viewport;mesh;GRID_SPACING=15;resolution=new Float32Array([1,1]);positions;angles;lengths;rows=0;cols=0;init(e){let t=new it(e,{vertex:me,fragment:pe,uniforms:{uResolution:{value:this.resolution}},transparent:!0,cullFace:null});this.mesh=new ot(e,{mode:e.POINTS,program:t,geometry:new et(e,{position:{size:2,data:new Float32Array(0)}})})}resize(){if(this.resolution[0]=this.viewport.size.width,this.resolution[1]=this.viewport.size.height,this.cols=Math.floor(this.viewport.size.width/this.GRID_SPACING),this.rows=Math.floor(this.viewport.size.height/this.GRID_SPACING),this.cols<=0||this.rows<=0)return;let e=this.cols*this.rows;this.positions=new Float32Array(e*2),this.angles=new Float32Array(e),this.lengths=new Float32Array(e);let t=(this.viewport.size.width-(this.cols-1)*this.GRID_SPACING)/2,i=(this.viewport.size.height-(this.rows-1)*this.GRID_SPACING)/2,o=0;for(let r=0;r<this.rows;r++)for(let s=0;s<this.cols;s++){let a=t+s*this.GRID_SPACING,c=i+r*this.GRID_SPACING,m=this.viewport.screenToWorld(new tt(a,c));this.positions[o*2]=m.x,this.positions[o*2+1]=m.y,o++}this.mesh.geometry=new et(this.mesh.gl,{position:{size:2,data:this.positions},aAngle:{size:1,data:this.angles},aLength:{size:1,data:this.lengths}})}update(e){let t=0;for(let i=0;i<this.rows;i++)for(let o=0;o<this.cols;o++){let r=this.positions[t*2],s=this.positions[t*2+1],a=O(r,s,e.clock.time);this.angles[t]=Math.atan2(a.vy,a.vx),this.lengths[t]=Math.hypot(a.vx,a.vy),t++}return this.mesh.geometry.attributes.aAngle.needsUpdate=!0,this.mesh.geometry.attributes.aLength.needsUpdate=!0,this.mesh}};var ve=`attribute vec2 aPosition;
attribute vec2 aVelocity;
attribute float aID;

uniform mat4 uProjectionMatrix;
uniform float uTime;

varying float vAngle;
varying float vSpeed;
varying vec2 vPosition;
varying float vID;

void main() {
    vAngle = atan(aVelocity.y, aVelocity.x);
    vSpeed = length(aVelocity);
    vPosition = aPosition;
    vID = aID;
    
    gl_PointSize = 8.0;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}`;var fe=`precision highp float;

varying float vAngle;
varying float vSpeed;
varying float vID;

uniform float uTime;

float hash(float n) {
    return fract(sin(n * 12.9898) * 43758.5453123);
}

vec2 rotate(vec2 uv, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return vec2(uv.x * c - uv.y * s, uv.x * s + uv.y * c);
}

void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    uv = rotate(uv, vAngle);

    // 1. KERNEL / KSZTA\u0141T OGNIKA
    float flameShape = smoothstep(0.45, 0.05, length(vec2(uv.x * 0.85, uv.y * (1.1 + uv.x * 1.3))));

    // 2. UNIKALNY SEED DLA KA\u017BDEJ CZ\u0104STECZKI (Brak wp\u0142ywu pozycji!)
    float uniqueSeed = hash(vID); 

    // --- BARWA (Nie po\u0142\u0105czona z pozycj\u0105 na ekranie) ---
    float colorPulse = sin(uTime * 4.0 + uniqueSeed * 6.2831) * 0.5 + 0.5;

    vec3 cCoreA = vec3(1.2, 1.2, 1.3);
    vec3 cMidA  = vec3(0.1, 0.45, 0.95);

    vec3 cCoreB = vec3(0.8, 0.8, 1.4);
    vec3 cMidB  = vec3(0.2, 0.65, 1.0);

    vec3 cCore  = mix(cCoreA, cCoreB, colorPulse);
    vec3 cMid   = mix(cMidA, cMidB, colorPulse);
    vec3 cOuter = vec3(0.0, 0.0, 0.0);

    float r = length(uv - vec2(0.05, 0.0)) * 2.2; 
    vec3 color = mix(cCore, cMid, smoothstep(0.0, 0.3, r));
    color = mix(color, cOuter, smoothstep(0.3, 0.8, r));

    // --- JASNO\u015A\u0106 ZALE\u017BNA OD PR\u0118DKO\u015ACI ---
    float dimming = sin(uTime * 6.0 + uniqueSeed * 12.34) * 0.1 + 0.9;
    
    // Zwi\u0119ksz/zmniejsz mno\u017Cnik (np. 0.1), w zale\u017Cno\u015Bci jak wysokie masz vSpeed w aplikacji:
    float speedBrightness = 0.7 + clamp(vSpeed * 0.1, 0.0, 1.0);

    float intensity = flameShape * dimming * speedBrightness;

    gl_FragColor = vec4(color * intensity, intensity);
}`;var ge=400;var ye=.002;var De=10;var ie=200;var Ae=ie*ie;var N=class{constructor(e){this.originPosition=e;this.position=new tt(e.x,e.y)}originPosition;position;velocity=new tt(0,0);update(e,t){this.velocity=this.calcVelocity(e,t),this.position.x+=this.velocity.x*e.deltaTime*ge,this.position.y+=this.velocity.y*e.deltaTime*ge}calcVelocity(e,t){let i=O(this.position.x,this.position.y,e.time),o=(this.originPosition.x-this.position.x)*ye,r=(this.originPosition.y-this.position.y)*ye,s=this.calculateMouseForce(t);return new tt(i.vx+o+s.x,i.vy+r+s.y)}calculateMouseForce(e){let t=0,i=0;if(e){let o=this.position.x-e.position.x,r=this.position.y-e.position.y,s=o*o+r*r;if(s<Ae&&s>0){let a=Math.sqrt(s),c=(1-a/ie)*De*e.forceMultiplier;t=o/a*c,i=r/a*c}}return new tt(t,i)}};var U=class{constructor(e){this.viewport=e}viewport;mesh;program;timeUniform={value:0};resolutionUniform={value:new Float32Array([1,1])};positions;velocities;ids;boids=[];init(e,t){this.program=new it(e,{vertex:ve,fragment:fe,uniforms:{uResolution:this.resolutionUniform,uTime:this.timeUniform},transparent:!0,depthTest:!1}),this.mesh=new ot(e,{mode:e.POINTS,program:this.program,geometry:new et(e)}),this.initBoids(t)}initBoids(e){let i=Math.floor(e.width*1.3/15),o=Math.floor(e.height*1.3/15),r=(this.viewport.size.width-(i-1)*15)/2,s=(this.viewport.size.height-(o-1)*15)/2,a=i*o;this.positions=new Float32Array(a*2),this.velocities=new Float32Array(a*2),this.ids=Float32Array.from({length:a},(c,m)=>m);for(let c=0;c<o;c++)for(let m=0;m<i;m++){let S=(Math.random()-.5)*2*15,P=(Math.random()-.5)*2*15,j=r+m*15+S,W=s+c*15+P;this.boids.push(new N(new tt(j,W)))}}resize(){this.resolutionUniform.value[0]=this.viewport.size.width,this.resolutionUniform.value[1]=this.viewport.size.height,this.mesh.geometry=new et(this.mesh.gl,{aPosition:{size:2,data:this.positions},aVelocity:{size:2,data:this.velocities},aID:{size:1,data:this.ids}})}update(e){this.timeUniform.value=e.clock.time;for(let t=0;t<this.boids.length;t++){let i=this.boids[t];i.update(e.clock,e.mouse);let o=this.viewport.worldToNdc(i.position);this.positions[t*2]=o.x,this.positions[t*2+1]=o.y,this.velocities[t*2]=i.velocity.x,this.velocities[t*2+1]=i.velocity.y}return this.mesh.geometry.attributes.aVelocity.needsUpdate=!0,this.mesh.geometry.attributes.aPosition.needsUpdate=!0,this.mesh}};var H=class{size={width:1,height:1};zoom=1;cameraPosition=new tt;resize(e){this.size=e}worldToNdc(e){return new tt((e.x-this.cameraPosition.x)*this.zoom/(this.size.width/2),(e.y-this.cameraPosition.y)*this.zoom/(this.size.height/2))}ndcToWorld(e){return new tt(e.x*(this.size.width/2)/this.zoom+this.cameraPosition.x,e.y*(this.size.height/2)/this.zoom+this.cameraPosition.y)}screenToWorld(e){let t=e.x/this.size.width*2-1,i=-(e.y/this.size.height)*2+1;return this.ndcToWorld(new tt(t,i))}};var Y=class{time=0;deltaTime=0;timeScale=.2;lastFrameTime=performance.now();update(){let e=performance.now(),t=(e-this.lastFrameTime)*.001;this.lastFrameTime=e;let i=Math.min(t,.1);this.deltaTime=i*this.timeScale,this.time+=this.deltaTime}};var Fe=[`canvas`];var we=class n{canvasRef=ZL.required(`canvas`);renderer;animationFrameId=0;viewport=new H;clock=new Y;mousePos;isMouseDown=!1;vectorFieldMesh=new G(this.viewport);boidsMesh=new U(this.viewport);ngAfterViewInit(){this.initOGL(),this.onResize(),this.animate()}initOGL(){let e=this.canvasRef().nativeElement;this.renderer=new j({canvas:e,antialias:!0,alpha:!0,dpr:Math.min(window.devicePixelRatio||1,2)});let t=this.getSize(),i=this.renderer.gl;this.vectorFieldMesh.init(i),this.boidsMesh.init(i,t)}onResize(){let e=this.getSize();this.viewport.resize(e),this.renderer.setSize(e.width,e.height),this.vectorFieldMesh.resize(),this.boidsMesh.resize()}getSize(){let t=this.canvasRef().nativeElement.parentElement;return{width:t?.clientWidth??1,height:t?.clientHeight??1}}animate=()=>{this.animationFrameId=requestAnimationFrame(this.animate),this.renderer.gl.enable(this.renderer.gl.BLEND),this.renderer.gl.blendFunc(this.renderer.gl.ALPHA,this.renderer.gl.ONE),this.clock.update();let e={clock:this.clock,mouse:this.mousePos?{position:this.mousePos,forceMultiplier:this.isMouseDown?-1:1}:void 0};this.renderer.gl.clear(this.renderer.gl.COLOR_BUFFER_BIT),this.renderer.render({scene:this.boidsMesh.update(e)})};ngOnDestroy(){this.animationFrameId&&cancelAnimationFrame(this.animationFrameId)}onMouseMove(e){this.mousePos=this.viewport.screenToWorld(new tt(e.clientX,e.clientY))}onMouseOut(e){(!e.relatedTarget||e.relatedTarget.nodeName===`HTML`)&&this.onMouseLeave()}onMouseLeave(){this.mousePos=void 0}onPointerDown(){this.isMouseDown=!0}onPointerUp(){this.isMouseDown=!1}static ɵfac=function(t){return new(t||n)};static ɵcmp=II({type:n,selectors:[[`app-boids-page`]],viewQuery:function(t,i){t&1&&uh(i.canvasRef,Fe,5),t&2&&ID()},hostBindings:function(t,i){t&1&&ch(`resize`,function(){return i.onResize()},Qv)(`pointermove`,function(r){return i.onMouseMove(r)},Qv)(`mouseout`,function(r){return i.onMouseOut(r)},Yv)(`blur`,function(){return i.onMouseLeave()},Qv)(`pointerdown`,function(){return i.onPointerDown()},Qv)(`pointerup`,function(){return i.onPointerUp()},Qv)},decls:2,vars:0,consts:[[`canvas`,``]],template:function(t,i){t&1&&th(0,`canvas`,null,0)},styles:[`[_nghost-%COMP%]{display:flex;height:100vh;width:100vw;background:radial-gradient(circle,#0a0a11,#0b0c11);overflow:hidden}canvas[_ngcontent-%COMP%]{width:100%;height:100%;display:block}`]})};export{we as BoidsPage};