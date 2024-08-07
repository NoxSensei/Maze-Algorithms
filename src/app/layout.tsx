import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maze Algorithms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <div className="grid grid-cols-8">
      <div className="col-span-1 bg-black">
        <nav className="flex flex-col">
          <Link href="/algorithms/depth-first-search">Depth First Search</Link>
          <Link href="/algorithms/prim">Prim</Link>
          <Link href="/algorithms/kruskal">Kruskal</Link>
          <Link href="/algorithms/hunt-and-kill">Hunt And Kill</Link>
        </nav>
      </div>
      <div className="col-span-7">
        {children}
      </div>
    </div>
    </body>
    </html>
  );
}
