<template>
    <div :class="$style.row">
        <slot />
    </div>
</template>

<style lang="scss" module>
    .row {
        width: 100%;
        margin: .5em 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: right;

        &:last-child {
            margin-bottom: 0;
        }
    }
</style>