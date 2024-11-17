import {Maze} from "@/app/algorithms/_common/models/maze";
import {MazeNode} from "@/app/algorithms/_common/models/maze-node";
import Konva from "konva";

export interface DrawMazeNodeParams {
    canvasSize: CanvasSize,
    maze: Maze,
    node: MazeNode
    gridStroke: number;
    color: string | CanvasGradient;
}

export class MazeNodePainter {
    public static getMazeNodeAsKonvaShape(params: DrawMazeNodeParams): Konva.Shape[] {
        const nodeWidth = (params.canvasSize.width - params.gridStroke) / params.maze.rowsCount;
        const nodeHeight = (params.canvasSize.height - params.gridStroke) / params.maze.columnsCount;

        const gridStrokeOffset = params.gridStroke * 0.5;
        const borderOffset = params.gridStroke * 0.5;

        let nodeWidthWithoutStroke = nodeWidth - params.gridStroke;
        let nodeHeightWithoutStroke = nodeHeight - params.gridStroke;

        let nodePositionX = borderOffset + gridStrokeOffset + nodeWidth * params.node.columnIndex;
        let nodePositionY = borderOffset + gridStrokeOffset + nodeHeight * params.node.rowIndex;

        const shapes: Konva.Shape[] = [];
        const nodeShape = new Konva.Rect({
            x: nodePositionX,
            y: nodePositionY,
            width: nodeWidthWithoutStroke,
            height: nodeHeightWithoutStroke,
            fill: params.color
        })
        shapes.push(nodeShape);

        // Extend stroke by 2px to hack antialiasing for removed walls
        const antialiasingOffset = 2;

        if (!params.node.isWallOnNorth) {
            const line = new Konva.Line({
                points: [nodePositionX, nodePositionY - gridStrokeOffset, nodePositionX + nodeWidthWithoutStroke, nodePositionY - gridStrokeOffset],
                strokeWidth: params.gridStroke + antialiasingOffset,
                stroke: params.color
            });
            shapes.push(line);
        }
        if (!params.node.isWallOnEast) {
            const line = new Konva.Line({
                points: [nodePositionX + nodeWidthWithoutStroke + gridStrokeOffset, nodePositionY, nodePositionX + nodeWidthWithoutStroke + gridStrokeOffset, nodePositionY + nodeHeightWithoutStroke],
                strokeWidth: params.gridStroke + antialiasingOffset,
                stroke: params.color
            });
            shapes.push(line);
        }
        if (!params.node.isWallOnSouth) {
            const line = new Konva.Line({
                points: [nodePositionX, nodePositionY + nodeHeightWithoutStroke + gridStrokeOffset, nodePositionX + nodeWidthWithoutStroke, nodePositionY + nodeHeightWithoutStroke + gridStrokeOffset],
                strokeWidth: params.gridStroke + antialiasingOffset,
                stroke: params.color
            });
            shapes.push(line);
        }
        if (!params.node.isWallOnWest) {
            const line = new Konva.Line({
                points: [nodePositionX - gridStrokeOffset, nodePositionY, nodePositionX - gridStrokeOffset, nodePositionY + nodeHeightWithoutStroke],
                strokeWidth: params.gridStroke + antialiasingOffset,
                stroke: params.color
            });
            shapes.push(line);
        }

        return shapes;
    }
}