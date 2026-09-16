import{F as uh,P as th,S as ZL,_ as Qv,a as ED,o as EI,w as ch}from"./main-EL4HTX5B.js";import{i as lt,n as K,r as Y,t as H}from"./chunk-DbcWDFfD.js";var ee=`attribute vec2 position;
attribute float aAngle;
attribute float aLength;

uniform vec2 uResolution;

varying float vAngle;
varying float vLen;

void main() {
    vAngle = aAngle;
    vLen = sqrt(aLength);

    vec2 zeroToOne = position / uResolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;

    gl_Position = vec4(clipSpace.x, -clipSpace.y, 0.0, 1.0);
    
    gl_PointSize = 22.0;
}`;var te=`precision highp float;

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

    gl_FragColor = vec4(color, 1.0);
}`;var pe=.3333333333333333;var h=1/6;var m=new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]);var ne=new Uint8Array(256);for(let i=0;i<256;i++)ne[i]=Math.floor(Math.random()*256);var d=new Uint8Array(512);var F=new Uint8Array(512);for(let i=0;i<512;i++)d[i]=ne[i&255],F[i]=d[i]%12;function ie(i,o,e){let t,n,c,s,r=(i+o+e)*pe,a=Math.floor(i+r),A=Math.floor(o+r),S=Math.floor(e+r),C=(a+A+S)*h,re=a-C,ae=A-C,le=S-C,u=i-re,v=o-ae,p=e-le,f,g,y,b,x,w;u>=v?v>=p?(f=1,g=0,y=0,b=1,x=1,w=0):u>=p?(f=1,g=0,y=0,b=1,x=0,w=1):(f=0,g=0,y=1,b=1,x=0,w=1):v<p?(f=0,g=0,y=1,b=0,x=1,w=1):u<p?(f=0,g=1,y=0,b=0,x=1,w=1):(f=0,g=1,y=0,b=1,x=1,w=0);let B=u-f+h,L=v-g+h,T=p-y+h,k=u-b+2*h,N=v-x+2*h,O=p-w+2*h,E=u-1+3*h,j=v-1+3*h,H=p-1+3*h,G=a&255,D=A&255,M=S&255,R=.6-u*u-v*v-p*p;if(R<0)t=0;else{R*=R;let l=F[G+d[D+d[M]]]*3;t=R*R*(m[l]*u+m[l+1]*v+m[l+2]*p)}let I=.6-B*B-L*L-T*T;if(I<0)n=0;else{I*=I;let l=F[G+f+d[D+g+d[M+y]]]*3;n=I*I*(m[l]*B+m[l+1]*L+m[l+2]*T)}let P=.6-k*k-N*N-O*O;if(P<0)c=0;else{P*=P;let l=F[G+b+d[D+x+d[M+w]]]*3;c=P*P*(m[l]*k+m[l+1]*N+m[l+2]*O)}let _=.6-E*E-j*j-H*H;if(_<0)s=0;else{_*=_;let l=F[G+1+d[D+1+d[M+1]]]*3;s=_*_*(m[l]*E+m[l+1]*j+m[l+2]*H)}return 32*(t+n+c+s)}function z(i,o,e,t=3){let n=0,c=1,s=1,r=0;for(let a=0;a<t;a++)n+=ie(i*s,o*s,e*s)*c,r+=c,s*=2,c*=.5;return n/r}function oe(i,o,e=0,t=3e-4,n=4){let s=i*t,r=o*t;return{vx:(z(s,r+.001,e,n)-z(s,r-.001,e,n))/(2*.001),vy:-((z(s+.001,r,e,n)-z(s-.001,r,e,n))/(2*.001))}}var he=[`canvas`];var se=class i{canvasRef=ZL.required(`canvas`);renderer;program;mesh;animationFrameId=0;GRID_SPACING=20;particleCount=0;positions;resolution=new Float32Array([1,1]);angles;lengths;rows=0;cols=0;ngAfterViewInit(){this.initOGL(),this.onResize(),this.animate(0)}onResize(){let e=this.canvasRef().nativeElement.parentElement;if(!e)return;let t=e.clientWidth,n=e.clientHeight;t===0||n===0||(this.renderer.setSize(t,n),this.resolution[0]=t,this.resolution[1]=n,this.updateGrid(t,n))}initOGL(){let o=this.canvasRef().nativeElement;this.renderer=new K({canvas:o,antialias:!0,alpha:!0,dpr:Math.min(window.devicePixelRatio||1,2)});let e=this.renderer.gl;e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE),e.clearColor(0,0,0,0),this.program=new H(e,{vertex:ee,fragment:te,uniforms:{uResolution:{value:this.resolution}},transparent:!0}),this.mesh=new lt(e,{mode:e.POINTS,program:this.program,geometry:new Y(e,{position:{size:2,data:new Float32Array(0)}})})}updateGrid(o,e){let t=this.renderer.gl;if(this.cols=Math.floor(o/this.GRID_SPACING),this.rows=Math.floor(e/this.GRID_SPACING),this.cols<=0||this.rows<=0)return;let n=(o-(this.cols-1)*this.GRID_SPACING)/2,c=(e-(this.rows-1)*this.GRID_SPACING)/2;this.particleCount=this.cols*this.rows,this.positions=new Float32Array(this.particleCount*2),this.angles=new Float32Array(this.particleCount),this.lengths=new Float32Array(this.particleCount);let s=0;for(let r=0;r<this.rows;r++)for(let a=0;a<this.cols;a++){let A=n+a*this.GRID_SPACING,S=c+r*this.GRID_SPACING;this.positions[s*2]=A,this.positions[s*2+1]=S,s++}this.mesh.geometry=new Y(t,{position:{size:2,data:this.positions},aAngle:{size:1,data:this.angles},aLength:{size:1,data:this.lengths}})}animate=o=>{this.animationFrameId=requestAnimationFrame(this.animate);let e=o*1e-4,t=0;for(let n=0;n<this.rows;n++)for(let c=0;c<this.cols;c++){let s=this.positions[t*2],r=this.positions[t*2+1],a=oe(s,r,e);this.angles[t]=Math.atan2(a.vy,a.vx),this.lengths[t]=Math.hypot(a.vx,a.vy),t++}this.mesh.geometry.attributes.aAngle.needsUpdate=!0,this.mesh.geometry.attributes.aLength.needsUpdate=!0,this.renderer.gl.clear(this.renderer.gl.COLOR_BUFFER_BIT),this.renderer.render({scene:this.mesh})};ngOnDestroy(){this.animationFrameId&&cancelAnimationFrame(this.animationFrameId)}static ɵfac=function(e){return new(e||i)};static ɵcmp=EI({type:i,selectors:[[`app-boids-page`]],viewQuery:function(e,t){e&1&&uh(t.canvasRef,he,5),e&2&&ED()},hostBindings:function(e,t){e&1&&ch(`resize`,function(){return t.onResize()},Qv)},decls:2,vars:0,consts:[[`canvas`,``]],template:function(e,t){e&1&&th(0,`canvas`,null,0)},styles:[`[_nghost-%COMP%]{display:flex;height:100vh;width:100vw;background:radial-gradient(circle,#101014,#121212);overflow:hidden}canvas[_ngcontent-%COMP%]{width:100%;height:100%;display:block}`]})};export{se as BoidsPage};