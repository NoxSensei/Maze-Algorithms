'use client'

import IllustrativeImageComponent from "@/app/algorithms/_common/components/details/illustrative-image";
import initialGridImg from "../../../../../public/mazes/initial-grid.png";
import firstCellImg from "../../../../../public/mazes/depth-first-search/first-cell.png";
import firstCellNeighboursImg from "../../../../../public/mazes/depth-first-search/first-cell-neighbours.png";
import secondCellNeighboursImg from "../../../../../public/mazes/depth-first-search/secound-cell-neighbours.png";
import boundaryImg from "../../../../../public/mazes/depth-first-search/boundary-cell.png";
import completedPathImg from "../../../../../public/mazes/depth-first-search/completed-path.png";
import completedMazeImg from "../../../../../public/mazes/depth-first-search/completed-maze.png";

export default function DepthFirstSearchAlgorithmDetailsPage() {
    return <>
        <p className="pb-10">
            The Depth First Search (DFS) algorithm begins by setting up a grid, where each cell is
            surrounded by walls. Initially, it is fully enclosed, with no passages between any of the cells,
            creating a solid
            block.
        </p>

        <IllustrativeImageComponent image={initialGridImg} height="30vh"
                                    alt={'Depth First Search Algorithm Image'}/>

        <p className="pt-10 pb-10">
            To start the maze generation, a random cell within this grid is selected. This cell serves as
            the starting point. The algorithm marks this cell as visited, which is essential for
            tracking progress and ensuring that none of the cells is revisited.
        </p>

        <IllustrativeImageComponent image={firstCellImg} height="30vh"
                                    alt={'Depth First Search Algorithm Image'}/>


        <p className="pt-10 pb-10">
            The next step involves
            identifying all neighboring cells of the current one. These neighboring cells are then shuffled
            randomly to introduce unpredictability in the maze’s layout.
        </p>

        <IllustrativeImageComponent image={firstCellNeighboursImg} height="30vh"
                                    alt={'Depth First Search Algorithm Image'}/>

        <p className="pt-10 pb-10">
            Then each of the neighbours is entered separately starting from no. 1. When the neighbour is entered
            it is marked as visited and the wall between previous cell and the current one is removed.
            After doing that another neighbouring cells are randomly shuffled. In the given case fourth
            cell will be omitted when all of the remaining cells are entered as it was already visited.
        </p>

        <IllustrativeImageComponent image={secondCellNeighboursImg} height="30vh"
                                    alt={'Depth First Search Algorithm Image'}/>

        <p className="pt-10 pb-10">
            The same process is repeated for the subsequent calls. If the cell is located on the border
            then the number of the neighbours will be limited to the cells present on the grid which
            were not entered yet.
        </p>


        <IllustrativeImageComponent image={boundaryImg} height="30vh"
                                    alt={'Depth First Search Algorithm Image'}/>

        <p className="pt-10 pb-10">
            When one of the paths is fully resolved (the algorithm had been entering the neighbour of the
            neighbour and reached the most end), then algorithm goes back to the previous cell and enters
            the remaining neighbours. The given example shows the completed path for the first neighbour,
            all of the paths have been resolved there so now it will redo the same logic for the secound one.
        </p>


        <IllustrativeImageComponent image={completedPathImg} height="30vh"
                                    alt={'Depth First Search Algorithm Image'}/>

        <p className="pt-10 pb-10">
            Solving all of the paths results with complete maze.
        </p>

        <IllustrativeImageComponent image={completedMazeImg} height="30vh"
                                    alt={'Depth First Search Algorithm Image'}/>
    </>
}