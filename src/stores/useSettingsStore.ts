
import { defineStore } from "pinia";
import { ref } from "vue";

/** General settings and state of the program */
export const useSettingsStore = defineStore("settings", () => ({
    /**
     * Mode that is currently active:
     * - `default`: Non-editing display mode
     * - `edit-scores`: Mode to edit players scores
     * - `edit-wins`: Mode to edit number of wins
     */
    mode: ref<"default" | "edit-scores" | "edit-wins">("default"),
}))