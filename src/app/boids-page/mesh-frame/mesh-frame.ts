import { Vec2 } from 'ogl';
import { Clock } from './clock';

export interface MeshFrame {
    readonly clock: Clock;
    readonly mousePosition?: Vec2;
}
