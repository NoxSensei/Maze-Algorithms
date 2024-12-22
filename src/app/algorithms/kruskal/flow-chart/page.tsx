'use client'

import MermaidDiagram from "@/_common/components/mermaid-diagram";

const diagram = `flowchart TD
    START([Start]) --> SET_GRID_SIZE[/Set grid size/]
    SET_GRID_SIZE --> INITIALIZE_GRID[Initialize grid with all walls placed]
    INITIALIZE_GRID --> GENERATE_UNIQUE_GROUP_IDS[Generate unique group id for each node]
    GENERATE_UNIQUE_GROUP_IDS --> LIST_ALL_WALLS[Prepare list of all internal walls]
    LIST_ALL_WALLS --> ARE_ALL_WALLS_PROCESSED
    
    ARE_ALL_WALLS_PROCESSED[Are all walls processed?]
    ARE_ALL_WALLS_PROCESSED -- Yes -->  OUTPUT_GRID[/Return grid/]
    ARE_ALL_WALLS_PROCESSED -- No --> SELECT_RANDOM_WALL[Select next unprocessed internal wall at random]
    
    OUTPUT_GRID --> END([End])
    
    SELECT_RANDOM_WALL --> ARE_IN_THE_SAME_GROUP
    ARE_IN_THE_SAME_GROUP{Are nodes at both sides of the wall \n in the same group?}
    ARE_IN_THE_SAME_GROUP -- Yes --> ARE_ALL_WALLS_PROCESSED
    ARE_IN_THE_SAME_GROUP -- No --> REMOVE_WALL[Remove wall]
    
    REMOVE_WALL --> ASSIGN_TO_THE_SAME_GROUP[Assign all nodes from the first node's group \n to the second node's group]
    
    ASSIGN_TO_THE_SAME_GROUP --> ARE_ALL_WALLS_PROCESSED
`;

export default function KruskalAlgorithmFlowChartPage() {
    return <MermaidDiagram chart={diagram}/>;
}