(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const Bs="white-tower-analytics-",ks=864e5,gl=200;function ud(n){const e=n.now??Date.now,t=n.id??(()=>crypto.randomUUID()),i=n.storage,r=C=>{try{return i?.getItem(Bs+C)??null}catch{return null}},s=(C,L)=>{try{L===null?i?.removeItem(Bs+C):i?.setItem(Bs+C,L)}catch{}};let a=r("consent")==="yes",o="",l="",c=0,f=0,h=!1,d=!1,u=0,g=0,_,p,m=[];const y=new Set,A=n.send??(async(C,L)=>{const U=await fetch(n.host+"/batch/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({api_key:n.key,batch:C}),credentials:"omit",signal:L});return U.ok?!(await U.json().catch(()=>null))?.quota_limited?.length:!1});function x(){s("queue",JSON.stringify(m.slice(-gl)))}function T(){if(!o){o=r("player")||t(),s("player",o);try{const C=JSON.parse(r("session")||"null");C&&typeof C.id=="string"&&e()-C.last<ks&&e()-C.last<18e5&&(l=C.id,c=C.last)}catch{}try{const C=JSON.parse(r("attempt")||"null");C&&typeof C.id=="string"&&typeof C.level=="string"&&typeof C.version=="string"&&(p=C)}catch{}try{const C=JSON.parse(r("queue")||"[]");Array.isArray(C)&&(m=C.filter(L=>typeof L?.uuid=="string"&&typeof L?.event=="string"&&L.properties?.distinct_id===o&&e()-Date.parse(L.timestamp)<ks&&e()>=Date.parse(L.timestamp)).slice(-gl))}catch{}}}function E(C,L={},U){return h||!a||!n.key||!/^wt_[a-z_]+$/.test(C)||(T(),U&&y.has(U))?!1:(U&&(y.add(U),y.size>1e3&&y.delete(y.values().next().value)),(!l||e()-c>=18e5)&&(l=t(),f=0),c=e(),s("session",JSON.stringify({id:l,last:c})),m=m.filter(N=>e()-Date.parse(N.timestamp)<ks).slice(-199),m.push({uuid:t(),event:C,timestamp:new Date(e()).toISOString(),properties:{...L,distinct_id:o,session_id:l,event_sequence:++f,schema_version:1,build_version:n.build,environment:n.environment,consent:!0,$process_person_profile:!1,$geoip_disable:!0}}),x(),!0)}async function P(){if(h||!a||d||!m.length||u>=4)return;const C=m.slice(0,20),L=g;d=!0,_=new AbortController;const U=setTimeout(()=>_?.abort(),8e3);try{const N=await A(C,_.signal);if(L!==g)return;if(N){const I=new Set(C.map(H=>H.uuid));m=m.filter(H=>!I.has(H.uuid)),u=0,x()}else u++}catch{L===g&&u++}finally{clearTimeout(U),d=!1}}function S(C){if(!h&&(a=C,g++,_?.abort(),u=0,y.clear(),s("consent",C?"yes":"no"),!C)){m=[],o="",l="",p=void 0;for(const L of["player","session","attempt","queue"])s(L,null)}}function b(C,L,U=!1,N=!0){if(!a)return;T();const I=U&&p?.level===C&&p.version===L;I||(p={id:t(),level:C,version:L},s("attempt",JSON.stringify(p))),E(I?"wt_level_resumed":"wt_level_started",{level_id:C,content_version:L,attempt_id:p.id,observed_from_start:N},"start:"+p.id)}return Object.freeze({track:E,flush:P,setConsent:S,beginAttempt:b,context:()=>p?{attempt_id:p.id,level_id:p.level,content_version:p.version}:{},consent:()=>a,resetRetry(){u=0},retryDelay:()=>Math.min(6e4,5e3*2**u),snapshot:()=>({consent:a,queued:m.length,retries:u,flight:d}),dispose(){h=!0,g++,_?.abort()}})}function dd(){let n;try{n=localStorage}catch{}const t=ud({key:"phc_q3yjbn6wrVZg3pJCvVo4STfk8t4UJ4uP6jwDPYpWoudj",host:"https://eu.i.posthog.com",environment:"production",build:"58012c7",...n?{storage:n}:{}});let i;function r(){i=setTimeout(async()=>{navigator.onLine&&await t.flush(),r()},t.retryDelay())}r();const s=document.createElement("button");s.type="button",s.className="analytics-choice",s.textContent="Privacy";const a=document.createElement("dialog");a.className="analytics-dialog",a.setAttribute("aria-label","Optional game analytics");const o=document.createElement("h2");o.textContent="Help improve White Tower";const l=document.createElement("p");l.textContent="Allow optional game analytics? We send level progress, actions and technical errors with a random identifier to PostHog in the EU. No names, email or screen recordings. You can change this choice here at any time.";const c=document.createElement("button");c.textContent="Allow analytics",c.type="button";const f=document.createElement("button");f.textContent="No thanks",f.type="button";const h=document.createElement("a");h.href="https://posthog.com/privacy",h.target="_blank",h.rel="noopener",h.textContent="PostHog privacy";const d=document.createElement("p");d.className="analytics-status",a.append(o,l,c,f,h,d),document.body.append(s,a);let u=!1;try{u=!!n?.getItem("white-tower-analytics-consent")}catch{}let g=()=>{};function _(){d.textContent=t.consent()?"Analytics is enabled. Choosing No thanks clears the local analytics identifier and pending events.":"Analytics is disabled.",a.showModal()}s.addEventListener("click",_),c.addEventListener("click",()=>{t.setConsent(!0),u=!0,a.close(),g()}),f.addEventListener("click",()=>{t.setConsent(!1),u=!0,a.close()});function p(){t.resetRetry(),t.flush()}return window.addEventListener("online",p),window.addEventListener("pagehide",p),{...t,showChoice(){u||_()},onEnable(m){g=m},dispose(){clearTimeout(i),window.removeEventListener("online",p),window.removeEventListener("pagehide",p),t.dispose(),s.remove(),a.remove()}}}const Wt=1e5,an=1e5,Er=new Set(["SE","SW","NW","NE","E","W","N","S"]),vl=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),br=n=>typeof n=="object"&&n!==null&&!Array.isArray(n),ms=n=>{if(n&&typeof n=="object"&&!Object.isFrozen(n)){Object.freeze(n);for(const e of Object.values(n))ms(e)}return n},zs=(n,e)=>`${n},${e}`,fd=(n,e)=>`stack:${n},${e}`;function zc(n){const e=[],t=(d,u)=>e.push({path:d,message:u});if(!br(n))return{ok:!1,errors:[{path:"$",message:"Ожидался объект уровня."}]};const i=new Set(["schemaVersion","id","title","cells","stacks","totalTiles","cameraPreset","tutorialKey","parMoves","knownSolution"]);for(const d of Object.keys(n))i.has(d)||t(d,"Неизвестное поле.");n.schemaVersion!==1&&t("schemaVersion","Поддерживается только версия схемы 1."),(typeof n.id!="string"||!/^[a-zA-Z0-9_-]{1,80}$/.test(n.id))&&t("id","Нужен непустой идентификатор (до 80 символов: латиница, цифры, _ или -)."),(typeof n.title!="string"||n.title.length>160)&&t("title","Название должно быть строкой длиной до 160 символов."),(typeof n.cameraPreset!="string"||n.cameraPreset.length===0||n.cameraPreset.length>80)&&t("cameraPreset","Нужен идентификатор пресета камеры."),n.tutorialKey!==null&&(typeof n.tutorialKey!="string"||n.tutorialKey.length>120)&&t("tutorialKey","Ожидался null или ключ до 120 символов."),(!Number.isSafeInteger(n.parMoves)||n.parMoves<0)&&t("parMoves","Ожидалось неотрицательное целое число."),(!Number.isSafeInteger(n.totalTiles)||n.totalTiles<1||n.totalTiles>an)&&t("totalTiles",`Ожидалось целое число от 1 до ${an}.`);const r=[],s=new Set;!Array.isArray(n.cells)||n.cells.length===0||n.cells.length>an?t("cells",`Ожидался непустой массив до ${an} клеток.`):n.cells.forEach((d,u)=>{const g=`cells[${u}]`;if(!br(d)){t(g,"Ожидался объект клетки.");return}for(const A of Object.keys(d))["u","v","kind","direction"].includes(A)||t(`${g}.${A}`,"Неизвестное поле.");const{u:_,v:p,kind:m,direction:y}=d;if((!Number.isSafeInteger(_)||Math.abs(_)>Wt)&&t(`${g}.u`,`Ожидалось целое число в пределах ±${Wt}.`),(!Number.isSafeInteger(p)||Math.abs(p)>Wt)&&t(`${g}.v`,`Ожидалось целое число в пределах ±${Wt}.`),["normal","redirect","blocked"].includes(String(m))||t(`${g}.kind`,"Неизвестный вид клетки."),m==="redirect"&&!Er.has(String(y))&&t(`${g}.direction`,"Для redirect требуется одно из восьми направлений."),m!=="redirect"&&vl(d,"direction")&&t(`${g}.direction`,"Направление допустимо только для redirect."),Number.isSafeInteger(_)&&Number.isSafeInteger(p)&&Math.abs(_)<=Wt&&Math.abs(p)<=Wt){const A=zs(_,p);s.has(A)&&t(g,`Координата ${A} повторяется.`),s.add(A),["normal","redirect","blocked"].includes(String(m))&&(m!=="redirect"||Er.has(String(y)))&&r.push({u:_,v:p,kind:m,...m==="redirect"?{direction:y}:{}})}});const a=[],o=new Set;let l=0,c=0;!Array.isArray(n.stacks)||n.stacks.length===0||n.stacks.length>an?t("stacks",`Ожидался непустой массив до ${an} стопок.`):n.stacks.forEach((d,u)=>{const g=`stacks[${u}]`;if(!br(d)){t(g,"Ожидался объект стопки.");return}for(const A of Object.keys(d))["u","v","height","launchDirection"].includes(A)||t(`${g}.${A}`,"Неизвестное поле.");const{u:_,v:p,height:m,launchDirection:y}=d;for(const[A,x]of[["u",_],["v",p]])(!Number.isSafeInteger(x)||Math.abs(x)>Wt)&&t(`${g}.${A}`,`Ожидалось целое число в пределах ±${Wt}.`);if((!Number.isSafeInteger(m)||m<1||m>an)&&t(`${g}.height`,`Ожидалось целое число от 1 до ${an}.`),vl(d,"launchDirection")&&!Er.has(String(y))&&t(`${g}.launchDirection`,"Неизвестное направление запуска."),Number.isSafeInteger(_)&&Number.isSafeInteger(p)&&Math.abs(_)<=Wt&&Math.abs(p)<=Wt){const A=zs(_,p);o.has(A)&&t(g,`Стопка на координате ${A} повторяется.`),o.add(A);const x=r.find(T=>zs(T.u,T.v)===A);x?x.kind==="blocked"&&t(g,"На заблокированной клетке нельзя размещать стопку."):t(g,"Под стопкой нет клетки пола."),Number.isSafeInteger(m)&&m>=1&&m<=an&&(l+=m,c=Math.max(c,m),a.push({id:fd(_,p),u:_,v:p,height:m,...Er.has(String(y))?{launchDirection:y}:{}}))}}),Number.isSafeInteger(n.totalTiles)&&l!==n.totalTiles&&t("totalTiles",`Значение должно совпадать с суммой высот (${l}).`),c===l&&l>0&&t("stacks","Уровень уже решён в начальном состоянии.");const f=[];return!Array.isArray(n.knownSolution)||n.knownSolution.length===0||n.knownSolution.length>an?t("knownSolution","Ожидался непустой список координат ходов."):n.knownSolution.forEach((d,u)=>{const g=`knownSolution[${u}]`;if(!br(d)||!Number.isSafeInteger(d.u)||!Number.isSafeInteger(d.v)||Math.abs(d.u)>Wt||Math.abs(d.v)>Wt){t(g,"Ожидались целые координаты хода.");return}f.push({u:d.u,v:d.v})}),e.length?{ok:!1,errors:ms(e)}:{ok:!0,value:ms({schemaVersion:1,id:n.id,title:n.title,cells:r,stacks:a,totalTiles:n.totalTiles,cameraPreset:n.cameraPreset,tutorialKey:n.tutorialKey,parMoves:n.parMoves,knownSolution:f})}}function Pa(n){const e=n.stacks.map(t=>({...t}));return ms({levelId:n.id,stacks:e,moveCount:0})}function qi(n){const e=n.stacks.reduce((t,i)=>t+i.height,0);return n.stacks.length===1&&n.stacks[0]?.height===e}function Hc(n,e="/White-Tower-Play/"){return`${e.replace(/\/$/,"")}/${n.replace(/^\//,"")}`}const _l=new Map;class At extends Error{constructor(e,t){super(t),this.code=e,this.name="ContentLoadError"}}function hd(n){if(typeof n!="object"||n===null||Array.isArray(n))throw new At("catalog","Catalog must be an object.");const e=n;if(e.schemaVersion!==1||typeof e.contentVersion!="string"||!Array.isArray(e.levels)||e.levels.length<1||e.levels.length>120)throw new At("catalog","Catalog version or level list is invalid (expected 1–120 entries).");const t=new Set,i=[];return e.levels.forEach((r,s)=>{if(typeof r!="object"||r===null||Array.isArray(r))throw new At("catalog",`Entry ${s} must be an object.`);const a=r,o=`level-${String(s+1).padStart(3,"0")}`,l=`/content/levels/${String(s+1).padStart(3,"0")}.json`;if(a.id!==o||a.path!==l||typeof a.sha256!="string"||!/^[a-f0-9]{64}$/.test(a.sha256))throw new At("catalog",`Entry ${s} has invalid order, path or checksum.`);if(t.has(o))throw new At("catalog",`Duplicate level ${o}.`);t.add(o),i.push(Object.freeze({id:o,path:l,sha256:a.sha256}))}),Object.freeze({schemaVersion:1,contentVersion:e.contentVersion,levels:Object.freeze(i)})}async function Vc(n=Hc("/content/catalog.json"),e=fetch){let t;try{t=await e(n)}catch(r){throw new At("network",r instanceof Error?r.message:String(r))}if(!t.ok)throw new At("network",`Catalog request failed (${t.status}).`);let i;try{i=await t.json()}catch(r){throw new At("json",r instanceof Error?r.message:"Invalid catalog JSON.")}return hd(i)}async function rs(n,e,t=fetch,i){const r=n.levels.find(u=>u.id===e);if(!r)throw new At("missing-level",`Level ${e} is not in the catalog.`);const s=`${n.contentVersion}:${r.sha256}`,a=_l.get(s);if(a)return a;let o;try{o=await t(Hc(r.path),i?{signal:i}:void 0)}catch(u){throw new At("network",u instanceof Error?u.message:String(u))}if(!o.ok)throw new At("network",`Level request failed (${o.status}).`);let l;try{l=new Uint8Array(await o.arrayBuffer())}catch(u){throw new At("network",u instanceof Error?u.message:`Could not read ${e}.`)}let c;try{c=await crypto.subtle.digest("SHA-256",l)}catch(u){throw new At("checksum",u instanceof Error?u.message:"SHA-256 is unavailable.")}if([...new Uint8Array(c)].map(u=>u.toString(16).padStart(2,"0")).join("")!==r.sha256)throw new At("checksum",`Checksum mismatch for ${e}.`);let h;try{h=JSON.parse(new TextDecoder().decode(l))}catch(u){throw new At("json",u instanceof Error?u.message:`Invalid JSON for ${e}.`)}const d=zc(h);if(!d.ok)throw new At("schema",d.errors.map(u=>`${u.path}: ${u.message}`).join("; "));if(d.value.id!==r.id)throw new At("identity",`Catalog ID does not match level ${e}.`);return _l.set(s,d.value),d.value}async function pd(n,e,t,i=4){let r=0,s=0;const a=n.length;e({completed:s,total:a}),await Promise.all(Array.from({length:Math.min(Math.max(1,i),n.length)},async()=>{for(;r<n.length;){t.throwIfAborted();const o=n[r++];await o(),t.throwIfAborted(),e({completed:++s,total:a})}}))}function md(n,e){const t=new AbortController,i=[];let r={total:1};const s=o=>{r=o,n({completed:o.completed,total:o.total+1})},a=(async()=>{const[o,l]=await Promise.all([Vc(),fetch(e+"runtime-assets.json",{signal:t.signal})]);if(!l.ok)throw new Error("Could not load resource manifest.");const c=await l.json();if(!Array.isArray(c)||c.some(d=>typeof d!="string"||!d.startsWith("/assets/")||d.includes("..")))throw new Error("Invalid resource manifest.");const h=[...new Set(c)].map(d=>e+d.replace(/^\//,"")).map(d=>async()=>{if(/\.(png|webp|jpg|svg)$/.test(d)){const u=new Image;i.push(u),u.src=d,await u.decode(),t.signal.throwIfAborted()}else{const u=await fetch(d,{signal:t.signal});if(!u.ok)throw new Error("A game resource could not load.");await u.arrayBuffer()}});return h.push(...o.levels.map(d=>async()=>{await rs(o,d.id,fetch,t.signal)})),h.push(async()=>{await document.fonts.ready}),await pd(h,s,t.signal),o})();return a.catch(()=>t.abort()),{catalog:a,complete(){n({completed:r.total+1,total:r.total+1}),i.length=0},dispose(){t.abort();for(const o of i)o.src="";i.length=0}}}function Gc(n,e){return n.left<e.right&&n.right>e.left&&n.top<e.bottom&&n.bottom>e.top}function gd(n,e,t,i,r){for(const s of[t,Math.max(64,t*.9),Math.max(64,t*.82)]){const a=s*.03+4;for(const o of[.68,.69,.7,.71,.72,.73,.74,.75,.76,.77,.78,.79,.8,.67,.66,.65,.64,.63,.62,.61,.6])for(const l of[.035,.055,.085]){const c=i==="left"?n*l:n*(1-l)-s,f=e*o,h={left:c-a-6,top:f-a-8,right:c+s+a+6,bottom:f+s+a};if(!(h.left<0||h.right>n||h.top<0||h.bottom>e)&&!r.some(d=>Gc(h,{left:d.left-8,top:d.top-8,right:d.right+8,bottom:d.bottom+8})))return{left:c,top:f,size:s,envelope:h}}}}const vd=Object.freeze([0,3,1,4,2,5,4,1,5,2,3,0,3,4,1,5,2,0]),Tr=3;function _d(n){if(!Number.isInteger(n)||n<0||n>=6)throw new RangeError("Unknown island variant");return Object.freeze({atlas:Math.floor(n/Tr),position:n%Tr/(Tr-1)*100,size:`${Tr*100}% 100%`})}function xd(){const n=document.createElement("div");n.className="world-background",n.setAttribute("aria-hidden","true");const e=new URL("/White-Tower-Play/assets/d6e0f3fda0cf5f945414611ec51e7776c51d6a4d8ed5091ccfb4cfa152ddd2eb-BOICj0eF.webp",import.meta.url).href,t=new URL("/White-Tower-Play/assets/ace740fbb6ae060823a80612b9a364bc1bcc1e9e66c494fcf15747c3fc6c9fcc--AN1OQgl.webp",import.meta.url).href;n.style.setProperty("--island-atlas",`url("${e}")`);const i=new URL("/White-Tower-Play/assets/62ddc5cfe48fbdd838d151ad662e755f9e16620c552849f2b5bbeebd95f66ef4-CZEfXKMt.webp",import.meta.url).href;n.style.setProperty("--cloud-atlas",`url("${i}")`);for(let a=0;a<10;a++){const o=document.createElement("div");o.className=`world-cloud cloud-${a+1}`,o.style.backgroundPosition=`${a%3*50}% 50%`,n.append(o)}const r=document.createElement("div");r.className="world-islands",n.append(r);for(const[a,o]of vd.entries()){const l=document.createElement("div");l.className=`world-island island-${a+1}`;const c=document.createElement("div");c.className="island-sprite";const f=_d(o);c.dataset.variant=String(o),c.style.setProperty("--island-atlas",`url("${f.atlas?t:e}")`),c.style.backgroundPosition=`${f.position}% 50%`,c.style.backgroundSize=f.size,l.append(c),r.append(l)}document.body.prepend(n);let s=[];return Object.freeze({update(a,o){n.classList.toggle("is-still",a),n.classList.toggle("is-paused",o)},refreshLayout(){s=[...r.querySelectorAll(".world-island")].map(a=>{const o=getComputedStyle(a),l=parseFloat(o.getPropertyValue("--sway"))||0,c=parseFloat(o.getPropertyValue("--rise"))||0,f=a.offsetWidth*.03+4;return{node:a,left:a.offsetLeft+Math.min(0,l)-f,top:a.offsetTop+Math.min(0,c)-f,right:a.offsetLeft+a.offsetWidth+Math.max(0,l)+f,bottom:a.offsetTop+a.offsetHeight+Math.max(0,c)+f}})},setExclusion(a=[]){const o=[...document.querySelectorAll(".hud-undo,.hud-hint")].map(c=>c.getBoundingClientRect()).filter(c=>c.width&&c.height),l=[...a,...o];for(const c of s){if(c.node.matches(".island-13,.island-16")){const d=gd(window.innerWidth,window.innerHeight,Math.max(64,Math.min(140,window.innerWidth*.2)),c.node.matches(".island-13")?"left":"right",l);c.node.style.visibility=d?"":"hidden",d&&(c.node.style.width=`${d.size}px`,c.node.style.left=`${d.left}px`,c.node.style.right="auto",c.node.style.top=`${d.top}px`,c.node.style.bottom="auto");continue}const h=l.some(d=>Gc(d,c))?"hidden":"";c.node.style.visibility!==h&&(c.node.style.visibility=h)}},dispose(){n.remove()}})}const xl=1536,Sl=1024,Ro=[{rect:[32,16,479,496],solid:[.015609756097560976,.014532243415077202,.984390243902439,.9854677565849228]},{rect:[544,16,991,496],solid:[.015655577299412915,.014585232452142206,.9843444227005871,.9854147675478578]},{rect:[1053,16,1506,496],solid:[.01557935735150925,.014692378328741965,.9844206426484907,.9853076216712581]},{rect:[31,528,481,1008],solid:[.015503875968992248,.014545454545454545,.9844961240310077,.9854545454545455]},{rect:[544,528,992,1008],solid:[.015533980582524271,.014505893019038985,.9844660194174757,.985494106980961]},{rect:[1055,528,1505,1008],solid:[.015549076773566569,.014585232452142206,.9844509232264335,.9854147675478578]}],Wc=3,Lo=22,Po=Wc*Lo,Pi=76,cr=26,Ar=Object.freeze(Ro.reduce((n,{solid:e})=>{const t=Pi*2/(e[2]-e[0]),i=(Pi*2+Po)/(e[3]-e[1]),r=-Pi-e[0]*t,s=Pi+e[1]*i;return{left:Math.min(n.left,r),right:Math.max(n.right,r+t),top:Math.max(n.top,s),bottom:Math.min(n.bottom,s-i)}},{left:0,right:0,top:0,bottom:0})),dt=Object.freeze({width:720,height:1280}),ti=72,Cn=.82,Tt=ti,Ri=Tt,ii=22,Xc=12+cr+Po,Ml=30,Io=.44*ti,Sd=1.33;function gs(n,e){return e.u+e.v-n.u-n.v||n.u-e.u||n.v-e.v}function Do(n,e,t,i){return Object.freeze({x:i.originX+(n-e)*ti*i.scale,y:i.originY-(n+e)*ti*i.scale-t*i.layerRise*i.scale})}function vs(n,e,t,i){return Do(n,e,t+ii/i.layerRise,i)}function Md(n,e,t){if(t.width<=0||t.height<=0)return;const i=Math.min(t.width/dt.width,t.height/dt.height),r=(t.width-dt.width*i)/2,s=(t.height-dt.height*i)/2,a=(n-t.left-r)/i,o=(e-t.top-s)/i;if(!(a<0||o<0||a>dt.width||o>dt.height))return Object.freeze({x:a,y:o})}function yl(n,e){let t=!1;for(let i=0,r=e.length-1;i<e.length;r=i++){const s=e[i],a=e[r];s.y>n.y!=a.y>n.y&&n.x<(a.x-s.x)*(n.y-s.y)/(a.y-s.y)+s.x&&(t=!t)}return t}function yd(n,e,t){const i=[...e].sort((a,o)=>gs(o,a)),r=Tt*t.scale,s=ii*t.scale;for(const a of i)for(let o=a.height-1;o>=0;o--){const l=vs(a.u,a.v,o,t),c=Math.abs(n.x-l.x),f=Math.abs(n.y-l.y);if(c+f<=r)return a.id;const h={x:l.x,y:l.y+r},d={x:l.x+r,y:l.y},u={x:l.x-r,y:l.y},g={x:h.x,y:h.y+s},_={x:d.x,y:d.y+s},p={x:u.x,y:u.y+s};if(yl(n,[d,h,g,_])||yl(n,[h,u,p,g]))return a.id}}const On=Object.freeze({left:60,right:660,top:320,bottom:1020});function qc(n,e){const t=n.cells.filter(f=>f.kind!=="blocked"),i=t.map(f=>(f.u-f.v)*ti),r=t.map(f=>-(f.u+f.v)*ti),s=e.map(f=>-(f.u+f.v)*ti-Tt-(Math.max(0,f.height-1)+(f.lift??0))*Io-ii),a=Math.min(...i)+Math.min(-Tt,Ar.left)-Ml,o=Math.max(...i)+Math.max(Tt,Ar.right)+Ml,l=Math.min(...r.map(f=>Math.min(f-Tt,f+12+cr-Ar.top-1)),...s),c=Math.max(...r)+Math.max(Tt+Xc,13+cr-Ar.bottom);return Object.freeze({minX:a,minY:l,maxX:o,maxY:c,width:o-a,height:c-l})}function fn(n,e){const t=qc(n,e),i=Math.min(Sd,(On.right-On.left)/t.width,(On.bottom-On.top)/(t.height*Cn)),r=(On.top+On.bottom)/2;return Object.freeze({scale:i,layerRise:Io,originX:(On.left+On.right)/2-(t.minX+t.maxX)/2*i,originY:dt.height/2+(r-dt.height/2)/Cn-(t.minY+t.maxY)/2*i})}function Ed(n){const e=n.cells.filter(i=>i.kind!=="blocked"),t=[fn(n,[]),...e.map(i=>fn(n,[{...i,height:n.totalTiles,lift:Math.max(3,n.totalTiles*.75)}]))];return e.map(i=>{const r=t.map(s=>{const a=ss(Do(i.u,i.v,0,s));return{left:a.x-Tt*s.scale,right:a.x+Tt*s.scale,top:a.y-Tt*s.scale*Cn,bottom:a.y+(Tt+Xc)*s.scale*Cn}});return{left:Math.min(...r.map(s=>s.left)),right:Math.max(...r.map(s=>s.right)),top:Math.min(...r.map(s=>s.top)),bottom:Math.max(...r.map(s=>s.bottom))}})}function ss(n){return Object.freeze({x:n.x,y:dt.height/2+(n.y-dt.height/2)*Cn})}function bd(n){return Object.freeze({x:n.x,y:dt.height/2+(n.y-dt.height/2)/Cn})}function Td(){const n=new Map,e=new Map;let t=typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,i=!1;function r(a){const o=n.get(a);n.delete(a),e.delete(a),o?.cancel(),a.removeAttribute("data-ui-leaving")}function s(a,o,l){if(r(a),t||typeof a.animate!="function"){l?.();return}o&&a.setAttribute("data-ui-leaving","");const c=a.animate(o?[{opacity:1,scale:1},{opacity:0,scale:.98}]:[{opacity:0,scale:.96,translate:"0 6px"},{opacity:1,scale:1,translate:"0 0"}],{duration:o?180:280,easing:"cubic-bezier(.2,.8,.2,1)",fill:"both"});n.set(a,c),l&&e.set(a,l),i&&c.pause(),c.finished.then(()=>{if(n.get(a)!==c)return;const f=e.get(a);r(a),f?.()}).catch(()=>{})}return Object.freeze({reveal(a){s(a,!1)},hide(a,o){s(a,!0,o)},cancel:r,update(a,o){if(t=a,i=o,t)for(const l of[...n.keys()]){const c=e.get(l);r(l),c?.()}else for(const l of n.values())i?l.pause():l.playState==="paused"&&l.play()},dispose(){for(const a of[...n.keys()])r(a)}})}function Ad({step:n=1/60,maxSteps:e=8}={}){if(!Number.isFinite(n)||n<=0||!Number.isInteger(e)||e<1)throw new RangeError("Invalid fixed-step configuration");let t=0;return{reset(){t=0},advance(i,r){if(!Number.isFinite(i)||i<0)throw new RangeError("Invalid frame delta");t+=i;let s=0;for(;t+n*1e-9>=n&&s<e;)r(n),t=Math.max(0,t-n),s++;const a=Math.floor((t+n*1e-9)/n)*n;return t=Math.max(0,t-a),{steps:s,alpha:Math.min(t/n,1),dropped:a}}}}function wd(n=window){const e=new Set,t=s=>e.add(s.code),i=s=>e.delete(s.code),r=()=>e.clear();return n.addEventListener("keydown",t),n.addEventListener("keyup",i),n.addEventListener("blur",r),{keys:e,reset:r,dispose(){n.removeEventListener("keydown",t),n.removeEventListener("keyup",i),n.removeEventListener("blur",r),r()}}}function Cd(n,e){const t=e.maxMovement??12,i=e.duplicateWindowMs??220,r=e.environment?.windowTarget??window,s=e.environment?.documentTarget??document;let a,o;const l=n.style.touchAction;n.style.touchAction="none";function c(_){const p=Md(_.clientX,_.clientY,n.getBoundingClientRect());return p?e.pickStack(p):void 0}function f(_){if(!_.isPrimary||a||_.pointerType==="mouse"&&_.button!==0)return;const p=c(_);if(p){a={pointerId:_.pointerId,stackId:p,x:_.clientX,y:_.clientY},_.preventDefault(),n.focus({preventScroll:!0});try{n.setPointerCapture(_.pointerId)}catch{}}}function h(_){if(!a||a.pointerId!==_.pointerId)return;const p=a;a=void 0,_.preventDefault();const m=Math.hypot(_.clientX-p.x,_.clientY-p.y),y=Number.isFinite(_.timeStamp)?_.timeStamp:performance.now(),A=o?.stackId===p.stackId&&y-o.at<i;m<=t&&c(_)===p.stackId&&!A&&e.activate(p.stackId)&&(o={stackId:p.stackId,at:y})}function d(_){if(_&&a?.pointerId!==_.pointerId)return;const p=a?.pointerId;if(a=void 0,p!==void 0)try{n.hasPointerCapture(p)&&n.releasePointerCapture(p)}catch{}}const u=()=>d(),g=()=>{s.hidden&&d()};return n.addEventListener("pointerdown",f),n.addEventListener("pointerup",h),n.addEventListener("pointercancel",d),n.addEventListener("lostpointercapture",d),r.addEventListener("blur",u),s.addEventListener("visibilitychange",g),Object.freeze({cancel:d,dispose(){d(),n.removeEventListener("pointerdown",f),n.removeEventListener("pointerup",h),n.removeEventListener("pointercancel",d),n.removeEventListener("lostpointercapture",d),r.removeEventListener("blur",u),s.removeEventListener("visibilitychange",g),n.style.touchAction=l}})}function Rd(n,e,t=!1){if(!(!e||t)){if(["ArrowRight","ArrowUp"].includes(n.key))return"next";if(["ArrowLeft","ArrowDown"].includes(n.key))return"previous";if(n.key==="Enter"||n.code==="Space")return"launch";if(n.key.toLowerCase()==="z"||n.ctrlKey&&n.key.toLowerCase()==="z"||n.metaKey&&n.key.toLowerCase()==="z")return"undo";if(n.key.toLowerCase()==="r")return"restart";if(n.key==="Escape")return"menu"}}function Ld(n){return n instanceof HTMLElement?n.isContentEditable||!!n.closest('input, textarea, select, [contenteditable="true"], [role="textbox"]'):!1}function Pd(n){const e=n.target??window;function t(i){const r=n.canvas();if(n.enabled&&!n.enabled())return;const s=n.scene.snapshot(),a=i.key==="Escape"&&s.phase==="Menu",o=Rd(i,document.activeElement===r||a,Ld(i.target));if(!(!o||i.repeat&&o!=="next"&&o!=="previous"))if(o==="next"||o==="previous"){const l=n.scene.selectableStacks();if(!l.length)return;const c=o==="next"?1:-1,f=l.findIndex(u=>u.id===n.scene.selectedStackId()),h=f<0?c===1?l.length-1:0:f,d=l[(h+c+l.length)%l.length];n.scene.selectStack(d.id)&&(i.preventDefault(),n.announce("selection",l.indexOf(d)+1,l.length))}else if(o==="launch"&&s.phase==="Idle"){const l=n.scene.selectedStackId();l&&n.scene.launchStack(l)&&(i.preventDefault(),n.announce("move"))}else o==="undo"&&s.canUndo?(n.scene.undo(),i.preventDefault(),n.announce("undo")):o==="restart"&&["Idle","Won"].includes(s.phase)?(n.reset(),i.preventDefault(),n.announce("restart")):o==="menu"&&n.scene.toggleMenu()&&(i.preventDefault(),n.announce("menu"))}return e.addEventListener("keydown",t),Object.freeze({dispose(){e.removeEventListener("keydown",t)}})}const Vi={SE:{u:1,v:0},SW:{u:0,v:1},NW:{u:-1,v:0},NE:{u:0,v:-1},E:{u:1,v:-1},W:{u:-1,v:1},N:{u:-1,v:-1},S:{u:1,v:1}},wr=Object.keys(Vi),Hs=(n,e)=>`${n},${e}`,El=4096,_s=n=>{if(n&&typeof n=="object"&&!Object.isFrozen(n)){Object.freeze(n);for(const e of Object.values(n))_s(e)}return n},Id=n=>{const e=Math.max(0,...n.map(t=>t.height));return e<2?0:e};function Dd(n,e,t,i,r){const s=[...r].sort((a,o)=>a.u-o.u||a.v-o.v);return JSON.stringify([n,e,t,i,s.map(a=>[a.u,a.v,a.height,a.launchDirection??null])])}function hi(n,e){return _s({accepted:!1,reason:e,nextState:n,steps:[],events:[],won:!1})}function Yc(n,e,t){const i=e.stacks.findIndex(A=>A.u===t.u&&A.v===t.v);if(i<0)return hi(e,"inactive");const r=e.stacks[i];if(!r)return hi(e,"inactive");const s=new Map(n.cells.map(A=>[Hs(A.u,A.v),A])),a=s.get(Hs(t.u,t.v));let o=a?.kind==="redirect"?a.direction:r.launchDirection;if(!o)return hi(e,"inactive");const l=e.stacks.filter((A,x)=>x!==i).map(A=>({...A}));let c=r.u,f=r.v,h=r.height,d;const u=[],g=[],_=new Set;for(let A=0;A<=El;A++){const x=Dd(c,f,o,h,l);if(_.has(x))return hi(e,"cycle");_.add(x);const T=Vi[o],E=c+T.u,P=f+T.v,S=s.get(Hs(E,P));if(!S||S.kind==="blocked"){if(u.length===0)return hi(e,"blocked");g.push({type:"stop",stepIndex:u.length,at:{u:c,v:f},reason:"edge"});break}if(u.length>=El)return hi(e,"step-limit");const b={u:c,v:f},C={u:E,v:P},L=l.findIndex(J=>J.u===E&&J.v===P),U=h;let N=!1;if(d=void 0,L>=0){const J=l[L];J&&(h+=J.height,d=J.launchDirection,l.splice(L,1),N=!0)}c=E,f=P;const I=h,H=Id([...l,{...r,u:c,v:f,height:h}]);u.push({from:b,to:C,direction:o,movingHeightBefore:U,movingHeightAfter:I,absorbed:N,counter:H}),g.push({type:"move",stepIndex:u.length-1,at:C}),N&&g.push({type:"merge",stepIndex:u.length-1,at:C,absorbedHeight:I-U,height:h,counter:H}),S.kind==="redirect"&&S.direction&&(o=S.direction,g.push({type:"turn",stepIndex:u.length-1,at:C,direction:o}))}const p=[...l,{id:r.id,u:c,v:f,height:h,...d?{launchDirection:d}:{}}],m=_s({levelId:e.levelId,stacks:p,moveCount:e.moveCount+1}),y=m.stacks.length===1&&m.stacks[0]?.height===n.totalTiles;return _s({accepted:!0,nextState:m,steps:u,events:g,won:y})}function as(n){if(n&&typeof n=="object"&&!Object.isFrozen(n)){Object.freeze(n);for(const e of Object.values(n))as(e)}return n}function Nd(n,e){return n.levelId===e.levelId&&n.moveCount===e.moveCount&&n.stacks.length===e.stacks.length&&n.stacks.every(t=>e.stacks.some(i=>t.id===i.id&&t.u===i.u&&t.v===i.v&&t.height===i.height&&t.launchDirection===i.launchDirection))}function Ud(n,e,t){for(const i of e.stacks){const r=Yc(n,e,i);if(r.accepted&&Nd(r.nextState,t))return r}}function Od(){let n="Loading",e,t,i,r,s,a=0,o=0,l,c="Idle",f=!1;const h=[],d=new Set;function u(){return as({phase:n,...e?{level:e}:{},...i?{committedState:i}:{},...r?{displayedState:r}:{},...s?{animation:s}:{},generationId:a,attemptId:o,canUndo:h.length>0&&(n==="Idle"||n==="Won"),completedLevelIds:[...d].sort(),...n==="Menu"?{menuReturn:c}:{},...l?{error:l}:{}})}function g(L){return f||(a++,o++,e=L,t=Pa(L),i=t,r=t,s=void 0,h.length=0,l=void 0,n=qi(t)?"Won":"Idle",n==="Won"&&d.add(L.id)),u()}function _(L,U){if(f||!e||L.levelId!==e.id||n!=="Idle"&&n!=="Won")return u();const N=U.slice(-50);return a++,o++,i=as(L),r=i,h.splice(0,h.length,...N.map(I=>({state:as(I)}))),s=void 0,n=qi(i)?"Won":"Idle",n==="Won"&&d.add(e.id),u()}function p(L){if(f)return u();d.clear();for(const U of L)d.add(U);return e&&n==="Won"&&d.add(e.id),u()}function m(){return Object.freeze(h.slice(-50).map(L=>L.state))}function y(L){if(f||n!=="Idle"||!e||!i||!r)return u();const U=Yc(e,i,L);return U.accepted&&(h.push({state:i,move:U}),s={...U,reverse:!1,sourceState:i},i=U.nextState,a++,n="Animating"),u()}function A(L){return f||n!=="Animating"||L!==a||!i||(r=i,s=void 0,e&&qi(i)?(n="Won",d.add(e.id)):n="Idle"),u()}function x(){if(f||n!=="Idle"&&n!=="Won"||h.length===0)return u();const L=h.pop();if(!L)return u();const U=L.state,N=L.move??(e&&i?Ud(e,U,i):void 0);return a++,i=U,s=N?{...N,reverse:!0,sourceState:U}:void 0,s?n="Animating":(r=U,n=qi(U)?"Won":"Idle"),u()}function T(){return f||!t||!e||n!=="Idle"&&n!=="Won"||(a++,o++,i=Pa(e),r=i,h.length=0,s=void 0,n=qi(i)?"Won":"Idle"),u()}function E(){return f||n!=="Idle"&&n!=="Won"||(c=n,n="Menu"),u()}function P(){return f||n!=="Menu"||(n=c),u()}function S(L){return f||(a++,s=void 0,l=L,n="LoadError"),u()}function b(L="WebGL недоступен."){return f||(a++,s=void 0,l=L,n="Unsupported"),u()}function C(){f||(f=!0,a++,s=void 0,h.length=0)}return Object.freeze({snapshot:u,loadLevel:g,restoreAttempt:_,restoreCompleted:p,historySnapshot:m,launch:y,finishAnimation:A,undo:x,restart:T,openMenu:E,closeMenu:P,setLoadError:S,setUnsupported:b,dispose:C})}const Ui=Object.freeze({background:"#60C0FE",tileTop:"#FFFAF1",tileBevel:"#FFFDF6",tileSideLight:"#EEE8DF",tileSideDark:"#CED0D0",floor:"#FFDA45",floorSeam:"#EEB229",arrow:"#FF922D",chevron:"#FFFFFF",shadow:"#3D83D2"});function Cr(n,e,t=e.moveCount,i,r=e.stacks,s=fn(n,r)){const a=r===e.stacks?r.map(o=>{const l=n.cells.find(c=>c.u===o.u&&c.v===o.v);return l?.kind==="redirect"&&l.direction?{...o,launchDirection:l.direction}:o}):r;return Object.freeze({revision:t,level:n,projection:s,stacks:a,...i?{selectedStackId:i}:{}})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const No="186",Fd=0,bl=1,Bd=2,os=1,kd=2,tr=3,ri=0,Bt=1,hn=2,Rn=0,rr=1,Tl=2,Al=3,wl=4,zd=5,Li=100,Hd=101,Vd=102,Gd=103,Wd=104,Xd=200,qd=201,Yd=202,$d=203,$c=204,Kc=205,Kd=206,Zd=207,Jd=208,Qd=209,jd=210,ef=211,tf=212,nf=213,rf=214,Ia=0,Da=1,Na=2,ur=3,Ua=4,Oa=5,Fa=6,Ba=7,Zc=0,sf=1,af=2,tn=0,Jc=1,Qc=2,jc=3,eu=4,tu=5,nu=6,iu=7,ru=300,si=301,Bi=302,Vs=303,Gs=304,Rs=306,ka=1e3,wn=1001,za=1002,wt=1003,of=1004,Rr=1005,Dt=1006,Ws=1007,Qn=1008,Yt=1009,su=1010,au=1011,dr=1012,Uo=1013,vn=1014,pn=1015,_n=1016,Oo=1017,Fo=1018,fr=1020,ou=35902,lu=35899,cu=1021,uu=1022,en=1023,In=1026,jn=1027,du=1028,Bo=1029,ai=1030,ko=1031,zo=1033,ls=33776,cs=33777,us=33778,ds=33779,Ha=35840,Va=35841,Ga=35842,Wa=35843,Xa=36196,qa=37492,Ya=37496,$a=37488,Ka=37489,xs=37490,Za=37491,Ja=37808,Qa=37809,ja=37810,eo=37811,to=37812,no=37813,io=37814,ro=37815,so=37816,ao=37817,oo=37818,lo=37819,co=37820,uo=37821,fo=36492,ho=36494,po=36495,mo=36283,go=36284,Ss=36285,vo=36286,lf=3200,Cl=0,cf=1,Wn="",It="srgb",Ms="srgb-linear",ys="linear",tt="srgb",Xs=7680,uf=519,df=512,ff=513,hf=514,Ho=515,pf=516,mf=517,Vo=518,gf=519,vf=35044,Rl="300 es",mn=2e3,Es=2001;function _f(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function hr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function xf(){const n=hr("canvas");return n.style.display="block",n}const Ll={};function Pl(...n){const e="THREE."+n.shift();console.log(e,...n)}function fu(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Be(...n){n=fu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Je(...n){n=fu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Oi(...n){const e=n.join(" ");e in Ll||(Ll[e]=!0,Be(...n))}function Sf(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const Mf={[Ia]:Da,[Na]:Fa,[Ua]:Ba,[ur]:Oa,[Da]:Ia,[Fa]:Na,[Ba]:Ua,[Oa]:ur};class ui{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Lt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],qs=Math.PI/180,_o=180/Math.PI;function Gi(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Lt[n&255]+Lt[n>>8&255]+Lt[n>>16&255]+Lt[n>>24&255]+"-"+Lt[e&255]+Lt[e>>8&255]+"-"+Lt[e>>16&15|64]+Lt[e>>24&255]+"-"+Lt[t&63|128]+Lt[t>>8&255]+"-"+Lt[t>>16&255]+Lt[t>>24&255]+Lt[i&255]+Lt[i>>8&255]+Lt[i>>16&255]+Lt[i>>24&255]).toLowerCase()}function Ye(n,e,t){return Math.max(e,Math.min(t,n))}function yf(n,e){return(n%e+e)%e}function Ys(n,e,t){return(1-t)*n+t*e}function Yi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ft(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const tl=class tl{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};tl.prototype.isVector2=!0;let Pe=tl;class Wi{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],f=i[r+2],h=i[r+3],d=s[a+0],u=s[a+1],g=s[a+2],_=s[a+3];if(h!==_||l!==d||c!==u||f!==g){let p=l*d+c*u+f*g+h*_;p<0&&(d=-d,u=-u,g=-g,_=-_,p=-p);let m=1-o;if(p<.9995){const y=Math.acos(p),A=Math.sin(y);m=Math.sin(m*y)/A,o=Math.sin(o*y)/A,l=l*m+d*o,c=c*m+u*o,f=f*m+g*o,h=h*m+_*o}else{l=l*m+d*o,c=c*m+u*o,f=f*m+g*o,h=h*m+_*o;const y=1/Math.sqrt(l*l+c*c+f*f+h*h);l*=y,c*=y,f*=y,h*=y}}e[t]=l,e[t+1]=c,e[t+2]=f,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],f=i[r+3],h=s[a],d=s[a+1],u=s[a+2],g=s[a+3];return e[t]=o*g+f*h+l*u-c*d,e[t+1]=l*g+f*d+c*h-o*u,e[t+2]=c*g+f*u+o*d-l*h,e[t+3]=f*g-o*h-l*d-c*u,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),f=o(r/2),h=o(s/2),d=l(i/2),u=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=d*f*h+c*u*g,this._y=c*u*h-d*f*g,this._z=c*f*g+d*u*h,this._w=c*f*h-d*u*g;break;case"YXZ":this._x=d*f*h+c*u*g,this._y=c*u*h-d*f*g,this._z=c*f*g-d*u*h,this._w=c*f*h+d*u*g;break;case"ZXY":this._x=d*f*h-c*u*g,this._y=c*u*h+d*f*g,this._z=c*f*g+d*u*h,this._w=c*f*h-d*u*g;break;case"ZYX":this._x=d*f*h-c*u*g,this._y=c*u*h+d*f*g,this._z=c*f*g-d*u*h,this._w=c*f*h+d*u*g;break;case"YZX":this._x=d*f*h+c*u*g,this._y=c*u*h+d*f*g,this._z=c*f*g-d*u*h,this._w=c*f*h-d*u*g;break;case"XZY":this._x=d*f*h-c*u*g,this._y=c*u*h-d*f*g,this._z=c*f*g+d*u*h,this._w=c*f*h+d*u*g;break;default:Be("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],f=t[6],h=t[10],d=i+o+h;if(d>0){const u=.5/Math.sqrt(d+1);this._w=.25/u,this._x=(f-l)*u,this._y=(s-c)*u,this._z=(a-r)*u}else if(i>o&&i>h){const u=2*Math.sqrt(1+i-o-h);this._w=(f-l)/u,this._x=.25*u,this._y=(r+a)/u,this._z=(s+c)/u}else if(o>h){const u=2*Math.sqrt(1+o-i-h);this._w=(s-c)/u,this._x=(r+a)/u,this._y=.25*u,this._z=(l+f)/u}else{const u=2*Math.sqrt(1+h-i-o);this._w=(a-r)/u,this._x=(s+c)/u,this._y=(l+f)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ye(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,f=t._w;return this._x=i*f+a*o+r*c-s*l,this._y=r*f+a*l+s*o-i*c,this._z=s*f+a*c+i*l-r*o,this._w=a*f-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),f=Math.sin(c);l=Math.sin(l*c)/f,t=Math.sin(t*c)/f,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const nl=class nl{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Il.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Il.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),f=2*(o*t-s*r),h=2*(s*i-a*t);return this.x=t+l*c+a*h-o*f,this.y=i+l*f+o*c-s*h,this.z=r+l*h+s*f-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return $s.copy(this).projectOnVector(e),this.sub($s)}reflect(e){return this.sub($s.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};nl.prototype.isVector3=!0;let W=nl;const $s=new W,Il=new Wi,il=class il{constructor(e,t,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const f=this.elements;return f[0]=e,f[1]=r,f[2]=o,f[3]=t,f[4]=s,f[5]=l,f[6]=i,f[7]=a,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],f=i[4],h=i[7],d=i[2],u=i[5],g=i[8],_=r[0],p=r[3],m=r[6],y=r[1],A=r[4],x=r[7],T=r[2],E=r[5],P=r[8];return s[0]=a*_+o*y+l*T,s[3]=a*p+o*A+l*E,s[6]=a*m+o*x+l*P,s[1]=c*_+f*y+h*T,s[4]=c*p+f*A+h*E,s[7]=c*m+f*x+h*P,s[2]=d*_+u*y+g*T,s[5]=d*p+u*A+g*E,s[8]=d*m+u*x+g*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],f=e[8];return t*a*f-t*o*c-i*s*f+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],f=e[8],h=f*a-o*c,d=o*l-f*s,u=c*s-a*l,g=t*h+i*d+r*u;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=h*_,e[1]=(r*c-f*i)*_,e[2]=(o*i-r*a)*_,e[3]=d*_,e[4]=(f*t-r*l)*_,e[5]=(r*s-o*t)*_,e[6]=u*_,e[7]=(i*l-c*t)*_,e[8]=(a*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Oi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ks.makeScale(e,t)),this}rotate(e){return Oi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ks.makeRotation(-e)),this}translate(e,t){return Oi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ks.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};il.prototype.isMatrix3=!0;let ze=il;const Ks=new ze,Dl=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Nl=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ef(){const n={enabled:!0,workingColorSpace:Ms,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===tt&&(r.r=Ln(r.r),r.g=Ln(r.g),r.b=Ln(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===tt&&(r.r=Fi(r.r),r.g=Fi(r.g),r.b=Fi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Wn?ys:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Oi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Oi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ms]:{primaries:e,whitePoint:i,transfer:ys,toXYZ:Dl,fromXYZ:Nl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:It},outputColorSpaceConfig:{drawingBufferColorSpace:It}},[It]:{primaries:e,whitePoint:i,transfer:tt,toXYZ:Dl,fromXYZ:Nl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:It}}}),n}const Ke=Ef();function Ln(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Fi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let pi;class bf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{pi===void 0&&(pi=hr("canvas")),pi.width=e.width,pi.height=e.height;const r=pi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=pi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=hr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Ln(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ln(t[i]/255)*255):t[i]=Ln(t[i]);return{data:t,width:e.width,height:e.height}}else return Be("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Tf=0;class Go{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Tf++}),this.uuid=Gi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Zs(r[a].image)):s.push(Zs(r[a]))}else s=Zs(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Zs(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?bf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Be("Texture: Unable to serialize Texture."),{})}let Af=0;const Js=new W;class Nt extends ui{constructor(e=Nt.DEFAULT_IMAGE,t=Nt.DEFAULT_MAPPING,i=wn,r=wn,s=Dt,a=Qn,o=en,l=Yt,c=Nt.DEFAULT_ANISOTROPY,f=Wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Af++}),this.uuid=Gi(),this.name="",this.source=new Go(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Pe(0,0),this.repeat=new Pe(1,1),this.center=new Pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Js).x}get height(){return this.source.getSize(Js).y}get depth(){return this.source.getSize(Js).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Be(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Be(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ru)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ka:e.x=e.x-Math.floor(e.x);break;case wn:e.x=e.x<0?0:1;break;case za:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ka:e.y=e.y-Math.floor(e.y);break;case wn:e.y=e.y<0?0:1;break;case za:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Nt.DEFAULT_IMAGE=null;Nt.DEFAULT_MAPPING=ru;Nt.DEFAULT_ANISOTROPY=1;const rl=class rl{constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],f=l[4],h=l[8],d=l[1],u=l[5],g=l[9],_=l[2],p=l[6],m=l[10];if(Math.abs(f-d)<.01&&Math.abs(h-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(f+d)<.1&&Math.abs(h+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+u+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const A=(c+1)/2,x=(u+1)/2,T=(m+1)/2,E=(f+d)/4,P=(h+_)/4,S=(g+p)/4;return A>x&&A>T?A<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(A),r=E/i,s=P/i):x>T?x<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),i=E/r,s=S/r):T<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(T),i=P/s,r=S/s),this.set(i,r,s,t),this}let y=Math.sqrt((p-g)*(p-g)+(h-_)*(h-_)+(d-f)*(d-f));return Math.abs(y)<.001&&(y=1),this.x=(p-g)/y,this.y=(h-_)/y,this.z=(d-f)/y,this.w=Math.acos((c+u+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this.w=Ye(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this.w=Ye(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};rl.prototype.isVector4=!0;let pt=rl;class wf extends ui{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new pt(0,0,e,t),this.scissorTest=!1,this.viewport=new pt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new Nt(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Dt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Go(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class nn extends wf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class hu extends Nt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=wt,this.minFilter=wt,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Cf extends Nt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=wt,this.minFilter=wt,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const Cs=class Cs{constructor(e,t,i,r,s,a,o,l,c,f,h,d,u,g,_,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,f,h,d,u,g,_,p)}set(e,t,i,r,s,a,o,l,c,f,h,d,u,g,_,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=r,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=f,m[10]=h,m[14]=d,m[3]=u,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Cs().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/mi.setFromMatrixColumn(e,0).length(),s=1/mi.setFromMatrixColumn(e,1).length(),a=1/mi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),f=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=a*f,u=a*h,g=o*f,_=o*h;t[0]=l*f,t[4]=-l*h,t[8]=c,t[1]=u+g*c,t[5]=d-_*c,t[9]=-o*l,t[2]=_-d*c,t[6]=g+u*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*f,u=l*h,g=c*f,_=c*h;t[0]=d+_*o,t[4]=g*o-u,t[8]=a*c,t[1]=a*h,t[5]=a*f,t[9]=-o,t[2]=u*o-g,t[6]=_+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*f,u=l*h,g=c*f,_=c*h;t[0]=d-_*o,t[4]=-a*h,t[8]=g+u*o,t[1]=u+g*o,t[5]=a*f,t[9]=_-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*f,u=a*h,g=o*f,_=o*h;t[0]=l*f,t[4]=g*c-u,t[8]=d*c+_,t[1]=l*h,t[5]=_*c+d,t[9]=u*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,u=a*c,g=o*l,_=o*c;t[0]=l*f,t[4]=_-d*h,t[8]=g*h+u,t[1]=h,t[5]=a*f,t[9]=-o*f,t[2]=-c*f,t[6]=u*h+g,t[10]=d-_*h}else if(e.order==="XZY"){const d=a*l,u=a*c,g=o*l,_=o*c;t[0]=l*f,t[4]=-h,t[8]=c*f,t[1]=d*h+_,t[5]=a*f,t[9]=u*h-g,t[2]=g*h-u,t[6]=o*f,t[10]=_*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Rf,e,Lf)}lookAt(e,t,i){const r=this.elements;return zt.subVectors(e,t),zt.lengthSq()===0&&(zt.z=1),zt.normalize(),Fn.crossVectors(i,zt),Fn.lengthSq()===0&&(Math.abs(i.z)===1?zt.x+=1e-4:zt.z+=1e-4,zt.normalize(),Fn.crossVectors(i,zt)),Fn.normalize(),Lr.crossVectors(zt,Fn),r[0]=Fn.x,r[4]=Lr.x,r[8]=zt.x,r[1]=Fn.y,r[5]=Lr.y,r[9]=zt.y,r[2]=Fn.z,r[6]=Lr.z,r[10]=zt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],f=i[1],h=i[5],d=i[9],u=i[13],g=i[2],_=i[6],p=i[10],m=i[14],y=i[3],A=i[7],x=i[11],T=i[15],E=r[0],P=r[4],S=r[8],b=r[12],C=r[1],L=r[5],U=r[9],N=r[13],I=r[2],H=r[6],J=r[10],ie=r[14],D=r[3],q=r[7],te=r[11],Q=r[15];return s[0]=a*E+o*C+l*I+c*D,s[4]=a*P+o*L+l*H+c*q,s[8]=a*S+o*U+l*J+c*te,s[12]=a*b+o*N+l*ie+c*Q,s[1]=f*E+h*C+d*I+u*D,s[5]=f*P+h*L+d*H+u*q,s[9]=f*S+h*U+d*J+u*te,s[13]=f*b+h*N+d*ie+u*Q,s[2]=g*E+_*C+p*I+m*D,s[6]=g*P+_*L+p*H+m*q,s[10]=g*S+_*U+p*J+m*te,s[14]=g*b+_*N+p*ie+m*Q,s[3]=y*E+A*C+x*I+T*D,s[7]=y*P+A*L+x*H+T*q,s[11]=y*S+A*U+x*J+T*te,s[15]=y*b+A*N+x*ie+T*Q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],f=e[2],h=e[6],d=e[10],u=e[14],g=e[3],_=e[7],p=e[11],m=e[15],y=l*u-c*d,A=o*u-c*h,x=o*d-l*h,T=a*u-c*f,E=a*d-l*f,P=a*h-o*f;return t*(_*y-p*A+m*x)-i*(g*y-p*T+m*E)+r*(g*A-_*T+m*P)-s*(g*x-_*E+p*P)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],f=e[10];return t*(a*f-o*c)-i*(s*f-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],f=e[8],h=e[9],d=e[10],u=e[11],g=e[12],_=e[13],p=e[14],m=e[15],y=t*o-i*a,A=t*l-r*a,x=t*c-s*a,T=i*l-r*o,E=i*c-s*o,P=r*c-s*l,S=f*_-h*g,b=f*p-d*g,C=f*m-u*g,L=h*p-d*_,U=h*m-u*_,N=d*m-u*p,I=y*N-A*U+x*L+T*C-E*b+P*S;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const H=1/I;return e[0]=(o*N-l*U+c*L)*H,e[1]=(r*U-i*N-s*L)*H,e[2]=(_*P-p*E+m*T)*H,e[3]=(d*E-h*P-u*T)*H,e[4]=(l*C-a*N-c*b)*H,e[5]=(t*N-r*C+s*b)*H,e[6]=(p*x-g*P-m*A)*H,e[7]=(f*P-d*x+u*A)*H,e[8]=(a*U-o*C+c*S)*H,e[9]=(i*C-t*U-s*S)*H,e[10]=(g*E-_*x+m*y)*H,e[11]=(h*x-f*E-u*y)*H,e[12]=(o*b-a*L-l*S)*H,e[13]=(t*L-i*b+r*S)*H,e[14]=(_*A-g*T-p*y)*H,e[15]=(f*T-h*A+d*y)*H,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,f=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,f*o+i,f*l-r*a,0,c*l-r*o,f*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,f=a+a,h=o+o,d=s*c,u=s*f,g=s*h,_=a*f,p=a*h,m=o*h,y=l*c,A=l*f,x=l*h,T=i.x,E=i.y,P=i.z;return r[0]=(1-(_+m))*T,r[1]=(u+x)*T,r[2]=(g-A)*T,r[3]=0,r[4]=(u-x)*E,r[5]=(1-(d+m))*E,r[6]=(p+y)*E,r[7]=0,r[8]=(g+A)*P,r[9]=(p-y)*P,r[10]=(1-(d+_))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=mi.set(r[0],r[1],r[2]).length();const o=mi.set(r[4],r[5],r[6]).length(),l=mi.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Kt.copy(this);const c=1/a,f=1/o,h=1/l;return Kt.elements[0]*=c,Kt.elements[1]*=c,Kt.elements[2]*=c,Kt.elements[4]*=f,Kt.elements[5]*=f,Kt.elements[6]*=f,Kt.elements[8]*=h,Kt.elements[9]*=h,Kt.elements[10]*=h,t.setFromRotationMatrix(Kt),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,r,s,a,o=mn,l=!1){const c=this.elements,f=2*s/(t-e),h=2*s/(i-r),d=(t+e)/(t-e),u=(i+r)/(i-r);let g,_;if(l)g=s/(a-s),_=a*s/(a-s);else if(o===mn)g=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===Es)g=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=mn,l=!1){const c=this.elements,f=2/(t-e),h=2/(i-r),d=-(t+e)/(t-e),u=-(i+r)/(i-r);let g,_;if(l)g=1/(a-s),_=a/(a-s);else if(o===mn)g=-2/(a-s),_=-(a+s)/(a-s);else if(o===Es)g=-1/(a-s),_=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=u,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};Cs.prototype.isMatrix4=!0;let vt=Cs;const mi=new W,Kt=new vt,Rf=new W(0,0,0),Lf=new W(1,1,1),Fn=new W,Lr=new W,zt=new W,Ul=new vt,Ol=new Wi;class oi{constructor(e=0,t=0,i=0,r=oi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],f=r[9],h=r[2],d=r[6],u=r[10];switch(t){case"XYZ":this._y=Math.asin(Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,u),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,u),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ye(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,u),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-Ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-f,u),this._y=0);break;default:Be("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Ul.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ul,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ol.setFromEuler(this),this.setFromQuaternion(Ol,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}oi.DEFAULT_ORDER="XYZ";class pu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Pf=0;const Fl=new W,gi=new Wi,yn=new vt,Pr=new W,$i=new W,If=new W,Df=new Wi,Bl=new W(1,0,0),kl=new W(0,1,0),zl=new W(0,0,1),Hl={type:"added"},Nf={type:"removed"},vi={type:"childadded",child:null},Qs={type:"childremoved",child:null};class Vt extends ui{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Pf++}),this.uuid=Gi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Vt.DEFAULT_UP.clone();const e=new W,t=new oi,i=new Wi,r=new W(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new vt},normalMatrix:{value:new ze}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=Vt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new pu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return gi.setFromAxisAngle(e,t),this.quaternion.multiply(gi),this}rotateOnWorldAxis(e,t){return gi.setFromAxisAngle(e,t),this.quaternion.premultiply(gi),this}rotateX(e){return this.rotateOnAxis(Bl,e)}rotateY(e){return this.rotateOnAxis(kl,e)}rotateZ(e){return this.rotateOnAxis(zl,e)}translateOnAxis(e,t){return Fl.copy(e).applyQuaternion(this.quaternion),this.position.add(Fl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Bl,e)}translateY(e){return this.translateOnAxis(kl,e)}translateZ(e){return this.translateOnAxis(zl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Pr.copy(e):Pr.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),$i.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yn.lookAt($i,Pr,this.up):yn.lookAt(Pr,$i,this.up),this.quaternion.setFromRotationMatrix(yn),r&&(yn.extractRotation(r.matrixWorld),gi.setFromRotationMatrix(yn),this.quaternion.premultiply(gi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Hl),vi.child=e,this.dispatchEvent(vi),vi.child=null):Je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Nf),Qs.child=e,this.dispatchEvent(Qs),Qs.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Hl),vi.child=e,this.dispatchEvent(vi),vi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($i,e,If),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($i,Df,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,f=l.length;c<f;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),f=a(e.images),h=a(e.shapes),d=a(e.skeletons),u=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),u.length>0&&(i.animations=u),g.length>0&&(i.nodes=g)}return i.object=r,i;function a(o){const l=[];for(const c in o){const f=o[c];delete f.metadata,l.push(f)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Vt.DEFAULT_UP=new W(0,1,0);Vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ir extends Vt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Uf={type:"move"};class js{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ir,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ir,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ir,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,i),m=this._getHandJoint(c,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const f=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=f.position.distanceTo(h.position),u=.02,g=.005;c.inputState.pinching&&d>u+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=u-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Uf)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ir;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const mu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Bn={h:0,s:0,l:0},Dr={h:0,s:0,l:0};function ea(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ve{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=It){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ke.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Ke.workingColorSpace){if(e=yf(e,1),t=Ye(t,0,1),i=Ye(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=ea(a,s,e+1/3),this.g=ea(a,s,e),this.b=ea(a,s,e-1/3)}return Ke.colorSpaceToWorking(this,r),this}setStyle(e,t=It){function i(s){s!==void 0&&parseFloat(s)<1&&Be("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Be("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Be("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=It){const i=mu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Be("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ln(e.r),this.g=Ln(e.g),this.b=Ln(e.b),this}copyLinearToSRGB(e){return this.r=Fi(e.r),this.g=Fi(e.g),this.b=Fi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=It){return Ke.workingToColorSpace(Pt.copy(this),e),Math.round(Ye(Pt.r*255,0,255))*65536+Math.round(Ye(Pt.g*255,0,255))*256+Math.round(Ye(Pt.b*255,0,255))}getHexString(e=It){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.workingToColorSpace(Pt.copy(this),t);const i=Pt.r,r=Pt.g,s=Pt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const f=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=f<=.5?h/(a+o):h/(2-a-o),a){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=f,e}getRGB(e,t=Ke.workingColorSpace){return Ke.workingToColorSpace(Pt.copy(this),t),e.r=Pt.r,e.g=Pt.g,e.b=Pt.b,e}getStyle(e=It){Ke.workingToColorSpace(Pt.copy(this),e);const t=Pt.r,i=Pt.g,r=Pt.b;return e!==It?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Bn),this.setHSL(Bn.h+e,Bn.s+t,Bn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Bn),e.getHSL(Dr);const i=Ys(Bn.h,Dr.h,t),r=Ys(Bn.s,Dr.s,t),s=Ys(Bn.l,Dr.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pt=new Ve;Ve.NAMES=mu;class ta extends Vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new oi,this.environmentIntensity=1,this.environmentRotation=new oi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Zt=new W,En=new W,na=new W,bn=new W,_i=new W,xi=new W,Vl=new W,ia=new W,ra=new W,sa=new W,aa=new pt,oa=new pt,la=new pt;class jt{constructor(e=new W,t=new W,i=new W){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Zt.subVectors(e,t),r.cross(Zt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Zt.subVectors(r,t),En.subVectors(i,t),na.subVectors(e,t);const a=Zt.dot(Zt),o=Zt.dot(En),l=Zt.dot(na),c=En.dot(En),f=En.dot(na),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const d=1/h,u=(c*l-o*f)*d,g=(a*f-o*l)*d;return s.set(1-u-g,g,u)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,bn)===null?!1:bn.x>=0&&bn.y>=0&&bn.x+bn.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,bn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,bn.x),l.addScaledVector(a,bn.y),l.addScaledVector(o,bn.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return aa.setScalar(0),oa.setScalar(0),la.setScalar(0),aa.fromBufferAttribute(e,t),oa.fromBufferAttribute(e,i),la.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(aa,s.x),a.addScaledVector(oa,s.y),a.addScaledVector(la,s.z),a}static isFrontFacing(e,t,i,r){return Zt.subVectors(i,t),En.subVectors(e,t),Zt.cross(En).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Zt.subVectors(this.c,this.b),En.subVectors(this.a,this.b),Zt.cross(En).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return jt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return jt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return jt.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return jt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return jt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;_i.subVectors(r,i),xi.subVectors(s,i),ia.subVectors(e,i);const l=_i.dot(ia),c=xi.dot(ia);if(l<=0&&c<=0)return t.copy(i);ra.subVectors(e,r);const f=_i.dot(ra),h=xi.dot(ra);if(f>=0&&h<=f)return t.copy(r);const d=l*h-f*c;if(d<=0&&l>=0&&f<=0)return a=l/(l-f),t.copy(i).addScaledVector(_i,a);sa.subVectors(e,s);const u=_i.dot(sa),g=xi.dot(sa);if(g>=0&&u<=g)return t.copy(s);const _=u*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(xi,o);const p=f*g-u*h;if(p<=0&&h-f>=0&&u-g>=0)return Vl.subVectors(s,r),o=(h-f)/(h-f+(u-g)),t.copy(r).addScaledVector(Vl,o);const m=1/(p+_+d);return a=_*m,o=d*m,t.copy(i).addScaledVector(_i,a).addScaledVector(xi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class xr{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Jt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Jt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Jt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Jt):Jt.fromBufferAttribute(s,a),Jt.applyMatrix4(e.matrixWorld),this.expandByPoint(Jt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Nr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Nr.copy(i.boundingBox)),Nr.applyMatrix4(e.matrixWorld),this.union(Nr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Jt),Jt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ki),Ur.subVectors(this.max,Ki),Si.subVectors(e.a,Ki),Mi.subVectors(e.b,Ki),yi.subVectors(e.c,Ki),kn.subVectors(Mi,Si),zn.subVectors(yi,Mi),qn.subVectors(Si,yi);let t=[0,-kn.z,kn.y,0,-zn.z,zn.y,0,-qn.z,qn.y,kn.z,0,-kn.x,zn.z,0,-zn.x,qn.z,0,-qn.x,-kn.y,kn.x,0,-zn.y,zn.x,0,-qn.y,qn.x,0];return!ca(t,Si,Mi,yi,Ur)||(t=[1,0,0,0,1,0,0,0,1],!ca(t,Si,Mi,yi,Ur))?!1:(Or.crossVectors(kn,zn),t=[Or.x,Or.y,Or.z],ca(t,Si,Mi,yi,Ur))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Jt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Jt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Tn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Tn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Tn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Tn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Tn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Tn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Tn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Tn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Tn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Tn=[new W,new W,new W,new W,new W,new W,new W,new W],Jt=new W,Nr=new xr,Si=new W,Mi=new W,yi=new W,kn=new W,zn=new W,qn=new W,Ki=new W,Ur=new W,Or=new W,Yn=new W;function ca(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Yn.fromArray(n,s);const o=r.x*Math.abs(Yn.x)+r.y*Math.abs(Yn.y)+r.z*Math.abs(Yn.z),l=e.dot(Yn),c=t.dot(Yn),f=i.dot(Yn);if(Math.max(-Math.max(l,c,f),Math.min(l,c,f))>o)return!1}return!0}const St=new W,Fr=new Pe;let Of=0;class Pn extends ui{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Of++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=vf,this.updateRanges=[],this.gpuType=pn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Fr.fromBufferAttribute(this,t),Fr.applyMatrix3(e),this.setXY(t,Fr.x,Fr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.applyMatrix3(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.applyMatrix4(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.applyNormalMatrix(e),this.setXYZ(t,St.x,St.y,St.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.transformDirection(e),this.setXYZ(t,St.x,St.y,St.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Yi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Ft(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Yi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Yi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Yi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Yi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),i=Ft(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),i=Ft(i,this.array),r=Ft(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),i=Ft(i,this.array),r=Ft(r,this.array),s=Ft(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class gu extends Pn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class vu extends Pn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Mt extends Pn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Ff=new xr,Zi=new W,ua=new W;class Wo{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Ff.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Zi.subVectors(e,this.center);const t=Zi.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Zi,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ua.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Zi.copy(e.center).add(ua)),this.expandByPoint(Zi.copy(e.center).sub(ua))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Bf=0;const Xt=new vt,da=new Vt,Ei=new W,Ht=new xr,Ji=new xr,bt=new W;class kt extends ui{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bf++}),this.uuid=Gi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(_f(e)?vu:gu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new ze().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Xt.makeRotationFromQuaternion(e),this.applyMatrix4(Xt),this}rotateX(e){return Xt.makeRotationX(e),this.applyMatrix4(Xt),this}rotateY(e){return Xt.makeRotationY(e),this.applyMatrix4(Xt),this}rotateZ(e){return Xt.makeRotationZ(e),this.applyMatrix4(Xt),this}translate(e,t,i){return Xt.makeTranslation(e,t,i),this.applyMatrix4(Xt),this}scale(e,t,i){return Xt.makeScale(e,t,i),this.applyMatrix4(Xt),this}lookAt(e){return da.lookAt(e),da.updateMatrix(),this.applyMatrix4(da.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ei).negate(),this.translate(Ei.x,Ei.y,Ei.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Mt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Be("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Ht.setFromBufferAttribute(s),this.morphTargetsRelative?(bt.addVectors(this.boundingBox.min,Ht.min),this.boundingBox.expandByPoint(bt),bt.addVectors(this.boundingBox.max,Ht.max),this.boundingBox.expandByPoint(bt)):(this.boundingBox.expandByPoint(Ht.min),this.boundingBox.expandByPoint(Ht.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(e){const i=this.boundingSphere.center;if(Ht.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Ji.setFromBufferAttribute(o),this.morphTargetsRelative?(bt.addVectors(Ht.min,Ji.min),Ht.expandByPoint(bt),bt.addVectors(Ht.max,Ji.max),Ht.expandByPoint(bt)):(Ht.expandByPoint(Ji.min),Ht.expandByPoint(Ji.max))}Ht.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)bt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(bt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,f=o.count;c<f;c++)bt.fromBufferAttribute(o,c),l&&(Ei.fromBufferAttribute(e,c),bt.add(Ei)),r=Math.max(r,i.distanceToSquared(bt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Pn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let S=0;S<i.count;S++)o[S]=new W,l[S]=new W;const c=new W,f=new W,h=new W,d=new Pe,u=new Pe,g=new Pe,_=new W,p=new W;function m(S,b,C){c.fromBufferAttribute(i,S),f.fromBufferAttribute(i,b),h.fromBufferAttribute(i,C),d.fromBufferAttribute(s,S),u.fromBufferAttribute(s,b),g.fromBufferAttribute(s,C),f.sub(c),h.sub(c),u.sub(d),g.sub(d);const L=1/(u.x*g.y-g.x*u.y);isFinite(L)&&(_.copy(f).multiplyScalar(g.y).addScaledVector(h,-u.y).multiplyScalar(L),p.copy(h).multiplyScalar(u.x).addScaledVector(f,-g.x).multiplyScalar(L),o[S].add(_),o[b].add(_),o[C].add(_),l[S].add(p),l[b].add(p),l[C].add(p))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let S=0,b=y.length;S<b;++S){const C=y[S],L=C.start,U=C.count;for(let N=L,I=L+U;N<I;N+=3)m(e.getX(N+0),e.getX(N+1),e.getX(N+2))}const A=new W,x=new W,T=new W,E=new W;function P(S){T.fromBufferAttribute(r,S),E.copy(T);const b=o[S];A.copy(b),A.sub(T.multiplyScalar(T.dot(b))).normalize(),x.crossVectors(E,b);const L=x.dot(l[S])<0?-1:1;a.setXYZW(S,A.x,A.y,A.z,L)}for(let S=0,b=y.length;S<b;++S){const C=y[S],L=C.start,U=C.count;for(let N=L,I=L+U;N<I;N+=3)P(e.getX(N+0)),P(e.getX(N+1)),P(e.getX(N+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Pn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,u=i.count;d<u;d++)i.setXYZ(d,0,0,0);const r=new W,s=new W,a=new W,o=new W,l=new W,c=new W,f=new W,h=new W;if(e)for(let d=0,u=e.count;d<u;d+=3){const g=e.getX(d+0),_=e.getX(d+1),p=e.getX(d+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,p),f.subVectors(a,s),h.subVectors(r,s),f.cross(h),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,p),o.add(f),l.add(f),c.add(f),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,u=t.count;d<u;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),f.subVectors(a,s),h.subVectors(r,s),f.cross(h),i.setXYZ(d+0,f.x,f.y,f.z),i.setXYZ(d+1,f.x,f.y,f.z),i.setXYZ(d+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)bt.fromBufferAttribute(e,t),bt.normalize(),e.setXYZ(t,bt.x,bt.y,bt.z)}toNonIndexed(){function e(o,l){const c=o.array,f=o.itemSize,h=o.normalized,d=new c.constructor(l.length*f);let u=0,g=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?u=l[_]*o.data.stride+o.offset:u=l[_]*f;for(let m=0;m<f;m++)d[g++]=c[u++]}return new Pn(d,f,h)}if(this.index===null)return Be("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new kt,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let f=0,h=c.length;f<h;f++){const d=c[f],u=e(d,i);l.push(u)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],f=[];for(let h=0,d=c.length;h<d;h++){const u=c[h];f.push(u.toJSON(e.data))}f.length>0&&(r[l]=f,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const f=r[c];this.setAttribute(c,f.clone(t))}const s=e.morphAttributes;for(const c in s){const f=[],h=s[c];for(let d=0,u=h.length;d<u;d++)f.push(h[d].clone(t));this.morphAttributes[c]=f}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,f=a.length;c<f;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const fa=new W,kf=new W,zf=new ze;class Gn{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=fa.subVectors(i,t).cross(kf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(fa),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||zf.getNormalMatrix(e),r=this.coplanarPoint(fa).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Hf=0;class Ls extends ui{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Hf++}),this.uuid=Gi(),this.name="",this.type="Material",this.blending=rr,this.side=ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$c,this.blendDst=Kc,this.blendEquation=Li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ve(0,0,0),this.blendAlpha=0,this.depthFunc=ur,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=uf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xs,this.stencilZFail=Xs,this.stencilZPass=Xs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Be(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Be(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ve().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Gn().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Pe().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Pe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const An=new W,ha=new W,Br=new W,kr=new W;class Vf{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,An)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=An.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(An.copy(this.origin).addScaledVector(this.direction,t),An.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){ha.copy(e).add(t).multiplyScalar(.5),Br.copy(t).sub(e).normalize(),kr.copy(this.origin).sub(ha);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Br),o=kr.dot(this.direction),l=-kr.dot(Br),c=kr.lengthSq(),f=Math.abs(1-a*a);let h,d,u,g;if(f>0)if(h=a*l-o,d=a*o-l,g=s*f,h>=0)if(d>=-g)if(d<=g){const _=1/f;h*=_,d*=_,u=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=s,h=Math.max(0,-(a*d+o)),u=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(a*d+o)),u=-h*h+d*(d+2*l)+c;else d<=-g?(h=Math.max(0,-(-a*s+o)),d=h>0?-s:Math.min(Math.max(-s,-l),s),u=-h*h+d*(d+2*l)+c):d<=g?(h=0,d=Math.min(Math.max(-s,-l),s),u=d*(d+2*l)+c):(h=Math.max(0,-(a*s+o)),d=h>0?s:Math.min(Math.max(-s,-l),s),u=-h*h+d*(d+2*l)+c);else d=a>0?-s:s,h=Math.max(0,-(a*d+o)),u=-h*h+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(ha).addScaledVector(Br,d),u}intersectSphere(e,t){if(e.radius<0)return null;An.subVectors(e.center,this.origin);const i=An.dot(this.direction),r=An.dot(An)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,f=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),f>=0?(s=(e.min.y-d.y)*f,a=(e.max.y-d.y)*f):(s=(e.max.y-d.y)*f,a=(e.min.y-d.y)*f),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,An)!==null}intersectTriangle(e,t,i,r,s){const a=this.origin,o=this.direction,l=o.x,c=o.y,f=o.z,h=e.x-a.x,d=e.y-a.y,u=e.z-a.z,g=t.x-a.x,_=t.y-a.y,p=t.z-a.z,m=i.x-a.x,y=i.y-a.y,A=i.z-a.z,x=Math.abs(l),T=Math.abs(c),E=Math.abs(f);let P,S,b,C,L,U,N,I,H,J,ie,D;if(x>=T&&x>=E?(b=l,U=h,H=g,D=m,l>=0?(P=c,S=f,C=d,L=u,N=_,I=p,J=y,ie=A):(P=f,S=c,C=u,L=d,N=p,I=_,J=A,ie=y)):T>=E?(b=c,U=d,H=_,D=y,c>=0?(P=f,S=l,C=u,L=h,N=p,I=g,J=A,ie=m):(P=l,S=f,C=h,L=u,N=g,I=p,J=m,ie=A)):(b=f,U=u,H=p,D=A,f>=0?(P=l,S=c,C=h,L=d,N=g,I=_,J=m,ie=y):(P=c,S=l,C=d,L=h,N=_,I=g,J=y,ie=m)),b===0)return null;const q=P/b,te=S/b,Q=1/b,ee=C-q*U,le=L-te*U,Ue=N-q*H,ye=I-te*H,pe=J-q*D,X=ie-te*D,Y=pe*ye-X*Ue,se=ee*X-le*pe,_e=Ue*le-ye*ee;if(r){if(Y<0||se<0||_e<0)return null}else if((Y<0||se<0||_e<0)&&(Y>0||se>0||_e>0))return null;const oe=Y+se+_e;if(oe===0)return null;const Se=Q*(Y*U+se*H+_e*D);return(oe>0?Se<0:Se>0)?null:this.at(Se/oe,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class st extends Ls{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oi,this.combine=Zc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Gl=new vt,$n=new Vf,zr=new Wo,Wl=new W,Hr=new W,Vr=new W,Gr=new W,pa=new W,Wr=new W,Xl=new W,Xr=new W;class xn extends Vt{constructor(e=new kt,t=new st){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Wr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const f=o[l],h=s[l];f!==0&&(pa.fromBufferAttribute(h,e),a?Wr.addScaledVector(pa,f):Wr.addScaledVector(pa.sub(t),f))}t.add(Wr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),zr.copy(i.boundingSphere),zr.applyMatrix4(s),$n.copy(e.ray).recast(e.near),!(zr.containsPoint($n.origin)===!1&&($n.intersectSphere(zr,Wl)===null||$n.origin.distanceToSquared(Wl)>(e.far-e.near)**2))&&(Gl.copy(s).invert(),$n.copy(e.ray).applyMatrix4(Gl),!(i.boundingBox!==null&&$n.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,$n)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,f=s.attributes.uv1,h=s.attributes.normal,d=s.groups,u=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const p=d[g],m=a[p.materialIndex],y=Math.max(p.start,u.start),A=Math.min(o.count,Math.min(p.start+p.count,u.start+u.count));for(let x=y,T=A;x<T;x+=3){const E=o.getX(x),P=o.getX(x+1),S=o.getX(x+2);r=qr(this,m,e,i,c,f,h,E,P,S),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,u.start),_=Math.min(o.count,u.start+u.count);for(let p=g,m=_;p<m;p+=3){const y=o.getX(p),A=o.getX(p+1),x=o.getX(p+2);r=qr(this,a,e,i,c,f,h,y,A,x),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const p=d[g],m=a[p.materialIndex],y=Math.max(p.start,u.start),A=Math.min(l.count,Math.min(p.start+p.count,u.start+u.count));for(let x=y,T=A;x<T;x+=3){const E=x,P=x+1,S=x+2;r=qr(this,m,e,i,c,f,h,E,P,S),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,u.start),_=Math.min(l.count,u.start+u.count);for(let p=g,m=_;p<m;p+=3){const y=p,A=p+1,x=p+2;r=qr(this,a,e,i,c,f,h,y,A,x),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function Gf(n,e,t,i,r,s,a,o){let l;if(e.side===Bt?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===ri,o),l===null)return null;Xr.copy(o),Xr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Xr);return c<t.near||c>t.far?null:{distance:c,point:Xr.clone(),object:n}}function qr(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,Hr),n.getVertexPosition(l,Vr),n.getVertexPosition(c,Gr);const f=Gf(n,e,t,i,Hr,Vr,Gr,Xl);if(f){const h=new W;jt.getBarycoord(Xl,Hr,Vr,Gr,h),r&&(f.uv=jt.getInterpolatedAttribute(r,o,l,c,h,new Pe)),s&&(f.uv1=jt.getInterpolatedAttribute(s,o,l,c,h,new Pe)),a&&(f.normal=jt.getInterpolatedAttribute(a,o,l,c,h,new W),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new W,materialIndex:0};jt.getNormal(Hr,Vr,Gr,d.normal),f.face=d,f.barycoord=h}return f}class Wf extends Nt{constructor(e=null,t=1,i=1,r,s,a,o,l,c=wt,f=wt,h,d){super(null,a,o,l,c,f,r,s,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Kn=new Wo,Xf=new Pe(.5,.5),Yr=new W;class _u{constructor(e=new Gn,t=new Gn,i=new Gn,r=new Gn,s=new Gn,a=new Gn){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=mn,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],f=s[4],h=s[5],d=s[6],u=s[7],g=s[8],_=s[9],p=s[10],m=s[11],y=s[12],A=s[13],x=s[14],T=s[15];if(r[0].setComponents(c-a,u-f,m-g,T-y).normalize(),r[1].setComponents(c+a,u+f,m+g,T+y).normalize(),r[2].setComponents(c+o,u+h,m+_,T+A).normalize(),r[3].setComponents(c-o,u-h,m-_,T-A).normalize(),i)r[4].setComponents(l,d,p,x).normalize(),r[5].setComponents(c-l,u-d,m-p,T-x).normalize();else if(r[4].setComponents(c-l,u-d,m-p,T-x).normalize(),t===mn)r[5].setComponents(c+l,u+d,m+p,T+x).normalize();else if(t===Es)r[5].setComponents(l,d,p,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Kn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Kn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Kn)}intersectsSprite(e){Kn.center.set(0,0,0);const t=Xf.distanceTo(e.center);return Kn.radius=.7071067811865476+t,Kn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Kn)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Yr.x=r.normal.x>0?e.max.x:e.min.x,Yr.y=r.normal.y>0?e.max.y:e.min.y,Yr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Yr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class xu extends Nt{constructor(e=[],t=si,i,r,s,a,o,l,c,f){super(e,t,i,r,s,a,o,l,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class pr extends Nt{constructor(e,t,i=vn,r,s,a,o=wt,l=wt,c,f=In,h=1){if(f!==In&&f!==jn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:h};super(d,r,s,a,o,l,f,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Go(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class qf extends pr{constructor(e,t=vn,i=si,r,s,a=wt,o=wt,l,c=In){const f={width:e,height:e,depth:1},h=[f,f,f,f,f,f];super(e,e,t,i,r,s,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Su extends Nt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Sr extends kt{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],f=[],h=[];let d=0,u=0;g("z","y","x",-1,-1,i,t,e,a,s,0),g("z","y","x",1,-1,i,t,-e,a,s,1),g("x","z","y",1,1,e,i,t,r,a,2),g("x","z","y",1,-1,e,i,-t,r,a,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Mt(c,3)),this.setAttribute("normal",new Mt(f,3)),this.setAttribute("uv",new Mt(h,2));function g(_,p,m,y,A,x,T,E,P,S,b){const C=x/P,L=T/S,U=x/2,N=T/2,I=E/2,H=P+1,J=S+1;let ie=0,D=0;const q=new W;for(let te=0;te<J;te++){const Q=te*L-N;for(let ee=0;ee<H;ee++){const le=ee*C-U;q[_]=le*y,q[p]=Q*A,q[m]=I,c.push(q.x,q.y,q.z),q[_]=0,q[p]=0,q[m]=E>0?1:-1,f.push(q.x,q.y,q.z),h.push(ee/P),h.push(1-te/S),ie+=1}}for(let te=0;te<S;te++)for(let Q=0;Q<P;Q++){const ee=d+Q+H*te,le=d+Q+H*(te+1),Ue=d+(Q+1)+H*(te+1),ye=d+(Q+1)+H*te;l.push(ee,le,ye),l.push(le,Ue,ye),D+=6}o.addGroup(u,D,b),u+=D,d+=ie}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Sr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Mn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Be("Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let r=0;const s=i.length;let a;t?a=t:a=e*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=i[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===a)return r/(s-1);const f=i[r],d=i[r+1]-f,u=(a-f)/d;return(r+u)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new Pe:new W);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new W,r=[],s=[],a=[],o=new W,l=new vt;for(let u=0;u<=e;u++){const g=u/e;r[u]=this.getTangentAt(g,new W)}s[0]=new W,a[0]=new W;let c=Number.MAX_VALUE;const f=Math.abs(r[0].x),h=Math.abs(r[0].y),d=Math.abs(r[0].z);f<=c&&(c=f,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),d<=c&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let u=1;u<=e;u++){if(s[u]=s[u-1].clone(),a[u]=a[u-1].clone(),o.crossVectors(r[u-1],r[u]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Ye(r[u-1].dot(r[u]),-1,1));s[u].applyMatrix4(l.makeRotationAxis(o,g))}a[u].crossVectors(r[u],s[u])}if(t===!0){let u=Math.acos(Ye(s[0].dot(s[e]),-1,1));u/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(u=-u);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],u*g)),a[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Xo extends Mn{constructor(e=0,t=0,i=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new Pe){const i=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const f=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=l-this.aX,u=c-this.aY;l=d*f-u*h+this.aX,c=d*h+u*f+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Yf extends Xo{constructor(e,t,i,r,s,a){super(e,t,i,i,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function qo(){let n=0,e=0,t=0,i=0;function r(s,a,o,l){n=s,e=o,t=-3*s+3*a-2*o-l,i=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,f,h){let d=(a-s)/c-(o-s)/(c+f)+(o-a)/f,u=(o-a)/f-(l-a)/(f+h)+(l-o)/h;d*=f,u*=f,r(a,o,d,u)},calc:function(s){const a=s*s,o=a*s;return n+e*s+t*a+i*o}}}const ql=new W,Yl=new W,ma=new qo,ga=new qo,va=new qo;class $f extends Mn{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new W){const i=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,f;this.closed||o>0?c=r[(o-1)%s]:(Yl.subVectors(r[0],r[1]).add(r[0]),c=Yl);const h=r[o%s],d=r[(o+1)%s];if(this.closed||o+2<s?f=r[(o+2)%s]:(ql.subVectors(r[s-1],r[s-2]).add(r[s-1]),f=ql),this.curveType==="centripetal"||this.curveType==="chordal"){const u=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(h),u),_=Math.pow(h.distanceToSquared(d),u),p=Math.pow(d.distanceToSquared(f),u);_<1e-4&&(_=1),g<1e-4&&(g=_),p<1e-4&&(p=_),ma.initNonuniformCatmullRom(c.x,h.x,d.x,f.x,g,_,p),ga.initNonuniformCatmullRom(c.y,h.y,d.y,f.y,g,_,p),va.initNonuniformCatmullRom(c.z,h.z,d.z,f.z,g,_,p)}else this.curveType==="catmullrom"&&(ma.initCatmullRom(c.x,h.x,d.x,f.x,this.tension),ga.initCatmullRom(c.y,h.y,d.y,f.y,this.tension),va.initCatmullRom(c.z,h.z,d.z,f.z,this.tension));return i.set(ma.calc(l),ga.calc(l),va.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new W().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function $l(n,e,t,i,r){const s=(i-e)*.5,a=(r-t)*.5,o=n*n,l=n*o;return(2*t-2*i+s+a)*l+(-3*t+3*i-2*s-a)*o+s*n+t}function Kf(n,e){const t=1-n;return t*t*e}function Zf(n,e){return 2*(1-n)*n*e}function Jf(n,e){return n*n*e}function sr(n,e,t,i){return Kf(n,e)+Zf(n,t)+Jf(n,i)}function Qf(n,e){const t=1-n;return t*t*t*e}function jf(n,e){const t=1-n;return 3*t*t*n*e}function eh(n,e){return 3*(1-n)*n*n*e}function th(n,e){return n*n*n*e}function ar(n,e,t,i,r){return Qf(n,e)+jf(n,t)+eh(n,i)+th(n,r)}class Mu extends Mn{constructor(e=new Pe,t=new Pe,i=new Pe,r=new Pe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new Pe){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(ar(e,r.x,s.x,a.x,o.x),ar(e,r.y,s.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class nh extends Mn{constructor(e=new W,t=new W,i=new W,r=new W){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new W){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(ar(e,r.x,s.x,a.x,o.x),ar(e,r.y,s.y,a.y,o.y),ar(e,r.z,s.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class yu extends Mn{constructor(e=new Pe,t=new Pe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Pe){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Pe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ih extends Mn{constructor(e=new W,t=new W){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new W){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new W){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Eu extends Mn{constructor(e=new Pe,t=new Pe,i=new Pe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Pe){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(sr(e,r.x,s.x,a.x),sr(e,r.y,s.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class rh extends Mn{constructor(e=new W,t=new W,i=new W){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new W){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(sr(e,r.x,s.x,a.x),sr(e,r.y,s.y,a.y),sr(e,r.z,s.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class bu extends Mn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Pe){const i=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],f=r[a>r.length-2?r.length-1:a+1],h=r[a>r.length-3?r.length-1:a+2];return i.set($l(o,l.x,c.x,f.x,h.x),$l(o,l.y,c.y,f.y,h.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new Pe().fromArray(r))}return this}}var Kl=Object.freeze({__proto__:null,ArcCurve:Yf,CatmullRomCurve3:$f,CubicBezierCurve:Mu,CubicBezierCurve3:nh,EllipseCurve:Xo,LineCurve:yu,LineCurve3:ih,QuadraticBezierCurve:Eu,QuadraticBezierCurve3:rh,SplineCurve:bu});class sh extends Mn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Kl[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const a=r[s]-i,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const f=l[c];i&&i.equals(f)||(t.push(f),i=f)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(new Kl[r.type]().fromJSON(r))}return this}}class Zl extends sh{constructor(e){super(),this.type="Path",this.currentPoint=new Pe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new yu(this.currentPoint.clone(),new Pe(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){const s=new Eu(this.currentPoint.clone(),new Pe(e,t),new Pe(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,s,a){const o=new Mu(this.currentPoint.clone(),new Pe(e,t),new Pe(i,r),new Pe(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new bu(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,r,s,a),this}absarc(e,t,i,r,s,a){return this.absellipse(e,t,i,i,r,s,a),this}ellipse(e,t,i,r,s,a,o,l){const c=this.currentPoint.x,f=this.currentPoint.y;return this.absellipse(e+c,t+f,i,r,s,a,o,l),this}absellipse(e,t,i,r,s,a,o,l){const c=new Xo(e,t,i,r,s,a,o,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const f=c.getPoint(1);return this.currentPoint.copy(f),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Tu extends Zl{constructor(e){super(e),this.uuid=Gi(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(new Zl().fromJSON(r))}return this}}function ah(n,e,t=2){const i=e&&e.length,r=i?e[0]*t:n.length;let s=Au(n,0,r,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(i&&(s=dh(n,e,s,t)),n.length>80*t){o=n[0],l=n[1];let f=o,h=l;for(let d=t;d<r;d+=t){const u=n[d],g=n[d+1];u<o&&(o=u),g<l&&(l=g),u>f&&(f=u),g>h&&(h=g)}c=Math.max(f-o,h-l),c=c!==0?32767/c:0}return mr(s,a,t,o,l,c,0),a}function Au(n,e,t,i,r){let s;if(r===yh(n,e,t,i)>0)for(let a=e;a<t;a+=i)s=Jl(a/i|0,n[a],n[a+1],s);else for(let a=t-i;a>=e;a-=i)s=Jl(a/i|0,n[a],n[a+1],s);return s&&ki(s,s.next)&&(vr(s),s=s.next),s}function li(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(ki(t,t.next)||ft(t.prev,t,t.next)===0)){if(vr(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function mr(n,e,t,i,r,s,a){if(!n)return;!a&&s&&gh(n,i,r,s);let o=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(s?lh(n,i,r,s):oh(n)){e.push(l.i,n.i,c.i),vr(n),n=c.next,o=c.next;continue}if(n=c,n===o){a?a===1?(n=ch(li(n),e),mr(n,e,t,i,r,s,2)):a===2&&uh(n,e,t,i,r,s):mr(li(n),e,t,i,r,s,1);break}}}function oh(n){const e=n.prev,t=n,i=n.next;if(ft(e,t,i)>=0)return!1;const r=e.x,s=t.x,a=i.x,o=e.y,l=t.y,c=i.y,f=Math.min(r,s,a),h=Math.min(o,l,c),d=Math.max(r,s,a),u=Math.max(o,l,c);let g=i.next;for(;g!==e;){if(g.x>=f&&g.x<=d&&g.y>=h&&g.y<=u&&nr(r,o,s,l,a,c,g.x,g.y)&&ft(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function lh(n,e,t,i){const r=n.prev,s=n,a=n.next;if(ft(r,s,a)>=0)return!1;const o=r.x,l=s.x,c=a.x,f=r.y,h=s.y,d=a.y,u=Math.min(o,l,c),g=Math.min(f,h,d),_=Math.max(o,l,c),p=Math.max(f,h,d),m=xo(u,g,e,t,i),y=xo(_,p,e,t,i);let A=n.prevZ,x=n.nextZ;for(;A&&A.z>=m&&x&&x.z<=y;){if(A.x>=u&&A.x<=_&&A.y>=g&&A.y<=p&&A!==r&&A!==a&&nr(o,f,l,h,c,d,A.x,A.y)&&ft(A.prev,A,A.next)>=0||(A=A.prevZ,x.x>=u&&x.x<=_&&x.y>=g&&x.y<=p&&x!==r&&x!==a&&nr(o,f,l,h,c,d,x.x,x.y)&&ft(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;A&&A.z>=m;){if(A.x>=u&&A.x<=_&&A.y>=g&&A.y<=p&&A!==r&&A!==a&&nr(o,f,l,h,c,d,A.x,A.y)&&ft(A.prev,A,A.next)>=0)return!1;A=A.prevZ}for(;x&&x.z<=y;){if(x.x>=u&&x.x<=_&&x.y>=g&&x.y<=p&&x!==r&&x!==a&&nr(o,f,l,h,c,d,x.x,x.y)&&ft(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function ch(n,e){let t=n;do{const i=t.prev,r=t.next.next;!ki(i,r)&&Cu(i,t,t.next,r)&&gr(i,r)&&gr(r,i)&&(e.push(i.i,t.i,r.i),vr(t),vr(t.next),t=n=r),t=t.next}while(t!==n);return li(t)}function uh(n,e,t,i,r,s){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&xh(a,o)){let l=Ru(a,o);a=li(a,a.next),l=li(l,l.next),mr(a,e,t,i,r,s,0),mr(l,e,t,i,r,s,0);return}o=o.next}a=a.next}while(a!==n)}function dh(n,e,t,i){const r=[];for(let s=0,a=e.length;s<a;s++){const o=e[s]*i,l=s<a-1?e[s+1]*i:n.length,c=Au(n,o,l,i,!1);c===c.next&&(c.steiner=!0),r.push(_h(c))}r.sort(fh);for(let s=0;s<r.length;s++)t=hh(r[s],t);return t}function fh(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=i-r}return t}function hh(n,e){const t=ph(n,e);if(!t)return e;const i=Ru(t,n);return li(i,i.next),li(t,t.next)}function ph(n,e){let t=e;const i=n.x,r=n.y;let s=-1/0,a;if(ki(n,t))return t;do{if(ki(n,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const h=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=i&&h>s&&(s=h,a=t.x<t.next.x?t:t.next,h===i))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let f=1/0;t=a;do{if(i>=t.x&&t.x>=l&&i!==t.x&&wu(r<c?i:s,r,l,c,r<c?s:i,r,t.x,t.y)){const h=Math.abs(r-t.y)/(i-t.x);gr(t,n)&&(h<f||h===f&&(t.x>a.x||t.x===a.x&&mh(a,t)))&&(a=t,f=h)}t=t.next}while(t!==o);return a}function mh(n,e){return ft(n.prev,n,e.prev)<0&&ft(e.next,n,n.next)<0}function gh(n,e,t,i){let r=n;do r.z===0&&(r.z=xo(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,vh(r)}function vh(n){let e,t=1;do{let i=n,r;n=null;let s=null;for(e=0;i;){e++;let a=i,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||i.z<=a.z)?(r=i,i=i.nextZ,o--):(r=a,a=a.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;i=a}s.nextZ=null,t*=2}while(e>1);return n}function xo(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function _h(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function wu(n,e,t,i,r,s,a,o){return(r-a)*(e-o)>=(n-a)*(s-o)&&(n-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(i-o)}function nr(n,e,t,i,r,s,a,o){return!(n===a&&e===o)&&wu(n,e,t,i,r,s,a,o)}function xh(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!Sh(n,e)&&(gr(n,e)&&gr(e,n)&&Mh(n,e)&&(ft(n.prev,n,e.prev)||ft(n,e.prev,e))||ki(n,e)&&ft(n.prev,n,n.next)>0&&ft(e.prev,e,e.next)>0)}function ft(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function ki(n,e){return n.x===e.x&&n.y===e.y}function Cu(n,e,t,i){const r=Kr(ft(n,e,t)),s=Kr(ft(n,e,i)),a=Kr(ft(t,i,n)),o=Kr(ft(t,i,e));return!!(r!==s&&a!==o||r===0&&$r(n,t,e)||s===0&&$r(n,i,e)||a===0&&$r(t,n,i)||o===0&&$r(t,e,i))}function $r(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function Kr(n){return n>0?1:n<0?-1:0}function Sh(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&Cu(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function gr(n,e){return ft(n.prev,n,n.next)<0?ft(n,e,n.next)>=0&&ft(n,n.prev,e)>=0:ft(n,e,n.prev)<0||ft(n,n.next,e)<0}function Mh(n,e){let t=n,i=!1;const r=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function Ru(n,e){const t=So(n.i,n.x,n.y),i=So(e.i,e.x,e.y),r=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function Jl(n,e,t,i){const r=So(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function vr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function So(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function yh(n,e,t,i){let r=0;for(let s=e,a=t-i;s<t;s+=i)r+=(n[a]-n[s])*(n[s+1]+n[a+1]),a=s;return r}class Eh{static triangulate(e,t,i=2){return ah(e,t,i)}}class or{static area(e){const t=e.length;let i=0;for(let r=t-1,s=0;s<t;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return or.area(e)<0}static triangulateShape(e,t){const i=[],r=[],s=[];Ql(e),jl(i,e);let a=e.length;t.forEach(Ql);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,jl(i,t[l]);const o=Eh.triangulate(i,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function Ql(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function jl(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class Ps extends kt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,f=l+1,h=e/o,d=t/l,u=[],g=[],_=[],p=[];for(let m=0;m<f;m++){const y=m*d-a;for(let A=0;A<c;A++){const x=A*h-s;g.push(x,-y,0),_.push(0,0,1),p.push(A/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let y=0;y<o;y++){const A=y+c*m,x=y+c*(m+1),T=y+1+c*(m+1),E=y+1+c*m;u.push(A,x,E),u.push(x,T,E)}this.setIndex(u),this.setAttribute("position",new Mt(g,3)),this.setAttribute("normal",new Mt(_,3)),this.setAttribute("uv",new Mt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ps(e.width,e.height,e.widthSegments,e.heightSegments)}}class Yo extends kt{constructor(e=new Tu([new Pe(0,.5),new Pe(-.5,-.5),new Pe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const i=[],r=[],s=[],a=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let f=0;f<e.length;f++)c(e[f]),this.addGroup(o,l,f),o+=l,l=0;this.setIndex(i),this.setAttribute("position",new Mt(r,3)),this.setAttribute("normal",new Mt(s,3)),this.setAttribute("uv",new Mt(a,2));function c(f){const h=r.length/3,d=f.extractPoints(t);let u=d.shape;const g=d.holes;or.isClockWise(u)===!1&&(u=u.reverse());for(let p=0,m=g.length;p<m;p++){const y=g[p];or.isClockWise(y)===!0&&(g[p]=y.reverse())}const _=or.triangulateShape(u,g);for(let p=0,m=g.length;p<m;p++){const y=g[p];u=u.concat(y)}for(let p=0,m=u.length;p<m;p++){const y=u[p];r.push(y.x,y.y,0),s.push(0,0,1),a.push(y.x,y.y)}for(let p=0,m=_.length;p<m;p++){const y=_[p],A=y[0]+h,x=y[1]+h,T=y[2]+h;i.push(A,x,T),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return bh(t,e)}static fromJSON(e,t){const i=[];for(let r=0,s=e.shapes.length;r<s;r++){const a=t[e.shapes[r]];i.push(a)}return new Yo(i,e.curveSegments)}}function bh(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){const r=n[t];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e}function zi(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(ec(r))r.isRenderTargetTexture?(Be("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(ec(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Ot(n){const e={};for(let t=0;t<n.length;t++){const i=zi(n[t]);for(const r in i)e[r]=i[r]}return e}function ec(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Th(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Lu(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}const Ah={clone:zi,merge:Ot};var wh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ch=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Sn extends Ls{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=wh,this.fragmentShader=Ch,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=zi(e.uniforms),this.uniformsGroups=Th(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new Ve().setHex(r.value);break;case"v2":this.uniforms[i].value=new Pe().fromArray(r.value);break;case"v3":this.uniforms[i].value=new W().fromArray(r.value);break;case"v4":this.uniforms[i].value=new pt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new ze().fromArray(r.value);break;case"m4":this.uniforms[i].value=new vt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Rh extends Sn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Lh extends Ls{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=lf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Ph extends Ls{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const _a={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(tc(n)||(this.files[n]=e))},get:function(n){if(this.enabled!==!1&&!tc(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function tc(n){try{const e=n.slice(n.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class Pu{constructor(e,t,i){const r=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(f){o++,s===!1&&r.onStart!==void 0&&r.onStart(f,a,o),s=!0},this.itemEnd=function(f){a++,r.onProgress!==void 0&&r.onProgress(f,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(f){r.onError!==void 0&&r.onError(f)},this.resolveURL=function(f){return f=f.normalize("NFC"),l?l(f):f},this.setURLModifier=function(f){return l=f,this},this.addHandler=function(f,h){return c.push(f,h),this},this.removeHandler=function(f){const h=c.indexOf(f);return h!==-1&&c.splice(h,2),this},this.getHandler=function(f){for(let h=0,d=c.length;h<d;h+=2){const u=c[h],g=c[h+1];if(u.global&&(u.lastIndex=0),u.test(f))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Ih=new Pu;class $o{constructor(e){this.manager=e!==void 0?e:Ih,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}$o.DEFAULT_MATERIAL_NAME="__DEFAULT";const bi=new WeakMap;class Dh extends $o{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=_a.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let h=bi.get(a);h===void 0&&(h=[],bi.set(a,h)),h.push({onLoad:t,onError:r})}return a}const o=hr("img");function l(){f(),t&&t(this);const h=bi.get(this)||[];for(let d=0;d<h.length;d++){const u=h[d];u.onLoad&&u.onLoad(this)}bi.delete(this),s.manager.itemEnd(e)}function c(h){f(),r&&r(h),_a.remove(`image:${e}`);const d=bi.get(this)||[];for(let u=0;u<d.length;u++){const g=d[u];g.onError&&g.onError(h)}bi.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function f(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),_a.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class xa extends $o{constructor(e){super(e)}load(e,t,i,r){const s=new Nt,a=new Dh(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},i,r),s}}const Zr=new W,Jr=new Wi,on=new W;class Iu extends Vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Zr,Jr,on),on.x===1&&on.y===1&&on.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Zr,Jr,on.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Zr,Jr,on),on.x===1&&on.y===1&&on.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Zr,Jr,on.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Hn=new W,nc=new Pe,ic=new Pe;class Qt extends Iu{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=_o*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(qs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return _o*2*Math.atan(Math.tan(qs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Hn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Hn.x,Hn.y).multiplyScalar(-e/Hn.z),Hn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Hn.x,Hn.y).multiplyScalar(-e/Hn.z)}getViewSize(e,t){return this.getViewBounds(e,nc,ic),t.subVectors(ic,nc)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(qs*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Ko extends Iu{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=f*this.view.offsetY,l=o-f*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ti=-90,Ai=1;class Nh extends Vt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Qt(Ti,Ai,e,t);r.layers=this.layers,this.add(r);const s=new Qt(Ti,Ai,e,t);s.layers=this.layers,this.add(s);const a=new Qt(Ti,Ai,e,t);a.layers=this.layers,this.add(a);const o=new Qt(Ti,Ai,e,t);o.layers=this.layers,this.add(o);const l=new Qt(Ti,Ai,e,t);l.layers=this.layers,this.add(l);const c=new Qt(Ti,Ai,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===mn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Es)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,f]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,f),e.setRenderTarget(h,d,u),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Uh extends Qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const sl=class sl{constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};sl.prototype.isMatrix2=!0;let rc=sl;function sc(n,e,t,i){const r=Oh(i);switch(t){case cu:return n*e;case du:return n*e/r.components*r.byteLength;case Bo:return n*e/r.components*r.byteLength;case ai:return n*e*2/r.components*r.byteLength;case ko:return n*e*2/r.components*r.byteLength;case uu:return n*e*3/r.components*r.byteLength;case en:return n*e*4/r.components*r.byteLength;case zo:return n*e*4/r.components*r.byteLength;case ls:case cs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case us:case ds:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Va:case Wa:return Math.max(n,16)*Math.max(e,8)/4;case Ha:case Ga:return Math.max(n,8)*Math.max(e,8)/2;case Xa:case qa:case $a:case Ka:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ya:case xs:case Za:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ja:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Qa:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case ja:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case eo:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case to:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case no:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case io:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case ro:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case so:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case ao:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case oo:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case lo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case co:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case uo:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case fo:case ho:case po:return Math.ceil(n/4)*Math.ceil(e/4)*16;case mo:case go:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ss:case vo:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Oh(n){switch(n){case Yt:case su:return{byteLength:1,components:1};case dr:case au:case _n:return{byteLength:2,components:1};case Oo:case Fo:return{byteLength:2,components:4};case vn:case Uo:case pn:return{byteLength:4,components:1};case ou:case lu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:No}}));typeof window<"u"&&(window.__THREE__?Be("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=No);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Du(){let n=null,e=!1,t=null,i=null;function r(s,a){i=n.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Fh(n){const e=new WeakMap;function t(o,l){const c=o.array,f=o.usage,h=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,f),o.onUploadCallback();let u;if(c instanceof Float32Array)u=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)u=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?u=n.HALF_FLOAT:u=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)u=n.SHORT;else if(c instanceof Uint32Array)u=n.UNSIGNED_INT;else if(c instanceof Int32Array)u=n.INT;else if(c instanceof Int8Array)u=n.BYTE;else if(c instanceof Uint8Array)u=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)u=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:u,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const f=l.array,h=l.updateRanges;if(n.bindBuffer(c,o),h.length===0)n.bufferSubData(c,0,f);else{h.sort((u,g)=>u.start-g.start);let d=0;for(let u=1;u<h.length;u++){const g=h[d],_=h[u];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,h[d]=_)}h.length=d+1;for(let u=0,g=h.length;u<g;u++){const _=h[u];n.bufferSubData(c,_.start*f.BYTES_PER_ELEMENT,f,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const f=e.get(o);(!f||f.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var Bh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,kh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,zh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Hh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Gh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Xh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qh=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Yh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$h=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Kh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Jh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Qh=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,jh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ep=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,tp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,np=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ip=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,rp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,sp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,ap=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,op=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,lp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,cp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,up=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,dp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,fp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,pp="gl_FragColor = linearToOutputTexel( gl_FragColor );",mp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,gp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,vp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,_p=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,xp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Sp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Mp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,yp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ep=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,bp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Tp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ap=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,wp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Cp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Rp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Lp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Pp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ip=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Dp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Np=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Up=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Op=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Fp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Bp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,kp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,zp=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Hp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Vp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Xp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,qp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Yp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,$p=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Kp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Zp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Jp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Qp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,em=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,tm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,im=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,rm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,am=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,om=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,lm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,cm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,um=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,dm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,fm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,pm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,mm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,gm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_m=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Sm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Mm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ym=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Em=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,bm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Tm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Am=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,wm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Cm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Rm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Lm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Pm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Im=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Dm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Nm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Um=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Om=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Fm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Bm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,km=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Xm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,qm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ym=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,$m=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Km=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Jm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,jm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ng=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ig=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,sg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ag=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,og=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,cg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ug=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,hg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xe={alphahash_fragment:Bh,alphahash_pars_fragment:kh,alphamap_fragment:zh,alphamap_pars_fragment:Hh,alphatest_fragment:Vh,alphatest_pars_fragment:Gh,aomap_fragment:Wh,aomap_pars_fragment:Xh,batching_pars_vertex:qh,batching_vertex:Yh,begin_vertex:$h,beginnormal_vertex:Kh,bsdfs:Zh,iridescence_fragment:Jh,bumpmap_pars_fragment:Qh,clipping_planes_fragment:jh,clipping_planes_pars_fragment:ep,clipping_planes_pars_vertex:tp,clipping_planes_vertex:np,color_fragment:ip,color_pars_fragment:rp,color_pars_vertex:sp,color_vertex:ap,common:op,cube_uv_reflection_fragment:lp,defaultnormal_vertex:cp,displacementmap_pars_vertex:up,displacementmap_vertex:dp,emissivemap_fragment:fp,emissivemap_pars_fragment:hp,colorspace_fragment:pp,colorspace_pars_fragment:mp,envmap_fragment:gp,envmap_common_pars_fragment:vp,envmap_pars_fragment:_p,envmap_pars_vertex:xp,envmap_physical_pars_fragment:Lp,envmap_vertex:Sp,fog_vertex:Mp,fog_pars_vertex:yp,fog_fragment:Ep,fog_pars_fragment:bp,gradientmap_pars_fragment:Tp,lightmap_pars_fragment:Ap,lights_lambert_fragment:wp,lights_lambert_pars_fragment:Cp,lights_pars_begin:Rp,lights_toon_fragment:Pp,lights_toon_pars_fragment:Ip,lights_phong_fragment:Dp,lights_phong_pars_fragment:Np,lights_physical_fragment:Up,lights_physical_pars_fragment:Op,lights_fragment_begin:Fp,lights_fragment_maps:Bp,lights_fragment_end:kp,lightprobes_pars_fragment:zp,logdepthbuf_fragment:Hp,logdepthbuf_pars_fragment:Vp,logdepthbuf_pars_vertex:Gp,logdepthbuf_vertex:Wp,map_fragment:Xp,map_pars_fragment:qp,map_particle_fragment:Yp,map_particle_pars_fragment:$p,metalnessmap_fragment:Kp,metalnessmap_pars_fragment:Zp,morphinstance_vertex:Jp,morphcolor_vertex:Qp,morphnormal_vertex:jp,morphtarget_pars_vertex:em,morphtarget_vertex:tm,normal_fragment_begin:nm,normal_fragment_maps:im,normal_pars_fragment:rm,normal_pars_vertex:sm,normal_vertex:am,normalmap_pars_fragment:om,clearcoat_normal_fragment_begin:lm,clearcoat_normal_fragment_maps:cm,clearcoat_pars_fragment:um,iridescence_pars_fragment:dm,opaque_fragment:fm,packing:hm,premultiplied_alpha_fragment:pm,project_vertex:mm,dithering_fragment:gm,dithering_pars_fragment:vm,roughnessmap_fragment:_m,roughnessmap_pars_fragment:xm,shadowmap_pars_fragment:Sm,shadowmap_pars_vertex:Mm,shadowmap_vertex:ym,shadowmask_pars_fragment:Em,skinbase_vertex:bm,skinning_pars_vertex:Tm,skinning_vertex:Am,skinnormal_vertex:wm,specularmap_fragment:Cm,specularmap_pars_fragment:Rm,tonemapping_fragment:Lm,tonemapping_pars_fragment:Pm,transmission_fragment:Im,transmission_pars_fragment:Dm,uv_pars_fragment:Nm,uv_pars_vertex:Um,uv_vertex:Om,worldpos_vertex:Fm,background_vert:Bm,background_frag:km,backgroundCube_vert:zm,backgroundCube_frag:Hm,cube_vert:Vm,cube_frag:Gm,depth_vert:Wm,depth_frag:Xm,distance_vert:qm,distance_frag:Ym,equirect_vert:$m,equirect_frag:Km,linedashed_vert:Zm,linedashed_frag:Jm,meshbasic_vert:Qm,meshbasic_frag:jm,meshlambert_vert:eg,meshlambert_frag:tg,meshmatcap_vert:ng,meshmatcap_frag:ig,meshnormal_vert:rg,meshnormal_frag:sg,meshphong_vert:ag,meshphong_frag:og,meshphysical_vert:lg,meshphysical_frag:cg,meshtoon_vert:ug,meshtoon_frag:dg,points_vert:fg,points_frag:hg,shadow_vert:pg,shadow_frag:mg,sprite_vert:gg,sprite_frag:vg},me={common:{diffuse:{value:new Ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new Pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new W},probesMax:{value:new W},probesResolution:{value:new W}},points:{diffuse:{value:new Ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new Ve(16777215)},opacity:{value:1},center:{value:new Pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},dn={basic:{uniforms:Ot([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:Ot([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Ve(0)},envMapIntensity:{value:1}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:Ot([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Ve(0)},specular:{value:new Ve(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:Ot([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new Ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:Ot([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:Ot([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:Ot([me.points,me.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:Ot([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:Ot([me.common,me.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:Ot([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:Ot([me.sprite,me.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distance:{uniforms:Ot([me.common,me.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distance_vert,fragmentShader:Xe.distance_frag},shadow:{uniforms:Ot([me.lights,me.fog,{color:{value:new Ve(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};dn.physical={uniforms:Ot([dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new Pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new Ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new Pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new Ve(0)},specularColor:{value:new Ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new Pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const Qr={r:0,b:0,g:0},_g=new vt,Nu=new ze;Nu.set(-1,0,0,0,1,0,0,0,1);function xg(n,e,t,i,r,s){const a=new Ve(0);let o=r===!0?0:1,l,c,f=null,h=0,d=null;function u(y){let A=y.isScene===!0?y.background:null;if(A&&A.isTexture){const x=y.backgroundBlurriness>0;A=e.get(A,x)}return A}function g(y){let A=!1;const x=u(y);x===null?p(a,o):x&&x.isColor&&(p(x,1),A=!0);const T=n.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,s):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(y,A){const x=u(A);x&&(x.isCubeTexture||x.mapping===Rs)?(c===void 0&&(c=new xn(new Sr(1,1,1),new Sn({name:"BackgroundCubeMaterial",uniforms:zi(dn.backgroundCube.uniforms),vertexShader:dn.backgroundCube.vertexShader,fragmentShader:dn.backgroundCube.fragmentShader,side:Bt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,E,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(_g.makeRotationFromEuler(A.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Nu),c.material.toneMapped=Ke.getTransfer(x.colorSpace)!==tt,(f!==x||h!==x.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,f=x,h=x.version,d=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new xn(new Ps(2,2),new Sn({name:"BackgroundMaterial",uniforms:zi(dn.background.uniforms),vertexShader:dn.background.vertexShader,fragmentShader:dn.background.fragmentShader,side:ri,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=Ke.getTransfer(x.colorSpace)!==tt,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(f!==x||h!==x.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,f=x,h=x.version,d=n.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,A){y.getRGB(Qr,Lu(n)),t.buffers.color.setClear(Qr.r,Qr.g,Qr.b,A,s)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,A=1){a.set(y),o=A,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,p(a,o)},render:g,addToRenderList:_,dispose:m}}function Sg(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,a=!1;function o(L,U,N,I,H){let J=!1;const ie=h(L,I,N,U);s!==ie&&(s=ie,c(s.object)),J=u(L,I,N,H),J&&g(L,I,N,H),H!==null&&e.update(H,n.ELEMENT_ARRAY_BUFFER),(J||a)&&(a=!1,x(L,U,N,I),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return n.createVertexArray()}function c(L){return n.bindVertexArray(L)}function f(L){return n.deleteVertexArray(L)}function h(L,U,N,I){const H=I.wireframe===!0;let J=i[U.id];J===void 0&&(J={},i[U.id]=J);const ie=L.isInstancedMesh===!0?L.id:0;let D=J[ie];D===void 0&&(D={},J[ie]=D);let q=D[N.id];q===void 0&&(q={},D[N.id]=q);let te=q[H];return te===void 0&&(te=d(l()),q[H]=te),te}function d(L){const U=[],N=[],I=[];for(let H=0;H<t;H++)U[H]=0,N[H]=0,I[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:N,attributeDivisors:I,object:L,attributes:{},index:null}}function u(L,U,N,I){const H=s.attributes,J=U.attributes;let ie=0;const D=N.getAttributes();for(const q in D)if(D[q].location>=0){const Q=H[q];let ee=J[q];if(ee===void 0&&(q==="instanceMatrix"&&L.instanceMatrix&&(ee=L.instanceMatrix),q==="instanceColor"&&L.instanceColor&&(ee=L.instanceColor)),Q===void 0||Q.attribute!==ee||ee&&Q.data!==ee.data)return!0;ie++}return s.attributesNum!==ie||s.index!==I}function g(L,U,N,I){const H={},J=U.attributes;let ie=0;const D=N.getAttributes();for(const q in D)if(D[q].location>=0){let Q=J[q];Q===void 0&&(q==="instanceMatrix"&&L.instanceMatrix&&(Q=L.instanceMatrix),q==="instanceColor"&&L.instanceColor&&(Q=L.instanceColor));const ee={};ee.attribute=Q,Q&&Q.data&&(ee.data=Q.data),H[q]=ee,ie++}s.attributes=H,s.attributesNum=ie,s.index=I}function _(){const L=s.newAttributes;for(let U=0,N=L.length;U<N;U++)L[U]=0}function p(L){m(L,0)}function m(L,U){const N=s.newAttributes,I=s.enabledAttributes,H=s.attributeDivisors;N[L]=1,I[L]===0&&(n.enableVertexAttribArray(L),I[L]=1),H[L]!==U&&(n.vertexAttribDivisor(L,U),H[L]=U)}function y(){const L=s.newAttributes,U=s.enabledAttributes;for(let N=0,I=U.length;N<I;N++)U[N]!==L[N]&&(n.disableVertexAttribArray(N),U[N]=0)}function A(L,U,N,I,H,J,ie){ie===!0?n.vertexAttribIPointer(L,U,N,H,J):n.vertexAttribPointer(L,U,N,I,H,J)}function x(L,U,N,I){_();const H=I.attributes,J=N.getAttributes(),ie=U.defaultAttributeValues;for(const D in J){const q=J[D];if(q.location>=0){let te=H[D];if(te===void 0&&(D==="instanceMatrix"&&L.instanceMatrix&&(te=L.instanceMatrix),D==="instanceColor"&&L.instanceColor&&(te=L.instanceColor)),te!==void 0){const Q=te.normalized,ee=te.itemSize,le=e.get(te);if(le===void 0)continue;const Ue=le.buffer,ye=le.type,pe=le.bytesPerElement,X=ye===n.INT||ye===n.UNSIGNED_INT||te.gpuType===Uo;if(te.isInterleavedBufferAttribute){const Y=te.data,se=Y.stride,_e=te.offset;if(Y.isInstancedInterleavedBuffer){for(let oe=0;oe<q.locationSize;oe++)m(q.location+oe,Y.meshPerAttribute);L.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let oe=0;oe<q.locationSize;oe++)p(q.location+oe);n.bindBuffer(n.ARRAY_BUFFER,Ue);for(let oe=0;oe<q.locationSize;oe++)A(q.location+oe,ee/q.locationSize,ye,Q,se*pe,(_e+ee/q.locationSize*oe)*pe,X)}else{if(te.isInstancedBufferAttribute){for(let Y=0;Y<q.locationSize;Y++)m(q.location+Y,te.meshPerAttribute);L.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Y=0;Y<q.locationSize;Y++)p(q.location+Y);n.bindBuffer(n.ARRAY_BUFFER,Ue);for(let Y=0;Y<q.locationSize;Y++)A(q.location+Y,ee/q.locationSize,ye,Q,ee*pe,ee/q.locationSize*Y*pe,X)}}else if(ie!==void 0){const Q=ie[D];if(Q!==void 0)switch(Q.length){case 2:n.vertexAttrib2fv(q.location,Q);break;case 3:n.vertexAttrib3fv(q.location,Q);break;case 4:n.vertexAttrib4fv(q.location,Q);break;default:n.vertexAttrib1fv(q.location,Q)}}}}y()}function T(){b();for(const L in i){const U=i[L];for(const N in U){const I=U[N];for(const H in I){const J=I[H];for(const ie in J)f(J[ie].object),delete J[ie];delete I[H]}}delete i[L]}}function E(L){if(i[L.id]===void 0)return;const U=i[L.id];for(const N in U){const I=U[N];for(const H in I){const J=I[H];for(const ie in J)f(J[ie].object),delete J[ie];delete I[H]}}delete i[L.id]}function P(L){for(const U in i){const N=i[U];for(const I in N){const H=N[I];if(H[L.id]===void 0)continue;const J=H[L.id];for(const ie in J)f(J[ie].object),delete J[ie];delete H[L.id]}}}function S(L){for(const U in i){const N=i[U],I=L.isInstancedMesh===!0?L.id:0,H=N[I];if(H!==void 0){for(const J in H){const ie=H[J];for(const D in ie)f(ie[D].object),delete ie[D];delete H[J]}delete N[I],Object.keys(N).length===0&&delete i[U]}}}function b(){C(),a=!0,s!==r&&(s=r,c(s.object))}function C(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:b,resetDefaultState:C,dispose:T,releaseStatesOfGeometry:E,releaseStatesOfObject:S,releaseStatesOfProgram:P,initAttributes:_,enableAttribute:p,disableUnusedAttributes:y}}function Mg(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,f){f!==0&&(n.drawArraysInstanced(i,l,c,f),t.update(c,i,f))}function o(l,c,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,f);let d=0;for(let u=0;u<f;u++)d+=c[u];t.update(d,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function yg(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(P){return!(P!==en&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const S=P===_n&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Yt&&P!==pn&&!S&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const f=l(c);f!==c&&(Be("WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);const h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Be("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const u=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),A=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:u,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:y,maxVaryings:A,maxFragmentUniforms:x,maxSamples:T,samples:E}}function Eg(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new Gn,o=new ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const u=h.length!==0||d||i!==0||r;return r=d,i=h.length,u},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=f(h,d,0)},this.setState=function(h,d,u){const g=h.clippingPlanes,_=h.clipIntersection,p=h.clipShadows,m=n.get(h);if(!r||g===null||g.length===0||s&&!p)s?f(null):c();else{const y=s?0:i,A=y*4;let x=m.clippingState||null;l.value=x,x=f(g,d,A,u);for(let T=0;T!==A;++T)x[T]=t[T];m.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(h,d,u,g){const _=h!==null?h.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const m=u+_*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(p===null||p.length<m)&&(p=new Float32Array(m));for(let A=0,x=u;A!==_;++A,x+=4)a.copy(h[A]).applyMatrix4(y,o),a.normal.toArray(p,x),p[x+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}const Ii=4,bg=6,Tg=20,Ag=256,Qi=new Ko,ac=new Ve;let Sa=null,Ma=0,ya=0,Ea=!1;const wg=new W,Zn=new W;class oc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=wg}=s;Sa=this._renderer.getRenderTarget(),Ma=this._renderer.getActiveCubeFace(),ya=this._renderer.getActiveMipmapLevel(),Ea=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=uc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=cc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Sa,Ma,ya),this._renderer.xr.enabled=Ea,e.scissorTest=!1,wi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===si||e.mapping===Bi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Sa=this._renderer.getRenderTarget(),Ma=this._renderer.getActiveCubeFace(),ya=this._renderer.getActiveMipmapLevel(),Ea=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Dt,minFilter:Dt,generateMipmaps:!1,type:_n,format:en,colorSpace:Ms,depthBuffer:!1},r=lc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=lc(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Cg(s)),this._blurMaterial=Lg(s,e,t),this._ggxMaterial=Rg(s,e,t)}return r}_compileMaterial(e){const t=new xn(new kt,e);this._renderer.compile(t,Qi)}_sceneToCubeUV(e,t,i,r,s){const l=new Qt(90,1,t,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(ac),h.toneMapping=tn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new xn(new Sr,new st({name:"PMREM.Background",side:Bt,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,p=_.material;let m=!1;const y=e.background;y?y.isColor&&(p.color.copy(y),e.background=null,m=!0):(p.color.copy(ac),m=!0);for(let A=0;A<6;A++){const x=A%3;x===0?(l.up.set(0,c[A],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+f[A],s.y,s.z)):x===1?(l.up.set(0,0,c[A]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+f[A],s.z)):(l.up.set(0,c[A],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+f[A]));const T=this._cubeSize;wi(r,x*T,A>2?T:0,T,T),h.setRenderTarget(r),m&&h.render(_,l),h.render(e,l)}h.toneMapping=u,h.autoClear=d,e.background=y}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===si||e.mapping===Bi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=uc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=cc());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;wi(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Qi)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),f=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-f*f),d=c*1.25,u=h*d,{_lodMax:g}=this,_=this._sizeLods[i],p=3*_*(i>g-Ii?i-g+Ii:0),m=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=u,l.mipInt.value=g-t,wi(s,p,m,3*_,2*_),r.setRenderTarget(s),r.render(o,Qi),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-i,wi(e,p,m,3*_,2*_),r.setRenderTarget(e),r.render(o,Qi)}_blur(e,t,i,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,i,a),this._blurPass(s,e,i,i,a)}_blurPass(e,t,i,r,s){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[r];l.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-i;const f=this._sizeLods[r],h=3*f*(r>this._lodMax-Ii?r-this._lodMax+Ii:0),d=4*(this._cubeSize-f);wi(t,h,d,3*f,2*f),a.setRenderTarget(t),a.render(l,Qi)}}function Cg(n){const e=[],t=[];let i=n;const r=n-Ii+1+bg;for(let s=0;s<r;s++){const a=Math.pow(2,i);e.push(a);const o=1/(a-2),l=-o,c=1+o,f=[l,l,c,l,c,c,l,l,c,c,l,c],h=6,d=6,u=3,g=new Float32Array(u*d*h),_=new Float32Array(u*d*h);for(let m=0;m<h;m++){const y=m%3*2/3-1,A=m>2?0:-1,x=[y,A,0,y+2/3,A,0,y+2/3,A+1,0,y,A,0,y+2/3,A+1,0,y,A+1,0];g.set(x,u*d*m);for(let T=0;T<d;T++){const E=f[T*2]*2-1,P=f[T*2+1]*2-1;m===0?Zn.set(1,P,E):m===1?Zn.set(-E,1,-P):m===2?Zn.set(-E,P,1):m===3?Zn.set(-1,P,-E):m===4?Zn.set(-E,-1,P):Zn.set(E,P,-1),Zn.toArray(_,(m*d+T)*u)}}const p=new kt;p.setAttribute("position",new Pn(g,u)),p.setAttribute("outputDirection",new Pn(_,u)),t.push(new xn(p,null)),i>Ii&&i--}return{lodMeshes:t,sizeLods:e}}function lc(n,e,t){const i=new nn(n,e,t);return i.texture.mapping=Rs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function wi(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Rg(n,e,t){return new Sn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Ag,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Is(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function Lg(n,e,t){return new Sn({name:"SphericalGaussianBlur",defines:{SAMPLES:Tg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Is(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function cc(){return new Sn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Is(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function uc(){return new Sn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Is(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function Is(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Uu extends nn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new xu(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Sr(5,5,5),s=new Sn({name:"CubemapFromEquirect",uniforms:zi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Bt,blending:Rn});s.uniforms.tEquirect.value=t;const a=new xn(r,s),o=t.minFilter;return t.minFilter===Qn&&(t.minFilter=Dt),new Nh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function Pg(n){let e=new WeakMap,t=new WeakMap,i=null;function r(d,u=!1){return d==null?null:u?a(d):s(d)}function s(d){if(d&&d.isTexture){const u=d.mapping;if(u===Vs||u===Gs)if(e.has(d)){const g=e.get(d).texture;return o(g,d.mapping)}else{const g=d.image;if(g&&g.height>0){const _=new Uu(g.height);return _.fromEquirectangularTexture(n,d),e.set(d,_),d.addEventListener("dispose",c),o(_.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const u=d.mapping,g=u===Vs||u===Gs,_=u===si||u===Bi;if(g||_){let p=t.get(d);const m=p!==void 0?p.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return i===null&&(i=new oc(n)),p=g?i.fromEquirectangular(d,p):i.fromCubemap(d,p),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),p.texture;if(p!==void 0)return p.texture;{const y=d.image;return g&&y&&y.height>0||_&&y&&l(y)?(i===null&&(i=new oc(n)),p=g?i.fromEquirectangular(d):i.fromCubemap(d),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),d.addEventListener("dispose",f),p.texture):null}}}return d}function o(d,u){return u===Vs?d.mapping=si:u===Gs&&(d.mapping=Bi),d}function l(d){let u=0;const g=6;for(let _=0;_<g;_++)d[_]!==void 0&&u++;return u===g}function c(d){const u=d.target;u.removeEventListener("dispose",c);const g=e.get(u);g!==void 0&&(e.delete(u),g.dispose())}function f(d){const u=d.target;u.removeEventListener("dispose",f);const g=t.get(u);g!==void 0&&(t.delete(u),g.dispose())}function h(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function Ig(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Oi("WebGLRenderer: "+i+" extension not supported."),r}}}function Dg(n,e,t,i){const r={},s=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete r[d.id];const u=s.get(d);u&&(e.remove(u),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const u in d)e.update(d[u],n.ARRAY_BUFFER)}function c(h){const d=[],u=h.index,g=h.attributes.position;let _=0;if(g===void 0)return;if(u!==null){const y=u.array;_=u.version;for(let A=0,x=y.length;A<x;A+=3){const T=y[A+0],E=y[A+1],P=y[A+2];d.push(T,E,E,P,P,T)}}else{const y=g.array;_=g.version;for(let A=0,x=y.length/3-1;A<x;A+=3){const T=A+0,E=A+1,P=A+2;d.push(T,E,E,P,P,T)}}const p=new(g.count>=65535?vu:gu)(d,1);p.version=_;const m=s.get(h);m&&e.remove(m),s.set(h,p)}function f(h){const d=s.get(h);if(d){const u=h.index;u!==null&&d.version<u.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:f}}function Ng(n,e,t){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,d){n.drawElements(i,d,s,h*a),t.update(d,i,1)}function c(h,d,u){u!==0&&(n.drawElementsInstanced(i,d,s,h*a,u),t.update(d,i,u))}function f(h,d,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,h,0,u);let _=0;for(let p=0;p<u;p++)_+=d[p];t.update(_,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=f}function Ug(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:Je("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Og(n,e,t){const i=new WeakMap,r=new pt;function s(a,o,l){const c=a.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=f!==void 0?f.length:0;let d=i.get(o);if(d===void 0||d.count!==h){let b=function(){P.dispose(),i.delete(o),o.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();const u=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let A=0;u===!0&&(A=1),g===!0&&(A=2),_===!0&&(A=3);let x=o.attributes.position.count*A,T=1;x>e.maxTextureSize&&(T=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const E=new Float32Array(x*T*4*h),P=new hu(E,x,T,h);P.type=pn,P.needsUpdate=!0;const S=A*4;for(let C=0;C<h;C++){const L=p[C],U=m[C],N=y[C],I=x*T*4*C;for(let H=0;H<L.count;H++){const J=H*S;u===!0&&(r.fromBufferAttribute(L,H),E[I+J+0]=r.x,E[I+J+1]=r.y,E[I+J+2]=r.z,E[I+J+3]=0),g===!0&&(r.fromBufferAttribute(U,H),E[I+J+4]=r.x,E[I+J+5]=r.y,E[I+J+6]=r.z,E[I+J+7]=0),_===!0&&(r.fromBufferAttribute(N,H),E[I+J+8]=r.x,E[I+J+9]=r.y,E[I+J+10]=r.z,E[I+J+11]=N.itemSize===4?r.w:1)}}d={count:h,texture:P,size:new Pe(x,T)},i.set(o,d),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let u=0;for(let _=0;_<c.length;_++)u+=c[_];const g=o.morphTargetsRelative?1:1-u;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function Fg(n,e,t,i,r){let s=new WeakMap;function a(c){const f=r.render.frame,h=c.geometry,d=e.get(c,h);if(s.get(d)!==f&&(e.update(d),s.set(d,f)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==f&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,f))),c.isSkinnedMesh){const u=c.skeleton;s.get(u)!==f&&(u.update(),s.set(u,f))}return d}function o(){s=new WeakMap}function l(c){const f=c.target;f.removeEventListener("dispose",l),i.releaseStatesOfObject(f),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:a,dispose:o}}const Bg={[Jc]:"LINEAR_TONE_MAPPING",[Qc]:"REINHARD_TONE_MAPPING",[jc]:"CINEON_TONE_MAPPING",[eu]:"ACES_FILMIC_TONE_MAPPING",[nu]:"AGX_TONE_MAPPING",[iu]:"NEUTRAL_TONE_MAPPING",[tu]:"CUSTOM_TONE_MAPPING"};function kg(n,e,t,i,r,s){const a=new nn(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new kt;c.setAttribute("position",new Mt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Mt([0,2,0,0,2,0],2));const f=new Rh({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new xn(c,f),d=new Ko(-1,1,1,-1,0,1);let u=null,g=null,_=!1,p,m=null,y=[],A=!1;this.setSize=function(x,T){a.setSize(x,T),o!==null&&o.setSize(x,T),l!==null&&l.setSize(x,T);for(let E=0;E<y.length;E++){const P=y[E];P.setSize&&P.setSize(x,T)}},this.setEffects=function(x){y=x,A=y.length>0&&y[0].isRenderPass===!0;const T=a.width,E=a.height;y.length>0&&o===null&&(o=new nn(T,E,{type:_n,depthBuffer:!1,stencilBuffer:!1}),l=new nn(T,E,{type:_n,depthBuffer:!1,stencilBuffer:!1}));for(let P=0;P<y.length;P++){const S=y[P];S.setSize&&S.setSize(T,E)}},this.begin=function(x,T){if(_||x.toneMapping===tn&&y.length===0)return!1;if(m=T,T!==null){const E=T.width,P=T.height;(a.width!==E||a.height!==P)&&this.setSize(E,P)}return A===!1&&x.setRenderTarget(a),p=x.toneMapping,x.toneMapping=tn,!0},this.hasRenderPass=function(){return A},this.end=function(x,T){x.toneMapping=p,_=!0;let E=a,P=o;for(let S=0;S<y.length;S++){const b=y[S];b.enabled!==!1&&(b.render(x,P,E,T),b.needsSwap!==!1&&(E=P,P=P===o?l:o))}if(u!==x.outputColorSpace||g!==x.toneMapping){u=x.outputColorSpace,g=x.toneMapping,f.defines={},Ke.getTransfer(u)===tt&&(f.defines.SRGB_TRANSFER="");const S=Bg[g];S&&(f.defines[S]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=E.texture,x.setRenderTarget(m),x.render(h,d),m=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),f.dispose()}}const Ou=new Nt,Mo=new pr(1,1),Fu=new hu,Bu=new Cf,ku=new xu,dc=[],fc=[],hc=new Float32Array(16),pc=new Float32Array(9),mc=new Float32Array(4);function Xi(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=dc[r];if(s===void 0&&(s=new Float32Array(r),dc[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function yt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Et(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ds(n,e){let t=fc[e];t===void 0&&(t=new Int32Array(e),fc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function zg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Hg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;n.uniform2fv(this.addr,e),Et(t,e)}}function Vg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(yt(t,e))return;n.uniform3fv(this.addr,e),Et(t,e)}}function Gg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;n.uniform4fv(this.addr,e),Et(t,e)}}function Wg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(yt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Et(t,e)}else{if(yt(t,i))return;mc.set(i),n.uniformMatrix2fv(this.addr,!1,mc),Et(t,i)}}function Xg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(yt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Et(t,e)}else{if(yt(t,i))return;pc.set(i),n.uniformMatrix3fv(this.addr,!1,pc),Et(t,i)}}function qg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(yt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Et(t,e)}else{if(yt(t,i))return;hc.set(i),n.uniformMatrix4fv(this.addr,!1,hc),Et(t,i)}}function Yg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function $g(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;n.uniform2iv(this.addr,e),Et(t,e)}}function Kg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(yt(t,e))return;n.uniform3iv(this.addr,e),Et(t,e)}}function Zg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;n.uniform4iv(this.addr,e),Et(t,e)}}function Jg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Qg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;n.uniform2uiv(this.addr,e),Et(t,e)}}function jg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(yt(t,e))return;n.uniform3uiv(this.addr,e),Et(t,e)}}function e0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;n.uniform4uiv(this.addr,e),Et(t,e)}}function t0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Mo.compareFunction=t.isReversedDepthBuffer()?Vo:Ho,s=Mo):s=Ou,t.setTexture2D(e||s,r)}function n0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Bu,r)}function i0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||ku,r)}function r0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Fu,r)}function s0(n){switch(n){case 5126:return zg;case 35664:return Hg;case 35665:return Vg;case 35666:return Gg;case 35674:return Wg;case 35675:return Xg;case 35676:return qg;case 5124:case 35670:return Yg;case 35667:case 35671:return $g;case 35668:case 35672:return Kg;case 35669:case 35673:return Zg;case 5125:return Jg;case 36294:return Qg;case 36295:return jg;case 36296:return e0;case 35678:case 36198:case 36298:case 36306:case 35682:return t0;case 35679:case 36299:case 36307:return n0;case 35680:case 36300:case 36308:case 36293:return i0;case 36289:case 36303:case 36311:case 36292:return r0}}function a0(n,e){n.uniform1fv(this.addr,e)}function o0(n,e){const t=Xi(e,this.size,2);n.uniform2fv(this.addr,t)}function l0(n,e){const t=Xi(e,this.size,3);n.uniform3fv(this.addr,t)}function c0(n,e){const t=Xi(e,this.size,4);n.uniform4fv(this.addr,t)}function u0(n,e){const t=Xi(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function d0(n,e){const t=Xi(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function f0(n,e){const t=Xi(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function h0(n,e){n.uniform1iv(this.addr,e)}function p0(n,e){n.uniform2iv(this.addr,e)}function m0(n,e){n.uniform3iv(this.addr,e)}function g0(n,e){n.uniform4iv(this.addr,e)}function v0(n,e){n.uniform1uiv(this.addr,e)}function _0(n,e){n.uniform2uiv(this.addr,e)}function x0(n,e){n.uniform3uiv(this.addr,e)}function S0(n,e){n.uniform4uiv(this.addr,e)}function M0(n,e,t){const i=this.cache,r=e.length,s=Ds(t,r);yt(i,s)||(n.uniform1iv(this.addr,s),Et(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=Mo:a=Ou;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function y0(n,e,t){const i=this.cache,r=e.length,s=Ds(t,r);yt(i,s)||(n.uniform1iv(this.addr,s),Et(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Bu,s[a])}function E0(n,e,t){const i=this.cache,r=e.length,s=Ds(t,r);yt(i,s)||(n.uniform1iv(this.addr,s),Et(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||ku,s[a])}function b0(n,e,t){const i=this.cache,r=e.length,s=Ds(t,r);yt(i,s)||(n.uniform1iv(this.addr,s),Et(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Fu,s[a])}function T0(n){switch(n){case 5126:return a0;case 35664:return o0;case 35665:return l0;case 35666:return c0;case 35674:return u0;case 35675:return d0;case 35676:return f0;case 5124:case 35670:return h0;case 35667:case 35671:return p0;case 35668:case 35672:return m0;case 35669:case 35673:return g0;case 5125:return v0;case 36294:return _0;case 36295:return x0;case 36296:return S0;case 35678:case 36198:case 36298:case 36306:case 35682:return M0;case 35679:case 36299:case 36307:return y0;case 35680:case 36300:case 36308:case 36293:return E0;case 36289:case 36303:case 36311:case 36292:return b0}}class A0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=s0(t.type)}}class w0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=T0(t.type)}}class C0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const ba=/(\w+)(\])?(\[|\.)?/g;function gc(n,e){n.seq.push(e),n.map[e.id]=e}function R0(n,e,t){const i=n.name,r=i.length;for(ba.lastIndex=0;;){const s=ba.exec(i),a=ba.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){gc(t,c===void 0?new A0(o,n,e):new w0(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new C0(o),gc(t,h)),t=h}}}class fs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);R0(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function vc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const L0=37297;let P0=0;function I0(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const _c=new ze;function D0(n){Ke._getMatrix(_c,Ke.workingColorSpace,n);const e=`mat3( ${_c.elements.map(t=>t.toFixed(4))} )`;switch(Ke.getTransfer(n)){case ys:return[e,"LinearTransferOETF"];case tt:return[e,"sRGBTransferOETF"];default:return Be("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function xc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+I0(n.getShaderSource(e),o)}else return s}function N0(n,e){const t=D0(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const U0={[Jc]:"Linear",[Qc]:"Reinhard",[jc]:"Cineon",[eu]:"ACESFilmic",[nu]:"AgX",[iu]:"Neutral",[tu]:"Custom"};function O0(n,e){const t=U0[e];return t===void 0?(Be("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const jr=new W;function F0(){Ke.getLuminanceCoefficients(jr);const n=jr.x.toFixed(4),e=jr.y.toFixed(4),t=jr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function B0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ir).join(`
`)}function k0(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function z0(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function ir(n){return n!==""}function Sc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Mc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const H0=/^[ \t]*#include +<([\w\d./]+)>/gm;function yo(n){return n.replace(H0,G0)}const V0=new Map;function G0(n,e){let t=Xe[e];if(t===void 0){const i=V0.get(e);if(i!==void 0)t=Xe[i],Be('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return yo(t)}const W0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function yc(n){return n.replace(W0,X0)}function X0(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ec(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const q0={[os]:"SHADOWMAP_TYPE_PCF",[tr]:"SHADOWMAP_TYPE_VSM"};function Y0(n){return q0[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const $0={[si]:"ENVMAP_TYPE_CUBE",[Bi]:"ENVMAP_TYPE_CUBE",[Rs]:"ENVMAP_TYPE_CUBE_UV"};function K0(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":$0[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const Z0={[Bi]:"ENVMAP_MODE_REFRACTION"};function J0(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Z0[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Q0={[Zc]:"ENVMAP_BLENDING_MULTIPLY",[sf]:"ENVMAP_BLENDING_MIX",[af]:"ENVMAP_BLENDING_ADD"};function j0(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Q0[n.combine]||"ENVMAP_BLENDING_NONE"}function ev(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function tv(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Y0(t),c=K0(t),f=J0(t),h=j0(t),d=ev(t),u=B0(t),g=k0(s),_=r.createProgram();let p,m,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ir).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ir).join(`
`),m.length>0&&(m+=`
`)):(p=[Ec(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ir).join(`
`),m=[Ec(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+f:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==tn?"#define TONE_MAPPING":"",t.toneMapping!==tn?Xe.tonemapping_pars_fragment:"",t.toneMapping!==tn?O0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,N0("linearToOutputTexel",t.outputColorSpace),F0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ir).join(`
`)),a=yo(a),a=Sc(a,t),a=Mc(a,t),o=yo(o),o=Sc(o,t),o=Mc(o,t),a=yc(a),o=yc(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===Rl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Rl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const A=y+p+a,x=y+m+o,T=vc(r,r.VERTEX_SHADER,A),E=vc(r,r.FRAGMENT_SHADER,x);r.attachShader(_,T),r.attachShader(_,E),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function P(L){if(n.debug.checkShaderErrors){const U=r.getProgramInfoLog(_)||"",N=r.getShaderInfoLog(T)||"",I=r.getShaderInfoLog(E)||"",H=U.trim(),J=N.trim(),ie=I.trim();let D=!0,q=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(D=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,T,E);else{const te=xc(r,T,"vertex"),Q=xc(r,E,"fragment");Je("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+H+`
`+te+`
`+Q)}else H!==""?Be("WebGLProgram: Program Info Log:",H):(J===""||ie==="")&&(q=!1);q&&(L.diagnostics={runnable:D,programLog:H,vertexShader:{log:J,prefix:p},fragmentShader:{log:ie,prefix:m}})}r.deleteShader(T),r.deleteShader(E),S=new fs(r,_),b=z0(r,_)}let S;this.getUniforms=function(){return S===void 0&&P(this),S};let b;this.getAttributes=function(){return b===void 0&&P(this),b};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=r.getProgramParameter(_,L0)),C},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=P0++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=E,this}let nv=0;class iv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new rv(e),t.set(e,i)),i}}class rv{constructor(e){this.id=nv++,this.code=e,this.usedTimes=0}}function sv(n){return n===ai||n===xs||n===Ss}function av(n,e,t,i,r,s){const a=new pu,o=new iv,l=new Set,c=[],f=new Map,h=i.logarithmicDepthBuffer;let d=i.precision;const u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return l.add(S),S===0?"uv":`uv${S}`}function _(S,b,C,L,U,N){const I=L.fog,H=U.geometry,J=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?L.environment:null,ie=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap,D=e.get(S.envMap||J,ie),q=D&&D.mapping===Rs?D.image.height:null,te=u[S.type];S.precision!==null&&(d=i.getMaxPrecision(S.precision),d!==S.precision&&Be("WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));const Q=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ee=Q!==void 0?Q.length:0;let le=0;H.morphAttributes.position!==void 0&&(le=1),H.morphAttributes.normal!==void 0&&(le=2),H.morphAttributes.color!==void 0&&(le=3);let Ue,ye,pe,X;if(te){const at=dn[te];Ue=at.vertexShader,ye=at.fragmentShader}else{Ue=S.vertexShader,ye=S.fragmentShader;const at=o.getVertexShaderStage(S),je=o.getFragmentShaderStage(S);o.update(S,at,je),pe=at.id,X=je.id}const Y=n.getRenderTarget(),se=n.state.buffers.depth.getReversed(),_e=U.isInstancedMesh===!0,oe=U.isBatchedMesh===!0,Se=!!S.map,Ne=!!S.matcap,Te=!!D,ke=!!S.aoMap,Fe=!!S.lightMap,Ge=!!S.bumpMap&&S.wireframe===!1,it=!!S.normalMap,_t=!!S.displacementMap,Ct=!!S.emissiveMap,lt=!!S.metalnessMap,ht=!!S.roughnessMap,B=S.anisotropy>0,mt=S.clearcoat>0,Qe=S.dispersion>0,R=S.retroreflectivity>0,v=S.iridescence>0,V=S.sheen>0,j=S.transmission>0,w=B&&!!S.anisotropyMap,O=mt&&!!S.clearcoatMap,G=mt&&!!S.clearcoatNormalMap,z=mt&&!!S.clearcoatRoughnessMap,Z=v&&!!S.iridescenceMap,ue=v&&!!S.iridescenceThicknessMap,Me=V&&!!S.sheenColorMap,ce=V&&!!S.sheenRoughnessMap,de=!!S.specularMap,Ce=!!S.specularColorMap,De=!!S.specularIntensityMap,He=j&&!!S.transmissionMap,k=j&&!!S.thicknessMap,fe=!!S.gradientMap,re=!!S.alphaMap,he=S.alphaTest>0,xe=!!S.alphaHash,ae=!!S.extensions;let Ie=tn;S.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(Ie=n.toneMapping);const Re={shaderID:te,shaderType:S.type,shaderName:S.name,vertexShader:Ue,fragmentShader:ye,defines:S.defines,customVertexShaderID:pe,customFragmentShaderID:X,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:oe,batchingColor:oe&&U._colorsTexture!==null,instancing:_e,instancingColor:_e&&U.instanceColor!==null,instancingMorph:_e&&U.morphTexture!==null,outputColorSpace:Y===null?n.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:Ke.workingColorSpace,alphaToCoverage:!!S.alphaToCoverage,map:Se,matcap:Ne,envMap:Te,envMapMode:Te&&D.mapping,envMapCubeUVHeight:q,aoMap:ke,lightMap:Fe,bumpMap:Ge,normalMap:it,displacementMap:_t,emissiveMap:Ct,normalMapObjectSpace:it&&S.normalMapType===cf,normalMapTangentSpace:it&&S.normalMapType===Cl,packedNormalMap:it&&S.normalMapType===Cl&&sv(S.normalMap.format),metalnessMap:lt,roughnessMap:ht,anisotropy:B,anisotropyMap:w,clearcoat:mt,clearcoatMap:O,clearcoatNormalMap:G,clearcoatRoughnessMap:z,dispersion:Qe,retroreflection:R,iridescence:v,iridescenceMap:Z,iridescenceThicknessMap:ue,sheen:V,sheenColorMap:Me,sheenRoughnessMap:ce,specularMap:de,specularColorMap:Ce,specularIntensityMap:De,transmission:j,transmissionMap:He,thicknessMap:k,gradientMap:fe,opaque:S.transparent===!1&&S.blending===rr&&S.alphaToCoverage===!1,alphaMap:re,alphaTest:he,alphaHash:xe,combine:S.combine,mapUv:Se&&g(S.map.channel),aoMapUv:ke&&g(S.aoMap.channel),lightMapUv:Fe&&g(S.lightMap.channel),bumpMapUv:Ge&&g(S.bumpMap.channel),normalMapUv:it&&g(S.normalMap.channel),displacementMapUv:_t&&g(S.displacementMap.channel),emissiveMapUv:Ct&&g(S.emissiveMap.channel),metalnessMapUv:lt&&g(S.metalnessMap.channel),roughnessMapUv:ht&&g(S.roughnessMap.channel),anisotropyMapUv:w&&g(S.anisotropyMap.channel),clearcoatMapUv:O&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:G&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:z&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Z&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:ue&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:Me&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:ce&&g(S.sheenRoughnessMap.channel),specularMapUv:de&&g(S.specularMap.channel),specularColorMapUv:Ce&&g(S.specularColorMap.channel),specularIntensityMapUv:De&&g(S.specularIntensityMap.channel),transmissionMapUv:He&&g(S.transmissionMap.channel),thicknessMapUv:k&&g(S.thicknessMap.channel),alphaMapUv:re&&g(S.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(it||B),vertexNormals:!!H.attributes.normal,vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!H.attributes.uv&&(Se||re),fog:!!I,useFog:S.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:S.wireframe===!1&&(S.flatShading===!0||H.attributes.normal===void 0&&it===!1&&(S.isMeshLambertMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isMeshPhysicalMaterial)),sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:se,skinning:U.isSkinnedMesh===!0,hasPositionAttribute:H.attributes.position!==void 0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:le,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:N.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ie,decodeVideoTexture:Se&&S.map.isVideoTexture===!0&&Ke.getTransfer(S.map.colorSpace)===tt,decodeVideoTextureEmissive:Ct&&S.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(S.emissiveMap.colorSpace)===tt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===hn,flipSided:S.side===Bt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:ae&&S.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ae&&S.extensions.multiDraw===!0||oe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Re.vertexUv1s=l.has(1),Re.vertexUv2s=l.has(2),Re.vertexUv3s=l.has(3),l.clear(),Re}function p(S){const b=[];if(S.shaderID?b.push(S.shaderID):(b.push(S.customVertexShaderID),b.push(S.customFragmentShaderID)),S.defines!==void 0)for(const C in S.defines)b.push(C),b.push(S.defines[C]);return S.isRawShaderMaterial===!1&&(m(b,S),y(b,S),b.push(n.outputColorSpace)),b.push(S.customProgramCacheKey),b.join()}function m(S,b){S.push(b.precision),S.push(b.outputColorSpace),S.push(b.envMapMode),S.push(b.envMapCubeUVHeight),S.push(b.mapUv),S.push(b.alphaMapUv),S.push(b.lightMapUv),S.push(b.aoMapUv),S.push(b.bumpMapUv),S.push(b.normalMapUv),S.push(b.displacementMapUv),S.push(b.emissiveMapUv),S.push(b.metalnessMapUv),S.push(b.roughnessMapUv),S.push(b.anisotropyMapUv),S.push(b.clearcoatMapUv),S.push(b.clearcoatNormalMapUv),S.push(b.clearcoatRoughnessMapUv),S.push(b.iridescenceMapUv),S.push(b.iridescenceThicknessMapUv),S.push(b.sheenColorMapUv),S.push(b.sheenRoughnessMapUv),S.push(b.specularMapUv),S.push(b.specularColorMapUv),S.push(b.specularIntensityMapUv),S.push(b.transmissionMapUv),S.push(b.thicknessMapUv),S.push(b.combine),S.push(b.fogExp2),S.push(b.sizeAttenuation),S.push(b.morphTargetsCount),S.push(b.morphAttributeCount),S.push(b.numSunLights),S.push(b.numDirLights),S.push(b.numPointLights),S.push(b.numSpotLights),S.push(b.numSpotLightMaps),S.push(b.numHemiLights),S.push(b.numRectAreaLights),S.push(b.numSunLightShadows),S.push(b.numDirLightShadows),S.push(b.numPointLightShadows),S.push(b.numSpotLightShadows),S.push(b.numSpotLightShadowsWithMaps),S.push(b.numLightProbes),S.push(b.shadowMapType),S.push(b.toneMapping),S.push(b.numClippingPlanes),S.push(b.numClipIntersection),S.push(b.depthPacking)}function y(S,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.retroreflection&&a.enable(24),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),b.packedNormalMap&&a.enable(22),b.vertexNormals&&a.enable(23),S.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),b.numLightProbeGrids>0&&a.enable(22),b.hasPositionAttribute&&a.enable(23),S.push(a.mask)}function A(S){const b=u[S.type];let C;if(b){const L=dn[b];C=Ah.clone(L.uniforms)}else C=S.uniforms;return C}function x(S,b){let C=f.get(b);return C!==void 0?++C.usedTimes:(C=new tv(n,b,S,r),c.push(C),f.set(b,C)),C}function T(S){if(--S.usedTimes===0){const b=c.indexOf(S);c[b]=c[c.length-1],c.pop(),f.delete(S.cacheKey),S.destroy()}}function E(S){o.remove(S)}function P(){o.dispose()}return{getParameters:_,getProgramCacheKey:p,getUniforms:A,acquireProgram:x,releaseProgram:T,releaseShaderCache:E,programs:c,dispose:P}}function ov(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function lv(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function bc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Tc(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(d){let u=0;return d.isInstancedMesh&&(u+=2),d.isSkinnedMesh&&(u+=1),u}function o(d,u,g,_,p,m){let y=n[e];return y===void 0?(y={id:d.id,object:d,geometry:u,material:g,materialVariant:a(d),groupOrder:_,renderOrder:d.renderOrder,z:p,group:m},n[e]=y):(y.id=d.id,y.object=d,y.geometry=u,y.material=g,y.materialVariant=a(d),y.groupOrder=_,y.renderOrder=d.renderOrder,y.z=p,y.group=m),e++,y}function l(d,u,g,_,p,m,y){y.reversedDepth===!0&&(p=-p);const A=o(d,u,g,_,p,m);g.transmission>0?i.push(A):g.transparent===!0?r.push(A):t.push(A)}function c(d,u,g,_,p,m){const y=o(d,u,g,_,p,m);g.transmission>0?i.unshift(y):g.transparent===!0?r.unshift(y):t.unshift(y)}function f(d,u){t.length>1&&t.sort(d||lv),i.length>1&&i.sort(u||bc),r.length>1&&r.sort(u||bc)}function h(){for(let d=e,u=n.length;d<u;d++){const g=n[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:h,sort:f}}function cv(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new Tc,n.set(i,[a])):r>=s.length?(a=new Tc,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function uv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new W,color:new Ve};break;case"SpotLight":t={position:new W,direction:new W,color:new Ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new W,color:new Ve,distance:0,decay:0};break;case"HemisphereLight":t={direction:new W,skyColor:new Ve,groundColor:new Ve};break;case"RectAreaLight":t={color:new Ve,position:new W,halfWidth:new W,halfHeight:new W};break}return n[e.id]=t,t}}}function dv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let fv=0;function hv(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function pv(n){const e=new uv,t=dv(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new W);const r=new W,s=new vt,a=new vt;function o(c){let f=0,h=0,d=0;for(let U=0;U<9;U++)i.probe[U].set(0,0,0);let u=0,g=0,_=0,p=0,m=0,y=0,A=0,x=0,T=0,E=0,P=0,S=0,b=0,C=0;c.sort(hv);for(let U=0,N=c.length;U<N;U++){const I=c[U],H=I.color,J=I.intensity,ie=I.distance;let D=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===ai?D=I.shadow.map.texture:D=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)f+=H.r*J,h+=H.g*J,d+=H.b*J;else if(I.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(I.sh.coefficients[q],J);C++}else if(I.isSunLight){const q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const te=I.shadow,Q=t.get(I);Q.shadowIntensity=te.intensity,Q.shadowBias=te.bias,Q.shadowNormalBias=te.normalBias,Q.shadowRadius=te.radius,Q.shadowMapSize.copy(te.mapSize).multiply(te.getFrameExtents()),i.sunShadow[g]=Q,i.sunShadowMap[g]=D;const ee=te.getViewportCount();for(let le=0;le<ee;le++)i.sunShadowMatrix[_+le]=te.getMatrix(le),i.sunShadowCascade[_+le]=te._cascadeData[le];_+=ee,g++}i.sun[u]=q,u++}else if(I.isDirectionalLight){const q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const te=I.shadow,Q=t.get(I);Q.shadowIntensity=te.intensity,Q.shadowBias=te.bias,Q.shadowNormalBias=te.normalBias,Q.shadowRadius=te.radius,Q.shadowMapSize=te.mapSize,i.directionalShadow[p]=Q,i.directionalShadowMap[p]=D,i.directionalShadowMatrix[p]=I.shadow.matrix,T++}i.directional[p]=q,p++}else if(I.isSpotLight){const q=e.get(I);q.position.setFromMatrixPosition(I.matrixWorld),q.color.copy(H).multiplyScalar(J),q.distance=ie,q.coneCos=Math.cos(I.angle),q.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),q.decay=I.decay,i.spot[y]=q;const te=I.shadow;if(I.map&&(i.spotLightMap[S]=I.map,S++,te.updateMatrices(I),I.castShadow&&b++),i.spotLightMatrix[y]=te.matrix,I.castShadow){const Q=t.get(I);Q.shadowIntensity=te.intensity,Q.shadowBias=te.bias,Q.shadowNormalBias=te.normalBias,Q.shadowRadius=te.radius,Q.shadowMapSize=te.mapSize,i.spotShadow[y]=Q,i.spotShadowMap[y]=D,P++}y++}else if(I.isRectAreaLight){const q=e.get(I);q.color.copy(H).multiplyScalar(J),q.halfWidth.set(I.width*.5,0,0),q.halfHeight.set(0,I.height*.5,0),i.rectArea[A]=q,A++}else if(I.isPointLight){const q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),q.distance=I.distance,q.decay=I.decay,I.castShadow){const te=I.shadow,Q=t.get(I);Q.shadowIntensity=te.intensity,Q.shadowBias=te.bias,Q.shadowNormalBias=te.normalBias,Q.shadowRadius=te.radius,Q.shadowMapSize=te.mapSize,Q.shadowCameraNear=te.camera.near,Q.shadowCameraFar=te.camera.far,i.pointShadow[m]=Q,i.pointShadowMap[m]=D,i.pointShadowMatrix[m]=I.shadow.matrix,E++}i.point[m]=q,m++}else if(I.isHemisphereLight){const q=e.get(I);q.skyColor.copy(I.color).multiplyScalar(J),q.groundColor.copy(I.groundColor).multiplyScalar(J),i.hemi[x]=q,x++}}A>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=me.LTC_FLOAT_1,i.rectAreaLTC2=me.LTC_FLOAT_2):(i.rectAreaLTC1=me.LTC_HALF_1,i.rectAreaLTC2=me.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=h,i.ambient[2]=d;const L=i.hash;(L.sunLength!==u||L.directionalLength!==p||L.pointLength!==m||L.spotLength!==y||L.rectAreaLength!==A||L.hemiLength!==x||L.numSunShadows!==g||L.numDirectionalShadows!==T||L.numPointShadows!==E||L.numSpotShadows!==P||L.numSpotMaps!==S||L.numLightProbes!==C)&&(i.sun.length=u,i.directional.length=p,i.spot.length=y,i.rectArea.length=A,i.point.length=m,i.hemi.length=x,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=_,i.sunShadowCascade.length=_,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.directionalShadowMatrix.length=T,i.pointShadow.length=E,i.pointShadowMap.length=E,i.pointShadowMatrix.length=E,i.spotShadow.length=P,i.spotShadowMap.length=P,i.spotLightMatrix.length=P+S-b,i.spotLightMap.length=S,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=C,L.sunLength=u,L.directionalLength=p,L.pointLength=m,L.spotLength=y,L.rectAreaLength=A,L.hemiLength=x,L.numSunShadows=g,L.numDirectionalShadows=T,L.numPointShadows=E,L.numSpotShadows=P,L.numSpotMaps=S,L.numLightProbes=C,i.version=fv++)}function l(c,f){let h=0,d=0,u=0,g=0,_=0,p=0;const m=f.matrixWorldInverse;for(let y=0,A=c.length;y<A;y++){const x=c[y];if(x.isSunLight){const T=i.sun[h];T.direction.setFromMatrixPosition(x.matrixWorld),T.direction.transformDirection(m),h++}else if(x.isDirectionalLight){const T=i.directional[d];T.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(m),d++}else if(x.isSpotLight){const T=i.spot[g];T.position.setFromMatrixPosition(x.matrixWorld),T.position.applyMatrix4(m),T.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(m),g++}else if(x.isRectAreaLight){const T=i.rectArea[_];T.position.setFromMatrixPosition(x.matrixWorld),T.position.applyMatrix4(m),a.identity(),s.copy(x.matrixWorld),s.premultiply(m),a.extractRotation(s),T.halfWidth.set(x.width*.5,0,0),T.halfHeight.set(0,x.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),_++}else if(x.isPointLight){const T=i.point[u];T.position.setFromMatrixPosition(x.matrixWorld),T.position.applyMatrix4(m),u++}else if(x.isHemisphereLight){const T=i.hemi[p];T.direction.setFromMatrixPosition(x.matrixWorld),T.direction.transformDirection(m),p++}}}return{setup:o,setupView:l,state:i}}function Ac(n){const e=new pv(n),t=[],i=[],r=[];function s(d){h.camera=d,t.length=0,i.length=0,r.length=0}function a(d){t.push(d)}function o(d){i.push(d)}function l(d){r.push(d)}function c(){e.setup(t)}function f(d){e.setupView(t,d)}const h={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:c,setupLightsView:f,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function mv(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Ac(n),e.set(r,[o])):s>=a.length?(o=new Ac(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const gv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,_v=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],xv=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],wc=new vt,ji=new W,Ta=new W;function Sv(n,e,t){let i=new _u;const r=new Pe,s=new Pe,a=new pt,o=new Lh,l=new Ph,c={},f=t.maxTextureSize,h={[ri]:Bt,[Bt]:ri,[hn]:hn},d=new Sn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pe},radius:{value:4}},vertexShader:gv,fragmentShader:vv}),u=d.clone();u.defines.HORIZONTAL_PASS=1;const g=new kt;g.setAttribute("position",new Pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new xn(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=os;let m=this.type;this.render=function(E,P,S){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;this.type===kd&&(Be("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=os);const b=n.getRenderTarget(),C=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),U=n.state;U.setBlending(Rn),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const N=m!==this.type;N&&P.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(H=>H.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,H=E.length;I<H;I++){const J=E[I],ie=J.shadow;if(ie===void 0){Be("WebGLShadowMap:",J,"has no shadow.");continue}if(ie.autoUpdate===!1&&ie.needsUpdate===!1)continue;r.copy(ie.mapSize);const D=ie.getFrameExtents();r.multiply(D),s.copy(ie.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/D.x),r.x=s.x*D.x,ie.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/D.y),r.y=s.y*D.y,ie.mapSize.y=s.y));const q=n.state.buffers.depth.getReversed();if(ie.camera._reversedDepth=q,ie.map===null||N===!0){if(ie.map!==null&&(ie.map.depthTexture!==null&&(ie.map.depthTexture.dispose(),ie.map.depthTexture=null),ie.map.dispose()),this.type===tr){if(J.isPointLight){Be("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}ie.map=new nn(r.x,r.y,{format:ai,type:_n,minFilter:Dt,magFilter:Dt,generateMipmaps:!1}),ie.map.texture.name=J.name+".shadowMap",ie.map.depthTexture=new pr(r.x,r.y,pn),ie.map.depthTexture.name=J.name+".shadowMapDepth",ie.map.depthTexture.format=In,ie.map.depthTexture.compareFunction=null,ie.map.depthTexture.minFilter=wt,ie.map.depthTexture.magFilter=wt}else J.isPointLight?(ie.map=new Uu(r.x),ie.map.depthTexture=new qf(r.x,vn)):(ie.map=new nn(r.x,r.y),ie.map.depthTexture=new pr(r.x,r.y,vn)),ie.map.depthTexture.name=J.name+".shadowMap",ie.map.depthTexture.format=In,this.type===os?(ie.map.depthTexture.compareFunction=q?Vo:Ho,ie.map.depthTexture.minFilter=Dt,ie.map.depthTexture.magFilter=Dt):(ie.map.depthTexture.compareFunction=null,ie.map.depthTexture.minFilter=wt,ie.map.depthTexture.magFilter=wt);ie.camera.updateProjectionMatrix()}ie.map.isWebGLCubeRenderTarget!==!0&&(ie.map.width!==r.x||ie.map.height!==r.y)&&ie.map.setSize(r.x,r.y);const te=ie.map.isWebGLCubeRenderTarget?6:ie.getViewportCount();J.isPointLight!==!0&&ie.updateMatrices(J,S);for(let Q=0;Q<te;Q++){const ee=ie.getCamera(Q);if(J.isPointLight){const le=ie.camera,Ue=ie.matrix,ye=J.distance||le.far;ye!==le.far&&(le.far=ye,le.updateProjectionMatrix()),ji.setFromMatrixPosition(J.matrixWorld),le.position.copy(ji),Ta.copy(le.position),Ta.add(_v[Q]),le.up.copy(xv[Q]),le.lookAt(Ta),le.updateMatrixWorld(),Ue.makeTranslation(-ji.x,-ji.y,-ji.z),wc.multiplyMatrices(le.projectionMatrix,le.matrixWorldInverse),ie._frustum.setFromProjectionMatrix(wc,le.coordinateSystem,le.reversedDepth)}if(ie.map.isWebGLCubeRenderTarget)n.setRenderTarget(ie.map,Q),n.clear();else{Q===0&&(n.setRenderTarget(ie.map),n.clear());const le=ie.getViewport(Q);a.set(s.x*le.x,s.y*le.y,s.x*le.z,s.y*le.w),U.viewport(a)}i=ie.getFrustum(Q),x(P,S,ee,J,this.type)}ie.isPointLightShadow!==!0&&this.type===tr&&y(ie,S),ie.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(b,C,L)};function y(E,P){const S=e.update(_);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,u.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,u.needsUpdate=!0),E.mapPass===null?E.mapPass=new nn(r.x,r.y,{format:ai,type:_n}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),d.uniforms.shadow_pass.value=E.map.depthTexture,d.uniforms.resolution.value.set(E.map.width,E.map.height),d.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(P,null,S,d,_,null),u.uniforms.shadow_pass.value=E.mapPass.texture,u.uniforms.resolution.value.set(E.map.width,E.map.height),u.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(P,null,S,u,_,null)}function A(E,P,S,b){let C=null;const L=S.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(L!==void 0)C=L;else if(C=S.isPointLight===!0?l:o,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const U=C.uuid,N=P.uuid;let I=c[U];I===void 0&&(I={},c[U]=I);let H=I[N];H===void 0&&(H=C.clone(),I[N]=H,P.addEventListener("dispose",T)),C=H}if(C.visible=P.visible,C.wireframe=P.wireframe,b===tr?C.side=P.shadowSide!==null?P.shadowSide:P.side:C.side=P.shadowSide!==null?P.shadowSide:h[P.side],C.alphaMap=P.alphaMap,C.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,C.map=P.map,C.clipShadows=P.clipShadows,C.clippingPlanes=P.clippingPlanes,C.clipIntersection=P.clipIntersection,C.displacementMap=P.displacementMap,C.displacementScale=P.displacementScale,C.displacementBias=P.displacementBias,C.wireframeLinewidth=P.wireframeLinewidth,C.linewidth=P.linewidth,S.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const U=n.properties.get(C);U.light=S}return C}function x(E,P,S,b,C){if(E.visible===!1)return;if(E.layers.test(P.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&C===tr)&&(!E.frustumCulled||E.intersectsFrustum(i))){E.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,E.matrixWorld);const N=e.update(E),I=E.material;if(Array.isArray(I)){const H=N.groups;for(let J=0,ie=H.length;J<ie;J++){const D=H[J],q=I[D.materialIndex];if(q&&q.visible){const te=A(E,q,b,C);E.onBeforeShadow(n,E,P,S,N,te,D),n.renderBufferDirect(S,null,N,te,E,D),E.onAfterShadow(n,E,P,S,N,te,D)}}}else if(I.visible){const H=A(E,I,b,C);E.onBeforeShadow(n,E,P,S,N,H,null),n.renderBufferDirect(S,null,N,H,E,null),E.onAfterShadow(n,E,P,S,N,H,null)}}const U=E.children;for(let N=0,I=U.length;N<I;N++)x(U[N],P,S,b,C)}function T(E){E.target.removeEventListener("dispose",T);for(const S in c){const b=c[S],C=E.target.uuid;C in b&&(b[C].dispose(),delete b[C])}}}function Mv(n,e){function t(){let k=!1;const fe=new pt;let re=null;const he=new pt(0,0,0,0);return{setMask:function(xe){re!==xe&&!k&&(n.colorMask(xe,xe,xe,xe),re=xe)},setLocked:function(xe){k=xe},setClear:function(xe,ae,Ie,Re,at){at===!0&&(xe*=Re,ae*=Re,Ie*=Re),fe.set(xe,ae,Ie,Re),he.equals(fe)===!1&&(n.clearColor(xe,ae,Ie,Re),he.copy(fe))},reset:function(){k=!1,re=null,he.set(-1,0,0,0)}}}function i(){let k=!1,fe=!1,re=null,he=null,xe=null;return{setReversed:function(ae){if(fe!==ae){const Ie=e.get("EXT_clip_control");ae?Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.ZERO_TO_ONE_EXT):Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.NEGATIVE_ONE_TO_ONE_EXT),fe=ae;const Re=xe;xe=null,this.setClear(Re)}},getReversed:function(){return fe},setTest:function(ae){ae?Y(n.DEPTH_TEST):se(n.DEPTH_TEST)},setMask:function(ae){re!==ae&&!k&&(n.depthMask(ae),re=ae)},setFunc:function(ae){if(fe&&(ae=Mf[ae]),he!==ae){switch(ae){case Ia:n.depthFunc(n.NEVER);break;case Da:n.depthFunc(n.ALWAYS);break;case Na:n.depthFunc(n.LESS);break;case ur:n.depthFunc(n.LEQUAL);break;case Ua:n.depthFunc(n.EQUAL);break;case Oa:n.depthFunc(n.GEQUAL);break;case Fa:n.depthFunc(n.GREATER);break;case Ba:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}he=ae}},setLocked:function(ae){k=ae},setClear:function(ae){xe!==ae&&(xe=ae,fe&&(ae=1-ae),n.clearDepth(ae))},reset:function(){k=!1,re=null,he=null,xe=null,fe=!1}}}function r(){let k=!1,fe=null,re=null,he=null,xe=null,ae=null,Ie=null,Re=null,at=null;return{setTest:function(je){k||(je?Y(n.STENCIL_TEST):se(n.STENCIL_TEST))},setMask:function(je){fe!==je&&!k&&(n.stencilMask(je),fe=je)},setFunc:function(je,$t,rn){(re!==je||he!==$t||xe!==rn)&&(n.stencilFunc(je,$t,rn),re=je,he=$t,xe=rn)},setOp:function(je,$t,rn){(ae!==je||Ie!==$t||Re!==rn)&&(n.stencilOp(je,$t,rn),ae=je,Ie=$t,Re=rn)},setLocked:function(je){k=je},setClear:function(je){at!==je&&(n.clearStencil(je),at=je)},reset:function(){k=!1,fe=null,re=null,he=null,xe=null,ae=null,Ie=null,Re=null,at=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let f={},h={},d={},u=new WeakMap,g=[],_=null,p=!1,m=null,y=null,A=null,x=null,T=null,E=null,P=null,S=new Ve(0,0,0),b=0,C=!1,L=null,U=null,N=null,I=null,H=null;const J=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ie=!1,D=0;const q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(D=parseFloat(/^WebGL (\d)/.exec(q)[1]),ie=D>=1):q.indexOf("OpenGL ES")!==-1&&(D=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),ie=D>=2);let te=null,Q={};const ee=n.getParameter(n.SCISSOR_BOX),le=n.getParameter(n.VIEWPORT),Ue=new pt().fromArray(ee),ye=new pt().fromArray(le);function pe(k,fe,re,he){const xe=new Uint8Array(4),ae=n.createTexture();n.bindTexture(k,ae),n.texParameteri(k,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(k,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ie=0;Ie<re;Ie++)k===n.TEXTURE_3D||k===n.TEXTURE_2D_ARRAY?n.texImage3D(fe,0,n.RGBA,1,1,he,0,n.RGBA,n.UNSIGNED_BYTE,xe):n.texImage2D(fe+Ie,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,xe);return ae}const X={};X[n.TEXTURE_2D]=pe(n.TEXTURE_2D,n.TEXTURE_2D,1),X[n.TEXTURE_CUBE_MAP]=pe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[n.TEXTURE_2D_ARRAY]=pe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),X[n.TEXTURE_3D]=pe(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Y(n.DEPTH_TEST),a.setFunc(ur),Ge(!1),it(bl),Y(n.CULL_FACE),ke(Rn);function Y(k){f[k]!==!0&&(n.enable(k),f[k]=!0)}function se(k){f[k]!==!1&&(n.disable(k),f[k]=!1)}function _e(k,fe){return d[k]!==fe?(n.bindFramebuffer(k,fe),d[k]=fe,k===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=fe),k===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=fe),!0):!1}function oe(k,fe){let re=g,he=!1;if(k){re=u.get(fe),re===void 0&&(re=[],u.set(fe,re));const xe=k.textures;if(re.length!==xe.length||re[0]!==n.COLOR_ATTACHMENT0){for(let ae=0,Ie=xe.length;ae<Ie;ae++)re[ae]=n.COLOR_ATTACHMENT0+ae;re.length=xe.length,he=!0}}else re[0]!==n.BACK&&(re[0]=n.BACK,he=!0);he&&n.drawBuffers(re)}function Se(k){return _!==k?(n.useProgram(k),_=k,!0):!1}const Ne={[Li]:n.FUNC_ADD,[Hd]:n.FUNC_SUBTRACT,[Vd]:n.FUNC_REVERSE_SUBTRACT};Ne[Gd]=n.MIN,Ne[Wd]=n.MAX;const Te={[Xd]:n.ZERO,[qd]:n.ONE,[Yd]:n.SRC_COLOR,[$c]:n.SRC_ALPHA,[jd]:n.SRC_ALPHA_SATURATE,[Jd]:n.DST_COLOR,[Kd]:n.DST_ALPHA,[$d]:n.ONE_MINUS_SRC_COLOR,[Kc]:n.ONE_MINUS_SRC_ALPHA,[Qd]:n.ONE_MINUS_DST_COLOR,[Zd]:n.ONE_MINUS_DST_ALPHA,[ef]:n.CONSTANT_COLOR,[tf]:n.ONE_MINUS_CONSTANT_COLOR,[nf]:n.CONSTANT_ALPHA,[rf]:n.ONE_MINUS_CONSTANT_ALPHA};function ke(k,fe,re,he,xe,ae,Ie,Re,at,je){if(k===Rn){p===!0&&(se(n.BLEND),p=!1);return}if(p===!1&&(Y(n.BLEND),p=!0),k!==zd){if(k!==m||je!==C){if((y!==Li||T!==Li)&&(n.blendEquation(n.FUNC_ADD),y=Li,T=Li),je)switch(k){case rr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Tl:n.blendFunc(n.ONE,n.ONE);break;case Al:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case wl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Je("WebGLState: Invalid blending: ",k);break}else switch(k){case rr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Tl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Al:Je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case wl:Je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Je("WebGLState: Invalid blending: ",k);break}A=null,x=null,E=null,P=null,S.set(0,0,0),b=0,m=k,C=je}return}xe=xe||fe,ae=ae||re,Ie=Ie||he,(fe!==y||xe!==T)&&(n.blendEquationSeparate(Ne[fe],Ne[xe]),y=fe,T=xe),(re!==A||he!==x||ae!==E||Ie!==P)&&(n.blendFuncSeparate(Te[re],Te[he],Te[ae],Te[Ie]),A=re,x=he,E=ae,P=Ie),(Re.equals(S)===!1||at!==b)&&(n.blendColor(Re.r,Re.g,Re.b,at),S.copy(Re),b=at),m=k,C=!1}function Fe(k,fe){k.side===hn?se(n.CULL_FACE):Y(n.CULL_FACE);let re=k.side===Bt;fe&&(re=!re),Ge(re),k.blending===rr&&k.transparent===!1?ke(Rn):ke(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),s.setMask(k.colorWrite);const he=k.stencilWrite;o.setTest(he),he&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Ct(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?Y(n.SAMPLE_ALPHA_TO_COVERAGE):se(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ge(k){L!==k&&(k?n.frontFace(n.CW):n.frontFace(n.CCW),L=k)}function it(k){k!==Fd?(Y(n.CULL_FACE),k!==U&&(k===bl?n.cullFace(n.BACK):k===Bd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):se(n.CULL_FACE),U=k}function _t(k){k!==N&&(ie&&n.lineWidth(k),N=k)}function Ct(k,fe,re){k?(Y(n.POLYGON_OFFSET_FILL),(I!==fe||H!==re)&&(I=fe,H=re,a.getReversed()&&(fe=-fe),n.polygonOffset(fe,re))):se(n.POLYGON_OFFSET_FILL)}function lt(k){k?Y(n.SCISSOR_TEST):se(n.SCISSOR_TEST)}function ht(k){k===void 0&&(k=n.TEXTURE0+J-1),te!==k&&(n.activeTexture(k),te=k)}function B(k,fe,re){re===void 0&&(te===null?re=n.TEXTURE0+J-1:re=te);let he=Q[re];he===void 0&&(he={type:void 0,texture:void 0},Q[re]=he),(he.type!==k||he.texture!==fe)&&(te!==re&&(n.activeTexture(re),te=re),n.bindTexture(k,fe||X[k]),he.type=k,he.texture=fe)}function mt(){const k=Q[te];k!==void 0&&k.type!==void 0&&(n.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function Qe(){try{n.compressedTexImage2D(...arguments)}catch(k){Je("WebGLState:",k)}}function R(){try{n.compressedTexImage3D(...arguments)}catch(k){Je("WebGLState:",k)}}function v(){try{n.texSubImage2D(...arguments)}catch(k){Je("WebGLState:",k)}}function V(){try{n.texSubImage3D(...arguments)}catch(k){Je("WebGLState:",k)}}function j(){try{n.compressedTexSubImage2D(...arguments)}catch(k){Je("WebGLState:",k)}}function w(){try{n.compressedTexSubImage3D(...arguments)}catch(k){Je("WebGLState:",k)}}function O(){try{n.texStorage2D(...arguments)}catch(k){Je("WebGLState:",k)}}function G(){try{n.texStorage3D(...arguments)}catch(k){Je("WebGLState:",k)}}function z(){try{n.texImage2D(...arguments)}catch(k){Je("WebGLState:",k)}}function Z(){try{n.texImage3D(...arguments)}catch(k){Je("WebGLState:",k)}}function ue(k){return h[k]!==void 0?h[k]:n.getParameter(k)}function Me(k,fe){h[k]!==fe&&(n.pixelStorei(k,fe),h[k]=fe)}function ce(k){Ue.equals(k)===!1&&(n.scissor(k.x,k.y,k.z,k.w),Ue.copy(k))}function de(k){ye.equals(k)===!1&&(n.viewport(k.x,k.y,k.z,k.w),ye.copy(k))}function Ce(k,fe){let re=c.get(fe);re===void 0&&(re=new WeakMap,c.set(fe,re));let he=re.get(k);he===void 0&&(he=n.getUniformBlockIndex(fe,k.name),re.set(k,he))}function De(k,fe){const he=c.get(fe).get(k);l.get(fe)!==he&&(n.uniformBlockBinding(fe,he,k.__bindingPointIndex),l.set(fe,he))}function He(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),f={},h={},te=null,Q={},d={},u=new WeakMap,g=[],_=null,p=!1,m=null,y=null,A=null,x=null,T=null,E=null,P=null,S=new Ve(0,0,0),b=0,C=!1,L=null,U=null,N=null,I=null,H=null,Ue.set(0,0,n.canvas.width,n.canvas.height),ye.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:Y,disable:se,bindFramebuffer:_e,drawBuffers:oe,useProgram:Se,setBlending:ke,setMaterial:Fe,setFlipSided:Ge,setCullFace:it,setLineWidth:_t,setPolygonOffset:Ct,setScissorTest:lt,activeTexture:ht,bindTexture:B,unbindTexture:mt,compressedTexImage2D:Qe,compressedTexImage3D:R,texImage2D:z,texImage3D:Z,pixelStorei:Me,getParameter:ue,updateUBOMapping:Ce,uniformBlockBinding:De,texStorage2D:O,texStorage3D:G,texSubImage2D:v,texSubImage3D:V,compressedTexSubImage2D:j,compressedTexSubImage3D:w,scissor:ce,viewport:de,reset:He}}function yv(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Pe,f=new WeakMap,h=new Set;let d;const u=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(R,v){return g?new OffscreenCanvas(R,v):hr("canvas")}function p(R,v,V){let j=1;const w=Qe(R);if((w.width>V||w.height>V)&&(j=V/Math.max(w.width,w.height)),j<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const O=Math.floor(j*w.width),G=Math.floor(j*w.height);d===void 0&&(d=_(O,G));const z=v?_(O,G):d;return z.width=O,z.height=G,z.getContext("2d").drawImage(R,0,0,O,G),Be("WebGLRenderer: Texture has been resized from ("+w.width+"x"+w.height+") to ("+O+"x"+G+")."),z}else return"data"in R&&Be("WebGLRenderer: Image in DataTexture is too big ("+w.width+"x"+w.height+")."),R;return R}function m(R){return R.generateMipmaps}function y(R){n.generateMipmap(R)}function A(R){return R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?n.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function x(R,v,V,j,w,O=!1){if(R!==null){if(n[R]!==void 0)return n[R];Be("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let G;j&&(G=e.get("EXT_texture_norm16"),G||Be("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let z=v;if(v===n.RED&&(V===n.FLOAT&&(z=n.R32F),V===n.HALF_FLOAT&&(z=n.R16F),V===n.UNSIGNED_BYTE&&(z=n.R8),V===n.UNSIGNED_SHORT&&G&&(z=G.R16_EXT),V===n.SHORT&&G&&(z=G.R16_SNORM_EXT)),v===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&(z=n.R8UI),V===n.UNSIGNED_SHORT&&(z=n.R16UI),V===n.UNSIGNED_INT&&(z=n.R32UI),V===n.BYTE&&(z=n.R8I),V===n.SHORT&&(z=n.R16I),V===n.INT&&(z=n.R32I)),v===n.RG&&(V===n.FLOAT&&(z=n.RG32F),V===n.HALF_FLOAT&&(z=n.RG16F),V===n.UNSIGNED_BYTE&&(z=n.RG8),V===n.UNSIGNED_SHORT&&G&&(z=G.RG16_EXT),V===n.SHORT&&G&&(z=G.RG16_SNORM_EXT)),v===n.RG_INTEGER&&(V===n.UNSIGNED_BYTE&&(z=n.RG8UI),V===n.UNSIGNED_SHORT&&(z=n.RG16UI),V===n.UNSIGNED_INT&&(z=n.RG32UI),V===n.BYTE&&(z=n.RG8I),V===n.SHORT&&(z=n.RG16I),V===n.INT&&(z=n.RG32I)),v===n.RGB_INTEGER&&(V===n.UNSIGNED_BYTE&&(z=n.RGB8UI),V===n.UNSIGNED_SHORT&&(z=n.RGB16UI),V===n.UNSIGNED_INT&&(z=n.RGB32UI),V===n.BYTE&&(z=n.RGB8I),V===n.SHORT&&(z=n.RGB16I),V===n.INT&&(z=n.RGB32I)),v===n.RGBA_INTEGER&&(V===n.UNSIGNED_BYTE&&(z=n.RGBA8UI),V===n.UNSIGNED_SHORT&&(z=n.RGBA16UI),V===n.UNSIGNED_INT&&(z=n.RGBA32UI),V===n.BYTE&&(z=n.RGBA8I),V===n.SHORT&&(z=n.RGBA16I),V===n.INT&&(z=n.RGBA32I)),v===n.RGB&&(V===n.UNSIGNED_SHORT&&G&&(z=G.RGB16_EXT),V===n.SHORT&&G&&(z=G.RGB16_SNORM_EXT),V===n.UNSIGNED_INT_5_9_9_9_REV&&(z=n.RGB9_E5),V===n.UNSIGNED_INT_10F_11F_11F_REV&&(z=n.R11F_G11F_B10F)),v===n.RGBA){const Z=O?ys:Ke.getTransfer(w);V===n.FLOAT&&(z=n.RGBA32F),V===n.HALF_FLOAT&&(z=n.RGBA16F),V===n.UNSIGNED_BYTE&&(z=Z===tt?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT&&G&&(z=G.RGBA16_EXT),V===n.SHORT&&G&&(z=G.RGBA16_SNORM_EXT),V===n.UNSIGNED_SHORT_4_4_4_4&&(z=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&(z=n.RGB5_A1)}return(z===n.R16F||z===n.R32F||z===n.RG16F||z===n.RG32F||z===n.RGBA16F||z===n.RGBA32F)&&e.get("EXT_color_buffer_float"),z}function T(R,v){let V;return R?v===null||v===vn||v===fr?V=n.DEPTH24_STENCIL8:v===pn?V=n.DEPTH32F_STENCIL8:v===dr&&(V=n.DEPTH24_STENCIL8,Be("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===vn||v===fr?V=n.DEPTH_COMPONENT24:v===pn?V=n.DEPTH_COMPONENT32F:v===dr&&(V=n.DEPTH_COMPONENT16),V}function E(R,v){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==wt&&R.minFilter!==Dt?Math.log2(Math.max(v.width,v.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?v.mipmaps.length:1}function P(R){const v=R.target;v.removeEventListener("dispose",P),b(v),v.isVideoTexture&&f.delete(v),v.isHTMLTexture&&h.delete(v)}function S(R){const v=R.target;v.removeEventListener("dispose",S),L(v)}function b(R){const v=i.get(R);if(v.__webglInit===void 0)return;const V=R.source,j=u.get(V);if(j){const w=j[v.__cacheKey];w.usedTimes--,w.usedTimes===0&&C(R),Object.keys(j).length===0&&u.delete(V)}i.remove(R)}function C(R){const v=i.get(R);n.deleteTexture(v.__webglTexture);const V=R.source,j=u.get(V);delete j[v.__cacheKey],a.memory.textures--}function L(R){const v=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(v.__webglFramebuffer[j]))for(let w=0;w<v.__webglFramebuffer[j].length;w++)n.deleteFramebuffer(v.__webglFramebuffer[j][w]);else n.deleteFramebuffer(v.__webglFramebuffer[j]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[j])}else{if(Array.isArray(v.__webglFramebuffer))for(let j=0;j<v.__webglFramebuffer.length;j++)n.deleteFramebuffer(v.__webglFramebuffer[j]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let j=0;j<v.__webglColorRenderbuffer.length;j++)v.__webglColorRenderbuffer[j]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[j]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const V=R.textures;for(let j=0,w=V.length;j<w;j++){const O=i.get(V[j]);O.__webglTexture&&(n.deleteTexture(O.__webglTexture),a.memory.textures--),i.remove(V[j])}i.remove(R)}let U=0;function N(){U=0}function I(){return U}function H(R){U=R}function J(){const R=U;return R>=r.maxTextures&&Be("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+r.maxTextures),U+=1,R}function ie(R){const v=[];return v.push(R.wrapS),v.push(R.wrapT),v.push(R.wrapR||0),v.push(R.magFilter),v.push(R.minFilter),v.push(R.anisotropy),v.push(R.internalFormat),v.push(R.format),v.push(R.type),v.push(R.generateMipmaps),v.push(R.premultiplyAlpha),v.push(R.flipY),v.push(R.unpackAlignment),v.push(R.colorSpace),v.join()}function D(R,v){const V=i.get(R);if(R.isVideoTexture&&B(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&V.__version!==R.version){const j=R.image;if(j===null)Be("WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)Be("WebGLRenderer: Texture marked for update but image is incomplete");else{se(V,R,v);return}}else R.isExternalTexture&&(V.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+v)}function q(R,v){const V=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&V.__version!==R.version){se(V,R,v);return}else R.isExternalTexture&&(V.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+v)}function te(R,v){const V=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&V.__version!==R.version){se(V,R,v);return}t.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+v)}function Q(R,v){const V=i.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&V.__version!==R.version){_e(V,R,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+v)}const ee={[ka]:n.REPEAT,[wn]:n.CLAMP_TO_EDGE,[za]:n.MIRRORED_REPEAT},le={[wt]:n.NEAREST,[of]:n.NEAREST_MIPMAP_NEAREST,[Rr]:n.NEAREST_MIPMAP_LINEAR,[Dt]:n.LINEAR,[Ws]:n.LINEAR_MIPMAP_NEAREST,[Qn]:n.LINEAR_MIPMAP_LINEAR},Ue={[df]:n.NEVER,[gf]:n.ALWAYS,[ff]:n.LESS,[Ho]:n.LEQUAL,[hf]:n.EQUAL,[Vo]:n.GEQUAL,[pf]:n.GREATER,[mf]:n.NOTEQUAL};function ye(R,v){if(v.type===pn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Dt||v.magFilter===Ws||v.magFilter===Rr||v.magFilter===Qn||v.minFilter===Dt||v.minFilter===Ws||v.minFilter===Rr||v.minFilter===Qn)&&Be("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(R,n.TEXTURE_WRAP_S,ee[v.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,ee[v.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,ee[v.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,le[v.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,le[v.minFilter]),v.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,Ue[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===wt||v.minFilter!==Rr&&v.minFilter!==Qn||v.type===pn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");n.texParameterf(R,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function pe(R,v){let V=!1;R.__webglInit===void 0&&(R.__webglInit=!0,v.addEventListener("dispose",P));const j=v.source;let w=u.get(j);w===void 0&&(w={},u.set(j,w));const O=ie(v);if(O!==R.__cacheKey){w[O]===void 0&&(w[O]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,V=!0),w[O].usedTimes++;const G=w[R.__cacheKey];G!==void 0&&(w[R.__cacheKey].usedTimes--,G.usedTimes===0&&C(v)),R.__cacheKey=O,R.__webglTexture=w[O].texture}return V}function X(R,v,V){return Math.floor(Math.floor(R/V)/v)}function Y(R,v,V,j){const O=R.updateRanges;if(O.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,V,j,v.data);else{O.sort((Me,ce)=>Me.start-ce.start);let G=0;for(let Me=1;Me<O.length;Me++){const ce=O[G],de=O[Me],Ce=ce.start+ce.count,De=X(de.start,v.width,4),He=X(ce.start,v.width,4);de.start<=Ce+1&&De===He&&X(de.start+de.count-1,v.width,4)===De?ce.count=Math.max(ce.count,de.start+de.count-ce.start):(++G,O[G]=de)}O.length=G+1;const z=t.getParameter(n.UNPACK_ROW_LENGTH),Z=t.getParameter(n.UNPACK_SKIP_PIXELS),ue=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let Me=0,ce=O.length;Me<ce;Me++){const de=O[Me],Ce=Math.floor(de.start/4),De=Math.ceil(de.count/4),He=Ce%v.width,k=Math.floor(Ce/v.width),fe=De,re=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,He),t.pixelStorei(n.UNPACK_SKIP_ROWS,k),t.texSubImage2D(n.TEXTURE_2D,0,He,k,fe,re,V,j,v.data)}R.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,z),t.pixelStorei(n.UNPACK_SKIP_PIXELS,Z),t.pixelStorei(n.UNPACK_SKIP_ROWS,ue)}}function se(R,v,V){let j=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(j=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(j=n.TEXTURE_3D);const w=pe(R,v),O=v.source;t.bindTexture(j,R.__webglTexture,n.TEXTURE0+V);const G=i.get(O);if(O.version!==G.__version||w===!0){if(t.activeTexture(n.TEXTURE0+V),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const re=Ke.getPrimaries(Ke.workingColorSpace),he=v.colorSpace===Wn?null:Ke.getPrimaries(v.colorSpace),xe=v.colorSpace===Wn||re===he?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe)}t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment);let Z=p(v.image,!1,r.maxTextureSize);Z=mt(v,Z);const ue=s.convert(v.format,v.colorSpace),Me=s.convert(v.type);let ce=x(v.internalFormat,ue,Me,v.normalized,v.colorSpace,v.isVideoTexture);ye(j,v);let de;const Ce=v.mipmaps,De=v.isVideoTexture!==!0,He=G.__version===void 0||w===!0,k=O.dataReady,fe=E(v,Z);if(v.isDepthTexture)ce=T(v.format===jn,v.type),He&&(De?t.texStorage2D(n.TEXTURE_2D,1,ce,Z.width,Z.height):t.texImage2D(n.TEXTURE_2D,0,ce,Z.width,Z.height,0,ue,Me,null));else if(v.isDataTexture)if(Ce.length>0){De&&He&&t.texStorage2D(n.TEXTURE_2D,fe,ce,Ce[0].width,Ce[0].height);for(let re=0,he=Ce.length;re<he;re++)de=Ce[re],De?k&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,de.width,de.height,ue,Me,de.data):t.texImage2D(n.TEXTURE_2D,re,ce,de.width,de.height,0,ue,Me,de.data);v.generateMipmaps=!1}else De?(He&&t.texStorage2D(n.TEXTURE_2D,fe,ce,Z.width,Z.height),k&&Y(v,Z,ue,Me)):t.texImage2D(n.TEXTURE_2D,0,ce,Z.width,Z.height,0,ue,Me,Z.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){De&&He&&t.texStorage3D(n.TEXTURE_2D_ARRAY,fe,ce,Ce[0].width,Ce[0].height,Z.depth);for(let re=0,he=Ce.length;re<he;re++)if(de=Ce[re],v.format!==en)if(ue!==null)if(De){if(k)if(v.layerUpdates.size>0){const xe=sc(de.width,de.height,v.format,v.type);for(const ae of v.layerUpdates){const Ie=de.data.subarray(ae*xe/de.data.BYTES_PER_ELEMENT,(ae+1)*xe/de.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,ae,de.width,de.height,1,ue,Ie)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,de.width,de.height,Z.depth,ue,de.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,re,ce,de.width,de.height,Z.depth,0,de.data,0,0);else Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else De?k&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,de.width,de.height,Z.depth,ue,Me,de.data):t.texImage3D(n.TEXTURE_2D_ARRAY,re,ce,de.width,de.height,Z.depth,0,ue,Me,de.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{De&&He&&t.texStorage2D(n.TEXTURE_2D,fe,ce,Ce[0].width,Ce[0].height);for(let re=0,he=Ce.length;re<he;re++)de=Ce[re],v.format!==en?ue!==null?De?k&&t.compressedTexSubImage2D(n.TEXTURE_2D,re,0,0,de.width,de.height,ue,de.data):t.compressedTexImage2D(n.TEXTURE_2D,re,ce,de.width,de.height,0,de.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):De?k&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,de.width,de.height,ue,Me,de.data):t.texImage2D(n.TEXTURE_2D,re,ce,de.width,de.height,0,ue,Me,de.data)}else if(v.isDataArrayTexture)if(De){if(He&&t.texStorage3D(n.TEXTURE_2D_ARRAY,fe,ce,Z.width,Z.height,Z.depth),k)if(v.layerUpdates.size>0){const re=sc(Z.width,Z.height,v.format,v.type);for(const he of v.layerUpdates){const xe=Z.data.subarray(he*re/Z.data.BYTES_PER_ELEMENT,(he+1)*re/Z.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,he,Z.width,Z.height,1,ue,Me,xe)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,ue,Me,Z.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ce,Z.width,Z.height,Z.depth,0,ue,Me,Z.data);else if(v.isData3DTexture)De?(He&&t.texStorage3D(n.TEXTURE_3D,fe,ce,Z.width,Z.height,Z.depth),k&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,ue,Me,Z.data)):t.texImage3D(n.TEXTURE_3D,0,ce,Z.width,Z.height,Z.depth,0,ue,Me,Z.data);else if(v.isFramebufferTexture){if(He)if(De)t.texStorage2D(n.TEXTURE_2D,fe,ce,Z.width,Z.height);else{let re=Z.width,he=Z.height;for(let xe=0;xe<fe;xe++)t.texImage2D(n.TEXTURE_2D,xe,ce,re,he,0,ue,Me,null),re>>=1,he>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in n){const re=n.canvas;if(re.hasAttribute("layoutsubtree")||re.setAttribute("layoutsubtree","true"),Z.parentNode!==re){re.appendChild(Z),h.add(v),re.onpaint=he=>{const xe=he.changedElements;for(const ae of h)xe.includes(ae.image)&&(ae.needsUpdate=!0)},re.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,Z);else{const xe=n.RGBA,ae=n.RGBA,Ie=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,xe,ae,Ie,Z)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ce.length>0){if(De&&He){const re=Qe(Ce[0]);t.texStorage2D(n.TEXTURE_2D,fe,ce,re.width,re.height)}for(let re=0,he=Ce.length;re<he;re++)de=Ce[re],De?k&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,ue,Me,de):t.texImage2D(n.TEXTURE_2D,re,ce,ue,Me,de);v.generateMipmaps=!1}else if(De){if(He){const re=Qe(Z);t.texStorage2D(n.TEXTURE_2D,fe,ce,re.width,re.height)}k&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ue,Me,Z)}else t.texImage2D(n.TEXTURE_2D,0,ce,ue,Me,Z);m(v)&&y(j),G.__version=O.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function _e(R,v,V){if(v.image.length!==6)return;const j=pe(R,v),w=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+V);const O=i.get(w);if(w.version!==O.__version||j===!0){t.activeTexture(n.TEXTURE0+V);const G=Ke.getPrimaries(Ke.workingColorSpace),z=v.colorSpace===Wn?null:Ke.getPrimaries(v.colorSpace),Z=v.colorSpace===Wn||G===z?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);const ue=v.isCompressedTexture||v.image[0].isCompressedTexture,Me=v.image[0]&&v.image[0].isDataTexture,ce=[];for(let ae=0;ae<6;ae++)!ue&&!Me?ce[ae]=p(v.image[ae],!0,r.maxCubemapSize):ce[ae]=Me?v.image[ae].image:v.image[ae],ce[ae]=mt(v,ce[ae]);const de=ce[0],Ce=s.convert(v.format,v.colorSpace),De=s.convert(v.type),He=x(v.internalFormat,Ce,De,v.normalized,v.colorSpace),k=v.isVideoTexture!==!0,fe=O.__version===void 0||j===!0,re=w.dataReady;let he=E(v,de);ye(n.TEXTURE_CUBE_MAP,v);let xe;if(ue){k&&fe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,he,He,de.width,de.height);for(let ae=0;ae<6;ae++){xe=ce[ae].mipmaps;for(let Ie=0;Ie<xe.length;Ie++){const Re=xe[Ie];v.format!==en?Ce!==null?k?re&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ie,0,0,Re.width,Re.height,Ce,Re.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ie,He,Re.width,Re.height,0,Re.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ie,0,0,Re.width,Re.height,Ce,De,Re.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ie,He,Re.width,Re.height,0,Ce,De,Re.data)}}}else{if(xe=v.mipmaps,k&&fe){xe.length>0&&he++;const ae=Qe(ce[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,he,He,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(Me){k?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,ce[ae].width,ce[ae].height,Ce,De,ce[ae].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,He,ce[ae].width,ce[ae].height,0,Ce,De,ce[ae].data);for(let Ie=0;Ie<xe.length;Ie++){const at=xe[Ie].image[ae].image;k?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ie+1,0,0,at.width,at.height,Ce,De,at.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ie+1,He,at.width,at.height,0,Ce,De,at.data)}}else{k?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Ce,De,ce[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,He,Ce,De,ce[ae]);for(let Ie=0;Ie<xe.length;Ie++){const Re=xe[Ie];k?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ie+1,0,0,Ce,De,Re.image[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ie+1,He,Ce,De,Re.image[ae])}}}m(v)&&y(n.TEXTURE_CUBE_MAP),O.__version=w.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function oe(R,v,V,j,w,O){const G=s.convert(V.format,V.colorSpace),z=s.convert(V.type),Z=x(V.internalFormat,G,z,V.normalized,V.colorSpace),ue=i.get(v),Me=i.get(V);if(Me.__renderTarget=v,!ue.__hasExternalTextures){const ce=Math.max(1,v.width>>O),de=Math.max(1,v.height>>O);w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY?t.texImage3D(w,O,Z,ce,de,v.depth,0,G,z,null):t.texImage2D(w,O,Z,ce,de,0,G,z,null)}t.bindFramebuffer(n.FRAMEBUFFER,R),ht(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,w,Me.__webglTexture,0,lt(v)):(w===n.TEXTURE_2D||w>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&w<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,j,w,Me.__webglTexture,O),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Se(R,v,V){if(n.bindRenderbuffer(n.RENDERBUFFER,R),v.depthBuffer){const j=v.depthTexture,w=j&&j.isDepthTexture?j.type:null,O=T(v.stencilBuffer,w),G=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;ht(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,lt(v),O,v.width,v.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,lt(v),O,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,O,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,G,n.RENDERBUFFER,R)}else{const j=v.textures;for(let w=0;w<j.length;w++){const O=j[w],G=s.convert(O.format,O.colorSpace),z=s.convert(O.type),Z=x(O.internalFormat,G,z,O.normalized,O.colorSpace);ht(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,lt(v),Z,v.width,v.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,lt(v),Z,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,Z,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ne(R,v,V){const j=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,R),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const w=i.get(v.depthTexture);if(w.__renderTarget=v,(!w.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),j){if(w.__webglInit===void 0&&(w.__webglInit=!0,v.depthTexture.addEventListener("dispose",P)),w.__webglTexture===void 0){w.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture),ye(n.TEXTURE_CUBE_MAP,v.depthTexture);const ue=s.convert(v.depthTexture.format),Me=s.convert(v.depthTexture.type);let ce;v.depthTexture.format===In?ce=n.DEPTH_COMPONENT24:v.depthTexture.format===jn&&(ce=n.DEPTH24_STENCIL8);for(let de=0;de<6;de++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,ce,v.width,v.height,0,ue,Me,null)}}else D(v.depthTexture,0);const O=w.__webglTexture,G=lt(v),z=j?n.TEXTURE_CUBE_MAP_POSITIVE_X+V:n.TEXTURE_2D,Z=v.depthTexture.format===jn?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===In)ht(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,z,O,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,Z,z,O,0);else if(v.depthTexture.format===jn)ht(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,z,O,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,Z,z,O,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Te(R){const v=i.get(R),V=R.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==R.depthTexture){const j=R.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),j){const w=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,j.removeEventListener("dispose",w)};j.addEventListener("dispose",w),v.__depthDisposeCallback=w}v.__boundDepthTexture=j}if(R.depthTexture&&!v.__autoAllocateDepthBuffer)if(V)for(let j=0;j<6;j++)Ne(v.__webglFramebuffer[j],R,j);else{const j=R.texture.mipmaps;j&&j.length>0?Ne(v.__webglFramebuffer[0],R,0):Ne(v.__webglFramebuffer,R,0)}else if(V){v.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[j]),v.__webglDepthbuffer[j]===void 0)v.__webglDepthbuffer[j]=n.createRenderbuffer(),Se(v.__webglDepthbuffer[j],R,!1);else{const w=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,O=v.__webglDepthbuffer[j];n.bindRenderbuffer(n.RENDERBUFFER,O),n.framebufferRenderbuffer(n.FRAMEBUFFER,w,n.RENDERBUFFER,O)}}else{const j=R.texture.mipmaps;if(j&&j.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),Se(v.__webglDepthbuffer,R,!1);else{const w=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,O=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,O),n.framebufferRenderbuffer(n.FRAMEBUFFER,w,n.RENDERBUFFER,O)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function ke(R,v,V){const j=i.get(R);v!==void 0&&oe(j.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&Te(R)}function Fe(R){const v=R.texture,V=i.get(R),j=i.get(v);R.addEventListener("dispose",S);const w=R.textures,O=R.isWebGLCubeRenderTarget===!0,G=w.length>1;if(G||(j.__webglTexture===void 0&&(j.__webglTexture=n.createTexture()),j.__version=v.version,a.memory.textures++),O){V.__webglFramebuffer=[];for(let z=0;z<6;z++)if(v.mipmaps&&v.mipmaps.length>0){V.__webglFramebuffer[z]=[];for(let Z=0;Z<v.mipmaps.length;Z++)V.__webglFramebuffer[z][Z]=n.createFramebuffer()}else V.__webglFramebuffer[z]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){V.__webglFramebuffer=[];for(let z=0;z<v.mipmaps.length;z++)V.__webglFramebuffer[z]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(G)for(let z=0,Z=w.length;z<Z;z++){const ue=i.get(w[z]);ue.__webglTexture===void 0&&(ue.__webglTexture=n.createTexture(),a.memory.textures++)}if(R.samples>0&&ht(R)===!1){V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let z=0;z<w.length;z++){const Z=w[z];V.__webglColorRenderbuffer[z]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[z]);const ue=s.convert(Z.format,Z.colorSpace),Me=s.convert(Z.type),ce=x(Z.internalFormat,ue,Me,Z.normalized,Z.colorSpace,R.isXRRenderTarget===!0),de=lt(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,de,ce,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+z,n.RENDERBUFFER,V.__webglColorRenderbuffer[z])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),Se(V.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(O){t.bindTexture(n.TEXTURE_CUBE_MAP,j.__webglTexture),ye(n.TEXTURE_CUBE_MAP,v);for(let z=0;z<6;z++)if(v.mipmaps&&v.mipmaps.length>0)for(let Z=0;Z<v.mipmaps.length;Z++)oe(V.__webglFramebuffer[z][Z],R,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+z,Z);else oe(V.__webglFramebuffer[z],R,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+z,0);m(v)&&y(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(G){for(let z=0,Z=w.length;z<Z;z++){const ue=w[z],Me=i.get(ue);let ce=n.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ce=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ce,Me.__webglTexture),ye(ce,ue),oe(V.__webglFramebuffer,R,ue,n.COLOR_ATTACHMENT0+z,ce,0),m(ue)&&y(ce)}t.unbindTexture()}else{let z=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(z=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(z,j.__webglTexture),ye(z,v),v.mipmaps&&v.mipmaps.length>0)for(let Z=0;Z<v.mipmaps.length;Z++)oe(V.__webglFramebuffer[Z],R,v,n.COLOR_ATTACHMENT0,z,Z);else oe(V.__webglFramebuffer,R,v,n.COLOR_ATTACHMENT0,z,0);m(v)&&y(z),t.unbindTexture()}R.depthBuffer&&Te(R)}function Ge(R){const v=R.textures;for(let V=0,j=v.length;V<j;V++){const w=v[V];if(m(w)){const O=A(R),G=i.get(w).__webglTexture;t.bindTexture(O,G),y(O),t.unbindTexture()}}}const it=[],_t=[];function Ct(R){if(R.samples>0){if(ht(R)===!1){const v=R.textures,V=R.width,j=R.height;let w=n.COLOR_BUFFER_BIT;const O=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,G=i.get(R),z=v.length>1;if(z)for(let ue=0;ue<v.length;ue++)t.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,G.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,G.__webglMultisampledFramebuffer);const Z=R.texture.mipmaps;Z&&Z.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,G.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,G.__webglFramebuffer);for(let ue=0;ue<v.length;ue++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(w|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(w|=n.STENCIL_BUFFER_BIT)),z){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,G.__webglColorRenderbuffer[ue]);const Me=i.get(v[ue]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Me,0)}n.blitFramebuffer(0,0,V,j,0,0,V,j,w,n.NEAREST),l===!0&&(it.length=0,_t.length=0,it.push(n.COLOR_ATTACHMENT0+ue),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&(it.push(O),_t.push(O),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,_t)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,it))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),z)for(let ue=0;ue<v.length;ue++){t.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.RENDERBUFFER,G.__webglColorRenderbuffer[ue]);const Me=i.get(v[ue]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,G.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.TEXTURE_2D,Me,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,G.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&l){const v=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function lt(R){return Math.min(r.maxSamples,R.samples)}function ht(R){const v=i.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function B(R){const v=a.render.frame;f.get(R)!==v&&(f.set(R,v),R.update())}function mt(R,v){const V=R.colorSpace,j=R.format,w=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||V!==Ms&&V!==Wn&&(Ke.getTransfer(V)===tt?(j!==en||w!==Yt)&&Be("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Je("WebGLTextures: Unsupported texture color space:",V)),v}function Qe(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=J,this.resetTextureUnits=N,this.getTextureUnits=I,this.setTextureUnits=H,this.setTexture2D=D,this.setTexture2DArray=q,this.setTexture3D=te,this.setTextureCube=Q,this.rebindTextures=ke,this.setupRenderTarget=Fe,this.updateRenderTargetMipmap=Ge,this.updateMultisampleRenderTarget=Ct,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=oe,this.useMultisampledRTT=ht,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Ev(n,e){function t(i,r=Wn){let s;const a=Ke.getTransfer(r);if(i===Yt)return n.UNSIGNED_BYTE;if(i===Oo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Fo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===ou)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===lu)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===su)return n.BYTE;if(i===au)return n.SHORT;if(i===dr)return n.UNSIGNED_SHORT;if(i===Uo)return n.INT;if(i===vn)return n.UNSIGNED_INT;if(i===pn)return n.FLOAT;if(i===_n)return n.HALF_FLOAT;if(i===cu)return n.ALPHA;if(i===uu)return n.RGB;if(i===en)return n.RGBA;if(i===In)return n.DEPTH_COMPONENT;if(i===jn)return n.DEPTH_STENCIL;if(i===du)return n.RED;if(i===Bo)return n.RED_INTEGER;if(i===ai)return n.RG;if(i===ko)return n.RG_INTEGER;if(i===zo)return n.RGBA_INTEGER;if(i===ls||i===cs||i===us||i===ds)if(a===tt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===ls)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===cs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===us)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ds)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===ls)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===cs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===us)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ds)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ha||i===Va||i===Ga||i===Wa)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Ha)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Va)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ga)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Wa)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Xa||i===qa||i===Ya||i===$a||i===Ka||i===xs||i===Za)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Xa||i===qa)return a===tt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Ya)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===$a)return s.COMPRESSED_R11_EAC;if(i===Ka)return s.COMPRESSED_SIGNED_R11_EAC;if(i===xs)return s.COMPRESSED_RG11_EAC;if(i===Za)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ja||i===Qa||i===ja||i===eo||i===to||i===no||i===io||i===ro||i===so||i===ao||i===oo||i===lo||i===co||i===uo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Ja)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Qa)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ja)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===eo)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===to)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===no)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===io)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ro)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===so)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ao)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===oo)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===lo)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===co)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===uo)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===fo||i===ho||i===po)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===fo)return a===tt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ho)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===po)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===mo||i===go||i===Ss||i===vo)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===mo)return s.COMPRESSED_RED_RGTC1_EXT;if(i===go)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ss)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===vo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===fr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const bv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Tv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Av{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Su(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Sn({vertexShader:bv,fragmentShader:Tv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new xn(new Ps(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class wv extends ui{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,f=null,h=null,d=null,u=null,g=null;const _=typeof XRWebGLBinding<"u",p=new Av,m={},y=t.getContextAttributes();let A=null,x=null;const T=[],E=[],P=new Pe;let S=null,b=null;const C=new Qt;C.viewport=new pt;const L=new Qt;L.viewport=new pt;const U=[C,L],N=new Uh;let I=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let Y=T[X];return Y===void 0&&(Y=new js,T[X]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(X){let Y=T[X];return Y===void 0&&(Y=new js,T[X]=Y),Y.getGripSpace()},this.getHand=function(X){let Y=T[X];return Y===void 0&&(Y=new js,T[X]=Y),Y.getHandSpace()};function J(X){const Y=E.indexOf(X.inputSource);if(Y===-1)return;const se=T[Y];se!==void 0&&(se.update(X.inputSource,X.frame,c||a),se.dispatchEvent({type:X.type,data:X.inputSource}))}function ie(){r.removeEventListener("select",J),r.removeEventListener("selectstart",J),r.removeEventListener("selectend",J),r.removeEventListener("squeeze",J),r.removeEventListener("squeezestart",J),r.removeEventListener("squeezeend",J),r.removeEventListener("end",ie),r.removeEventListener("inputsourceschange",D);for(let X=0;X<T.length;X++){const Y=E[X];Y!==null&&(E[X]=null,T[X].disconnect(Y))}I=null,H=null,p.reset();for(const X in m)delete m[X];if(e.setRenderTarget(A),u=null,d=null,h=null,r=null,x=null,pe.stop(),i.isPresenting=!1,e.setPixelRatio(S),e.setSize(P.width,P.height,!1),b!==null){const X=b.camera;X.fov=b.fov,X.zoom=b.zoom,X.updateProjectionMatrix(),b=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,i.isPresenting===!0&&Be("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,i.isPresenting===!0&&Be("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return d!==null?d:u},this.getBinding=function(){return h===null&&_&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(X){if(r=X,r!==null){if(A=e.getRenderTarget(),r.addEventListener("select",J),r.addEventListener("selectstart",J),r.addEventListener("selectend",J),r.addEventListener("squeeze",J),r.addEventListener("squeezestart",J),r.addEventListener("squeezeend",J),r.addEventListener("end",ie),r.addEventListener("inputsourceschange",D),y.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(P),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let se=null,_e=null,oe=null;y.depth&&(oe=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,se=y.stencil?jn:In,_e=y.stencil?fr:vn);const Se={colorFormat:t.RGBA8,depthFormat:oe,scaleFactor:s};h=this.getBinding(),d=h.createProjectionLayer(Se),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new nn(d.textureWidth,d.textureHeight,{format:en,type:Yt,depthTexture:new pr(d.textureWidth,d.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{const se={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};u=new XRWebGLLayer(r,t,se),r.updateRenderState({baseLayer:u}),e.setPixelRatio(1),e.setSize(u.framebufferWidth,u.framebufferHeight,!1),x=new nn(u.framebufferWidth,u.framebufferHeight,{format:en,type:Yt,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),pe.setContext(r),pe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function D(X){for(let Y=0;Y<X.removed.length;Y++){const se=X.removed[Y],_e=E.indexOf(se);_e>=0&&(E[_e]=null,T[_e].disconnect(se))}for(let Y=0;Y<X.added.length;Y++){const se=X.added[Y];let _e=E.indexOf(se);if(_e===-1){for(let Se=0;Se<T.length;Se++)if(Se>=E.length){E.push(se),_e=Se;break}else if(E[Se]===null){E[Se]=se,_e=Se;break}if(_e===-1)break}const oe=T[_e];oe&&oe.connect(se)}}const q=new W,te=new W;function Q(X,Y,se){q.setFromMatrixPosition(Y.matrixWorld),te.setFromMatrixPosition(se.matrixWorld);const _e=q.distanceTo(te),oe=Y.projectionMatrix.elements,Se=se.projectionMatrix.elements,Ne=oe[14]/(oe[10]-1),Te=oe[14]/(oe[10]+1),ke=(oe[9]+1)/oe[5],Fe=(oe[9]-1)/oe[5],Ge=(oe[8]-1)/oe[0],it=(Se[8]+1)/Se[0],_t=Ne*Ge,Ct=Ne*it,lt=_e/(-Ge+it),ht=lt*-Ge;if(Y.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(ht),X.translateZ(lt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),oe[10]===-1)X.projectionMatrix.copy(Y.projectionMatrix),X.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{const B=Ne+lt,mt=Te+lt,Qe=_t-ht,R=Ct+(_e-ht),v=ke*Te/mt*B,V=Fe*Te/mt*B;X.projectionMatrix.makePerspective(Qe,R,v,V,B,mt),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function ee(X,Y){Y===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(Y.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;let Y=X.near,se=X.far;p.texture!==null&&(p.depthNear>0&&(Y=p.depthNear),p.depthFar>0&&(se=p.depthFar)),N.near=L.near=C.near=Y,N.far=L.far=C.far=se,(I!==N.near||H!==N.far)&&(r.updateRenderState({depthNear:N.near,depthFar:N.far}),I=N.near,H=N.far),N.layers.mask=X.layers.mask|6,C.layers.mask=N.layers.mask&-5,L.layers.mask=N.layers.mask&-3;const _e=X.parent,oe=N.cameras;ee(N,_e);for(let Se=0;Se<oe.length;Se++)ee(oe[Se],_e);oe.length===2?Q(N,C,L):N.projectionMatrix.copy(C.projectionMatrix),b===null&&X.isPerspectiveCamera&&(b={camera:X,fov:X.fov,zoom:X.zoom}),le(X,N,_e)};function le(X,Y,se){se===null?X.matrix.copy(Y.matrixWorld):(X.matrix.copy(se.matrixWorld),X.matrix.invert(),X.matrix.multiply(Y.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(Y.projectionMatrix),X.projectionMatrixInverse.copy(Y.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=_o*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(d===null&&u===null))return l},this.setFoveation=function(X){l=X,d!==null&&(d.fixedFoveation=X),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=X)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(N)},this.getCameraTexture=function(X){return m[X]};let Ue=null;function ye(X,Y){if(f=Y.getViewerPose(c||a),g=Y,f!==null){const se=f.views;u!==null&&(e.setRenderTargetFramebuffer(x,u.framebuffer),e.setRenderTarget(x));let _e=!1;se.length!==N.cameras.length&&(N.cameras.length=0,_e=!0);for(let Te=0;Te<se.length;Te++){const ke=se[Te];let Fe=null;if(u!==null)Fe=u.getViewport(ke);else{const it=h.getViewSubImage(d,ke);Fe=it.viewport,Te===0&&(e.setRenderTargetTextures(x,it.colorTexture,it.depthStencilTexture),e.setRenderTarget(x))}let Ge=U[Te];Ge===void 0&&(Ge=new Qt,Ge.layers.enable(Te),Ge.viewport=new pt,U[Te]=Ge),Ge.matrix.fromArray(ke.transform.matrix),Ge.matrix.decompose(Ge.position,Ge.quaternion,Ge.scale),Ge.projectionMatrix.fromArray(ke.projectionMatrix),Ge.projectionMatrixInverse.copy(Ge.projectionMatrix).invert(),Ge.viewport.set(Fe.x,Fe.y,Fe.width,Fe.height),Te===0&&(N.matrix.copy(Ge.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),_e===!0&&N.cameras.push(Ge)}const oe=r.enabledFeatures;if(oe&&oe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){h=i.getBinding();const Te=h.getDepthInformation(se[0]);Te&&Te.isValid&&Te.texture&&p.init(Te,r.renderState)}if(oe&&oe.includes("camera-access")&&_){e.state.unbindTexture(),h=i.getBinding();for(let Te=0;Te<se.length;Te++){const ke=se[Te].camera;if(ke){let Fe=m[ke];Fe||(Fe=new Su,m[ke]=Fe);const Ge=h.getCameraImage(ke);Fe.sourceTexture=Ge}}}}for(let se=0;se<T.length;se++){const _e=E[se],oe=T[se];_e!==null&&oe!==void 0&&oe.update(_e,Y,c||a)}Ue&&Ue(X,Y),Y.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Y}),g=null}const pe=new Du;pe.setAnimationLoop(ye),this.setAnimationLoop=function(X){Ue=X},this.dispose=function(){}}}const Cv=new vt,zu=new ze;zu.set(-1,0,0,0,1,0,0,0,1);function Rv(n,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,Lu(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function r(p,m,y,A,x){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(p,m):m.isMeshLambertMaterial?(s(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(p,m),h(p,m)):m.isMeshPhongMaterial?(s(p,m),f(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(p,m),d(p,m),m.isMeshPhysicalMaterial&&u(p,m,x)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),_(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,y,A):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Bt&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Bt&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const y=e.get(m),A=y.envMap,x=y.envMapRotation;A&&(p.envMap.value=A,p.envMapRotation.value.setFromMatrix4(Cv.makeRotationFromEuler(x)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(zu),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,y,A){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*y,p.scale.value=A*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function f(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function h(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function u(p,m,y){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Bt&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.retroreflectivity>0&&(p.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const y=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Lv(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,T){const E=T.program;i.uniformBlockBinding(x,E)}function c(x,T){let E=r[x.id];E===void 0&&(p(x),E=f(x),r[x.id]=E,x.addEventListener("dispose",y));const P=T.program;i.updateUBOMapping(x,P);const S=e.render.frame;s[x.id]!==S&&(d(x),s[x.id]=S)}function f(x){const T=h();x.__bindingPointIndex=T;const E=n.createBuffer(),P=x.__size,S=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,P,S),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,E),E}function h(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return Je("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const T=r[x.id],E=x.uniforms,P=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let S=0,b=E.length;S<b;S++){const C=E[S];if(Array.isArray(C))for(let L=0,U=C.length;L<U;L++)u(C[L],S,L,P);else u(C,S,0,P)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function u(x,T,E,P){if(_(x,T,E,P)===!0){const S=x.__offset,b=x.value;if(Array.isArray(b)){let C=0;for(let L=0;L<b.length;L++){const U=b[L],N=m(U);g(U,x.__data,C),typeof U!="number"&&typeof U!="boolean"&&!U.isMatrix3&&!ArrayBuffer.isView(U)&&(C+=N.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(b,x.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,S,x.__data)}}function g(x,T,E){typeof x=="number"||typeof x=="boolean"?T[0]=x:x.isMatrix3?(T[0]=x.elements[0],T[1]=x.elements[1],T[2]=x.elements[2],T[3]=0,T[4]=x.elements[3],T[5]=x.elements[4],T[6]=x.elements[5],T[7]=0,T[8]=x.elements[6],T[9]=x.elements[7],T[10]=x.elements[8],T[11]=0):ArrayBuffer.isView(x)?T.set(new x.constructor(x.buffer,x.byteOffset,T.length)):x.toArray(T,E)}function _(x,T,E,P){const S=x.value,b=T+"_"+E;if(P[b]===void 0)return typeof S=="number"||typeof S=="boolean"?P[b]=S:ArrayBuffer.isView(S)?P[b]=S.slice():P[b]=S.clone(),!0;{const C=P[b];if(typeof S=="number"||typeof S=="boolean"){if(C!==S)return P[b]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(C.equals(S)===!1)return C.copy(S),!0}}return!1}function p(x){const T=x.uniforms;let E=0;const P=16;for(let b=0,C=T.length;b<C;b++){const L=Array.isArray(T[b])?T[b]:[T[b]];for(let U=0,N=L.length;U<N;U++){const I=L[U],H=Array.isArray(I.value)?I.value:[I.value];for(let J=0,ie=H.length;J<ie;J++){const D=H[J],q=m(D),te=E%P,Q=te%q.boundary,ee=te+Q;E+=Q,ee!==0&&P-ee<q.storage&&(E+=P-ee),I.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=E,E+=q.storage}}}const S=E%P;return S>0&&(E+=P-S),x.__size=E,x.__cache={},this}function m(x){const T={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(T.boundary=4,T.storage=4):x.isVector2?(T.boundary=8,T.storage=8):x.isVector3||x.isColor?(T.boundary=16,T.storage=12):x.isVector4?(T.boundary=16,T.storage=16):x.isMatrix3?(T.boundary=48,T.storage=48):x.isMatrix4?(T.boundary=64,T.storage=64):x.isTexture?Be("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(T.boundary=16,T.storage=x.byteLength):Be("WebGLRenderer: Unsupported uniform value type.",x),T}function y(x){const T=x.target;T.removeEventListener("dispose",y);const E=a.indexOf(T.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(r[T.id]),delete r[T.id],delete s[T.id]}function A(){for(const x in r)n.deleteBuffer(r[x]);a=[],r={},s={}}return{bind:l,update:c,dispose:A}}const Pv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ln=null;function Iv(){return ln===null&&(ln=new Wf(Pv,16,16,ai,_n),ln.name="DFG_LUT",ln.minFilter=Dt,ln.magFilter=Dt,ln.wrapS=wn,ln.wrapT=wn,ln.generateMipmaps=!1,ln.needsUpdate=!0),ln}class Dv{constructor(e={}){const{canvas:t=xf(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:u=Yt}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const _=u,p=new Set([zo,ko,Bo]),m=new Set([Yt,vn,dr,fr,Oo,Fo]),y=new Uint32Array(4),A=new Int32Array(4),x=new W;let T=null,E=null;const P=[],S=[];let b=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=tn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let L=!1,U=null,N=null,I=null,H=null;this._outputColorSpace=It;let J=0,ie=0,D=null,q=-1,te=null;const Q=new pt,ee=new pt;let le=null;const Ue=new Ve(0);let ye=0,pe=t.width,X=t.height,Y=1,se=null,_e=null;const oe=new pt(0,0,pe,X),Se=new pt(0,0,pe,X);let Ne=!1;const Te=new _u;let ke=!1,Fe=!1;const Ge=new vt,it=new W,_t=new pt,Ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let lt=!1;function ht(){return D===null?Y:1}let B=i;function mt(M,F){return t.getContext(M,F)}let Qe,R,v,V,j,w,O,G,z,Z,ue,Me,ce,de,Ce,De,He,k,fe,re,he,xe,ae;try{const M={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${No}`),t.addEventListener("webglcontextlost",at,!1),t.addEventListener("webglcontextrestored",je,!1),t.addEventListener("webglcontextcreationerror",$t,!1),B===null){const F="webgl2";if(B=mt(F,M),B===null)throw mt(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ie()}catch(M){throw t.removeEventListener("webglcontextlost",at,!1),t.removeEventListener("webglcontextrestored",je,!1),t.removeEventListener("webglcontextcreationerror",$t,!1),Je("WebGLRenderer: "+M.message),M}function Ie(){Qe=new Ig(B),Qe.init(),he=new Ev(B,Qe),R=new yg(B,Qe,e,he),v=new Mv(B,Qe),R.reversedDepthBuffer&&d&&v.buffers.depth.setReversed(!0),N=B.createFramebuffer(),I=B.createFramebuffer(),H=B.createFramebuffer(),V=new Ug(B),j=new ov,w=new yv(B,Qe,v,j,R,he,V),O=new Pg(C),G=new Fh(B),xe=new Sg(B,G),z=new Dg(B,G,V,xe),Z=new Fg(B,z,G,xe,V),k=new Og(B,R,w),Ce=new Eg(j),ue=new av(C,O,Qe,R,xe,Ce),Me=new Rv(C,j),ce=new cv,de=new mv(Qe),He=new xg(C,O,v,Z,g,l),De=new Sv(C,Z,R),ae=new Lv(B,V,R,v),fe=new Mg(B,Qe,V),re=new Ng(B,Qe,V),V.programs=ue.programs,C.capabilities=R,C.extensions=Qe,C.properties=j,C.renderLists=ce,C.shadowMap=De,C.state=v,C.info=V}_!==Yt&&(b=new kg(_,t.width,t.height,o,r,s));const Re=new wv(C,B);this.xr=Re,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const M=Qe.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Qe.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(M){M!==void 0&&(Y=M,this.setSize(pe,X,!1))},this.getSize=function(M){return M.set(pe,X)},this.setSize=function(M,F,ne=!0){if(Re.isPresenting){Be("WebGLRenderer: Can't change size while VR device is presenting.");return}pe=M,X=F,t.width=Math.floor(M*Y),t.height=Math.floor(F*Y),ne===!0&&(t.style.width=M+"px",t.style.height=F+"px"),b!==null&&b.setSize(t.width,t.height),this.setViewport(0,0,M,F)},this.getDrawingBufferSize=function(M){return M.set(pe*Y,X*Y).floor()},this.setDrawingBufferSize=function(M,F,ne){pe=M,X=F,Y=ne,t.width=Math.floor(M*ne),t.height=Math.floor(F*ne),this.setViewport(0,0,M,F)},this.setEffects=function(M){if(_===Yt){Je("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let F=0;F<M.length;F++)if(M[F].isOutputPass===!0){Be("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}b.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(Q)},this.getViewport=function(M){return M.copy(oe)},this.setViewport=function(M,F,ne,$){M.isVector4?oe.set(M.x,M.y,M.z,M.w):oe.set(M,F,ne,$),v.viewport(Q.copy(oe).multiplyScalar(Y).round())},this.getScissor=function(M){return M.copy(Se)},this.setScissor=function(M,F,ne,$){M.isVector4?Se.set(M.x,M.y,M.z,M.w):Se.set(M,F,ne,$),v.scissor(ee.copy(Se).multiplyScalar(Y).round())},this.getScissorTest=function(){return Ne},this.setScissorTest=function(M){v.setScissorTest(Ne=M)},this.setOpaqueSort=function(M){se=M},this.setTransparentSort=function(M){_e=M},this.getClearColor=function(M){return M.copy(He.getClearColor())},this.setClearColor=function(){He.setClearColor(...arguments)},this.getClearAlpha=function(){return He.getClearAlpha()},this.setClearAlpha=function(){He.setClearAlpha(...arguments)},this.clear=function(M=!0,F=!0,ne=!0){let $=0;if(M){let K=!1;if(D!==null){const ve=D.texture.format;K=p.has(ve)}if(K){const ve=D.texture.type,be=m.has(ve),ge=He.getClearColor(),Ae=He.getClearAlpha(),Le=ge.r,We=ge.g,qe=ge.b;be?(y[0]=Le,y[1]=We,y[2]=qe,y[3]=Ae,B.clearBufferuiv(B.COLOR,0,y)):(A[0]=Le,A[1]=We,A[2]=qe,A[3]=Ae,B.clearBufferiv(B.COLOR,0,A))}else $|=B.COLOR_BUFFER_BIT}F&&($|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ne&&($|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$!==0&&B.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),U=M},this.dispose=function(){t.removeEventListener("webglcontextlost",at,!1),t.removeEventListener("webglcontextrestored",je,!1),t.removeEventListener("webglcontextcreationerror",$t,!1),He.dispose(),ce.dispose(),de.dispose(),j.dispose(),O.dispose(),Z.dispose(),xe.dispose(),ae.dispose(),ue.dispose(),Re.dispose(),Re.removeEventListener("sessionstart",ol),Re.removeEventListener("sessionend",ll),Xn.stop()};function at(M){M.preventDefault(),Pl("WebGLRenderer: Context Lost."),L=!0}function je(){Pl("WebGLRenderer: Context Restored."),L=!1;const M=V.autoReset,F=De.enabled,ne=De.autoUpdate,$=De.needsUpdate,K=De.type;Ie(),V.autoReset=M,De.enabled=F,De.autoUpdate=ne,De.needsUpdate=$,De.type=K}function $t(M){Je("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function rn(M){const F=M.target;F.removeEventListener("dispose",rn),id(F)}function id(M){rd(M),j.remove(M)}function rd(M){const F=j.get(M).programs;F!==void 0&&(F.forEach(function(ne){ue.releaseProgram(ne)}),M.isShaderMaterial&&ue.releaseShaderCache(M))}this.renderBufferDirect=function(M,F,ne,$,K,ve){F===null&&(F=Ct);const be=K.isMesh&&K.matrixWorld.determinantAffine()<0,ge=od(M,F,ne,$,K);v.setMaterial($,be);let Ae=ne.index,Le=1;if($.wireframe===!0){if(Ae=z.getWireframeAttribute(ne),Ae===void 0)return;Le=2}const We=ne.drawRange,qe=ne.attributes.position;let we=We.start*Le,et=(We.start+We.count)*Le;ve!==null&&(we=Math.max(we,ve.start*Le),et=Math.min(et,(ve.start+ve.count)*Le)),Ae!==null?(we=Math.max(we,0),et=Math.min(et,Ae.count)):qe!=null&&(we=Math.max(we,0),et=Math.min(et,qe.count));const xt=et-we;if(xt<0||xt===1/0)return;xe.setup(K,$,ge,ne,Ae);let ct,rt=fe;if(Ae!==null&&(ct=G.get(Ae),rt=re,rt.setIndex(ct)),K.isMesh)$.wireframe===!0?(v.setLineWidth($.wireframeLinewidth*ht()),rt.setMode(B.LINES)):rt.setMode(B.TRIANGLES);else if(K.isLine){let Rt=$.linewidth;Rt===void 0&&(Rt=1),v.setLineWidth(Rt*ht()),K.isLineSegments?rt.setMode(B.LINES):K.isLineLoop?rt.setMode(B.LINE_LOOP):rt.setMode(B.LINE_STRIP)}else K.isPoints?rt.setMode(B.POINTS):K.isSprite&&rt.setMode(B.TRIANGLES);if(K.isBatchedMesh)if(Qe.get("WEBGL_multi_draw"))rt.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const Rt=K._multiDrawStarts,Ee=K._multiDrawCounts,Ut=K._multiDrawCount,Ze=Ae?G.get(Ae).bytesPerElement:1,Gt=j.get($).currentProgram.getUniforms();for(let sn=0;sn<Ut;sn++)Gt.setValue(B,"_gl_DrawID",sn),rt.render(Rt[sn]/Ze,Ee[sn])}else if(K.isInstancedMesh)rt.renderInstances(we,xt,K.count);else if(ne.isInstancedBufferGeometry){const Rt=ne._maxInstanceCount!==void 0?ne._maxInstanceCount:1/0,Ee=Math.min(ne.instanceCount,Rt);rt.renderInstances(we,xt,Ee)}else rt.render(we,xt)};function al(M,F,ne,$){U!==null&&M.isNodeMaterial&&U.setObject($,M),ke===!0&&Ce.setState(M,ne,!1),M.transparent===!0&&M.side===hn&&M.forceSinglePass===!1?(M.side=Bt,M.needsUpdate=!0,yr(M,F,$),M.side=ri,M.needsUpdate=!0,yr(M,F,$),M.side=hn):yr(M,F,$)}this.compile=function(M,F,ne=null){ne===null&&(ne=M),U!==null&&U.renderStart(M,F,ne),E=de.get(ne),E.init(F),S.push(E),ne.traverseVisible(function(K){K.isLight&&K.layers.test(F.layers)&&(E.pushLight(K),K.castShadow&&E.pushShadow(K))}),M!==ne&&M.traverseVisible(function(K){K.isLight&&K.layers.test(F.layers)&&(E.pushLight(K),K.castShadow&&E.pushShadow(K))}),E.setupLights(),U!==null&&U.updateLights(E.state.lightsArray),Fe=this.localClippingEnabled,ke=Ce.init(this.clippingPlanes,Fe),ke===!0&&Ce.setGlobalState(this.clippingPlanes,F),U!==null&&De.render(E.state.shadowsArray,ne,F);const $=new Set;return M.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const ve=K.material;if(ve)if(Array.isArray(ve))for(let be=0;be<ve.length;be++){const ge=ve[be];al(ge,ne,F,K),$.add(ge)}else al(ve,ne,F,K),$.add(ve)}),E=S.pop(),U!==null&&U.renderEnd(),$},this.compileAsync=function(M,F,ne=null){const $=this.compile(M,F,ne);return new Promise(K=>{function ve(){if($.forEach(function(be){const Ae=j.get(be).currentProgram;(Ae===void 0||Ae.isReady())&&$.delete(be)}),$.size===0){K(M);return}setTimeout(ve,10)}Qe.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let Os=null;function sd(M){Os&&Os(M)}function ol(){Xn.stop()}function ll(){Xn.start()}const Xn=new Du;Xn.setAnimationLoop(sd),typeof self<"u"&&Xn.setContext(self),this.setAnimationLoop=function(M){Os=M,Re.setAnimationLoop(M),M===null?Xn.stop():Xn.start()},Re.addEventListener("sessionstart",ol),Re.addEventListener("sessionend",ll),this.render=function(M,F){if(F!==void 0&&F.isCamera!==!0){Je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;U!==null&&U.renderStart(M,F);const ne=Re.enabled===!0&&Re.isPresenting===!0,$=b!==null&&(D===null||ne)&&b.begin(C,D);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Re.enabled===!0&&Re.isPresenting===!0&&(b===null||b.isCompositing()===!1)&&(Re.cameraAutoUpdate===!0&&Re.updateCamera(F),F=Re.getCamera()),M.isScene===!0&&M.onBeforeRender(C,M,F,D),E=de.get(M,S.length),E.init(F),E.state.textureUnits=w.getTextureUnits(),S.push(E),Ge.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Te.setFromProjectionMatrix(Ge,mn,F.reversedDepth),Fe=this.localClippingEnabled,ke=Ce.init(this.clippingPlanes,Fe),T=ce.get(M,P.length),T.init(),P.push(T),Re.enabled===!0&&Re.isPresenting===!0){const be=C.xr.getDepthSensingMesh();be!==null&&Fs(be,F,-1/0,C.sortObjects)}Fs(M,F,0,C.sortObjects),T.finish(),U!==null&&U.updateLights(E.state.lightsArray),C.sortObjects===!0&&T.sort(se,_e),lt=Re.enabled===!1||Re.isPresenting===!1||Re.hasDepthSensing()===!1,lt&&He.addToRenderList(T,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ke===!0&&Ce.beginShadows();const K=E.state.shadowsArray;if(De.render(K,M,F),ke===!0&&Ce.endShadows(),($&&b.hasRenderPass())===!1){const be=T.opaque,ge=T.transmissive;if(E.setupLights(),F.isArrayCamera){const Ae=F.cameras;if(ge.length>0)for(let Le=0,We=Ae.length;Le<We;Le++){const qe=Ae[Le];ul(be,ge,M,qe)}lt&&He.render(M);for(let Le=0,We=Ae.length;Le<We;Le++){const qe=Ae[Le];cl(T,M,qe,qe.viewport)}}else ge.length>0&&ul(be,ge,M,F),lt&&He.render(M),cl(T,M,F)}D!==null&&ie===0&&(w.updateMultisampleRenderTarget(D),w.updateRenderTargetMipmap(D)),$&&b.end(C),M.isScene===!0&&M.onAfterRender(C,M,F),xe.resetDefaultState(),q=-1,te=null,S.pop(),S.length>0?(E=S[S.length-1],w.setTextureUnits(E.state.textureUnits),ke===!0&&Ce.setGlobalState(C.clippingPlanes,E.state.camera)):E=null,P.pop(),P.length>0?T=P[P.length-1]:T=null,U!==null&&U.renderEnd()};function Fs(M,F,ne,$){if(M.visible===!1)return;if(M.layers.test(F.layers)){if(M.isGroup)ne=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(F);else if(M.isLightProbeGrid)E.pushLightProbeGrid(M);else if(M.isLight)E.pushLight(M),M.castShadow&&E.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(Te)){$&&_t.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Ge);const be=Z.update(M),ge=M.material;ge.visible&&T.push(M,be,ge,ne,_t.z,null,F)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(Te))){const be=Z.update(M),ge=M.material;if($&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),_t.copy(M.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),_t.copy(be.boundingSphere.center)),_t.applyMatrix4(M.matrixWorld).applyMatrix4(Ge)),Array.isArray(ge)){const Ae=be.groups;for(let Le=0,We=Ae.length;Le<We;Le++){const qe=Ae[Le],we=ge[qe.materialIndex];we&&we.visible&&T.push(M,be,we,ne,_t.z,qe,F)}}else ge.visible&&T.push(M,be,ge,ne,_t.z,null,F)}}const ve=M.children;for(let be=0,ge=ve.length;be<ge;be++)Fs(ve[be],F,ne,$)}function cl(M,F,ne,$){const{opaque:K,transmissive:ve,transparent:be}=M;E.setupLightsView(ne),ke===!0&&Ce.setGlobalState(C.clippingPlanes,ne),$&&v.viewport(Q.copy($)),K.length>0&&Mr(K,F,ne),ve.length>0&&Mr(ve,F,ne),be.length>0&&Mr(be,F,ne),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function ul(M,F,ne,$){if((ne.isScene===!0?ne.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[$.id]===void 0){const we=Qe.has("EXT_color_buffer_half_float")||Qe.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[$.id]=new nn(1,1,{generateMipmaps:!0,type:we?_n:Yt,minFilter:Qn,samples:Math.max(4,R.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ke.workingColorSpace})}const ve=E.state.transmissionRenderTarget[$.id],be=$.viewport||Q;ve.setSize(be.z*C.transmissionResolutionScale,be.w*C.transmissionResolutionScale);const ge=C.getRenderTarget(),Ae=C.getActiveCubeFace(),Le=C.getActiveMipmapLevel();C.setRenderTarget(ve),C.getClearColor(Ue),ye=C.getClearAlpha(),ye<1&&C.setClearColor(16777215,.5),C.clear(),lt&&He.render(ne);const We=C.toneMapping;C.toneMapping=tn;const qe=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),E.setupLightsView($),ke===!0&&Ce.setGlobalState(C.clippingPlanes,$),Mr(M,ne,$),w.updateMultisampleRenderTarget(ve),w.updateRenderTargetMipmap(ve),Qe.has("WEBGL_multisampled_render_to_texture")===!1){let we=!1;for(let et=0,xt=F.length;et<xt;et++){const ct=F[et],{object:rt,geometry:Rt,material:Ee,group:Ut}=ct;if(Ee.side===hn&&rt.layers.test($.layers)){const Ze=Ee.side;Ee.side=Bt,Ee.needsUpdate=!0,dl(rt,ne,$,Rt,Ee,Ut),Ee.side=Ze,Ee.needsUpdate=!0,we=!0}}we===!0&&(w.updateMultisampleRenderTarget(ve),w.updateRenderTargetMipmap(ve))}C.setRenderTarget(ge,Ae,Le),C.setClearColor(Ue,ye),qe!==void 0&&($.viewport=qe),C.toneMapping=We}function Mr(M,F,ne){const $=F.isScene===!0?F.overrideMaterial:null;for(let K=0,ve=M.length;K<ve;K++){const be=M[K],{object:ge,geometry:Ae,group:Le}=be;let We=be.material;We.allowOverride===!0&&$!==null&&(We=$),ge.layers.test(ne.layers)&&dl(ge,F,ne,Ae,We,Le)}}function dl(M,F,ne,$,K,ve){U!==null&&K.isNodeMaterial&&U.setObject(M,K),M.onBeforeRender(C,F,ne,$,K,ve),M.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),K.onBeforeRender(C,F,ne,$,M,ve),K.transparent===!0&&K.side===hn&&K.forceSinglePass===!1?(K.side=Bt,K.needsUpdate=!0,C.renderBufferDirect(ne,F,$,K,M,ve),K.side=ri,K.needsUpdate=!0,C.renderBufferDirect(ne,F,$,K,M,ve),K.side=hn):C.renderBufferDirect(ne,F,$,K,M,ve),M.onAfterRender(C,F,ne,$,K,ve)}function yr(M,F,ne){F.isScene!==!0&&(F=Ct);const $=j.get(M),K=E.state.lights,ve=E.state.shadowsArray,be=K.state.version,ge=ue.getParameters(M,K.state,ve,F,ne,E.state.lightProbeGridArray),Ae=ue.getProgramCacheKey(ge);let Le=$.programs;$.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?F.environment:null,$.fog=F.fog;const We=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;$.envMap=O.get(M.envMap||$.environment,We),$.envMapRotation=$.environment!==null&&M.envMap===null?F.environmentRotation:M.envMapRotation,Le===void 0&&(M.addEventListener("dispose",rn),Le=new Map,$.programs=Le);let qe=Le.get(Ae);if(qe!==void 0){if($.currentProgram===qe&&$.lightsStateVersion===be)return hl(M,ge),qe}else ge.uniforms=ue.getUniforms(M),U!==null&&M.isNodeMaterial&&U.build(M,ne,ge),M.onBeforeCompile(ge,C),qe=ue.acquireProgram(ge,Ae),Le.set(Ae,qe),$.uniforms=ge.uniforms;const we=$.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(we.clippingPlanes=Ce.uniform),hl(M,ge),$.needsLights=cd(M),$.lightsStateVersion=be,$.needsLights&&(we.ambientLightColor.value=K.state.ambient,we.lightProbe.value=K.state.probe,we.sunLights.value=K.state.sun,we.sunLightShadows.value=K.state.sunShadow,we.directionalLights.value=K.state.directional,we.directionalLightShadows.value=K.state.directionalShadow,we.spotLights.value=K.state.spot,we.spotLightShadows.value=K.state.spotShadow,we.rectAreaLights.value=K.state.rectArea,we.ltc_1.value=K.state.rectAreaLTC1,we.ltc_2.value=K.state.rectAreaLTC2,we.pointLights.value=K.state.point,we.pointLightShadows.value=K.state.pointShadow,we.hemisphereLights.value=K.state.hemi,we.sunShadowMatrix.value=K.state.sunShadowMatrix,we.sunShadowCascade.value=K.state.sunShadowCascade,we.directionalShadowMatrix.value=K.state.directionalShadowMatrix,we.spotLightMatrix.value=K.state.spotLightMatrix,we.spotLightMap.value=K.state.spotLightMap,we.pointShadowMatrix.value=K.state.pointShadowMatrix),$.lightProbeGrid=E.state.lightProbeGridArray.length>0,$.currentProgram=qe,$.uniformsList=null,qe}function fl(M){if(M.uniformsList===null){const F=M.currentProgram.getUniforms();M.uniformsList=fs.seqWithValue(F.seq,M.uniforms)}return M.uniformsList}function hl(M,F){const ne=j.get(M);ne.outputColorSpace=F.outputColorSpace,ne.batching=F.batching,ne.batchingColor=F.batchingColor,ne.instancing=F.instancing,ne.instancingColor=F.instancingColor,ne.instancingMorph=F.instancingMorph,ne.skinning=F.skinning,ne.morphTargets=F.morphTargets,ne.morphNormals=F.morphNormals,ne.morphColors=F.morphColors,ne.morphTargetsCount=F.morphTargetsCount,ne.numClippingPlanes=F.numClippingPlanes,ne.numIntersection=F.numClipIntersection,ne.vertexAlphas=F.vertexAlphas,ne.vertexTangents=F.vertexTangents,ne.toneMapping=F.toneMapping}function ad(M,F){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;x.setFromMatrixPosition(F.matrixWorld);for(let ne=0,$=M.length;ne<$;ne++){const K=M[ne];if(K.texture!==null&&K.boundingBox.containsPoint(x))return K}return null}function od(M,F,ne,$,K){F.isScene!==!0&&(F=Ct),w.resetTextureUnits();const ve=F.fog,be=$.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial?F.environment:null,ge=D===null?C.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:Ke.workingColorSpace,Ae=$.isMeshStandardMaterial||$.isMeshLambertMaterial&&!$.envMap||$.isMeshPhongMaterial&&!$.envMap,Le=O.get($.envMap||be,Ae),We=$.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,qe=!!ne.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),we=!!ne.morphAttributes.position,et=!!ne.morphAttributes.normal,xt=!!ne.morphAttributes.color;let ct=tn;$.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(ct=C.toneMapping);const rt=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,Rt=rt!==void 0?rt.length:0,Ee=j.get($),Ut=E.state.lights;if(ke===!0&&(Fe===!0||M!==te)){const ot=M===te&&$.id===q;Ce.setState($,M,ot)}let Ze=!1;$.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==Ut.state.version||Ee.outputColorSpace!==ge||K.isBatchedMesh&&Ee.batching===!1||!K.isBatchedMesh&&Ee.batching===!0||K.isBatchedMesh&&Ee.batchingColor===!0&&K._colorsTexture===null||K.isBatchedMesh&&Ee.batchingColor===!1&&K._colorsTexture!==null||K.isInstancedMesh&&Ee.instancing===!1||!K.isInstancedMesh&&Ee.instancing===!0||K.isSkinnedMesh&&Ee.skinning===!1||!K.isSkinnedMesh&&Ee.skinning===!0||K.isInstancedMesh&&Ee.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Ee.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Ee.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Ee.instancingMorph===!1&&K.morphTexture!==null||Ee.envMap!==Le||$.fog===!0&&Ee.fog!==ve||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==Ce.numPlanes||Ee.numIntersection!==Ce.numIntersection)||Ee.vertexAlphas!==We||Ee.vertexTangents!==qe||Ee.morphTargets!==we||Ee.morphNormals!==et||Ee.morphColors!==xt||Ee.toneMapping!==ct||Ee.morphTargetsCount!==Rt||!!Ee.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(Ze=!0):(Ze=!0,Ee.__version=$.version);let Gt=Ee.currentProgram;Ze===!0&&(Gt=yr($,F,K),U&&$.isNodeMaterial&&U.onUpdateProgram($,Gt,Ee));let sn=!1,Dn=!1,di=!1;const nt=Gt.getUniforms(),gt=Ee.uniforms;if(v.useProgram(Gt.program)&&(sn=!0,Dn=!0,di=!0),$.id!==q&&(q=$.id,Dn=!0),Ee.needsLights){const ot=ad(E.state.lightProbeGridArray,K);Ee.lightProbeGrid!==ot&&(Ee.lightProbeGrid=ot,Dn=!0)}if(sn||te!==M){v.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),nt.setValue(B,"projectionMatrix",M.projectionMatrix),nt.setValue(B,"viewMatrix",M.matrixWorldInverse);const Un=nt.map.cameraPosition;Un!==void 0&&Un.setValue(B,it.setFromMatrixPosition(M.matrixWorld)),R.logarithmicDepthBuffer&&nt.setValue(B,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&nt.setValue(B,"isOrthographic",M.isOrthographicCamera===!0),te!==M&&(te=M,Dn=!0,di=!0)}if(Ee.needsLights&&(Ut.state.sunShadowMap.length>0&&nt.setValue(B,"sunShadowMap",Ut.state.sunShadowMap,w),Ut.state.directionalShadowMap.length>0&&nt.setValue(B,"directionalShadowMap",Ut.state.directionalShadowMap,w),Ut.state.spotShadowMap.length>0&&nt.setValue(B,"spotShadowMap",Ut.state.spotShadowMap,w),Ut.state.pointShadowMap.length>0&&nt.setValue(B,"pointShadowMap",Ut.state.pointShadowMap,w)),K.isSkinnedMesh){nt.setOptional(B,K,"bindMatrix"),nt.setOptional(B,K,"bindMatrixInverse");const ot=K.skeleton;ot&&(ot.boneTexture===null&&ot.computeBoneTexture(),nt.setValue(B,"boneTexture",ot.boneTexture,w))}K.isBatchedMesh&&(nt.setOptional(B,K,"batchingTexture"),nt.setValue(B,"batchingTexture",K._matricesTexture,w),nt.setOptional(B,K,"batchingIdTexture"),nt.setValue(B,"batchingIdTexture",K._indirectTexture,w),nt.setOptional(B,K,"batchingColorTexture"),K._colorsTexture!==null&&nt.setValue(B,"batchingColorTexture",K._colorsTexture,w));const Nn=ne.morphAttributes;if((Nn.position!==void 0||Nn.normal!==void 0||Nn.color!==void 0)&&k.update(K,ne,Gt),(Dn||Ee.receiveShadow!==K.receiveShadow)&&(Ee.receiveShadow=K.receiveShadow,nt.setValue(B,"receiveShadow",K.receiveShadow)),($.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial)&&$.envMap===null&&F.environment!==null&&(gt.envMapIntensity.value=F.environmentIntensity),gt.dfgLUT!==void 0&&(gt.dfgLUT.value=Iv()),Dn){if(nt.setValue(B,"toneMappingExposure",C.toneMappingExposure),Ee.needsLights&&ld(gt,di),ve&&$.fog===!0&&Me.refreshFogUniforms(gt,ve),Me.refreshMaterialUniforms(gt,$,Y,X,E.state.transmissionRenderTarget[M.id]),Ee.needsLights&&Ee.lightProbeGrid){const ot=Ee.lightProbeGrid;gt.probesSH.value=ot.texture,gt.probesMin.value.copy(ot.boundingBox.min),gt.probesMax.value.copy(ot.boundingBox.max),gt.probesResolution.value.copy(ot.resolution)}fs.upload(B,fl(Ee),gt,w)}if($.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(fs.upload(B,fl(Ee),gt,w),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&nt.setValue(B,"center",K.center),nt.setValue(B,"modelViewMatrix",K.modelViewMatrix),nt.setValue(B,"normalMatrix",K.normalMatrix),nt.setValue(B,"modelMatrix",K.matrixWorld),$.uniformsGroups!==void 0){const ot=$.uniformsGroups;for(let Un=0,fi=ot.length;Un<fi;Un++){const ml=ot[Un];ae.update(ml,Gt),ae.bind(ml,Gt)}}return Gt}function ld(M,F){M.ambientLightColor.needsUpdate=F,M.lightProbe.needsUpdate=F,M.sunLights.needsUpdate=F,M.sunLightShadows.needsUpdate=F,M.directionalLights.needsUpdate=F,M.directionalLightShadows.needsUpdate=F,M.pointLights.needsUpdate=F,M.pointLightShadows.needsUpdate=F,M.spotLights.needsUpdate=F,M.spotLightShadows.needsUpdate=F,M.rectAreaLights.needsUpdate=F,M.hemisphereLights.needsUpdate=F}function cd(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return J},this.getActiveMipmapLevel=function(){return ie},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(M,F,ne){const $=j.get(M);$.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),j.get(M.texture).__webglTexture=F,j.get(M.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:ne,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,F){const ne=j.get(M);ne.__webglFramebuffer=F,ne.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(M,F=0,ne=0){D=M,J=F,ie=ne;let $=null,K=!1,ve=!1;if(M){const ge=j.get(M);if(ge.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(B.FRAMEBUFFER,ge.__webglFramebuffer),Q.copy(M.viewport),ee.copy(M.scissor),le=M.scissorTest,v.viewport(Q),v.scissor(ee),v.setScissorTest(le),q=-1;return}else if(ge.__webglFramebuffer===void 0)w.setupRenderTarget(M);else if(ge.__hasExternalTextures)w.rebindTextures(M,j.get(M.texture).__webglTexture,j.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const We=M.depthTexture;if(ge.__boundDepthTexture!==We){if(We!==null&&j.has(We)&&(M.width!==We.image.width||M.height!==We.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(M)}}const Ae=M.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(ve=!0);const Le=j.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Le[F])?$=Le[F][ne]:$=Le[F],K=!0):M.samples>0&&w.useMultisampledRTT(M)===!1?$=j.get(M).__webglMultisampledFramebuffer:Array.isArray(Le)?$=Le[ne]:$=Le,Q.copy(M.viewport),ee.copy(M.scissor),le=M.scissorTest}else Q.copy(oe).multiplyScalar(Y).floor(),ee.copy(Se).multiplyScalar(Y).floor(),le=Ne;if(ne!==0&&($=N),v.bindFramebuffer(B.FRAMEBUFFER,$)&&v.drawBuffers(M,$),v.viewport(Q),v.scissor(ee),v.setScissorTest(le),K){const ge=j.get(M.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+F,ge.__webglTexture,ne)}else if(ve){const ge=F;for(let Ae=0;Ae<M.textures.length;Ae++){const Le=j.get(M.textures[Ae]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+Ae,Le.__webglTexture,ne,ge)}}else if(M!==null&&ne!==0){const ge=j.get(M.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,ge.__webglTexture,ne)}q=-1};function pl(M){const F=j.get(M);return(F.__readFormat!==M.format||F.__readType!==M.type)&&(F.__readFormat=M.format,F.__readType=M.type,F.__formatReadable=R.textureFormatReadable(M.format),F.__typeReadable=R.textureTypeReadable(M.type)),F}this.readRenderTargetPixels=function(M,F,ne,$,K,ve,be,ge=0){if(!(M&&M.isWebGLRenderTarget)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=j.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&be!==void 0&&(Ae=Ae[be]),Ae){v.bindFramebuffer(B.FRAMEBUFFER,Ae);try{const Le=M.textures[ge],We=Le.format,qe=Le.type;M.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+ge);const we=pl(Le);if(we.__formatReadable===!1){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(we.__typeReadable===!1){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=M.width-$&&ne>=0&&ne<=M.height-K&&B.readPixels(F,ne,$,K,he.convert(We),he.convert(qe),ve)}finally{const Le=D!==null?j.get(D).__webglFramebuffer:null;v.bindFramebuffer(B.FRAMEBUFFER,Le)}}},this.readRenderTargetPixelsAsync=async function(M,F,ne,$,K,ve,be,ge=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=j.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&be!==void 0&&(Ae=Ae[be]),Ae)if(F>=0&&F<=M.width-$&&ne>=0&&ne<=M.height-K){v.bindFramebuffer(B.FRAMEBUFFER,Ae);const Le=M.textures[ge],We=Le.format,qe=Le.type;M.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+ge);const we=pl(Le);if(we.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(we.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const et=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,et),B.bufferData(B.PIXEL_PACK_BUFFER,ve.byteLength,B.STREAM_READ),B.readPixels(F,ne,$,K,he.convert(We),he.convert(qe),0),B.bindBuffer(B.PIXEL_PACK_BUFFER,null);const xt=D!==null?j.get(D).__webglFramebuffer:null;v.bindFramebuffer(B.FRAMEBUFFER,xt);const ct=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await Sf(B,ct,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,et),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,ve),B.bindBuffer(B.PIXEL_PACK_BUFFER,null),B.deleteBuffer(et),B.deleteSync(ct),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,F=null,ne=0){const $=Math.pow(2,-ne),K=Math.floor(M.image.width*$),ve=Math.floor(M.image.height*$),be=F!==null?F.x:0,ge=F!==null?F.y:0;w.setTexture2D(M,0),B.copyTexSubImage2D(B.TEXTURE_2D,ne,0,0,be,ge,K,ve),v.unbindTexture()},this.copyTextureToTexture=function(M,F,ne=null,$=null,K=0,ve=0){let be,ge,Ae,Le,We,qe,we,et,xt;const ct=M.isCompressedTexture?M.mipmaps[ve]:M.image;if(ne!==null)be=ne.max.x-ne.min.x,ge=ne.max.y-ne.min.y,Ae=ne.isBox3?ne.max.z-ne.min.z:1,Le=ne.min.x,We=ne.min.y,qe=ne.isBox3?ne.min.z:0;else{const gt=Math.pow(2,-K);be=Math.floor(ct.width*gt),ge=Math.floor(ct.height*gt),M.isDataArrayTexture?Ae=ct.depth:M.isData3DTexture?Ae=Math.floor(ct.depth*gt):Ae=1,Le=0,We=0,qe=0}$!==null?(we=$.x,et=$.y,xt=$.z):(we=0,et=0,xt=0);const rt=he.convert(F.format),Rt=he.convert(F.type);let Ee;F.isData3DTexture?(w.setTexture3D(F,0),Ee=B.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(w.setTexture2DArray(F,0),Ee=B.TEXTURE_2D_ARRAY):(w.setTexture2D(F,0),Ee=B.TEXTURE_2D),v.activeTexture(B.TEXTURE0),v.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,F.flipY),v.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),v.pixelStorei(B.UNPACK_ALIGNMENT,F.unpackAlignment);const Ut=v.getParameter(B.UNPACK_ROW_LENGTH),Ze=v.getParameter(B.UNPACK_IMAGE_HEIGHT),Gt=v.getParameter(B.UNPACK_SKIP_PIXELS),sn=v.getParameter(B.UNPACK_SKIP_ROWS),Dn=v.getParameter(B.UNPACK_SKIP_IMAGES);v.pixelStorei(B.UNPACK_ROW_LENGTH,ct.width),v.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ct.height),v.pixelStorei(B.UNPACK_SKIP_PIXELS,Le),v.pixelStorei(B.UNPACK_SKIP_ROWS,We),v.pixelStorei(B.UNPACK_SKIP_IMAGES,qe);const di=M.isDataArrayTexture||M.isData3DTexture,nt=F.isDataArrayTexture||F.isData3DTexture;if(M.isDepthTexture){const gt=j.get(M),Nn=j.get(F),ot=j.get(gt.__renderTarget),Un=j.get(Nn.__renderTarget);v.bindFramebuffer(B.READ_FRAMEBUFFER,ot.__webglFramebuffer),v.bindFramebuffer(B.DRAW_FRAMEBUFFER,Un.__webglFramebuffer);for(let fi=0;fi<Ae;fi++)di&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,j.get(M).__webglTexture,K,qe+fi),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,j.get(F).__webglTexture,ve,xt+fi)),B.blitFramebuffer(Le,We,be,ge,we,et,be,ge,B.DEPTH_BUFFER_BIT,B.NEAREST);v.bindFramebuffer(B.READ_FRAMEBUFFER,null),v.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(K!==0||M.isRenderTargetTexture||j.has(M)){const gt=j.get(M),Nn=j.get(F);v.bindFramebuffer(B.READ_FRAMEBUFFER,I),v.bindFramebuffer(B.DRAW_FRAMEBUFFER,H);for(let ot=0;ot<Ae;ot++)di?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,gt.__webglTexture,K,qe+ot):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,gt.__webglTexture,K),nt?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Nn.__webglTexture,ve,xt+ot):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Nn.__webglTexture,ve),K!==0?B.blitFramebuffer(Le,We,be,ge,we,et,be,ge,B.COLOR_BUFFER_BIT,B.NEAREST):nt?B.copyTexSubImage3D(Ee,ve,we,et,xt+ot,Le,We,be,ge):B.copyTexSubImage2D(Ee,ve,we,et,Le,We,be,ge);v.bindFramebuffer(B.READ_FRAMEBUFFER,null),v.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else nt?M.isDataTexture||M.isData3DTexture?B.texSubImage3D(Ee,ve,we,et,xt,be,ge,Ae,rt,Rt,ct.data):F.isCompressedArrayTexture?B.compressedTexSubImage3D(Ee,ve,we,et,xt,be,ge,Ae,rt,ct.data):B.texSubImage3D(Ee,ve,we,et,xt,be,ge,Ae,rt,Rt,ct):M.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,ve,we,et,be,ge,rt,Rt,ct.data):M.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,ve,we,et,ct.width,ct.height,rt,ct.data):B.texSubImage2D(B.TEXTURE_2D,ve,we,et,be,ge,rt,Rt,ct);v.pixelStorei(B.UNPACK_ROW_LENGTH,Ut),v.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Ze),v.pixelStorei(B.UNPACK_SKIP_PIXELS,Gt),v.pixelStorei(B.UNPACK_SKIP_ROWS,sn),v.pixelStorei(B.UNPACK_SKIP_IMAGES,Dn),ve===0&&F.generateMipmaps&&B.generateMipmap(Ee),v.unbindTexture()},this.initRenderTarget=function(M){j.get(M).__webglFramebuffer===void 0&&w.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?w.setTextureCube(M,0):M.isData3DTexture?w.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?w.setTexture2DArray(M,0):w.setTexture2D(M,0),v.unbindTexture()},this.resetState=function(){J=0,ie=0,D=null,v.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ke._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ke._getUnpackColorSpace()}}function Ns(n,e){const t=[[0,n],[n,0],[0,-n],[-n,0]];if(e<=0)return t.map(([s,a])=>[s,a,0]);const i=Math.min(.24,Math.max(0,e/n)),r=[];for(let s=0;s<4;s++){const a=t[s],o=t[(s+3)%4],l=t[(s+1)%4],c=a.map((h,d)=>h+(o[d]-h)*i),f=a.map((h,d)=>h+(l[d]-h)*i);for(let h=0;h<=8;h++){const d=h/8,u=1-d;r.push([u*u*c[0]+2*u*d*a[0]+d*d*f[0],u*u*c[1]+2*u*d*a[1]+d*d*f[1],0])}}return r}function Hu(n,e=50,t=38){const i=Vi[n],r=i.u-i.v,s=i.u+i.v,a=Math.hypot(r,s)||1,o={x:r/a,y:s/a},l={x:-o.y,y:o.x},c={x:o.x*e/2,y:o.y*e/2},f={x:-o.x*e*.08,y:-o.y*e*.08},h={x:-o.x*e/2,y:-o.y*e/2},d=[c,{x:f.x+l.x*t/2,y:f.y+l.y*t/2},{x:f.x+l.x*t*.22,y:f.y+l.y*t*.22},{x:h.x+l.x*t*.22,y:h.y+l.y*t*.22},{x:h.x-l.x*t*.22,y:h.y-l.y*t*.22},{x:f.x-l.x*t*.22,y:f.y-l.y*t*.22},{x:f.x-l.x*t/2,y:f.y-l.y*t/2}];return Gu(d,3.5)}function Vu(n,e=40,t=11){const i=Vi[n],r=i.u-i.v,s=i.u+i.v,a=Math.hypot(r,s)||1,o={x:r/a,y:s/a},l={x:-o.y,y:o.x},c=t/2,f=[[e*.38,0],[-e*.12,e*.48],[-e*.12-c*1.4,e*.48-c*1.4],[e*.38-c*2.8,0],[-e*.12-c*1.4,-e*.48+c*1.4],[-e*.12,-e*.48]];return Gu(f.map(([h,d])=>({x:o.x*h+l.x*d,y:o.y*h+l.y*d})),4)}function Gu(n,e){const t=new Tu;n.forEach((r,s)=>{const a=n[(s+n.length-1)%n.length],o=n[(s+1)%n.length],l=h=>{const d=Math.hypot(h.x-r.x,h.y-r.y),u=Math.min(.45,e/d);return{x:r.x+(h.x-r.x)*u,y:r.y+(h.y-r.y)*u}},c=l(a),f=l(o);s===0?t.moveTo(c.x,c.y):t.lineTo(c.x,c.y),t.quadraticCurveTo(r.x,r.y,f.x,f.y)}),t.closePath();const i=new Yo(t,8).toNonIndexed();return i.computeBoundingSphere(),i}function Nv(n,e){const t=[...n.cells].filter(r=>r.kind!=="blocked").sort(gs).map(r=>({kind:"floor",cell:r})),i=[...e].sort((r,s)=>+!!r.collecting-+!!s.collecting||gs(r,s));return[...t,...i.map(r=>({kind:"stack",stack:r,firstLayer:0,endLayer:Math.ceil(r.height)}))]}function Aa(n,e){return{rise:e+(n.lift??0)+(n.layerOffsets?.[e]??0),scale:n.layerScales?.[e]??1}}function Cc(n,e){const t=[],i=[],r=Math.min(32,240/Math.max(1,n-1));for(let s=0;s<n;s++){const a=(e-s*r)/420,o=a>0&&a<1?Math.sin(a*Math.PI*3)*(1-a)**2:0;t.push(o*.3),i.push(1+o*.22)}return{layerOffsets:t,layerScales:i}}function Uv(n,e){if(e)return{offset:0,intensity:1};const t=(n%.9+.9)%.9/.9,i=Math.cos(t*Math.PI*2);return{offset:-7*i,intensity:(1-i)/2}}function Us(n,e,t){const i=new kt;return i.setAttribute("position",new Mt(n.flatMap(r=>[r[0],r[1],0]),3)),i.setAttribute("color",new Mt(n.flatMap(r=>{const s=e(r);return t?[s.r,s.g,s.b,t(r)]:[s.r,s.g,s.b]}),t?4:3)),i.computeBoundingSphere(),i}function Zo(n){const e=[];for(let t=1;t<n.length;t++){const i=n[t-1],r=n[t];for(let s=0;s<i.length;s++){const a=(s+1)%i.length;e.push(i[s],i[a],r[a],i[s],r[a],r[s])}}return e}function Wu(n,e,t){const i=new Ve(t?"#ffc729":"#f2ebdf"),r=new Ve(t?"#ffe878":"#fffdf7"),s=Math.exp(-((n-.28)**2+(e-.3)**2)*1.3);return i.lerp(r,.25+.65*s)}function Eo(n,e,t=!1){const i=[0,.2,.4,.6,.8,1].map(r=>Ns(n,e).map(s=>[s[0]*r,s[1]*r,r]));return Us(Zo(i),r=>Wu(r[0]/n,r[1]/n,t))}function bo(n,e,t,i=!1){const r=[0,.2,.4,.6,.8,1].map(o=>Ns(n-e*o,t*(n-e*o)/n).map(l=>[l[0],l[1],o])),s=new Ve(i?"#dca02a":"#c2c1ba"),a=new Ve(i?"#fff19c":"#fffef9");return Us(Zo(r),o=>{const l=Math.max(0,Math.min(1,.65+(o[1]+o[0]*.65)/(n*2))),c=o[2];return s.clone().lerp(a,.2+l*.6).lerp(Wu(o[0]/(n-e),o[1]/(n-e),i),c*c*(3-2*c))})}function To(n,e,t,i=!1){const r=[0,.12,.5,.85,1].map(l=>Ns(n-(l>.85?(l-.85)*10:0),t).map(c=>[c[0],c[1]-e*l,l])),s=[];for(let l=1;l<r.length;l++){const c=r[l-1],f=r[l];for(let h=0;h<c.length;h++){const d=(h+1)%c.length;c[d][0]>=c[h][0]||s.push(c[h],c[d],f[d],c[h],f[d],f[h])}}const a=new Ve(i?"#b78224":"#a6acb4"),o=new Ve(i?"#f6c440":"#eee9df");return Us(s,l=>{const c=.7+l[0]/n*.18,f=.6+.25*Math.sin(l[2]*Math.PI)-.4*l[2];return a.clone().lerp(o,Math.max(0,Math.min(1,c*f)))})}function Ov(n,e){const t=[0,.65,.85,1,1.1].map(i=>Ns(n,e).map(r=>[r[0]*i,r[1]*i,i]));return Us(Zo(t),()=>new Ve("#716c60"),i=>Math.max(0,1-i[2]/1.1)**1.4)}const hs=Ro.length;function Fv(n,e){return((n+e*5)%hs+hs)%hs}function Bv(n,e){const{rect:t,solid:i}=Ro[n],r=e*2/(i[2]-i[0]),s=(e*2+Po)/(i[3]-i[1]),a=-e-i[0]*r,o=a+r,l=e+i[1]*s,c=l-s,[f,h,d,u]=t,g=f/xl,_=d/xl,p=1-u/Sl,m=1-h/Sl,y=new kt;return y.setAttribute("position",new Mt([a,l,0,o,l,0,o,c,0,a,l,0,o,c,0,a,c,0],3)),y.setAttribute("uv",new Mt([g,m,_,m,_,p,g,m,_,p,g,p],2)),y.computeBoundingSphere(),y}function kv(n){const e=[To(n,Lo,12),bo(n,4,12),Eo(n-4,11)],t=[],i=[],r=new Ve("#64778b"),s=new Ve("#c7cdd0");for(const o of e){const l=o.getAttribute("position"),c=o.getAttribute("color");for(let f=0;f<l.count;f++){t.push(l.getX(f),l.getY(f),l.getZ(f));const h=r.clone().lerp(s,Math.min(1,(c.getX(f)+c.getY(f)+c.getZ(f))/3));i.push(h.r,h.g,h.b)}o.dispose()}const a=new kt;return a.setAttribute("position",new Mt(t,3)),a.setAttribute("color",new Mt(i,3)),a.computeBoundingSphere(),a}const Xu={tiles:[2048,512],markers:[1024,512]},zv={white:{rect:[16,49,496,462],solid:[.024635036496350366,.028631519414644493,.9753649635036497,.9724112334529259]},yellow:{rect:[528,55,1008,457],solid:[.024280575539568344,.02899173198754429,.9757194244604316,.9717599055084291]},"white-shadow":{rect:[1040,131,1520,380],solid:[.024104234527687295,.04646599427024057,.9758957654723126,.9519249636984419]},"yellow-shadow":{rect:[1552,136,2032,376],solid:[.024025974025974024,.04805194805194805,.9759740259740259,.9532467532467532]},"orange-up":{rect:[8,69,120,186],solid:[.024915062287655717,.0238503160360465,.9750849377123442,.9756947469291749]},"orange-up-right":{rect:[136,74,248,182],solid:[.024020227560050567,.024909865617830217,.9759797724399494,.9780399868895444]},"orange-right":{rect:[264,86,376,170],solid:[.024177949709864605,.032237266279819474,.9758220502901355,.9722759509993553]},"orange-down-right":{rect:[392,74,504,182],solid:[.02408256880733945,.024974515800203875,.9759174311926605,.9704383282364935]},"orange-down":{rect:[520,70,632,185],solid:[.025246981339187707,.02458836443468716,.9747530186608123,.97818928077125]},"orange-down-left":{rect:[648,76,760,180],solid:[.024364406779661018,.026238591916558023,.975635593220339,.973109517601043]},"orange-left":{rect:[776,85,888,171],solid:[.024557956777996073,.03198245533878558,.9754420432220039,.9697080458719788]},"orange-up-left":{rect:[904,74,1016,182],solid:[.02378255945639864,.02466339499182081,.9762174405436014,.9724424311060778]},"white-up":{rect:[8,347,120,421],solid:[.02586206896551724,.0391425908667288,.9741379310344829,.9589934762348556]},"white-up-right":{rect:[136,334,248,434],solid:[.027624309392265196,.030939226519337018,.9723756906077348,.9714917127071823]},"white-right":{rect:[264,317,376,450],solid:[.02958579881656805,.024914356898162567,.9704142011834321,.9766427904079727]},"white-down-right":{rect:[392,334,504,434],solid:[.027624309392265196,.030939226519337018,.9723756906077348,.965303867403315]},"white-down":{rect:[520,347,632,421],solid:[.02586206896551724,.0391425908667288,.9741379310344829,.9589934762348556]},"white-down-left":{rect:[648,334,760,434],solid:[.027624309392265196,.030939226519337018,.9723756906077348,.965303867403315]},"white-left":{rect:[776,317,888,450],solid:[.02958579881656805,.024914356898162567,.9704142011834321,.9766427904079727]},"white-up-left":{rect:[904,334,1016,434],solid:[.027624309392265196,.030939226519337018,.9723756906077348,.9714917127071823]}},Hv={SE:"up-right",SW:"up-left",NW:"down-left",NE:"down-right",E:"right",W:"left",N:"down",S:"up"},qu={white:.94,yellow:.96};function Yu(n,e,t,i){const{rect:r,solid:s}=zv[n],a=s[2]-s[0],o=s[3]-s[1],l=(i.right-i.left)/a,c=(i.top-i.bottom)/o,f=i.left-s[0]*l,h=f+l,d=i.top+s[1]*c,u=d-c,g=r[0]/e,_=r[2]/e,p=1-r[3]/t,m=1-r[1]/t,y=new kt;return y.setAttribute("position",new Mt([f,d,0,h,d,0,h,u,0,f,d,0,h,u,0,f,u,0],3)),y.setAttribute("uv",new Mt([g,m,_,m,_,p,g,m,_,p,g,p],2)),y.computeBoundingSphere(),y}function es(n=!1,e=!1){const t=((n?Ri:Tt)-1)*qu[n?"yellow":"white"],i=n?12:ii;return Yu(n?e?"yellow-shadow":"yellow":e?"white-shadow":"white",...Xu.tiles,{left:-t,right:t,top:e?n?8:Io-ii:t,bottom:-t-i})}function Rc(n,e=!1){const t=e?Vu(n):Hu(n);t.computeBoundingBox();const i=t.boundingBox,r=e?1.2:1.25,s=Yu(`${e?"white":"orange"}-${Hv[n]}`,...Xu.markers,{left:i.min.x*r,right:i.max.x*r,top:i.max.y*r,bottom:i.min.y*r});return t.dispose(),s}const ut={transparent:!0,depthTest:!1,depthWrite:!1,side:hn};function Lc(n,e,t,i){const r=Do(n,e,t,i);return{x:r.x-dt.width/2,y:dt.height/2-r.y}}function Pc(n,e,t,i){const r=vs(n,e,t,i);return{x:r.x-dt.width/2,y:dt.height/2-r.y}}function Vv(){return{tileTop:new st({vertexColors:!0,...ut}),tileBevel:new st({vertexColors:!0,...ut}),sideLight:new st({vertexColors:!0,...ut}),floor:new st({vertexColors:!0,...ut}),floorBevel:new st({vertexColors:!0,...ut}),floorSide:new st({vertexColors:!0,...ut}),coveredFloorSide:new st({vertexColors:!0,color:"#cda756",...ut}),coveredFloorBevel:new st({vertexColors:!0,color:"#d6b251",...ut}),landscape:new st({vertexColors:!0,...ut}),stoneArt:new st({...ut}),shadow:new st({vertexColors:!0,opacity:.28,...ut}),arrowShadow:new st({color:"#786f58",opacity:.16,...ut}),arrowSide:new st({color:"#ca641c",...ut}),arrowBevel:new st({color:"#ffbb69",...ut}),chevronSide:new st({color:"#cba52c",...ut}),selectedArrow:new st({color:Ui.arrow,...ut}),hintTop:new st({vertexColors:!0,...ut}),hintBevel:new st({vertexColors:!0,...ut}),hintSide:new st({vertexColors:!0,...ut}),hintArt:new st({...ut}),arrow:new st({color:Ui.arrow,...ut}),chevron:new st({color:Ui.chevron,...ut}),tileArt:new st({...ut}),markerArt:new st({...ut}),chevronArt:new st({...ut})}}function Gv(n){const e=new Dv({canvas:n,antialias:!0,alpha:!0,powerPreference:"high-performance"});e.outputColorSpace=It,e.toneMapping=tn,e.setClearColor(Ui.background,0),e.autoClear=!1;const t=new ta,i=new Ko(-360,360,640,-640,.1,1e3);i.position.set(0,0,100),i.lookAt(0,0,0);const r=Vv(),s={stoneSprites:Array.from({length:hs},(ee,le)=>Bv(le,Pi)),stoneSlab:kv(Pi),floor:Eo(Ri-5,12*(Ri-5)/(Ri-1),!0),floorBevel:bo(Ri-1,4,12,!0),floorSide:To(Ri-1,12,12,!0),tileTop:Eo(Tt-6,12*(Tt-6)/(Tt-1)),tileBevel:bo(Tt-1,5,12),tileSide:To(Tt-1,ii,12),shadow:Ov((Tt-2)*qu.white,12),arrows:Object.fromEntries(wr.map(ee=>[ee,Hu(ee)])),chevrons:Object.fromEntries(wr.map(ee=>[ee,Vu(ee)])),whiteSprite:es(),coveredWhiteSprite:es(!1,!0),yellowSprite:es(!0),coveredYellowSprite:es(!0,!0),arrowSprites:Object.fromEntries(wr.map(ee=>[ee,Rc(ee)])),chevronSprites:Object.fromEntries(wr.map(ee=>[ee,Rc(ee,!0)]))},a=new ta,o=new ta;let l;a.scale.y=Cn,t.add(a),t.add(o);let c={width:1,height:1,pixelRatio:1},f,h,d=!1,u="loading",g="loading";const _=new Pu,p=new Promise((ee,le)=>{_.onLoad=()=>ee(),_.onError=()=>le(new Error("Could not load board textures."))});p.catch(()=>{});const m=new xa(_).load(new URL("/White-Tower-Play/assets/tiles-atlas-Bgn-GxWF.webp",import.meta.url).href,ee=>{if(d){ee.dispose();return}u="ready",h&&J(h)},void 0,()=>{u="failed"});m.colorSpace=It,r.tileArt.map=m,r.hintArt.map=m;const y=new xa(_).load(new URL("/White-Tower-Play/assets/markers-atlas-M4FshpTr.webp",import.meta.url).href,ee=>{if(d){ee.dispose();return}g="ready",h&&J(h)},void 0,()=>{g="failed"});y.colorSpace=It,r.markerArt.map=y,r.chevronArt.map=y;let A=!1;const x=new xa(_).load(new URL("/White-Tower-Play/assets/stone-atlas-C2ucdoOf.webp",import.meta.url).href,ee=>{if(d){ee.dispose();return}A=!0,l=void 0,h&&J(h)},void 0,()=>{A=!1});x.colorSpace=It,r.stoneArt.map=x;let T=0,E=!1;const P=[],S=new Ve(Ui.floor),b=new Ve(Ui.chevron);let C={lost(){},restored(){}};const L=ee=>{ee.preventDefault(),C.lost()},U=()=>{h&&J(h),C.restored()};n.addEventListener("webglcontextlost",L),n.addEventListener("webglcontextrestored",U);function N(ee,le,Ue,ye,pe=1,X=1,Y=a){const se=new xn(ee,le);return se.position.set(Ue.x,Ue.y,Ue.z),se.scale.set(pe,X,1),se.renderOrder=ye,Y.add(se),se}function I(ee,le,Ue,ye,pe,X){const Y=(ee.u+ee.v+1e3)*1e-5;let se=ye+1;for(let oe=pe;oe<X;oe++){const Se=Aa(ee,oe),Ne=Pc(ee.u,ee.v,Se.rise,Ue),Te=Y+.01+oe*1e-5,ke=ee.id===h?.hintStackId&&oe===Math.ceil(ee.height)-1;if(N(s.shadow,r.shadow,{x:Ne.x-4,y:Ne.y-ii-4,z:Te},se++,Se.scale,Se.scale),u==="ready"){const Fe=oe<Math.ceil(ee.height)-1;N(s.whiteSprite,ke?r.hintArt:r.tileArt,{x:Ne.x,y:Ne.y,z:Te},se++,Se.scale,Se.scale),Fe&&N(s.coveredWhiteSprite,r.tileArt,{x:Ne.x,y:Ne.y,z:Te},se++,Se.scale,Se.scale);continue}N(s.tileSide,ke?r.hintSide:r.sideLight,{x:Ne.x,y:Ne.y,z:Te},se++,Se.scale,Se.scale),N(s.tileBevel,ke?r.hintBevel:r.tileBevel,{x:Ne.x,y:Ne.y,z:Te+.001},se++,Se.scale,Se.scale),N(s.tileTop,ke?r.hintTop:r.tileTop,{x:Ne.x,y:Ne.y,z:Te+.002},se++,Se.scale,Se.scale)}const _e=ee.launchDirection;if(_e&&X===Math.ceil(ee.height)){const oe=Aa(ee,ee.height-1),Se=Pc(ee.u,ee.v,oe.rise,Ue),Ne=oe.scale*(ee.arrowScale??1),Te=-(ee.turnRotation??0);if(g==="ready")return N(s.arrowSprites[_e],r.markerArt,{x:Se.x,y:Se.y,z:Y},se++,Ne,Ne).rotation.z=Te,se+Math.max(1,le.cells.length);N(s.arrows[_e],r.arrowShadow,{x:Se.x-2,y:Se.y-5,z:Y},se++,Ne*1.06,Ne*1.06).rotation.z=Te,N(s.arrows[_e],r.arrowSide,{x:Se.x,y:Se.y-3,z:Y},se++,Ne,Ne).rotation.z=Te,N(s.arrows[_e],r.arrowBevel,{x:Se.x,y:Se.y,z:Y},se++,Ne,Ne).rotation.z=Te,N(s.arrows[_e],ee.id===h?.selectedStackId?r.selectedArrow:r.arrow,{x:Se.x,y:Se.y+1,z:Y+.03+ee.height*1e-5},se++,Ne*.9,Ne*.9).rotation.z=Te}return se+Math.max(1,le.cells.length)}function H(ee){f=ee,h&&(h={...h,projection:f}),a.position.set(f.originX-dt.width/2,(dt.height/2-f.originY)*Cn,0),a.scale.set(f.scale,f.scale*Cn,1),o.position.copy(a.position),o.scale.copy(a.scale)}function J(ee){if(d||(a.clear(),P.length=0,h=ee,H(ee.projection??fn(ee.level,ee.stacks)),!f))return;const le={...f,originX:dt.width/2,originY:dt.height/2,scale:1},Ue=[...ee.level.cells].sort(gs);if(l!==ee.level){o.clear(),l=ee.level;let pe=-8500;for(const X of Ue){if(X.kind==="blocked")continue;const Y=Lc(X.u,X.v,0,le);if(A){N(s.stoneSprites[Fv(X.u,X.v)],r.stoneArt,{x:Y.x,y:Y.y-12-cr,z:0},pe++,1,1,o);continue}for(let se=Wc-1;se>=0;se--)N(s.stoneSlab,r.landscape,{x:Y.x,y:Y.y-12-cr-se*Lo,z:0},pe++,1,1,o)}}let ye=1;for(const pe of Nv(ee.level,ee.stacks)){if(pe.kind==="stack"){ye=I(pe.stack,ee.level,le,ye+2,pe.firstLayer,pe.endLayer);continue}const X=pe.cell,Y=Lc(X.u,X.v,0,le),se=(X.u+X.v+1e3)*1e-5,_e=ee.stacks.some(oe=>Math.abs(oe.u-X.u)<.01&&Math.abs(oe.v-X.v)<.01&&Aa(oe,0).rise<.15);if(u==="ready"?(N(s.yellowSprite,r.tileArt,{x:Y.x,y:Y.y,z:se},ye++),_e&&N(s.coveredYellowSprite,r.tileArt,{x:Y.x,y:Y.y,z:se},ye++)):(N(s.floorSide,_e?r.coveredFloorSide:r.floorSide,{x:Y.x,y:Y.y,z:se},ye++),N(s.floorBevel,_e?r.coveredFloorBevel:r.floorBevel,{x:Y.x,y:Y.y,z:se},ye++),N(s.floor,r.floor,{x:Y.x,y:Y.y,z:se},ye++)),X.kind==="redirect"&&X.direction&&!ee.stacks.some(oe=>oe.u===X.u&&oe.v===X.v)){if(g==="ready"){const Ne=N(s.chevronSprites[X.direction],r.chevronArt,{x:Y.x,y:Y.y,z:se},ye++);P.push({mesh:Ne,x:Y.x,y:Y.y,direction:X.direction});continue}const oe=N(s.chevrons[X.direction],r.chevronSide,{x:Y.x,y:Y.y-3,z:se},ye++);P.push({mesh:oe,x:Y.x,y:Y.y-3,direction:X.direction});const Se=N(s.chevrons[X.direction],r.chevron,{x:Y.x,y:Y.y,z:se+.002},ye++);P.push({mesh:Se,x:Y.x,y:Y.y,direction:X.direction})}}D()}function ie(ee){d||(c={width:Math.max(1,ee.width),height:Math.max(1,ee.height),pixelRatio:Math.min(Math.max(1,ee.pixelRatio),2)},e.setPixelRatio(c.pixelRatio),e.setSize(c.width,c.height,!1),D())}function D(){if(d||c.width<=0||c.height<=0)return;const ee=Uv(T,E),le=E?.7:(1-Math.cos(T*Math.PI*2/1.8))/2;for(const se of[r.hintArt,r.hintTop,r.hintBevel,r.hintSide])se.color.setRGB(1.2+le*.6,.72+le*.4,.22+le*.12);r.chevron.color.copy(S).lerp(b,.85+ee.intensity*.15),r.chevronArt.color.setScalar(.94+ee.intensity*.06);for(const se of P){const _e=Vi[se.direction],oe=_e.u-_e.v,Se=_e.u+_e.v,Ne=Math.hypot(oe,Se)||1;se.mesh.position.x=se.x+oe/Ne*ee.offset,se.mesh.position.y=se.y+Se/Ne*ee.offset}e.setScissorTest(!1),e.setViewport(0,0,c.width,c.height),e.clear(!0,!0,!0);const Ue=Math.min(c.width/dt.width,c.height/dt.height),ye=dt.width*Ue,pe=dt.height*Ue,X=(c.width-ye)/2,Y=(c.height-pe)/2;e.setScissorTest(!0),e.setScissor(X,Y,ye,pe),e.setViewport(X,Y,ye,pe),h&&e.render(t,i),e.setScissorTest(!1)}function q(ee,le){return f=le.projection??fn(le.level,le.stacks),yd(bd(ee),le.stacks,f)}function te(){return Object.freeze({geometries:e.info.memory.geometries,textures:e.info.memory.textures,programs:e.info.programs?.length??0,children:a.children.length+o.children.length})}function Q(){d||(d=!0,n.removeEventListener("webglcontextlost",L),n.removeEventListener("webglcontextrestored",U),a.clear(),o.clear(),s.stoneSprites.forEach(ee=>ee.dispose()),x.dispose(),s.stoneSlab.dispose(),s.floor.dispose(),s.floorBevel.dispose(),s.floorSide.dispose(),s.whiteSprite.dispose(),s.coveredWhiteSprite.dispose(),s.yellowSprite.dispose(),s.coveredYellowSprite.dispose(),Object.values(s.arrowSprites).forEach(ee=>ee.dispose()),Object.values(s.chevronSprites).forEach(ee=>ee.dispose()),m.dispose(),y.dispose(),s.shadow.dispose(),s.tileTop.dispose(),s.tileBevel.dispose(),s.tileSide.dispose(),Object.values(s.arrows).forEach(ee=>ee.dispose()),Object.values(s.chevrons).forEach(ee=>ee.dispose()),Object.values(r).forEach(ee=>ee.dispose()),e.dispose())}return Object.freeze({ready:p,setView:J,setProjection:H,resize:ie,render:D,pickStack:q,resourceCounts:te,artworkStatus:()=>({tiles:u,markers:g}),setPresentationTime(ee,le){T=ee,E=le},setContextCallbacks(ee){C=ee},dispose:Q})}function Wv(){return Object.freeze({setView(){},resize(){},render(){},pickStack(){},resourceCounts:()=>Object.freeze({geometries:0,textures:0,programs:0,children:0}),dispose(){}})}function Ic(n,e={}){const t=e.replaceCanvas?n.cloneNode(!1):n;t!==n&&n.parentNode?.replaceChild(t,n);try{if(e.mode==="unsupported")throw new Error("Simulated unavailable WebGL");return Object.freeze({renderer:(e.webglFactory??Gv)(t),canvas:t,mode:"webgl",supported:!0})}catch{return Object.freeze({renderer:Wv(),canvas:t,mode:"unsupported",supported:!1,message:"Не удалось запустить Three.js: WebGL недоступен. Перезагрузите игру или откройте другой браузер."})}}const wa=["scale","originX","originY"],Ca=16,Xv={scale:5e-6,originX:.005,originY:.005},qv={scale:5e-5,originX:.05,originY:.05};function Yv(){let n,e,t;const i={scale:0,originX:0,originY:0};return{reset(r){n=e=t=r;for(const s of wa)i[s]=0},synchronize(r=n){n=e=r},target(r){if(!n){n=e=t=r;return}t=r},update(r){if(!n||!t||!Number.isFinite(r)||r<=0)return!1;e=n;const s={...n,layerRise:t.layerRise},a=Math.exp(-Ca*r);for(const o of wa){const l=n[o]-t[o],c=i[o]+Ca*l;s[o]=t[o]+(l+c*r)*a,i[o]=(i[o]-Ca*c*r)*a,Math.abs(s[o]-t[o])<Xv[o]&&Math.abs(i[o])<qv[o]&&(s[o]=t[o],i[o]=0)}return n=Object.freeze(s),wa.some(o=>n[o]!==e[o])},snapshot(r=1){if(!n||!e||r===1)return n;const s=Math.max(0,Math.min(1,r));return Object.freeze({scale:e.scale+(n.scale-e.scale)*s,originX:e.originX+(n.originX-e.originX)*s,originY:e.originY+(n.originY-e.originY)*s,layerRise:n.layerRise})}}}const cn=Object.freeze({stepMs:200,contact:.65,turnMs:80,stopMs:700,reducedStepMs:80,reducedTurnMs:60,reducedStopMs:70}),Dc=Object.freeze({victoryDelayMs:100,failureDelayMs:600,ribbonMs:250,shineDelayMs:300,shineMs:250,fadeMs:180}),Ra=n=>n*n*(3-2*n);function Nc(n){if(!n)return 0;const e=Vi[n];return Math.atan2(-(e.u+e.v),e.u-e.v)}function $v(n={}){let e=[],t=0,i=0,r=0,s=!1,a=!1,o=!1,l=!1,c=1,f=!1,h=[],d=[],u=[],g=Object.freeze({active:!1,elapsedMs:0,durationMs:0,stacks:[]});function _(){if(!a||!e.length)return Object.freeze({active:!1,elapsedMs:t,durationMs:i,stacks:d});const x=f?i-t:t;if(f&&t===0)return Object.freeze({active:!0,elapsedMs:t,durationMs:i,stacks:h});let T=0;for(const E of e){const P=Math.max(0,Math.min(1,(x-T)/E.duration));if(P<1){if(E.kind==="stop"&&E.stackId){const N=E.from.map(I=>I.id===E.stackId?{...I,...l?{}:Cc(I.height,P*E.duration*c),arrowScale:E.retainsArrow?1:1-Ra(Math.min(1,P*E.duration*c/80))}:I);return Object.freeze({active:!0,elapsedMs:t,durationMs:i,stacks:N,event:"stop"})}if(E.kind==="turn"&&E.stackId&&E.direction){const N=E.from.find(J=>J.id===E.stackId);let I=Nc(E.direction)-Nc(N?.launchDirection);I=Math.atan2(Math.sin(I),Math.cos(I));const H=E.from.map(J=>J.id===E.stackId?{...J,turnRotation:I*Ra(P)}:J);return Object.freeze({active:!0,elapsedMs:t,durationMs:i,stacks:H,event:"turn"})}if(E.kind!=="move"||!E.stackId||!E.start||!E.end)return Object.freeze({active:!0,elapsedMs:t,durationMs:i,stacks:E.from,event:E.kind});const S=Math.min(1,P/cn.contact),b=Ra(S),C=P>=cn.contact,L=E.heightTo-E.heightFrom,U=E.from.flatMap(N=>{if(N.id===E.absorbedId&&C)return[];if(N.id!==E.stackId)return[N];const I=C?E.heightTo:E.heightFrom,H=L>0?Math.max(3,L*.75):1.1,J=C?0:L*b+(l?0:4*H*b*(1-b));return[{...N,u:E.start.u+(E.end.u-E.start.u)*b,v:E.start.v+(E.end.v-E.start.v)*b,height:I,lift:J,collecting:!!E.absorbedId&&!C,...!l&&C&&L?Cc(I,(P-cn.contact)*E.duration*c):{}}]});return Object.freeze({active:!0,elapsedMs:t,durationMs:i,stacks:U,event:E.absorbedId&&C?"merge":"move"})}T+=E.duration}return Object.freeze({active:!1,elapsedMs:t,durationMs:i,stacks:e.at(-1)?.to??d})}function p(x){if(o)return;A(),r=x.generationId,f=!!x.reverse,l=!!x.reducedMotion,c=Math.max(.25,Math.min(3,x.speed??1)),d=x.stacks.map(D=>({...D}));let T=d.map(D=>({...D,...D.u===x.steps[0]?.from.u&&D.v===x.steps[0]?.from.v?{launchDirection:x.steps[0].direction}:{}}));const E=[],P=[];let S=0;const b=D=>{E.push(D),T=D.to.map(q=>({...q}))};x.steps.forEach((D,q)=>{const te=T.find(pe=>pe.u===D.from.u&&pe.v===D.from.v);if(!te)return;const Q=D.absorbed?T.find(pe=>pe.u===D.to.u&&pe.v===D.to.v):void 0,ee=T;let le=T.filter(pe=>pe.id!==Q?.id).map(pe=>pe.id===te.id?{...pe,u:D.to.u,v:D.to.v,height:D.movingHeightAfter}:pe);const Ue=(l?cn.reducedStepMs:cn.stepMs)/c;b({kind:"move",duration:Ue,from:ee,to:le,stackId:te.id,start:D.from,end:D.to,heightFrom:D.movingHeightBefore,heightTo:D.movingHeightAfter,...Q?{absorbedId:Q.id}:{}}),D.absorbed&&P.push(Object.freeze({atMs:S+Ue*cn.contact,cue:"merge"})),S+=Ue;const ye=x.events.find(pe=>pe.type==="turn"&&pe.stepIndex===q);if(ye?.type==="turn"&&ye.direction!==te.launchDirection){P.push(Object.freeze({atMs:S,cue:"turn"}));const pe=T.map(Y=>Y.id===te.id?{...Y,launchDirection:ye.direction}:Y),X=(l?cn.reducedTurnMs:cn.turnMs)/c;b({kind:"turn",duration:X,from:T,to:pe,stackId:te.id,direction:ye.direction}),S+=X}});const C=(l?cn.reducedStopMs:cn.stopMs)/c,L=x.steps.length?d.find(D=>D.u===x.steps[0]?.from.u&&D.v===x.steps[0]?.from.v)?.id:void 0,U=T.find(D=>D.id===L)?.id??L;Math.max(0,...T.map(D=>D.height))>=3&&P.push(Object.freeze({atMs:S+Math.min(120/c,C),cue:"settle"}));const N=x.steps.at(-1),H=(N?.absorbed?d.find(D=>D.u===N.to.u&&D.v===N.to.v&&D.id!==U):void 0)?.launchDirection,J=T.map(D=>D.id===U?{id:D.id,u:D.u,v:D.v,height:D.height,...H?{launchDirection:H}:{}}:D),ie=H?T.map(D=>D.id===U?{...D,launchDirection:H}:D):T;E.push({kind:"stop",duration:C,from:ie,to:J,retainsArrow:!!H,...U?{stackId:U}:{}}),h=x.finalStacks??J,u=Object.freeze(f?[]:P.sort((D,q)=>D.atMs-q.atMs)),e=E,t=0,i=E.reduce((D,q)=>D+q.duration,0),a=!0,s=!1,g=_(),e.length||m()}function m(){a&&(a=!1,t=i,g=Object.freeze({active:!1,elapsedMs:t,durationMs:i,stacks:f?d:h}),n.onComplete?.(r))}function y(x){if(o||!a||s||!Number.isFinite(x)||x<=0)return g;const T=t;t=Math.min(i,t+x*1e3);for(const E of u)if(E.atMs>T&&E.atMs<=t)try{n.onCue?.(E.cue)}catch{}return g=_(),t>=i&&m(),g}function A(){a=!1,s=!1,e=[],t=0,i=0,d=[],h=[],u=[],f=!1,g=Object.freeze({active:!1,elapsedMs:0,durationMs:0,stacks:[]})}return Object.freeze({start:p,update:y,snapshot:()=>g,pause(x){s=x},reset:A,dispose(){o||(A(),o=!0)}})}const ei="white-tower.save.v1";function Kv(){return new Promise((n,e)=>{if(typeof indexedDB>"u"){e(new Error("IndexedDB unavailable"));return}const t=indexedDB.open("white-tower",1);t.onupgradeneeded=()=>{t.result.objectStoreNames.contains("save")||t.result.createObjectStore("save")},t.onerror=()=>e(t.error??new Error("IndexedDB open failed")),t.onsuccess=()=>{const i=t.result;n({mode:"indexeddb",read:()=>new Promise((r,s)=>{const o=i.transaction("save","readonly").objectStore("save").get(ei);o.onsuccess=()=>r(o.result),o.onerror=()=>s(o.error)}),write:r=>new Promise((s,a)=>{const o=i.transaction("save","readwrite");o.objectStore("save").put(r,ei),o.oncomplete=()=>s(),o.onerror=o.onabort=()=>a(o.error??new Error("IndexedDB write failed"))}),clear:()=>new Promise((r,s)=>{const a=i.transaction("save","readwrite");a.objectStore("save").delete(ei),a.oncomplete=()=>r(),a.onerror=a.onabort=()=>s(a.error??new Error("IndexedDB clear failed"))})})}})}function Zv(){if(typeof localStorage>"u")throw new Error("localStorage unavailable");const n=`${ei}.probe`;return localStorage.setItem(n,"1"),localStorage.removeItem(n),{mode:"localStorage",async read(){const e=localStorage.getItem(ei);return e===null?void 0:JSON.parse(e)},async write(e){localStorage.setItem(ei,JSON.stringify(e))},async clear(){localStorage.removeItem(ei)}}}function Jv(n={}){const e=n.adapters??[Kv,Zv];let t={mode:"memory",async read(){return r},async write(d){r=d}},i=-1,r,s="memory",a=Promise.resolve(),o="";const l=(async()=>{for(let d=0;d<e.length;d++)try{const u=await e[d]();await u.read(),t=u,i=d,s=u.mode;break}catch(u){o=u instanceof Error?u.message:String(u)}return s})();async function c(){await l;try{const d=await t.read();return r=d,d}catch(d){o=d instanceof Error?d.message:String(d);for(let u=i+1;u<e.length;u++)try{const g=await e[u](),_=await g.read();return t=g,i=u,s=g.mode,r=_,_}catch(g){o=g instanceof Error?g.message:String(g)}return t={mode:"memory",async read(){return r},async write(u){r=u}},s="memory",r}}function f(d){return a=a.then(async()=>{await l,r=d;try{await t.write(d)}catch(u){o=u instanceof Error?u.message:String(u);let g=!1;for(let _=i+1;_<e.length;_++)try{const p=await e[_]();await p.read(),await p.write(d),t=p,i=_,s=p.mode,g=!0;break}catch(p){o=p instanceof Error?p.message:String(p)}g||(t={mode:"memory",async read(){return r},async write(_){r=_}},i=e.length,s="memory")}}),a}function h(){return a=a.then(async()=>{await l,r=void 0;try{await t.clear?.();return}catch(d){o=d instanceof Error?d.message:String(d)}for(let d=i+1;d<e.length;d++)try{const u=await e[d]();await u.read(),await u.clear?.(),t=u,i=d,s=u.mode;return}catch(u){o=u instanceof Error?u.message:String(u)}t={mode:"memory",async read(){return r},async write(d){r=d},async clear(){r=void 0}},i=e.length,s="memory"}),a}return Object.freeze({ready:l,read:c,write:f,clear:h,mode:()=>s,memoryOnly:()=>s==="memory",unavailableReason:()=>o,flush:()=>a})}const Jo=1,Qv=new Set(["SE","SW","NW","NE","E","W","N","S"]),_r=n=>typeof n=="object"&&n!==null&&!Array.isArray(n);function $u(n){return Object.freeze({schemaVersion:Jo,...n})}function ts(n,e,t){if(!_r(n)||n.schemaVersion!==Jo||!["1.0.0","1.1.0","1.2.0","1.3.0"].includes(String(n.contentVersion))||typeof n.selectedLevelId!="string")return n;const i=e.levels.find(r=>r.id===n.selectedLevelId);if(!i)return n;if(n.levelChecksum!==i.sha256){if(!t||t.id!==i.id)return n;const r={...n,contentVersion:e.contentVersion,levelChecksum:i.sha256,committedState:Pa(t),history:[]};return Ao(r,e,new Map([[t.id,t]])).ok?r:n}return{...n,contentVersion:e.contentVersion}}function Uc(n,e){if(!_r(n)||n.levelId!==e.id||!Number.isSafeInteger(n.moveCount)||Number(n.moveCount)<0||!Array.isArray(n.stacks)||!n.stacks.length)return!1;let t=0;const i=new Set,r=new Set(e.cells.map(s=>`${s.u},${s.v}`));for(const s of n.stacks){if(!_r(s)||!Number.isSafeInteger(s.u)||!Number.isSafeInteger(s.v)||!Number.isSafeInteger(s.height)||Number(s.height)<1||!r.has(`${s.u},${s.v}`)||typeof s.id!="string"||!s.id||s.launchDirection!==void 0&&!Qv.has(String(s.launchDirection)))return!1;const a=`${s.u},${s.v}`;if(i.has(a))return!1;i.add(a),t+=Number(s.height)}return t===e.totalTiles}function Ao(n,e,t){if(!_r(n))return{ok:!1,reason:"Save must be an object."};if(n.schemaVersion!==Jo)return{ok:!1,reason:`Unsupported save schema: ${String(n.schemaVersion)}.`};if(n.contentVersion!==e.contentVersion||typeof n.selectedLevelId!="string")return{ok:!1,reason:"Save content version or selected level is invalid."};const i=e.levels.find(s=>s.id===n.selectedLevelId),r=t.get(n.selectedLevelId);return!i||!r||n.levelChecksum!==i.sha256?{ok:!1,reason:"Saved level checksum does not match current content."}:!Number.isSafeInteger(n.unlockedLevel)||Number(n.unlockedLevel)<1||Number(n.unlockedLevel)>e.levels.length+1?{ok:!1,reason:"Unlocked level is outside the catalog."}:!Array.isArray(n.completedLevelIds)||n.completedLevelIds.some(s=>typeof s!="string"||!e.levels.some(a=>a.id===s))?{ok:!1,reason:"Completed levels contain unknown IDs."}:!_r(n.settings)||!Uc(n.committedState,r)||!Array.isArray(n.history)||n.history.length>50||n.history.some(s=>!Uc(s,r))?{ok:!1,reason:"Saved game state or undo history is invalid."}:{ok:!0,value:$u({contentVersion:n.contentVersion,levelChecksum:n.levelChecksum,selectedLevelId:n.selectedLevelId,unlockedLevel:Number(n.unlockedLevel),completedLevelIds:Object.freeze([...new Set(n.completedLevelIds)]),settings:Object.freeze({...n.settings}),committedState:n.committedState,history:Object.freeze(n.history.slice(-50))})}}const Ku={en:{"service.loading":"Loading level…","service.contentError":"Could not load White Tower content. Check the connection and retry.","service.graphicsError":"Graphics could not start. Try another browser or reload.","service.nextError":"Could not load the next level. Try again.","service.notReady":"Next level is not ready.","service.moreLevels":"More levels are coming soon.",settings:"Settings",back:"BACK TO GAME",levels:"Choose level",backSettings:"BACK TO SETTINGS",hint:"Hint",fail:"FAIL!",reducedMotion:"Reduce motion",language:"Language",highContrast:"High contrast",sound:"Sound effects",music:"Music",volume:"Volume",progress:"Campaign progress",clearProgress:"Clear progress",clearQuestion:"Clear all completed levels and saved attempts?",confirmClear:"CLEAR PROGRESS",cancel:"CANCEL",locked:"Locked",completed:"Completed",current:"Current level",memory:"Progress is temporary because browser storage is unavailable.",retry:"Retry storage",audioLater:"Short synthesized effects play after your first input.",level:"Level",undo:"BACK",next:"NEXT",win:"COMPLETED!",campaignComplete:"Campaign complete. Choose any unlocked level.",chooseLevel:"CHOOSE LEVEL",tapHighlighted:"Tap the highlighted arrow",searching:"Searching for a safe move…",hintTimeout:"Search timed out. You can try Undo; no dead end was proven.",noSolution:"No solution exists from this state.",searchingPrevious:"Checking whether the previous move can be undone…","action.undo":"UNDO","action.next":"NEXT","win.title":"LEVEL COMPLETED!","tutorial.tap":"Tap the arrow","hint.undo":"Undo the last move","game.stuck":"Try undoing a move","action.retry":"Retry","hint.loading":"Searching for a safe move…","a11y.selection":"Selected stack {index} of {count}.","a11y.move":"Move started.","a11y.undo":"Move undone.","a11y.restart":"Level restarted.","a11y.menu":"Settings opened. Press Escape to return to the game."},ru:{"service.loading":"Загрузка уровня…","service.contentError":"Не удалось загрузить игру. Проверьте соединение и повторите попытку.","service.graphicsError":"Не удалось запустить графику. Попробуйте другой браузер или повторите загрузку.","service.nextError":"Не удалось загрузить следующий уровень. Повторите попытку.","service.notReady":"Следующий уровень ещё не готов.","service.moreLevels":"Новые уровни скоро появятся.",settings:"Настройки",back:"ВЕРНУТЬСЯ В ИГРУ",levels:"Выбор уровня",backSettings:"К НАСТРОЙКАМ",hint:"Подсказка",fail:"НЕУДАЧА!",reducedMotion:"Уменьшить движение",language:"Язык",highContrast:"Высокая контрастность",sound:"Звуковые эффекты",music:"Музыка",volume:"Громкость",progress:"Прогресс кампании",clearProgress:"Сбросить прогресс",clearQuestion:"Удалить пройденные уровни и сохранённые попытки?",confirmClear:"СБРОСИТЬ ПРОГРЕСС",cancel:"ОТМЕНА",locked:"Закрыт",completed:"Пройден",current:"Текущий уровень",memory:"Прогресс временный: хранилище браузера недоступно.",retry:"Повторить загрузку",audioLater:"Короткие синтезированные звуки включаются после первого действия.",level:"Уровень",undo:"НАЗАД",next:"ДАЛЕЕ",win:"ПРОЙДЕН!",campaignComplete:"Кампания пройдена. Выберите открытый уровень.",chooseLevel:"ВЫБРАТЬ УРОВЕНЬ",tapHighlighted:"Нажмите на выделенную стрелку",searching:"Ищу безопасный ход…",hintTimeout:"Поиск не завершился. Можно отменить ход; тупик не доказан.",noSolution:"Из этого состояния решения нет.",searchingPrevious:"Проверяю, можно ли отменить предыдущий ход…","action.undo":"НАЗАД","action.next":"ДАЛЕЕ","win.title":"УРОВЕНЬ ПРОЙДЕН!","tutorial.tap":"Нажмите на стрелку","hint.undo":"Отмените последний ход","game.stuck":"Попробуйте отменить ход","action.retry":"Повторить","hint.loading":"Ищу безопасный ход…","a11y.selection":"Выбрана стопка {index} из {count}.","a11y.move":"Ход запущен.","a11y.undo":"Ход отменён.","a11y.restart":"Уровень перезапущен.","a11y.menu":"Настройки открыты. Нажмите Escape, чтобы вернуться в игру."}};function jv(n,e){return Ku[n][e]}function $e(n,e){return Ku.en[e]}function Ci(n){const e=typeof n=="object"&&n!==null?n:{};return Object.freeze({language:"en",reducedMotion:e.reducedMotion===!0,highContrast:e.highContrast===!0,soundEnabled:e.soundEnabled!==!1,musicEnabled:typeof e.musicEnabled=="boolean"?e.musicEnabled:e.soundEnabled!==!1,soundVolume:typeof e.soundVolume=="number"&&Number.isFinite(e.soundVolume)?Math.max(0,Math.min(1,e.soundVolume)):.4,tutorialCompleted:e.tutorialCompleted===!0})}const er=(n,e)=>({status:"cancelled",requestId:n,generationId:e,explored:0,elapsedMs:0});function e_(n=()=>new Worker(new URL("/White-Tower-Play/assets/solver-worker-DPcwYnWJ.js",import.meta.url),{type:"module"})){let e,t=0,i=!1;const r=new Map;function s(h){for(const[d,u]of r)u.resolve(h?{status:"error",requestId:d,generationId:u.generationId,explored:0,elapsedMs:0,message:h}:er(d,u.generationId));r.clear()}function a(){return e||(e=n(),e.onmessage=h=>{const d=h.data,u=r.get(d.requestId);u&&(r.delete(d.requestId),u.generationId!==t||d.generationId!==t?u.resolve(er(d.requestId,u.generationId)):u.resolve(d))},e.onerror=h=>s(h.message||"Solver worker failed."),e)}function o(h,d,u){return i?Promise.resolve(er(u.requestId,u.generationId)):!u.requestId||!Number.isFinite(u.budgetMs)||u.budgetMs<0?Promise.resolve({status:"error",requestId:u.requestId,generationId:u.generationId,explored:0,elapsedMs:0,message:"Invalid request options."}):u.generationId<t?Promise.resolve(er(u.requestId,u.generationId)):(u.generationId>t&&c(u.generationId),r.has(u.requestId)?Promise.resolve({status:"error",requestId:u.requestId,generationId:u.generationId,explored:0,elapsedMs:0,message:"Duplicate request ID."}):new Promise(g=>{r.set(u.requestId,{generationId:u.generationId,resolve:g});try{a().postMessage({type:"solve",requestId:u.requestId,generationId:u.generationId,budgetMs:u.budgetMs,level:h,state:d})}catch(_){r.delete(u.requestId),g({status:"error",requestId:u.requestId,generationId:u.generationId,explored:0,elapsedMs:0,message:_ instanceof Error?_.message:String(_)})}}))}function l(h){if(!(!r.has(h)||!e))try{e.postMessage({type:"cancel",requestId:h})}catch{}}function c(h){if(!(i||h<=t)){t=h;for(const[d,u]of r)if(u.generationId!==t){try{e?.postMessage({type:"cancel",requestId:d})}catch{}u.resolve(er(d,u.generationId)),r.delete(d)}}}function f(){i||(i=!0,s(),e?.terminate(),e=void 0)}return Object.freeze({solve:o,cancel:l,invalidate:c,dispose:f})}const ns=Object.freeze({kind:"idle"});function t_(n,e){let t=0,i=0,r="",s,a=!1;function o(){a||(s!==void 0&&clearTimeout(s),s=void 0,r&&n.cancel(r),r="",t++,n.invalidate(t),e(ns))}async function l(f,h,d){if(a)return;o();const u=t,g=performance.now(),_=`hint-${++i}`;r=_,e({kind:"idle"}),s=setTimeout(()=>{!a&&t===u&&r&&e({kind:"searching"})},300);const p=()=>!a&&t===u;try{const m=await n.solve(f,h,{requestId:_,generationId:u,budgetMs:2e3});if(!p())return;if(m.status==="solved"){s!==void 0&&clearTimeout(s),s=void 0;const y=m.path[0];e(y?{kind:"move",move:y}:ns),r="";return}if(m.status==="unsolvable"){const y=d.at(-1),A=Math.max(0,2e3-(performance.now()-g));if(!y||A<=0){s!==void 0&&clearTimeout(s),s=void 0,e({kind:"deadlock"}),r="";return}s===void 0&&e({kind:"searching"});const x=`hint-${i}-undo`;r=x;const T=await n.solve(f,y,{requestId:x,generationId:u,budgetMs:A});if(!p())return;s!==void 0&&clearTimeout(s),s=void 0,T.status==="solved"?e({kind:"undo-proven"}):T.status==="unsolvable"?e({kind:"deadlock"}):T.status==="timeout"?e({kind:"undo-suggestion"}):e(T.status==="cancelled"?ns:{kind:"error"}),r="";return}s!==void 0&&clearTimeout(s),s=void 0,m.status==="timeout"?e(d.length?{kind:"undo-suggestion"}:{kind:"timeout"}):e(m.status==="cancelled"?ns:{kind:"error"}),r=""}catch{p()&&(e({kind:"error"}),r="")}}function c(){a||(o(),a=!0)}return Object.freeze({request:l,cancel:o,dispose:c})}function n_(n,e="webgl",t={}){const i=t.audio,r=t.analytics;let s=0;const a=new Set;function o(w,O={}){const G=u.snapshot();r?.track(w,{...r.context(),level_id:G.level?.id??null,content_version:y?.contentVersion??null,active_ms:Math.round(s*1e3),move_count:G.committedState?.moveCount??0,...O})}function l(w=!0,O=!1){s=0,A&&y&&r?.beginAttempt(A.id,y.contentVersion,O,w)}function c(w){const O=r?.context().attempt_id;w.phase==="Won"&&O&&!a.has(O)&&(a.add(O),o("wt_level_completed"),y?.levels.at(-1)?.id===w.level?.id&&o("wt_campaign_completed"))}let f=n,h=Ic(n,{mode:e}),d=h.renderer;const u=Od(),g=Jv();let _=Promise.resolve();const p=$v({onCue:w=>i?.play(w),onComplete:w=>{const O=u.snapshot().animation?.reverse,G=u.finishAnimation(w);G.phase==="Won"&&!O&&(i?.play("victory"),c(G)),Fe(G),Te(),oe(G)}});function m(w){const O=w.animation;p.start({stacks:O.sourceState.stacks,steps:O.steps,events:O.events,generationId:w.generationId,reducedMotion:Q.reducedMotion,reverse:O.reverse,finalStacks:O.nextState.stacks}),Ge(p.snapshot().stacks,w)}let y,A,x=0,T=0,E,P,S;const b=Yv();let C=!1,L=!1,U=!1,N,I=!1,H="",J=0,ie,D=!1,q=1,Q=Ci({reducedMotion:typeof window<"u"&&!!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches}),ee=0,le=!1,Ue=Object.freeze({kind:"idle"}),ye,pe=0,X;const Y=e_(),se=t_(Y,w=>{if(!L)if(Ue=w,w.kind!=="idle"&&w.kind!=="searching"&&o("wt_hint_result",{result:w.kind}),ye=void 0,pe=["move","undo-proven","undo-suggestion","deadlock","timeout","error"].includes(w.kind)?2.5:0,w.kind==="move"){const O=ke().find(G=>G.u===w.move.u&&G.v===w.move.v);O&&(ye=O.id,it(O.id))}else u.snapshot().phase!=="Animating"&&Fe()});function _e(){X!==void 0&&clearTimeout(X),X=void 0}function oe(w=u.snapshot()){if(_e(),w.phase!=="Idle"||!w.committedState||w.committedState.stacks.length<2||ke(w).length)return;const O=w.generationId;X=setTimeout(()=>{X=void 0;const G=u.snapshot();L||G.phase!=="Idle"||G.generationId!==O||ke(G).length||(Ue=Object.freeze({kind:"deadlock"}),pe=2,o("wt_deadlock"))},600)}function Se(){let w=u.snapshot();return w.phase==="Menu"&&(w=u.closeMenu(),Fe(w)),w.phase!=="Idle"||!w.level||!w.committedState?!1:(_e(),o("wt_hint_requested"),se.request(w.level,w.committedState,u.historySnapshot()),i?.play("hint"),!0)}function Ne(){Q.tutorialCompleted||(Q=Ci({...Q,tutorialCompleted:!0}),le=!1)}function Te(){const w=u.snapshot(),O=y?.levels.find(ue=>ue.id===w.level?.id);if(!O||!w.level||!w.committedState)return _;const G=w.completedLevelIds;let z=1;for(;z<=y.levels.length&&G.includes(y.levels[z-1]?.id??"");)z++;q=Math.max(q,z);const Z=$u({contentVersion:y.contentVersion,levelChecksum:O.sha256,selectedLevelId:w.level.id,unlockedLevel:q,completedLevelIds:G,settings:Q,committedState:w.committedState,history:u.historySnapshot()});return _=g.write(Z),_}function ke(w=u.snapshot()){if(w.phase!=="Idle"||!w.level||!w.displayedState)return[];const O=new Map(w.level.cells.map(z=>[`${z.u},${z.v}`,z])),G=E??fn(w.level,w.displayedState.stacks);return w.displayedState.stacks.filter(z=>!!z.launchDirection||O.get(`${z.u},${z.v}`)?.kind==="redirect").map(z=>({stack:z,center:vs(z.u,z.v,z.height-1,G)})).sort((z,Z)=>z.center.y-Z.center.y||z.center.x-Z.center.x||z.stack.id.localeCompare(Z.stack.id)).map(({stack:z})=>z)}function Fe(w=u.snapshot()){if(!w.level||!w.committedState||L)return;T++;const O=ke(w);O.length&&!O.some(Z=>Z.id===N)&&(N=O[0]?.id);const G=U?{...w.committedState,stacks:[{...w.committedState.stacks[0],height:w.level.totalTiles}]}:w.committedState,z=fn(w.level,G.stacks);S!==w.level?(S=w.level,b.reset(z),E=z):b.target(z),d.setView({...Cr(w.level,G,T,N,G.stacks,E),hintStackId:ye})}function Ge(w,O=u.snapshot()){if(!(!O.level||!O.committedState||L)){if(T++,P!==O.generationId||!E){P=O.generationId;const G=O.animation?.steps.flatMap(z=>[z.from,z.to].map(Z=>({...Z,height:z.movingHeightAfter,lift:Math.max(3,z.movingHeightAfter*.75)})))??[];b.target(fn(O.level,[...O.displayedState.stacks,...O.committedState.stacks,...G]))}d.setView(Cr(O.level,O.committedState,T,N,w,E))}}function it(w){return ke().some(O=>O.id===w)?(N=w,Fe(),!0):!1}function _t(w){if(D||!h.supported)return!1;const O=ke().find(z=>z.id===w);if(!O)return!1;N=w,_e();const G=u.launch({u:O.u,v:O.v});return G.phase!=="Animating"?!1:(ye===w&&o("wt_hint_applied"),G.committedState.moveCount===1&&r?.track("wt_first_move",{...r.context(),active_ms:Math.round(s*1e3)},"first:"+r.context().attempt_id),o("wt_move_accepted",{input:matchMedia("(pointer:coarse)").matches?"touch":"pointer"}),i?.play("launch"),se.cancel(),Ne(),Te(),m(G),!0)}function Ct(){const w=u.snapshot();return se.cancel(),le=!1,w.phase==="Menu"?(Fe(u.closeMenu()),o("wt_menu_closed"),i?.play("ui"),!0):w.phase==="Idle"||w.phase==="Won"?(Fe(u.openMenu()),o("wt_menu_opened"),i?.play("ui"),!0):!1}function lt(w){const O=u.snapshot(),G=O.displayedState?.stacks.find(z=>z.id===w);if(!(!G||!O.level))return ss(vs(G.u,G.v,G.height-1,E??fn(O.level,O.displayedState.stacks)))}function ht(w){const O=u.snapshot();if(L||!["webgl","unsupported"].includes(w)||!["Idle","Won","Menu"].includes(O.phase))return!1;const G=Ic(f,{mode:w,replaceCanvas:!0}),z=d;return D=!1,h=G,d=G.renderer,f=G.canvas,B(),z?.dispose(),Fe(O),!0}function B(){d?.setContextCallbacks?.({lost(){L||(D=!0,o("wt_graphics_lost"),b.synchronize(E),H="Graphics context lost. Attempting to restore the current board.",Te())},restored(){o("wt_graphics_restored"),!L&&(D=!1,H="",u.snapshot().phase==="Animating"?Ge(p.snapshot().stacks):Fe(u.snapshot()))}})}async function mt(w){if(!y||L)throw new Error("Каталог ещё загружается.");const O=++J;ie?.abort(),ie=new AbortController;const G=ie;p.reset(),se.cancel(),ee=0,le=!1,_e();const z=u.snapshot();z.phase==="Animating"&&Fe(u.finishAnimation(z.generationId));const Z=await rs(y,w,fetch,G.signal);L||O!==J||(A=Z,U=!1,Fe(u.loadLevel(A)),l(),await Te(),oe(u.snapshot()))}async function Qe(w){const O=y?.levels.findIndex(G=>G.id===w)??-1;return O<0||O+1>q||!["Menu","Idle","Won"].includes(u.snapshot().phase)?!1:(await mt(w),!0)}function R(w){return Q=Ci({...Q,...w}),o("wt_settings_changed",{sound:Q.soundEnabled,music:Q.musicEnabled}),i?.configure(Q),Te(),Q}async function v(){return L||!y?!1:(await g.clear(),u.restoreCompleted([]),q=1,H="",await mt(y.levels[0].id),!0)}async function V(){const w=u.snapshot();if(L||w.phase!=="Won"||I)return{advanced:!1,message:$e(Q.language,"service.notReady")};const O=y?.levels.findIndex(z=>z.id===w.level?.id)??-1,G=y?.levels[O+1];if(!G)return{advanced:!1,message:$e(Q.language,"service.moreLevels")};I=!0;try{return await _,o("wt_next_level_requested"),await mt(G.id),o("wt_next_level_started"),{advanced:!0}}catch{return o("wt_content_error",{stage:"next"}),{advanced:!1,message:$e(Q.language,"service.nextError")}}finally{I=!1}}B();const j=(t.catalogReady??Vc()).then(async w=>{if(L)return;y=w,await g.ready;const O=await g.read();let G=ts(O,y);const z=G&&typeof G=="object"&&"selectedLevelId"in G&&typeof G.selectedLevelId=="string"?G.selectedLevelId:y.levels[0]?.id,Z=y.levels.some(Me=>Me.id===z)?y.levels.find(Me=>Me.id===z):y.levels[0];if(!Z)throw new Error("Catalog has no starting level.");if(A=await rs(y,Z.id),L)return;if(G=ts(O,y,A),Fe(u.loadLevel(A)),G!==void 0){const Me=Ao(G,y,new Map([[A.id,A]]));if(Me.ok)q=Me.value.unlockedLevel,Q=Ci(Me.value.settings),G!==O&&G.committedState!==O?.committedState&&(H=Q.language==="ru"?"Уровень обновлён. Попытка начата заново; прогресс и настройки сохранены.":"Level updated. This attempt was restarted; campaign progress and settings are preserved."),u.restoreCompleted(Me.value.completedLevelIds),u.restoreAttempt(Me.value.committedState,Me.value.history);else if(H=Q.language==="ru"?`Сохранение не восстановлено: ${Me.reason}`:`Save could not be restored: ${Me.reason}`,typeof G=="object"&&G!==null&&!Array.isArray(G)){const ce=G;Q=Ci(ce.settings);const de=Array.isArray(ce.completedLevelIds)?ce.completedLevelIds.filter(Ce=>typeof Ce=="string"&&y.levels.some(De=>De.id===Ce)):[];u.restoreCompleted(de),Number.isSafeInteger(ce.unlockedLevel)&&ce.unlockedLevel>=1&&ce.unlockedLevel<=y.levels.length+1&&(q=ce.unlockedLevel)}}if(Fe(u.snapshot()),(G===void 0||G!==O||G?.settings?.rendererMode!==void 0)&&Te(),(Q.tutorialCompleted||u.snapshot().committedState?.moveCount)&&(le=!1,Q.tutorialCompleted||(Ne(),Te())),oe(u.snapshot()),(await Y.solve(A,u.snapshot().committedState,{requestId:"startup-warmup",generationId:0,budgetMs:0})).status==="error")throw new Error("Could not prepare hint worker.");return l(!0,G!==void 0),A});return Object.freeze({ready:j,startAnalytics:l,resourceReady:()=>d.ready??Promise.resolve(),contentVersion:()=>y?.contentVersion,get canvas(){return f},rendererInfo(){return Object.freeze({mode:h.mode,supported:h.supported&&!D,artwork:d.artworkStatus?.(),message:D?"Восстанавливаем графику Three.js…":h.message})},setRendererMode:ht,selectableStacks:ke,selectedStackId(){return N},pointForStack:lt,selectStack:it,launchStack:_t,toggleMenu:Ct,update(w){if(D||!h.supported)return;x+=w,(u.snapshot().phase==="Idle"||u.snapshot().phase==="Animating")&&(s+=w);const O=b.update(w);d.setPresentationTime?.(x,Q.reducedMotion);const G=u.snapshot();G.phase==="Animating"?Ge(p.update(w).stacks):(O&&Fe(G),G.phase==="Idle"&&G.level?.id==="level-001"&&!Q.tutorialCompleted&&(ee+=w,ee>=2&&!le&&(le=!0,o("wt_tutorial_shown")))),pe>0&&(pe=Math.max(0,pe-w),pe||(Ue=Object.freeze({kind:"idle"})))},pause(w){C=w,b.synchronize(E),p.pause(w),w&&(se.cancel(),_e(),le=!1)},render(w){D||(!C&&w!==void 0&&(E=b.snapshot(w)),E&&d.setProjection?.(E),d.render())},resize(w){d.resize(w)},reset(){x=0,U=!1,p.reset(),E&&b.reset(E),se.cancel(),ee=0,le=!1,_e();const w=u.snapshot();if(w.phase==="Animating"&&u.finishAnimation(w.generationId),A){const O=u.restart();Fe(O),Te(),oe(O),O.attemptId!==w.attemptId&&(o("wt_restart"),l(),i?.play("restart"))}},async setLevelById(w){return mt(w)},async selectLevel(w){return Qe(w)},updateSettings:R,async clearProgress(){return v()},async exportProgress(){await _;const w=await g.read();if(!w)throw new Error("No saved progress to export.");return JSON.stringify(w,null,2)},async importProgress(w){if(L||!y||u.snapshot().phase==="Animating")return!1;const O=ts(w,y);if(!O||typeof O!="object"||typeof O.selectedLevelId!="string")return!1;const G=await rs(y,O.selectedLevelId),z=ts(w,y,G),Z=Ao(z,y,new Map([[G.id,G]]));return!Z.ok||L?!1:(J++,ie?.abort(),p.reset(),se.cancel(),_e(),A=G,q=Z.value.unlockedLevel,Q=Ci(Z.value.settings),H=z!==w&&z.committedState!==w?.committedState?Q.language==="ru"?"Уровень обновлён. Попытка начата заново; прогресс и настройки сохранены.":"Level updated. This attempt was restarted; campaign progress and settings are preserved.":"",u.loadLevel(G),u.restoreCompleted(Z.value.completedLevelIds),u.restoreAttempt(Z.value.committedState,Z.value.history),i?.configure(Q),l(!1),o("wt_progress_imported"),Fe(u.snapshot()),_=g.write({...Z.value,settings:Q},{replace:!0}),await _,!0)},async nextLevel(){return V()},debugLoadLevel(w){const O=zc(w);if(!O.ok)throw new Error(`Invalid debug level: ${O.errors.map(z=>z.message).join(" ")}`);A=O.value,se.cancel(),_e(),ee=0,le=!1,U=!1,p.reset();const G=u.loadLevel(A);return Fe(G),oe(G),G},setTowerDemo(w){if(!A)return!1;U=!0;const O=u.snapshot();if(O.level&&O.committedState){const G=O.committedState.stacks[0];if(G){T++;const z={...O.committedState,stacks:[{...G,height:Math.max(1,Math.min(w??A.totalTiles,A.totalTiles))}]};E=fn(O.level,z.stacks),b.reset(E),d.setView(Cr(O.level,z,T,void 0,z.stacks,E))}}return!0},snapshot(){const w=u.snapshot(),O=y?.levels.findIndex(Z=>Z.id===w.level?.id)??-1,G=w.level?new Map(w.level.cells.filter(Z=>Z.kind==="redirect").map(Z=>[`${Z.u},${Z.v}`,Z.direction])):new Map,z=w.level&&w.committedState?w.committedState.stacks.filter(Z=>!!Z.launchDirection||G.has(`${Z.u},${Z.v}`)).map(Z=>({stack:Z,direction:G.get(`${Z.u},${Z.v}`)??Z.launchDirection??"unknown"})):[];return{elapsed:x,loaded:!!A,levelId:A?.id??null,...w,selectedStackId:N,hintStackId:ye,activeStacks:z,levelNumber:O>=0?O+1:1,levelCount:y?.levels.length??0,unlockedLevel:q,settings:Q,tutorialVisible:le&&w.phase==="Idle",hintView:Ue,persistence:{memoryOnly:g.memoryOnly(),recoveryNotice:H}}},presentationSnapshot(){return p.snapshot()},cameraProjection(){return E},foundationScreenBounds(){if(!A||!E)return;const w=qc(A,[]),O=E,G=ss({x:O.originX+w.minX*O.scale,y:O.originY+w.minY*O.scale}),z=ss({x:O.originX+w.maxX*O.scale,y:O.originY+w.maxY*O.scale});return{left:G.x,top:G.y,right:z.x,bottom:z.y}},resourceCounts(){return d.resourceCounts()},pickStack(w){const O=u.snapshot();if(O.phase!=="Idle"||!O.level||!O.displayedState)return;const G=d.pickStack(w,Cr(O.level,O.displayedState,T,N,O.displayedState.stacks,E));return G&&ke(O).some(z=>z.id===G)?G:void 0},debugLaunch(w){se.cancel(),_e();const O=u.launch(w);return O.phase==="Animating"?(i?.play("launch"),Ne(),Te(),m(O)):Fe(O),O},debugFinishAnimation(w){p.reset();const O=u.finishAnimation(w);return Fe(O),c(O),Te(),oe(O),O},requestHint:Se,undo(){if(D||!h.supported||!u.snapshot().canUndo)return u.snapshot();se.cancel(),_e();const w=u.undo();return o("wt_undo"),i?.play("undo"),w.phase==="Animating"?m(w):(Fe(w),oe(w)),Te(),w},persistenceInfo(){return Object.freeze({mode:g.mode(),memoryOnly:g.memoryOnly(),reason:g.unavailableReason(),recoveryNotice:g.conflicted?.()?g.unavailableReason():H})},flushPersistence(){return g.flush()},dispose(){L||(L=!0,J++,ie?.abort(),_e(),se.dispose(),Y.dispose(),p.dispose(),u.dispose(),d.dispose())}})}const i_={logo:new URL("/White-Tower-Play/assets/logo-complete-v2-D4e5VFCQ.webp",import.meta.url).href,campaignTower:new URL("/White-Tower-Play/assets/b8f38ee4420f545ba32ae12869c9adf2227413147ce09b4b6be3ab4fa10378a5-CT57OVdT.webp",import.meta.url).href,reset:new URL("/White-Tower-Play/assets/ee407d579e162a0a32a247f47ac12710c21e8175f232aa36198c88e3ea2e0296-guhVK0Tt.webp",import.meta.url).href,storage:new URL("/White-Tower-Play/assets/30f63edd181822983e49589be1c4f9becb8e56bcd28c9c3723325e865120316e-525rsojN.webp",import.meta.url).href,loading:new URL("/White-Tower-Play/assets/tower-CsHMknc1.webp",import.meta.url).href,graphics:new URL("/White-Tower-Play/assets/6ea4c11ab41c639395420a6cecef335aafb2c2474af119bbcaf141abf2c07c32-CwxROWA4.webp",import.meta.url).href};function ni(n,e){const t=document.createElement("img");return t.src=i_[n],t.className=e,t.alt="",n!=="logo"&&n!=="loading"&&(t.loading="lazy"),t.draggable=!1,t.setAttribute("aria-hidden","true"),t}function r_(n,e){const t=document.createElement("section");t.className="victory-layer",t.setAttribute("aria-label","Level completed"),t.innerHTML=`
    <div class="victory-shade" aria-hidden="true"></div>
    <div class="victory-ribbon" aria-live="polite"><span>LEVEL</span><span>COMPLETED!</span></div>
    <p class="campaign-end" role="status"></p>`,n.append(t),t.append(ni("campaignTower","campaign-tower"));const i=document.createElement("button");i.type="button",i.className="next-button",i.setAttribute("aria-label","Next level"),i.innerHTML="<span>NEXT</span>",n.append(i);const r=document.createElement("button");r.type="button",r.className="next-button victory-choose",r.addEventListener("click",e.chooseLevels),n.append(r);const s=document.createElement("button");s.type="button",s.className="victory-undo",s.setAttribute("aria-label","Undo last move"),s.innerHTML="<span>BACK</span>",n.append(s);const a=t.querySelector(".campaign-end");s.addEventListener("click",e.undo);let o=!1;const l=()=>o?e.retry():e.next();i.addEventListener("click",l);let c=-1,f=0,h=!1,d="",u="en",g=-1;function _(m,y,A=!1,x="",T=!1,E=!1,P=!1){o=E&&m.phase==="Idle";const S=o?"Failed":m.phase;(S!==d||m.generationId!==c)&&(d=S,c=m.generationId,f=0,h=!1),(m.phase==="Won"||o)&&!h&&(f+=Math.max(0,Math.min(y,.1)),f*1e3>=(o?Dc.failureDelayMs:Dc.victoryDelayMs)&&(h=!0,o&&g!==c&&(g=c,e.failure?.())));const b=(m.phase==="Won"||o)&&h;n.parentElement?.classList.toggle("is-failed",b&&o),t.classList.toggle("is-failed",o),i.classList.toggle("is-failed",o),n.parentElement?.classList.toggle("is-campaign-complete",b&&T),t.classList.toggle("is-campaign-complete",T),t.classList.toggle("has-load-error",!!x),t.lang=u,t.setAttribute("aria-label",o?u==="ru"?"Нет доступных ходов":"No available moves":T?u==="ru"?"Кампания пройдена":"Campaign complete":u==="ru"?"Уровень пройден":"Level completed"),i.setAttribute("aria-label",o||x?$e(u,"action.retry"):u==="ru"?"Следующий уровень":"Next level"),r.setAttribute("aria-label",$e(u,"chooseLevel")),s.setAttribute("aria-label",u==="ru"?"Отменить последний ход":"Undo last move"),t.querySelector(".victory-ribbon span").textContent=o||T?"":u==="en"?"LEVEL":"УРОВЕНЬ";const C=t.querySelector(".victory-ribbon span:last-child");C.textContent=o?jv(u,"fail"):T?u==="ru"?"Кампания пройдена!":"Campaign complete!":$e(u,"win"),t.style.setProperty("--failure-title-size",`${Math.min(15,63/Math.max(1,C.textContent.length))}cqw`),i.querySelector("span").textContent=A?"…":o||x?$e(u,"action.retry"):$e(u,"next"),i.classList.toggle("has-load-error",!!x),i.classList.toggle("is-pending",A),r.textContent=$e(u,"chooseLevel"),s.querySelector("span").textContent=$e(u,"undo"),t.classList.toggle("is-visible",b),t.setAttribute("aria-hidden",String(!b)),i.hidden=!b,r.hidden=!b||!T&&!x,r.classList.toggle("error-choose",!T&&!!x),i.hidden=!b||T,s.hidden=!b,i.disabled=A||m.phase!=="Won"&&!o,s.disabled=!m.canUndo||m.phase!=="Won"&&!o,a.textContent=T?"All levels completed!":x}function p(){s.removeEventListener("click",e.undo),i.removeEventListener("click",l),r.removeEventListener("click",e.chooseLevels),t.remove(),r.remove(),i.remove(),s.remove()}return Object.freeze({update:_,setLanguage(m){u=m},dispose:p})}const Oc={lock:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10V7a5 5 0 0 1 10 0v3" fill="none" stroke="#99601d" stroke-width="4"/><path d="M7 9V7a5 5 0 0 1 10 0v2" fill="none" stroke="#ffe9a1" stroke-width="2.5"/><rect x="3" y="9" width="18" height="13" rx="4" fill="#b77b26"/><rect x="3" y="8" width="18" height="12" rx="4" fill="#ffd05e" stroke="#fff0ab"/><path d="M6 11h12" stroke="#fff3c1" stroke-width="2" stroke-linecap="round"/><path d="M12 13v4" stroke="#885014" stroke-width="3" stroke-linecap="round"/></svg>',completed:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 13 5 5L20 6" fill="none" stroke="#806a36" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="m4 11 5 5L20 4" fill="none" stroke="#fff7d9" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>'};function s_(n,e){const t=document.createElement("h3");t.id="level-select-title";const i=document.createElement("div");i.className="level-grid";const r=document.createElement("p");r.className="level-progress";const s=document.createElement("nav");s.className="level-pagination";const a=document.createElement("button");a.type="button",a.textContent="‹";const o=document.createElement("button");o.type="button",o.textContent="›";const l=document.createElement("span");l.setAttribute("role","status"),s.append(a,l,o);const c=document.createElement("button");c.type="button",c.className="menu-secondary",c.addEventListener("click",e.back),n.append(t,r,i,s,c);let f="en",h=[],d=1,u=[],g="",_="",p=0;a.addEventListener("click",()=>{p=Math.max(0,p-1),m(),(a.disabled?o:a).focus()}),o.addEventListener("click",()=>{p=Math.min(Math.max(0,Math.ceil(h.length/30)-1),p+1),m(),(o.disabled?a:o).focus()});function m(){t.textContent=$e(f,"levels"),c.textContent=$e(f,"backSettings"),i.replaceChildren(),r.textContent=f==="ru"?`${u.length} из ${h.length} пройдено`:`${u.length} of ${h.length} completed`,a.setAttribute("aria-label",f==="ru"?"Предыдущая страница уровней":"Previous levels page"),o.setAttribute("aria-label",f==="ru"?"Следующая страница уровней":"Next levels page"),a.disabled=p===0,o.disabled=(p+1)*30>=h.length,l.textContent=`${p*30+1}–${Math.min((p+1)*30,h.length)} / ${h.length}`;for(const y of h.slice(p*30,(p+1)*30)){const A=y.index<=d,x=u.includes(y.id),T=document.createElement("button");T.type="button",T.className="level-card",T.disabled=!A,T.setAttribute("aria-label",`${$e(f,"level")} ${y.index}${A?x?`, ${$e(f,"completed")}`:"":`, ${$e(f,"locked")}`}`),x&&T.classList.add("is-completed"),y.id===g&&T.classList.add("is-selected"),T.setAttribute("data-level",String(y.index));const E=document.createElement("span");E.className="level-number",E.textContent=String(y.index);const P=document.createElement("span");P.className="level-badge",P.setAttribute("aria-hidden","true"),P.innerHTML=x?Oc.completed:A?"":Oc.lock,T.append(E,P),T.addEventListener("click",()=>{A&&e.select(y.id)}),i.append(T)}}return Object.freeze({update(y){const A=JSON.stringify(y);if(A!==_){if(y.selectedLevelId!==g){const x=y.choices.findIndex(T=>T.id===y.selectedLevelId);p=Math.floor(Math.max(0,x)/30)}_=A,f=y.language,h=y.choices,d=y.unlockedLevel,u=y.completed,g=y.selectedLevelId,m()}},render:m})}function a_(n,e){const t=document.createElement("section");t.className="settings-panel",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-labelledby","settings-title"),t.tabIndex=-1;const i=document.createElement("div");i.className="settings-card";const r=document.createElement("div");r.className="settings-page";const s=document.createElement("h2");s.id="settings-title";const a=document.createElement("p");a.className="settings-status",a.setAttribute("role","status");const o=document.createElement("div");o.className="settings-controls";const l=document.createElement("label");l.className="setting-row";const c=document.createElement("span");l.append(c);const f=document.createElement("input");f.type="checkbox",l.append(f);const h=document.createElement("label");h.className="setting-row setting-music";const d=document.createElement("span");h.append(d);const u=document.createElement("input");u.type="checkbox",h.append(u);const g=document.createElement("label");g.className="setting-row volume-row";const _=document.createElement("span");g.append(_);const p=document.createElement("input");p.type="range",p.min="0",p.max="1",p.step="0.05",g.append(p);const m=document.createElement("output");m.className="volume-value",g.append(m);const y=document.createElement("button");y.type="button",y.className="menu-secondary";const A=document.createElement("button");A.type="button",A.className="menu-secondary";const x=document.createElement("button");x.type="button",x.className="settings-close",l.classList.add("setting-sound"),g.classList.add("setting-volume"),y.classList.add("settings-levels"),A.classList.add("settings-hint"),o.append(l,h,g,y,A,x),r.append(s,a,o);const T=document.createElement("div");T.className="level-select-page",T.hidden=!0,i.append(r,T),t.append(i),n.append(t),t.prepend(ni("logo","menu-logo"));const E=document.createElement("button");E.type="button",E.className="storage-dismiss",E.addEventListener("click",e.close),t.append(E),t.dataset.page="settings";const P=ni("storage","storage-icon");a.before(P);const S=s_(T,{select:e.selectLevel,back(){e.navigate?.(),t.dataset.page="settings",t.setAttribute("aria-labelledby","settings-title"),T.hidden=!0,r.hidden=!1,e.motion.reveal(i),x.focus()}});let b;function C(){return[...t.querySelectorAll("button:not([disabled]):not([hidden]), select:not([disabled]):not([hidden]), input:not([disabled]):not([hidden])")].filter(D=>D.offsetParent!==null&&!D.closest("[inert]"))}function L(D){if(!t.classList.contains("is-visible"))return;if(D.key==="Escape"){D.preventDefault(),D.stopPropagation(),e.close();return}if(D.key!=="Tab")return;const q=C();if(!q.length){D.preventDefault(),t.focus();return}const te=q[0],Q=q.at(-1);D.shiftKey&&(document.activeElement===te||!t.contains(document.activeElement))?(D.preventDefault(),Q.focus()):!D.shiftKey&&(document.activeElement===Q||!t.contains(document.activeElement))&&(D.preventDefault(),te.focus())}function U(D){b=D;const{settings:q}=D,te=q.language;t.lang=te,t.dir="ltr",s.textContent=$e(te,"settings"),E.setAttribute("aria-label",te==="ru"?"Закрыть настройки":"Close settings"),t.classList.toggle("has-storage-notice",D.memoryOnly||!!D.recoveryNotice),P.hidden=!D.memoryOnly&&!D.recoveryNotice,g.dataset.original=String(Math.round(q.soundVolume*100)===40),f.checked=q.soundEnabled,p.value=String(q.soundVolume),m.value=`${Math.round(q.soundVolume*100)}%`,c.textContent=$e(te,"sound"),f.setAttribute("aria-label",$e(te,"sound")),u.checked=q.musicEnabled,d.textContent=$e(te,"music"),u.setAttribute("aria-label",$e(te,"music")),_.textContent=$e(te,"volume"),p.setAttribute("aria-label",$e(te,"volume")),y.textContent=$e(te,"levels"),y.title=`${D.unlockedLevel}/${D.choices.length} levels unlocked`,A.textContent=$e(te,"hint"),A.disabled=!D.canHint,x.textContent=$e(te,"back"),a.textContent=D.memoryOnly?te==="ru"?"Хранилище браузера недоступно":"Browser storage is unavailable":D.recoveryNotice?te==="ru"?"Сохранение не восстановлено.":"The save could not be restored.":"",a.title=D.recoveryNotice,a.classList.toggle("is-warning",D.memoryOnly||!!D.recoveryNotice);let Q=a.nextElementSibling instanceof HTMLButtonElement&&a.nextElementSibling.classList.contains("storage-retry")?a.nextElementSibling:null;Q||(Q=document.createElement("button"),Q.type="button",Q.className="storage-retry menu-secondary",Q.addEventListener("click",e.retry),a.after(Q)),Q.textContent=$e(te,"retry"),Q.hidden=!D.memoryOnly&&!D.recoveryNotice,S.update({language:te,choices:D.choices,unlockedLevel:D.unlockedLevel,completed:D.completed,selectedLevelId:D.selectedLevelId})}function N(D){if(!b)return;const q=Object.freeze({...b.settings,...D});b=Object.freeze({...b,settings:q}),e.update(q)}f.addEventListener("change",()=>N({soundEnabled:f.checked})),u.addEventListener("change",()=>N({musicEnabled:u.checked})),p.addEventListener("input",()=>{m.value=`${Math.round(Number(p.value)*100)}%`,g.dataset.original=String(Math.round(Number(p.value)*100)===40),N({soundVolume:Number(p.value)})}),p.addEventListener("change",()=>N({soundVolume:Number(p.value)})),y.addEventListener("click",()=>{e.navigate?.(),t.dataset.page="levels",t.setAttribute("aria-labelledby","level-select-title"),r.hidden=!0,T.hidden=!1,S.render(),e.motion.reveal(i),C()[0]?.focus()}),A.addEventListener("click",e.hint),x.addEventListener("click",e.close),t.addEventListener("keydown",L);function I(){t.dataset.page="settings",t.setAttribute("aria-labelledby","settings-title"),t.inert=!1,t.classList.add("is-visible"),e.motion.reveal(t),t.setAttribute("aria-hidden","false"),r.hidden=!1,T.hidden=!0,x.hidden=!1,f.focus(),i.scrollTop=0}function H(){t.setAttribute("aria-hidden","true"),t.inert=!0,t.classList.remove("is-visible"),e.motion.hide(t,()=>t.removeAttribute("data-ui-leaving"))}function J(){t.dataset.page="levels",t.setAttribute("aria-labelledby","level-select-title"),r.hidden=!0,T.hidden=!1,S.render(),e.motion.reveal(i),C()[0]?.focus()}function ie(){e.motion.cancel(t),e.motion.cancel(i),t.removeEventListener("keydown",L),t.remove()}return Object.freeze({update:U,open:I,close:H,showLevels:J,dispose:ie,isVisible:()=>t.classList.contains("is-visible")})}function o_(n,e){const t=document.createElement("p");t.className="hint-toast",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.hidden=!0,n.append(t);function i(r,s){const o={idle:"",searching:"searching",move:"tapHighlighted","undo-proven":"hint.undo","undo-suggestion":"hintTimeout",deadlock:"game.stuck",timeout:"hintTimeout",error:"hintTimeout"}[r.kind];t.textContent=o?$e(s,o):"",o&&t.hidden&&e?.reveal(t),t.hidden=!o,t.dataset.kind=r.kind,t.lang=s}return Object.freeze({update:i,dispose(){e?.cancel(t),t.remove()}})}function l_(n,e){const t=document.createElement("p");t.className="tutorial-tip",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.hidden=!0,n.append(t);function i(r,s){t.textContent=r?$e(s,"tutorial.tap"):"",r&&t.hidden&&e?.reveal(t),t.hidden=!r,t.lang=s}return Object.freeze({update:i,dispose(){e?.cancel(t),t.remove()}})}function c_(n){const{level:e,state:t,levelNumber:i,selectedStackId:r,activeStacks:s}=n,a=Math.max(0,...t.stacks.map(f=>Math.floor(f.height))),o=a<2?0:a,l=`Level ${i}. ${o} of ${e.totalTiles} tiles gathered.`,c=s.length===0?"No active arrows.":s.map(({stack:f,direction:h},d)=>`${f.id===r?"Selected arrow":"Arrow"} ${d+1}: coordinates ${f.u}, ${f.v}, height ${f.height}, direction ${h}.`).join(" ");return`${l} ${c}`}function u_(n,e,t,i){return $e(n,e==="selection"?"a11y.selection":e==="move"?"a11y.move":e==="undo"?"a11y.undo":e==="restart"?"a11y.restart":"a11y.menu").replace("{index}",String(t??"")).replace("{count}",String(i??""))}function d_(n){const e=document.createElement("p");e.id="board-description",e.className="visually-hidden",n.append(e);const t=n.querySelector("canvas");t?.setAttribute("aria-describedby",e.id);let i="";return Object.freeze({update(r){const s=c_(r);s!==i&&(i=s,e.textContent=s)},dispose(){t?.removeAttribute("aria-describedby"),e.remove()}})}const La={settings:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M20 4h8l1.3 5.1a16 16 0 0 1 3.2 1.3l4.7-2.3 5.7 5.7-2.3 4.7a16 16 0 0 1 1.3 3.2L47 27v8l-5.1 1.3a16 16 0 0 1-1.3 3.2l2.3 4.7-5.7 5.7-4.7-2.3a16 16 0 0 1-3.2 1.3L28 54h-8l-1.3-5.1a16 16 0 0 1-3.2-1.3l-4.7 2.3-5.7-5.7 2.3-4.7a16 16 0 0 1-1.3-3.2L1 35v-8l5.1-1.3a16 16 0 0 1 1.3-3.2l-2.3-4.7 5.7-5.7 4.7 2.3a16 16 0 0 1 3.2-1.3z" transform="translate(1 -5) scale(.85)"/><circle cx="24" cy="24" r="7" class="icon-cutout"/></svg>',restart:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M39 18A16 16 0 0 0 11 12l-4 4m0 0V6m0 10h10M9 30a16 16 0 0 0 28 6l4-4m0 0v10m0-10H31"/></svg>',undo:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M19 13 8 23l11 10M9 23h19a12 12 0 0 1 0 24h-5"/></svg>'};function is(n,e,t){const i=document.createElement("button");return i.type="button",i.className=t,i.setAttribute("aria-label",n),i.innerHTML=e,i}function f_(n){const{root:e}=n,t=ni("logo","game-logo"),i=is("Hint","<span>?</span>","hud-hint");i.addEventListener("click",n.onHint);const r=is("Settings",La.settings,"hud-icon settings-button"),s=is("Restart level",La.restart,"hud-icon restart-button"),a=document.createElement("div");a.className="hud-counter",a.setAttribute("role","status"),a.setAttribute("aria-live","polite");const o=document.createElement("div");o.className="hud-level";const l=is("Undo last move",La.undo+"<span>BACK</span>","hud-undo");e.append(t,r,s,a,o,l,i);const c=a_(e,{motion:n.motion,close:n.onMenu,update:n.onSettings,selectLevel:n.onSelectLevel,clearProgress:n.onClearProgress,retry:n.onRetry,hint:n.onHint,exportProgress:n.onExportProgress,importProgress:n.onImportProgress,navigate:()=>n.onMenuNavigate?.()});let f=!1;const h=r_(e,{undo:n.onUndo,next:()=>{T()},retry:n.onReset,chooseLevels:()=>{f=!0,n.onChooseLevels()},failure:()=>n.onFailure?.()}),d=o_(e,n.motion),u=l_(e,n.motion),g=d_(e.parentElement??e);let _=!1,p=!1,m="",y="",A="",x="";async function T(){if(!p){p=!0,m="";try{const b=await n.onNext();b.advanced||(m=b.message??$e(n.getSettings().language,"service.moreLevels"))}catch{m=$e(n.getSettings().language,"service.nextError")}finally{p=!1}}}const E=()=>{r.focus(),n.onMenu()};r.addEventListener("click",E),s.addEventListener("click",n.onReset),l.addEventListener("click",n.onUndo);function P(b,C,L){const U=b.phase==="Idle"||b.phase==="Won",N=b.phase==="Menu",I=b.phase==="Animating"&&C.active?C.stacks:b.displayedState?.stacks??b.committedState?.stacks??[],H=Math.max(0,...I.map(ye=>Math.floor(ye.height))),J=H<2?0:H,ie=`${J}/${b.level?.totalTiles??0}`,D=b.settings?.language??n.getSettings().language;e.lang=D,e.parentElement.dataset.screen=h_(b),i.textContent=$e(D,"hint"),i.setAttribute("aria-label",$e(D,"hint")),i.disabled=b.phase!=="Idle",i.hidden=b.phase==="Won"||N,r.setAttribute("aria-label",D==="ru"?"Настройки":"Settings"),s.setAttribute("aria-label",D==="ru"?"Перезапустить уровень":"Restart level"),l.setAttribute("aria-label",D==="ru"?"Отменить ход":"Undo last move");const q=b.level?`${D==="ru"?"Уровень":"Level"} ${b.levelNumber??1}`:D==="ru"?"Уровень":"Level";e.dataset.tutorialOriginal=String(D==="ru"&&(b.levelNumber??1)===1&&ie==="0/4"),(y!==ie||A!==D)&&(A=D,y=ie,a.textContent=ie,a.setAttribute("aria-label",D==="ru"?`Собрано ${J} из ${b.level?.totalTiles??0} плиток`:`${J} of ${b.level?.totalTiles??0} tiles gathered`)),x!==q&&(x=q,o.textContent=q);const te=b.phase==="Won";e.parentElement?.classList.toggle("is-won",te);for(const ye of[a,o,l])ye.classList.toggle("is-hidden",te);s.disabled=!U,l.disabled=!U||!b.canUndo,r.disabled=!["Idle","Won","Menu"].includes(b.phase),b.settings&&h.setLanguage(b.settings.language);const Q=b.settings??n.getSettings();e.parentElement?.classList.toggle("high-contrast",!!Q.highContrast),e.parentElement?.classList.toggle("reduced-motion",!!Q.reducedMotion),b.level&&b.committedState&&g.update({level:b.level,state:b.committedState,levelNumber:b.levelNumber??1,language:D,...b.selectedStackId?{selectedStackId:b.selectedStackId}:{},activeStacks:b.activeStacks??[]}),d.update(b.hintView??{kind:"idle"},D),u.update(!!b.tutorialVisible,D);const ee=b.persistence??{memoryOnly:!1,recoveryNotice:""};c.update({settings:Q,choices:Array.from({length:b.levelCount??0},(ye,pe)=>({id:`level-${String(pe+1).padStart(3,"0")}`,index:pe+1})),unlockedLevel:b.unlockedLevel??1,completed:b.completedLevelIds,selectedLevelId:b.level?.id??"",memoryOnly:ee.memoryOnly,recoveryNotice:ee.recoveryNotice,canHint:b.phase==="Menu"&&b.menuReturn==="Idle"}),N&&!_?(c.open(),f&&(c.showLevels(),f=!1)):!N&&_&&(c.close(),r.focus()),_=N;const le=te&&!!b.levelCount&&b.levelNumber===b.levelCount,Ue=b.phase==="Idle"&&(b.committedState?.stacks.length??0)>1&&b.activeStacks?.length===0;h.update(b,L,p,m,le,Ue,Q.reducedMotion)}function S(){r.removeEventListener("click",E),s.removeEventListener("click",n.onReset),l.removeEventListener("click",n.onUndo),h.dispose(),c.dispose(),d.dispose(),u.dispose(),g.dispose(),i.removeEventListener("click",n.onHint),r.remove(),s.remove(),a.remove(),o.remove(),l.remove(),i.remove(),t.remove()}return Object.freeze({update:P,dispose:S})}function h_(n){return n.phase==="Won"?n.levelNumber===n.levelCount?"campaign":"victory":n.tutorialVisible?"tutorial":n.hintView?.kind==="move"?"hint":"gameplay"}const wo=Object.freeze({ui:Object.freeze({startHz:620,endHz:540,durationMs:34,waveform:"sine",gain:.16}),launch:Object.freeze({startHz:300,endHz:365,durationMs:72,waveform:"triangle",gain:.18}),merge:Object.freeze({startHz:540,endHz:880,durationMs:115,waveform:"sine",gain:.22}),settle:Object.freeze({startHz:230,endHz:105,durationMs:190,waveform:"triangle",gain:.24}),turn:Object.freeze({startHz:420,endHz:535,durationMs:84,waveform:"sine",gain:.16}),undo:Object.freeze({startHz:455,endHz:305,durationMs:130,waveform:"triangle",gain:.2}),victory:Object.freeze({startHz:520,endHz:790,durationMs:230,waveform:"sine",gain:.2}),failure:Object.freeze({startHz:440,endHz:440,durationMs:340,waveform:"sine",gain:.12}),hint:Object.freeze({startHz:740,endHz:740,durationMs:145,waveform:"sine",gain:.12}),restart:Object.freeze({startHz:370,endHz:440,durationMs:150,waveform:"triangle",gain:.12})});function p_(n){const e={at:0,tone:wo[n]};return n==="failure"?[e,{at:.29,tone:{startHz:370,endHz:370,durationMs:400,waveform:"sine",gain:.1}}]:n==="hint"?[e,{at:.12,tone:{startHz:988,endHz:988,durationMs:190,waveform:"sine",gain:.1}}]:n==="restart"?[e,{at:.1,tone:{startHz:494,endHz:440,durationMs:180,waveform:"sine",gain:.1}}]:[e]}const m_=84,g_=64,Di=60/m_,Vn=g_*Di,v_=12,__=3.6,x_=12,S_=n=>440*2**((n-69)/12),M_=[[50,57,61,64],[55,62,66,69],[47,54,57,62],[57,64,69,71]],y_=[[[0,74,1.25],[1.5,78,.75],[3,76,1.5],[6,73,1],[8.5,74,1.5],[11,71,1.25],[14,73,1.5]],[[0,74,1.25],[1.5,78,.75],[3,81,1.5],[6,78,1],[8.5,76,1.5],[11,74,1.25],[14,73,1.5]],[[.5,78,1.5],[3,81,1],[5,83,1.5],[8,81,1.5],[10.5,78,1.25],[13,76,1.5]],[[0,74,1.25],[1.5,78,.75],[3,76,1.5],[6,73,1],[8.5,74,1.5],[11,76,1],[13.5,73,2]]],Ni=[];for(let n=0;n<16;n++){const e=M_[n%4];for(const t of e)Ni.push({beat:n*4,midi:t,beats:4.8,instrument:"pad",gain:.003});n%2===0?(Ni.push({beat:n*4+.5,midi:e[1]+12,beats:1.4,instrument:"keys",gain:.009}),Ni.push({beat:n*4+2.5,midi:e[2]+12,beats:1.4,instrument:"keys",gain:.008})):Ni.push({beat:n*4+2,midi:e[3]+12,beats:1.5,instrument:"glass",gain:.008})}y_.forEach((n,e)=>n.forEach(([t,i,r])=>Ni.push({beat:e*16+t,midi:i,beats:r,instrument:"keys",gain:.024})));const Fc=Object.freeze(Ni.sort((n,e)=>n.beat-e.beat).map(n=>Object.freeze(n)));function E_(n){let e=!1,t=0,i=0,r=0,s;const a=new Set;function o(h=!1){if(!e)return;const d=n.now(),u=d-t+.15;h||(r=Math.max(r,d-t-.001));const g=Math.floor(r/Vn)-1,_=Math.floor(u/Vn);for(let p=g;p<=_;p++)for(const m of Fc){const y=p*Vn+m.beat*Di;if(y<r||y>=u)continue;const A=Math.max(0,d-t-y);A<m.beats*Di&&l(m,Math.max(d,t+y),A)}r=u}function l(h,d,u){if(!(a.size>=v_))try{let g;g=n.play(h,d,u,()=>{g&&a.delete(g)}),a.add(g)}catch{}}function c(){if(!e){e=!0,t=n.now()-i,r=i;for(let h=-1;h<=0;h++)for(const d of Fc){const u=h*Vn+d.beat*Di;u<i&&u+d.beats*Di>i&&l(d,n.now(),i-u)}o(!0),s=n.every(o)}}function f(){e&&(i=((n.now()-t)%Vn+Vn)%Vn),e=!1,s?.(),s=void 0;for(const h of a)h.stop();a.clear()}return Object.freeze({start:c,stop:f,snapshot:()=>({running:e,voices:a.size,position:e?(n.now()-t)%Vn:i})})}const b_=n=>.85*Math.tanh(Math.max(-1,Math.min(1,n))/.85);function T_(n,e){const t=n.durationMs/1e3,i=new Float32Array(Math.ceil(t*e)),r=Math.min(.012,t*.25),s=Math.log(Math.max(1,n.endHz)/n.startHz)/t;for(let a=0;a<i.length;a++){const o=a/e,l=Math.abs(s)<1e-10?n.startHz*o:n.startHz*Math.expm1(s*o)/s,c=2*Math.PI*l,f=n.waveform==="triangle"?2/Math.PI*Math.asin(Math.sin(c)):Math.sin(c),h=o<r?o/r:Math.exp(-9*(o-r)/(t-r)),d=Math.min(1,Math.max(0,(t-o)/.012));i[a]=f*h*d*n.gain*__}return i}function A_(n,e){const t=n.beats*Di,i=new Float32Array(Math.ceil(t*e)),r=S_(n.midi);for(let s=0;s<i.length;s++){const a=s/e,o=2*Math.PI*r*a;let l,c;if(n.instrument==="pad")l=(Math.sin(o)+.18*Math.sin(o*2))/1.18,c=Math.min(1,a/.45)*Math.min(1,(t-a)/.65);else{const f=n.instrument==="glass";l=(Math.sin(o)+(f?.24:.12)*Math.sin(o*2)*Math.exp(-a*5)+(f?.1:.04)*Math.sin(o*3)*Math.exp(-a*8))/(f?1.34:1.16),c=Math.min(1,a/.009)*Math.exp(-a*(f?2.6:2.1))*Math.min(1,(t-a)/.12)}i[s]=l*Math.max(0,c)*n.gain*x_}return i}function w_(){if(typeof AudioContext>"u")throw new Error("Web Audio is unavailable.");const n=new AudioContext,e=n.createGain(),t=n.createWaveShaper();t.curve=Float32Array.from({length:4097},(l,c)=>b_(c/2048-1)),t.connect(e),e.gain.value=.4,e.connect(n.destination);const i=new Map,r=new Set;function s(l,c){let f=i.get(l);if(!f){const h=c();f=n.createBuffer(1,h.length,n.sampleRate),f.getChannelData(0).set(h),i.set(l,f)}return f}function a(l,c,f,h){const d=n.createBufferSource(),u=n.createGain();d.buffer=l,d.connect(u),u.connect(t);const g=Math.max(c,n.currentTime);u.gain.setValueAtTime(f>0?0:1,g),f>0&&u.gain.linearRampToValueAtTime(1,g+.012);let _=!1;const p=Object.freeze({stop(){if(!_){_=!0,u.gain.cancelScheduledValues(n.currentTime),u.gain.setTargetAtTime(0,n.currentTime,.003);try{d.stop(n.currentTime+.015)}catch{}}}});return d.onended=()=>{d.disconnect(),u.disconnect(),r.delete(p),h()},r.add(p),d.start(g,f),p}const o=E_({now:()=>n.currentTime,play:(l,c,f,h)=>a(s(JSON.stringify([l.midi,l.beats,l.instrument,l.gain]),()=>A_(l,n.sampleRate)),c,f,h),every:l=>{const c=setInterval(l,40);return()=>clearInterval(c)}});return Object.freeze({resume:()=>n.resume(),suspend:()=>n.suspend(),async close(){o.stop();for(const l of r)l.stop();await n.close(),r.clear(),i.clear(),t.disconnect(),e.disconnect()},setVolume(l){e.gain.setTargetAtTime(l,n.currentTime,.012)},startMusic:o.start,stopMusic:o.stop,musicSnapshot:o.snapshot,playTone(l,c,f,h){const d=h?p_(h):[{at:0,tone:l}],u=[];let g=d.length;const _=n.currentTime;for(const p of d)u.push(a(s(JSON.stringify(p.tone),()=>T_(p.tone,n.sampleRate)),_+p.at,0,()=>{--g===0&&f()}));return Object.freeze({stop(){for(const p of u)p.stop()}})}})}function C_(n={}){const e=n.createAdapter??w_,t=Math.max(1,n.maxVoices??5),i=Math.max(0,n.rateLimitMs??40),r=n.now??(()=>performance.now());let s,a=!0,o=!0,l=.4,c=!0,f=!1,h=!1,d=!1,u;const g=new Set,_=new Map,p={},m=()=>!f&&c&&l>0&&(a||o)&&h;function y(){for(const C of g)try{C.stop()}catch{}g.clear()}function A(){s?.setVolume?.(l),(!a||!m()||!d)&&y(),o&&m()&&d?s?.startMusic?.():s?.stopMusic?.()}function x(){return!s&&!m()?Promise.resolve(!1):u||(u=(async()=>{try{if(!s&&m()&&(s=e()),!s)return!1;for(;;){const L=m();if(L===d)return A(),L;L?await s.resume():await s.suspend(),d=L,A()}}catch{return d=!1,s?.stopMusic?.(),y(),!1}})().finally(()=>{u=void 0}),u)}function T(C){a=C.soundEnabled===!0,o=typeof C.musicEnabled=="boolean"?C.musicEnabled:a,l=Number.isFinite(C.soundVolume)?Math.max(0,Math.min(1,C.soundVolume)):.4,A(),x()}async function E(){if(f)return!1;if(h=!0,u&&s&&!d&&m())try{s.resume().catch(()=>{})}catch{}return x()}function P(C){if(!a||!m()||!d||!s||!wo[C])return!1;const L=r();if(L-(_.get(C)??-1/0)<i)return!1;if(_.set(C,L),g.size>=t){const U=g.values().next().value;if(U){try{U.stop()}catch{}g.delete(U)}}try{let U;return U=s.playTone(wo[C],l,()=>{U&&g.delete(U)},C),g.add(U),p[C]=(p[C]??0)+1,!0}catch{return!1}}async function S(C){f||(c=C,A(),await x())}async function b(){if(!f){f=!0,y(),s?.stopMusic?.(),await u,h=!1,d=!1;try{await s?.close()}catch{}s=void 0}}return Object.freeze({configure:T,unlock:E,play:P,setVisible:S,dispose:b,snapshot:()=>Object.freeze({enabled:a,musicEnabled:o,volume:l,visible:c,unlocked:h,resumed:d,activeVoices:g.size,disposed:f,played:{...p},music:s?.musicSnapshot?.()??{running:!1,voices:0,position:0}})})}function R_(n,e){const t=document.createElement("section");t.className="loading-screen",t.setAttribute("role","status");const i=document.createElement("p"),r=document.createElement("progress");r.setAttribute("aria-label","Loading");const s=document.createElement("div");s.className="loading-meter is-indeterminate",s.setAttribute("aria-hidden","true");const a=document.createElement("img");a.className="loading-meter-track",a.alt="",a.src=new URL("/White-Tower-Play/assets/track-EePoBYkq.webp",import.meta.url).href;const o=document.createElement("div");o.className="loading-meter-window";const l=document.createElement("img");l.className="loading-meter-fill",l.alt="",l.src=new URL("/White-Tower-Play/assets/fill-DKIqlMTa.webp",import.meta.url).href,o.append(l),s.append(a,o);let c;t.append(ni("logo","game-logo"),ni("loading","loading-tower"),s,r,i),n.append(t);const f=n.querySelector("#load-error");f.prepend(ni("graphics","service-illustration"));let h=!1,d;function u(){const _=f.hidden?t.hidden?void 0:t:f;_!==d&&(d&&e?.cancel(d),_&&e?.reveal(_),d=_)}function g(_,p,m){t.lang=m,f.lang=m,f.dataset.kind=p?"content":"graphics",i.textContent=$e(m,"service.loading")+(c===void 0?"":` ${c}%`),r.setAttribute("aria-label",i.textContent),t.hidden=_||h||!p,!p||h?(f.hidden=!1,f.querySelector("p").textContent=$e(m,p?"service.contentError":"service.graphicsError"),f.querySelector("button").textContent=$e(m,"action.retry")):f.hidden=!0,u()}return{update:g,setProgress(_,p){!Number.isFinite(p)||p<=0||(r.max=p,r.value=Math.max(0,Math.min(_,p)),c=Math.floor(r.value/p*100),s.classList.remove("is-indeterminate"),s.style.setProperty("--loaded",c+"%"))},fail(){h=!0,t.hidden=!0,f.hidden=!1,u()},dispose(){e?.cancel(t),e?.cancel(f),t.remove()}}}function L_(n,e){let t=!1,i=!1;return{busy:()=>t,pause(r){},async run(r){if(!(t||i)){t=!0;try{return await r()}finally{t=!1}}},dispose(){i=!0}}}"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/White-Tower-Play/sw.js").catch(()=>{})},{once:!0});let gn=document.querySelector("canvas");const ci=document.querySelector("#status"),Zu=wd(),qt=C_(),Jn=dd();Jn.track("wt_boot_started",{device:matchMedia("(pointer:coarse)").matches?"touch":"pointer"});const Qo=xd(),jo=Td();document.querySelector("main").classList.add("world-scene");function P_(){document.querySelector("main").classList.remove("keyboard-focus")}function I_(n){(n.key==="Tab"||n.key.startsWith("Arrow"))&&document.querySelector("main").classList.add("keyboard-focus")}document.addEventListener("pointerdown",P_,!0);document.addEventListener("keydown",I_,!0);const el=R_(document.querySelector("main"),jo),Ju=md(n=>el.setProgress(n.completed,n.total),"/White-Tower-Play/");let bs=!1,Oe;try{Oe=n_(gn,"webgl",{audio:qt,analytics:Jn,catalogReady:Ju.catalog}),gn=Oe.canvas}catch(n){throw ci.textContent=n instanceof Error?`WebGL unavailable: ${n.message}`:"WebGL unavailable.",n}const Qu=Ad();let lr=!1,ps=null,Bc,un;const Ts=L_(document.querySelector("main"));function As(){Bc?.dispose(),gn=Oe.canvas,gn.tabIndex=0,gn.setAttribute("role","application"),Bc=Cd(gn,{pickStack:n=>Oe.pickStack(n),activate:n=>bs&&!lr&&!Ts.busy()&&Oe.rendererInfo().supported&&Oe.launchStack(n)})}As();const D_=f_({root:document.querySelector("#hud"),motion:jo,onReset:()=>{Ts.run(ed)},onUndo:()=>Oe.undo(),onNext:async()=>(qt.play("ui"),await Ts.run(()=>Oe.nextLevel())??{advanced:!1}),onMenu:()=>Oe.toggleMenu(),getSettings:()=>Oe.snapshot().settings,onSettings:n=>{const e=Oe.canvas;Oe.updateSettings(n),qt.configure(n),Oe.canvas!==e&&(As(),Hi())},onSelectLevel:n=>{qt.play("ui"),Oe.selectLevel(n).catch(()=>{ci.textContent="Could not load that level. Select it again to retry."})},onClearProgress:()=>{qt.play("ui"),Oe.clearProgress().then(()=>{As(),Hi()})},onRetry:()=>window.location.reload(),onChooseLevels:()=>{Oe.toggleMenu()},onHint:()=>Oe.requestHint(),onFailure:()=>qt.play("failure"),onMenuNavigate:()=>qt.play("ui"),onExportProgress:()=>Oe.exportProgress(),onImportProgress:n=>Oe.importProgress(n)});Pd({canvas:()=>Oe.canvas,scene:Oe,enabled:()=>!Ts.busy()&&Oe.rendererInfo().supported,announce:(n,e,t)=>{ci.textContent=u_(Oe.snapshot().settings.language,n,e,t)},reset:ed});function ju(){ps=null,Qu.reset(),Zu.reset()}function ws(n){n.isTrusted&&(qt.setVisible(!document.hidden),qt.unlock())}document.addEventListener("pointerdown",ws,{capture:!0});document.addEventListener("keydown",ws,{capture:!0});function Hi(){gn=Oe.canvas;const n=Math.min(window.devicePixelRatio||1,2);Oe.resize({width:gn.clientWidth,height:gn.clientHeight,pixelRatio:n}),un=gn.getBoundingClientRect(),document.addEventListener("pointerup",ws,{capture:!0}),document.addEventListener("click",ws,{capture:!0}),Qo.refreshLayout(),Co="",Oe.render()}function ed(){Oe.reset(),ju(),Oe.render()}function td(){const n=Oe.snapshot().settings.reducedMotion||window.matchMedia("(prefers-reduced-motion: reduce)").matches;Qo.update(n,document.hidden),jo.update(n,document.hidden)}function N_(){td(),Oe.pause(document.hidden||lr),document.querySelector("main").classList.toggle("motion-paused",document.hidden||lr),qt.setVisible(!document.hidden&&!lr),ju()}let Co="",kc;function nd(n){const e=ps===null?0:(n-ps)/1e3;ps=n;let t=0;bs&&!lr&&!document.hidden&&(t=Qu.advance(e,a=>Oe.update(a,Zu)).alpha),td(),D_.update(Oe.snapshot(),Oe.presentationSnapshot(),document.hidden?0:Math.min(e,.1)),el.update(bs&&Oe.snapshot().loaded,Oe.rendererInfo().supported,Oe.snapshot().settings.language);const i=Oe.persistenceInfo();i.memoryOnly?ci.textContent=Oe.snapshot().settings.language==="ru"?"Прогресс временный: хранилище браузера недоступно.":"Progress is temporary because browser storage is unavailable.":i.recoveryNotice&&(ci.textContent=i.recoveryNotice),Oe.render(t);const r=Oe.snapshot().level,s=`${r?.id}:${un?.width}:${un?.height}`;if(un&&r&&(kc!==r||Co!==s)){Co=s,kc=r;const a=Math.min(un.width/720,un.height/1280),o=un.left+(un.width-720*a)/2,l=un.top+(un.height-1280*a)/2;Qo.setExclusion(Ed(r).map(c=>({left:o+c.left*a-6,top:l+c.top*a-6,right:o+c.right*a+6,bottom:l+c.bottom*a+6})))}requestAnimationFrame(nd)}document.addEventListener("visibilitychange",N_);window.addEventListener("resize",Hi);const U_=new ResizeObserver(Hi);U_.observe(document.querySelector("main"));Hi();requestAnimationFrame(nd);Oe.ready.then(async()=>{await Oe.resourceReady(),await document.fonts.ready,Oe.render(),Ju.complete(),bs=!0,performance.mark("game-ready"),Jn.track("wt_game_ready",{loading_ms:Math.round(performance.now()),content_version:Oe.contentVersion()??"unknown"}),Jn.onEnable(()=>{Jn.track("wt_observation_started"),Oe.startAnalytics(!1)}),Jn.showChoice(),qt.configure(Oe.snapshot().settings),document.hidden&&qt.setVisible(!1),As(),Hi();const n=new URLSearchParams(window.location.search);{const e=n.get("level");e&&await Oe.setLevelById(e),n.has("tower")&&Oe.setTowerDemo(Number(n.get("tower"))||void 0)}ci.textContent=Oe.rendererInfo().message??"Ready"}).catch(n=>{Jn.track("wt_content_error",{stage:"startup"}),ci.textContent=n instanceof Error?`Level error: ${n.message}`:"Could not load level.",el.fail()});
