'use client'

import {MazeCreatorComponent} from "@/app/algorithms/_common/components/creator/maze-creator";
import {HuntAndKillAlgorithm} from "@/app/algorithms/hunt-and-kill/creator/_services/hunt-and-kill-algorithm";


export default function EllerAlgorithmCreatorPage() {
    return <MazeCreatorComponent mazeAlgorithm={new HuntAndKillAlgorithm()}/>
}
