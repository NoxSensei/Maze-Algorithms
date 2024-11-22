import AlgorithmInfoMenuLayout from "@/app/algorithms/depth-first-search/algorithm-info-menu.layout";

export default function DepthFirstSearchAlgorithmLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (<AlgorithmInfoMenuLayout>
        {children}
    </AlgorithmInfoMenuLayout>)
}