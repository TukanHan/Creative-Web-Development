import { Vec2 } from 'ogl';
import { getCurl2D } from '../../../core/noise/curl-noise';
import { Clock } from '../mesh-frame/clock';
import { MouseData } from '../mesh-frame/mouse-data';

const SPARK_SPEED: number = 400;
const SPARK_RETURN_STRENGTH = 0.002;

const MOUSE_REPELLING_STRENGTH = 10.0;
const MOUSE_RADIUS = 200;
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;

export class Spark {
    public readonly position: Vec2;
    public readonly velocity: Vec2 = new Vec2(0, 0);
    public anger: number = 0;

    private readonly mouseForce: Vec2 = new Vec2();

    constructor(private readonly originPosition: Vec2) {
        this.position = new Vec2(originPosition.x, originPosition.y);
    }

    public update(clock: Clock, mouse?: MouseData): void {
        this.recalculateVelocity(clock, mouse);

        this.position.x += this.velocity.x * clock.deltaTime * SPARK_SPEED;
        this.position.y += this.velocity.y * clock.deltaTime * SPARK_SPEED;

        const decayRate = 3.0;
        this.anger = Math.max(0, this.anger - clock.deltaTime * decayRate);
    }

    private recalculateVelocity(clock: Clock, mouse?: MouseData): void {
        const curl = getCurl2D(this.position.x, this.position.y, clock.time);

        const anchorForceX = (this.originPosition.x - this.position.x) * SPARK_RETURN_STRENGTH;
        const anchorForceY = (this.originPosition.y - this.position.y) * SPARK_RETURN_STRENGTH;

        this.recalculateMouseForce(mouse);

        this.velocity.set(
            curl.vx + anchorForceX + this.mouseForce.x,
            curl.vy + anchorForceY + this.mouseForce.y,
        );
    }

    private recalculateMouseForce(mouse?: MouseData): void {
        this.mouseForce.set(0, 0);

        if (mouse) {
            const dx = this.position.x - mouse.position.x;
            const dy = this.position.y - mouse.position.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < MOUSE_RADIUS_SQ && distSq > 0) {
                const dist = Math.sqrt(distSq);
                const distanceFactor = 1 - dist / MOUSE_RADIUS;

                const absForceMultiplier = Math.abs(mouse.forceMultiplier);
                const currentAnger = distanceFactor * absForceMultiplier;
                this.anger = Math.min(1, Math.max(this.anger, currentAnger));

                const force = distanceFactor * MOUSE_REPELLING_STRENGTH * mouse.forceMultiplier;
                this.mouseForce.set((dx / dist) * force, (dy / dist) * force);
            }
        }
    }
}
