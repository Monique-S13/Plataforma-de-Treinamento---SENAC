// =============================================================================
// 1. BANCO DE DADOS E ESTADOS (SEU NOVO BANCO COMPLETO)
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

// =============================================================================
// 2. SELETORES DO DOM
// =============================================================================
const btnM = document.getElementById("btn-menu");
const menuAb = document.getElementById("menu");
const elemTextN = document.querySelectorAll(".textMenu");
const btnAbaOp = document.getElementById("btn-treinamentos");
const sectAbaOp = document.getElementById("sect-aba-op");
const abaOp = document.getElementById("aba-op");
const btnVoltar = document.getElementById("btn-voltar-modal");
const senhaInput = document.getElementById("senhaInput");
const btnValidarSenha = document.getElementById("btnValidarSenha");
const mensagemErro = document.getElementById("mensagemErro");

// =============================================================================
// 3. MENU LATERAL E TEMA
// =============================================================================
if (btnM) {
    btnM.addEventListener('click', () => {
        menuAb.classList.toggle("menuAberto");
        elemTextN.forEach(texto => texto.classList.toggle("elem-text-menu"));
        const btnBar = document.querySelector(".bar"), btnClouse = document.querySelector(".close");
        if (menuAb.classList.contains("menuAberto")) {
            if(btnBar) btnBar.style.display = "none";
            if(btnClouse) btnClouse.style.display = "flex";
        } else {
            if(btnBar) btnBar.style.display = "flex";
            if(btnClouse) btnClouse.style.display = "none";
        }
    });
}

const btnTema = document.getElementById("barra-tt");
if (btnTema) {
    btnTema.addEventListener('click', (e) => {
        e.stopPropagation(); // CORREÇÃO: Impede que trocar o tema feche o modal
        document.body.classList.toggle("tema-claro");
    });
}

// =============================================================================
// 4. FUNÇÕES DE SUPORTE E SCROLL
// =============================================================================
function resetarScrollAtivo() {
    const containers = ["l1-op", "l2-st", "l3-sist"];
    containers.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.scrollTop = 0;
    });
}

function atualizarVisibilidadeBotaoVoltar() {
    const l1 = document.getElementById("cont-l1");
    if (btnVoltar && l1) {
        btnVoltar.style.display = (window.getComputedStyle(l1).display !== "none") ? "none" : "flex";
    }
}

function mostrarSoftwares(lista) {
    const container = document.getElementById("l3-sist");
    if (!container) return;
    container.innerHTML = "";
    lista.forEach(soft => {
        const btn = document.createElement("button");
        btn.className = "btn-op";
        btn.textContent = soft;
        container.appendChild(btn);
    });
    document.getElementById("cont-l1").style.display = "none";
    document.getElementById("cont-l2").style.display = "none";
    document.getElementById("cont-l4").style.display = "none";
    document.getElementById("cont-l3").style.display = "block";
    resetarScrollAtivo();
    atualizarVisibilidadeBotaoVoltar();
}

// =============================================================================
// 5. EVENTOS DO MODAL E NAVEGAÇÃO (AS CORREÇÕES ESTÃO AQUI)
// =============================================================================

if (btnAbaOp) {
    btnAbaOp.addEventListener('click', (e) => {
        e.stopPropagation(); // CORREÇÃO 1: Impede o modal de abrir e fechar no mesmo clique
        
        // Garante que o modal comece na Etapa 1 sempre
        document.getElementById("cont-l1").style.display = "flex";
        document.getElementById("cont-l2").style.display = "none";
        document.getElementById("cont-l3").style.display = "none";
        document.getElementById("cont-l4").style.display = "none";
        
        sectAbaOp.classList.add("ativo-aba-op");
        resetarScrollAtivo();
        atualizarVisibilidadeBotaoVoltar();
    });
}

if (sectAbaOp) {
    sectAbaOp.addEventListener('click', (e) => {
        // CORREÇÃO 2: Só fecha se o clique for no FUNDO, não no card branco
        if (e.target === sectAbaOp) {
            sectAbaOp.classList.remove("ativo-aba-op");
        }
    });
}

if (btnVoltar) {
    btnVoltar.addEventListener('click', (e) => {
        e.stopPropagation(); // CORREÇÃO 3: Impede fechar o modal ao clicar em voltar
        const l1 = document.getElementById("cont-l1"), l2 = document.getElementById("cont-l2");
        const l3 = document.getElementById("cont-l3"), l4 = document.getElementById("cont-l4");

        if (window.getComputedStyle(l3).display !== "none") {
            l3.style.display = "none";
            if (escolhaSetor && escolhaTreinamento === 'interno') {
                l4.style.display = "flex";
            } else {
                l1.style.display = "flex";
            }
        } else if (window.getComputedStyle(l4).display !== "none") {
            l4.style.display = "none";
            l2.style.display = "block";
        } else if (window.getComputedStyle(l2).display !== "none") {
            l2.style.display = "none";
            l1.style.display = "flex";
        }
        resetarScrollAtivo();
        atualizarVisibilidadeBotaoVoltar();
    });
}

if (abaOp) {
    abaOp.addEventListener("click", (event) => {
        event.stopPropagation(); // Mantém o modal aberto ao clicar nas opções
        
        if (event.target.tagName !== "BUTTON" || event.target === btnVoltar) return;
        
        const liPai = event.target.closest("li");
        if (!liPai) return;
        const liId = liPai.id;

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
                document.getElementById("cont-l2").style.display = "block";
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
            let trilha = `${escolhaTreinamento.toUpperCase()}${escolhaSetor ? ' > ' + escolhaSetor.toUpperCase() : ''} > ${escolhaSoftware.toUpperCase()}`;
            window.location.href = `videos-treinamento.html?software=${encodeURIComponent(escolhaSoftware)}&caminho=${encodeURIComponent(trilha)}`;
        }
        resetarScrollAtivo();
        atualizarVisibilidadeBotaoVoltar();
    });
}

if (btnValidarSenha) {
    btnValidarSenha.addEventListener('click', (e) => {
        e.stopPropagation();
        const digitada = senhaInput.value.trim();
        const correta = treinamentos[escolhaTreinamento].setores[escolhaSetor].senha;
        if (digitada === correta) {
            document.getElementById("cont-l4").style.display = "none";
            mostrarSoftwares(treinamentos[escolhaTreinamento].setores[escolhaSetor].softwares);
            senhaInput.value = "";
        } else {
            alert("Senha incorreta!");
            senhaInput.value = "";
        }
    });
}

// =============================================================================
// 6. ANIMAÇÃO DE PARTÍCULAS
// =============================================================================
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

window.addEventListener('load', () => {
    criarParticulas();
    atualizarVisibilidadeBotaoVoltar();
    resetarScrollAtivo();
});
