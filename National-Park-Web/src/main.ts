import './assets/main.css';


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'
import Drawer from 'primevue/drawer'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.component('Drawer', Drawer)
app.mount('#app')
