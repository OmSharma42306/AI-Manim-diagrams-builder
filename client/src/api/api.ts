import axios from "axios";

const host = import.meta.env.VITE_HOST

export async function sendPrompt(prompt:string){
    const response = await axios.post(`http://${host}:3000/api/v1/prompt`,{prompt:prompt});
    console.log(response);
    return response.data;
}