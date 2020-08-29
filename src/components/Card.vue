<template>
    <div class="card">
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
</style>
