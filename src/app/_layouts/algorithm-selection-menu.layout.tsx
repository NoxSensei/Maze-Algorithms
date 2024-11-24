import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse} from "@fortawesome/free-solid-svg-icons";

export default function AlgorithmSelectionMenuLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (<div className="grid grid-cols-8">
        <div className="col-span-1 bg-zinc-800 overflow-y-auto">
            <nav className="flex flex-col pt-5 pl-5 text-white">
                <Link href="/" className="h-10">
                    <FontAwesomeIcon icon={faHouse} className="h-full"/>
                </Link>
                <Link href="/algorithms/depth-first-search">Depth First Search</Link>
                <Link href="/algorithms/eller">Eller</Link>
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