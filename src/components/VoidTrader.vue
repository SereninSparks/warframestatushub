<template>
    <div class="void-trader">
        <card>
            <template v-slot:header>
                {{ voidTrader.character }}
            </template>

            <div class="flex justify-between">
                <div>
                    <span v-if="voidTrader.active">Departs from </span>
                    <span v-else>Arrives at </span>
                    <strong>{{ voidTrader.location }}</strong>
                </div>

                <timer :target="voidTrader.active ? voidTrader.expiry : voidTrader.activation" />
            </div>
        </card>
    </div>
</template>

<script lang="ts">
import Card from './Card.vue';
import {useWarframeStatusApi} from '../composition/useWarframeStatusApi';
import {Platform} from '../enum/Platform';
import {Endpoint} from '../enum/Endpoint';
import {VoidTrader} from '../models/VoidTrader'; // eslint-disable-line
import Timer from './Timer.vue';

export default {
    name: 'VoidTrader',
    components: {
        Card,
        Timer,
    },
    async setup() {
        const { call, result } = useWarframeStatusApi<VoidTrader>();

        await call(Platform.PC, Endpoint.VOIDTRADER);

        return {
            voidTrader: result,
        };
    }
}
</script>

<style scoped>

</style>
