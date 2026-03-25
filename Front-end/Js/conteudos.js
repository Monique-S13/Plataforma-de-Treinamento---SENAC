// ==================== BANCO DE DADOS E ESTADOS (ORIGINAL) ====================
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

const btnM = document.getElementById("btn-menu");
const menuAb = document.getElementById("menu");
const elemTextN = document.querySelectorAll(".textMenu");
const btnAbaOp = document.getElementById("btn-treinamentos");
const sectAbaOp = document.getElementById("sect-aba-op");
const abaOp = document.getElementById("aba-op");
const btnVoltar = document.getElementById("btn-voltar-modal");

// --- CORREÇÃO 1: ABRIR O MODAL ---
if (btnAbaOp) {
    btnAbaOp.addEventListener('click', (e) => {
        e.stopPropagation(); // Impede o clique de fechar o modal na hora
        sectAbaOp.classList.add("ativo-aba-op");
        // Garante que comece na etapa 1
        document.getElementById("cont-l1").style.display = "flex";
        document.getElementById("cont-l2").style.display = "none";
        document.getElementById("cont-l3").style.display = "none";
        document.getElementById("cont-l4").style.display = "none";
    });
}

// --- CORREÇÃO 2: FECHAR O MODAL (APENAS NO FUNDO) ---
if (sectAbaOp) {
    sectAbaOp.addEventListener('click', (event) => {
        // Só fecha se clicar no fundo, não no conteúdo branco/azul
        if (event.target === sectAbaOp){
            sectAbaOp.classList.remove("ativo-aba-op");
        }
    });
}

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
  btnVoltar.addEventListener('click', () => {
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
        else if (liId === "cont-l4") {
            const senhaDigitada = document.getElementById("senhaInput").value.trim();
            const senhaCorreta = treinamentos[escolhaTreinamento].setores[escolhaSetor].senha;
            if (senhaDigitada === senhaCorreta) {
                document.getElementById("cont-l4").style.display = "none";
                mostrarSoftwares(treinamentos[escolhaTreinamento].setores[escolhaSetor].softwares);
            } else {
                alert("Senha incorreta!");
            }
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

// --- MENU E TEMA ---
if (btnM) {
    btnM.addEventListener('click', () => {
        menuAb.classList.toggle("menuAberto");
        elemTextN.forEach(texto => texto.classList.toggle("elem-text-menu"));
    });
}

const btnTema = document.getElementById("barra-tt");
if (btnTema) {
    btnTema.addEventListener('click', () => {
        document.body.classList.toggle("tema-claro");
    });
}

// --- PARTÍCULAS (ORIGINAL) ---
function criarParticulas() {
  let container = document.getElementById('particles');
  if (!container) {
    container = document.createElement('div');
    container.id = 'particles';
    container.className = 'particles-container';
    document.querySelector('main').appendChild(container);
  }
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
    container.appendChild(particle);
  }
}
window.onload = criarParticulas;
