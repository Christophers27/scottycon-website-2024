import React from "react";
import RaffleScanner from "@/components/raffleScanner";

export default async function RafflePage() {

  return (
    <main className="page">
      <section className="section flex flex-col">
        <div className="flex-none">
          <h1 className="section-title">Raffle</h1>
        </div>
        <RaffleScanner></RaffleScanner>
      </section>
    </main>
  );
}
