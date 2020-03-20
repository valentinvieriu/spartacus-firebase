const functions = require('firebase-functions');
const universal = require(process.cwd() + '/dist/mystore/server/main.js').app();
exports.spartacusUniversal = functions.https.onRequest(universal);
