<script lang="ts" setup>
    import { mdiClose } from '@mdi/js';
    import Icon from './Icon.vue';

    /** Whether the popup is visible */
    const visible = defineModel("visible", { default: false })
</script>

<template>
    <Teleport to="body">
        <div :class="$style.container" v-if="visible">
            <div :class="$style.popup">
                <div :class="$style.head">
                    <div :class="$style.space" />
                    <div :class="$style.title">
                        <slot name="title">Attention</slot>
                    </div>
                    <button :class="$style.close" @click="visible = false">
                        <Icon :path="mdiClose" :class="$style.icon" />
                    </button>
                </div>
                <div :class="$style.body">
                    <slot />
                </div>
            </div>
            <div :class="$style.background" @click="visible = false" />
        </div>
    </Teleport>
</template>

<style lang="scss" module>
    .container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        padding: 1em;
        box-sizing: border-box;

        .popup {
            width: 100%;
            height: auto;
            box-shadow: 0 .3em .8em -.4em #0008;
            max-width: 17em;

            .head {
                background-color: var(--inverse-background-color);
                color: var(--inverse-text-color);
                display: flex;
                justify-content: center;
                align-items: center;
                padding: .4em .8em;
                box-sizing: border-box;
                width: 100%;

                .space {
                    width: 1.2em;
                    flex-shrink: 0;
                }

                .title {
                    width: 100%;
                    flex-shrink: 1;
                    text-align: center;
                    box-sizing: border-box;
                    padding: 0 .5em;
                }

                .close {
                    width: 1.5em;
                    height: 1.5em;
                    padding: .2em;
                    border-radius: 50%;
                    border: .09em solid transparent;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    font-size: 1em;
                    background-color: transparent;
                    margin: 0;
                    box-sizing: border-box;

                    &:hover {
                        border-color: var(--inverse-text-color);
                    }

                    .icon {
                        width: 100%;
                        aspect-ratio: 1 / 1;
                        fill: var(--inverse-text-color);
                    }
                }
            }

            .body {
                background-color: var(--background-color);
                box-sizing: border-box;
                width: 100%;
                padding: .6em .8em .8em .8em;
                font-size: .9em;
            }
        }

        .background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #0003;
            z-index: -1;
        }
    }
</style>