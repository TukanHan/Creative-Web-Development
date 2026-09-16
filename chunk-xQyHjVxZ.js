import{F as uh,P as th,S as ZL,_ as Qv,a as ED,o as EI,w as ch}from"./main-IBXGZ6IW.js";import{i as lt,n as Z,r as j,t as K}from"./chunk-Bi1jNM8B.js";var te=`attribute vec2 position;
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
}`;var ne=`precision highp float;

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

    gl_FragColor = vec4(color, 0.7);
}`;var de=.3333333333333333;var d=1/6;var m=new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]);var oe=new Uint8Array(256);for(let n=0;n<256;n++)oe[n]=Math.floor(Math.random()*256);var h=new Uint8Array(512);var P=new Uint8Array(512);for(let n=0;n<512;n++)h[n]=oe[n&255],P[n]=h[n]%12;function ie(n,t,e){let o,i,l,r,s=(n+t+e)*de,c=Math.floor(n+s),A=Math.floor(t+s),R=Math.floor(e+s),S=(c+A+R)*d,ae=c-S,le=A-S,ce=R-S,u=n-ae,v=t-le,p=e-ce,f,g,b,y,x,w;u>=v?v>=p?(f=1,g=0,b=0,y=1,x=1,w=0):u>=p?(f=1,g=0,b=0,y=1,x=0,w=1):(f=0,g=0,b=1,y=1,x=0,w=1):v<p?(f=0,g=0,b=1,y=0,x=1,w=1):u<p?(f=0,g=1,b=0,y=0,x=1,w=1):(f=0,g=1,b=0,y=1,x=1,w=0);let B=u-f+d,O=v-g+d,T=p-b+d,k=u-y+2*d,N=v-x+2*d,E=p-w+2*d,j=u-1+3*d,H=v-1+3*d,U=p-1+3*d,_=c&255,G=A&255,z=R&255,F=.6-u*u-v*v-p*p;if(F<0)o=0;else{F*=F;let a=P[_+h[G+h[z]]]*3;o=F*F*(m[a]*u+m[a+1]*v+m[a+2]*p)}let C=.6-B*B-O*O-T*T;if(C<0)i=0;else{C*=C;let a=P[_+f+h[G+g+h[z+b]]]*3;i=C*C*(m[a]*B+m[a+1]*O+m[a+2]*T)}let M=.6-k*k-N*N-E*E;if(M<0)l=0;else{M*=M;let a=P[_+y+h[G+x+h[z+w]]]*3;l=M*M*(m[a]*k+m[a+1]*N+m[a+2]*E)}let I=.6-j*j-H*H-U*U;if(I<0)r=0;else{I*=I;let a=P[_+1+h[G+1+h[z+1]]]*3;r=I*I*(m[a]*j+m[a+1]*H+m[a+2]*U)}return 32*(o+i+l+r)}function D(n,t,e,o=3){let i=0,l=1,r=1,s=0;for(let c=0;c<o;c++)i+=ie(n*r,t*r,e*r)*l,s+=l,r*=2,l*=.5;return i/s}function se(n,t,e=0,o=3e-4,i=4){let r=n*o,s=t*o;return{vx:(D(r,s+.001,e,i)-D(r,s-.001,e,i))/(2*.001),vy:-((D(r+.001,s,e,i)-D(r-.001,s,e,i))/(2*.001))}}var L=class{mesh;GRID_SPACING=15;resolution=new Float32Array([1,1]);positions;angles;lengths;rows=0;cols=0;init(t){let e=new K(t,{vertex:te,fragment:ne,uniforms:{uResolution:{value:this.resolution}},transparent:!0,cullFace:null});this.mesh=new lt(t,{mode:t.POINTS,program:e,geometry:new j(t,{position:{size:2,data:new Float32Array(0)}})})}resize(t,e){if(this.resolution[0]=t,this.resolution[1]=e,this.cols=Math.floor(t/this.GRID_SPACING),this.rows=Math.floor(e/this.GRID_SPACING),this.cols<=0||this.rows<=0)return;let o=(t-(this.cols-1)*this.GRID_SPACING)/2,i=(e-(this.rows-1)*this.GRID_SPACING)/2,l=this.cols*this.rows;this.positions=new Float32Array(l*2),this.angles=new Float32Array(l),this.lengths=new Float32Array(l);let r=0;for(let s=0;s<this.rows;s++)for(let c=0;c<this.cols;c++){let A=o+c*this.GRID_SPACING,R=i+s*this.GRID_SPACING;this.positions[r*2]=A,this.positions[r*2+1]=R,r++}this.mesh.geometry=new j(this.mesh.gl,{position:{size:2,data:this.positions},aAngle:{size:1,data:this.angles},aLength:{size:1,data:this.lengths}})}update(t){let e=0;for(let o=0;o<this.rows;o++)for(let i=0;i<this.cols;i++){let l=this.positions[e*2],r=this.positions[e*2+1],s=se(l,r,t);this.angles[e]=Math.atan2(s.vy,s.vx),this.lengths[e]=Math.hypot(s.vx,s.vy),e++}return this.mesh.geometry.attributes.aAngle.needsUpdate=!0,this.mesh.geometry.attributes.aLength.needsUpdate=!0,this.mesh}};var he=[`canvas`];var re=class n{canvasRef=ZL.required(`canvas`);renderer;animationFrameId=0;vectorFieldMesh=new L;ngAfterViewInit(){this.initOGL(),this.onResize(),this.animate(0)}onResize(){let e=this.canvasRef().nativeElement.parentElement;if(!e)return;let o=e.clientWidth,i=e.clientHeight;o===0||i===0||(this.renderer.setSize(o,i),this.vectorFieldMesh.resize(o,i))}initOGL(){let t=this.canvasRef().nativeElement;this.renderer=new Z({canvas:t,antialias:!0,alpha:!0,dpr:Math.min(window.devicePixelRatio||1,2)});let e=this.renderer.gl;e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE),e.clearColor(0,0,0,0),this.vectorFieldMesh.init(e)}animate=t=>{this.animationFrameId=requestAnimationFrame(this.animate);let e=t*1e-4;this.renderer.gl.clear(this.renderer.gl.COLOR_BUFFER_BIT),this.renderer.render({scene:this.vectorFieldMesh.update(e)})};ngOnDestroy(){this.animationFrameId&&cancelAnimationFrame(this.animationFrameId)}static ɵfac=function(e){return new(e||n)};static ɵcmp=EI({type:n,selectors:[[`app-boids-page`]],viewQuery:function(e,o){e&1&&uh(o.canvasRef,he,5),e&2&&ED()},hostBindings:function(e,o){e&1&&ch(`resize`,function(){return o.onResize()},Qv)},decls:2,vars:0,consts:[[`canvas`,``]],template:function(e,o){e&1&&th(0,`canvas`,null,0)},styles:[`[_nghost-%COMP%]{display:flex;height:100vh;width:100vw;background:radial-gradient(circle,#101014,#121212);overflow:hidden}canvas[_ngcontent-%COMP%]{width:100%;height:100%;display:block}`]})};export{re as BoidsPage};