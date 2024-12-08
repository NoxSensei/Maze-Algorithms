'use client'

import MermaidDiagram from "@/_common/components/mermaid-diagram";

const diagram = `flowchart TD
    START([Start]) --> SET_GRID_SIZE[/Set grid size/]
    SET_GRID_SIZE --> INITIALIZE_GRID[Initialize grid with all walls placed]
    INITIALIZE_GRID --> SELECT_NEXT_ROW[Select next row]
    SELECT_NEXT_ROW --> GENERATE_UNIQUE_GROUP_IDS[Generate unique group id for each node \n from current row being not assigned to any group]
    
    GENERATE_UNIQUE_GROUP_IDS --> SELECT_NEXT_CELL_FROM_ROW[Select next cell from the row]
    
    SELECT_NEXT_CELL_FROM_ROW --> IS_LAST_CELL
    
    IS_LAST_CELL{Is it the last cell in the row?}
    IS_LAST_CELL -- Yes --> IS_LAST_ROW_2
    IS_LAST_CELL -- No --> IS_EASTERN_NODE_IN_SAME_GROUP
    
    IS_EASTERN_NODE_IN_SAME_GROUP{Is eastern node in the same group \n as current one?}
    IS_EASTERN_NODE_IN_SAME_GROUP -- Yes --> SELECT_NEXT_CELL_FROM_ROW
    IS_EASTERN_NODE_IN_SAME_GROUP -- No --> IS_LAST_ROW_1
    
    IS_LAST_ROW_1{Is it the last row?}
    IS_LAST_ROW_1 -- Yes --> REMOVE_EASTERN_WALL
    IS_LAST_ROW_1 -- No --> SELECT_RANDOMLY
    
    SELECT_RANDOMLY[Select randomly whether event happens with a 50% chance]
    SELECT_RANDOMLY --> IS_RANDOM_CHANCE_MET
    
    IS_RANDOM_CHANCE_MET{Is random chance met?}
    IS_RANDOM_CHANCE_MET -- Yes --> REMOVE_EASTERN_WALL[Remove eastern wall]
    IS_RANDOM_CHANCE_MET -- No --> SELECT_NEXT_CELL_FROM_ROW
    
    REMOVE_EASTERN_WALL --> ASSIGN_EASTERN_NODE[Assign eastern node to the current node's group]
    ASSIGN_EASTERN_NODE --> SELECT_NEXT_CELL_FROM_ROW
    
    IS_LAST_ROW_2{Is it the last row?}
    IS_LAST_ROW_2 -- No --> LIST_ALL_GROUPS[List all defined groups]
    IS_LAST_ROW_2 -- Yes --> END([End])
    
    LIST_ALL_GROUPS --> SELECT_NEXT_GROUP[Select next unprocessed group]
    SELECT_NEXT_GROUP --> SELECT_COUNT_OF_SOUTHERN_PASSAGES[Select randomly number of southern passages \n min: 1 \n max: count of the current group's nodes located in the most recent row]
    
    SELECT_COUNT_OF_SOUTHERN_PASSAGES --> CREATE_SOUTHERN_PASSAGES[Create southern passages for random nodes \n located in the most recent row from current group]
    CREATE_SOUTHERN_PASSAGES --> ASSIGN_SOUTHERN_NODE[Assign freshly connected southern nodes to the current group]
   
    ASSIGN_SOUTHERN_NODE --> ARE_ALL_GROUPS_PROCESSED
    
    ARE_ALL_GROUPS_PROCESSED{Are all groups processed?}
    ARE_ALL_GROUPS_PROCESSED -- Yes --> SELECT_NEXT_ROW
    ARE_ALL_GROUPS_PROCESSED -- No --> SELECT_NEXT_GROUP
`;

export default function EllerAlgorithmFlowChartPage() {
    return <MermaidDiagram chart={diagram}/>;
}