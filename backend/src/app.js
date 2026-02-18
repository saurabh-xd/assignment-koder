import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Task Manager API Running ' });
});


app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});


app.use(errorHandler);

export default app;