
export { Popup };

/**
 * Class that displays a popup as soon as its constructed. Use to close() method
 * to close it.
 */
class Popup {

    // Container of all popup HTML elements
    #container: HTMLElement;
    // HTML element containing the popup title
    #titleElement: HTMLElement;
    // HTML element with the content of the popup
    #contentElement: HTMLElement;

    /**
     * Constructor
     */
    constructor() {
        let {container, title, content} = this.#createElements();
        this.#container = container;
        this.#titleElement = title;
        this.#contentElement = content;
    }

    /**
     * Close the popup
     */
    close(): void {
        this.#container.remove();
    }

    /**
     * Title displayed at the top of the popup
     */
    get title(): string { return this.#titleElement.innerText; }
    set title(value: string) { this.#titleElement.innerText = value; }

    /**
     * Content HTML element of the popup
     */
    get content(): HTMLElement { return this.#contentElement; }

    /**
     * Create the HTML elements necessary for the popup
     * @returns The container, title and content HTML elements
     */
    #createElements(): {container: HTMLElement, title: HTMLElement,
    content: HTMLElement} {
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
        return {container, title, content};
    }

}