import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { FC } from "react";
import TypeWriter from "typewriter-effect";
import SocmedLink from "~/common/SocmedLink";
import { usePageData } from "~/core/pageData";
import { LandingPageData } from "~/types";

const Hero = () => {
  const data = usePageData<LandingPageData>();
  return (
    <section
      className="min-h-screen flex items-center justify-center"
      id="hero"
    >
      <div className="max-w-screen-md text-center px-4">
        <HeroHeading titlePrefix={data.titlePrefix} titles={data.titles} />
        <p className="font-medium text-lg md:text-xl">{data.description}</p>
        <div className="flex gap-x-4 justify-center my-4">
          {data.socmedLinks.map((item) => (
            <SocmedLink key={item.iconKey} {...item} />
          ))}
        </div>
        <div className="relative flex justify-center">
          <a
            className="btn-swipe flex items-center gap-x-2"
            href="mailto:arsadihar@gmail.com"
          >
            <FontAwesomeIcon icon={faEnvelope} className="text-xl relative" />
            <span className="relative">CONTACT ME</span>
          </a>
        </div>
      </div>
    </section>
  );
};

interface HeroHeadingProps {
  titlePrefix: string;
  titles: Array<string>;
}

const HeroHeading: FC<HeroHeadingProps> = ({ titlePrefix, titles }) => {
  const { locale } = useRouter();
  return (
    <h1
      className={classNames(
        "text-white hover:text-primary group",
        "font-extrabold text-[2rem] md:text-5xl mb-8 duration-1000 tracking-wide select-none leading-snug"
      )}
    >
      <TypeWriter
        key={locale}
        onInit={(typewriter) => {
          typewriter.pauseFor(200).typeString(titlePrefix).start();
          titles.forEach((title, idx) => {
            const text = `<span class="text-primary group-hover:text-white duration-1000 type-title">${title}</span>`;
            typewriter.typeString(text).pauseFor(400).deleteChars(title.length);
            if (idx < titles.length - 1) typewriter.pauseFor(100);
          });
        }}
        options={{
          cursorClassName: "Typewriter__cursor font-normal text-white",
          loop: true,
        }}
      />
    </h1>
  );
};

export default Hero;
