var KwAtual;
const idUsuario = localStorage.getItem("usuarioId");

function pegarValores(){
    const inputAdicionar = document.querySelector(".AdicionarValor").value;
    const valorDigitado = parseFloat(inputAdicionar.value.replace(',', '.'));
    const valorArredondado = Math.ceil(valorNumerico);
    localStorage.setItem("valorDigitado", valorArredondado)

    try{
        const res = await fetch("https://69ec4ad897482ad5c528424e.mockapi.io/usuario/${idUsuario}", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({energiaTotal: valorArredondado})
        });
    } catch (error){
        console.error("Erro ao atualizar:", error);
    }
}