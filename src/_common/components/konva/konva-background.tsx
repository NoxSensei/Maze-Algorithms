import {Layer, Rect} from "react-konva";

export interface KonvaBackgroundComponentProps extends CanvasSize {
    color: string | CanvasGradient;
}

export function KonvaBackgroundComponent(props: KonvaBackgroundComponentProps) {
    return <Layer>
        <Rect x={0} y={0} width={props.width} height={props.height} fill={props.color}/>
    </Layer>
}