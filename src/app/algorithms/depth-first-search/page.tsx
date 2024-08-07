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

        const canvasWidth = divRef.current.offsetWidth
        setCanvasSize({
            width: canvasWidth,
            height: canvasWidth
        })
    }, []);

    useEffect(
        () => {
            const grid = new DepthFirstSearchAlgorithm().run(rowsCount, columnsCount);
            drawGeneratedNodesLayer(canvasSize.width, canvasSize.height, grid);
        },
        [canvasSize]
    );

    function drawGridLayer(canvasWidth: number, canvasHeight: number) {
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

    function drawGeneratedNodesLayer(canvasWidth: number, canvasHeight: number, grid: MazeNode[][]) {
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

    return (
        <div
            style={{
                padding: '50px',
                color: "black",
            }}>
            <h1>Depth First Search</h1>
            <span>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </span>
            <div className="grid grid-cols-3" style={{padding: '10px'}}>
                <div className="flex justify-center flex-col">
                    <span className="flex justify-center">Small</span>
                    <div className="flex justify-center">
                        <div ref={divRef} className="w-3/4">
                            <Stage width={canvasSize.width} height={canvasSize.height}>
                                <Layer>
                                    <Rect fill="red" x={0} y={0} width={10000} height={10000}></Rect>
                                </Layer>
                                {
                                    drawGridLayer(canvasSize.width, canvasSize.height)
                                }
                                <Layer>
                                    {nodes}
                                </Layer>
                                <Layer>
                                    {nodes}
                                </Layer>
                            </Stage>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div ref={divRef} className="w-3/4">
                        <Stage width={canvasSize.width} height={canvasSize.height}>
                            <Layer>
                                <Rect fill="red" x={0} y={0} width={10000} height={10000}></Rect>
                            </Layer>
                            {
                                drawGridLayer(canvasSize.width, canvasSize.height)
                            }
                            <Layer>
                                {nodes}
                            </Layer>
                            <Layer>
                                {nodes}
                            </Layer>
                        </Stage>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div ref={divRef} className="w-3/4">
                        <Stage width={canvasSize.width} height={canvasSize.height}>
                            <Layer>
                                <Rect fill="red" x={0} y={0} width={10000} height={10000}></Rect>
                            </Layer>
                            {
                                drawGridLayer(canvasSize.width, canvasSize.height)
                            }
                            <Layer>
                                {nodes}
                            </Layer>
                            <Layer>
                                {nodes}
                            </Layer>
                        </Stage>
                    </div>
                </div>
            </div>
        </div>
    );
}