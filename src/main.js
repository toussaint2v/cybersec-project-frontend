import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './css/index.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'


createApp({
    extends: App,
    beforeCreate() { this.$store.commit('initialiseStore');},
}).use(store).use(router).mount('#app')
