/* O Eremita — busca de artigos e alternância de tema */

(function () {
  "use strict";

  /* ---------- Tema (noturno / pergaminho) ---------- */
  var raiz = document.documentElement;

  try {
    var salvo = localStorage.getItem("eremita-tema");
    if (salvo === "light" || salvo === "dark") {
      raiz.setAttribute("data-theme", salvo);
    }
  } catch (e) { /* armazenamento indisponível: segue com o padrão */ }

  var botaoTema = document.getElementById("alternar-tema");
  if (botaoTema) {
    botaoTema.addEventListener("click", function () {
      var novo = raiz.getAttribute("data-theme") === "light" ? "dark" : "light";
      raiz.setAttribute("data-theme", novo);
      try { localStorage.setItem("eremita-tema", novo); } catch (e) { /* ignora */ }
    });
  }

  /* ---------- Busca (apenas artigos publicados) ---------- */
  var ARTIGOS = [
    { titulo: "O Observador", tema: "Maçonaria", url: "o-observador.html" },
    { titulo: "O Universo que se Observa", tema: "Hermetismo", url: "universo-que-se-observa.html" },
    { titulo: "O Caibalion e a Tradição Hermética", tema: "Hermetismo", url: "o-caibalion-e-a-tradicao-hermetica.html" },
    { titulo: "O Livro de Jó sob a Ótica do Sod", tema: "Cabala", url: "primeiro-artigo.html" },
    { titulo: "O Tarot — Entre a História, o Símbolo e a Cabala Hermética", tema: "Tarot", url: "tarot.html" },
    { titulo: "O Príncipe e a Princesa no Tarot", tema: "Tarot", url: "o-principe-e-a-princesa-no-tarot.html" },
    { titulo: "A Tetraktys de Pitágoras", tema: "Simbolismo", url: "tetraktys-pitagoras.html" },
    { titulo: "Os Antigos Landmarks da Maçonaria", tema: "Manuscritos", url: "os-antigos-landmarks-da-maconaria.html" },
    { titulo: "Fama Fraternitatis", tema: "Manuscritos", url: "fama-fraternitatis.html" },
    { titulo: "Confessio Fraternitatis", tema: "Manuscritos", url: "confessio-fraternitatis.html" },
    { titulo: "As Núpcias Alquímicas de Christian Rosenkreutz", tema: "Manuscritos", url: "nupcias-alquimicas-christian-rosenkreutz.html" },
    { titulo: "O que nos torna especiais para os outros?", tema: "Biblioteca", url: "o-que-nos-torna-especiais.html" },
    { titulo: "AVÔHAI", tema: "Biblioteca", url: "avohai.html" },
    { titulo: "Aprender a Amar a Nossa Própria Companhia", tema: "Biblioteca", url: "aprender-a-amar-a-nossa-propria-companhia.html" }
  ];

  function normalizar(texto) {
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  var campo = document.getElementById("campo-busca");
  var lista = document.getElementById("resultados-busca");

  if (campo && lista) {
    campo.addEventListener("input", function () {
      var termo = normalizar(campo.value.trim());
      lista.innerHTML = "";

      if (termo.length < 2) {
        lista.hidden = true;
        return;
      }

      var achados = ARTIGOS.filter(function (a) {
        return normalizar(a.titulo + " " + a.tema).indexOf(termo) !== -1;
      });

      if (achados.length === 0) {
        var vazio = document.createElement("li");
        vazio.className = "vazio";
        vazio.textContent = "Nenhum artigo encontrado.";
        lista.appendChild(vazio);
      } else {
        achados.forEach(function (a) {
          var li = document.createElement("li");
          var link = document.createElement("a");
          var tema = document.createElement("small");
          tema.textContent = a.tema;
          link.href = a.url;
          link.appendChild(tema);
          link.appendChild(document.createTextNode(a.titulo));
          li.appendChild(link);
          lista.appendChild(li);
        });
      }

      lista.hidden = false;
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".busca")) {
        lista.hidden = true;
      }
    });

    campo.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        lista.hidden = true;
        campo.blur();
      }
    });
  }
})();