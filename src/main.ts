import { createApp } from 'vue'
import './styles/common.css'
import App from './App.vue'
import router from './router'
import { installLayout } from './utils'

const app = createApp(App)

installLayout(app)

app.use(router).mount('#app')
