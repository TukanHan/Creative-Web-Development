precision highp float;

varying float vAngle;
varying float vSpeed;
varying float vID;
varying float vAnger;

uniform float uTime;

// STAŁE PALETY - SPOKOJNA (NIEBIESKA)
const vec3 C_CALM_CORE_A = vec3(1.2, 1.2, 1.3);
const vec3 C_CALM_MID_A  = vec3(0.1, 0.45, 0.95);
const vec3 C_CALM_CORE_B = vec3(0.8, 0.8, 1.4);
const vec3 C_CALM_MID_B  = vec3(0.2, 0.65, 1.0);

// STAŁE PALETY - WŚCIEKŁA (CZERWONA/OGNISTA)
const vec3 C_ANGRY_CORE_A = vec3(1.9, 0.05, 0.0);
const vec3 C_ANGRY_MID_A  = vec3(0.8, 0.01, 0.0);

const vec3 C_ANGRY_CORE_B = vec3(1.6, 0.5, 0.3); 
const vec3 C_ANGRY_MID_B  = vec3(1.0, 0.25, 0.1);

float hash(float n) {
    return fract(sin(n * 12.9898) * 43758.5453123);
}

vec2 rotate(vec2 uv, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return vec2(uv.x * c - uv.y * s, uv.x * s + uv.y * c);
}

void main() {
    vec2 uv = rotate(gl_PointCoord - vec2(0.5), vAngle);
    float uniqueSeed = hash(vID); 

    // 1. KSZTAŁT OGNIKA
    float flameShape = smoothstep(0.45, 0.05, length(vec2(uv.x * 0.85, uv.y * (1.1 + uv.x * 1.3))));

    // 2. CZYNIK ANGER (Szybkie przejście w czerwień)
    float angerFactor = smoothstep(0.02, 0.4, clamp(vAnger, 0.0, 1.0)); 

    // 3. MIX W EWOLUCJI CZASOWEJ (A <-> B dla obu stanów)
    float colorPulse = sin(uTime * 4.0 + uniqueSeed * 6.2831) * 0.5 + 0.5;

    // Pobranie koloru spokojnego i wściekłego dla danej klatki
    vec3 cCoreCalm = mix(C_CALM_CORE_A, C_CALM_CORE_B, colorPulse);
    vec3 cMidCalm  = mix(C_CALM_MID_A, C_CALM_MID_B, colorPulse);

    vec3 cCoreAngry = mix(C_ANGRY_CORE_A, C_ANGRY_CORE_B, colorPulse);
    vec3 cMidAngry  = mix(C_ANGRY_MID_A, C_ANGRY_MID_B, colorPulse);

    // 4. LERP SPOKOJNY -> WŚCIEKŁY
    vec3 cCore = mix(cCoreCalm, cCoreAngry, angerFactor);
    vec3 cMid  = mix(cMidCalm, cMidAngry, angerFactor);

    // 5. MIESZANIE KANAŁÓW OD ŚRODKA DO KRAWĘDZI
    float r = length(uv - vec2(0.05, 0.0)) * 2.2; 
    vec3 color = mix(cCore, cMid, smoothstep(0.0, 0.3, r));
    color = mix(color, vec3(0.0), smoothstep(0.3, 0.8, r));

    // 6. DYNAMIKA PULSOWANIA I JASNOŚĆ
    float pulseSpeed = mix(6.0, 22.0, angerFactor);
    float wave = sin(uTime * pulseSpeed + uniqueSeed * 12.34) * 0.7 +
                 cos(uTime * (pulseSpeed * 1.5) + uniqueSeed * 45.67) * 0.3;

    float dimming = 0.9 + wave * mix(0.1, 0.4, angerFactor);
    float speedBrightness = 0.7 + clamp(vSpeed * 0.1, 0.0, 1.0);

    float intensity = flameShape * dimming * speedBrightness;

    gl_FragColor = vec4(color * intensity, intensity);
}