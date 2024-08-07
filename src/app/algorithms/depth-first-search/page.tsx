'use client'

import DepthFirstSearchAlgorithmCanvasComponent
    from "@/app/algorithms/depth-first-search/depth-first-search-canvas.component";


export default function DepthFirstSearchAlgorithmPage() {
    return (
        <div
            style={{
                padding: '50px',
                color: "black",
            }}>
            <h1>Depth First Search</h1>
            <span>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </span>
            <div className="grid grid-cols-3" style={{padding: '10px'}}>
                <div className="flex justify-center flex-col">
                    <span className="flex justify-center">Small 10x10</span>
                    <DepthFirstSearchAlgorithmCanvasComponent dimension={10}/>
                </div>
                <div className="flex justify-center flex-col">
                    <span className="flex justify-center">Medium 25x25</span>
                    <DepthFirstSearchAlgorithmCanvasComponent dimension={25}/>
                </div>
                <div className="flex justify-center flex-col">
                    <span className="flex justify-center">Large 50x50</span>
                    <DepthFirstSearchAlgorithmCanvasComponent dimension={50}/>
                </div>
            </div>
        </div>
    );
}