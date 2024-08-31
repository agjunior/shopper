import { GoogleGenerativeAI } from '@google/generative-ai';
import { ThirdPartyError } from '../exceptions/ThirdPartyError';
import {  envs } from '../envs';

const genAI = new GoogleGenerativeAI(envs.GEMINI_API_KEY);

export const getMeasureContent = async (image: string): Promise<string> => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        const result = await model.generateContent([
            {
                inlineData: {
                    mimeType: 'image/png',
                    data: image,
                },
            },
            {
                text: `
                    this image is a picture of a measuring equipment for electricity or gas consumption,
                    take care to get only the numbers of consumption window, do not get the numbers of the serial number or any other number,
                    if has more than one number, get only the biggest number,
                    all number must be in the same color, if the number is in a different color, ignore it,
                    only numbers; no spaces, no commas, no dots, no letters, no symbols, no units, no other characters,
                    if you cannot read the numbers, write "unreadable"
                `,
            },
        ]);
        
        const text = result.response.text();

        if (text === 'unreadable') {
           return '';
        }

        return text;
    }
    catch (_) {
        throw new ThirdPartyError('Cannot comunicate with image service');
    }
}