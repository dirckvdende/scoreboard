
import { type Player } from "@/types/Player";
import { computed, type MaybeRefOrGetter, toValue } from "vue";

/**
 * Composable for getting the current score and score change of a player
 * @param player The player to get score info of
 * @returns Computed refs of scores
 */
export function usePlayerScore(player: MaybeRefOrGetter<Player>) {
    const score = computed(() => {
        const history = toValue(player).scores
        return history[history.length - 1] ?? 0
    })
    const scoreText = computed(() => toValue(player).scores.length == 0
        ? "—" : score.value.toFixed(0))
    const scoreChange = computed(() => {
        const history = toValue(player).scores
        const last = history[history.length - 2]
        return score.value - (last ?? 0)
    })
    const scoreChangeText = computed(() => {
        const history = toValue(player).scores
        const last = history[history.length - 2]
        if (last === undefined)
            return ""
        if (scoreChange.value == 0)
            return "="
        const sign = scoreChange.value < 0 ? "-" : "+"
        const abs = Math.abs(scoreChange.value)
        return last === undefined ? "" : sign + abs.toFixed(0)
    })
    return { score, scoreText, scoreChange, scoreChangeText }
}