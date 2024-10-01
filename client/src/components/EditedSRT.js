import React, { useState } from "react"
import axios from "axios"

function EditedSRT({ editedSRT, setEditedSRT, seekTo }) {
  const [fileName, setFileName] = useState("")

  const handleTextChange = (index, newText) => {
    const updatedSRT = editedSRT.map((subtitle, i) => (i === index ? { ...subtitle, text: newText } : subtitle))
    setEditedSRT(updatedSRT)
  }

  const handleDownload = async () => {
    if (!fileName) {
      alert("Please enter a file name")
      return
    }

    try {
      const response = await axios.post(
        "/api/download",
        {
          subtitles: editedSRT,
          fileName: `${fileName}.srt`
        },
        {
          responseType: "blob"
        }
      )

      const blob = new Blob([response.data], { type: "text/srt" })
      const link = document.createElement("a")
      link.href = window.URL.createObjectURL(blob)
      link.download = `${fileName}.srt`
      link.click()
      window.URL.revokeObjectURL(link.href)

      alert("File downloaded successfully")
    } catch (error) {
      console.error("Error downloading SRT:", error)
      alert("Failed to download SRT file")
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
      <h2>Edited SRT</h2>
      <div className="srt-content">
        {editedSRT.map((subtitle, index) => (
          <div key={index}>
            <p>{subtitle.index}</p>
            <p
              onClick={() => handleTimestampClick(subtitle.timecode.split(" --> ")[0])}
              style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
            >
              {subtitle.timecode}
            </p>
            <textarea value={subtitle.text} onChange={(e) => handleTextChange(index, e.target.value)} />
          </div>
        ))}
      </div>
      <input
        type="text"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        placeholder="Enter file name (without .srt)"
      />
      <button onClick={handleDownload}>Download SRT</button>
    </div>
  )
}

export default EditedSRT
