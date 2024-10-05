import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import VueCookies from 'vue-cookies'


import App from './App.vue'
import router from './router'
import GoogleSignInPlugin from 'vue3-google-login';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

const vuetify = createVuetify({
	components,
	directives,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(GoogleSignInPlugin, {
	clientId: GOOGLE_CLIENT_ID,
})
app.use(VueCookies, {expires: '7d'})

app.mount('#app')
