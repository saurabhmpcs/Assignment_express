const Session = require("../models/sessionModel");

let sessions = {};

function createSession() {
  const sessionId = generateSessionId();
  sessions[sessionId] = new Session(sessionId);
  return sessionId;
}

function uploadFile(sessionId, fileContent) {
  if (!sessions[sessionId]) {
    return false;
  }
  if (sessions[sessionId].files.length >= 15) {
    sessions[sessionId].files.shift();
  }
  sessions[sessionId].files.push(fileContent);
  return true;
}

function deleteSession(sessionId) {
  delete sessions[sessionId];
}

function deleteFile(sessionId, fileIndex) {
  if (sessions[sessionId]) {
    sessions[sessionId].files.splice(fileIndex, 1);
  }
}

function generateSessionId() {
  return Math.random().toString(36).substr(2, 10); // Random alphanumeric string
}

function computeResult(sessionId) {
  const files = sessions[sessionId].files;
  let sum = 0;
  files.forEach((fileContent) => {
    const equation = fileContent.trim(); // Remove leading/trailing whitespaces
    if (isValidEquation(equation)) {
      sum += eval(equation); // Evaluate the equation
    }
  });
  return sum;
}

function isValidEquation(equation) {
  // Simple check for valid mathematical equation
  return /^[\d\s()+\-*/.]+$/.test(equation);
}

module.exports = {
  createSession,
  uploadFile,
  deleteSession,
  deleteFile,
};
