'use client'

import {useEffect, useState} from "react";
import {Stage, Layer, Rect, Line} from 'react-konva';

const rowsCount = 7;
const columnsCount = 7;

const gridStroke = 2;

class Node {
    isWallOnTop = true;
    isWallOnRight = true;
    isWallOnBot = true;
    isWallOnLeft = true;
}


const directions = ['N', 'E', 'S', 'W']


function randomInt(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

function shuffleArray(array) {
    const a = Array.from(array);
    return a
        .map(value => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value)
}

function generateMaze() {
    const grid = Array.from(new Array(rowsCount), () => new Array(columnsCount).fill(undefined).map(() => new Node()))

    const visited = new Set();
    const i = randomInt(0, rowsCount - 1);
    const j = randomInt(0, columnsCount - 1);

    backtracer(grid, i, j, visited)

    return grid;
}

function backtracer(grid, i, j, visited) {
    visited.add(`${i}_${j}`);
    shuffleArray(directions).forEach(direction => {
        if (direction === 'N') {
            const index = i - 1;
            if (index < 0) {
                return;
            }
            if (visited.has(`${index}_${j}`)) {
                return;
            }

            grid[index][j].isWallOnBot = false;
            grid[i][j].isWallOnTop = false;
            backtracer(grid, index, j, visited)
        } else if (direction === 'E') {
            const index = j + 1;
            if (index > columnsCount - 1) {
                return;
            }
            if (visited.has(`${i}_${index}`)) {
                return;
            }
            grid[i][index].isWallOnLeft = false;
            grid[i][j].isWallOnRight = false;
            backtracer(grid, i, index, visited)
        } else if (direction === 'S') {
            const index = i + 1;
            if (index > rowsCount - 1) {
                return;
            }
            if (visited.has(`${index}_${j}`)) {
                return;
            }
            grid[index][j].isWallOnTop = false;
            grid[i][j].isWallOnBot = false;
            backtracer(grid, index, j, visited)
        } else if (direction === 'W') {
            const index = j - 1;
            if (index < 0) {
                return;
            }
            if (visited.has(`${i}_${index}`)) {
                return;
            }
            grid[i][index].isWallOnRight = false;
            grid[i][j].isWallOnLeft = false;
            backtracer(grid, i, index, visited)
        }
    })
}

function printGrid(grid) {
    let gridString = "";
    for (let i = 0; i < grid.length; i++) {
        // top
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j].isWallOnTop) {
                gridString += 'www';
            } else {
                gridString += 'wcw';
            }
        }
        gridString += '\n';

        // left and right
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j].isWallOnLeft) {
                gridString += 'w'
            } else {
                gridString += 'c'
            }

            gridString += 'r';

            if (grid[i][j].isWallOnRight) {
                gridString += 'w'
            } else {
                gridString += 'c'
            }

        }

        gridString += '\n';

        // bottom wall
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j].isWallOnBot) {
                gridString += 'www';
            } else {
                gridString += 'wcw';
            }
        }
        gridString += '\n';
    }

    console.log(gridString)
}


export default function DfeAlgorithmPage() {
    const [nodes, setNodes] = useState([]);

    useEffect(
        () => {
            const grid = generateMaze();
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

    // function drawNodesLayer() {
    //     const width = 400;
    //     const height = 400;
    //
    //     const spaceX = width / rowsCount;
    //     const spaceY = height / columnsCount;
    //
    //     const gridStrokeOffset = gridStroke * 0.5;
    //
    //     const nodes2 = [];
    //     for (let i = 0; i < grid.length; i++) {
    //         for (let j = 0; j < grid[i].length; j++) {
    //             nodes2.push(<Rect x={gridStrokeOffset + spaceX * i}
    //                               y={gridStrokeOffset + spaceY * j}
    //                               width={spaceX - gridStroke}
    //                               height={spaceY - gridStroke}
    //                               fill='grey'/>)
    //         }
    //     }
    //     setNodes(nodes2)
    // }

    function drawGeneratedNodesLayer(grid) {
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

                if (!grid[i][j].isWallOnTop) {
                    yOffset = spaceY * i;
                    nodeHeight += gridStrokeOffset;
                }
                if (!grid[i][j].isWallOnRight) {
                    nodeWidth += gridStrokeOffset;
                }
                if (!grid[i][j].isWallOnBot) {
                    nodeHeight += gridStrokeOffset;
                }
                if (!grid[i][j].isWallOnLeft) {
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
        printGrid(grid);
        setNodes(nodes2)
    }

    return (
        <div style={{display: 'flex', justifyContent: "center", alignItems: 'center', textAlign: 'center'}}>
            <Stage width={window.innerWidth} height={window.innerHeight}>
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