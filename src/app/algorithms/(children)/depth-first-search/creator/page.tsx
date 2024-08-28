'use client'

import DepthFirstSearchAlgorithmCanvasComponent
    from "@/app/algorithms/(children)/depth-first-search/depth-first-search-canvas.component";
import {ChangeEvent, useEffect, useRef, useState} from "react";

export default function P() {
    const gridSizeMin = 5;
    const gridSizeMax = 50;
    const defaultGridSize = 15;
    const [girdSizeInput, setGridSizeInput] = useState<string | number>('');
    const [gridSize, setGridSize] = useState<number>(defaultGridSize);

    const gridSizeInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        console.log("reload")
    }, [gridSize]);

    function gridSizeInputChanged(event: ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        value = value.replaceAll(/\D/g, '')
        setGridSizeInput(value);
        if (!value) {
            setInvalidInput('');
            return;
        }

        if (value < gridSizeMin) {
            setInvalidInput('');
            return;
        }

        if (value > gridSizeMax) {
            setInvalidInput('');
            return;
        }

        const numericValue = Number.parseInt(value);
        setGridSize(numericValue);
        console.log("Grid size", gridSize)
        setCorrectInput();
    }

    function setInvalidInput(reasons: string) {
        gridSizeInputRef.current!.style.borderColor = 'red';
        gridSizeInputRef.current!.style.outline = 'none'
    }

    function setCorrectInput() {
        gridSizeInputRef.current!.style.borderColor = 'inherit';
        gridSizeInputRef.current!.style.outline = 'inherit'
    }

    return <div className="h-full pb-10 text-black">
        <div className="flex justify-center items-center space-x-2 mb-2">
            <label htmlFor="gridSize">Grid size</label>
            <input ref={gridSizeInputRef}
                   type="text"
                   id="gridSize"
                   placeholder={`${gridSizeMin}-${gridSizeMax}`}
                   value={girdSizeInput}
                   onChange={gridSizeInputChanged}
                   className="border-2"/>
        </div>
        <DepthFirstSearchAlgorithmCanvasComponent dimension={gridSize}/>
    </div>
}