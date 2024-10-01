// components/VideoPlayer.js
import React, { forwardRef, useImperativeHandle, useRef } from "react"
import YouTube from "react-youtube"

const VideoPlayer = forwardRef(({ videoUrl, setVideoUrl }, ref) => {
  const playerRef = useRef(null)

  useImperativeHandle(ref, () => ({
    seekTo: (seconds) => {
      if (playerRef.current) {
        playerRef.current.internalPlayer.seekTo(seconds, true)
      }
    }
  }))

  const handleUrlChange = (event) => {
    setVideoUrl(event.target.value)
  }

  const getVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const opts = {
    width: "100%",
    height: "400",
    playerVars: {
      autoplay: 0
    }
  }

  return (
    <div className="video-container">
      <h2>Video Player</h2>
      <input type="text" value={videoUrl} onChange={handleUrlChange} placeholder="Enter YouTube URL" />
      {videoUrl && <YouTube videoId={getVideoId(videoUrl)} opts={opts} ref={playerRef} />}
    </div>
  )
})

export default VideoPlayer
