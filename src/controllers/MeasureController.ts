import prisma from '../prisma';
import { Request, Response, NextFunction } from 'express';
import { getMeasureContent } from '../services/GoogleGeminiService';
import { ResourceNotFoundError } from '../exceptions/ResourceNotFoundError';
import { ResourceDuplicatedError } from '../exceptions/ResourceDuplicatedError';
import { UploadResponseSchema, MeasuresQuerySchema, MeasuresResponseSchema } from '../schemas/MeasureSchemas';

export const getMeasures = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customer_code } = req.params;
    const { type } = MeasuresQuerySchema.parse(req.query);
    
    const measures = await prisma.measure.findMany({
      where: {
        customer_code,
        ...( type && { type })
      }
    });

    if (!measures.length) {
      throw new ResourceNotFoundError('Nenhuma leitura encontrada', 'MEASURES_NOT_FOUND');
    }

    const response = MeasuresResponseSchema.parse(measures);
    res.send(response);
  } catch (error) {
    next(error)
  }
}

export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsedData = req.body;

    const existingMeasure = await prisma.measure.findFirst({
      where: {
        customer_code: parsedData.customer_code,
        datetime: {
          gte: new Date(parsedData.datetime.getFullYear(), parsedData.datetime.getMonth(), 1),
          lt: new Date(parsedData.datetime.getFullYear(), parsedData.datetime.getMonth() + 1, 1),
        }
      }
    });

    if (existingMeasure) {
      throw new ResourceDuplicatedError('Leitura do mês já realizada', 'DOUBLE_REPORT');
    }

    const imageResponse = await getMeasureContent(parsedData.image);

    const measure = await prisma.measure.create({
      data: {
        customer_code: parsedData.customer_code,
        datetime: parsedData.datetime,
        type: parsedData.type,
        value: parseInt(imageResponse),
        image: parsedData.image,
      }
    });

    const response = UploadResponseSchema.parse(measure);
    res.send(response);
  } catch (error) {
    next(error)
  }
  
}

export const confirmMeasure = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsedData = req.body;

    const existingConfirmation = await prisma.measure.findFirst({
      where: {
        uuid: parsedData.uuid,
      }
    });

    if (!existingConfirmation) {
      throw new ResourceNotFoundError('Leitura não encontrada', 'MEASURE_NOT_FOUND');
    }

    if (existingConfirmation.confirmed) {
      throw new ResourceDuplicatedError('Leitura do mês já realizada', 'CONFIRMATION_DUPLICATE');
    }

    const updatedMeasure = await prisma.measure.update({
      where: {
        uuid: parsedData.uuid,
      },
      data: {
        value: parsedData.value,
        confirmed: true,
      }
    });

    res.send({ success: true });
  } catch (error) {
    next(error)
  }
}

export const getMeasureImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uuid } = req.params;

    const measure = await prisma.measure.findFirst({
      where: {
        uuid,
      }
    });

    if (!measure) {
      res.status(404).send('Not found');
      return;
    }

    const imageContent = Buffer.from(measure.image, 'base64');

    res.set('Content-Type', 'image/png');
    res.send(imageContent);
  } catch (error) {
    next(error)
  }
}

