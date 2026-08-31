const regions=[
{name:"Sumatra",emoji:"🌿",desc:"Hutan, danau, dan tradisi yang kuat.",fact:"Sumatra memiliki beragam tradisi dari Aceh hingga Lampung.",items:[
["👑","Pakaian Adat","Ulee Balang","Busana adat Aceh yang memiliki nuansa kerajaan."],
["🏠","Rumah Adat","Rumah Gadang","Rumah tradisional Minangkabau dengan atap khas bergonjong."],
["🍲","Kuliner","Rendang","Hidangan Minangkabau yang kaya rempah."],
["💃","Kesenian","Tari Saman","Tari Aceh yang terkenal dengan gerakan kompak."]]},
{name:"Jawa",emoji:"🏯",desc:"Jejak kerajaan, batik, dan tradisi.",fact:"Jawa memiliki beragam bahasa, seni, dan tradisi dari wilayah barat hingga timur.",items:[
["👘","Pakaian Adat","Kebaya","Salah satu busana tradisional yang banyak dikenakan di berbagai daerah Indonesia."],
["🏠","Rumah Adat","Joglo","Rumah tradisional Jawa dengan bentuk atap khas."],
["🍛","Kuliner","Gudeg","Kuliner khas Yogyakarta berbahan nangka muda."],
["🎭","Kesenian","Wayang","Seni pertunjukan tradisional yang menggunakan tokoh dan cerita."]]},
{name:"Bali & Nusa Tenggara",emoji:"🌺",desc:"Pulau tropis penuh seni dan ritual.",fact:"Wilayah ini memiliki perpaduan budaya pesisir, pegunungan, dan tradisi kepulauan.",items:[
["👗","Pakaian Adat","Payas Agung","Busana adat Bali untuk berbagai upacara."],
["🏠","Rumah Adat","Bale","Bangunan tradisional Bali dengan fungsi ruang yang beragam."],
["🍗","Kuliner","Ayam Betutu","Masakan Bali dengan bumbu rempah."],
["💃","Kesenian","Tari Kecak","Pertunjukan tari dengan vokal kelompok yang khas."]]},
{name:"Kalimantan",emoji:"🌳",desc:"Sungai besar dan budaya Dayak.",fact:"Kalimantan dikenal dengan sungai-sungai besar serta kekayaan budaya masyarakat adat.",items:[
["🧥","Pakaian Adat","King Baba","Salah satu pakaian tradisional masyarakat Dayak."],
["🏠","Rumah Adat","Rumah Panjang","Hunian komunal tradisional di beberapa komunitas Dayak."],
["🍲","Kuliner","Soto Banjar","Kuliner khas Kalimantan Selatan."],
["🎵","Kesenian","Sape'","Alat musik petik tradisional dari Kalimantan."]]},
{name:"Sulawesi",emoji:"🌊",desc:"Budaya maritim dan pegunungan.",fact:"Sulawesi memiliki keragaman budaya dari masyarakat pesisir hingga pegunungan.",items:[
["👘","Pakaian Adat","Baju Bodo","Salah satu busana tradisional Bugis-Makassar."],
["🏠","Rumah Adat","Tongkonan","Rumah tradisional masyarakat Toraja."],
["🍲","Kuliner","Coto Makassar","Hidangan berkuah khas Makassar."],
["🕺","Kesenian","Tari Pakarena","Tari tradisional dari Sulawesi Selatan."]]},
{name:"Maluku",emoji:"🦪",desc:"Kepulauan rempah dan laut biru.",fact:"Maluku memiliki sejarah panjang dalam perdagangan rempah dan kehidupan kepulauan.",items:[
["👗","Pakaian Adat","Baju Cele","Busana tradisional yang dikenal di Maluku."],
["🏠","Rumah Adat","Baileo","Rumah adat yang digunakan sebagai ruang berkumpul masyarakat."],
["🍚","Kuliner","Papeda","Makanan berbahan sagu yang populer di kawasan timur Indonesia."],
["🥁","Kesenian","Tifa","Alat musik pukul tradisional di kawasan Maluku dan Papua."]]},
{name:"Papua",emoji:"🏔️",desc:"Alam luar biasa dan tradisi beragam.",fact:"Papua memiliki keragaman budaya yang sangat luas dan berbeda antardaerah.",items:[
["🪶","Pakaian Adat","Koteka","Salah satu bentuk pakaian tradisional pada komunitas tertentu di Papua."],
["🏠","Rumah Adat","Honai","Rumah tradisional berbentuk bundar yang dikenal dari Papua pegunungan."],
["🍠","Kuliner","Papeda","Olahan sagu yang menjadi bagian penting pangan lokal di beberapa wilayah."],
["🎶","Kesenian","Tifa","Alat musik pukul yang digunakan dalam berbagai kegiatan budaya."]]}
];

