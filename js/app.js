const svgIcons={
 house:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-8h6v8"/>',
 briefcase:'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12c5 4 13 4 18 0"/>',
 book:'<path d="M12 7c-2-2-5-3-9-2v14c4-1 7 0 9 2 2-2 5-3 9-2V5c-4-1-7 0-9 2z"/><path d="M12 7v14"/>',
 users:'<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M17 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 5v1"/>'
};
function iconSvg(name){return `<svg viewBox="0 0 24 24" width="25" height="25" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${svgIcons[name]||svgIcons.house}</svg>`}
const categories=[
{id:"living",title:"수원에서 살기",desc:"주거 · 금융 · 생활지원",icon:"house",tone:"#e3f0f3"},
{id:"work",title:"수원에서 일하기",desc:"취업 · 창업 · 일자리",icon:"briefcase",tone:"#e8edf5"},
{id:"learning",title:"수원에서 배우기",desc:"교육 · 자격증 · 자기개발",icon:"book",tone:"#f9e5e5"},
{id:"connect",title:"수원에서 연결되기",desc:"청년공간 · 모임 · 지역활동",icon:"users",tone:"#fceeee"}
];
const sampleItems=[
{category:"living",title:"온통청년 정책 검색",description:"전국 단위 청년정책과 지원사업을 검색하고 상세 자격을 확인할 수 있어요.",provider:"전국",source:"온통청년",url:"https://www.youthcenter.go.kr/main",tag:"정책"},
{category:"living",title:"경기 청년정책 확인",description:"경기도 및 시군에서 운영하는 청년 지원사업을 확인해 보세요.",provider:"경기도",source:"경기청년포털",url:"https://youth.gg.go.kr/gg/index.do",tag:"정책"},
{category:"living",title:"수원시 청년정책 안내",description:"수원시 청년 관련 정책과 유관기관 정보를 확인할 수 있어요.",provider:"수원시",source:"수원시",url:"https://www.suwon.go.kr/sw-www/deptHome/dep_edu/culture04/culture04-04.jsp",tag:"정책"},
{category:"work",title:"청년 취업·진로 정책 찾기",description:"취업지원, 직업훈련, 진로상담 등 청년 대상 사업을 찾아보세요.",provider:"전국",source:"온통청년",url:"https://www.youthcenter.go.kr/main",tag:"취업"},
{category:"work",title:"경기도 일자리·창업 정보",description:"경기도 청년 대상 취업 및 창업 관련 정보를 확인해 보세요.",provider:"경기도",source:"경기청년포털",url:"https://youth.gg.go.kr/gg/index.do",tag:"일자리"},
{category:"learning",title:"수원시 평생학습 강좌",description:"시민을 위한 평생교육, 인문교양, 취미·역량개발 강좌를 살펴보세요.",provider:"수원시",source:"수원시 평생학습",url:"https://learning.suwon.go.kr/lmth/01_lecture01.asp",tag:"교육"},
{category:"learning",title:"수원시 교육강좌 예약",description:"수원시에서 운영하는 교육 프로그램과 강좌를 확인하고 예약할 수 있어요.",provider:"수원시",source:"수원시 통합예약",url:"https://www.suwon.go.kr/web/reserv/edu/list.do",tag:"강좌"},
{category:"connect",title:"청년공간·커뮤니티 정보 찾기",description:"청년공간, 교류 프로그램, 청년 참여 정보를 정책 포털에서 찾아보세요.",provider:"전국·경기도",source:"온통청년",url:"https://www.youthcenter.go.kr/main",tag:"커뮤니티"}
];
const categoryById=Object.fromEntries(categories.map(c=>[c.id,c]));
const app=document.getElementById("app");
const homeMarkup=app.innerHTML;
function renderHome(){
 app.innerHTML=homeMarkup;
 document.getElementById("policyGrid").innerHTML=categories.map(c=>`<a class="category-card" href="#${c.id}"><span class="category-icon" style="background:${c.tone}">${iconSvg(c.icon)}</span><div><h3>${c.title}</h3></div><span class="card-arrow">↗</span></a>`).join("");
}
function resourceCard(item){return `<article class="resource-card"><div class="resource-meta"><span>${item.provider}</span><span>${item.tag}</span></div><h3>${item.title}</h3><p>${item.description}</p><a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.source} 바로가기 ↗</a></article>`}
function renderCategory(id){
 const c=categoryById[id];if(!c){location.hash="#home";return}
 const items=sampleItems.filter(x=>x.category===id);
 app.innerHTML=`<section class="page-hero"><h1>${c.title}</h1></section><section class="page-content"><div class="notice">각 사업의 신청 기간과 자격, 운영 여부는 공식 안내에서 최종 확인해 주세요.</div><div class="filter-row"><button class="filter-chip active" data-filter="전체">전체</button>${[...new Set(items.map(x=>x.tag))].map(t=>`<button class="filter-chip" data-filter="${t}">${t}</button>`).join("")}</div><div class="resource-grid" id="resourceGrid">${items.map(resourceCard).join("")}</div></section>`;
 document.querySelectorAll(".filter-chip").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".filter-chip").forEach(b=>b.classList.remove("active"));btn.classList.add("active");const f=btn.dataset.filter,shown=f==="전체"?items:items.filter(x=>x.tag===f);document.getElementById("resourceGrid").innerHTML=shown.map(resourceCard).join("")}));
}
function route(){
 const id=location.hash.replace("#","")||"home";
 document.querySelectorAll(".main-nav a[data-route]").forEach(a=>a.classList.toggle("active",a.dataset.route===id));
 const nav=document.getElementById("mainNav"),toggle=document.getElementById("menuToggle");nav.classList.remove("open");toggle.setAttribute("aria-expanded","false");
 if(id==="home"){renderHome();return}if(categoryById[id]){renderCategory(id);return}
 if(id==="enjoy"||id.startsWith("enjoy-")){
 const choices=[{id:"enjoy-food",name:"맛집"},{id:"enjoy-places",name:"명소"},{id:"enjoy-culture",name:"문화·축제"}];
 const chosen=choices.find(x=>x.id===id);
 app.innerHTML=`<section class="page-hero"><h1>${chosen?chosen.name:"수원에서 즐기기"}</h1></section><section class="page-content"><div class="enjoy-categories enjoy-page-links">${choices.map(x=>`<a class="enjoy-category" href="#${x.id}"><span>${x.name}</span><span class="enjoy-arrow">↗</span></a>`).join("")}</div><p class="enjoy-placeholder">${chosen?chosen.name+" 정보는":"맛집·명소·문화·축제 정보는"} 준비 중이에요. 추후 콘텐츠가 추가될 예정입니다.</p></section>`;
 return;
 }
 location.hash="#home";
}
document.getElementById("menuToggle").addEventListener("click",()=>{const nav=document.getElementById("mainNav");nav.classList.toggle("open");document.getElementById("menuToggle").setAttribute("aria-expanded",nav.classList.contains("open")?"true":"false")});
window.addEventListener("hashchange",route);renderHome();route();
