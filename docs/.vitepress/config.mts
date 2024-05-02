import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:"/EvanSnowly.github.io/",
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
    // https://vitepress.dev/reference/default-theme-config
    footer: {
      message: "若结果并非所愿,那就再尘埃落地前放手一搏",
      copyright: "2972561826@qq.com",
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Backends",items:[
        {text:"SpringBoot",link:"/spring"},
        {text:"Redis",link:"/redis"},
        {text:"Mysql",link:"/mysql"},
      ]},
      { text: "Frontends",items:[
        {text:"Vue",link:"/vue"},
        {text:"TypeScirpt",link:"/typeScirpt"},
      ]},
      { text: "Tools",items:[
        {text:"Maven",link:"/vue"},
        {text:"GIT",link:"/typeScirpt"},
        {text:"Comp & Fnc",link:"/typeScirpt"},
        {text:"Tool",link:"/tools/tool/01.测试"},
      ]},
    ],

    sidebar:{
      "/tools/tool/":[
        {
          text: 'Guide',
          collapsed:false,
          items: [
            { text: 'Index', link: '/guide/' },
            { text: 'One', link: '/guide/one' },
            { text: 'Two', link: '/guide/two' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
