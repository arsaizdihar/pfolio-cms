import { Document } from "@contentful/rich-text-types";

export type SocmedKey = "github" | "twitter" | "instagram" | "linkedin";

export type SEO = {
  title: string;
  description: string;
};

export type HeroData = {
  titlePrefix: string;
  titles: Array<string>;
  description: string;
  seo: SEO;
  socmedLinksCollection: { items: Array<SocmedLink> };
};

export type IndexPageData = {
  hero: HeroData;
  profile: ProfileData;
};

export type SocmedLink = {
  name: string;
  iconKey: SocmedKey;
  color: string;
  link: string;
};

export type ProfileData = {
  title: string;
  name: string;
  description: { json: Document };
  email: string;
  birthDate: string;
  photo: {
    title: string;
    url: string;
  };
};
