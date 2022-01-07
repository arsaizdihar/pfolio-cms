export type SocmedKey = "github" | "twitter" | "instagram" | "linkedin";

export type SEO = {
  title: string;
  description: string;
};

export type Hero = {
  titlePrefix: string;
  titles: Array<string>;
  description: string;
  seo: SEO;
  socmedLinks: Array<SocmedLink>;
};

export type IndexPageData = {
  hero: Hero;
};

export type SocmedLink = {
  name: string;
  iconKey: SocmedKey;
  color: string;
  link: string;
};
