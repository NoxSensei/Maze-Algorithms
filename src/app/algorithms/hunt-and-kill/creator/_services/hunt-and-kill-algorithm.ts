import {MazeAlgorithm} from "@/app/algorithms/_common/services/maze-algorithm";
import {Maze} from "@/app/algorithms/_common/models/maze";
import {MazeNode} from "@/app/algorithms/_common/models/maze-node";
import {MazeNodesHistory} from "@/app/algorithms/_common/models/maze-nodes-history";
import {JsHelpers} from "@/_common/services/js-helpers";
import {Direction} from "@/_common/models/direction";

export class HuntAndKillAlgorithm extends MazeAlgorithm {
    protected removeWalls(maze: Maze, nodesHistory: MazeNodesHistory): void {
        let rowIndex = JsHelpers.randomInt(0, maze.rowsCount - 1);
        let columnIndex = JsHelpers.randomInt(0, maze.columnsCount - 1);
        const visitedNodes = new Set<MazeNode>();

        let nextNode: MazeNode| null = maze.grid[rowIndex][columnIndex];
        while(nextNode) {
            this.walk(maze, visitedNodes, nodesHistory, nextNode!)
            nextNode = this.hunt(maze, visitedNodes, nodesHistory);
        }
    }

    private walk(maze: Maze, visitedNodes: Set<MazeNode>, nodesHistory: MazeNodesHistory, node: MazeNode): void {
        let neighbouringNode: MazeNode | null = node;
        while (neighbouringNode) {
            visitedNodes.add(neighbouringNode);
            nodesHistory.add(neighbouringNode);
            neighbouringNode = this.tryBuildPassage(maze, visitedNodes, neighbouringNode, 'lookForNonVisited');
        }
    }

    private tryBuildPassage(maze: Maze, visitedNodes: Set<MazeNode>, node: MazeNode, passageMode: 'lookForVisited' | 'lookForNonVisited'): MazeNode | null {
        for (const direction of JsHelpers.shuffleArray(this.directions)) {
            const neighbouringNode = this.tryBuildPassageInDirection(direction, maze, visitedNodes, node, passageMode);
            if (neighbouringNode) {
                return neighbouringNode;
            }
        }

        return null;
    }

    private tryBuildPassageInDirection(direction: Direction, maze: Maze, visitedNodes: Set<MazeNode>, node: MazeNode, passageMode: 'lookForVisited' | 'lookForNonVisited'): MazeNode | null {
        switch (direction) {
            case Direction.North: {
                return this.tryBuildNorthernPassage(maze, visitedNodes, node, passageMode);
            }
            case Direction.East: {
                return this.tryBuildEasternPassage(maze, visitedNodes, node, passageMode);
            }
            case Direction.South: {
                return this.tryBuildSouthernPassage(maze, visitedNodes, node, passageMode);
            }
            case Direction.West: {
                return this.tryBuildWesternPassage(maze, visitedNodes, node, passageMode);
            }
        }
    }

    private tryBuildNorthernPassage(maze: Maze, visitedNodes: Set<MazeNode>, node: MazeNode, passageMode: 'lookForVisited' | 'lookForNonVisited'): MazeNode | null {
        const index = node.rowIndex - 1;
        if (index < 0) {
            return null;
        }

        const neighbouringNode = maze.grid[index][node.columnIndex];
        if ((passageMode === 'lookForNonVisited' && visitedNodes.has(neighbouringNode)) || (passageMode === 'lookForVisited' && !visitedNodes.has(neighbouringNode))) {
            return null;
        }

        maze.grid[neighbouringNode.rowIndex][neighbouringNode.columnIndex].isWallOnSouth = false;
        maze.grid[node.rowIndex][node.columnIndex].isWallOnNorth = false;
        return neighbouringNode;
    }

    private tryBuildEasternPassage(maze: Maze, visitedNodes: Set<MazeNode>, node: MazeNode, passageMode: 'lookForVisited' | 'lookForNonVisited'): MazeNode | null {
        const index = node.columnIndex + 1;
        if (index > maze.columnsCount - 1) {
            return null;
        }

        const neighbouringNode = maze.grid[node.rowIndex][index];
        if ((passageMode === 'lookForNonVisited' && visitedNodes.has(neighbouringNode)) || (passageMode === 'lookForVisited' && !visitedNodes.has(neighbouringNode))) {
            return null;
        }
        maze.grid[neighbouringNode.rowIndex][neighbouringNode.columnIndex].isWallOnWest = false;
        maze.grid[node.rowIndex][node.columnIndex].isWallOnEast = false;
        return neighbouringNode;
    }

    private tryBuildSouthernPassage(maze: Maze, visitedNodes: Set<MazeNode>, node: MazeNode, passageMode: 'lookForVisited' | 'lookForNonVisited'): MazeNode | null {
        const index = node.rowIndex + 1;
        if (index > maze.rowsCount - 1) {
            return null;
        }

        const neighbouringNode = maze.grid[index][node.columnIndex];
        if ((passageMode === 'lookForNonVisited' && visitedNodes.has(neighbouringNode)) || (passageMode === 'lookForVisited' && !visitedNodes.has(neighbouringNode))) {
            return null;
        }
        maze.grid[neighbouringNode.rowIndex][neighbouringNode.columnIndex].isWallOnNorth = false;
        maze.grid[node.rowIndex][node.columnIndex].isWallOnSouth = false;
        return neighbouringNode;
    }

    private tryBuildWesternPassage(maze: Maze, visitedNodes: Set<MazeNode>, node: MazeNode, passageMode: 'lookForVisited' | 'lookForNonVisited'): MazeNode | null {
        const index = node.columnIndex - 1;
        if (index < 0) {
            return null;
        }

        const neighbouringNode = maze.grid[node.rowIndex][index];
        if ((passageMode === 'lookForNonVisited' && visitedNodes.has(neighbouringNode)) || (passageMode === 'lookForVisited' && !visitedNodes.has(neighbouringNode))) {
            return null;
        }
        maze.grid[neighbouringNode.rowIndex][neighbouringNode.columnIndex].isWallOnEast = false;
        maze.grid[node.rowIndex][node.columnIndex].isWallOnWest = false;
        return neighbouringNode;
    }

    private hunt(maze: Maze, visitedNodes: Set<MazeNode>, nodesHistory: MazeNodesHistory): MazeNode | null {
        for (let rowIndex = 0; rowIndex < maze.rowsCount; rowIndex++) {
            for (let columnIndex = 0; columnIndex < maze.columnsCount; columnIndex++) {
                const node = maze.grid[rowIndex][columnIndex];
                if (visitedNodes.has(node)) {
                    continue;
                }

                const neighbouringNode = this.tryBuildPassage(maze, visitedNodes, node, 'lookForVisited')
                if (!neighbouringNode) {
                    continue;
                }

                visitedNodes.add(node);
                nodesHistory.add(node);
                visitedNodes.add(neighbouringNode);
                nodesHistory.add(neighbouringNode);
                return neighbouringNode;
            }
        }

        return null;
    }
}
