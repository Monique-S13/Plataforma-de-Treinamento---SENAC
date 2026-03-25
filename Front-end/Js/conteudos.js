// ==================== BANCO DE DADOS E ESTADOS (MANTIDO 100%) ====================
const treinamentos = {
    interno: {
        setores: {
            RH: { senha: "rh12345", softwares: ["Word RH", "Excel RH", "Folha de Pagamento", "Recrutamento", "Cultura Imp"] },
            TI: { senha: "ti12345", softwares: ["Segurança", "Suporte", "Redes", "RM Totvs"] }
        }
    },
    tutorial: { softwares: ["Portal Imp", "Bater Ponto", "Email Corporativo", "Chamados TI"] },
    externo: { softwares: ["Canva", "CRM Vendas", "Analytics"] },
    manual: { softwares: ["Manual de Conduta", "Passo a Passo: Primeiro Dia"] }
};

let escolhaTreinamento = null;
let escolhaSetor = null;
let escolhaSoftware = null;

// ==================== SELETORES (MANTIDO 100%) ====================
const btnM = document.getElementById("btn-menu");
const menuAb = document.getElementById("menu");
const elemTextN = document.querySelectorAll(".textMenu");
const btnAbaOp = document.getElementById("btn-treinamentos");
const sectAbaOp = document.getElementById("sect-aba-op");
const abaOp = document.getElementById("aba-op");
const btnVoltar = document.getElementById("btn-voltar-modal");
const senhaInput = document.getElementById("senhaInput");
const btnValidarSenha = document.getElementById("btnValidarSenha");

// ==================== ABRIR E RESETAR (CORREÇÃO DE CLIQUE) ====================
if (btnAbaOp) {
    btnAbaOp.addEventListener('click', (e) => {
        // Impede que o clique no botão feche o modal instantaneamente pelo sectAbaOp
        e.stopPropagation(); 
        
        // Garante que o modal sempre abra na primeira etapa
        document.getElementById("cont-l1").style.display = "flex";
        document.getElementById("cont-l2").style.display = "none";
        document.getElementById("cont-l3").style.display = "none";
        document.getElementById("cont-l4").style.display = "none";
        
        sectAbaOp.classList.add("ativo-aba-op");
        atualizarVisibilidadeBotaoVoltar();
    });
}

// ==================== FECHAR (PROTEÇÃO DO CARD) ====================
if (sectAbaOp) {
    sectAbaOp.addEventListener('click', (event) => {
        // Só fecha se clicar no fundo (sectAbaOp), não no card (aba-op)
        if (event.target === sectAbaOp){
            sectAbaOp.classList.remove("ativo-aba-op");
        }
    });
}

// ==================== LÓGICA DE NAVEGAÇÃO (MANTIDO 100%) ====================
function atualizarVisibilidadeBotaoVoltar() {
  const l1 = document.getElementById("cont-l1");
  if (btnVoltar) {
    if (l1 && window.getComputedStyle(l1).display !== "none") {
      btnVoltar.style.display = "none";
    } else {
      btnVoltar.style.display = "flex";
    }
  }
}

if (btnVoltar) {
  btnVoltar.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita conflitos de clique ao voltar
    const l1 = document.getElementById("cont-l1"), l2 = document.getElementById("cont-l2");
    const l3 = document.getElementById("cont-l3"), l4 = document.getElementById("cont-l4");

    if (window.getComputedStyle(l3).display !== "none") {
      l3.style.display = "none";
      if (escolhaTreinamento === 'interno') { l4.style.display = "flex"; } 
      else { l1.style.display = "flex"; }
    } 
    else if (window.getComputedStyle(l4).display !== "none") {
      l4.style.display = "none";
      l2.style.display = "flex";
    } 
    else if (window.getComputedStyle(l2).display !== "none") {
      l2.style.display = "none";
      l1.style.display = "flex";
    }
    atualizarVisibilidadeBotaoVoltar();
  });
}

