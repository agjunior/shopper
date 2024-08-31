import { Request, Response, NextFunction } from 'express';
import { ApplicationError } from '../exceptions/ApplicationError';

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ApplicationError) {
        return res.status(error.statusCode).send({
            error_code: error.errorCode,
            error_message: error.message,
        });
    }

    res.status(500).send({
        error_code: 'INTERNAL_SERVER_ERROR',
        error_message: 'An unexpected error occurred',
    });
};