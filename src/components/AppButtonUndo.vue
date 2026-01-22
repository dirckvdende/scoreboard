<script lang="ts" setup>
    import { usePlayersStore } from '@/stores/usePlayersStore';
    import ActionButton from './ActionButton.vue';
    import { mdiArrowULeftTop } from '@mdi/js';
    import { storeToRefs } from 'pinia';
    import { useSettingsStore } from '@/stores/useSettingsStore';

    const { undo } = usePlayersStore()
    const { editMode } = storeToRefs(useSettingsStore())
</script>

<template>
    <ActionButton
        :icon="mdiArrowULeftTop"
        color="yellow"
        @click="undo(); editMode = true">
        Undo add
    </ActionButton>
</template>