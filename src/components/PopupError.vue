<script setup lang="ts">
    import { mdiAlertCircle } from '@mdi/js';
    import Icon from './Icon.vue';
    import { computed, useTemplateRef } from 'vue';

    const textSlot = useTemplateRef("text")
    const visible = computed(() => Boolean(textSlot.value?.innerHTML.trim()))
</script>

<template>
    <div :class="$style.container" :style="{
        display: visible ? undefined : 'none',
    }" v-if="$slots.default">
        <Icon :path="mdiAlertCircle" :class="$style.icon" />
        <div :class="$style.text" ref="text"><slot /></div>
    </div>
</template>

<style lang="scss" module>
    .container {
        display: flex;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        padding: .3em .6em;
        border-radius: .3em;
        background-color: var(--accent-color-red);
        color: white;
        margin: .5em 0;
        
        .icon {
            flex-shrink: 0;
            width: 1em;
            height: 1em;
            fill: white;
            margin-right: .3em;
        }

        .text {
            width: 100%;
            flex-shrink: 1;
            font-size: .7em;
        }
    }
</style>