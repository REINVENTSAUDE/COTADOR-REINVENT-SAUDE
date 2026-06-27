const LIMITE_ORCAMENTOS = 2;
const ODONTO_SS = 23.25;
const ODONTO_INCLUSAO_BOLETO = 23.90;
const ODONTO_PME = 14.87;
const ODONTO_AFFIX = 23.95;
const TAXA_CONTRATO = 35;
const TAXA_VIDA = 20;

const NOVIDADES_STORAGE_KEY = "hapvida_novidades_fechadas_v4";

const PLANO_LABELS = {
  ind: "NOSSO PLANO – INDIVIDUAL",
  ss: "NOSSO PLANO – EMPRESARIAL",
  pme: "NOSSO PLANO – EMPRESARIAL",
  affix: "AFFIX FECOMÉRCIO"
};

const PRODUTO_LABELS = {
  amb: "AMBULATORIAL",
  enf: "ENFERMARIA",
  apto: "APARTAMENTO",
  mix_enf: "MIX ENFERMARIA",
  mix_apto: "MIX APARTAMENTO"
};

const PRODUTO_PLAN_KEYS = {
  amb: "amb",
  enf: "enf",
  apto: "apto",
  mix_enf: "mix_enf",
  mix_apto: "mix_apto"
};

const CIDADES_CFG = {
  fortaleza:       { titulo: "Fortaleza", uf: "CE", planos: { ind:['amb','enf','apto','mix_enf','mix_apto'], ss:['amb','enf','apto'], pme:['amb','enf','apto'], affix:['amb','enf','apto'] }, temDados: true },
  salvador:        { titulo: "Salvador", uf: "BA", planos: { ind:['amb','enf','apto','mix_enf','mix_apto'], ss:['amb','enf','apto'], pme:['amb','enf','apto'] }, temDados: true },
  belem:           { titulo: "Belém", uf: "PA", planos: { ind:['amb','enf','apto','mix_enf','mix_apto'], ss:['amb','enf','apto'], pme:['amb','enf','apto'] }, temDados: true },
  belo_horizonte:  { titulo: "Belo Horizonte", uf: "MG", planos: { ind:['amb','enf','apto'], ss:['amb','enf','apto'], pme:['amb','enf','apto'] }, temDados: true },
  curitiba:        { titulo: "Curitiba", uf: "PR", planos: { ind:['amb','enf','apto'], ss:['amb','enf','apto'], pme:['amb','enf','apto'] }, temDados: true },
  goiania:         { titulo: "Goiânia", uf: "GO", planos: { ind:['amb','enf','apto'], ss:['enf','apto'], pme:['enf','apto'] }, temDados: true },
  juazeiro_do_norte: { titulo: "Juazeiro do Norte", uf: "CE", planos: { ind:['amb','enf','apto'], ss:['amb','enf','apto'], pme:['amb','enf','apto'] }, temDados: true },
  manaus:          { titulo: "Manaus", uf: "AM", planos: { ind:['amb','enf','apto','mix_enf','mix_apto'], ss:['amb','enf','apto'], pme:['amb','enf','apto'] }, temDados: true },
  recife:          { titulo: "Recife", uf: "PE", planos: { ind:['amb','enf','apto','mix_enf','mix_apto'], ss:['amb','enf','apto'], pme:['amb','enf','apto'] }, temDados: true },
  sao_luis:        { titulo: "São Luís", uf: "MA", planos: { ind:['amb','enf','apto'], ss:['amb','enf','apto'], pme:['amb','enf','apto'] }, temDados: true },
  uberaba:         { titulo: "Uberaba", uf: "MG", planos: { ind:['amb','enf','apto'], ss:['amb','enf','apto'], pme:['amb','enf','apto'] }, temDados: true },
  uberlandia:      { titulo: "Uberlândia", uf: "MG", planos: { ind:['amb','enf','apto'], ss:['amb','enf','apto'], pme:['amb','enf','apto'] }, temDados: true },
  sao_paulo:       { titulo: "São Paulo", uf: "SP", planos: null, temDados: false },
  natal:           { titulo: "Natal", uf: "RN", planos: null, temDados: false }
};

window.AFFIX_TABELAS = {
  affix_amb_parcial: [
    ["0 a 18",0,18,143.36,121.86],
    ["19 a 23",19,23,160.56,136.48],
    ["24 a 28",24,28,179.83,152.86],
    ["29 a 33",29,33,206.80,175.78],
    ["34 a 38",34,38,237.82,202.15],
    ["39 a 43",39,43,283.01,240.56],
    ["44 a 48",44,48,353.76,300.70],
    ["49 a 53",49,53,442.20,375.87],
    ["54 a 58",54,58,751.74,638.98],
    ["59+",59,200,841.95,715.66]
  ],
  affix_amb_total: [
    ["0 a 18",0,18,105.85,89.97],
    ["19 a 23",19,23,118.55,100.77],
    ["24 a 28",24,28,132.78,112.86],
    ["29 a 33",29,33,152.70,129.80],
    ["34 a 38",34,38,175.61,149.27],
    ["39 a 43",39,43,208.98,177.63],
    ["44 a 48",44,48,261.23,222.05],
    ["49 a 53",49,53,326.54,277.56],
    ["54 a 58",54,58,555.12,471.85],
    ["59+",59,200,621.73,528.47]
  ],
  affix_enf_parcial: [
    ["0 a 18",0,18,193.39,164.38],
    ["19 a 23",19,23,216.60,184.11],
    ["24 a 28",24,28,242.59,206.20],
    ["29 a 33",29,33,278.98,237.13],
    ["34 a 38",34,38,320.83,272.71],
    ["39 a 43",39,43,381.79,324.52],
    ["44 a 48",44,48,477.24,405.65],
    ["49 a 53",49,53,596.55,507.07],
    ["54 a 58",54,58,1014.14,862.02],
    ["59+",59,200,1135.84,965.46]
  ],
  affix_enf_total: [
    ["0 a 18",0,18,151.12,128.45],
    ["19 a 23",19,23,169.25,143.86],
    ["24 a 28",24,28,189.56,161.13],
    ["29 a 33",29,33,217.99,185.29],
    ["34 a 38",34,38,250.69,213.09],
    ["39 a 43",39,43,298.32,253.57],
    ["44 a 48",44,48,372.90,316.97],
    ["49 a 53",49,53,466.13,396.21],
    ["54 a 58",54,58,792.42,673.56],
    ["59+",59,200,887.51,754.38]
  ],
  affix_apto_parcial: [
    ["0 a 18",0,18,289.34,245.94],
    ["19 a 23",19,23,324.06,275.45],
    ["24 a 28",24,28,362.95,308.51],
    ["29 a 33",29,33,417.39,354.78],
    ["34 a 38",34,38,480.00,408.00],
    ["39 a 43",39,43,571.20,485.52],
    ["44 a 48",44,48,714.00,606.90],
    ["49 a 53",49,53,892.50,758.63],
    ["54 a 58",54,58,1517.25,1289.66],
    ["59+",59,200,1699.32,1444.42]
  ],
  affix_apto_total: [
    ["0 a 18",0,18,225.91,192.02],
    ["19 a 23",19,23,253.02,215.07],
    ["24 a 28",24,28,283.38,240.87],
    ["29 a 33",29,33,325.89,277.01],
    ["34 a 38",34,38,374.77,318.55],
    ["39 a 43",39,43,445.98,379.08],
    ["44 a 48",44,48,557.48,473.86],
    ["49 a 53",49,53,696.85,592.32],
    ["54 a 58",54,58,1184.65,1006.95],
    ["59+",59,200,1326.81,1127.79]
  ]
};

