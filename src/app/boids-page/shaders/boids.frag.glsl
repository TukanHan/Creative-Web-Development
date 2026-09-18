precision highp float;

varying float vAngle;
varying float vSpeed;

uniform float uTime;

// Funkcja obrotu wokół środka Punktu
vec2 rotate(vec2 uv, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return vec2(uv.x * c - uv.y * s, uv.x * s + uv.y * c);
}

void main() {
    // Przejście na układ lokalny [-0.5, 0.5] z punktu zakotwiczenia w środku
    vec2 uv = gl_PointCoord - vec2(0.5);
    
    // Obrót płomyczka w stronę wektora prędkości (z korektą przesunięcia fazy o 90 deg jeśli rysujemy pionowo)
    uv = rotate(uv, vAngle);

    // 1. GEOMETRIA PŁOMIENIA / OGNIKA
    // Skalujemy Y w zależności od X, aby stworzyć opływowy kształt łezki (szerszy z przodu, ostry na ogonie)
    // Front płomienia jest na +X, ogon na -X
    float distToCenter = length(uv);
    
    // Zbieżność do tyłu (zwężanie ogonka)
    float flameShape = smoothstep(0.45, 0.0, length(vec2(uv.x * 0.8, uv.y * (1.2 + uv.x * 1.5))));

    if (flameShape < 0.05) discard;

    // 2. ANIKACJA MIGOTANIA / PULSOWANIA OGNIA
    float flicker = sin(uTime * 15.0 + uv.x * 10.0) * 0.1 + 0.9;

    // 3. PALETA BARW OGNIKA (Core -> Inner Flame -> Outer Glow)
    vec3 cCore  = vec3(1.0, 1.0, 0.9); // Gorące biało-żółte jądro
    vec3 cMid   = vec3(0.5, 0.75, 1.0); // Ognisty pomarańcz
    vec3 cOuter = vec3(0.0, 0.0, 1.0); // Ciemna czerwień na brzegach

    // Gradient od środka do krawędzi
    float r = length(uv - vec2(0.1, 0.0)) * 2.5; // Przesunięcie jądra lekko w stronę przodu
    
    vec3 color = mix(cCore, cMid, smoothstep(0.0, 0.4, r));
    color = mix(color, cOuter, smoothstep(0.4, 0.9, r));

    // Przezroczystość na brzegach dla miękkiego glow
    float alpha = flameShape * flicker;

    gl_FragColor = vec4(color, alpha);
}