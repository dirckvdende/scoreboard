
import { parseNextScore, type Player } from "@/types/Player";
import { defineStore } from "pinia";
import { computed, readonly, ref } from "vue";

/** Store with the list of players and functions to modify this list */
export const usePlayersStore = defineStore("players", () => {
    const players = ref<Player[]>([])
    const gameLength = computed(() => players.value[0]?.scores.length ?? 1)

    /**
     * Get the current score of a player
     * @param player The player to get the score of
     * @returns The score
     */
    function scoreOf(player: Player): number {
        return player.scores[player.scores.length - 1] ?? 0
    }

    /**
     * Sort the players by score (descending) and then alphabetically
     * (ascending)
     */
    function sort(): void {
        players.value.sort((playerA, playerB) => {
            if (scoreOf(playerA) == scoreOf(playerB))
                return playerA.name.localeCompare(playerB.name)
            return scoreOf(playerB) - scoreOf(playerA)
        })
    }

    /**
     * Add a player
     * @param name The name of the player
     * @returns A boolean indicating if the player was added. Returns false if
     * a player with the given name already exists
     */
    function addPlayer(name: string): boolean {
        if (players.value.findIndex(({ name: otherName }) =>
            otherName == name) != -1)
            return false
        let scores: number[] = []
        for (let i = 0; i < gameLength.value; i++)
            scores.push(0)
        players.value.push({
            name,
            scores,
            nextScore: "",
        })
        sort()
        return true
    }

    /**
     * Remove a player by their name. This has no effect if the player doesn't
     * exist
     * @param name The name of the player
     * @return A boolean indicating if the player existed (and therefore has
     * been removed)
     */
    function removePlayer(name: string): boolean {
        const lengthBefore = players.value.length
        players.value = players.value.filter(({ name: otherName }) =>
            otherName != name)
        sort()
        return players.value.length != lengthBefore
    }

    /**
     * Add values from nextScore fields to the score histories. If all nextScore
     * fields are empty, nothing happens
     */
    function addNextScores(): void {
        if (players.value.findIndex(({ nextScore }) => nextScore != "") == -1)
            return
        for (const player of players.value) {
            const score = player.scores[player.scores.length - 1] ?? 0
            player.scores.push(score + parseNextScore(player))
        }
        resetNextScores()
        sort()
    }

    /** Reset nextScore fields of all players */
    function resetNextScores(): void {
        for (const player of players.value)
            player.nextScore = ""
    }

    /** Reset the scores (including histories) of all players */
    function resetScores(): void {
        for (const player of players.value) {
            player.scores = [0]
            player.nextScore = ""
        }
        sort()
    }

    /** Remove all players */
    function removeAllPlayers(): void {
        players.value = []
    }

    /**
     * Undo the last scores that were added and put them in the nextScore
     * fields. Has no effect if the game length is 1
     */
    function undo(): void {
        if (gameLength.value <= 1)
            return
        for (const player of players.value) {
            const len = player.scores.length
            const diff = player.scores[len - 1]! - player.scores[len - 2]!
            player.nextScore = String(diff)
            player.scores.pop()
        }
        sort()
    }

    return {
        /** List of players with their names and score histories */
        players,
        /** Length of the scores history of the players */
        gameLength,
        addPlayer,
        removePlayer,
        addNextScores,
        resetNextScores,
        resetScores,
        removeAllPlayers,
        undo,
    }
})