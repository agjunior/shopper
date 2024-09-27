import { createContext, useContext } from "react";

type CustomerContextType = {
    name: string;
    code: string;
}

export const CustomerContext = createContext({} as CustomerContextType);

export const CustomerProvider = ({ children }: { children: React.ReactNode }) => {

    // Here we assign example values to the context
    const name = 'John Doe';
    const code = '4f1ddd26-51e2-4694-8311-7b90536e471d';

    return (
        <CustomerContext.Provider value={{ name, code }}>
            {children}
        </CustomerContext.Provider>
    );
};

export const useCustomer = () => useContext(CustomerContext);