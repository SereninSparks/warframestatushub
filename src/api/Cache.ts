import {Endpoint} from '../enum/Endpoint';
import {Platform} from '../enum/Platform';
import localForage from 'localforage';

const localForageInstance = localForage.createInstance({ name: 'cache' });

export class Cache {
    private static cacheInstance?: Cache;

    public static get instance(): Cache {
        if (!Cache.cacheInstance) {
            Cache.cacheInstance = new Cache();
        }

        return Cache.cacheInstance;
    }

    public async get<T extends { expiry: string }>(platform: Platform, endpoint: Endpoint): Promise<T> {
        const key = `${platform}_${endpoint}`;

        const value = await localForageInstance.getItem<T>(key);

        if (value === null) {
            throw new Error('Cache miss');
        }

        const expireTime = new Date(value.expiry);

        if (expireTime.getTime() - new Date().getTime() <= 1000) {
            throw new Error('Expired');
        }

        return value;
    }

    public async set<T>(platform: Platform, endpoint: Endpoint, object: T): Promise<void> {
        const key = `${platform}_${endpoint}`;

        await localForageInstance.setItem<T>(key, object);
    }
}
