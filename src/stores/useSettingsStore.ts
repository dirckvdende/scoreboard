
import { defineStore } from "pinia";
import { ref } from "vue";

/** General settings and state of the program */
export const useSettingsStore = defineStore("settings", () => ({
    /** Whether the "edit scores mode" is currently active */
    editMode: ref(false),
}))