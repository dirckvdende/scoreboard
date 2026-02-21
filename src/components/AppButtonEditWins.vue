<script lang="ts" setup>
    import { storeToRefs } from 'pinia';
    import ActionButton from './ActionButton.vue';
    import { mdiCrown } from '@mdi/js';
    import { useSettingsStore } from '@/stores/useSettingsStore';
    import { usePlayersStore } from '@/stores/usePlayersStore';

    const { mode } = storeToRefs(useSettingsStore())
    const { players } = storeToRefs(usePlayersStore())

    /** Called when the button is clicked */
    function click(): void {
        if (players.value.length == 0)
            return
        mode.value = "edit-wins"
    }
</script>

<template>
    <ActionButton
        :icon="mdiCrown"
        color="purple"
        @click="click">
        Edit wins
    </ActionButton>
</template>