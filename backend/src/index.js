//Cargamos las variables del .env
require('dotenv').config();

//Importar librerias
const express = require('express');
const cors = require('cors');

//Importar rutas
const authRoutes = require('./routes/auth');
const clients = require('./routes/clients');
const authMiddleware = require('./middleware/auth');

//Creacion aplicación Express
const app = express();
const PORT = process.env.PORT || 4000

//Solo acepta peticiones del frontend (Vercel + localhost en desarrollo)
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173'].filter(Boolean);
app.use(cors({ origin: allowedOrigins }));

//Solo lectura de JSON en peticiones
app.use(express.json());

//Confirma que el servidor funciona
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' })
});

//Rutas públicas
app.use('/api/auth', authRoutes);

//Rutas privadas
app.use('/api/clients', authMiddleware, clients);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

