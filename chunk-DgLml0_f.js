import{C as Yv,E as ch,I as th,L as uh,g as Qv,o as ID,s as II,w as ZL}from"./main-ZEKCALKY.js";import{a as tt,i as ot,n as it,r as j$1,t as et}from"./chunk-B21hzAvl.js";var ce=`attribute vec2 position;
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
}`;var Pe=.3333333333333333;var d=1/6;var p=new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]);var pe=new Uint8Array(256);for(let r=0;r<256;r++)pe[r]=Math.floor(Math.random()*256);var u=new Uint8Array(512);var T=new Uint8Array(512);for(let r=0;r<512;r++)u[r]=pe[r&255],T[r]=u[r]%12;function me(r,e,t){let o,i,s,n,a=(r+e+t)*Pe,h=Math.floor(r+a),g=Math.floor(e+a),k=Math.floor(t+a),S=(h+g+k)*d,ye=h-S,we=g-S,be=k-S,v=r-ye,f=e-we,m=t-be,y,w,b,M,x,P;v>=f?f>=m?(y=1,w=0,b=0,M=1,x=1,P=0):v>=m?(y=1,w=0,b=0,M=1,x=0,P=1):(y=0,w=0,b=1,M=1,x=0,P=1):f<m?(y=0,w=0,b=1,M=0,x=1,P=1):v<m?(y=0,w=1,b=0,M=0,x=1,P=1):(y=0,w=1,b=0,M=1,x=1,P=0);let W=v-y+d,X=f-w+d,Y=m-b+d,q=v-M+2*d,Q=f-x+2*d,K=m-P+2*d,Z=v-1+3*d,J=f-1+3*d,$=m-1+3*d,I=h&255,R=g&255,G=k&255,F=.6-v*v-f*f-m*m;if(F<0)o=0;else{F*=F;let c=T[I+u[R+u[G]]]*3;o=F*F*(p[c]*v+p[c+1]*f+p[c+2]*m)}let D=.6-W*W-X*X-Y*Y;if(D<0)i=0;else{D*=D;let c=T[I+y+u[R+w+u[G+b]]]*3;i=D*D*(p[c]*W+p[c+1]*X+p[c+2]*Y)}let _=.6-q*q-Q*Q-K*K;if(_<0)s=0;else{_*=_;let c=T[I+M+u[R+x+u[G+P]]]*3;s=_*_*(p[c]*q+p[c+1]*Q+p[c+2]*K)}let C=.6-Z*Z-J*J-$*$;if(C<0)n=0;else{C*=C;let c=T[I+1+u[R+1+u[G+1]]]*3;n=C*C*(p[c]*Z+p[c+1]*J+p[c+2]*$)}return 32*(o+i+s+n)}function B(r,e,t,o=3){let i=0,s=1,n=1,a=0;for(let h=0;h<o;h++)i+=me(r*n,e*n,t*n)*s,a+=s,n*=2,s*=.5;return i/a}function L(r,e,t=0,o=.002,i=2){let n=r*o,a=e*o;return{vx:(B(n,a+.001,t,i)-B(n,a-.001,t,i))/(2*.001),vy:-((B(n+.001,a,t,i)-B(n-.001,a,t,i))/(2*.001))}}var N=class{constructor(e){this.viewport=e}viewport;mesh;GRID_SPACING=15;resolution=new Float32Array([1,1]);positions;angles;lengths;rows=0;cols=0;init(e){let t=new it(e,{vertex:ce,fragment:he,uniforms:{uResolution:{value:this.resolution}},transparent:!0,cullFace:null});this.mesh=new ot(e,{mode:e.POINTS,program:t,geometry:new et(e,{position:{size:2,data:new Float32Array(0)}})})}resize(){if(this.resolution[0]=this.viewport.width,this.resolution[1]=this.viewport.height,this.cols=Math.floor(this.viewport.width/this.GRID_SPACING),this.rows=Math.floor(this.viewport.height/this.GRID_SPACING),this.cols<=0||this.rows<=0)return;let e=this.cols*this.rows;this.positions=new Float32Array(e*2),this.angles=new Float32Array(e),this.lengths=new Float32Array(e);let t=(this.viewport.width-(this.cols-1)*this.GRID_SPACING)/2,o=(this.viewport.height-(this.rows-1)*this.GRID_SPACING)/2,i=0;for(let s=0;s<this.rows;s++)for(let n=0;n<this.cols;n++){let a=t+n*this.GRID_SPACING,h=o+s*this.GRID_SPACING,g=this.viewport.screenToWorld(new tt(a,h));this.positions[i*2]=g.x,this.positions[i*2+1]=g.y,i++}this.mesh.geometry=new et(this.mesh.gl,{position:{size:2,data:this.positions},aAngle:{size:1,data:this.angles},aLength:{size:1,data:this.lengths}})}update(e){let t=0;for(let o=0;o<this.rows;o++)for(let i=0;i<this.cols;i++){let s=this.positions[t*2],n=this.positions[t*2+1],a=L(s,n,e.clock.time);this.angles[t]=Math.atan2(a.vy,a.vx),this.lengths[t]=Math.hypot(a.vx,a.vy),t++}return this.mesh.geometry.attributes.aAngle.needsUpdate=!0,this.mesh.geometry.attributes.aLength.needsUpdate=!0,this.mesh}};var de=`attribute vec2 aPosition;
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
}`;var ue=`precision highp float;

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
}`;var ve=400;var fe=.002;var ke=6;var ee=150;var Se=ee*ee;var E=class{constructor(e){this.originPosition=e;this.position=new tt(e.x,e.y)}originPosition;position;velocity=new tt(0,0);update(e,t){this.velocity=this.calcVelocity(e,t),this.position.x+=this.velocity.x*e.deltaTime*ve,this.position.y+=this.velocity.y*e.deltaTime*ve}calcVelocity(e,t){let o=L(this.position.x,this.position.y,e.time),i=(this.originPosition.x-this.position.x)*fe,s=(this.originPosition.y-this.position.y)*fe,n=this.calculateMouseForce(t);return new tt(o.vx+i+n.x,o.vy+s+n.y)}calculateMouseForce(e){let t=0,o=0;if(e){let i=this.position.x-e.position.x,s=this.position.y-e.position.y,n=i*i+s*s;if(n<Se&&n>0){let a=Math.sqrt(n),h=(1-a/ee)*ke*e.forceMultiplier;t=i/a*h,o=s/a*h}}return new tt(t,o)}};var U=class{constructor(e){this.viewport=e}viewport;mesh;program;timeUniform={value:0};resolutionUniform={value:new Float32Array([1,1])};positions;velocities;boids=[];init(e){this.program=new it(e,{vertex:de,fragment:ue,uniforms:{uResolution:this.resolutionUniform,uTime:this.timeUniform},transparent:!0}),this.mesh=new ot(e,{mode:e.POINTS,program:this.program,geometry:new et(e)}),this.initBoids()}initBoids(){for(let e=-100;e<100;e++)for(let t=-50;t<50;t++){let o=new tt(e*20,t*20);this.boids.push(new E(o))}this.positions=new Float32Array(this.boids.length*2),this.velocities=new Float32Array(this.boids.length*2)}resize(){this.resolutionUniform.value[0]=this.viewport.width,this.resolutionUniform.value[1]=this.viewport.height,this.mesh.geometry=new et(this.mesh.gl,{aPosition:{size:2,data:this.positions},aVelocity:{size:2,data:this.velocities}})}update(e){this.timeUniform.value=e.clock.time;for(let t=0;t<this.boids.length;t++){let o=this.boids[t];o.update(e.clock,e.mouse);let i=this.viewport.worldToNdc(o.position);this.positions[t*2]=i.x,this.positions[t*2+1]=i.y,this.velocities[t*2]=o.velocity.x,this.velocities[t*2+1]=o.velocity.y}return this.mesh.geometry.attributes.aVelocity.needsUpdate=!0,this.mesh.geometry.attributes.aPosition.needsUpdate=!0,this.mesh}};var H=class{width=0;height=0;zoom=1;cameraPosition=new tt;resize(e,t){this.width=e,this.height=t}worldToNdc(e){return new tt((e.x-this.cameraPosition.x)*this.zoom/(this.width/2),(e.y-this.cameraPosition.y)*this.zoom/(this.height/2))}ndcToWorld(e){return new tt(e.x*(this.width/2)/this.zoom+this.cameraPosition.x,e.y*(this.height/2)/this.zoom+this.cameraPosition.y)}screenToWorld(e){let t=e.x/this.width*2-1,o=-(e.y/this.height)*2+1;return this.ndcToWorld(new tt(t,o))}};var j=class{time=0;deltaTime=0;timeScale=.2;lastFrameTime=performance.now();update(){let e=performance.now(),t=(e-this.lastFrameTime)*.001;this.lastFrameTime=e;let o=Math.min(t,.1);this.deltaTime=o*this.timeScale,this.time+=this.deltaTime}};var Fe=[`canvas`];var ge=class r{canvasRef=ZL.required(`canvas`);renderer;animationFrameId=0;viewport=new H;clock=new j;mousePos;isMouseDown=!1;vectorFieldMesh=new N(this.viewport);boidsMesh=new U(this.viewport);ngAfterViewInit(){this.initOGL(),this.onResize(),this.animate()}onResize(){let t=this.canvasRef().nativeElement.parentElement;t&&(this.viewport.resize(t.clientWidth,t.clientHeight),!(this.viewport.width===0||this.viewport.height===0)&&(this.renderer.setSize(this.viewport.width,this.viewport.height),this.vectorFieldMesh.resize(),this.boidsMesh.resize()))}initOGL(){let e=this.canvasRef().nativeElement;this.renderer=new j$1({canvas:e,antialias:!0,alpha:!0,dpr:Math.min(window.devicePixelRatio||1,2)});let t=this.renderer.gl;t.enable(t.BLEND),t.blendFunc(t.SRC_ALPHA,t.ONE),t.clearColor(0,0,0,0),this.vectorFieldMesh.init(t),this.boidsMesh.init(t)}animate=()=>{this.animationFrameId=requestAnimationFrame(this.animate),this.clock.update();let e={clock:this.clock,mouse:this.mousePos?{position:this.mousePos,forceMultiplier:this.isMouseDown?-1:1}:void 0};this.renderer.gl.clear(this.renderer.gl.COLOR_BUFFER_BIT),this.renderer.render({scene:this.boidsMesh.update(e)}),this.renderer.render({scene:this.vectorFieldMesh.update(e),clear:!1})};ngOnDestroy(){this.animationFrameId&&cancelAnimationFrame(this.animationFrameId)}onMouseMove(e){this.mousePos=this.viewport.screenToWorld(new tt(e.clientX,e.clientY))}onMouseOut(e){(!e.relatedTarget||e.relatedTarget.nodeName===`HTML`)&&this.onMouseLeave()}onMouseLeave(){this.mousePos=void 0}onPointerDown(){this.isMouseDown=!0}onPointerUp(){this.isMouseDown=!1}static ɵfac=function(t){return new(t||r)};static ɵcmp=II({type:r,selectors:[[`app-boids-page`]],viewQuery:function(t,o){t&1&&uh(o.canvasRef,Fe,5),t&2&&ID()},hostBindings:function(t,o){t&1&&ch(`resize`,function(){return o.onResize()},Qv)(`pointermove`,function(s){return o.onMouseMove(s)},Qv)(`mouseout`,function(s){return o.onMouseOut(s)},Yv)(`blur`,function(){return o.onMouseLeave()},Qv)(`pointerdown`,function(){return o.onPointerDown()},Qv)(`pointerup`,function(){return o.onPointerUp()},Qv)},decls:2,vars:0,consts:[[`canvas`,``]],template:function(t,o){t&1&&th(0,`canvas`,null,0)},styles:[`[_nghost-%COMP%]{display:flex;height:100vh;width:100vw;background:radial-gradient(circle,#101014,#121212);overflow:hidden}canvas[_ngcontent-%COMP%]{width:100%;height:100%;display:block}`]})};export{ge as BoidsPage};