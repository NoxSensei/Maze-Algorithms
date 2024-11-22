export class MazeNode {
    isWallOnNorth = true;
    isWallOnEast = true;
    isWallOnSouth = true;
    isWallOnWest = true;

    constructor(public readonly rowIndex: number, public readonly columnIndex: number) {
    }
}