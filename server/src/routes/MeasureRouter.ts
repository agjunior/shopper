import express from 'express';
import { validate } from '../middlewares/ValidationMiddleware';
import { getMeasures, uploadImage, confirmMeasure, getMeasureImage } from '../controllers/MeasureController';
import { UploadRequestSchema, ConfirmRequestSchema } from '../schemas/MeasureSchemas';

const MeasureRouter = express.Router();

MeasureRouter.post('/upload', validate(UploadRequestSchema), uploadImage);
MeasureRouter.patch('/confirm', validate(ConfirmRequestSchema), confirmMeasure);
MeasureRouter.get('/:customer_code/list', getMeasures);
MeasureRouter.get('/:uuid/image', getMeasureImage);

export default MeasureRouter;