attribute vec2 aPosition;
attribute vec2 aVelocity;

uniform mat4 uProjectionMatrix;
uniform float uTime; // Dla efektu migotania ognia

varying float vAngle;
varying float vSpeed;

void main() {
    // 1. Wyznaczenie kąta skierowania boida na podstawie wektora prędkości
    vAngle = atan(aVelocity.y, aVelocity.x);
    
    // 2. Długość prędkości wpływa na jasność / dynamiczny wygląd
    vSpeed = length(aVelocity);

    // 3. Ustawienie stałego rozmiaru cząsteczki
    gl_PointSize = 10.0;

    gl_Position = vec4(aPosition, 0.0, 1.0);
}