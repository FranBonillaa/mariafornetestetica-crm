const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/categorys — obtener todas las categoryas
router.get('/', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM category ORDER BY name ASC');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// GET /api/categorys/:id — obtener una categorya por id
router.get('/:id', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM category WHERE id = $1', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'categoria no encontrada' });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});


module.exports = router;
