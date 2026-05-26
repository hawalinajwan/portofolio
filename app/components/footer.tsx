import {
  FaDiscord,
  FaGithub,
  FaInstagram,
} from "react-icons/fa6";
import { TbCup, TbMailFilled } from "react-icons/tb";
import { socialLinks } from "app/config";

const YEAR = new Date().getFullYear();

function SocialLink({ href, icon: Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="footer-hover-link inline-flex h-8 w-8 items-center justify-center rounded-full text-neutral-700 transition-colors dark:text-neutral-300"
    >
      <Icon />
    </a>
  );
}

function SocialLinks() {
  return (
    <div className="float-right flex gap-1.5 text-lg">
      <SocialLink href={socialLinks.github} icon={FaGithub} />
      <SocialLink href={socialLinks.instagram} icon={FaInstagram} />
      <SocialLink href={socialLinks.discord} icon={FaDiscord} />
      <SocialLink href={socialLinks.email} icon={TbMailFilled} />
      <SocialLink href={socialLinks.saweria} icon={TbCup} />
    </div>
  );
}

export default function Footer() {
  return (
    <small className="block lg:mt-24 mt-16 text-[#1C1C1C] dark:text-[#D4D4D4]"> 
      <time>©{YEAR}</time>{" "}
      <a
        className="footer-hover-text relative inline-block no-underline"
        href={socialLinks.github}
        target="_blank"
        rel="noopener noreferrer"
      >
        hawalinajwan
      </a>
      <SocialLinks />
    </small>
  );
}
