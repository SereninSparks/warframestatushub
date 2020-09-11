<template>
    <header class="px-2 flex items-center justify-end">
        <PlatformPicker />
    </header>
</template>

<script>
import PlatformPicker from '../platform/PlatformPicker.vue';

export default {
    name: 'Header',
    components: {
        PlatformPicker,
    },
}
</script>

<style scoped>

</style>
