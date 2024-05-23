const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database'); // Importamos la configuración de la base de datos
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'public')));

// Configuración de Nodemailer (sin cambios)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.verify().then(() => console.log('Listo para enviar correos'));

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post('/', async (req, res) => {
    try {
        const { email } = req.body;

        // Validación del correo electrónico (sin cambios)
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Correo electrónico inválido' });
        }

        // Verificar si el correo ya está suscrito
        const existingSubscription = await new Promise((resolve, reject) => {
            db.get("SELECT email FROM subscriptions WHERE email = ?", [email], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        if (existingSubscription) {
            return res.status(400).json({ error: 'Este correo ya está suscrito' });
        }

        // Insertar el correo en la base de datos
        await new Promise((resolve, reject) => {
            db.run("INSERT INTO subscriptions (email) VALUES (?)", [email], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        const emailTemplate = fs.readFileSync(
            path.join(__dirname, 'public', 'email_template.html'),
            'utf8'
        );

        // Configuración del correo de confirmación (sin cambios)
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Confirmación de Suscripción',
            html: emailTemplate,
            attachments: [
                {
                    filename: 'logo.png',
                    path: '/Users/miguelangelmusic/Documents/almejorestilowebpage/public/assets/logo.png',
                    cid: 'logo'
                },
                {
                    filename: 'foto5.svg',
                    path: '/Users/miguelangelmusic/Documents/almejorestilowebpage/public/assets/carusel/foto5.svg',
                    cid: 'foto5'
                }
            ]
        };

        // Envío del correo (sin cambios)
        await transporter.sendMail(mailOptions);

        res.json({ message: 'Suscripción exitosa' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

app.get('/emails', (req, res) => {
    db.all("SELECT email FROM subscriptions", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Iniciar el servidor (sin cambios)
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
