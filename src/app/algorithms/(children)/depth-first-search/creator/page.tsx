'use client'

import DepthFirstSearchAlgorithmCanvasComponent
    from "@/app/algorithms/(children)/depth-first-search/depth-first-search-canvas.component";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {faForwardStep, faForwardFast, faPlay, faPause} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function P() {
    const minGridSize = 5;
    const maxGridSize = 50;
    const gridSizeStep = 5;
    const defaultGridSize = 15;
    const [gridSize, setGridSize] = useState<number>(defaultGridSize);
    const setGridSizeWithDebounce = debounce((value) => setGridSize(value), 100);

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
                <span className="flex justify-center h-4">Grid Size</span>
                <input type="range" min={minGridSize} max={maxGridSize} step={gridSizeStep} defaultValue={gridSize} onChange={onGridSizeChanged}/>
                <ul className="flex justify-between w-full px-[10px]">
                    <li className="flex justify-center relative">
                        <span className="absolute">5</span>
                    </li>
                    <li className="flex justify-center relative">
                        <span className="absolute">10</span>
                    </li>
                    <li className="flex justify-center relative">
                        <span className="absolute">15</span>
                    </li>
                    <li className="flex justify-center relative">
                        <span className="absolute">20</span>
                    </li>
                    <li className="flex justify-center relative">
                        <span className="absolute">25</span>
                    </li>
                    <li className="flex justify-center relative">
                        <span className="absolute">30</span>
                    </li>
                    <li className="flex justify-center relative">
                        <span className="absolute">35</span>
                    </li>
                    <li className="flex justify-center relative">
                        <span className="absolute">40</span>
                    </li>
                    <li className="flex justify-center relative">
                        <span className="absolute">45</span>
                    </li>
                    <li className="flex justify-center relative">
                        <span className="absolute">50</span>
                    </li>
                </ul>
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
                <button>
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
        <DepthFirstSearchAlgorithmCanvasComponent dimension={gridSize}/>
        </div>
    </div>
}