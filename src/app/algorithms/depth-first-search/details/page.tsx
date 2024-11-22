'use client'

import DepthFirstSearchDescriptionComponent from "./description.component";
import Image from "next/image";
import depthFirstSearchImage from '../../../../../public/maze-example/depth-first-search.png'

export default function DepthFirstSearchAlgorithmDetailsPage() {
    return <div
        style={{
            color: "black",
        }}>
        <div className='text-2xl text-center pb-3'>Depth First Search</div>
        <div className="grid grid-cols-2 space-x-10 pt-10">
            <DepthFirstSearchDescriptionComponent/>
            <div>
                <Image src={depthFirstSearchImage as unknown as string} alt='Depth First Search Algorithm Image' style={{ backgroundColor: 'black' }}/>
            </div>
        </div>
    </div>
}