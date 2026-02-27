// Menu lateral
const btnM = document.getElementById("btn-menu");
const menuAb = document.getElementById("menu");
const elemTextN = document.querySelectorAll(".textMenu");

btnM.addEventListener('click', () => {
    menuAb.classList.toggle("menuAberto");
    elemTextN.forEach(texto => {
        texto.classList.toggle("elem-text-menu");
    });
});

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

const database = {
    "AutoCAD": [
        { title: "01. Interface", id: "dQw4w9WgXcQ" },
        { title: "02. Desenho Básico", id: "3JZ_D3ELwOQ" }
    ],
    "Tutorial 1": [
        { title: "Boas Vindas", id: "example_id" }
    ]
};

const params = new URLSearchParams(window.location.search);
const software = params.get('software');
document.getElementById('software-name').innerText = software;

const list = document.getElementById('lesson-list');
const aulas = database[software] || [];

aulas.forEach(aula => {
    const div = document.createElement('div');
    div.className = 'lesson-item';
    div.innerText = aula.title;
    div.onclick = () => {
        document.getElementById('video-placeholder').innerHTML = 
            `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${aula.id}?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
        document.getElementById('video-title').innerText = aula.title;
        document.querySelectorAll('.lesson-item').forEach(i => i.classList.remove('active'));
        div.classList.add('active');
    };
    list.appendChild(div);
});
