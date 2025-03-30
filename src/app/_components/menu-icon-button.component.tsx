import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

export default function MenuIconButtonComponent(props: { href: string; icon: IconDefinition; }) {
    return (
        <Link href={props.href}>
            <FontAwesomeIcon icon={props.icon} className="text-white p-2 h-16 hover:bg-zinc-700 hover:rounded-lg"
                             style={{boxSizing: 'border-box'}}/>
        </Link>
    )
}