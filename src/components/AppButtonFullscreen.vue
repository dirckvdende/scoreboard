<script lang="ts" setup>
    import ActionButton from './ActionButton.vue';
    import { mdiFullscreen } from '@mdi/js';
    import { useHeightStore } from '@/stores/useHeightStore';

    const { updateHeight } = useHeightStore()

    /** Toggle fullscreen mode */
    function toggleFullscreen(): void {
        if (document.fullscreenElement == null)
            document.documentElement.requestFullscreen()
        else
            document.exitFullscreen()
        updateHeight()
    }
</script>

<template>
    <ActionButton
        :icon="mdiFullscreen"
        color="cyan-hard"
        @click="toggleFullscreen">
        Fullscreen
    </ActionButton>
</template>