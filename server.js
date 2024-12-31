import express from 'express';
import apiRoutes from './routes/api.js'; // Include .js extension

const app = express();
const PORT = 3000;
app.use(express.json());

app.use('/', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
