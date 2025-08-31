import { Popup } from "./popup.mjs";

/**
 * Player in the Scores class
 */
type Player = {
    name: string,
    scores: number[],
    inputElement?: HTMLInputElement,
};

/**
 * Class to easily keep track of the scores of players
 */
class Scores {

    // List of players, their scores, and other related info
    #players: Player[] = [];
    // Element that contains score rows
    #scoresContainer: HTMLElement = document.getElementById("scores-output")!;
    // Element that contains player names
    #playersContainer: HTMLElement = document.getElementById("players-output")!;
    // Element that contains score input fields
    #addScoresContainer: HTMLElement = document.getElementById(
    "add-scores-output")!;

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
        return this.#playerScore(player);
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
     * Update the display of scores
     */
    updateDisplay(): void {
        this.#playersContainer.innerHTML = "";
        this.#scoresContainer.innerHTML = "";
        this.#addScoresContainer.innerHTML = "";
        this.#players.sort((a, b) => this.#playerScore(b) -
        this.#playerScore(a));
        for (let player of this.#players) {
            this.#addPlayerRow(player);
            this.#addScoreRow(player);
            this.#addAddScoresRow(player);
        }
        let hasPlayers = this.#players.length > 0;
        document.getElementById("no-players-message")!.style.display = (
        hasPlayers ? "none" : "block");
        document.getElementById("scores-table")!.style.display = (hasPlayers ?
        "flex" : "none");
    }

    /**
     * Add the entered scores for all players to the end of the history, and
     * clear out entered scores. Also updates the display
     */
    addEnteredScores(): void {
        // Check if all input elements contain a valid value
        for (let player of this.#players) {
            if (player.inputElement == undefined)
                throw new Error("Unexpected undefined input element");
            if (player.inputElement.value == "")
                continue;
            try {
                Number(player.inputElement.value);
            } catch {
                return;
            }
        }
        // Add scores
        for (let player of this.#players) {
            if (player.inputElement == undefined)
                throw new Error("Unexpected undefined input element");
            let value = (player.inputElement.value == "" ? 0 :
            Number(player.inputElement.value));
            player.scores.push(this.#playerScore(player) + Math.round(value));
            player.inputElement.value = "";
        }
        this.updateDisplay();
    }

    /**
     * Undo the last entered scores and put them in the input elements. Has no
     * effect if there are no rounds. Also updates the display
     */
    undoLastScores(): void {
        if (this.rounds < 2)
            return;
        let diffs: Map<Player, number> = new Map();
        for (let player of this.#players) {
            diffs.set(player, player.scores[player.scores.length - 1] -
            player.scores[player.scores.length - 2]);
            player.scores.pop();
        }
        this.updateDisplay();
        for (let player of this.#players)
            player.inputElement!.value = diffs.get(player)!.toFixed(0);
    }

    /**
     * Add a player name row
     * @param player The player to add the name of
     */
    #addPlayerRow(player: Player): void {
        let container = document.createElement("div");
        container.classList.add("player");
        let span = document.createElement("span");
        span.innerText = player.name;
        container.append(span);
        this.#playersContainer.append(container);
    }

    /**
     * Add a row with scores for the given player
     * @param player The player to add the score row for
     */
    #addScoreRow(player: Player): void {
        let row = document.createElement("div");
        row.classList.add("score-row");
        for (let i = 0; i < player.scores.length; i++) {
            let cell = document.createElement("div");
            cell.classList.add("score-cell");
            let score = document.createElement("span");
            score.classList.add("score");
            score.innerText = player.scores[i].toFixed(0);
            cell.append(score);
            if (i > 0) {
                let diff = player.scores[i] - player.scores[i - 1];
                let diffElement = document.createElement("span");
                diffElement.classList.add("score-diff");
                let diffText = diff.toFixed(0);
                if (diffText.length == 0 || diffText[0] != "-")
                    diffText = "+" + diffText;
                diffElement.innerText = diffText;
                if (diff < -1e5)
                    diffElement.classList.add('score-diff-neg');
                cell.append(diffElement);
            }
            if (i == player.scores.length - 1)
                cell.classList.add("score-cell-current");
            row.append(cell);
        }
        this.#scoresContainer.append(row);
    }

    /**
     * Add an input field for the given player
     * @param player The player to add the input field for
     */
    #addAddScoresRow(player: Player): void {
        let container = document.createElement("div");
        container.classList.add("add-score");
        let input = document.createElement("input");
        input.type = "text";
        input.name = "add-score";
        container.append(input);
        this.#addScoresContainer.append(container);
        player.inputElement = input;
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

    /**
     * Get the current score of a player
     * @param player The player
     * @returns The player's current score
     */
    #playerScore(player: Player): number {
        if (player.scores.length == 0)
            return 0;
        return player.scores[player.scores.length - 1];
    }

}

