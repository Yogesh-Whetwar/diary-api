import express from'express';
import mongoose from'mongoose';
 import * as dotenv from 'dotenv';
 import postRoutes from './routes/posts.js';
 import userRoutes from './routes/users.js';
import bodyParser from 'body-parser';
import cors from 'cors';
 dotenv.config();

const app=express();  
app.use(express.json());//it allows body to be parsed so it is very important
// app.use(cors);
app.use(cors({
    origin: '*'
}));
app.use(bodyParser.urlencoded({extended:true}));
const port=process.env.PORT;
   
app.use((req, res, next)=>{
    console.log(req.path, req.method);
    next();
})

app.use('/api/posts',postRoutes);
app.use('/api/user',userRoutes);

const connectDB=async()=>{
    try{
        mongoose.set('strictQuery',true);
        mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("connected to the database")
    }catch(err){
     console.log(err);
    }
} 

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`server is listening at port ${port}`);
    }) ;
}).catch(err=>console.log(err));

