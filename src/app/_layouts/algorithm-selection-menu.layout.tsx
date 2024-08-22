import Link from "next/link";

export default function AlgorithmSelectionMenuLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (<div className="grid grid-cols-8">
        <div className="col-span-1 bg-black overflow-y-auto">
            <nav className="flex flex-col pt-5 pl-5">
                <Link href="/algorithms/depth-first-search">Depth First Search</Link>
                <Link href="/algorithms/prim">Prim</Link>
                <Link href="/algorithms/kruskal">Kruskal</Link>
                <Link href="/algorithms/hunt-and-kill">Hunt And Kill</Link>
            </nav>
        </div>
        <div className="col-span-7 overflow-auto">
            {children}
        </div>
    </div>)
}