<script lang="ts" setup>
    import { mdiTrashCan, mdiCancel, mdiCheck } from '@mdi/js';
    import ActionButton from './ActionButton.vue';
    import { ref } from 'vue';
    import Popup from './Popup.vue';
    import PopupRow from './PopupRow.vue';
    import PopupRowButton from './PopupRowButton.vue';
    import { usePlayersStore } from '@/stores/usePlayersStore';

    const popupVisible = ref(false)
    const { removeAllPlayers } = usePlayersStore()
</script>

<template>
    <ActionButton
        :icon="mdiTrashCan"
        color="red"
        @click="popupVisible = true">
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
                @click="removeAllPlayers(); popupVisible = false">
                Confirm
            </PopupRowButton>
        </PopupRow>
    </Popup>
</template>