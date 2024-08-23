'use client'

import MermaidDiagram from "@/app/algorithms/_components/mermaid-diagram";

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

export default function DepthFirstSearchFlowChartPage() {
    return <div className="flex justify-center">
        <div className="w-full max-w-screen-md">
            <MermaidDiagram chart={diagram}/>
        </div>
    </div>
}