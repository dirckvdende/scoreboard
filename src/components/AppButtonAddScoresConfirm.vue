<script lang="ts" setup>
    import { storeToRefs } from 'pinia';
    import ActionButton from './ActionButton.vue';
    import { mdiCheck } from '@mdi/js';
    import { useSettingsStore } from '@/stores/useSettingsStore';
    import { usePlayersStore } from '@/stores/usePlayersStore';

    const { editMode } = storeToRefs(useSettingsStore())
    const { addNextScores, resetNextScores } = usePlayersStore()
</script>

<template>
    <ActionButton
        :icon="mdiCheck"
        color="green"
        @click="addNextScores(); editMode = false; resetNextScores()">
        Add scores
    </ActionButton>
</template>