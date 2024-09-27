import { useLoading } from '../contexts/LoadingContext';
import { useNavigate } from 'react-router-dom';

const useApi = (requestFunction: any) => {
    const { startLoading, stopLoading } = useLoading();
    const navigate = useNavigate();

    const execute = async (...params: any[]) => {
        startLoading();

        try {
            const response = await requestFunction(...params);
            return response;
        } catch (error: any) {
            navigate('/error', { state: {
                title: 'Ocorreu um erro',
                message: error.message,
            } });
            throw error;
        } finally {
            stopLoading();
        }
    };

    return execute;
};

export default useApi;