'use client'

import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {Stage, Layer, Rect, Line} from 'react-konva';
import {DepthFirstSearchAlgorithm} from "@/app/algorithms/_services/depth-first-search-algorithm";
import {MazeNode} from "@/app/algorithms/_services/maze-node";

const rowsCount = 7;
const columnsCount = 7;

const gridStroke = 2;

interface CanvasSize {
    height: number;
    width: number;
}

export default function DepthFirstSearchAlgorithmPage() {
    const [nodes, setNodes] = useState([]);
    const [canvasSize, setCanvasSize] = useState<CanvasSize>({width: 0, height: 0})
    const divRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const isDivElement = (element: HTMLDivElement | null): element is HTMLDivElement => element !== null;
        if (!isDivElement(divRef.current)) {
            return;
        }

        setCanvasSize({
            width: divRef.current.offsetWidth,
            height: divRef.current.offsetHeight
        })
    }, []);

    useEffect(
        () => {
            const grid = new DepthFirstSearchAlgorithm().run(rowsCount, columnsCount);
            drawGeneratedNodesLayer(grid);
        },
        []
    );

    function drawGridLayer() {
        const width = 400;
        const height = 400;

        const spaceX = width / rowsCount;
        const spaceY = width / columnsCount;

        const lines = [];
        for (let i = 0; i < rowsCount + 1; i++) {
            lines.push(<Line points={[0, i * spaceY, width, i * spaceY]} stroke="black" strokeWidth={gridStroke}/>)
        }

        for (let i = 0; i < columnsCount + 1; i++) {
            lines.push(<Line points={[i * spaceX, 0, i * spaceX, height]} stroke="black" strokeWidth={gridStroke}/>)
        }

        return <Layer>{lines}</Layer>
    }

    function drawGeneratedNodesLayer(grid: MazeNode[][]) {
        const width = 400;
        const height = 400;

        const spaceX = width / rowsCount;
        const spaceY = height / columnsCount;

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

    return (
        <div ref={divRef}
             style={{
                 display: 'flex',
                 justifyContent: "center",
                 alignItems: 'center',
                 textAlign: 'center',
                 height: "calc(100% - 200px)",
                 margin: '100px'
             }}>
            <Stage width={canvasSize.width} height={canvasSize.height}>
                {
                    drawGridLayer()
                }
                <Layer>
                    {nodes}
                </Layer>
                <Layer>
                    {nodes}
                </Layer>
            </Stage>
        </div>
    );
}