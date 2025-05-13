'use client'
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const ButtonSwitch = () => {
    const [locale, setLocale] = useState<string>("")
    const router = useRouter();

    useEffect(() => {
        const cookieLocale = document.cookie
        .split("; ")
        .find((row) => row.startsWith("MYNEXTAPP_LOCALE="))
        ?.split("=")[1];
        if(cookieLocale){
            setLocale(cookieLocale);
        } else {
            const browserLocale = navigator.language.slice(0, 2);
            setLocale(browserLocale);
            document.cookie = `MYNEXTAPP_LOCALE=${browserLocale};`;
            router.refresh();
        }
    },[router]);

    const changeLocale = (newLocale: string) => {
        setLocale(newLocale);
        document.cookie = `MYNEXTAPP_LOCALE=${newLocale};`
        router.refresh();
    }

    return (
        <>
            <Button
                onClick={() => changeLocale("th")}
                className={`border p-2 font-bold hover:text-white ${
                    locale === "th" && "bg-white text-black"
                }`}
            >TH</Button>
            <Button
                onClick={() => changeLocale("en")}
                className={`border p-2 font-bold hover:text-white ${
                    locale === "en" && "bg-white text-black"
                }`}
            >EN</Button>
        </>
    )
}

export default ButtonSwitch;