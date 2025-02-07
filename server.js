import express from 'express';
import apiRoutes from './routes/api.js'; // Include .js extension
import cors from 'cors'
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 5000;
app.use(fileUpload({
  createParentPath: true
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(express.json());
app.use(apiRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});