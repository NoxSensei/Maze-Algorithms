'use client'

import {useEffect, useState} from "react";
import {Stage, Layer, Rect, Line} from 'react-konva';

const rowsCount = 3;
const columnsCount = 3;

class Node {
    isWallOnTop = true;
    isWallOnRight = true;
    isWallOnBot = true;
    isWallOnLeft = true;
}


const grid = Array.from(new Array(rowsCount), () => new Array(columnsCount).fill(undefined).map(() => new Node()))

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
    const visited = new Set();
    const i = randomInt(0, rowsCount - 1);
    const j = randomInt(0, columnsCount - 1);

    backtracer(i, j, visited)
}

function backtracer(i, j, visited) {
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
            backtracer(index, j, visited)
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
            backtracer(i, index, visited)
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
            backtracer(index, j, visited)
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
            backtracer(i, index, visited)
        }
    })
}

export default function Home() {
    const [nodes, setNodes] = useState([]);

    useEffect(
        () => {
            generateMaze();
            drawNodes();
        },
        []
    );

    function drawGrid() {
        const gridStroke = 2;
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

    function drawNodes() {
        const width = 400;
        const height = 400;

        const spaceX = width / rowsCount;
        const spaceY = height / columnsCount;

        const nodes2 = [];
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                nodes2.push(<Rect x={spaceX * i}
                                  y={spaceY * j}
                                  width={spaceX}
                                  height={spaceY}
                                  fill='grey'/>)
            }
        }
        setNodes(nodes2)
    }

    return (
        <div style={{display: 'flex', justifyContent: "center", alignItems: 'center', textAlign: 'center'}}>
            <Stage width={window.innerWidth} height={window.innerHeight}>
                {
                    drawGrid()
                }
                <Layer>
                    {nodes}
                </Layer>
            </Stage>
        </div>
    );
}
