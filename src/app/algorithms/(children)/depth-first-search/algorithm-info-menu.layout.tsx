'use client'

import Link from "next/link";
import {usePathname} from 'next/navigation'
import React from "react";

function RenderInfoMenuItemsComponent({itemsTitles, pathPrefix}: {
    itemsTitles: string[];
    pathPrefix: string;
}) {
    return itemsTitles.map(itemTitle => {
        const itemPath = itemTitle.toLowerCase().replaceAll(' ', '-')
        return <Link href={`${pathPrefix}/${itemPath}`}>
            {itemTitle}
        </Link>
    })
}

export default function AlgorithmInfoMenuLayout({children}: Readonly<{ children: React.ReactNode }>) {
    const currentPath = usePathname();
    const pathPrefix = currentPath.split('/').slice(0, 3).join('/');

    return (<div className="flex flex-col h-full">
        <div className="sticky h-10 top-0 bg-black">
            <div className="flex h-full justify-center items-center space-x-5">
                <RenderInfoMenuItemsComponent itemsTitles={["Details", "Flow Chart", "Creator"]}
                                              pathPrefix={pathPrefix}/>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto p-14 h-full">
            {children}
        </div>
    </div>)
}