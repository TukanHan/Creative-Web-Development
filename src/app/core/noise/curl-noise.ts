import { noise3D } from './simplex-noise';

function fbm3D(x: number, y: number, z: number, octaves: number = 3): number {
    let value = 0;
    let amplitude = 1.0;
    let frequency = 1.0;
    let maxValue = 0;

    for (let i = 0; i < octaves; i++) {
        value += noise3D(x * frequency, y * frequency, z * frequency) * amplitude;
        maxValue += amplitude;
        frequency *= 2.0;
        amplitude *= 0.5;
    }

    return value / maxValue;
}

export function getCurl2D(
    x: number,
    y: number,
    t: number = 0,
    frequency: number = 0.0003,
    octaves: number = 4,
): { vx: number; vy: number } {
    const eps = 0.001;

    const nx = x * frequency;
    const ny = y * frequency;

    const dS_dy = (fbm3D(nx, ny + eps, t, octaves) - fbm3D(nx, ny - eps, t, octaves)) / (2 * eps);
    const dS_dx = (fbm3D(nx + eps, ny, t, octaves) - fbm3D(nx - eps, ny, t, octaves)) / (2 * eps);

    const vx = dS_dy;
    const vy = -dS_dx;

    return { vx, vy };
}
