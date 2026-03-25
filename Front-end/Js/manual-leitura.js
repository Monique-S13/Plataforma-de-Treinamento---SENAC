// REPRODUZINDO LÓGICA PADRÃO DO MENU (MANTIDO)
const btnM = document.getElementById("btn-menu");
const menuAb = document.getElementById("menu");
const elemTextN = document.querySelectorAll(".textMenu");

btnM.addEventListener('click', () => {
  menuAb.classList.toggle("menuAberto");
  elemTextN.forEach(texto => texto.classList.toggle("elem-text-menu"));
  
  const btnBar = document.querySelector(".bar");
  const btnClouse = document.querySelector(".close");

  if(menuAb.classList.contains("menuAberto")){
    btnBar.style.display = "none";
    btnClouse.style.display = "flex"; 
  } else {
    btnBar.style.display = "flex";
    btnClouse.style.display = "none";
  }
});

// BOTÃO TEMA (PADRÃO)
const btnTema = document.getElementById("barra-tt");
btnTema.addEventListener('click', () => { 
    document.body.classList.toggle("tema-claro"); 
});

// CAPTURA DE DADOS DA URL
const paramsM = new URLSearchParams(window.location.search);
const softM = paramsM.get('software')?.toUpperCase();
const camM = paramsM.get('caminho');

// EXIBE APENAS O TÍTULO E O CAMINHO (O TEXTO DE AVISO JÁ ESTÁ NO SEU HTML)
if (softM) {
    const tituloManual = document.getElementById('titulo-manual');
    const caminhoManual = document.getElementById('caminho-manual');
    
    if(tituloManual) tituloManual.textContent = softM;
    if(caminhoManual) caminhoManual.textContent = camM;
}

/* ================================================================
LÓGICA DE PASSOS (COMENTADA PARA USO FUTURO)
================================================================
const bancoManuais = {
    "MANUAL DE CONDUTA": [
        { passo: 1, texto: "Leia as diretrizes de ética.", img: "../Assets/print1.png" }
    ]
};

const containerM = document.getElementById('conteudo-manual');
if (containerM && softM && bancoManuais[softM]) {
    bancoManuais[softM].forEach(item => {
        const card = document.createElement('div');
        card.className = 'card-passo';
        card.innerHTML = `
            <div class="header-card"><span class="num-passo">PASSO ${item.passo}</span></div>
            <p class="desc-passo">${item.texto}</p>
            ${item.img ? `<img src="${item.img}" class="img-manual">` : ''}
        `;
        containerM.appendChild(card);
    });
}
================================================================ 
*/
