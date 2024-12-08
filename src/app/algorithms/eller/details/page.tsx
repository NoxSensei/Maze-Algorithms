'use client'

import initialGridImg from "../../../../../public/mazes/eller/initial-grid.png";
import firstRowGroupsImg from "../../../../../public/mazes/eller/first-row-groups.png";
import firstRowSecondCellImg from "../../../../../public/mazes/eller/first-row-second-cell.png";
import firstRowThirdCellImg from "../../../../../public/mazes/eller/first-row-third-cell.png";
import firstRowCompletedImg from "../../../../../public/mazes/eller/first-row-completed.png";
import firstRowSouthernPassagesImg from "../../../../../public/mazes/eller/first-row-southern-passages.png";
import secondRowGroupsImg from "../../../../../public/mazes/eller/second-row-groups.png";
import secondRowCompletedImg from "../../../../../public/mazes/eller/second-row-completed.png";
import secondRowSouthernPassagesImg from "../../../../../public/mazes/eller/second-row-sothern-passages.png";
import lastRowImg from "../../../../../public/mazes/eller/last-row.png";
import completedMazeImg from "../../../../../public/mazes/eller/completed-maze.png";
import IllustrativeImageComponent from "@/app/algorithms/_common/components/details/illustrative-image";

export default function EllerAlgorithmDetailsPage() {
    return <>
        <div className="pb-10">
            Main feature of Eller algorithm is the linear time complexity. It can generate really complex mazes
            in a short time comparing to the different algorithms. The algorithm itself can be implemented in two ways.
            First one where whole grid is initialized with walls placed and they are removed in the further
            iterations. Second one where grid is empty and the walls are placed in the further iterations.
            Given document will cover the first implementation scenario starting with all walls placed.
        </div>

        <IllustrativeImageComponent image={initialGridImg} height="30vh"
                                    alt={'Eller Algorithm Image'}/>

        <p className="pt-10 pb-10">
            The whole process launches from the first maze&apos;s row. Each of the nodes are assigned to the unique group.
            In the given example each of the groups will be represented as separate color.
        </p>

        <IllustrativeImageComponent image={firstRowGroupsImg} height="30vh"
                                    alt={'Eller Algorithm Image'}/>

        <p className="pt-10 pb-10">
            Next step involves iterating over all cells in the current row and making eastern passages. The passages are
            created basing on random chance. Starting from the first cell the random 50% chance is checked. If it is
            fulfilled the wall between first cell and the eastern one is destroyed and the eastern cell is assigned to
            the first cell&apos;s group.
        </p>

        <IllustrativeImageComponent image={firstRowSecondCellImg} height="30vh"
                                    alt={'Eller Algorithm Image'}/>

        <p className="pt-10 pb-10">
            The same situation appears for another cell, the random chance is met so the wall between second and third
            cells is removed. The third cell is also assigned to the first group.
        </p>

        <IllustrativeImageComponent image={firstRowThirdCellImg} height="30vh"
                                    alt={'Eller Algorithm Image'}/>

        <p className="pt-10 pb-10">
            During the check for third cell the random chance wasn&apos;t fulfilled. The wall between third and foruth cell
            will persist and the algorithm will move to the next cell leaving the fourth cell in its current group.
        </p>

        <IllustrativeImageComponent image={firstRowThirdCellImg} height="30vh"
                                    alt={'Eller Algorithm Image'}/>

        <p className="pt-10 pb-10">
            Then the process moves forward with the same assumptions until it reaches the final cell in the current row.
            The node won&apos;t have any neighbour on the east so the processing for the current row is completed.
        </p>

        <IllustrativeImageComponent image={firstRowCompletedImg} height="30vh"
                                    alt={'Eller Algorithm Image'}/>

        <p className="pt-10 pb-10">
            When the horizontal passages are created there is time to make the vertical ones. In order to achieve that
            we need to iterate over all of the groups and build random number of passages. The minimum amount of them
            for each group equals 1 and the maximum is the count of the nodes assigned to the given group from the most
            recent row. In the given example the fourth group has only 1 southern passage so it&apos;s the reason why one of
            the cells in the second row is gray.
        </p>

        <IllustrativeImageComponent image={firstRowSouthernPassagesImg} height="30vh"
                                    alt={'Eller Algorithm Image'}/>

        <p className="pt-10 pb-10">
            After finishing the southern passages build process the algorithm repeats the steps with assigning each of
            the nodes from the second row to the unique groups. Nodes being already assigned to any group aren&apos;t
            modified. In the current row there was only one node without any group assigned so the new one was created
            and assigned to it.
        </p>

        <IllustrativeImageComponent image={secondRowGroupsImg} height="30vh"
                                    alt={'Eller Algorithm Image'}/>

        <p className="pt-10 pb-10">
            As the next step the whole process of building the eastern walls repeats with additional condition. If the
            two neighbouring cells are assigned to the same group then the wall between them persists. In the case where
            they are assigned to the different groups the random chance is checked and when fulfilled the wall is
            destroyed, otherwise the wall is left.
        </p>

        <IllustrativeImageComponent image={secondRowCompletedImg} height="30vh"
                                    alt={'Eller Algorithm Image'}/>

        <p className="pt-10 pb-10">
            After making the eastern passages, again the southern ones are created.
        </p>

        <IllustrativeImageComponent image={secondRowSouthernPassagesImg} height="30vh"
                                    alt={'Eller Algorithm Image'}/>

        <p className="pt-10 pb-10">
            Then the whole process with making the eastern and southern passages repeats until it reaches the last row.
            For this one we need to update the condition for making the eastern passages. If the cells are in the
            same group the wall is left, otherwise the passage must be created. We no longer check the random chance for
            that. Also we skip the step with making the southern passages as there are no more nodes on the south.
        </p>

        <IllustrativeImageComponent image={lastRowImg} height="30vh"
                                    alt={'Eller Algorithm Image'}/>

        <p className="pt-10 pb-10">
            Finishing last iteration of making eastern passages results with complete maze.
        </p>

        <IllustrativeImageComponent image={completedMazeImg} height="30vh"
                                    alt={'Eller Algorithm Image'}/>
    </>
}