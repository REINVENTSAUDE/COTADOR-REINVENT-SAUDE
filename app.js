const LIMITE_ORCAMENTOS = 2;
const ODONTO_POR_VIDA = 23.25;

const CIDADES_CFG = {
  fortaleza: { titulo: "Fortaleza", uf: "CE", odontoJaIncluso: false, arquivo: null },
  salvador:  { titulo: "Salvador",  uf: "BA", odontoJaIncluso: true,  arquivo: "./tabelas-salvador.js" }
};

let cidadeAtiva = "fortaleza";
let tabelasAtivas = window.TABELAS_FORTALEZA || {};

const tiposAtivos = new Set();
let selecionados = [];

const NOVIDADES_STORAGE_KEY = "hapvida_novidades_fechadas_v3";

/* ===== UI cidade ===== */
function atualizarUIcidade(){
  const cfg = CIDADES_CFG[cidadeAtiva] || CIDADES_CFG.fortaleza;

  const t = document.getElementById("cidadeTitulo");
  if(t) t.textContent = `${cfg.titulo} - ${cfg.uf}`;

  const bF = document.getElementById("btnFortaleza");
  const bS = document.getElementById("btnSalvador");
  if(bF) bF.classList.toggle("ativo", cidadeAtiva === "fortaleza");
  if(bS) bS.classList.toggle("ativo", cidadeAtiva === "salvador");
}

function resetarTudo(){
  tiposAtivos.clear();
  selecionados = [];

  const ta = document.getElementById("idades");
  if(ta) ta.value = "";

  const extras = document.getElementById("opcoesExtras");
  if(extras) extras.innerHTML = "";

  // limpa visuais
  document.querySelectorAll(".tipo").forEach(b=> b.classList.remove("ativo"));
  document.querySelectorAll(".opcao").forEach(b=>{
    b.classList.remove("ativo");
    b.classList.add("disabled");
  });

  limparResultado();
  atualizarOpcoesAtivas();
}

function limparResultado(){
  const r = document.getElementById("resultado");
  if(r) r.style.display = "none";
  const c = document.getElementById("orcamentosContainer");
  if(c) c.innerHTML = "";
  mostrarAjuda();
}

async function carregarScript(src){
  return new Promise((resolve, reject)=>{
    const s = document.createElement("script");
    s.src = src + (src.includes("?") ? "" : ("?v=" + Date.now()));
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Falha ao carregar: " + src));
    document.head.appendChild(s);
  });
}

async function setCidade(cidade){
  if(!CIDADES_CFG[cidade]) return;
  if(cidade === cidadeAtiva) return;

  cidadeAtiva = cidade;
  resetarTudo();
  atualizarUIcidade();

  if(cidadeAtiva === "salvador"){
    try{
      if(!window.TABELAS_SALVADOR){
        await carregarScript(CIDADES_CFG.salvador.arquivo);
      }
      tabelasAtivas = window.TABELAS_SALVADOR || {};
    }catch(e){
      alert("Não consegui carregar a tabela de Salvador. Confira se o arquivo 'tabelas-salvador.js' está na mesma pasta do index.html.");
      cidadeAtiva = "fortaleza";
      tabelasAtivas = window.TABELAS_FORTALEZA || {};
      atualizarUIcidade();
    }
  }else{
    tabelasAtivas = window.TABELAS_FORTALEZA || {};
  }
}

/* ===== novidades ===== */
function mostrarNovidades(){
  const box = document.getElementById("novidadesBox");
  if(!box) return;
  const fechado = localStorage.getItem(NOVIDADES_STORAGE_KEY) === "1";
  box.style.display = fechado ? "none" : "block";
}
function fecharNovidades(){
  const box = document.getElementById("novidadesBox");
  if(box) box.style.display = "none";
  try{ localStorage.setItem(NOVIDADES_STORAGE_KEY, "1"); }catch(e){}
}

/* ===== utils ===== */
function isMobileDevice(){
  const ua = navigator.userAgent || "";
  return /Android|iPhone|iPad|iPod/i.test(ua);
}

