export const envs = Object.freeze({
    API_URL: process.env.API_URL || 'http://localhost:3000',
    APP_URL: process.env.APP_URL || 'http://localhost',
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
    DATABSE_URL: process.env.DATABSE_URL || 'file:./dev.db',
});