#version 300 es
precision highp float;

uniform sampler2D uPreviousTexture;
uniform sampler2D uCurrentTexture;
uniform float uProgress;
uniform vec2 uResolution;
uniform vec2 uPreviousImageResolution;
uniform vec2 uCurrentImageResolution;

in vec2 vUv;
out vec4 FragColor;

vec2 getCoverUv(vec2 uv, vec2 canvasRes, vec2 imgRes) {
    float canvasRatio = canvasRes.x / canvasRes.y;
    float imageRatio = imgRes.x / imgRes.y;

    if (canvasRatio > imageRatio) {
        uv.y = (uv.y - 0.5) * (imageRatio / canvasRatio) + 0.5;
    } else {
        uv.x = (uv.x - 0.5) * (canvasRatio / imageRatio) + 0.5;
    }

    return uv;
}

void main() {
    vec2 previousUv = getCoverUv(vUv, uResolution, uPreviousImageResolution);
    vec2 currentUv = getCoverUv(vUv, uResolution, uCurrentImageResolution);
    vec4 previousColor = texture(uPreviousTexture, previousUv);
    vec4 currentColor = texture(uCurrentTexture, currentUv);

    FragColor = mix(previousColor, currentColor, clamp(uProgress, 0.0, 1.0));
}