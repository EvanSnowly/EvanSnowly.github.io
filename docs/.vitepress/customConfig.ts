import { DefaultTheme } from "vitepress/theme";
export const nav: DefaultTheme.NavItem[] = [
  { text: "Home", link: "/" },
  {
    text: "Algorithm Notes",
    link: "/note/index",
  },
  {
    text: "Blog",
    link: "/blog/index",
  },
  {
    text: "Projects",
    link: "/project",
  },
];

export const sidebar: DefaultTheme.Sidebar = {
  "/blog": [
    {
      text: "Insert millions of data",
      link: "/blog/insertMilionOfData",
    },
    {
      text:"Memoery Cache System",
      link:"/blog/cacheSystem"
    }
  ],
};
