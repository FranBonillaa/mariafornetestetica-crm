//Cargamos las variables del .env
require('dotenv').config();

//Importar librerias
const express = require('express');
const cors = require('cors');

//Importar rutas
const authRoutes = require('./routes/auth');
const clients = require('./routes/clients');
const appointments = require('./routes/appointments');
const services = require('./routes/services');
const packages = require('./routes/packages');
const payments = require('./routes/payments');
const categories = require('./routes/categories');
const clientPackages = require('./routes/client-packages');
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

app.use('/api/clients', authMiddleware, clients);
app.use('/api/appointments', authMiddleware, appointments);
app.use('/api/services', authMiddleware, services);
app.use('/api/packages', authMiddleware, packages);
app.use('/api/payments', authMiddleware, payments);
app.use('/api/categories', authMiddleware, categories);
app.use('/api/client-packages', authMiddleware, clientPackages);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})