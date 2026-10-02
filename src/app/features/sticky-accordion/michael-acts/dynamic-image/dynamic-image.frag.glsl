#version 300 es
precision highp float;

uniform sampler2D uTexture;
uniform float uTime;
uniform float uProgress;
uniform vec2 uResolution;
uniform vec2 uImageResolution;

in vec2 vUv;
out vec4 FragColor;

// --- Podstawowy Szum Simplex 2D ---
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// --- FBM (4 OKTAWY) - daje wielowarstwową, miękką mgłę ---
float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    // Pętla 4 oktaw – nakładanie drobnoskalowego szumu na duży
    for (int i = 0; i < 4; i++) {
        value += amplitude * snoise(st * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

// Dopasowanie proporcji (object-fit: cover)
vec2 getCoverUv(vec2 uv, vec2 canvasRes, vec2 imgRes) {
    vec2 s = canvasRes;
    vec2 i = imgRes;
    float rs = s.x / s.y;
    float ri = i.x / i.y;
    vec2 newUv = uv;
    
    if (rs > ri) {
        newUv.y = (uv.y - 0.5) * (ri / rs) + 0.5;
    } else {
        newUv.x = (uv.x - 0.5) * (rs / ri) + 0.5;
    }
    return newUv;
}

void main() {
    vec2 uv = getCoverUv(vUv, uResolution, uImageResolution);

    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
        discard;
    }

    vec4 texColor = texture(uTexture, uv);

    // =========================================================
    // 1. KRAWĘDŹ GÓRA/DÓŁ (Wielo-oktawowy FBM)
    // =========================================================
    // Odległość od góry/dołu (0 w środku, 1 na krawędzi Y)
    float distY = abs(uv.y - 0.5) * 1.5;
    float distX = abs(uv.x - 0.5) * 1.5;

    // Skupiamy się mocno na górze i dole
    float edgeFactor = max(distY * 1.2, distX * 0.3);

    // Wielowarstwowa mgła z wolnym ruchem czasu
    vec2 fbmUv = uv * 3.0 + vec2(uTime * 0.03, uTime * 0.02);
    float fogNoise = fbm(fbmUv) * 0.25; // Wartość od ok -0.25 do 0.25

    // Bardzo miękkie przejście krawędziowe (bardzo duży rozstęp wartości w smoothstep)
    // Dzięki szerokiemu zakresowi 0.40 -> 0.98 nie ma ostrych kresek ani pasm!
    float edgeAlpha = smoothstep(0.98, 0.40, edgeFactor + fogNoise);

    // =========================================================
    // 2. ŚRODEK (Nasiąkanie/Mroczenie zasilane uProgress)
    // =========================================================
    // Osobny, subtelny FBM dla środka obrazu
    vec2 centerFbmUv = uv * 2.0 - vec2(0.0, uTime * 0.015);
    float centerNoise = fbm(centerFbmUv);

    // Dystans od środka kadru
    float distFromCenter = length(uv - vec2(0.5));

    // Płynny wpływ uProgress – bez tworzenia "ostrych dziur"
    float stain = smoothstep(-0.6, 0.8, centerNoise + (uProgress * 0.4) - (distFromCenter * 0.5));
    
    // Umiarkowane osłabienie alfy w miejscach plam (maksymalnie do ~0.7)
    float centerAlpha = mix(1.0, 0.72, stain * uProgress);

    // Subtelne, naturalne przyciemnienie w plamach
    vec3 finalRgb = mix(texColor.rgb, texColor.rgb * 0.85, stain * uProgress * 0.4);

    // =========================================================
    // 3. POŁĄCZENIE I KLAMP
    // =========================================================
    float finalAlpha = edgeAlpha * centerAlpha;

    // Brak całkowitego wygaszania
    finalAlpha = clamp(finalAlpha, 0.15, 1.0);

    FragColor = vec4(finalRgb, texColor.a * finalAlpha);
}