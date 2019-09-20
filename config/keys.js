require('dotenv').config();

const keys = {
  googleProjectID: process.env.GOOGLE_PROJECT_ID,
  googleProjectIDNoTrack: process.env.GOOGLE_PROJECT_ID_NO_TRACK,
  googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
  googleClientEmailNoTrack: process.env.GOOGLE_CLIENT_EMAIL_NO_TRACK,
  googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY.replace(new RegExp('\\\\n', 'g'), '\n'),
  googlePrivateKeyNoTrack: process.env.GOOGLE_PRIVATE_KEY_NO_TRACK.replace(new RegExp('\\\\n', 'g'), '\n'),
  dialogFlowSessionID: process.env.DIALOGFLOW_SESSION_ID,
  dialogFlowSessionLanguageCode: process.env.DIALOGFLOW_SESSION_LANGUAGE_CODE,

};

module.exports = keys;
