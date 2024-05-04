// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './index.css'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import {EnhanceAppContext, Theme} from "vitepress";

const themeApp: Theme = {
    extends: DefaultTheme,
    enhanceApp: (ctx: EnhanceAppContext) => {
        ctx.app.use(ElementPlus)
    }
}
export default themeApp



