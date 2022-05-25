import AOS from "aos";
import "aos/dist/aos.css";
import { gql } from "graphql-request";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import Footer from "~/common/Footer";
import NavBar from "~/common/NavBar";
import { usePageData } from "~/core/pageData";
import { request } from "~/core/request";
import Hero from "~/landing/Hero";
import Profile from "~/landing/Profile";
import { LandingPageData } from "../types";

export const getStaticProps: GetStaticProps = async ({ preview }) => {
  const entry = await request<{ landing: LandingPageData }>({
    query: gql`
      query {
        landing {
          titlePrefix
          titles
          description
          socmedLinks {
            name
            link
            iconKey
            color
          }
          profileTitle
          profileName
          profileDescription
          email
          photo {
            url
          }
          seo {
            title
            description
            image {
              url
            }
            twitterCard
          }
        }
      }
    `,
    preview,
  });
  return {
    props: {
      data: entry.landing,
    },
  };
};

const Home: NextPage = () => {
  const data = usePageData<LandingPageData>();

  useEffect(() => {
    AOS.init({
      disable: () => {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      },
      duration: 1200,
      easing: "ease",
    });
  }, []);

  return (
    <>
      <Head>
        <title>{data.seo.title}</title>
        <meta name="description" content={data.seo.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.seo.title} />
        <meta name="twitter:description" content={data.seo.description} />
        <meta name="twitter:image" content={data.seo.image.url} />
        <meta name="og:card" content={data.seo.twitterCard} />
        <meta name="og:title" content={data.seo.title} />
        <meta name="og:description" content={data.seo.description} />
        <meta name="og:image" content={data.seo.image.url} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Hero />
      <Profile />
      <Footer />
    </>
  );
};

export default Home;
