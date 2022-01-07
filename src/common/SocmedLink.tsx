import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useState } from "react";
import { SocmedLink } from "../types";
import icons from "./icons";

const SocmedLink: FC<SocmedLink> = ({ iconKey, link, color }) => {
  const [hover, setHover] = useState(false);
  return (
    <a
      className="text-3xl duration-200 hover:-translate-y-1"
      style={hover ? { color } : undefined}
      href={link}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <FontAwesomeIcon icon={icons[iconKey]} />
    </a>
  );
};

export default SocmedLink;
