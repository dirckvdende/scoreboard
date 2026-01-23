<script lang="ts" setup>
    import ActionButton from './ActionButton.vue';
    import { mdiWeatherNight } from '@mdi/js';

    /** Toggle dark theme */
    function toggleDarkTheme(): void {
        document.body.classList.toggle("dark-theme")
    }
</script>

<template>
    <ActionButton
        :icon="mdiWeatherNight"
        color="cyan"
        @click="toggleDarkTheme">
        Theme
    </ActionButton>
</template>