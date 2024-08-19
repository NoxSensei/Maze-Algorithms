'use client'

import DepthFirstSearchAlgorithmCanvasComponent
    from "@/app/algorithms/depth-first-search/depth-first-search-canvas.component";
import MermaidDiagram from "@/app/algorithms/_components/mermaid-diagram";

const diagram = `flowchart TD
    A[Start] --> B[Select random cell and mark it as visited]
    B --> C[Visit all of the neighbours in random order]
    C --> D{Is the neighbour in the given direction?}
    D -- Yes --> E{Has the neighbour been visited?}
    D -- No --> C
    E -- Yes --> C
    E -- No --> F[Add passage from source cell to the neighbour]
    F --> G[Call the backtracer algorithm for the current cell]
    G --> C
`;

export default function DepthFirstSearchAlgorithmPage() {
    return (
        <div
            style={{
                padding: '50px',
                color: "black",
            }}>
            <div className='text-2xl text-center pb-3'>Depth First Search</div>
            <div>
                Given algorithm starts with grid having all of the walls placed.
                Then it uses the recursive backtracking to create paths
                by destroying specific walls until every room has been visited.
                This method requires creating helper <i>set</i> dedicated for storing information about all rooms that
                have been visited.
            </div>
            <div className="columns-2 pt-10">
                <div>
                    <div className='text-xl text-center pb-2 pt-10'>
                        Algorithm
                    </div>
                    <ol className="list-decimal">
                        <li>
                            Select random cell and mark it as visited
                        </li>
                        <li>
                            Visit all of the neighbours in the random order
                        </li>
                        <ol className="list-decimal list-inside">
                            <li>
                                {"Skip if there is no neighbour in the given direction (current cell is located on the grid's border)"}
                            </li>
                            <li>
                                Skip if the given neighbour was visited
                            </li>
                            <li>
                                Add passage from the source cell to the neighbour
                            </li>
                            <li>
                                Call the backtracer algorithm for the current cell
                            </li>
                        </ol>
                    </ol>
                </div>
                {MermaidDiagram(diagram)}
            </div>
            <div className='text-xl text-center pb-2 pt-10'>
                Creator
            </div>
            <div className="flex justify-center flex-col">
                <DepthFirstSearchAlgorithmCanvasComponent dimension={10}/>
            </div>
        </div>
    );
}