// routes/productos.routes.js
const express = require('express');
const router = express.Router();
const productosDAO = require('../dao/productos.dao');

// GET /api/productos - Obtener lista
router.get('/', async (req, res) => {
    try {
        const productos = await productosDAO.getAllProductos();
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

// POST /api/productos - Guardar nuevo
router.post('/', async (req, res) => {
    const nombre = typeof req.body.nombre === 'string' ? req.body.nombre.trim() : '';
    const precio = Number(req.body.precio);
    if (!nombre || req.body.precio === '' || req.body.precio === null ||
        !Number.isFinite(precio) || precio < 0) {
        return res.status(400).json({ error: 'Ingresa un nombre y un precio válido.' });
    }

    try {
        const result = await productosDAO.createProducto(nombre, precio);
        res.status(201).json({ message: 'Producto creado', id: result.insertId });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ error: 'Error al crear producto' });
    }
});

module.exports = router;