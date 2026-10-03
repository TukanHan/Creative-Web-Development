#version 300 es
precision highp float;

uniform sampler2D uTexture;
uniform float uTime;
uniform float uProgress;
uniform vec2 uResolution;

in vec2 vUv;
out vec4 FragColor;

vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0)
    ) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n = 1.0 / 7.0;
    vec3 ns = n * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = inversesqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m *= m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

float fbm(vec3 st) {
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

void main() {
    vec2 uv = vUv;
    vec4 texColor = texture(uTexture, uv);
    vec2 noiseUv = (uv - vec2(0.5)) * vec2(uResolution.x / uResolution.y, 1.0);

    // =========================================================
    // 1. KRAWĘDŹ GÓRA/DÓŁ (Wielo-oktawowy FBM)
    // =========================================================
    // Odległość od góry/dołu (0 w środku, 1 na krawędzi Y)
    float distY = abs(uv.y - 0.5) * (1.5 + uProgress * 0.5);
    float distX = abs(uv.x - 0.5) * (1.5 + uProgress * 0.5);

    // Skupiamy się mocno na górze i dole
    float edgeFactor = max(distY * 1.2, distX * 0.3);

    float edgeActivity = smoothstep(0.0, 1.0, clamp(uProgress, 0.0, 1.0));
    float distFromCenter = length(noiseUv);
    float radialStrength = pow(smoothstep(0.0, 0.707, distFromCenter), 1.2);
    float edgeAlphaMultiplier = mix(0.65, 1.5, radialStrength);
    edgeFactor *= mix(1.0, edgeAlphaMultiplier, edgeActivity);

    float edgeRoughness = edgeActivity * edgeActivity;
    vec3 fogPosition = vec3(noiseUv * 2.4, uTime * 0.07);
    float fogNoise = fbm(fogPosition) * mix(0.25, 0.42, edgeRoughness);
    float fineNoise = snoise(vec3(noiseUv * 12.0, uTime * 0.07));
    float edgeDetail = fineNoise * 0.18 * edgeRoughness;

    // Bardzo miękkie przejście krawędziowe (bardzo duży rozstęp wartości w smoothstep)
    // Dzięki szerokiemu zakresowi 0.40 -> 0.98 nie ma ostrych kresek ani pasm!
    float edgeAlpha = 1.0 - smoothstep(0.40, 0.98, edgeFactor + fogNoise + edgeDetail);

    // =========================================================
    // 2. ŚRODEK (Nasiąkanie/Mroczenie zasilane uProgress)
    // =========================================================
    // Osobny, subtelny FBM dla środka obrazu
    vec3 centerPosition = vec3(noiseUv * 3.0, uTime * 0.05);
    float centerNoise = fbm(centerPosition);

    // Większe plamy z łagodnym wpływem progressu i dystansu
    float stain = smoothstep(-0.6, 0.8, centerNoise + (uProgress * 0.4) - (distFromCenter * 0.5));
    
    // Łagodne osłabienie alfy w miejscach plam
    float centerAlpha = mix(1.0, 0.72, stain * uProgress);

    // Subtelne przyciemnienie towarzyszące pulsowaniu
    vec3 finalRgb = mix(texColor.rgb, texColor.rgb * 0.85, stain * uProgress * 0.4);

    // =========================================================
    // 3. POŁĄCZENIE I KLAMP
    // =========================================================
    float finalAlpha = edgeAlpha * centerAlpha;

    FragColor = vec4(finalRgb, texColor.a * finalAlpha);
}