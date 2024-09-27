import { envs } from '../envs';

export class ApiService {
    private static baseUrl = envs.API_URL;
    private static contentType = 'application/json';

    private static async request(url: string, method: string, data?: object) {
        try {
            const response = await fetch(this.baseUrl + url, {
                method: method,
                headers: {
                    'Content-Type': this.contentType,
                },
                body: JSON.stringify(data),
            });

            const json = await response.json();

            if (!response.ok && json.error_code !== 'MEASURES_NOT_FOUND') {
                throw new Error(json.error_message);
            }

            return json;
        } catch (error: any) {
            throw error;
        }
    }

    public static async get(url: string) {
        return await this.request(url, 'GET');
    }

    public static async post(url: string, data: object) {
        return await this.request(url, 'POST', data);
    }

    public static async put(url: string, data: object) {
        return await this.request(url, 'PUT', data);
    }

    public static async patch(url: string, data: object) {
        return await this.request(url, 'PATCH', data);
    }

    public static async delete(url: string) {
        return await this.request(url, 'DELETE');
    }
}