const OUTRAS_CIDADES = [
  { key: 'belo_horizonte', label: 'Belo Horizonte' },
  { key: 'curitiba', label: 'Curitiba' },
  { key: 'juazeiro_do_norte', label: 'Juazeiro do Norte' },
  { key: 'manaus', label: 'Manaus' },
  { key: 'recife', label: 'Recife' },
  { key: 'sao_luis', label: 'São Luís' },
  { key: 'uberaba', label: 'Uberaba' },
  { key: 'uberlandia', label: 'Uberlândia' }
].sort((a,b) => a.label.localeCompare(b.label));

let cidadeAtiva = "fortaleza";
let tabelasAtivas = {};
const tiposAtivos = new Set();
let selecionados = [];
let faixaMode = false;
let faixaCounts = [];

/* =======================
   UTIL
======================= */
function formatarBR(valor){
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function dataHojeBR(){
  const d = new Date();
  const dd = String(d.getDate()).padStart(2,"0");
  const mm = String(d.getMonth()+1).padStart(2,"0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function isMobileDevice(){
  const ua = navigator.userAgent || "";
  return /Android|iPhone|iPad|iPod/i.test(ua);
}

function getIOSShareInfo(){
  const ua = navigator.userAgent || "";
  return {
    isIOS: /iPhone|iPad|iPod/i.test(ua),
    isChromeIOS: /CriOS/i.test(ua)
  };
}

let toastTimer = null;
function showToast(msg){
  const t = document.getElementById("toast");
  if(!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 1600);
}

function esconderAjuda(){
  const ajuda = document.getElementById("ajudaPasso");
  if(ajuda) ajuda.style.display = "none";
}

function mostrarAjuda(){
  const ajuda = document.getElementById("ajudaPasso");
  if(ajuda) ajuda.style.display = "block";
}

function limparResultado(){
  const r = document.getElementById("resultado");
  if(r) r.style.display = "none";
  const c = document.getElementById("orcamentosContainer");
  if(c) c.innerHTML = "";
  mostrarAjuda();
}

function blurActive(){
  if(document.activeElement) document.activeElement.blur();
}

/* =======================
   FALLBACK LOGO
======================= */
function tentarCarregarLogo(){
  const candidatos = [
    "./logo-hapvida (1).png",
    "./logo-hapvida.png",
    "logo-hapvida.png",
    "./hapvida.png",
    "hapvida.png",
    "./img/hapvida.png",
    "img/hapvida.png"
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
        document.querySelectorAll(".logo-hapvida-img").forEach(img => {
          img.src = src;
        });
        return;
      }
    }
  })();
}

/* =======================
   NOVIDADES
======================= */
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

/* =======================
   NOMES COMPLETOS
======================= */
const nomesClienteBase = {
  ind_amb: "PLANO INDIVIDUAL AMBULATORIAL COM COPARTICIPAÇÃO",
  ind_enf: "PLANO INDIVIDUAL ENFERMARIA COM COPARTICIPAÇÃO",
  ind_apto: "PLANO INDIVIDUAL APARTAMENTO COM COPARTICIPAÇÃO",
  ind_mix_enf: "PLANO INDIVIDUAL MIX ENFERMARIA COM COPARTICIPAÇÃO",
  ind_mix_apto: "PLANO INDIVIDUAL MIX APARTAMENTO COM COPARTICIPAÇÃO",
  ss_amb: "PLANO EMPRESARIAL AMBULATORIAL COM COPARTICIPAÇÃO",
  ss_enf: "PLANO EMPRESARIAL ENFERMARIA COM COPARTICIPAÇÃO",
  ss_apto: "PLANO EMPRESARIAL APARTAMENTO COM COPARTICIPAÇÃO",
  pme_amb: "PLANO EMPRESARIAL PME AMBULATORIAL COM COPARTICIPAÇÃO",
  pme_enf: "PLANO EMPRESARIAL PME ENFERMARIA COM COPARTICIPAÇÃO",
  pme_apto: "PLANO EMPRESARIAL PME APARTAMENTO COM COPARTICIPAÇÃO",
  affix_amb: "PLANO AFFIX FECOMÉRCIO AMBULATORIAL COM COPARTICIPAÇÃO",
  affix_enf: "PLANO AFFIX FECOMÉRCIO ENFERMARIA COM COPARTICIPAÇÃO",
  affix_apto: "PLANO AFFIX FECOMÉRCIO APARTAMENTO COM COPARTICIPAÇÃO"
};

function isEmpresarial(tipo){
  return typeof tipo === "string" && (tipo.startsWith("ss_") || tipo.startsWith("pme_") || tipo.startsWith("affix_"));
}

function isIndividual(tipo){
  return typeof tipo === "string" && tipo.startsWith("ind_");
}

function getPlanGroup(tipo){
  if (tipo.startsWith("ind_")) return "ind";
  if (tipo.startsWith("ss_")) return "ss";
  if (tipo.startsWith("pme_")) return "pme";
  if (tipo.startsWith("affix_")) return "affix";
  return "";
}

function nomeClienteCompletoHTML(tipo, modo){
  let base = nomesClienteBase[tipo] || "";
  const mod = (modo || "").toUpperCase();
  if(mod === "TOTAL"){
    return `${base} <span class="total-red">TOTAL</span>`;
  }
  return `${base} ${mod}`.trim();
}

