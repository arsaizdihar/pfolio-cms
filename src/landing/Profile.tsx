import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  faCalendarAlt,
  faEnvelope,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect, useRef } from "react";
import { linkOptions } from "~/common/contentful";
import { usePageData } from "~/core/pageData";
import { IndexPageData } from "~/types";

const Profile = () => {
  const { profile } = usePageData<IndexPageData>();
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handler = () => {
      const isBelow =
        titleRef.current !== null &&
        window.scrollY + window.innerHeight / 2 >
          titleRef.current.getBoundingClientRect().bottom;
      titleRef.current?.classList.toggle("before:w-full", isBelow);
      titleRef.current?.classList.toggle("before:hover:w-0", isBelow);
      titleRef.current?.classList.toggle("before:w-0", !isBelow);
      titleRef.current?.classList.toggle("before:hover:w-full", !isBelow);
    };
    window.addEventListener("scroll", handler);

    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <section className="border-y border-dark p-8" id="profile">
      <div className="flex justify-center" data-aos="fade-up">
        <h2
          ref={titleRef}
          className="relative text-white font-bold text-4xl my-8 before:absolute before:w-0 before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:h-1 before:bg-primary before:duration-500 before:transition-all select-none cursor-pointer"
          data-text={profile.title}
          onClick={() =>
            document
              .querySelector("#profile")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {profile.title}
        </h2>
      </div>
      <div
        className="max-w-[400px] lg:max-w-screen-xl mx-auto bg-dark rounded-md flex flex-col lg:flex-row"
        data-aos="fade-up"
      >
        <div className="relative max-h-[400px]">
          <Image
            src={profile.photo.url}
            alt={profile.photo.title}
            width={400}
            height={400}
            className="rounded-t-md lg:rounded-t-none lg:rounded-l-md"
          />
        </div>
        <div className="p-4 flex-grow flex flex-col items-center justify-center">
          <h3 className="font-medium text-3xl text-center text-white my-4">
            {profile.name}
          </h3>
          <div className="prose text-center prose-invert">
            {documentToReactComponents(profile.description.json, linkOptions)}
          </div>
          <div>
            <Detail
              text={new Date(profile.birthDate).toLocaleDateString(undefined, {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              icon={faCalendarAlt}
            />
            <Detail
              text={profile.email}
              icon={faEnvelope}
              href={`mailto:${profile.email}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface DetailProps {
  text: string;
  icon: IconDefinition;
  href?: string;
}

const Detail: FC<DetailProps> = ({ icon, text, href }) => {
  const Wrapper = href ? LinkWrapper : DivWrapper;
  return (
    <Wrapper className="flex gap-4 my-2 md:my-4" href={href!}>
      <div className="w-6 flex justify-center">
        <FontAwesomeIcon icon={icon} className="text-2xl text-secondary" />
      </div>
      <p>{text}</p>
    </Wrapper>
  );
};

const DivWrapper: FC<{ className?: string }> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

const LinkWrapper: FC<{ href: string; className?: string }> = ({
  href,
  children,
  className,
}) => {
  return (
    <Link href={href}>
      <a className={classNames(className, "hover:text-secondary duration-100")}>
        {children}
      </a>
    </Link>
  );
};

export default Profile;
