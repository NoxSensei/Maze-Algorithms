import {MutableRefObject, useContext, useEffect, useRef} from "react";
import {MazeCreatorContext} from "@/app/algorithms/_common/contexts/maze-creator";
import {DrawingSpeed} from "@/app/algorithms/_common/models/drawing-speed";

export function useRefDrawingSpeed(): MutableRefObject<DrawingSpeed> {
    const mazeCreatorContext = useContext(MazeCreatorContext);
    const drawingSpeedRef = useRef<DrawingSpeed>(DrawingSpeed.Medium);

    useEffect(() => {
        drawingSpeedRef.current = mazeCreatorContext.drawing.speed;
    }, [mazeCreatorContext.drawing.speed])

    return drawingSpeedRef;
}