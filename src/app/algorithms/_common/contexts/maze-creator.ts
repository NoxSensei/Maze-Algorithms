import {Context, createContext, Dispatch, MouseEvent, SetStateAction} from "react";
import {DrawingSpeed} from "@/app/algorithms/_common/models/drawing-speed";

export interface MazeCreatorContextData {
    playButton: {
        isSelected: boolean;
        setIsSelected: Dispatch<SetStateAction<boolean>>;
    };
    forwardFastButton: {
        onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    };
    grid: {
        size: number;
        setSize: Dispatch<SetStateAction<number>>;
    };
    drawing: {
        speed: DrawingSpeed;
        setSpeed: Dispatch<SetStateAction<number>>;
    }
}

export const MazeCreatorContext = createContext({}) as Context<MazeCreatorContextData>;