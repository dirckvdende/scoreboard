<script lang="ts" setup>
    import { useTemplateRef } from 'vue';

    const { placeholder } = defineProps<{
        /** Placeholder of the input field */
        placeholder?: string
    }>()

    /** Value of the input field */
    const model = defineModel({ default: "" })

    const emit = defineEmits<{
        /** Emitted when the input value changes */
        (e: "input"): void
    }>()

    defineExpose({ focus })

    const input = useTemplateRef("input")

    /** Focus the input element */
    function focus(): void {
        input.value?.focus()
    }

</script>

<template>
    <input
        :class="$style.input"
        v-model.trim="model"
        :placeholder="placeholder"
        @input="emit('input')"
        ref="input" />
</template>

<style lang="scss" module>
    .input {
        width: 100%;
        border: .1em solid var(--text-color-very-soft);
        box-sizing: border-box;
        background-color: transparent;
        border-radius: .3em;
        padding: .3em .6em;
        font-size: 1em;

        &:focus {
            border-color: var(--text-color-soft);
        }
    }
</style>