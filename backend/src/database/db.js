const admin = require('firebase-admin');
const { firestoreConfig } = require('../config/database');

admin.initializeApp({
  credential: admin.credential.cert(firestoreConfig),
});

const db = admin.firestore();

module.exports = {
  db,
};
