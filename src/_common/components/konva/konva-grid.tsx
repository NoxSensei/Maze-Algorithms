import {Layer, Line} from "react-konva";

export interface KonvaGridComponentProps extends CanvasSize {
    rowsCount: number;
    columnsCount: number;

    /**
     * The min supported value is 1
     * When setting this value be aware of antialiasing
     */
    gridStrokeSize: number;
}

export function KonvaGridComponent(props: KonvaGridComponentProps) {
    const gridColor: string | CanvasGradient = "black";

    function drawGridLayer(canvasWidth: number, canvasHeight: number, rowsCount: number, columnsCount: number) {
        const borderStrokeOffset = props.gridStrokeSize * 0.5;
        const spaceX = (canvasWidth - props.gridStrokeSize) / rowsCount;
        const spaceY = (canvasHeight - props.gridStrokeSize) / columnsCount;

        const lines: Line[] = [];

        // creating columns
        for (let columnIndex = 0; columnIndex < columnsCount + 1; columnIndex++) {
            const line = <Line
                points={[0, borderStrokeOffset + columnIndex * spaceY, canvasWidth, borderStrokeOffset + columnIndex * spaceY]}
                stroke={gridColor}
                strokeWidth={props.gridStrokeSize}
                key={`column${columnIndex}`}
            />;
            lines.push(line)
        }

        // creating rows
        for (let rowIndex = 0; rowIndex < rowsCount + 1; rowIndex++) {
            const line = <Line
                points={[borderStrokeOffset + rowIndex * spaceX, 0, borderStrokeOffset + rowIndex * spaceX, canvasHeight]}
                stroke={gridColor}
                strokeWidth={props.gridStrokeSize}
                key={`row${rowIndex}`}
            />;
            lines.push(line)
        }

        return <Layer>{lines}</Layer>
    }

    return drawGridLayer(props.width, props.height, props.rowsCount, props.columnsCount);
}