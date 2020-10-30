import Vue from 'vue'
import {
    Button,
    Form,
    FormItem,
    Input,
    Message,
    Container,
    Header,
    Aside,
    Main,
    Menu,
    Submenu,
    MenuItemGroup,
    MenuItem

} from 'element-ui'

// 全局注册，这样注册过之后才能直接使用

Vue.use(Button)
// 相当于Vue.component(Button.name, Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(Menu)
Vue.use(MenuItem)



// 这是全局注册，之后可以直接用this.$message来使用
Vue.prototype.$message = Message