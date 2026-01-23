<script setup lang="ts">
    import "@/assets/style.scss";
    import AppScoreboard from './components/AppScoreboard.vue';
    import AppButtons from './components/AppButtons.vue';
    import { useCssVar, useEventListener } from "@vueuse/core";

    const heightVar = useCssVar("--viewport-height", document.body,
        { initialValue: "100vh" })

    function updateHeight(): void {
        heightVar.value = `${window.innerHeight}px`
    }

    // useEventListener("resize", updateHeight)
    updateHeight()
</script>

<template>
    <div :class="$style.container" :style="{
        minHeight: `var(--viewport-height)`
    }">
        <div>
            <AppScoreboard />
            <AppButtons />
        </div>
    </div>
</template>

<style lang="scss" module>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        box-sizing: border-box;
        padding:
            calc(1.5em + env(safe-area-inset-top))
            calc(1.5em + env(safe-area-inset-right))
            calc(1.5em + env(safe-area-inset-bottom))
            calc(1.5em + env(safe-area-inset-left));

        & > div {
            width: 100%;
            height: auto;
            max-width: 20em;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
</style>
