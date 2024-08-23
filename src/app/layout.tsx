import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Link from "next/link";
import AlgorithmSelectionMenuLayout from "@/app/_layouts/algorithm-selection-menu.layout";
import AlgorithmInfoMenuLayout from "@/app/algorithms/(children)/depth-first-search/algorithm-info-menu.layout";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Maze Algorithms",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <AlgorithmSelectionMenuLayout>
            {children}
        </AlgorithmSelectionMenuLayout>
        </body>
        </html>
    );
}
