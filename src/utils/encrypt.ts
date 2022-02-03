import crypto from 'crypto';

const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;
const initializationVector = process.env.REACT_APP_INITIALIZATION_VECTOR;

// @ts-ignore
const binaryEncryptionKey = Buffer.from(encryptionKey, 'base64');
// @ts-ignore
const binaryIV = Buffer.from(initializationVector, 'base64');

const encrypt = (input:string) => {
  const cipher = crypto.createCipheriv(
    'AES-128-CBC',
    binaryEncryptionKey,
    binaryIV,
  );

  // When encrypting, we're converting the UTF-8 input to base64 output.
  return cipher.update(input, 'utf8', 'base64') + cipher.final('base64');
};

export default encrypt;