/**
 * Load the plus/minus icon button that shows/hides score history
 */
function loadExpandButton(): void {
    let state = false;
    let element = document.getElementById("expand-button") as HTMLButtonElement;
    let scoresElement = document.getElementById("scores") as HTMLElement;
    let iconElement = element.querySelector(".icon") as HTMLElement;
    element.addEventListener("click", () => {
        state = !state;
        scoresElement.classList.toggle("scores-history", state);
        iconElement.innerText = state ? "remove" : "add";
        if (state)
            scoresElement.scrollLeft = scoresElement.scrollWidth;
    });
}

/**
 * Load the clear players button
 */
function loadClearPlayersButton(): void {
    let button = (document.getElementById("clear-players-button") as
    HTMLButtonElement);
    button.addEventListener("click", () => {
        let popup = new Popup();
        popup.title = "Clear players";
        let warnText = document.createElement("div");
        warnText.innerText = "Are you sure you want to clear all players?";
        let buttonRow = document.createElement("div");
        buttonRow.classList.add("wide-button-row");
        let confirmButton = document.createElement("button");
        confirmButton.innerText = "Confirm";
        buttonRow.append(confirmButton);
        popup.content.append(warnText, buttonRow);
        confirmButton.addEventListener("click", () => {
            scores.clear();
            scores.updateDisplay();
            popup.close();
        });
    });
}

/**
 * Load the button to add players
 */
function loadAddPlayerButton(): void {
    let button = (document.getElementById("add-player-button") as
    HTMLButtonElement);
    button.addEventListener("click", () => {
        let popup = new Popup();
        popup.title = "Add player";
        let input = document.createElement("input");
        input.classList.add("wide-text-input");
        input.placeholder = "Player name";
        input.name = "player-name";
        let buttonRow = document.createElement("div");
        buttonRow.classList.add("wide-button-row");
        let confirmButton = document.createElement("button");
        confirmButton.innerText = "Confirm";
        buttonRow.append(confirmButton);
        let warnText = document.createElement("div");
        warnText.innerText = "";
        popup.content.append(input, warnText, buttonRow);
        input.focus();
        confirmButton.addEventListener("click", () => {
            if (input.value == "")
                return;
            if (scores.has(input.value)) {
                warnText.innerText = "Player with that name already exists.";
                return;
            }
            scores.add(input.value);
            scores.updateDisplay();
            popup.close();
        });
    });
}

/**
 * Load the button to add the currently entered scores
 */
function loadAddScoresButton(): void {
    let button = (document.getElementById("add-scores-button") as
    HTMLButtonElement);
    button.addEventListener("click", () => scores.addEnteredScores());
}

/**
 * Load the button to undo the last scores added
 */
function loadUndoButton(): void {
    let button = (document.getElementById("undo-button") as
    HTMLButtonElement);
    button.addEventListener("click", () => scores.undoLastScores());
}

/**
 * Load the button that resets all scores to zero
 */
function loadClearScoresButton(): void {
    let button = (document.getElementById("clear-scores-button") as
    HTMLButtonElement);
    button.addEventListener("click", () => {
        let popup = new Popup();
        popup.title = "Clear scores";
        let warnText = document.createElement("div");
        warnText.innerText = ("Are you sure you want to reset all scores to " +
        "zero?");
        let buttonRow = document.createElement("div");
        buttonRow.classList.add("wide-button-row");
        let confirmButton = document.createElement("button");
        confirmButton.innerText = "Confirm";
        buttonRow.append(confirmButton);
        popup.content.append(warnText, buttonRow);
        confirmButton.addEventListener("click", () => {
            scores.clearScores();
            scores.updateDisplay();
            popup.close();
        });
    });
}

// Keep track of current scores
let scores = new Scores();
scores.updateDisplay();
loadExpandButton();
loadClearPlayersButton();
loadAddPlayerButton();
loadAddScoresButton();
loadUndoButton();
loadClearScoresButton();

// Display a warning if the page is refreshed/closed
window.onbeforeunload = () => {
    return "Stored scores will be deleted when this page is closed!";
}