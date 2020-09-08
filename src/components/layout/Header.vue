<template>
    <header class="px-2 flex items-center justify-between">
        <Logo />

        <PlatformPicker />
    </header>
</template>

<script>
import Logo from './Logo.vue';
import PlatformPicker from '../platform/PlatformPicker.vue';

export default {
    name: 'Header',
    components: {
        Logo,
        PlatformPicker,
    },
}
</script>

<style scoped>

</style>
