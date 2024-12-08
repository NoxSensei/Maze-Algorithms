import {useEffect, useRef} from "react";
import mermaid from "mermaid";
import * as uuid from "uuid";

export interface MermaidDiagramProps {
    chart: string;
}

export default function MermaidDiagram({chart}: MermaidDiagramProps) {
    const chartRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const isDivElement = (element: HTMLDivElement | null): element is HTMLDivElement => element !== null;
        if (!isDivElement(chartRef.current)) {
            return;
        }

        mermaid.initialize({
            startOnLoad: true,
            theme: 'neutral',
            logLevel: 'error',
        });

        const chartId = `chart-${uuid.v4()}`;
        mermaid.render(chartId, chart).then(result => {
            chartRef.current!.innerHTML = result.svg;
        })
    }, [chart]);

    return <div ref={chartRef} style={{display: "flex", justifyContent: "center"}}/>
}