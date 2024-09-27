import { ApplicationError } from "./ApplicationError";

export class ResourceDuplicatedError extends ApplicationError {
    public statusCode: number;
    public errorCode: string;
    
    constructor(message: string, errorCode?: string, statusCode?: number) {
        super(message);
        this.statusCode = statusCode || 409;
        this.errorCode = errorCode || 'RESOURCE_DUPLICATED';
    }
}