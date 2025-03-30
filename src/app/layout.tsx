import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {AlgorithmSelectionMenuComponent} from "@/app/_components/algorithm-selection-menu.component";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Maze Algorithms",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body className={`${inter.className} bg-zinc-200 h-full`}>
        <div className="grid grid-cols-8">
            <div className="col-span-1 bg-zinc-800 overflow-y-auto">
                <AlgorithmSelectionMenuComponent/>
            </div>
            <div className="col-span-7 overflow-auto">
                {children}
            </div>
        </div>
        </body>
        </html>
    );
}
