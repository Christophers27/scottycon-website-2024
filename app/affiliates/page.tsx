type ProfileProps = {
  name: string;
  image: string;
  desc?: string;
  link?: string;
};

function AffiliateProfile({name, image, desc, link}: ProfileProps) {
  const img_path = `/affiliate_imgs/${image}`;
  return (
    <div className="flex flex-col items-center w-1/4 max-w-xs">
      <a href={link} target="_blank">
        <img src={img_path} alt={name} className="object-cover rounded-full h-32 w-32 border-3 border-solid sakura-hover"/>
      </a>
      <a href={link} target="_blank">
        <p className="text-center"><b>{name}</b></p>
      </a>
      <p className="text-center">{desc}</p>
    </div>
  );
}

function SponsorProfile({name, image, desc, link}: ProfileProps) {
  const img_path = `/affiliate_imgs/${image}`;
  return (
    <div className="flex flex-col items-center w-1/4 max-w-xs">
      <a href={link} target="_blank">
        <div className="shiny">
          <img src={img_path} alt={name} className="object-cover rounded-full h-32 w-32 border-3 border-solid hover:border-yellow-400"/>
        </div>
      </a>
      <a href={link} target="_blank">
        <p className="text-center"><b>{name}</b></p>
      </a>
      <p className="text-center">{desc}</p>
    </div>
  );
}

export default function Affiliates() {
  return (
    <main className="page gap-8">
      <section className="section">
        <h1 className="section-title">Thank You to Our Affiliates!</h1>
        <p className="text-center">
          We thank our affiliates and guest stars for dedicating their time and 
          talent to making ScottyCon as enjoyable and memorable as possible! We 
          couldn&apos;t have done it without you!
        </p>
        <br></br>
        <section className="flex flex-wrap justify-center gap-12">
            <AffiliateProfile name="Miku" image="miku.jpg" desc="Singing Miku Miku."/>
            <AffiliateProfile name="Leek Girl" image="miku.jpg" desc="Singing Oo Ee Oo."/>
            <AffiliateProfile name="Blue Teto" image="miku.jpg" desc="Singing Miku Miku."/>
            <AffiliateProfile name="Cyan Neru" image="miku.jpg" desc="Singing Oo Ee Oo." link="https://www.youtube.com/shorts/2oa5WCUpwD8"/>
        </section>
      </section>
      <section className="section">
        <h1 className="section-title">Thank You to Our Sponsors!</h1>
        <p className="text-center">
          We thank our sponsors for making ScottyCon possible through their
          generosity!
        </p>
        <br></br>
        <section className="flex flex-wrap justify-center gap-12">
          <SponsorProfile name="Kaguya" image="kaguya.jpg" desc="Incredibly rich." link="https://myanimelist.net/anime/37999/Kaguya-sama_wa_Kokurasetai__Tensai-tachi_no_Renai_Zunousen"/>
          <SponsorProfile name="Kaguya 2" image="kaguya.jpg" desc="Still rich."/>
          <SponsorProfile name="Kaguya Red" image="kaguya.jpg" desc="Red pill."/>
          <SponsorProfile name="Kaguya Blue" image="kaguya.jpg" desc="Blue pill."/>
          <SponsorProfile name="Kaguya :)" image="kaguya.jpg" desc="Love Is War."/>
        </section>
      </section>
    </main>
  );
}