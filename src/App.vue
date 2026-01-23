<script setup lang="ts">
    import "@/assets/style.scss";
    import AppScoreboard from './components/AppScoreboard.vue';
    import AppButtons from './components/AppButtons.vue';
    import { useHeightStore } from "./stores/useHeightStore";

    const { updateHeight } = useHeightStore()
    updateHeight()
</script>

<template>
    <div :class="$style.container" id="container">
        <div :class="$style.content">
            <AppScoreboard />
            <AppButtons />
        </div>
    </div>
</template>

<style lang="scss" module>
    .container {
        min-height: var(--viewport-height);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        padding:
            calc(1.5em + env(safe-area-inset-top))
            calc(1.5em + env(safe-area-inset-right))
            calc(1.5em + env(safe-area-inset-bottom))
            calc(1.5em + env(safe-area-inset-left));

        .content {
            width: 100%;
            height: auto;
            max-width: 20em;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
</style>
