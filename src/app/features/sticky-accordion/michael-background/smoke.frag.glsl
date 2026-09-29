#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uProgress;

in vec2 vUv;
out vec4 fragColor;

const mat2 m = mat2(0.80,  0.60, -0.60,  0.80);

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float noise(in vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
               mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
}

float fbm(vec2 p) {
    float f = 0.0;
    f += 0.5000 * noise(p); p = m * p * 2.02;
    f += 0.2500 * noise(p); p = m * p * 2.03;
    f += 0.1250 * noise(p); p = m * p * 2.01;
    f += 0.0625 * noise(p);
    return f;
}

void main() {
    vec2 st = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;

    // ODWRÓCENIE STANÓW: 1.0 na samej górze (uProgress = 0.0), 0.0 na dole (uProgress = 1.0)
    float tension = pow(1.0 - uProgress, 1.3);

    // uTime is accumulated using the current progress-dependent flow speed.
    float flowTime = uTime;

    // Dynamiczna skala szumu (większa gęstość/skala na górze, gładka/duża na dole)
    float scale = mix(1.8, 3.2, tension);

    // Wektor stale płynącego dymu w tle
    vec2 flowVector = vec2(sin(flowTime * 0.5) * 0.2, flowTime * 0.4);

    // Warstwa 1: Podstawowy płynący ruch
    vec2 q = vec2(
        fbm(st * scale + flowVector),
        fbm(st * scale + flowVector + vec2(5.2, 1.3))
    );

    // Warstwa 2: Zawirowania tła
    vec2 r = vec2(
        fbm(st * scale + 1.2 * q + vec2(1.7, 9.2) + flowVector * 0.5),
        fbm(st * scale + 1.2 * q + vec2(8.3, 2.8) + flowVector * 0.3)
    );

    float f = fbm(st * scale + r);

    // Ziarno obecne na górze, zanikające ku dołowi
    float liveGrain = (hash(st * 80.0 + vec2(uTime * 2.0)) - 0.5) * 0.06 * tension;

    // Przezroczystość – na górze wyraźna (mix 0.3->0.6), na dole schodzi do rzadkiej mgiełki (0.1->0.3)
    float alpha = smoothstep(0.1, 0.75, f) * mix(0.3, 0.6, tension) + liveGrain;

    // Kolorystyka (zachowana Twoja zmiana z czerwonawych na odcienie bieli/szarości)
    vec3 calmColor = vec3(0.78, 0.80, 0.83); 
    vec3 tensionColor = vec3(0.4, 0.4, 0.4); 

    vec3 color = mix(calmColor, tensionColor, tension * 0.8);

    fragColor = vec4(color, clamp(alpha, 0.0, 0.75));
}