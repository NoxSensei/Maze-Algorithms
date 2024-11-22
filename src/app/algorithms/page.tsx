import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function AlgorithmsPage() {
    const {push} = useRouter();

    useEffect(() => {
        push('/');
    }, [push]);

    return <></>;
}
