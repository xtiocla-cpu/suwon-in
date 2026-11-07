const categories = [
  {id:"living",title:"수원에서 살기",desc:"주거 · 금융 · 생활지원",icon:"⌂",tone:"#e3f0f3",label:"살기"},
  {id:"work",title:"수원에서 일하기",desc:"취업 · 창업 · 일자리",icon:"↗",tone:"#e8edf5",label:"일하기"},
  {id:"learning",title:"수원에서 배우기",desc:"교육 · 자격증 · 자기개발",icon:"✳",tone:"#f9e5e5",label:"배우기"},
  {id:"connect",title:"수원에서 연결되기",desc:"청년공간 · 모임 · 지역활동",icon:"◎",tone:"#fceeee",label:"연결되기"},
  {id:"enjoy",title:"수원에서 즐기기",desc:"맛집 · 카페 · 명소 · 문화",icon:"♡",tone:"#f5cbcB",label:"즐기기"}
];
const quickLinks = [
  {title:"온통청년",desc:"전국 청년정책과 상담 정보",url:"https://www.youthcenter.go.kr/main",icon:"◈"},
  {title:"경기청년포털",desc:"경기도 청년정책과 지원사업",url:"https://youth.gg.go.kr/gg/index.do",icon:"⌁"},
  {title:"수원시 청년정책",desc:"수원시 청년 관련 정책 안내",url:"https://www.suwon.go.kr/sw-www/deptHome/dep_edu/culture04/culture04-04.jsp",icon:"✳"},
  {title:"수원시 평생학습",desc:"평생교육과 자기개발 강좌",url:"https://learning.suwon.go.kr/lmth/01_lecture01.asp",icon:"▤"},
  {title:"수원시 교육강좌",desc:"교육 프로그램 및 예약",url:"https://www.suwon.go.kr/web/reserv/edu/list.do",icon:"▣"}
];
const sampleItems = [
  {category:"living",title:"온통청년 정책 검색",description:"전국 단위 청년정책과 지원사업을 검색하고 상세 자격을 확인할 수 있어요.",provider:"전국",source:"온통청년",url:"https://www.youthcenter.go.kr/main",tag:"정책"},
  {category:"living",title:"경기 청년정책 확인",description:"경기도 및 시군에서 운영하는 청년 지원사업을 확인해 보세요.",provider:"경기도",source:"경기청년포털",url:"https://youth.gg.go.kr/gg/index.do",tag:"정책"},
  {category:"living",title:"수원시 청년정책 안내",description:"수원시 청년 관련 정책과 유관기관 정보를 확인할 수 있어요.",provider:"수원시",source:"수원시",url:"https://www.suwon.go.kr/sw-www/deptHome/dep_edu/culture04/culture04-04.jsp",tag:"정책"},
  {category:"work",title:"청년 취업·진로 정책 찾기",description:"취업지원, 직업훈련, 진로상담 등 청년 대상 사업을 찾아보세요.",provider:"전국",source:"온통청년",url:"https://www.youthcenter.go.kr/main",tag:"취업"},
  {category:"work",title:"경기도 일자리·창업 정보",description:"경기도 청년 대상 취업 및 창업 관련 정보를 확인해 보세요.",provider:"경기도",source:"경기청년포털",url:"https://youth.gg.go.kr/gg/index.do",tag:"일자리"},
  {category:"learning",title:"수원시 평생학습 강좌",description:"시민을 위한 평생교육, 인문교양, 취미·역량개발 강좌를 살펴보세요.",provider:"수원시",source:"수원시 평생학습",url:"https://learning.suwon.go.kr/lmth/01_lecture01.asp",tag:"교육"},
  {category:"learning",title:"수원시 교육강좌 예약",description:"수원시에서 운영하는 교육 프로그램과 강좌를 확인하고 예약할 수 있어요.",provider:"수원시",source:"수원시 통합예약",url:"https://www.suwon.go.kr/web/reserv/edu/list.do",tag:"강좌"},
  {category:"connect",title:"청년공간·커뮤니티 정보 찾기",description:"청년공간, 교류 프로그램, 청년 참여 정보를 정책 포털에서 찾아보세요.",provider:"전국·경기도",source:"온통청년",url:"https://www.youthcenter.go.kr/main",tag:"커뮤니티"},
  {category:"enjoy",title:"수원 맛집·카페",description:"수원 곳곳의 맛집과 카페 정보를 소개할 예정이에요.",provider:"수원",source:"지역 생활정보",url:"https://www.suwon.go.kr/",tag:"맛집"},
  {category:"enjoy",title:"수원 명소·문화생활",description:"가볼 만한 장소와 전시, 축제 등 문화생활 정보를 소개할 예정이에요.",provider:"수원",source:"수원시",url:"https://www.suwon.go.kr/",tag:"명소"}
];
const categoryById = Object.fromEntries(categories.map(c=>[c.id,c]));
const app = document.getElementById("app");
const homeMarkup = app.innerHTML;

