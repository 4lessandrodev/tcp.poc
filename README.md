# tcp.poc

Este é um projeto de estudo para explorar o protocolo TCP utilizando Node.js. O objetivo é compreender como funciona a comunicação cliente-servidor usando sockets TCP nativos, sem o uso de bibliotecas externas, e padronizar a troca de mensagens entre eles.

## Índice

- [Descrição do Projeto](#descrição-do-projeto)
- [Conceitos Principais](#conceitos-principais)
  - [Protocolo TCP](#protocolo-tcp)
  - [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Execução do Projeto](#execução-do-projeto)
- [Testando a Aplicação](#testando-a-aplicação)
  - [Usando o curl](#usando-o-curl)
- [Detalhes do Código](#detalhes-do-código)
  - [Servidor TCP](#servidor-tcp)
  - [Cliente TCP](#cliente-tcp)
  - [Padronização de Mensagens](#padronização-de-mensagens)
- [Comandos Úteis](#comandos-úteis)
- [Conclusão](#conclusão)

## Descrição do Projeto

Este projeto é uma prova de conceito (POC) que demonstra a comunicação entre um cliente e um servidor utilizando o protocolo TCP em Node.js. O cliente atua como um servidor HTTP que, ao receber uma requisição, envia uma mensagem ao servidor TCP. As mensagens trocadas são padronizadas em um formato JSON para facilitar o processamento.

## Conceitos Principais

### Protocolo TCP

O TCP (Transmission Control Protocol) é um protocolo de transporte orientado a conexão que permite a transferência confiável de dados entre dispositivos em uma rede. Ele garante que os pacotes de dados sejam entregues na ordem correta e sem erros, proporcionando uma comunicação estável entre cliente e servidor.

### Arquitetura do Projeto

- **Servidor TCP**: Escuta na porta `3001` e aguarda conexões de clientes. Ao receber uma mensagem, processa e envia uma resposta padronizada.
- **Cliente TCP**: Atua como um servidor HTTP na porta `8081`. Ao receber uma requisição HTTP, envia uma mensagem padronizada ao servidor TCP através de uma conexão TCP.
- **Padronização de Mensagens**: As mensagens trocadas entre cliente e servidor seguem um formato definido no módulo `result.js`, garantindo consistência na comunicação.

## Pré-requisitos

- **Node.js** (versão 14 ou superior)
- **npm** (gerenciador de pacotes do Node.js)
- **PM2** (gerenciador de processos para Node.js)

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/4lessandrodev/tcp.poc.git
   ```

2. **Navegue até o diretório do projeto:**

   ```bash
   cd tcp.poc
   ```

3. **Instale as dependências:**

   ```bash
   npm install
   ```

   Isso instalará o `pm2` conforme definido nas dependências.

## Execução do Projeto

Para iniciar o cliente e o servidor usando o PM2:

```bash
npm run start
```

Este comando executa o script `start` definido no `package.json`, que inicia os processos conforme configurado no `ecosystem.config.js`.

Para verificar se os processos estão em execução:

```bash
pm2 list
```

Você deverá ver os processos `client` e `server` em execução.

## Testando a Aplicação

### Usando o curl

Você pode testar a aplicação enviando uma requisição HTTP para o cliente, que por sua vez enviará uma mensagem ao servidor TCP.

1. **Envie uma requisição HTTP para o cliente na porta `8081`:**

   ```bash
   curl http://localhost:8081
   ```

2. **Observe a saída nos terminais:**

   - **Terminal do Cliente:**

     ```plaintext
     Conectado ao servidor.
     Recebido do servidor:
     {
       header: {
         messageId: '...',
         timestamp: '...',
         messageType: 'response',
         correlationId: '...'
       },
       body: {
         status: 'success',
         action: undefined,
         data: 'message received with success!!!🚀'
       }
     }

     Conexão encerrada.
     ```

   - **Terminal do Servidor:**

     ```plaintext
     server: Cliente conectado.
     server: Recebido do cliente:
     {
       header: {
         messageId: '...',
         timestamp: '...',
         messageType: 'request'
       },
       body: {
         status: undefined,
         action: 'send-message',
         data: { message: 'hello there!👋' }
       }
     }
     ```

## Detalhes do Código

### Servidor TCP

- **Arquivo:** `src/server.js`
- **Descrição:**
  - Cria um servidor TCP que escuta na porta `3001`.
  - Ao receber uma conexão, aguarda dados do cliente.
  - Quando recebe uma mensagem, parseia o JSON, exibe a mensagem e envia uma resposta padronizada usando `createMessage`.
  - Utiliza o módulo `net` nativo do Node.js.

### Cliente TCP

- **Arquivo:** `src/client.js`
- **Descrição:**
  - Cria um servidor HTTP que escuta na porta `8081`.
  - Ao receber uma requisição HTTP, utiliza a função `sendMessage` para enviar uma mensagem padronizada ao servidor TCP.
  - A função `sendMessage` cria um socket TCP, conecta-se ao servidor na porta `3001`, envia a mensagem e aguarda a resposta.
  - Utiliza os módulos `http` e `net` nativos do Node.js.

### Padronização de Mensagens

- **Arquivo:** `src/result.js`
- **Descrição:**
  - Define uma estrutura padrão para as mensagens trocadas entre cliente e servidor.
  - Utiliza UUIDs para identificar as mensagens e inclui timestamps.
  - As mensagens são formatadas em JSON e incluem um `header` e um `body`.
  - Garante consistência e facilita o parsing das mensagens.

**Exemplo de Mensagem Enviada:**

```json
{
  "header": {
    "messageId": "uuid",
    "timestamp": "ISO8601 timestamp",
    "messageType": "request"
  },
  "body": {
    "action": "send-message",
    "data": {
      "message": "hello there!👋"
    }
  }
}
```

**Exemplo de Mensagem Recebida:**

```json
{
  "header": {
    "messageId": "uuid",
    "timestamp": "ISO8601 timestamp",
    "messageType": "response",
    "correlationId": "uuid do messageId da mensagem original"
  },
  "body": {
    "status": "success",
    "data": "message received with success!!!🚀"
  }
}
```

## Comandos Úteis

- **Verificar os processos em execução:**

  ```bash
  pm2 list
  ```

- **Ver os logs dos processos:**

  ```bash
  pm2 logs
  ```

- **Parar todos os processos:**

  ```bash
  pm2 stop all
  ```

- **Reiniciar os processos:**

  ```bash
  pm2 restart all
  ```

- **Parar um processo específico:**

  ```bash
  pm2 stop client   # ou 'server'
  ```

## Conclusão

Este projeto demonstra como implementar uma comunicação TCP eficiente em Node.js, utilizando sockets nativos e padronização de mensagens. Além disso, integra um servidor HTTP que interage com o servidor TCP, mostrando a versatilidade na comunicação entre diferentes protocolos. O uso do PM2 facilita o gerenciamento dos processos, tornando o desenvolvimento e a manutenção mais simples.

**Bons estudos sobre o protocolo TCP e Node.js!**

---

**Nota:** Certifique-se de que as portas `8081` e `3001` estão disponíveis em seu ambiente local antes de executar o projeto.