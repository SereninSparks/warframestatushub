interface StorageOptions {
    backend: Storage,
    prefix: string | null;
}

export class BrowserStorage {
    public constructor(private options: StorageOptions) {}

    private get backend(): Storage {
        return this.options.backend;
    }

    private get prefix(): string | null {
        return this.options.prefix;
    }

    public async clear(): Promise<void> {
        for (let i = 0; i < this.backend.length; i++) {
            const key = this.backend.key(i);

            if (key.startsWith(this.prefix)) {
                this.backend.removeItem(key);
            }
        }
    }

    public async getItem<T>(key: string): Promise<T | null> {
        const value = this.backend.getItem(this.transformKey(key));

        if (value === null) {
            return null;
        }

        return JSON.parse(value) as T;
    }

    public async setItem<T>(key: string, value: T): Promise<void> {
        this.backend.setItem(
            this.transformKey(key),
            JSON.stringify(value)
        );
    }

    private transformKey(key: string): string {
        const {prefix} = this;

        if (!prefix) {
            return key;
        }

        return `${prefix}_${key}`;
    }
}
