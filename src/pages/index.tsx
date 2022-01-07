import AOS from "aos";
import "aos/dist/aos.css";
import { gql } from "graphql-request";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import Footer from "~/common/Footer";
import NavBar from "~/common/NavBar";
import { HERO_ENTRY_ID, PROFILE_ENTRY_ID } from "~/core/constants";
import { request } from "~/core/contentful";
import { usePageData } from "~/core/pageData";
import Hero from "~/landing/Hero";
import Profile from "~/landing/Profile";
import { HeroData, IndexPageData, ProfileData } from "../types";

export const getStaticProps: GetStaticProps = async ({ preview, locale }) => {
  const entry = await request<{ hero: HeroData; profile: ProfileData }>({
    query: gql`
      query ($id: String!, $locale: String, $profileId: String!) {
        hero(id: $id, locale: $locale) {
          titlePrefix
          titles
          description
          seo {
            title
            description
          }
          socmedLinksCollection {
            items {
              name
              link
              iconKey
            }
          }
        }
        profile(id: $profileId, locale: $locale) {
          title
          name
          email
          birthDate
          photo {
            title
            url
          }
        }
      }
    `,
    variables: {
      id: HERO_ENTRY_ID,
      locale,
      profileId: PROFILE_ENTRY_ID,
    },
    preview,
  });
  return {
    props: {
      data: entry,
    },
    revalidate: 10,
  };
};

const Home: NextPage = () => {
  const {
    hero: { seo },
  } = usePageData<IndexPageData>();

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
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Head>
      <NavBar />
      <Hero />
      <Profile />
      <Footer />
    </>
  );
};

export default Home;
