// ==================== MENU LATERAL (MANTIDO) ====================
const btnM = document.getElementById("btn-menu");
const menuAb = document.getElementById("menu");
const elemTextN = document.querySelectorAll(".textMenu");

btnM.addEventListener('click', () => {
  menuAb.classList.toggle("menuAberto");
  elemTextN.forEach(texto => {
    texto.classList.toggle("elem-text-menu");
  });
    
  const btnBar = document.querySelector(".bar");
  const btnClouse = document.querySelector(".close");
    
  if(menuAb.classList.contains("menuAberto")){
    btnBar.style.display = "none";
    btnClouse.style.display = "flex"; 
  } else{
    btnBar.style.display = "flex";
    btnClouse.style.display = "none";
  }
});

// ==================== ANIMAÇÃO DE PARTÍCULAS (MANTIDO) ====================
function criarParticulas() {
  let container = document.getElementById('particles');
  if (!container) {
    container = document.createElement('div');
    container.id = 'particles';
    container.className = 'particles-container';
    const main = document.querySelector('main');
    if (main) {
      main.appendChild(container);
    } else {
      return;
    }
  }
  
  const numParticles = 30;
  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 25 + 5;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    const duration = Math.random() * 15 + 10;
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = Math.random() * 10 + 's';
    container.appendChild(particle);
  }
}
window.addEventListener('load', criarParticulas);

// ==================== LÓGICA DAS ABAS E BOTÃO VOLTAR (MANTIDO) ====================
const mensagemErro = document.getElementById("mensagemErro");
const btnAbaOp = document.getElementById("btn-treinamentos");
const sectAbaOp = document.getElementById("sect-aba-op");

if (btnAbaOp) {
    btnAbaOp.addEventListener('click', () => {
        sectAbaOp.classList.add("ativo-aba-op");
    });
}

if (sectAbaOp) {
    sectAbaOp.addEventListener('click', (event) => {
        if (event.target === sectAbaOp){
            sectAbaOp.classList.remove("ativo-aba-op");
        }
    });
}

function atualizarVisibilidadeBotaoVoltar() {
  const btnVoltar = document.getElementById("btn-voltar-modal");
  const l1 = document.getElementById("cont-l1");
  if (btnVoltar) {
    if (l1 && getComputedStyle(l1).display !== "none") {
      btnVoltar.style.display = "none";
    } else {
      btnVoltar.style.display = "flex";
    }
  }
}

const btnVoltar = document.getElementById("btn-voltar-modal");
if (btnVoltar) {
  btnVoltar.addEventListener('click', () => {
    const l1 = document.getElementById("cont-l1"), l2 = document.getElementById("cont-l2");
    const l3 = document.getElementById("cont-l3"), l4 = document.getElementById("cont-l4");

    if (getComputedStyle(l3).display !== "none") {
      l3.style.display = "none";
      if (escolhaSetor) { l4.style.display = "flex"; } 
      else { l1.style.display = "flex"; }
    } 
    else if (getComputedStyle(l4).display !== "none") {
      l4.style.display = "none";
      l2.style.display = "flex";
    } 
    else if (getComputedStyle(l2).display !== "none") {
      l2.style.display = "none";
      l1.style.display = "flex";
    }
    atualizarVisibilidadeBotaoVoltar();
  });
}

// ==================== BANCO DE DADOS E NAVEGAÇÃO (MANTIDO) ====================
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

let escolhaTreinamento = null, escolhaSetor = null, escolhaSoftware = null;

const abaOp = document.getElementById("aba-op");
abaOp.addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") return;
  const liId = event.target.closest("li").id;

  if (liId === "cont-l1") {
    escolhaTreinamento = event.target.getAttribute("data-opcao");
    document.getElementById("cont-l1").style.display = "none";
    atualizarVisibilidadeBotaoVoltar();

    if (treinamentos[escolhaTreinamento].setores) {
      const container = document.getElementById("l2-st");
      container.innerHTML = "";
      Object.keys(treinamentos[escolhaTreinamento].setores).forEach(setor => {
        const btn = document.createElement("button");
        btn.textContent = setor;
        btn.setAttribute("data-setor", setor);
        container.appendChild(btn);
      });
      document.getElementById("cont-l2").style.display = "block";
    } else {
      mostrarSoftwares(treinamentos[escolhaTreinamento].softwares);
    }
  }

  else if (liId === "cont-l2") {
    escolhaSetor = event.target.getAttribute("data-setor");
    document.getElementById("cont-l2").style.display = "none";
    atualizarVisibilidadeBotaoVoltar();
    document.getElementById("cont-l4").style.display = "flex"; 
  }

  else if (liId === "cont-l4") {
    const senhaDigitada = document.getElementById("senhaInput").value.trim();
    const senhaCorreta = treinamentos[escolhaTreinamento].setores[escolhaSetor].senha;
    if (senhaDigitada === senhaCorreta) {
      document.getElementById("cont-l4").style.display = "none";
      atualizarVisibilidadeBotaoVoltar();
      mostrarSoftwares(treinamentos[escolhaTreinamento].setores[escolhaSetor].softwares);
    } else {
      alert("Senha incorreta!");
    }
  }

  else if (liId === "cont-l3") {
    escolhaSoftware = event.target.textContent.trim();
    let caminhoTrilha = `${escolhaTreinamento.toUpperCase()}`;
    if(escolhaSetor) { caminhoTrilha += ` > ${escolhaSetor.toUpperCase()}`; }
    caminhoTrilha += ` > ${escolhaSoftware.toUpperCase()}`;

    // REDIRECIONAMENTO CORRETO
    if (escolhaTreinamento === "manual") {
        window.location.href = `manual-leitura.html?software=${encodeURIComponent(escolhaSoftware)}&caminho=${encodeURIComponent(caminhoTrilha)}`;
    } else {
        window.location.href = `videos-treinamento.html?software=${encodeURIComponent(escolhaSoftware)}&caminho=${encodeURIComponent(caminhoTrilha)}`;
    }
  }
});

function mostrarSoftwares(lista) {
  const container = document.getElementById("l3-sist");
  container.innerHTML = "";
  lista.forEach(soft => {
    const btn = document.createElement("button");
    btn.textContent = soft;
    container.appendChild(btn);
  });
  document.getElementById("cont-l3").style.display = "block";
  atualizarVisibilidadeBotaoVoltar();
}
