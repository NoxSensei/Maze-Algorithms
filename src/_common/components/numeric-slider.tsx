import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {JsHelpers} from "@/_common/services/js-helpers";

export interface NumericSliderComponentProps {
    minValue: number;
    maxValue: number;
    stepValue: number;
    defaultValue: number;
    gridSizeSetter: Dispatch<SetStateAction<number>>;
}

export default function NumericSliderComponent(props: NumericSliderComponentProps) {
    const options: number[] = [];
    for (let value = props.minValue; value < props.maxValue; value += props.stepValue) {
        options.push(value);
    }
    options.push(props.maxValue);

    const setGridSizeWithDebounce = JsHelpers.wrapWithDebounce((value) => props.gridSizeSetter(value), 100);

    function onValueChanged(event: ChangeEvent<HTMLInputElement>): void {
        const value = parseInt(event.target.value);
        setGridSizeWithDebounce(value);
    }

    return <>
        <span className="flex justify-center h-4">Grid Size</span>
        <input type="range"
               min={props.minValue}
               max={props.maxValue}
               step={props.stepValue}
               defaultValue={props.defaultValue}
               onChange={onValueChanged}/>
        <ul className="flex justify-between w-full px-[10px]">
            {options.map((option) => <li key={option} className="flex justify-center relative">
                <span className="absolute">{option}</span>
            </li>)}
        </ul>
    </>
}