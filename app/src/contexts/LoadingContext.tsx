import { createContext, useState, useContext } from "react";

type TLoadingContext = {
    isLoading: boolean;
    startLoading: () => void;
    stopLoading: () => void;
};

export const LoadingContext = createContext<TLoadingContext>({
    isLoading: false,
    startLoading: () => { },
    stopLoading: () => { },
});

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setLoading] = useState(false);

    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    return (
        <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);