<template>
    <div>
        <div v-for="(a, i) in postData" :key="i">
            <div v-if="step == 0">
                <Post :postData="postData[i]" />
            </div>
        </div>

        <!-- 필터선택페이지 -->
        <div v-if="step == 1">
            <div :class="`upload-image ${selectedFilter}`" :style="{ backgroundImage: `url(${image})` }"></div>
            <div class="filters">
                <FilterBox v-for="(filter, i) in filterData" :key="i" :image="image" :filter="filter">
                    {{ filter }}
                </FilterBox>
            </div>
        </div>

        <!-- 글작성페이지 -->
        <div v-if="step == 2">
            <div :class="`upload-image ${selectedFilter}`" :style="{ backgroundImage: `url(${image})` }"></div>
            <div class="write">
                <textarea @input="$emit('write', $event.target.value)" class="write-box">write!</textarea>
            </div>
        </div>

        <!-- 마이페이지 -->
        <div v-if="step == 3">
            <Mypage :one="1" :two="2" />
        </div>
    </div>
</template>

<script>
import Post from './Post.vue';
import FilterBox from './FilterBox.vue';
import filterData from './../data/filterData';
import Mypage from './Mypage.vue';

export default {
    name: 'Container-component',
    data() {
        return {
            filterData: filterData,
            selectedFilter: '',
        };
    },
    mounted() {
        this.emitter.on('selectedFilter', (filter) => {
            this.selectedFilter = filter;
        });
    },
    props: {
        postData: Array,
        step: Number,
        image: String,
    },
    components: { Post, FilterBox, Mypage },
};
</script>

<style>
.upload-image {
    width: 100%;
    height: 450px;
    background: cornflowerblue;
    background-size: cover;
}
.filters {
    overflow-x: scroll;
    white-space: nowrap;
}
.filter-1 {
    width: 100px;
    height: 100px;
    background-color: cornflowerblue;
    margin: 10px 10px 10px auto;
    padding: 8px;
    display: inline-block;
    color: white;
    background-size: cover;
}
.filters::-webkit-scrollbar {
    height: 5px;
}
.filters::-webkit-scrollbar-track {
    background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
    background: #555;
}
.write-box {
    border: none;
    width: 90%;
    height: 100px;
    padding: 15px;
    margin: auto;
    display: block;
    outline: none;
}
</style>
