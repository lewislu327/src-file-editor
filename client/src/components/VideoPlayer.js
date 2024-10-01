import React from "react"
import YouTube from "react-youtube"

function VideoPlayer({ videoUrl, setVideoUrl }) {
  const handleUrlChange = (event) => {
    setVideoUrl(event.target.value)
  }

  const getVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  return (
    <div className="video-container">
      <h2>Video Player</h2>
      <input type="text" value={videoUrl} onChange={handleUrlChange} placeholder="Enter YouTube URL" />
      {videoUrl && <YouTube videoId={getVideoId(videoUrl)} />}
    </div>
  )
}

export default VideoPlayer
