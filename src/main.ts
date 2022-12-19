import Vue from 'vue';
import VueChatbox from 'vue-chatbotbox';
import 'vue-chatbotbox/lib/vue-chatbox.css';
import VueCompositionAPI from '@vue/composition-api';
import Component from 'vue-class-component';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './plugins/interfaceImport';
import './styles/style.css';
import Components from './components';
import './plugins/mixin';

// Register the router hooks with their names
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);
Vue.use(VueChatbox);
Vue.use(VueCompositionAPI);
Vue.use(Components);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
