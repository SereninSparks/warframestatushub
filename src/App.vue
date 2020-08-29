<template>
    <div class="flex flex-col">
        <div class="w-full md:w-1/2 lg:w-1/3">
            <card>Hello yes I am real card do you wanna go skateboards?</card>
        </div>
    </div>
</template>

<script lang="ts">
import Card from './components/Card.vue';

export default {
    name: 'App',
    components: {
        Card,
    },
}
</script>
