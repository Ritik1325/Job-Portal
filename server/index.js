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
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(cookieParser())


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const routesPath = path.join(__dirname, "routes");
const routefiles = fs.readdirSync(routesPath);



// routefiles.forEach(file=>{

//     import(`./routes/${file}`).then((route)=>{
//         console.log("Loaded route file:", file);
//         app.use(`/job-portal/`,route.default)
//     }).catch(err=>{
//         console.log(`error importing ${file}`,err.message);
//     })
// })

routefiles.forEach((file) => {
  import(path.join(routesPath, file)).then((route) => {
    console.log("✅ Loaded route file:", file);
    app.use("/job-portal", route.default);
  }).catch(err => {
    console.log(`❌ Error importing ${file}:`, err.message);
  });
});



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
