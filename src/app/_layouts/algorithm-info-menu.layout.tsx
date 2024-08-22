export default function AlgorithmInfoMenuLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (<div className="flex flex-col h-full">
        <div className="flex bg-black h-10 sticky top-0">
            Test
        </div>
        <div className="flex-1 overflow-hidden">
            {children}
        </div>
    </div>)
}