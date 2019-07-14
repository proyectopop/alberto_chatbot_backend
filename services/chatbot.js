const dialogFow = require('dialogflow');
const confKeys = require('../config/keys');

const projectId = confKeys.googleProjectID;
const credentials = {
  client_email: confKeys.googleClientEmail,
  private_key: confKeys.googlePrivateKey,
};

const sessionClient = new dialogFow.SessionsClient({ projectId, credentials });
const sessionPath = sessionClient.sessionPath(
  confKeys.googleProjectID, confKeys.dialogFlowSessionID,
);

async function comenzar(req, res) {

  if (!req.body.event) return res.status(400).json({ error: 'Evento vacío' });

  const evento = {
    session: sessionPath,
    queryInput: {
      event: {
        name: req.body.event,
        languageCode: confKeys.dialogFlowSessionLanguageCode,
      },
    },
  };

  const resultado = await sessionClient.detectIntent(evento);

  return res.status(200).json(resultado);
}

async function recibeMensaje(req, res) {

  /**
   *
   * @param {string} [text=""] -- El texto que envía el usuario
   * @param {Array<{"name":String, "lifeSpanCount": Number, "parameters": Object}>} [contexts=[]]
   *  -- El contexto de la conversación."Name" es el nombre del contexto y
   *  "lifeSpanCount" (opcional) indica   *  cuántas interacciones debe durar este contexto.
   */

  if (!req.body.text) return res.status(400).json({ error: 'Mensaje vacío' });

  const { text } = req.body;
  const contexts = req.body.contexts;


  const consulta = {
    session: sessionPath,
    queryInput: {
      text: {
        text,
        languageCode: confKeys.dialogFlowSessionLanguageCode,
      },
    },
    queryParams: {
      contexts: contexts && contexts.length ? contexts : null,
    },
  };


  const responses = await sessionClient.detectIntent(consulta);

  return res.status(200).json(responses);

}


module.exports = { comenzar, recibeMensaje };
