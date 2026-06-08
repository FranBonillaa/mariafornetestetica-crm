//Cargamos las variables del .env
require('dotenv').config();

//Importar librerias
const express = require('express');
const cors = require('cors');

//Importar rutas
const authRoutes = require('./routes/auth');
const clients = require('./routes/clients');
const collaborations = require('./routes/collaborations');

//Creacion aplicación Express
const app = express();
const PORT = process.env.PORT || 4000

//Solo acepta peticiones del frontend
app.use(cors({ origin: process.env.FRONTEND_URL }));

//Solo lectura de JSON en peticiones
app.use(express.json());

//Confirma que el servidor funciona
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' })
});

//Rutas públicas
app.use('/api/auth', authRoutes);

//Rutas privadas
const authMiddleware = require('./middleware/auth');
app.use('/api/clients', authMiddleware, clients);
app.use('/api/collaborations', authMiddleware, collaborations);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
