// =============================================================================
// SELETORES GERAIS
// Pega os elementos do HTML pelos IDs para permitir a interação via JS.
// =============================================================================
const btnM = document.getElementById("btn-menu");
const menuAb = document.getElementById("menu");
const elemTextN = document.querySelectorAll(".textMenu");
const mensagemErro = document.getElementById("mensagemErro"); 
const btnVoltar = document.getElementById("btn-voltar-modal");
const abaOp = document.getElementById("aba-op");

// =============================================================================
// BANCO DE DADOS DE TREINAMENTOS
// Estrutura de objeto contendo categorias, setores, senhas e listas de softwares.
// =============================================================================
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

// Variáveis de estado para rastrear a navegação do usuário
let escolhaTreinamento = null;
let escolhaSetor = null;
let escolhaSoftware = null;

// =============================================================================
// FUNCIONALIDADE: MENU LATERAL
// Gerencia a abertura/fechamento do menu e a troca dos ícones (hambúrguer/fechar).
// =============================================================================
btnM.addEventListener('click', () => {
    menuAb.classList.toggle("menuAberto");
    elemTextN.forEach(texto => {
        texto.classList.toggle("elem-text-menu");
    });
    
    const btnBar = document.querySelector(".bar");
    const btnClouse = document.querySelector(".close");

    if(menuAb.classList.contains("menuAberto")){
        if(btnBar) btnBar.style.display = "none";
        if(btnClouse) btnClouse.style.display = "flex"; 
    } else {
        if(btnBar) btnBar.style.display = "flex";
        if(btnClouse) btnClouse.style.display = "none";
    }
});

// =============================================================================
// FUNCIONALIDADE: CONTROLE DO BOTÃO VOLTAR
// Verifica em qual tela o usuário está para decidir se mostra ou esconde o botão.
// =============================================================================
function atualizarBotaoVoltar() {
    const l1 = document.getElementById("cont-l1");
    if (btnVoltar && l1) {
        // O botão "Voltar" desaparece se a tela inicial (cont-l1) estiver visível
        btnVoltar.style.display = (getComputedStyle(l1).display !== "none") ? "none" : "flex";
    }
}

// Lógica de retorno entre os níveis do modal (L1, L2, L3, L4)
btnVoltar.addEventListener('click', () => {
    const l1 = document.getElementById("cont-l1");
    const l2 = document.getElementById("cont-l2");
    const l3 = document.getElementById("cont-l3");
    const l4 = document.getElementById("cont-l4");

    if (getComputedStyle(l3).display !== "none") {
        l3.style.display = "none";
        if (escolhaSetor) { l4.style.display = "flex"; } else { l1.style.display = "flex"; }
    } else if (getComputedStyle(l4).display !== "none") {
        l4.style.display = "none";
        l2.style.display = "flex";
    } else if (getComputedStyle(l2).display !== "none") {
        l2.style.display = "none";
        l1.style.display = "flex";
    }
    atualizarBotaoVoltar();
});

// =============================================================================
// FUNCIONALIDADE: GESTÃO DE TELAS E CLIQUES
// Filtra os cliques nos botões e gerencia a transição entre as etapas de escolha.
// =============================================================================
abaOp.addEventListener("click", (event) => {
    if (event.target.tagName !== "BUTTON") return;
    const liId = event.target.closest("li").id;

    // Navegação: Tela 1 (Tipo de Treinamento)
    if (liId === "cont-l1") {
        escolhaTreinamento = event.target.getAttribute("data-opcao");
        document.getElementById("cont-l1").style.display = "none";
        
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
    // Navegação: Tela 2 (Escolha do Setor)
    else if (liId === "cont-l2") {
        escolhaSetor = event.target.getAttribute("data-setor");
        document.getElementById("cont-l2").style.display = "none";
        document.getElementById("cont-l4").style.display = "flex"; 
    } 
    // Navegação: Tela 4 (Validação de Senha)
    else if (liId === "cont-l4") {
        const senhaDigitada = document.getElementById("senhaInput").value.trim();
        const senhaCorreta = treinamentos[escolhaTreinamento].setores[escolhaSetor].senha;
        if (senhaDigitada === senhaCorreta) {
            document.getElementById("cont-l4").style.display = "none";
            mostrarSoftwares(treinamentos[escolhaTreinamento].setores[escolhaSetor].softwares);
            if (mensagemErro) mensagemErro.style.display = "none";
        } else {
            if (mensagemErro) mensagemErro.style.display = "block";
        }
    } 
    // Navegação: Tela 3 (Seleção final do Software e Redirecionamento)
    else if (liId === "cont-l3") {
        escolhaSoftware = event.target.textContent.trim();
        // Redireciona enviando o nome do software via parâmetro na URL
        window.location.href = `videos-treinamento.html?software=${encodeURIComponent(escolhaSoftware)}`;
    }
    atualizarBotaoVoltar();
});

// Gera dinamicamente os botões de softwares com base na lista do treinamento/setor
function mostrarSoftwares(lista) {
    const container = document.getElementById("l3-sist");
    if (!container) return;
    container.innerHTML = "";
    lista.forEach(soft => {
        const btn = document.createElement("button");
        btn.textContent = soft;
        container.appendChild(btn);
    });
    document.getElementById("cont-l3").style.display = "block";
    atualizarBotaoVoltar();
}

// =============================================================================
// FUNCIONALIDADE: ANIMAÇÃO DE PARTÍCULAS
// Cria elementos visuais aleatórios no fundo do container #particles.
// =============================================================================
function criarParticulas() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        container.appendChild(particle);
    }
}

// Inicialização das funções automáticas ao carregar a janela
window.onload = () => {
    criarParticulas();
    atualizarBotaoVoltar();
};
