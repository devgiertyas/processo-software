import express from 'express';
import routes from './Routes';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/', routes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
