const fs = require('fs');
const path = require('path');

const publicKey = fs.readFileSync(
  path.join(__dirname, './', 'cert', 'public_key.pem')
);

const privateKey = fs.readFileSync(
  path.join(__dirname, './', 'cert', 'private_key.pem')
);


module.exports = {
  publicKey,
  privateKey
};
