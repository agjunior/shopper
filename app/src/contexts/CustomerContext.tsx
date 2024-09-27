import { createContext, useContext } from "react";

type CustomerContextType = {
    name: string;
    code: string;
}

export const CustomerContext = createContext({} as CustomerContextType);

export const CustomerProvider = ({ children }: { children: React.ReactNode }) => {

    /**
     *  Aqui estamos gerando um código de cliente aleatório e armazenando no localStorage.
     *  Assim, é possível testar a aplicação com diferentes códigos de cliente.
     */
    
    const name = 'John Doe';
    let code = localStorage.getItem('customer_code');

    if (!code) {
        const randomUUID = () => {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };
        code = randomUUID();
        localStorage.setItem('customer_code', code);
    }

    return (
        <CustomerContext.Provider value={{ name, code }}>
            {children}
        </CustomerContext.Provider>
    );
};

export const useCustomer = () => useContext(CustomerContext);