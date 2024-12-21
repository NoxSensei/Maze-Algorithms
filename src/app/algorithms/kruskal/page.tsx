'use client'

import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function KruskalAlgorithmPage() {
    const {push} = useRouter();

    useEffect(() => {
        push('/algorithms/kruskal/details');
    });

    return <></>;
}