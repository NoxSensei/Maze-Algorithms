'use client'

import {MazeCreatorComponent} from "@/app/algorithms/_common/components/creator/maze-creator";
import {PrimAlgorithm} from "@/app/algorithms/prim/creator/_services/prim-algorithm";

export default function PrimAlgorithmCreatorPage() {
    return <MazeCreatorComponent mazeAlgorithm={new PrimAlgorithm()}/>
}
