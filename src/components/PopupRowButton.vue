<script lang="ts" setup>
    import { type AccentColor } from '@/types/AccentColor';
    import Icon from './Icon.vue';

    const {
        icon,
        color = "green",
    } = defineProps<{
        /** SVG path definition of an icon */
        icon?: string
        /** Accent color to give the button (default green) */
        color?: AccentColor
    }>()

    const emit = defineEmits<{
        /** Emitted when the button is clicked */
        (e: "click"): void
    }>()
</script>

<template>
    <button :class="$style.button" :style="{
        backgroundColor: `var(--accent-color-${color})`,
    }" @click="emit('click')">
        <div :class="$style.icon" v-if="icon">
            <Icon :path="icon" :class="$style.svg" />
        </div>
        <div :class="$style.text" v-if="$slots.default"><slot /></div>
        <div :class="$style.effect" />
    </button>
</template>

<style lang="scss" module>
    .button {
        border: none;
        padding: .4em .7em;
        color: white;
        font-size: .9em;
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        border-radius: .4em;

        .icon {
            fill: white;
            width: 1.1em;
            height: 1.1em;
            margin-right: .4em;

            .svg {
                width: 100%;
                height: 100%;
            }
        }

        .effect {
            display: none;
            position: absolute;
            pointer-events: none;
            top: .1em;
            left: .1em;
            right: .1em;
            bottom: .1em;
            border: .1em solid white;
            border-radius: .35em;
        }

        &:hover {
            .effect {
                display: initial;
            }
        }
    }
</style>