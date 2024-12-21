'use client'

import {MazeCreatorComponent} from "@/app/algorithms/_common/components/creator/maze-creator";
import {KruskalAlgorithm} from "@/app/algorithms/kruskal/creator/_services/kruskal-algorithm";


export default function KruskalAlgorithmCreatorPage() {
    return <MazeCreatorComponent mazeAlgorithm={new KruskalAlgorithm()}/>
}
