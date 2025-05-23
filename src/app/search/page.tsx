import InputSearch from "./components/InputSearch";
import Resent from "./components/Resent";

export default function Page() {
    return (
        <main className="w-full">
            <header>
            </header>
            <div className="w-full py-0 px-0 flex flex-col items-center">
                <h1 className="text-2xl font-semibold text-center mb-6 bg-gradient-to-r from-[#EC221F] via-[#9053A1] to-[#4D77FF] bg-clip-text text-transparent">
                    สวัสดี :D ให้ฉันช่วยอะไรคุณดี?
                </h1>
                <InputSearch/>
                <Resent/>
            </div>
        </main>
    )
}