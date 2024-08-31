import { ApplicationError } from "./ApplicationError";

export class ThirdPartyError extends ApplicationError {
    public statusCode: number;
    public errorCode: string;
    
    constructor(message: string, errorCode?: string, statusCode?: number) {
        super(message);
        this.statusCode = statusCode || 503;
        this.errorCode = errorCode || 'THIRD_PARTY_ERROR';
    }
}