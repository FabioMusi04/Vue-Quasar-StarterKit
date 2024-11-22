import { createApp } from 'vue'
import { Quasar } from 'quasar'
import { createI18n } from 'vue-i18n'

import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css'

// Import Quasar css
import 'quasar/dist/quasar.css'

import App from './AppLayout.vue'
import router from './utils/router/router'
import pinia from './utils/store/storeConfiguration'

const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: {
  }, // import Quasar plugins and add here
})

const i18n = createI18n({
  locale: 'it',
  messages: {
  }
})

myApp.use(i18n)

myApp.use(router)

myApp.use(pinia)

myApp.mount('#app')
