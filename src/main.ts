import { createApp } from 'vue'
import 'normalize.css'
import '@/assets/css/index.less'
// 单独引入组件css
// import 'element-plus/theme-chalk/el-message.css'
import App from './App.vue'
import router from '@/router/main'
import pinia from '@/store/main'
import registerIcon from '@/global/register-icon'

createApp(App).use(registerIcon).use(router).use(pinia).mount('#app')
