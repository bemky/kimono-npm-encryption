var crypt = require('crypto');

var secret = {
  key: process.env.SECRET_KEY || new Buffer('abcdefghijklmnop'),
  iv: process.env.SECRET_IV || new Buffer('abcdefghijklmnop')
};


function encrypt(plainText) {
  var cipher = crypt.createCipher('aes-256-cbc', secret.key, secret.iv),
      encrypted = cipher.update(plainText, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

function decrypt(cipherText) {
  //FIXME: why do i have to do this?
  try {
    var cipher = crypt.createDecipher('aes-256-cbc', secret.key, secret.iv),
        plainText  = cipher.update(cipherText, 'base64', 'utf8');
    plainText += cipher.final('utf8');
    return plainText;
  }
  catch(e) {
    return '';
  }
}


module.exports = {
  encrypt: encrypt,
  decrypt: decrypt
};
