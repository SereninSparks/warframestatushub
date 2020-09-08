<template>
    <div class="wrapper grid min-h-screen">
        <Header />

        <main class="md:flex">
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
        </main>

        <Footer />
    </div>
</template>

<script lang="ts">
import CambionCycle from './components/trackers/CambionCycle.vue';
import Card from './components/Card.vue';
import CetusCycle from './components/trackers/CetusCycle.vue';
import EarthCycle from './components/trackers/EarthCycle.vue';
import Footer from './components/layout/Footer.vue';
import Header from './components/layout/Header.vue';
import VallisCycle from './components/trackers/VallisCycle.vue';
import VoidTrader from './components/trackers/VoidTrader.vue';

export default {
    name: 'App',
    components: {
        Card,
        CambionCycle,
        CetusCycle,
        EarthCycle,
        Footer,
        Header,
        VallisCycle,
        VoidTrader,
    },
}
</script>

<style scoped>
    .wrapper {
        grid-template-rows: var(--header-size) var(--app-size) var(--footer-size);
    }
</style>
