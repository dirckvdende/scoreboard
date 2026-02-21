<script lang="ts" setup>
    import { storeToRefs } from 'pinia';
    import ActionButton from './ActionButton.vue';
    import { mdiCancel } from '@mdi/js';
    import { useSettingsStore } from '@/stores/useSettingsStore';
    import { usePlayersStore } from '@/stores/usePlayersStore';

    const { mode } = storeToRefs(useSettingsStore())
    const { resetNextScores } = usePlayersStore()
</script>

<template>
    <ActionButton
        :icon="mdiCancel"
        color="red"
        @click="mode = 'default'; resetNextScores()">
        Don't add
    </ActionButton>
</template>