// =============================================================================
// 1. BANCO DE DADOS E ESTADOS
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
// 3. MENU LATERAL
// =============================================================================
if (btnM) {
    btnM.addEventListener('click', () => {
        menuAb.classList.toggle("menuAberto");
        elemTextN.forEach(texto => texto.classList.toggle("elem-text-menu"));
        
        const btnBar = document.querySelector(".bar");
        const btnClouse = document.querySelector(".close");

        if (menuAb.classList.contains("menuAberto")) {
            if(btnBar) btnBar.style.display = "none";
            if(btnClouse) btnClouse.style.display = "flex";
        } else {
            if(btnBar) btnBar.style.display = "flex";
            if(btnClouse) btnClouse.style.display = "none";
        }
    });
}

// =============================================================================
// 4. FUNÇÕES DE SUPORTE
// =============================================================================
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
    document.getElementById("cont-l3").style.display = "block";
    atualizarVisibilidadeBotaoVoltar();
}

// =============================================================================
// 5. EVENTOS DO MODAL E NAVEGAÇÃO
// =============================================================================
if (btnAbaOp) {
    btnAbaOp.addEventListener('click', () => {
        sectAbaOp.classList.add("ativo-aba-op");
        atualizarVisibilidadeBotaoVoltar();
    });
}

if (sectAbaOp) {
    sectAbaOp.addEventListener('click', (e) => {
        if (e.target === sectAbaOp) sectAbaOp.classList.remove("ativo-aba-op");
    });
}

if (btnVoltar) {
    btnVoltar.addEventListener('click', () => {
        const l1 = document.getElementById("cont-l1");
        const l2 = document.getElementById("cont-l2");
        const l3 = document.getElementById("cont-l3");
        const l4 = document.getElementById("cont-l4");

        if (window.getComputedStyle(l3).display !== "none") {
            l3.style.display = "none";
            if (escolhaSetor) l4.style.display = "flex"; else l1.style.display = "flex";
        } else if (window.getComputedStyle(l4).display !== "none") {
            l4.style.display = "none";
            l2.style.display = "flex";
        } else if (window.getComputedStyle(l2).display !== "none") {
            l2.style.display = "none";
            l1.style.display = "flex";
        }
        atualizarVisibilidadeBotaoVoltar();
    });
}

if (abaOp) {
    abaOp.addEventListener("click", (event) => {
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
        atualizarVisibilidadeBotaoVoltar();
    });
}

if (btnValidarSenha) {
    btnValidarSenha.addEventListener('click', () => {
        const digitada = senhaInput.value.trim();
        const correta = treinamentos[escolhaTreinamento].setores[escolhaSetor].senha;

        if (digitada === correta) {
            document.getElementById("cont-l4").style.display = "none";
            mostrarSoftwares(treinamentos[escolhaTreinamento].setores[escolhaSetor].softwares);
            senhaInput.value = "";
            if (mensagemErro) mensagemErro.style.display = "none";
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

// Inicialização final correta
window.addEventListener('load', () => {
    criarParticulas();
    atualizarVisibilidadeBotaoVoltar();
});
