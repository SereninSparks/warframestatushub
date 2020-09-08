<template>
    <card>
        <template v-slot:header>
            Vallis Cycle
        </template>

        <div class="flex justify-between" v-if="vallisCycle">
            <div>
                Current: <strong>{{ getActive() }}</strong>
            </div>

            <timer :target="vallisCycle.expiry" />
        </div>
    </card>
</template>

<script lang="ts">
import Card from '../Card.vue';
import {Endpoint} from '../../enum/Endpoint';
import {Platform} from '../../enum/Platform'; // eslint-disable-line
import Timer from '../Timer.vue';
import {VallisCycle} from '../../models/VallisCycle'; // eslint-disable-line
import {usePlatforms} from '../../composition/usePlatforms';
import {useWarframeStatusApi} from '../../composition/useWarframeStatusApi';
import {watch} from 'vue';

export default {
    name: 'VallisCycle',
    components: {
        Card,
        Timer,
    },
    async setup() {
        const { result, call } = await useWarframeStatusApi<VallisCycle>();
        const {platform} = usePlatforms;

        watch(platform, async (nextPlatform: Platform) => {
            await call(nextPlatform, Endpoint.VALLIS_CYCLE);
        }, {
            immediate: true,
        });

        return {
            vallisCycle: result,
            getActive: () => result.value.state.slice(0, 1).toUpperCase() + result.value.state.slice(1),
        }
    }
}
</script>

<style scoped>

</style>