/* =======================
   CIDADE BOTOES
======================= */
function construirBotoesCidade(){
  const wrap = document.getElementById("cidadeButtons");
  if(!wrap) return;
  wrap.innerHTML = "";

  const isMobile = window.innerWidth <= 600;
  const fixas = [
    { key:'fortaleza', label:'Fortaleza' },
    { key:'salvador', label:'Salvador' },
    { key:'belem', label:'Belém' },
    { key:'goiania', label:'Goiânia' },
    { key:'sao_paulo', label:'São Paulo', semDados:true }
  ];
  if (!isMobile) fixas.push({ key:'natal', label:'Natal', semDados:true });

  fixas.forEach(c => {
    const semDados = !CIDADES_CFG[c.key] || !CIDADES_CFG[c.key].temDados;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "opcao" + (cidadeAtiva === c.key ? " ativo" : "");
    btn.textContent = c.label;
    btn.dataset.cidade = c.key;
    if (semDados) {
      btn.disabled = true;
      btn.title = "Em breve";
      btn.style.opacity = "0.4";
    }
    btn.addEventListener("click", () => setCidade(c.key));
    wrap.appendChild(btn);
  });

  const outrasWrap = document.createElement("div");
  outrasWrap.className = "cidade-outras-wrap";

  const btnOutras = document.createElement("button");
  btnOutras.type = "button";
  btnOutras.className = "opcao";
  btnOutras.id = "btnOutrasCidades";
  btnOutras.textContent = "Outras Cidades ▾";
  btnOutras.addEventListener("click", () => {
    const dd = document.getElementById("outrasDropdown");
    if (dd) dd.classList.toggle("show");
  });
  outrasWrap.appendChild(btnOutras);

  const dropdown = document.createElement("div");
  dropdown.className = "cidade-outras-dropdown";
  dropdown.id = "outrasDropdown";

  const dropdownItems = [...OUTRAS_CIDADES];
  if (isMobile) dropdownItems.push({ key:'natal', label:'Natal' });

  dropdownItems.forEach(c => {
    const a = document.createElement("button");
    a.type = "button";
    a.textContent = c.label;
    a.className = cidadeAtiva === c.key ? "ativo" : "";
    a.addEventListener("click", () => {
      setCidade(c.key);
      dropdown.classList.remove("show");
    });
    dropdown.appendChild(a);
  });

  outrasWrap.appendChild(dropdown);
  wrap.appendChild(outrasWrap);

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".cidade-outras-wrap")) {
      if (dropdown) dropdown.classList.remove("show");
    }
  });
}

/* =======================
   CATEGORIAS DE PLANOS
======================= */
const CATEGORIAS = [
  { key: 'ind', label: 'INDIVIDUAL' },
  { key: 'ss', label: 'EMPRESARIAL<br>02 A 29 VIDAS' },
  { key: 'pme', label: 'EMPRESARIAL<br>30 A 99 VIDAS' },
  { key: 'mix', label: 'MIX' },
  { key: 'affix', label: 'AFFIX<br>FECOMÉRCIO' }
];

const categoriasAtivas = new Set();

function toggleCategoria(catKey){
  // Toggle off if already active
  if (categoriasAtivas.has(catKey)) {
    categoriasAtivas.delete(catKey);
    const planos = getPlanosCategoria(catKey);
    planos.forEach(p => {
      tiposAtivos.delete(p.key);
      selecionados = selecionados.filter(s => s.tipo !== p.key);
    });
  } else {
    // Deactivate all other categories
    categoriasAtivas.forEach(otherKey => {
      const planos = getPlanosCategoria(otherKey);
      planos.forEach(p => {
        tiposAtivos.delete(p.key);
        selecionados = selecionados.filter(s => s.tipo !== p.key);
      });
    });
    categoriasAtivas.clear();
    categoriasAtivas.add(catKey);
  }
  limparResultado();
  construirBotoesPlanos();
  atualizarOpcoesAtivas();
}

function getPlanosCategoria(catKey){
  const cfg = CIDADES_CFG[cidadeAtiva];
  if (!cfg || !cfg.planos) return [];
  if (catKey === 'mix') {
    const produtos = cfg.planos.ind || [];
    return produtos.filter(p => p === 'mix_enf' || p === 'mix_apto').map(p => ({ key: `ind_${p}`, label: PRODUTO_LABELS[p] || p.toUpperCase(), isMix: true }));
  }
  if (catKey === 'affix') {
    const produtos = cfg.planos.affix || [];
    return produtos.map(p => ({ key: `affix_${p}`, label: PRODUTO_LABELS[p] || p.toUpperCase(), isMix: false }));
  }
  const produtos = cfg.planos[catKey] || [];
  return produtos.filter(p => p !== 'mix_enf' && p !== 'mix_apto').map(p => ({ key: `${catKey}_${p}`, label: PRODUTO_LABELS[p] || p.toUpperCase(), isMix: false }));
}

function getCategoriasDisponiveis(){
  const cfg = CIDADES_CFG[cidadeAtiva];
  if (!cfg || !cfg.planos) return [];
  const disp = [];
  CATEGORIAS.forEach(c => {
    if (c.key === 'mix') {
      const hasMix = (cfg.planos.ind || []).some(p => p === 'mix_enf' || p === 'mix_apto');
      if (hasMix) disp.push(c);
    } else if (c.key === 'affix') {
      const prods = cfg.planos.affix || [];
      if (prods.length > 0) disp.push(c);
    } else {
      const prods = cfg.planos[c.key] || [];
      const nonMix = prods.filter(p => p !== 'mix_enf' && p !== 'mix_apto');
      if (nonMix.length > 0) disp.push(c);
    }
  });
  return disp;
}

/* =======================
   BOTOES PLANOS DINAMICOS
======================= */
function construirBotoesPlanos(){
  const container = document.getElementById("planosContainer");
  if (!container) return;

  const cfg = CIDADES_CFG[cidadeAtiva];
  if (!cfg || !cfg.planos) {
    container.innerHTML = "<div class='sem-dados'>Tabela indisponível para esta cidade</div>";
    return;
  }

  const cats = getCategoriasDisponiveis();

  // Render category cards
  let html = '<div class="categorias-wrap">';

  // Card 1: NOSSO PLANO (IND, SS, PME)
  const nossoPlanoCats = cats.filter(c => c.key !== 'mix' && c.key !== 'affix');
  if (nossoPlanoCats.length > 0) {
    html += '<div class="cat-card nosso-plano-card">';
    html += '<div class="cat-card-title">NOSSO PLANO</div>';
    html += '<div class="nosso-plano-buttons">';
    nossoPlanoCats.forEach(c => {
      const ativa = categoriasAtivas.has(c.key);
      html += `<button type="button" class="cat-btn${ativa ? ' ativo' : ''}" data-cat="${c.key}" onclick="toggleCategoria('${c.key}')">${c.label}</button>`;
    });
    html += '</div></div>';
  }

  // Card 2: MIX
  const mixCat = cats.find(c => c.key === 'mix');
  if (mixCat) {
    const ativa = categoriasAtivas.has(mixCat.key);
    html += `<button type="button" class="cat-card card-btn mix-card${ativa ? ' ativo' : ''}" onclick="toggleCategoria('${mixCat.key}')">
      <div class="cat-card-title">MIX</div>
      <div class="card-btn-label">MIX<br>INDIVIDUAL</div>
    </button>`;
  }

  // Card 3: AFFIX
  const affixCat = cats.find(c => c.key === 'affix');
  if (affixCat) {
    const ativa = categoriasAtivas.has(affixCat.key);
    html += `<button type="button" class="cat-card card-btn affix-card${ativa ? ' ativo' : ''}" onclick="toggleCategoria('${affixCat.key}')">
      <div class="cat-card-title">AFFIX</div>
      <div class="card-btn-label">AFFIX<br>FECOMÉRCIO</div>
    </button>`;
  }

  html += '</div>';

  // Render sub-plan groups for active categories
  html += '<div class="planos-sub">';
  cats.forEach(c => {
    if (!categoriasAtivas.has(c.key)) return;
    const planos = getPlanosCategoria(c.key);
    planos.forEach(p => {
      const ativo = tiposAtivos.has(p.key);
      html += `<div class="grupo-plano${ativo ? ' ativo-linha' : ''}" data-plan="${p.key}" onclick="toggleTipo('${p.key}')">
        <div class="tipo${ativo ? ' ativo' : ''}">${p.label}</div>
        <div class="opcoes" onclick="event.stopPropagation()">`;
      if (p.isMix) {
        html += `<button type="button" class="opcao disabled" data-plan="${p.key}" data-modo="parcial" onclick="clicarNoModo(this)">PARCIAL</button>`;
      } else {
        html += `<button type="button" class="opcao disabled" data-plan="${p.key}" data-modo="parcial" onclick="clicarNoModo(this)">PARCIAL</button>
          <button type="button" class="opcao disabled" data-plan="${p.key}" data-modo="total" onclick="clicarNoModo(this)">TOTAL</button>`;
      }
      html += `</div></div>`;
    });
  });
  html += '</div>';

  container.innerHTML = html;
}

