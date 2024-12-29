import {MazeNode} from "@/app/algorithms/_common/models/maze-node";

export class MazeNodesHistory {
    private nodesHistorySet: Set<MazeNode>;

    public constructor() {
        this.nodesHistorySet = new Set();
    }

    public add(node: MazeNode): this {
        const clonedNode = structuredClone(node);
        this.nodesHistorySet.add(clonedNode);
        return this;
    }

    public toArray(): MazeNode[] {
        return Array.from(this.nodesHistorySet);
    }
}
