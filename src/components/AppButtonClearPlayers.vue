<script lang="ts" setup>
    import { mdiTrashCan, mdiCancel, mdiCheck } from '@mdi/js';
    import ActionButton from './ActionButton.vue';
    import { ref } from 'vue';
    import Popup from './Popup.vue';
    import PopupRow from './PopupRow.vue';
    import PopupRowButton from './PopupRowButton.vue';
    import { usePlayersStore } from '@/stores/usePlayersStore';
    import { storeToRefs } from 'pinia';

    const popupVisible = ref(false)
    const { removeAllPlayers } = usePlayersStore()
    const { players } = storeToRefs(usePlayersStore())

    /** Called when the button is clicked */
    function click(): void {
        if (players.value.length == 0)
            return
        popupVisible.value = true
    }

    /** Called when the confirm button of the popup is clicked */
    function clickConfirm(): void {
        removeAllPlayers()
        popupVisible.value = false
    }
</script>

<template>
    <ActionButton
        :icon="mdiTrashCan"
        color="red"
        @click="click"
        :style="{ width: '7.6em' }">
        Clear players
    </ActionButton>
    <Popup v-model:visible="popupVisible">
        <template #title>Clear players</template>
        Are you sure you want to remove all players?
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