function dataHojeBR(){
  const d = new Date();
  const dd = String(d.getDate()).padStart(2,"0");
  const mm = String(d.getMonth()+1).padStart(2,"0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function formatarBR(valor){
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

let toastTimer = null;
function showToast(msg){
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> t.classList.remove("show"), 1600);
}

function esconderAjuda(){
  const ajuda = document.getElementById("ajudaPasso");
  if(ajuda) ajuda.style.display = "none";
}
function mostrarAjuda(){
  const ajuda = document.getElementById("ajudaPasso");
  if(ajuda) ajuda.style.display = "block";
}
function blurActive(){
  if (document.activeElement) document.activeElement.blur();
}

/* ===== logo fallback ===== */
function tentarCarregarLogo(){
  const candidatos = [
    "./logo-hapvida.png",
    "logo-hapvida.png",
    "./hapvida.png",
    "hapvida.png",
    "./img/hapvida.png",
    "img/hapvida.png",
    "./images/hapvida.png",
    "images/hapvida.png"
  ];

  const testar = (src) => new Promise((resolve) => {
    const t = new Image();
    t.onload = () => resolve({ ok:true, src });
    t.onerror = () => resolve({ ok:false, src });
    t.src = src + (src.includes("?") ? "" : ("?v=" + Date.now()));
  });

  (async () => {
    for(const src of candidatos){
      const r = await testar(src);
      if(r.ok){
        document.querySelectorAll(".logo-hapvida-img").forEach(img => { img.src = src; });
        return;
      }
    }
  })();
}

/* ===== nomes completos (para orçamento/imagem) ===== */
const nomesClienteBase = {
  ind_enf: "NOSSO PLANO ENFERMARIA COPARTICIPAÇÃO",
  ind_amb: "NOSSO PLANO AMBULATORIAL COPARTICIPAÇÃO",
  ind_apto:"NOSSO PLANO APARTAMENTO COPARTICIPAÇÃO",
  ss_enf:  "SUPER SIMPLES ENFERMARIA COPARTICIPAÇÃO",
  ss_amb:  "SUPER SIMPLES AMBULATORIAL COPARTICIPAÇÃO"
};

function isSuperSimples(tipo){
  return typeof tipo === "string" && tipo.startsWith("ss_");
}

function nomeClienteCompletoHTML(tipo, modo){
  let base = nomesClienteBase[tipo] || "";
  // no seu original você exibiu SS como empresarial no texto do cliente
  if(isSuperSimples(tipo)){
    base = base.replace(/^SUPER SIMPLES /, "PLANO EMPRESARIAL ");
  }
  const mod = (modo || "").toUpperCase();
  if(mod === "TOTAL"){
    return `${base} <span class="total-red">TOTAL</span>`;
  }
  return `${base} ${mod}`.trim();
}

/* ===== seleção ===== */
function atualizarCheckboxes(){
  const temIND = selecionados.some(s => !isSuperSimples(s.tipo));
  const temSS  = selecionados.some(s => isSuperSimples(s.tipo));

  const container = document.getElementById("opcoesExtras");
  container.innerHTML = "";

  if(!temIND && !temSS) return;

  container.insertAdjacentHTML("beforeend", `
    <label class="opt-label">
      <input type="checkbox" id="tabelaCompleta" />
      Tabela completa (por faixa etária - sem idades)
    </label>
  `);

  if(temIND){
    container.insertAdjacentHTML("beforeend", `
      <label class="opt-label">
        <input type="checkbox" id="familiar1grau" />
        Familiar 1º grau (5% sobre o valor)
      </label>
    `);
  }

  if(temSS){
    const odontoIncluso = !!(CIDADES_CFG[cidadeAtiva] && CIDADES_CFG[cidadeAtiva].odontoJaIncluso);
    if(!odontoIncluso){
      container.insertAdjacentHTML("beforeend", `
        <label class="opt-label">
          <input type="checkbox" id="odontoSS" />
          Odonto (somar R$ ${formatarBR(ODONTO_POR_VIDA)} por beneficiário)
        </label>
      `);
    }else{
      container.insertAdjacentHTML("beforeend", `
        <div class="opt-label" style="opacity:.85;">
          ✅ Odonto já incluso nos valores de Salvador
        </div>
      `);
    }
  }
}

function atualizarOpcoesAtivas(){
  document.querySelectorAll(".grupo-plano").forEach(grupo=>{
    const plan = grupo.dataset.plan;
    const tipoBtn = grupo.querySelector(".tipo");
    const ativo = tiposAtivos.has(plan);

    if(ativo) tipoBtn.classList.add("ativo");
    else tipoBtn.classList.remove("ativo");

    grupo.querySelectorAll(".opcao").forEach(op=>{
      if(ativo) op.classList.remove("disabled");
      else{
        op.classList.add("disabled");
        op.classList.remove("ativo");
      }
    });
  });

  document.querySelectorAll(".opcao").forEach(op=>{
    const tipo = op.dataset.plan;
    const modo = op.dataset.modo;
    const selected = selecionados.some(s => s.tipo===tipo && s.modo===modo);
    if(selected) op.classList.add("ativo");
    else op.classList.remove("ativo");
  });

  atualizarCheckboxes();
}

function toggleTipo(planKey){
  if(tiposAtivos.has(planKey)){
    tiposAtivos.delete(planKey);
    selecionados = selecionados.filter(s => s.tipo !== planKey);
    limparResultado();
    atualizarOpcoesAtivas();
    return;
  }
  tiposAtivos.add(planKey);
  limparResultado();
  atualizarOpcoesAtivas();
}

function toggleModo(btn){
  const tipo = btn.dataset.plan;
  const modo = btn.dataset.modo;

  if(!tiposAtivos.has(tipo) || btn.classList.contains("disabled")) return;

  const idx = selecionados.findIndex(s => s.tipo===tipo && s.modo===modo);

  if(idx >= 0){
    selecionados.splice(idx, 1);
    limparResultado();
    atualizarOpcoesAtivas();
    return;
  }

  if(selecionados.length >= LIMITE_ORCAMENTOS){
    showToast("Máximo de 2 orçamentos por vez.");
    return;
  }

  selecionados.push({ tipo, modo });
  limparResultado();
  atualizarOpcoesAtivas();
}

/* ===== cálculo ===== */
function parseIdades(){
  return document.getElementById("idades").value
    .split(",")
    .map(s => parseInt(s.trim(), 10))
    .filter(n => Number.isFinite(n));
}

function taxaAdesaoTexto(tipo, vidas){
  if(isSuperSimples(tipo)){
    return `Taxa de adesão: R$ 20,00 por beneficiário (R$ ${formatarBR(20*vidas)})`;
  }
  return `Taxa de adesão: R$ 35,00 por contrato`;
}

function colgroupHTML({ completa=false }){
  if(completa){
    return `
      <colgroup>
        <col style="width:46%;">
        <col style="width:27%;">
        <col style="width:27%;">
      </colgroup>
    `;
  }
  return `
    <colgroup>
      <col style="width:32%;">
      <col style="width:14%;">
      <col style="width:27%;">
      <col style="width:27%;">
    </colgroup>
  `;
}

function cabecalhoTabelaHTML({ completa=false, familiar=false }){
  const col3 = familiar ? "5%<br>Familiar" : "VALOR<br>Normal";
  return `
    <tr class="cab">
      <th>Faixa<br>Etária</th>
      ${completa ? "" : "<th>Idade</th>"}
      <th>${col3}</th>
      <th>15%<br>(3 meses)</th>
    </tr>
  `;
}

function corTabelaCompletaPorIndice(i){
  const n = (i % 6) + 1;
  return `tblc-${n}`;
}

function calcular(){
  blurActive();

  if(selecionados.length === 0){
    alert("Selecione até 2 orçamentos (tipo + parcial/total).");
    return;
  }

  esconderAjuda();

  const tabelaCompletaEl = document.getElementById("tabelaCompleta");
  const completa = tabelaCompletaEl ? tabelaCompletaEl.checked : false;

  const idades = completa ? [] : parseIdades();

  if(!completa && idades.length === 0){
    alert("Informe ao menos uma idade (ex: 23, 35, 62) ou marque 'Tabela completa'.");
    return;
  }

  if (typeof gtag === "function") {
    gtag("event", "orcamento_calculado", {
      cidade: cidadeAtiva,
      orcamentos_qtd: selecionados.length,
      modo_tabela: completa ? "completa" : "idades",
      promo_15: 1
    });
  }

  const familiarEl = document.getElementById("familiar1grau");
  const odontoEl   = document.getElementById("odontoSS");

  const familiarAtivo = (familiarEl) ? familiarEl.checked : false;

  // Odonto SS só se a cidade permitir (Fortaleza)
  const odontoPermitido = !CIDADES_CFG[cidadeAtiva].odontoJaIncluso;
  const odontoAtivo = (odontoEl && odontoPermitido) ? odontoEl.checked : false;

  const cont = document.getElementById("orcamentosContainer");
  cont.innerHTML = "";

  const cfg = CIDADES_CFG[cidadeAtiva];
  document.getElementById("linhaDataGeral").textContent =
    `Orçamento dia ${dataHojeBR()} — ${cfg.titulo} - ${cfg.uf}`;

  document.getElementById("resultado").style.display = "block";

  selecionados.forEach((sel, idx)=>{
    const chave = `${sel.tipo}_${sel.modo}`;
    const lista = tabelasAtivas[chave];
    if(!lista){
      alert("Tabela não encontrada para um dos planos selecionados (verifique a cidade/tabelas).");
      return;
    }

    const isSS = isSuperSimples(sel.tipo);
    const aplicarOdonto   = (isSS) && odontoAtivo;
    const aplicarFamiliar = (!isSS) && familiarAtivo;

    let totalNormal = 0;
    let total15 = 0;
    let total5 = 0;

    let rowsHTML = "";

    if(completa){
      lista.forEach(faixa=>{
        let vN = Number(faixa[3]) || 0;
        let v15 = Number(faixa[4]) || 0;

        if(aplicarOdonto){
          vN += ODONTO_POR_VIDA;
          v15 += ODONTO_POR_VIDA;
        }

        const v5 = vN * 0.95;

        rowsHTML += `
          <tr>
            <td>${faixa[0]}</td>
            <td>R$ ${formatarBR(aplicarFamiliar ? v5 : vN)}</td>
            <td>R$ ${formatarBR(v15)}</td>
          </tr>
        `;
      });
    } else {
      idades.forEach(idade=>{
        const faixa = lista.find(f => idade >= f[1] && idade <= f[2]);
        if(!faixa) return;

        let vN = Number(faixa[3]) || 0;
        let v15 = Number(faixa[4]) || 0;

        if(aplicarOdonto){
          vN += ODONTO_POR_VIDA;
          v15 += ODONTO_POR_VIDA;
        }

        const v5 = vN * 0.95;

        totalNormal += vN;
        total15 += v15;
        total5 += v5;

        rowsHTML += `
          <tr>
            <td>${faixa[0]}</td>
            <td>${idade}</td>
            <td>R$ ${formatarBR(aplicarFamiliar ? v5 : vN)}</td>
            <td>R$ ${formatarBR(v15)}</td>
          </tr>
        `;
      });
    }

    let totalHTML = "";
    if(!completa){
      if(aplicarFamiliar){
        totalHTML = `
          <div class="totais">
            <div>Total 5% Familiar: R$ ${formatarBR(total5)}</div>
            <div>Total 15% (3 meses): R$ ${formatarBR(total15)}</div>
          </div>
        `;
      } else {
        totalHTML = `
          <div class="totais">
            <div>Total normal: R$ ${formatarBR(totalNormal)}</div>
            <div>Total 15% (3 meses): R$ ${formatarBR(total15)}</div>
          </div>
        `;
      }
    }

    let odontoInfo = "";
    if(aplicarOdonto){
      if(completa){
        odontoInfo = `<div class="odonto-info">Odonto: R$ ${formatarBR(ODONTO_POR_VIDA)} por beneficiário — incluído no valor</div>`;
      } else {
        const totalOdonto = ODONTO_POR_VIDA * idades.length;
        odontoInfo = `<div class="odonto-info">Odonto: R$ ${formatarBR(ODONTO_POR_VIDA)} por beneficiário (R$ ${formatarBR(totalOdonto)}) — incluído nos valores</div>`;
      }
    }

    let familiarInfo = "";
    if(aplicarFamiliar){
      familiarInfo = `<div class="familiar-info">*Aplicado desconto de 5% para familiar de 1º grau</div>`;
    }

    let ssAviso = "";
    if(isSS){
      ssAviso = `<div class="ss-aviso">Condição empresarial: a partir de 2 vidas</div>`;
    }

    const nomeDentroTabelaHTML = nomeClienteCompletoHTML(sel.tipo, sel.modo);
    const taxa = completa ? "" : taxaAdesaoTexto(sel.tipo, idades.length);

    const classeCompleta = completa ? `tabela-completa ${corTabelaCompletaPorIndice(idx)}` : "";
    const colCount = completa ? 3 : 4;

    cont.insertAdjacentHTML("beforeend", `
      <div class="orcamento ${classeCompleta}">
        <div class="tabela-wrap">
          <table class="tabela-precos">
            ${colgroupHTML({ completa })}
            <thead>
              <tr class="titulo-tabela">
                <th colspan="${colCount}">${nomeDentroTabelaHTML}</th>
              </tr>
              ${cabecalhoTabelaHTML({ completa, familiar: aplicarFamiliar })}
            </thead>
            <tbody>
              ${rowsHTML}
            </tbody>
          </table>
        </div>

        ${ssAviso}
        ${completa ? "" : `<div class="taxa-adesao">${taxa}</div>`}
        ${totalHTML}
        ${odontoInfo}
        ${familiarInfo}
      </div>
    `);
  });

  setTimeout(() => {
    document.getElementById("ancoraResultado").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 200);
}

/* ===== gerar imagem ===== */
async function gerarImagem(modo = "share"){
  const area = document.getElementById("areaImagem");

  document.body.classList.add("capturando");
  await new Promise(r => requestAnimationFrame(() => r()));

  const canvas = await html2canvas(area, {
    backgroundColor: "#ffffff",
    useCORS: true,
    scale: 3
  });

  document.body.classList.remove("capturando");

  const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
  if(!blob){
    alert("Não foi possível gerar a imagem.");
    return;
  }

  const mobile = isMobileDevice();

  if(modo === "share" && mobile && navigator.share){
    const file = new File([blob], "orcamento_hapvida.png", { type:"image/png" });
    try{
      await navigator.share({ title: "Orçamento", files: [file] });
      return;
    }catch(e){
      return;
    }
  }

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "orcamento_hapvida.png";
  a.click();
  setTimeout(()=> URL.revokeObjectURL(a.href), 800);
}

async function gerarImagemDeElemento(elementId, fileName){
  const area = document.getElementById(elementId);
  if(!area){
    alert("Área não encontrada para gerar imagem.");
    return;
  }

  document.body.classList.add("capturando");
  await new Promise(r => requestAnimationFrame(() => r()));

  const canvas = await html2canvas(area, {
    backgroundColor: "#ffffff",
    useCORS: true,
    scale: 3
  });

  document.body.classList.remove("capturando");

  const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
  if(!blob){
    alert("Não foi possível gerar a imagem.");
    return;
  }

  const mobile = isMobileDevice();

  if(mobile && navigator.share){
    const file = new File([blob], fileName, { type:"image/png" });
    try{
      await navigator.share({ title: "Hapvida", files: [file] });
      return;
    }catch(e){
      return;
    }
  }

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = fileName;
  a.click();
  setTimeout(()=> URL.revokeObjectURL(a.href), 800);
}

/* ===== modal info ===== */
function abrirModalInfo(){
  const m = document.getElementById("modalInfo");
  if(m) m.style.display = "flex";

  const hoje = dataHojeBR();
  const d1 = document.getElementById("dataCopart");
  const d2 = document.getElementById("dataCarencias");
  if(d1) d1.textContent = hoje;
  if(d2) d2.textContent = hoje;
}

function fecharModalInfo(){
  const m = document.getElementById("modalInfo");
  if(m) m.style.display = "none";
}

function clicouForaModal(e){
  if(e.target && e.target.id === "modalInfo"){
    fecharModalInfo();
  }
}

async function compartilharInfo(tipo){
  fecharModalInfo();
  const alvoId = (tipo === "copart") ? "areaCopart" : "areaCarencias";
  const nome = (tipo === "copart") ? "coparticipacoes_hapvida.png" : "carencias_hapvida.png";
  await gerarImagemDeElemento(alvoId, nome);
}

/* ===== init ===== */
atualizarUIcidade();
atualizarOpcoesAtivas();
mostrarNovidades();
tentarCarregarLogo();
