<template>
    <div class="tip-box">{{message}}</div>
</template>

<script setup>
import { defineProps, toRefs } from 'vue'

const defProps = defineProps({
    message: {
        type: String,
        default: ''
    }
})

{
    toRefs(defProps)
}

</script>

<style scoped>
.tip-box {
    background: #f0f0f0;
    height: 30px;
    line-height: 30px;
    margin: 15px 0;
    padding-left: 10px;
}
</style>