import dotenv from 'dotenv';

try {
  dotenv.config({ path: '.env' });
} catch (err) {
  if (err === 'ENOENT') {
    throw new Error('You must need to create the .env file');
  }
}

const {
  NODE_ENV = 'development',
  SERVER_PORT = '4000',
  DB_ENDPOINT,
  DB_SECRET
} = process.env;

const isProduction: boolean = NODE_ENV === 'production';
const isDevelopment: boolean = NODE_ENV === 'development';

if (!DB_ENDPOINT) {
  throw new Error(errorMessage('DB_ENDPOINT', DB_ENDPOINT));
}

if (!DB_SECRET) {
  throw new Error(errorMessage('DB_SECRET', DB_SECRET));
}

function errorMessage(name: string, value: string): string {
  return `The environment variable ${name} must be specified. The actual value is ${value}`;
}

export {
  NODE_ENV,
  isProduction,
  isDevelopment,
  SERVER_PORT,
  DB_ENDPOINT,
  DB_SECRET
};

export default {
  NODE_ENV,
  isProduction,
  isDevelopment,
  SERVER_PORT,
  DB_ENDPOINT,
  DB_SECRET
};
