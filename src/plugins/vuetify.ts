import '@mdi/font/css/materialdesignicons.css';
import 'v-markdown-editor/dist/v-markdown-editor.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import Editor from 'v-markdown-editor';

Vue.use(Vuetify);
Vue.use(Editor);

export default new Vuetify({
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
});
