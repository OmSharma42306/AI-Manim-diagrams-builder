import { useState } from 'react'


function App() {
  const [prompt, setPrompt] = useState<string>("");


  async function handleSendPrompt(){
    // add stuff
  }


  return (
    <>
    <h1>Enter Prompt</h1>
    <br />
    <input type="text" placeholder='Enter Prompt' onChange={(e)=>{
      setPrompt(e.target.value);
    }} />
    <br />
    <button onClick={handleSendPrompt}>Send</button>


    </>
  )
}

export default App
