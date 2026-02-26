// 1. Efeito de Digitação no Hero Section
const text = "equipe.";
let i = 0;
function typeWriter() {
    const el = document.getElementById("typing-text");
    if (el && i < text.length) {
        el.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 150);
    }
}
window.onload = typeWriter;

// 2. Dados dos Treinamentos (Gerando os cards dinamicamente)
const treinamentos = [
    { 
        title: "Sistemas Internos", icon: "fa-server", theme: "blue", 
        desc: "Sistemas que a empresa pagou para terceiros fornecerem, personalizarem ou construírem de forma exclusiva.",
        tools: ["ERP Customizado", "Sistema de Ponto", "Portal RH"]
    },
    { 
        title: "Sistemas Externos", icon: "fa-cloud", theme: "green", 
        desc: "Ferramentas de mercado consolidadas que utilizamos no dia a dia para comunicação, design e produtividade.",
        tools: ["Microsoft 365", "Canva", "Trello", "Slack"]
    },
    { 
        title: "Tutoriais", icon: "fa-video", theme: "purple", 
        desc: "Vídeos curtos e diretos focados em resolver problemas simples ou mostrar configurações rápidas.",
        tools: ["Acesso à VPN", "Limpar Cache", "Assinatura Email"]
    },
    { 
        title: "Passo a Passo", icon: "fa-shoe-prints", theme: "orange", 
        desc: "Tutoriais em texto e prints de tela (capturas), ideais para você seguir no seu próprio ritmo.",
        tools: ["Solicitar Férias", "Agendar Sala", "Emitir Notas"]
    }
];

const container = document.getElementById('training-container');
if (container) {
    treinamentos.forEach(t => {
        const tagsHTML = t.tools.map(tool => `<span class="tool-tag">${tool}</span>`).join('');
        
        container.innerHTML += `
            <div class="card">
                <div class="card-icon theme-${t.theme}"><i class="fas ${t.icon}"></i></div>
                <h3 class="card-title">${t.title}</h3>
                <p class="card-desc">${t.desc}</p>
                <div class="card-tools">
                    <p class="card-tools-title">O que será ensinado:</p>
                    <div class="tools-list">${tagsHTML}</div>
                </div>
            </div>
        `;
    });
}

// 3. Lógica de Chamados e Níveis de SLA
const chamados = [
    { nivel: "Crítico", desc: "Parada total de sistema (Impede o trabalho de várias pessoas)", cor: "#ef4444" },
    { nivel: "Alto", desc: "Falha grave em recurso essencial para o seu setor", cor: "#f97316" },
    { nivel: "Normal", desc: "Ajustes de rotina, dúvidas simples ou erros pontuais", cor: "#3b82f6" },
    { nivel: "Baixo", desc: "Melhorias de sistema e solicitações para datas futuras", cor: "#10b981" }
];

const priorityList = document.getElementById('priority-list');
if (priorityList) {
    chamados.forEach(c => {
        priorityList.innerHTML += `
            <div class="sla-item">
                <div class="sla-level">
                    <span class="sla-dot" style="background-color: ${c.cor};"></span>
                    <span>${c.nivel}</span>
                </div>
                <span class="sla-desc" style="display: none; color: #64748b;">—</span>
                <span class="sla-desc">${c.desc}</span>
            </div>
        `;
    });
}

// 4. Sistema de Busca no FAQ
const faqs = [
    { q: "Onde vejo meu progresso?", a: "No menu superior 'Área do Aluno', disponível após acessar a plataforma real de treinamento." },
    { q: "Esqueci minha senha de rede.", a: "Abra um chamado de nível 'Normal'. O suporte resetará rapidamente." },
    { q: "Novos colaboradores ganham certificado?", a: "Sim, todos os módulos geram certificação automática após a conclusão na plataforma." }
];

const faqList = document.getElementById('faq-list');
const searchInput = document.getElementById('faq-search');

function renderFaq(filter = "") {
    if (!faqList) return;
    
    faqList.innerHTML = "";
    const filteredFaqs = faqs.filter(f => f.q.toLowerCase().includes(filter.toLowerCase()) || f.a.toLowerCase().includes(filter.toLowerCase()));
    
    if (filteredFaqs.length === 0) {
        faqList.innerHTML = `<p style="text-align: center; color: #94a3b8; padding: 16px;">Nenhuma dúvida encontrada com este termo.</p>`;
        return;
    }

    filteredFaqs.forEach(f => {
        faqList.innerHTML += `
            <details class="faq-item">
                <summary>${f.q} <i class="fas fa-chevron-down"></i></summary>
                <p>${f.a}</p>
            </details>
        `;
    });
}

if (searchInput) {
    searchInput.addEventListener('input', (e) => renderFaq(e.target.value));
}
renderFaq(); // Renderiza o FAQ inicial

// 5. Função do Botão Principal (Link para a plataforma real)
function acessarPlataforma() {
    // Aqui você substituiria pela URL real do seu sistema, ex: window.location.href = "https://ead.suaempresa.com.br";
    alert("Nesta etapa, o colaborador seria redirecionado para a URL da Plataforma de Treinamentos (Ex: Moodle, LMS próprio, etc).");
}