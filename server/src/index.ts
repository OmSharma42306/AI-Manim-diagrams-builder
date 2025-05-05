import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Request,Response } from "express";

const PORT = 3000;

const app = express();


app.use(cors());
app.use(bodyParser.json());


app.post("/api/v1/prompt",async(req:Request,res:Response)=>{
    const prompt:string = req.body.prompt;
    try{
        // sending gpt to prompt
    
    }catch(error){
        res.status(400).json({error});
        return;
    }
})



app.listen(PORT,()=>{
    console.log(`Server Started at PORT : ${PORT}`)
})