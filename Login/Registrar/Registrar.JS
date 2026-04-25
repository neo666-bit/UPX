async function verificarSenha() {
    const senha = document.querySelector("#senha").value;
    const confirmar = document.querySelector("#confirmar-senha").value;

    if (senha !== confirmar) {
        document.querySelector(".ConfirmarSenha").style.border = "#F22E3B 2px solid"
        document.querySelector(".Senha").style.border = "#F22E3B 2px solid"
        return

    } else {
        document.querySelector(".ConfirmarSenha").style.border = "none"
        await registrar();
        alert("Registro Criado")
        window.location.href = "../Login.html";

    }
}


async function registrar() {
    const email = document.querySelector("#email").value.toLowerCase();
    const senha = document.querySelector("#senha").value;

    const check = await fetch(`https://69ec4ad897482ad5c528424e.mockapi.io/usuario?email=${email}`);
    const existe = await check.json();

    if (existe.length > 0) {
        alert("Email já cadastrado!");
        return;
    }

    console.log({
    email: email,
    password: senha
});
    await fetch("https://69ec4ad897482ad5c528424e.mockapi.io/usuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: senha
        })
    });

}