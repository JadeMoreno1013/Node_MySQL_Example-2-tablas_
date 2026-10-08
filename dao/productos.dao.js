// dao/productos.dao.js
const db = require('../services/mysql.service');

// Obtener todos los productos
const getAllProductos = async () => {
    const [rows] = await db.query('SELECT * FROM productos');
    return rows;
};

// Insertar un nuevo producto
const createProducto = async (nombre, precio) => {
    const [result] = await db.query(
        'INSERT INTO productos (nombre, precio) VALUES (?, ?)',
        [nombre, precio]
    );
    return result;
};

module.exports = { getAllProductos, createProducto };