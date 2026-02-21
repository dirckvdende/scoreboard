<script lang="ts" setup>
    import { usePlayerScore } from '@/composables/usePlayerScore';
    import { usePlayersStore } from '@/stores/usePlayersStore';
    import { useSettingsStore } from '@/stores/useSettingsStore';
    import { type Player } from '@/types/Player';
    import { storeToRefs } from 'pinia';
    import Icon from './Icon.vue';
    import { mdiCrown, mdiCrownCircle, mdiMinus, mdiPlus } from '@mdi/js';

    const { player } = defineProps<{
        /** The player to display the score of */
        player: Player
    }>()

    const { scoreText, scoreChange, scoreChangeText } = usePlayerScore(player)
    const { maxScoreLength } = storeToRefs(usePlayersStore())
    const { mode } = storeToRefs(useSettingsStore())

    /** Decrement the number of wins of the player */
    function decreaseWins(): void {
        if (player.wins > 0)
            player.wins--
    }

    /** Increment the number of wins of the player */
    function increaseWins(): void {
        player.wins++
    }
</script>

<template>
    <div :class="$style.row">
        <div :class="$style.name">
            {{ player.name }}
            <div :class="$style['win-icons']">
                <template v-if="player.wins <= 10">
                    <Icon
                        v-for="_ in player.wins"
                        :class="$style.icon"
                        :path="mdiCrownCircle" />
                </template>
                <template v-else>
                    <div :class="$style.number">
                        {{ player.wins.toFixed() }} ×
                    </div>
                    <Icon
                        :class="$style.icon"
                        :path="mdiCrownCircle" />
                </template>
            </div>
        </div>
        <div v-if="mode == 'default'" :class="$style.score" :style="{
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
        <div v-if="mode == 'edit-scores'" :class="$style.edit">
            <input
                :class="$style.input"
                type="number"
                :value="player.nextScore"
                @input="player.nextScore = String(($event.target as any).value)"
                />
        </div>
        <div v-if="mode == 'edit-wins'" :class="$style['edit-wins']">
            <button :class="$style['modifier-button']" @click="decreaseWins">
                <Icon :path="mdiMinus" :class="$style.icon" />
            </button>
            <button :class="$style['modifier-button']" @click="increaseWins">
                <Icon :path="mdiPlus" :class="$style.icon" />
            </button>
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
        position: relative;

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

        .win-icons {
            pointer-events: none;
            user-select: none;
            position: absolute;
            bottom: -.45em;
            left: 0;
            width: 100%;
            overflow: hidden;
            height: 1em;
            display: flex;
            align-items: center;

            .number {
                font-size: .4em;
                margin-right: .3em;
                color: var(--accent-color-yellow);
            }

            .icon {
                height: .5em;
                width: .5em;
                flex-shrink: 0;
                fill: var(--accent-color-yellow);
            }
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

        .edit-wins {
            width: 2.5em;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            .modifier-button {
                display: block;
                width: 1em;
                height: 1em;
                box-sizing: border-box;
                padding: .15em;
                margin-left: .2em;
                border-radius: 50%;
                background-color: var(--inverse-background-color);
                cursor: pointer;

                .icon {
                    fill: var(--inverse-text-color);
                }

                &:hover {
                    opacity: .8;
                }
            }
        }
    }
</style>