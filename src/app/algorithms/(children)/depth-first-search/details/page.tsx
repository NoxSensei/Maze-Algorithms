'use client'

import DepthFirstSearchDescriptionComponent from "@/app/algorithms/(children)/depth-first-search/description.component";
import DepthFirstSearchAlgorithmCanvasComponent
    from "@/app/algorithms/(children)/depth-first-search/depth-first-search-canvas.component";

export default function P() {
    return <div
        style={{
            color: "black",
        }}>
        <div className='text-2xl text-center pb-3'>Depth First Search</div>
        <div className="grid grid-cols-2 pt-10">
            <DepthFirstSearchDescriptionComponent/>
            <div className="pt-5">
                {/* TODO use static image */}
                <DepthFirstSearchAlgorithmCanvasComponent dimension={10}/>
            </div>
        </div>
    </div>
}