import {MazeAlgorithm} from "@/app/algorithms/_common/services/maze-algorithm";
import {Maze} from "@/app/algorithms/_common/models/maze";
import {MazeNode} from "@/app/algorithms/_common/models/maze-node";
import {JsHelpers} from "@/_common/services/js-helpers";
import {v4} from "uuid";

class ExtendedMazeNode extends MazeNode {
    groupId?: string;
}

export class EllerAlgorithm extends MazeAlgorithm {
    protected removeWalls(maze: Maze, visitedNodes: Set<MazeNode>): void {
        for (const [rowIndex, row] of (maze.grid as ExtendedMazeNode[][]).entries()) {
            row.forEach((node: ExtendedMazeNode) => {
                if (!node.groupId) {
                    node.groupId = v4()
                }
            });

            for (const [columnIndex, node] of row.entries()) {
                visitedNodes.add(node);

                const isLastColumn = columnIndex === row.length - 1;
                if (isLastColumn) {
                    continue;
                }

                const nodeOnTheEast = row[columnIndex + 1];
                if (nodeOnTheEast.groupId === node.groupId) {
                    continue;
                }

                const shouldDestroyWallOnEast = JsHelpers.isRandomChanceMet(0.5);
                if (!shouldDestroyWallOnEast) {
                    continue;
                }

                node.isWallOnEast = false;
                nodeOnTheEast.isWallOnWest = false;

                const oldid = nodeOnTheEast.groupId!;
                nodeOnTheEast.groupId = node.groupId;
                this.replace(maze, oldid, node.groupId!)
            }


            const isLastRow = rowIndex === row.length - 1;
            if (isLastRow) {
                for (const [columnIndex, node] of row.entries()) {
                    visitedNodes.add(node);

                    const isLastColumn = columnIndex === row.length - 1;
                    if (isLastColumn) {
                        continue;
                    }

                    const nodeOnTheEast = row[columnIndex + 1];
                    if (nodeOnTheEast.groupId === node.groupId) {
                        continue;
                    }

                    node.isWallOnEast = false;
                    nodeOnTheEast.isWallOnWest = false;

                    const oldid = nodeOnTheEast.groupId!;
                    nodeOnTheEast.groupId = node.groupId;
                    this.replace(maze, oldid, node.groupId!)
                }

                continue
            }

            const groups = new Set();
            const counts: any = {};
            for (const [index, node] of row.entries()) {
                groups.add(node.groupId);

                if (counts[node.groupId!]) {
                    counts[node.groupId!].count++;
                    counts[node.groupId!].nodes.push(node);
                } else {
                    counts[node.groupId!] = {
                        count: 1,
                        nodes: [node]
                    }
                }
            }

            [...groups].forEach(group => {
                const downWallsCount = JsHelpers.randomInt(1, counts[group as number].count);
                const nodes = JsHelpers.shuffleArray(counts[group as number].nodes).slice(0, downWallsCount) as ExtendedMazeNode[];
                nodes.forEach(((node) => {
                    const nodeOnTheSouth = maze.grid[node.rowIndex + 1][node.columnIndex] as ExtendedMazeNode;
                    node.isWallOnSouth = false;
                    nodeOnTheSouth.isWallOnNorth = false;
                    nodeOnTheSouth.groupId = node.groupId;

                    visitedNodes.add(nodeOnTheSouth);
                }))
            })
        }
    }

    private replace(maze: Maze, oldGroupId: string, newGroupId: string) {
        for (const row of maze.grid) {
            for (const node of (row as ExtendedMazeNode[])) {
                if (node.groupId === oldGroupId) {
                    node.groupId = newGroupId;
                }
            }
        }
    }
}