<script lang="ts" setup>
    import { storeToRefs } from 'pinia';
    import ActionButton from './ActionButton.vue';
    import { mdiCancel } from '@mdi/js';
    import { useSettingsStore } from '@/stores/useSettingsStore';

    const { editMode } = storeToRefs(useSettingsStore())
</script>

<template>
    <ActionButton :icon="mdiCancel" color="red" @click="editMode = false">
        Cancel
    </ActionButton>
</template>