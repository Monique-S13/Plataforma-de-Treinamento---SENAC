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
