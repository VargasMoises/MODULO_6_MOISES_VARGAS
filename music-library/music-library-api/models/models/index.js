const express = require('express');
const sequelize = require('./models');
const Artist = require('./models/Artist');
const Song = require('./models/Song');

const app = express();
app.use(express.json());

const PORT = 3000;

// Sincronizar la base de datos
sequelize.sync({ force: false }) // Usa { force: true } solo si quieres borrar y recrear tablas
  .then(() => {
    console.log('🎵 Base de datos sincronizada');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error al sincronizar la base de datos:', error);
  });

