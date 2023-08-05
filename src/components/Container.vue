<template>
    <div v-for="(a, i) in postData" :key="i">
        <Post :postData="postData[i]" />
        <!-- <Post /> -->
        <!-- <Post /> -->
    </div>
</template>

<script>
import Post from './Post.vue';
export default {
    name: 'Container-component',
    props: {
        postData: Array,
    },
    components: { Post },
};
</script>

<style></style>
