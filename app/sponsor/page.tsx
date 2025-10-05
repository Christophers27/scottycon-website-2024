import React from "react";
import ImageBox from "@/components/ImageBox";
import duck1 from "./assets/rubberDuckDreams_orange.jpeg";
import duck2 from "./assets/rubberDuckDreams_blue.png";
import notduck from "./assets/AngstyAhh.png";

export default function Sponsors() {
  const imageData = [
    {
      id: 1,
      src: duck1,
      alt: "sample_image 1 ",
      caption: "rubber duck company 1",
      description: "this company does this",
    },
    {
      id: 2,
      src: duck2,
      alt: "sample.image 2 all ts is my art bc im a self glazer",
      caption: "rubber duck company 2 ",
      description: "this company does this",
    },
    {
      id: 3,
      src: notduck,
      alt: "sample image 3",
      caption: "company 3",
      description: "this company does this",
    },
  ];
  return (
    <main className="page gap-8">
      <section className="section">
        <h1 className="section-title">Sponsors and Affiliates</h1>
        <p className="flex text-center">
          These are our sponsors / affiliates this year, these people are so
          cool, etc etc, thank u very much for sponsoring and affiliating with
          us, etc etc
        </p>
      </section>

      <section className="section">
        <div>
          <h1 className="section-title">2025</h1>
          <hr></hr>
          <br></br>
        </div>
        <ul className="flex flex-col items-center justify-center gap-8">
          {imageData.map((item) => (
            <ImageBox
              key={item.id}
              imagePath={item.src} // must match StaticImageData
              alt={item.alt}
              caption={item.caption}
              description={item.description}
            />
          ))}
        </ul>
        <br></br>
      </section>

      <section className="section">
        <div>
          <h1 className="section-title">2024</h1>
        </div>
        <hr></hr>
        <br></br>
        <ul className="flex flex-col items-center justify-center gap-8">
          {imageData.map((item) => (
            <ImageBox
              key={item.id}
              imagePath={item.src} // must match StaticImageData
              alt={item.alt}
              caption={item.caption}
              description={item.description}
            />
          ))}
        </ul>
        <br></br>
      </section>
    </main>
  );
}
