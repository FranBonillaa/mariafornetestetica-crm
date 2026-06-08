const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM collaboration ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

router.post('/', async (req, res) => {
    const { brand_name, category, contact, status, responsible, notes } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO collaboration (brand_name, category, contact, status, responsible, notes) VALUES (?,?,?,?,?,?)',
            [brand_name, category, contact, status, responsible, notes]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});