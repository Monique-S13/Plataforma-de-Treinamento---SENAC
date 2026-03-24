// ==================== 1. BANCO DE DADOS (SEUS DADOS ORIGINAIS) ====================
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

// ==================== 2. VARIÁVEIS DE CONTROLE ====================
let escolhaTreinamento = null;
let escolhaSetor = null;
let escolhaSoftware = null;

// Seletores Globais
const btnM = document.getElementById("btn-menu");
const menuAb = document.getElementById("menu");
const elemTextN = document.querySelectorAll(".textMenu");
const mensagemErro = document.getElementById("mensagemErro"); 
const btnVoltar = document.getElementById("btn-voltar-modal");
const abaOp = document.getElementById("aba-op");

// ==================== 3. FUNÇÕES DE SUPORTE ====================

function atualizarVisibilidadeBotaoVoltar() {
    const l1 = document.getElementById("cont-l1");
    if (btnVoltar && l1) {
        // Esconde o botão se estiver na tela inicial (l1), caso contrário mostra
        btnVoltar.style.display = (getComputedStyle(l1).display !== "none") ? "none" : "flex";
    }
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

// ==================== 4. EVENTOS DE CLIQUE ====================

// --- MENU LATERAL ---
if (btnM && menuAb) {
    btnM.addEventListener('click', () => {
        menuAb.classList.toggle("menuAberto");
        elemTextN.forEach(texto => texto.classList.toggle("elem-text-menu"));
        
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
}

// --- NAVEGAÇÃO ENTRE TELAS (abaOp) ---
if (abaOp) {
    abaOp.addEventListener("click", (event) => {
        if (event.target.tagName !== "BUTTON") return;
        
        const liId = event.target.closest("li")?.id;
        if (!liId) return;

        // TELA 1 -> Escolha do Tipo (Interno, Tutorial, etc)
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

        // TELA 2 -> Escolha do Setor (RH, TI)
        else if (liId === "cont-l2") {
            escolhaSetor = event.target.getAttribute("data-setor");
            document.getElementById("cont-l2").style.display = "none";
            document.getElementById("cont-l4").style.display = "flex"; 
        }

        // TELA 4 -> Validação de Senha
        else if (liId === "cont-l4") {
            if (event.target.id === "btnValidarSenha" || event.target.closest("button")?.id === "btnValidarSenha") {
                const senhaInput = document.getElementById("senhaInput");
                const senhaDigitada = senhaInput ? senhaInput.value.trim() : "";
                const senhaCorreta = treinamentos[escolhaTreinamento].setores[escolhaSetor].senha;

                if (senhaDigitada === senhaCorreta) {
                    document.getElementById("cont-l4").style.display = "none";
                    mostrarSoftwares(treinamentos[escolhaTreinamento].setores[escolhaSetor].softwares);
                    if (mensagemErro) mensagemErro.style.display = "none";
                    if (senhaInput) senhaInput.value = ""; // Limpa a senha
                } else {
                    if (mensagemErro) {
                        mensagemErro.textContent = "Senha incorreta. Tente novamente.";
                        mensagemErro.style.display = "block";
                    }
                }
            }
        }

        // TELA 3 -> Escolha do Software (Redirecionamento)
        else if (liId === "cont-l3") {
            escolhaSoftware = event.target.textContent.trim();
            let caminhoTrilha = `${escolhaTreinamento.toUpperCase()}`;
            if(escolhaSetor) { caminhoTrilha += ` > ${escolhaSetor.toUpperCase()}`; }
            caminhoTrilha += ` > ${escolhaSoftware.toUpperCase()}`;

            window.location.href = `videos-treinamento.html?software=${encodeURIComponent(escolhaSoftware)}&caminho=${encodeURIComponent(caminhoTrilha)}`;
        }
        
        atualizarVisibilidadeBotaoVoltar();
    });
}

// --- BOTÃO VOLTAR ---
if (btnVoltar) {
    btnVoltar.addEventListener('click', () => {
        const l1 = document.getElementById("cont-l1");
        const l2 = document.getElementById("cont-l2");
        const l3 = document.getElementById("cont-l3");
        const l4 = document.getElementById("cont-l4");

        if (l3 && getComputedStyle(l3).display !== "none") {
            l3.style.display = "none";
            if (escolhaSetor) { l4.style.display = "flex"; } 
            else { l1.style.display = "flex"; }
        } 
        else if (l4 && getComputedStyle(l4).display !== "none") {
            l4.style.display = "none";
            l2.style.display = "flex";
        } 
        else if (l2 && getComputedStyle(l2).display !== "none") {
            l2.style.display = "none";
            l1.style.display = "flex";
        }
        atualizarVisibilidadeBotaoVoltar();
    });
}

// ==================== 5. INICIALIZAÇÃO ====================

function criarParticulas() {
    let container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        container.appendChild(particle);
    }
}

window.addEventListener('load', () => {
    criarParticulas();
    atualizarVisibilidadeBotaoVoltar();
});
