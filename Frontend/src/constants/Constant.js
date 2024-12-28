// LOGO IMAGE From ImageKit :
import logoImg from "../../public/logo.png";
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
    path: "/posts?sort=trending",
  },
  {
    title: "Most Popular",
    path: "/posts?sort=popular",
  },
  // {
  //   title: "About",
  //   path: "/about",
  //   class:'hidden'
  // },
  {
    title: "Saved Posts",
    path: "/saved-posts",
    class:'hidden'
  },
];

// CATEGORIES LIST

const categoriesList = [
  {
    title: "All Posts",
    path: "/posts",
    class:'bg-blue-800 text-white hover:text-black outline-none border-none'
  },
  {
    title: "Web Design",
    path: "/posts?cat=web-design",
  },
  {
    title: "Development",
    path: "/posts?cat=development",
  },
  {
    title: "Database",
    path: "/posts?cat=databases",
  },
  {
    title: "Search Engine",
    path: "/posts?cat=seo",
  },
  {
    title: "Marketing",
    path: "/posts?cat=marketing",
  },
];

// EXPORT:
export { logoImage, icons , iconsList , categoriesList };
