<template>
    <div class="void-trader">
        <card v-if="voidTrader">
            <template v-slot:header>
                {{ voidTrader.character }}
            </template>

            <div class="flex justify-between">
                <div>
                    {{ voidTraderStatus }}
                    <strong v-if="newLocationKnown">{{ voidTrader.location }}</strong>
                </div>

                <timer :target="voidTrader.active ? voidTrader.expiry : voidTrader.activation" />
            </div>
        </card>
    </div>
</template>

<script lang="ts">
import {computed, watch} from 'vue';
import Card from '../Card.vue';
import {Endpoint} from '../../enum/Endpoint';
import {Platform} from '../../enum/Platform'; // eslint-disable-line
import Timer from '../Timer.vue';
import {VoidTrader} from '../../models/VoidTrader'; // eslint-disable-line
import {usePlatforms} from '../../composition/usePlatforms';
import {useWarframeStatusApi} from '../../composition/useWarframeStatusApi';

export default {
    name: 'VoidTrader',
    components: {
        Card,
        Timer,
    },
    async setup() {
        const { call, result } = useWarframeStatusApi<VoidTrader>();
        const {platform} = usePlatforms;

        watch(platform, async (nextPlatform: Platform) => {
            await call(nextPlatform, Endpoint.VOID_TRADER);
        }, {
            immediate: true,
        });

        const newLocationKnown = computed<boolean>(() => !result.value.endString?.startsWith('-'));

        const voidTraderStatus = computed<string>(() => {
            const { active } = result.value;

            if (!active && !newLocationKnown) {
                return 'Next location not known yet';
            }

            if (!active) {
                return 'Arrives at';
            }

            return 'Departs from';
        });

        return {
            voidTrader: result,
            newLocationKnown,
            voidTraderStatus,
        };
    }
}
</script>

<style scoped>

</style>
