'use client'

import Link from "next/link";
import React from "react";
import {usePathname} from "next/navigation";

function RenderInfoMenuItemsComponent({itemsTitles, pathPrefix}: {
    itemsTitles: string[];
    pathPrefix: string;
}) {
    return itemsTitles.map(itemTitle => {
        const itemPath = itemTitle.toLowerCase().replaceAll(' ', '-')
        return <Link className="hover:bg-zinc-700 hover:rounded-lg pt-1 pb-1 pl-2 pr-2" href={`${pathPrefix}/${itemPath}`} key={itemTitle}>
            {itemTitle}
        </Link>
    })
}

export default function DepthFirstSearchAlgorithmLayout({children}: Readonly<{ children: React.ReactNode }>) {
    const currentPath = usePathname();
    const pathPrefix = currentPath.split('/').slice(0, 3).join('/');

    return (<div className="flex flex-col h-full">
        <div className="sticky h-10 top-0 bg-gradient-to-r from-zinc-800 from-1% to-zinc-700">
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