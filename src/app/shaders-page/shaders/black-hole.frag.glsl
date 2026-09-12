#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;

out vec4 fragColor;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// Szum nakładany warstwowo (FBM) dla wyrazistych włókien
float fbm(vec2 p) {
    float n = 0.0;
    n += 0.5000 * noise(p); p *= 2.02;
    n += 0.2500 * noise(p); p *= 2.03;
    n += 0.1250 * noise(p);
    return n;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
    float r = length(uv);
    float angle = atan(uv.y, uv.x);

    float eventHorizon = 0.18;

    // 1. Antyaliasing na samej krawędzi (1px)
    float delta = fwidth(r);
    float holeMask = smoothstep(eventHorizon - delta, eventHorizon + delta, r);

    // 2. Bezszwowe, zagięte grawitacyjnie próbowanie szumu
    vec2 polarUv = vec2(cos(angle), sin(angle));
    float speed = uTime * 1.2;

    // Silne ugięcie promienia sprawia, że pasma skręcają wokół środka
    float distortedRadius = (1.0 / (r - eventHorizon + 0.02));
    
    // Generowanie ostrych strukturalnych pasm
    float diskNoise = fbm(polarUv * 3.0 + vec2(speed, distortedRadius * 0.15));

    // 3. Rozkład jasności dysku i gładki pierścień fotonowy
    float diskGlow = exp(-5.0 * (r - eventHorizon));
    float photonRing = exp(-40.0 * (r - eventHorizon)) * 3.5;

    // 4. Koloryzacja: ogień + białe jądro na samej krawędzi
    vec3 fireColor = vec3(1.0, 0.35, 0.05) * pow(diskNoise, 1.5) * diskGlow * 4.0;
    vec3 ringColor = vec3(1.0, 0.95, 0.85) * photonRing;
    vec3 outerGlow = vec3(0.8, 0.2, 0.01) * exp(-2.0 * r);

    vec3 col = fireColor + ringColor + outerGlow;

    // Czyste odcięcie wnętrza
    col *= holeMask;

    fragColor = vec4(col, 1.0);
}