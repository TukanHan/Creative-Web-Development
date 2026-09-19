precision highp float;

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

    // 1. KERNEL / KSZTAŁT OGNIKA
    float flameShape = smoothstep(0.45, 0.05, length(vec2(uv.x * 0.85, uv.y * (1.1 + uv.x * 1.3))));

    // 2. UNIKALNY SEED DLA KAŻDEJ CZĄSTECZKI (Brak wpływu pozycji!)
    float uniqueSeed = hash(vID); 

    // --- BARWA (Nie połączona z pozycją na ekranie) ---
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

    // --- JASNOŚĆ ZALEŻNA OD PRĘDKOŚCI ---
    float dimming = sin(uTime * 6.0 + uniqueSeed * 12.34) * 0.1 + 0.9;
    
    // Zwiększ/zmniejsz mnożnik (np. 0.1), w zależności jak wysokie masz vSpeed w aplikacji:
    float speedBrightness = 0.7 + clamp(vSpeed * 0.1, 0.0, 1.0);

    float intensity = flameShape * dimming * speedBrightness;

    gl_FragColor = vec4(color * intensity, intensity);
}