import { Mesh, OGLRenderingContext } from 'ogl';
import { MeshFrame } from '../mesh-frame/mesh-frame';

export interface MeshController {
    init(gl: OGLRenderingContext): void;
    update(frame: MeshFrame): Mesh;
    resize(): void;
}
