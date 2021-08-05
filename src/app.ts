import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';

const app:Application = express();

app.use(cors());


// use only when you want to see the metric related to express app
// app.use(require('express-status-monitor')());
import routes from './routes'
routes(app)

const dir:string = path.join(__dirname, 'assets');
app.use('/upload', express.static(dir));

app.use(express.json())




export default app

