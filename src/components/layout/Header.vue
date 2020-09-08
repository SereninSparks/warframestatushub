<template>
    <header class="px-2 flex items-center justify-between">
        <Logo />
    </header>
</template>

<script>
import Logo from './Logo.vue';
export default {
    name: 'Header',
    components: {
        Logo,
    },
}
</script>

<style scoped>

</style>
