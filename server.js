import express from 'express';
import apiRoutes from './routes/api.js'; // Include .js extension
import cors from 'cors'
import fileUpload from 'express-fileupload';
const app = express();
const PORT = 3000;
app.use(fileUpload({
  createParentPath: true
}));

app.use(cors());
app.use(express.json());
app.use(apiRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
