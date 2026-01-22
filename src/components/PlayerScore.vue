<script lang="ts" setup>
    import { usePlayerScore } from '@/composables/usePlayerScore';
    import { type Player } from '@/types/Player';

    const { player } = defineProps<{
        /** The player to display the score of */
        player: Player
    }>()

    const { scoreText, scoreChange, scoreChangeText } = usePlayerScore(player)
</script>

<template>
    <div :class="$style.row">
        <div :class="$style.name">
            {{ player.name }}
        </div>
        <div :class="$style.score">
            <div :class="$style.text">
                {{ scoreText }}
            </div>
            <div :class="$style.annotation" :style="{
                color: scoreChange == 0 ? 'var(--text-color-very-soft)' :
                    scoreChange < 0 ? 'var(--accent-color-red)' :
                    'var(--accent-color-green)',
            }">
                {{ scoreChangeText }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
    .row {
        width: 100%;
        display: flex;
        font-size: 2em;
        align-items: center;

        .name {
            width: 100%;
            flex-shrink: 1;
            color: var(--text-color-very-soft);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding-right: .3em;
            box-sizing: border-box;
            font-size: .9em;
        }

        .score {
            width: 2em;
            flex-shrink: 0;
            text-align: center;
            position: relative;
            padding: .25em 0;

            .text {

            }

            .annotation {
                position: absolute;
                font-weight: bold;
                top: 0;
                right: 0;
                font-size: .4em;
            }
        }
    }
</style>