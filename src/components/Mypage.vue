<template>
    <div style="padding: 10px">
        <h4>팔로워</h4>
        <input placeholder="팔로워검색하기" @input="search($event.target.value)" />
        <div class="post-header" v-for="(a, i) in follower" :key="i">
            <div class="profile" :style="{ backgroundImage: `url(${a.image})` }"></div>
            <span class="profile-name"> {{ a.name }}</span>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref, toRefs } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

export default {
    name: 'Mypage-components',
    props: {
        one: Number,
        two: Number,
    },
    setup(props, context) {
        let follower = ref([]); // ref - 주로 숫자나 문자에 사용
        // let follower = reactive({ name: 'kim' }); // reactive - 주로 array, object에 사용

        // props 사용 방법
        let { one, two } = toRefs(props);
        one.value;
        two.value;

        // Composition API에서 watch 사용하기
        // watch(감시할것, () => { 실행할코드 })

        // Composition API에서 computed 사용하기
        // computed(() => { return 연산결과 })
        let result = computed(() => {
            return follower.value.length;
        });
        console.log(result);
        console.log(context);

        // Composition API에서 vuex store 사용하기
        let store = useStore();
        console.log(store.state.name);
        console.log(store.commit.addAge); // Composition API 안에서는 mapState 안됨

        // 검색기능
        let followerOriginal = ref([]);

        // Composition API에서 Lifecycle Hook 사용
        onMounted(() => {
            axios.get('/follower.json').then((res) => {
                follower.value = res.data;
                followerOriginal.value = [...res.data];
            });
        });

        function search(검색어) {
            let newFollower = followerOriginal.value.filter((res) => {
                return res.name.indexOf(검색어) != -1;
            });
            follower.value = [...newFollower];
        }

        return { follower, search };
    },
};
</script>

<style></style>
