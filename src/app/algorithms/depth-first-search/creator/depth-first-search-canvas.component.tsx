import {Layer, Line, Rect, Stage} from "react-konva";
import {ChangeEvent, MutableRefObject, useEffect, useLayoutEffect, useRef, useState} from "react";
import {
    DepthFirstSearchAlgorithm
} from "@/app/algorithms/depth-first-search/creator/_services/depth-first-search-algorithm";
import {MazeNode} from "@/app/algorithms/_common/models/maze-node";
import Konva from "konva";
import {Maze} from "@/app/algorithms/_common/models/maze";

const GRID_STROKE = 2;

interface CanvasSize {
    height: number;
    width: number;
}

export interface DepthFirstSearchAlgorithmCanvasComponentProps {
    dimension: number;
    allStepsButtonRef: MutableRefObject<HTMLButtonElement | null>;
    startButtonRef: MutableRefObject<HTMLButtonElement | null>;
}

export function CanvasBackgroundComponent(props: CanvasSize & { color: string }) {
    return <Layer>
        <Rect x={0} y={0} width={props.width} height={props.height} fill={props.color}/>
    </Layer>
}

export function CanvasGridComponent(props: {
    canvasWidth: number;
    canvasHeight: number;
    rowsCount: number;
    columnsCount: number
}) {
    const gridColor: string | CanvasGradient = "black";
    const gridStrokeWidth = GRID_STROKE;

    function drawGridLayer(canvasWidth: number, canvasHeight: number, rowsCount: number, columnsCount: number) {
        const borderStrokeOffset = gridStrokeWidth * 0.5;
        const spaceX = (canvasWidth - gridStrokeWidth) / rowsCount;
        const spaceY = (canvasHeight - gridStrokeWidth) / columnsCount;

        const lines: Line[] = [];

        // creating columns
        for (let i = 0; i < columnsCount + 1; i++) {
            const line = <Line
                points={[0, borderStrokeOffset + i * spaceY, canvasWidth, borderStrokeOffset + i * spaceY]}
                stroke={gridColor}
                strokeWidth={gridStrokeWidth}
            />;
            lines.push(line)
        }

        // creating rows
        for (let i = 0; i < rowsCount + 1; i++) {
            const line = <Line
                points={[borderStrokeOffset + i * spaceX, 0, borderStrokeOffset + i * spaceX, canvasHeight]}
                stroke={gridColor}
                strokeWidth={gridStrokeWidth}
            />;
            lines.push(line)
        }

        return <Layer>{lines}</Layer>
    }

    return drawGridLayer(props.canvasWidth, props.canvasHeight, props.rowsCount, props.columnsCount);
}

