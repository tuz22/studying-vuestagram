<template>
    <div class="header">
        <ul class="header-button-left">
            <li>Cancel</li>
        </ul>
        <ul class="header-button-right">
            <li v-if="step == 1" @click="step++">Next</li>
            <li v-if="step == 2" @click="publish">발행</li>
        </ul>
        <img src="./assets/logo.png" class="logo" />
    </div>
    <!-- vuex ex)-->
    <h4>
        안녕 {{ $store.state.name }}<span>{{ $store.state.age }}</span>
    </h4>
    <!-- commit: mutations요청 -->
    <button @click="$store.commit('updateName')">이름변경</button>
    <button @click="$store.commit('addAge', 3)">나이+</button>
    <button @click="addAge(3)">나이+3</button>

    <p>{{ $store.state.more }}</p>
    <!-- dispatch: actions요청 -->
    <button @click="$store.dispatch('getData')">더보기</button>
    <!-- vuex -->

    <p>{{ now() }}{{ counter }}</p>
    <p>{{ now2 }}{{ counter }}</p>
    <button @click="counter++">버튼</button>

    <!-- mapState 사용 -->
    {{ name }} {{ age }} {{ likes }}
    {{ 내이름 }}

    <Container @write="writePost = $event" :postData="postData" :step="step" :image="image" />
    <button @click="more">더보기</button>

    <div class="footer">
        <ul class="footer-button-plus">
            <!-- multiple: 다중선택 / accept="image/*": 이미지 선택을 기본으로 -->
            <input @change="upload" accept="image/*" type="file" id="file" class="inputfile" />
            <label for="file" class="input-plus">+</label>
        </ul>
    </div>
</template>

<script>
import Container from './components/Container.vue';
import postData from './data/postData';
import axios from 'axios';
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
    name: 'App',
    data() {
        return {
            postData: postData,
            moreCount: 0,
            step: 3,
            image: '',
            writePost: '',
            selectedFilter: '',
            counter: 0,
        };
    },
    methods: {
        ...mapMutations(['addAge', 'likes', 'setMore']),
        ...mapActions(['getData']),
        more() {
            axios
                .get(`https://codingapple1.github.io/vue/more${this.moreCount}.json`) // axios.post('URL', {name: 'kim'}).then()
                .then((res) => {
                    console.log(res);
                    this.postData.push(res.data);
                    this.moreCount++;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        upload(e) {
            let file = e.target.files;
            console.log(file[0]);
            console.log(file[0].type); // 이미지 타입
            let url = URL.createObjectURL(file[0]); // 가상의 이미지 URL 생성
            console.log(url);
            this.step++; // 다음 페이지로 이동
            this.image = url;
        },
        publish() {
            let myPost = {
                name: 'Kim Hyun',
                userImage: 'https://picsum.photos/100?random=3',
                postImage: this.image,
                likes: 36,
                date: 'May 15',
                liked: false,
                content: this.writePost,
                filter: this.selectedFilter,
            };
            this.postData.unshift(myPost); // unshift: 제일 앞에 push
            this.step = 0;
        },
        now() {
            return new Date();
        },
    },
    computed: {
        now2() {
            return new Date();
        },
        name() {
            return this.$store.state.name;
        },
        ...mapState(['name', 'age', 'likes']),
        ...mapState({ 내이름: 'name' }),
    },
    mounted() {
        this.emitter.on('selectedFilter', (filter) => {
            this.selectedFilter = filter;
        });
    },
    components: { Container },
};
</script>

<style>
body {
    margin: 0;
}
ul {
    padding: 5px;
    list-style-type: none;
}
.logo {
    width: 22px;
    margin: auto;
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 13px;
}
.header {
    width: 100%;
    height: 40px;
    background-color: white;
    padding-bottom: 8px;
    position: sticky;
    top: 0;
}
.header-button-left {
    color: skyblue;
    float: left;
    width: 50px;
    padding-left: 20px;
    cursor: pointer;
    margin-top: 10px;
}
.header-button-right {
    color: skyblue;
    float: right;
    width: 50px;
    cursor: pointer;
    margin-top: 10px;
}
.footer {
    width: 100%;
    position: sticky;
    bottom: 0;
    padding-bottom: 10px;
    background-color: white;
}
.footer-button-plus {
    width: 80px;
    margin: auto;
    text-align: center;
    cursor: pointer;
    font-size: 24px;
    padding-top: 12px;
}
.sample-box {
    width: 100%;
    height: 600px;
    background-color: bisque;
}
.inputfile {
    display: none;
}
.input-plus {
    cursor: pointer;
}
#app {
    box-sizing: border-box;
    font-family: 'consolas';
    margin-top: 60px;
    width: 100%;
    max-width: 460px;
    margin: auto;
    position: relative;
    border-right: 1px solid #eee;
    border-left: 1px solid #eee;
}
</style>
