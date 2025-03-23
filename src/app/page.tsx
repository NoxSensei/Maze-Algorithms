'use client'

import ellerComplexExampleImg from "../../public/mazes/eller/complex-example.png";
import kruskalComplexExampleImg from "../../public/mazes/kruskal/complex-example.png";
import primComplexExampleImg from "../../public/mazes/prim/complex-example.png";
import IllustrativeImageComponent from "@/app/algorithms/_common/components/details/illustrative-image";

export default function HomePage() {
    return <div className="grid grid-cols-3">
        <div className="col-start-2 flex justify-center pt-20 text-black">
            <div className="flex flex-col">
                <span className="flex justify-center text-4xl">
                    Maze Algorithms
                </span>

                <p className="pt-20 pb-20 text-justify">
                    The goal of the given project is practicing the maze generation algorithms. Inspired by the
                    book &quot;Mazes for Programmers&quot; by Jamis Buck, I have decided to implement my own
                    solution with Next.js. Given idea allowed me to get familiar with the basic maze generation
                    concepts and represent their generation process on the canvas. Additionally I was able to prepare
                    detailed descriptions, flow charts and animations making it easier to understand their rules.
                </p>

                <div className="flex justify-evenly gap-4">
                    <IllustrativeImageComponent image={kruskalComplexExampleImg} height="30vh"
                                                alt={'Maze Example'}/>

                    <IllustrativeImageComponent image={ellerComplexExampleImg} height="30vh"
                                                alt={'Maze Example'}/>

                    <IllustrativeImageComponent image={primComplexExampleImg} height="30vh"
                                                alt={'Maze Example'}/>
                </div>
            </div>
        </div>
    </div>;

}
