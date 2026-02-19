const btnM = document.getElementById("btn-menu");
const menuAb = document.getElementById("menu");
const elemTextN = document.querySelectorAll(".textMenu");

btnM.addEventListener('click', () => {
    menuAb.classList.toggle("menuAberto");

    elemTextN.forEach(texto => {
        texto.classList.toggle("elem-text-menu");
    });
});

const btnAbaOp = document.getElementById("btn-treinamentos");
const sectAbaOp = document.getElementById("sect-aba-op");

btnAbaOp.addEventListener('click', () => {
    sectAbaOp.classList.add("ativo-aba-op");
});

sectAbaOp.addEventListener('click', (event) => {
    if (event.target === sectAbaOp){
        sectAbaOp.classList.remove("ativo-aba-op");
    }
});
k
// const btnOp = document.querySelectorAll(".btn-op");
const etapa1 = document.getElementById("l1-op");
const etapa2 = document.getElementById("l2-st");
const etapa3 = getElementById("l3-senha");
const etapa4 = getElementById("l3-sist");

let escolha1 = null;
let escolha2 = null;
let escolhe3 = null;

etapa1.addEventListener('click', (event) => {
     // Vou selecionar os botões, colocar em uma lista e quando fosse selecionado, passasse para a proxima fase com as conndições
    if (event.target.tagName === 'BUTTON'){
        const opcaoEscolhida = event.target.getAttribute('data-opcap');

        const escolha4 = {
    RH: "rh12345",
    GG: "gg12345",
    TI: "ti12345",
    FIN: "fin12345",
    JURI: "juri12345",
    ENG: "eng12345";
}

        verificarAcesso(opcaoEscolhida);
    }
});

//para cada botão individual, ele exacuta a função que está dentro dos parenteses. essa função recebe um parametro, que chamamos de    botao. durante a iteralçao, botao representa um dos botões da lista
etapa2.addEventListener('click', (event) => {
        // Vou selecionar os botões, colocar em uma lista e quando fosse selecionado, passasse para a proxima fase com as conndições
    if (event.target.tagName === 'BUTTON'){
        const setorEscolhido = event.target.getAttribute('data-setor');

        verificarAcesso(setorEscolhido);
    }
});



etapa4.addEventListener('click', (event) => {
     // Vou selecionar os botões, colocar em uma lista e quando fosse selecionado, passasse para a proxima fase com as conndições
    if (event.target.tagName === 'BUTTON'){
        const opcaoEscolhida = event.target.getAttribute('data-sist');

        verificarAcesso(opcaoEscolhida);
    }
});