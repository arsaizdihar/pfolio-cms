import {
  faGithub,
  faInstagram,
  faLinkedinIn,
  faTwitter,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons";
import { SocmedKey } from "../types";

const icons: Record<SocmedKey, IconDefinition> = {
  github: faGithub,
  twitter: faTwitter,
  instagram: faInstagram,
  linkedin: faLinkedinIn,
};

export default icons;
