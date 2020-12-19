var admin = require("firebase-admin");

var serviceAccount = require("./manaworker.json");

var firebase_admin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://safe-for-builder.firebaseio.com"
});

module.exports = {admins: firebase_admin};