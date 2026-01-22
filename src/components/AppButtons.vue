<script lang="ts" setup>
    import {
        mdiAccountPlus,
        mdiArrowULeftTop,
        mdiFullscreen,
        mdiNumeric0Circle,
        mdiPlus,
        mdiTrashCan,
    } from '@mdi/js';
    import ActionButton from './ActionButton.vue';
</script>

<template>
    <div :class="$style.container">
        <ActionButton :icon="mdiPlus" color="green">
            Add scores
        </ActionButton>
        <ActionButton :icon="mdiArrowULeftTop" color="yellow">
            Undo add
        </ActionButton>
        <ActionButton :icon="mdiAccountPlus" color="blue">
            Add player
        </ActionButton>
        <ActionButton :icon="mdiNumeric0Circle" color="pink">
            Clear scores
        </ActionButton>
        <ActionButton :icon="mdiTrashCan" color="red">
            Clear players
        </ActionButton>
        <ActionButton :icon="mdiFullscreen" color="cyan">
            Fullscreen
        </ActionButton>
    </div>
</template>

<style lang="scss" module>
    .container {
        width: 100%;
        max-width: 15em;
        display: flex;
        justify-content: center;
        margin: .5em;
        row-gap: .4em;
        column-gap: .4em;
        flex-wrap: wrap;
    }
</style>