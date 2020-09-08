<template>
    <card v-if="cambionCycle">
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
import {CambionCycle} from '../../models/CambionCycle'; // eslint-disable-line
import Card from '../Card.vue';
import {Endpoint} from '../../enum/Endpoint';
import {Platform} from '../../enum/Platform'; // eslint-disable-line
import Timer from '../Timer.vue';
import {usePlatforms} from '../../composition/usePlatforms';
import {useWarframeStatusApi} from '../../composition/useWarframeStatusApi';
import {watch} from 'vue';

export default {
    name: 'CambionCycle',
    components: {
        Card,
        Timer,
    },
    async setup() {
        const { call, result } = useWarframeStatusApi<CambionCycle>();
        const {platform} = usePlatforms;

        watch(platform, async (nextPlatform: Platform) => {
            await call(nextPlatform, Endpoint.CAMBION_CYCLE);
        }, {
            immediate: true,
        });

        return {
            cambionCycle: result,
            getActive: () => result.value.active.slice(0, 1).toUpperCase() + result.value.active.slice(1),
        };
    },
}
</script>