export default function DepthFirstSearchAlgorithmCanvasComponent(props: DepthFirstSearchAlgorithmCanvasComponentProps) {
    const rowsCount = props.dimension;
    const columnsCount = props.dimension;

    const [canvasSize, setCanvasSize] = useState<CanvasSize>({width: 0, height: 0})
    const canvasWrapperRef = useRef<HTMLDivElement | null>(null);
    const canvasNodesLayoutRef = useRef<Konva.Layer | null>(null);

    useEffect(() => {
        if (!props.allStepsButtonRef?.current) {
            return;
        }

        props.allStepsButtonRef.current!.onclick = (event: MouseEvent) => {
            const maze = new DepthFirstSearchAlgorithm().buildPath(rowsCount, columnsCount);
            drawCompleteMaze(canvasSize, maze);
        };
    }, [props.allStepsButtonRef, canvasSize, rowsCount, columnsCount]);

    useEffect(() => {
        if (!props.startButtonRef?.current) {
            return;
        }

        props.startButtonRef.current!.onclick = (event: MouseEvent) => {
            const maze = new DepthFirstSearchAlgorithm().buildPath(rowsCount, columnsCount);
            drawMazeNode(canvasSize, maze);
        };
    }, [props.startButtonRef, canvasSize, rowsCount, columnsCount]);

    useLayoutEffect(() => {
        const isDivElement = (element: HTMLDivElement | null): element is HTMLDivElement => element !== null;
        if (!isDivElement(canvasWrapperRef.current)) {
            return;
        }

        const canvasWidth = canvasWrapperRef.current.offsetWidth
        const canvasHeight = canvasWrapperRef.current.offsetHeight

        const canvasSideSize = canvasWidth > canvasHeight ? canvasHeight : canvasWidth;

        setCanvasSize({
            width: canvasSideSize,
            height: canvasSideSize
        })
        canvasNodesLayoutRef.current?.removeChildren();
    }, [props.dimension]);

    function drawCompleteMaze(canvasSize: CanvasSize, maze: Maze) {
        const nodeWidth = (canvasSize.width - GRID_STROKE) / maze.rowsCount;
        const nodeHeight = (canvasSize.height - GRID_STROKE) / maze.columnsCount;

        const gridStrokeOffset = GRID_STROKE * 0.5;
        const borderOffset = GRID_STROKE * 0.5;

        const rectangles: Konva.Rect[] = [];
        for (let i = 0; i < maze.rowsCount; i++) {
            for (let j = 0; j < maze.columnsCount; j++) {
                let nodeWidthWithoutStroke = nodeWidth - GRID_STROKE;
                let nodeHeightWithoutStroke = nodeHeight - GRID_STROKE;
                let nodePositionX = borderOffset + gridStrokeOffset + nodeWidth * j;
                let nodePositionY = borderOffset + gridStrokeOffset + nodeHeight * i;

                if (!maze.grid[i][j].isWallOnNorth) {
                    nodePositionY = nodeHeight * i;
                    nodeHeightWithoutStroke += GRID_STROKE;
                }
                if (!maze.grid[i][j].isWallOnEast) {
                    nodeWidthWithoutStroke += GRID_STROKE;
                }
                if (!maze.grid[i][j].isWallOnSouth) {
                    nodeHeightWithoutStroke += GRID_STROKE;
                }
                if (!maze.grid[i][j].isWallOnWest) {
                    nodePositionX = nodeWidth * j;
                    nodeWidthWithoutStroke += GRID_STROKE;
                }

                const rectangle = new Konva.Rect({
                    x: nodePositionX,
                    y: nodePositionY,
                    width: nodeWidthWithoutStroke,
                    height: nodeHeightWithoutStroke,
                    fill: 'green'
                });
                rectangles.push(rectangle)
            }
        }

        canvasNodesLayoutRef.current?.removeChildren().add(...rectangles).draw()
    }

    function drawMazeNode(canvasSize: CanvasSize, maze: Maze) {
        const spaceX = canvasSize.width / maze.rowsCount;
        const spaceY = canvasSize.height / maze.columnsCount;

        const gridStrokeOffset = GRID_STROKE * 0.5;

        let nodeWidth = spaceX - GRID_STROKE;
        let nodeHeight = spaceY - GRID_STROKE;

        let xOffset = gridStrokeOffset + spaceX * maze.history[0].columnIndex;
        let yOffset = gridStrokeOffset + spaceY * maze.history[0].rowIndex;

        const nodeShape = new Konva.Rect({
            x: xOffset,
            y: yOffset,
            width: nodeWidth,
            height: nodeHeight,
            fill: 'green'
        })


        canvasNodesLayoutRef.current?.removeChildren().add(nodeShape).draw()
    }

    return <div ref={canvasWrapperRef} className="h-full flex justify-center">
        <Stage width={canvasSize.width} height={canvasSize.height}>
            <CanvasBackgroundComponent width={canvasSize.width} height={canvasSize.height} color="gray"/>
            <CanvasGridComponent canvasWidth={canvasSize.width} canvasHeight={canvasSize.height} rowsCount={rowsCount}
                                 columnsCount={columnsCount}/>
            <Layer ref={canvasNodesLayoutRef}/>
        </Stage>
    </div>
}