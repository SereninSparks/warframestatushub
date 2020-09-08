<template>
    <card>
        <template v-slot:header>
            Cetus Cycle
        </template>

        <div class="flex justify-between" v-if="cetusCycle">
            <div>
                Current: <strong>{{ getActive() }}</strong>
            </div>

            <timer :target="cetusCycle.expiry" />
        </div>
    </card>
</template>

<script lang="ts">
import Card from '../Card.vue';
import {Endpoint} from '../../enum/Endpoint';
import {Platform} from '../../enum/Platform'; // eslint-disable-line
import Timer from '../Timer.vue';
import {CetusCycle} from '../../models/CetusCycle'; // eslint-disable-line
import {usePlatforms} from '../../composition/usePlatforms';
import {useWarframeStatusApi} from '../../composition/useWarframeStatusApi';
import {watch} from 'vue';

export default {
    name: 'CetusCycle',
    components: {
        Card,
        Timer,
    },
    async setup() {
        const { result, call } = await useWarframeStatusApi<CetusCycle>();
        const {platform} = usePlatforms;

        watch(platform, async (nextPlatform: Platform) => {
            await call(nextPlatform, Endpoint.CETUS_CYCLE);
        }, {
            immediate: true,
        });

        return {
            cetusCycle: result,
            getActive: () => result.value.state.slice(0, 1).toUpperCase() + result.value.state.slice(1),
        }
    }
}
</script>

<style scoped>

</style>
