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
     * World Space -> WebGL Clip Space ([-1, 1])
     * Używane głównie w shaderze lub do przesyłania pozycji boidów do WebGL
     */
    public worldToNdc(world: Vec2): Vec2 {
        const ndcX = ((world.x - this.cameraPosition.x) * this.zoom) / (this.width / 2);
        const ndcY = ((world.y - this.cameraPosition.y) * this.zoom) / (this.height / 2);

        return new Vec2(ndcX, ndcY);
    }

    // 2. WebGL Clip Space ([-1, 1]) -> World Space
    // Używane do wyliczania pozycji boida z przestrzeni NDC do szumu
    public ndcToWorld(ndc: Vec2): Vec2 {
        const worldX = (ndc.x * (this.width / 2)) / this.zoom + this.cameraPosition.x;
        const worldY = (ndc.y * (this.height / 2)) / this.zoom + this.cameraPosition.y;

        return new Vec2(worldX, worldY);
    }

    // 3. Screen (Piksele CSS z myszki/touch) -> World Space
    public screenToWorld(pixel: Vec2): Vec2 {
        const ndcX = (pixel.x / this.width) * 2 - 1;
        const ndcY = -(pixel.y / this.height) * 2 + 1;

        return this.ndcToWorld(new Vec2(ndcX, ndcY));
    }
}
