<script setup lang="ts">
    import { mdiAccountPlus, mdiCheck, mdiCancel } from '@mdi/js';
    import { ref } from 'vue';
    import ActionButton from './ActionButton.vue';
    import Popup from './Popup.vue';
    import PopupRow from './PopupRow.vue';
    import PopupRowButton from './PopupRowButton.vue';
    import { usePlayersStore } from '@/stores/usePlayersStore';
    import PopupError from './PopupError.vue';

    const popupVisible = ref(false)
    const { addPlayer } = usePlayersStore()
    const error = ref("Error! This is not good")
</script>

<template>
    <ActionButton
        :icon="mdiAccountPlus"
        color="blue"
        @click="popupVisible = true">
        Add player
    </ActionButton>
    <Popup v-model:visible="popupVisible">
        <template #title>Add Player</template>
        <input type="text" placeholder="Player name" />
        <PopupError>{{ error }}</PopupError>
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
                @click="">
                Confirm
            </PopupRowButton>
        </PopupRow>
    </Popup>
</template>