import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import AlgorithmSelectionMenuLayout from "@/app/_layouts/algorithm-selection-menu.layout";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Maze Algorithms",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body className={`${inter.className} bg-zinc-200 h-full`}>
        <AlgorithmSelectionMenuLayout>
            {children}
        </AlgorithmSelectionMenuLayout>
        </body>
        </html>
    );
}
