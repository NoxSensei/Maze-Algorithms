export class VisitedNodesTracker {
    private visited: Set<string>;

    constructor() {
        this.visited = new Set();
    }

    public markAsVisited(rowIndex: number, columnIndex: number): void {
        const key = this.generateKey(rowIndex, columnIndex);
        this.visited.add(key);
    }

    public isVisited(rowIndex: number, columnIndex: number): boolean {
        const key = this.generateKey(rowIndex, columnIndex);
        return this.visited.has(key);
    }

    private generateKey(rowIndex: number, columnIndex: number): string {
        return `${rowIndex}_${columnIndex}`;
    }
}