<template>
    <card>
        <template v-slot:header>
            Cambion Cycle
        </template>

        <div class="flex justify-between">
            <div>
                Current: <strong>{{ getActive() }}</strong>
            </div>

            <timer :target="cambionCycle.expiry" />
        </div>
    </card>
</template>

<script lang="ts">
import {CambionCycle} from '../models/CambionCycle'; // eslint-disable-line
import Card from './Card.vue';
import {Endpoint} from '../enum/Endpoint';
import {Platform} from '../enum/Platform';
import Timer from './Timer.vue';
import {useWarframeStatusApi} from '../composition/useWarframeStatusApi';

export default {
    name: 'CambionCycle',
    components: {
        Card,
        Timer,
    },
    async setup() {
        const { call, result } = useWarframeStatusApi<CambionCycle>();
        await call(Platform.PC, Endpoint.CAMBION_CYCLE);

        return {
            cambionCycle: result,
            getActive: () => result.value.active.slice(0, 1).toUpperCase() + result.value.active.slice(1),
        };
    },
}
</script>
