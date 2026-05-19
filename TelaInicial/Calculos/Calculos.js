const idLogado = localStorage.getItem("usuarioId");
const res = await fetch(`https://69ec4ad897482ad5c528424e.mockapi.io/usuario/${idUsuario}`);
const data = await res.json();
var ValorEmEnergia = data.energiaTotal 



async function CalcularEnergiaEstado(){
    const estado = data.estado;
    const precoKwh = {
    AC: 0.92, AL: 0.89, AP: 0.84, AM: 0.97, BA: 0.88, CE: 0.86, DF: 0.82, ES: 0.83, GO: 0.85, MA: 0.91, MT: 0.87, MS: 0.84, MG: 0.81, PA: 0.94, PB: 0.88, PR: 0.79, PE: 0.87, PI: 0.90, RJ: 1.05, RN: 0.86, RS: 0.82, RO: 0.93, RR: 0.95, SC: 0.78, SP: 0.84, SE: 0.85, TO: 0.89
    };

  

    ValorDekWh = ValorEmEnergia / precoKwh[estado]

    return ValorDekWh
}

async function calcularPlacas(){

    const idUsuario = localStorage.getItem("usuarioId");
    
    const geracaoHora550W = {
    AC: 0.41, AL: 0.48, AP: 0.42, AM: 0.39, BA: 0.49, CE: 0.53, DF: 0.51, ES: 0.44, GO: 0.52, MA: 0.48, MT: 0.53, MS: 0.51, MG: 0.49, PA: 0.42, PB: 0.50, PR: 0.38, PE: 0.51, PI: 0.54, RJ: 0.45, RN: 0.55, RS: 0.34, RO: 0.45, RR: 0.43, SC: 0.35, SP: 0.43, SE: 0.49, TO: 0.52
    };

    const estado = data.estado;

    const dispositivos = data.dispositivos || [];

    const consumoTotal = dispositivos.reduce((soma, dispositivo) => {
        return soma + dispositivo.consumoMensal;
    }, 0);

    const geracaoPorPlaca = geracaoMensal550W[estado];

    const placas = Math.ceil(consumoTotal / geracaoPorPlaca);

    console.log(placas);

    return placas;
}

