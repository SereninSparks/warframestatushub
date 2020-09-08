<template>
    <card>
        <template v-slot:header>
            Earth Cycle
        </template>

        <div class="flex justify-between">
            <div>
                Current: <strong>{{ getActive() }}</strong>
            </div>

            <timer :target="earthCycle.expiry" />
        </div>
    </card>
</template>

<script lang="ts">
import Card from '../Card.vue';
import {Endpoint} from '../../enum/Endpoint';
import {Platform} from '../../enum/Platform';
import Timer from '../Timer.vue';
import {EarthCycle} from '../../models/EarthCycle'; // eslint-disable-line
import {useWarframeStatusApi} from '../../composition/useWarframeStatusApi';

export default {
    name: 'EarthCycle',
    components: {
        Card,
        Timer,
    },
    async setup() {
        const { result, call } = await useWarframeStatusApi<EarthCycle>();

        await call(Platform.PC, Endpoint.EARTH_CYCLE);

        return {
            earthCycle: result,
            getActive: () => result.value.state.slice(0, 1).toUpperCase() + result.value.state.slice(1),
        }
    }
}
</script>

<style scoped>

</style>
