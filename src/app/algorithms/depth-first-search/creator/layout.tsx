'use client'

import {DepthFirstSearchContext} from "@/app/algorithms/depth-first-search/creator/context";
import {useState} from "react";

export default function DepthFirstSearchCreatorLayout({children}: Readonly<{ children: React.ReactNode }>) {
    const [isRunning, setIsRunning] = useState<boolean>(false);

    return (<DepthFirstSearchContext.Provider value={{ isPlayClicked: isRunning, setIsRunning}}>
            {children}
        </DepthFirstSearchContext.Provider>)
}