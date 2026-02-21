<script lang="ts" setup>
    import { storeToRefs } from 'pinia';
    import ActionButton from './ActionButton.vue';
    import { mdiCheck } from '@mdi/js';
    import { useSettingsStore } from '@/stores/useSettingsStore';

    const { mode } = storeToRefs(useSettingsStore())
</script>

<template>
    <ActionButton
        :icon="mdiCheck"
        color="green"
        @click="mode = 'default';">
        Confirm
    </ActionButton>
</template>