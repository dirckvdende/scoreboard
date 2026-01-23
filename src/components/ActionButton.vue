<script lang="ts" setup>
    import type { AccentColor } from '@/types/AccentColor';
    import Icon from './Icon.vue';

    const {
        icon,
        color = "green",
    } = defineProps<{
        /** SVG path definition of the button icon */
        icon: string
        /** Accent color to give the background of the button (default green) */
        color?: AccentColor
    }>()

    const emit = defineEmits<{
        /** Emitted when the button is clicked */
        (e: "click"): void
    }>()
</script>

<template>
    <button :class="$style.button" @click="emit('click')" :style="{
        '--background-color': `var(--accent-color-${color})`,
    }">
        <Icon :class="$style.icon" :path="icon" />
        <div :class="$style.text">
            <slot />
        </div>
    </button>
</template>

<style lang="scss" module>
    .button {
        --color: white;
        color: var(--color);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: .4em;
        width: 3.6em;
        height: 3.6em;
        justify-content: center;
        box-sizing: border-box;
        cursor: pointer;
        border-radius: .4em;
        flex-shrink: 0;
        background-color: var(--background-color);

        :global(.dark-theme) & {
            --color: #eee;
            background-color: color-mix(in srgb, var(--background-color),
                transparent 50%);
        }

        .icon {
            fill: var(--color);
            width: 1.3em;
            height: 1.3em;
            margin-bottom: .2em;
            flex-shrink: 0;
        }

        .text {
            width: 100%;
            font-size: .5em;
            text-align: center;
        }

        &:hover {
            border: .1em solid var(--inverse-background-color);
            padding: .3em;
        }
    }
</style>