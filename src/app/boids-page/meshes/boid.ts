import { Vec2 } from 'ogl';
import { getCurl2D } from '../../core/noise/curl-noise';
import { Clock } from '../clock';

export class Boid {
    public position: Vec2;
    public velocity: Vec2 = new Vec2(0, 0);

    private readonly speed = 400;
    private readonly returnStrength = 0.002;

    private readonly mouseRadius = 150;
    private readonly mouseRepellingStrength = 6.0;

    constructor(private readonly originPosition: Vec2) {
        this.position = new Vec2(originPosition.x, originPosition.y);
    }

    public update(clock: Clock, mousePos?: Vec2): void {
        this.velocity = this.calcVelocity(clock, mousePos);

        this.position.x += this.velocity.x * clock.deltaTime * this.speed;
        this.position.y += this.velocity.y * clock.deltaTime * this.speed;
    }

    private calcVelocity(clock: Clock, mousePos?: Vec2): Vec2 {
        const curl = getCurl2D(this.position.x, this.position.y, clock.time);

        const anchorForceX = (this.originPosition.x - this.position.x) * this.returnStrength;
        const anchorForceY = (this.originPosition.y - this.position.y) * this.returnStrength;

        const mouseForce = this.calculateMouseForce(mousePos);

        return new Vec2(
            curl.vx + anchorForceX + mouseForce.x,
            curl.vy + anchorForceY + mouseForce.y,
        );
    }

    private calculateMouseForce(mousePos?: Vec2): Vec2 {
        let mouseForceX = 0;
        let mouseForceY = 0;

        if (mousePos) {
            const dx = this.position.x - mousePos.x;
            const dy = this.position.y - mousePos.y;
            const distSq = dx * dx + dy * dy;
            const radiusSq = this.mouseRadius * this.mouseRadius;

            if (distSq < radiusSq && distSq > 0) {
                const dist = Math.sqrt(distSq);
                const force = (1 - dist / this.mouseRadius) * this.mouseRepellingStrength;

                mouseForceX = (dx / dist) * force;
                mouseForceY = (dy / dist) * force;
            }
        }

        return new Vec2(mouseForceX, mouseForceY);
    }
}
