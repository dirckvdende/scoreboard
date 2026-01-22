
import { type Player } from "@/types/Player";
import { defineStore } from "pinia";
import { computed, readonly, ref } from "vue";

/** Store with the list of players and functions to modify this list */
export const usePlayersStore = defineStore("players", () => {
    const players = ref<Player[]>([])
    const gameLength = computed(() => players.value[0]?.scores.length ?? 1)

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
        players.value.push({ name, scores })
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
        return players.value.length != lengthBefore
    }

    return {
        /** Readonly ref of players */
        players: readonly(players),
        /** Length of the scores history of the players */
        gameLength,
        addPlayer,
        removePlayer,
    }
})