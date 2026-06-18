const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/client-packages — obtener todos los bonos comprados
router.get('/', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM client_package ORDER BY purchase_date DESC');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// GET /api/client-packages/:id — obtener un bono comprado por id
router.get('/:id', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM client_package WHERE id = $1', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Bono no encontrado' });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// GET /api/client-packages/client/:client_id — obtener todos los bonos de una clienta
router.get('/client/:client_id', async (req, res) => {
    try {
        const { rows } = await db.query(
            'SELECT * FROM client_package WHERE client_id = $1 ORDER BY purchase_date DESC',
            [req.params.client_id]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// POST /api/client-packages — registrar compra de un bono
router.post('/', async (req, res) => {
    const { client_id, package_id, total_sessions, paid_price } = req.body;
    if (!client_id) return res.status(400).json({ error: 'La clienta es obligatoria' });
    if (!package_id) return res.status(400).json({ error: 'El bono es obligatorio' });
    if (!total_sessions) return res.status(400).json({ error: 'El número de sesiones es obligatorio' });
    try {
        const { rows } = await db.query(
            `INSERT INTO client_package (client_id, package_id, total_sessions, paid_price)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [client_id, package_id, total_sessions, paid_price]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// PATCH /api/client-packages/:id/use — consumir una sesión del bono
// A diferencia del CRUD normal, este endpoint tiene lógica de negocio:
// incrementa sessions_used y desactiva el bono automáticamente cuando se agotan las sesiones.
router.patch('/:id/use', async (req, res) => {
    try {
        // Suma 1 a sessions_used. Si sessions_used alcanza total_sessions, is_active pasa a false
        const { rows } = await db.query(
            `UPDATE client_package
             SET sessions_used = sessions_used + 1,
                 is_active = CASE WHEN sessions_used + 1 >= total_sessions THEN false ELSE true END
             WHERE id = $1 AND is_active = true RETURNING *`,
            [req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ error: 'Bono no encontrado o ya agotado' });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// DELETE /api/client-packages/:id — eliminar un bono comprado
router.delete('/:id', async (req, res) => {
    try {
        const { rows } = await db.query('DELETE FROM client_package WHERE id = $1 RETURNING *', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Bono no encontrado' });
        res.json({ message: 'Bono eliminado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

module.exports = router;
