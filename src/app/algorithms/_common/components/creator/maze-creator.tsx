import dynamic from "next/dynamic";

export const MazeCreatorComponent = dynamic(() => import("./maze-creator-static"), {
    ssr: false,
});