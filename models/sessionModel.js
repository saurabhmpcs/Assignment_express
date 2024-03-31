class Session {
  constructor(sessionId, files) {
    this.sessionId = sessionId;
    this.files = files || [];
  }
}

module.exports = Session;
