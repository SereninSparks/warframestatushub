import {BrowserStorage} from '../storage/BrowserStorage';
import {Endpoint} from '../enum/Endpoint';
import {Platform} from '../enum/Platform';

type Entity = {
    expiry: string;
    activation: string;
}

export class Cache {
    private static cacheInstance?: Cache;

    public static get instance(): Cache {
        if (!Cache.cacheInstance) {
            Cache.cacheInstance = new Cache(
                new BrowserStorage({
                    prefix: 'cache',
                    backend: localStorage,
                })
            );
        }

        return Cache.cacheInstance;
    }

    public constructor(private readonly storage: BrowserStorage) {}

    public async get<T extends Entity>(platform: Platform, endpoint: Endpoint): Promise<T> {
        const key = this.makeKey(platform, endpoint);

        const value = await this.storage.getItem<T>(key);

        if (value === null) {
            throw new Error('Cache miss');
        }

        const lastCheckedAt = await this.getLastCheckedAt(platform, endpoint);

        if (lastCheckedAt) {
            const activationTime = new Date(value.activation);

            if (this.hasActivatedSinceLastCheck(lastCheckedAt, activationTime)) {
                throw new Error('Has changed');
            }
        }

        const expireTime = new Date(value.expiry);

        if (this.isExpired(expireTime)) {
            throw new Error('Expired');
        }

        await this.touch(platform, endpoint);

        return value;
    }

    public async set<T>(platform: Platform, endpoint: Endpoint, object: T): Promise<void> {
        const key = this.makeKey(platform, endpoint);

        await this.storage.setItem<T>(key, object);
    }

    public async touch(platform: Platform, endpoint: Endpoint): Promise<void> {
        const key = `${this.makeKey(platform, endpoint)}_checked_at`;

        await this.storage.setItem<number>(key, Date.now());
    }

    public async getLastCheckedAt(platform: Platform, endpoint: Endpoint): Promise<Date | null> {
        const key = `${this.makeKey(platform, endpoint)}_checked_at`;

        const lastCheckedAt = await this.storage.getItem<number>(key);

        if (lastCheckedAt === null) {
            return null;
        }

        return new Date(lastCheckedAt);
    }

    public async clear(): Promise<void> {
        await this.storage.clear();
    }

    private isExpired(expireDate: Date): boolean
    {
        return expireDate.getTime() - Date.now() <= 1000;
    }

    private hasActivatedSinceLastCheck(lastCheckedAt: Date, activationDate: Date): boolean
    {
        const now = Date.now();
        const lastChecked = lastCheckedAt.getTime();
        const activation = activationDate.getTime();

        return lastChecked < activation && now > activation;
    }

    private makeKey(platform: Platform, endpoint: Endpoint): string
    {
        return `${platform}_${endpoint}`;
    }
}
