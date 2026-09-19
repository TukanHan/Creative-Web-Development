attribute vec2 aPosition;
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
}