import React from "react";

export default function SectionHeader({ children } : { children: React.ReactNode}) {
  return <h1 className="font-semibold text-2xl text-center">{children}</h1>;
}
