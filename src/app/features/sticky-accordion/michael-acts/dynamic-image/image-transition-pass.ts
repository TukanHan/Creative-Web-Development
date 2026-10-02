import { Geometry, Mesh, Program, Renderer, RenderTarget, Texture } from 'ogl';

import vertexShader from '../../../../core/shaders/shape.vert.glsl';
import fragmentShader from './image-transition.frag.glsl';

export class ImageTransitionPass {
    private readonly previousTexture: Texture;
    private readonly currentTexture: Texture;
    private readonly target: RenderTarget;
    private readonly previousImageResolution = { value: new Float32Array([1, 1]) };
    private readonly currentImageResolution = { value: new Float32Array([1, 1]) };
    private readonly resolution = { value: new Float32Array([1, 1]) };
    private readonly progress = { value: 1 };
    private readonly mesh: Mesh;
    private sourcePair?: readonly [string, string];
    private imageRequest = 0;
    private transitionStartTime?: number;
    private readonly transitionDuration = 400;

    public get texture(): Texture {
        return this.target.texture;
    }

    constructor(
        private readonly renderer: Renderer,
        geometry: Geometry,
    ) {
        const gl = renderer.gl;
        this.previousTexture = new Texture(gl, { generateMipmaps: false });
        this.currentTexture = new Texture(gl, { generateMipmaps: false });
        this.target = new RenderTarget(gl, {
            width: 1,
            height: 1,
            depth: false,
            minFilter: gl.LINEAR,
            magFilter: gl.LINEAR,
        });

        const program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: {
                uPreviousTexture: { value: this.previousTexture },
                uCurrentTexture: { value: this.currentTexture },
                uResolution: this.resolution,
                uPreviousImageResolution: this.previousImageResolution,
                uCurrentImageResolution: this.currentImageResolution,
                uProgress: this.progress,
            },
        });

        this.mesh = new Mesh(gl, { geometry, program });
    }

    public setSources(previousSrc: string, currentSrc: string): void {
        if (this.sourcePair?.[0] === previousSrc && this.sourcePair[1] === currentSrc) {
            return;
        }

        const isInitialPair = this.sourcePair === undefined;
        this.sourcePair = [previousSrc, currentSrc];
        const request = ++this.imageRequest;

        void Promise.all([this.loadImage(previousSrc), this.loadImage(currentSrc)])
            .then(([previousImage, currentImage]) => {
                if (request !== this.imageRequest) {
                    return;
                }

                this.previousTexture.image = previousImage;
                this.currentTexture.image = currentImage;
                this.previousImageResolution.value.set([
                    previousImage.naturalWidth,
                    previousImage.naturalHeight,
                ]);
                this.currentImageResolution.value.set([
                    currentImage.naturalWidth,
                    currentImage.naturalHeight,
                ]);

                this.progress.value = isInitialPair ? 1 : 0;
                this.transitionStartTime = undefined;
            })
            .catch((error: unknown) => console.error('Unable to load transition images.', error));
    }

    public resize(width: number, height: number): void {
        this.target.setSize(width, height);
        this.resolution.value.set([width, height]);
    }

    public render(time: number): void {
        if (this.progress.value < 1) {
            this.transitionStartTime ??= time;
            const linearProgress = Math.min(
                (time - this.transitionStartTime) / this.transitionDuration,
                1,
            );
            this.progress.value = linearProgress * linearProgress * (3 - 2 * linearProgress);
        }

        this.renderer.render({ scene: this.mesh, target: this.target });
    }

    private loadImage(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.crossOrigin = 'anonymous';
            image.onload = () => resolve(image);
            image.onerror = () => reject(new Error(`Unable to load image: ${url}`));
            image.src = url;
        });
    }
}