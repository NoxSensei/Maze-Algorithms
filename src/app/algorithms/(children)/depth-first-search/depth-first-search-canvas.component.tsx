import {Layer, Line, Rect, Stage} from "react-konva";
import {ChangeEvent, MutableRefObject, useEffect, useLayoutEffect, useRef, useState} from "react";
import {DepthFirstSearchAlgorithm} from "@/app/algorithms/_services/depth-first-search-algorithm";
import {MazeNode} from "@/app/algorithms/_services/maze-node";
import Konva from "konva";

const gridStroke = 2;

interface CanvasSize {
    height: number;
    width: number;
}

export interface DepthFirstSearchAlgorithmCanvasComponentProps {
    dimension: number;
    allStepsButtonRef: MutableRefObject<HTMLButtonElement | null>;
}

export function CanvasBackGroundComponent(props: CanvasSize & { color: string }) {
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
    function drawGridLayer(canvasWidth: number, canvasHeight: number, rowsCount: number, columnsCount: number) {
        const spaceX = canvasWidth / rowsCount;
        const spaceY = canvasHeight / columnsCount;

        const lines = [];
        for (let i = 0; i < rowsCount + 1; i++) {
            lines.push(<Line points={[0, i * spaceY, canvasWidth, i * spaceY]} stroke="black"
                             strokeWidth={gridStroke}/>)
        }

        for (let i = 0; i < columnsCount + 1; i++) {
            lines.push(<Line points={[i * spaceX, 0, i * spaceX, canvasHeight]} stroke="black"
                             strokeWidth={gridStroke}/>)
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
        if (!props.allStepsButtonRef.current) {
            return;
        }

        props.allStepsButtonRef.current!.onclick = (event: MouseEvent) => {
            const grid = new DepthFirstSearchAlgorithm().run(rowsCount, columnsCount);
            drawGeneratedNodesLayer(canvasSize.width, canvasSize.height, grid, rowsCount, columnsCount);
        };
    }, [props.allStepsButtonRef, canvasSize]);

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

    function drawGeneratedNodesLayer(canvasWidth: number, canvasHeight: number, grid: MazeNode[][], rowsCount: number, columnsCount: number) {
        const spaceX = canvasWidth / rowsCount;
        const spaceY = canvasHeight / columnsCount;

        const gridStrokeOffset = gridStroke * 0.5;

        const nodes2 = [];
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                let nodeWidth = spaceX - gridStroke;
                let nodeHeight = spaceY - gridStroke;
                let xOffset = gridStrokeOffset + spaceX * j;
                let yOffset = gridStrokeOffset + spaceY * i;

                if (!grid[i][j].isWallOnNorth) {
                    yOffset = spaceY * i;
                    nodeHeight += gridStrokeOffset;
                }
                if (!grid[i][j].isWallOnEast) {
                    nodeWidth += gridStrokeOffset;
                }
                if (!grid[i][j].isWallOnSouth) {
                    nodeHeight += gridStrokeOffset;
                }
                if (!grid[i][j].isWallOnWest) {
                    xOffset = spaceX * j;
                    nodeWidth += gridStrokeOffset;
                }

                nodes2.push(new Konva.Rect({
                    x: xOffset,
                    y: yOffset,
                    width: nodeWidth,
                    height: nodeHeight,
                    fill: 'green'
                }))
            }
        }

        canvasNodesLayoutRef.current?.removeChildren().add(...nodes2).draw()
    }

    return <div ref={canvasWrapperRef} className="h-full flex justify-center ">
        <Stage width={canvasSize.width} height={canvasSize.height}>
            <CanvasBackGroundComponent width={canvasSize.width} height={canvasSize.height} color="gray"/>
            <CanvasGridComponent canvasWidth={canvasSize.width} canvasHeight={canvasSize.height} rowsCount={rowsCount}
                                 columnsCount={columnsCount}/>
            <Layer ref={canvasNodesLayoutRef}/>
        </Stage>
    </div>
}