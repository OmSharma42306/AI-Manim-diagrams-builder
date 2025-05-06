import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Request,Response } from "express";
import dotenv from "dotenv";
import Together from "together-ai";
import * as fs from "fs";
import path from 'path';
import { exec } from 'child_process';
import {glob} from 'glob';


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
        
        // sending prompt to llm
        const response = await together.chat.completions.create({
            messages: [
                {"role": "system", "content": systemPrompt},
                {"role": "user", "content": prompt}],
            model:"mistralai/Mixtral-8x7B-Instruct-v0.1"    
          });
          
          
          const rawCode = response?.choices[0]?.message?.content;
          // @ts-ignore
          const cleanedCode = sanitizeManimCode2(rawCode);

        //   const secondSanitized = sanitizeManimCode2(cleanedCode)
          console.log(cleanedCode);

          //res.json({msg:response?.choices[0]?.message?.content})
          
        
        
        fs.writeFileSync('.././manim-runner/manimations/main.py',cleanedCode)  
        
     

          
          console.log('written to main.py');

          const filePath = '../manim-runner/manimations/main.py';

          runManim((error, videoPath) => {
            if (error || !videoPath) {
              return res.status(500).json({ error: "Failed to render video" });
            }
            res.json({ url: "hi" });
            return;
          });
          //res.json(cleanedCode)
          return;
    
    }catch(error){
        res.status(400).json({error});
        return;
    }
})


  // todo working..

  const runManim = async (callback: (error: any, outputPath?: string) => void) => {
    
    const workingDir = path.resolve('../manim-runner/manimations');
    const command = `manim -pql main.py GeneratedScene --format=mp4`;
    const renderedPath = path.resolve(workingDir, 'media/videos/main/480p15/GeneratedScene.mp4');
    const targetPath = path.resolve(__dirname, 'public/videos/GeneratedScene.mp4');
    const videoPath = '../manim-runner/manimations/media/videos/main/480p15/GeneratedScene.mp4';
    
    // working exec
  //   exec(command, { cwd: workingDir }, async (error, stdout, stderr) => {
  //     if (error) {
  //       console.error(`Manim execution error: ${stderr}`);
  //       return callback(error);
  //     }

  //     try {
        
        

  //     } catch (globErr) {
  //       return callback(globErr);
  //     }
  
  //   });
  // };

  exec(command, { cwd: workingDir }, async (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Manim execution error: ${stderr}`);
      return callback(error);
    }


 // Check if output exists
 fs.access(renderedPath, fs.constants.F_OK, (err) => {
  if (err) {
    console.error("❌ Rendered video not found:", renderedPath);
    return callback(err);
  }

  // Ensure the target directory exists
  fs.mkdir(path.dirname(targetPath), { recursive: true }, (mkdirErr) => {
    if (mkdirErr) {
      console.error("❌ Failed to create target directory:", mkdirErr);
      return callback(mkdirErr);
    }

    // Move (or copy) the file
    fs.copyFile(renderedPath, targetPath, (copyErr) => {
      if (copyErr) {
        console.error("❌ Failed to copy file:", copyErr);
        return callback(copyErr);
      }

      console.log("✅ Video copied to:", targetPath);
      return callback(null, targetPath);
    });
  });
});
});
  }














  function sanitizeManimCode(raw: string): string {
    return raw
      .replace(/^\s*```(?:python)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .replace(/NEW_COMMAND_[^\n\r]*/g, '') // remove weird LLM artifacts
      .trim();
  }

  function sanitizeManimCode2(raw: string): string {
    // Extract code inside triple backticks or from the first class definition
    const codeBlockMatch = raw.match(/```(?:python)?\s*([\s\S]*?)```/i);
    if (codeBlockMatch) {
      return codeBlockMatch[1].trim();
    }
  
    // Fallback: extract from the class definition forward
    const classIndex = raw.indexOf("class GeneratedScene");
    if (classIndex !== -1) {
      const pre = "from manim import *\n\n";
      return pre + raw.slice(classIndex).trim();
    }
  
    // Fallback: return the whole thing trimmed (last resort)
    return raw.trim();
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