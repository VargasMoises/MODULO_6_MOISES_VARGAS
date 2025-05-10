const express = require('express');
const { Sequelize } = require('sequelize');
const { Song, Artist } = require('./models'); // Asegúrate de que tus modelos estén exportados desde models/index.js

const app = express();
const port = 3000;

app.use(express.json()); // Middleware para parsear JSON

// GET: Obtener todas las canciones
app.get('/songs', async (req, res) => {
  try {
    const songs = await Song.findAll({ include: Artist });
    res.status(200).json(songs);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener canciones' });
  }
});

// POST: Crear una nueva canción
app.post('/songs', async (req, res) => {
  const { title, artistId, releaseYear, duration, coverUrl } = req.body;
  try {
    const song = await Song.create({ title, artistId, releaseYear, duration, coverUrl });
    res.status(201).json(song);
  } catch (err) {
    res.status(400).json({ error: 'Datos inválidos' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
