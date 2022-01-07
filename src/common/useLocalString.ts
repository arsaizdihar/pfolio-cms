import { useRouter } from "next/router";

export const useLocalString = (en: string, id: string) => {
  const { locale } = useRouter();
  return locale === "id" ? id : en;
};
