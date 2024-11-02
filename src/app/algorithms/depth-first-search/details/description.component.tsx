export default function DepthFirstSearchDescriptionComponent() {
    return (<div className="space-y-6 text-justify">
        <p>
            The Depth First Search (DFS) algorithm for maze generation begins by setting up a grid, where
            each cell is surrounded by walls. This grid is defined by its size, which determines the overall
            structure of the maze. Initially, the grid is fully enclosed, with no passages between any of
            the cells, creating a solid block of walls.
        </p>
        <p>
            To start the maze generation, a random cell within this grid is selected. This cell serves as
            the
            starting point for the maze. The algorithm marks this cell as visited, which is essential for
            tracking progress and ensuring that no cell is revisited unnecessarily. The next step involves
            identifying all neighboring cells of the current cell. These neighboring cells are then shuffled
            randomly to introduce unpredictability in the maze’s layout.
        </p>
        <p>
            The algorithm then checks whether all neighboring cells have been processed. If all neighbors
            have
            been checked, the algorithm evaluates whether the entire maze has been fully resolved. If not
            all
            neighboring cells have been checked, the algorithm selects the next neighboring cell and
            determines
            whether this cell lies within the grid’s boundaries. If the selected neighbor is outside the
            grid,
            the algorithm returns to check any remaining neighbors.
        </p>
        <p>
            For neighbors within the grid that haven’t been visited yet, the algorithm removes the wall
            between
            the current cell and the selected neighbor, creating a passage. The neighbor is then marked as
            the
            current cell and subsequently marked as visited, continuing the process of maze creation. This
            process repeats recursively, carving out paths and marking cells until all possible neighbors
            are
            visited and all potential paths are explored.
        </p>
        <p>
            Once all paths have been resolved, the algorithm concludes by returning the fully generated
            maze,
            represented by the grid with the walls removed in the appropriate places to create a connected
            maze.
            If there are any unresolved paths, the algorithm backtracks to previous cells, revisiting them
            to
            ensure that all possible passages have been created. This backtracking continues until every
            path
            has been thoroughly explored and the maze is complete. The final output is a maze where every
            cell
            is accessible, and the entire grid is connected through a series of pathways.
        </p>
    </div>)
}