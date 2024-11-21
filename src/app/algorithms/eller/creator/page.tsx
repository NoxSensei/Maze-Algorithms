'use client'

import MazeCreatorComponent from "@/app/algorithms/_common/components/maze-creator";
import {EllerAlgorithm} from "@/app/algorithms/eller/creator/_services/eller-algorithm";


export default function EllerAlgorithmCreatorPage() {
    return <MazeCreatorComponent mazeAlgorithm={new EllerAlgorithm()}/>
}
