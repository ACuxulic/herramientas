const express = require('express');
const connection = require('./db');
const app = express();
app.use(express.json());
app.use(express.static('public'));

// Obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
    connection.query('SELECT * FROM usuarios', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Agregar un nuevo usuario
app.post('/api/usuarios', (req, res) => {
    const { nombre } = req.body;
    connection.query('INSERT INTO usuarios (nombre) VALUES (?)', [nombre], (err) => {
        if (err) throw err;
        res.sendStatus(201);
    });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => { 
    console.log('Servidor corriendo en http://localhost:${PORT}');
});