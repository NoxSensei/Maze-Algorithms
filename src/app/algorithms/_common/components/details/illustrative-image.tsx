import Image from "next/image";

export interface IllustrativeImageComponentProps {
    image: unknown;
    alt: string;
    height: string;
}

export default function IllustrativeImageComponent(props: IllustrativeImageComponentProps) {
    return <div className="flex justify-center">
        <div style={{height: props.height, aspectRatio: "1/1"}}>
            <Image
                src={props.image as string}
                style={{
                    backgroundColor: 'black',
                }}
                alt={props.alt}/>
        </div>
    </div>
}
