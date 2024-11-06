import SectionHeader from "@/components/sectionHeader";
import React from "react";
import Image from "next/image";

export default function MapPage() {
  return (
    <div className="flex flex-col flex-1 bg-scottycon-background rounded-t-xl p-8 text-scottycon-text items-center">
      <SectionHeader>Map</SectionHeader>
      <div className="bg-scottycon-foreground rounded-xl my-8 sm:max-w-[50rem]">
        <h2 className="text-center text-2xl font-semibold py-4">Floor 1</h2>
        <Image
          src="/images/floor1.png"
          alt="Floor 1 map"
          width={0}
          height={0}
          quality={100}
          sizes="100vw"
          className="w-fit h-auto"
        />
      </div>
      <div className="bg-scottycon-foreground rounded-xl my-8 sm:max-w-[50rem]">
        <h2 className="text-center text-2xl font-semibold py-4">Floor 2</h2>
        <Image
          src="/images/floor2.png"
          alt="Floor 2 map"
          width={0}
          height={0}
          sizes="100vw"
          className="w-fit h-auto"
        />
      </div>
    </div>
  );
}
