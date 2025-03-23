'use client'

import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function PrimAlgorithmPage() {
    const {push} = useRouter();

    useEffect(() => {
        push('/algorithms/prim/details');
    });

    return <></>;
}