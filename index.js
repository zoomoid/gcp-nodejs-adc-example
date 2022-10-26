const dotenv = require("dotenv-safe");

dotenv.config({
  debug: true,
  allowEmptyValues: true,
});

const config = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  serviceAccount: process.env.FIREBASE_SERVICE_ACCOUNT,
  serviceAccountId: process.env.FIREBASE_SERVICE_ACCOUNT_ID,
  apiKey: process.env.FIREBASE_API_KEY,
  appId: process.env.FIREBASE_APP_ID,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  measurementSenderId: process.env.FIREBASE_MEASUREMENT_SENDER_ID,
};

(async () => {
  const {
    applicationDefault,
    initializeApp,
    cert,
  } = require("firebase-admin/app");
  const { getStorage } = require("firebase-admin/storage");

  const firebaseAdmin = initializeApp({
    storageBucket: config.storageBucket,
    credential: config.serviceAccount
      ? cert(config.serviceAccount)
      : applicationDefault(),
  });
  try {
    const res = await getStorage(firebaseAdmin).bucket().getFiles();
    res[0].forEach((v) => console.log("firebase-admin: %s", v.name));
  } catch (e) {
    console.error(e);
  }
})();

(async () => {
  const { initializeApp } = require("firebase/app");
  const { getStorage, listAll, ref } = require("firebase/storage");
  const app = initializeApp({
    apiKey: config.apiKey,
    appId: config.appId,
    authDomain: config.authDomain,
    databaseURL: config.databaseURL,
    measurementId: config.measurementId,
    messagingSenderId: config.measurementSenderId,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
  });
  try {
    const res = await listAll(ref(getStorage(app)));
    res.items.forEach((v) => console.log("firebase: %s", v.name));
  } catch (e) {
    console.error(e);
  }
})();
