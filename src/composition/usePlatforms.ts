import {Ref, ref} from 'vue';
import {Platform} from '../enum/Platform';

interface UsesPlatform {
    platform: Ref<Platform>;
    setPlatform(platform: Platform);
}

const storageKey = 'last_selected_platform';

const lastSelectedPlatform: Platform = (localStorage.getItem(storageKey) as Platform | null) ?? Platform.PC;

const platform = ref<Platform>(lastSelectedPlatform);

function setPlatform(nextPlatform: Platform): void {
    platform.value = nextPlatform;
    localStorage.setItem(storageKey, nextPlatform);
}

export const usePlatforms: UsesPlatform = {
    platform,
    setPlatform,
};
