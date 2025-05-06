import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Request,Response } from "express";
import dotenv from "dotenv";
import Together from "together-ai";
import * as fs from "fs";
import path from 'path';
import { exec } from 'child_process';
import {S3Client,PutObjectCommand} from "@aws-sdk/client-s3"

dotenv.config()

const PORT = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

const videoOutputDir = path.resolve(__dirname, 'public/videos');

app.use('/video', express.static(videoOutputDir));

const together = new Together({
    apiKey: process.env.GPT4_API_KEY,
  }); // auth defaults to process.env.TOGETHER_API_KEY


// AWS S3 STUFF...
const s3 = new S3Client({
  region:process.env.AWS_REGION!,
  credentials:{
    accessKeyId:process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY!,
  },
})  



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

          fs.writeFileSync('.././manim-runner/manimations/main.py',cleanedCode)  
        
          console.log('written to main.py');

          runManim((error, videoPath) => {
            if (error || !videoPath) {
              return res.status(500).json({ error: "Failed to render video" });
            }
            console.log("VIDEO PATH :      ",videoPath)
            // const url = 'http://localhost:3000/video/GeneratedScene.mp4'
            res.json({ url: videoPath });
            return;
          });
          return;
    
    }catch(error){
        res.status(400).json({error});
        return;
    }
})


  
// Function to Run Manim code 
  const runManim = async (callback: (error: any, outputPath?: string) => void) => {
    
    const workingDir = path.resolve('../manim-runner/manimations');
    const command = `manim -pql main.py GeneratedScene --format=mp4`;
    const renderedPath = path.resolve(workingDir, 'media/videos/main/480p15/GeneratedScene.mp4');
    const targetPath = '../manim-runner/manimations/media/videos/main/480p15/GeneratedScene.mp4'
    
    
  exec(command, { cwd: workingDir }, async (error, stdout, stderr) => {
    if (error) {
      console.error(`Manim execution error: ${stderr}`);
      
      return callback(error);
    }

    // Uploading to S3 Bucket...
    const s3Url = await uploadToS3(targetPath,`videos/${Date.now()}-GeneratedScene.mp4`);
    console.log("s3 URL",s3Url);


 // These stuff for local video testing....

 // Check if output exists
 fs.access(renderedPath, fs.constants.F_OK, (err) => {
  if (err) {
    console.error("Rendered video not found:", renderedPath);
    return callback(err);
  }

  // Ensure the target directory exists
  fs.mkdir(path.dirname(targetPath), { recursive: true }, (mkdirErr) => {
    if (mkdirErr) {
      console.error("Failed to create target directory:", mkdirErr);
      return callback(mkdirErr);
    }

    // Move (or copy) the file
    fs.copyFile(renderedPath, targetPath, (copyErr) => {
      if (copyErr) {
        console.error("Failed to copy file:", copyErr);
        return callback(copyErr);
      }

      console.log("Video copied to:", targetPath);
      
      return callback(null, s3Url);
    });
  });
});
});
  }


// Function to Upload video to S3
async function uploadToS3(localpath:string,fileName:string){
  const fileContent = fs.readFileSync(localpath);
  const uploadCommand = new PutObjectCommand({
    Bucket:process.env.S3_BUCKET_NAME!,
    Key:fileName,
    Body:fileContent,
    ContentType:"video/mp4",
  })

  await s3.send(uploadCommand)


  const s3Url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  console.log(s3Url)
  return s3Url;

}



// sanitize response stuff

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