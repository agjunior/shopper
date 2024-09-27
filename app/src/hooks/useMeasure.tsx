import { MeasureService } from '../services/MeasureService';
import useApi from './useApi';

export const useMeasure = () => {

    const executeGetMeasuresByCustomer = useApi(MeasureService.getMeasuresByCustomer);
    const executeUploadMeasure = useApi(MeasureService.uploadMeasure);
    const executeConfirmMeasure = useApi(MeasureService.confirmMeasure);
    const executeGetMeasureImage = useApi(MeasureService.getMeasureImage);
    
    const getMeasuresByCustomer = async (customerCode: string, type?: string) => {
        return await executeGetMeasuresByCustomer(customerCode, type);
    };

    const uploadMeasure = async (data: object) => {
        return await executeUploadMeasure(data);
    };

    const confirmMeasure = async (data: object) => {
        return await executeConfirmMeasure(data);
    };

    const getMeasureImage = async (uuid: string) => {
        return await executeGetMeasureImage(uuid);
    };

    return {
        getMeasuresByCustomer,
        uploadMeasure,
        confirmMeasure,
        getMeasureImage,
    };
};