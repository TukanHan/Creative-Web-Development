attribute vec2 position;
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
}