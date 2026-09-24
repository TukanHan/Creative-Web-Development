#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;

in vec2 vUv;
out vec4 fragColor;

// Prosta funkcja losująca
float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

// Dwuwymiarowy szum Value Noise
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

// FBM: Sumowanie 5 warstw szumu o różnej częstotliwości i ambilitudzie
float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    
    // Obrót zapobiega nakładaniu się krawędzi w kolejnych oktawach
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));

    for (int i = 0; i < 5; i++) {
        value += amplitude * noise(st);
        st = rot * st * 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vec2 st = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;

    // Przesuwamy szum w górę (uTime * 0.2), imitując unoszący się dym
    vec2 smokeUV = st * 3.0 - vec2(0.0, uTime * 0.2);

    // Generujemy warstwy dymu
    float density = fbm(smokeUV);

    // Zanikanie dymu ku górze i krawędziom
    float mask = smoothstep(1.0, -0.5, st.y);
    density *= mask;

    // Kolor dymu (szaro-biały z przezroczystością)
    vec3 smokeColor = vec3(0.8, 0.85, 0.9);
    
    fragColor = vec4(smokeColor, density * 0.7);
}