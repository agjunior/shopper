import { z } from 'zod';
import isBase64 from 'is-base64';
import { MeasureType } from '../types/MeasureType';
import { envs } from '../envs';

const validateMeasureType = (type: string) => {
    if (!type) return false;
    const value = type.toUpperCase();
    return Object.values(MeasureType).includes(value as MeasureType);
};

const UploadRequestSchema = z.object({
    image: z.string().refine(isBase64),
    customer_code: z.string(),
    measure_datetime: z.coerce.date(),
    measure_type: z.string().refine(validateMeasureType),
}).transform((data) => ({
    image: data.image,
    customer_code: data.customer_code,
    type: data.measure_type.toUpperCase(),
    datetime: data.measure_datetime,
}));

const UploadResponseSchema = z.object({
    uuid: z.string().uuid(),
    value: z.number(),
}).transform((data) => ({
    measure_uuid: data.uuid,
    confirmed_value: data.value,
    image_url: `${envs.APP_URL}/${data.uuid}/image`,
}));

const ConfirmRequestSchema = z.object({
    measure_uuid: z.string().uuid(),
    confirmed_value: z.number(),
}).transform((data) => ({
    uuid: data.measure_uuid,
    value: data.confirmed_value,
}));

const MeasuresQuerySchema = z.object({
    measure_type: z.string().refine(validateMeasureType).optional(),
}).transform((data) => ({
    type: data.measure_type?.toUpperCase(),
}));

const MeasuresResponseSchema = z.array(
    z.object({
        uuid: z.string().uuid(),
        datetime: z.date(),
        customer_code: z.string(),
        type: z.string().refine(validateMeasureType),
        confirmed: z.boolean(),
    })
).transform((data) => ({
    customer_code: data[0].customer_code,
    measures: data.map(measure => ({
        measure_uuid: measure.uuid,
        measure_datetime: measure.datetime,
        measure_type: measure.type,
        has_confirmed: measure.confirmed,
        image_url: `${envs.APP_URL}/${measure.uuid}/image`,
    })),
}));

export {
    UploadRequestSchema,
    UploadResponseSchema,
    ConfirmRequestSchema,
    MeasuresQuerySchema,
    MeasuresResponseSchema,
}


