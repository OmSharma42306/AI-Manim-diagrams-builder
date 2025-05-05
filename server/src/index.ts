import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Request,Response } from "express";
import dotenv from "dotenv";
import Together from "together-ai";
import * as fs from "fs";
import path from 'path';


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
    console.log(prompt)
    
    const path = './src/prompts/system_prompts.txt'
    const readfile:string|null = readFile(path);
    //@ts-ignore
    const systemPrompt:string = readfile;
    try{
        const newx = readFile('./src/generate.py')
        console.log("NEXZZ",newx)

        // sending prompt to llm
        const response = await together.chat.completions.create({
            messages: [
                {"role": "system", "content": systemPrompt},
                {"role": "user", "content": prompt}],
            model:"mistralai/Mixtral-8x7B-Instruct-v0.1"
            //  "Qwen/Qwen3-235B-A22B-fp8-tput"
            
          });
          
          
          const rawCode = response?.choices[0]?.message?.content;
          // @ts-ignore
          const cleanedCode = sanitizeManimCode(rawCode);

          console.log(cleanedCode);



          //res.json({msg:response?.choices[0]?.message?.content})
          
        
        //  fs.writeFileSync(outputPath, cleanedCode);
        // fs.writeFileSync('./src/generate.py',cleanedCode)
        fs.writeFileSync('.././manim-runner/manimations/main.py',cleanedCode)  
        // .././
          
          
          console.log('written to main.py');
          res.json(cleanedCode)
          return;
    
    }catch(error){
        res.status(400).json({error});
        return;
    }
})



function sanitizeManimCode(raw: string): string {
    return raw
      .replace(/^\s*```(?:python)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .replace(/NEW_COMMAND_[^\n\r]*/g, '') // remove weird LLM artifacts
      .trim();
  }
  


function readFile(filePath:string):string|null{
try{
const data = fs.readFileSync(filePath,'utf-8');
return data.toString();
}catch(error){
    console.error(error);
    return null;
}
}


app.listen(PORT,()=>{
    console.log(`Server Started at PORT : ${PORT}`)
})