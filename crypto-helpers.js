// crypto-helpers.js - Funciones para cifrado y descifrado de mensajes

/**
 * Cifra un texto usando AES.
 * La clave se deriva del ID del chat para asegurar que cada chat tenga una clave única.
 * @param {string} plainText - El texto a cifrar.
 * @param {string} key - La clave secreta (en este caso, el ID del chat).
 * @returns {string} - El texto cifrado en formato Base64.
 */
function encryptMessage(plainText, key) {
    if (!plainText || !key) {
        throw new Error("Texto y clave son requeridos para el cifrado.");
    }
    // Usamos CryptoJS para cifrar el mensaje con el algoritmo AES
    const encrypted = CryptoJS.AES.encrypt(plainText, key);
    return encrypted.toString(); // Esto devuelve una cadena Base64
}

/**
 * Descifra un texto cifrado con AES.
 * @param {string} cipherText - El texto cifrado en formato Base64.
 * @param {string} key - La clave secreta (en este caso, el ID del chat).
 * @returns {string} - El texto original descifrado.
 */
function decryptMessage(cipherText, key) {
    if (!cipherText || !key) {
        throw new Error("Texto cifrado y clave son requeridos para el descifrado.");
    }
    // Desciframos el mensaje
    const bytes = CryptoJS.AES.decrypt(cipherText, key);
    // Convertimos los bytes descifrados a una cadena de texto UTF-8
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    
    if (!originalText) {
        throw new Error("No se pudo descifrar el mensaje. La clave podría ser incorrecta o el texto estar corrupto.");
    }

    return originalText;
}
