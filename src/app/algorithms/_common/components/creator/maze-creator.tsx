import dynamic from "next/dynamic";

// We need to make this component dynamic in order to properly initialize the Konva library
export const MazeCreatorComponent = dynamic(() => import("./maze-creator-static"), {
    ssr: false,
});