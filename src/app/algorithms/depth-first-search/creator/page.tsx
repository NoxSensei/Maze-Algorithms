'use client'

import DepthFirstSearchAlgorithmCanvasComponent from "./depth-first-search-canvas.component";
import {ChangeEvent, MutableRefObject, useEffect, useRef, useState} from "react";
import CanvasMenuComponent from "@/app/algorithms/depth-first-search/creator/canvas-menu.component";
import {JsHelpers} from "@/_common/services/js-helpers";


export default function DepthFirstSearchAlgorithmCreatorPage() {
    const minGridSize = 5;
    const maxGridSize = 50;
    const gridSizeStep = 5;
    const defaultGridSize = 15;

    const [gridSize, setGridSize] = useState<number>(defaultGridSize);

    const allStepsButtonRef = useRef<HTMLButtonElement | null>(null);
    const startButtonRef = useRef<HTMLButtonElement | null>(null);

    return <div className="h-full text-black">
        <CanvasMenuComponent startButtonRef={startButtonRef} gridSize={gridSize} minGridSize={minGridSize}
                             maxGridSize={maxGridSize} gridSizeStep={gridSizeStep}
                             gridSizeSetter={setGridSize} allStepsButtonRef={allStepsButtonRef}/>
        <div className="h-5/6">
            <DepthFirstSearchAlgorithmCanvasComponent dimension={gridSize}
                                                      allStepsButtonRef={allStepsButtonRef}
                                                      startButtonRef={startButtonRef}/>
        </div>
    </div>
}