<template>
    <div class="nodata-box">
        <div class='empty'>
            <img src="@/assets/search_empty.png" alt="">
            <span>请选择用户组</span>
        </div>
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
    .empty{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 250px;
        height: 280px;
        img{
            width: 250px;
        }
        span{
            display: block;
            text-align: center;
            color: #5d5d5d;
        }
    }
}
</style>