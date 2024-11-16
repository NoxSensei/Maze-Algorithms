import {Layer, Line, Rect, Stage} from "react-konva";
import {ChangeEvent, MutableRefObject, useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import {
    DepthFirstSearchAlgorithm
} from "@/app/algorithms/depth-first-search/creator/_services/depth-first-search-algorithm";
import Konva from "konva";
import {Maze} from "@/app/algorithms/_common/models/maze";
import {MazeNode} from "@/app/algorithms/_common/models/maze-node";
import {JsHelpers} from "@/_common/services/js-helpers";
import {DepthFirstSearchContext} from "@/app/algorithms/depth-first-search/creator/context";

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
    const [maze, setMaze] = useState<Maze>();
    const [isPaused, setIsPaused] = useState<boolean>(true);
    const isPausedRef = useRef(isPaused);
    const [lastProcessedNodeIndex2, setLastProcessedNodeIndex2] = useState<number | null>(null);
    const canvasWrapperRef = useRef<HTMLDivElement | null>(null);
    const canvasNodesLayoutRef = useRef<Konva.Layer | null>(null);
    const depthFirstSearchContext = useContext(DepthFirstSearchContext);

    const depthFirstSearchAlgorithm = new DepthFirstSearchAlgorithm();

    useEffect(() => {
        if (!props.allStepsButtonRef?.current) {
            return;
        }

        props.allStepsButtonRef.current!.onclick = (event: MouseEvent) => {
            if (!maze) {
                return;
            }

            drawCompleteMaze(canvasSize, maze);
        };
    }, [props.allStepsButtonRef, canvasSize, maze]);

    useLayoutEffect(() => {
        isPausedRef.current = isPaused;
        if (isPaused) {
            return;
        }

        const maze = depthFirstSearchAlgorithm.buildPath(rowsCount, columnsCount);
        canvasNodesLayoutRef.current?.removeChildren();

        const state = { lastProcessedNodeIndex: lastProcessedNodeIndex2};
        const {lastProcessedNodeIndex} = drawMazeNodes(canvasSize, maze, state);
        setLastProcessedNodeIndex2(lastProcessedNodeIndex);
    }, [isPaused]);

    useEffect(() => {
        setIsPaused(!depthFirstSearchContext.isPlayClicked)
    }, [depthFirstSearchContext.isPlayClicked])

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
    }, []);

    useEffect(() => {
        const depthFirstSearchAlgorithm = new DepthFirstSearchAlgorithm();
        const maze = depthFirstSearchAlgorithm.buildPath(props.dimension, props.dimension);
        setMaze(maze);

        canvasNodesLayoutRef.current?.removeChildren();
    }, [props.dimension]);

    function drawCompleteMaze(canvasSize: CanvasSize, maze: Maze) {
        const shapes: Konva.Shape[] = [];
        for (let rowIndex = 0; rowIndex < maze.rowsCount; rowIndex++) {
            for (let columnIndex = 0; columnIndex < maze.columnsCount; columnIndex++) {
                const node = maze.grid[rowIndex][columnIndex];
                const s = drawMazeNode(canvasSize, maze, node)
                shapes.push(...s);
            }
        }

        canvasNodesLayoutRef.current?.removeChildren().add(...shapes).draw()
    }

    async function drawMazeNodes(canvasSize: CanvasSize, maze: Maze, state: { lastProcessedNodeIndex: number | null; }) {
        let lastProcessedNodeIndex = 0;
        const nodesToProcess = maze.history.slice(state.lastProcessedNodeIndex ?? 0);
        for (const [index, node] of nodesToProcess.entries()) {
            console.log("Is paused in drawing " + isPausedRef.current)
            if (isPausedRef.current) {
                lastProcessedNodeIndex = index;
                break;
            }

            const shapes = drawMazeNode(canvasSize, maze, node);
            canvasNodesLayoutRef.current?.add(...shapes).draw();
            await JsHelpers.sleep(200);
        }

        return {lastProcessedNodeIndex};
    }

    function drawMazeNode(canvasSize: CanvasSize, maze: Maze, node: MazeNode): Konva.Shape[] {
        const nodeWidth = (canvasSize.width - GRID_STROKE) / maze.rowsCount;
        const nodeHeight = (canvasSize.height - GRID_STROKE) / maze.columnsCount;

        const gridStrokeOffset = GRID_STROKE * 0.5;
        const borderOffset = GRID_STROKE * 0.5;

        let nodeWidthWithoutStroke = nodeWidth - GRID_STROKE;
        let nodeHeightWithoutStroke = nodeHeight - GRID_STROKE;

        let nodePositionX = borderOffset + gridStrokeOffset + nodeWidth * node.columnIndex;
        let nodePositionY = borderOffset + gridStrokeOffset + nodeHeight * node.rowIndex;

        const shapes: Konva.Shape[] = [];
        const nodeShape = new Konva.Rect({
            x: nodePositionX,
            y: nodePositionY,
            width: nodeWidthWithoutStroke,
            height: nodeHeightWithoutStroke,
            fill: 'green'
        })
        shapes.push(nodeShape);

        // Extend stroke by 2px to hack antialiasing for removed walls
        const antialiasingOffset = 2;

        if (!node.isWallOnNorth) {
            const line = new Konva.Line({
                points: [nodePositionX, nodePositionY - gridStrokeOffset, nodePositionX + nodeWidthWithoutStroke, nodePositionY - gridStrokeOffset],
                strokeWidth: GRID_STROKE + antialiasingOffset,
                stroke: 'green'
            });
            shapes.push(line);
        }
        if (!node.isWallOnEast) {
            const line = new Konva.Line({
                points: [nodePositionX + nodeWidthWithoutStroke + gridStrokeOffset, nodePositionY, nodePositionX + nodeWidthWithoutStroke + gridStrokeOffset, nodePositionY + nodeHeightWithoutStroke],
                strokeWidth: GRID_STROKE + antialiasingOffset,
                stroke: 'green'
            });
            shapes.push(line);
        }
        if (!node.isWallOnSouth) {
            const line = new Konva.Line({
                points: [nodePositionX, nodePositionY + nodeHeightWithoutStroke + gridStrokeOffset, nodePositionX + nodeWidthWithoutStroke, nodePositionY + nodeHeightWithoutStroke + gridStrokeOffset],
                strokeWidth: GRID_STROKE + antialiasingOffset,
                stroke: 'green'
            });
            shapes.push(line);
        }
        if (!node.isWallOnWest) {
            const line = new Konva.Line({
                points: [nodePositionX - gridStrokeOffset, nodePositionY, nodePositionX - gridStrokeOffset, nodePositionY + nodeHeightWithoutStroke],
                strokeWidth: GRID_STROKE + antialiasingOffset,
                stroke: 'green'
            });
            shapes.push(line);
        }

        return shapes;
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