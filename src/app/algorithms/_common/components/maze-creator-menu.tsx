import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faForwardFast, faStop, faPlay, faRotate} from "@fortawesome/free-solid-svg-icons";
import {MouseEvent, useContext, useEffect, useState} from "react";
import NumericSliderComponent from "@/_common/components/sliders/numeric-slider";
import {MazeCreatorContext} from "@/app/algorithms/_common/contexts/maze-creator";
import SelectorSliderComponent from "@/_common/components/sliders/selector-slider";
import {DrawingSpeed} from "@/app/algorithms/_common/models/drawing-speed";

export function PlayButtonComponent() {
    const [icon, setIcon] = useState(faPlay)
    const mazeCreatorContext = useContext(MazeCreatorContext);

    useEffect(() => {
        if (mazeCreatorContext.playButton.isSelected) {
            setIcon(faStop)
        } else {
            setIcon(faPlay)
        }
    }, [mazeCreatorContext.playButton.isSelected]);

    function onPlayButtonClickHandler(event: MouseEvent<HTMLButtonElement>): void {
        mazeCreatorContext.playButton.onClick(event)
        mazeCreatorContext.playButton.setIsSelected(!mazeCreatorContext.playButton.isSelected);
    }

    return <>
        <button onClick={onPlayButtonClickHandler}>
            <FontAwesomeIcon icon={icon}/>
        </button>
    </>;
}

export default function MazeCreatorMenuComponent() {
    const minGridSize = 5;
    const maxGridSize = 50;
    const gridSizeStep = 5;

    const mazeCreatorContext = useContext(MazeCreatorContext);

    const disabledStyle = {
        color: '#a9a9a9',
        cursor: 'not-allowed',
        opacity: 0.7,
    };

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
            <button
                onClick={(event) => mazeCreatorContext.reloadButton.onClick(event)}
                disabled={mazeCreatorContext.playButton.isSelected}
            >
                <FontAwesomeIcon
                    icon={faRotate}
                    style={mazeCreatorContext.playButton.isSelected ? disabledStyle : {}}
                />
            </button>
            <PlayButtonComponent/>
            <button
                onClick={(event) => mazeCreatorContext.forwardFastButton.onClick(event)}
                disabled={mazeCreatorContext.playButton.isSelected}
            >
                <FontAwesomeIcon
                    icon={faForwardFast}
                    style={mazeCreatorContext.playButton.isSelected ? disabledStyle : {}}
                />
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