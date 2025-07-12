import './assets/main.css';


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'
import Drawer from 'primevue/drawer'
import axios from 'axios'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(PrimeVue)
app.component('Drawer', Drawer)
app.mount('#app')
