const consumoMedio = {
    "Geladeira": 50,
    "Forno": 15,
    "Micro-ondas": 12,
    "Air-Fryer": 23,
    "Televisão": 20,
    "Ar-Condicionado": 150,
    "Ferro de Passar": 8,
    "Chuveiro Elétrico": 100,
    "Maquina De Lavar": 7,
    "Computador": 30
};

var KwAtual;

async function pegarValores(){
    const idUsuario = localStorage.getItem("usuarioId");
    console.log(idUsuario);

    const inputAdicionar = document.querySelector(".input");
    const valorDigitado = parseFloat(inputAdicionar.value.replace(',', '.'));
    const valorArredondado = Math.ceil(valorDigitado);

    localStorage.setItem("valorDigitado", valorArredondado);

    try {
        const res = await fetch(`https://69ec4ad897482ad5c528424e.mockapi.io/usuario/${idUsuario}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ energiaTotal: valorArredondado })
        });
    } catch (error){
        console.error("Erro ao atualizar:", error);
    }
}


function Outros(){
    const idUsuario = localStorage.getItem("usuarioId");
    const select = document.querySelector(".custom-select");
    const campoOutro = document.querySelector(".Outro");
    const campoOutroCons = document.querySelector(".OutroCons");

    if (select.value === "Outro") {
        campoOutro.style.visibility = "visible";
        campoOutroCons.style.visibility = "visible"
    } else {
        campoOutro.style.visibility = "hidden";
        campoOutroCons.style.visibility = "hidden"
    }
}



async function adicionarDispositivos(){
    const idUsuario = localStorage.getItem("usuarioId");
    const select = document.querySelector(".custom-select");
    const inputOutro = document.querySelector(".Outro");

let nomeDispositivo;
let consumo;

if (select.value === "Outro") {
    nomeDispositivo = inputOutro.value;

    const inputConsumo = document.querySelector(".OutroCons");
    consumo = Number(inputConsumo.value); // 👈 valor digitado

} else {
    nomeDispositivo = select.value;
    consumo = consumoMedio[nomeDispositivo] || 0;
}


    if (!consumo) {
        consumo = 0; 
    }

    try {
        const resUser = await fetch(`https://69ec4ad897482ad5c528424e.mockapi.io/usuario/${idUsuario}`);
        const usuario = await resUser.json();

        const dispositivos = usuario.dispositivos || [];

        dispositivos.push({
            nome: nomeDispositivo,
            consumoMensal: consumo
        });

        await fetch(`https://69ec4ad897482ad5c528424e.mockapi.io/usuario/${idUsuario}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...usuario,
                dispositivos: dispositivos
            })
        });
        listarDispositivos(dispositivos);
        alert("Dispositivo com consumo médio adicionado!");

    } catch (error) {
        console.error("Erro:", error);
    }
}


function listarDispositivos(dispositivos){
    let lista = document.getElementById("lista");

    // 👇 se ainda não existir, tenta de novo depois
    if (!lista) {
        console.log("lista não encontrada, tentando novamente...");
        setTimeout(() => listarDispositivos(dispositivos), 100);
        return;
    }

    lista.innerHTML = "";

    dispositivos.forEach((disp, index) => {
        lista.innerHTML += `
            <div>
                ${disp.nome || "-"} - ${disp.consumoMensal} kWh
                <button onclick="removerDispositivo(${index})">Remover</button>
            </div>
        `;
    });
}
// ==========================
// REMOVER DISPOSITIVO
// ==========================
async function removerDispositivo(index){
    const idUsuario = localStorage.getItem("usuarioId");
    try {
        const resUser = await fetch(`https://69ec4ad897482ad5c528424e.mockapi.io/usuario/${idUsuario}`);
        const usuario = await resUser.json();

        const dispositivos = usuario.dispositivos || [];

        dispositivos.splice(index, 1);

        await fetch(`https://69ec4ad897482ad5c528424e.mockapi.io/usuario/${idUsuario}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...usuario,
                dispositivos: dispositivos
            })
        });

        listarDispositivos(dispositivos);

    } catch (error) {
        console.error("Erro ao remover:", error);
    }
}

// ==========================
// CARREGAR AO ABRIR A PÁGINA
// ==========================
async function carregarDispositivos(){
    const idUsuario = localStorage.getItem("usuarioId");
    console.log("carregando...");


    // validação (evita erro)
    if (!idUsuario) {
        console.log("Usuário não encontrado no localStorage");
        return;
    }

    try {
        const resUser = await fetch(`https://69ec4ad897482ad5c528424e.mockapi.io/usuario/${idUsuario}`);
        const usuario = await resUser.json();

        console.log("dados do usuário:", usuario);

        // garante que sempre será um array
        const dispositivos = usuario.dispositivos || [];

        // atualiza a tela
        listarDispositivos(dispositivos);

    } catch (error) {
        console.error("Erro ao carregar:", error);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(carregarDispositivos, 50);
});