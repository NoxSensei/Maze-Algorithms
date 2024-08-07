import {MazeNode} from "./maze-node";

export class MazeConsolePrinter {
    /**
     * Prints maze in the console using characters.
     * Useful for debugging maze generation.
     */
    static display(grid: MazeNode[][]): void {
        let gridString = "";
        for (let i = 0; i < grid.length; i++) {
            // top wall
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j].isWallOnNorth) {
                    gridString += 'www';
                } else {
                    gridString += 'wcw';
                }
            }
            gridString += '\n';

            // left and right walls
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j].isWallOnWest) {
                    gridString += 'w'
                } else {
                    gridString += 'c'
                }

                gridString += 'r';

                if (grid[i][j].isWallOnEast) {
                    gridString += 'w'
                } else {
                    gridString += 'c'
                }

            }

            gridString += '\n';

            // bottom wall
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j].isWallOnSouth) {
                    gridString += 'www';
                } else {
                    gridString += 'wcw';
                }
            }
            gridString += '\n';
        }

        console.log(gridString)
    }
}