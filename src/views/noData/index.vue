<template>
    <div class="nodata-box">
        <img src="@/assets/redirect.jpg" alt="">
    </div>
</template>

<script>
export default {
    setup() {
        
    },
}
</script>
<style lang="scss" scoped>
.nodata-box{
    position: relative;
    width: 100%;
    height: 100%;
    img{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }
}
</style>