import {useLayoutEffect, useState, MutableRefObject} from "react";

export function useCanvasSize(
    canvasWrapperRef: MutableRefObject<HTMLDivElement | null>
): CanvasSize {
    const [canvasSize, setCanvasSize] = useState<CanvasSize>({width: 0, height: 0});

    useLayoutEffect(() => {
        const isDivElement = (element: HTMLDivElement | null): element is HTMLDivElement =>
            element !== null;

        if (!isDivElement(canvasWrapperRef.current)) {
            return;
        }

        const canvasWidth = canvasWrapperRef.current.offsetWidth;
        const canvasHeight = canvasWrapperRef.current.offsetHeight;

        const canvasSideSize = canvasWidth > canvasHeight ? canvasHeight : canvasWidth;

        setCanvasSize({
            width: canvasSideSize,
            height: canvasSideSize,
        });
    }, [canvasWrapperRef]);

    return canvasSize;
}
