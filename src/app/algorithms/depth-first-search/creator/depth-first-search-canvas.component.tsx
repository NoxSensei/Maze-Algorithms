import {Layer, Stage} from "react-konva";
import {MutableRefObject, useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import {
    DepthFirstSearchAlgorithm
} from "@/app/algorithms/depth-first-search/creator/_services/depth-first-search-algorithm";
import Konva from "konva";
import {Maze} from "@/app/algorithms/_common/models/maze";
import {MazeNode} from "@/app/algorithms/_common/models/maze-node";
import {JsHelpers} from "@/_common/services/js-helpers";
import {DepthFirstSearchContext} from "@/app/algorithms/depth-first-search/creator/context";
import {KonvaBackgroundComponent} from "@/_common/components/konva/konva-background";
import {KonvaGridComponent} from "@/_common/components/konva/konva-grid";

const GRID_STROKE = 2;

export interface DepthFirstSearchAlgorithmCanvasComponentProps {
    dimension: number;
    allStepsButtonRef: MutableRefObject<HTMLButtonElement | null>;
    startButtonRef: MutableRefObject<HTMLButtonElement | null>;
}

export default function DepthFirstSearchAlgorithmCanvasComponent(props: DepthFirstSearchAlgorithmCanvasComponentProps) {
    const rowsCount = props.dimension;
    const columnsCount = props.dimension;

    const [canvasSize, setCanvasSize] = useState<CanvasSize>({width: 0, height: 0})
    const [maze, setMaze] = useState<Maze>();
    const [lastProcessedNodeIndex, setLastProcessedNodeIndex] = useState<number>(0);
    const isPausedRef = useRef({isPaused: true});
    const canvasWrapperRef = useRef<HTMLDivElement | null>(null);
    const canvasNodesLayoutRef = useRef<Konva.Layer | null>(null);
    const depthFirstSearchContext = useContext(DepthFirstSearchContext);

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
        isPausedRef.current.isPaused = !depthFirstSearchContext.isPlayClicked;
        if (isPausedRef.current.isPaused) {
            return;
        }

        if (!maze) {
            return;
        }

        drawMazeNodes(canvasSize, maze, lastProcessedNodeIndex).then(({lastNodeIndex}) => {
            setLastProcessedNodeIndex(lastNodeIndex);
        });
    }, [depthFirstSearchContext.isPlayClicked]);

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

    async function drawMazeNodes(canvasSize: CanvasSize, maze: Maze, lastProcessedNodeIndex: number) {
        let lastNodeIndex = 0;
        const nodesToProcess = maze.history.slice(lastProcessedNodeIndex ?? 0);
        for (const [index, node] of nodesToProcess.entries()) {
            if (isPausedRef.current.isPaused) {
                lastNodeIndex = lastProcessedNodeIndex + index;
                break;
            }

            const shapes = drawMazeNode(canvasSize, maze, node);
            canvasNodesLayoutRef.current?.add(...shapes).draw();
            await JsHelpers.sleep(200);
        }

        return {lastNodeIndex};
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
            <KonvaBackgroundComponent width={canvasSize.width} height={canvasSize.height} color="gray"/>
            <KonvaGridComponent width={canvasSize.width} height={canvasSize.height} rowsCount={rowsCount}
                                columnsCount={columnsCount} gridStrokeSize={GRID_STROKE}/>
            <Layer ref={canvasNodesLayoutRef}/>
        </Stage>
    </div>
}