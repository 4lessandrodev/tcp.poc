const crypto = require('crypto');

/**
 * Tipos de mensagens permitidos.
 * @readonly
 * @enum {string}
 */
const MESSAGE_TYPES = {
    request: 'request',
    response: 'response',
    error: 'error',
    notification: 'notification'
};

/**
 * Status de mensagens permitidos.
 * @readonly
 * @enum {string}
 */
const STATUS_TYPES = {
    success: 'success',
    error: 'error',
};

/**
 * Gera um UUID v4.
 * @returns {string} UUID v4.
 */
function generateUUID() {
    return crypto.randomUUID();
}

/**
 * Cria uma mensagem padronizada.
 * @param {Object} params - Parâmetros para a mensagem.
 * @param {string} params.action - A ação realizada ou a ser realizada.
 * @param {keyof typeof MESSAGE_TYPES} params.messageType - O tipo da mensagem.
 * @param {keyof typeof STATUS_TYPES} params.status - O status da operação ('success', 'error').
 * @param {Object} [params.data] - Os dados a serem incluídos no corpo da mensagem.
 * @param {Object} [params.error] - Objeto de erro, se houver.
 * @param {string} [params.correlationId] - ID para correlacionar respostas com solicitações.
 * @returns {Object} A mensagem padronizada.
 * @throws {Error} Se o messageType não for válido.
 */
function createMessage({ action, messageType, status, data, error, correlationId }) {
    // Verificar se o messageType é válido
    if (!Object.values(MESSAGE_TYPES).includes(messageType)) {
        throw new Error(`messageType inválido. Os valores permitidos são: ${Object.values(MESSAGE_TYPES).join(', ')}`);
    }

    return JSON.stringify({
        header: {
            messageId: generateUUID(),
            timestamp: new Date().toISOString(),
            messageType,
            ...(correlationId && { correlationId })
        },
        body: {
            status,
            action,
            ...(data !== undefined && { data }),
            ...(error && { error })
        }
    });
}

module.exports = {
    MESSAGE_TYPES,
    createMessage
};
