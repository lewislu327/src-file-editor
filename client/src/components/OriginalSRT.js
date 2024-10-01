import React from "react"
import axios from "axios"

function OriginalSRT({ originalSRT, setOriginalSRT, setEditedSRT, seekTo }) {
  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append("srtFile", file)

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      setOriginalSRT(response.data)
      setEditedSRT(response.data)
    } catch (error) {
      console.error("Error uploading file:", error)
    }
  }

  const handleTimestampClick = (timecode) => {
    timecode = timecode.split(",")[0]
    const [hours, minutes, seconds] = timecode.split(":").map(Number)

    const totalSeconds = hours * 3600 + minutes * 60 + seconds
    seekTo(totalSeconds)
  }

  return (
    <div className="srt-container">
      <h2>Original SRT</h2>
      <input type="file" onChange={handleFileUpload} />
      <div className="srt-content">
        {originalSRT.map((subtitle, index) => (
          <div key={index}>
            <p>{subtitle.index}</p>
            <p
              onClick={() => handleTimestampClick(subtitle.timecode.split(" --> ")[0])}
              style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
            >
              {subtitle.timecode}
            </p>
            <p>{subtitle.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OriginalSRT
