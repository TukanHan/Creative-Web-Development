import { Mesh, OGLRenderingContext } from 'ogl';
import { MeshFrame } from '../mesh-frame/mesh-frame';
import { Size } from '../mesh-frame/size';

export interface MeshController {
    init(gl: OGLRenderingContext, size: Size): void;
    update(frame: MeshFrame): Mesh;
    resize(): void;
}
