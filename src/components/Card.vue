<template>
    <div class="card">
        <header>
            <slot name="header" />
        </header>

        <slot />
    </div>
</template>

<script lang="ts">
export default {
    name: 'Card',
}
</script>

<style scoped>
    .card {
        @apply px-4 py-3 rounded border border-gray-300 shadow;
    }

    header {
        @apply font-bold text-xl;
    }
</style>
