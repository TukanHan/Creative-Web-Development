precision highp float;

varying float vAngle;
varying float vLen;

vec2 rotate(vec2 uv, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return vec2(uv.x * c - uv.y * s, uv.x * s + uv.y * c);
}

float approxTanh(float x) {
    float e2x = exp(2.0 * x);
    return (e2x - 1.0) / (e2x + 1.0);
}

void main() {
    vec2 st = gl_PointCoord - vec2(0.5);
    st = rotate(st, vAngle);

    float k = 0.3; 
    float normSpeed = approxTanh(vLen * k);

    float headTip = 0.30;
    float headBase = 0.08;
    
    float tailStart = mix(-0.08, -0.32, normSpeed);

    float line = step(tailStart, st.x) * step(st.x, headBase) * step(-0.02, st.y) * step(st.y, 0.02);
    
    float head = step(headBase, st.x) * step(st.x, headTip) * step(abs(st.y), (headTip - st.x) * 0.45);

    if (max(line, head) < 0.5) discard;

    vec3 c0 = vec3(0.02, 0.05, 0.15); // Ciemny fiolet/granat
    vec3 c1 = vec3(0.00, 0.35, 0.65); // Głęboki błękit
    vec3 c2 = vec3(0.00, 0.75, 0.55); // Morska zieleń / cyjan
    vec3 c3 = vec3(0.85, 0.95, 0.35); // Limonka / Żółć dla pików

    vec3 color;
    if (normSpeed < 0.3) {
        color = mix(c0, c1, normSpeed / 0.3);
    } else if (normSpeed < 0.7) {
        color = mix(c1, c2, (normSpeed - 0.3) / 0.4);
    } else {
        color = mix(c2, c3, (normSpeed - 0.7) / 0.3);
    }

    gl_FragColor = vec4(color, 0.7);
}