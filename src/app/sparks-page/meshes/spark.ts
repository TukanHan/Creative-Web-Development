import { Vec2 } from 'ogl';
import { getCurl2D } from '../../core/noise/curl-noise';
import { Clock } from '../mesh-frame/clock';
import { MouseData } from '../mesh-frame/mouse-data';

const SPARK_SPEED: number = 400;
const SPARK_RETURN_STRENGTH = 0.002;

const MOUSE_REPELLING_STRENGTH = 10.0;
const MOUSE_RADIUS = 200;
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;

export class Spark {
    public position: Vec2;
    public velocity: Vec2 = new Vec2(0, 0);

    constructor(private readonly originPosition: Vec2) {
        this.position = new Vec2(originPosition.x, originPosition.y);
    }

    public update(clock: Clock, mouse?: MouseData): void {
        this.velocity = this.calcVelocity(clock, mouse);

        this.position.x += this.velocity.x * clock.deltaTime * SPARK_SPEED;
        this.position.y += this.velocity.y * clock.deltaTime * SPARK_SPEED;
    }

    private calcVelocity(clock: Clock, mouse?: MouseData): Vec2 {
        const curl = getCurl2D(this.position.x, this.position.y, clock.time);

        const anchorForceX = (this.originPosition.x - this.position.x) * SPARK_RETURN_STRENGTH;
        const anchorForceY = (this.originPosition.y - this.position.y) * SPARK_RETURN_STRENGTH;

        const mouseForce = this.calculateMouseForce(mouse);

        return new Vec2(
            curl.vx + anchorForceX + mouseForce.x,
            curl.vy + anchorForceY + mouseForce.y,
        );
    }

    private calculateMouseForce(mouse?: MouseData): Vec2 {
        let mouseForceX = 0;
        let mouseForceY = 0;

        if (mouse) {
            const dx = this.position.x - mouse.position.x;
            const dy = this.position.y - mouse.position.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < MOUSE_RADIUS_SQ && distSq > 0) {
                const dist = Math.sqrt(distSq);
                const force = (1 - dist / MOUSE_RADIUS) * MOUSE_REPELLING_STRENGTH * mouse.forceMultiplier;

                mouseForceX = (dx / dist) * force;
                mouseForceY = (dy / dist) * force;
            }
        }

        return new Vec2(mouseForceX, mouseForceY);
    }
}
