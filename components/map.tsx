import Image from "next/image";
import React from "react";

export default function Map() {
  return (
    <section className="bg-scottycon-background rounded-xl p-4 m-4 text-scottycon-text max-w-[50rem] border border-slate-400">
      <h1 className="font-semibold text-2xl text-center">Map</h1>

      <Image
        src="/floor1.png"
        alt="Floor 1 map"
        width={0}
        height={0}
        sizes="100vw"
        className="w-fit h-auto"
      />
    </section>
  );
}
