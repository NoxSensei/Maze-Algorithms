import {Context, createContext, Dispatch, MouseEvent, SetStateAction} from "react";
import {DrawingSpeed} from "@/app/algorithms/_common/models/drawing-speed";

export interface MazeCreatorContextData {
    reloadButton: {
        onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    };
    playButton: {
        isSelected: boolean;
        setIsSelected: Dispatch<SetStateAction<boolean>>;
        onClick: (event: MouseEvent<HTMLButtonElement>) => void;
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