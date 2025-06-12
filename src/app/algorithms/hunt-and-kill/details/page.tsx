'use client'

import initialGridImg from "../../../../../public/mazes/hunt-and-kill/initial-grid.png";
import firstCellSelectedImg from "../../../../../public/mazes/hunt-and-kill/first-cell-selected.png";
import secoundCellSelectedImg from "../../../../../public/mazes/hunt-and-kill/secound-cell-selected.png";
import thirdCellSelectedImg from "../../../../../public/mazes/hunt-and-kill/third-cell-selected.png";
import fourthCellSelectedImg from "../../../../../public/mazes/hunt-and-kill/fourth-cell-selected.png";
import firstPathNearlyCompletedImg from "../../../../../public/mazes/hunt-and-kill/first-path-nearly-completed.png";
import firstPathCompletedImg from "../../../../../public/mazes/hunt-and-kill/first-path-completed.png";
import firstCellFirstHuntImg from "../../../../../public/mazes/hunt-and-kill/first-cell-first-hunt.png";
import pathCompletedHuntImg from "../../../../../public/mazes/hunt-and-kill/path-completed-hunt.png";
import completedMazeImg from "../../../../../public/mazes/hunt-and-kill/completed-maze.png";
import IllustrativeImageComponent from "@/app/algorithms/_common/components/details/illustrative-image";

export default function HuntAndKillAlgorithmDetailsPage() {
    return <>
        <p className="pb-10">
            Given implementation of hunt and kill algorithm works on already defined grid with all cells separated by
            walls.
        </p>

        <IllustrativeImageComponent image={initialGridImg} height="30vh"
                                    alt={'Hunt And Kill Image'}/>

        <p className="pt-10 pb-10">
            The initial concept is similar to the depth first search method. Algorithm starts from selecting random cell
            on the gird, marking it as visited and trying to move from it in random direction.
        </p>

        <IllustrativeImageComponent image={firstCellSelectedImg} height="30vh"
                                    alt={'Hunt And Kill Image'}/>

        <p className="pt-10 pb-10">
            If there is a non visited cell in the given direction we built the passage. In the example presented below
            the north got selected as random direction. The neighbouring cell has not been visited yet and is located
            withing the bound of the maze. We need to mark it as visited and set as current cell.
        </p>

        <IllustrativeImageComponent image={secoundCellSelectedImg} height="30vh"
                                    alt={'Hunt And Kill Image'}/>

        <p className="pt-10 pb-10">
            In the third step the north got selected again.
        </p>

        <IllustrativeImageComponent image={thirdCellSelectedImg} height="30vh"
                                    alt={'Hunt And Kill Image'}/>

        <p className="pt-10 pb-10">
            The same process is followed for the fourth iteration. Overall we can move in four directions. Imagine case
            where directions got randomly shuffled in the following order [North, South, West, East]. When checking the
            path for north the neighbouring cell would be located outside the bound of the maze, so we have to skip this
            direction. The next one is south, in this case we reach out the cell which has been already visited, in this
            case we also have to skip building the passage. Checking the west we have made sure that it is located
            within
            the grid and was not visited yet. We build the passage to this cell, mark it as visited and skip check for
            the east.
        </p>

        <IllustrativeImageComponent image={fourthCellSelectedImg} height="30vh"
                                    alt={'Hunt And Kill Image'}/>

        <p className="pt-10 pb-10">
            As we can see with the next iterations the path is almost reaching its dead end. Right now following the
            algorithm the path would be build only on the north and then east as for other directions conditions will
            not be met.
        </p>

        <IllustrativeImageComponent image={firstPathNearlyCompletedImg} height="30vh"
                                    alt={'Hunt And Kill Image'}/>

        <p className="pt-10 pb-10">
            Here we are, the first path reached the dead end. It means that the walk phase has been completed and we
            need to start the hunt.
        </p>

        <IllustrativeImageComponent image={firstPathCompletedImg} height="30vh"
                                    alt={'Hunt And Kill Image'}/>

        <p className="pt-10 pb-10">
            During the hunt going row by row and column by column we are looking for a first non visited cell which is
            directly adjacent to the already generated path. If we manage to find the cell then we build the passage to
            it and mark it as visited.
        </p>

        <IllustrativeImageComponent image={firstCellFirstHuntImg} height="30vh"
                                    alt={'Hunt And Kill Image'}/>

        <p className="pt-10 pb-10">
            Right now this cell is the starting point for the walk phase. Again we shuffle the directions and try to
            build the passages following the rule where neighbour has to be located inside the maze and must not be
            visited yet. When the path reaches the dead end the hunt starts again.
        </p>

        <IllustrativeImageComponent image={pathCompletedHuntImg} height="30vh"
                                    alt={'Hunt And Kill Image'}/>

        <p className="pt-10 pb-10">
            The algorithm is executed until there is no cell remaining for the hunt phase. All of them have been visited
            and the maze has been successfully generated.
        </p>

        <IllustrativeImageComponent image={completedMazeImg} height="30vh"
                                    alt={'Hunt And Kill Image'}/>
    </>
}