export { Popup };
class Popup {
    #container;
    #titleElement;
    #contentElement;
    constructor() {
        let { container, title, content } = this.#createElements();
        this.#container = container;
        this.#titleElement = title;
        this.#contentElement = content;
    }
    close() {
        this.#container.remove();
    }
    get title() { return this.#titleElement.innerText; }
    set title(value) { this.#titleElement.innerText = value; }
    get content() { return this.#contentElement; }
    #createElements() {
        let container = document.createElement("div");
        container.classList.add("popup");
        let background = document.createElement("div");
        background.classList.add("background");
        let main = document.createElement("div");
        main.classList.add("main");
        let title = document.createElement("h2");
        title.classList.add("title");
        let content = document.createElement("div");
        content.classList.add("content");
        let closeButton = document.createElement("button");
        closeButton.classList.add("close-button");
        let closeIcon = document.createElement("span");
        closeIcon.innerText = "close";
        closeIcon.classList.add("icon", "material-symbols-outlined");
        closeButton.append(closeIcon);
        main.append(title, content, closeButton);
        container.append(background, main);
        closeButton.addEventListener("click", () => this.close());
        background.addEventListener("click", () => this.close());
        document.body.append(container);
        return { container, title, content };
    }
}
