import { useState } from "react"

export default function DisplayVideo(){
    const [videoUrl,setVideoUrl] = useState<string>("");

    function handleSetVideoUrl(){
        // setVideoUrl("D:\\projects\\manim-builder\\manim-runner\\manimations\\media\\videos\\main\\480p15\\GeneratedScene.mp4")
        
        setVideoUrl('http://localhost:3000/video/GeneratedScene.mp4')
        console.log("URL SET")
        console.log(videoUrl)
    }
    
    return <div>
        <button onClick={handleSetVideoUrl}>SetUrl</button>    
        {videoUrl && (
  <div className="mt-4">
    <video autoPlay controls className="w-full max-w-lg rounded-lg shadow">
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
)}
    </div>
}