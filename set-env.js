// set-env.js
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Percorso della cartella e del file
const dirPath = path.join(__dirname, "src/environments");
const filePathProd = path.join(dirPath, "environment.ts");
const filePath = path.join(dirPath, "environment.development.ts");

// Crea la cartella environments se non esiste
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}
// legge le env Var fornite da Render
const content = `
export const environment = {
  firebaseConfig: {
    apiKey:        '${process.env.FIREBASE_API_KEY}',
    authDomain:    '${process.env.FIREBASE_AUTH_DOMAIN}',
    projectId:     '${process.env.FIREBASE_PROJECT_ID}',
    storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
    messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
    appId:         '${process.env.FIREBASE_APP_ID}'
  }
};
`;

// Scrive il file nella cartella environments
fs.writeFileSync(filePath, content.trim());
fs.writeFileSync(filePathProd, content.trim());
