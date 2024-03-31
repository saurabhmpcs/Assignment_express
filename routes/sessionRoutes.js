const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");

router.post("/create-session", (req, res) => {
  const sessionId = sessionController.createSession();
  res.json({ Session_id: sessionId });
});

router.post("/upload-file/:sessionId", (req, res) => {
  const sessionId = req.params.sessionId;
  const fileContent = req.body.content;
  const success = sessionController.uploadFile(sessionId, fileContent);
  if (success) {
    res.json({ Result: sessionController.computeResult(sessionId) });
  } else {
    res.status(404).send("Session not found");
  }
});

router.delete("/delete-session/:sessionId", (req, res) => {
  const sessionId = req.params.sessionId;
  sessionController.deleteSession(sessionId);
  res.send("Session deleted successfully");
});

router.delete("/delete-file/:sessionId/:fileIndex", (req, res) => {
  const sessionId = req.params.sessionId;
  const fileIndex = req.params.fileIndex;
  sessionController.deleteFile(sessionId, fileIndex);
  res.json({ Result: sessionController.computeResult(sessionId) });
});

module.exports = router;
