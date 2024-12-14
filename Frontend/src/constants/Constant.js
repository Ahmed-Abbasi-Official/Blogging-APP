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

// CATEGORIES LIST

const categoriesList = [
  {
    title: "All Posts",
    path: "/posts",
    class:'bg-blue-800 text-white outline-none border-none'
  },
  {
    title: "Web Design",
    path: "/posts?cat=web-design",
  },
  {
    title: "Development",
    path: "/posts?cat=Development",
  },
  {
    title: "Database",
    path: "/posts?cat=database",
  },
  {
    title: "Search Engine",
    path: "/posts?cat=search",
  },
  {
    title: "Marketing",
    path: "/posts?cat=marketing",
  },
];

// EXPORT:
export { logoImage, icons , iconsList , categoriesList };
