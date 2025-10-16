import InputSearch from "./components/InputSearch";

export default function Page() {
    return (
        <main className="h-full flex flex-col">
            <header>
            </header>
            <div className="flex-1 w-full flex justify-center">
                <div className="relative w-full md:max-w-4xl xl:max-w-5xl h-full">
                    <InputSearch/>
                </div>
                
            </div>
        </main>
    )
}