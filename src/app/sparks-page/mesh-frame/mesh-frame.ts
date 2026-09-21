import { Clock } from './clock';
import { MouseData } from './mouse-data';

export interface MeshFrame {
    readonly clock: Clock;
    readonly mouse?: MouseData;
}
