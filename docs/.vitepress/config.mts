import { defineConfig } from 'vitepress'
import {nav, sidebar} from "./customConfig";
export default defineConfig({
  title: "Snow Document",
  description: "个人技术文档",
  titleTemplate: "Snow",
  cleanUrls: true,
  srcDir: "./src",
  lastUpdated: true,
  themeConfig: {
    logo: "/head_logo.svg",
    search: {
      provider: "local",
    },
    footer: {
      message: "若结果并非所愿,那就再尘埃落地前放手一搏",
      copyright: "2972561826@qq.com",
    },
    nav,
    sidebar,
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
