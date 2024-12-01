import {Layer, Stage} from "react-konva";
import {useContext, useEffect, useRef, useState} from "react";
import Konva from "konva";
import {Maze} from "@/app/algorithms/_common/models/maze";
import {JsHelpers} from "@/_common/services/js-helpers";
import {MazeCreatorContext} from "@/app/algorithms/_common/contexts/maze-creator";
import {KonvaBackgroundComponent} from "@/_common/components/konva/konva-background";
import {KonvaGridComponent} from "@/_common/components/konva/konva-grid";
import {MazeNodeKonvaBuilder} from "@/app/algorithms/_common/services/maze-node-konva-builder";
import {MazeAlgorithm} from "@/app/algorithms/_common/services/maze-algorithm";
import {DrawingSpeed} from "@/app/algorithms/_common/models/drawing-speed";
import {useCanvasSize} from "@/app/algorithms/_common/hooks/canvas-size";
import {useRefDrawingSpeed} from "@/app/algorithms/_common/hooks/drawing-speed";

export interface MazeCreatorPainterComponentProps {
    mazeAlgorithm: MazeAlgorithm;
}

export default function MazeCreatorPainterComponent(props: MazeCreatorPainterComponentProps) {
    const nodeColor = 'green';
    const gridStroke = 2;

    const mazeCreatorContext = useContext(MazeCreatorContext);
    const [maze, setMaze] = useState<Maze>();

    const isStoppedRef = useRef(true);
    const canvasWrapperRef = useRef<HTMLDivElement | null>(null);
    const canvasNodesLayoutRef = useRef<Konva.Layer | null>(null);
    const drawingSpeedRef = useRefDrawingSpeed();

    const canvasSize = useCanvasSize(canvasWrapperRef);

    const rowsCount = mazeCreatorContext.grid.size;
    const columnsCount = mazeCreatorContext.grid.size;

    useEffect(() => {
        mazeCreatorContext.reloadButton.onClick = () => {
            removeNodesFromCanvas();
            const newMaze= regenerateMaze();
            drawCompleteMaze(canvasSize, newMaze);
            setMaze(newMaze);
        }

        mazeCreatorContext.playButton.onClick = () => {
            isStoppedRef.current = !isStoppedRef.current;
            if (isStoppedRef.current) {
                return;
            }

            if (!maze) {
                return;
            }

            removeNodesFromCanvas();
            drawMazeNodes(canvasSize, maze).then(() => {
                mazeCreatorContext.playButton.setIsSelected(false);
                isStoppedRef.current = true;
            });
        }

        mazeCreatorContext.forwardFastButton.onClick = () => {
            if (!maze) {
                return;
            }

            drawCompleteMaze(canvasSize, maze);
        };
    }, [maze, canvasSize, mazeCreatorContext]);

    useEffect(() => {
        mazeCreatorContext.playButton.setIsSelected(false);
        isStoppedRef.current = true;

        removeNodesFromCanvas();
        const newMaze = regenerateMaze();
        setMaze(newMaze);
    }, [mazeCreatorContext.grid.size]);

    function drawCompleteMaze(canvasSize: CanvasSize, maze: Maze): void {
        const shapes: Konva.Shape[] = [];
        for (let rowIndex = 0; rowIndex < maze.rowsCount; rowIndex++) {
            for (let columnIndex = 0; columnIndex < maze.columnsCount; columnIndex++) {
                const node = maze.grid[rowIndex][columnIndex];
                const nodeShapes = MazeNodeKonvaBuilder.getNodesAsKonvaShapes({
                    canvasSize,
                    maze,
                    node,
                    gridStroke: gridStroke,
                    color: nodeColor
                })
                shapes.push(...nodeShapes);
            }
        }

        canvasNodesLayoutRef.current?.removeChildren().add(...shapes).draw()
    }

    async function drawMazeNodes(canvasSize: CanvasSize, maze: Maze): Promise<void> {
        for (const node of maze.history) {
            if (isStoppedRef.current) {
                break;
            }

            const shapes = MazeNodeKonvaBuilder.getNodesAsKonvaShapes({
                canvasSize,
                maze,
                node,
                gridStroke: gridStroke,
                color: nodeColor
            });
            canvasNodesLayoutRef.current?.add(...shapes).draw();

            const sleepTime = getValueOfSleepBetweenDraws();
            await JsHelpers.sleep(sleepTime);
        }
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

    function regenerateMaze(): Maze {
        return props.mazeAlgorithm.buildPath(mazeCreatorContext.grid.size, mazeCreatorContext.grid.size);
    }

    function removeNodesFromCanvas(): void {
        canvasNodesLayoutRef.current?.removeChildren();
    }

    return <div ref={canvasWrapperRef} className="h-full flex justify-center">
        <Stage width={canvasSize.width} height={canvasSize.height}>
            <KonvaBackgroundComponent width={canvasSize.width} height={canvasSize.height} color="gray"/>
            <KonvaGridComponent
                width={canvasSize.width}
                height={canvasSize.height}
                rowsCount={rowsCount}
                columnsCount={columnsCount}
                gridStrokeSize={gridStroke}
            />
            <Layer ref={canvasNodesLayoutRef}/>
        </Stage>
    </div>
}