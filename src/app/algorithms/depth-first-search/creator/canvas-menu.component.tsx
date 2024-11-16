import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faForwardFast, faForwardStep, faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import {Dispatch, MouseEvent, MutableRefObject, SetStateAction, useContext, useState} from "react";
import NumericSliderComponent from "@/_common/components/numeric-slider";
import {DepthFirstSearchContext} from "@/app/algorithms/depth-first-search/creator/context";

export function PlayPauseComponent() {
    const [icon, setIcon] = useState(faPlay)
    const depthFirstSearchContext = useContext(DepthFirstSearchContext);

    function onStartComponentClickHandler(event: MouseEvent<HTMLButtonElement>): void {
        const isRunning = depthFirstSearchContext.isPlayClicked;

        depthFirstSearchContext.setIsRunning(!isRunning);

        if (isRunning) {
            setIcon(faPlay)
        } else {
            setIcon(faPause)
        }
    }

    return <>
        <button onClick={onStartComponentClickHandler}>
            <FontAwesomeIcon icon={icon}/>
        </button>
    </>;
}

export default function CanvasMenuComponent(props: {
    gridSizeStep;
    minGridSize;
    maxGridSize;
    gridSize;
    gridSizeSetter: Dispatch<SetStateAction<number>>;
    startButtonRef: MutableRefObject<HTMLButtonElement | null>;
    allStepsButtonRef: MutableRefObject<HTMLButtonElement | null>;
}) {
    return <div className="flex h-auto justify-center space-x-28">
        <div className="flex flex-col space-y-2 p-2 w-80 h-24">
            <NumericSliderComponent stepValue={props.gridSizeStep}
                                    minValue={props.minGridSize}
                                    maxValue={props.maxGridSize}
                                    defaultValue={props.gridSize}
                                    gridSizeSetter={props.gridSizeSetter}/>
        </div>

        <div className="flex justify-center space-x-2">

            <PlayPauseComponent startButtonRef={props.startButtonRef}/>
            <button>
                <FontAwesomeIcon icon={faForwardStep}/>
            </button>
            <button ref={props.allStepsButtonRef}>
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
}