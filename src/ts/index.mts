
/**
 * Player in the Scores class
 */
type Player = {
    name: string,
    scores: number[],
};

/**
 * Class to easily keep track of the scores of players
 */
class Scores {

    // List of players, their scores, and other related info
    #players: Player[] = [];

    /**
     * Number of players currently saved
     */
    get players(): number {
        return this.#players.length;
    }

    /**
     * Number of rounds saved (starts at 1 because players are assigned zero
     * points at the start)
     */
    get rounds(): number {
        if (this.#players.length == 0)
            return 1;
        return this.#players[0].scores.length;
    }

    /**
     * Get the current score of a player. If the player doesn't exist an error
     * is thrown
     * @param name The name of the player
     * @returns The player score as a number
     */
    getScore(name: string): number {
        let player = this.#getPlayer(name);
        if (player == null)
            throw new Error(`Could not find player with name ${name}`);
        if (player.scores.length == 0)
            return 0;
        return player.scores[player.scores.length - 1];
    }

    /**
     * Clear all players
     */
    clear(): void {
        this.#players = [];
    }

    /**
     * Reset scores of all players to zero
     */
    clearScores(): void {
        for (let player of this.#players)
            player.scores = [0];
    }

    /**
     * Add a player with the given name. If the player already exists and error
     * is thrown
     * @param name The name of the player to add
     */
    add(name: string): void {
        if (this.has(name))
            throw new Error(`Player with name ${name} already exists`);
        let scores = [];
        let rounds = this.rounds;
        for (let i = 0; i < rounds; i++)
            scores.push(0);
        this.#players.push({name, scores});
    }

    /**
     * Check if there exists a player with the given name
     * @param name The name of the player to search for
     * @returns If the player exists
     */
    has(name: string): boolean {
        return this.#getPlayer(name) != null;
    }

    /**
     * Get full player info from the player's name
     * @param name The name of the player
     * @returns The player with the given name, or null if player was not found
     */
    #getPlayer(name: string): Player | null {
        for (let player of this.#players)
            if (player.name == name)
                return player;
        return null;
    }

}

let scores = new Scores();