// App.js
import React, { useState } from "react"
import "./App.css"
import OriginalSRT from "./components/OriginalSRT"
import EditedSRT from "./components/EditedSRT"
import VideoPlayer from "./components/VideoPlayer"

function App() {
  const [originalSRT, setOriginalSRT] = useState([])
  const [editedSRT, setEditedSRT] = useState([])
  const [videoUrl, setVideoUrl] = useState("")

  return (
    <div className="App">
      <div className="container">
        <OriginalSRT originalSRT={originalSRT} setOriginalSRT={setOriginalSRT} setEditedSRT={setEditedSRT} />
        <EditedSRT editedSRT={editedSRT} setEditedSRT={setEditedSRT} />
        <VideoPlayer videoUrl={videoUrl} setVideoUrl={setVideoUrl} />
      </div>
    </div>
  )
}

export default App
