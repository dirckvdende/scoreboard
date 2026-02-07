<script lang="ts" setup>
    import { usePlayerScore } from '@/composables/usePlayerScore';
    import { usePlayersStore } from '@/stores/usePlayersStore';
    import { useSettingsStore } from '@/stores/useSettingsStore';
    import { type Player } from '@/types/Player';
    import { storeToRefs } from 'pinia';

    const { player } = defineProps<{
        /** The player to display the score of */
        player: Player
    }>()

    const { scoreText, scoreChange, scoreChangeText } = usePlayerScore(player)
    const { maxScoreLength } = storeToRefs(usePlayersStore())
    const { editMode } = storeToRefs(useSettingsStore())
</script>

<template>
    <div :class="$style.row">
        <div :class="$style.name">
            {{ player.name }}
        </div>
        <div v-if="!editMode" :class="$style.score" :style="{
            width: `${.45 + maxScoreLength * .55}em`,
        }">
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
        <div v-else :class="$style.edit">
            <input
                :class="$style.input"
                type="number"
                :value="player.nextScore"
                @input="player.nextScore = String(($event.target as any).value)"
                />
        </div>
    </div>
</template>

<style lang="scss" module>
    .row {
        width: 100%;
        display: flex;
        font-size: 2em;
        align-items: center;
        height: 1.7em;

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

            .text {
                color: var(--text-color);
            }

            .annotation {
                position: absolute;
                font-weight: bold;
                top: -.7em;
                right: 0;
                font-size: .4em;
            }
        }

        .edit {
            width: 2.5em;
            flex-shrink: 0;
            text-align: center;
            position: relative;

            .input {
                border: .07em solid var(--text-color-very-soft);
                width: 100%;
                border-radius: .3em;
                box-sizing: border-box;
                padding: .1em .2em .1em .4em;
                font-size: .9em;
                margin: .05em 0;
                background-color: var(--background-color);
            }
        }
    }
</style>