
import { type Player } from "@/types/Player";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usePlayersStore = defineStore("players", () => {
    const players = ref<Player[]>([])
    return { players }
})