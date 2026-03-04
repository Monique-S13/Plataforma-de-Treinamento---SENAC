// Menu lateral
const btnM = document.getElementById("btn-menu");
const menuAb = document.getElementById("menu");
const elemTextN = document.querySelectorAll(".textMenu");

btnM.addEventListener('click', () => {
  menuAb.classList.toggle("menuAberto");
  elemTextN.forEach(texto => {
    texto.classList.toggle("elem-text-menu");
  });
    
  const btnBar = document.querySelector(".bar");
  const btnClouse = document.querySelector(".close");
    

  if(menuAb.classList.contains("menuAberto")){
    btnBar.style.display = "none";
    btnClouse.style.display = "block"; 
  } else{
    btnBar.style.display = "block";
    btnClouse.style.display = "none";
  }
});

// Animação de fundo do main
// new FinisherHeader({
//   "count": 100,
//   "size": {
//     "min": 2,
//     "max": 8,
//     "pulse": 0
//   },
//   "speed": {
//     "x": {
//       "min": 0,
//       "max": 0.4
//     },
//     "y": {
//       "min": 0,
//       "max": 0.6
//     }
//   },
//   "colors": {
//     "background": "transparent",
//     "particles": [
//       "#fbfcca",
//       "#d7f3fe",
//       "#ffd0a7"
//     ]
//   },
//   "blending": "overlay",
//   "opacity": {
//     "center": 1,
//     "edge": 0
//   },
//   "skew": -2,
//   "shapes": [
//     "c"
//   ]
// });

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

// JSON com regras de treinamentos
const treinamentos = {
  interno: {
    setores: {
      RH: { senha: "rh12345", softwares: ["Word RH", "Treinamento de Entrevistas"] },
      GG: { senha: "gg12345", softwares: ["Gestão Geral"] },
      TI: { senha: "ti12345", softwares: ["PowerPoint TI", "Segurança da Informação"] },
      FIN: { senha: "fin12345", softwares: ["Excel Avançado", "Gestão de Custos"] },
      JURI: { senha: "juri12345", softwares: ["Direito Empresarial"] },
      ENG: { senha: "eng12345", softwares: ["AutoCAD"] }
    }
  },

  externo: { softwares: ["Sistema Externo A", "Sistema Externo B"] },
  tutorial: { softwares: ["Tutorial 1", "Tutorial 2"] },
  manual: { softwares: ["Manual Passo a Passo"] }
};

let escolhaTreinamento = null;
let escolhaSetor = null;
let escolhaSoftware = null;

// Escutador único no pai UL
const abaOp = document.getElementById("aba-op");
abaOp.addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") return;
  const liId = event.target.closest("li").id;

  if (liId === "cont-l1") {
    // Etapa 1: treinamento
    escolhaTreinamento = event.target.getAttribute("data-opcao");
    document.getElementById("cont-l1").style.display = "none";

    if (treinamentos[escolhaTreinamento].setores) {
      // Criar botões de setores dinamicamente
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
      // Treinamento sem setor → vai direto para softwares
      mostrarSoftwares(treinamentos[escolhaTreinamento].softwares);
    }
  }

  else if (liId === "cont-l2") {
    // Etapa 2: setor
    escolhaSetor = event.target.getAttribute("data-setor");
    document.getElementById("cont-l2").style.display = "none";
    document.getElementById("cont-l4").style.display = "block"; // senha
  }

  else if (liId === "cont-l4") {
    // Etapa 3: senha
    if (event.target.id === "btnValidarSenha" || event.target.id === "btn_op_p") {
      const senhaDigitada = document.getElementById("senhaInput").value;
      const senhaCorreta = treinamentos[escolhaTreinamento].setores[escolhaSetor].senha;

      if (senhaDigitada === senhaCorreta) {
        document.getElementById("cont-l4").style.display = "none";
        mostrarSoftwares(treinamentos[escolhaTreinamento].setores[escolhaSetor].softwares);
      } else {
        alert("Senha incorreta para o setor " + escolhaSetor);
      }
    }
  }

  else if (liId === "cont-l3") {
    // Etapa 4: sistemas
    escolhaSoftware = event.target.textContent.trim();
    window.location.href = `video.html?setor=${escolhaSetor}&software=${escolhaSoftware}`;
  }
});

// Função para criar botões de softwares dinamicamente
function mostrarSoftwares(lista) {
  const container = document.getElementById("l3-sist");

  container.innerHTML = "";
  lista.forEach(soft => {
    const btn = document.createElement("button");
      
    btn.textContent = soft;
    btn.setAttribute("data-sist", soft);
    container.appendChild(btn);
  });

  document.getElementById("cont-l3").style.display = "block";
}
