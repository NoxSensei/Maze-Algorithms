'use client'

import kruskalComplexExampleImg from "../../public/mazes/kruskal/complex-example.png";
import IllustrativeImageComponent from "@/app/algorithms/_common/components/details/illustrative-image";

export default function HomePage() {
    return <div className="grid grid-cols-5 h-auto">
        <div className="col-start-2 flex justify-center pt-[10%] text-black col-span-3">
            <div className="flex flex-col">
                <span className="flex justify-center text-4xl">
                    Maze Algorithms
                </span>

                <p className="pt-[5%] pb-[5%] text-justify">
                    The goal of the given project is practicing the maze generation algorithms. Inspired by the
                    book &quot;Mazes for Programmers&quot; by Jamis Buck, I have decided to implement my own
                    solution with Next.js. Given idea allowed me to get familiar with the basic maze generation
                    concepts and represent their generation process on the canvas. Additionally I was able to prepare
                    detailed descriptions, flow charts and animations making it easier to understand their rules.
                </p>

                <p className="pb-[5%] text-justify">
                    In my implementation I have been using approach where the grid is already generated and algorithm
                    is building passages by destroying the walls. If you got a moment take a look into the useful
                    links section as part of the algorithms starts with all walls placed, some of them with empty grid
                    and
                    there are ones that can work in two modes. There are also other cool classifications worth seeing.
                </p>

                <div className="pb-[5%]">
                    <IllustrativeImageComponent image={kruskalComplexExampleImg} width="60%"
                                                alt={'Maze Example'}/>
                </div>

                <div className="py-10 px-6 rounded-2xl">
                    <h2 className="text-2xl font-semibold text-center text-black mb-6">
                        Useful Links
                    </h2>
                    <ul className="list-disc list-inside space-y-4 text-justify marker:text-black">
                        <li>
                            <a
                                href="https://www.jamisbuck.org/mazes/"
                                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Interactive mazes with examples by Jamis Bucks
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.astrolog.org/labyrnth/algrithm.htm"
                                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Maze Classification by Walter D. Pullen
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.astrolog.org/labyrnth/daedalus.htm"
                                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Software for generating mazes – Daedalus
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
}
