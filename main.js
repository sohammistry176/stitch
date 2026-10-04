const PRODUCTS=[
{id:1,n:"Indigo '78 Bell-Bottom Denim",c:"Denim",f:"pants",p:3490,r:4.9,b:"Bestseller",i:"p-denim"},
{id:2,n:"Brushed Layering Flannel",c:"Shirts",f:"shirts",p:2290,r:4.8,b:"New",i:"p-flannel"},
{id:3,n:"Merlot Club-Collar Shirt",c:"Shirts",f:"shirts",p:1890,r:4.7,b:"",i:"p-shirt"},
{id:4,n:"Noir Chelsea Boots",c:"Footwear",f:"footwear",p:4690,r:4.9,b:"",i:"p-boots"},
{id:5,n:"Textured Handloom Kurta",c:"Traditional",f:"traditional",p:2690,r:4.9,b:"Artisan",i:"p-kurta"},
{id:6,n:"Pleated Cocoa Trousers",c:"Pants",f:"pants",p:2490,r:4.7,b:"",i:"p-trousers"},
{id:7,n:"Field Note Utility Jacket",c:"Outerwear",f:"outerwear",p:3990,r:4.8,b:"Limited",i:"p-jacket"},
{id:8,n:"Heavyweight Box Tee",c:"T-Shirts",f:"tshirts",p:1290,r:4.8,b:"",i:"p-tee"},
{id:9,n:"Tobacco Suede Overshirt",c:"Shirts",f:"shirts",p:3790,r:4.6,b:"",i:"p-overshirt"}];
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const ls={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const inr=n=>"₹"+n.toLocaleString("en-IN");
const page=document.body.dataset.page;
let wish=ls.get("wish",[1,2,3,4]);
// auth gate
if(["wishlist","orders","feedback","checkout"].includes(page)&&!ls.get("user",null)){location.replace("login.html?next="+page+".html")}
// header + footer
const nav=[["new","New In","products.html"],["cat","Categories","categories.html"],["clo","Clothing","products.html"],["foot","Footwear","products.html"]];
const H=$("#hdr");if(H&&!H.hidden)H.outerHTML=`<header class="hdr"><div class="wrap">
<a class="ib burger" href="navigation.html" aria-label="Open menu">☰</a>
<a class="brand" href="index.html"><img src="images/logo.svg" alt="Stitch logo">Stitch</a>
<nav class="nav">${nav.map(x=>`<a href="${x[2]}">${x[1]}</a>`).join("")}</nav>
<form class="search" onsubmit="event.preventDefault();location='products.html'"><span>⌕</span><input aria-label="Search" placeholder="Search shirts, denim, shoes"></form>
<div class="icons"><a class="dsk" href="orders.html">⬡ My Orders</a><a class="ib only-m" href="search" onclick="event.preventDefault();location='navigation.html'" aria-label="Search">⌕</a>
<a class="ib only-m" href="wishlist.html" aria-label="Wishlist">♡</a><a class="ib" href="cart.html" aria-label="Bag">👜<span class="cnt">2</span></a><a class="ib dsk" href="login.html" aria-label="Account">◯</a></div></div></header>`;
const F=$("#ftr");if(F&&!F.hidden)F.outerHTML=`<footer><div class="wrap"><div><a class="brand" href="index.html"><img src="images/logo.svg" alt="">Stitch</a><p>Considered clothing for modern Indian wardrobes.</p></div>
<nav><a href="#">Shipping</a><a href="#">Returns</a><a href="#">Care</a><a href="#">Instagram</a><a href="feedback.html">Feedback</a></nav></div></footer>`;
// cards
function card(p,mode){return `<article class="card"><div class="ph"><a href="product.html"><img src="images/${p.i}.svg" alt="${p.n}"></a>${p.b?`<span class="badge">${p.b}</span>`:""}
${mode=="wish"?`<button class="heart" data-rm="${p.id}" aria-label="Remove from wishlist">×</button>`:`<button class="heart ${wish.includes(p.id)?"on":""}" data-w="${p.id}" aria-label="Add to wishlist">♡</button>`}</div>
<div class="meta"><div class="row"><span>${p.c}</span><span>★ ${p.r}</span></div><a class="t" href="product.html">${p.n}</a><span class="price">${inr(p.p)}</span>
${mode=="wish"?`<a class="btn block" style="margin-top:10px" href="cart.html">Add to Cart</a>`:""}</div></article>`}
function render(sel,list,mode){const e=$(sel);if(e)e.innerHTML=list.map(p=>card(p,mode)).join("")||'<p class="small">Nothing here yet. Browse the shop and tap ♡ to save pieces.</p>'}
document.addEventListener("click",e=>{const h=e.target.closest("[data-w]");if(h){const id=+h.dataset.w;wish=wish.includes(id)?wish.filter(x=>x!=id):[...wish,id];ls.set("wish",wish);h.classList.toggle("on")}
const r=e.target.closest("[data-rm]");if(r){wish=wish.filter(x=>x!=+r.dataset.rm);ls.set("wish",wish);render("#wgrid",PRODUCTS.filter(p=>wish.includes(p.id)),"wish");$("#wcount").textContent=wish.length+" saved styles"}});
render("#most",[PRODUCTS[0],PRODUCTS[1],PRODUCTS[2],PRODUCTS[3]]);render("#top",[PRODUCTS[4],PRODUCTS[6],PRODUCTS[7],PRODUCTS[5]]);
if(page=="wishlist"){render("#wgrid",PRODUCTS.filter(p=>wish.includes(p.id)),"wish");$("#wcount").textContent=wish.length+" saved styles"}
// PLP
if(page=="products"){let shown=9;const q=()=>{let l=PRODUCTS.filter(p=>!$$("[data-cat]:checked").length||$$("[data-cat]:checked").some(c=>c.dataset.cat==p.f));
l=l.filter(p=>p.p<=+$("#pr").value);const s=$("#sort").value;l.sort((a,b)=>s=="pop"?b.r-a.r:s=="low"?a.p-b.p:s=="new"?(b.b=="New")-(a.b=="New"):a.id-b.id);
render("#pgrid",l.slice(0,shown));$("#cnt").textContent=l.length+" pieces · made to live in";$("#prv").textContent=inr(+$("#pr").value);};
$$("[data-cat],#pr,#sort").forEach(x=>x.addEventListener("input",q));$$(".sz").forEach(b=>b.onclick=()=>b.classList.toggle("on"));
$("#clear").onclick=()=>{$$("[data-cat]").forEach(c=>c.checked=false);$("#pr").value=5000;q()};$("#ft").onclick=()=>$("#filters").classList.toggle("open");q()}
// PDP
if(page=="product"){$$(".thumbs img").forEach(t=>t.onclick=()=>{$("#main").src=t.src;$$(".thumbs img").forEach(x=>x.classList.remove("on"));t.classList.add("on")});
$$(".sz").forEach(b=>b.onclick=()=>{$$(".sz").forEach(x=>x.classList.remove("on"));b.classList.add("on")});$$(".dot").forEach(d=>d.onclick=()=>{$$(".dot").forEach(x=>x.classList.remove("on"));d.classList.add("on");$("#cn").textContent=d.title});
$("#add").onclick=()=>{$("#msg").textContent="Added to your bag.";$("#msg").hidden=false}}
// Cart
if(page=="cart"){const rows=$$(".crow[data-p]");const calc=()=>{let s=0;rows.forEach(r=>{const q=+$(".qty span",r).textContent,p=+r.dataset.p;$(".tt",r).textContent=inr(p*q);s+=p*q});const t=Math.round(s*.05);$("#sub").textContent=inr(s);$("#tax").textContent=inr(t);$("#tot").textContent=inr(s+t)};
rows.forEach(r=>{$$(".qty button",r).forEach((b,i)=>b.onclick=()=>{const e=$(".qty span",r);e.textContent=Math.max(1,+e.textContent+(i?1:-1));calc()});$(".rm",r).onclick=()=>{r.remove();rows.splice(rows.indexOf(r),1);calc()}});calc()}
// Auth + forms
const next=new URLSearchParams(location.search).get("next")||"index.html";
$$("form[data-auth]").forEach(f=>f.addEventListener("submit",e=>{e.preventDefault();ls.set("user",{name:"Guest"});location.href=next}));
$$("[data-social]").forEach(b=>b.onclick=()=>{ls.set("user",{name:"Guest"});location.href=next});
$$("form[data-pay]").forEach(f=>f.addEventListener("submit",e=>{e.preventDefault();location.href="orders.html"}));
$$("form[data-fb]").forEach(f=>f.addEventListener("submit",e=>{e.preventDefault();$("#fbok").hidden=false;f.reset()}));
$$(".chip").forEach(c=>c.onclick=()=>{$$(".chip").forEach(x=>x.classList.remove("on"));c.classList.add("on");const s=$("#fcat");if(s)s.value=c.textContent});
const ta=$("#desc");if(ta)ta.oninput=()=>$("#dc").textContent=ta.value.length+" / 1000";
if(page=="nav"&&innerWidth>1024)location.replace("index.html");
