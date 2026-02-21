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
    import AppButtonChart from './AppButtonChart.vue';
    import AppButtonDarkMode from './AppButtonDarkMode.vue';
    import AppButtonCloseWins from './AppButtonCloseWins.vue';
    import AppButtonEditWins from './AppButtonEditWins.vue';

    const { mode } = storeToRefs(useSettingsStore())
</script>

<template>
    <div :class="$style.container">
        <div>
            <template v-if="mode == 'default'">
                <AppButtonAddScores />
                <AppButtonUndo />
                <AppButtonAddPlayer />
                <AppButtonEditWins />
                <AppButtonClearScores />
                <AppButtonClearPlayers />
                <AppButtonChart />
                <AppButtonDarkMode />
                <AppButtonFullscreen />
            </template>
            <template v-if="mode == 'edit-scores'">
                <AppButtonAddScoresCancel />
                <AppButtonAddScoresConfirm />
            </template>
            <template v-if="mode == 'edit-wins'">
                <AppButtonCloseWins />
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
        min-height: 12.6em;
        margin-top: 2em;

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