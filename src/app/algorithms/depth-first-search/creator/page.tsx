'use client'

import DepthFirstSearchAlgorithmCanvasComponent from "./depth-first-search-canvas.component";
import {ChangeEvent, useRef, useState} from "react";
import {faForwardStep, faForwardFast, faPlay, faPause} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function NumericSliderComponent(props: {
    minGridSize: number;
    maxGridSize: number;
    gridSizeStep: number;
    gridSize: number;
    onGridSizeChanged: (event: ChangeEvent<HTMLInputElement>) => void
}) {
    const options: number[] = [];
    for (let i = props.minGridSize; i < props.maxGridSize; i += props.gridSizeStep) {
        options.push(i);
    }
    options.push(props.maxGridSize);

    return <>
        <span className="flex justify-center h-4">Grid Size</span>
        <input type="range"
               min={props.minGridSize}
               max={props.maxGridSize}
               step={props.gridSizeStep}
               defaultValue={props.gridSize}
               onChange={props.onGridSizeChanged}/>
        <ul className="flex justify-between w-full px-[10px]">
            {options.map((option) => <li key={option} className="flex justify-center relative">
                <span className="absolute">{option}</span>
            </li>)}
        </ul>
    </>
}

export default function DepthFirstSearchAlgorithmCreatorPage() {
    const minGridSize = 5;
    const maxGridSize = 50;
    const gridSizeStep = 5;
    const defaultGridSize = 15;
    const [gridSize, setGridSize] = useState<number>(defaultGridSize);
    const setGridSizeWithDebounce = debounce((value) => setGridSize(value), 100);
    const allStepsButtonRef = useRef<HTMLButtonElement | null>(null);

    function onGridSizeChanged(event: ChangeEvent<HTMLInputElement>) {
        const value = parseInt(event.target.value);
        setGridSizeWithDebounce(value);
    }

    function debounce(method, timeout) {
        let timerId;
        return (...args) => {
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                method(...args)
            }, timeout);
        }
    }

    return <div className="h-full text-black">
        <div className="flex h-auto justify-center space-x-28">
            <div className="flex flex-col space-y-2 p-2 w-80 h-24">
                <NumericSliderComponent gridSizeStep={gridSizeStep}
                                        minGridSize={minGridSize}
                                        maxGridSize={maxGridSize}
                                        gridSize={gridSize}
                                        onGridSizeChanged={onGridSizeChanged}/>
            </div>

            <div className="flex justify-center space-x-2">
                <button>
                    <FontAwesomeIcon icon={faPause}/>
                </button>
                <button>
                    <FontAwesomeIcon icon={faPlay}/>
                </button>
                <button>
                    <FontAwesomeIcon icon={faForwardStep}/>
                </button>
                <button ref={allStepsButtonRef}>
                    <FontAwesomeIcon icon={faForwardFast}/>
                </button>
            </div>

            <div className="flex flex-col space-y-2 p-2 w-80  h-20">
                <span className="flex justify-center h-4">Generation Speed</span>
                <input type="range" className="w-full" min="1" max="3" step="1"/>
                <ul className="flex justify-between w-full px-[10px]">
                    <li className="flex justify-center relative">
                        <span className="absolute">Slow</span>
                    </li>
                    <li className="flex justify-center relative">
                        <span className="absolute">Medium</span>
                    </li>
                    <li className="flex justify-center relative">
                        <span className="absolute">Fast</span>
                    </li>
                </ul>
            </div>
        </div>
        <div className="h-5/6">
            <DepthFirstSearchAlgorithmCanvasComponent dimension={gridSize} allStepsButtonRef={allStepsButtonRef}/>
        </div>
    </div>
}