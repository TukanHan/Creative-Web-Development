attribute vec2 aPosition;
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
}