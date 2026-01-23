<script lang="ts" setup>
    import { storeToRefs } from 'pinia';
    import ActionButton from './ActionButton.vue';
    import { mdiChartAreaspline } from '@mdi/js';
    import { usePlayersStore } from '@/stores/usePlayersStore';
    import ChartOverlay from './ChartOverlay.vue';
    import { ref } from 'vue';

    const chartVisible = ref(false)
    const { players } = storeToRefs(usePlayersStore())

    /** Called when the button is clicked */
    function click(): void {
        if (players.value.length == 0)
            return
        chartVisible.value = true
    }
</script>

<template>
    <ActionButton
        :icon="mdiChartAreaspline"
        color="pink"
        @click="click">
        Chart
    </ActionButton>
    <ChartOverlay v-model:visible="chartVisible" />
</template>