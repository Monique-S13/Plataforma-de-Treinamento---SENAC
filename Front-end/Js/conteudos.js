// =============================================================================
// 1. BANCO DE DADOS E ESTADOS (COM VÍDEOS, TÍTULOS E DURAÇÕES)
// =============================================================================
const treinamentos = {
    interno: {
        setores: {
            RH: { 
                senha: "rh12345", 
                softwares: ["Word RH", "Excel RH", "Folha de Pagamento", "Recrutamento", "Cultura Imp"] 
            },
            TI: { 
                senha: "ti12345", 
                softwares: ["Segurança", "Suporte", "Redes", "RM Totvs"] 
            }
        }
    },
    tutorial: { softwares: ["Portal Imp", "Bater Ponto", "Email Corporativo", "Chamados TI"] },
    externo: { softwares: ["Canva", "CRM Vendas", "Analytics"] },
    manual: { softwares: ["Manual de Conduta", "Passo a Passo: Primeiro Dia"] }
};

// Dados detalhados para a página de vídeos
const bancoDeVideos = {
    "WORD RH": [
        { id: "p1_yU8Z7_oA", titulo: "Configuração de Documentos", duracao: "08:15", desc: "Ajustes de margens e papel timbrado." },
        { id: "HovyNge1v54", titulo: "Contratos de Trabalho", duracao: "12:40", desc: "Padronização de textos e quebras." },
        { id: "ZR68P-2v9Ck", titulo: "Tabelas e Organogramas", duracao: "06:20", desc: "Estruturas hierárquicas no Word." },
        { id: "3u7pIofC5E0", titulo: "Mala Direta", duracao: "10:15", desc: "Automação de comunicados em massa." }
    ],
    "EXCEL RH": [
        { id: "zz8CP-XiW0g", titulo: "Fórmulas de Soma e Média", duracao: "15:20", desc: "Cálculos básicos para controle de ponto." },
        { id: "tmb3KbA1444", titulo: "PROCV para Folha", duracao: "10:05", desc: "Busca de dados entre planilhas." },
        { id: "bIJUzd49JiU", titulo: "Tabelas Dinâmicas", duracao: "12:30", desc: "Resumos gerenciais por setor." },
        { id: "vV9_F3E-6_I", titulo: "Gráficos de Indicadores", duracao: "09:40", desc: "Visualização de turnover e faltas." },
        { id: "UxE4wYCtCoU", titulo: "Validação de Dados", duracao: "07:15", desc: "Criando listas suspensas." }
    ],
    "RM TOTVS": [
        { id: "oaxK6p8VpKM", titulo: "Navegação Geral ERP", duracao: "07:30", desc: "Menus e atalhos do sistema Totvs." },
        { id: "9oC5WMwuZ7c", titulo: "Automação de Ponto", duracao: "14:10", desc: "Validação de batidas e abonos." },
        { id: "zLz5CiH-OSc", titulo: "Gestão de Funcionários", duracao: "11:00", desc: "Cadastro e alteração de cargos." },
        { id: "S5TwbVb55JY", titulo: "Relatórios de Folha", duracao: "08:45", desc: "Extração de encargos e proventos." }
    ],
    "SEGURANÇA": [
        { id: "6u7X0S0fS6M", titulo: "Segurança Digital", duracao: "10:40", desc: "Proteção de dados sensíveis e LGPD." },
        { id: "Zp5p6z8W2oE", titulo: "Phishing e Engenharia Social", duracao: "08:15", desc: "Como identificar e-mails maliciosos." },
        { id: "k7m3f_Z6yT0", titulo: "Gestão de Senhas", duracao: "05:30", desc: "Práticas seguras de armazenamento." },
        { id: "8N9y_Z6yT1w", titulo: "Uso de VPN", duracao: "07:20", desc: "Acesso seguro em Home Office." }
    ],
    "CANVA": [
        { id: "9bTmk1-HGks", titulo: "Interface Inicial", duracao: "08:00", desc: "Ferramentas de edição e templates." },
        { id: "_ZM3DenzWW8", titulo: "Criação de Posts", duracao: "11:30", desc: "Design para avisos e redes sociais." },
        { id: "OIGw_zbOo5k", titulo: "Identidade Visual", duracao: "07:45", desc: "Padrão de cores da empresa." },
        { id: "nC6cF-8-ZCM", titulo: "Apresentações", duracao: "14:20", desc: "Slides profissionais para reuniões." }
    ]
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

// =============================================================================
// 3. FUNÇÕES DE SUPORTE E CONTROLE DO MODAL
// =============================================================================

function resetarEtapasModal() {
    document.getElementById("cont-l1").style.display = "flex";
    document.getElementById("cont-l2").style.display = "none";
    document.getElementById("cont-l3").style.display = "none";
    document.getElementById("cont-l4").style.display = "none";
    
    if(senhaInput) senhaInput.value = "";
    escolhaTreinamento = null;
    escolhaSetor = null;
    
    atualizarVisibilidadeBotaoVoltar();
}

if (btnAbaOp) {
    btnAbaOp.addEventListener('click', () => {
        resetarEtapasModal();
        sectAbaOp.classList.add("ativo-aba-op");
    });
}

if (sectAbaOp) {
    sectAbaOp.addEventListener('click', (e) => {
        if (e.target === sectAbaOp) {
            sectAbaOp.classList.remove("ativo-aba-op");
        }
    });
}

function atualizarVisibilidadeBotaoVoltar() {
    const l1 = document.getElementById("cont-l1");
    if (btnVoltar && l1) {
        btnVoltar.style.display = (window.getComputedStyle(l1).display !== "none") ? "none" : "flex";
    }
}

// =============================================================================
// 4. NAVEGAÇÃO ENTRE AS ETAPAS
// =============================================================================

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
        else if (liId === "cont-l3") {
            escolhaSoftware = event.target.textContent.trim();
            let trilha = `${escolhaTreinamento.toUpperCase()}${escolhaSetor ? ' > ' + escolhaSetor.toUpperCase() : ''} > ${escolhaSoftware.toUpperCase()}`;
            
            if (escolhaTreinamento === "manual") {
                window.location.href = `manual-leitura.html?software=${encodeURIComponent(escolhaSoftware)}&caminho=${encodeURIComponent(trilha)}`;
            } else {
                window.location.href = `videos-treinamento.html?software=${encodeURIComponent(escolhaSoftware)}&caminho=${encodeURIComponent(trilha)}`;
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

// =============================================================================
// 5. MENU, TEMA E PARTÍCULAS (MANTIDOS ORIGINAIS)
// =============================================================================
if (btnM) {
    btnM.addEventListener('click', () => {
        menuAb.classList.toggle("menuAberto");
        elemTextN.forEach(texto => texto.classList.toggle("elem-text-menu"));
        const btnBar = document.querySelector(".bar"), btnClouse = document.querySelector(".close");
        if (menuAb.classList.contains("menuAberto")) {
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
});
