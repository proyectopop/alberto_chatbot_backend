const dialogFow = require('dialogflow');
const confKeys = require('../config/keys');

const projectId = confKeys.googleProjectID;
const projectIdNoTrack = confKeys.googleProjectIDNoTrack;

const credentials = {
  client_email: confKeys.googleClientEmail,
  private_key: confKeys.googlePrivateKey,
};

const noTrackCredentials = {
  client_email: confKeys.googleClientEmailNoTrack,
  private_key: confKeys.googlePrivateKeyNoTrack,
};

//
// ─── EVENT QUERIES ─────────────────────────────────────────────────────────────────────
//
async function enviaEvento(req, res) {

  if (!req.body.event) return res.status(400).json({ error: 'Evento vacío' });
  if (!req.body.sessionId) return res.status(400).json({ error: 'Sesión inválida' });

  const { sessionId } = req.body;
  const noTrack = req.body.noTrack;

  let sessionClient;
  let sessionPath;

  if (noTrack) {
    sessionClient = new dialogFow.SessionsClient({
      projectId: projectIdNoTrack,
      credentials: noTrackCredentials,
    });
    sessionPath = sessionClient.sessionPath(projectIdNoTrack, sessionId);
  } else {
    sessionClient = new dialogFow.SessionsClient({ projectId, credentials });
    sessionPath = sessionClient.sessionPath(projectId, sessionId);
  }

  const evento = {
    session: sessionPath,
    queryInput: {
      event: { name: req.body.event, languageCode: process.env.DIALOGFLOW_LANGUAGE_CODE },
    },
  };

  const resultado = await sessionClient.detectIntent(evento);

  return res.status(200).json(resultado);
}

//
// ─── TEXT QUERIES ─────────────────────────────────────────────────────────────────────
//
async function recibeMensaje(req, res) {

  /**
   * @param {string} [text = ""] -- El texto que envía el usuario
   * @param {string} [session = 0] -- Número único de identificación de sesión
   */
  if (!req.body.text) return res.status(400).json({ error: 'Mensaje vacío' });
  if (!req.body.sessionId) return res.status(400).json({ error: 'Sesión inválida' });

  const { sessionId, text } = req.body;
  const noTrack = req.body.noTrack;

  let sessionClient;
  let sessionPath;

  if (noTrack) {
    sessionClient = new dialogFow.SessionsClient({
      projectId: projectIdNoTrack,
      credentials: noTrackCredentials,
    });
    sessionPath = sessionClient.sessionPath(projectIdNoTrack, sessionId);
  } else {
    sessionClient = new dialogFow.SessionsClient({ projectId, credentials });
    sessionPath = sessionClient.sessionPath(projectId, sessionId);
  }


  const consulta = {
    session: sessionPath,
    queryInput: { text: { text, languageCode: process.env.DIALOGFLOW_LANGUAGE_CODE } },
    queryParams: { timeZone: process.env.DIALOGFLOW_TIME_ZONE },
  };

  const responses = await sessionClient.detectIntent(consulta);

  return res.status(200).json(responses);


}

module.exports = { enviaEvento, recibeMensaje };
