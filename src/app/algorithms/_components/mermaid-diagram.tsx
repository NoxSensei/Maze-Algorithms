import {useEffect, useRef, useState} from "react";
import mermaid from "mermaid";
import * as uuid from "uuid";

export default function MermaidDiagram({chart}) {
    const chartRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const isDivElement = (element: HTMLDivElement | null): element is HTMLDivElement => element !== null;
        if (!isDivElement(chartRef.current)) {
            return;
        }

        mermaid.initialize({startOnLoad: false, theme: 'neutral', logLevel: 'error'});
        const chartId = `chart-${uuid.v4()}`;
        mermaid.render(chartId, chart).then(result => {
            chartRef.current!.innerHTML = result.svg;
        })
    }, [chart]);

    return <div ref={chartRef}/>
}