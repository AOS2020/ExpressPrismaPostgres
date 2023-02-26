require('dotenv').config();
import express, {Application} from 'express';
import {routes} from "./routes";
import cors from 'cors'

const app: Application= express();
const port = process.env.PORT 

app.use(express.json());
app.use(routes);
app.use('/files', express.static('files'))
app.use(express.urlencoded({ extended: true }));
app.use(cors)
app.listen(port, ()=>console.log('Listening to requests on port: '+ port))
