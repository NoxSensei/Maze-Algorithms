'use client'

import DepthFirstSearchAlgorithmCanvasComponent
    from "@/app/algorithms/(children)/depth-first-search/depth-first-search-canvas.component";

export default function P() {
    return <div className="flex justify-center flex-col">
        <DepthFirstSearchAlgorithmCanvasComponent dimension={10}/>
    </div>
}