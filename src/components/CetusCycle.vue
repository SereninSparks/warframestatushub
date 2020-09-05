<template>
    <card>
        <template v-slot:header>
            Cetus Cycle
        </template>

        <div class="flex justify-between">
            <div>
                Current: <strong>{{ getActive() }}</strong>
            </div>

            <timer :target="cetusCycle.expiry" />
        </div>
    </card>
</template>

<script lang="ts">
import Card from '../components/Card.vue';
import {Endpoint} from '../enum/Endpoint';
import {Platform} from '../enum/Platform';
import Timer from '../components/Timer.vue';
import {CetusCycle} from '../models/CetusCycle'; // eslint-disable-line
import {useWarframeStatusApi} from '../composition/useWarframeStatusApi';

export default {
    name: 'CetusCycle',
    components: {
        Card,
        Timer,
    },
    async setup() {
        const { result, call } = await useWarframeStatusApi<CetusCycle>();

        await call(Platform.PC, Endpoint.CETUS_CYCLE);

        return {
            cetusCycle: result,
            getActive: () => result.value.state.slice(0, 1).toUpperCase() + result.value.state.slice(1),
        }
    }
}
</script>

<style scoped>

</style>
