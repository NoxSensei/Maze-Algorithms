import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {JsHelpers} from "@/_common/services/js-helpers";

export interface NumericSliderComponentProps {
    title: string;
    minValue: number;
    maxValue: number;
    stepValue: number;
    defaultValue: number;
    valueSetter: Dispatch<SetStateAction<number>>;

    /**
     * @default 100
     */
    debounceInMs?: number;
}

export default function NumericSliderComponent(props: NumericSliderComponentProps) {
    const options: number[] = [];
    for (let value = props.minValue; value < props.maxValue; value += props.stepValue) {
        options.push(value);
    }
    options.push(props.maxValue);

    const valueSetterWithDebounce = JsHelpers.wrapWithDebounce((value) => props.valueSetter(value), props.debounceInMs ?? 100);

    function onValueChanged(event: ChangeEvent<HTMLInputElement>): void {
        const value = parseInt(event.target.value);
        valueSetterWithDebounce(value);
    }

    return <>
        <span className="flex justify-center h-4">{props.title}</span>
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