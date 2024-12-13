// LOGO IMAGE From ImageKit :
import logoImg from "/logo.png";
const logoImage={
  logoImg,
  alt:"logo image"
}

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
export { logoImage, icons , iconsList };
