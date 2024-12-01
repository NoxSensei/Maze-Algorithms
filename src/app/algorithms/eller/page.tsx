'use client'

import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function EllerAlgorithmPage() {
    const {push} = useRouter();

    useEffect(() => {
        push('/algorithms/eller/details');
    });

    return <></>;
}