// ==================== CLIQUES NAS OPÇÕES (MANTIDO 100%) ====================
if (abaOp) {
    abaOp.addEventListener("click", (event) => {
        if (event.target.tagName !== "BUTTON" || event.target === btnVoltar) return;
        
        const liId = event.target.closest("li").id;

        if (liId === "cont-l1") {
            escolhaTreinamento = event.target.getAttribute("data-opcao");
            document.getElementById("cont-l1").style.display = "none";

            if (treinamentos[escolhaTreinamento].setores) {
                const container = document.getElementById("l2-st");
                container.innerHTML = "";
                Object.keys(treinamentos[escolhaTreinamento].setores).forEach(setor => {
                    const btn = document.createElement("button");
                    btn.className = "btn-op";
                    btn.textContent = setor;
                    btn.setAttribute("data-setor", setor);
                    container.appendChild(btn);
                });
                document.getElementById("cont-l2").style.display = "flex";
            } else {
                mostrarSoftwares(treinamentos[escolhaTreinamento].softwares);
            }
        } 
        else if (liId === "cont-l2") {
            escolhaSetor = event.target.getAttribute("data-setor");
            document.getElementById("cont-l2").style.display = "none";
            document.getElementById("cont-l4").style.display = "flex"; 
        }
        else if (liId === "cont-l3") {
            escolhaSoftware = event.target.textContent.trim();
            let caminhoTrilha = `${escolhaTreinamento.toUpperCase()}${escolhaSetor ? ' > ' + escolhaSetor.toUpperCase() : ''} > ${escolhaSoftware.toUpperCase()}`;
            
            if (escolhaTreinamento === "manual") {
                window.location.href = `manual-leitura.html?software=${encodeURIComponent(escolhaSoftware)}&caminho=${encodeURIComponent(caminhoTrilha)}`;
            } else {
                window.location.href = `videos-treinamento.html?software=${encodeURIComponent(escolhaSoftware)}&caminho=${encodeURIComponent(caminhoTrilha)}`;
            }
        }
        atualizarVisibilidadeBotaoVoltar();
    });
}

function mostrarSoftwares(lista) {
  const container = document.getElementById("l3-sist");
  container.innerHTML = "";
  lista.forEach(soft => {
    const btn = document.createElement("button");
    btn.className = "btn-op";
    btn.textContent = soft;
    container.appendChild(btn);
  });
  document.getElementById("cont-l3").style.display = "flex";
  atualizarVisibilidadeBotaoVoltar();
}

if (btnValidarSenha) {
    btnValidarSenha.addEventListener('click', () => {
        const digitada = senhaInput.value.trim();
        const correta = treinamentos[escolhaTreinamento].setores[escolhaSetor].senha;
        if (digitada === correta) {
            document.getElementById("cont-l4").style.display = "none";
            mostrarSoftwares(treinamentos[escolhaTreinamento].setores[escolhaSetor].softwares);
        } else {
            alert("Senha incorreta!");
        }
    });
}

// ==================== MENU E TEMA (MANTIDO 100%) ====================
if (btnM) {
    btnM.addEventListener('click', () => {
        menuAb.classList.toggle("menuAberto");
        elemTextN.forEach(texto => texto.classList.toggle("elem-text-menu"));
        const btnBar = document.querySelector(".bar"), btnClouse = document.querySelector(".close");
        if(menuAb.classList.contains("menuAberto")){
            btnBar.style.display = "none"; btnClouse.style.display = "flex"; 
        } else {
            btnBar.style.display = "flex"; btnClouse.style.display = "none";
        }
    });
}

const btnTema = document.getElementById("barra-tt");
if (btnTema) {
    btnTema.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que a troca de tema feche o modal se ele estiver aberto
        document.body.classList.toggle("tema-claro");
    });
}

// ==================== PARTÍCULAS (MANTIDO 100%) ====================
function criarParticulas() {
  let container = document.getElementById('particles');
  if (!container) {
    container = document.createElement('div');
    container.id = 'particles';
    container.className = 'particles-container';
    const main = document.querySelector('main');
    if (main) main.appendChild(container); else return;
  }
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 20 + 5;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    container.appendChild(particle);
  }
}

window.onload = () => {
    criarParticulas();
    atualizarVisibilidadeBotaoVoltar();
};
        document.getElementById("cont-l1").style.display = "flex";
        document.getElementById("cont-l2").style.display = "none";
        document.getElementById("cont-l3").style.display = "none";
        document.getElementById("cont-l4").style.display = "none";
        
        sectAbaOp.classList.add("ativo-aba-op");
        atualizarVisibilidadeBotaoVoltar();
    });
}

// ==================== ALTERAÇÃO 2: FECHAR (PROTEÇÃO DO CARD) ====================
if (sectAbaOp) {
    sectAbaOp.addEventListener('click', (event) => {
        // [ALTERAÇÃO]: Verifica se o clique foi EXATAMENTE no fundo escuro.
        // Se clicar dentro do "aba-op" (card), ele NÃO fecha mais.
        if (event.target === sectAbaOp){
            sectAbaOp.classList.remove("ativo-aba-op");
        }
    });
}

// ==================== LÓGICA DE NAVEGAÇÃO (MANTIDO 100%) ====================
function atualizarVisibilidadeBotaoVoltar() {
  const l1 = document.getElementById("cont-l1");
  if (btnVoltar) {
    if (l1 && window.getComputedStyle(l1).display !== "none") {
      btnVoltar.style.display = "none";
    } else {
      btnVoltar.style.display = "flex";
    }
  }
}

