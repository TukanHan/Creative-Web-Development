import{F as uh,P as th,S as ZL,_ as Qv,a as ED,o as EI,w as ch}from"./main-TUA2D5FX.js";import{a as ot,i as j$1,n as J,r as at,t as H}from"./chunk-CLq4wy17.js";var ae=`attribute vec2 position;
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
}`;var ce=`precision highp float;

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
}`;var we=.3333333333333333;var d=1/6;var h=new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]);var le=new Uint8Array(256);for(let o=0;o<256;o++)le[o]=Math.floor(Math.random()*256);var u=new Uint8Array(512);var R=new Uint8Array(512);for(let o=0;o<512;o++)u[o]=le[o&255],R[o]=u[o]%12;function he(o,t,e){let i,r,c,s,n=(o+t+e)*we,p=Math.floor(o+n),f=Math.floor(t+n),P=Math.floor(e+n),S=(p+f+P)*d,ue=p-S,ve=f-S,ge=P-S,v=o-ue,g=t-ve,m=e-ge,y,w,b,x,z,A;v>=g?g>=m?(y=1,w=0,b=0,x=1,z=1,A=0):v>=m?(y=1,w=0,b=0,x=1,z=0,A=1):(y=0,w=0,b=1,x=1,z=0,A=1):g<m?(y=0,w=0,b=1,x=0,z=1,A=1):v<m?(y=0,w=1,b=0,x=0,z=1,A=1):(y=0,w=1,b=0,x=1,z=1,A=0);let U=v-y+d,W=g-w+d,Y=m-b+d,H=v-x+2*d,q=g-z+2*d,K=m-A+2*d,Q=v-1+3*d,Z=g-1+3*d,J=m-1+3*d,T=p&255,G=f&255,V=P&255,C=.6-v*v-g*g-m*m;if(C<0)i=0;else{C*=C;let a=R[T+u[G+u[V]]]*3;i=C*C*(h[a]*v+h[a+1]*g+h[a+2]*m)}let M=.6-U*U-W*W-Y*Y;if(M<0)r=0;else{M*=M;let a=R[T+y+u[G+w+u[V+b]]]*3;r=M*M*(h[a]*U+h[a+1]*W+h[a+2]*Y)}let F=.6-H*H-q*q-K*K;if(F<0)c=0;else{F*=F;let a=R[T+x+u[G+z+u[V+A]]]*3;c=F*F*(h[a]*H+h[a+1]*q+h[a+2]*K)}let I=.6-Q*Q-Z*Z-J*J;if(I<0)s=0;else{I*=I;let a=R[T+1+u[G+1+u[V+1]]]*3;s=I*I*(h[a]*Q+h[a+1]*Z+h[a+2]*J)}return 32*(i+r+c+s)}function _(o,t,e,i=3){let r=0,c=1,s=1,n=0;for(let p=0;p<i;p++)r+=he(o*s,t*s,e*s)*c,n+=c,s*=2,c*=.5;return r/n}function N(o,t,e=0,i=.002,r=2){let s=o*i,n=t*i;return{vx:(_(s,n+.001,e,r)-_(s,n-.001,e,r))/(2*.001),vy:-((_(s+.001,n,e,r)-_(s-.001,n,e,r))/(2*.001))}}var L=class{constructor(t){this.viewport=t}viewport;mesh;GRID_SPACING=15;resolution=new Float32Array([1,1]);positions;angles;lengths;rows=0;cols=0;init(t){let e=new J(t,{vertex:ae,fragment:ce,uniforms:{uResolution:{value:this.resolution}},transparent:!0,cullFace:null});this.mesh=new at(t,{mode:t.POINTS,program:e,geometry:new H(t,{position:{size:2,data:new Float32Array(0)}})})}resize(){if(this.resolution[0]=this.viewport.width,this.resolution[1]=this.viewport.height,this.cols=Math.floor(this.viewport.width/this.GRID_SPACING),this.rows=Math.floor(this.viewport.height/this.GRID_SPACING),this.cols<=0||this.rows<=0)return;let t=this.cols*this.rows;this.positions=new Float32Array(t*2),this.angles=new Float32Array(t),this.lengths=new Float32Array(t);let e=(this.viewport.width-(this.cols-1)*this.GRID_SPACING)/2,i=(this.viewport.height-(this.rows-1)*this.GRID_SPACING)/2,r=0;for(let c=0;c<this.rows;c++)for(let s=0;s<this.cols;s++){let n=e+s*this.GRID_SPACING,p=i+c*this.GRID_SPACING,f=this.viewport.screenToWorld(new ot(n,p));this.positions[r*2]=f.x,this.positions[r*2+1]=f.y,r++}this.mesh.geometry=new H(this.mesh.gl,{position:{size:2,data:this.positions},aAngle:{size:1,data:this.angles},aLength:{size:1,data:this.lengths}})}update(t){let e=0;for(let i=0;i<this.rows;i++)for(let r=0;r<this.cols;r++){let c=this.positions[e*2],s=this.positions[e*2+1],n=N(c,s,t.time);this.angles[e]=Math.atan2(n.vy,n.vx),this.lengths[e]=Math.hypot(n.vx,n.vy),e++}return this.mesh.geometry.attributes.aAngle.needsUpdate=!0,this.mesh.geometry.attributes.aLength.needsUpdate=!0,this.mesh}};var pe=`attribute vec2 aPosition;
attribute vec2 aVelocity;

uniform mat4 uProjectionMatrix;
uniform float uTime; // Dla efektu migotania ognia

varying float vAngle;
varying float vSpeed;

void main() {
    // 1. Wyznaczenie k\u0105ta skierowania boida na podstawie wektora pr\u0119dko\u015Bci
    vAngle = atan(aVelocity.y, aVelocity.x);
    
    // 2. D\u0142ugo\u015B\u0107 pr\u0119dko\u015Bci wp\u0142ywa na jasno\u015B\u0107 / dynamiczny wygl\u0105d
    vSpeed = length(aVelocity);

    // 3. Ustawienie sta\u0142ego rozmiaru cz\u0105steczki
    gl_PointSize = 10.0;

    gl_Position = vec4(aPosition, 0.0, 1.0);
}`;var me=`precision highp float;

varying float vAngle;
varying float vSpeed;

uniform float uTime;

// Funkcja obrotu wok\xF3\u0142 \u015Brodka Punktu
vec2 rotate(vec2 uv, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return vec2(uv.x * c - uv.y * s, uv.x * s + uv.y * c);
}

void main() {
    // Przej\u015Bcie na uk\u0142ad lokalny [-0.5, 0.5] z punktu zakotwiczenia w \u015Brodku
    vec2 uv = gl_PointCoord - vec2(0.5);
    
    // Obr\xF3t p\u0142omyczka w stron\u0119 wektora pr\u0119dko\u015Bci (z korekt\u0105 przesuni\u0119cia fazy o 90 deg je\u015Bli rysujemy pionowo)
    uv = rotate(uv, vAngle);

    // 1. GEOMETRIA P\u0141OMIENIA / OGNIKA
    // Skalujemy Y w zale\u017Cno\u015Bci od X, aby stworzy\u0107 op\u0142ywowy kszta\u0142t \u0142ezki (szerszy z przodu, ostry na ogonie)
    // Front p\u0142omienia jest na +X, ogon na -X
    float distToCenter = length(uv);
    
    // Zbie\u017Cno\u015B\u0107 do ty\u0142u (zw\u0119\u017Canie ogonka)
    float flameShape = smoothstep(0.45, 0.0, length(vec2(uv.x * 0.8, uv.y * (1.2 + uv.x * 1.5))));

    if (flameShape < 0.05) discard;

    // 2. ANIKACJA MIGOTANIA / PULSOWANIA OGNIA
    float flicker = sin(uTime * 15.0 + uv.x * 10.0) * 0.1 + 0.9;

    // 3. PALETA BARW OGNIKA (Core -> Inner Flame -> Outer Glow)
    vec3 cCore  = vec3(1.0, 1.0, 0.9); // Gor\u0105ce bia\u0142o-\u017C\xF3\u0142te j\u0105dro
    vec3 cMid   = vec3(0.5, 0.75, 1.0); // Ognisty pomara\u0144cz
    vec3 cOuter = vec3(0.0, 0.0, 1.0); // Ciemna czerwie\u0144 na brzegach

    // Gradient od \u015Brodka do kraw\u0119dzi
    float r = length(uv - vec2(0.1, 0.0)) * 2.5; // Przesuni\u0119cie j\u0105dra lekko w stron\u0119 przodu
    
    vec3 color = mix(cCore, cMid, smoothstep(0.0, 0.4, r));
    color = mix(color, cOuter, smoothstep(0.4, 0.9, r));

    // Przezroczysto\u015B\u0107 na brzegach dla mi\u0119kkiego glow
    float alpha = flameShape * flicker;

    gl_FragColor = vec4(color, alpha);
}`;var B=class{constructor(t){this.originPosition=t;this.position=new ot(t.x,t.y)}originPosition;position;velocity=new ot(0,0);speed=400;returnStrength=.002;update(t){this.velocity=this.calcVelocity(t),this.position.x+=this.velocity.x*t.deltaTime*this.speed,this.position.y+=this.velocity.y*t.deltaTime*this.speed}calcVelocity(t){let e=N(this.position.x,this.position.y,t.time),i=(this.originPosition.x-this.position.x)*this.returnStrength,r=(this.originPosition.y-this.position.y)*this.returnStrength;return new ot(e.vx+i,e.vy+r)}};var j=class{constructor(t){this.viewport=t}viewport;mesh;program;resolution=new Float32Array([1,1]);positions;velocities;boids=[];init(t){this.program=new J(t,{vertex:pe,fragment:me,uniforms:{uResolution:{value:this.resolution},uTime:{value:0}},transparent:!0}),this.mesh=new at(t,{mode:t.POINTS,program:this.program,geometry:new H(t)}),this.initBoids()}initBoids(){for(let t=-20;t<20;t++)for(let e=-20;e<20;e++){let i=new ot(t*15,e*15);this.boids.push(new B(i))}this.positions=new Float32Array(this.boids.length*2),this.velocities=new Float32Array(this.boids.length*2)}resize(){this.resolution[0]=this.viewport.width,this.resolution[1]=this.viewport.height,this.mesh.geometry=new H(this.mesh.gl,{aPosition:{size:2,data:this.positions},aVelocity:{size:2,data:this.velocities}})}update(t){this.program.uniforms.uTime.value=t.time;for(let e=0;e<this.boids.length;e++){let i=this.boids[e];i.update(t);let r=this.viewport.worldToNdc(i.position);this.positions[e*2]=r.x,this.positions[e*2+1]=r.y,this.velocities[e*2]=i.velocity.x,this.velocities[e*2+1]=i.velocity.y}return this.mesh.geometry.attributes.aVelocity.needsUpdate=!0,this.mesh.geometry.attributes.aPosition.needsUpdate=!0,this.mesh}};var E=class{width=0;height=0;zoom=1;cameraPosition=new ot;resize(t,e){this.width=t,this.height=e}worldToNdc(t){return new ot((t.x-this.cameraPosition.x)*this.zoom/(this.width/2),(t.y-this.cameraPosition.y)*this.zoom/(this.height/2))}ndcToWorld(t){return new ot(t.x*(this.width/2)/this.zoom+this.cameraPosition.x,t.y*(this.height/2)/this.zoom+this.cameraPosition.y)}screenToWorld(t){let e=t.x/this.width*2-1,i=-(t.y/this.height)*2+1;return this.ndcToWorld(new ot(e,i))}};var X=class{time=0;deltaTime=0;timeScale=.2;lastFrameTime=performance.now();update(){let t=performance.now(),e=(t-this.lastFrameTime)*.001;this.lastFrameTime=t;let i=Math.min(e,.1);this.deltaTime=i*this.timeScale,this.time+=this.deltaTime}};var ze=[`canvas`];var de=class o{canvasRef=ZL.required(`canvas`);renderer;animationFrameId=0;viewport=new E;clock=new X;vectorFieldMesh=new L(this.viewport);boidsMesh=new j(this.viewport);ngAfterViewInit(){this.initOGL(),this.onResize(),this.animate()}onResize(){let e=this.canvasRef().nativeElement.parentElement;e&&(this.viewport.resize(e.clientWidth,e.clientHeight),!(this.viewport.width===0||this.viewport.height===0)&&(this.renderer.setSize(this.viewport.width,this.viewport.height),this.vectorFieldMesh.resize(),this.boidsMesh.resize()))}initOGL(){let t=this.canvasRef().nativeElement;this.renderer=new j$1({canvas:t,antialias:!0,alpha:!0,dpr:Math.min(window.devicePixelRatio||1,2)});let e=this.renderer.gl;e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE),e.clearColor(0,0,0,0),this.vectorFieldMesh.init(e),this.boidsMesh.init(e)}animate=()=>{this.animationFrameId=requestAnimationFrame(this.animate),this.clock.update(),this.renderer.gl.clear(this.renderer.gl.COLOR_BUFFER_BIT),this.renderer.render({scene:this.boidsMesh.update(this.clock)}),this.renderer.render({scene:this.vectorFieldMesh.update(this.clock),clear:!1})};ngOnDestroy(){this.animationFrameId&&cancelAnimationFrame(this.animationFrameId)}static ɵfac=function(e){return new(e||o)};static ɵcmp=EI({type:o,selectors:[[`app-boids-page`]],viewQuery:function(e,i){e&1&&uh(i.canvasRef,ze,5),e&2&&ED()},hostBindings:function(e,i){e&1&&ch(`resize`,function(){return i.onResize()},Qv)},decls:2,vars:0,consts:[[`canvas`,``]],template:function(e,i){e&1&&th(0,`canvas`,null,0)},styles:[`[_nghost-%COMP%]{display:flex;height:100vh;width:100vw;background:radial-gradient(circle,#101014,#121212);overflow:hidden}canvas[_ngcontent-%COMP%]{width:100%;height:100%;display:block}`]})};export{de as BoidsPage};