/* =======================
   CIDADE
======================= */
function atualizarUIcidade(){
  const cfg = CIDADES_CFG[cidadeAtiva] || CIDADES_CFG.fortaleza;
  const titulo = document.getElementById("cidadeTitulo");
  if(titulo) titulo.textContent = `${cfg.titulo} - ${cfg.uf}`;

  document.querySelectorAll("#cidadeButtons .opcao[data-cidade]").forEach(btn => {
    btn.classList.toggle("ativo", btn.dataset.cidade === cidadeAtiva);
  });

  // Highlight "Outras Cidades" button when a dropdown city is selected
  const isOutra = OUTRAS_CIDADES.some(c => c.key === cidadeAtiva);
  const btnOutras = document.getElementById("btnOutrasCidades");
  if (btnOutras) {
    btnOutras.classList.toggle("ativo", isOutra);
  }

  categoriasAtivas.clear();

  construirBotoesPlanos();
  resetarSelecoesPlanos();
}

function resetarSelecoesPlanos(){
  tiposAtivos.clear();
  selecionados = [];
  faixaMode = false;
  faixaCounts = [];
  const ta = document.getElementById("idades");
  if(ta) ta.value = "";
  const fc = document.getElementById("faixaContainer");
  if(fc) { fc.innerHTML = ""; fc.style.display = "none"; }
  const extras = document.getElementById("opcoesExtras");
  if(extras) extras.innerHTML = "";
  document.querySelectorAll(".grupo-plano .tipo").forEach(b => b.classList.remove("ativo"));
  document.querySelectorAll(".grupo-plano .opcao[data-plan][data-modo]").forEach(b => {
    b.classList.remove("ativo");
    b.classList.add("disabled");
  });
  limparResultado();
  atualizarOpcoesAtivas();
}

async function setCidade(cidade){
  if(!CIDADES_CFG[cidade]) return;
  if(cidade === cidadeAtiva) return;

  const cfg = CIDADES_CFG[cidade];
  if(!cfg.temDados) {
    showToast("Cidade em breve disponível");
    return;
  }

  cidadeAtiva = cidade;
  tabelasAtivas = window.DADOS_CIDADES && window.DADOS_CIDADES[cidade]
    ? window.DADOS_CIDADES[cidade].tabelas
    : {};

  // Update "Outras Cidades" button text to show selected city
  const isOutra = OUTRAS_CIDADES.some(c => c.key === cidade);
  const btnOutras = document.getElementById("btnOutrasCidades");
  if (btnOutras) {
    if (isOutra) {
      const cfg = CIDADES_CFG[cidade];
      btnOutras.textContent = `${cfg.titulo} ▾`;
    } else {
      btnOutras.textContent = "Outras Cidades ▾";
    }
  }

  atualizarUIcidade();
}

/* =======================
   CHECKBOXES / PLANOS
======================= */
function atualizarCheckboxes(){
  const temIND = selecionados.some(s => isIndividual(s.tipo));
  const temSS = selecionados.some(s => s.tipo.startsWith("ss_"));
  const temPME = selecionados.some(s => s.tipo.startsWith("pme_"));
  const temAFFIX = selecionados.some(s => s.tipo.startsWith("affix_"));
  const temEmp = temSS || temPME || temAFFIX;

  // Auto faixa mode for PME (30-99 vidas), hide textarea
  const idadesWrap = document.getElementById("idades");
  if(idadesWrap) idadesWrap.style.display = temPME ? "none" : "";

  // Reset faixa mode when no empresarial plans are active
  if(!temEmp){
    faixaMode = false;
    const fc = document.getElementById("faixaContainer");
    if(fc) { fc.innerHTML = ""; fc.style.display = "none"; }
  }

  const container = document.getElementById("opcoesExtras");
  if(!container) return;
  container.innerHTML = "";

  if(!temIND && !temSS && !temPME && !temAFFIX) return;

  container.insertAdjacentHTML("beforeend", `
    <label class="opt-label">
      <input type="checkbox" id="tabelaCompleta" />
      Tabela completa (por faixa etária - sem idades)
    </label>
  `);

  if(temEmp && !temPME){
    container.insertAdjacentHTML("beforeend", `
      <label class="opt-label">
        <input type="checkbox" id="faixaEtaria" />
        Por faixa etária (não preencher idades)
      </label>
    `);
  }

  if(temIND){
    container.insertAdjacentHTML("beforeend", `
      <label class="opt-label">
        <input type="checkbox" id="familiar1grau" />
        Familiar 1º grau (5% sobre o valor)
      </label>
    `);
  }

  if(temSS){
    container.insertAdjacentHTML("beforeend", `
      <label class="opt-label">
        <input type="checkbox" id="odontoSS" />
        Odonto (somar R$ ${formatarBR(ODONTO_SS)} por beneficiário)
      </label>
    `);
    container.insertAdjacentHTML("beforeend", `
      <label class="opt-label">
        <input type="checkbox" id="odontoInclusaoBoleto" />
        Odonto (inclusão - boleto separado) R$ ${formatarBR(ODONTO_INCLUSAO_BOLETO)} por beneficiário
      </label>
    `);
  }

  if(temPME){
    container.insertAdjacentHTML("beforeend", `
      <label class="opt-label">
        <input type="checkbox" id="odontoPME" />
        Odonto (somar R$ ${formatarBR(ODONTO_PME)} por beneficiário)
      </label>
    `);
  }

  if(temAFFIX){
    container.insertAdjacentHTML("beforeend", `
      <label class="opt-label">
        <input type="checkbox" id="odontoAffix" />
        Odonto (somar R$ ${formatarBR(ODONTO_AFFIX)} por beneficiário)
      </label>
    `);
  }

  // Auto faixa mode for PME — render counters immediately
  if(temPME){
    faixaMode = true;
    renderizarFaixaCounters();
  }

  const tc = document.getElementById("tabelaCompleta");
  if(tc) tc.addEventListener("change", () => {
    limparResultado();
    if (tc.checked) {
      if (temPME) {
        faixaMode = false;
        const fc = document.getElementById("faixaContainer");
        if(fc) fc.style.display = "none";
      } else {
        const fe = document.getElementById("faixaEtaria");
        if (fe) { fe.checked = false; faixaMode = false; }
        const fc = document.getElementById("faixaContainer");
        if(fc) fc.style.display = "none";
      }
    } else {
      if (temPME) {
        faixaMode = true;
        renderizarFaixaCounters();
      }
    }
  });
  const fe = document.getElementById("faixaEtaria");
  if(fe) fe.addEventListener("change", () => {
    faixaMode = fe.checked;
    if (faixaMode) {
      const tc2 = document.getElementById("tabelaCompleta");
      if (tc2) tc2.checked = false;
      renderizarFaixaCounters();
    } else {
      document.getElementById("faixaContainer").style.display = "none";
    }
    limparResultado();
  });
  const f1 = document.getElementById("familiar1grau");
  if(f1) f1.addEventListener("change", limparResultado);
  const oss = document.getElementById("odontoSS");
  if(oss) oss.addEventListener("change", limparResultado);
  const opme = document.getElementById("odontoPME");
  if(opme) opme.addEventListener("change", limparResultado);
  const oaffix = document.getElementById("odontoAffix");
  if(oaffix) oaffix.addEventListener("change", limparResultado);
  const oib = document.getElementById("odontoInclusaoBoleto");
  if(oib) oib.addEventListener("change", limparResultado);
}

