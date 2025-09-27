// crypto-helpers.js - Funciones robustas para cifrado y descifrado de mensajes

/**
 * Cifra un texto usando AES-256.
 * La clave se deriva del ID del chat para asegurar que cada chat tenga una clave única y segura.
 * @param {string} plainText - El texto a cifrar.
 * @param {string} key - La clave secreta (ID del chat).
 * @returns {string} - El texto cifrado en formato Base64.
 * @throws {Error} Si el texto o la clave faltan.
 */
function encryptMessage(plainText, key) {
    if (typeof plainText !== 'string' || !plainText || typeof key !== 'string' || !key) {
        throw new Error("Texto y clave son requeridos para el cifrado.");
    }
    try {
        // Usamos CryptoJS para cifrar el mensaje con el algoritmo AES
        const encrypted = CryptoJS.AES.encrypt(plainText, key);
        return encrypted.toString(); // Retorna una cadena Base64
    } catch (error) {
        console.error("Error en el cifrado:", error);
        // En un caso real, se podría manejar este error de forma más específica
        throw new Error("No se pudo cifrar el mensaje.");
    }
}

/**
 * Descifra un texto cifrado con AES-256.
 * @param {string} cipherText - El texto cifrado en formato Base64.
 * @param {string} key - La clave secreta (ID del chat).
 * @returns {string} - El texto original descifrado.
 * @throws {Error} Si el texto cifrado o la clave faltan, o si el descifrado falla.
 */
function decryptMessage(cipherText, key) {
    if (typeof cipherText !== 'string' || !cipherText || typeof key !== 'string' || !key) {
        throw new Error("Texto cifrado y clave son requeridos para el descifrado.");
    }
    try {
        // Desciframos el mensaje
        const bytes = CryptoJS.AES.decrypt(cipherText, key);
        
        // Convertimos los bytes descifrados a una cadena de texto UTF-8
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        
        // Si el resultado es una cadena vacía, el descifrado falló (clave incorrecta o texto corrupto)
        if (!originalText) {
            throw new Error("Descifrado resultó en una cadena vacía.");
        }

        return originalText;
    } catch (error) {
        console.error("Error en el descifrado:", error);
        throw new Error("No se pudo descifrar el mensaje. La clave podría ser incorrecta o el texto estar corrupto.");
    }
}
