'use client'

import MermaidDiagram from "@/_common/components/mermaid-diagram";

const diagram = `flowchart TD
    START([Start]) --> SET_GRID_SIZE[/Set grid size/]
    SET_GRID_SIZE --> INITIALIZE_GRID[Initialize grid with all walls placed]
    INITIALIZE_GRID --> INITIALIZE_FRONTIERS[Initialize empty list of frontier cells]
    INITIALIZE_FRONTIERS --> SELECT_RANDOM_CELL[Select random grid's cell]
    SELECT_RANDOM_CELL --> ADD_AS_FRONTIER[Add cell to the frontiers list]
    
    ADD_AS_FRONTIER --> IS_FRONTIERS_LIST_EMPTY{Is frontiers list empty?}
    IS_FRONTIERS_LIST_EMPTY -- Yes --> OUTPUT_GRID[/Return grid/]
    IS_FRONTIERS_LIST_EMPTY -- No --> POP_RANDOM_CELL[Get and remove random cell from frontiers list]
    
    POP_RANDOM_CELL --> MARK_AS_VISITED[Mark cell as visited]
   
    MARK_AS_VISITED --> GET_NEIGHBOURS[Get cell's neighbours]
    GET_NEIGHBOURS --> ADD_FRONTIERS[Add non visited neighbours to the frontiers list - \n skip addition if the node is already present in the frontiers list]
    
    ADD_FRONTIERS --> IS_FIRST_ITERATION{Is first algorithm's iteration?}
    IS_FIRST_ITERATION -- Yes --> IS_FRONTIERS_LIST_EMPTY
    IS_FIRST_ITERATION -- No --> SELECT_RANDOM_VISITED[Select current cell's already visited neighbour at random]
    
    SELECT_RANDOM_VISITED --> REMOVE_WALL[Remove wall between current cell and randomly selected neighbour]
    REMOVE_WALL --> IS_FRONTIERS_LIST_EMPTY
        
    OUTPUT_GRID --> END([End])
`;

export default function PrimAlgorithmFlowChartPage() {
    return <MermaidDiagram chart={diagram}/>;
}