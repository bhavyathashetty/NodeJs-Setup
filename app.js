import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes/index.js';
import logger from './config/logger.js';


const app = express();

app.use(helmet());


app.use(express.json());


app.use(
    cors({
        origin: '*',
    })
);
app.options(
    '*',
    cors({
        origin: '*',
    })
);

//base route
app.use('/v1', routes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    logger.info('Hello world logged');
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
