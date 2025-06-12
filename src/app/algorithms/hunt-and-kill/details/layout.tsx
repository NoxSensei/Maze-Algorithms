import MazeDetailsLayout from "@/app/algorithms/_common/layouts/detils/maze-details.tsc";
import complexExampleImg from "../../../../../public/mazes/hunt-and-kill/complex-example.png";

export default function HuntAndKillDetailsLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return <MazeDetailsLayout title={"Hunt And Kill"} complexMazeExample={complexExampleImg}>
        {children}
    </MazeDetailsLayout>
}