const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Conexión a la base de datos (o crea una nueva si no existe)
const dbPath = path.join(__dirname, 'subscriptions.db'); // Nombre del archivo de la base de datos
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Conectado a la base de datos de SQLite.');
    }
});

// Crear la tabla "subscriptions" si no existe
db.run(`
  CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL
  )
`);

module.exports = db;

