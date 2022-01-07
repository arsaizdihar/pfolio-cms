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
};

export type SocmedLink = {
  name: string;
  iconKey: SocmedKey;
  color: string;
  link: string;
};