function atualizarOpcoesAtivas(){
  document.querySelectorAll(".grupo-plano").forEach(grupo=>{
    const plan = grupo.dataset.plan;
    const tipoBtn = grupo.querySelector(".tipo");
    const ativo = tiposAtivos.has(plan);

    if(ativo) tipoBtn.classList.add("ativo");
    else tipoBtn.classList.remove("ativo");

    grupo.querySelectorAll(".opcao[data-plan][data-modo]").forEach(op=>{
      if(ativo){
        op.classList.remove("disabled");
      }else{
        op.classList.add("disabled");
        op.classList.remove("ativo");
      }
    });
  });

  document.querySelectorAll(".grupo-plano .opcao[data-plan][data-modo]").forEach(op=>{
    const tipo = op.dataset.plan;
    const modo = op.dataset.modo;
    const selected = selecionados.some(s => s.tipo === tipo && s.modo === modo);
    if(selected) op.classList.add("ativo");
    else op.classList.remove("ativo");
  });

  atualizarCheckboxes();
}

function toggleTipo(planKey){
  if(tiposAtivos.has(planKey)){
    tiposAtivos.delete(planKey);
    selecionados = selecionados.filter(s => s.tipo !== planKey);
  }else{
    tiposAtivos.add(planKey);
  }
  limparResultado();
  atualizarOpcoesAtivas();
}

/* =======================
   FUNÇÕES DE CLIQUE
======================= */
function clicarNoModo(btn) {
  if (window.event) { window.event.stopPropagation(); }
  const planKey = btn.dataset.plan;
  if (!tiposAtivos.has(planKey)) {
    toggleTipo(planKey);
  }
  toggleModo(btn);
}

function toggleModo(btn) {
  const tipo = btn.dataset.plan;
  const modo = btn.dataset.modo;
  if (!tiposAtivos.has(tipo) || btn.classList.contains("disabled")) return;
  const idx = selecionados.findIndex(s => s.tipo === tipo && s.modo === modo);
  if (idx >= 0) {
    selecionados.splice(idx, 1);
  } else {
    if (selecionados.length >= LIMITE_ORCAMENTOS) {
      showToast("Máximo de 2 orçamentos por vez.");
      return;
    }
    selecionados.push({ tipo, modo });
  }
  limparResultado();
  atualizarOpcoesAtivas();
}

/* =======================
   FAIXA ETARIA COUNTERS
   ======================= */
function renderizarFaixaCounters(){
  const container = document.getElementById("faixaContainer");
  if(!container) return;

  const temEmp = selecionados.some(s => isEmpresarial(s.tipo));
  if(!faixaMode || !temEmp){
    container.style.display = "none";
    faixaCounts = [];
    return;
  }

  const chave = `${selecionados[0].tipo}_${selecionados[0].modo}`;
  let lista;
  if (selecionados[0].tipo.startsWith("affix_")) {
    lista = window.AFFIX_TABELAS && window.AFFIX_TABELAS[chave];
  } else {
    const dados = window.DADOS_CIDADES && window.DADOS_CIDADES[cidadeAtiva];
    if(!dados || !dados.tabelas[chave]) return;
    lista = dados.tabelas[chave];
  }
  if(!lista) return;

  if(faixaCounts.length !== lista.length){
    faixaCounts = lista.map(() => 0);
  }

  let html = '<div class="faixa-grid">';
  lista.forEach((faixa, i) => {
    html += `
      <div class="faixa-card">
        <div class="faixa-label">${faixa[0]}</div>
        <div class="faixa-controls">
          <button type="button" class="faixa-btn" onclick="ajustarFaixa(${i}, -1)">−</button>
          <span class="faixa-count" id="faixaCount_${i}">${faixaCounts[i]}</span>
          <button type="button" class="faixa-btn" onclick="ajustarFaixa(${i}, 1)">+</button>
        </div>
      </div>
    `;
  });
  html += '</div>';

  // "Limpar faixas" button for SS and PME
  const temSS = selecionados.some(s => s.tipo.startsWith("ss_"));
  const temPME = selecionados.some(s => s.tipo.startsWith("pme_"));
  if (temSS || temPME) {
    html += `<button type="button" class="faixa-limpar-btn" onclick="limparFaixas()">Limpar faixas etárias</button>`;
  }

  container.innerHTML = html;
  container.style.display = "block";
}

function ajustarFaixa(idx, delta){
  faixaCounts[idx] = Math.max(0, (faixaCounts[idx] || 0) + delta);
  const el = document.getElementById(`faixaCount_${idx}`);
  if(el) el.textContent = faixaCounts[idx];
  limparResultado();
}

function limparFaixas(){
  faixaCounts = faixaCounts.map(() => 0);
  document.querySelectorAll(".faixa-count").forEach(el => el.textContent = "0");
  limparResultado();
}

/* =======================
   CÁLCULO
======================= */
function parseIdades(){
  return document.getElementById("idades").value
    .split(",")
    .map(s => parseInt(s.trim(), 10))
    .filter(n => Number.isFinite(n));
}

