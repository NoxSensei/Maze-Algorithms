'use client'

import DepthFirstSearchDescriptionComponent from "./description.component";
import DepthFirstSearchAlgorithmCanvasComponent from "../creator/depth-first-search-canvas.component";

export default function DepthFirstSearchAlgorithmDetailsPage() {
    return <div
        style={{
            color: "black",
        }}>
        <div className='text-2xl text-center pb-3'>Depth First Search</div>
        <div className="grid grid-cols-2 space-x-10 pt-10">
            <DepthFirstSearchDescriptionComponent/>
            <div>
                {/* TODO use static image */}
                <DepthFirstSearchAlgorithmCanvasComponent dimension={10}/>
            </div>
        </div>
    </div>
}