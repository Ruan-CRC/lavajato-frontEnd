import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router/index'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'


const vuetify = createVuetify()
const pinia = createPinia()
const app = createApp(App)

app.config.errorHandler = (err) => {
  console.error(err)
}

app.use(router).use(pinia).use(vuetify).mount('#app')
