import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {JsHelpers} from "@/_common/services/js-helpers";
import {DrawingSpeed} from "@/app/algorithms/_common/models/drawing-speed";

export interface SelectorSliderComponentProps {
    title: string;
    values: string[];
    valueSetter: Dispatch<SetStateAction<DrawingSpeed>>;

    /**
     * @default 100
     */
    debounceInMs?: number;
}

export default function SelectorSliderComponent(props: SelectorSliderComponentProps) {
    const valueSetterWithDebounce = JsHelpers.wrapWithDebounce((value) => props.valueSetter(value), props.debounceInMs ?? 100);

    function onValueChanged(event: ChangeEvent<HTMLInputElement>): void {
        const index = parseInt(event.target.value);
        const value = props.values[index];
        valueSetterWithDebounce(value);
    }

    return <div className="flex flex-col">
        <span className="flex justify-center h-4">{props.title}</span>
        <input type="range" className="w-full" min="1" max={props.values.length} step="1" onChange={onValueChanged}/>
        <ul className="flex justify-between">
            {
                props.values.map((value) => <li className="flex-1" key={value}>
                    {value}
                </li>)
            }
        </ul>
    </div>
}