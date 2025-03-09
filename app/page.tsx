import Image from "next/image";
import { socialLinks } from "./config";

export default function Page() {
  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center mb-8">
        <a href={socialLinks.github} target="_blank">
          <Image
            src="/profile.png"
            alt="Profile photo"
            className="rounded-full bg-gray-100 block  mt-0 lg:mb-5 mb-10  items-left sm:float-left sm:mr-5 sm:mb-5 grayscale hover:grayscale-0"
            unoptimized
            width={120}
            height={120}
            priority
          />
        </a>
        <h1 className="mb-2 text-2xl font-bold tracking-tight">
          Hawali Najwan
        </h1>
      </div>

      <div className="prose prose-neutral dark:prose-invert">
        <p>
          314 year old student 📑 based in East Java 🇮🇩 with a passion for technology & graphic design.{" "}
          <a
            target="_blank"
            href="mailto:hi.najwan@gmail.com"
          >
            Email
          </a>{" "}/ <a
            target="_blank"
            href="https://discord.com/users/644892716953632768"
          >Dm</a>{" "}me!
        </p>


        <p>Discord Server{" "}
          <a
            href="https://discord.gg/YfZjqSsVz8"
            target="_blank"
          >
            Kelas-Axem
          </a>{" "}
          &{" "}
          <a href="https://discord.gg/joingtid"
            target="_blank">GTID</a>
        </p>

      </div>
      <hr className="mt-8 border-t border-gray-300 dark:border-gray-700" />

      <div>
      <h1 className="mt-8 mb-2 text-2xl font-bold tracking-tight">
          Latest Video
        </h1>
        <div>
        <iframe 
  style={{ borderRadius: '15px', width: '100%', height: '315px', border: 'none' }} 
  src="https://www.youtube.com/embed/DU2rhb1VoX0?si=Y-RFUhhlT64TT2Qz" 
  title="-" 
  frameBorder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  referrerPolicy="strict-origin-when-cross-origin" 
  allowFullScreen
></iframe>
        </div>
        <h1 className="mt-8 mb-2 text-2xl font-bold tracking-tight">
          Check out my playlist
        </h1>
        <div>
        <iframe
      style={{ borderRadius: '15px', width: '100%', height: '152px', border: 'none' }}
      src="https://open.spotify.com/embed/playlist/0a9wy5iYemx8SkZv2JZffa?utm_source=generator&theme=0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
        </div>

      </div>
    </section>
  );
}
