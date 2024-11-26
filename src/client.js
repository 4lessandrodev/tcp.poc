const http = require('node:http');
const net = require('node:net');
const { createMessage } = require('../result');

function sendMessage(message) {
  const client = new net.Socket();

  client.connect(3001, '127.0.0.1', () => {
    console.log('Conectado ao servidor.');
    client.write(message);
  });

  client.on('data', (data) => {
    console.log('Recebido do servidor:');
    console.log(JSON.parse(data.toString()));
    console.log('\n');
    client.end();
  });

  client.on('close', () => {
    console.log('Conexão encerrada.');
  });

  client.on('error', (err) => {
    console.error('Erro no cliente:', err);
  });
}

// Enviar mensagens individuais
const server = http.createServer((req, res) => {
  sendMessage(createMessage({
      action: 'send-message',
      messageType: 'request',
      data: { message: "hello there!👋" }
  }));
  return res.end();
});

server.listen(8081);
