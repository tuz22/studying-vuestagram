import { createApp } from 'vue';
import App from './App.vue';
import mitt from 'mitt';
let emitter = mitt();
let app = createApp(App);
app.config.globalProperties.emitter = emitter; // app.config.globalProperties: 글로벌한 변수보관함 - 보관함에 { emitter: emitter } 추가

import store from './store';

app.use(store).mount('#app'); // 모든 컴포넌트들이 이 store 안에 있는 state(:데이터)들을 공유
