import MazeDetailsLayout from "@/app/algorithms/_common/layouts/detils/maze-details.tsc";
import complexExampleImg from "../../../../../public/mazes/depth-first-search/complex-example.png";

export default function DepthFirstSearchAlgorithmDetailsLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return <MazeDetailsLayout title={"Depth First Search"} complexMazeExample={complexExampleImg}>
        {children}
    </MazeDetailsLayout>
}