import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse} from "@fortawesome/free-solid-svg-icons";

export function AlgorithmSelectionMenuComponent() {
    return (
        <nav className="flex flex-col pl-5 pr-5 text-white gap-5">
            <div className="pt-5 pb-5">
                <Link href="/">
                    <FontAwesomeIcon icon={faHouse} className="p-2 w-16 hover:bg-zinc-700 hover:rounded-lg"/>
                </Link>
            </div>

            <Link className="hover:bg-zinc-700 hover:rounded-lg pt-1 pb-1 pl-2 pr-2"
                  href="/algorithms/depth-first-search">Depth First Search</Link>
            <Link className="hover:bg-zinc-700 hover:rounded-lg pt-1 pb-1 pl-2 pr-2"
                  href="/algorithms/eller">Eller</Link>
            <Link className="hover:bg-zinc-700 hover:rounded-lg pt-1 pb-1 pl-2 pr-2"
                  href="/algorithms/prim">Prim</Link>
            <Link className="hover:bg-zinc-700 hover:rounded-lg pt-1 pb-1 pl-2 pr-2"
                  href="/algorithms/kruskal">Kruskal</Link>
            <Link className="hover:bg-zinc-700 hover:rounded-lg pt-1 pb-1 pl-2 pr-2"
                  href="/algorithms/hunt-and-kill">Hunt And Kill</Link>
        </nav>
    )
}
