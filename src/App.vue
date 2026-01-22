<script setup lang="ts">
    import Popup from '@/components/Popup.vue';
    import { ref } from 'vue';
    import "@/assets/style.scss";
    import PopupRow from './components/PopupRow.vue';
    import PopupRowButton from './components/PopupRowButton.vue';
import { mdiCheck } from '@mdi/js';

    const popupVisible = ref(true)
</script>

<template>
    <h1>You did it!</h1>
    <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
    </p>
    <Popup v-model:visible="popupVisible">
        <template #title>Erase scores</template>
        Are you sure you want to reset all scores?
        <PopupRow>
            <PopupRowButton :icon="mdiCheck">Confirm</PopupRowButton>
        </PopupRow>
    </Popup>
</template>

<style scoped></style>
