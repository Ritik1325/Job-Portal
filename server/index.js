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
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(cookieParser())






// const routefiles=fs.readdirSync('./routes');

// routefiles.forEach(file=>{

//     import(`./routes/${file}`).then((route)=>{
//         app.use(`/job-portal/`,route.default)
//     }).catch(err=>{
//         console.log(`error importing ${file}`,err.message);
//     })
// })

const routefiles = fs.readdirSync('./routes');

routefiles.forEach(file => {
  import(`./routes/${file}`).then((route) => {
    const routeName = file.replace('.js', ''); // e.g. "auth.js" → "auth"
    app.use(`/job-portal/${routeName}`, route.default);
    console.log(`✅ Loaded route: /job-portal/${routeName}`);
  }).catch(err => {
    console.error(`❌ Error importing ${file}:`, err.message);
  });
});


app.get('/',(req,res)=>{
   return res.send('hello');
})



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}







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
