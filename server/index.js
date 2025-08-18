import express from 'express';
import cors from 'cors';
import connect from './config/connect.js';
import dotenv from 'dotenv'
import fs from 'fs';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';


 

dotenv.config();

const app=express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('trust proxy', 1);
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(cookieParser())






const routefiles=fs.readdirSync('./routes');

routefiles.forEach(file=>{

    import(`./routes/${file}`).then((route)=>{
        app.use(`/job-portal/`,route.default)
    }).catch(err=>{
        console.log(`error importing ${file}`,err.message);
    })
})


app.get('/',(req,res)=>{
   return res.send('hello');
})





const server=async ()=>{
    try {
        await connect();
        app.listen(process.env.PORT,()=>{
            console.log('Listening to the port',process.env.PORT);

        })
        
    } catch (error) {
        console.log('error connecting server',error.message)
        
    }
}

server();
