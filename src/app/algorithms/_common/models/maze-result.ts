import {Maze} from "@/app/algorithms/_common/models/maze";
import {MazeNode} from "@/app/algorithms/_common/models/maze-node";

export interface MazeResult {
    maze: Maze;
    history: MazeNode[];
}