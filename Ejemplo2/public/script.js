document.getElementById('userForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;

    // Enviar el nuevo usuario a la API
    await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre })
    });

    document.getElementById('nombre').value = '';
    cargarUsuarios();
});

async function cargarUsuarios() {
    const response = await fetch('/api/usuarios');
    const usuarios = await response.json();
    const usuariosList = document.getElementById('usuariosList');
    usuariosList.innerHTML = '';
    usuarios.forEach(usuario => {
        const li = document.createElement('li');
        li.textContent = usuario.nombre;
        li.className = 'list-group-item';
        usuariosList.appendChild(li);
    });
}

cargarUsuarios();