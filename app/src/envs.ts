const env = await import.meta.env;

export const envs = Object.freeze({
    API_URL: env.VITE_API_URL || 'http://localhost:3000/',
    APP_URL: env.VITE_APP_URL || 'http://localhost',
}); 