<script lang="ts" setup>
    import ActionButton from './ActionButton.vue';
    import { mdiFullscreen } from '@mdi/js';

    /** Toggle fullscreen mode */
    function toggleFullscreen(): void {
        if (document.fullscreenElement == null)
            document.documentElement.requestFullscreen();
        else
            document.exitFullscreen();
    }
</script>

<template>
    <ActionButton :icon="mdiFullscreen" color="cyan" @click="toggleFullscreen">
        Fullscreen
    </ActionButton>
</template>