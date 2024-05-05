import { DefaultTheme } from 'vitepress/theme';
export const nav: DefaultTheme.NavItem[]  = [
    { text: "Home", link: "/" },
    { text: "Backends",items:[
            {text:"Spring",link:"/backends/spring/SN"},
            {text:"Redis",link:"/backends/redis/SN"},
            {text:"Mysql",link:"/backends/mysql/SN"},
        ]},
    { text: "Frontends",items:[
            {text:"Vue",link:"/frontends/vue/SN"},
            {text:"TypeScript",link:"/frontends/typeScript/SN"},
        ]},
    { text: "Tools",items:[
            {text:"Comp & Fnc",link:"/tools/comp-and-fnc/SN"},
            {text:"Tool",link:"/tools/tool/SN"},
        ]},
]

export const sidebar:DefaultTheme.Sidebar = {
    "/frontends/typeScript":[
        {
            text:"typeScript",
            collapsed:false,
            items:[
                {text:"数据校验函数",link:"/frontends/typeScript/1.数据正则校验实现"}
            ]
        }
    ]
}
