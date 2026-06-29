(function(){
  var TOUR_KEY = "cotador_tour_v1";
  var STEPS = [
    { hl: "#cidadeButtons",   done: function(){ return !!document.querySelector("#cidadeButtons .opcao.ativo"); } },
    { hl: "#planosContainer", done: function(){ return !!document.querySelector(".cat-btn.ativo, .card-btn.ativo"); } },
    { hl: ".opcoes",          done: function(){ return !!document.querySelector(".opcoes .opcao.ativo"); } },
    { hl: ["#idades", ".calcular", "#opcoesExtras"], done: function(){
      var r = document.getElementById("resultado");
      return r && r.style.display === "block";
    } },
    { hl: ".acoes-resultado", done: function(){ return false; } }
  ];

  var step = -1;
  var checkTimer = null;
  var dismissed = false;

  try { dismissed = localStorage.getItem(TOUR_KEY) === "1"; } catch(e){}

  function clearHL(){
    var els = document.querySelectorAll(".tour-highlight");
    for(var i = 0; i < els.length; i++) els[i].classList.remove("tour-highlight");
  }

  function addHL(sel){
    if(!sel) return;
    if(Array.isArray(sel)){
      for(var k = 0; k < sel.length; k++) addHL(sel[k]);
      return;
    }
    var els = document.querySelectorAll(sel);
    for(var i = 0; i < els.length; i++) els[i].classList.add("tour-highlight");
  }

  function showStep(idx){
    if(dismissed) return;
    if(idx >= STEPS.length){
      clearHL();
      return;
    }
    var s = STEPS[idx];
    step = idx;
    clearHL();
    void document.documentElement.offsetHeight;
    addHL(s.hl);

    if(checkTimer) clearInterval(checkTimer);
    checkTimer = setInterval(function(){
      if(dismissed){ clearInterval(checkTimer); return; }

      for(var i = 0; i < step && i < STEPS.length; i++){
        if(!STEPS[i].done()){
          clearInterval(checkTimer);
          setTimeout(function(){ showStep(i); }, 200);
          return;
        }
      }

      if(step < STEPS.length - 1 && STEPS[step].done()){
        clearInterval(checkTimer);
        setTimeout(function(){ showStep(step + 1); }, 300);
      }
    }, 400);
  }

  function stopTour(){
    dismissed = true;
    try { localStorage.setItem(TOUR_KEY, "1"); } catch(e){}
    if(checkTimer) clearInterval(checkTimer);
    clearHL();
  }

  function init(){
    if(dismissed) return;
    setTimeout(function(){
      showStep(0);

      document.addEventListener("click", function(e){
        if(dismissed) return;
        if(step >= 0 && step < STEPS.length - 1 && STEPS[step].done()){
          var t = e.target;
          if(t && (t.id === "compararCheckbox" || t.closest(".comparar-toggle"))) return;
          if(checkTimer) clearInterval(checkTimer);
          setTimeout(function(){ showStep(step + 1); }, 300);
        }
      }, true);

      document.addEventListener("input", function(e){
        if(dismissed) return;
        if(e.target && e.target.id === "idades" && step >= 0 && step < STEPS.length - 1 && STEPS[step].done()){
          if(checkTimer) clearInterval(checkTimer);
          setTimeout(function(){ showStep(step + 1); }, 300);
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
