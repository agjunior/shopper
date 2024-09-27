export const envs = Object.freeze({
    API_URL: process.env.API_URL || 'http://localhost',
    APP_URL: process.env.APP_URL || 'https://upgraded-yodel-q445999p7q26wwr-3000.app.github.dev',
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || 'AIzaSyAy_pV3huHYonygHX4mBmeOSd9_3CYpgKE',
    DATABSE_URL: process.env.DATABSE_URL || 'file:./dev.db',
});