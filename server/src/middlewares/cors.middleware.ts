import cors from 'cors';

const corsMiddleware = cors({
  allowedHeaders: [
    'Accept',
    'Authorization',
    'Content-Type',
    'Content-Length',
    'X-Requested-With'
  ],
  credentials: true,
  maxAge: 3600,
  methods: ['POST', 'GET', 'OPTIONS'],
  optionsSuccessStatus: 200,
  origin: true
});

export default corsMiddleware;
