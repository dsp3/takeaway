<template>
<div class="right">
    <com-header></com-header>
    <transition name="rv-fade">
        <router-view />
    </transition>
</div>
</template>

<script>
import ComHeader from "./ComHeader.vue";
export default {
    components: {
        ComHeader,
    },
};
</script>

<style lang="less" scoped>
.right {
    flex: 1;
    display: flex;
    flex-direction: column;
}

/deep/ .com-header {
    width: 100% !important;
}

.rv-fade-enter {
    opacity: 0;
    transform: translateY(-20px);
}

.rv-fade-enter-active {
    transition: all 1s ease;
}

.rv-fade-enter-to {
    opacity: 1;
    transform: translateY(0);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
