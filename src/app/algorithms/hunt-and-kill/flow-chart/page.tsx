'use client'

import MermaidDiagram from "@/_common/components/mermaid-diagram";

const diagram = `flowchart TD
    %% Definitions

    START([Start])
    SET_GRID_SIZE[/Define grid size/]
    INIT_GRID[Initialize grid with all walls]
    CHOOSE_START[Choose a random starting cell]

    WALK_PHASE_START[Begin Walk Phase]

    VISIT_CELL[Mark current cell as visited]
    SHUFFLE_DIRS["Shuffle directions (N, S, E, W)"]
    CHECK_NEIGHBOURS{Have all directions<br>been checked?}
    NEXT_DIRECTION[Pick next direction]

    OUT_OF_BOUNDS{Is target cell<br>outside grid?}
    ALREADY_VISITED{Has target cell<br>been visited?}

    CARVE_PASSAGE[Remove wall between current and target cell]
    MOVE_TO_TARGET[Move to target cell]

    HUNT_PHASE_START[Begin Hunt Phase]
    FIND_NEW_START[Find unvisited cell<br>next to a visited one]
    CONNECT_NEW_START[Carve passage<br>to visited neighbor]

    ALL_CELLS_VISITED{Are all cells visited?}
    RETURN_MAZE[/Return final maze/]

    END([End])

    %% Flow

    START --> SET_GRID_SIZE
    SET_GRID_SIZE --> INIT_GRID
    INIT_GRID --> CHOOSE_START
    CHOOSE_START --> WALK_PHASE_START

    WALK_PHASE_START --> VISIT_CELL
    VISIT_CELL --> SHUFFLE_DIRS
    SHUFFLE_DIRS --> CHECK_NEIGHBOURS

    CHECK_NEIGHBOURS -- No --> NEXT_DIRECTION
    NEXT_DIRECTION --> OUT_OF_BOUNDS
    OUT_OF_BOUNDS -- Yes --> CHECK_NEIGHBOURS
    OUT_OF_BOUNDS -- No --> ALREADY_VISITED

    ALREADY_VISITED -- Yes --> CHECK_NEIGHBOURS
    ALREADY_VISITED -- No --> CARVE_PASSAGE
    CARVE_PASSAGE --> MOVE_TO_TARGET
    MOVE_TO_TARGET --> VISIT_CELL

    CHECK_NEIGHBOURS -- Yes --> ALL_CELLS_VISITED

    ALL_CELLS_VISITED -- No --> HUNT_PHASE_START
    HUNT_PHASE_START --> FIND_NEW_START
    FIND_NEW_START --> CONNECT_NEW_START
    CONNECT_NEW_START --> WALK_PHASE_START

    ALL_CELLS_VISITED -- Yes --> RETURN_MAZE
    RETURN_MAZE --> END
`;

export default function HuntAndKillAlgorithmFlowChartPage() {
    return <MermaidDiagram chart={diagram}/>;
}