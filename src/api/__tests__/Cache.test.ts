import {BrowserStorage} from '../../storage/BrowserStorage';
import {Cache} from '../Cache';
import {Endpoint} from '../../enum/Endpoint';
import {LocalStorageMock} from '../../test-utils/LocalStorageMock';
import {Platform} from '../../enum/Platform';

interface TestEntity {
    activation: string;
    expiry: string;
    value: string;
}

describe(Cache.name, () => {
    let cache: Cache;

    beforeEach(() => {
        cache = new Cache(
            new BrowserStorage({
                prefix: 'test',
                backend: new LocalStorageMock(),
            })
        );
    });

    it('should be able to read a previously filled cached item', async () => {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 1);

        const entity: TestEntity = {
            activation: new Date().toISOString(),
            expiry: expiry.toISOString(),
            value: 'This is a thing!',
        };

        await cache.set<TestEntity>(Platform.PC, Endpoint.VOID_TRADER, entity);

        const value = await cache.get<TestEntity>(Platform.PC, Endpoint.VOID_TRADER);

        expect(value.value).toBe('This is a thing!');
    });

    it('should throw an error on cache miss', async () => {
        try {
            await cache.get<TestEntity>(Platform.PC, Endpoint.VOID_TRADER);
        } catch (e) {
            expect(e.message).toBe('Cache miss');
        }
    });

    it('should throw an error on cache expiry', async () => {
        const activation = new Date();
        activation.setDate(activation.getDate() - 2);

        const expiry = new Date();
        expiry.setDate(expiry.getDate() - 1);

        const entity: TestEntity = {
            activation: activation.toISOString(),
            expiry: expiry.toISOString(),
            value: 'This is a thing!',
        };

        await cache.set<TestEntity>(Platform.PC, Endpoint.VOID_TRADER, entity);

        try {
            await cache.get<TestEntity>(Platform.PC, Endpoint.VOID_TRADER);
        } catch (e) {
            expect(e.message).toBe('Expired');
        }
    });

    it('should throw an error on cache invalidation due to activation', async () => {
        const activation = new Date();
        activation.setDate(activation.getDate() - 1);

        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 1);

        const entity: TestEntity = {
            activation: activation.toISOString(),
            expiry: expiry.toISOString(),
            value: 'This is a thing!',
        };

        const lastChecked = new Date();
        lastChecked.setDate(lastChecked.getDate() - 2);

        await cache.set<TestEntity>(Platform.PC, Endpoint.VOID_TRADER, entity);
        await cache.set<number>(Platform.PC, Endpoint.VOID_TRADER, lastChecked.getTime());

        try {
            await cache.get<TestEntity>(Platform.PC, Endpoint.VOID_TRADER);
        } catch (e) {
            expect(e.message).toBe('Has changed');
        }
    });
});
