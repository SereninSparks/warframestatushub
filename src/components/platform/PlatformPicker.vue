<template>
    <div class="platform-picker flex">
        <PlatformComponent v-for="platform of platforms" :key="platform" :platform="platform" :active="platform === currentPlatform" @click="setPlatform(platform)" />
    </div>
</template>

<script lang="ts">
import PlatformComponent from './Platform.vue';
import {Platform as PlatformEnum} from '../../enum/Platform';
import {usePlatforms} from '../../composition/usePlatforms';

export default {
    name: 'PlatformPicker',
    components: {
        PlatformComponent,
    },
    setup() {
        const {platform: currentPlatform, setPlatform} = usePlatforms;

        return {
            currentPlatform,
            setPlatform,
            platforms: Object.keys(PlatformEnum).map(key => PlatformEnum[key]),
        };
    }
}
</script>

<style scoped>

</style>
