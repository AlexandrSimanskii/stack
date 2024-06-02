import { createApp } from 'vue'
import PrimeVue from 'primevue/config'


import App from './App.vue'
import components from '@/components/UI/index'

const app = createApp(App)

components.forEach((component) => {
  app.component(component.name, component)
})
app.use(PrimeVue)


app.mount('#app')
