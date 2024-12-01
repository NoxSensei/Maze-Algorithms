'use client'

import {
    DepthFirstSearchAlgorithm
} from "@/app/algorithms/depth-first-search/creator/_services/depth-first-search-algorithm";
import {MazeCreatorComponent} from "@/app/algorithms/_common/components/creator/maze-creator";

export default function DepthFirstSearchAlgorithmCreatorPage() {
    return <MazeCreatorComponent mazeAlgorithm={new DepthFirstSearchAlgorithm()}/>
}
