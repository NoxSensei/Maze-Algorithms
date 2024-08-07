'use client'

import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {bgBlack} from "next/dist/lib/picocolors";
import Link from "next/link";

export default function HomePage() {
    const {push} = useRouter();

    useEffect(() => {
        push('/algorithms');
    });

    return <></>;
}
