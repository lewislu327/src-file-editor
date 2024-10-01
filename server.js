const express = require("express")
const multer = require("multer")
const fs = require("fs").promises
const path = require("path")
const cors = require("cors")

const app = express()
const upload = multer({ dest: "uploads/" })

app.use(express.json())
app.use(cors())

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")))

// Parse SRT content
function parseSRT(content) {
  const subtitles = []
  const blocks = content.split("\n\n")

  blocks.forEach((block) => {
    const lines = block.trim().split("\n")
    if (lines.length >= 3) {
      subtitles.push({
        index: parseInt(lines[0]),
        timecode: lines[1],
        text: lines.slice(2).join("\n")
      })
    }
  })

  return subtitles
}

// Format subtitles back to SRT
function formatSRT(subtitles) {
  return subtitles.map((sub) => `${sub.index}\n${sub.timecode}\n${sub.text}`).join("\n\n")
}

// Upload and parse SRT file
app.post("/api/upload", upload.single("srtFile"), async (req, res) => {
  try {
    const content = await fs.readFile(req.file.path, "utf8")
    const subtitles = parseSRT(content)
    res.json(subtitles)
  } catch (error) {
    res.status(500).json({ error: "Failed to parse SRT file" })
  }
})

// Update subtitles
app.post('/api/update', async (req, res) => {
    const { subtitles, fileName } = req.body;
    const srtContent = formatSRT(subtitles);
    
    try {
        const safeFileName = path.basename(fileName); // Ensure the filename is safe
        const filePath = path.join(__dirname, 'outputs', safeFileName);
        await fs.mkdir(path.dirname(filePath), { recursive: true }); // Ensure the directory exists
        await fs.writeFile(filePath, srtContent);
        res.json({ message: 'SRT file updated successfully', fileName: safeFileName });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update SRT file' });
    }
});

// Download updated SRT file
app.get('/api/download/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, 'outputs', fileName);
    res.download(filePath, fileName, (err) => {
        if (err) {
            res.status(500).json({ error: 'Failed to download file' });
        }
    });
});




// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
