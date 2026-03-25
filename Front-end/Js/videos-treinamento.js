// =============================================================================
// 1. BANCO DE DADOS COMPLETO (MÍNIMO 4 A 7 VÍDEOS POR SOFTWARE)
// =============================================================================
const bancoDeVideos = {
    "WORD RH": [
        { id: "p1_yU8Z7_oA", titulo: "Configuração de Documentos", duracao: "08:15", desc: "Ajustes de margens, papel timbrado e fontes padrão da empresa." },
        { id: "HovyNge1v54", titulo: "Contratos de Trabalho", duracao: "12:40", desc: "Padronização de textos, quebras de página e seções." },
        { id: "ZR68P-2v9Ck", titulo: "Tabelas e Organogramas", duracao: "06:20", desc: "Como inserir a estrutura hierárquica e tabelas de benefícios." },
        { id: "3u7pIofC5E0", titulo: "Mala Direta para Avisos", duracao: "10:15", desc: "Automatizando o envio de comunicados para múltiplos funcionários." },
        { id: "MIWyTZOPLW4", titulo: "Revisão e Comentários", duracao: "05:50", desc: "Como utilizar o modo de revisão em documentos compartilhados." }
    ],
    "EXCEL RH": [
        { id: "zz8CP-XiW0g", titulo: "Fórmulas de Soma e Média", duracao: "15:20", desc: "Cálculos básicos para controle de ponto e horas extras." },
        { id: "tmb3KbA1444", titulo: "PROCV para Folha", duracao: "10:05", desc: "Busca automatizada de dados entre diferentes planilhas de pagamento." },
        { id: "bIJUzd49JiU", titulo: "Tabelas Dinâmicas", duracao: "12:30", desc: "Criação de resumos gerenciais por setor e centro de custo." },
        { id: "vV9_F3E-6_I", titulo: "Gráficos de Indicadores", duracao: "09:40", desc: "Visualização de turnover e absenteísmo através de gráficos." },
        { id: "UxE4wYCtCoU", titulo: "Validação de Dados", duracao: "07:15", desc: "Criando listas suspensas para evitar erros de digitação." },
        { id: "vV9_F3E-6_I", titulo: "Proteção de Planilhas", duracao: "05:20", desc: "Como bloquear células com fórmulas sensíveis." }
    ],
    "RM TOTVS": [
        { id: "oaxK6p8VpKM", titulo: "Navegação Geral ERP", duracao: "07:30", desc: "Conhecendo os menus e atalhos do sistema Totvs." },
        { id: "9oC5WMwuZ7c", titulo: "Módulo Automação de Ponto", duracao: "14:10", desc: "Validação de batidas, abonos e espelho de ponto." },
        { id: "zLz5CiH-OSc", titulo: "Gestão de Funcionários", duracao: "11:00", desc: "Cadastro de novos colaboradores e alteração de cargos." },
        { id: "S5TwbVb55JY", titulo: "Relatórios de Folha", duracao: "08:45", desc: "Como extrair relatórios financeiros e de encargos." },
        { id: "z_9Zit0TswI", titulo: "Portal Meurh (Gestor)", duracao: "06:15", desc: "Aprovação de férias e solicitações da equipe pelo portal." }
    ],
    "FOLHA DE PAGAMENTO": [
        { id: "p36Z8U7nU_A", titulo: "Cálculo de Proventos", duracao: "11:20", desc: "Base de cálculo para salário, DSR e adicionais." },
        { id: "X_q5mE7G99k", titulo: "Descontos Legais (INSS/IR)", duracao: "13:05", desc: "Entendendo as tabelas e faixas de retenção de impostos." },
        { id: "4N9y_Z6yT1w", titulo: "Férias e Rescisão", duracao: "15:50", desc: "Processamento de cálculos para saídas e períodos aquisitivos." },
        { id: "v7M3f_Z6yT0", titulo: "Encargos Sociais", duracao: "09:30", desc: "Cálculo de FGTS e contribuições patronais." }
    ],
    "SEGURANÇA": [
        { id: "6u7X0S0fS6M", titulo: "Segurança de Dados LGPD", duracao: "10:40", desc: "O papel do TI e RH na proteção de dados sensíveis." },
        { id: "Zp5p6z8W2oE", titulo: "Phishing e Engenharia Social", duracao: "08:15", desc: "Como identificar e reportar e-mails maliciosos." },
        { id: "k7m3f_Z6yT0", titulo: "Gestão de Senhas", duracao: "05:30", desc: "Melhores práticas para criação e armazenamento de senhas." },
        { id: "8N9y_Z6yT1w", titulo: "Uso de VPN", duracao: "07:20", desc: "Acesso seguro à rede interna em regime de Home Office." }
    ],
    "PORTAL IMP": [
        { id: "9bTmk1-HGks", titulo: "Primeiro Acesso", duracao: "04:30", desc: "Como criar sua senha e navegar no portal pela primeira vez." },
        { id: "_ZM3DenzWW8", titulo: "Download de Holerites", duracao: "03:15", desc: "Localizando e baixando seus comprovantes mensais." },
        { id: "OIGw_zbOo5k", titulo: "Informe de Rendimentos", duracao: "05:00", desc: "Como extrair o documento para declaração de imposto de renda." },
        { id: "nC6cF-8-ZCM", titulo: "Solicitação de Benefícios", duracao: "06:45", desc: "Como pedir inclusão de dependentes em planos de saúde/vale." }
    ],
    "CANVA": [
        { id: "9bTmk1-HGks", titulo: "Interface Inicial", duracao: "08:00", desc: "Conhecendo as ferramentas de edição e templates." },
        { id: "_ZM3DenzWW8", titulo: "Criação de Comunicados", duracao: "11:30", desc: "Design para avisos internos de mural e WhatsApp." },
        { id: "OIGw_zbOo5k", titulo: "Identidade Visual", duracao: "07:45", desc: "Como manter o padrão de cores e fontes da empresa." },
        { id: "nC6cF-8-ZCM", titulo: "Apresentações", duracao: "14:20", desc: "Criação de slides profissionais para reuniões." }
    ]
};

