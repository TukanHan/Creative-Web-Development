export class Clock {
    public time = 0;
    public deltaTime = 0;
    public timeScale = 0.2;

    private lastFrameTime = performance.now();

    public update(): void {
        const now = performance.now();

        const rawDelta = (now - this.lastFrameTime) * 0.001;
        this.lastFrameTime = now;

        const cappedDelta = Math.min(rawDelta, 0.1);

        this.deltaTime = cappedDelta * this.timeScale;
        this.time += this.deltaTime;
    }
}
