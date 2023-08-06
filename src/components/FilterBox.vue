<template>
    <div @click="sendFilter" :class="`filter-item ${filter}`" :style="{ backgroundImage: `url(${image})` }">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Filter-box',
    methods: {
        sendFilter() {
            this.emitter.emit('selectedFilter', this.filter);
        },
    },
    props: {
        image: String,
        filter: String,
    },
};
</script>

<style>
.filter-item {
    width: 100px;
    height: 100px;
    margin: 10px 10px 10px auto;
    padding: 8px;
    display: inline-block;
    color: black;
    background-size: cover;
    background-position: center;
}
</style>
