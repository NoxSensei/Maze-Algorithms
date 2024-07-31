import {MazeNode} from './maze-node'
import {JsHelpers} from "./js-helpers";
import {MazeAlgorithm} from "./maze-algorithm";

export class DepthFirstSearchAlgorithm extends MazeAlgorithm {

    public override generateMaze(grid: MazeNode[][]) {
        const rowsCount = grid.length;
        const columnsCount = grid[0].length;

        const visited = new Set();
        const i = JsHelpers.randomInt(0, rowsCount - 1);
        const j = JsHelpers.randomInt(0, columnsCount - 1);

        this.backtracer(rowsCount, columnsCount, grid, i, j, visited)

        return grid;
    }

    private backtracer(rowsCount: number, columnsCount: number, grid: MazeNode[][], i: number, j: number, visited: Set<string>) {
        visited.add(`${i}_${j}`);
        JsHelpers.shuffleArray(this.directions).forEach(direction => {
            if (direction === 'N') {
                const index = i - 1;
                if (index < 0) {
                    return;
                }
                if (visited.has(`${index}_${j}`)) {
                    return;
                }

                grid[index][j].isWallOnSouth = false;
                grid[i][j].isWallOnNorth = false;
                this.backtracer(rowsCount, columnsCount, grid, index, j, visited)
            } else if (direction === 'E') {
                const index = j + 1;
                if (index > columnsCount - 1) {
                    return;
                }
                if (visited.has(`${i}_${index}`)) {
                    return;
                }
                grid[i][index].isWallOnWest = false;
                grid[i][j].isWallOnEast = false;
                this.backtracer(rowsCount, columnsCount, grid, i, index, visited)
            } else if (direction === 'S') {
                const index = i + 1;
                if (index > rowsCount - 1) {
                    return;
                }
                if (visited.has(`${index}_${j}`)) {
                    return;
                }
                grid[index][j].isWallOnNorth = false;
                grid[i][j].isWallOnSouth = false;
                this.backtracer(rowsCount, columnsCount, grid, index, j, visited)
            } else if (direction === 'W') {
                const index = j - 1;
                if (index < 0) {
                    return;
                }
                if (visited.has(`${i}_${index}`)) {
                    return;
                }
                grid[i][index].isWallOnEast = false;
                grid[i][j].isWallOnWest = false;
                this.backtracer(rowsCount, columnsCount, grid, i, index, visited)
            }
        })
    }
}