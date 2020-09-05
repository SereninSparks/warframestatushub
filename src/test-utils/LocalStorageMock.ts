export class LocalStorageMock implements Storage {
    private store: Record<string, string> = {};

    [name: string]: any;

    public clear() {
        this.store = {};
    }

    public getItem(key: string) {
        return this.store[key] || null;
    }

    public setItem(key: string, value: string) {
        this.store[key] = value;
    }

    public removeItem(key: string) {
        delete this.store[key];
    }

    readonly length: number;

    public key(index: number): string | null {
        return '';
    }
}
