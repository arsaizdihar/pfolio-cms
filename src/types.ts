export type SocmedKey = "github" | "twitter" | "instagram" | "linkedin";

export type LandingPageData = HeroData &
  ProfileData & {
    seo: SEO;
  };

export type SEO = {
  title: string;
  description: string;
  image: { url: string };
  twitterCard: string;
};

export type HeroData = {
  titlePrefix: string;
  titles: Array<string>;
  description: string;
  socmedLinks: Array<SocmedLink>;
};

export type SocmedLink = {
  name: string;
  iconKey: SocmedKey;
  color: string;
  link: string;
};

export type ProfileData = {
  profileTitle: string;
  profileName: string;
  profileDescription: string;
  email: string;
  birthDate: string;
  photo: {
    url: string;
  };
};
