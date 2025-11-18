import Image from "next/image";

export default function Page() {
  return (
    <main className="page gap-8">
      <section className="section">
        <h1 className="section-title">All A-BOARD!</h1>
        <h2 className="text-center pb-5">
          <b>Like what you see at ScottyCon and interested in making it even better?</b>
        </h2>
        <p className="text-center pb-5">
            Apply to be a ScottyCon Officer or general board member! 
            Please fill out the Google form below. We will contact board 
            members in April.<br></br>(CMU Students Only)
        </p>
        <a href="https://www.scottycon.com/" target="_blank" className = "text-center text-blue-500"><b>https://www.scottycon.com/</b></a>
        <div className="flex justify-center">
            <Image
                src="/interestboard.png"
                alt="Interest Board"
                width={400}
                height={400}
                sizes="(max-width: 600px) 100vw, 300px"
                priority={false}
            />
        </div>
      </section>
    </main>
  );
}