// =============================================================================
// 2. LÓGICA DE EXECUÇÃO (MANTENDO SUA ESTRUTURA)
// =============================================================================
const params = new URLSearchParams(window.location.search);
const softwareSelecionado = params.get('software')?.toUpperCase();
const caminhoTrilha = params.get('caminho');

const videoIframe = document.getElementById('video-principal');
const listaAulas = document.getElementById('lista-aulas');
const loader = document.getElementById('loader');

let appData = {
    modulo: softwareSelecionado || "Treinamento",
    aulas: bancoDeVideos[softwareSelecionado] || []
};

function renderPlaylist() {
    const moduloNome = document.getElementById('modulo-nome');
    if (appData.aulas.length === 0) {
        if(moduloNome) moduloNome.textContent = "Conteúdo em Breve";
        return;
    }

    if(moduloNome) moduloNome.textContent = appData.modulo;
    if(document.getElementById('caminho-video')) document.getElementById('caminho-video').textContent = caminhoTrilha;

    listaAulas.innerHTML = '';

    appData.aulas.forEach((aula, index) => {
        const item = document.createElement('div');
        item.className = `video-item ${index === 0 ? 'active' : ''}`;
        item.innerHTML = `
            <div class="video-info">
                <p><strong>${index + 1}. ${aula.titulo}</strong></p>
                <small><i class="fa-solid fa-clock"></i> ${aula.duracao}</small>
            </div>
        `;
        
        item.onclick = () => carregarAula(aula, item);
        listaAulas.appendChild(item);
        
        if(index === 0) carregarAula(aula, item);
    });
}

function carregarAula(aula, el) {
    if(loader) loader.classList.remove('hidden');
    document.querySelectorAll('.video-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');

    videoIframe.src = `https://www.youtube.com/embed/${aula.id}?autoplay=1&rel=0&modestbranding=1`;
    
    // Atualiza cabeçalhos e descrições
    const titAula = document.getElementById('titulo-aula');
    const descAula = document.getElementById('desc-aula');
    const nomeAula = document.getElementById('aula-nome');

    if(titAula) titAula.textContent = aula.titulo;
    if(descAula) descAula.textContent = aula.desc;
    if(nomeAula) nomeAula.textContent = aula.titulo;

    videoIframe.onload = () => { if(loader) loader.classList.add('hidden'); };
}

// Menu e Tema
const btnMenu = document.getElementById('btn-menu');
if(btnMenu) btnMenu.onclick = () => document.getElementById('menu').classList.toggle('menuAberto');

const btnTema = document.getElementById('barra-tt');
if(btnTema) btnTema.onclick = () => document.body.classList.toggle('tema-claro');

window.onload = renderPlaylist;
