import {faHouse} from "@fortawesome/free-solid-svg-icons";
import MenuTextButtonComponent from "@/app/_components/menu-text-button.component";
import MenuIconButtonComponent from "@/app/_components/menu-icon-button.component";

export function AlgorithmSelectionMenuComponent() {
    return (
        <nav className="flex flex-col pl-5 pr-5 gap-5">
            <span className="pt-5">
                <MenuIconButtonComponent href="/" icon={faHouse}/>
            </span>

            <MenuTextButtonComponent href="/algorithms/depth-first-search" text="Depth First Search"/>
            <MenuTextButtonComponent href="/algorithms/eller" text="Eller"/>
            <MenuTextButtonComponent href="/algorithms/prim" text="Prim"/>
            <MenuTextButtonComponent href="/algorithms/kruskal" text="Kruskal"/>
            <MenuTextButtonComponent href="/algorithms/hunt-and-kill" text="Hunt And Kill"/>
        </nav>
    )
}
