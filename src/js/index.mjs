import { Popup } from "./popup.mjs";
class Scores {
    #players = [];
    #scoresContainer = document.getElementById("scores-output");
    #playersContainer = document.getElementById("players-output");
    #addScoresContainer = document.getElementById("add-scores-output");
    get players() {
        return this.#players.length;
    }
    get rounds() {
        if (this.#players.length == 0)
            return 1;
        return this.#players[0].scores.length;
    }
    getScore(name) {
        let player = this.#getPlayer(name);
        if (player == null)
            throw new Error(`Could not find player with name ${name}`);
        return this.#playerScore(player);
    }
    clear() {
        this.#players = [];
    }
    clearScores() {
        for (let player of this.#players)
            player.scores = [0];
    }
    add(name) {
        if (this.has(name))
            throw new Error(`Player with name ${name} already exists`);
        let scores = [];
        let rounds = this.rounds;
        for (let i = 0; i < rounds; i++)
            scores.push(0);
        this.#players.push({ name, scores });
    }
    has(name) {
        return this.#getPlayer(name) != null;
    }
    updateDisplay() {
        this.#playersContainer.innerHTML = "";
        this.#scoresContainer.innerHTML = "";
        this.#addScoresContainer.innerHTML = "";
        this.#players.sort((a, b) => {
            let diff = this.#playerScore(b) - this.#playerScore(a);
            if (diff != 0)
                return diff;
            return a.name.localeCompare(b.name);
        });
        for (let player of this.#players) {
            this.#addPlayerRow(player);
            this.#addScoreRow(player);
            this.#addAddScoresRow(player);
        }
        let hasPlayers = this.#players.length > 0;
        document.getElementById("no-players-message").style.display = (hasPlayers ? "none" : "block");
        document.getElementById("scores-table").style.display = (hasPlayers ?
            "flex" : "none");
    }
    addEnteredScores() {
        for (let player of this.#players) {
            if (player.inputElement == undefined)
                throw new Error("Unexpected undefined input element");
            if (player.inputElement.value == "")
                continue;
            try {
                Number(player.inputElement.value);
            }
            catch {
                return;
            }
        }
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
    undoLastScores() {
        if (this.rounds < 2)
            return;
        let diffs = new Map();
        for (let player of this.#players) {
            diffs.set(player, player.scores[player.scores.length - 1] -
                player.scores[player.scores.length - 2]);
            player.scores.pop();
        }
        this.updateDisplay();
        for (let player of this.#players)
            player.inputElement.value = diffs.get(player).toFixed(0);
    }
    #addPlayerRow(player) {
        let container = document.createElement("div");
        container.classList.add("player");
        let span = document.createElement("span");
        span.innerText = player.name;
        container.append(span);
        this.#playersContainer.append(container);
    }
    #addScoreRow(player) {
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
                if (diff < -1e-5)
                    diffElement.classList.add("score-diff-neg");
                cell.append(diffElement);
            }
            if (i == player.scores.length - 1)
                cell.classList.add("score-cell-current");
            row.append(cell);
        }
        this.#scoresContainer.append(row);
    }
    #addAddScoresRow(player) {
        let container = document.createElement("div");
        container.classList.add("add-score");
        let input = document.createElement("input");
        input.type = "text";
        input.name = "add-score";
        container.append(input);
        this.#addScoresContainer.append(container);
        player.inputElement = input;
    }
    #getPlayer(name) {
        for (let player of this.#players)
            if (player.name == name)
                return player;
        return null;
    }
    #playerScore(player) {
        if (player.scores.length == 0)
            return 0;
        return player.scores[player.scores.length - 1];
    }
}
function loadExpandButton() {
    let state = false;
    let element = document.getElementById("expand-button");
    let scoresElement = document.getElementById("scores");
    let iconElement = element.querySelector(".icon");
    element.addEventListener("click", () => {
        state = !state;
        scoresElement.classList.toggle("scores-history", state);
        iconElement.innerText = state ? "remove" : "add";
        if (state)
            scoresElement.scrollLeft = scoresElement.scrollWidth;
    });
}
function loadClearPlayersButton() {
    let button = document.getElementById("clear-players-button");
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
function loadAddPlayerButton() {
    let button = document.getElementById("add-player-button");
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
function loadAddScoresButton() {
    let button = document.getElementById("add-scores-button");
    button.addEventListener("click", () => scores.addEnteredScores());
}
function loadUndoButton() {
    let button = document.getElementById("undo-button");
    button.addEventListener("click", () => scores.undoLastScores());
}
function loadClearScoresButton() {
    let button = document.getElementById("clear-scores-button");
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
let scores = new Scores();
scores.updateDisplay();
loadExpandButton();
loadClearPlayersButton();
loadAddPlayerButton();
loadAddScoresButton();
loadUndoButton();
loadClearScoresButton();
window.onbeforeunload = () => {
    return "Stored scores will be deleted when this page is closed!";
};
