
/** Registered player with name and score history */
export type Player = {
    /** Name of the player */
    name: string
    /** History of scores, with newest scores last */
    scores: number[]
    /**
     * Amount that should be added to this player's score next, as a string
     * because it's sources from an input field
     */
    nextScore: string
    /** Number of times the player has won (users add wins manually) */
    wins: number
}

/**
 * Parse the nextScore field and get the difference in score
 * @param player The player to parse the nextScore of
 * @returns The difference in score as a number
 */
export function parseNextScore(player: Player): number {
    if (player.nextScore.trim().length == 0)
        return 0
    const value = Number(player.nextScore)
    if (!Number.isSafeInteger(value))
        return 0
    return value
}