<script setup lang="ts">
    import Popup from '@/components/Popup.vue';
    import { ref } from 'vue';
    import "@/assets/style.scss";
    import PopupRow from './components/PopupRow.vue';
    import PopupRowButton from './components/PopupRowButton.vue';
    import { mdiCheck } from '@mdi/js';
    import AppScoreboard from './components/AppScoreboard.vue';
    import AppButtons from './components/AppButtons.vue';

    const popupVisible = ref(true)
</script>

<template>
    <div :class="$style.container">
        <div>
            <AppScoreboard />
            <AppButtons />
        </div>
    </div>
    <Popup v-model:visible="popupVisible">
        <template #title>Erase scores</template>
        Are you sure you want to reset all scores?
        <PopupRow>
            <PopupRowButton :icon="mdiCheck">Confirm</PopupRowButton>
        </PopupRow>
    </Popup>
</template>

<style lang="scss" module>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 100dvh;
        box-sizing: border-box;
        padding: 1em;

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
