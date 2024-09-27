import { ApiService } from "./ApiService";

export class MeasureService {
    public static async getMeasuresByCustomer(customerCode: string, type?: string) {
        let url = `${customerCode}/list`;
        if (type) {
            url += `?measure_type=${type}`;
        }
        return await ApiService.get(url);
    }

    public static async uploadMeasure(data: object) {
        return await ApiService.post('upload', data);
    }

    public static async confirmMeasure(data: object) {
        return await ApiService.patch('confirm', data);
    }

    public static async getMeasureImage(uuid: string) {
        return await ApiService.delete(`${uuid}/image`);
    }
}