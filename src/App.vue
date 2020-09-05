<template>
    <div class="md:flex">
        <Suspense>
            <template #default>
                <div class="w-full md:w-1/2 xl:w-1/3">
                    <VoidTrader />
                </div>

                <div class="w-full md:w-1/2 xl:w-1/3">
                    <EarthCycle />
                    <CetusCycle />
                    <VallisCycle />
                    <CambionCycle />
                </div>
            </template>

            <template #fallback>
                <div class="w-full">
                    <card>
                        <template v-slot:header>
                            Loading...
                        </template>

                        Ordis is ea- <strong>getting tired of waiting</strong> -waiting patiently for the API, Operator!
                    </card>
                </div>
            </template>
        </Suspense>
    </div>
</template>

<script lang="ts">
import CambionCycle from './components/CambionCycle.vue';
import Card from './components/Card.vue';
import CetusCycle from './components/CetusCycle.vue';
import EarthCycle from './components/EarthCycle.vue';
import VallisCycle from './components/VallisCycle.vue';
import VoidTrader from './components/VoidTrader.vue';

export default {
    name: 'App',
    components: {
        Card,
        CambionCycle,
        CetusCycle,
        EarthCycle,
        VallisCycle,
        VoidTrader,
    },
}
</script>
