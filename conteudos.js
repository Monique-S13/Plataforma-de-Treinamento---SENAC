// function menuF() {
//     barC = document.getElementByClassName("fa-bars");
//     barI = document.getElementByClassName("fa-bars-staggered ");

//     if (){
//         barI.classList.toggle(ocultarB);
//     } else{
//         barC.classList.toggle(ocultarB);
//     }
    
// }


// eu quero uma função que quando eu clico na barra, o menu se expande, quando feixo, os textos fica none e só fica os icones centralizados no menu



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

// document.getElementById("btn_op_p").addEventListener('click', () => {

// });