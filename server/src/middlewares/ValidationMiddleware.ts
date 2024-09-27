import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ApplicationError } from '../exceptions/ApplicationError';

export const validate = (schema: z.ZodType<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const parsed = schema.safeParse(req.body);

        if (!parsed.success) {
            throw new ApplicationError('Invalid type or missing fields', 'INVALID_DATA');
        }

        req.body = parsed.data;
        next();
    }
}