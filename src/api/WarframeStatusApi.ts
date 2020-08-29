import {Endpoint} from '../enum/Endpoint';
import {Platform} from '../enum/Platform';

interface ErrorResponse {
    error: string;
    code: number;
}

export class WarframeStatusApi {
    private readonly BASE_URL = 'https://api.warframestat.us';

    public async call<T>(platform: Platform, endpoint: Endpoint): Promise<T> {
        const url = `${this.BASE_URL}/${platform}/${endpoint}`;

        const response = await fetch(url);

        const data = await response.json();

        if (!response.ok) {
            throw new Error((data as ErrorResponse).error);
        }

        return data as T;
    }
}
