async function login() {
    const email = document.querySelector("#email").value.toLowerCase();
    const senha = document.querySelector("#senha").value;

    try {
        const res = await fetch(`https://69ec4ad897482ad5c528424e.mockapi.io/usuario?email=${email}`);
        const data = await res.json();

        if (data.length > 0 && data[0].password === senha) {
            const usuarioId = data[0].id;
            alert("Login realizado!");

            localStorage.setItem("usuarioLogado", email);
            localStorage.setItem("usuarioId", usuarioId);

            window.location.href = "../TelaInicial/index.html";

        } else {
            alert("Email ou senha incorretos");
        }

    } catch (erro) {
        console.error("Erro ao conectar com a API:", erro);
        alert("Erro ao fazer login");
    }
}