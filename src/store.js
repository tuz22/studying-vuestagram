import axios from 'axios';
import { createStore } from 'vuex';

const store = createStore({
    // 보관하고 싶은 state(:데이터)
    state() {
        return {
            name: 'kim',
            age: 20,
            likes: 0,
            clickLikes: false,
            more: {},
        };
    },
    // 순차적으로 state 변경
    mutations: {
        updateName(state) {
            state.name = 'park';
        },
        addAge(state, payload) {
            state.age += payload;
        },
        likes(state) {
            if (!state.clickLikes) {
                state.likes++;
                state.clickLikes = true;
            } else {
                state.likes--;
                state.clickLikes = false;
            }
        },
        setMore(state, data) {
            state.more = data;
        },
    },
    // ajax, 오래걸리는 작업
    actions: {
        getData(context) {
            axios
                .get(`https://codingapple1.github.io/vue/more0.json`)
                .then((res) => {
                    console.log(res.data);
                    context.commit('setMore', res.data);
                })
                .catch((err) => console.log(err));
        },
    },
});

export default store;
