import cors from 'cors';
import dotenv from 'dotenv';
import express, { type ErrorRequestHandler } from 'express';
import { fileURLToPath } from 'node:url';
import { employeeRoutes } from './routes/employee.routes.js';
import { roleRoutes } from './routes/role.routes.js';

dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });

const allowedOrigins = new Set(
  (process.env.FRONTEND_URL ?? 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
);

export const app = express();

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error('Origin is not allowed.'));
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json({ limit: '100kb' }));

app.use('/api/employees', employeeRoutes);
app.use('/api/roles', roleRoutes);

app.use((_request, response) => {
  response.status(404).json({ message: 'Route not found.' });
});

const errorHandler: ErrorRequestHandler = (error: unknown, _request, response, _next) => {
  if (error instanceof SyntaxError) {
    response.status(400).json({ message: 'Request body must contain valid JSON.' });
    return;
  }
  if (error instanceof Error && error.message === 'Origin is not allowed.') {
    response.status(403).json({ message: 'Origin is not allowed.' });
    return;
  }
  console.error(error);
  response.status(500).json({ message: 'An unexpected server error occurred.' });
};

app.use(errorHandler);
