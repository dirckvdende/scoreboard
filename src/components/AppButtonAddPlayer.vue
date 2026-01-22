<script setup lang="ts">
    import { mdiAccountPlus, mdiCheck, mdiCancel } from '@mdi/js';
    import { ref, useTemplateRef } from 'vue';
    import ActionButton from './ActionButton.vue';
    import Popup from './Popup.vue';
    import PopupRow from './PopupRow.vue';
    import PopupRowButton from './PopupRowButton.vue';
    import { usePlayersStore } from '@/stores/usePlayersStore';
    import PopupError from './PopupError.vue';
    import PopupInput from './PopupInput.vue';

    const popupVisible = ref(false)
    const { addPlayer } = usePlayersStore()
    const name = ref("")
    const error = ref("")

    /** Called when the confirm button is clicked */
    function confirm(): void {
        if (name.value == "") {
            error.value = "Player name must not be empty"
            return
        }
        const result = addPlayer(name.value)
        if (!result) {
            error.value = "Player name is already present"
            return
        }
        popupVisible.value = false
    }

    const input = useTemplateRef("input")
</script>

<template>
    <ActionButton
        :icon="mdiAccountPlus"
        color="blue"
        @click="popupVisible = true">
        Add player
    </ActionButton>
    <Popup
        v-model:visible="popupVisible"
        @open="error = ''; name = ''; input?.focus()">
        <template #title>Add player</template>
        <form @submit="$event.preventDefault(); confirm()">
            <PopupInput
                placeholder="Player name"
                v-model="name"
                @input="error = ''"
                ref="input" />
        </form>
        <PopupError :visible="Boolean(error)">{{ error }}</PopupError>
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
                @click="confirm">
                Confirm
            </PopupRowButton>
        </PopupRow>
    </Popup>
</template>