import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import './types/shims-vue-core.d';
import filters from './utils/filters';
import '@client/styles/base.scss';
import '@client/styles/element';
import '@client/styles/element-reset/index.scss';
import '@client/styles/base.css';
import 'animate.css';

const app = createApp(App);
app.config.globalProperties.$filters = filters;
app.use(router);
app.mount('#app');
