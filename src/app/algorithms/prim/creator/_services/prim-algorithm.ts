import {MazeAlgorithm} from "@/app/algorithms/_common/services/maze-algorithm";
import {Maze} from "@/app/algorithms/_common/models/maze";
import {MazeNode} from "@/app/algorithms/_common/models/maze-node";
import {JsHelpers} from "@/_common/services/js-helpers";
import {MazeNodesHistory} from "@/app/algorithms/_common/models/maze-nodes-history";

export class PrimAlgorithm extends MazeAlgorithm {
    protected removeWalls(maze: Maze, nodesHistory: MazeNodesHistory): void {
        const rowIndex = JsHelpers.randomInt(0, maze.rowsCount - 1);
        const columnIndex = JsHelpers.randomInt(0, maze.columnsCount - 1);
        const initialNode = maze.grid[rowIndex][columnIndex];
        const visitedNodes = new Set<MazeNode>();

        let frontiers = new Set([initialNode]);

        let iteration = 0;
        while (frontiers.size) {
            iteration++;

            const frontier = JsHelpers.popRandomElementFromSet(frontiers)!;
            const frontierNeighbours = this.getNodeNeighbours(maze, frontier);

            const newFrontierNodes = frontierNeighbours.reduce<MazeNode[]>((acc, node) => {
                if (!visitedNodes.has(node) && !frontiers.has(node)) {
                    acc.push(node);
                }
                return acc;
            }, [])

            newFrontierNodes.forEach(node => frontiers.add(node));
            visitedNodes.add(frontier);

            const visitedNeighbours = frontierNeighbours.reduce<MazeNode[]>((acc, node) => {
                if (visitedNodes.has(node)) {
                    acc.push(node);
                }
                return acc;
            }, [])

            const nodeToBuildPathFrom = JsHelpers.getRandomElementFromArray(visitedNeighbours);
            if (nodeToBuildPathFrom) {
                this.removeWallBetweenNodes(nodeToBuildPathFrom, frontier);
            }

            nodesHistory.add(frontier);
        }
    }

    private getNodeNeighbours(maze: Maze, node: MazeNode): MazeNode[] {
        const neighbours: MazeNode[] = [];
        const westernColumnIndex = node.columnIndex - 1;
        if (westernColumnIndex >= 0) {
            neighbours.push(maze.grid[node.rowIndex][westernColumnIndex]);
        }
        const northernRowIndex = node.rowIndex - 1;
        if (northernRowIndex >= 0) {
            neighbours.push(maze.grid[northernRowIndex][node.columnIndex]);
        }
        const easternColumnIndex = node.columnIndex + 1;
        if (easternColumnIndex < maze.grid[node.rowIndex].length) {
            neighbours.push(maze.grid[node.rowIndex][easternColumnIndex]);
        }
        const southernRowIndex = node.rowIndex + 1;
        if (southernRowIndex < maze.grid.length) {
            neighbours.push(maze.grid[southernRowIndex][node.columnIndex]);
        }
        return neighbours;
    }

    private removeWallBetweenNodes(node1: MazeNode, node2: MazeNode): void {
        if (node1.rowIndex === node2.rowIndex) {
            if (node1.columnIndex - 1 === node2.columnIndex) {
                node1.isWallOnWest = false;
                node2.isWallOnEast = false;
            } else if (node1.columnIndex + 1 === node2.columnIndex) {
                node1.isWallOnEast = false;
                node2.isWallOnWest = false;
            }
        } else if (node1.columnIndex === node2.columnIndex) {
            if (node1.rowIndex - 1 === node2.rowIndex) {
                node1.isWallOnNorth = false;
                node2.isWallOnSouth = false;
            } else if (node1.rowIndex + 1 === node2.rowIndex) {
                node1.isWallOnSouth = false;
                node2.isWallOnNorth = false;
            }
        }
    }
}
