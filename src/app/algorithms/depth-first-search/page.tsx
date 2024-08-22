'use client'

import DepthFirstSearchAlgorithmCanvasComponent
    from "@/app/algorithms/depth-first-search/depth-first-search-canvas.component";
import MermaidDiagram from "@/app/algorithms/_components/mermaid-diagram";
import DepthFirstSearchDescriptionComponent from "@/app/algorithms/depth-first-search/description.component";

const diagram = `flowchart TD
    START([Start]) --> SET_GRID_SIZE[/Set grid size/]
    SET_GRID_SIZE --> INITIALIZE_GRID[Initialize grid with all walls placed]
    INITIALIZE_GRID --> SELECT_RANDOM_CELL[Select random grid's cell]
    SELECT_RANDOM_CELL --> MARK_AS_VISITED[Mark cell as visited]
    MARK_AS_VISITED --> SHUFFLE_NEIGHBOURS[Get all neighbouring cells in random order]
    SHUFFLE_NEIGHBOURS --> ALL_NEIGHBOURS_VISITED{All neighbouring<br> cells checked?}
    ALL_NEIGHBOURS_VISITED -- Yes --> ALL_PATHS_RESOLVED{All paths resolved?}
    ALL_NEIGHBOURS_VISITED -- No --> SELECT_NEIGHBOUR[Select next neighbouring cell]
    SELECT_NEIGHBOUR --> NEIGHBOUR_OUT_OF_GRID{Is the cell<br> out of grid?}
    NEIGHBOUR_OUT_OF_GRID -- Yes --> ALL_NEIGHBOURS_VISITED
    NEIGHBOUR_OUT_OF_GRID -- No --> NEIGHBOUR_VISITED{Has the cell<br> been visited?}
    NEIGHBOUR_VISITED -- Yes --> ALL_NEIGHBOURS_VISITED
    NEIGHBOUR_VISITED -- No --> ADD_PASSAGE[Add passage from source cell to the neighbour]
    ADD_PASSAGE --> MARK_AS_CURRENT[Mark neighbour as current cell]
    MARK_AS_CURRENT --> MARK_AS_VISITED
    ALL_PATHS_RESOLVED -- Yes --> OUTPUT_GRID[/Return grid/]
    OUTPUT_GRID --> END([End])
    ALL_PATHS_RESOLVED -- No --> BACKTRACE[Go back to unresolved path]
    BACKTRACE --> SELECT_NEIGHBOUR
`;

export default function DepthFirstSearchAlgorithmPage() {
    return (
        <div
            style={{
                padding: '50px',
                color: "black",
            }}>
            <div className='text-2xl text-center pb-3'>Depth First Search</div>
            <div className="grid grid-cols-2 pt-10">
                <DepthFirstSearchDescriptionComponent/>
                <div className="pt-5">
                    {/* TODO use static image */}
                    <DepthFirstSearchAlgorithmCanvasComponent dimension={10}/>
                </div>
            </div>
            <div className='text-xl text-center pb-2 pt-10'>
                Flow Chart
            </div>
            <MermaidDiagram chart={diagram}/>
            <div className='text-xl text-center pb-2 pt-10'>
                Creator
            </div>
            <div className="flex justify-center flex-col">
                <DepthFirstSearchAlgorithmCanvasComponent dimension={10}/>
            </div>
        </div>
    );
}