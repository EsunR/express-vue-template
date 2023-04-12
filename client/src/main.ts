import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import filters from './utils/filters';
import './types/shims-vue-core.d.ts';
// style
import '@client/styles/base.scss';
import '@client/styles/element-reset/index.scss';
import 'animate.css';
import 'normalize.css';
import 'virtual:windi.css';
import '@client/styles/element';

const app = createApp(App);
app.config.globalProperties.$filters = filters;
app.use(router);
app.mount('#app');
