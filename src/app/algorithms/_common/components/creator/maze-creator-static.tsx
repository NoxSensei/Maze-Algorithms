'use client'

import {useRef, useState} from "react";
import {MazeCreatorContextData, MazeCreatorContext} from "@/app/algorithms/_common/contexts/maze-creator";
import MazeCreatorPainterComponent from "@/app/algorithms/_common/components/creator/maze-creator-painter";
import MazeCreatorMenuComponent from "@/app/algorithms/_common/components/creator/maze-creator-menu";
import {MazeAlgorithm} from "@/app/algorithms/_common/services/maze-algorithm";
import {DrawingSpeed} from "@/app/algorithms/_common/models/drawing-speed";
import dynamic from "next/dynamic";

export interface MazeCreatorComponentProps {
    mazeAlgorithm: MazeAlgorithm;
}

export default function MazeCreatorComponentStatic(props: MazeCreatorComponentProps) {
    const [gridSize, setGridSize] = useState<number>(30);
    const [drawingSpeed, setDrawingSpeed] = useState<DrawingSpeed>(DrawingSpeed.Medium);
    const [isPlaySelected, setIsPlaySelected] = useState<boolean>(false);

    const context: MazeCreatorContextData = {
        reloadButton: {
            onClick: () => {
            }
        },
        playButton: {
            onClick: () => {
            },
            isSelected: isPlaySelected,
            setIsSelected: setIsPlaySelected
        },
        forwardFastButton: {
            onClick: () => {
            }
        },
        grid: {
            size: gridSize,
            setSize: setGridSize,
        },
        drawing: {
            speed: drawingSpeed,
            setSpeed: setDrawingSpeed
        }
    };

    return <MazeCreatorContext.Provider value={context}>
        <div className="h-full text-black">
            <MazeCreatorMenuComponent/>
            <div className="h-5/6">
                <MazeCreatorPainterComponent mazeAlgorithm={props.mazeAlgorithm}/>
            </div>
        </div>
    </MazeCreatorContext.Provider>
}

