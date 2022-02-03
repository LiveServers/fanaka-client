import crypto from 'crypto';

const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;
const initializationVector = process.env.REACT_APP_INITIALIZATION_VECTOR;

// @ts-ignore
const binaryEncryptionKey = Buffer.from(encryptionKey, 'base64');
// @ts-ignore
const binaryIV = Buffer.from(initializationVector, 'base64');

const decrypt = (encryptedText:string) => {
  const decipher = crypto.createDecipheriv(
    'AES-128-CBC',
    binaryEncryptionKey,
    binaryIV,
  );

  // When decrypting we're converting the base64 input to UTF-8 output.
  return (
    decipher.update(encryptedText, 'base64', 'utf8') + decipher.final('utf8')
  );
};
export default decrypt;
