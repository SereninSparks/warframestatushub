import {Ref, ref} from 'vue';
import {Cache} from '../api/Cache';
import {Endpoint} from '../enum/Endpoint';
import {Entity} from '../api/Entity';
import {Platform} from '../enum/Platform';
import {WarframeStatusApi} from '../api/WarframeStatusApi';

export interface UsesWarframeStatusApi<T> {
    call(platform: Platform, endpoint: Endpoint): Promise<void>;
    result: Ref<T>;
}

export function useWarframeStatusApi<T extends Entity>(): UsesWarframeStatusApi<T> {
    const api = new WarframeStatusApi(Cache.instance);

    const result = ref();

    async function call(platform: Platform, endpoint: Endpoint): Promise<void> {
        result.value = await api.call<T>(platform, endpoint);
    }

    return {
        call,
        result,
    };
}
