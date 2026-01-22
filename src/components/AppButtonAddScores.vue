<script lang="ts" setup>
    import { storeToRefs } from 'pinia';
    import ActionButton from './ActionButton.vue';
    import { mdiPlus } from '@mdi/js';
    import { useSettingsStore } from '@/stores/useSettingsStore';
    import { usePlayersStore } from '@/stores/usePlayersStore';

    const { editMode } = storeToRefs(useSettingsStore())
    const { resetNextScores } = usePlayersStore()
</script>

<template>
    <ActionButton
        :icon="mdiPlus"
        color="green"
        @click="resetNextScores(); editMode = true">
        Add scores
    </ActionButton>
</template>