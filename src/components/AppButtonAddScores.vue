<script lang="ts" setup>
    import { storeToRefs } from 'pinia';
    import ActionButton from './ActionButton.vue';
    import { mdiPlus } from '@mdi/js';
    import { useSettingsStore } from '@/stores/useSettingsStore';
    import { usePlayersStore } from '@/stores/usePlayersStore';

    const { editMode } = storeToRefs(useSettingsStore())
    const { players } = storeToRefs(usePlayersStore())
    const { resetNextScores } = usePlayersStore()

    /** Called when the button is clicked */
    function click(): void {
        if (players.value.length == 0)
            return
        resetNextScores()
        editMode.value = true
    }
</script>

<template>
    <ActionButton
        :icon="mdiPlus"
        color="green"
        @click="click">
        Add scores
    </ActionButton>
</template>