const idUsuario = localStorage.getItem("usuarioId");

const res = await fetch(`https://69ec4ad897482ad5c528424e.mockapi.io/usuario/${idUsuario}`);
const data = await res.json();

const nome = data.nome;

