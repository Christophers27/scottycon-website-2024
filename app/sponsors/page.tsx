import React from "react";

import SponsorCard from "@/components/sponsorCard";

// Define static data in a list. For the actual thing, put it in lib/data.ts and import it here.
const sponsors = [
  {
    name: "Sponsor 1",
    logo: "/sponsors/sponsorDefault.png",
    website: "https://www.google.com",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    tier: "gold",
  },
  {
    name: "Sponsor 2",
    logo: "/sponsors/sponsorDefault.png",
    website: "https://www.google.com",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    tier: "gold",
  },
  {
    name: "Sponsor 3",
    logo: "/sponsors/sponsorDefault.png",
    website: "https://www.google.com",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    tier: "silver",
  },
  {
    name: "Sponsor 4",
    logo: "/sponsors/sponsorDefault.png",
    website: "https://www.google.com",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    tier: "silver",
  },
  {
    name: "Sponsor 5",
    logo: "/sponsors/sponsorDefault.png",
    website: "https://www.google.com",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    tier: "bronze",
  },
  {
    name: "Sponsor 6",
    logo: "/sponsors/sponsorDefault.png",
    website: "https://www.google.com",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    tier: "bronze",
  },
];

const tierOrder = ["gold", "silver", "bronze"];
const tierTitles: Record<string, string> = {
  gold: "Gold Sponsors",
  silver: "Silver Sponsors",
  bronze: "Bronze Sponsors",
};

export default function SponsorsPage() {
  return (
    // The main container for the page has the "page" class for consistent styling. It's a custom class I defined in globals.css, which has common styles for all pages. Same case for "section", and "animate-fadeIn"
    <main className="page"> 
      {/* Intro Section */}
      <section className="section mb-8 text-center animate-fadeIn"> 
        <h1 className="section-title">Thank You to Our Sponsors</h1>
        <p className="text-gray-700">
          Our event wouldn't be possible without the generous support of our
          sponsors. Their contributions help us bring the community together and
          create an amazing experience for everyone. 💖
        </p>
      </section>

      {/* Tiered Sponsors */}
      {/* Here, you surround typescript expressions with curly braces. Below, I define a function that takes in a "tier", does some logic, and outputs a HTML section for that tier, programmatically adding the HTML to the page. There's a simpler example in footer.tsx. You just need to output HTML components to do smth like this */}
      {tierOrder.map((tier) => {
        const tierSponsors = sponsors.filter((s) => s.tier === tier);
        if (tierSponsors.length === 0) return null;

        return (
          <section key={tier} className="section mb-8 animate-slideUp">
            <h2 className="text-xl font-bold mb-4 text-center">
              {tierTitles[tier]} {/* Notice how this typescript expression is equal to a string, which you can directly use in this HTML area */}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit, minmax(200px, 1fr))] gap-6">
              {tierSponsors.map((sponsor, i) => (
                <SponsorCard key={sponsor.name} {...sponsor} index={i} />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
