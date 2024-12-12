// LOGO IMAGE:
import logoImg from "../../../public/logo.png";

// ICONS:
import { GiHamburgerMenu } from "react-icons/gi";

const icons = {
  hamburger: GiHamburgerMenu,
};

// MENU LIST

const iconsList = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Trending",
    path: "/trending",
  },
  {
    title: "Most Popular",
    path: "/most-popular",
  },
  {
    title: "About",
    path: "/about",
  },
];

// EXPORT:
export { logoImg, icons , iconsList };
