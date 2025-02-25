const express = require('express');
const router = express.Router();
const { getDetProductById } = require('../models/detalleModel');

// Obtener los detalles de un producto por ID
router.get('/detalle/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const productDet = await getDetProductById(id);
    if (!productDet) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(productDet);
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
});

module.exports = router;