<script lang="ts" setup>
    const { path } = defineProps<{
        /** SVG path definition */
        path: string
    }>()
</script>

<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        :class="$style.svg">
        <path :d="path" />
    </svg>
</template>

<style lang="scss" module>
    .svg {
        display: block;
    }
</style>