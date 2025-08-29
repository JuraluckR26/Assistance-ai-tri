"use client";
import dynamic from "next/dynamic";

const InputSearchNoSSR = dynamic(() => import("./InputSearch"), { ssr: false });

export default function InputSearchClient() {
  return <InputSearchNoSSR />;
}
