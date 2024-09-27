export class ApplicationError extends Error {
    public statusCode: number;
    public errorCode?: string;

    constructor(message: string, errorCode?: string, statusCode?: number) {
        super(message);
        this.statusCode = statusCode || 400;
        this.errorCode = errorCode || 'APPLICATION_ERROR';
    }
}