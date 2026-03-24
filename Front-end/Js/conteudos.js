// Menu lateral
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

// ==================== ANIMAÇÃO DE PARTÍCULAS ====================
function criarParticulas() {
  // Criar container se não existir
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

// Iniciar animação quando a página carregar
window.addEventListener('load', criarParticulas);
    atualizarVisibilidadeBotaoVoltar(); 

// Variável para mensagem de erro
const mensagemErro = document.getElementById("mensagemErro");

// Aba de treinamentos
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

// --- BOTÃO VOLTAR (LÓGICA CORRIGIDA PARA NÃO TRAVAR) ---
const btnVoltar = document.getElementById("btn-voltar-modal");

// --- Controle de visibilidade do botão voltar ---
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

if (btnVoltar) {
  btnVoltar.addEventListener('click', () => {
    const l1 = document.getElementById("cont-l1");
    const l2 = document.getElementById("cont-l2");
    const l3 = document.getElementById("cont-l3");
    const l4 = document.getElementById("cont-l4");

    // Verifica qual tela está visível no momento para saber para onde voltar
    if (getComputedStyle(l3).display !== "none") {
      l3.style.display = "none";
      // Se tiver setor (Interno), volta para Senha (l4), senão volta para Início (l1)
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

// --- REDIRECIONAMENTO COM CAMINHO (BREADCRUMB) ---
// Localize onde você trata o clique no botão do software (cont-l3) e use isto:
else if (liId === "cont-l3") {
    escolhaSoftware = event.target.textContent.trim();
    
    // Monta o texto do caminho: Ex: INTERNO > TI > SUPORTE
    let caminhoCompleto = `${escolhaTreinamento.toUpperCase()}`;
    if(escolhaSetor) { caminhoCompleto += ` > ${escolhaSetor.toUpperCase()}`; }
    caminhoCompleto += ` > ${escolhaSoftware.toUpperCase()}`;

    // Redireciona para o arquivo de vídeo passando os dados na URL
    window.location.href = `video.html?software=${encodeURIComponent(escolhaSoftware)}&caminho=${encodeURIComponent(caminhoCompleto)}`;
}

// JSON com regras de treinamentos
const treinamentos = {
    interno: {
        setores: {
            RH: { 
                senha: "rh12345", 
                softwares: ["Word RH", "Excel RH", "Folha de Pagamento", "Recrutamento", "Treinamento", "Cultura Imp", "Benefícios", "Admissão", "Feedback", "Carreira"] 
            },
            TI: { 
                senha: "ti12345", 
                softwares: ["Segurança", "Suporte", "Redes", "Hardware", "RM Totvs", "Cloud", "Linux", "Banco de Dados", "Backup", "LGPD"] 
            }
        }
    },
    tutorial: { 
        softwares: ["Portal Imp", "Bater Ponto", "Email Corporativo", "Chamados TI", "Férias", "Crachá", "Uso da Copa", "Segurança Predial", "Normas Internas", "Sistemas Gerais"] 
    },
    externo: { 
        softwares: ["Sistema Financeiro", "Plataforma EAD", "Portal do Cliente", "CRM Vendas", "Logística Externa", "Suporte Fornecedor", "App Externo", "Analytics", "Nuvem Pro", "Backup Externo"] 
    },
    manual: { 
        softwares: ["Manual de Conduta", "Manual de Segurança", "Passo a Passo: Primeiro Dia", "Passo a Passo: Benefícios", "Manual TI", "Manual Financeiro", "Guia de Férias", "Guia de Reembolso", "Manual de Processos", "Diretrizes Gerais"] 
    }
};

let escolhaTreinamento = null;
let escolhaSetor = null;
let escolhaSoftware = null;

// Escutador único no pai UL
const abaOp = document.getElementById("aba-op");
abaOp.addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") return;
  const liId = event.target.closest("li").id;

  if (liId === "cont-l1") {
    // Etapa 1: treinamento
    escolhaTreinamento = event.target.getAttribute("data-opcao");
    document.getElementById("cont-l1").style.display = "none";
    atualizarVisibilidadeBotaoVoltar();

    if (treinamentos[escolhaTreinamento].setores) {
      // Criar botões de setores dinamicamente
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
      // Treinamento sem setor → vai direto para softwares
      mostrarSoftwares(treinamentos[escolhaTreinamento].softwares);
    }
  }

  else if (liId === "cont-l2") {
    // Etapa 2: setor
    escolhaSetor = event.target.getAttribute("data-setor");
    document.getElementById("cont-l2").style.display = "none";
    
    atualizarVisibilidadeBotaoVoltar();
    
    document.getElementById("cont-l4").style.display = "flex"; // senha
  }

  else if (liId === "cont-l4") {
    // Etapa 3: senha
    if (event.target.id === "btnValidarSenha" || event.target.id === "btn_op_p") {
      const senhaDigitada = document.getElementById("senhaInput").value.trim();
      
      // VALIDAÇÃO DE CAMPO VAZIO
      if (senhaDigitada === "") {
        if (mensagemErro) {
          mensagemErro.textContent = "Por favor, digite a senha.";
          mensagemErro.style.display = "block";
        }
        return;
      }
      
      const senhaCorreta = treinamentos[escolhaTreinamento].setores[escolhaSetor].senha;

      if (senhaDigitada === senhaCorreta) {
        document.getElementById("cont-l4").style.display = "none";
        atualizarVisibilidadeBotaoVoltar();
        
        mostrarSoftwares(treinamentos[escolhaTreinamento].setores[escolhaSetor].softwares);
        if (mensagemErro) mensagemErro.style.display = "none";
      } else {
        // SENHA INCORRETA
        if (mensagemErro) {
          mensagemErro.textContent = "Senha incorreta para o setor " + escolhaSetor + ". Tente novamente.";
          mensagemErro.style.display = "block";
        }
        document.getElementById("senhaInput").value = "";
      }
    }
  }

  else if (liId === "cont-l3") {
    escolhaSoftware = event.target.textContent.trim();
    
    // Monta o caminho para exibir na próxima página
    let caminhoTrilha = `${escolhaTreinamento.toUpperCase()}`;
    if(escolhaSetor) { 
        caminhoTrilha += ` > ${escolhaSetor.toUpperCase()}`; 
    }
    caminhoTrilha += ` > ${escolhaSoftware.toUpperCase()}`;

    // REDIRECIONAMENTO PARA O ARQUIVO CORRETO
    window.location.href = `videos-treinamento.html?software=${encodeURIComponent(escolhaSoftware)}&caminho=${encodeURIComponent(caminhoTrilha)}`;
}

});

// Função para criar botões de softwares dinamicamente
function mostrarSoftwares(lista) {
  const container = document.getElementById("l3-sist");

  container.innerHTML = "";
  lista.forEach(soft => {
    const btn = document.createElement("button");
      
    btn.textContent = soft;
    btn.setAttribute("data-sist", soft);
    container.appendChild(btn);
  });

  document.getElementById("cont-l3").style.display = "block";
  atualizarVisibilidadeBotaoVoltar();
}
const mensagemErro = document.getElementById("mensagemErro");

// Aba de treinamentos
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

// --- BOTÃO VOLTAR (LÓGICA CORRIGIDA PARA NÃO TRAVAR) ---
const btnVoltar = document.getElementById("btn-voltar-modal");
if (btnVoltar) {
  btnVoltar.addEventListener('click', () => {
    const l1 = document.getElementById("cont-l1");
    const l2 = document.getElementById("cont-l2");
    const l3 = document.getElementById("cont-l3");
    const l4 = document.getElementById("cont-l4");

    // Verifica qual tela está visível no momento para saber para onde voltar
    if (getComputedStyle(l3).display !== "none") {
      l3.style.display = "none";
      // Se tiver setor (Interno), volta para Senha (l4), senão volta para Início (l1)
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
  });
}

// --- REDIRECIONAMENTO COM CAMINHO (BREADCRUMB) ---
// Localize onde você trata o clique no botão do software (cont-l3) e use isto:
else if (liId === "cont-l3") {
    escolhaSoftware = event.target.textContent.trim();
    
    // Monta o texto do caminho: Ex: INTERNO > TI > SUPORTE
    let caminhoCompleto = `${escolhaTreinamento.toUpperCase()}`;
    if(escolhaSetor) { caminhoCompleto += ` > ${escolhaSetor.toUpperCase()}`; }
    caminhoCompleto += ` > ${escolhaSoftware.toUpperCase()}`;

    // Redireciona para o arquivo de vídeo passando os dados na URL
    window.location.href = `video.html?software=${encodeURIComponent(escolhaSoftware)}&caminho=${encodeURIComponent(caminhoCompleto)}`;
}

// JSON com regras de treinamentos
const treinamentos = {
    interno: {
        setores: {
            RH: { 
                senha: "rh12345", 
                softwares: ["Word RH", "Excel RH", "Folha de Pagamento", "Recrutamento", "Treinamento", "Cultura Imp", "Benefícios", "Admissão", "Feedback", "Carreira"] 
            },
            TI: { 
                senha: "ti12345", 
                softwares: ["Segurança", "Suporte", "Redes", "Hardware", "RM Totvs", "Cloud", "Linux", "Banco de Dados", "Backup", "LGPD"] 
            }
        }
    },
    tutorial: { 
        softwares: ["Portal Imp", "Bater Ponto", "Email Corporativo", "Chamados TI", "Férias", "Crachá", "Uso da Copa", "Segurança Predial", "Normas Internas", "Sistemas Gerais"] 
    },
    externo: { 
        softwares: ["Sistema Financeiro", "Plataforma EAD", "Portal do Cliente", "CRM Vendas", "Logística Externa", "Suporte Fornecedor", "App Externo", "Analytics", "Nuvem Pro", "Backup Externo"] 
    },
    manual: { 
        softwares: ["Manual de Conduta", "Manual de Segurança", "Passo a Passo: Primeiro Dia", "Passo a Passo: Benefícios", "Manual TI", "Manual Financeiro", "Guia de Férias", "Guia de Reembolso", "Manual de Processos", "Diretrizes Gerais"] 
    }
};

let escolhaTreinamento = null;
let escolhaSetor = null;
let escolhaSoftware = null;

// Escutador único no pai UL
const abaOp = document.getElementById("aba-op");
abaOp.addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") return;
  const liId = event.target.closest("li").id;

  if (liId === "cont-l1") {
    // Etapa 1: treinamento
    escolhaTreinamento = event.target.getAttribute("data-opcao");
    document.getElementById("cont-l1").style.display = "none";

    if (treinamentos[escolhaTreinamento].setores) {
      // Criar botões de setores dinamicamente
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
      // Treinamento sem setor → vai direto para softwares
      mostrarSoftwares(treinamentos[escolhaTreinamento].softwares);
    }
  }

  else if (liId === "cont-l2") {
    // Etapa 2: setor
    escolhaSetor = event.target.getAttribute("data-setor");
    document.getElementById("cont-l2").style.display = "none";
    document.getElementById("cont-l4").style.display = "block"; // senha
  }

  else if (liId === "cont-l4") {
    // Etapa 3: senha
    if (event.target.id === "btnValidarSenha" || event.target.id === "btn_op_p") {
      const senhaDigitada = document.getElementById("senhaInput").value.trim();
      
      // VALIDAÇÃO DE CAMPO VAZIO
      if (senhaDigitada === "") {
        if (mensagemErro) {
          mensagemErro.textContent = "Por favor, digite a senha.";
          mensagemErro.style.display = "block";
        }
        return;
      }
      
      const senhaCorreta = treinamentos[escolhaTreinamento].setores[escolhaSetor].senha;

      if (senhaDigitada === senhaCorreta) {
        document.getElementById("cont-l4").style.display = "none";
        mostrarSoftwares(treinamentos[escolhaTreinamento].setores[escolhaSetor].softwares);
        if (mensagemErro) mensagemErro.style.display = "none";
      } else {
        // SENHA INCORRETA
        if (mensagemErro) {
          mensagemErro.textContent = "Senha incorreta para o setor " + escolhaSetor + ". Tente novamente.";
          mensagemErro.style.display = "block";
        }
        document.getElementById("senhaInput").value = "";
      }
    }
  }

  else if (liId === "cont-l3") {
    escolhaSoftware = event.target.textContent.trim();
    
    // Monta o caminho para exibir na próxima página
    let caminhoTrilha = `${escolhaTreinamento.toUpperCase()}`;
    if(escolhaSetor) { 
        caminhoTrilha += ` > ${escolhaSetor.toUpperCase()}`; 
    }
    caminhoTrilha += ` > ${escolhaSoftware.toUpperCase()}`;

    // REDIRECIONAMENTO PARA O ARQUIVO CORRETO
    window.location.href = `videos-treinamento.html?software=${encodeURIComponent(escolhaSoftware)}&caminho=${encodeURIComponent(caminhoTrilha)}`;
}

});

// Função para criar botões de softwares dinamicamente
function mostrarSoftwares(lista) {
  const container = document.getElementById("l3-sist");

  container.innerHTML = "";
  lista.forEach(soft => {
    const btn = document.createElement("button");
      
    btn.textContent = soft;
    btn.setAttribute("data-sist", soft);
    container.appendChild(btn);
  });

  document.getElementById("cont-l3").style.display = "block";
}
