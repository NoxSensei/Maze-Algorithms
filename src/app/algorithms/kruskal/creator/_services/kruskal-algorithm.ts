import {MazeAlgorithm} from "@/app/algorithms/_common/services/maze-algorithm";
import {Maze} from "@/app/algorithms/_common/models/maze";
import {MazeNode} from "@/app/algorithms/_common/models/maze-node";
import {v4 as uuidV4} from "uuid";
import {JsHelpers} from "@/_common/services/js-helpers";
import {MazeNodesHistory} from "@/app/algorithms/_common/models/maze-nodes-history";

interface ExtendedMazeNode extends MazeNode {
    groupId: string;
}

interface MazeWall {
    node1: ExtendedMazeNode;
    node2: ExtendedMazeNode;
    wallType: 'vertical' | 'horizontal'
}

interface NodesGroup {
    nodes: ExtendedMazeNode[]
}

export class KruskalAlgorithm extends MazeAlgorithm {
    protected removeWalls(maze: Maze, nodesHistory: MazeNodesHistory): void {
        const {extendedMaze, nodesGroups} = this.assignNodesToUniqueGroups(maze);
        const walls = this.getWallsToBeProcessed(extendedMaze, maze);
        const shuffledWalls = JsHelpers.shuffleArray(walls);
        for (const wall of shuffledWalls) {
            if (wall.node1.groupId === wall.node2.groupId) {
                continue;
            }

            this.assignNodesToTheSameGroup(nodesGroups, wall.node1, wall.node2);
            if (wall.wallType === "vertical") {
                wall.node1.isWallOnEast = false;
                wall.node2.isWallOnWest = false;
            } else {
                wall.node1.isWallOnSouth = false;
                wall.node2.isWallOnNorth = false;
            }

            // Clone visited node to have the state frozen from the given moment
            // We don't want to include reference as it already contains all selected walls removed
            nodesHistory.add(structuredClone(wall.node1));
            nodesHistory.add(structuredClone(wall.node2));
        }
    }

    private getWallsToBeProcessed(extendedMaze: ExtendedMazeNode[][], maze: Maze): MazeWall[] {
        const walls: MazeWall[] = [];
        for (const [rowIndex, row] of extendedMaze.entries()) {
            const isLastRow = rowIndex === maze.grid.length - 1;
            for (const [columnIndex, node] of row.entries()) {
                const isLastColumn = columnIndex === row.length - 1;
                if (!isLastColumn) {
                    walls.push({
                        node1: node,
                        node2: row[columnIndex + 1],
                        wallType: "vertical"
                    })
                }

                if (!isLastRow) {
                    walls.push({
                        node1: node,
                        node2: extendedMaze[rowIndex + 1][columnIndex],
                        wallType: "horizontal"
                    })
                }
            }
        }
        return walls;
    }

    private assignNodesToUniqueGroups(maze: Maze): {
        extendedMaze: ExtendedMazeNode[][],
        nodesGroups: Map<string, NodesGroup>
    } {
        const nodesGroups = new Map<string, NodesGroup>();
        const extendedMaze: ExtendedMazeNode[][] = [];
        for (const row of maze.grid) {
            const extendedRowNodes: ExtendedMazeNode[] = [];
            extendedMaze.push(extendedRowNodes);
            for (const node of row as ExtendedMazeNode[]) {
                node.groupId = uuidV4();
                nodesGroups.set(node.groupId, {nodes: [node]});
                extendedRowNodes.push(node);
            }
        }
        return {extendedMaze, nodesGroups};
    }

    /**
     * Assigns all nodes from the first node's group to the second node's group
     */
    private assignNodesToTheSameGroup(groups: Map<string, NodesGroup>, node1: ExtendedMazeNode, node2: ExtendedMazeNode): void {
        const firstGroup = groups.get(node1.groupId);
        if (!firstGroup) {
            throw new Error('First node is not a part of any group')
        }

        const secondGroup = groups.get(node2.groupId);
        if (!secondGroup) {
            throw new Error('Second node is not a part of any group')
        }

        groups.delete(node1.groupId);
        firstGroup.nodes.forEach(node => node.groupId = node2.groupId);
        secondGroup.nodes.push(...firstGroup.nodes);
    }
}
