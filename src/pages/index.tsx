import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { FC } from "react";
import TypeWriter from "typewriter-effect";
import Footer from "../common/Footer";
import NavBar from "../common/NavBar";
import SocmedLink from "../common/SocmedLink";
import { client } from "../core/contentful";
import { usePageData } from "../core/pageData";
import { IndexPageData } from "../types";

export const getStaticProps: GetStaticProps = async () => {
  const heroEntry = await client.getEntry<any>("7BmWV2UKCoc9iwaPWzWanE");
  return {
    props: {
      data: {
        hero: {
          ...heroEntry.fields,
          seo: heroEntry.fields.seo.fields,
          socmedLinks: heroEntry.fields.socmedLinks.map(
            (item: any) => item.fields
          ),
        },
      },
    },
    revalidate: 10,
  };
};

const Home: NextPage = () => {
  const { hero } = usePageData<IndexPageData>();
  return (
    <>
      <Head>
        <title>{hero.seo.title}</title>
        <meta name="description" content={hero.seo.description} />
      </Head>
      <NavBar />
      <Hero />
      <Footer />
    </>
  );
};

const Hero = () => {
  const { hero } = usePageData<IndexPageData>();
  return (
    <section
      className="min-h-screen flex items-center justify-center"
      id="hero"
    >
      <div className="max-w-screen-md text-center px-4">
        <HeroHeading titlePrefix={hero.titlePrefix} titles={hero.titles} />
        <p className="font-medium text-lg md:text-xl">{hero.description}</p>
        <div className="flex gap-x-4 justify-center my-4">
          {hero.socmedLinks.map((item) => (
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
  return (
    <h1
      className={classNames(
        "text-white hover:text-primary group",
        "font-extrabold text-[2rem] md:text-5xl mb-8 duration-1000 tracking-wide select-none leading-snug"
      )}
    >
      <TypeWriter
        onInit={(typewriter) => {
          typewriter.pauseFor(200).typeString(titlePrefix).start();
          setInterval(() => {
            const elements = document.querySelectorAll(".type-title");
            if (elements.length > 1) {
              elements.forEach((e, id) => {
                if (id < elements.length - 1) e.remove();
              });
            }
            titles.forEach((title) => {
              const text = `<span class="text-primary group-hover:text-white duration-1000 type-title">${title}</span>`;
              typewriter
                .typeString(text)
                .pauseFor(400)
                .deleteChars(title.length)
                .pauseFor(100);
            });
          }, 100);
        }}
        options={{
          cursorClassName: "Typewriter__cursor font-normal text-white",
        }}
      />
    </h1>
  );
};

export default Home;
