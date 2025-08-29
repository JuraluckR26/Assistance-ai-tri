import InputSearchClient from "./components/InputSearchClient";
import Resent from "./components/Resent";

export default function Page() {
    return (
        <main className="w-full px-2">
            <header>
            </header>
            <div className="w-full py-0 px-0 flex flex-col items-center">
                <h1 className="text-lg md:text-2xl lg:text-3xl font-semibold text-center mb-6 bg-gradient-to-r from-[#EC221F] via-[#9053A1] to-[#4D77FF] bg-clip-text text-transparent">
                    สวัสดี :D ให้ฉันช่วยอะไรคุณดี?
                </h1>
                <InputSearchClient/>
                <Resent/>
            </div>
        </main>
    )
}