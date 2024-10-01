// App.js
import React, { useState, useRef } from "react"
import "./App.css"
import OriginalSRT from "./components/OriginalSRT"
import EditedSRT from "./components/EditedSRT"
import VideoPlayer from "./components/VideoPlayer"

function App() {
  const [originalSRT, setOriginalSRT] = useState([])
  const [editedSRT, setEditedSRT] = useState([])
  const [videoUrl, setVideoUrl] = useState("")
  const videoPlayerRef = useRef()

  const seekTo = (seconds) => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.seekTo(seconds)
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row video-row">
          <VideoPlayer videoUrl={videoUrl} setVideoUrl={setVideoUrl} ref={videoPlayerRef} />
        </div>
        <div className="row srt-row">
          <div className="column">
            <OriginalSRT
              originalSRT={originalSRT}
              setOriginalSRT={setOriginalSRT}
              setEditedSRT={setEditedSRT}
              seekTo={seekTo}
            />
          </div>
          <div className="column">
            <EditedSRT editedSRT={editedSRT} setEditedSRT={setEditedSRT} seekTo={seekTo} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
