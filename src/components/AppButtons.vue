<script lang="ts" setup>
    import { storeToRefs } from 'pinia';
    import { useSettingsStore } from '@/stores/useSettingsStore';
    import AppButtonAddPlayer from './AppButtonAddPlayer.vue';
    import AppButtonClearPlayers from './AppButtonClearPlayers.vue';
    import AppButtonAddScores from './AppButtonAddScores.vue';
    import AppButtonUndo from './AppButtonUndo.vue';
    import AppButtonFullscreen from './AppButtonFullscreen.vue';
    import AppButtonClearScores from './AppButtonClearScores.vue';
    import AppButtonAddScoresCancel from './AppButtonAddScoresCancel.vue';
    import AppButtonAddScoresConfirm from './AppButtonAddScoresConfirm.vue';

    const { editMode } = storeToRefs(useSettingsStore())
</script>

<template>
    <div :class="$style.container">
        <div>
            <template v-if="!editMode">
                <AppButtonAddScores />
                <AppButtonUndo />
                <AppButtonAddPlayer />
                <AppButtonClearScores />
                <AppButtonClearPlayers />
                <AppButtonFullscreen />
            </template>
            <template v-else>
                <AppButtonAddScoresCancel />
                <AppButtonAddScoresConfirm />
            </template>
        </div>
    </div>
</template>

<style lang="scss" module>
    .container {
        width: 100%;
        max-width: 15em;
        display: flex;
        align-items: flex-start;
        min-height: 9em;
        margin-top: .5em;

        & > div {
            width: 100%;
            display: flex;
            justify-content: center;
            margin: .5em;
            row-gap: .4em;
            column-gap: .4em;
            flex-wrap: wrap;
        }
    }
</style>