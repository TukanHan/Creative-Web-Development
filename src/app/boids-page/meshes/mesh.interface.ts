import { Mesh } from "ogl";
import { Clock } from "../clock";

export interface MeshX {
    update(clock: Clock): Mesh;
}