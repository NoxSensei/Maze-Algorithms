import MazeDetailsLayout from "@/app/algorithms/_common/layouts/detils/maze-details.tsc";
import complexExampleImg from "../../../../../public/mazes/eller/complex-example.png";

export default function EllerAlgorithmDetailsLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return <MazeDetailsLayout title={"Eller"} complexMazeExample={complexExampleImg}>
        {children}
    </MazeDetailsLayout>
}