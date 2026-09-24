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

float fbm(vec2 p) {
    float n = 0.0;
    n += 0.5000 * noise(p); p *= 2.02;
    n += 0.2500 * noise(p); p *= 2.03;
    n += 0.1250 * noise(p);
    return n;
}

void main() {
    // 1. Wycentrowanie i dopasowanie UV
    vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
    float r = length(uv);
    float angle = atan(uv.y, uv.x);

    // --- NOWA SEKCJA: ANIMACJA WEJŚCIA ---
    
    // Docelowy rozmiar horyzontu zdarzeń (to co było wcześniej)
    float baseEventHorizon = 0.18;
    
    // Szybkość animacji (wyższy numer = szybsze wejście)
    float animSpeed = 4.0; 
    
    // MODYFIKACJA: Dodajemy powolny start.
    // uTime ^ 1.5 sprawia, że pierwsze chwile są znacznie wolniejsze,
    // a potem szybko nadrabia. Dzięki temu oko dostrzega start od punktu.
    float adjustedTime = pow(max(uTime, 0.0), 1.5);
    
    // Funkcja wzrostu na poprawionym czasie
    float growth = 1.0 - exp(-adjustedTime * animSpeed);
    
    // Animowany horyzont zdarzeń
    float animatedEventHorizon = baseEventHorizon * growth;
    
    // ------------------------------------

    // 2. Bezszwowe, zagięte grawitacyjnie próbowanie szumu (używamy animowanego promienia)
    float speed = uTime * 1.2;
    vec2 polarUv = vec2(cos(angle), sin(angle));

    // Używamy animatedEventHorizon, żeby pasma też "rosły"
    float distortedRadius = (1.0 / (r - animatedEventHorizon + 0.02));
    
    // Generowanie ostrych strukturalnych pasm
    float diskNoise = fbm(polarUv * 3.0 + vec2(speed, distortedRadius * 0.15));

    // 3. Rozkład jasności dysku i gładki pierścień fotonowy
    // Używamy animatedEventHorizon, żeby jasność rosła razem z dziurą
    float diskGlow = exp(-5.0 * (r - animatedEventHorizon));
    float photonRing = exp(-40.0 * (r - animatedEventHorizon)) * 3.5;

    // 4. Koloryzacja: ogień + białe jądro na samej krawędzi
    vec3 fireColor = vec3(1.0, 0.35, 0.05) * pow(diskNoise, 1.5) * diskGlow * 4.0;
    vec3 ringColor = vec3(1.0, 0.95, 0.85) * photonRing;
    vec3 outerGlow = vec3(0.8, 0.2, 0.01) * exp(-2.0 * r);

    vec3 col = fireColor + ringColor + outerGlow;

    // 5. Antyaliasing na samej krawędzi (używamy animowanego promienia)
    float delta = fwidth(r);
    float holeMask = smoothstep(animatedEventHorizon - delta, animatedEventHorizon + delta, r);

    // Czyste odcięcie wnętrza
    col *= holeMask;

    fragColor = vec4(col, 1.0);
}