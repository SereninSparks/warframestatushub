<template>
    <div class="flex">
        <Suspense>
            <div class="w-full md:w-1/2 xl:w-1/3">
                <VoidTrader />
            </div>

            <div class="w-full md:w-1/2 xl:w-1/3">
                <CambionCycle />
            </div>
        </Suspense>
    </div>
</template>

<script lang="ts">
import CambionCycle from './components/CambionCycle.vue';
import VoidTrader from './components/VoidTrader.vue';

export default {
    name: 'App',
    components: {
        CambionCycle,
        VoidTrader,
    },
}
</script>
