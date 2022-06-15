import { create, Whatsapp } from 'venom-bot';
const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['pt'], forceNER: true });


// Adds the utterances and intents for the NLP


// Saudacoes
manager.addDocument('pt', 'bom dia', 'saudacao');
manager.addDocument('pt', 'eae, tudo bem', 'saudacao');
manager.addDocument('pt', 'ola', 'saudacao');
manager.addDocument('pt', 'oi', 'saudacao');
manager.addDocument('pt', 'eai', 'saudacao');
manager.addDocument('pt', 'oi como vai voce', 'saudacao');
manager.addDocument('pt', 'hello', 'saudacao');
manager.addDocument('pt', 'oi tudo bem', 'saudacao');
manager.addDocument('pt', 'hi', 'saudacao');

// Localizacao
manager.addDocument('pt', 'fica localizado', 'localizacao');
manager.addDocument('pt', 'localizacao da empresa', 'localizacao');
manager.addDocument('pt', 'estao onde', 'localizacao');
manager.addDocument('pt', 'onde voces ficam', 'localizacao');
manager.addDocument('pt', 'onde é', 'localizacao');
manager.addDocument('pt', 'lugar', 'localizacao');
manager.addDocument('pt', 'endereco', 'localizacao');
manager.addDocument('pt', 'ponto de referencia', 'localizacao');



// Train also the NLG
// Saudacao
manager.addAnswer('pt', 'saudacao', 'Olá, estou aqui para te ajudar. Qual a sua dúvida?');
manager.addAnswer('pt', 'saudacao', 'Olá, seja bem vindo(a) à SciCrop. Como podemos te ajudar?');

// Localizacao
manager.addAnswer(
  'pt', 
  'localizacao', 
  'Estamos no endereço:\nRua XXXXXXX, número XX\nFicamos no Xº andar'
);
manager.addAnswer(
  'pt', 
  'localizacao', 
  'Entendi, você quer saber o nosso endereço.\nEstamos em São Paulo - SP\nRua XXXXXXX, número XX\nFicamos no Xº andar'
);

// Train and save the model.
(async() => {
    await manager.train();
    manager.save();

  create('BOT')
  .then((client) => {
    // evento
    client.onMessage(async(message) => {
      if (message.isGroupMsg === false) {
        const response = await manager.process('pt', message.body.toLowerCase());
        
        // console.log(response)
        console.log("Intenção: ", response.intent);
        console.log("Precisão: ", response.score);
        client.sendText(message.from, response.answer)
      }
    });
  })
  .catch((erro) => {
    console.log(erro);
  });    
})();





// import { create, Whatsapp } from 'venom-bot';

// create('BOT')
//   .then((client) => start(client))
//   .catch((erro) => {
//     console.log(erro);
//   });

// function start(client: Whatsapp) {
//   client.onMessage((message) => {
//     if (message.body.toLowerCase() === 'hi' && message.isGroupMsg === false) {
//       client
//         .sendText(message.from, 'Olá, tudo bem? Sou o Thomas, seu assistente virtual.\nComo posso ajuda-lo(a)?')
//         .then((result) => {
//           console.log('Result: ', result); //return object success
//         })
//         .catch((erro) => {
//           console.error('Error when sending: ', erro); //return object error
//         });
//     }
//   });
// }