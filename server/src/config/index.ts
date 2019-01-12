import dotenv from 'dotenv';

dotenv.config();

const { NODE_ENV = 'development', SERVER_PORT = '4000' } = process.env;

const isProduction: boolean = NODE_ENV === 'production';
const isDevelopment: boolean = NODE_ENV === 'development';

export { NODE_ENV, isProduction, isDevelopment, SERVER_PORT };
