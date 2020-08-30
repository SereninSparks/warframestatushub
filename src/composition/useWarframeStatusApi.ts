import {Ref, ref} from 'vue';
import {Endpoint} from '../enum/Endpoint';
import {Platform} from '../enum/Platform';
import {WarframeStatusApi} from '../api/WarframeStatusApi';

export interface UsesWarframeStatusApi<T> {
    call(platform: Platform, endpoint: Endpoint);
    result: Ref<T>;
}

export function useWarframeStatusApi<T>(): UsesWarframeStatusApi<T> {
    const api = new WarframeStatusApi();

    const result = ref(null);

    async function call(platform: Platform, endpoint: Endpoint): Promise<void> {
        result.value = await api.call<T>(platform, endpoint);
    }

    return {
        call,
        result,
    };
}
