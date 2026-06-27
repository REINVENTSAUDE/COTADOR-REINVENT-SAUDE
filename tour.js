(function(){
  var TOUR_KEY = "cotador_tour_v1";
  var STEPS = [
    { text: "👆 Escolha uma cidade",      selector: "#cidadeButtons",   dir: "right",  done: function(){ return !!document.querySelector("#cidadeButtons .opcao.ativo"); } },
    { text: "📋 Selecione o tipo de plano",selector: "#planosContainer",dir: "bottom", done: function(){ return !!document.querySelector(".cat-btn.ativo, .card-btn.ativo"); } },
    { text: "✅ Escolha Parcial ou Total", selector: ".grupo-plano",    dir: "bottom", done: function(){ return !!document.querySelector(".opcoes .opcao.ativo"); } },
    { text: "✏️ Informe as idades",        selector: "#idades",         dir: "right",  done: function(){
      var i = document.getElementById("idades");
      return (i && i.value.trim() !== "") || !!(document.getElementById("tabelaCompleta") && document.getElementById("tabelaCompleta").checked) || !!(document.getElementById("faixaEtaria") && document.getElementById("faixaEtaria").checked);
    } },
    { text: "🚀 Clique em Calcular",       selector: ".calcular",       dir: "left",   done: function(){
      var r = document.getElementById("resultado");
      return r && r.style.display === "block";
    } },
    { text: "📤 Compartilhe ou baixe o orçamento", selector: ".acoes-resultado", dir: "top", done: function(){ return false; } }
  ];

  var step = -1;
  var balloon = null;
  var checkTimer = null;
  var dismissed = false;

  try { dismissed = localStorage.getItem(TOUR_KEY) === "1"; } catch(e){}

  function setDir(d){
    if(!balloon) return;
    ["dir-right","dir-left","dir-top","dir-bottom"].forEach(function(c){ balloon.classList.remove(c); });
    if(d) balloon.classList.add("dir-"+d);
  }

  function tgl(visible){
    if(!balloon) return;
    if(visible) balloon.classList.add("show");
    else balloon.classList.remove("show");
  }

  function setPos(selector, dir){
    if(!balloon) return;
    var target = document.querySelector(selector);
    if(!target) return;
    var r = target.getBoundingClientRect();
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var balW = 290;
    var balH = 80;
    var gap = 14;

    balloon.style.left = "auto";
    balloon.style.right = "auto";
    balloon.style.top = "auto";
    balloon.style.bottom = "auto";

    if(vw < 768){
      var top = Math.max(16, Math.min(r.top + r.height/2 - balH/2, vh - balH - 16));
      balloon.style.right = "12px";
      balloon.style.top = top + "px";
      setDir("right");
      return;
    }

    if(dir === "right" && vw - (r.right + gap) >= balW){
      balloon.style.left = (r.right + gap) + "px";
      var top = Math.max(16, Math.min(r.top + r.height/2 - balH/2, vh - balH - 16));
      balloon.style.top = top + "px";
      setDir("right");
    }
    else if(dir === "left" && r.left - gap >= balW){
      balloon.style.right = (vw - r.left + gap) + "px";
      var top = Math.max(16, Math.min(r.top + r.height/2 - balH/2, vh - balH - 16));
      balloon.style.top = top + "px";
      setDir("left");
    }
    else if(dir === "bottom" && vh - (r.bottom + gap) >= balH){
      balloon.style.left = Math.max(16, Math.min(r.left + r.width/2 - balW/2, vw - balW - 16)) + "px";
      balloon.style.top = (r.bottom + gap) + "px";
      setDir("bottom");
    }
    else if(dir === "top" && r.top - gap >= balH){
      balloon.style.left = Math.max(16, Math.min(r.left + r.width/2 - balW/2, vw - balW - 16)) + "px";
      balloon.style.top = (r.top - balH - gap) + "px";
      setDir("top");
    }
    else {
      var top = Math.max(16, Math.min(r.top + r.height/2 - balH/2, vh - balH - 16));
      balloon.style.right = "12px";
      balloon.style.top = top + "px";
      setDir("right");
    }
  }

  function showStep(idx){
    if(dismissed) return;
    if(idx >= STEPS.length){
      tgl(false);
      return;
    }
    var s = STEPS[idx];
    step = idx;
    if(!balloon) return;
    balloon.querySelector(".tour-text").textContent = s.text;
    setPos(s.selector, s.dir);
    tgl(true);

    if(checkTimer) clearInterval(checkTimer);
    if(step < STEPS.length - 1){
      checkTimer = setInterval(function(){
        if(dismissed){ clearInterval(checkTimer); return; }
        for(var i = 0; i < step && i < STEPS.length - 1; i++){
          if(!STEPS[i].done()){
            clearInterval(checkTimer);
            setTimeout(function(){ showStep(i); }, 200);
            return;
          }
        }
        if(step < STEPS.length - 1 && STEPS[step].done()){
          clearInterval(checkTimer);
          setTimeout(function(){ showStep(step + 1); }, 600);
        }
      }, 400);
    }
  }

  function closeTour(){
    dismissed = true;
    try { localStorage.setItem(TOUR_KEY, "1"); } catch(e){}
    if(checkTimer) clearInterval(checkTimer);
    if(balloon){
      balloon.classList.remove("show");
      setTimeout(function(){ if(balloon && balloon.parentNode) balloon.parentNode.removeChild(balloon); }, 300);
    }
  }

  function createBalloon(){
    if(balloon) return;
    balloon = document.createElement("div");
    balloon.className = "tour-balloon";
    var inner = document.createElement("div");
    inner.className = "tour-inner";
    inner.innerHTML = '<button class="tour-close" type="button">✕</button><div class="tour-text"></div>';
    balloon.appendChild(inner);
    balloon.querySelector(".tour-close").addEventListener("click", closeTour);
    document.body.appendChild(balloon);
  }

  function init(){
    if(dismissed) return;
    setTimeout(function(){
      createBalloon();
      showStep(0);

      document.addEventListener("click", function(){
        if(dismissed) return;
        if(step >= 0 && step < STEPS.length && STEPS[step].done()){
          if(checkTimer) clearInterval(checkTimer);
          setTimeout(function(){ showStep(step + 1); }, 600);
        }
      }, true);

      document.addEventListener("input", function(e){
        if(dismissed) return;
        if(e.target && e.target.id === "idades" && step >= 0 && step < STEPS.length && STEPS[step].done()){
          if(checkTimer) clearInterval(checkTimer);
          setTimeout(function(){ showStep(step + 1); }, 600);
        }
      }, true);
    }, 300);
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