function taxaAdesaoTexto(tipo, vidas){
  if(isEmpresarial(tipo)){
    return `Taxa de adesão: R$ ${formatarBR(TAXA_VIDA)} por beneficiário (R$ ${formatarBR(TAXA_VIDA * vidas)})`;
  }
  return `Taxa de adesão: R$ ${formatarBR(TAXA_CONTRATO)} por contrato`;
}

function colgroupHTML({ completa=false, usandoFaixa=false }){
  if(usandoFaixa){
    return '<colgroup><col style="width:20%;"><col style="width:22%;"><col style="width:10%;"><col style="width:24%;"><col style="width:24%;"></colgroup>';
  }
  if(completa){
    return '<colgroup><col style="width:46%;"><col style="width:27%;"><col style="width:27%;"></colgroup>';
  }
  return '<colgroup><col style="width:32%;"><col style="width:14%;"><col style="width:27%;"><col style="width:27%;"></colgroup>';
}

function cabecalhoTabelaHTML({ completa=false, usandoFaixa=false, familiar=false }){
  if(usandoFaixa){
    return `
      <tr class="cab">
        <th>Faixa<br>Etária</th>
        <th>Valor<br>por Faixa</th>
        <th>Usuários</th>
        <th>VALOR<br>Normal</th>
        <th>15%<br>(3 meses)</th>
      </tr>
    `;
  }
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

function getOdontoValor(tipo, isAmb){
  if (tipo.startsWith("ind_")) return 0;
  if (tipo.startsWith("affix_")) {
    const el = document.getElementById("odontoAffix");
    return (el && el.checked) ? ODONTO_AFFIX : 0;
  }
  if (tipo.startsWith("pme_")) {
    const el = document.getElementById("odontoPME");
    return (el && el.checked) ? ODONTO_PME : 0;
  }
  if (tipo.startsWith("ss_")) {
    const el = document.getElementById("odontoSS");
    return (el && el.checked) ? ODONTO_SS : 0;
  }
  return 0;
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

  const faixaEl = document.getElementById("faixaEtaria");
  const usandoFaixa = faixaEl ? faixaEl.checked : faixaMode;

  const temTotalEmp = usandoFaixa && faixaCounts.some(c => c > 0);

  const idades = completa ? [] : parseIdades();
  if(!completa && !usandoFaixa && idades.length === 0){
    alert("Informe ao menos uma idade (ex: 23, 35, 62) ou marque 'Tabela completa' ou 'Por faixa etária'.");
    return;
  }
  if(usandoFaixa && !temTotalEmp){
    alert("Defina ao menos 1 beneficiário nas faixas etárias.");
    return;
  }

  if(typeof gtag === "function"){
    gtag("event", "orcamento_calculado", {
      cidade: cidadeAtiva,
      orcamentos_qtd: selecionados.length,
      modo_tabela: usandoFaixa ? "faixa" : (completa ? "completa" : "idades"),
      promo_15: 1
    });
  }

  const familiarEl = document.getElementById("familiar1grau");
  const familiarAtivo = familiarEl ? familiarEl.checked : false;

  // Validate vidas for SS (2-29) and PME (30-99)
  const temSS = selecionados.some(s => s.tipo.startsWith("ss_"));
  const temPME = selecionados.some(s => s.tipo.startsWith("pme_"));
  const totalVidasGeral = usandoFaixa
    ? faixaCounts.reduce((s, c) => s + c, 0)
    : idades.length;
  if (temSS && !completa && !usandoFaixa && (totalVidasGeral < 2 || totalVidasGeral > 29)) {
    alert("Plano EMPRESARIAL 2-29: o total de vidas deve ser entre 2 e 29.");
    return;
  }
  if (temSS && usandoFaixa && (totalVidasGeral < 2 || totalVidasGeral > 29)) {
    alert("Plano EMPRESARIAL 2-29: o total de vidas deve ser entre 2 e 29.");
    return;
  }
  if (temPME && !completa && !usandoFaixa && (totalVidasGeral < 30 || totalVidasGeral > 99)) {
    alert("Plano EMPRESARIAL 30-99: o total de vidas deve ser entre 30 e 99.");
    return;
  }
  if (temPME && usandoFaixa && (totalVidasGeral < 30 || totalVidasGeral > 99)) {
    alert("Plano EMPRESARIAL 30-99: o total de vidas deve ser entre 30 e 99.");
    return;
  }

  const cont = document.getElementById("orcamentosContainer");
  cont.innerHTML = "";

  const cfg = CIDADES_CFG[cidadeAtiva];
  document.getElementById("linhaDataGeral").innerHTML =
    `<strong>Orçamento dia ${dataHojeBR()} — ${cfg.titulo} - ${cfg.uf}</strong>`;

  document.getElementById("resultado").style.display = "block";

  selecionados.forEach((sel, idx)=>{
    const chave = `${sel.tipo}_${sel.modo}`;

    let lista;
    if (sel.tipo.startsWith("affix_")) {
      lista = window.AFFIX_TABELAS && window.AFFIX_TABELAS[chave];
    } else {
      const dados = window.DADOS_CIDADES && window.DADOS_CIDADES[cidadeAtiva];
      if (!dados) { alert("Dados não encontrados para " + cidadeAtiva); return; }
      lista = dados.tabelas[chave];
    }
    if(!lista){
      alert("Tabela não encontrada para um dos planos selecionados.");
      return;
    }

    const isIND = isIndividual(sel.tipo);
    const isEmp = isEmpresarial(sel.tipo);
    const isAmb = sel.tipo.includes("amb");
    const aplicarFamiliar = isIND && familiarAtivo;

    let totalNormal = 0;
    let total15 = 0;
    let total5 = 0;

    let rowsHTML = "";
    let qtdeTotalFaixa = 0;

    if(usandoFaixa && isEmp){
      lista.forEach((faixa, i) => {
        const q = faixaCounts[i] || 0;
        if(q <= 0) return;
        qtdeTotalFaixa += q;
        let vN = Number(faixa[3]) || 0;
        let v15 = Number(faixa[4]) || 0;

        const odonto = getOdontoValor(sel.tipo, isAmb);
        if (odonto) { vN += odonto; v15 += odonto; }

        const vTotalN = vN * q;
        const vTotal15 = v15 * q;
        totalNormal += vTotalN;
        total15 += vTotal15;

        rowsHTML += `
          <tr>
            <td>${faixa[0]}</td>
            <td>R$ ${formatarBR(vN)}</td>
            <td>${q}</td>
            <td>R$ ${formatarBR(vTotalN)}</td>
            <td>R$ ${formatarBR(vTotal15)}</td>
          </tr>
        `;
      });
      rowsHTML += `
        <tr class="faixa-total-row">
          <td><strong>Total</strong></td>
          <td></td>
          <td><strong>${qtdeTotalFaixa}</strong></td>
          <td><strong>R$ ${formatarBR(totalNormal)}</strong></td>
          <td><strong>R$ ${formatarBR(total15)}</strong></td>
        </tr>
      `;
    }else if(completa){
      lista.forEach(faixa=>{
        let vN = Number(faixa[3]) || 0;
        let v15 = Number(faixa[4]) || 0;

        const odonto = getOdontoValor(sel.tipo, isAmb);
        if (odonto) { vN += odonto; v15 += odonto; }

        const v5 = vN * 0.95;
        rowsHTML += `
          <tr>
            <td>${faixa[0]}</td>
            <td>R$ ${formatarBR(aplicarFamiliar ? v5 : vN)}</td>
            <td>R$ ${formatarBR(v15)}</td>
          </tr>
        `;
      });
    }else{
      idades.forEach(idade=>{
        const faixa = lista.find(f => idade >= f[1] && idade <= f[2]);
        if(!faixa) return;
        let vN = Number(faixa[3]) || 0;
        let v15 = Number(faixa[4]) || 0;

        const odonto = getOdontoValor(sel.tipo, isAmb);
        if (odonto) { vN += odonto; v15 += odonto; }

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
      if(usandoFaixa){
        totalHTML = `
          <div class="totais" style="font-weight: bold; text-align: left;">
            <div>Total normal: R$ ${formatarBR(totalNormal)}</div>
            <div>Total 15% (3 meses): R$ ${formatarBR(total15)}</div>
          </div>
        `;
      }else if(aplicarFamiliar){
        totalHTML = `
          <div class="totais" style="font-weight: bold; text-align: left;">
            <div>Total 5% Familiar: R$ ${formatarBR(total5)}</div>
            <div>Total 15% (3 meses): R$ ${formatarBR(total15)}</div>
          </div>
        `;
      }else{
        totalHTML = `
          <div class="totais" style="font-weight: bold; text-align: left;">
            <div>Total normal: R$ ${formatarBR(totalNormal)}</div>
            <div>Total 15% (3 meses): R$ ${formatarBR(total15)}</div>
          </div>
        `;
      }
    }

    let odontoInfo = "";
    if(isEmp){
      const odonto = getOdontoValor(sel.tipo, isAmb);
      if (odonto) {
        if (completa || usandoFaixa) {
          odontoInfo = `<div class="odonto-info">Odonto: R$ ${formatarBR(odonto)} por beneficiário — incluído no valor</div>`;
        } else {
          odontoInfo = `<div class="odonto-info">Odonto: R$ ${formatarBR(odonto)} por beneficiário (R$ ${formatarBR(odonto * idades.length)}) — incluído nos valores</div>`;
        }
      }
    }
    let familiarInfo = "";
    if(aplicarFamiliar){
      familiarInfo = `<div class="familiar-info">*Aplicado desconto de 5% para familiar de 1º grau</div>`;
    }
    let odontoInclusaoInfo = "";
    const odontoInclusaoEl = document.getElementById("odontoInclusaoBoleto");
    if (odontoInclusaoEl && odontoInclusaoEl.checked && isEmp) {
      odontoInclusaoInfo = `<div class="odonto-inclusao-info">Odonto (inclusão - boleto separado): R$ ${formatarBR(ODONTO_INCLUSAO_BOLETO)} por beneficiário</div>`;
    }

    let empAviso = "";
    if(isEmp){
      if (sel.tipo.startsWith("affix_")) {
        empAviso = `<div class="ss-aviso">Condição empresarial – 1 vida</div>`;
      } else if (sel.tipo.startsWith("pme_")) {
        empAviso = `<div class="ss-aviso">Condição empresarial: 30 a 99 vidas</div>`;
      } else {
        empAviso = `<div class="ss-aviso">Condição empresarial: a partir de 2 vidas</div>`;
      }
    }

    const nomeDentroTabelaHTML = nomeClienteCompletoHTML(sel.tipo, sel.modo);
    const totalVidas = usandoFaixa ? qtdeTotalFaixa : idades.length;
    const mostrarTaxa = !completa && (!usandoFaixa || sel.tipo.startsWith("pme_")) && !sel.tipo.startsWith("affix_");
    const taxa = mostrarTaxa ? taxaAdesaoTexto(sel.tipo, totalVidas) : "";

    const classeEspecial = (completa || usandoFaixa) ? `tabela-completa ${corTabelaCompletaPorIndice(idx)}` : "";
    const colCount = usandoFaixa ? 5 : 4;

    cont.insertAdjacentHTML("beforeend", `
      <div class="orcamento ${classeEspecial}">
        <div class="tabela-wrap">
          <table class="tabela-precos">
            ${colgroupHTML({ completa, usandoFaixa })}
            <thead>
              <tr class="titulo-tabela">
                <th colspan="${colCount}">${nomeDentroTabelaHTML}</th>
              </tr>
              ${cabecalhoTabelaHTML({ completa, usandoFaixa, familiar: aplicarFamiliar })}
            </thead>
            <tbody>
              ${rowsHTML}
            </tbody>
          </table>
        </div>
        ${empAviso}
        ${mostrarTaxa ? `<div class="taxa-adesao" style="text-align: right; font-weight: bold; margin-top: 10px;">${taxa}</div>` : ""}
        ${totalHTML}
        ${odontoInfo}
        ${familiarInfo}
        ${odontoInclusaoInfo}
      </div>
    `);
  });

  setTimeout(() => {
    const ancora = document.getElementById("ancoraResultado");
    if(ancora){
      ancora.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 50);
}

/* ==========================================================================
   MECANISMO DE CAPTURA E DOWNLOAD
   ========================================================================== */
async function baixarBlob(blob, fileName){
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  setTimeout(()=> {
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }, 800);
}

async function gerarImagem(modo = "share"){
  const area = document.getElementById("areaImagem");
  if(!area){ alert("Área de captura não encontrada."); return; }

  document.body.classList.add("capturando");
  await new Promise(r => requestAnimationFrame(() => r()));

  try {
    const canvas = await html2canvas(area, {
      backgroundColor: "#ffffff", useCORS: true, allowTaint: true, scale: 3, logging: false
    });
    document.body.classList.remove("capturando");
    const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
    if(!blob){ alert("Não foi possível gerar o arquivo de imagem."); return; }

    const { isIOS, isChromeIOS } = getIOSShareInfo();

    if(modo === "share" && navigator.share && !(isIOS && isChromeIOS)){
      const file = new File([blob], "orcamento_hapvida.png", { type: "image/png" });
      try{
        await navigator.share({ title: "Orçamento Hapvida", text: "Segue o orçamento do plano de saúde.", files: [file] });
        return;
      }catch(e){ console.log("Falha na partilha nativa, baixando arquivo..."); }
    }

    await baixarBlob(blob, "orcamento_hapvida.png");
    if(modo === "share" && isIOS && isChromeIOS){
      alert("No Chrome do iPhone a imagem será baixada. Depois é só partilhar através da sua galeria de fotos.");
    }
  } catch(err) {
    document.body.classList.remove("capturando");
    console.error("Erro na captura:", err);
    alert("Erro ao gerar imagem para baixar. Tente novamente.");
  }
}

async function gerarImagemDeElemento(elementId, fileName){
  const area = document.getElementById(elementId);
  if(!area){ alert("Área não encontrada para gerar imagem."); return; }

  document.body.classList.add("capturando");
  await new Promise(r => requestAnimationFrame(() => r()));

  try {
    const canvas = await html2canvas(area, {
      backgroundColor: "#ffffff", useCORS: true, allowTaint: true, scale: 3, logging: false
    });
    document.body.classList.remove("capturando");
    const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
    if(!blob){ alert("Não foi possível gerar a imagem."); return; }

    const { isIOS, isChromeIOS } = getIOSShareInfo();

    if(navigator.share && !(isIOS && isChromeIOS)){
      const file = new File([blob], fileName, { type: "image/png" });
      try{
        let textoCompartilhar = "Informações Hapvida.";
        if(elementId === "areaCopart") textoCompartilhar = "Segue as coparticipações de Fortaleza ✅";
        if(elementId === "areaCopartSalvador") textoCompartilhar = "Segue as coparticipações de Salvador ✅";
        if(elementId === "areaCarencias") textoCompartilhar = "Segue as carências atualizadas do plano Hapvida ✅";
        await navigator.share({ title: "Hapvida", text: textoCompartilhar, files: [file] });
        return;
      }catch(e){ console.log("Falha na partilha nativa, baixando..."); }
    }

    await baixarBlob(blob, fileName);
    if(isIOS && isChromeIOS){
      alert("No Chrome do iPhone a imagem será baixada. Depois é só partilhar através da sua galeria.");
    }
  } catch(err) {
    document.body.classList.remove("capturando");
    console.error("Erro na captura do elemento:", err);
  }
}

/* =======================
   MODAL / INFO
======================= */
function abrirModalInfo(){
  const m = document.getElementById("modalInfo");
  if(m) m.style.display = "flex";

  const cfg = CIDADES_CFG[cidadeAtiva] || CIDADES_CFG.fortaleza;
  const btnCopart = document.querySelector("#modalInfo .btn-copart");
  if (btnCopart) btnCopart.textContent = `Compartilhar Coparticipações ${cfg.titulo}`;

  const hoje = dataHojeBR();
  const dc = document.getElementById("dataCarencias");
  if(dc) dc.textContent = hoje;
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

/* =======================
   COPARTICIPAÇÃO DATA
   ======================= */
const COPART_DATA = {
  grupoB: {
    parcial: [
      { label: "Consulta Eletiva", valor: "Isenta" },
      { label: "Consulta de Urgência", valor: "Isenta" },
      { label: "Exames Simples", valor: "Isenta" },
      { label: "Exames Complexos", valor: "Isenta" },
      { label: "Terapias Neurológicas Especiais", valor: "R$ 78,87" },
      { label: "Terapias", valor: "R$ 24,27" }
    ],
    total: [
      { label: "Consulta Eletiva", valor: "R$ 25,42" },
      { label: "Consulta de Urgência", valor: "R$ 43,63" },
      { label: "Exames Simples", valor: "40% (máx R$ 45,79)" },
      { label: "Exames Complexos", valor: "40% (máx R$ 114,48)" },
      { label: "Terapias Neurológicas Especiais", valor: "R$ 78,87" },
      { label: "Terapias", valor: "R$ 24,27" }
    ]
  },
  grupoA: {
    parcial: [
      { label: "Consulta Eletiva", valor: "Isenta" },
      { label: "Consulta de Urgência", valor: "Isenta" },
      { label: "Exames Simples", valor: "Isenta" },
      { label: "Exames Complexos", valor: "Isenta" },
      { label: "Terapias Neurológicas Especiais", valor: "R$ 78,87" },
      { label: "Terapias", valor: "R$ 42,47" }
    ],
    total: [
      { label: "Consulta Eletiva", valor: "R$ 43,63" },
      { label: "Consulta de Urgência", valor: "R$ 61,82" },
      { label: "Exames Simples", valor: "R$ 51,52" },
      { label: "Exames Complexos", valor: "R$ 125,93" },
      { label: "Terapias Neurológicas Especiais", valor: "R$ 78,87" },
      { label: "Terapias", valor: "R$ 42,47" }
    ]
  }
};

const COPART_CIDADE_GRUPO = {
  belo_horizonte: 'grupoA',
  curitiba: 'grupoA'
};

function getCoparticipacaoHTML(cidade){
  const grupo = COPART_DATA[getGrupoCopart(cidade)];
  const cfg = CIDADES_CFG[cidade] || CIDADES_CFG.fortaleza;
  const hoje = dataHojeBR();
  return `
    <div class="logos"><div class="logo-wrap"><img class="logo logo-hapvida-img" src="./logo-hapvida.png" alt="Hapvida"></div></div>
    <div class="info-title">COPARTICIPAÇÕES — ${cfg.titulo.toUpperCase()} - ${cfg.uf}</div>
    <div class="info-sub">Atualizado em ${hoje}</div>
    <div class="info-grid-2">
      <div class="info-card">
        <div class="head">Coparticipação parcial (grupo 1 PF)</div>
        <div class="body">
          ${grupo.parcial.map(kv => `<div class="kv"><span>${kv.label}</span><span>${kv.valor}</span></div>`).join('')}
        </div>
      </div>
      <div class="info-card">
        <div class="head">Coparticipação total (grupo 1 PF)</div>
        <div class="body">
          ${grupo.total.map(kv => `<div class="kv"><span>${kv.label}</span><span>${kv.valor}</span></div>`).join('')}
        </div>
      </div>
    </div>
    <div class="rodape-info">*Informações em formato de imagem para envio rápido ao cliente.</div>
  `;
}

/* =======================
   COMPARTILHAR INFO
   ======================= */
async function compartilharInfo(tipo){
  fecharModalInfo();
  if (tipo === "coparticipacoes") {
    const area = document.getElementById("areaCopart");
    if (!area) return;
    area.innerHTML = getCoparticipacaoHTML(cidadeAtiva);
    await new Promise(r => requestAnimationFrame(() => r()));
    await gerarImagemDeElemento("areaCopart", `coparticipacoes_${cidadeAtiva}.png`);
    return;
  }
  if (tipo === "carencias") {
    const d = document.getElementById("dataCarencias");
    if (d) d.textContent = dataHojeBR();
    await gerarImagemDeElemento("areaCarencias", "carencias_hapvida.png");
  }
}

/* =======================
   INIT
======================= */
document.addEventListener("DOMContentLoaded", () => {
  construirBotoesCidade();

  cidadeAtiva = "fortaleza";
  tabelasAtivas = window.DADOS_CIDADES && window.DADOS_CIDADES.fortaleza
    ? window.DADOS_CIDADES.fortaleza.tabelas
    : {};

  construirBotoesPlanos();
  atualizarUIcidade();
  atualizarOpcoesAtivas();
  mostrarNovidades();
  tentarCarregarLogo();
});
