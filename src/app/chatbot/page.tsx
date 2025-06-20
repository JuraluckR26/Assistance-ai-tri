import InputSearch from "./components/InputSearch";

export default function Page() {
    return (
        <main className="w-full min-h-screen flex justify-center px-2">
            <header>
            </header>
            <div className="w-full py-0 px-0 flex justify-center">
                <div className="relative w-full md:max-w-4xl xl:max-w-5xl">
                    <InputSearch/>
                </div>
                
            </div>
        </main>
    )
}