'use client'

import initialGridImg from "../../../../../public/mazes/kruskal/initial-grid.png";
import groupsAssignedImg from "../../../../../public/mazes/kruskal/groups-assigned.png";
import firstWallSelectedImg from "../../../../../public/mazes/kruskal/first-wall-selected.png";
import firstWallRemovedImg from "../../../../../public/mazes/kruskal/first-wall-removed.png";
import sixIterationsImg from "../../../../../public/mazes/kruskal/six-iterations.png";
import complexWallImg from "../../../../../public/mazes/kruskal/complex-wall.png";
import complexWallOutputImg from "../../../../../public/mazes/kruskal/complex-wall-output.png";
import nonRemoveWallOutputImg from "../../../../../public/mazes/kruskal/non-remove-wall.png";
import completedMazeImg from "../../../../../public/mazes/kruskal/completed-maze.png";
import IllustrativeImageComponent from "@/app/algorithms/_common/components/details/illustrative-image";

export default function KruskalAlgorithmDetailsPage() {
    return <>
        <p className="pb-10">
            Kruskal algorithm begins by setting up a grid, where each cell is surrounded by walls.
            Initially, it is fully enclosed, with no passages between any of the cells, creating a solid block.
        </p>

        <IllustrativeImageComponent image={initialGridImg} height="30vh"
                                    alt={'Kruskal Algorithm Image'}/>

        <p className="pt-10 pb-10">
            As the next step each of the cells is assigned to the unique group. Each of them will be represented
            by separate color.
        </p>

        <IllustrativeImageComponent image={groupsAssignedImg} height="30vh"
                                    alt={'Kruskal Algorithm Image'}/>

        <p className="pt-10 pb-10">
            When the groups are assigned the algorithm starts from listing all of the internal walls and selecting
            them at random order. In the given example the first wall got selected.
        </p>

        <IllustrativeImageComponent image={firstWallSelectedImg} height="30vh"
                                    alt={'Kruskal Algorithm Image'}/>

        <p className="pt-10 pb-10">
            If the both of the neighbouring cells are assigned to the different groups the wall is destroyed and all
            of the cells assigned to the second group are reassigned to the first cell&apos;s group.
        </p>

        <IllustrativeImageComponent image={firstWallRemovedImg} height="30vh"
                                    alt={'Kruskal Algorithm Image'}/>

        <p className="pt-10 pb-10">
            The same pattern applies for the next iterations. The random wall is selected and the cells groups are
            checked. It is important to note that each of the walls can be processed only once. Here is the illustration
            of next five walls being processed where all of the nodes were assigned to the different groups.
        </p>

        <IllustrativeImageComponent image={sixIterationsImg} height="30vh"
                                    alt={'Kruskal Algorithm Image'}/>

        <p className="pt-10 pb-10">
            The next example shows the case where nodes divided by the wall are assigned to the different groups, where
            each of the groups has more than one element.
        </p>

        <IllustrativeImageComponent image={complexWallImg} height="30vh"
                                    alt={'Kruskal Algorithm Image'}/>

        <p className="pt-10 pb-10">
            As an output we can see that the wall was successfully removed and the second group got totally replaced
            by the first one.
        </p>

        <IllustrativeImageComponent image={complexWallOutputImg} height="30vh"
                                    alt={'Kruskal Algorithm Image'}/>

        <p className="pt-10 pb-10">
            In the further iteration the next wall got selected. This time both of the neighbouring cells are located
            in the same group so this wall must persist. The algorithm skips the wall removal and moves to the next
            iteration.
        </p>

        <IllustrativeImageComponent image={nonRemoveWallOutputImg} height="30vh"
                                    alt={'Kruskal Algorithm Image'}/>

        <p className="pt-10 pb-10">
            The process goes on until every wall is visited. As an end result we achieve the complete maze with all
            of the passages created.
        </p>

        <IllustrativeImageComponent image={completedMazeImg} height="30vh"
                                    alt={'Kruskal Algorithm Image'}/>
    </>
}