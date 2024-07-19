import { DefaultTheme, defineConfig, UserConfig } from 'vitepress'
import {nav, sidebar} from "./customConfig";
const publicCofig:UserConfig<DefaultTheme.Config> = {
  title: "Snow Document",
  titleTemplate: "Snow",
  cleanUrls: true,
  srcDir: "./src",
  lastUpdated: true,
  head: [
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' }
    ],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
    ],
    [
      'link',
      { href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap', rel: 'stylesheet' }
    ]
  ],
  themeConfig: {
    outline:[2,3],
    logo: "/head_logo.svg",
    socialLinks: [
      { icon: "github", link: "https://github.com/EvanSnowly" },
      {
        icon:{
          svg:"<svg viewBox=\"-147 -173.29999999999998 470 492.29999999999995\" xmlns=\"http://www.w3.org/2000/svg\" width=\"2317\" height=\"2500\"><linearGradient id=\"a\" gradientTransform=\"rotate(-90 1397 232)\" gradientUnits=\"userSpaceOnUse\" x1=\"1310\" x2=\"1780\" y1=\"-1077\" y2=\"-1077\"><stop offset=\"0\" stop-color=\"#fbbe0a\"/><stop offset=\"1\" stop-color=\"#feda24\"/></linearGradient><circle cx=\"88\" cy=\"84\" fill=\"url(#a)\" r=\"235\"/><path d=\"M123.8 104c-5.9-8.3-11.5-16.1-17.1-23.8C85.2 50.4 63.6 20.6 42-9.1 28.3-28 14.7-46.9.8-65.6-3.4-71.2-3.9-77.1-2-83.5c3.9-13.3 13.2-22.5 24.2-30.1 20.1-13.9 42.8-21 66.6-25.2 20.7-3.6 41.2-8 59.3-19.4 4.9-3.1 9-7.3 13.5-11 1.2-1 2.3-2.1 4.6-4.1 1.5 7.3 3 13.4 4 19.5 3 18 1.9 35.5-6.2 52.1-11 22.4-29 36.4-52.6 43.6C97-53.5 82.1-52.4 67-52.5c-1.1 0-2.2.3-4.1.5 3.7 6.5 7 12.6 10.6 18.5 14.5 23.7 29 47.4 43.4 71.2l47.4 78.6c4.1 6.8 8.4 13.6 12.4 20.5 9.3 16 16.1 32.7 14.8 51.9-1.3 18.8-8.1 35.2-19.8 49.6-19.1 23.5-43.9 37.1-73.5 42.4-27.9 4.9-54.5 1.8-79.2-12.3-27.8-15.8-45.6-44.5-41.4-78.7 2.7-22.5 13.9-41.1 30.4-56.4 17.6-16.2 38.5-26.1 61.8-30.6 17.2-3.4 34.4-3.2 51.4 1.4.5.1 1.1-.1 2.6-.1z\" fill=\"#0daf52\"/></svg>"
        },
        link:"https://y.qq.com/n/ryqq/playlist/9051084845",
      }
    ],
  },
}


export default defineConfig({
  ...publicCofig,
  locales:{
     "root":{
      label: 'English',
      lang: 'en',
      themeConfig:{
        footer: {
          message: "Meet your first blog",
          copyright: "eamil:2972561826@qq.com evansnowly@gmail.com",
        },
        nav,
        sidebar,
        outline:[2,3],
      }
     },
     "zn":{
      label:"简体中文",
      lang:"zn",
      themeConfig:{
        footer: {
          message: "遇见你的第一个博客",
          copyright: "邮箱:2972561826@qq.com evansnowly@gmail.com",
        },
        nav: [
          { text: '首页', link: '/zn/' },
          {
            text: '算法笔记',
            link: '/zn/note/index',
          },
          {
            text: '博客',
            link: '/zn/blog/index',
          },
          {
            text: '项目',
            link: '/zn/project',
          },
        ],
        sidebar: {
          '/zn/blog': [
            {
              text: '插入百万数据',
              link: '/zn/blog/insertMilionOfData',
            },
            {
              text: '内存缓存系统',
              link: '/zn/blog/cacheSystem',
            },
            {
              text: '发送Ping',
              link: '/zn/blog/icmpPing',
            }
          ],
      }
    }
     }
  },
});




