import { ApplicationError } from "./ApplicationError";

export class InvalidTypeError extends ApplicationError {
    public statusCode: number;
    public errorCode: string;
    
    constructor(message: string, errorCode?: string, statusCode?: number) {
        super(message);
        this.statusCode = statusCode || 400;
        this.errorCode = errorCode || 'INVALID_TYPE';
    }
}