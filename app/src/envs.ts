export const envs = Object.freeze({
    API_URL: process?.env?.REACT_APP_API_URL || 'http://localhost:3000/',
    APP_URL: process?.env?.REACT_APP_APP_URL || 'http://localhost',
});