function renderHome(){
  app.innerHTML = homeMarkup;
  document.getElementById("policyGrid").innerHTML = categories.filter(c=>c.id!=="enjoy").map(c=>`
    <a class="category-card" href="#${c.id}">
      <span class="category-icon" style="background:${c.tone}">${c.icon}</span>
      <div><h3>${c.title}</h3><p>${c.desc}</p></div><span class="card-arrow">↗</span>
    </a>`).join("");
  document.getElementById("quickLinks").innerHTML = quickLinks.map(q=>`
    <a class="quick-card" href="${q.url}" target="_blank" rel="noopener noreferrer">
      <span class="quick-icon">${q.icon}</span><span><strong>${q.title}</strong><small>${q.desc}</small></span><span class="quick-arrow">↗</span>
    </a>`).join("");
  document.getElementById("searchForm").addEventListener("submit",e=>{
    e.preventDefault();const q=document.getElementById("searchInput").value;if(q.trim())showSearch(q);
  });
  document.getElementById("clearSearch").addEventListener("click",()=>{
    document.getElementById("searchInput").value="";
    document.getElementById("searchResultsSection").hidden=true;
  });
}
function resourceCard(item){
  return `<article class="resource-card"><div class="resource-meta"><span>${item.provider}</span><span>${item.tag}</span></div>
  <h3>${item.title}</h3><p>${item.description}</p>
  <a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.source} 바로가기 <span>↗</span></a></article>`;
}
function renderCategory(id){
  const c=categoryById[id];if(!c){location.hash="#home";return;}
  const items=sampleItems.filter(x=>x.category===id);
  const intro=id==="enjoy"?"수원의 맛집과 카페, 명소와 문화생활 정보를 모았어요.":"청년의 생활과 성장을 돕는 정보를 목적에 따라 모았어요.";
  app.innerHTML=`<section class="page-hero"><p class="section-kicker">${id==="enjoy"?"수원의 일상과 즐거움":"청년 지원 정보"}</p><h1>${c.title}</h1><p>${intro} 자세한 내용과 이용 조건은 각 기관 또는 업체의 공식 안내에서 확인해 주세요.</p></section>
  <section class="page-content"><div class="notice">안내 · 이 페이지는 정보 탐색을 돕는 링크 모음입니다. 신청 기간과 자격, 운영 여부는 공식 안내에서 최종 확인해 주세요.</div>
  <div class="filter-row" id="filterRow"><button class="filter-chip active" data-filter="전체">전체</button>${[...new Set(items.map(x=>x.tag))].map(t=>`<button class="filter-chip" data-filter="${t}">${t}</button>`).join("")}</div>
  <div class="resource-grid" id="resourceGrid">${items.map(resourceCard).join("")||'<div class="empty-state">등록된 정보가 아직 없어요. 곧 새로운 정보를 채워볼게요!</div>'}</div></section>`;
  document.querySelectorAll(".filter-chip").forEach(btn=>btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter-chip").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
    const filtered=btn.dataset.filter==="전체"?items:items.filter(x=>x.tag===btn.dataset.filter);
    document.getElementById("resourceGrid").innerHTML=filtered.length?filtered.map(resourceCard).join(""):'<div class="empty-state">해당 분류의 정보가 아직 없어요.</div>';
  }));
}
function showSearch(query){
  const section=document.getElementById("searchResultsSection"),results=document.getElementById("searchResults");if(!section||!results)return;
  const q=query.trim().toLowerCase();const found=sampleItems.filter(x=>[x.title,x.description,x.provider,x.source,x.tag].join(" ").toLowerCase().includes(q));
  section.hidden=false;results.innerHTML=found.length?found.map(resourceCard).join(""):'<div class="empty-state">검색 결과가 없어요. 다른 단어로 검색해 보세요.</div>';
  section.scrollIntoView({behavior:"smooth",block:"start"});
}
function route(){
  const id=location.hash.replace("#","")||"home";
  document.querySelectorAll(".main-nav a[data-route]").forEach(a=>a.classList.toggle("active",a.dataset.route===id));
  const nav=document.getElementById("mainNav"),toggle=document.getElementById("menuToggle");
  nav.classList.remove("open");toggle.setAttribute("aria-expanded","false");
  if(id==="home"){renderHome();return;}
  if(categoryById[id]){renderCategory(id);return;}
  location.hash="#home";
}
document.getElementById("menuToggle").addEventListener("click",()=>{
  const nav=document.getElementById("mainNav");nav.classList.toggle("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded",nav.classList.contains("open")?"true":"false");
});
window.addEventListener("hashchange",route);
renderHome();route();
