let numerosAleatoriosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function verificarChute(){
    let chute = document.querySelector("input").value;
    if(chute == numeroSecreto){
        modificadorDeTags("h1", "Você acertou!");
        let palavraTentativa = tentativas == 1 ? "tentativa" : "tentativas"
        let mensagemTentativas = `Você descubriu o numero secreto com ${tentativas} ${palavraTentativa} 
        `;
        modificadorDeTags("p", mensagemTentativas);
        botãoNovoJogo(true);
    }else{
        modificadorDeTags("h1", "Tu errou");
        if(chute > numeroSecreto){
            modificadorDeTags("p", "O numero é menor que -> " + chute);
        }else{
            modificadorDeTags("p", "O numero é maior que -> " + chute);
        }
        tentativas++;
        limparCampo();
    }
}

function modificadorDeTags(tag, texto){
    let titulo1 = document.querySelector(tag);
    titulo1.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosLista = numerosAleatoriosSorteados.length;  

    if(quantidadeElementosLista == 3){
        numerosAleatoriosSorteados = [];
    }
    if(numerosAleatoriosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        numerosAleatoriosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function exibirMensagemInicial(){
    modificadorDeTags("h1", "Jogo do número secreto!");
    modificadorDeTags("p", "Escolha um numero entre 1 e 100");
}

exibirMensagemInicial();

console.log(numeroSecreto);

function comparadorDeNumeros(oNumero){
    let resultado
    if(oNumero > 0){
        resultado ="Numero é positivo";
    }else if(oNumero == 0){
        resultado = "Numero é zero";
    }else{
        resultado = "Numero é negativo";
    }
    return resultado;
}
console.log(comparadorDeNumeros(-15));

function limparCampo(){
    chute = document.querySelector("input");
    chute.value = "";
}

function botãoNovoJogo(verdade){
    if(verdade == true){
        document.getElementById("reiniciar").removeAttribute("disabled");
    }else{
        document.getElementById("reiniciar").setAttribute("disabled", true);
    }
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    botãoNovoJogo(false);
}