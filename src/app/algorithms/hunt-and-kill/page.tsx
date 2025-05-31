'use client'

import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function HuntAndKillAlgorithmPage() {
    const {push} = useRouter();

    useEffect(() => {
        push('/algorithms/hunt-and-kill/details');
    });

    return <></>;
}