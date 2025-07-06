<template>
    <div class="demo">
        <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane :key="key" :tab="key" v-for="(value, key) in tabsCom"> <component :is="value" /> </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import pdfDemo from './pdf-demo.vue'
import vmodelDemo from './vmodel-demo.vue'
import searchDemo from './search-demo.vue'

const activeKey = ref('vmodelDemo');

const tabsCom = {
    vmodelDemo,
    pdfDemo,    
    searchDemo
}


</script>

<style lang="scss" scoped>
.demo {
    padding: 0 20px;
}
</style>
