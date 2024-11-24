import {MazeAlgorithm} from "@/app/algorithms/_common/services/maze-algorithm";
import {Maze} from "@/app/algorithms/_common/models/maze";
import {MazeNode} from "@/app/algorithms/_common/models/maze-node";
import {JsHelpers} from "@/_common/services/js-helpers";
import {v4} from "uuid";

class ExtendedMazeNode extends MazeNode {
    groupId?: string;
}

interface NodesGroup {
    nodes: ExtendedMazeNode[]
}

export class EllerAlgorithm extends MazeAlgorithm {
    protected removeWalls(maze: Maze, visitedNodes: Set<MazeNode>): void {
        const extendedMazeGrid = maze.grid as ExtendedMazeNode[][]
        const nodesGroups = new Map<string, NodesGroup>();

        for (const [rowIndex, row] of extendedMazeGrid.entries()) {
            const currentRowNodesGroups = new Map<string, NodesGroup>();
            const isLastRow = rowIndex === row.length - 1;

            this.assignGroupIdForEachNodeInRow(row, nodesGroups);

            for (const [columnIndex, node] of row.entries()) {
                visitedNodes.add(node);

                this.buildEasternPassages(nodesGroups, node, columnIndex, row, isLastRow);
                this.addNodeToTheCurrentRowNodesGroup(currentRowNodesGroups, node);
            }

            // Do not destroy bottom walls if it is the last row
            if (isLastRow) {
                continue;
            }

            this.buildSouthernPassages(currentRowNodesGroups, extendedMazeGrid, visitedNodes, nodesGroups);
        }
    }

    private buildEasternPassages(nodesGroups: Map<string, NodesGroup>, node: ExtendedMazeNode, columnIndex: number, row: ExtendedMazeNode[], isLastRow: boolean): void {
        const isLastColumn = columnIndex === row.length - 1;
        if (isLastColumn) {
            return;
        }

        const nodeOnTheEast = row[columnIndex + 1];
        if (nodeOnTheEast.groupId === node.groupId) {
            return;
        }

        // In the last row we need to destroy all walls for distinct groups
        if (!isLastRow) {
            const shouldDestroyWallOnEast = JsHelpers.isRandomChanceMet(0.5);
            if (!shouldDestroyWallOnEast) {
                return;
            }
        }

        node.isWallOnEast = false;
        nodeOnTheEast.isWallOnWest = false;

        this.assignNodesToTheSameGroup(nodesGroups, nodeOnTheEast, node)
    }

    private addNodeToTheCurrentRowNodesGroup(currentRowNodesGroups: Map<string, NodesGroup>, node: ExtendedMazeNode): void {
        if (!node.groupId) {
            throw new Error('Node is missing the group id')
        }

        if (!currentRowNodesGroups.has(node.groupId)) {
            currentRowNodesGroups.set(node.groupId, {
                nodes: [node]
            });
            return;
        }

        currentRowNodesGroups.get(node.groupId)!.nodes.push(node);
    }

    private buildSouthernPassages(currentRowNodesGroups: Map<string, NodesGroup>, extendedMazeGrid: ExtendedMazeNode[][], visitedNodes: Set<MazeNode>, nodesGroups: Map<string, NodesGroup>): void {
        for (const [groupId, nodesGroup] of currentRowNodesGroups) {
            // Draw how many passages needs to be created in the southern direction.
            // There must be at least one passage
            const passagesCount = JsHelpers.randomInt(1, nodesGroup.nodes.length);

            // Create passages for the random nodes in the single group
            const nodes = JsHelpers.shuffleArray(nodesGroup.nodes).slice(0, passagesCount);
            nodes.forEach(((node) => {
                const nodeOnTheSouth = extendedMazeGrid[node.rowIndex + 1][node.columnIndex];
                visitedNodes.add(nodeOnTheSouth);

                node.isWallOnSouth = false;
                nodeOnTheSouth.isWallOnNorth = false;

                this.assignNodesToTheSameGroup(nodesGroups, nodeOnTheSouth, node);
            }))
        }
    }

    private assignGroupIdForEachNodeInRow(row: ExtendedMazeNode[], groups: Map<string, NodesGroup>): void {
        for (const node of row) {
            if (node.groupId) {
                continue;
            }

            node.groupId = v4();
            groups.set(node.groupId, {nodes: [node]});
        }
    }

    /**
     * Assigns all nodes from the first node's group to the second node's group
     */
    private assignNodesToTheSameGroup(groups: Map<string, NodesGroup>, node1: ExtendedMazeNode, node2: ExtendedMazeNode): void {
        if (!node2.groupId) {
            throw new Error('Second node is missing the group id')
        }

        const secondGroup = groups.get(node2.groupId);
        if (!secondGroup) {
            throw new Error('Second node is not a part of any group')
        }

        // When using values from the next row, they won't have any group id assigned yet
        if (node1.groupId) {
            const firstGroup = groups.get(node1.groupId);
            if (firstGroup) {
                groups.delete(node1.groupId);
                firstGroup.nodes.forEach(node => node.groupId = node2.groupId);
                secondGroup.nodes.push(...firstGroup.nodes);
            }
        } else {
            node1.groupId = node2.groupId;
            secondGroup.nodes.push(node1);
        }
    }
}
