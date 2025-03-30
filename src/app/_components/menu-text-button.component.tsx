import Link from "next/link";

export default function MenuTextButtonComponent(props: { href: string; text: string; }) {
    return (
        <Link className="text-white hover:bg-zinc-700 hover:rounded-lg pt-1 pb-1 pl-2 pr-2"
              href={props.href}>{props.text}</Link>
    )
}
