<template>
    <card>
        <template v-slot:header>
            Earth Cycle
        </template>

        <div class="flex justify-between" v-if="earthCycle">
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
import {Platform} from '../../enum/Platform'; // eslint-disable-line
import Timer from '../Timer.vue';
import {EarthCycle} from '../../models/EarthCycle'; // eslint-disable-line
import {usePlatforms} from '../../composition/usePlatforms';
import {useWarframeStatusApi} from '../../composition/useWarframeStatusApi';
import {watch} from 'vue';

export default {
    name: 'EarthCycle',
    components: {
        Card,
        Timer,
    },
    async setup() {
        const { result, call } = await useWarframeStatusApi<EarthCycle>();
        const {platform} = usePlatforms;

        watch(platform, async (nextPlatform: Platform) => {
            await call(nextPlatform, Endpoint.EARTH_CYCLE);
        }, {
            immediate: true,
        });

        return {
            earthCycle: result,
            getActive: () => result.value.state.slice(0, 1).toUpperCase() + result.value.state.slice(1),
        }
    }
}
</script>

<style scoped>

</style>
