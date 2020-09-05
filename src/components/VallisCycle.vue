<template>
    <card>
        <template v-slot:header>
            Vallis Cycle
        </template>

        <div class="flex justify-between">
            <div>
                Current: <strong>{{ getActive() }}</strong>
            </div>

            <timer :target="vallisCycle.expiry" />
        </div>
    </card>
</template>

<script lang="ts">
import Card from '../components/Card.vue';
import {Endpoint} from '../enum/Endpoint';
import {Platform} from '../enum/Platform';
import Timer from '../components/Timer.vue';
import {VallisCycle} from '../models/VallisCycle'; // eslint-disable-line
import {useWarframeStatusApi} from '../composition/useWarframeStatusApi';

export default {
    name: 'VallisCycle',
    components: {
        Card,
        Timer,
    },
    async setup() {
        const { result, call } = await useWarframeStatusApi<VallisCycle>();

        await call(Platform.PC, Endpoint.VALLIS_CYCLE);

        return {
            vallisCycle: result,
            getActive: () => result.value.state.slice(0, 1).toUpperCase() + result.value.state.slice(1),
        }
    }
}
</script>

<style scoped>

</style>
