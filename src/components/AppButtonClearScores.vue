<script lang="ts" setup>
    import { usePlayersStore } from '@/stores/usePlayersStore';
    import ActionButton from './ActionButton.vue';
    import { mdiNumeric0Circle, mdiCancel, mdiCheck } from '@mdi/js';
    import { ref } from 'vue';
    import Popup from './Popup.vue';
    import PopupRow from './PopupRow.vue';
    import PopupRowButton from './PopupRowButton.vue';

    const popupVisible = ref(false)
    const { resetScores } = usePlayersStore()
</script>

<template>
    <ActionButton
        :icon="mdiNumeric0Circle"
        color="pink"
        @click="popupVisible = true">
        Clear scores
    </ActionButton>
    <Popup v-model:visible="popupVisible">
        <template #title>Clear scores</template>
        Are you sure you want to reset all scores?
        <PopupRow>
            <PopupRowButton
                :icon="mdiCancel"
                color="red"
                @click="popupVisible = false">
                Cancel
            </PopupRowButton>
            <PopupRowButton
                :icon="mdiCheck"
                color="green"
                @click="resetScores(); popupVisible = false">
                Confirm
            </PopupRowButton>
        </PopupRow>
    </Popup>
</template>