const islandGrid=document.getElementById("islandGrid"), cultureGrid=document.getElementById("cultureGrid");
function renderIslands(){
 islandGrid.innerHTML=regions.map((r,i)=>`<article class="island-card ${i===0?"active":""}" data-i="${i}"><div class="emoji">${r.emoji}</div><h3>${r.name}</h3><p>${r.desc}</p></article>`).join("");
 document.querySelectorAll(".island-card").forEach(c=>c.onclick=()=>selectRegion(+c.dataset.i));
}
function selectRegion(i){
 const r=regions[i]; document.getElementById("regionTitle").textContent=r.name;
 document.getElementById("funFact").innerHTML=`<span>💡</span><p><b>Fun fact:</b> ${r.fact}</p>`;
 cultureGrid.innerHTML=r.items.map(x=>`<article class="culture-card"><div class="bigicon">${x[0]}</div><span class="tag">${x[1]}</span><h3>${x[2]}</h3><p>${x[3]}</p></article>`).join("");
 document.querySelectorAll(".island-card").forEach(c=>c.classList.toggle("active",+c.dataset.i===i));
 document.getElementById("culture").scrollIntoView({behavior:"smooth",block:"start"});
}
renderIslands(); selectRegion(0);

document.getElementById("themeBtn").onclick=()=>{document.body.classList.toggle("dark");document.getElementById("themeBtn").textContent=document.body.classList.contains("dark")?"☀":"☾"};
document.getElementById("searchInput").addEventListener("input",e=>{
 const q=e.target.value.toLowerCase();
 const all=regions.flatMap(r=>r.items.map(x=>({...x,region:r.name}))).filter(x=>x[2].toLowerCase().includes(q)||x[1].toLowerCase().includes(q)||x.region.toLowerCase().includes(q));
 cultureGrid.innerHTML=all.length?all.map(x=>`<article class="culture-card"><div class="bigicon">${x[0]}</div><span class="tag">${x.region} · ${x[1]}</span><h3>${x[2]}</h3><p>${x[3]}</p></article>`).join(""):`<p>Tidak ada budaya yang cocok dengan pencarianmu.</p>`;
});

const questions=[
{q:"Rumah Gadang berasal dari budaya masyarakat Minangkabau di pulau...",a:["Jawa","Sumatra","Sulawesi","Papua"],c:1},
{q:"Alat musik Sape' dikenal berasal dari wilayah...",a:["Kalimantan","Bali","Jawa","Maluku"],c:0},
{q:"Tongkonan merupakan rumah tradisional yang terkenal dari...",a:["Aceh","Toraja","Betawi","Sasak"],c:1},
{q:"Papeda umumnya dibuat dari...",a:["Sagu","Jagung","Kedelai","Gandum"],c:0}
];
let qi=0,score=0;
function quiz(){
 const el=document.getElementById("quizContent");
 if(qi>=questions.length){el.innerHTML=`<div class="result"><p>Perjalanan selesai!</p><strong>${score}/${questions.length}</strong><p>Kamu sudah menjelajah sedikit budaya Nusantara. Lanjutkan eksplorasimu!</p><button class="restart" onclick="restartQuiz()">Main lagi</button></div>`;return}
 const x=questions[qi];el.innerHTML=`<div class="quiz-progress">QUESTION ${qi+1} / ${questions.length}</div><h3>${x.q}</h3><div class="answers">${x.a.map((a,i)=>`<button class="answer" onclick="answer(${i})">${String.fromCharCode(65+i)}. ${a}</button>`).join("")}</div>`;
}
window.answer=i=>{if(i===questions[qi].c)score++;qi++;quiz()};
window.restartQuiz=()=>{qi=0;score=0;quiz()};quiz();
