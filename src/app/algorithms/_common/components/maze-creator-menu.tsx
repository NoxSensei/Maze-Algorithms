import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faForwardFast, faForwardStep, faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import {Dispatch, MouseEvent, MutableRefObject, SetStateAction, useContext, useState} from "react";
import NumericSliderComponent from "@/_common/components/sliders/numeric-slider";
import {MazeCreatorContext} from "@/app/algorithms/_common/contexts/maze-creator";
import SelectorSliderComponent from "@/_common/components/sliders/selector-slider";
import {DrawingSpeed} from "@/app/algorithms/_common/models/drawing-speed";

export function PlayPauseComponent() {
    const [icon, setIcon] = useState(faPlay)
    const mazeCreatorContext = useContext(MazeCreatorContext);

    function onStartComponentClickHandler(event: MouseEvent<HTMLButtonElement>): void {
        const isRunning = mazeCreatorContext.playButton.isSelected;

        mazeCreatorContext.playButton.setIsSelected(!isRunning);

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

export default function MazeCreatorMenuComponent() {
    const mazeCreatorContext = useContext(MazeCreatorContext);
    const minGridSize = 5;
    const maxGridSize = 50;
    const gridSizeStep = 5;

    return <div className="flex h-auto justify-center space-x-28">
        <div className="flex flex-col space-y-2 p-2 w-80 h-24">
            <NumericSliderComponent
                title={"Grid Size"}
                stepValue={gridSizeStep}
                minValue={minGridSize}
                maxValue={maxGridSize}
                defaultValue={mazeCreatorContext.grid.size}
                valueSetter={mazeCreatorContext.grid.setSize}/>
        </div>

        <div className="flex justify-center space-x-2">
            <PlayPauseComponent/>
            <button>
                <FontAwesomeIcon icon={faForwardStep}/>
            </button>
            <button onClick={(event) => mazeCreatorContext.forwardFastButton.onClick(event)}>
                <FontAwesomeIcon icon={faForwardFast}/>
            </button>
        </div>

        <div className="flex flex-col space-y-2 p-2 w-80  h-20">
            <SelectorSliderComponent
                title={"Drawing Speed"}
                values={Object.values(DrawingSpeed)}
                valueSetter={mazeCreatorContext.drawing.setSpeed}
            />
        </div>
    </div>
}