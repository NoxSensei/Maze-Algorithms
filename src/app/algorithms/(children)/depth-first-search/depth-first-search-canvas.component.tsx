import {Layer, Line, Rect, Stage} from "react-konva";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {DepthFirstSearchAlgorithm} from "@/app/algorithms/_services/depth-first-search-algorithm";
import {MazeNode} from "@/app/algorithms/_services/maze-node";

const gridStroke = 2;

interface CanvasSize {
    height: number;
    width: number;
}

export interface DepthFirstSearchAlgorithmCanvasComponentProps {
    dimension: number;
}

export default function DepthFirstSearchAlgorithmCanvasComponent(props: DepthFirstSearchAlgorithmCanvasComponentProps) {
    const rowsCount = props.dimension;
    const columnsCount = props.dimension;

    const [nodes, setNodes] = useState([]);
    const [canvasSize, setCanvasSize] = useState<CanvasSize>({width: 0, height: 0})
    const divRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const isDivElement = (element: HTMLDivElement | null): element is HTMLDivElement => element !== null;
        if (!isDivElement(divRef.current)) {
            return;
        }

        const canvasWidth = divRef.current.offsetWidth
        const canvasHeight = divRef.current.offsetHeight

        const canvasSideSize = canvasWidth > canvasHeight ? canvasHeight : canvasWidth;
        setCanvasSize({
            width: canvasSideSize,
            height: canvasSideSize
        })
    }, []);

    useEffect(
        () => {
            const grid = new DepthFirstSearchAlgorithm().run(rowsCount, columnsCount);
            drawGeneratedNodesLayer(canvasSize.width, canvasSize.height, grid, rowsCount, columnsCount);
        },
        [canvasSize]
    );

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

                nodes2.push(<Rect x={xOffset}
                                  y={yOffset}
                                  width={nodeWidth}
                                  height={nodeHeight}
                                  fill='green'/>)
            }
        }
        setNodes(nodes2)
    }

    return <div ref={divRef} className="h-full flex justify-center ">
        <Stage width={canvasSize.width} height={canvasSize.height}>
            {
                drawGridLayer(canvasSize.width, canvasSize.height, rowsCount, columnsCount)
            }
            <Layer>
                {nodes}
            </Layer>
        </Stage>
    </div>
}