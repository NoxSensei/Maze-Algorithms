import MazeDetailsLayout from "@/app/algorithms/_common/layouts/detils/maze-details.tsc";
import complexExampleImg from "../../../../../public/mazes/prim/complex-example.png";

export default function PrimAlgorithmDetailsLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return <MazeDetailsLayout title={"Prim"} complexMazeExample={complexExampleImg}>
        {children}
    </MazeDetailsLayout>
}