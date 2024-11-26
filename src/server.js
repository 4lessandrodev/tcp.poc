const net = require('node:net');
const { createMessage } = require('../result');

const server = net.createServer((socket) => {
    console.log('Cliente conectado.');

    socket.on('data', (data) => {
        console.log('server: Recebido do cliente:');
        const message = JSON.parse(data.toString());
        console.log(message);
        console.log('\n');

        // Enviar confirmação de recebimento
        socket.write(createMessage({
            messageType: 'response',
            data: 'message received with success!!!🚀',
            status: 'success',
            correlationId: message.header.messageId
        }));
    });

    socket.on('end', () => {
        console.log('server: Cliente desconectado.');
    });

    socket.on('error', (err) => {
        console.error('server: Erro no socket:', err);
    });

});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`server: Servidor escutando na porta ${PORT}`);
});
