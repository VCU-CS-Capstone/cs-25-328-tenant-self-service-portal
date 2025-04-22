import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import Vueform from '@vueform/vueform/plugin'
import vueformConfig from './vueform.config.js'
import '@vueform/vueform/themes/vueform/css/index.min.css'

const app = createApp(App)

app.use(router)
app.use(Vueform, vueformConfig)
app.mount('#app')