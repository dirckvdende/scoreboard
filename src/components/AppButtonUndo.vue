<script lang="ts" setup>
    import ActionButton from './ActionButton.vue';
    import { mdiArrowULeftTop } from '@mdi/js';
</script>

<template>
    <ActionButton :icon="mdiArrowULeftTop" color="yellow">
        Undo add
    </ActionButton>
</template>