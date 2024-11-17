'use client'

import {useRef, useState} from "react";
import {MazeCreatorContextData, MazeCreatorContext} from "@/app/algorithms/_common/contexts/maze-creator";
import MazeCreatorPainterComponent from "@/app/algorithms/_common/components/maze-creator-painter";
import MazeCreatorMenuComponent from "@/app/algorithms/_common/components/maze-creator-menu";
import {MazeAlgorithm} from "@/app/algorithms/_common/services/maze-algorithm";
import {DrawingSpeed} from "@/app/algorithms/_common/models/drawing-speed";

export interface MazeCreatorComponentProps {
    mazeAlgorithm: MazeAlgorithm;
}

export default function MazeCreatorComponent(props: MazeCreatorComponentProps) {
    const [gridSize, setGridSize] = useState<number>(30);
    const [drawingSpeed, setDrawingSpeed] = useState<DrawingSpeed>(DrawingSpeed.Medium);
    const [isPlaySelected, setIsPlaySelected] = useState<boolean>(false);

    const context: MazeCreatorContextData = {
        playButton: {
            isSelected: isPlaySelected,
            setIsSelected: setIsPlaySelected
        },
        forwardFastButton: {
            onClick: () => {
            },
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