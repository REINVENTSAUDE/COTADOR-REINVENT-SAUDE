/* ===== CONFIG ===== */

const LIMITE_ORCAMENTOS = 2;
const ODONTO_POR_VIDA = 23.25;

const CIDADES_CFG = {
  fortaleza:{
    titulo:"Fortaleza",
    odontoJaIncluso:false,
    arquivo:null
  },
  salvador:{
    titulo:"Salvador",
    odontoJaIncluso:true,
    arquivo:"./tabelas-salvador.js"
  }
};

let cidadeAtiva="fortaleza";
let tabelasAtivas=window.TABELAS_FORTALEZA;


/* ===== ESTADO ===== */

const tiposAtivos=new Set();
let selecionados=[];


/* ===== UTIL ===== */

function formatarBR(valor){
return Number(valor).toLocaleString("pt-BR",{minimumFractionDigits:2});
}

function dataHojeBR(){
const d=new Date();
return d.toLocaleDateString("pt-BR");
}

function isMobileDevice(){
const ua=navigator.userAgent;
return /Android|iPhone|iPad/i.test(ua);
}

function showToast(msg){

const t=document.getElementById("toast");

t.textContent=msg;

t.classList.add("show");

setTimeout(()=>{
t.classList.remove("show");
},1500)

}

function esconderAjuda(){
document.getElementById("ajudaPasso").style.display="none";
}

function mostrarAjuda(){
document.getElementById("ajudaPasso").style.display="block";
}

function limparResultado(){

document.getElementById("resultado").style.display="none";

document.getElementById("orcamentosContainer").innerHTML="";

mostrarAjuda();

}


/* ===== CIDADE ===== */

function atualizarUIcidade(){

document.getElementById("cidadeTitulo").innerText=
CIDADES_CFG[cidadeAtiva].titulo;

document.getElementById("btnFortaleza")
.classList.toggle("ativo",cidadeAtiva==="fortaleza");

document.getElementById("btnSalvador")
.classList.toggle("ativo",cidadeAtiva==="salvador");

}


function resetarTudo(){

tiposAtivos.clear();

selecionados=[];

document.getElementById("idades").value="";

document.getElementById("opcoesExtras").innerHTML="";

document.querySelectorAll(".tipo")
.forEach(b=>b.classList.remove("ativo"));

document.querySelectorAll(".opcao")
.forEach(b=>{
b.classList.remove("ativo");
b.classList.add("disabled");
})

limparResultado();

}



async function carregarSalvador(){

return new Promise((resolve,reject)=>{

const s=document.createElement("script");

s.src=CIDADES_CFG.salvador.arquivo+"?v="+Date.now();

s.onload=resolve;

s.onerror=reject;

document.head.appendChild(s);

})

}


async function setCidade(cidade){

if(cidade===cidadeAtiva)return;

cidadeAtiva=cidade;

resetarTudo();

atualizarUIcidade();

if(cidade==="salvador"){

if(!window.TABELAS_SALVADOR){

try{

await carregarSalvador();

}catch{

alert("Erro carregar Salvador");

cidadeAtiva="fortaleza";

tabelasAtivas=window.TABELAS_FORTALEZA;

return;

}

}

tabelasAtivas=window.TABELAS_SALVADOR;

}
else{

tabelasAtivas=window.TABELAS_FORTALEZA;

}

}


/* ===== PLANOS ===== */

function atualizarCheckboxes(){

const temIND=selecionados.some(s=>!s.tipo.startsWith("ss"));

const temSS=selecionados.some(s=>s.tipo.startsWith("ss"));

const c=document.getElementById("opcoesExtras");

c.innerHTML="";

if(!temIND&&!temSS)return;

c.insertAdjacentHTML("beforeend",`

<label class="opt-label">

<input type="checkbox" id="tabelaCompleta">

Tabela completa

</label>

`);

if(temIND){

c.insertAdjacentHTML("beforeend",`

<label class="opt-label">

<input type="checkbox" id="familiar1grau">

Familiar 1º grau (5%)

</label>

`);

}

if(temSS){

if(!CIDADES_CFG[cidadeAtiva].odontoJaIncluso){

c.insertAdjacentHTML("beforeend",`

<label class="opt-label">

<input type="checkbox" id="odontoSS">

Odonto R$ ${formatarBR(ODONTO_POR_VIDA)}

</label>

`);

}else{

c.insertAdjacentHTML("beforeend",`

<div class="opt-label">

Odonto já incluso

</div>

`);

}

}

}



