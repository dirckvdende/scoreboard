<script lang="ts" setup>
    import { usePlayersStore } from '@/stores/usePlayersStore';
    import ActionButton from './ActionButton.vue';
    import { mdiArrowULeftTop } from '@mdi/js';
    import { storeToRefs } from 'pinia';
    import { useSettingsStore } from '@/stores/useSettingsStore';

    const { undo } = usePlayersStore()
    const { editMode } = storeToRefs(useSettingsStore())

    /** Called when the button is clicked */
    function click(): void {
        const done = undo()
        if (done)
            editMode.value = true
    }
</script>

<template>
    <ActionButton
        :icon="mdiArrowULeftTop"
        color="yellow"
        @click="click">
        Undo add
    </ActionButton>
</template>