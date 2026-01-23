<script lang="ts" setup>
    import { usePlayersStore } from '@/stores/usePlayersStore';
    import { storeToRefs } from 'pinia';
    import PlayerScore from './PlayerScore.vue';
    import NoScoresMessage from './NoScoresMessage.vue';

    const { players } = storeToRefs(usePlayersStore())
</script>

<template>
    <div v-if="players.length > 0" :class="$style.container" >
        <PlayerScore
            v-for="player in players"
            :key="player.name"
            :player="player" />
    </div>
    <NoScoresMessage v-else />
</template>

<style lang="scss" module>
    .container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        max-width: 15em;
        margin-top: 2em;
    }
</style>