function atualizarOpcoesAtivas(){

document.querySelectorAll(".grupo-plano")

.forEach(grupo=>{

const plan=grupo.dataset.plan;

const ativo=tiposAtivos.has(plan);

grupo.querySelector(".tipo")

.classList.toggle("ativo",ativo);

grupo.querySelectorAll(".opcao")

.forEach(o=>{

if(ativo)o.classList.remove("disabled");

else{

o.classList.add("disabled");

o.classList.remove("ativo");

}

})

})

document.querySelectorAll(".opcao")

.forEach(o=>{

const t=o.dataset.plan;

const m=o.dataset.modo;

const sel=selecionados

.some(s=>s.tipo===t&&s.modo===m);

o.classList.toggle("ativo",sel);

})

atualizarCheckboxes();

}


function toggleTipo(plan){

if(tiposAtivos.has(plan)){

tiposAtivos.delete(plan);

selecionados=selecionados.filter(s=>s.tipo!==plan);

}
else{

tiposAtivos.add(plan);

}

limparResultado();

atualizarOpcoesAtivas();

}


function toggleModo(btn){

const tipo=btn.dataset.plan;

const modo=btn.dataset.modo;

if(btn.classList.contains("disabled"))return;

const idx=selecionados

.findIndex(s=>s.tipo===tipo&&s.modo===modo);

if(idx>=0){

selecionados.splice(idx,1);

}
else{

if(selecionados.length>=2){

showToast("Máx 2");

return;

}

selecionados.push({tipo,modo});

}

limparResultado();

atualizarOpcoesAtivas();

}



/* ===== CALCULO ===== */


function parseIdades(){

return document.getElementById("idades")

.value.split(",")

.map(x=>parseInt(x))

.filter(n=>!isNaN(n));

}



function calcular(){

if(selecionados.length===0){

alert("Selecione plano");

return;

}

esconderAjuda();

const completa=
document.getElementById("tabelaCompleta")
?.checked;

const idades=completa?[]:parseIdades();

if(!completa&&idades.length===0){

alert("Digite idade");

return;

}

document.getElementById("resultado")
.style.display="block";

document.getElementById("linhaDataGeral")
.innerText="Orçamento dia "+dataHojeBR();

const cont=document.getElementById("orcamentosContainer");

cont.innerHTML="";

selecionados.forEach(sel=>{

const lista=tabelasAtivas[
sel.tipo+"_"+sel.modo
];

let rows="";

let total=0;

let total15=0;

if(completa){

lista.forEach(f=>{

rows+=`

<tr>

<td>${f[0]}</td>

<td>R$ ${formatarBR(f[3])}</td>

<td>R$ ${formatarBR(f[4])}</td>

</tr>

`;

})

}else{

idades.forEach(idade=>{

const faixa=lista.find(f=>idade>=f[1]&&idade<=f[2]);

if(!faixa)return;

total+=faixa[3];

total15+=faixa[4];

rows+=`

<tr>

<td>${faixa[0]}</td>

<td>${idade}</td>

<td>R$ ${formatarBR(faixa[3])}</td>

<td>R$ ${formatarBR(faixa[4])}</td>

</tr>

`;

})

}

const col=completa?3:4;

cont.insertAdjacentHTML("beforeend",`

<div class="orcamento">

<div class="tabela-wrap">

<table class="tabela-precos">

<thead>

<tr class="titulo-tabela">

<th colspan="${col}">

${sel.tipo.toUpperCase()} ${sel.modo.toUpperCase()}

</th>

</tr>

<tr class="cab">

<th>Faixa</th>

${completa?"":"<th>Idade</th>"}

<th>Normal</th>

<th>15%</th>

</tr>

</thead>

<tbody>

${rows}

</tbody>

</table>

</div>

${
completa?"":`

<div class="totais">

<div>Total normal R$ ${formatarBR(total)}</div>

<div>Total 15% R$ ${formatarBR(total15)}</div>

</div>

`
}

</div>

`);

})

}



/* ===== IMAGEM ===== */

async function gerarImagem(){

const area=document.getElementById("areaImagem");

document.body.classList.add("capturando");

await new Promise(r=>requestAnimationFrame(r));

const canvas=await html2canvas(area,{scale:3});

document.body.classList.remove("capturando");

const blob=await new Promise(r=>canvas.toBlob(r));

if(isMobileDevice()&&navigator.share){

const file=new File([blob],"orcamento.png");

navigator.share({files:[file]});

return;

}

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="orcamento.png";

a.click();

}



/* ===== MODAL ===== */

function abrirModalInfo(){

document.getElementById("modalInfo").style.display="flex";

document.getElementById("dataCopart").innerText=dataHojeBR();

document.getElementById("dataCarencias").innerText=dataHojeBR();

}

function fecharModalInfo(){

document.getElementById("modalInfo").style.display="none";

}

function clicouForaModal(e){

if(e.target.id==="modalInfo")

fecharModalInfo();

}


/* ===== INICIO ===== */

atualizarUIcidade();

mostrarAjuda();
