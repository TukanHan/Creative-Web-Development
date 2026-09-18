import { Vec2 } from 'ogl';
import { getCurl2D } from '../../core/noise/curl-noise';
import { Clock } from '../clock';

export class Boid {
    public position: Vec2;
    public velocity: Vec2 = new Vec2(0, 0);

    private readonly speed = 400;
    private readonly returnStrength = 0.002;

    constructor(private readonly originPosition: Vec2) {
        this.position = new Vec2(originPosition.x, originPosition.y);
    }

    public update(clock: Clock): void {
        this.velocity = this.calcVelocity(clock);

        this.position.x += this.velocity.x * clock.deltaTime * this.speed;
        this.position.y += this.velocity.y * clock.deltaTime * this.speed;
    }

    private calcVelocity(clock: Clock): Vec2 {
        const curl = getCurl2D(this.position.x, this.position.y, clock.time);

        const anchorForceX = (this.originPosition.x - this.position.x) * this.returnStrength;
        const anchorForceY = (this.originPosition.y - this.position.y) * this.returnStrength;

        return new Vec2(curl.vx + anchorForceX, curl.vy + anchorForceY);
    }
}
