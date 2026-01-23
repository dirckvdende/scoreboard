<script lang="ts" setup>
    import { usePlayersStore } from '@/stores/usePlayersStore';
    import ActionButton from './ActionButton.vue';
    import { mdiNumeric0Circle, mdiCancel, mdiCheck } from '@mdi/js';
    import { ref } from 'vue';
    import Popup from './Popup.vue';
    import PopupRow from './PopupRow.vue';
    import PopupRowButton from './PopupRowButton.vue';
    import { storeToRefs } from 'pinia';

    const popupVisible = ref(false)
    const { resetScores } = usePlayersStore()
    const { players } = storeToRefs(usePlayersStore())

    /** Called when the button is clicked */
    function click(): void {
        if (players.value.length == 0)
            return
        popupVisible.value = true
    }

    /** Called when the confirm button of the popup is clicked */
    function clickConfirm(): void {
        resetScores()
        popupVisible.value = false
    }
</script>

<template>
    <ActionButton
        :icon="mdiNumeric0Circle"
        color="pink"
        @click="click">
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
                @click="clickConfirm">
                Confirm
            </PopupRowButton>
        </PopupRow>
    </Popup>
</template>