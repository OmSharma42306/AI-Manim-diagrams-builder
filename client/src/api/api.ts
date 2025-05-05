import axios from "axios";


export async function sendPrompt(prompt:string){
    const response = await axios.post('http://localhost:3000/api/v1/prompt',{prompt:prompt});
    console.log(response);
    return response.data;
}