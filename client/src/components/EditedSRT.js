import React, { useState } from "react"
import axios from "axios"

function EditedSRT({ editedSRT, setEditedSRT }) {
  const [fileName, setFileName] = useState("")

  const handleTextChange = (index, newText) => {
    const updatedSRT = editedSRT.map((subtitle, i) => (i === index ? { ...subtitle, text: newText } : subtitle))
    setEditedSRT(updatedSRT)
  }

  const handleSave = async () => {
    if (!fileName) {
      alert("Please enter a file name")
      return
    }

    try {
      const response = await axios.post("/api/update", {
        subtitles: editedSRT,
        fileName: `${fileName}.srt`
      })
      alert(response.data.message)
      // Trigger download
      window.location.href = `/api/download/${response.data.fileName}`
    } catch (error) {
      console.error("Error updating SRT:", error)
      alert("Failed to update SRT file")
    }
  }

  return (
    <div className="srt-container">
      <h2>Edited SRT</h2>
      <div className="srt-content">
        {editedSRT.map((subtitle, index) => (
          <div key={index}>
            <p>{subtitle.index}</p>
            <p>{subtitle.timecode}</p>
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
      <button onClick={handleSave}>Save and Download</button>
    </div>
  )
}

export default EditedSRT
