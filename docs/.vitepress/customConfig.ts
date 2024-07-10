import { DefaultTheme } from "vitepress/theme";
export const nav: DefaultTheme.NavItem[] = [
  { text: "首页", link: "/" },
  {
    text:"算法日记",
    link: "/note",
  },
  {
    text:"博客",
    link: "/blog",
  },
  {
    text:"项目",
    link: "/project",
  },

];

export const sidebar: DefaultTheme.Sidebar = {
  "languages/go": [
    {
      text: "介绍",
      collapsed: false,
      items: [{ text: "为什么使用go", link: "/languages/go/index.md" }],
    },
    {
        text: "使用",
        collapsed: false,
        items: [{ text: "并发插入百万数据到Mysql", link: "/languages/go/并发插入百万数据到Mysql.md" },
          { text: "切片Slice", link: "/languages/go/切片的使用.md" },
          { text: "map的使用", link: "/languages/go/map的使用.md" },
          { text: "os的使用", link: "/languages/go/os的使用.md" }
        ],
      },
  ],
};
