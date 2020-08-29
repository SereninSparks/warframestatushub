<template>
    <div class="flex flex-col p-2">
        <Suspense>
            <div class="w-full md:w-1/2 xl:w-1/3">
                <VoidTrader />
            </div>
        </Suspense>
    </div>
</template>

<script lang="ts">
import VoidTrader from './components/VoidTrader.vue';

export default {
    name: 'App',
    components: {
        VoidTrader,
    },
}
</script>
