// =============================================================================
// MENU LATERAL
// Gerencia a abertura e o fechamento do menu lateral e troca dos ícones.
// =============================================================================
const btnM = document.getElementById("btn-menu");
const menuAb = document.getElementById("menu");
const elemTextN = document.querySelectorAll(".textMenu");

if (btnM) {
    btnM.addEventListener('click', () => {
        menuAb.classList.toggle("menuAberto");
        elemTextN.forEach(texto => {
            texto.classList.toggle("elem-text-menu");
        });

        const btnBar = document.querySelector(".bar");
        const btnClouse = document.querySelector(".close");

        if (menuAb.classList.contains("menuAberto")) {
            btnBar.style.display = "none";
            btnClouse.style.display = "flex";
        } else {
            btnBar.style.display = "flex";
            btnClouse.style.display = "none";
        }
    });
}

// =============================================================================
// ANIMAÇÃO DE PARTÍCULAS
// Cria o efeito visual de fundo no container 'particles'.
// =============================================================================
function criarParticulas() {
    let container = document.getElementById('particles');
    if (!container) {
        container = document.createElement('div');
        container.id = 'particles';
        container.className = 'particles-container';
        const main = document.querySelector('main');
        if (main) { main.appendChild(container); } else { return; }
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

// =============================================================================
// BANCO DE DADOS E VARIÁVEIS DE ESTADO
// Contém os softwares, senhas e armazena o progresso do usuário no modal.
// =============================================================================
const treinamentos = {
    interno: {
        setores: {
            RH: { senha: "rh12345", softwares: ["Word RH", "Excel RH", "Folha de Pagamento", "Recrutamento", "Treinamento", "Cultura Imp", "Benefícios", "Admissão", "Feedback", "Carreira"] },
            TI: { senha: "ti12345", softwares: ["Segurança", "Suporte", "Redes", "Hardware", "RM Totvs", "Cloud", "Linux", "Banco de Dados", "Backup", "LGPD"] }
        }
    },
    tutorial: { softwares: ["Portal Imp", "Bater Ponto", "Email Corporativo", "Chamados TI", "Férias", "Crachá", "Uso da Copa", "Segurança Predial", "Normas Internas", "Sistemas Gerais"] },
    externo: { softwares: ["Sistema Financeiro", "Plataforma EAD", "Portal do Cliente", "CRM Vendas", "Logística Externa", "Suporte Fornecedor", "App Externo", "Analytics", "Nuvem Pro", "Backup Externo"] },
    manual: { softwares: ["Manual de Conduta", "Manual de Segurança", "Passo a Passo: Primeiro Dia", "Passo a Passo: Benefícios", "Manual TI", "Manual Financeiro", "Guia de Férias", "Guia de Reembolso", "Manual de Processos", "Diretrizes Gerais"] }
};

let escolhaTreinamento = null;
let escolhaSetor = null;
let escolhaSoftware = null;

const mensagemErro = document.getElementById("mensagemErro");
const btnVoltar = document.getElementById("btn-voltar-modal");

// =============================================================================
// CONTROLE DO BOTÃO VOLTAR
// Lógica para retroceder entre as telas do modal.
// =============================================================================
function atualizarVisibilidadeBotaoVoltar() {
    const l1 = document.getElementById("cont-l1");
    if (btnVoltar && l1) {
        btnVoltar.style.display = (getComputedStyle(l1).display !== "none") ? "none" : "flex";
    }
}

if (btnVoltar) {
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
        atualizarVisibilidadeBotaoVoltar();
    });
}

// =============================================================================
// NAVEGAÇÃO DO MODAL (CLIQUES NA LISTA)
// Gerencia a transição entre telas, validação de senha e redirecionamento final.
// =============================================================================
const abaOp = document.getElementById("aba-op");
if (abaOp) {
    abaOp.addEventListener("click", (event) => {
        if (event.target.tagName !== "BUTTON") return;
        const liId = event.target.closest("li").id;

        // TELA 1: Escolha do Treinamento
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
        // TELA 2: Escolha do Setor
        else if (liId === "cont-l2") {
            escolhaSetor = event.target.getAttribute("data-setor");
            document.getElementById("cont-l2").style.display = "none";
            document.getElementById("cont-l4").style.display = "flex";
        } 
        // TELA 4: Validação de Senha
        else if (liId === "cont-l4") {
            if (event.target.id === "btnValidarSenha" || event.target.id === "btn_op_p") {
                const senhaDigitada = document.getElementById("senhaInput").value.trim();
                if (senhaDigitada === "") {
                    if (mensagemErro) { mensagemErro.textContent = "Por favor, digite a senha."; mensagemErro.style.display = "block"; }
                    return;
                }
                const senhaCorreta = treinamentos[escolhaTreinamento].setores[escolhaSetor].senha;
                if (senhaDigitada === senhaCorreta) {
                    document.getElementById("cont-l4").style.display = "none";
                    mostrarSoftwares(treinamentos[escolhaTreinamento].setores[escolhaSetor].softwares);
                    if (mensagemErro) mensagemErro.style.display = "none";
                } else {
                    if (mensagemErro) { mensagemErro.textContent = "Senha incorreta. Tente novamente."; mensagemErro.style.display = "block"; }
                    document.getElementById("senhaInput").value = "";
                }
            }
        } 
        // TELA 3: Seleção do Software e Redirecionamento
        else if (liId === "cont-l3") {
            escolhaSoftware = event.target.textContent.trim();
            let caminhoTrilha = `${escolhaTreinamento.toUpperCase()}`;
            if (escolhaSetor) { caminhoTrilha += ` > ${escolhaSetor.toUpperCase()}`; }
            caminhoTrilha += ` > ${escolhaSoftware.toUpperCase()}`;
            window.location.href = `videos-treinamento.html?software=${encodeURIComponent(escolhaSoftware)}&caminho=${encodeURIComponent(caminhoTrilha)}`;
        }
        atualizarVisibilidadeBotaoVoltar();
    });
}

function mostrarSoftwares(lista) {
    const container = document.getElementById("l3-sist");
    if (!container) return;
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

// =============================================================================
// ABA DE TREINAMENTOS (ABRIR/FECHAR MODAL)
// =============================================================================
const btnAbaOp = document.getElementById("btn-treinamentos");
const sectAbaOp = document.getElementById("sect-aba-op");

if (btnAbaOp && sectAbaOp) {
    btnAbaOp.addEventListener('click', () => { sectAbaOp.classList.add("ativo-aba-op"); });
    sectAbaOp.addEventListener('click', (event) => {
        if (event.target === sectAbaOp) { sectAbaOp.classList.remove("ativo-aba-op"); }
    });
}

// Iniciar tudo ao carregar a página
window.addEventListener('load', () => {
    criarParticulas();
    atualizarVisibilidadeBotaoVoltar();
});
