
import { defineStore } from "pinia";
import { useCssVar } from "@vueuse/core";

/**
 * Store for adapting viewport height. The updateHeight should only be called
 * when the application is loaded or fullscreen status changes. This prevents
 * weird behavior when a phone keyboard is displayed (hopefully)
 */
export const useHeightStore = defineStore("height", () => {
    const height = useCssVar("--viewport-height", document.body,
        { initialValue: "100vh" })
    
    /** Updated the stored height */
    function updateHeight(): void {
        height.value = `${window.innerHeight}px`
    }

    return { height, updateHeight }
})