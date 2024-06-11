import { DefaultTheme } from "vitepress/theme";
export const nav: DefaultTheme.NavItem[] = [
  { text: "Home", link: "/" },
  {
    text: "languages",
    items: [
      { text: "Go", link: "/languages/go/index.md" },
      { text: "TypeScript", link: "/languages/typescript/SN/SN" },
    ],
  },
  {
    text: "Middleware",
    items: [
      { text: "Redis", link: "/middleware/spring/SN" },
      { text: "Mysql", link: "/middleware/spring/SN" },
    
    ],
  },
  {
    text: "fremework",
    items: [
      { text: "Gorm", link: "/fremework/spring/SN" },
      { text: "Gin", link: "/fremework/go/SN" },
      { text: "React", link: "/fremework/vue/SN" },
    ],
  },
  {
    text: "Cloud Native",
    items: [
      { text: "Go Micro", link: "/fremework/go/SN" },
      { text: "K8s", link: "/cloud-native/k8s/SN" },
      { text: "Docker", link: "/cloud-native/docker/SN" },
      { text: "Zookeeper", link: "/middleware/spring/SN" },
      { text: "Kafka", link: "/middleware/spring/SN" },
      { text: "RabbitMQ",link:"/middleware/spring/SN" },
      { text: "Rpc",link:"/middleware/spring/SN" },
      { text: "Raft",link:"/middleware/spring/SN" },
      { text: "Grpc",link:"/middleware/spring/SN" },
    ],
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
