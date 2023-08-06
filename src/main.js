import { createApp } from 'vue';
import App from './App.vue';
import mitt from 'mitt';
let emitter = mitt();
let app = createApp(App);
app.config.globalProperties.emitter = emitter; // app.config.globalProperties: 글로벌한 변수보관함 - 보관함에 { emitter: emitter } 추가

app.mount('#app');
