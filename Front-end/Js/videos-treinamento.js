const appData = {
    modulo: "Excelência Corporativa",
    aulas: [
        {
            titulo: "01. Boas-vindas Imp Training",
            tempo: "05:40",
            id: "dQw4w9WgXcQ",
            desc: "Bem-vindo ao treinamento oficial. Vamos alinhar os objetivos da plataforma."
        },
        {
            titulo: "02. Ferramentas de Gestão",
            tempo: "12:15",
            id: "ScMzIvxBSi4",
            desc: "Como utilizar os recursos do RM Totvs de maneira inteligente e ágil."
        }
    ]
};

const menu = document.getElementById('menu');
const btnMenu = document.getElementById('btn-menu');
const btnTema = document.getElementById('barra-tt');
const listaAulas = document.getElementById('lista-aulas');
const videoIframe = document.getElementById('video-principal');
const loader = document.getElementById('loader');

// Controle do Menu
btnMenu.onclick = () => menu.classList.toggle('menuAberto');

// Troca de Tema
btnTema.onclick = () => {
    document.body.classList.toggle('tema-escuro');
    document.body.classList.toggle('tema-claro');
};

// Gerar Playlist
function renderPlaylist() {
    document.getElementById('modulo-nome').textContent = appData.modulo;
    listaAulas.innerHTML = '';

    appData.aulas.forEach((aula, index) => {
        const item = document.createElement('div');
        item.className = `video-item ${index === 0 ? 'active' : ''}`;
        item.innerHTML = `
            <p>${aula.titulo}</p>
            <small>${aula.tempo}</small>
        `;
        
        item.onclick = () => carregarAula(aula, item);
        listaAulas.appendChild(item);
        
        if(index === 0) carregarAula(aula, item);
    });
}

function carregarAula(aula, el) {
    loader.classList.remove('hidden');
    document.querySelectorAll('.video-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');

    videoIframe.src = `https://www.youtube.com/embed/${aula.id}?autoplay=1`;
    document.getElementById('titulo-aula').textContent = aula.titulo;
    document.getElementById('desc-aula').textContent = aula.desc;
    document.getElementById('aula-nome').textContent = aula.titulo;

    videoIframe.onload = () => loader.classList.add('hidden');
}

window.onload = renderPlaylist;
