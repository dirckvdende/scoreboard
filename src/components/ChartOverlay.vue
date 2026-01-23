<script lang="ts" setup>
    import { mdiArrowLeft } from '@mdi/js';
    import Icon from './Icon.vue';
    import { Line } from 'vue-chartjs';
    import {
        Chart as ChartJS,
        LinearScale,
        CategoryScale,
        BarElement,
        LineElement,
        PointElement,
        Legend,
        type ChartDataset,
        type Point,
    } from 'chart.js'
    import { useCssVar } from '@vueuse/core';
    import { computed, useTemplateRef } from 'vue';
    import { storeToRefs } from 'pinia';
    import { usePlayersStore } from '@/stores/usePlayersStore';

    ChartJS.register(
        LinearScale,
        CategoryScale,
        BarElement,
        LineElement,
        PointElement,
        Legend,
    )

    /** Whether the overlay is visible */
    const visible = defineModel("visible", { default: true })

    // Container element for getting accent colors
    const container = useTemplateRef("container")
    // These colors will be assigned to the lines in order
    const colors = [
        useCssVar("--accent-color-green", container, { observe: true }),
        useCssVar("--accent-color-yellow", container, { observe: true }),
        useCssVar("--accent-color-blue", container, { observe: true }),
        useCssVar("--accent-color-pink", container, { observe: true }),
        useCssVar("--accent-color-red", container, { observe: true }),
        useCssVar("--accent-color-cyan", container, { observe: true }),
    ]
    const gridColor = useCssVar("--chart-grid-color", container,
        { observe: true })

    const { players, gameLength } = storeToRefs(usePlayersStore())

    type DatasetType = ChartDataset<"line", (number | Point | null)[]>
    const datasets = computed<DatasetType[]>(() => {
        return Array.from(players.value.entries()).map(([index, player]) => ({
            label: player.name,
            data: player.scores,
            borderWidth: 3,
            borderColor: colors[index % colors.length]!.value,
            pointBackgroundColor: colors[index % colors.length]!.value,
            backgroundColor: colors[index % colors.length]!.value,
        }))
    })
    const labels = computed(() => {
        const out: string[] = []
        for (let i = 0; i < gameLength.value; i++)
            out.push("")
        return out
    })
</script>

<template>
    <Teleport to="body">
        <div :class="$style.container" v-if="visible" ref="container">
            <div :class="$style.head">
                <button :class="$style.close" @click="visible = false">
                    <Icon :class="$style.icon" :path="mdiArrowLeft" />
                </button>
            </div>
            <div :class="$style.body">
                <div :class="$style.chart">
                    <Line :data="{
                        labels,
                        datasets,
                    }" :options="{
                        scales: {
                            x: {
                                ticks: { display: false },
                                grid: {
                                    lineWidth: 2,
                                    color: gridColor,
                                },
                                border: { display: false },
                            },
                            y: {
                                beginAtZero: true,
                                grace: '20%',
                                ticks: {
                                    font: {
                                        family: 'Lexend',
                                        size: 16,
                                    },
                                    autoSkip: true,
                                    autoSkipPadding: 20,
                                    padding: 5,
                                },
                                grid: {
                                    lineWidth: 2,
                                    color: gridColor,
                                },
                                border: { display: false },
                            },
                        },
                        maintainAspectRatio: false,
                        animation: {
                            duration: 0,
                        },
                        plugins: {
                            legend: {
                                position: 'bottom',
                                onClick: () => {},
                                labels: {
                                    font: {
                                        family: 'Lexend',
                                        size: 16,
                                    },
                                },
                            },
                        },
                    }" />
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style lang="scss" module>
    .container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--background-color-body);
        display: flex;
        flex-direction: column;
        align-items: stretch;
        box-sizing: border-box;
        padding:
            calc(1em + env(safe-area-inset-top))
            calc(1em + env(safe-area-inset-right))
            calc(1em + env(safe-area-inset-bottom))
            calc(1em + env(safe-area-inset-left));

        .head {
            flex-shrink: 0;
            box-sizing: border-box;
            width: 100%;
            display: flex;

            .close {
                height: 2.3em;
                width: 2.3em;
                box-sizing: border-box;
                padding: .4em;
                border-radius: 50%;
                cursor: pointer;

                .icon {
                    fill: var(--text-color-soft);
                }

                &:hover {
                    background-color: #0002;
                }
            }
        }

        .body {
            height: 100%;
            flex-shrink: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .chart {
                width: 100%;
                max-height: 100%;
                height: calc(100% - 3em);
            }
        }
    }
</style>