<template>
    <img class="max-h-full" :src="logo" />
</template>

<script lang="ts">
import logo from '../../assets/logo.png';

export default {
    name: 'Logo',
    data() {
        return {
            logo,
        };
    },
}
</script>
