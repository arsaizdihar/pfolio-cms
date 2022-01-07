import classNames from "classnames";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import TypeWriter from "typewriter-effect";
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
    </>
  );
};

const Hero = () => {
  const { hero } = usePageData<IndexPageData>();
  const [titlePrimary, setTitlePrimary] = useState(false);
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-md text-center">
        <h1
          className={classNames(
            titlePrimary
              ? "text-primary hover:text-white"
              : "text-white hover:text-primary",
            "font-extrabold text-5xl mb-8 duration-1000 tracking-wide select-none"
          )}
        >
          <TypeWriter
            onInit={(typewriter) =>
              typewriter
                .pauseFor(200)
                .typeString(hero.title)
                .callFunction(() => setTitlePrimary(true))
                .start()
            }
            options={{
              cursorClassName: "Typewriter__cursor font-normal text-white",
            }}
          />
        </h1>
        <p className="font-medium text-xl">{hero.description}</p>
        <div className="flex gap-x-2 justify-center my-4">
          {hero.socmedLinks.map((item) => (
            <SocmedLink key={item.iconKey} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;