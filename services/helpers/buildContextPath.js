const buildContextPath = (contextName = '') => `projects/${process.env.GOOGLE_PROJECT_ID}
/agent/sessions/${process.env.DIALOGFLOW_SESSION_ID}
  /contexts/${contextName}`;

module.exports = buildContextPath;
