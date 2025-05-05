import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Request,Response } from "express";
import dotenv from "dotenv";
import Together from "together-ai";

dotenv.config()

const PORT = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());


const together = new Together({
    apiKey: process.env.GPT4_API_KEY,
  }); // auth defaults to process.env.TOGETHER_API_KEY


app.post("/api/v1/prompt",async(req:Request,res:Response)=>{
    const prompt:string = req.body.prompt;
    console.log(process.env.GPT4_API_KEY)
    const systemPrompt = "xyz"
    try{
        // sending gpt to prompt
        const response = await together.chat.completions.create({
            messages: [
                {role: "system", content: systemPrompt},
                {"role": "user", "content": "What are some fun things to do in New York?"}],
            model: "Qwen/Qwen3-235B-A22B-fp8-tput"
          });
          
          console.log(response?.choices[0]?.message?.content)
          res.json({msg:response?.choices[0]?.message?.content})
          return;
    
    }catch(error){
        res.status(400).json({error});
        return;
    }
})



app.listen(PORT,()=>{
    console.log(`Server Started at PORT : ${PORT}`)
})