if (btnVoltar) {
  btnVoltar.addEventListener('click', (e) => {
    e.stopPropagation(); // Previne fechar o modal ao clicar no voltar
    const l1 = document.getElementById("cont-l1"), l2 = document.getElementById("cont-l2");
    const l3 = document.getElementById("cont-l3"), l4 = document.getElementById("cont-l4");

    if (window.getComputedStyle(l3).display !== "none") {
      l3.style.display = "none";
      if (escolhaTreinamento === 'interno') { l4.style.display = "flex"; } 
      else { l1.style.display = "flex"; }
    } 
    else if (window.getComputedStyle(l4).display !== "none") {
      l4.style.display = "none";
      l2.style.display = "flex";
    } 
    else if (window.getComputedStyle(l2).display !== "none") {
      l2.style.display = "none";
      l1.style.display = "flex";
    }
    atualizarVisibilidadeBotaoVoltar();
  });
}

// ==================== CLIQUES NAS OPÇÕES (MANTIDO 100%) ====================
if (abaOp) {
    abaOp.addEventListener("click", (event) => {
        if (event.target.tagName !== "BUTTON" || event.target === btnVoltar) return;
        
        const liId = event.target.closest("li").id;

        if (liId === "cont-l1") {
            escolhaTreinamento = event.target.getAttribute("data-opcao");
            document.getElementById("cont-l1").style.display = "none";

            if (treinamentos[escolhaTreinamento].setores) {
                const container = document.getElementById("l2-st");
                container.innerHTML = "";
                Object.keys(treinamentos[escolhaTreinamento].setores).forEach(setor => {
                    const btn = document.createElement("button");
                    btn.className = "btn-op";
                    btn.textContent = setor;
                    btn.setAttribute("data-setor", setor);
                    container.appendChild(btn);
                });
                document.getElementById("cont-l2").style.display = "flex";
            } else {
                mostrarSoftwares(treinamentos[escolhaTreinamento].softwares);
            }
        } 
        else if (liId === "cont-l2") {
            escolhaSetor = event.target.getAttribute("data-setor");
            document.getElementById("cont-l2").style.display = "none";
            document.getElementById("cont-l4").style.display = "flex"; 
        }
        else if (liId === "cont-l3") {
            escolhaSoftware = event.target.textContent.trim();
            let caminhoTrilha = `${escolhaTreinamento.toUpperCase()}${escolhaSetor ? ' > ' + escolhaSetor.toUpperCase() : ''} > ${escolhaSoftware.toUpperCase()}`;
            
            if (escolhaTreinamento === "manual") {
                window.location.href = `manual-leitura.html?software=${encodeURIComponent(escolhaSoftware)}&caminho=${encodeURIComponent(caminhoTrilha)}`;
            } else {
                window.location.href = `videos-treinamento.html?software=${encodeURIComponent(escolhaSoftware)}&caminho=${encodeURIComponent(caminhoTrilha)}`;
            }
        }
        atualizarVisibilidadeBotaoVoltar();
    });
}

function mostrarSoftwares(lista) {
  const container = document.getElementById("l3-sist");
  container.innerHTML = "";
  lista.forEach(soft => {
    const btn = document.createElement("button");
    btn.className = "btn-op";
    btn.textContent = soft;
    container.appendChild(btn);
  });
  document.getElementById("cont-l3").style.display = "flex";
  atualizarVisibilidadeBotaoVoltar();
}

if (btnValidarSenha) {
    btnValidarSenha.addEventListener('click', () => {
        const digitada = senhaInput.value.trim();
        const correta = treinamentos[escolhaTreinamento].setores[escolhaSetor].senha;
        if (digitada === correta) {
            document.getElementById("cont-l4").style.display = "none";
            mostrarSoftwares(treinamentos[escolhaTreinamento].setores[escolhaSetor].softwares);
        } else {
            alert("Senha incorreta!");
        }
    });
}

// ==================== MENU E TEMA (MANTIDO 100%) ====================
if (btnM) {
    btnM.addEventListener('click', () => {
        menuAb.classList.toggle("menuAberto");
        elemTextN.forEach(texto => texto.classList.toggle("elem-text-menu"));
        const btnBar = document.querySelector(".bar"), btnClouse = document.querySelector(".close");
        if(menuAb.classList.contains("menuAberto")){
            btnBar.style.display = "none"; btnClouse.style.display = "flex"; 
        } else {
            btnBar.style.display = "flex"; btnClouse.style.display = "none";
        }
    });
}

const btnTema = document.getElementById("barra-tt");
if (btnTema) {
    btnTema.addEventListener('click', () => {
        document.body.classList.toggle("tema-claro");
    });
}

// ==================== PARTÍCULAS (MANTIDO 100%) ====================
function criarParticulas() {
  let container = document.getElementById('particles');
  if (!container) {
    container = document.createElement('div');
    container.id = 'particles';
    container.className = 'particles-container';
    const main = document.querySelector('main');
    if (main) main.appendChild(container); else return;
  }
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 20 + 5;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    container.appendChild(particle);
  }
}
window.onload = () => {
    criarParticulas();
    atualizarVisibilidadeBotaoVoltar();
};
