const express = require('express');
const cors = require('cors');
const { manejarErroresMiddleware } = require("./middlewares/middlewares");
const usuariosRoutes = require('./routes/usuariosRoutes');
const productosRoutes = require('./routes/productosRoutes');
const proveedoresRoutes = require('./routes/proveedoresRoutes'); 
const subcategoriasRoutes = require('./routes/subcategoriasRoutes'); 
const productosAdminRoutes = require('./routes/productosAdminRoutes'); 
const promocionesRoutes = require('./routes/promocionesRoutes'); 
const tiendaRoutes = require('./routes/tiendaRoutes');
const bodyParser = require('body-parser');
const pedidosRouter = require('./routes/pedidos');
const detalleRoutes = require('./routes/detalleRoutes');
const lowStockProductsRoutes = require('./routes/lowStockProductsRoutes'); // Nueva ruta

const app = express();

app.use(express.json());

app.use(cors());

app.use(bodyParser.json());

app.use("/", usuariosRoutes);
app.use("/", productosRoutes);
app.use("/", proveedoresRoutes); 
app.use("/", subcategoriasRoutes); 
app.use("/", productosAdminRoutes);
app.use("/", promocionesRoutes);
app.use("/", tiendaRoutes);
app.use("/", pedidosRouter);
app.use("/", detalleRoutes);
app.use("/", lowStockProductsRoutes); // Nueva ruta

// Middleware de manejo de errores
app.use(manejarErroresMiddleware);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`¡Servidor encendido en el puerto ${PORT}!`);
});

module.exports = { app, server };