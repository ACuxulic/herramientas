const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

// Ruta para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    const data = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
    res.json(data.usuarios);
});

// Ruta para agregar un nuevo usuario
app.post('/usuarios', (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ error: 'Nombre es requerido' });
    }

    const data = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
    const nuevoUsuario = { id: data.usuarios.length + 1, nombre };
    data.usuarios.push(nuevoUsuario);
    fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
    res.json(nuevoUsuario);
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
