import {Layer, Stage} from "react-konva";
import {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import Konva from "konva";
import {Maze} from "@/app/algorithms/_common/models/maze";
import {JsHelpers} from "@/_common/services/js-helpers";
import {MazeCreatorContext} from "@/app/algorithms/_common/contexts/maze-creator";
import {KonvaBackgroundComponent} from "@/_common/components/konva/konva-background";
import {KonvaGridComponent} from "@/_common/components/konva/konva-grid";
import {MazeNodePainter} from "@/app/algorithms/_common/services/maze-node-painter";
import {MazeAlgorithm} from "@/app/algorithms/_common/services/maze-algorithm";
import {DrawingSpeed} from "@/app/algorithms/_common/models/drawing-speed";

const GRID_STROKE = 2;

export interface MazeCreatorPainterComponentProps {
    mazeAlgorithm: MazeAlgorithm;
}

export default function MazeCreatorPainterComponent(props: MazeCreatorPainterComponentProps) {
    const mazeCreatorContext = useContext(MazeCreatorContext);

    const [canvasSize, setCanvasSize] = useState<CanvasSize>({width: 0, height: 0})
    const [maze, setMaze] = useState<Maze>();
    const [lastProcessedNodeIndex, setLastProcessedNodeIndex] = useState<number>(0);

    const isPausedRef = useRef({isPaused: true});
    const drawingSpeedRef = useRef<DrawingSpeed>(DrawingSpeed.Medium);
    const canvasWrapperRef = useRef<HTMLDivElement | null>(null);
    const canvasNodesLayoutRef = useRef<Konva.Layer | null>(null);

    const rowsCount = mazeCreatorContext.grid.size;
    const columnsCount = mazeCreatorContext.grid.size;

    useEffect(() => {
        mazeCreatorContext.forwardFastButton.onClick = () => {
            if (!maze) {
                return;
            }

            drawCompleteMaze(canvasSize, maze);
        };
    });

    useLayoutEffect(() => {
        isPausedRef.current.isPaused = !mazeCreatorContext.playButton.isSelected;
        if (isPausedRef.current.isPaused) {
            return;
        }

        if (!maze) {
            return;
        }

        drawMazeNodes(canvasSize, maze, lastProcessedNodeIndex).then(({lastNodeIndex}) => {
            setLastProcessedNodeIndex(lastNodeIndex);
        });
    }, [mazeCreatorContext.playButton.isSelected]);

    useEffect(() => {
        drawingSpeedRef.current = mazeCreatorContext.drawing.speed;
    }, [mazeCreatorContext.drawing.speed])

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
        const maze = props.mazeAlgorithm.buildPath(mazeCreatorContext.grid.size, mazeCreatorContext.grid.size);
        setMaze(maze);

        canvasNodesLayoutRef.current?.removeChildren(); // TODO grid should do it on useEffect
    }, [mazeCreatorContext.grid.size]);

    function drawCompleteMaze(canvasSize: CanvasSize, maze: Maze) {
        const shapes: Konva.Shape[] = [];
        for (let rowIndex = 0; rowIndex < maze.rowsCount; rowIndex++) {
            for (let columnIndex = 0; columnIndex < maze.columnsCount; columnIndex++) {
                const node = maze.grid[rowIndex][columnIndex];
                const s = MazeNodePainter.getMazeNodeAsKonvaShape({
                    canvasSize,
                    maze,
                    node,
                    gridStroke: GRID_STROKE,
                    color: "green"
                })
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

            const shapes = MazeNodePainter.getMazeNodeAsKonvaShape({
                canvasSize,
                maze,
                node,
                gridStroke: GRID_STROKE,
                color: 'green'
            });
            canvasNodesLayoutRef.current?.add(...shapes).draw();

            const sleepTime = getValueOfSleepBetweenDraws();
            await JsHelpers.sleep(sleepTime);
        }

        return {lastNodeIndex};
    }

    function getValueOfSleepBetweenDraws(): number {
        switch (drawingSpeedRef.current) {
            case DrawingSpeed.Slow: {
                return 500;
            }
            case DrawingSpeed.Medium: {
                return 200;
            }
            case DrawingSpeed.Fast: {
                return 50;
            }
        }
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