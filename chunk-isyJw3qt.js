import{C as Yv,E as ch,I as th,L as uh,g as Qv,o as ID,s as II,w as ZL}from"./main-XVGF4D5C.js";import{a as tt,i as ot,n as it,r as j$1,t as et}from"./chunk-B21hzAvl.js";var ce=`attribute vec2 position;
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
}`;var he=`precision highp float;

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
}`;var Pe=.3333333333333333;var d=1/6;var p=new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]);var pe=new Uint8Array(256);for(let s=0;s<256;s++)pe[s]=Math.floor(Math.random()*256);var u=new Uint8Array(512);var R=new Uint8Array(512);for(let s=0;s<512;s++)u[s]=pe[s&255],R[s]=u[s]%12;function me(s,e,t){let i,o,r,n,a=(s+e+t)*Pe,h=Math.floor(s+a),g=Math.floor(e+a),D=Math.floor(t+a),F=(h+g+D)*d,ye=h-F,we=g-F,be=D-F,v=s-ye,f=e-we,m=t-be,y,w,b,x,M,P;v>=f?f>=m?(y=1,w=0,b=0,x=1,M=1,P=0):v>=m?(y=1,w=0,b=0,x=1,M=0,P=1):(y=0,w=0,b=1,x=1,M=0,P=1):f<m?(y=0,w=0,b=1,x=0,M=1,P=1):v<m?(y=0,w=1,b=0,x=0,M=1,P=1):(y=0,w=1,b=0,x=1,M=1,P=0);let W=v-y+d,Y=f-w+d,X=m-b+d,q=v-x+2*d,K=f-M+2*d,Z=m-P+2*d,Q=v-1+3*d,J=f-1+3*d,$=m-1+3*d,z=h&255,B=g&255,V=D&255,C=.6-v*v-f*f-m*m;if(C<0)i=0;else{C*=C;let c=R[z+u[B+u[V]]]*3;i=C*C*(p[c]*v+p[c+1]*f+p[c+2]*m)}let _=.6-W*W-Y*Y-X*X;if(_<0)o=0;else{_*=_;let c=R[z+y+u[B+w+u[V+b]]]*3;o=_*_*(p[c]*W+p[c+1]*Y+p[c+2]*X)}let T=.6-q*q-K*K-Z*Z;if(T<0)r=0;else{T*=T;let c=R[z+x+u[B+M+u[V+P]]]*3;r=T*T*(p[c]*q+p[c+1]*K+p[c+2]*Z)}let I=.6-Q*Q-J*J-$*$;if(I<0)n=0;else{I*=I;let c=R[z+1+u[B+1+u[V+1]]]*3;n=I*I*(p[c]*Q+p[c+1]*J+p[c+2]*$)}return 32*(i+o+r+n)}function k(s,e,t,i=3){let o=0,r=1,n=1,a=0;for(let h=0;h<i;h++)o+=me(s*n,e*n,t*n)*r,a+=r,n*=2,r*=.5;return o/a}function O(s,e,t=0,i=.002,o=2){let n=s*i,a=e*i;return{vx:(k(n,a+.001,t,o)-k(n,a-.001,t,o))/(2*.001),vy:-((k(n+.001,a,t,o)-k(n-.001,a,t,o))/(2*.001))}}var G=class{constructor(e){this.viewport=e}viewport;mesh;GRID_SPACING=15;resolution=new Float32Array([1,1]);positions;angles;lengths;rows=0;cols=0;init(e){let t=new it(e,{vertex:ce,fragment:he,uniforms:{uResolution:{value:this.resolution}},transparent:!0,cullFace:null});this.mesh=new ot(e,{mode:e.POINTS,program:t,geometry:new et(e,{position:{size:2,data:new Float32Array(0)}})})}resize(){if(this.resolution[0]=this.viewport.width,this.resolution[1]=this.viewport.height,this.cols=Math.floor(this.viewport.width/this.GRID_SPACING),this.rows=Math.floor(this.viewport.height/this.GRID_SPACING),this.cols<=0||this.rows<=0)return;let e=this.cols*this.rows;this.positions=new Float32Array(e*2),this.angles=new Float32Array(e),this.lengths=new Float32Array(e);let t=(this.viewport.width-(this.cols-1)*this.GRID_SPACING)/2,i=(this.viewport.height-(this.rows-1)*this.GRID_SPACING)/2,o=0;for(let r=0;r<this.rows;r++)for(let n=0;n<this.cols;n++){let a=t+n*this.GRID_SPACING,h=i+r*this.GRID_SPACING,g=this.viewport.screenToWorld(new tt(a,h));this.positions[o*2]=g.x,this.positions[o*2+1]=g.y,o++}this.mesh.geometry=new et(this.mesh.gl,{position:{size:2,data:this.positions},aAngle:{size:1,data:this.angles},aLength:{size:1,data:this.lengths}})}update(e){let t=0;for(let i=0;i<this.rows;i++)for(let o=0;o<this.cols;o++){let r=this.positions[t*2],n=this.positions[t*2+1],a=O(r,n,e.clock.time);this.angles[t]=Math.atan2(a.vy,a.vx),this.lengths[t]=Math.hypot(a.vx,a.vy),t++}return this.mesh.geometry.attributes.aAngle.needsUpdate=!0,this.mesh.geometry.attributes.aLength.needsUpdate=!0,this.mesh}};var de=`attribute vec2 aPosition;
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
    
    gl_PointSize = 10.0;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}`;var ue=`precision highp float;

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

    vec3 cCoreB = vec3(1.0, 1.3, 1.4);
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
}`;var ve=400;var fe=.002;var De=10;var ee=200;var Fe=ee*ee;var N=class{constructor(e){this.originPosition=e;this.position=new tt(e.x,e.y)}originPosition;position;velocity=new tt(0,0);update(e,t){this.velocity=this.calcVelocity(e,t),this.position.x+=this.velocity.x*e.deltaTime*ve,this.position.y+=this.velocity.y*e.deltaTime*ve}calcVelocity(e,t){let i=O(this.position.x,this.position.y,e.time),o=(this.originPosition.x-this.position.x)*fe,r=(this.originPosition.y-this.position.y)*fe,n=this.calculateMouseForce(t);return new tt(i.vx+o+n.x,i.vy+r+n.y)}calculateMouseForce(e){let t=0,i=0;if(e){let o=this.position.x-e.position.x,r=this.position.y-e.position.y,n=o*o+r*r;if(n<Fe&&n>0){let a=Math.sqrt(n),h=(1-a/ee)*De*e.forceMultiplier;t=o/a*h,i=r/a*h}}return new tt(t,i)}};var U=class{constructor(e){this.viewport=e}viewport;mesh;program;timeUniform={value:0};resolutionUniform={value:new Float32Array([1,1])};positions;velocities;ids;boids=[];init(e){this.program=new it(e,{vertex:de,fragment:ue,uniforms:{uResolution:this.resolutionUniform,uTime:this.timeUniform},transparent:!0,depthTest:!1}),this.mesh=new ot(e,{mode:e.POINTS,program:this.program,geometry:new et(e)}),this.initBoids()}initBoids(){for(let e=-100;e<100;e++)for(let t=-50;t<50;t++){let i=new tt(e*20,t*20);this.boids.push(new N(i))}this.positions=new Float32Array(this.boids.length*2),this.velocities=new Float32Array(this.boids.length*2),this.ids=new Float32Array(this.boids.length);for(let e=0;e<this.boids.length;++e)this.ids[e]=e}resize(){this.resolutionUniform.value[0]=this.viewport.width,this.resolutionUniform.value[1]=this.viewport.height,this.mesh.geometry=new et(this.mesh.gl,{aPosition:{size:2,data:this.positions},aVelocity:{size:2,data:this.velocities},aID:{size:1,data:this.ids}})}update(e){this.timeUniform.value=e.clock.time;for(let t=0;t<this.boids.length;t++){let i=this.boids[t];i.update(e.clock,e.mouse);let o=this.viewport.worldToNdc(i.position);this.positions[t*2]=o.x,this.positions[t*2+1]=o.y,this.velocities[t*2]=i.velocity.x,this.velocities[t*2+1]=i.velocity.y}return this.mesh.geometry.attributes.aVelocity.needsUpdate=!0,this.mesh.geometry.attributes.aPosition.needsUpdate=!0,this.mesh}};var H=class{width=0;height=0;zoom=1;cameraPosition=new tt;resize(e,t){this.width=e,this.height=t}worldToNdc(e){return new tt((e.x-this.cameraPosition.x)*this.zoom/(this.width/2),(e.y-this.cameraPosition.y)*this.zoom/(this.height/2))}ndcToWorld(e){return new tt(e.x*(this.width/2)/this.zoom+this.cameraPosition.x,e.y*(this.height/2)/this.zoom+this.cameraPosition.y)}screenToWorld(e){let t=e.x/this.width*2-1,i=-(e.y/this.height)*2+1;return this.ndcToWorld(new tt(t,i))}};var j=class{time=0;deltaTime=0;timeScale=.2;lastFrameTime=performance.now();update(){let e=performance.now(),t=(e-this.lastFrameTime)*.001;this.lastFrameTime=e;let i=Math.min(t,.1);this.deltaTime=i*this.timeScale,this.time+=this.deltaTime}};var Ce=[`canvas`];var ge=class s{canvasRef=ZL.required(`canvas`);renderer;animationFrameId=0;viewport=new H;clock=new j;mousePos;isMouseDown=!1;vectorFieldMesh=new G(this.viewport);boidsMesh=new U(this.viewport);ngAfterViewInit(){this.initOGL(),this.onResize(),this.animate()}onResize(){let t=this.canvasRef().nativeElement.parentElement;t&&(this.viewport.resize(t.clientWidth,t.clientHeight),!(this.viewport.width===0||this.viewport.height===0)&&(this.renderer.setSize(this.viewport.width,this.viewport.height),this.vectorFieldMesh.resize(),this.boidsMesh.resize()))}initOGL(){let e=this.canvasRef().nativeElement;this.renderer=new j$1({canvas:e,antialias:!0,alpha:!0,dpr:Math.min(window.devicePixelRatio||1,2)});let t=this.renderer.gl;this.vectorFieldMesh.init(t),this.boidsMesh.init(t)}animate=()=>{this.animationFrameId=requestAnimationFrame(this.animate),this.renderer.gl.enable(this.renderer.gl.BLEND),this.renderer.gl.blendFunc(this.renderer.gl.ALPHA,this.renderer.gl.ONE),this.clock.update();let e={clock:this.clock,mouse:this.mousePos?{position:this.mousePos,forceMultiplier:this.isMouseDown?-1:1}:void 0};this.renderer.gl.clear(this.renderer.gl.COLOR_BUFFER_BIT),this.renderer.render({scene:this.boidsMesh.update(e)})};ngOnDestroy(){this.animationFrameId&&cancelAnimationFrame(this.animationFrameId)}onMouseMove(e){this.mousePos=this.viewport.screenToWorld(new tt(e.clientX,e.clientY))}onMouseOut(e){(!e.relatedTarget||e.relatedTarget.nodeName===`HTML`)&&this.onMouseLeave()}onMouseLeave(){this.mousePos=void 0}onPointerDown(){this.isMouseDown=!0}onPointerUp(){this.isMouseDown=!1}static ɵfac=function(t){return new(t||s)};static ɵcmp=II({type:s,selectors:[[`app-boids-page`]],viewQuery:function(t,i){t&1&&uh(i.canvasRef,Ce,5),t&2&&ID()},hostBindings:function(t,i){t&1&&ch(`resize`,function(){return i.onResize()},Qv)(`pointermove`,function(r){return i.onMouseMove(r)},Qv)(`mouseout`,function(r){return i.onMouseOut(r)},Yv)(`blur`,function(){return i.onMouseLeave()},Qv)(`pointerdown`,function(){return i.onPointerDown()},Qv)(`pointerup`,function(){return i.onPointerUp()},Qv)},decls:2,vars:0,consts:[[`canvas`,``]],template:function(t,i){t&1&&th(0,`canvas`,null,0)},styles:[`[_nghost-%COMP%]{display:flex;height:100vh;width:100vw;background:radial-gradient(circle,#0a0a11,#0b0c11);overflow:hidden}canvas[_ngcontent-%COMP%]{width:100%;height:100%;display:block}`]})};export{ge as BoidsPage};