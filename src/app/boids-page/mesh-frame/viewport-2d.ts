import { Vec2 } from 'ogl';

export class Viewport2D {
    public width = 0;
    public height = 0;
    public zoom = 1.0;

    public cameraPosition: Vec2 = new Vec2();

    public resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }

    /**
     * Converts world coordinates to WebGL normalized device coordinates.
      * @example
      * viewport.resize(800, 600);
      * viewport.worldToNdc(new Vec2(-400, -300)); // Vec2(-1, -1)
     */
    public worldToNdc(world: Vec2): Vec2 {
        const ndcX = ((world.x - this.cameraPosition.x) * this.zoom) / (this.width / 2);
        const ndcY = ((world.y - this.cameraPosition.y) * this.zoom) / (this.height / 2);

        return new Vec2(ndcX, ndcY);
    }

    /**
     * Converts WebGL normalized device coordinates to world coordinates.
      * @example
      * viewport.resize(800, 600);
      * viewport.ndcToWorld(new Vec2(-1, -1)); // Vec2(-400, -300)
     */
    public ndcToWorld(ndc: Vec2): Vec2 {
        const worldX = (ndc.x * (this.width / 2)) / this.zoom + this.cameraPosition.x;
        const worldY = (ndc.y * (this.height / 2)) / this.zoom + this.cameraPosition.y;

        return new Vec2(worldX, worldY);
    }

    /**
     * Converts CSS pixel coordinates to world coordinates.
     * @example
     * viewport.resize(800, 600);
     * viewport.screenToWorld(new Vec2(0, 0)); // Vec2(-400, 300)
     */
    public screenToWorld(pixel: Vec2): Vec2 {
        const ndcX = (pixel.x / this.width) * 2 - 1;
        const ndcY = -(pixel.y / this.height) * 2 + 1;

        return this.ndcToWorld(new Vec2(ndcX, ndcY));
    }
}
