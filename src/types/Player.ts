
/** Registered player with name and score history */
export type Player = {
    /** Name of the player */
    name: string
    /** History of scores, with newest scores last */
    scores: number[]
}