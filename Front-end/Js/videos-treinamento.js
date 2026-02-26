<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="Css/geral.css">
    <style>
        .video-layout { display: grid; grid-template-columns: 1fr 350px; height: 100vh; }
        .player-area { padding: 30px; background: radial-gradient(circle at center, #0a0f1d, #05070a); }
        .video-frame { width: 100%; aspect-ratio: 16/9; background: #000; border-radius: 15px; border: 1px solid var(--primary); }
        .playlist-side { background: var(--bg-nav); padding: 20px; border-left: 1px solid var(--glass); overflow-y: auto; }
        .lesson-item { padding: 15px; background: var(--glass); margin-bottom: 10px; border-radius: 8px; cursor: pointer; transition: 0.3s; }
        .lesson-item:hover { background: var(--secondary); }
        .lesson-item.active { border-left: 5px solid var(--primary); background: rgba(0, 212, 255, 0.1); }
    </style>
</head>
<body>
    <div class="video-layout">
        <main class="player-area">
            <div id="video-placeholder" class="video-frame">
                <div style="height:100%; display:flex; align-items:center; justify-content:center; color:var(--primary)">
                    <h2>Selecione uma aula na playlist lateral</h2>
                </div>
            </div>
            <h1 id="video-title" style="margin-top:20px;">---</h1>
        </main>

        <aside class="playlist-side">
            <button onclick="window.history.back()" style="margin-bottom:20px; width:100%">← Voltar</button>
            <h3 id="software-name">Software</h3>
            <div id="lesson-list" style="margin-top:20px;"></div>
        </aside>
    </div>

    <script>
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
    </script>
</body>
</html>