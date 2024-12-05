import React from "react";
import IllustrativeImageComponent from "@/app/algorithms/_common/components/details/illustrative-image";

export interface MazeDetailsLayoutProps {
    title: string;
    complexMazeExample: unknown;
    children: React.ReactNode
}

export default function MazeDetailsLayout(props: MazeDetailsLayoutProps) {
    return <div className="space-y-6 text-justify" style={{color: "black"}}>
        <div className='text-2xl text-center pb-3'>{props.title}</div>

        <div className="grid grid-cols-5">
            <div className="col-start-2 col-span-3">
                <IllustrativeImageComponent image={props.complexMazeExample} height="50vh"
                                            alt={`${props.title} Complex Example`}/>

                <br/>
                <hr className="bg-gray-700 border-0 h-px my-10"/>

                {props.children}
            </div>
        </div>
    </div>
}