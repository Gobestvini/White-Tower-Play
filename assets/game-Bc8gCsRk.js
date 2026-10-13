import{p as Xu}from"./index-BQvmE943.js";const ws="white-tower-analytics-",Cs=864e5,nl=200;function qu(n){const e=n.now??Date.now,t=n.id??(()=>crypto.randomUUID()),i=n.storage,r=L=>{try{return i?.getItem(ws+L)??null}catch{return null}},s=(L,D)=>{try{D===null?i?.removeItem(ws+L):i?.setItem(ws+L,D)}catch{}};let a=r("consent")==="yes",o="",l="",c=0,f=0,h=!1,d=!1,u=0,g=0,v,p,m=!1,M=!1,A=[];const x=new Set,T=n.send??(async(L,D)=>{const N=await fetch(n.host+"/batch/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({api_key:n.key,batch:L}),credentials:"omit",signal:D});return N.ok?!(await N.json().catch(()=>null))?.quota_limited?.length:!1});function E(){s("queue",JSON.stringify(A.slice(-nl)))}function C(){if(!o){o=r("player")||t(),s("player",o);try{const L=JSON.parse(r("session")||"null");L&&typeof L.id=="string"&&e()-L.last<Cs&&e()-L.last<18e5&&(l=L.id,c=L.last)}catch{}try{const L=JSON.parse(r("attempt")||"null");L&&typeof L.id=="string"&&typeof L.level=="string"&&typeof L.version=="string"&&(p=L)}catch{}try{const L=JSON.parse(r("queue")||"[]");Array.isArray(L)&&(A=L.filter(D=>typeof D?.uuid=="string"&&typeof D?.event=="string"&&D.properties?.distinct_id===o&&e()-Date.parse(D.timestamp)<Cs&&e()>=Date.parse(D.timestamp)).slice(-nl))}catch{}}}function S(L,D={},N){return h||!a||!n.key||!/^wt_[a-z_]+$/.test(L)||(C(),N&&x.has(N))?!1:(N&&(x.add(N),x.size>1e3&&x.delete(x.values().next().value)),(!l||e()-c>=18e5)&&(l=t(),f=0),c=e(),s("session",JSON.stringify({id:l,last:c})),A=A.filter(H=>e()-Date.parse(H.timestamp)<Cs).slice(-199),A.push({uuid:t(),event:L,timestamp:new Date(e()).toISOString(),properties:{...D,distinct_id:o,session_id:l,$session_id:l,event_sequence:++f,schema_version:1,build_version:n.build,environment:n.environment,consent:!0,$process_person_profile:!1,$geoip_disable:!0}}),E(),!0)}async function b(){if(h||!a||d||!A.length||u>=4)return;const L=A.slice(0,20),D=g;d=!0,v=new AbortController;const N=setTimeout(()=>v?.abort(),8e3);try{const H=await T(L,v.signal);if(D!==g)return;if(H){const Z=new Set(L.map(J=>J.uuid));A=A.filter(J=>!Z.has(J.uuid)),u=0,E()}else u++}catch{D===g&&u++}finally{clearTimeout(N),d=!1}}function I(L){if(!h&&(a=L,g++,v?.abort(),u=0,x.clear(),s("consent",L?"yes":"no"),!L)){A=[],o="",l="",p=void 0;for(const D of["player","session","attempt","queue"])s(D,null)}}function R(L,D,N=!1,H=!0){if(!a)return;C();const Z=N&&p?.level===L&&p.version===D;m=H&&!N,M=H&&!N,Z||(p={id:t(),level:L,version:D},s("attempt",JSON.stringify(p))),S(Z?"wt_level_resumed":"wt_level_started",{level_id:L,content_version:D,attempt_id:p.id,observed_from_start:M},"start:"+p.id)}return Object.freeze({track:S,flush:b,setConsent:I,beginAttempt:R,context:()=>p?{attempt_id:p.id,level_id:p.level,content_version:p.version,continuous_observation:m,observed_from_start:M}:{},consent:()=>a,resetRetry(){u=0},retryDelay:()=>Math.min(6e4,5e3*2**u),snapshot:()=>({consent:a,queued:A.length,retries:u,flight:d}),dispose(){h=!0,g++,v?.abort()}})}function Yu(){let n;try{n=localStorage}catch{}const t=qu({key:"phc_q3yjbn6wrVZg3pJCvVo4STfk8t4UJ4uP6jwDPYpWoudj",host:"https://eu.i.posthog.com",environment:"production",build:"2821104",...n?{storage:n}:{}});let i;function r(){i=setTimeout(async()=>{navigator.onLine&&await t.flush(),r()},t.retryDelay())}r();const s=document.createElement("button");s.type="button",s.className="analytics-choice",s.textContent="Privacy";const a=document.createElement("dialog");a.className="analytics-dialog",a.setAttribute("aria-label","Optional game analytics");const o=document.createElement("h2");o.textContent="Help improve White Tower";const l=document.createElement("p");l.textContent="Allow optional game analytics? We send level progress, actions and technical errors with a random identifier to PostHog in the EU. No names, email or screen recordings. You can change this choice here at any time.";const c=document.createElement("button");c.textContent="Allow analytics",c.type="button";const f=document.createElement("button");f.textContent="No thanks",f.type="button";const h=document.createElement("a");h.href="https://posthog.com/privacy",h.target="_blank",h.rel="noopener",h.textContent="PostHog privacy";const d=document.createElement("p");d.className="analytics-status",a.append(o,l,c,f,h,d),document.body.append(s,a);let u=!1;try{u=!!n?.getItem("white-tower-analytics-consent")}catch{}let g=()=>{};function v(){d.textContent=t.consent()?"Analytics is enabled. Choosing No thanks clears the local analytics identifier and pending events.":"Analytics is disabled.",a.showModal()}s.addEventListener("click",v),c.addEventListener("click",()=>{t.setConsent(!0),u=!0,a.close(),g()}),f.addEventListener("click",()=>{t.setConsent(!1),u=!0,a.close()});function p(){t.resetRetry(),t.flush()}return window.addEventListener("online",p),window.addEventListener("pagehide",p),{...t,showChoice(){u||v()},onEnable(m){g=m},dispose(){clearTimeout(i),window.removeEventListener("online",p),window.removeEventListener("pagehide",p),t.dispose(),s.remove(),a.remove()}}}const Wt=1e5,sn=1e5,gr=new Set(["SE","SW","NW","NE","E","W","N","S"]),il=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),vr=n=>typeof n=="object"&&n!==null&&!Array.isArray(n),os=n=>{if(n&&typeof n=="object"&&!Object.isFrozen(n)){Object.freeze(n);for(const e of Object.values(n))os(e)}return n},Rs=(n,e)=>`${n},${e}`,$u=(n,e)=>`stack:${n},${e}`;function bc(n){const e=[],t=(d,u)=>e.push({path:d,message:u});if(!vr(n))return{ok:!1,errors:[{path:"$",message:"Ожидался объект уровня."}]};const i=new Set(["schemaVersion","id","title","cells","stacks","totalTiles","cameraPreset","tutorialKey","parMoves","knownSolution"]);for(const d of Object.keys(n))i.has(d)||t(d,"Неизвестное поле.");n.schemaVersion!==1&&t("schemaVersion","Поддерживается только версия схемы 1."),(typeof n.id!="string"||!/^[a-zA-Z0-9_-]{1,80}$/.test(n.id))&&t("id","Нужен непустой идентификатор (до 80 символов: латиница, цифры, _ или -)."),(typeof n.title!="string"||n.title.length>160)&&t("title","Название должно быть строкой длиной до 160 символов."),(typeof n.cameraPreset!="string"||n.cameraPreset.length===0||n.cameraPreset.length>80)&&t("cameraPreset","Нужен идентификатор пресета камеры."),n.tutorialKey!==null&&(typeof n.tutorialKey!="string"||n.tutorialKey.length>120)&&t("tutorialKey","Ожидался null или ключ до 120 символов."),(!Number.isSafeInteger(n.parMoves)||n.parMoves<0)&&t("parMoves","Ожидалось неотрицательное целое число."),(!Number.isSafeInteger(n.totalTiles)||n.totalTiles<1||n.totalTiles>sn)&&t("totalTiles",`Ожидалось целое число от 1 до ${sn}.`);const r=[],s=new Set;!Array.isArray(n.cells)||n.cells.length===0||n.cells.length>sn?t("cells",`Ожидался непустой массив до ${sn} клеток.`):n.cells.forEach((d,u)=>{const g=`cells[${u}]`;if(!vr(d)){t(g,"Ожидался объект клетки.");return}for(const A of Object.keys(d))["u","v","kind","direction"].includes(A)||t(`${g}.${A}`,"Неизвестное поле.");const{u:v,v:p,kind:m,direction:M}=d;if((!Number.isSafeInteger(v)||Math.abs(v)>Wt)&&t(`${g}.u`,`Ожидалось целое число в пределах ±${Wt}.`),(!Number.isSafeInteger(p)||Math.abs(p)>Wt)&&t(`${g}.v`,`Ожидалось целое число в пределах ±${Wt}.`),["normal","redirect","blocked"].includes(String(m))||t(`${g}.kind`,"Неизвестный вид клетки."),m==="redirect"&&!gr.has(String(M))&&t(`${g}.direction`,"Для redirect требуется одно из восьми направлений."),m!=="redirect"&&il(d,"direction")&&t(`${g}.direction`,"Направление допустимо только для redirect."),Number.isSafeInteger(v)&&Number.isSafeInteger(p)&&Math.abs(v)<=Wt&&Math.abs(p)<=Wt){const A=Rs(v,p);s.has(A)&&t(g,`Координата ${A} повторяется.`),s.add(A),["normal","redirect","blocked"].includes(String(m))&&(m!=="redirect"||gr.has(String(M)))&&r.push({u:v,v:p,kind:m,...m==="redirect"?{direction:M}:{}})}});const a=[],o=new Set;let l=0,c=0;!Array.isArray(n.stacks)||n.stacks.length===0||n.stacks.length>sn?t("stacks",`Ожидался непустой массив до ${sn} стопок.`):n.stacks.forEach((d,u)=>{const g=`stacks[${u}]`;if(!vr(d)){t(g,"Ожидался объект стопки.");return}for(const A of Object.keys(d))["u","v","height","launchDirection"].includes(A)||t(`${g}.${A}`,"Неизвестное поле.");const{u:v,v:p,height:m,launchDirection:M}=d;for(const[A,x]of[["u",v],["v",p]])(!Number.isSafeInteger(x)||Math.abs(x)>Wt)&&t(`${g}.${A}`,`Ожидалось целое число в пределах ±${Wt}.`);if((!Number.isSafeInteger(m)||m<1||m>sn)&&t(`${g}.height`,`Ожидалось целое число от 1 до ${sn}.`),il(d,"launchDirection")&&!gr.has(String(M))&&t(`${g}.launchDirection`,"Неизвестное направление запуска."),Number.isSafeInteger(v)&&Number.isSafeInteger(p)&&Math.abs(v)<=Wt&&Math.abs(p)<=Wt){const A=Rs(v,p);o.has(A)&&t(g,`Стопка на координате ${A} повторяется.`),o.add(A);const x=r.find(T=>Rs(T.u,T.v)===A);x?x.kind==="blocked"&&t(g,"На заблокированной клетке нельзя размещать стопку."):t(g,"Под стопкой нет клетки пола."),Number.isSafeInteger(m)&&m>=1&&m<=sn&&(l+=m,c=Math.max(c,m),a.push({id:$u(v,p),u:v,v:p,height:m,...gr.has(String(M))?{launchDirection:M}:{}}))}}),Number.isSafeInteger(n.totalTiles)&&l!==n.totalTiles&&t("totalTiles",`Значение должно совпадать с суммой высот (${l}).`),c===l&&l>0&&t("stacks","Уровень уже решён в начальном состоянии.");const f=[];return!Array.isArray(n.knownSolution)||n.knownSolution.length===0||n.knownSolution.length>sn?t("knownSolution","Ожидался непустой список координат ходов."):n.knownSolution.forEach((d,u)=>{const g=`knownSolution[${u}]`;if(!vr(d)||!Number.isSafeInteger(d.u)||!Number.isSafeInteger(d.v)||Math.abs(d.u)>Wt||Math.abs(d.v)>Wt){t(g,"Ожидались целые координаты хода.");return}f.push({u:d.u,v:d.v})}),e.length?{ok:!1,errors:os(e)}:{ok:!0,value:os({schemaVersion:1,id:n.id,title:n.title,cells:r,stacks:a,totalTiles:n.totalTiles,cameraPreset:n.cameraPreset,tutorialKey:n.tutorialKey,parMoves:n.parMoves,knownSolution:f})}}function xa(n){const e=n.stacks.map(t=>({...t}));return os({levelId:n.id,stacks:e,moveCount:0})}function Bi(n){const e=n.stacks.reduce((t,i)=>t+i.height,0);return n.stacks.length===1&&n.stacks[0]?.height===e}function Tc(n,e="/White-Tower-Play/"){return`${e.replace(/\/$/,"")}/${n.replace(/^\//,"")}`}const rl=new Map;class At extends Error{constructor(e,t){super(t),this.code=e,this.name="ContentLoadError"}}function Ku(n){if(typeof n!="object"||n===null||Array.isArray(n))throw new At("catalog","Catalog must be an object.");const e=n;if(e.schemaVersion!==1||typeof e.contentVersion!="string"||!Array.isArray(e.levels)||e.levels.length<1||e.levels.length>120)throw new At("catalog","Catalog version or level list is invalid (expected 1–120 entries).");const t=new Set,i=[];return e.levels.forEach((r,s)=>{if(typeof r!="object"||r===null||Array.isArray(r))throw new At("catalog",`Entry ${s} must be an object.`);const a=r,o=`level-${String(s+1).padStart(3,"0")}`,l=`/content/levels/${String(s+1).padStart(3,"0")}.json`;if(a.id!==o||a.path!==l||typeof a.sha256!="string"||!/^[a-f0-9]{64}$/.test(a.sha256))throw new At("catalog",`Entry ${s} has invalid order, path or checksum.`);if(t.has(o))throw new At("catalog",`Duplicate level ${o}.`);t.add(o),i.push(Object.freeze({id:o,path:l,sha256:a.sha256}))}),Object.freeze({schemaVersion:1,contentVersion:e.contentVersion,levels:Object.freeze(i)})}async function Ac(n=Tc("/content/catalog.json"),e=fetch){let t;try{t=await e(n)}catch(r){throw new At("network",r instanceof Error?r.message:String(r))}if(!t.ok)throw new At("network",`Catalog request failed (${t.status}).`);let i;try{i=await t.json()}catch(r){throw new At("json",r instanceof Error?r.message:"Invalid catalog JSON.")}return Ku(i)}async function Jr(n,e,t=fetch,i){const r=n.levels.find(u=>u.id===e);if(!r)throw new At("missing-level",`Level ${e} is not in the catalog.`);const s=`${n.contentVersion}:${r.sha256}`,a=rl.get(s);if(a)return a;let o;try{o=await t(Tc(r.path),i?{signal:i}:void 0)}catch(u){throw new At("network",u instanceof Error?u.message:String(u))}if(!o.ok)throw new At("network",`Level request failed (${o.status}).`);let l;try{l=new Uint8Array(await o.arrayBuffer())}catch(u){throw new At("network",u instanceof Error?u.message:`Could not read ${e}.`)}let c;try{c=await crypto.subtle.digest("SHA-256",l)}catch(u){throw new At("checksum",u instanceof Error?u.message:"SHA-256 is unavailable.")}if([...new Uint8Array(c)].map(u=>u.toString(16).padStart(2,"0")).join("")!==r.sha256)throw new At("checksum",`Checksum mismatch for ${e}.`);let h;try{h=JSON.parse(new TextDecoder().decode(l))}catch(u){throw new At("json",u instanceof Error?u.message:`Invalid JSON for ${e}.`)}const d=bc(h);if(!d.ok)throw new At("schema",d.errors.map(u=>`${u.path}: ${u.message}`).join("; "));if(d.value.id!==r.id)throw new At("identity",`Catalog ID does not match level ${e}.`);return rl.set(s,d.value),d.value}async function Zu(n,e,t,i=4){let r=0,s=0;const a=n.length;e({completed:s,total:a}),await Promise.all(Array.from({length:Math.min(Math.max(1,i),n.length)},async()=>{for(;r<n.length;){t.throwIfAborted();const o=n[r++];await new Promise((l,c)=>{const f=()=>c(t.reason);t.addEventListener("abort",f,{once:!0}),Promise.resolve().then(o).then(l,c).finally(()=>t.removeEventListener("abort",f))}),t.throwIfAborted(),e({completed:++s,total:a})}}))}function Ju(n,e){const t=new AbortController,i=[],r=setTimeout(()=>t.abort(new Error("Game resources took too long to load. Please retry.")),9e4);let s={total:1};const a=l=>{s=l,n({completed:l.completed,total:l.total+1})},o=(async()=>{const[l,c]=await Promise.all([Ac(),fetch(e+"runtime-assets.json",{signal:t.signal})]);if(!c.ok)throw new Error("Could not load resource manifest.");const f=await c.json();if(!Array.isArray(f)||f.some(u=>typeof u!="string"||!u.startsWith("/assets/")||u.includes("..")))throw new Error("Invalid resource manifest.");const d=[...new Set(f)].map(u=>e+u.replace(/^\//,"")).map(u=>async()=>{if(/\.(png|webp|jpg|svg)$/.test(u))await Xu(u),t.signal.throwIfAborted();else{const g=await fetch(u,{signal:t.signal});if(!g.ok)throw new Error("A game resource could not load.");await g.arrayBuffer()}});return d.push(...l.levels.map(u=>async()=>{await Jr(l,u.id,fetch,t.signal)})),d.push(async()=>{await document.fonts.ready}),await Zu(d,a,t.signal),l})();return o.catch(()=>{clearTimeout(r),t.abort()}),{catalog:o,complete(){clearTimeout(r),n({completed:s.total+1,total:s.total+1}),i.length=0},dispose(){clearTimeout(r),t.abort();for(const l of i)l.src="";i.length=0}}}function wc(n,e){return n.left<e.right&&n.right>e.left&&n.top<e.bottom&&n.bottom>e.top}function Qu(n,e,t,i,r){for(const s of[t,Math.max(64,t*.9),Math.max(64,t*.82)]){const a=s*.03+4;for(const o of[.68,.69,.7,.71,.72,.73,.74,.75,.76,.77,.78,.79,.8,.67,.66,.65,.64,.63,.62,.61,.6])for(const l of[.035,.055,.085]){const c=i==="left"?n*l:n*(1-l)-s,f=e*o,h={left:c-a-6,top:f-a-8,right:c+s+a+6,bottom:f+s+a};if(!(h.left<0||h.right>n||h.top<0||h.bottom>e)&&!r.some(d=>wc(h,{left:d.left-8,top:d.top-8,right:d.right+8,bottom:d.bottom+8})))return{left:c,top:f,size:s,envelope:h}}}}const ju=Object.freeze([0,3,1,4,2,5,4,1,5,2,3,0,3,4,1,5,2,0]),_r=3;function ed(n){if(!Number.isInteger(n)||n<0||n>=6)throw new RangeError("Unknown island variant");return Object.freeze({atlas:Math.floor(n/_r),position:n%_r/(_r-1)*100,size:`${_r*100}% 100%`})}function td(){const n=document.createElement("div");n.className="world-background",n.setAttribute("aria-hidden","true");const e=new URL("/White-Tower-Play/assets/islands-atlas-runtime-C2lwbZBA.webp",import.meta.url).href,t=new URL("/White-Tower-Play/assets/islands-extra-atlas-runtime-DeVHoyCf.webp",import.meta.url).href;n.style.setProperty("--island-atlas",`url("${e}")`);const i=new URL("/White-Tower-Play/assets/clouds-atlas-runtime-B8UjbPuj.webp",import.meta.url).href;n.style.setProperty("--cloud-atlas",`url("${i}")`);for(let a=0;a<10;a++){const o=document.createElement("div");o.className=`world-cloud cloud-${a+1}`,o.style.backgroundPosition=`${a%3*50}% 50%`,n.append(o)}const r=document.createElement("div");r.className="world-islands",n.append(r);for(const[a,o]of ju.entries()){const l=document.createElement("div");l.className=`world-island island-${a+1}`;const c=document.createElement("div");c.className="island-sprite";const f=ed(o);c.dataset.variant=String(o),c.style.setProperty("--island-atlas",`url("${f.atlas?t:e}")`),c.style.backgroundPosition=`${f.position}% 50%`,c.style.backgroundSize=f.size,l.append(c),r.append(l)}document.body.prepend(n);let s=[];return Object.freeze({update(a,o){n.classList.toggle("is-still",a),n.classList.toggle("is-paused",o)},refreshLayout(){s=[...r.querySelectorAll(".world-island")].map(a=>{const o=getComputedStyle(a),l=parseFloat(o.getPropertyValue("--sway"))||0,c=parseFloat(o.getPropertyValue("--rise"))||0,f=a.offsetWidth*.03+4;return{node:a,left:a.offsetLeft+Math.min(0,l)-f,top:a.offsetTop+Math.min(0,c)-f,right:a.offsetLeft+a.offsetWidth+Math.max(0,l)+f,bottom:a.offsetTop+a.offsetHeight+Math.max(0,c)+f}})},setExclusion(a=[]){const o=[...document.querySelectorAll(".hud-undo,.hud-hint")].map(c=>c.getBoundingClientRect()).filter(c=>c.width&&c.height),l=[...a,...o];for(const c of s){if(c.node.matches(".island-13,.island-16")){const d=Qu(window.innerWidth,window.innerHeight,Math.max(64,Math.min(140,window.innerWidth*.2)),c.node.matches(".island-13")?"left":"right",l);c.node.style.visibility=d?"":"hidden",d&&(c.node.style.width=`${d.size}px`,c.node.style.left=`${d.left}px`,c.node.style.right="auto",c.node.style.top=`${d.top}px`,c.node.style.bottom="auto");continue}const h=l.some(d=>wc(d,c))?"hidden":"";c.node.style.visibility!==h&&(c.node.style.visibility=h)}},dispose(){n.remove()}})}const sl=1536,al=1024,_o=[{rect:[32,16,479,496],solid:[.015609756097560976,.014532243415077202,.984390243902439,.9854677565849228]},{rect:[544,16,991,496],solid:[.015655577299412915,.014585232452142206,.9843444227005871,.9854147675478578]},{rect:[1053,16,1506,496],solid:[.01557935735150925,.014692378328741965,.9844206426484907,.9853076216712581]},{rect:[31,528,481,1008],solid:[.015503875968992248,.014545454545454545,.9844961240310077,.9854545454545455]},{rect:[544,528,992,1008],solid:[.015533980582524271,.014505893019038985,.9844660194174757,.985494106980961]},{rect:[1055,528,1505,1008],solid:[.015549076773566569,.014585232452142206,.9844509232264335,.9854147675478578]}],Cc=3,xo=22,So=Cc*xo,Ti=76,tr=26,xr=Object.freeze(_o.reduce((n,{solid:e})=>{const t=Ti*2/(e[2]-e[0]),i=(Ti*2+So)/(e[3]-e[1]),r=-Ti-e[0]*t,s=Ti+e[1]*i;return{left:Math.min(n.left,r),right:Math.max(n.right,r+t),top:Math.max(n.top,s),bottom:Math.min(n.bottom,s-i)}},{left:0,right:0,top:0,bottom:0})),ut=Object.freeze({width:720,height:1280}),Zn=72,bn=.82,Tt=Zn,Ei=Tt,Qn=22,Rc=12+tr+So,ol=30,Mo=.44*Zn,nd=1.33;function ls(n,e){return e.u+e.v-n.u-n.v||n.u-e.u||n.v-e.v}function yo(n,e,t,i){return Object.freeze({x:i.originX+(n-e)*Zn*i.scale,y:i.originY-(n+e)*Zn*i.scale-t*i.layerRise*i.scale})}function cs(n,e,t,i){return yo(n,e,t+Qn/i.layerRise,i)}function id(n,e,t){if(t.width<=0||t.height<=0)return;const i=Math.min(t.width/ut.width,t.height/ut.height),r=(t.width-ut.width*i)/2,s=(t.height-ut.height*i)/2,a=(n-t.left-r)/i,o=(e-t.top-s)/i;if(!(a<0||o<0||a>ut.width||o>ut.height))return Object.freeze({x:a,y:o})}function ll(n,e){let t=!1;for(let i=0,r=e.length-1;i<e.length;r=i++){const s=e[i],a=e[r];s.y>n.y!=a.y>n.y&&n.x<(a.x-s.x)*(n.y-s.y)/(a.y-s.y)+s.x&&(t=!t)}return t}function rd(n,e,t){const i=[...e].sort((a,o)=>ls(o,a)),r=Tt*t.scale,s=Qn*t.scale;for(const a of i)for(let o=a.height-1;o>=0;o--){const l=cs(a.u,a.v,o,t),c=Math.abs(n.x-l.x),f=Math.abs(n.y-l.y);if(c+f<=r)return a.id;const h={x:l.x,y:l.y+r},d={x:l.x+r,y:l.y},u={x:l.x-r,y:l.y},g={x:h.x,y:h.y+s},v={x:d.x,y:d.y+s},p={x:u.x,y:u.y+s};if(ll(n,[d,h,g,v])||ll(n,[h,u,p,g]))return a.id}}const In=Object.freeze({left:60,right:660,top:320,bottom:1020});function Lc(n,e){const t=n.cells.filter(f=>f.kind!=="blocked"),i=t.map(f=>(f.u-f.v)*Zn),r=t.map(f=>-(f.u+f.v)*Zn),s=e.map(f=>-(f.u+f.v)*Zn-Tt-(Math.max(0,f.height-1)+(f.lift??0))*Mo-Qn),a=Math.min(...i)+Math.min(-Tt,xr.left)-ol,o=Math.max(...i)+Math.max(Tt,xr.right)+ol,l=Math.min(...r.map(f=>Math.min(f-Tt,f+12+tr-xr.top-1)),...s),c=Math.max(...r)+Math.max(Tt+Rc,13+tr-xr.bottom);return Object.freeze({minX:a,minY:l,maxX:o,maxY:c,width:o-a,height:c-l})}function cn(n,e){const t=Lc(n,e),i=Math.min(nd,(In.right-In.left)/t.width,(In.bottom-In.top)/(t.height*bn)),r=(In.top+In.bottom)/2;return Object.freeze({scale:i,layerRise:Mo,originX:(In.left+In.right)/2-(t.minX+t.maxX)/2*i,originY:ut.height/2+(r-ut.height/2)/bn-(t.minY+t.maxY)/2*i})}function sd(n){const e=n.cells.filter(i=>i.kind!=="blocked"),t=[cn(n,[]),...e.map(i=>cn(n,[{...i,height:n.totalTiles,lift:Math.max(3,n.totalTiles*.75)}]))];return e.map(i=>{const r=t.map(s=>{const a=Qr(yo(i.u,i.v,0,s));return{left:a.x-Tt*s.scale,right:a.x+Tt*s.scale,top:a.y-Tt*s.scale*bn,bottom:a.y+(Tt+Rc)*s.scale*bn}});return{left:Math.min(...r.map(s=>s.left)),right:Math.max(...r.map(s=>s.right)),top:Math.min(...r.map(s=>s.top)),bottom:Math.max(...r.map(s=>s.bottom))}})}function Qr(n){return Object.freeze({x:n.x,y:ut.height/2+(n.y-ut.height/2)*bn})}function ad(n){return Object.freeze({x:n.x,y:ut.height/2+(n.y-ut.height/2)/bn})}function od(){const n=new Map,e=new Map;let t=typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,i=!1;function r(a){const o=n.get(a);n.delete(a),e.delete(a),o?.cancel(),a.removeAttribute("data-ui-leaving")}function s(a,o,l){if(r(a),t||typeof a.animate!="function"){l?.();return}o&&a.setAttribute("data-ui-leaving","");const c=a.animate(o?[{opacity:1,scale:1},{opacity:0,scale:.98}]:[{opacity:0,scale:.96,translate:"0 6px"},{opacity:1,scale:1,translate:"0 0"}],{duration:o?180:280,easing:"cubic-bezier(.2,.8,.2,1)",fill:"both"});n.set(a,c),l&&e.set(a,l),i&&c.pause(),c.finished.then(()=>{if(n.get(a)!==c)return;const f=e.get(a);r(a),f?.()}).catch(()=>{})}return Object.freeze({reveal(a){s(a,!1)},hide(a,o){s(a,!0,o)},cancel:r,update(a,o){if(t=a,i=o,t)for(const l of[...n.keys()]){const c=e.get(l);r(l),c?.()}else for(const l of n.values())i?l.pause():l.playState==="paused"&&l.play()},dispose(){for(const a of[...n.keys()])r(a)}})}function ld({step:n=1/60,maxSteps:e=8}={}){if(!Number.isFinite(n)||n<=0||!Number.isInteger(e)||e<1)throw new RangeError("Invalid fixed-step configuration");let t=0;return{reset(){t=0},advance(i,r){if(!Number.isFinite(i)||i<0)throw new RangeError("Invalid frame delta");t+=i;let s=0;for(;t+n*1e-9>=n&&s<e;)r(n),t=Math.max(0,t-n),s++;const a=Math.floor((t+n*1e-9)/n)*n;return t=Math.max(0,t-a),{steps:s,alpha:Math.min(t/n,1),dropped:a}}}}function cd(n=window){const e=new Set,t=s=>e.add(s.code),i=s=>e.delete(s.code),r=()=>e.clear();return n.addEventListener("keydown",t),n.addEventListener("keyup",i),n.addEventListener("blur",r),{keys:e,reset:r,dispose(){n.removeEventListener("keydown",t),n.removeEventListener("keyup",i),n.removeEventListener("blur",r),r()}}}function ud(n,e){const t=e.maxMovement??12,i=e.duplicateWindowMs??220,r=e.environment?.windowTarget??window,s=e.environment?.documentTarget??document;let a,o;const l=n.style.touchAction;n.style.touchAction="none";function c(v){const p=id(v.clientX,v.clientY,n.getBoundingClientRect());return p?e.pickStack(p):void 0}function f(v){if(!v.isPrimary||a||v.pointerType==="mouse"&&v.button!==0)return;const p=c(v);if(p){a={pointerId:v.pointerId,stackId:p,x:v.clientX,y:v.clientY},v.preventDefault(),n.focus({preventScroll:!0});try{n.setPointerCapture(v.pointerId)}catch{}}}function h(v){if(!a||a.pointerId!==v.pointerId)return;const p=a;a=void 0,v.preventDefault();const m=Math.hypot(v.clientX-p.x,v.clientY-p.y),M=Number.isFinite(v.timeStamp)?v.timeStamp:performance.now(),A=o?.stackId===p.stackId&&M-o.at<i;m<=t&&c(v)===p.stackId&&!A&&e.activate(p.stackId)&&(o={stackId:p.stackId,at:M})}function d(v){if(v&&a?.pointerId!==v.pointerId)return;const p=a?.pointerId;if(a=void 0,p!==void 0)try{n.hasPointerCapture(p)&&n.releasePointerCapture(p)}catch{}}const u=()=>d(),g=()=>{s.hidden&&d()};return n.addEventListener("pointerdown",f),n.addEventListener("pointerup",h),n.addEventListener("pointercancel",d),n.addEventListener("lostpointercapture",d),r.addEventListener("blur",u),s.addEventListener("visibilitychange",g),Object.freeze({cancel:d,dispose(){d(),n.removeEventListener("pointerdown",f),n.removeEventListener("pointerup",h),n.removeEventListener("pointercancel",d),n.removeEventListener("lostpointercapture",d),r.removeEventListener("blur",u),s.removeEventListener("visibilitychange",g),n.style.touchAction=l}})}function dd(n,e,t=!1){if(!(!e||t)){if(["ArrowRight","ArrowUp"].includes(n.key))return"next";if(["ArrowLeft","ArrowDown"].includes(n.key))return"previous";if(n.key==="Enter"||n.code==="Space")return"launch";if(n.key.toLowerCase()==="z"||n.ctrlKey&&n.key.toLowerCase()==="z"||n.metaKey&&n.key.toLowerCase()==="z")return"undo";if(n.key.toLowerCase()==="r")return"restart";if(n.key==="Escape")return"menu"}}function fd(n){return n instanceof HTMLElement?n.isContentEditable||!!n.closest('input, textarea, select, [contenteditable="true"], [role="textbox"]'):!1}function hd(n){const e=n.target??window;function t(i){const r=n.canvas();if(n.enabled&&!n.enabled())return;const s=n.scene.snapshot(),a=i.key==="Escape"&&s.phase==="Menu",o=dd(i,document.activeElement===r||a,fd(i.target));if(!(!o||i.repeat&&o!=="next"&&o!=="previous"))if(o==="next"||o==="previous"){const l=n.scene.selectableStacks();if(!l.length)return;const c=o==="next"?1:-1,f=l.findIndex(u=>u.id===n.scene.selectedStackId()),h=f<0?c===1?l.length-1:0:f,d=l[(h+c+l.length)%l.length];n.scene.selectStack(d.id)&&(i.preventDefault(),n.announce("selection",l.indexOf(d)+1,l.length))}else if(o==="launch"&&s.phase==="Idle"){const l=n.scene.selectedStackId();l&&n.scene.launchStack(l)&&(i.preventDefault(),n.announce("move"))}else o==="undo"&&s.canUndo?(n.scene.undo(),i.preventDefault(),n.announce("undo")):o==="restart"&&["Idle","Won"].includes(s.phase)?(n.reset(),i.preventDefault(),n.announce("restart")):o==="menu"&&n.scene.toggleMenu()&&(i.preventDefault(),n.announce("menu"))}return e.addEventListener("keydown",t),Object.freeze({dispose(){e.removeEventListener("keydown",t)}})}const dr={SE:{u:1,v:0},SW:{u:0,v:1},NW:{u:-1,v:0},NE:{u:0,v:-1},E:{u:1,v:-1},W:{u:-1,v:1},N:{u:-1,v:-1},S:{u:1,v:1}},Sr=Object.keys(dr),Ls=(n,e)=>`${n},${e}`,cl=4096,us=n=>{if(n&&typeof n=="object"&&!Object.isFrozen(n)){Object.freeze(n);for(const e of Object.values(n))us(e)}return n},pd=n=>{const e=Math.max(0,...n.map(t=>t.height));return e<2?0:e};function md(n,e,t,i,r){const s=[...r].sort((a,o)=>a.u-o.u||a.v-o.v);return JSON.stringify([n,e,t,i,s.map(a=>[a.u,a.v,a.height,a.launchDirection??null])])}function oi(n,e){return us({accepted:!1,reason:e,nextState:n,steps:[],events:[],won:!1})}function Pc(n,e,t){const i=e.stacks.findIndex(A=>A.u===t.u&&A.v===t.v);if(i<0)return oi(e,"inactive");const r=e.stacks[i];if(!r)return oi(e,"inactive");const s=new Map(n.cells.map(A=>[Ls(A.u,A.v),A])),a=s.get(Ls(t.u,t.v));let o=a?.kind==="redirect"?a.direction:r.launchDirection;if(!o)return oi(e,"inactive");const l=e.stacks.filter((A,x)=>x!==i).map(A=>({...A}));let c=r.u,f=r.v,h=r.height,d;const u=[],g=[],v=new Set;for(let A=0;A<=cl;A++){const x=md(c,f,o,h,l);if(v.has(x))return oi(e,"cycle");v.add(x);const T=dr[o],E=c+T.u,C=f+T.v,S=s.get(Ls(E,C));if(!S||S.kind==="blocked"){if(u.length===0)return oi(e,"blocked");g.push({type:"stop",stepIndex:u.length,at:{u:c,v:f},reason:"edge"});break}if(u.length>=cl)return oi(e,"step-limit");const b={u:c,v:f},I={u:E,v:C},R=l.findIndex(Z=>Z.u===E&&Z.v===C),L=h;let D=!1;if(d=void 0,R>=0){const Z=l[R];Z&&(h+=Z.height,d=Z.launchDirection,l.splice(R,1),D=!0)}c=E,f=C;const N=h,H=pd([...l,{...r,u:c,v:f,height:h}]);u.push({from:b,to:I,direction:o,movingHeightBefore:L,movingHeightAfter:N,absorbed:D,counter:H}),g.push({type:"move",stepIndex:u.length-1,at:I}),D&&g.push({type:"merge",stepIndex:u.length-1,at:I,absorbedHeight:N-L,height:h,counter:H}),S.kind==="redirect"&&S.direction&&(o=S.direction,g.push({type:"turn",stepIndex:u.length-1,at:I,direction:o}))}const p=[...l,{id:r.id,u:c,v:f,height:h,...d?{launchDirection:d}:{}}],m=us({levelId:e.levelId,stacks:p,moveCount:e.moveCount+1}),M=m.stacks.length===1&&m.stacks[0]?.height===n.totalTiles;return us({accepted:!0,nextState:m,steps:u,events:g,won:M})}function jr(n){if(n&&typeof n=="object"&&!Object.isFrozen(n)){Object.freeze(n);for(const e of Object.values(n))jr(e)}return n}function gd(n,e){return n.levelId===e.levelId&&n.moveCount===e.moveCount&&n.stacks.length===e.stacks.length&&n.stacks.every(t=>e.stacks.some(i=>t.id===i.id&&t.u===i.u&&t.v===i.v&&t.height===i.height&&t.launchDirection===i.launchDirection))}function vd(n,e,t){for(const i of e.stacks){const r=Pc(n,e,i);if(r.accepted&&gd(r.nextState,t))return r}}function _d(){let n="Loading",e,t,i,r,s,a=0,o=0,l,c="Idle",f=!1;const h=[],d=new Set;function u(){return jr({phase:n,...e?{level:e}:{},...i?{committedState:i}:{},...r?{displayedState:r}:{},...s?{animation:s}:{},generationId:a,attemptId:o,canUndo:h.length>0&&(n==="Idle"||n==="Won"),completedLevelIds:[...d].sort(),...n==="Menu"?{menuReturn:c}:{},...l?{error:l}:{}})}function g(R){return f||(a++,o++,e=R,t=xa(R),i=t,r=t,s=void 0,h.length=0,l=void 0,n=Bi(t)?"Won":"Idle",n==="Won"&&d.add(R.id)),u()}function v(R,L){if(f||!e||R.levelId!==e.id||n!=="Idle"&&n!=="Won")return u();const D=L.slice(-50);return a++,o++,i=jr(R),r=i,h.splice(0,h.length,...D.map(N=>({state:jr(N)}))),s=void 0,n=Bi(i)?"Won":"Idle",n==="Won"&&d.add(e.id),u()}function p(R){if(f)return u();d.clear();for(const L of R)d.add(L);return e&&n==="Won"&&d.add(e.id),u()}function m(){return Object.freeze(h.slice(-50).map(R=>R.state))}function M(R){if(f||n!=="Idle"||!e||!i||!r)return u();const L=Pc(e,i,R);return L.accepted&&(h.push({state:i,move:L}),s={...L,reverse:!1,sourceState:i},i=L.nextState,a++,n="Animating"),u()}function A(R){return f||n!=="Animating"||R!==a||!i||(r=i,s=void 0,e&&Bi(i)?(n="Won",d.add(e.id)):n="Idle"),u()}function x(){if(f||n!=="Idle"&&n!=="Won"||h.length===0)return u();const R=h.pop();if(!R)return u();const L=R.state,D=R.move??(e&&i?vd(e,L,i):void 0);return a++,i=L,s=D?{...D,reverse:!0,sourceState:L}:void 0,s?n="Animating":(r=L,n=Bi(L)?"Won":"Idle"),u()}function T(){return f||!t||!e||n!=="Idle"&&n!=="Won"||(a++,o++,i=xa(e),r=i,h.length=0,s=void 0,n=Bi(i)?"Won":"Idle"),u()}function E(){return f||n!=="Idle"&&n!=="Won"||(c=n,n="Menu"),u()}function C(){return f||n!=="Menu"||(n=c),u()}function S(R){return f||(a++,s=void 0,l=R,n="LoadError"),u()}function b(R="WebGL недоступен."){return f||(a++,s=void 0,l=R,n="Unsupported"),u()}function I(){f||(f=!0,a++,s=void 0,h.length=0)}return Object.freeze({snapshot:u,loadLevel:g,restoreAttempt:v,restoreCompleted:p,historySnapshot:m,launch:M,finishAnimation:A,undo:x,restart:T,openMenu:E,closeMenu:C,setLoadError:S,setUnsupported:b,dispose:I})}const Ri=Object.freeze({background:"#60C0FE",tileTop:"#FFFAF1",tileBevel:"#FFFDF6",tileSideLight:"#EEE8DF",tileSideDark:"#CED0D0",floor:"#FFDA45",floorSeam:"#EEB229",arrow:"#FF922D",chevron:"#FFFFFF",shadow:"#3D83D2"});function Mr(n,e,t=e.moveCount,i,r=e.stacks,s=cn(n,r)){const a=r===e.stacks?r.map(o=>{const l=n.cells.find(c=>c.u===o.u&&c.v===o.v);return l?.kind==="redirect"&&l.direction?{...o,launchDirection:l.direction}:o}):r;return Object.freeze({revision:t,level:n,projection:s,stacks:a,...i?{selectedStackId:i}:{}})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Eo="186",xd=0,ul=1,Sd=2,es=1,Md=2,Yi=3,jn=0,Bt=1,un=2,Tn=0,Zi=1,dl=2,fl=3,hl=4,yd=5,bi=100,Ed=101,bd=102,Td=103,Ad=104,wd=200,Cd=201,Rd=202,Ld=203,Ic=204,Dc=205,Pd=206,Id=207,Dd=208,Nd=209,Ud=210,Od=211,Fd=212,Bd=213,kd=214,Sa=0,Ma=1,ya=2,nr=3,Ea=4,ba=5,Ta=6,Aa=7,Nc=0,zd=1,Hd=2,en=0,Uc=1,Oc=2,Fc=3,Bc=4,kc=5,zc=6,Hc=7,Vc=300,ei=301,Ii=302,Ps=303,Is=304,_s=306,wa=1e3,En=1001,Ca=1002,wt=1003,Vd=1004,yr=1005,Dt=1006,Ds=1007,Yn=1008,qt=1009,Gc=1010,Wc=1011,ir=1012,bo=1013,hn=1014,dn=1015,pn=1016,To=1017,Ao=1018,rr=1020,Xc=35902,qc=35899,Yc=1021,$c=1022,jt=1023,Cn=1026,$n=1027,Kc=1028,wo=1029,ti=1030,Co=1031,Ro=1033,ts=33776,ns=33777,is=33778,rs=33779,Ra=35840,La=35841,Pa=35842,Ia=35843,Da=36196,Na=37492,Ua=37496,Oa=37488,Fa=37489,ds=37490,Ba=37491,ka=37808,za=37809,Ha=37810,Va=37811,Ga=37812,Wa=37813,Xa=37814,qa=37815,Ya=37816,$a=37817,Ka=37818,Za=37819,Ja=37820,Qa=37821,ja=36492,eo=36494,to=36495,no=36283,io=36284,fs=36285,ro=36286,Gd=3200,pl=0,Wd=1,zn="",It="srgb",hs="srgb-linear",ps="linear",et="srgb",Ns=7680,Xd=519,qd=512,Yd=513,$d=514,Lo=515,Kd=516,Zd=517,Po=518,Jd=519,Qd=35044,ml="300 es",fn=2e3,ms=2001;function jd(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function sr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function ef(){const n=sr("canvas");return n.style.display="block",n}const gl={};function vl(...n){const e="THREE."+n.shift();console.log(e,...n)}function Zc(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Be(...n){n=Zc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Je(...n){n=Zc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Li(...n){const e=n.join(" ");e in gl||(gl[e]=!0,Be(...n))}function tf(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const nf={[Sa]:Ma,[ya]:Ta,[Ea]:Aa,[nr]:ba,[Ma]:Sa,[Ta]:ya,[Aa]:Ea,[ba]:nr};class ri{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Lt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Us=Math.PI/180,so=180/Math.PI;function Ui(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Lt[n&255]+Lt[n>>8&255]+Lt[n>>16&255]+Lt[n>>24&255]+"-"+Lt[e&255]+Lt[e>>8&255]+"-"+Lt[e>>16&15|64]+Lt[e>>24&255]+"-"+Lt[t&63|128]+Lt[t>>8&255]+"-"+Lt[t>>16&255]+Lt[t>>24&255]+Lt[i&255]+Lt[i>>8&255]+Lt[i>>16&255]+Lt[i>>24&255]).toLowerCase()}function Ye(n,e,t){return Math.max(e,Math.min(t,n))}function rf(n,e){return(n%e+e)%e}function Os(n,e,t){return(1-t)*n+t*e}function ki(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ft(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Ho=class Ho{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Ho.prototype.isVector2=!0;let Pe=Ho;class Oi{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],f=i[r+2],h=i[r+3],d=s[a+0],u=s[a+1],g=s[a+2],v=s[a+3];if(h!==v||l!==d||c!==u||f!==g){let p=l*d+c*u+f*g+h*v;p<0&&(d=-d,u=-u,g=-g,v=-v,p=-p);let m=1-o;if(p<.9995){const M=Math.acos(p),A=Math.sin(M);m=Math.sin(m*M)/A,o=Math.sin(o*M)/A,l=l*m+d*o,c=c*m+u*o,f=f*m+g*o,h=h*m+v*o}else{l=l*m+d*o,c=c*m+u*o,f=f*m+g*o,h=h*m+v*o;const M=1/Math.sqrt(l*l+c*c+f*f+h*h);l*=M,c*=M,f*=M,h*=M}}e[t]=l,e[t+1]=c,e[t+2]=f,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],f=i[r+3],h=s[a],d=s[a+1],u=s[a+2],g=s[a+3];return e[t]=o*g+f*h+l*u-c*d,e[t+1]=l*g+f*d+c*h-o*u,e[t+2]=c*g+f*u+o*d-l*h,e[t+3]=f*g-o*h-l*d-c*u,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),f=o(r/2),h=o(s/2),d=l(i/2),u=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=d*f*h+c*u*g,this._y=c*u*h-d*f*g,this._z=c*f*g+d*u*h,this._w=c*f*h-d*u*g;break;case"YXZ":this._x=d*f*h+c*u*g,this._y=c*u*h-d*f*g,this._z=c*f*g-d*u*h,this._w=c*f*h+d*u*g;break;case"ZXY":this._x=d*f*h-c*u*g,this._y=c*u*h+d*f*g,this._z=c*f*g+d*u*h,this._w=c*f*h-d*u*g;break;case"ZYX":this._x=d*f*h-c*u*g,this._y=c*u*h+d*f*g,this._z=c*f*g-d*u*h,this._w=c*f*h+d*u*g;break;case"YZX":this._x=d*f*h+c*u*g,this._y=c*u*h+d*f*g,this._z=c*f*g-d*u*h,this._w=c*f*h-d*u*g;break;case"XZY":this._x=d*f*h-c*u*g,this._y=c*u*h-d*f*g,this._z=c*f*g+d*u*h,this._w=c*f*h+d*u*g;break;default:Be("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],f=t[6],h=t[10],d=i+o+h;if(d>0){const u=.5/Math.sqrt(d+1);this._w=.25/u,this._x=(f-l)*u,this._y=(s-c)*u,this._z=(a-r)*u}else if(i>o&&i>h){const u=2*Math.sqrt(1+i-o-h);this._w=(f-l)/u,this._x=.25*u,this._y=(r+a)/u,this._z=(s+c)/u}else if(o>h){const u=2*Math.sqrt(1+o-i-h);this._w=(s-c)/u,this._x=(r+a)/u,this._y=.25*u,this._z=(l+f)/u}else{const u=2*Math.sqrt(1+h-i-o);this._w=(a-r)/u,this._x=(s+c)/u,this._y=(l+f)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ye(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,f=t._w;return this._x=i*f+a*o+r*c-s*l,this._y=r*f+a*l+s*o-i*c,this._z=s*f+a*c+i*l-r*o,this._w=a*f-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),f=Math.sin(c);l=Math.sin(l*c)/f,t=Math.sin(t*c)/f,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Vo=class Vo{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(_l.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(_l.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),f=2*(o*t-s*r),h=2*(s*i-a*t);return this.x=t+l*c+a*h-o*f,this.y=i+l*f+o*c-s*h,this.z=r+l*h+s*f-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Fs.copy(this).projectOnVector(e),this.sub(Fs)}reflect(e){return this.sub(Fs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Vo.prototype.isVector3=!0;let q=Vo;const Fs=new q,_l=new Oi,Go=class Go{constructor(e,t,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const f=this.elements;return f[0]=e,f[1]=r,f[2]=o,f[3]=t,f[4]=s,f[5]=l,f[6]=i,f[7]=a,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],f=i[4],h=i[7],d=i[2],u=i[5],g=i[8],v=r[0],p=r[3],m=r[6],M=r[1],A=r[4],x=r[7],T=r[2],E=r[5],C=r[8];return s[0]=a*v+o*M+l*T,s[3]=a*p+o*A+l*E,s[6]=a*m+o*x+l*C,s[1]=c*v+f*M+h*T,s[4]=c*p+f*A+h*E,s[7]=c*m+f*x+h*C,s[2]=d*v+u*M+g*T,s[5]=d*p+u*A+g*E,s[8]=d*m+u*x+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],f=e[8];return t*a*f-t*o*c-i*s*f+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],f=e[8],h=f*a-o*c,d=o*l-f*s,u=c*s-a*l,g=t*h+i*d+r*u;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=h*v,e[1]=(r*c-f*i)*v,e[2]=(o*i-r*a)*v,e[3]=d*v,e[4]=(f*t-r*l)*v,e[5]=(r*s-o*t)*v,e[6]=u*v,e[7]=(i*l-c*t)*v,e[8]=(a*t-i*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Li("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Bs.makeScale(e,t)),this}rotate(e){return Li("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Bs.makeRotation(-e)),this}translate(e,t){return Li("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Bs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Go.prototype.isMatrix3=!0;let ze=Go;const Bs=new ze,xl=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Sl=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function sf(){const n={enabled:!0,workingColorSpace:hs,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===et&&(r.r=An(r.r),r.g=An(r.g),r.b=An(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===et&&(r.r=Pi(r.r),r.g=Pi(r.g),r.b=Pi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===zn?ps:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Li("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Li("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[hs]:{primaries:e,whitePoint:i,transfer:ps,toXYZ:xl,fromXYZ:Sl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:It},outputColorSpaceConfig:{drawingBufferColorSpace:It}},[It]:{primaries:e,whitePoint:i,transfer:et,toXYZ:xl,fromXYZ:Sl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:It}}}),n}const $e=sf();function An(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Pi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let li;class af{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{li===void 0&&(li=sr("canvas")),li.width=e.width,li.height=e.height;const r=li.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=li}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=sr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=An(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(An(t[i]/255)*255):t[i]=An(t[i]);return{data:t,width:e.width,height:e.height}}else return Be("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let of=0;class Io{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:of++}),this.uuid=Ui(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(ks(r[a].image)):s.push(ks(r[a]))}else s=ks(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function ks(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?af.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Be("Texture: Unable to serialize Texture."),{})}let lf=0;const zs=new q;class Nt extends ri{constructor(e=Nt.DEFAULT_IMAGE,t=Nt.DEFAULT_MAPPING,i=En,r=En,s=Dt,a=Yn,o=jt,l=qt,c=Nt.DEFAULT_ANISOTROPY,f=zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:lf++}),this.uuid=Ui(),this.name="",this.source=new Io(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Pe(0,0),this.repeat=new Pe(1,1),this.center=new Pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(zs).x}get height(){return this.source.getSize(zs).y}get depth(){return this.source.getSize(zs).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Be(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Be(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Vc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case wa:e.x=e.x-Math.floor(e.x);break;case En:e.x=e.x<0?0:1;break;case Ca:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case wa:e.y=e.y-Math.floor(e.y);break;case En:e.y=e.y<0?0:1;break;case Ca:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Nt.DEFAULT_IMAGE=null;Nt.DEFAULT_MAPPING=Vc;Nt.DEFAULT_ANISOTROPY=1;const Wo=class Wo{constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],f=l[4],h=l[8],d=l[1],u=l[5],g=l[9],v=l[2],p=l[6],m=l[10];if(Math.abs(f-d)<.01&&Math.abs(h-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(f+d)<.1&&Math.abs(h+v)<.1&&Math.abs(g+p)<.1&&Math.abs(c+u+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const A=(c+1)/2,x=(u+1)/2,T=(m+1)/2,E=(f+d)/4,C=(h+v)/4,S=(g+p)/4;return A>x&&A>T?A<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(A),r=E/i,s=C/i):x>T?x<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),i=E/r,s=S/r):T<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(T),i=C/s,r=S/s),this.set(i,r,s,t),this}let M=Math.sqrt((p-g)*(p-g)+(h-v)*(h-v)+(d-f)*(d-f));return Math.abs(M)<.001&&(M=1),this.x=(p-g)/M,this.y=(h-v)/M,this.z=(d-f)/M,this.w=Math.acos((c+u+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this.w=Ye(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this.w=Ye(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Wo.prototype.isVector4=!0;let ht=Wo;class cf extends ri{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new ht(0,0,e,t),this.scissorTest=!1,this.viewport=new ht(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new Nt(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Dt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Io(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class tn extends cf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Jc extends Nt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=wt,this.minFilter=wt,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class uf extends Nt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=wt,this.minFilter=wt,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const vs=class vs{constructor(e,t,i,r,s,a,o,l,c,f,h,d,u,g,v,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,f,h,d,u,g,v,p)}set(e,t,i,r,s,a,o,l,c,f,h,d,u,g,v,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=r,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=f,m[10]=h,m[14]=d,m[3]=u,m[7]=g,m[11]=v,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new vs().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/ci.setFromMatrixColumn(e,0).length(),s=1/ci.setFromMatrixColumn(e,1).length(),a=1/ci.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),f=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=a*f,u=a*h,g=o*f,v=o*h;t[0]=l*f,t[4]=-l*h,t[8]=c,t[1]=u+g*c,t[5]=d-v*c,t[9]=-o*l,t[2]=v-d*c,t[6]=g+u*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*f,u=l*h,g=c*f,v=c*h;t[0]=d+v*o,t[4]=g*o-u,t[8]=a*c,t[1]=a*h,t[5]=a*f,t[9]=-o,t[2]=u*o-g,t[6]=v+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*f,u=l*h,g=c*f,v=c*h;t[0]=d-v*o,t[4]=-a*h,t[8]=g+u*o,t[1]=u+g*o,t[5]=a*f,t[9]=v-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*f,u=a*h,g=o*f,v=o*h;t[0]=l*f,t[4]=g*c-u,t[8]=d*c+v,t[1]=l*h,t[5]=v*c+d,t[9]=u*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,u=a*c,g=o*l,v=o*c;t[0]=l*f,t[4]=v-d*h,t[8]=g*h+u,t[1]=h,t[5]=a*f,t[9]=-o*f,t[2]=-c*f,t[6]=u*h+g,t[10]=d-v*h}else if(e.order==="XZY"){const d=a*l,u=a*c,g=o*l,v=o*c;t[0]=l*f,t[4]=-h,t[8]=c*f,t[1]=d*h+v,t[5]=a*f,t[9]=u*h-g,t[2]=g*h-u,t[6]=o*f,t[10]=v*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(df,e,ff)}lookAt(e,t,i){const r=this.elements;return zt.subVectors(e,t),zt.lengthSq()===0&&(zt.z=1),zt.normalize(),Dn.crossVectors(i,zt),Dn.lengthSq()===0&&(Math.abs(i.z)===1?zt.x+=1e-4:zt.z+=1e-4,zt.normalize(),Dn.crossVectors(i,zt)),Dn.normalize(),Er.crossVectors(zt,Dn),r[0]=Dn.x,r[4]=Er.x,r[8]=zt.x,r[1]=Dn.y,r[5]=Er.y,r[9]=zt.y,r[2]=Dn.z,r[6]=Er.z,r[10]=zt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],f=i[1],h=i[5],d=i[9],u=i[13],g=i[2],v=i[6],p=i[10],m=i[14],M=i[3],A=i[7],x=i[11],T=i[15],E=r[0],C=r[4],S=r[8],b=r[12],I=r[1],R=r[5],L=r[9],D=r[13],N=r[2],H=r[6],Z=r[10],J=r[14],U=r[3],X=r[7],te=r[11],Q=r[15];return s[0]=a*E+o*I+l*N+c*U,s[4]=a*C+o*R+l*H+c*X,s[8]=a*S+o*L+l*Z+c*te,s[12]=a*b+o*D+l*J+c*Q,s[1]=f*E+h*I+d*N+u*U,s[5]=f*C+h*R+d*H+u*X,s[9]=f*S+h*L+d*Z+u*te,s[13]=f*b+h*D+d*J+u*Q,s[2]=g*E+v*I+p*N+m*U,s[6]=g*C+v*R+p*H+m*X,s[10]=g*S+v*L+p*Z+m*te,s[14]=g*b+v*D+p*J+m*Q,s[3]=M*E+A*I+x*N+T*U,s[7]=M*C+A*R+x*H+T*X,s[11]=M*S+A*L+x*Z+T*te,s[15]=M*b+A*D+x*J+T*Q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],f=e[2],h=e[6],d=e[10],u=e[14],g=e[3],v=e[7],p=e[11],m=e[15],M=l*u-c*d,A=o*u-c*h,x=o*d-l*h,T=a*u-c*f,E=a*d-l*f,C=a*h-o*f;return t*(v*M-p*A+m*x)-i*(g*M-p*T+m*E)+r*(g*A-v*T+m*C)-s*(g*x-v*E+p*C)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],f=e[10];return t*(a*f-o*c)-i*(s*f-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],f=e[8],h=e[9],d=e[10],u=e[11],g=e[12],v=e[13],p=e[14],m=e[15],M=t*o-i*a,A=t*l-r*a,x=t*c-s*a,T=i*l-r*o,E=i*c-s*o,C=r*c-s*l,S=f*v-h*g,b=f*p-d*g,I=f*m-u*g,R=h*p-d*v,L=h*m-u*v,D=d*m-u*p,N=M*D-A*L+x*R+T*I-E*b+C*S;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const H=1/N;return e[0]=(o*D-l*L+c*R)*H,e[1]=(r*L-i*D-s*R)*H,e[2]=(v*C-p*E+m*T)*H,e[3]=(d*E-h*C-u*T)*H,e[4]=(l*I-a*D-c*b)*H,e[5]=(t*D-r*I+s*b)*H,e[6]=(p*x-g*C-m*A)*H,e[7]=(f*C-d*x+u*A)*H,e[8]=(a*L-o*I+c*S)*H,e[9]=(i*I-t*L-s*S)*H,e[10]=(g*E-v*x+m*M)*H,e[11]=(h*x-f*E-u*M)*H,e[12]=(o*b-a*R-l*S)*H,e[13]=(t*R-i*b+r*S)*H,e[14]=(v*A-g*T-p*M)*H,e[15]=(f*T-h*A+d*M)*H,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,f=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,f*o+i,f*l-r*a,0,c*l-r*o,f*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,f=a+a,h=o+o,d=s*c,u=s*f,g=s*h,v=a*f,p=a*h,m=o*h,M=l*c,A=l*f,x=l*h,T=i.x,E=i.y,C=i.z;return r[0]=(1-(v+m))*T,r[1]=(u+x)*T,r[2]=(g-A)*T,r[3]=0,r[4]=(u-x)*E,r[5]=(1-(d+m))*E,r[6]=(p+M)*E,r[7]=0,r[8]=(g+A)*C,r[9]=(p-M)*C,r[10]=(1-(d+v))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=ci.set(r[0],r[1],r[2]).length();const o=ci.set(r[4],r[5],r[6]).length(),l=ci.set(r[8],r[9],r[10]).length();s<0&&(a=-a),$t.copy(this);const c=1/a,f=1/o,h=1/l;return $t.elements[0]*=c,$t.elements[1]*=c,$t.elements[2]*=c,$t.elements[4]*=f,$t.elements[5]*=f,$t.elements[6]*=f,$t.elements[8]*=h,$t.elements[9]*=h,$t.elements[10]*=h,t.setFromRotationMatrix($t),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,r,s,a,o=fn,l=!1){const c=this.elements,f=2*s/(t-e),h=2*s/(i-r),d=(t+e)/(t-e),u=(i+r)/(i-r);let g,v;if(l)g=s/(a-s),v=a*s/(a-s);else if(o===fn)g=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===ms)g=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=fn,l=!1){const c=this.elements,f=2/(t-e),h=2/(i-r),d=-(t+e)/(t-e),u=-(i+r)/(i-r);let g,v;if(l)g=1/(a-s),v=a/(a-s);else if(o===fn)g=-2/(a-s),v=-(a+s)/(a-s);else if(o===ms)g=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=u,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};vs.prototype.isMatrix4=!0;let vt=vs;const ci=new q,$t=new vt,df=new q(0,0,0),ff=new q(1,1,1),Dn=new q,Er=new q,zt=new q,Ml=new vt,yl=new Oi;class ni{constructor(e=0,t=0,i=0,r=ni.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],f=r[9],h=r[2],d=r[6],u=r[10];switch(t){case"XYZ":this._y=Math.asin(Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,u),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,u),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ye(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,u),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-Ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-f,u),this._y=0);break;default:Be("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Ml.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ml,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return yl.setFromEuler(this),this.setFromQuaternion(yl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ni.DEFAULT_ORDER="XYZ";class Qc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let hf=0;const El=new q,ui=new Oi,_n=new vt,br=new q,zi=new q,pf=new q,mf=new Oi,bl=new q(1,0,0),Tl=new q(0,1,0),Al=new q(0,0,1),wl={type:"added"},gf={type:"removed"},di={type:"childadded",child:null},Hs={type:"childremoved",child:null};class Vt extends ri{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hf++}),this.uuid=Ui(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Vt.DEFAULT_UP.clone();const e=new q,t=new ni,i=new Oi,r=new q(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new vt},normalMatrix:{value:new ze}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=Vt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Qc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ui.setFromAxisAngle(e,t),this.quaternion.multiply(ui),this}rotateOnWorldAxis(e,t){return ui.setFromAxisAngle(e,t),this.quaternion.premultiply(ui),this}rotateX(e){return this.rotateOnAxis(bl,e)}rotateY(e){return this.rotateOnAxis(Tl,e)}rotateZ(e){return this.rotateOnAxis(Al,e)}translateOnAxis(e,t){return El.copy(e).applyQuaternion(this.quaternion),this.position.add(El.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(bl,e)}translateY(e){return this.translateOnAxis(Tl,e)}translateZ(e){return this.translateOnAxis(Al,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_n.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?br.copy(e):br.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),zi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_n.lookAt(zi,br,this.up):_n.lookAt(br,zi,this.up),this.quaternion.setFromRotationMatrix(_n),r&&(_n.extractRotation(r.matrixWorld),ui.setFromRotationMatrix(_n),this.quaternion.premultiply(ui.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(wl),di.child=e,this.dispatchEvent(di),di.child=null):Je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(gf),Hs.child=e,this.dispatchEvent(Hs),Hs.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_n.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_n.multiply(e.parent.matrixWorld)),e.applyMatrix4(_n),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(wl),di.child=e,this.dispatchEvent(di),di.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zi,e,pf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zi,mf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,f=l.length;c<f;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),f=a(e.images),h=a(e.shapes),d=a(e.skeletons),u=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),u.length>0&&(i.animations=u),g.length>0&&(i.nodes=g)}return i.object=r,i;function a(o){const l=[];for(const c in o){const f=o[c];delete f.metadata,l.push(f)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Vt.DEFAULT_UP=new q(0,1,0);Vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Tr extends Vt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const vf={type:"move"};class Vs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Tr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Tr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Tr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new q,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const p=t.getJointPose(v,i),m=this._getHandJoint(c,v);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const f=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=f.position.distanceTo(h.position),u=.02,g=.005;c.inputState.pinching&&d>u+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=u-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(vf)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Tr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const jc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nn={h:0,s:0,l:0},Ar={h:0,s:0,l:0};function Gs(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class He{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=It){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=$e.workingColorSpace){return this.r=e,this.g=t,this.b=i,$e.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=$e.workingColorSpace){if(e=rf(e,1),t=Ye(t,0,1),i=Ye(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Gs(a,s,e+1/3),this.g=Gs(a,s,e),this.b=Gs(a,s,e-1/3)}return $e.colorSpaceToWorking(this,r),this}setStyle(e,t=It){function i(s){s!==void 0&&parseFloat(s)<1&&Be("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Be("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Be("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=It){const i=jc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Be("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=An(e.r),this.g=An(e.g),this.b=An(e.b),this}copyLinearToSRGB(e){return this.r=Pi(e.r),this.g=Pi(e.g),this.b=Pi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=It){return $e.workingToColorSpace(Pt.copy(this),e),Math.round(Ye(Pt.r*255,0,255))*65536+Math.round(Ye(Pt.g*255,0,255))*256+Math.round(Ye(Pt.b*255,0,255))}getHexString(e=It){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.workingToColorSpace(Pt.copy(this),t);const i=Pt.r,r=Pt.g,s=Pt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const f=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=f<=.5?h/(a+o):h/(2-a-o),a){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=f,e}getRGB(e,t=$e.workingColorSpace){return $e.workingToColorSpace(Pt.copy(this),t),e.r=Pt.r,e.g=Pt.g,e.b=Pt.b,e}getStyle(e=It){$e.workingToColorSpace(Pt.copy(this),e);const t=Pt.r,i=Pt.g,r=Pt.b;return e!==It?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Nn),this.setHSL(Nn.h+e,Nn.s+t,Nn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Nn),e.getHSL(Ar);const i=Os(Nn.h,Ar.h,t),r=Os(Nn.s,Ar.s,t),s=Os(Nn.l,Ar.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pt=new He;He.NAMES=jc;class Ws extends Vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ni,this.environmentIntensity=1,this.environmentRotation=new ni,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Kt=new q,xn=new q,Xs=new q,Sn=new q,fi=new q,hi=new q,Cl=new q,qs=new q,Ys=new q,$s=new q,Ks=new ht,Zs=new ht,Js=new ht;class Qt{constructor(e=new q,t=new q,i=new q){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Kt.subVectors(e,t),r.cross(Kt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Kt.subVectors(r,t),xn.subVectors(i,t),Xs.subVectors(e,t);const a=Kt.dot(Kt),o=Kt.dot(xn),l=Kt.dot(Xs),c=xn.dot(xn),f=xn.dot(Xs),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const d=1/h,u=(c*l-o*f)*d,g=(a*f-o*l)*d;return s.set(1-u-g,g,u)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Sn)===null?!1:Sn.x>=0&&Sn.y>=0&&Sn.x+Sn.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,Sn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Sn.x),l.addScaledVector(a,Sn.y),l.addScaledVector(o,Sn.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return Ks.setScalar(0),Zs.setScalar(0),Js.setScalar(0),Ks.fromBufferAttribute(e,t),Zs.fromBufferAttribute(e,i),Js.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Ks,s.x),a.addScaledVector(Zs,s.y),a.addScaledVector(Js,s.z),a}static isFrontFacing(e,t,i,r){return Kt.subVectors(i,t),xn.subVectors(e,t),Kt.cross(xn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Kt.subVectors(this.c,this.b),xn.subVectors(this.a,this.b),Kt.cross(xn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Qt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Qt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return Qt.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Qt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Qt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;fi.subVectors(r,i),hi.subVectors(s,i),qs.subVectors(e,i);const l=fi.dot(qs),c=hi.dot(qs);if(l<=0&&c<=0)return t.copy(i);Ys.subVectors(e,r);const f=fi.dot(Ys),h=hi.dot(Ys);if(f>=0&&h<=f)return t.copy(r);const d=l*h-f*c;if(d<=0&&l>=0&&f<=0)return a=l/(l-f),t.copy(i).addScaledVector(fi,a);$s.subVectors(e,s);const u=fi.dot($s),g=hi.dot($s);if(g>=0&&u<=g)return t.copy(s);const v=u*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(hi,o);const p=f*g-u*h;if(p<=0&&h-f>=0&&u-g>=0)return Cl.subVectors(s,r),o=(h-f)/(h-f+(u-g)),t.copy(r).addScaledVector(Cl,o);const m=1/(p+v+d);return a=v*m,o=d*m,t.copy(i).addScaledVector(fi,a).addScaledVector(hi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class fr{constructor(e=new q(1/0,1/0,1/0),t=new q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Zt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Zt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Zt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Zt):Zt.fromBufferAttribute(s,a),Zt.applyMatrix4(e.matrixWorld),this.expandByPoint(Zt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),wr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),wr.copy(i.boundingBox)),wr.applyMatrix4(e.matrixWorld),this.union(wr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Zt),Zt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Hi),Cr.subVectors(this.max,Hi),pi.subVectors(e.a,Hi),mi.subVectors(e.b,Hi),gi.subVectors(e.c,Hi),Un.subVectors(mi,pi),On.subVectors(gi,mi),Vn.subVectors(pi,gi);let t=[0,-Un.z,Un.y,0,-On.z,On.y,0,-Vn.z,Vn.y,Un.z,0,-Un.x,On.z,0,-On.x,Vn.z,0,-Vn.x,-Un.y,Un.x,0,-On.y,On.x,0,-Vn.y,Vn.x,0];return!Qs(t,pi,mi,gi,Cr)||(t=[1,0,0,0,1,0,0,0,1],!Qs(t,pi,mi,gi,Cr))?!1:(Rr.crossVectors(Un,On),t=[Rr.x,Rr.y,Rr.z],Qs(t,pi,mi,gi,Cr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Zt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Zt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Mn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Mn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Mn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Mn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Mn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Mn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Mn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Mn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Mn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Mn=[new q,new q,new q,new q,new q,new q,new q,new q],Zt=new q,wr=new fr,pi=new q,mi=new q,gi=new q,Un=new q,On=new q,Vn=new q,Hi=new q,Cr=new q,Rr=new q,Gn=new q;function Qs(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Gn.fromArray(n,s);const o=r.x*Math.abs(Gn.x)+r.y*Math.abs(Gn.y)+r.z*Math.abs(Gn.z),l=e.dot(Gn),c=t.dot(Gn),f=i.dot(Gn);if(Math.max(-Math.max(l,c,f),Math.min(l,c,f))>o)return!1}return!0}const xt=new q,Lr=new Pe;let _f=0;class wn extends ri{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:_f++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Qd,this.updateRanges=[],this.gpuType=dn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Lr.fromBufferAttribute(this,t),Lr.applyMatrix3(e),this.setXY(t,Lr.x,Lr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix3(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix4(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyNormalMatrix(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.transformDirection(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ki(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Ft(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ki(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ki(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ki(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ki(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),i=Ft(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),i=Ft(i,this.array),r=Ft(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),i=Ft(i,this.array),r=Ft(r,this.array),s=Ft(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class eu extends wn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class tu extends wn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class St extends wn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const xf=new fr,Vi=new q,js=new q;class Do{constructor(e=new q,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):xf.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Vi.subVectors(e,this.center);const t=Vi.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Vi,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(js.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Vi.copy(e.center).add(js)),this.expandByPoint(Vi.copy(e.center).sub(js))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Sf=0;const Xt=new vt,ea=new Vt,vi=new q,Ht=new fr,Gi=new fr,bt=new q;class kt extends ri{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sf++}),this.uuid=Ui(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(jd(e)?tu:eu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new ze().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Xt.makeRotationFromQuaternion(e),this.applyMatrix4(Xt),this}rotateX(e){return Xt.makeRotationX(e),this.applyMatrix4(Xt),this}rotateY(e){return Xt.makeRotationY(e),this.applyMatrix4(Xt),this}rotateZ(e){return Xt.makeRotationZ(e),this.applyMatrix4(Xt),this}translate(e,t,i){return Xt.makeTranslation(e,t,i),this.applyMatrix4(Xt),this}scale(e,t,i){return Xt.makeScale(e,t,i),this.applyMatrix4(Xt),this}lookAt(e){return ea.lookAt(e),ea.updateMatrix(),this.applyMatrix4(ea.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vi).negate(),this.translate(vi.x,vi.y,vi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new St(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Be("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new q(-1/0,-1/0,-1/0),new q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Ht.setFromBufferAttribute(s),this.morphTargetsRelative?(bt.addVectors(this.boundingBox.min,Ht.min),this.boundingBox.expandByPoint(bt),bt.addVectors(this.boundingBox.max,Ht.max),this.boundingBox.expandByPoint(bt)):(this.boundingBox.expandByPoint(Ht.min),this.boundingBox.expandByPoint(Ht.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Do);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new q,1/0);return}if(e){const i=this.boundingSphere.center;if(Ht.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Gi.setFromBufferAttribute(o),this.morphTargetsRelative?(bt.addVectors(Ht.min,Gi.min),Ht.expandByPoint(bt),bt.addVectors(Ht.max,Gi.max),Ht.expandByPoint(bt)):(Ht.expandByPoint(Gi.min),Ht.expandByPoint(Gi.max))}Ht.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)bt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(bt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,f=o.count;c<f;c++)bt.fromBufferAttribute(o,c),l&&(vi.fromBufferAttribute(e,c),bt.add(vi)),r=Math.max(r,i.distanceToSquared(bt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new wn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let S=0;S<i.count;S++)o[S]=new q,l[S]=new q;const c=new q,f=new q,h=new q,d=new Pe,u=new Pe,g=new Pe,v=new q,p=new q;function m(S,b,I){c.fromBufferAttribute(i,S),f.fromBufferAttribute(i,b),h.fromBufferAttribute(i,I),d.fromBufferAttribute(s,S),u.fromBufferAttribute(s,b),g.fromBufferAttribute(s,I),f.sub(c),h.sub(c),u.sub(d),g.sub(d);const R=1/(u.x*g.y-g.x*u.y);isFinite(R)&&(v.copy(f).multiplyScalar(g.y).addScaledVector(h,-u.y).multiplyScalar(R),p.copy(h).multiplyScalar(u.x).addScaledVector(f,-g.x).multiplyScalar(R),o[S].add(v),o[b].add(v),o[I].add(v),l[S].add(p),l[b].add(p),l[I].add(p))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let S=0,b=M.length;S<b;++S){const I=M[S],R=I.start,L=I.count;for(let D=R,N=R+L;D<N;D+=3)m(e.getX(D+0),e.getX(D+1),e.getX(D+2))}const A=new q,x=new q,T=new q,E=new q;function C(S){T.fromBufferAttribute(r,S),E.copy(T);const b=o[S];A.copy(b),A.sub(T.multiplyScalar(T.dot(b))).normalize(),x.crossVectors(E,b);const R=x.dot(l[S])<0?-1:1;a.setXYZW(S,A.x,A.y,A.z,R)}for(let S=0,b=M.length;S<b;++S){const I=M[S],R=I.start,L=I.count;for(let D=R,N=R+L;D<N;D+=3)C(e.getX(D+0)),C(e.getX(D+1)),C(e.getX(D+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new wn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,u=i.count;d<u;d++)i.setXYZ(d,0,0,0);const r=new q,s=new q,a=new q,o=new q,l=new q,c=new q,f=new q,h=new q;if(e)for(let d=0,u=e.count;d<u;d+=3){const g=e.getX(d+0),v=e.getX(d+1),p=e.getX(d+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,p),f.subVectors(a,s),h.subVectors(r,s),f.cross(h),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,p),o.add(f),l.add(f),c.add(f),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,u=t.count;d<u;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),f.subVectors(a,s),h.subVectors(r,s),f.cross(h),i.setXYZ(d+0,f.x,f.y,f.z),i.setXYZ(d+1,f.x,f.y,f.z),i.setXYZ(d+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)bt.fromBufferAttribute(e,t),bt.normalize(),e.setXYZ(t,bt.x,bt.y,bt.z)}toNonIndexed(){function e(o,l){const c=o.array,f=o.itemSize,h=o.normalized,d=new c.constructor(l.length*f);let u=0,g=0;for(let v=0,p=l.length;v<p;v++){o.isInterleavedBufferAttribute?u=l[v]*o.data.stride+o.offset:u=l[v]*f;for(let m=0;m<f;m++)d[g++]=c[u++]}return new wn(d,f,h)}if(this.index===null)return Be("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new kt,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let f=0,h=c.length;f<h;f++){const d=c[f],u=e(d,i);l.push(u)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],f=[];for(let h=0,d=c.length;h<d;h++){const u=c[h];f.push(u.toJSON(e.data))}f.length>0&&(r[l]=f,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const f=r[c];this.setAttribute(c,f.clone(t))}const s=e.morphAttributes;for(const c in s){const f=[],h=s[c];for(let d=0,u=h.length;d<u;d++)f.push(h[d].clone(t));this.morphAttributes[c]=f}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,f=a.length;c<f;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ta=new q,Mf=new q,yf=new ze;class kn{constructor(e=new q(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=ta.subVectors(i,t).cross(Mf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(ta),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||yf.getNormalMatrix(e),r=this.coplanarPoint(ta).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Ef=0;class xs extends ri{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ef++}),this.uuid=Ui(),this.name="",this.type="Material",this.blending=Zi,this.side=jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ic,this.blendDst=Dc,this.blendEquation=bi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new He(0,0,0),this.blendAlpha=0,this.depthFunc=nr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ns,this.stencilZFail=Ns,this.stencilZPass=Ns,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Be(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Be(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new He().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new kn().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Pe().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Pe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const yn=new q,na=new q,Pr=new q,Ir=new q;class bf{constructor(e=new q,t=new q(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,yn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=yn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(yn.copy(this.origin).addScaledVector(this.direction,t),yn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){na.copy(e).add(t).multiplyScalar(.5),Pr.copy(t).sub(e).normalize(),Ir.copy(this.origin).sub(na);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Pr),o=Ir.dot(this.direction),l=-Ir.dot(Pr),c=Ir.lengthSq(),f=Math.abs(1-a*a);let h,d,u,g;if(f>0)if(h=a*l-o,d=a*o-l,g=s*f,h>=0)if(d>=-g)if(d<=g){const v=1/f;h*=v,d*=v,u=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=s,h=Math.max(0,-(a*d+o)),u=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(a*d+o)),u=-h*h+d*(d+2*l)+c;else d<=-g?(h=Math.max(0,-(-a*s+o)),d=h>0?-s:Math.min(Math.max(-s,-l),s),u=-h*h+d*(d+2*l)+c):d<=g?(h=0,d=Math.min(Math.max(-s,-l),s),u=d*(d+2*l)+c):(h=Math.max(0,-(a*s+o)),d=h>0?s:Math.min(Math.max(-s,-l),s),u=-h*h+d*(d+2*l)+c);else d=a>0?-s:s,h=Math.max(0,-(a*d+o)),u=-h*h+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(na).addScaledVector(Pr,d),u}intersectSphere(e,t){if(e.radius<0)return null;yn.subVectors(e.center,this.origin);const i=yn.dot(this.direction),r=yn.dot(yn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,f=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),f>=0?(s=(e.min.y-d.y)*f,a=(e.max.y-d.y)*f):(s=(e.max.y-d.y)*f,a=(e.min.y-d.y)*f),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,yn)!==null}intersectTriangle(e,t,i,r,s){const a=this.origin,o=this.direction,l=o.x,c=o.y,f=o.z,h=e.x-a.x,d=e.y-a.y,u=e.z-a.z,g=t.x-a.x,v=t.y-a.y,p=t.z-a.z,m=i.x-a.x,M=i.y-a.y,A=i.z-a.z,x=Math.abs(l),T=Math.abs(c),E=Math.abs(f);let C,S,b,I,R,L,D,N,H,Z,J,U;if(x>=T&&x>=E?(b=l,L=h,H=g,U=m,l>=0?(C=c,S=f,I=d,R=u,D=v,N=p,Z=M,J=A):(C=f,S=c,I=u,R=d,D=p,N=v,Z=A,J=M)):T>=E?(b=c,L=d,H=v,U=M,c>=0?(C=f,S=l,I=u,R=h,D=p,N=g,Z=A,J=m):(C=l,S=f,I=h,R=u,D=g,N=p,Z=m,J=A)):(b=f,L=u,H=p,U=A,f>=0?(C=l,S=c,I=h,R=d,D=g,N=v,Z=m,J=M):(C=c,S=l,I=d,R=h,D=v,N=g,Z=M,J=m)),b===0)return null;const X=C/b,te=S/b,Q=1/b,ee=I-X*L,ie=R-te*L,Ce=D-X*H,_e=N-te*H,fe=Z-X*U,G=J-te*U,Y=fe*_e-G*Ce,se=ee*G-ie*fe,he=Ce*ie-_e*ee;if(r){if(Y<0||se<0||he<0)return null}else if((Y<0||se<0||he<0)&&(Y>0||se>0||he>0))return null;const ce=Y+se+he;if(ce===0)return null;const de=Q*(Y*L+se*H+he*U);return(ce>0?de<0:de>0)?null:this.at(de/ce,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rt extends xs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.combine=Nc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Rl=new vt,Wn=new bf,Dr=new Do,Ll=new q,Nr=new q,Ur=new q,Or=new q,ia=new q,Fr=new q,Pl=new q,Br=new q;class mn extends Vt{constructor(e=new kt,t=new rt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Fr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const f=o[l],h=s[l];f!==0&&(ia.fromBufferAttribute(h,e),a?Fr.addScaledVector(ia,f):Fr.addScaledVector(ia.sub(t),f))}t.add(Fr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Dr.copy(i.boundingSphere),Dr.applyMatrix4(s),Wn.copy(e.ray).recast(e.near),!(Dr.containsPoint(Wn.origin)===!1&&(Wn.intersectSphere(Dr,Ll)===null||Wn.origin.distanceToSquared(Ll)>(e.far-e.near)**2))&&(Rl.copy(s).invert(),Wn.copy(e.ray).applyMatrix4(Rl),!(i.boundingBox!==null&&Wn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Wn)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,f=s.attributes.uv1,h=s.attributes.normal,d=s.groups,u=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const p=d[g],m=a[p.materialIndex],M=Math.max(p.start,u.start),A=Math.min(o.count,Math.min(p.start+p.count,u.start+u.count));for(let x=M,T=A;x<T;x+=3){const E=o.getX(x),C=o.getX(x+1),S=o.getX(x+2);r=kr(this,m,e,i,c,f,h,E,C,S),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,u.start),v=Math.min(o.count,u.start+u.count);for(let p=g,m=v;p<m;p+=3){const M=o.getX(p),A=o.getX(p+1),x=o.getX(p+2);r=kr(this,a,e,i,c,f,h,M,A,x),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const p=d[g],m=a[p.materialIndex],M=Math.max(p.start,u.start),A=Math.min(l.count,Math.min(p.start+p.count,u.start+u.count));for(let x=M,T=A;x<T;x+=3){const E=x,C=x+1,S=x+2;r=kr(this,m,e,i,c,f,h,E,C,S),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,u.start),v=Math.min(l.count,u.start+u.count);for(let p=g,m=v;p<m;p+=3){const M=p,A=p+1,x=p+2;r=kr(this,a,e,i,c,f,h,M,A,x),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function Tf(n,e,t,i,r,s,a,o){let l;if(e.side===Bt?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===jn,o),l===null)return null;Br.copy(o),Br.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Br);return c<t.near||c>t.far?null:{distance:c,point:Br.clone(),object:n}}function kr(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,Nr),n.getVertexPosition(l,Ur),n.getVertexPosition(c,Or);const f=Tf(n,e,t,i,Nr,Ur,Or,Pl);if(f){const h=new q;Qt.getBarycoord(Pl,Nr,Ur,Or,h),r&&(f.uv=Qt.getInterpolatedAttribute(r,o,l,c,h,new Pe)),s&&(f.uv1=Qt.getInterpolatedAttribute(s,o,l,c,h,new Pe)),a&&(f.normal=Qt.getInterpolatedAttribute(a,o,l,c,h,new q),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new q,materialIndex:0};Qt.getNormal(Nr,Ur,Or,d.normal),f.face=d,f.barycoord=h}return f}class Af extends Nt{constructor(e=null,t=1,i=1,r,s,a,o,l,c=wt,f=wt,h,d){super(null,a,o,l,c,f,r,s,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Xn=new Do,wf=new Pe(.5,.5),zr=new q;class nu{constructor(e=new kn,t=new kn,i=new kn,r=new kn,s=new kn,a=new kn){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=fn,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],f=s[4],h=s[5],d=s[6],u=s[7],g=s[8],v=s[9],p=s[10],m=s[11],M=s[12],A=s[13],x=s[14],T=s[15];if(r[0].setComponents(c-a,u-f,m-g,T-M).normalize(),r[1].setComponents(c+a,u+f,m+g,T+M).normalize(),r[2].setComponents(c+o,u+h,m+v,T+A).normalize(),r[3].setComponents(c-o,u-h,m-v,T-A).normalize(),i)r[4].setComponents(l,d,p,x).normalize(),r[5].setComponents(c-l,u-d,m-p,T-x).normalize();else if(r[4].setComponents(c-l,u-d,m-p,T-x).normalize(),t===fn)r[5].setComponents(c+l,u+d,m+p,T+x).normalize();else if(t===ms)r[5].setComponents(l,d,p,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Xn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Xn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Xn)}intersectsSprite(e){Xn.center.set(0,0,0);const t=wf.distanceTo(e.center);return Xn.radius=.7071067811865476+t,Xn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Xn)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(zr.x=r.normal.x>0?e.max.x:e.min.x,zr.y=r.normal.y>0?e.max.y:e.min.y,zr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(zr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class iu extends Nt{constructor(e=[],t=ei,i,r,s,a,o,l,c,f){super(e,t,i,r,s,a,o,l,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ar extends Nt{constructor(e,t,i=hn,r,s,a,o=wt,l=wt,c,f=Cn,h=1){if(f!==Cn&&f!==$n)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:h};super(d,r,s,a,o,l,f,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Io(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Cf extends ar{constructor(e,t=hn,i=ei,r,s,a=wt,o=wt,l,c=Cn){const f={width:e,height:e,depth:1},h=[f,f,f,f,f,f];super(e,e,t,i,r,s,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class ru extends Nt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class hr extends kt{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],f=[],h=[];let d=0,u=0;g("z","y","x",-1,-1,i,t,e,a,s,0),g("z","y","x",1,-1,i,t,-e,a,s,1),g("x","z","y",1,1,e,i,t,r,a,2),g("x","z","y",1,-1,e,i,-t,r,a,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new St(c,3)),this.setAttribute("normal",new St(f,3)),this.setAttribute("uv",new St(h,2));function g(v,p,m,M,A,x,T,E,C,S,b){const I=x/C,R=T/S,L=x/2,D=T/2,N=E/2,H=C+1,Z=S+1;let J=0,U=0;const X=new q;for(let te=0;te<Z;te++){const Q=te*R-D;for(let ee=0;ee<H;ee++){const ie=ee*I-L;X[v]=ie*M,X[p]=Q*A,X[m]=N,c.push(X.x,X.y,X.z),X[v]=0,X[p]=0,X[m]=E>0?1:-1,f.push(X.x,X.y,X.z),h.push(ee/C),h.push(1-te/S),J+=1}}for(let te=0;te<S;te++)for(let Q=0;Q<C;Q++){const ee=d+Q+H*te,ie=d+Q+H*(te+1),Ce=d+(Q+1)+H*(te+1),_e=d+(Q+1)+H*te;l.push(ee,ie,_e),l.push(ie,Ce,_e),U+=6}o.addGroup(u,U,b),u+=U,d+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class vn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Be("Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let r=0;const s=i.length;let a;t?a=t:a=e*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=i[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===a)return r/(s-1);const f=i[r],d=i[r+1]-f,u=(a-f)/d;return(r+u)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new Pe:new q);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new q,r=[],s=[],a=[],o=new q,l=new vt;for(let u=0;u<=e;u++){const g=u/e;r[u]=this.getTangentAt(g,new q)}s[0]=new q,a[0]=new q;let c=Number.MAX_VALUE;const f=Math.abs(r[0].x),h=Math.abs(r[0].y),d=Math.abs(r[0].z);f<=c&&(c=f,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),d<=c&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let u=1;u<=e;u++){if(s[u]=s[u-1].clone(),a[u]=a[u-1].clone(),o.crossVectors(r[u-1],r[u]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Ye(r[u-1].dot(r[u]),-1,1));s[u].applyMatrix4(l.makeRotationAxis(o,g))}a[u].crossVectors(r[u],s[u])}if(t===!0){let u=Math.acos(Ye(s[0].dot(s[e]),-1,1));u/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(u=-u);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],u*g)),a[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class No extends vn{constructor(e=0,t=0,i=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new Pe){const i=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const f=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=l-this.aX,u=c-this.aY;l=d*f-u*h+this.aX,c=d*h+u*f+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Rf extends No{constructor(e,t,i,r,s,a){super(e,t,i,i,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Uo(){let n=0,e=0,t=0,i=0;function r(s,a,o,l){n=s,e=o,t=-3*s+3*a-2*o-l,i=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,f,h){let d=(a-s)/c-(o-s)/(c+f)+(o-a)/f,u=(o-a)/f-(l-a)/(f+h)+(l-o)/h;d*=f,u*=f,r(a,o,d,u)},calc:function(s){const a=s*s,o=a*s;return n+e*s+t*a+i*o}}}const Il=new q,Dl=new q,ra=new Uo,sa=new Uo,aa=new Uo;class Lf extends vn{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new q){const i=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,f;this.closed||o>0?c=r[(o-1)%s]:(Dl.subVectors(r[0],r[1]).add(r[0]),c=Dl);const h=r[o%s],d=r[(o+1)%s];if(this.closed||o+2<s?f=r[(o+2)%s]:(Il.subVectors(r[s-1],r[s-2]).add(r[s-1]),f=Il),this.curveType==="centripetal"||this.curveType==="chordal"){const u=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(h),u),v=Math.pow(h.distanceToSquared(d),u),p=Math.pow(d.distanceToSquared(f),u);v<1e-4&&(v=1),g<1e-4&&(g=v),p<1e-4&&(p=v),ra.initNonuniformCatmullRom(c.x,h.x,d.x,f.x,g,v,p),sa.initNonuniformCatmullRom(c.y,h.y,d.y,f.y,g,v,p),aa.initNonuniformCatmullRom(c.z,h.z,d.z,f.z,g,v,p)}else this.curveType==="catmullrom"&&(ra.initCatmullRom(c.x,h.x,d.x,f.x,this.tension),sa.initCatmullRom(c.y,h.y,d.y,f.y,this.tension),aa.initCatmullRom(c.z,h.z,d.z,f.z,this.tension));return i.set(ra.calc(l),sa.calc(l),aa.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new q().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Nl(n,e,t,i,r){const s=(i-e)*.5,a=(r-t)*.5,o=n*n,l=n*o;return(2*t-2*i+s+a)*l+(-3*t+3*i-2*s-a)*o+s*n+t}function Pf(n,e){const t=1-n;return t*t*e}function If(n,e){return 2*(1-n)*n*e}function Df(n,e){return n*n*e}function Ji(n,e,t,i){return Pf(n,e)+If(n,t)+Df(n,i)}function Nf(n,e){const t=1-n;return t*t*t*e}function Uf(n,e){const t=1-n;return 3*t*t*n*e}function Of(n,e){return 3*(1-n)*n*n*e}function Ff(n,e){return n*n*n*e}function Qi(n,e,t,i,r){return Nf(n,e)+Uf(n,t)+Of(n,i)+Ff(n,r)}class su extends vn{constructor(e=new Pe,t=new Pe,i=new Pe,r=new Pe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new Pe){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(Qi(e,r.x,s.x,a.x,o.x),Qi(e,r.y,s.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Bf extends vn{constructor(e=new q,t=new q,i=new q,r=new q){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new q){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(Qi(e,r.x,s.x,a.x,o.x),Qi(e,r.y,s.y,a.y,o.y),Qi(e,r.z,s.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class au extends vn{constructor(e=new Pe,t=new Pe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Pe){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Pe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class kf extends vn{constructor(e=new q,t=new q){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new q){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new q){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ou extends vn{constructor(e=new Pe,t=new Pe,i=new Pe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Pe){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(Ji(e,r.x,s.x,a.x),Ji(e,r.y,s.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class zf extends vn{constructor(e=new q,t=new q,i=new q){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new q){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(Ji(e,r.x,s.x,a.x),Ji(e,r.y,s.y,a.y),Ji(e,r.z,s.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class lu extends vn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Pe){const i=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],f=r[a>r.length-2?r.length-1:a+1],h=r[a>r.length-3?r.length-1:a+2];return i.set(Nl(o,l.x,c.x,f.x,h.x),Nl(o,l.y,c.y,f.y,h.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new Pe().fromArray(r))}return this}}var Ul=Object.freeze({__proto__:null,ArcCurve:Rf,CatmullRomCurve3:Lf,CubicBezierCurve:su,CubicBezierCurve3:Bf,EllipseCurve:No,LineCurve:au,LineCurve3:kf,QuadraticBezierCurve:ou,QuadraticBezierCurve3:zf,SplineCurve:lu});class Hf extends vn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ul[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const a=r[s]-i,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const f=l[c];i&&i.equals(f)||(t.push(f),i=f)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(new Ul[r.type]().fromJSON(r))}return this}}class Ol extends Hf{constructor(e){super(),this.type="Path",this.currentPoint=new Pe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new au(this.currentPoint.clone(),new Pe(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){const s=new ou(this.currentPoint.clone(),new Pe(e,t),new Pe(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,s,a){const o=new su(this.currentPoint.clone(),new Pe(e,t),new Pe(i,r),new Pe(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new lu(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,r,s,a),this}absarc(e,t,i,r,s,a){return this.absellipse(e,t,i,i,r,s,a),this}ellipse(e,t,i,r,s,a,o,l){const c=this.currentPoint.x,f=this.currentPoint.y;return this.absellipse(e+c,t+f,i,r,s,a,o,l),this}absellipse(e,t,i,r,s,a,o,l){const c=new No(e,t,i,r,s,a,o,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const f=c.getPoint(1);return this.currentPoint.copy(f),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class cu extends Ol{constructor(e){super(e),this.uuid=Ui(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(new Ol().fromJSON(r))}return this}}function Vf(n,e,t=2){const i=e&&e.length,r=i?e[0]*t:n.length;let s=uu(n,0,r,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(i&&(s=Yf(n,e,s,t)),n.length>80*t){o=n[0],l=n[1];let f=o,h=l;for(let d=t;d<r;d+=t){const u=n[d],g=n[d+1];u<o&&(o=u),g<l&&(l=g),u>f&&(f=u),g>h&&(h=g)}c=Math.max(f-o,h-l),c=c!==0?32767/c:0}return or(s,a,t,o,l,c,0),a}function uu(n,e,t,i,r){let s;if(r===rh(n,e,t,i)>0)for(let a=e;a<t;a+=i)s=Fl(a/i|0,n[a],n[a+1],s);else for(let a=t-i;a>=e;a-=i)s=Fl(a/i|0,n[a],n[a+1],s);return s&&Di(s,s.next)&&(cr(s),s=s.next),s}function ii(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(Di(t,t.next)||dt(t.prev,t,t.next)===0)){if(cr(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function or(n,e,t,i,r,s,a){if(!n)return;!a&&s&&Qf(n,i,r,s);let o=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(s?Wf(n,i,r,s):Gf(n)){e.push(l.i,n.i,c.i),cr(n),n=c.next,o=c.next;continue}if(n=c,n===o){a?a===1?(n=Xf(ii(n),e),or(n,e,t,i,r,s,2)):a===2&&qf(n,e,t,i,r,s):or(ii(n),e,t,i,r,s,1);break}}}function Gf(n){const e=n.prev,t=n,i=n.next;if(dt(e,t,i)>=0)return!1;const r=e.x,s=t.x,a=i.x,o=e.y,l=t.y,c=i.y,f=Math.min(r,s,a),h=Math.min(o,l,c),d=Math.max(r,s,a),u=Math.max(o,l,c);let g=i.next;for(;g!==e;){if(g.x>=f&&g.x<=d&&g.y>=h&&g.y<=u&&$i(r,o,s,l,a,c,g.x,g.y)&&dt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Wf(n,e,t,i){const r=n.prev,s=n,a=n.next;if(dt(r,s,a)>=0)return!1;const o=r.x,l=s.x,c=a.x,f=r.y,h=s.y,d=a.y,u=Math.min(o,l,c),g=Math.min(f,h,d),v=Math.max(o,l,c),p=Math.max(f,h,d),m=ao(u,g,e,t,i),M=ao(v,p,e,t,i);let A=n.prevZ,x=n.nextZ;for(;A&&A.z>=m&&x&&x.z<=M;){if(A.x>=u&&A.x<=v&&A.y>=g&&A.y<=p&&A!==r&&A!==a&&$i(o,f,l,h,c,d,A.x,A.y)&&dt(A.prev,A,A.next)>=0||(A=A.prevZ,x.x>=u&&x.x<=v&&x.y>=g&&x.y<=p&&x!==r&&x!==a&&$i(o,f,l,h,c,d,x.x,x.y)&&dt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;A&&A.z>=m;){if(A.x>=u&&A.x<=v&&A.y>=g&&A.y<=p&&A!==r&&A!==a&&$i(o,f,l,h,c,d,A.x,A.y)&&dt(A.prev,A,A.next)>=0)return!1;A=A.prevZ}for(;x&&x.z<=M;){if(x.x>=u&&x.x<=v&&x.y>=g&&x.y<=p&&x!==r&&x!==a&&$i(o,f,l,h,c,d,x.x,x.y)&&dt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Xf(n,e){let t=n;do{const i=t.prev,r=t.next.next;!Di(i,r)&&fu(i,t,t.next,r)&&lr(i,r)&&lr(r,i)&&(e.push(i.i,t.i,r.i),cr(t),cr(t.next),t=n=r),t=t.next}while(t!==n);return ii(t)}function qf(n,e,t,i,r,s){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&th(a,o)){let l=hu(a,o);a=ii(a,a.next),l=ii(l,l.next),or(a,e,t,i,r,s,0),or(l,e,t,i,r,s,0);return}o=o.next}a=a.next}while(a!==n)}function Yf(n,e,t,i){const r=[];for(let s=0,a=e.length;s<a;s++){const o=e[s]*i,l=s<a-1?e[s+1]*i:n.length,c=uu(n,o,l,i,!1);c===c.next&&(c.steiner=!0),r.push(eh(c))}r.sort($f);for(let s=0;s<r.length;s++)t=Kf(r[s],t);return t}function $f(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=i-r}return t}function Kf(n,e){const t=Zf(n,e);if(!t)return e;const i=hu(t,n);return ii(i,i.next),ii(t,t.next)}function Zf(n,e){let t=e;const i=n.x,r=n.y;let s=-1/0,a;if(Di(n,t))return t;do{if(Di(n,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const h=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=i&&h>s&&(s=h,a=t.x<t.next.x?t:t.next,h===i))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let f=1/0;t=a;do{if(i>=t.x&&t.x>=l&&i!==t.x&&du(r<c?i:s,r,l,c,r<c?s:i,r,t.x,t.y)){const h=Math.abs(r-t.y)/(i-t.x);lr(t,n)&&(h<f||h===f&&(t.x>a.x||t.x===a.x&&Jf(a,t)))&&(a=t,f=h)}t=t.next}while(t!==o);return a}function Jf(n,e){return dt(n.prev,n,e.prev)<0&&dt(e.next,n,n.next)<0}function Qf(n,e,t,i){let r=n;do r.z===0&&(r.z=ao(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,jf(r)}function jf(n){let e,t=1;do{let i=n,r;n=null;let s=null;for(e=0;i;){e++;let a=i,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||i.z<=a.z)?(r=i,i=i.nextZ,o--):(r=a,a=a.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;i=a}s.nextZ=null,t*=2}while(e>1);return n}function ao(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function eh(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function du(n,e,t,i,r,s,a,o){return(r-a)*(e-o)>=(n-a)*(s-o)&&(n-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(i-o)}function $i(n,e,t,i,r,s,a,o){return!(n===a&&e===o)&&du(n,e,t,i,r,s,a,o)}function th(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!nh(n,e)&&(lr(n,e)&&lr(e,n)&&ih(n,e)&&(dt(n.prev,n,e.prev)||dt(n,e.prev,e))||Di(n,e)&&dt(n.prev,n,n.next)>0&&dt(e.prev,e,e.next)>0)}function dt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function Di(n,e){return n.x===e.x&&n.y===e.y}function fu(n,e,t,i){const r=Vr(dt(n,e,t)),s=Vr(dt(n,e,i)),a=Vr(dt(t,i,n)),o=Vr(dt(t,i,e));return!!(r!==s&&a!==o||r===0&&Hr(n,t,e)||s===0&&Hr(n,i,e)||a===0&&Hr(t,n,i)||o===0&&Hr(t,e,i))}function Hr(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function Vr(n){return n>0?1:n<0?-1:0}function nh(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&fu(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function lr(n,e){return dt(n.prev,n,n.next)<0?dt(n,e,n.next)>=0&&dt(n,n.prev,e)>=0:dt(n,e,n.prev)<0||dt(n,n.next,e)<0}function ih(n,e){let t=n,i=!1;const r=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function hu(n,e){const t=oo(n.i,n.x,n.y),i=oo(e.i,e.x,e.y),r=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function Fl(n,e,t,i){const r=oo(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function cr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function oo(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function rh(n,e,t,i){let r=0;for(let s=e,a=t-i;s<t;s+=i)r+=(n[a]-n[s])*(n[s+1]+n[a+1]),a=s;return r}class sh{static triangulate(e,t,i=2){return Vf(e,t,i)}}class ji{static area(e){const t=e.length;let i=0;for(let r=t-1,s=0;s<t;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return ji.area(e)<0}static triangulateShape(e,t){const i=[],r=[],s=[];Bl(e),kl(i,e);let a=e.length;t.forEach(Bl);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,kl(i,t[l]);const o=sh.triangulate(i,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function Bl(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function kl(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class Ss extends kt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,f=l+1,h=e/o,d=t/l,u=[],g=[],v=[],p=[];for(let m=0;m<f;m++){const M=m*d-a;for(let A=0;A<c;A++){const x=A*h-s;g.push(x,-M,0),v.push(0,0,1),p.push(A/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let M=0;M<o;M++){const A=M+c*m,x=M+c*(m+1),T=M+1+c*(m+1),E=M+1+c*m;u.push(A,x,E),u.push(x,T,E)}this.setIndex(u),this.setAttribute("position",new St(g,3)),this.setAttribute("normal",new St(v,3)),this.setAttribute("uv",new St(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ss(e.width,e.height,e.widthSegments,e.heightSegments)}}class Oo extends kt{constructor(e=new cu([new Pe(0,.5),new Pe(-.5,-.5),new Pe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const i=[],r=[],s=[],a=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let f=0;f<e.length;f++)c(e[f]),this.addGroup(o,l,f),o+=l,l=0;this.setIndex(i),this.setAttribute("position",new St(r,3)),this.setAttribute("normal",new St(s,3)),this.setAttribute("uv",new St(a,2));function c(f){const h=r.length/3,d=f.extractPoints(t);let u=d.shape;const g=d.holes;ji.isClockWise(u)===!1&&(u=u.reverse());for(let p=0,m=g.length;p<m;p++){const M=g[p];ji.isClockWise(M)===!0&&(g[p]=M.reverse())}const v=ji.triangulateShape(u,g);for(let p=0,m=g.length;p<m;p++){const M=g[p];u=u.concat(M)}for(let p=0,m=u.length;p<m;p++){const M=u[p];r.push(M.x,M.y,0),s.push(0,0,1),a.push(M.x,M.y)}for(let p=0,m=v.length;p<m;p++){const M=v[p],A=M[0]+h,x=M[1]+h,T=M[2]+h;i.push(A,x,T),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return ah(t,e)}static fromJSON(e,t){const i=[];for(let r=0,s=e.shapes.length;r<s;r++){const a=t[e.shapes[r]];i.push(a)}return new Oo(i,e.curveSegments)}}function ah(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){const r=n[t];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e}function Ni(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(zl(r))r.isRenderTargetTexture?(Be("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(zl(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Ot(n){const e={};for(let t=0;t<n.length;t++){const i=Ni(n[t]);for(const r in i)e[r]=i[r]}return e}function zl(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function oh(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function pu(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}const lh={clone:Ni,merge:Ot};var ch=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,uh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class gn extends xs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ch,this.fragmentShader=uh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ni(e.uniforms),this.uniformsGroups=oh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new He().setHex(r.value);break;case"v2":this.uniforms[i].value=new Pe().fromArray(r.value);break;case"v3":this.uniforms[i].value=new q().fromArray(r.value);break;case"v4":this.uniforms[i].value=new ht().fromArray(r.value);break;case"m3":this.uniforms[i].value=new ze().fromArray(r.value);break;case"m4":this.uniforms[i].value=new vt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class dh extends gn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class fh extends xs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Gd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class hh extends xs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const oa={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(Hl(n)||(this.files[n]=e))},get:function(n){if(this.enabled!==!1&&!Hl(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function Hl(n){try{const e=n.slice(n.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class mu{constructor(e,t,i){const r=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(f){o++,s===!1&&r.onStart!==void 0&&r.onStart(f,a,o),s=!0},this.itemEnd=function(f){a++,r.onProgress!==void 0&&r.onProgress(f,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(f){r.onError!==void 0&&r.onError(f)},this.resolveURL=function(f){return f=f.normalize("NFC"),l?l(f):f},this.setURLModifier=function(f){return l=f,this},this.addHandler=function(f,h){return c.push(f,h),this},this.removeHandler=function(f){const h=c.indexOf(f);return h!==-1&&c.splice(h,2),this},this.getHandler=function(f){for(let h=0,d=c.length;h<d;h+=2){const u=c[h],g=c[h+1];if(u.global&&(u.lastIndex=0),u.test(f))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const ph=new mu;class Fo{constructor(e){this.manager=e!==void 0?e:ph,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Fo.DEFAULT_MATERIAL_NAME="__DEFAULT";const _i=new WeakMap;class mh extends Fo{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=oa.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let h=_i.get(a);h===void 0&&(h=[],_i.set(a,h)),h.push({onLoad:t,onError:r})}return a}const o=sr("img");function l(){f(),t&&t(this);const h=_i.get(this)||[];for(let d=0;d<h.length;d++){const u=h[d];u.onLoad&&u.onLoad(this)}_i.delete(this),s.manager.itemEnd(e)}function c(h){f(),r&&r(h),oa.remove(`image:${e}`);const d=_i.get(this)||[];for(let u=0;u<d.length;u++){const g=d[u];g.onError&&g.onError(h)}_i.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function f(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),oa.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class la extends Fo{constructor(e){super(e)}load(e,t,i,r){const s=new Nt,a=new mh(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},i,r),s}}const Gr=new q,Wr=new Oi,an=new q;class gu extends Vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=fn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Gr,Wr,an),an.x===1&&an.y===1&&an.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Gr,Wr,an.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Gr,Wr,an),an.x===1&&an.y===1&&an.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Gr,Wr,an.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Fn=new q,Vl=new Pe,Gl=new Pe;class Jt extends gu{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=so*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Us*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return so*2*Math.atan(Math.tan(Us*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Fn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Fn.x,Fn.y).multiplyScalar(-e/Fn.z),Fn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Fn.x,Fn.y).multiplyScalar(-e/Fn.z)}getViewSize(e,t){return this.getViewBounds(e,Vl,Gl),t.subVectors(Gl,Vl)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Us*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Bo extends gu{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=f*this.view.offsetY,l=o-f*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const xi=-90,Si=1;class gh extends Vt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Jt(xi,Si,e,t);r.layers=this.layers,this.add(r);const s=new Jt(xi,Si,e,t);s.layers=this.layers,this.add(s);const a=new Jt(xi,Si,e,t);a.layers=this.layers,this.add(a);const o=new Jt(xi,Si,e,t);o.layers=this.layers,this.add(o);const l=new Jt(xi,Si,e,t);l.layers=this.layers,this.add(l);const c=new Jt(xi,Si,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===fn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ms)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,f]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,f),e.setRenderTarget(h,d,u),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class vh extends Jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Xo=class Xo{constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};Xo.prototype.isMatrix2=!0;let Wl=Xo;function Xl(n,e,t,i){const r=_h(i);switch(t){case Yc:return n*e;case Kc:return n*e/r.components*r.byteLength;case wo:return n*e/r.components*r.byteLength;case ti:return n*e*2/r.components*r.byteLength;case Co:return n*e*2/r.components*r.byteLength;case $c:return n*e*3/r.components*r.byteLength;case jt:return n*e*4/r.components*r.byteLength;case Ro:return n*e*4/r.components*r.byteLength;case ts:case ns:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case is:case rs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case La:case Ia:return Math.max(n,16)*Math.max(e,8)/4;case Ra:case Pa:return Math.max(n,8)*Math.max(e,8)/2;case Da:case Na:case Oa:case Fa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ua:case ds:case Ba:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ka:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case za:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ha:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Va:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Ga:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Wa:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Xa:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case qa:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Ya:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case $a:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Ka:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Za:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ja:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Qa:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ja:case eo:case to:return Math.ceil(n/4)*Math.ceil(e/4)*16;case no:case io:return Math.ceil(n/4)*Math.ceil(e/4)*8;case fs:case ro:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function _h(n){switch(n){case qt:case Gc:return{byteLength:1,components:1};case ir:case Wc:case pn:return{byteLength:2,components:1};case To:case Ao:return{byteLength:2,components:4};case hn:case bo:case dn:return{byteLength:4,components:1};case Xc:case qc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Eo}}));typeof window<"u"&&(window.__THREE__?Be("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Eo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function vu(){let n=null,e=!1,t=null,i=null;function r(s,a){i=n.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function xh(n){const e=new WeakMap;function t(o,l){const c=o.array,f=o.usage,h=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,f),o.onUploadCallback();let u;if(c instanceof Float32Array)u=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)u=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?u=n.HALF_FLOAT:u=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)u=n.SHORT;else if(c instanceof Uint32Array)u=n.UNSIGNED_INT;else if(c instanceof Int32Array)u=n.INT;else if(c instanceof Int8Array)u=n.BYTE;else if(c instanceof Uint8Array)u=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)u=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:u,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const f=l.array,h=l.updateRanges;if(n.bindBuffer(c,o),h.length===0)n.bufferSubData(c,0,f);else{h.sort((u,g)=>u.start-g.start);let d=0;for(let u=1;u<h.length;u++){const g=h[d],v=h[u];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,h[d]=v)}h.length=d+1;for(let u=0,g=h.length;u<g;u++){const v=h[u];n.bufferSubData(c,v.start*f.BYTES_PER_ELEMENT,f,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const f=e.get(o);(!f||f.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var Sh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Mh=`#ifdef USE_ALPHAHASH
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
#endif`,yh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Eh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Th=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ah=`#ifdef USE_AOMAP
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
#endif`,wh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ch=`#ifdef USE_BATCHING
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
#endif`,Rh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Lh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ph=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ih=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Dh=`#ifdef USE_IRIDESCENCE
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
#endif`,Nh=`#ifdef USE_BUMPMAP
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
#endif`,Uh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Oh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Fh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Bh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,kh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,zh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Hh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Vh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Gh=`#define PI 3.141592653589793
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
} // validated`,Wh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Xh=`vec3 transformedNormal = objectNormal;
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
#endif`,qh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Yh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$h=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Kh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Zh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Jh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Qh=`#ifdef USE_ENVMAP
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
#endif`,jh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,ep=`#ifdef USE_ENVMAP
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
#endif`,tp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,np=`#ifdef USE_ENVMAP
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
#endif`,ip=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,sp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ap=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,op=`#ifdef USE_GRADIENTMAP
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
}`,lp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,cp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,up=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,dp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,fp=`#ifdef USE_ENVMAP
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
#endif`,hp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,pp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,mp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,gp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vp=`PhysicalMaterial material;
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
#endif`,_p=`uniform sampler2D dfgLUT;
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
}`,xp=`
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
#endif`,Sp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Mp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,yp=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Ep=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,bp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ap=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,wp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Rp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Lp=`#if defined( USE_POINTS_UV )
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
#endif`,Pp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ip=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Dp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Np=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Up=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Op=`#ifdef USE_MORPHTARGETS
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
#endif`,Fp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,kp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,zp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Gp=`#ifdef USE_NORMALMAP
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
#endif`,Wp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Yp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$p=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Zp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Jp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Qp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,jp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,em=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,tm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,nm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,im=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,rm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,sm=`float getShadowMask() {
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
}`,am=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,om=`#ifdef USE_SKINNING
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
#endif`,lm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,cm=`#ifdef USE_SKINNING
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
#endif`,um=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,dm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,fm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,pm=`#ifdef USE_TRANSMISSION
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
#endif`,mm=`#ifdef USE_TRANSMISSION
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
#endif`,gm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_m=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Sm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Mm=`uniform sampler2D t2D;
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
}`,ym=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Em=`#ifdef ENVMAP_TYPE_CUBE
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
}`,bm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Am=`#include <common>
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
}`,wm=`#if DEPTH_PACKING == 3200
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
}`,Cm=`#define DISTANCE
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
}`,Rm=`#define DISTANCE
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
}`,Lm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Pm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Im=`uniform float scale;
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
}`,Dm=`uniform vec3 diffuse;
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
}`,Nm=`#include <common>
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
}`,Um=`uniform vec3 diffuse;
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
}`,Om=`#define LAMBERT
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
}`,Fm=`#define LAMBERT
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
}`,Bm=`#define MATCAP
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
}`,km=`#define MATCAP
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
}`,zm=`#define NORMAL
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
}`,Hm=`#define NORMAL
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
}`,Vm=`#define PHONG
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
}`,Gm=`#define PHONG
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
}`,Wm=`#define STANDARD
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
}`,Xm=`#define STANDARD
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
}`,qm=`#define TOON
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
}`,Ym=`#define TOON
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
}`,$m=`uniform float size;
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
}`,Km=`uniform vec3 diffuse;
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
}`,Zm=`#include <common>
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
}`,Jm=`uniform vec3 color;
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
}`,Qm=`uniform float rotation;
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
}`,jm=`uniform vec3 diffuse;
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
}`,Ge={alphahash_fragment:Sh,alphahash_pars_fragment:Mh,alphamap_fragment:yh,alphamap_pars_fragment:Eh,alphatest_fragment:bh,alphatest_pars_fragment:Th,aomap_fragment:Ah,aomap_pars_fragment:wh,batching_pars_vertex:Ch,batching_vertex:Rh,begin_vertex:Lh,beginnormal_vertex:Ph,bsdfs:Ih,iridescence_fragment:Dh,bumpmap_pars_fragment:Nh,clipping_planes_fragment:Uh,clipping_planes_pars_fragment:Oh,clipping_planes_pars_vertex:Fh,clipping_planes_vertex:Bh,color_fragment:kh,color_pars_fragment:zh,color_pars_vertex:Hh,color_vertex:Vh,common:Gh,cube_uv_reflection_fragment:Wh,defaultnormal_vertex:Xh,displacementmap_pars_vertex:qh,displacementmap_vertex:Yh,emissivemap_fragment:$h,emissivemap_pars_fragment:Kh,colorspace_fragment:Zh,colorspace_pars_fragment:Jh,envmap_fragment:Qh,envmap_common_pars_fragment:jh,envmap_pars_fragment:ep,envmap_pars_vertex:tp,envmap_physical_pars_fragment:fp,envmap_vertex:np,fog_vertex:ip,fog_pars_vertex:rp,fog_fragment:sp,fog_pars_fragment:ap,gradientmap_pars_fragment:op,lightmap_pars_fragment:lp,lights_lambert_fragment:cp,lights_lambert_pars_fragment:up,lights_pars_begin:dp,lights_toon_fragment:hp,lights_toon_pars_fragment:pp,lights_phong_fragment:mp,lights_phong_pars_fragment:gp,lights_physical_fragment:vp,lights_physical_pars_fragment:_p,lights_fragment_begin:xp,lights_fragment_maps:Sp,lights_fragment_end:Mp,lightprobes_pars_fragment:yp,logdepthbuf_fragment:Ep,logdepthbuf_pars_fragment:bp,logdepthbuf_pars_vertex:Tp,logdepthbuf_vertex:Ap,map_fragment:wp,map_pars_fragment:Cp,map_particle_fragment:Rp,map_particle_pars_fragment:Lp,metalnessmap_fragment:Pp,metalnessmap_pars_fragment:Ip,morphinstance_vertex:Dp,morphcolor_vertex:Np,morphnormal_vertex:Up,morphtarget_pars_vertex:Op,morphtarget_vertex:Fp,normal_fragment_begin:Bp,normal_fragment_maps:kp,normal_pars_fragment:zp,normal_pars_vertex:Hp,normal_vertex:Vp,normalmap_pars_fragment:Gp,clearcoat_normal_fragment_begin:Wp,clearcoat_normal_fragment_maps:Xp,clearcoat_pars_fragment:qp,iridescence_pars_fragment:Yp,opaque_fragment:$p,packing:Kp,premultiplied_alpha_fragment:Zp,project_vertex:Jp,dithering_fragment:Qp,dithering_pars_fragment:jp,roughnessmap_fragment:em,roughnessmap_pars_fragment:tm,shadowmap_pars_fragment:nm,shadowmap_pars_vertex:im,shadowmap_vertex:rm,shadowmask_pars_fragment:sm,skinbase_vertex:am,skinning_pars_vertex:om,skinning_vertex:lm,skinnormal_vertex:cm,specularmap_fragment:um,specularmap_pars_fragment:dm,tonemapping_fragment:fm,tonemapping_pars_fragment:hm,transmission_fragment:pm,transmission_pars_fragment:mm,uv_pars_fragment:gm,uv_pars_vertex:vm,uv_vertex:_m,worldpos_vertex:xm,background_vert:Sm,background_frag:Mm,backgroundCube_vert:ym,backgroundCube_frag:Em,cube_vert:bm,cube_frag:Tm,depth_vert:Am,depth_frag:wm,distance_vert:Cm,distance_frag:Rm,equirect_vert:Lm,equirect_frag:Pm,linedashed_vert:Im,linedashed_frag:Dm,meshbasic_vert:Nm,meshbasic_frag:Um,meshlambert_vert:Om,meshlambert_frag:Fm,meshmatcap_vert:Bm,meshmatcap_frag:km,meshnormal_vert:zm,meshnormal_frag:Hm,meshphong_vert:Vm,meshphong_frag:Gm,meshphysical_vert:Wm,meshphysical_frag:Xm,meshtoon_vert:qm,meshtoon_frag:Ym,points_vert:$m,points_frag:Km,shadow_vert:Zm,shadow_frag:Jm,sprite_vert:Qm,sprite_frag:jm},ve={common:{diffuse:{value:new He(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new Pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new He(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new q},probesMax:{value:new q},probesResolution:{value:new q}},points:{diffuse:{value:new He(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new He(16777215)},opacity:{value:1},center:{value:new Pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},ln={basic:{uniforms:Ot([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:Ot([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new He(0)},envMapIntensity:{value:1}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:Ot([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new He(0)},specular:{value:new He(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:Ot([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new He(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:Ot([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new He(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:Ot([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:Ot([ve.points,ve.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:Ot([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:Ot([ve.common,ve.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:Ot([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:Ot([ve.sprite,ve.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distance:{uniforms:Ot([ve.common,ve.displacementmap,{referencePosition:{value:new q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distance_vert,fragmentShader:Ge.distance_frag},shadow:{uniforms:Ot([ve.lights,ve.fog,{color:{value:new He(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};ln.physical={uniforms:Ot([ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new Pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new He(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new Pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new He(0)},specularColor:{value:new He(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new Pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const Xr={r:0,b:0,g:0},eg=new vt,_u=new ze;_u.set(-1,0,0,0,1,0,0,0,1);function tg(n,e,t,i,r,s){const a=new He(0);let o=r===!0?0:1,l,c,f=null,h=0,d=null;function u(M){let A=M.isScene===!0?M.background:null;if(A&&A.isTexture){const x=M.backgroundBlurriness>0;A=e.get(A,x)}return A}function g(M){let A=!1;const x=u(M);x===null?p(a,o):x&&x.isColor&&(p(x,1),A=!0);const T=n.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,s):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(M,A){const x=u(A);x&&(x.isCubeTexture||x.mapping===_s)?(c===void 0&&(c=new mn(new hr(1,1,1),new gn({name:"BackgroundCubeMaterial",uniforms:Ni(ln.backgroundCube.uniforms),vertexShader:ln.backgroundCube.vertexShader,fragmentShader:ln.backgroundCube.fragmentShader,side:Bt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(eg.makeRotationFromEuler(A.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(_u),c.material.toneMapped=$e.getTransfer(x.colorSpace)!==et,(f!==x||h!==x.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,f=x,h=x.version,d=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new mn(new Ss(2,2),new gn({name:"BackgroundMaterial",uniforms:Ni(ln.background.uniforms),vertexShader:ln.background.vertexShader,fragmentShader:ln.background.fragmentShader,side:jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=$e.getTransfer(x.colorSpace)!==et,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(f!==x||h!==x.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,f=x,h=x.version,d=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function p(M,A){M.getRGB(Xr,pu(n)),t.buffers.color.setClear(Xr.r,Xr.g,Xr.b,A,s)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,A=1){a.set(M),o=A,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,p(a,o)},render:g,addToRenderList:v,dispose:m}}function ng(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,a=!1;function o(R,L,D,N,H){let Z=!1;const J=h(R,N,D,L);s!==J&&(s=J,c(s.object)),Z=u(R,N,D,H),Z&&g(R,N,D,H),H!==null&&e.update(H,n.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,x(R,L,D,N),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return n.createVertexArray()}function c(R){return n.bindVertexArray(R)}function f(R){return n.deleteVertexArray(R)}function h(R,L,D,N){const H=N.wireframe===!0;let Z=i[L.id];Z===void 0&&(Z={},i[L.id]=Z);const J=R.isInstancedMesh===!0?R.id:0;let U=Z[J];U===void 0&&(U={},Z[J]=U);let X=U[D.id];X===void 0&&(X={},U[D.id]=X);let te=X[H];return te===void 0&&(te=d(l()),X[H]=te),te}function d(R){const L=[],D=[],N=[];for(let H=0;H<t;H++)L[H]=0,D[H]=0,N[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:D,attributeDivisors:N,object:R,attributes:{},index:null}}function u(R,L,D,N){const H=s.attributes,Z=L.attributes;let J=0;const U=D.getAttributes();for(const X in U)if(U[X].location>=0){const Q=H[X];let ee=Z[X];if(ee===void 0&&(X==="instanceMatrix"&&R.instanceMatrix&&(ee=R.instanceMatrix),X==="instanceColor"&&R.instanceColor&&(ee=R.instanceColor)),Q===void 0||Q.attribute!==ee||ee&&Q.data!==ee.data)return!0;J++}return s.attributesNum!==J||s.index!==N}function g(R,L,D,N){const H={},Z=L.attributes;let J=0;const U=D.getAttributes();for(const X in U)if(U[X].location>=0){let Q=Z[X];Q===void 0&&(X==="instanceMatrix"&&R.instanceMatrix&&(Q=R.instanceMatrix),X==="instanceColor"&&R.instanceColor&&(Q=R.instanceColor));const ee={};ee.attribute=Q,Q&&Q.data&&(ee.data=Q.data),H[X]=ee,J++}s.attributes=H,s.attributesNum=J,s.index=N}function v(){const R=s.newAttributes;for(let L=0,D=R.length;L<D;L++)R[L]=0}function p(R){m(R,0)}function m(R,L){const D=s.newAttributes,N=s.enabledAttributes,H=s.attributeDivisors;D[R]=1,N[R]===0&&(n.enableVertexAttribArray(R),N[R]=1),H[R]!==L&&(n.vertexAttribDivisor(R,L),H[R]=L)}function M(){const R=s.newAttributes,L=s.enabledAttributes;for(let D=0,N=L.length;D<N;D++)L[D]!==R[D]&&(n.disableVertexAttribArray(D),L[D]=0)}function A(R,L,D,N,H,Z,J){J===!0?n.vertexAttribIPointer(R,L,D,H,Z):n.vertexAttribPointer(R,L,D,N,H,Z)}function x(R,L,D,N){v();const H=N.attributes,Z=D.getAttributes(),J=L.defaultAttributeValues;for(const U in Z){const X=Z[U];if(X.location>=0){let te=H[U];if(te===void 0&&(U==="instanceMatrix"&&R.instanceMatrix&&(te=R.instanceMatrix),U==="instanceColor"&&R.instanceColor&&(te=R.instanceColor)),te!==void 0){const Q=te.normalized,ee=te.itemSize,ie=e.get(te);if(ie===void 0)continue;const Ce=ie.buffer,_e=ie.type,fe=ie.bytesPerElement,G=_e===n.INT||_e===n.UNSIGNED_INT||te.gpuType===bo;if(te.isInterleavedBufferAttribute){const Y=te.data,se=Y.stride,he=te.offset;if(Y.isInstancedInterleavedBuffer){for(let ce=0;ce<X.locationSize;ce++)m(X.location+ce,Y.meshPerAttribute);R.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let ce=0;ce<X.locationSize;ce++)p(X.location+ce);n.bindBuffer(n.ARRAY_BUFFER,Ce);for(let ce=0;ce<X.locationSize;ce++)A(X.location+ce,ee/X.locationSize,_e,Q,se*fe,(he+ee/X.locationSize*ce)*fe,G)}else{if(te.isInstancedBufferAttribute){for(let Y=0;Y<X.locationSize;Y++)m(X.location+Y,te.meshPerAttribute);R.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Y=0;Y<X.locationSize;Y++)p(X.location+Y);n.bindBuffer(n.ARRAY_BUFFER,Ce);for(let Y=0;Y<X.locationSize;Y++)A(X.location+Y,ee/X.locationSize,_e,Q,ee*fe,ee/X.locationSize*Y*fe,G)}}else if(J!==void 0){const Q=J[U];if(Q!==void 0)switch(Q.length){case 2:n.vertexAttrib2fv(X.location,Q);break;case 3:n.vertexAttrib3fv(X.location,Q);break;case 4:n.vertexAttrib4fv(X.location,Q);break;default:n.vertexAttrib1fv(X.location,Q)}}}}M()}function T(){b();for(const R in i){const L=i[R];for(const D in L){const N=L[D];for(const H in N){const Z=N[H];for(const J in Z)f(Z[J].object),delete Z[J];delete N[H]}}delete i[R]}}function E(R){if(i[R.id]===void 0)return;const L=i[R.id];for(const D in L){const N=L[D];for(const H in N){const Z=N[H];for(const J in Z)f(Z[J].object),delete Z[J];delete N[H]}}delete i[R.id]}function C(R){for(const L in i){const D=i[L];for(const N in D){const H=D[N];if(H[R.id]===void 0)continue;const Z=H[R.id];for(const J in Z)f(Z[J].object),delete Z[J];delete H[R.id]}}}function S(R){for(const L in i){const D=i[L],N=R.isInstancedMesh===!0?R.id:0,H=D[N];if(H!==void 0){for(const Z in H){const J=H[Z];for(const U in J)f(J[U].object),delete J[U];delete H[Z]}delete D[N],Object.keys(D).length===0&&delete i[L]}}}function b(){I(),a=!0,s!==r&&(s=r,c(s.object))}function I(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:b,resetDefaultState:I,dispose:T,releaseStatesOfGeometry:E,releaseStatesOfObject:S,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:p,disableUnusedAttributes:M}}function ig(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,f){f!==0&&(n.drawArraysInstanced(i,l,c,f),t.update(c,i,f))}function o(l,c,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,f);let d=0;for(let u=0;u<f;u++)d+=c[u];t.update(d,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function rg(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(C){return!(C!==jt&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const S=C===pn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==qt&&C!==dn&&!S&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const f=l(c);f!==c&&(Be("WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);const h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Be("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const u=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),A=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:u,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:M,maxVaryings:A,maxFragmentUniforms:x,maxSamples:T,samples:E}}function sg(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new kn,o=new ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const u=h.length!==0||d||i!==0||r;return r=d,i=h.length,u},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=f(h,d,0)},this.setState=function(h,d,u){const g=h.clippingPlanes,v=h.clipIntersection,p=h.clipShadows,m=n.get(h);if(!r||g===null||g.length===0||s&&!p)s?f(null):c();else{const M=s?0:i,A=M*4;let x=m.clippingState||null;l.value=x,x=f(g,d,A,u);for(let T=0;T!==A;++T)x[T]=t[T];m.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(h,d,u,g){const v=h!==null?h.length:0;let p=null;if(v!==0){if(p=l.value,g!==!0||p===null){const m=u+v*4,M=d.matrixWorldInverse;o.getNormalMatrix(M),(p===null||p.length<m)&&(p=new Float32Array(m));for(let A=0,x=u;A!==v;++A,x+=4)a.copy(h[A]).applyMatrix4(M,o),a.normal.toArray(p,x),p[x+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,p}}const Ai=4,ag=6,og=20,lg=256,Wi=new Bo,ql=new He;let ca=null,ua=0,da=0,fa=!1;const cg=new q,qn=new q;class Yl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=cg}=s;ca=this._renderer.getRenderTarget(),ua=this._renderer.getActiveCubeFace(),da=this._renderer.getActiveMipmapLevel(),fa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Kl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ca,ua,da),this._renderer.xr.enabled=fa,e.scissorTest=!1,Mi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ei||e.mapping===Ii?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ca=this._renderer.getRenderTarget(),ua=this._renderer.getActiveCubeFace(),da=this._renderer.getActiveMipmapLevel(),fa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Dt,minFilter:Dt,generateMipmaps:!1,type:pn,format:jt,colorSpace:hs,depthBuffer:!1},r=$l(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$l(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=ug(s)),this._blurMaterial=fg(s,e,t),this._ggxMaterial=dg(s,e,t)}return r}_compileMaterial(e){const t=new mn(new kt,e);this._renderer.compile(t,Wi)}_sceneToCubeUV(e,t,i,r,s){const l=new Jt(90,1,t,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(ql),h.toneMapping=en,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new mn(new hr,new rt({name:"PMREM.Background",side:Bt,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,p=v.material;let m=!1;const M=e.background;M?M.isColor&&(p.color.copy(M),e.background=null,m=!0):(p.color.copy(ql),m=!0);for(let A=0;A<6;A++){const x=A%3;x===0?(l.up.set(0,c[A],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+f[A],s.y,s.z)):x===1?(l.up.set(0,0,c[A]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+f[A],s.z)):(l.up.set(0,c[A],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+f[A]));const T=this._cubeSize;Mi(r,x*T,A>2?T:0,T,T),h.setRenderTarget(r),m&&h.render(v,l),h.render(e,l)}h.toneMapping=u,h.autoClear=d,e.background=M}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===ei||e.mapping===Ii;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Kl());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Mi(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Wi)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),f=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-f*f),d=c*1.25,u=h*d,{_lodMax:g}=this,v=this._sizeLods[i],p=3*v*(i>g-Ai?i-g+Ai:0),m=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=u,l.mipInt.value=g-t,Mi(s,p,m,3*v,2*v),r.setRenderTarget(s),r.render(o,Wi),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-i,Mi(e,p,m,3*v,2*v),r.setRenderTarget(e),r.render(o,Wi)}_blur(e,t,i,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,i,a),this._blurPass(s,e,i,i,a)}_blurPass(e,t,i,r,s){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[r];l.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-i;const f=this._sizeLods[r],h=3*f*(r>this._lodMax-Ai?r-this._lodMax+Ai:0),d=4*(this._cubeSize-f);Mi(t,h,d,3*f,2*f),a.setRenderTarget(t),a.render(l,Wi)}}function ug(n){const e=[],t=[];let i=n;const r=n-Ai+1+ag;for(let s=0;s<r;s++){const a=Math.pow(2,i);e.push(a);const o=1/(a-2),l=-o,c=1+o,f=[l,l,c,l,c,c,l,l,c,c,l,c],h=6,d=6,u=3,g=new Float32Array(u*d*h),v=new Float32Array(u*d*h);for(let m=0;m<h;m++){const M=m%3*2/3-1,A=m>2?0:-1,x=[M,A,0,M+2/3,A,0,M+2/3,A+1,0,M,A,0,M+2/3,A+1,0,M,A+1,0];g.set(x,u*d*m);for(let T=0;T<d;T++){const E=f[T*2]*2-1,C=f[T*2+1]*2-1;m===0?qn.set(1,C,E):m===1?qn.set(-E,1,-C):m===2?qn.set(-E,C,1):m===3?qn.set(-1,C,-E):m===4?qn.set(-E,-1,C):qn.set(E,C,-1),qn.toArray(v,(m*d+T)*u)}}const p=new kt;p.setAttribute("position",new wn(g,u)),p.setAttribute("outputDirection",new wn(v,u)),t.push(new mn(p,null)),i>Ai&&i--}return{lodMeshes:t,sizeLods:e}}function $l(n,e,t){const i=new tn(n,e,t);return i.texture.mapping=_s,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Mi(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function dg(n,e,t){return new gn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:lg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ms(),fragmentShader:`

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
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function fg(n,e,t){return new gn({name:"SphericalGaussianBlur",defines:{SAMPLES:og,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ms(),fragmentShader:`

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
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Kl(){return new gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ms(),fragmentShader:`

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
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Zl(){return new gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ms(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Ms(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class xu extends tn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new iu(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new hr(5,5,5),s=new gn({name:"CubemapFromEquirect",uniforms:Ni(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Bt,blending:Tn});s.uniforms.tEquirect.value=t;const a=new mn(r,s),o=t.minFilter;return t.minFilter===Yn&&(t.minFilter=Dt),new gh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function hg(n){let e=new WeakMap,t=new WeakMap,i=null;function r(d,u=!1){return d==null?null:u?a(d):s(d)}function s(d){if(d&&d.isTexture){const u=d.mapping;if(u===Ps||u===Is)if(e.has(d)){const g=e.get(d).texture;return o(g,d.mapping)}else{const g=d.image;if(g&&g.height>0){const v=new xu(g.height);return v.fromEquirectangularTexture(n,d),e.set(d,v),d.addEventListener("dispose",c),o(v.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const u=d.mapping,g=u===Ps||u===Is,v=u===ei||u===Ii;if(g||v){let p=t.get(d);const m=p!==void 0?p.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return i===null&&(i=new Yl(n)),p=g?i.fromEquirectangular(d,p):i.fromCubemap(d,p),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),p.texture;if(p!==void 0)return p.texture;{const M=d.image;return g&&M&&M.height>0||v&&M&&l(M)?(i===null&&(i=new Yl(n)),p=g?i.fromEquirectangular(d):i.fromCubemap(d),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),d.addEventListener("dispose",f),p.texture):null}}}return d}function o(d,u){return u===Ps?d.mapping=ei:u===Is&&(d.mapping=Ii),d}function l(d){let u=0;const g=6;for(let v=0;v<g;v++)d[v]!==void 0&&u++;return u===g}function c(d){const u=d.target;u.removeEventListener("dispose",c);const g=e.get(u);g!==void 0&&(e.delete(u),g.dispose())}function f(d){const u=d.target;u.removeEventListener("dispose",f);const g=t.get(u);g!==void 0&&(t.delete(u),g.dispose())}function h(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function pg(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Li("WebGLRenderer: "+i+" extension not supported."),r}}}function mg(n,e,t,i){const r={},s=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete r[d.id];const u=s.get(d);u&&(e.remove(u),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const u in d)e.update(d[u],n.ARRAY_BUFFER)}function c(h){const d=[],u=h.index,g=h.attributes.position;let v=0;if(g===void 0)return;if(u!==null){const M=u.array;v=u.version;for(let A=0,x=M.length;A<x;A+=3){const T=M[A+0],E=M[A+1],C=M[A+2];d.push(T,E,E,C,C,T)}}else{const M=g.array;v=g.version;for(let A=0,x=M.length/3-1;A<x;A+=3){const T=A+0,E=A+1,C=A+2;d.push(T,E,E,C,C,T)}}const p=new(g.count>=65535?tu:eu)(d,1);p.version=v;const m=s.get(h);m&&e.remove(m),s.set(h,p)}function f(h){const d=s.get(h);if(d){const u=h.index;u!==null&&d.version<u.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:f}}function gg(n,e,t){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,d){n.drawElements(i,d,s,h*a),t.update(d,i,1)}function c(h,d,u){u!==0&&(n.drawElementsInstanced(i,d,s,h*a,u),t.update(d,i,u))}function f(h,d,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,h,0,u);let v=0;for(let p=0;p<u;p++)v+=d[p];t.update(v,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=f}function vg(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:Je("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function _g(n,e,t){const i=new WeakMap,r=new ht;function s(a,o,l){const c=a.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=f!==void 0?f.length:0;let d=i.get(o);if(d===void 0||d.count!==h){let b=function(){C.dispose(),i.delete(o),o.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();const u=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let A=0;u===!0&&(A=1),g===!0&&(A=2),v===!0&&(A=3);let x=o.attributes.position.count*A,T=1;x>e.maxTextureSize&&(T=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const E=new Float32Array(x*T*4*h),C=new Jc(E,x,T,h);C.type=dn,C.needsUpdate=!0;const S=A*4;for(let I=0;I<h;I++){const R=p[I],L=m[I],D=M[I],N=x*T*4*I;for(let H=0;H<R.count;H++){const Z=H*S;u===!0&&(r.fromBufferAttribute(R,H),E[N+Z+0]=r.x,E[N+Z+1]=r.y,E[N+Z+2]=r.z,E[N+Z+3]=0),g===!0&&(r.fromBufferAttribute(L,H),E[N+Z+4]=r.x,E[N+Z+5]=r.y,E[N+Z+6]=r.z,E[N+Z+7]=0),v===!0&&(r.fromBufferAttribute(D,H),E[N+Z+8]=r.x,E[N+Z+9]=r.y,E[N+Z+10]=r.z,E[N+Z+11]=D.itemSize===4?r.w:1)}}d={count:h,texture:C,size:new Pe(x,T)},i.set(o,d),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let u=0;for(let v=0;v<c.length;v++)u+=c[v];const g=o.morphTargetsRelative?1:1-u;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function xg(n,e,t,i,r){let s=new WeakMap;function a(c){const f=r.render.frame,h=c.geometry,d=e.get(c,h);if(s.get(d)!==f&&(e.update(d),s.set(d,f)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==f&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,f))),c.isSkinnedMesh){const u=c.skeleton;s.get(u)!==f&&(u.update(),s.set(u,f))}return d}function o(){s=new WeakMap}function l(c){const f=c.target;f.removeEventListener("dispose",l),i.releaseStatesOfObject(f),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:a,dispose:o}}const Sg={[Uc]:"LINEAR_TONE_MAPPING",[Oc]:"REINHARD_TONE_MAPPING",[Fc]:"CINEON_TONE_MAPPING",[Bc]:"ACES_FILMIC_TONE_MAPPING",[zc]:"AGX_TONE_MAPPING",[Hc]:"NEUTRAL_TONE_MAPPING",[kc]:"CUSTOM_TONE_MAPPING"};function Mg(n,e,t,i,r,s){const a=new tn(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new kt;c.setAttribute("position",new St([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new St([0,2,0,0,2,0],2));const f=new dh({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new mn(c,f),d=new Bo(-1,1,1,-1,0,1);let u=null,g=null,v=!1,p,m=null,M=[],A=!1;this.setSize=function(x,T){a.setSize(x,T),o!==null&&o.setSize(x,T),l!==null&&l.setSize(x,T);for(let E=0;E<M.length;E++){const C=M[E];C.setSize&&C.setSize(x,T)}},this.setEffects=function(x){M=x,A=M.length>0&&M[0].isRenderPass===!0;const T=a.width,E=a.height;M.length>0&&o===null&&(o=new tn(T,E,{type:pn,depthBuffer:!1,stencilBuffer:!1}),l=new tn(T,E,{type:pn,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<M.length;C++){const S=M[C];S.setSize&&S.setSize(T,E)}},this.begin=function(x,T){if(v||x.toneMapping===en&&M.length===0)return!1;if(m=T,T!==null){const E=T.width,C=T.height;(a.width!==E||a.height!==C)&&this.setSize(E,C)}return A===!1&&x.setRenderTarget(a),p=x.toneMapping,x.toneMapping=en,!0},this.hasRenderPass=function(){return A},this.end=function(x,T){x.toneMapping=p,v=!0;let E=a,C=o;for(let S=0;S<M.length;S++){const b=M[S];b.enabled!==!1&&(b.render(x,C,E,T),b.needsSwap!==!1&&(E=C,C=C===o?l:o))}if(u!==x.outputColorSpace||g!==x.toneMapping){u=x.outputColorSpace,g=x.toneMapping,f.defines={},$e.getTransfer(u)===et&&(f.defines.SRGB_TRANSFER="");const S=Sg[g];S&&(f.defines[S]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=E.texture,x.setRenderTarget(m),x.render(h,d),m=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),f.dispose()}}const Su=new Nt,lo=new ar(1,1),Mu=new Jc,yu=new uf,Eu=new iu,Jl=[],Ql=[],jl=new Float32Array(16),ec=new Float32Array(9),tc=new Float32Array(4);function Fi(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Jl[r];if(s===void 0&&(s=new Float32Array(r),Jl[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function yt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Et(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ys(n,e){let t=Ql[e];t===void 0&&(t=new Int32Array(e),Ql[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function yg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Eg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;n.uniform2fv(this.addr,e),Et(t,e)}}function bg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(yt(t,e))return;n.uniform3fv(this.addr,e),Et(t,e)}}function Tg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;n.uniform4fv(this.addr,e),Et(t,e)}}function Ag(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(yt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Et(t,e)}else{if(yt(t,i))return;tc.set(i),n.uniformMatrix2fv(this.addr,!1,tc),Et(t,i)}}function wg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(yt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Et(t,e)}else{if(yt(t,i))return;ec.set(i),n.uniformMatrix3fv(this.addr,!1,ec),Et(t,i)}}function Cg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(yt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Et(t,e)}else{if(yt(t,i))return;jl.set(i),n.uniformMatrix4fv(this.addr,!1,jl),Et(t,i)}}function Rg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Lg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;n.uniform2iv(this.addr,e),Et(t,e)}}function Pg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(yt(t,e))return;n.uniform3iv(this.addr,e),Et(t,e)}}function Ig(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;n.uniform4iv(this.addr,e),Et(t,e)}}function Dg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Ng(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;n.uniform2uiv(this.addr,e),Et(t,e)}}function Ug(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(yt(t,e))return;n.uniform3uiv(this.addr,e),Et(t,e)}}function Og(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;n.uniform4uiv(this.addr,e),Et(t,e)}}function Fg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(lo.compareFunction=t.isReversedDepthBuffer()?Po:Lo,s=lo):s=Su,t.setTexture2D(e||s,r)}function Bg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||yu,r)}function kg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Eu,r)}function zg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Mu,r)}function Hg(n){switch(n){case 5126:return yg;case 35664:return Eg;case 35665:return bg;case 35666:return Tg;case 35674:return Ag;case 35675:return wg;case 35676:return Cg;case 5124:case 35670:return Rg;case 35667:case 35671:return Lg;case 35668:case 35672:return Pg;case 35669:case 35673:return Ig;case 5125:return Dg;case 36294:return Ng;case 36295:return Ug;case 36296:return Og;case 35678:case 36198:case 36298:case 36306:case 35682:return Fg;case 35679:case 36299:case 36307:return Bg;case 35680:case 36300:case 36308:case 36293:return kg;case 36289:case 36303:case 36311:case 36292:return zg}}function Vg(n,e){n.uniform1fv(this.addr,e)}function Gg(n,e){const t=Fi(e,this.size,2);n.uniform2fv(this.addr,t)}function Wg(n,e){const t=Fi(e,this.size,3);n.uniform3fv(this.addr,t)}function Xg(n,e){const t=Fi(e,this.size,4);n.uniform4fv(this.addr,t)}function qg(n,e){const t=Fi(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Yg(n,e){const t=Fi(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function $g(n,e){const t=Fi(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Kg(n,e){n.uniform1iv(this.addr,e)}function Zg(n,e){n.uniform2iv(this.addr,e)}function Jg(n,e){n.uniform3iv(this.addr,e)}function Qg(n,e){n.uniform4iv(this.addr,e)}function jg(n,e){n.uniform1uiv(this.addr,e)}function e0(n,e){n.uniform2uiv(this.addr,e)}function t0(n,e){n.uniform3uiv(this.addr,e)}function n0(n,e){n.uniform4uiv(this.addr,e)}function i0(n,e,t){const i=this.cache,r=e.length,s=ys(t,r);yt(i,s)||(n.uniform1iv(this.addr,s),Et(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=lo:a=Su;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function r0(n,e,t){const i=this.cache,r=e.length,s=ys(t,r);yt(i,s)||(n.uniform1iv(this.addr,s),Et(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||yu,s[a])}function s0(n,e,t){const i=this.cache,r=e.length,s=ys(t,r);yt(i,s)||(n.uniform1iv(this.addr,s),Et(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Eu,s[a])}function a0(n,e,t){const i=this.cache,r=e.length,s=ys(t,r);yt(i,s)||(n.uniform1iv(this.addr,s),Et(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Mu,s[a])}function o0(n){switch(n){case 5126:return Vg;case 35664:return Gg;case 35665:return Wg;case 35666:return Xg;case 35674:return qg;case 35675:return Yg;case 35676:return $g;case 5124:case 35670:return Kg;case 35667:case 35671:return Zg;case 35668:case 35672:return Jg;case 35669:case 35673:return Qg;case 5125:return jg;case 36294:return e0;case 36295:return t0;case 36296:return n0;case 35678:case 36198:case 36298:case 36306:case 35682:return i0;case 35679:case 36299:case 36307:return r0;case 35680:case 36300:case 36308:case 36293:return s0;case 36289:case 36303:case 36311:case 36292:return a0}}class l0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Hg(t.type)}}class c0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=o0(t.type)}}class u0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const ha=/(\w+)(\])?(\[|\.)?/g;function nc(n,e){n.seq.push(e),n.map[e.id]=e}function d0(n,e,t){const i=n.name,r=i.length;for(ha.lastIndex=0;;){const s=ha.exec(i),a=ha.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){nc(t,c===void 0?new l0(o,n,e):new c0(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new u0(o),nc(t,h)),t=h}}}class ss{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);d0(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function ic(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const f0=37297;let h0=0;function p0(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const rc=new ze;function m0(n){$e._getMatrix(rc,$e.workingColorSpace,n);const e=`mat3( ${rc.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(n)){case ps:return[e,"LinearTransferOETF"];case et:return[e,"sRGBTransferOETF"];default:return Be("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function sc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+p0(n.getShaderSource(e),o)}else return s}function g0(n,e){const t=m0(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const v0={[Uc]:"Linear",[Oc]:"Reinhard",[Fc]:"Cineon",[Bc]:"ACESFilmic",[zc]:"AgX",[Hc]:"Neutral",[kc]:"Custom"};function _0(n,e){const t=v0[e];return t===void 0?(Be("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const qr=new q;function x0(){$e.getLuminanceCoefficients(qr);const n=qr.x.toFixed(4),e=qr.y.toFixed(4),t=qr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function S0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ki).join(`
`)}function M0(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function y0(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Ki(n){return n!==""}function ac(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function oc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const E0=/^[ \t]*#include +<([\w\d./]+)>/gm;function co(n){return n.replace(E0,T0)}const b0=new Map;function T0(n,e){let t=Ge[e];if(t===void 0){const i=b0.get(e);if(i!==void 0)t=Ge[i],Be('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return co(t)}const A0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lc(n){return n.replace(A0,w0)}function w0(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function cc(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const C0={[es]:"SHADOWMAP_TYPE_PCF",[Yi]:"SHADOWMAP_TYPE_VSM"};function R0(n){return C0[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const L0={[ei]:"ENVMAP_TYPE_CUBE",[Ii]:"ENVMAP_TYPE_CUBE",[_s]:"ENVMAP_TYPE_CUBE_UV"};function P0(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":L0[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const I0={[Ii]:"ENVMAP_MODE_REFRACTION"};function D0(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":I0[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const N0={[Nc]:"ENVMAP_BLENDING_MULTIPLY",[zd]:"ENVMAP_BLENDING_MIX",[Hd]:"ENVMAP_BLENDING_ADD"};function U0(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":N0[n.combine]||"ENVMAP_BLENDING_NONE"}function O0(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function F0(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=R0(t),c=P0(t),f=D0(t),h=U0(t),d=O0(t),u=S0(t),g=M0(s),v=r.createProgram();let p,m,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ki).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ki).join(`
`),m.length>0&&(m+=`
`)):(p=[cc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ki).join(`
`),m=[cc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+f:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==en?"#define TONE_MAPPING":"",t.toneMapping!==en?Ge.tonemapping_pars_fragment:"",t.toneMapping!==en?_0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,g0("linearToOutputTexel",t.outputColorSpace),x0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ki).join(`
`)),a=co(a),a=ac(a,t),a=oc(a,t),o=co(o),o=ac(o,t),o=oc(o,t),a=lc(a),o=lc(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,p=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===ml?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ml?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const A=M+p+a,x=M+m+o,T=ic(r,r.VERTEX_SHADER,A),E=ic(r,r.FRAGMENT_SHADER,x);r.attachShader(v,T),r.attachShader(v,E),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function C(R){if(n.debug.checkShaderErrors){const L=r.getProgramInfoLog(v)||"",D=r.getShaderInfoLog(T)||"",N=r.getShaderInfoLog(E)||"",H=L.trim(),Z=D.trim(),J=N.trim();let U=!0,X=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(U=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,v,T,E);else{const te=sc(r,T,"vertex"),Q=sc(r,E,"fragment");Je("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+H+`
`+te+`
`+Q)}else H!==""?Be("WebGLProgram: Program Info Log:",H):(Z===""||J==="")&&(X=!1);X&&(R.diagnostics={runnable:U,programLog:H,vertexShader:{log:Z,prefix:p},fragmentShader:{log:J,prefix:m}})}r.deleteShader(T),r.deleteShader(E),S=new ss(r,v),b=y0(r,v)}let S;this.getUniforms=function(){return S===void 0&&C(this),S};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=r.getProgramParameter(v,f0)),I},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=h0++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=T,this.fragmentShader=E,this}let B0=0;class k0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new z0(e),t.set(e,i)),i}}class z0{constructor(e){this.id=B0++,this.code=e,this.usedTimes=0}}function H0(n){return n===ti||n===ds||n===fs}function V0(n,e,t,i,r,s){const a=new Qc,o=new k0,l=new Set,c=[],f=new Map,h=i.logarithmicDepthBuffer;let d=i.precision;const u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return l.add(S),S===0?"uv":`uv${S}`}function v(S,b,I,R,L,D){const N=R.fog,H=L.geometry,Z=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?R.environment:null,J=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap,U=e.get(S.envMap||Z,J),X=U&&U.mapping===_s?U.image.height:null,te=u[S.type];S.precision!==null&&(d=i.getMaxPrecision(S.precision),d!==S.precision&&Be("WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));const Q=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ee=Q!==void 0?Q.length:0;let ie=0;H.morphAttributes.position!==void 0&&(ie=1),H.morphAttributes.normal!==void 0&&(ie=2),H.morphAttributes.color!==void 0&&(ie=3);let Ce,_e,fe,G;if(te){const st=ln[te];Ce=st.vertexShader,_e=st.fragmentShader}else{Ce=S.vertexShader,_e=S.fragmentShader;const st=o.getVertexShaderStage(S),Qe=o.getFragmentShaderStage(S);o.update(S,st,Qe),fe=st.id,G=Qe.id}const Y=n.getRenderTarget(),se=n.state.buffers.depth.getReversed(),he=L.isInstancedMesh===!0,ce=L.isBatchedMesh===!0,de=!!S.map,Oe=!!S.matcap,Ne=!!U,Fe=!!S.aoMap,Xe=!!S.lightMap,Ie=!!S.bumpMap&&S.wireframe===!1,tt=!!S.normalMap,pt=!!S.displacementMap,Ct=!!S.emissiveMap,ot=!!S.metalnessMap,ft=!!S.roughnessMap,z=S.anisotropy>0,Mt=S.clearcoat>0,Ke=S.dispersion>0,w=S.retroreflectivity>0,_=S.iridescence>0,W=S.sheen>0,j=S.transmission>0,re=z&&!!S.anisotropyMap,P=Mt&&!!S.clearcoatMap,F=Mt&&!!S.clearcoatNormalMap,O=Mt&&!!S.clearcoatRoughnessMap,V=_&&!!S.iridescenceMap,oe=_&&!!S.iridescenceThicknessMap,Te=W&&!!S.sheenColorMap,pe=W&&!!S.sheenRoughnessMap,ue=!!S.specularMap,ye=!!S.specularColorMap,Ue=!!S.specularIntensityMap,ke=j&&!!S.transmissionMap,k=j&&!!S.thicknessMap,me=!!S.gradientMap,ae=!!S.alphaMap,ge=S.alphaTest>0,Me=!!S.alphaHash,le=!!S.extensions;let De=en;S.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(De=n.toneMapping);const Re={shaderID:te,shaderType:S.type,shaderName:S.name,vertexShader:Ce,fragmentShader:_e,defines:S.defines,customVertexShaderID:fe,customFragmentShaderID:G,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:ce,batchingColor:ce&&L._colorsTexture!==null,instancing:he,instancingColor:he&&L.instanceColor!==null,instancingMorph:he&&L.morphTexture!==null,outputColorSpace:Y===null?n.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:$e.workingColorSpace,alphaToCoverage:!!S.alphaToCoverage,map:de,matcap:Oe,envMap:Ne,envMapMode:Ne&&U.mapping,envMapCubeUVHeight:X,aoMap:Fe,lightMap:Xe,bumpMap:Ie,normalMap:tt,displacementMap:pt,emissiveMap:Ct,normalMapObjectSpace:tt&&S.normalMapType===Wd,normalMapTangentSpace:tt&&S.normalMapType===pl,packedNormalMap:tt&&S.normalMapType===pl&&H0(S.normalMap.format),metalnessMap:ot,roughnessMap:ft,anisotropy:z,anisotropyMap:re,clearcoat:Mt,clearcoatMap:P,clearcoatNormalMap:F,clearcoatRoughnessMap:O,dispersion:Ke,retroreflection:w,iridescence:_,iridescenceMap:V,iridescenceThicknessMap:oe,sheen:W,sheenColorMap:Te,sheenRoughnessMap:pe,specularMap:ue,specularColorMap:ye,specularIntensityMap:Ue,transmission:j,transmissionMap:ke,thicknessMap:k,gradientMap:me,opaque:S.transparent===!1&&S.blending===Zi&&S.alphaToCoverage===!1,alphaMap:ae,alphaTest:ge,alphaHash:Me,combine:S.combine,mapUv:de&&g(S.map.channel),aoMapUv:Fe&&g(S.aoMap.channel),lightMapUv:Xe&&g(S.lightMap.channel),bumpMapUv:Ie&&g(S.bumpMap.channel),normalMapUv:tt&&g(S.normalMap.channel),displacementMapUv:pt&&g(S.displacementMap.channel),emissiveMapUv:Ct&&g(S.emissiveMap.channel),metalnessMapUv:ot&&g(S.metalnessMap.channel),roughnessMapUv:ft&&g(S.roughnessMap.channel),anisotropyMapUv:re&&g(S.anisotropyMap.channel),clearcoatMapUv:P&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:F&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:O&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:V&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:oe&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:pe&&g(S.sheenRoughnessMap.channel),specularMapUv:ue&&g(S.specularMap.channel),specularColorMapUv:ye&&g(S.specularColorMap.channel),specularIntensityMapUv:Ue&&g(S.specularIntensityMap.channel),transmissionMapUv:ke&&g(S.transmissionMap.channel),thicknessMapUv:k&&g(S.thicknessMap.channel),alphaMapUv:ae&&g(S.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(tt||z),vertexNormals:!!H.attributes.normal,vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!H.attributes.uv&&(de||ae),fog:!!N,useFog:S.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:S.wireframe===!1&&(S.flatShading===!0||H.attributes.normal===void 0&&tt===!1&&(S.isMeshLambertMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isMeshPhysicalMaterial)),sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:se,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:H.attributes.position!==void 0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:ie,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:D.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:De,decodeVideoTexture:de&&S.map.isVideoTexture===!0&&$e.getTransfer(S.map.colorSpace)===et,decodeVideoTextureEmissive:Ct&&S.emissiveMap.isVideoTexture===!0&&$e.getTransfer(S.emissiveMap.colorSpace)===et,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===un,flipSided:S.side===Bt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:le&&S.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(le&&S.extensions.multiDraw===!0||ce)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Re.vertexUv1s=l.has(1),Re.vertexUv2s=l.has(2),Re.vertexUv3s=l.has(3),l.clear(),Re}function p(S){const b=[];if(S.shaderID?b.push(S.shaderID):(b.push(S.customVertexShaderID),b.push(S.customFragmentShaderID)),S.defines!==void 0)for(const I in S.defines)b.push(I),b.push(S.defines[I]);return S.isRawShaderMaterial===!1&&(m(b,S),M(b,S),b.push(n.outputColorSpace)),b.push(S.customProgramCacheKey),b.join()}function m(S,b){S.push(b.precision),S.push(b.outputColorSpace),S.push(b.envMapMode),S.push(b.envMapCubeUVHeight),S.push(b.mapUv),S.push(b.alphaMapUv),S.push(b.lightMapUv),S.push(b.aoMapUv),S.push(b.bumpMapUv),S.push(b.normalMapUv),S.push(b.displacementMapUv),S.push(b.emissiveMapUv),S.push(b.metalnessMapUv),S.push(b.roughnessMapUv),S.push(b.anisotropyMapUv),S.push(b.clearcoatMapUv),S.push(b.clearcoatNormalMapUv),S.push(b.clearcoatRoughnessMapUv),S.push(b.iridescenceMapUv),S.push(b.iridescenceThicknessMapUv),S.push(b.sheenColorMapUv),S.push(b.sheenRoughnessMapUv),S.push(b.specularMapUv),S.push(b.specularColorMapUv),S.push(b.specularIntensityMapUv),S.push(b.transmissionMapUv),S.push(b.thicknessMapUv),S.push(b.combine),S.push(b.fogExp2),S.push(b.sizeAttenuation),S.push(b.morphTargetsCount),S.push(b.morphAttributeCount),S.push(b.numSunLights),S.push(b.numDirLights),S.push(b.numPointLights),S.push(b.numSpotLights),S.push(b.numSpotLightMaps),S.push(b.numHemiLights),S.push(b.numRectAreaLights),S.push(b.numSunLightShadows),S.push(b.numDirLightShadows),S.push(b.numPointLightShadows),S.push(b.numSpotLightShadows),S.push(b.numSpotLightShadowsWithMaps),S.push(b.numLightProbes),S.push(b.shadowMapType),S.push(b.toneMapping),S.push(b.numClippingPlanes),S.push(b.numClipIntersection),S.push(b.depthPacking)}function M(S,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.retroreflection&&a.enable(24),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),b.packedNormalMap&&a.enable(22),b.vertexNormals&&a.enable(23),S.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),b.numLightProbeGrids>0&&a.enable(22),b.hasPositionAttribute&&a.enable(23),S.push(a.mask)}function A(S){const b=u[S.type];let I;if(b){const R=ln[b];I=lh.clone(R.uniforms)}else I=S.uniforms;return I}function x(S,b){let I=f.get(b);return I!==void 0?++I.usedTimes:(I=new F0(n,b,S,r),c.push(I),f.set(b,I)),I}function T(S){if(--S.usedTimes===0){const b=c.indexOf(S);c[b]=c[c.length-1],c.pop(),f.delete(S.cacheKey),S.destroy()}}function E(S){o.remove(S)}function C(){o.dispose()}return{getParameters:v,getProgramCacheKey:p,getUniforms:A,acquireProgram:x,releaseProgram:T,releaseShaderCache:E,programs:c,dispose:C}}function G0(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function W0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function uc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function dc(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(d){let u=0;return d.isInstancedMesh&&(u+=2),d.isSkinnedMesh&&(u+=1),u}function o(d,u,g,v,p,m){let M=n[e];return M===void 0?(M={id:d.id,object:d,geometry:u,material:g,materialVariant:a(d),groupOrder:v,renderOrder:d.renderOrder,z:p,group:m},n[e]=M):(M.id=d.id,M.object=d,M.geometry=u,M.material=g,M.materialVariant=a(d),M.groupOrder=v,M.renderOrder=d.renderOrder,M.z=p,M.group=m),e++,M}function l(d,u,g,v,p,m,M){M.reversedDepth===!0&&(p=-p);const A=o(d,u,g,v,p,m);g.transmission>0?i.push(A):g.transparent===!0?r.push(A):t.push(A)}function c(d,u,g,v,p,m){const M=o(d,u,g,v,p,m);g.transmission>0?i.unshift(M):g.transparent===!0?r.unshift(M):t.unshift(M)}function f(d,u){t.length>1&&t.sort(d||W0),i.length>1&&i.sort(u||uc),r.length>1&&r.sort(u||uc)}function h(){for(let d=e,u=n.length;d<u;d++){const g=n[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:h,sort:f}}function X0(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new dc,n.set(i,[a])):r>=s.length?(a=new dc,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function q0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new q,color:new He};break;case"SpotLight":t={position:new q,direction:new q,color:new He,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new q,color:new He,distance:0,decay:0};break;case"HemisphereLight":t={direction:new q,skyColor:new He,groundColor:new He};break;case"RectAreaLight":t={color:new He,position:new q,halfWidth:new q,halfHeight:new q};break}return n[e.id]=t,t}}}function Y0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let $0=0;function K0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Z0(n){const e=new q0,t=Y0(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new q);const r=new q,s=new vt,a=new vt;function o(c){let f=0,h=0,d=0;for(let L=0;L<9;L++)i.probe[L].set(0,0,0);let u=0,g=0,v=0,p=0,m=0,M=0,A=0,x=0,T=0,E=0,C=0,S=0,b=0,I=0;c.sort(K0);for(let L=0,D=c.length;L<D;L++){const N=c[L],H=N.color,Z=N.intensity,J=N.distance;let U=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===ti?U=N.shadow.map.texture:U=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)f+=H.r*Z,h+=H.g*Z,d+=H.b*Z;else if(N.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(N.sh.coefficients[X],Z);I++}else if(N.isSunLight){const X=e.get(N);if(X.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const te=N.shadow,Q=t.get(N);Q.shadowIntensity=te.intensity,Q.shadowBias=te.bias,Q.shadowNormalBias=te.normalBias,Q.shadowRadius=te.radius,Q.shadowMapSize.copy(te.mapSize).multiply(te.getFrameExtents()),i.sunShadow[g]=Q,i.sunShadowMap[g]=U;const ee=te.getViewportCount();for(let ie=0;ie<ee;ie++)i.sunShadowMatrix[v+ie]=te.getMatrix(ie),i.sunShadowCascade[v+ie]=te._cascadeData[ie];v+=ee,g++}i.sun[u]=X,u++}else if(N.isDirectionalLight){const X=e.get(N);if(X.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const te=N.shadow,Q=t.get(N);Q.shadowIntensity=te.intensity,Q.shadowBias=te.bias,Q.shadowNormalBias=te.normalBias,Q.shadowRadius=te.radius,Q.shadowMapSize=te.mapSize,i.directionalShadow[p]=Q,i.directionalShadowMap[p]=U,i.directionalShadowMatrix[p]=N.shadow.matrix,T++}i.directional[p]=X,p++}else if(N.isSpotLight){const X=e.get(N);X.position.setFromMatrixPosition(N.matrixWorld),X.color.copy(H).multiplyScalar(Z),X.distance=J,X.coneCos=Math.cos(N.angle),X.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),X.decay=N.decay,i.spot[M]=X;const te=N.shadow;if(N.map&&(i.spotLightMap[S]=N.map,S++,te.updateMatrices(N),N.castShadow&&b++),i.spotLightMatrix[M]=te.matrix,N.castShadow){const Q=t.get(N);Q.shadowIntensity=te.intensity,Q.shadowBias=te.bias,Q.shadowNormalBias=te.normalBias,Q.shadowRadius=te.radius,Q.shadowMapSize=te.mapSize,i.spotShadow[M]=Q,i.spotShadowMap[M]=U,C++}M++}else if(N.isRectAreaLight){const X=e.get(N);X.color.copy(H).multiplyScalar(Z),X.halfWidth.set(N.width*.5,0,0),X.halfHeight.set(0,N.height*.5,0),i.rectArea[A]=X,A++}else if(N.isPointLight){const X=e.get(N);if(X.color.copy(N.color).multiplyScalar(N.intensity),X.distance=N.distance,X.decay=N.decay,N.castShadow){const te=N.shadow,Q=t.get(N);Q.shadowIntensity=te.intensity,Q.shadowBias=te.bias,Q.shadowNormalBias=te.normalBias,Q.shadowRadius=te.radius,Q.shadowMapSize=te.mapSize,Q.shadowCameraNear=te.camera.near,Q.shadowCameraFar=te.camera.far,i.pointShadow[m]=Q,i.pointShadowMap[m]=U,i.pointShadowMatrix[m]=N.shadow.matrix,E++}i.point[m]=X,m++}else if(N.isHemisphereLight){const X=e.get(N);X.skyColor.copy(N.color).multiplyScalar(Z),X.groundColor.copy(N.groundColor).multiplyScalar(Z),i.hemi[x]=X,x++}}A>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ve.LTC_FLOAT_1,i.rectAreaLTC2=ve.LTC_FLOAT_2):(i.rectAreaLTC1=ve.LTC_HALF_1,i.rectAreaLTC2=ve.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=h,i.ambient[2]=d;const R=i.hash;(R.sunLength!==u||R.directionalLength!==p||R.pointLength!==m||R.spotLength!==M||R.rectAreaLength!==A||R.hemiLength!==x||R.numSunShadows!==g||R.numDirectionalShadows!==T||R.numPointShadows!==E||R.numSpotShadows!==C||R.numSpotMaps!==S||R.numLightProbes!==I)&&(i.sun.length=u,i.directional.length=p,i.spot.length=M,i.rectArea.length=A,i.point.length=m,i.hemi.length=x,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=v,i.sunShadowCascade.length=v,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.directionalShadowMatrix.length=T,i.pointShadow.length=E,i.pointShadowMap.length=E,i.pointShadowMatrix.length=E,i.spotShadow.length=C,i.spotShadowMap.length=C,i.spotLightMatrix.length=C+S-b,i.spotLightMap.length=S,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=I,R.sunLength=u,R.directionalLength=p,R.pointLength=m,R.spotLength=M,R.rectAreaLength=A,R.hemiLength=x,R.numSunShadows=g,R.numDirectionalShadows=T,R.numPointShadows=E,R.numSpotShadows=C,R.numSpotMaps=S,R.numLightProbes=I,i.version=$0++)}function l(c,f){let h=0,d=0,u=0,g=0,v=0,p=0;const m=f.matrixWorldInverse;for(let M=0,A=c.length;M<A;M++){const x=c[M];if(x.isSunLight){const T=i.sun[h];T.direction.setFromMatrixPosition(x.matrixWorld),T.direction.transformDirection(m),h++}else if(x.isDirectionalLight){const T=i.directional[d];T.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(m),d++}else if(x.isSpotLight){const T=i.spot[g];T.position.setFromMatrixPosition(x.matrixWorld),T.position.applyMatrix4(m),T.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(m),g++}else if(x.isRectAreaLight){const T=i.rectArea[v];T.position.setFromMatrixPosition(x.matrixWorld),T.position.applyMatrix4(m),a.identity(),s.copy(x.matrixWorld),s.premultiply(m),a.extractRotation(s),T.halfWidth.set(x.width*.5,0,0),T.halfHeight.set(0,x.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),v++}else if(x.isPointLight){const T=i.point[u];T.position.setFromMatrixPosition(x.matrixWorld),T.position.applyMatrix4(m),u++}else if(x.isHemisphereLight){const T=i.hemi[p];T.direction.setFromMatrixPosition(x.matrixWorld),T.direction.transformDirection(m),p++}}}return{setup:o,setupView:l,state:i}}function fc(n){const e=new Z0(n),t=[],i=[],r=[];function s(d){h.camera=d,t.length=0,i.length=0,r.length=0}function a(d){t.push(d)}function o(d){i.push(d)}function l(d){r.push(d)}function c(){e.setup(t)}function f(d){e.setupView(t,d)}const h={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:c,setupLightsView:f,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function J0(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new fc(n),e.set(r,[o])):s>=a.length?(o=new fc(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const Q0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,j0=`uniform sampler2D shadow_pass;
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
}`,ev=[new q(1,0,0),new q(-1,0,0),new q(0,1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1)],tv=[new q(0,-1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1),new q(0,-1,0),new q(0,-1,0)],hc=new vt,Xi=new q,pa=new q;function nv(n,e,t){let i=new nu;const r=new Pe,s=new Pe,a=new ht,o=new fh,l=new hh,c={},f=t.maxTextureSize,h={[jn]:Bt,[Bt]:jn,[un]:un},d=new gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pe},radius:{value:4}},vertexShader:Q0,fragmentShader:j0}),u=d.clone();u.defines.HORIZONTAL_PASS=1;const g=new kt;g.setAttribute("position",new wn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new mn(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=es;let m=this.type;this.render=function(E,C,S){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;this.type===Md&&(Be("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=es);const b=n.getRenderTarget(),I=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),L=n.state;L.setBlending(Tn),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const D=m!==this.type;D&&C.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(H=>H.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,H=E.length;N<H;N++){const Z=E[N],J=Z.shadow;if(J===void 0){Be("WebGLShadowMap:",Z,"has no shadow.");continue}if(J.autoUpdate===!1&&J.needsUpdate===!1)continue;r.copy(J.mapSize);const U=J.getFrameExtents();r.multiply(U),s.copy(J.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/U.x),r.x=s.x*U.x,J.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/U.y),r.y=s.y*U.y,J.mapSize.y=s.y));const X=n.state.buffers.depth.getReversed();if(J.camera._reversedDepth=X,J.map===null||D===!0){if(J.map!==null&&(J.map.depthTexture!==null&&(J.map.depthTexture.dispose(),J.map.depthTexture=null),J.map.dispose()),this.type===Yi){if(Z.isPointLight){Be("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}J.map=new tn(r.x,r.y,{format:ti,type:pn,minFilter:Dt,magFilter:Dt,generateMipmaps:!1}),J.map.texture.name=Z.name+".shadowMap",J.map.depthTexture=new ar(r.x,r.y,dn),J.map.depthTexture.name=Z.name+".shadowMapDepth",J.map.depthTexture.format=Cn,J.map.depthTexture.compareFunction=null,J.map.depthTexture.minFilter=wt,J.map.depthTexture.magFilter=wt}else Z.isPointLight?(J.map=new xu(r.x),J.map.depthTexture=new Cf(r.x,hn)):(J.map=new tn(r.x,r.y),J.map.depthTexture=new ar(r.x,r.y,hn)),J.map.depthTexture.name=Z.name+".shadowMap",J.map.depthTexture.format=Cn,this.type===es?(J.map.depthTexture.compareFunction=X?Po:Lo,J.map.depthTexture.minFilter=Dt,J.map.depthTexture.magFilter=Dt):(J.map.depthTexture.compareFunction=null,J.map.depthTexture.minFilter=wt,J.map.depthTexture.magFilter=wt);J.camera.updateProjectionMatrix()}J.map.isWebGLCubeRenderTarget!==!0&&(J.map.width!==r.x||J.map.height!==r.y)&&J.map.setSize(r.x,r.y);const te=J.map.isWebGLCubeRenderTarget?6:J.getViewportCount();Z.isPointLight!==!0&&J.updateMatrices(Z,S);for(let Q=0;Q<te;Q++){const ee=J.getCamera(Q);if(Z.isPointLight){const ie=J.camera,Ce=J.matrix,_e=Z.distance||ie.far;_e!==ie.far&&(ie.far=_e,ie.updateProjectionMatrix()),Xi.setFromMatrixPosition(Z.matrixWorld),ie.position.copy(Xi),pa.copy(ie.position),pa.add(ev[Q]),ie.up.copy(tv[Q]),ie.lookAt(pa),ie.updateMatrixWorld(),Ce.makeTranslation(-Xi.x,-Xi.y,-Xi.z),hc.multiplyMatrices(ie.projectionMatrix,ie.matrixWorldInverse),J._frustum.setFromProjectionMatrix(hc,ie.coordinateSystem,ie.reversedDepth)}if(J.map.isWebGLCubeRenderTarget)n.setRenderTarget(J.map,Q),n.clear();else{Q===0&&(n.setRenderTarget(J.map),n.clear());const ie=J.getViewport(Q);a.set(s.x*ie.x,s.y*ie.y,s.x*ie.z,s.y*ie.w),L.viewport(a)}i=J.getFrustum(Q),x(C,S,ee,Z,this.type)}J.isPointLightShadow!==!0&&this.type===Yi&&M(J,S),J.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(b,I,R)};function M(E,C){const S=e.update(v);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,u.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,u.needsUpdate=!0),E.mapPass===null?E.mapPass=new tn(r.x,r.y,{format:ti,type:pn}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),d.uniforms.shadow_pass.value=E.map.depthTexture,d.uniforms.resolution.value.set(E.map.width,E.map.height),d.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(C,null,S,d,v,null),u.uniforms.shadow_pass.value=E.mapPass.texture,u.uniforms.resolution.value.set(E.map.width,E.map.height),u.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(C,null,S,u,v,null)}function A(E,C,S,b){let I=null;const R=S.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)I=R;else if(I=S.isPointLight===!0?l:o,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const L=I.uuid,D=C.uuid;let N=c[L];N===void 0&&(N={},c[L]=N);let H=N[D];H===void 0&&(H=I.clone(),N[D]=H,C.addEventListener("dispose",T)),I=H}if(I.visible=C.visible,I.wireframe=C.wireframe,b===Yi?I.side=C.shadowSide!==null?C.shadowSide:C.side:I.side=C.shadowSide!==null?C.shadowSide:h[C.side],I.alphaMap=C.alphaMap,I.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,I.map=C.map,I.clipShadows=C.clipShadows,I.clippingPlanes=C.clippingPlanes,I.clipIntersection=C.clipIntersection,I.displacementMap=C.displacementMap,I.displacementScale=C.displacementScale,I.displacementBias=C.displacementBias,I.wireframeLinewidth=C.wireframeLinewidth,I.linewidth=C.linewidth,S.isPointLight===!0&&I.isMeshDistanceMaterial===!0){const L=n.properties.get(I);L.light=S}return I}function x(E,C,S,b,I){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&I===Yi)&&(!E.frustumCulled||E.intersectsFrustum(i))){E.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,E.matrixWorld);const D=e.update(E),N=E.material;if(Array.isArray(N)){const H=D.groups;for(let Z=0,J=H.length;Z<J;Z++){const U=H[Z],X=N[U.materialIndex];if(X&&X.visible){const te=A(E,X,b,I);E.onBeforeShadow(n,E,C,S,D,te,U),n.renderBufferDirect(S,null,D,te,E,U),E.onAfterShadow(n,E,C,S,D,te,U)}}}else if(N.visible){const H=A(E,N,b,I);E.onBeforeShadow(n,E,C,S,D,H,null),n.renderBufferDirect(S,null,D,H,E,null),E.onAfterShadow(n,E,C,S,D,H,null)}}const L=E.children;for(let D=0,N=L.length;D<N;D++)x(L[D],C,S,b,I)}function T(E){E.target.removeEventListener("dispose",T);for(const S in c){const b=c[S],I=E.target.uuid;I in b&&(b[I].dispose(),delete b[I])}}}function iv(n,e){function t(){let k=!1;const me=new ht;let ae=null;const ge=new ht(0,0,0,0);return{setMask:function(Me){ae!==Me&&!k&&(n.colorMask(Me,Me,Me,Me),ae=Me)},setLocked:function(Me){k=Me},setClear:function(Me,le,De,Re,st){st===!0&&(Me*=Re,le*=Re,De*=Re),me.set(Me,le,De,Re),ge.equals(me)===!1&&(n.clearColor(Me,le,De,Re),ge.copy(me))},reset:function(){k=!1,ae=null,ge.set(-1,0,0,0)}}}function i(){let k=!1,me=!1,ae=null,ge=null,Me=null;return{setReversed:function(le){if(me!==le){const De=e.get("EXT_clip_control");le?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT),me=le;const Re=Me;Me=null,this.setClear(Re)}},getReversed:function(){return me},setTest:function(le){le?Y(n.DEPTH_TEST):se(n.DEPTH_TEST)},setMask:function(le){ae!==le&&!k&&(n.depthMask(le),ae=le)},setFunc:function(le){if(me&&(le=nf[le]),ge!==le){switch(le){case Sa:n.depthFunc(n.NEVER);break;case Ma:n.depthFunc(n.ALWAYS);break;case ya:n.depthFunc(n.LESS);break;case nr:n.depthFunc(n.LEQUAL);break;case Ea:n.depthFunc(n.EQUAL);break;case ba:n.depthFunc(n.GEQUAL);break;case Ta:n.depthFunc(n.GREATER);break;case Aa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ge=le}},setLocked:function(le){k=le},setClear:function(le){Me!==le&&(Me=le,me&&(le=1-le),n.clearDepth(le))},reset:function(){k=!1,ae=null,ge=null,Me=null,me=!1}}}function r(){let k=!1,me=null,ae=null,ge=null,Me=null,le=null,De=null,Re=null,st=null;return{setTest:function(Qe){k||(Qe?Y(n.STENCIL_TEST):se(n.STENCIL_TEST))},setMask:function(Qe){me!==Qe&&!k&&(n.stencilMask(Qe),me=Qe)},setFunc:function(Qe,Yt,nn){(ae!==Qe||ge!==Yt||Me!==nn)&&(n.stencilFunc(Qe,Yt,nn),ae=Qe,ge=Yt,Me=nn)},setOp:function(Qe,Yt,nn){(le!==Qe||De!==Yt||Re!==nn)&&(n.stencilOp(Qe,Yt,nn),le=Qe,De=Yt,Re=nn)},setLocked:function(Qe){k=Qe},setClear:function(Qe){st!==Qe&&(n.clearStencil(Qe),st=Qe)},reset:function(){k=!1,me=null,ae=null,ge=null,Me=null,le=null,De=null,Re=null,st=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let f={},h={},d={},u=new WeakMap,g=[],v=null,p=!1,m=null,M=null,A=null,x=null,T=null,E=null,C=null,S=new He(0,0,0),b=0,I=!1,R=null,L=null,D=null,N=null,H=null;const Z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let J=!1,U=0;const X=n.getParameter(n.VERSION);X.indexOf("WebGL")!==-1?(U=parseFloat(/^WebGL (\d)/.exec(X)[1]),J=U>=1):X.indexOf("OpenGL ES")!==-1&&(U=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),J=U>=2);let te=null,Q={};const ee=n.getParameter(n.SCISSOR_BOX),ie=n.getParameter(n.VIEWPORT),Ce=new ht().fromArray(ee),_e=new ht().fromArray(ie);function fe(k,me,ae,ge){const Me=new Uint8Array(4),le=n.createTexture();n.bindTexture(k,le),n.texParameteri(k,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(k,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let De=0;De<ae;De++)k===n.TEXTURE_3D||k===n.TEXTURE_2D_ARRAY?n.texImage3D(me,0,n.RGBA,1,1,ge,0,n.RGBA,n.UNSIGNED_BYTE,Me):n.texImage2D(me+De,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Me);return le}const G={};G[n.TEXTURE_2D]=fe(n.TEXTURE_2D,n.TEXTURE_2D,1),G[n.TEXTURE_CUBE_MAP]=fe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),G[n.TEXTURE_2D_ARRAY]=fe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),G[n.TEXTURE_3D]=fe(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Y(n.DEPTH_TEST),a.setFunc(nr),Ie(!1),tt(ul),Y(n.CULL_FACE),Fe(Tn);function Y(k){f[k]!==!0&&(n.enable(k),f[k]=!0)}function se(k){f[k]!==!1&&(n.disable(k),f[k]=!1)}function he(k,me){return d[k]!==me?(n.bindFramebuffer(k,me),d[k]=me,k===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=me),k===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=me),!0):!1}function ce(k,me){let ae=g,ge=!1;if(k){ae=u.get(me),ae===void 0&&(ae=[],u.set(me,ae));const Me=k.textures;if(ae.length!==Me.length||ae[0]!==n.COLOR_ATTACHMENT0){for(let le=0,De=Me.length;le<De;le++)ae[le]=n.COLOR_ATTACHMENT0+le;ae.length=Me.length,ge=!0}}else ae[0]!==n.BACK&&(ae[0]=n.BACK,ge=!0);ge&&n.drawBuffers(ae)}function de(k){return v!==k?(n.useProgram(k),v=k,!0):!1}const Oe={[bi]:n.FUNC_ADD,[Ed]:n.FUNC_SUBTRACT,[bd]:n.FUNC_REVERSE_SUBTRACT};Oe[Td]=n.MIN,Oe[Ad]=n.MAX;const Ne={[wd]:n.ZERO,[Cd]:n.ONE,[Rd]:n.SRC_COLOR,[Ic]:n.SRC_ALPHA,[Ud]:n.SRC_ALPHA_SATURATE,[Dd]:n.DST_COLOR,[Pd]:n.DST_ALPHA,[Ld]:n.ONE_MINUS_SRC_COLOR,[Dc]:n.ONE_MINUS_SRC_ALPHA,[Nd]:n.ONE_MINUS_DST_COLOR,[Id]:n.ONE_MINUS_DST_ALPHA,[Od]:n.CONSTANT_COLOR,[Fd]:n.ONE_MINUS_CONSTANT_COLOR,[Bd]:n.CONSTANT_ALPHA,[kd]:n.ONE_MINUS_CONSTANT_ALPHA};function Fe(k,me,ae,ge,Me,le,De,Re,st,Qe){if(k===Tn){p===!0&&(se(n.BLEND),p=!1);return}if(p===!1&&(Y(n.BLEND),p=!0),k!==yd){if(k!==m||Qe!==I){if((M!==bi||T!==bi)&&(n.blendEquation(n.FUNC_ADD),M=bi,T=bi),Qe)switch(k){case Zi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case dl:n.blendFunc(n.ONE,n.ONE);break;case fl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case hl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Je("WebGLState: Invalid blending: ",k);break}else switch(k){case Zi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case dl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case fl:Je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case hl:Je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Je("WebGLState: Invalid blending: ",k);break}A=null,x=null,E=null,C=null,S.set(0,0,0),b=0,m=k,I=Qe}return}Me=Me||me,le=le||ae,De=De||ge,(me!==M||Me!==T)&&(n.blendEquationSeparate(Oe[me],Oe[Me]),M=me,T=Me),(ae!==A||ge!==x||le!==E||De!==C)&&(n.blendFuncSeparate(Ne[ae],Ne[ge],Ne[le],Ne[De]),A=ae,x=ge,E=le,C=De),(Re.equals(S)===!1||st!==b)&&(n.blendColor(Re.r,Re.g,Re.b,st),S.copy(Re),b=st),m=k,I=!1}function Xe(k,me){k.side===un?se(n.CULL_FACE):Y(n.CULL_FACE);let ae=k.side===Bt;me&&(ae=!ae),Ie(ae),k.blending===Zi&&k.transparent===!1?Fe(Tn):Fe(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),s.setMask(k.colorWrite);const ge=k.stencilWrite;o.setTest(ge),ge&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Ct(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?Y(n.SAMPLE_ALPHA_TO_COVERAGE):se(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ie(k){R!==k&&(k?n.frontFace(n.CW):n.frontFace(n.CCW),R=k)}function tt(k){k!==xd?(Y(n.CULL_FACE),k!==L&&(k===ul?n.cullFace(n.BACK):k===Sd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):se(n.CULL_FACE),L=k}function pt(k){k!==D&&(J&&n.lineWidth(k),D=k)}function Ct(k,me,ae){k?(Y(n.POLYGON_OFFSET_FILL),(N!==me||H!==ae)&&(N=me,H=ae,a.getReversed()&&(me=-me),n.polygonOffset(me,ae))):se(n.POLYGON_OFFSET_FILL)}function ot(k){k?Y(n.SCISSOR_TEST):se(n.SCISSOR_TEST)}function ft(k){k===void 0&&(k=n.TEXTURE0+Z-1),te!==k&&(n.activeTexture(k),te=k)}function z(k,me,ae){ae===void 0&&(te===null?ae=n.TEXTURE0+Z-1:ae=te);let ge=Q[ae];ge===void 0&&(ge={type:void 0,texture:void 0},Q[ae]=ge),(ge.type!==k||ge.texture!==me)&&(te!==ae&&(n.activeTexture(ae),te=ae),n.bindTexture(k,me||G[k]),ge.type=k,ge.texture=me)}function Mt(){const k=Q[te];k!==void 0&&k.type!==void 0&&(n.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function Ke(){try{n.compressedTexImage2D(...arguments)}catch(k){Je("WebGLState:",k)}}function w(){try{n.compressedTexImage3D(...arguments)}catch(k){Je("WebGLState:",k)}}function _(){try{n.texSubImage2D(...arguments)}catch(k){Je("WebGLState:",k)}}function W(){try{n.texSubImage3D(...arguments)}catch(k){Je("WebGLState:",k)}}function j(){try{n.compressedTexSubImage2D(...arguments)}catch(k){Je("WebGLState:",k)}}function re(){try{n.compressedTexSubImage3D(...arguments)}catch(k){Je("WebGLState:",k)}}function P(){try{n.texStorage2D(...arguments)}catch(k){Je("WebGLState:",k)}}function F(){try{n.texStorage3D(...arguments)}catch(k){Je("WebGLState:",k)}}function O(){try{n.texImage2D(...arguments)}catch(k){Je("WebGLState:",k)}}function V(){try{n.texImage3D(...arguments)}catch(k){Je("WebGLState:",k)}}function oe(k){return h[k]!==void 0?h[k]:n.getParameter(k)}function Te(k,me){h[k]!==me&&(n.pixelStorei(k,me),h[k]=me)}function pe(k){Ce.equals(k)===!1&&(n.scissor(k.x,k.y,k.z,k.w),Ce.copy(k))}function ue(k){_e.equals(k)===!1&&(n.viewport(k.x,k.y,k.z,k.w),_e.copy(k))}function ye(k,me){let ae=c.get(me);ae===void 0&&(ae=new WeakMap,c.set(me,ae));let ge=ae.get(k);ge===void 0&&(ge=n.getUniformBlockIndex(me,k.name),ae.set(k,ge))}function Ue(k,me){const ge=c.get(me).get(k);l.get(me)!==ge&&(n.uniformBlockBinding(me,ge,k.__bindingPointIndex),l.set(me,ge))}function ke(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),f={},h={},te=null,Q={},d={},u=new WeakMap,g=[],v=null,p=!1,m=null,M=null,A=null,x=null,T=null,E=null,C=null,S=new He(0,0,0),b=0,I=!1,R=null,L=null,D=null,N=null,H=null,Ce.set(0,0,n.canvas.width,n.canvas.height),_e.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:Y,disable:se,bindFramebuffer:he,drawBuffers:ce,useProgram:de,setBlending:Fe,setMaterial:Xe,setFlipSided:Ie,setCullFace:tt,setLineWidth:pt,setPolygonOffset:Ct,setScissorTest:ot,activeTexture:ft,bindTexture:z,unbindTexture:Mt,compressedTexImage2D:Ke,compressedTexImage3D:w,texImage2D:O,texImage3D:V,pixelStorei:Te,getParameter:oe,updateUBOMapping:ye,uniformBlockBinding:Ue,texStorage2D:P,texStorage3D:F,texSubImage2D:_,texSubImage3D:W,compressedTexSubImage2D:j,compressedTexSubImage3D:re,scissor:pe,viewport:ue,reset:ke}}function rv(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Pe,f=new WeakMap,h=new Set;let d;const u=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(w,_){return g?new OffscreenCanvas(w,_):sr("canvas")}function p(w,_,W){let j=1;const re=Ke(w);if((re.width>W||re.height>W)&&(j=W/Math.max(re.width,re.height)),j<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const P=Math.floor(j*re.width),F=Math.floor(j*re.height);d===void 0&&(d=v(P,F));const O=_?v(P,F):d;return O.width=P,O.height=F,O.getContext("2d").drawImage(w,0,0,P,F),Be("WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+P+"x"+F+")."),O}else return"data"in w&&Be("WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),w;return w}function m(w){return w.generateMipmaps}function M(w){n.generateMipmap(w)}function A(w){return w.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?n.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function x(w,_,W,j,re,P=!1){if(w!==null){if(n[w]!==void 0)return n[w];Be("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let F;j&&(F=e.get("EXT_texture_norm16"),F||Be("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let O=_;if(_===n.RED&&(W===n.FLOAT&&(O=n.R32F),W===n.HALF_FLOAT&&(O=n.R16F),W===n.UNSIGNED_BYTE&&(O=n.R8),W===n.UNSIGNED_SHORT&&F&&(O=F.R16_EXT),W===n.SHORT&&F&&(O=F.R16_SNORM_EXT)),_===n.RED_INTEGER&&(W===n.UNSIGNED_BYTE&&(O=n.R8UI),W===n.UNSIGNED_SHORT&&(O=n.R16UI),W===n.UNSIGNED_INT&&(O=n.R32UI),W===n.BYTE&&(O=n.R8I),W===n.SHORT&&(O=n.R16I),W===n.INT&&(O=n.R32I)),_===n.RG&&(W===n.FLOAT&&(O=n.RG32F),W===n.HALF_FLOAT&&(O=n.RG16F),W===n.UNSIGNED_BYTE&&(O=n.RG8),W===n.UNSIGNED_SHORT&&F&&(O=F.RG16_EXT),W===n.SHORT&&F&&(O=F.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(W===n.UNSIGNED_BYTE&&(O=n.RG8UI),W===n.UNSIGNED_SHORT&&(O=n.RG16UI),W===n.UNSIGNED_INT&&(O=n.RG32UI),W===n.BYTE&&(O=n.RG8I),W===n.SHORT&&(O=n.RG16I),W===n.INT&&(O=n.RG32I)),_===n.RGB_INTEGER&&(W===n.UNSIGNED_BYTE&&(O=n.RGB8UI),W===n.UNSIGNED_SHORT&&(O=n.RGB16UI),W===n.UNSIGNED_INT&&(O=n.RGB32UI),W===n.BYTE&&(O=n.RGB8I),W===n.SHORT&&(O=n.RGB16I),W===n.INT&&(O=n.RGB32I)),_===n.RGBA_INTEGER&&(W===n.UNSIGNED_BYTE&&(O=n.RGBA8UI),W===n.UNSIGNED_SHORT&&(O=n.RGBA16UI),W===n.UNSIGNED_INT&&(O=n.RGBA32UI),W===n.BYTE&&(O=n.RGBA8I),W===n.SHORT&&(O=n.RGBA16I),W===n.INT&&(O=n.RGBA32I)),_===n.RGB&&(W===n.UNSIGNED_SHORT&&F&&(O=F.RGB16_EXT),W===n.SHORT&&F&&(O=F.RGB16_SNORM_EXT),W===n.UNSIGNED_INT_5_9_9_9_REV&&(O=n.RGB9_E5),W===n.UNSIGNED_INT_10F_11F_11F_REV&&(O=n.R11F_G11F_B10F)),_===n.RGBA){const V=P?ps:$e.getTransfer(re);W===n.FLOAT&&(O=n.RGBA32F),W===n.HALF_FLOAT&&(O=n.RGBA16F),W===n.UNSIGNED_BYTE&&(O=V===et?n.SRGB8_ALPHA8:n.RGBA8),W===n.UNSIGNED_SHORT&&F&&(O=F.RGBA16_EXT),W===n.SHORT&&F&&(O=F.RGBA16_SNORM_EXT),W===n.UNSIGNED_SHORT_4_4_4_4&&(O=n.RGBA4),W===n.UNSIGNED_SHORT_5_5_5_1&&(O=n.RGB5_A1)}return(O===n.R16F||O===n.R32F||O===n.RG16F||O===n.RG32F||O===n.RGBA16F||O===n.RGBA32F)&&e.get("EXT_color_buffer_float"),O}function T(w,_){let W;return w?_===null||_===hn||_===rr?W=n.DEPTH24_STENCIL8:_===dn?W=n.DEPTH32F_STENCIL8:_===ir&&(W=n.DEPTH24_STENCIL8,Be("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===hn||_===rr?W=n.DEPTH_COMPONENT24:_===dn?W=n.DEPTH_COMPONENT32F:_===ir&&(W=n.DEPTH_COMPONENT16),W}function E(w,_){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==wt&&w.minFilter!==Dt?Math.log2(Math.max(_.width,_.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?_.mipmaps.length:1}function C(w){const _=w.target;_.removeEventListener("dispose",C),b(_),_.isVideoTexture&&f.delete(_),_.isHTMLTexture&&h.delete(_)}function S(w){const _=w.target;_.removeEventListener("dispose",S),R(_)}function b(w){const _=i.get(w);if(_.__webglInit===void 0)return;const W=w.source,j=u.get(W);if(j){const re=j[_.__cacheKey];re.usedTimes--,re.usedTimes===0&&I(w),Object.keys(j).length===0&&u.delete(W)}i.remove(w)}function I(w){const _=i.get(w);n.deleteTexture(_.__webglTexture);const W=w.source,j=u.get(W);delete j[_.__cacheKey],a.memory.textures--}function R(w){const _=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(_.__webglFramebuffer[j]))for(let re=0;re<_.__webglFramebuffer[j].length;re++)n.deleteFramebuffer(_.__webglFramebuffer[j][re]);else n.deleteFramebuffer(_.__webglFramebuffer[j]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[j])}else{if(Array.isArray(_.__webglFramebuffer))for(let j=0;j<_.__webglFramebuffer.length;j++)n.deleteFramebuffer(_.__webglFramebuffer[j]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let j=0;j<_.__webglColorRenderbuffer.length;j++)_.__webglColorRenderbuffer[j]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[j]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const W=w.textures;for(let j=0,re=W.length;j<re;j++){const P=i.get(W[j]);P.__webglTexture&&(n.deleteTexture(P.__webglTexture),a.memory.textures--),i.remove(W[j])}i.remove(w)}let L=0;function D(){L=0}function N(){return L}function H(w){L=w}function Z(){const w=L;return w>=r.maxTextures&&Be("WebGLTextures: Trying to use "+(w+1)+" texture units while this GPU supports only "+r.maxTextures),L+=1,w}function J(w){const _=[];return _.push(w.wrapS),_.push(w.wrapT),_.push(w.wrapR||0),_.push(w.magFilter),_.push(w.minFilter),_.push(w.anisotropy),_.push(w.internalFormat),_.push(w.format),_.push(w.type),_.push(w.generateMipmaps),_.push(w.premultiplyAlpha),_.push(w.flipY),_.push(w.unpackAlignment),_.push(w.colorSpace),_.join()}function U(w,_){const W=i.get(w);if(w.isVideoTexture&&z(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&W.__version!==w.version){const j=w.image;if(j===null)Be("WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)Be("WebGLRenderer: Texture marked for update but image is incomplete");else{se(W,w,_);return}}else w.isExternalTexture&&(W.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,W.__webglTexture,n.TEXTURE0+_)}function X(w,_){const W=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&W.__version!==w.version){se(W,w,_);return}else w.isExternalTexture&&(W.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,W.__webglTexture,n.TEXTURE0+_)}function te(w,_){const W=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&W.__version!==w.version){se(W,w,_);return}t.bindTexture(n.TEXTURE_3D,W.__webglTexture,n.TEXTURE0+_)}function Q(w,_){const W=i.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&W.__version!==w.version){he(W,w,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture,n.TEXTURE0+_)}const ee={[wa]:n.REPEAT,[En]:n.CLAMP_TO_EDGE,[Ca]:n.MIRRORED_REPEAT},ie={[wt]:n.NEAREST,[Vd]:n.NEAREST_MIPMAP_NEAREST,[yr]:n.NEAREST_MIPMAP_LINEAR,[Dt]:n.LINEAR,[Ds]:n.LINEAR_MIPMAP_NEAREST,[Yn]:n.LINEAR_MIPMAP_LINEAR},Ce={[qd]:n.NEVER,[Jd]:n.ALWAYS,[Yd]:n.LESS,[Lo]:n.LEQUAL,[$d]:n.EQUAL,[Po]:n.GEQUAL,[Kd]:n.GREATER,[Zd]:n.NOTEQUAL};function _e(w,_){if(_.type===dn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Dt||_.magFilter===Ds||_.magFilter===yr||_.magFilter===Yn||_.minFilter===Dt||_.minFilter===Ds||_.minFilter===yr||_.minFilter===Yn)&&Be("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(w,n.TEXTURE_WRAP_S,ee[_.wrapS]),n.texParameteri(w,n.TEXTURE_WRAP_T,ee[_.wrapT]),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,ee[_.wrapR]),n.texParameteri(w,n.TEXTURE_MAG_FILTER,ie[_.magFilter]),n.texParameteri(w,n.TEXTURE_MIN_FILTER,ie[_.minFilter]),_.compareFunction&&(n.texParameteri(w,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(w,n.TEXTURE_COMPARE_FUNC,Ce[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===wt||_.minFilter!==yr&&_.minFilter!==Yn||_.type===dn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");n.texParameterf(w,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function fe(w,_){let W=!1;w.__webglInit===void 0&&(w.__webglInit=!0,_.addEventListener("dispose",C));const j=_.source;let re=u.get(j);re===void 0&&(re={},u.set(j,re));const P=J(_);if(P!==w.__cacheKey){re[P]===void 0&&(re[P]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,W=!0),re[P].usedTimes++;const F=re[w.__cacheKey];F!==void 0&&(re[w.__cacheKey].usedTimes--,F.usedTimes===0&&I(_)),w.__cacheKey=P,w.__webglTexture=re[P].texture}return W}function G(w,_,W){return Math.floor(Math.floor(w/W)/_)}function Y(w,_,W,j){const P=w.updateRanges;if(P.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,W,j,_.data);else{P.sort((Te,pe)=>Te.start-pe.start);let F=0;for(let Te=1;Te<P.length;Te++){const pe=P[F],ue=P[Te],ye=pe.start+pe.count,Ue=G(ue.start,_.width,4),ke=G(pe.start,_.width,4);ue.start<=ye+1&&Ue===ke&&G(ue.start+ue.count-1,_.width,4)===Ue?pe.count=Math.max(pe.count,ue.start+ue.count-pe.start):(++F,P[F]=ue)}P.length=F+1;const O=t.getParameter(n.UNPACK_ROW_LENGTH),V=t.getParameter(n.UNPACK_SKIP_PIXELS),oe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let Te=0,pe=P.length;Te<pe;Te++){const ue=P[Te],ye=Math.floor(ue.start/4),Ue=Math.ceil(ue.count/4),ke=ye%_.width,k=Math.floor(ye/_.width),me=Ue,ae=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,ke),t.pixelStorei(n.UNPACK_SKIP_ROWS,k),t.texSubImage2D(n.TEXTURE_2D,0,ke,k,me,ae,W,j,_.data)}w.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,O),t.pixelStorei(n.UNPACK_SKIP_PIXELS,V),t.pixelStorei(n.UNPACK_SKIP_ROWS,oe)}}function se(w,_,W){let j=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(j=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(j=n.TEXTURE_3D);const re=fe(w,_),P=_.source;t.bindTexture(j,w.__webglTexture,n.TEXTURE0+W);const F=i.get(P);if(P.version!==F.__version||re===!0){if(t.activeTexture(n.TEXTURE0+W),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const ae=$e.getPrimaries($e.workingColorSpace),ge=_.colorSpace===zn?null:$e.getPrimaries(_.colorSpace),Me=_.colorSpace===zn||ae===ge?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let V=p(_.image,!1,r.maxTextureSize);V=Mt(_,V);const oe=s.convert(_.format,_.colorSpace),Te=s.convert(_.type);let pe=x(_.internalFormat,oe,Te,_.normalized,_.colorSpace,_.isVideoTexture);_e(j,_);let ue;const ye=_.mipmaps,Ue=_.isVideoTexture!==!0,ke=F.__version===void 0||re===!0,k=P.dataReady,me=E(_,V);if(_.isDepthTexture)pe=T(_.format===$n,_.type),ke&&(Ue?t.texStorage2D(n.TEXTURE_2D,1,pe,V.width,V.height):t.texImage2D(n.TEXTURE_2D,0,pe,V.width,V.height,0,oe,Te,null));else if(_.isDataTexture)if(ye.length>0){Ue&&ke&&t.texStorage2D(n.TEXTURE_2D,me,pe,ye[0].width,ye[0].height);for(let ae=0,ge=ye.length;ae<ge;ae++)ue=ye[ae],Ue?k&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,ue.width,ue.height,oe,Te,ue.data):t.texImage2D(n.TEXTURE_2D,ae,pe,ue.width,ue.height,0,oe,Te,ue.data);_.generateMipmaps=!1}else Ue?(ke&&t.texStorage2D(n.TEXTURE_2D,me,pe,V.width,V.height),k&&Y(_,V,oe,Te)):t.texImage2D(n.TEXTURE_2D,0,pe,V.width,V.height,0,oe,Te,V.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ue&&ke&&t.texStorage3D(n.TEXTURE_2D_ARRAY,me,pe,ye[0].width,ye[0].height,V.depth);for(let ae=0,ge=ye.length;ae<ge;ae++)if(ue=ye[ae],_.format!==jt)if(oe!==null)if(Ue){if(k)if(_.layerUpdates.size>0){const Me=Xl(ue.width,ue.height,_.format,_.type);for(const le of _.layerUpdates){const De=ue.data.subarray(le*Me/ue.data.BYTES_PER_ELEMENT,(le+1)*Me/ue.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,le,ue.width,ue.height,1,oe,De)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,ue.width,ue.height,V.depth,oe,ue.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ae,pe,ue.width,ue.height,V.depth,0,ue.data,0,0);else Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ue?k&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,ue.width,ue.height,V.depth,oe,Te,ue.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ae,pe,ue.width,ue.height,V.depth,0,oe,Te,ue.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Ue&&ke&&t.texStorage2D(n.TEXTURE_2D,me,pe,ye[0].width,ye[0].height);for(let ae=0,ge=ye.length;ae<ge;ae++)ue=ye[ae],_.format!==jt?oe!==null?Ue?k&&t.compressedTexSubImage2D(n.TEXTURE_2D,ae,0,0,ue.width,ue.height,oe,ue.data):t.compressedTexImage2D(n.TEXTURE_2D,ae,pe,ue.width,ue.height,0,ue.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ue?k&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,ue.width,ue.height,oe,Te,ue.data):t.texImage2D(n.TEXTURE_2D,ae,pe,ue.width,ue.height,0,oe,Te,ue.data)}else if(_.isDataArrayTexture)if(Ue){if(ke&&t.texStorage3D(n.TEXTURE_2D_ARRAY,me,pe,V.width,V.height,V.depth),k)if(_.layerUpdates.size>0){const ae=Xl(V.width,V.height,_.format,_.type);for(const ge of _.layerUpdates){const Me=V.data.subarray(ge*ae/V.data.BYTES_PER_ELEMENT,(ge+1)*ae/V.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ge,V.width,V.height,1,oe,Te,Me)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,V.width,V.height,V.depth,oe,Te,V.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,pe,V.width,V.height,V.depth,0,oe,Te,V.data);else if(_.isData3DTexture)Ue?(ke&&t.texStorage3D(n.TEXTURE_3D,me,pe,V.width,V.height,V.depth),k&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,V.width,V.height,V.depth,oe,Te,V.data)):t.texImage3D(n.TEXTURE_3D,0,pe,V.width,V.height,V.depth,0,oe,Te,V.data);else if(_.isFramebufferTexture){if(ke)if(Ue)t.texStorage2D(n.TEXTURE_2D,me,pe,V.width,V.height);else{let ae=V.width,ge=V.height;for(let Me=0;Me<me;Me++)t.texImage2D(n.TEXTURE_2D,Me,pe,ae,ge,0,oe,Te,null),ae>>=1,ge>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){const ae=n.canvas;if(ae.hasAttribute("layoutsubtree")||ae.setAttribute("layoutsubtree","true"),V.parentNode!==ae){ae.appendChild(V),h.add(_),ae.onpaint=ge=>{const Me=ge.changedElements;for(const le of h)Me.includes(le.image)&&(le.needsUpdate=!0)},ae.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,V);else{const Me=n.RGBA,le=n.RGBA,De=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Me,le,De,V)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(ye.length>0){if(Ue&&ke){const ae=Ke(ye[0]);t.texStorage2D(n.TEXTURE_2D,me,pe,ae.width,ae.height)}for(let ae=0,ge=ye.length;ae<ge;ae++)ue=ye[ae],Ue?k&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,oe,Te,ue):t.texImage2D(n.TEXTURE_2D,ae,pe,oe,Te,ue);_.generateMipmaps=!1}else if(Ue){if(ke){const ae=Ke(V);t.texStorage2D(n.TEXTURE_2D,me,pe,ae.width,ae.height)}k&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,oe,Te,V)}else t.texImage2D(n.TEXTURE_2D,0,pe,oe,Te,V);m(_)&&M(j),F.__version=P.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function he(w,_,W){if(_.image.length!==6)return;const j=fe(w,_),re=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+W);const P=i.get(re);if(re.version!==P.__version||j===!0){t.activeTexture(n.TEXTURE0+W);const F=$e.getPrimaries($e.workingColorSpace),O=_.colorSpace===zn?null:$e.getPrimaries(_.colorSpace),V=_.colorSpace===zn||F===O?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,V);const oe=_.isCompressedTexture||_.image[0].isCompressedTexture,Te=_.image[0]&&_.image[0].isDataTexture,pe=[];for(let le=0;le<6;le++)!oe&&!Te?pe[le]=p(_.image[le],!0,r.maxCubemapSize):pe[le]=Te?_.image[le].image:_.image[le],pe[le]=Mt(_,pe[le]);const ue=pe[0],ye=s.convert(_.format,_.colorSpace),Ue=s.convert(_.type),ke=x(_.internalFormat,ye,Ue,_.normalized,_.colorSpace),k=_.isVideoTexture!==!0,me=P.__version===void 0||j===!0,ae=re.dataReady;let ge=E(_,ue);_e(n.TEXTURE_CUBE_MAP,_);let Me;if(oe){k&&me&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ge,ke,ue.width,ue.height);for(let le=0;le<6;le++){Me=pe[le].mipmaps;for(let De=0;De<Me.length;De++){const Re=Me[De];_.format!==jt?ye!==null?k?ae&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,De,0,0,Re.width,Re.height,ye,Re.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,De,ke,Re.width,Re.height,0,Re.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,De,0,0,Re.width,Re.height,ye,Ue,Re.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,De,ke,Re.width,Re.height,0,ye,Ue,Re.data)}}}else{if(Me=_.mipmaps,k&&me){Me.length>0&&ge++;const le=Ke(pe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ge,ke,le.width,le.height)}for(let le=0;le<6;le++)if(Te){k?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,pe[le].width,pe[le].height,ye,Ue,pe[le].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,ke,pe[le].width,pe[le].height,0,ye,Ue,pe[le].data);for(let De=0;De<Me.length;De++){const st=Me[De].image[le].image;k?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,De+1,0,0,st.width,st.height,ye,Ue,st.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,De+1,ke,st.width,st.height,0,ye,Ue,st.data)}}else{k?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,ye,Ue,pe[le]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,ke,ye,Ue,pe[le]);for(let De=0;De<Me.length;De++){const Re=Me[De];k?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,De+1,0,0,ye,Ue,Re.image[le]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,De+1,ke,ye,Ue,Re.image[le])}}}m(_)&&M(n.TEXTURE_CUBE_MAP),P.__version=re.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function ce(w,_,W,j,re,P){const F=s.convert(W.format,W.colorSpace),O=s.convert(W.type),V=x(W.internalFormat,F,O,W.normalized,W.colorSpace),oe=i.get(_),Te=i.get(W);if(Te.__renderTarget=_,!oe.__hasExternalTextures){const pe=Math.max(1,_.width>>P),ue=Math.max(1,_.height>>P);re===n.TEXTURE_3D||re===n.TEXTURE_2D_ARRAY?t.texImage3D(re,P,V,pe,ue,_.depth,0,F,O,null):t.texImage2D(re,P,V,pe,ue,0,F,O,null)}t.bindFramebuffer(n.FRAMEBUFFER,w),ft(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,re,Te.__webglTexture,0,ot(_)):(re===n.TEXTURE_2D||re>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,j,re,Te.__webglTexture,P),t.bindFramebuffer(n.FRAMEBUFFER,null)}function de(w,_,W){if(n.bindRenderbuffer(n.RENDERBUFFER,w),_.depthBuffer){const j=_.depthTexture,re=j&&j.isDepthTexture?j.type:null,P=T(_.stencilBuffer,re),F=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;ft(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ot(_),P,_.width,_.height):W?n.renderbufferStorageMultisample(n.RENDERBUFFER,ot(_),P,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,P,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,F,n.RENDERBUFFER,w)}else{const j=_.textures;for(let re=0;re<j.length;re++){const P=j[re],F=s.convert(P.format,P.colorSpace),O=s.convert(P.type),V=x(P.internalFormat,F,O,P.normalized,P.colorSpace);ft(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ot(_),V,_.width,_.height):W?n.renderbufferStorageMultisample(n.RENDERBUFFER,ot(_),V,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,V,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Oe(w,_,W){const j=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,w),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const re=i.get(_.depthTexture);if(re.__renderTarget=_,(!re.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),j){if(re.__webglInit===void 0&&(re.__webglInit=!0,_.depthTexture.addEventListener("dispose",C)),re.__webglTexture===void 0){re.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,re.__webglTexture),_e(n.TEXTURE_CUBE_MAP,_.depthTexture);const oe=s.convert(_.depthTexture.format),Te=s.convert(_.depthTexture.type);let pe;_.depthTexture.format===Cn?pe=n.DEPTH_COMPONENT24:_.depthTexture.format===$n&&(pe=n.DEPTH24_STENCIL8);for(let ue=0;ue<6;ue++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,pe,_.width,_.height,0,oe,Te,null)}}else U(_.depthTexture,0);const P=re.__webglTexture,F=ot(_),O=j?n.TEXTURE_CUBE_MAP_POSITIVE_X+W:n.TEXTURE_2D,V=_.depthTexture.format===$n?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===Cn)ft(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,O,P,0,F):n.framebufferTexture2D(n.FRAMEBUFFER,V,O,P,0);else if(_.depthTexture.format===$n)ft(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,O,P,0,F):n.framebufferTexture2D(n.FRAMEBUFFER,V,O,P,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ne(w){const _=i.get(w),W=w.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==w.depthTexture){const j=w.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),j){const re=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,j.removeEventListener("dispose",re)};j.addEventListener("dispose",re),_.__depthDisposeCallback=re}_.__boundDepthTexture=j}if(w.depthTexture&&!_.__autoAllocateDepthBuffer)if(W)for(let j=0;j<6;j++)Oe(_.__webglFramebuffer[j],w,j);else{const j=w.texture.mipmaps;j&&j.length>0?Oe(_.__webglFramebuffer[0],w,0):Oe(_.__webglFramebuffer,w,0)}else if(W){_.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[j]),_.__webglDepthbuffer[j]===void 0)_.__webglDepthbuffer[j]=n.createRenderbuffer(),de(_.__webglDepthbuffer[j],w,!1);else{const re=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,P=_.__webglDepthbuffer[j];n.bindRenderbuffer(n.RENDERBUFFER,P),n.framebufferRenderbuffer(n.FRAMEBUFFER,re,n.RENDERBUFFER,P)}}else{const j=w.texture.mipmaps;if(j&&j.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),de(_.__webglDepthbuffer,w,!1);else{const re=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,P=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,P),n.framebufferRenderbuffer(n.FRAMEBUFFER,re,n.RENDERBUFFER,P)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Fe(w,_,W){const j=i.get(w);_!==void 0&&ce(j.__webglFramebuffer,w,w.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),W!==void 0&&Ne(w)}function Xe(w){const _=w.texture,W=i.get(w),j=i.get(_);w.addEventListener("dispose",S);const re=w.textures,P=w.isWebGLCubeRenderTarget===!0,F=re.length>1;if(F||(j.__webglTexture===void 0&&(j.__webglTexture=n.createTexture()),j.__version=_.version,a.memory.textures++),P){W.__webglFramebuffer=[];for(let O=0;O<6;O++)if(_.mipmaps&&_.mipmaps.length>0){W.__webglFramebuffer[O]=[];for(let V=0;V<_.mipmaps.length;V++)W.__webglFramebuffer[O][V]=n.createFramebuffer()}else W.__webglFramebuffer[O]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){W.__webglFramebuffer=[];for(let O=0;O<_.mipmaps.length;O++)W.__webglFramebuffer[O]=n.createFramebuffer()}else W.__webglFramebuffer=n.createFramebuffer();if(F)for(let O=0,V=re.length;O<V;O++){const oe=i.get(re[O]);oe.__webglTexture===void 0&&(oe.__webglTexture=n.createTexture(),a.memory.textures++)}if(w.samples>0&&ft(w)===!1){W.__webglMultisampledFramebuffer=n.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let O=0;O<re.length;O++){const V=re[O];W.__webglColorRenderbuffer[O]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,W.__webglColorRenderbuffer[O]);const oe=s.convert(V.format,V.colorSpace),Te=s.convert(V.type),pe=x(V.internalFormat,oe,Te,V.normalized,V.colorSpace,w.isXRRenderTarget===!0),ue=ot(w);n.renderbufferStorageMultisample(n.RENDERBUFFER,ue,pe,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+O,n.RENDERBUFFER,W.__webglColorRenderbuffer[O])}n.bindRenderbuffer(n.RENDERBUFFER,null),w.depthBuffer&&(W.__webglDepthRenderbuffer=n.createRenderbuffer(),de(W.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(P){t.bindTexture(n.TEXTURE_CUBE_MAP,j.__webglTexture),_e(n.TEXTURE_CUBE_MAP,_);for(let O=0;O<6;O++)if(_.mipmaps&&_.mipmaps.length>0)for(let V=0;V<_.mipmaps.length;V++)ce(W.__webglFramebuffer[O][V],w,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+O,V);else ce(W.__webglFramebuffer[O],w,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+O,0);m(_)&&M(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(F){for(let O=0,V=re.length;O<V;O++){const oe=re[O],Te=i.get(oe);let pe=n.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(pe=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(pe,Te.__webglTexture),_e(pe,oe),ce(W.__webglFramebuffer,w,oe,n.COLOR_ATTACHMENT0+O,pe,0),m(oe)&&M(pe)}t.unbindTexture()}else{let O=n.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(O=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(O,j.__webglTexture),_e(O,_),_.mipmaps&&_.mipmaps.length>0)for(let V=0;V<_.mipmaps.length;V++)ce(W.__webglFramebuffer[V],w,_,n.COLOR_ATTACHMENT0,O,V);else ce(W.__webglFramebuffer,w,_,n.COLOR_ATTACHMENT0,O,0);m(_)&&M(O),t.unbindTexture()}w.depthBuffer&&Ne(w)}function Ie(w){const _=w.textures;for(let W=0,j=_.length;W<j;W++){const re=_[W];if(m(re)){const P=A(w),F=i.get(re).__webglTexture;t.bindTexture(P,F),M(P),t.unbindTexture()}}}const tt=[],pt=[];function Ct(w){if(w.samples>0){if(ft(w)===!1){const _=w.textures,W=w.width,j=w.height;let re=n.COLOR_BUFFER_BIT;const P=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,F=i.get(w),O=_.length>1;if(O)for(let oe=0;oe<_.length;oe++)t.bindFramebuffer(n.FRAMEBUFFER,F.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,F.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,F.__webglMultisampledFramebuffer);const V=w.texture.mipmaps;V&&V.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,F.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,F.__webglFramebuffer);for(let oe=0;oe<_.length;oe++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(re|=n.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(re|=n.STENCIL_BUFFER_BIT)),O){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,F.__webglColorRenderbuffer[oe]);const Te=i.get(_[oe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Te,0)}n.blitFramebuffer(0,0,W,j,0,0,W,j,re,n.NEAREST),l===!0&&(tt.length=0,pt.length=0,tt.push(n.COLOR_ATTACHMENT0+oe),w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&(tt.push(P),pt.push(P),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,pt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,tt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),O)for(let oe=0;oe<_.length;oe++){t.bindFramebuffer(n.FRAMEBUFFER,F.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,F.__webglColorRenderbuffer[oe]);const Te=i.get(_[oe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,F.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.TEXTURE_2D,Te,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,F.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&l){const _=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function ot(w){return Math.min(r.maxSamples,w.samples)}function ft(w){const _=i.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function z(w){const _=a.render.frame;f.get(w)!==_&&(f.set(w,_),w.update())}function Mt(w,_){const W=w.colorSpace,j=w.format,re=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||W!==hs&&W!==zn&&($e.getTransfer(W)===et?(j!==jt||re!==qt)&&Be("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Je("WebGLTextures: Unsupported texture color space:",W)),_}function Ke(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=Z,this.resetTextureUnits=D,this.getTextureUnits=N,this.setTextureUnits=H,this.setTexture2D=U,this.setTexture2DArray=X,this.setTexture3D=te,this.setTextureCube=Q,this.rebindTextures=Fe,this.setupRenderTarget=Xe,this.updateRenderTargetMipmap=Ie,this.updateMultisampleRenderTarget=Ct,this.setupDepthRenderbuffer=Ne,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=ft,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function sv(n,e){function t(i,r=zn){let s;const a=$e.getTransfer(r);if(i===qt)return n.UNSIGNED_BYTE;if(i===To)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ao)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Xc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===qc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Gc)return n.BYTE;if(i===Wc)return n.SHORT;if(i===ir)return n.UNSIGNED_SHORT;if(i===bo)return n.INT;if(i===hn)return n.UNSIGNED_INT;if(i===dn)return n.FLOAT;if(i===pn)return n.HALF_FLOAT;if(i===Yc)return n.ALPHA;if(i===$c)return n.RGB;if(i===jt)return n.RGBA;if(i===Cn)return n.DEPTH_COMPONENT;if(i===$n)return n.DEPTH_STENCIL;if(i===Kc)return n.RED;if(i===wo)return n.RED_INTEGER;if(i===ti)return n.RG;if(i===Co)return n.RG_INTEGER;if(i===Ro)return n.RGBA_INTEGER;if(i===ts||i===ns||i===is||i===rs)if(a===et)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===ts)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ns)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===is)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===rs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===ts)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ns)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===is)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===rs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ra||i===La||i===Pa||i===Ia)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Ra)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===La)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Pa)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ia)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Da||i===Na||i===Ua||i===Oa||i===Fa||i===ds||i===Ba)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Da||i===Na)return a===et?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Ua)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Oa)return s.COMPRESSED_R11_EAC;if(i===Fa)return s.COMPRESSED_SIGNED_R11_EAC;if(i===ds)return s.COMPRESSED_RG11_EAC;if(i===Ba)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ka||i===za||i===Ha||i===Va||i===Ga||i===Wa||i===Xa||i===qa||i===Ya||i===$a||i===Ka||i===Za||i===Ja||i===Qa)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===ka)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===za)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ha)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Va)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ga)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Wa)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Xa)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===qa)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ya)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===$a)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ka)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Za)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ja)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Qa)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ja||i===eo||i===to)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===ja)return a===et?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===eo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===to)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===no||i===io||i===fs||i===ro)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===no)return s.COMPRESSED_RED_RGTC1_EXT;if(i===io)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===fs)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ro)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===rr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const av=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ov=`
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

}`;class lv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new ru(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new gn({vertexShader:av,fragmentShader:ov,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new mn(new Ss(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class cv extends ri{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,f=null,h=null,d=null,u=null,g=null;const v=typeof XRWebGLBinding<"u",p=new lv,m={},M=t.getContextAttributes();let A=null,x=null;const T=[],E=[],C=new Pe;let S=null,b=null;const I=new Jt;I.viewport=new ht;const R=new Jt;R.viewport=new ht;const L=[I,R],D=new vh;let N=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let Y=T[G];return Y===void 0&&(Y=new Vs,T[G]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(G){let Y=T[G];return Y===void 0&&(Y=new Vs,T[G]=Y),Y.getGripSpace()},this.getHand=function(G){let Y=T[G];return Y===void 0&&(Y=new Vs,T[G]=Y),Y.getHandSpace()};function Z(G){const Y=E.indexOf(G.inputSource);if(Y===-1)return;const se=T[Y];se!==void 0&&(se.update(G.inputSource,G.frame,c||a),se.dispatchEvent({type:G.type,data:G.inputSource}))}function J(){r.removeEventListener("select",Z),r.removeEventListener("selectstart",Z),r.removeEventListener("selectend",Z),r.removeEventListener("squeeze",Z),r.removeEventListener("squeezestart",Z),r.removeEventListener("squeezeend",Z),r.removeEventListener("end",J),r.removeEventListener("inputsourceschange",U);for(let G=0;G<T.length;G++){const Y=E[G];Y!==null&&(E[G]=null,T[G].disconnect(Y))}N=null,H=null,p.reset();for(const G in m)delete m[G];if(e.setRenderTarget(A),u=null,d=null,h=null,r=null,x=null,fe.stop(),i.isPresenting=!1,e.setPixelRatio(S),e.setSize(C.width,C.height,!1),b!==null){const G=b.camera;G.fov=b.fov,G.zoom=b.zoom,G.updateProjectionMatrix(),b=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){s=G,i.isPresenting===!0&&Be("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){o=G,i.isPresenting===!0&&Be("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return d!==null?d:u},this.getBinding=function(){return h===null&&v&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(G){if(r=G,r!==null){if(A=e.getRenderTarget(),r.addEventListener("select",Z),r.addEventListener("selectstart",Z),r.addEventListener("selectend",Z),r.addEventListener("squeeze",Z),r.addEventListener("squeezestart",Z),r.addEventListener("squeezeend",Z),r.addEventListener("end",J),r.addEventListener("inputsourceschange",U),M.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(C),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let se=null,he=null,ce=null;M.depth&&(ce=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,se=M.stencil?$n:Cn,he=M.stencil?rr:hn);const de={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:s};h=this.getBinding(),d=h.createProjectionLayer(de),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new tn(d.textureWidth,d.textureHeight,{format:jt,type:qt,depthTexture:new ar(d.textureWidth,d.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{const se={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:s};u=new XRWebGLLayer(r,t,se),r.updateRenderState({baseLayer:u}),e.setPixelRatio(1),e.setSize(u.framebufferWidth,u.framebufferHeight,!1),x=new tn(u.framebufferWidth,u.framebufferHeight,{format:jt,type:qt,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),fe.setContext(r),fe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function U(G){for(let Y=0;Y<G.removed.length;Y++){const se=G.removed[Y],he=E.indexOf(se);he>=0&&(E[he]=null,T[he].disconnect(se))}for(let Y=0;Y<G.added.length;Y++){const se=G.added[Y];let he=E.indexOf(se);if(he===-1){for(let de=0;de<T.length;de++)if(de>=E.length){E.push(se),he=de;break}else if(E[de]===null){E[de]=se,he=de;break}if(he===-1)break}const ce=T[he];ce&&ce.connect(se)}}const X=new q,te=new q;function Q(G,Y,se){X.setFromMatrixPosition(Y.matrixWorld),te.setFromMatrixPosition(se.matrixWorld);const he=X.distanceTo(te),ce=Y.projectionMatrix.elements,de=se.projectionMatrix.elements,Oe=ce[14]/(ce[10]-1),Ne=ce[14]/(ce[10]+1),Fe=(ce[9]+1)/ce[5],Xe=(ce[9]-1)/ce[5],Ie=(ce[8]-1)/ce[0],tt=(de[8]+1)/de[0],pt=Oe*Ie,Ct=Oe*tt,ot=he/(-Ie+tt),ft=ot*-Ie;if(Y.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(ft),G.translateZ(ot),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert(),ce[10]===-1)G.projectionMatrix.copy(Y.projectionMatrix),G.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{const z=Oe+ot,Mt=Ne+ot,Ke=pt-ft,w=Ct+(he-ft),_=Fe*Ne/Mt*z,W=Xe*Ne/Mt*z;G.projectionMatrix.makePerspective(Ke,w,_,W,z,Mt),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}}function ee(G,Y){Y===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(Y.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(r===null)return;let Y=G.near,se=G.far;p.texture!==null&&(p.depthNear>0&&(Y=p.depthNear),p.depthFar>0&&(se=p.depthFar)),D.near=R.near=I.near=Y,D.far=R.far=I.far=se,(N!==D.near||H!==D.far)&&(r.updateRenderState({depthNear:D.near,depthFar:D.far}),N=D.near,H=D.far),D.layers.mask=G.layers.mask|6,I.layers.mask=D.layers.mask&-5,R.layers.mask=D.layers.mask&-3;const he=G.parent,ce=D.cameras;ee(D,he);for(let de=0;de<ce.length;de++)ee(ce[de],he);ce.length===2?Q(D,I,R):D.projectionMatrix.copy(I.projectionMatrix),b===null&&G.isPerspectiveCamera&&(b={camera:G,fov:G.fov,zoom:G.zoom}),ie(G,D,he)};function ie(G,Y,se){se===null?G.matrix.copy(Y.matrixWorld):(G.matrix.copy(se.matrixWorld),G.matrix.invert(),G.matrix.multiply(Y.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(Y.projectionMatrix),G.projectionMatrixInverse.copy(Y.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=so*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(d===null&&u===null))return l},this.setFoveation=function(G){l=G,d!==null&&(d.fixedFoveation=G),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=G)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(D)},this.getCameraTexture=function(G){return m[G]};let Ce=null;function _e(G,Y){if(f=Y.getViewerPose(c||a),g=Y,f!==null){const se=f.views;u!==null&&(e.setRenderTargetFramebuffer(x,u.framebuffer),e.setRenderTarget(x));let he=!1;se.length!==D.cameras.length&&(D.cameras.length=0,he=!0);for(let Ne=0;Ne<se.length;Ne++){const Fe=se[Ne];let Xe=null;if(u!==null)Xe=u.getViewport(Fe);else{const tt=h.getViewSubImage(d,Fe);Xe=tt.viewport,Ne===0&&(e.setRenderTargetTextures(x,tt.colorTexture,tt.depthStencilTexture),e.setRenderTarget(x))}let Ie=L[Ne];Ie===void 0&&(Ie=new Jt,Ie.layers.enable(Ne),Ie.viewport=new ht,L[Ne]=Ie),Ie.matrix.fromArray(Fe.transform.matrix),Ie.matrix.decompose(Ie.position,Ie.quaternion,Ie.scale),Ie.projectionMatrix.fromArray(Fe.projectionMatrix),Ie.projectionMatrixInverse.copy(Ie.projectionMatrix).invert(),Ie.viewport.set(Xe.x,Xe.y,Xe.width,Xe.height),Ne===0&&(D.matrix.copy(Ie.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),he===!0&&D.cameras.push(Ie)}const ce=r.enabledFeatures;if(ce&&ce.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){h=i.getBinding();const Ne=h.getDepthInformation(se[0]);Ne&&Ne.isValid&&Ne.texture&&p.init(Ne,r.renderState)}if(ce&&ce.includes("camera-access")&&v){e.state.unbindTexture(),h=i.getBinding();for(let Ne=0;Ne<se.length;Ne++){const Fe=se[Ne].camera;if(Fe){let Xe=m[Fe];Xe||(Xe=new ru,m[Fe]=Xe);const Ie=h.getCameraImage(Fe);Xe.sourceTexture=Ie}}}}for(let se=0;se<T.length;se++){const he=E[se],ce=T[se];he!==null&&ce!==void 0&&ce.update(he,Y,c||a)}Ce&&Ce(G,Y),Y.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Y}),g=null}const fe=new vu;fe.setAnimationLoop(_e),this.setAnimationLoop=function(G){Ce=G},this.dispose=function(){}}}const uv=new vt,bu=new ze;bu.set(-1,0,0,0,1,0,0,0,1);function dv(n,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,pu(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function r(p,m,M,A,x){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(p,m):m.isMeshLambertMaterial?(s(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(p,m),h(p,m)):m.isMeshPhongMaterial?(s(p,m),f(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(p,m),d(p,m),m.isMeshPhysicalMaterial&&u(p,m,x)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),v(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,M,A):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Bt&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Bt&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const M=e.get(m),A=M.envMap,x=M.envMapRotation;A&&(p.envMap.value=A,p.envMapRotation.value.setFromMatrix4(uv.makeRotationFromEuler(x)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(bu),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,M,A){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*M,p.scale.value=A*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function f(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function h(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function u(p,m,M){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Bt&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.retroreflectivity>0&&(p.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function v(p,m){const M=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function fv(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,T){const E=T.program;i.uniformBlockBinding(x,E)}function c(x,T){let E=r[x.id];E===void 0&&(p(x),E=f(x),r[x.id]=E,x.addEventListener("dispose",M));const C=T.program;i.updateUBOMapping(x,C);const S=e.render.frame;s[x.id]!==S&&(d(x),s[x.id]=S)}function f(x){const T=h();x.__bindingPointIndex=T;const E=n.createBuffer(),C=x.__size,S=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,C,S),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,E),E}function h(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return Je("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const T=r[x.id],E=x.uniforms,C=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let S=0,b=E.length;S<b;S++){const I=E[S];if(Array.isArray(I))for(let R=0,L=I.length;R<L;R++)u(I[R],S,R,C);else u(I,S,0,C)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function u(x,T,E,C){if(v(x,T,E,C)===!0){const S=x.__offset,b=x.value;if(Array.isArray(b)){let I=0;for(let R=0;R<b.length;R++){const L=b[R],D=m(L);g(L,x.__data,I),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(I+=D.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(b,x.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,S,x.__data)}}function g(x,T,E){typeof x=="number"||typeof x=="boolean"?T[0]=x:x.isMatrix3?(T[0]=x.elements[0],T[1]=x.elements[1],T[2]=x.elements[2],T[3]=0,T[4]=x.elements[3],T[5]=x.elements[4],T[6]=x.elements[5],T[7]=0,T[8]=x.elements[6],T[9]=x.elements[7],T[10]=x.elements[8],T[11]=0):ArrayBuffer.isView(x)?T.set(new x.constructor(x.buffer,x.byteOffset,T.length)):x.toArray(T,E)}function v(x,T,E,C){const S=x.value,b=T+"_"+E;if(C[b]===void 0)return typeof S=="number"||typeof S=="boolean"?C[b]=S:ArrayBuffer.isView(S)?C[b]=S.slice():C[b]=S.clone(),!0;{const I=C[b];if(typeof S=="number"||typeof S=="boolean"){if(I!==S)return C[b]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(I.equals(S)===!1)return I.copy(S),!0}}return!1}function p(x){const T=x.uniforms;let E=0;const C=16;for(let b=0,I=T.length;b<I;b++){const R=Array.isArray(T[b])?T[b]:[T[b]];for(let L=0,D=R.length;L<D;L++){const N=R[L],H=Array.isArray(N.value)?N.value:[N.value];for(let Z=0,J=H.length;Z<J;Z++){const U=H[Z],X=m(U),te=E%C,Q=te%X.boundary,ee=te+Q;E+=Q,ee!==0&&C-ee<X.storage&&(E+=C-ee),N.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=E,E+=X.storage}}}const S=E%C;return S>0&&(E+=C-S),x.__size=E,x.__cache={},this}function m(x){const T={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(T.boundary=4,T.storage=4):x.isVector2?(T.boundary=8,T.storage=8):x.isVector3||x.isColor?(T.boundary=16,T.storage=12):x.isVector4?(T.boundary=16,T.storage=16):x.isMatrix3?(T.boundary=48,T.storage=48):x.isMatrix4?(T.boundary=64,T.storage=64):x.isTexture?Be("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(T.boundary=16,T.storage=x.byteLength):Be("WebGLRenderer: Unsupported uniform value type.",x),T}function M(x){const T=x.target;T.removeEventListener("dispose",M);const E=a.indexOf(T.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(r[T.id]),delete r[T.id],delete s[T.id]}function A(){for(const x in r)n.deleteBuffer(r[x]);a=[],r={},s={}}return{bind:l,update:c,dispose:A}}const hv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let on=null;function pv(){return on===null&&(on=new Af(hv,16,16,ti,pn),on.name="DFG_LUT",on.minFilter=Dt,on.magFilter=Dt,on.wrapS=En,on.wrapT=En,on.generateMipmaps=!1,on.needsUpdate=!0),on}class mv{constructor(e={}){const{canvas:t=ef(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:u=qt}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const v=u,p=new Set([Ro,Co,wo]),m=new Set([qt,hn,ir,rr,To,Ao]),M=new Uint32Array(4),A=new Int32Array(4),x=new q;let T=null,E=null;const C=[],S=[];let b=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=en,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const I=this;let R=!1,L=null,D=null,N=null,H=null;this._outputColorSpace=It;let Z=0,J=0,U=null,X=-1,te=null;const Q=new ht,ee=new ht;let ie=null;const Ce=new He(0);let _e=0,fe=t.width,G=t.height,Y=1,se=null,he=null;const ce=new ht(0,0,fe,G),de=new ht(0,0,fe,G);let Oe=!1;const Ne=new nu;let Fe=!1,Xe=!1;const Ie=new vt,tt=new q,pt=new ht,Ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ot=!1;function ft(){return U===null?Y:1}let z=i;function Mt(y,B){return t.getContext(y,B)}let Ke,w,_,W,j,re,P,F,O,V,oe,Te,pe,ue,ye,Ue,ke,k,me,ae,ge,Me,le;try{const y={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Eo}`),t.addEventListener("webglcontextlost",st,!1),t.addEventListener("webglcontextrestored",Qe,!1),t.addEventListener("webglcontextcreationerror",Yt,!1),z===null){const B="webgl2";if(z=Mt(B,y),z===null)throw Mt(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}De()}catch(y){throw t.removeEventListener("webglcontextlost",st,!1),t.removeEventListener("webglcontextrestored",Qe,!1),t.removeEventListener("webglcontextcreationerror",Yt,!1),Je("WebGLRenderer: "+y.message),y}function De(){Ke=new pg(z),Ke.init(),ge=new sv(z,Ke),w=new rg(z,Ke,e,ge),_=new iv(z,Ke),w.reversedDepthBuffer&&d&&_.buffers.depth.setReversed(!0),D=z.createFramebuffer(),N=z.createFramebuffer(),H=z.createFramebuffer(),W=new vg(z),j=new G0,re=new rv(z,Ke,_,j,w,ge,W),P=new hg(I),F=new xh(z),Me=new ng(z,F),O=new mg(z,F,W,Me),V=new xg(z,O,F,Me,W),k=new _g(z,w,re),ye=new sg(j),oe=new V0(I,P,Ke,w,Me,ye),Te=new dv(I,j),pe=new X0,ue=new J0(Ke),ke=new tg(I,P,_,V,g,l),Ue=new nv(I,V,w),le=new fv(z,W,w,_),me=new ig(z,Ke,W),ae=new gg(z,Ke,W),W.programs=oe.programs,I.capabilities=w,I.extensions=Ke,I.properties=j,I.renderLists=pe,I.shadowMap=Ue,I.state=_,I.info=W}v!==qt&&(b=new Mg(v,t.width,t.height,o,r,s));const Re=new cv(I,z);this.xr=Re,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const y=Ke.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Ke.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(y){y!==void 0&&(Y=y,this.setSize(fe,G,!1))},this.getSize=function(y){return y.set(fe,G)},this.setSize=function(y,B,ne=!0){if(Re.isPresenting){Be("WebGLRenderer: Can't change size while VR device is presenting.");return}fe=y,G=B,t.width=Math.floor(y*Y),t.height=Math.floor(B*Y),ne===!0&&(t.style.width=y+"px",t.style.height=B+"px"),b!==null&&b.setSize(t.width,t.height),this.setViewport(0,0,y,B)},this.getDrawingBufferSize=function(y){return y.set(fe*Y,G*Y).floor()},this.setDrawingBufferSize=function(y,B,ne){fe=y,G=B,Y=ne,t.width=Math.floor(y*ne),t.height=Math.floor(B*ne),this.setViewport(0,0,y,B)},this.setEffects=function(y){if(v===qt){Je("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let B=0;B<y.length;B++)if(y[B].isOutputPass===!0){Be("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}b.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(Q)},this.getViewport=function(y){return y.copy(ce)},this.setViewport=function(y,B,ne,$){y.isVector4?ce.set(y.x,y.y,y.z,y.w):ce.set(y,B,ne,$),_.viewport(Q.copy(ce).multiplyScalar(Y).round())},this.getScissor=function(y){return y.copy(de)},this.setScissor=function(y,B,ne,$){y.isVector4?de.set(y.x,y.y,y.z,y.w):de.set(y,B,ne,$),_.scissor(ee.copy(de).multiplyScalar(Y).round())},this.getScissorTest=function(){return Oe},this.setScissorTest=function(y){_.setScissorTest(Oe=y)},this.setOpaqueSort=function(y){se=y},this.setTransparentSort=function(y){he=y},this.getClearColor=function(y){return y.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor(...arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha(...arguments)},this.clear=function(y=!0,B=!0,ne=!0){let $=0;if(y){let K=!1;if(U!==null){const Se=U.texture.format;K=p.has(Se)}if(K){const Se=U.texture.type,be=m.has(Se),xe=ke.getClearColor(),Ae=ke.getClearAlpha(),Le=xe.r,Ve=xe.g,qe=xe.b;be?(M[0]=Le,M[1]=Ve,M[2]=qe,M[3]=Ae,z.clearBufferuiv(z.COLOR,0,M)):(A[0]=Le,A[1]=Ve,A[2]=qe,A[3]=Ae,z.clearBufferiv(z.COLOR,0,A))}else $|=z.COLOR_BUFFER_BIT}B&&($|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ne&&($|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$!==0&&z.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),L=y},this.dispose=function(){t.removeEventListener("webglcontextlost",st,!1),t.removeEventListener("webglcontextrestored",Qe,!1),t.removeEventListener("webglcontextcreationerror",Yt,!1),ke.dispose(),pe.dispose(),ue.dispose(),j.dispose(),P.dispose(),V.dispose(),Me.dispose(),le.dispose(),oe.dispose(),Re.dispose(),Re.removeEventListener("sessionstart",Yo),Re.removeEventListener("sessionend",$o),Hn.stop()};function st(y){y.preventDefault(),vl("WebGLRenderer: Context Lost."),R=!0}function Qe(){vl("WebGLRenderer: Context Restored."),R=!1;const y=W.autoReset,B=Ue.enabled,ne=Ue.autoUpdate,$=Ue.needsUpdate,K=Ue.type;De(),W.autoReset=y,Ue.enabled=B,Ue.autoUpdate=ne,Ue.needsUpdate=$,Ue.type=K}function Yt(y){Je("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function nn(y){const B=y.target;B.removeEventListener("dispose",nn),Bu(B)}function Bu(y){ku(y),j.remove(y)}function ku(y){const B=j.get(y).programs;B!==void 0&&(B.forEach(function(ne){oe.releaseProgram(ne)}),y.isShaderMaterial&&oe.releaseShaderCache(y))}this.renderBufferDirect=function(y,B,ne,$,K,Se){B===null&&(B=Ct);const be=K.isMesh&&K.matrixWorld.determinantAffine()<0,xe=Vu(y,B,ne,$,K);_.setMaterial($,be);let Ae=ne.index,Le=1;if($.wireframe===!0){if(Ae=O.getWireframeAttribute(ne),Ae===void 0)return;Le=2}const Ve=ne.drawRange,qe=ne.attributes.position;let we=Ve.start*Le,je=(Ve.start+Ve.count)*Le;Se!==null&&(we=Math.max(we,Se.start*Le),je=Math.min(je,(Se.start+Se.count)*Le)),Ae!==null?(we=Math.max(we,0),je=Math.min(je,Ae.count)):qe!=null&&(we=Math.max(we,0),je=Math.min(je,qe.count));const _t=je-we;if(_t<0||_t===1/0)return;Me.setup(K,$,xe,ne,Ae);let lt,it=me;if(Ae!==null&&(lt=F.get(Ae),it=ae,it.setIndex(lt)),K.isMesh)$.wireframe===!0?(_.setLineWidth($.wireframeLinewidth*ft()),it.setMode(z.LINES)):it.setMode(z.TRIANGLES);else if(K.isLine){let Rt=$.linewidth;Rt===void 0&&(Rt=1),_.setLineWidth(Rt*ft()),K.isLineSegments?it.setMode(z.LINES):K.isLineLoop?it.setMode(z.LINE_LOOP):it.setMode(z.LINE_STRIP)}else K.isPoints?it.setMode(z.POINTS):K.isSprite&&it.setMode(z.TRIANGLES);if(K.isBatchedMesh)if(Ke.get("WEBGL_multi_draw"))it.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const Rt=K._multiDrawStarts,Ee=K._multiDrawCounts,Ut=K._multiDrawCount,Ze=Ae?F.get(Ae).bytesPerElement:1,Gt=j.get($).currentProgram.getUniforms();for(let rn=0;rn<Ut;rn++)Gt.setValue(z,"_gl_DrawID",rn),it.render(Rt[rn]/Ze,Ee[rn])}else if(K.isInstancedMesh)it.renderInstances(we,_t,K.count);else if(ne.isInstancedBufferGeometry){const Rt=ne._maxInstanceCount!==void 0?ne._maxInstanceCount:1/0,Ee=Math.min(ne.instanceCount,Rt);it.renderInstances(we,_t,Ee)}else it.render(we,_t)};function qo(y,B,ne,$){L!==null&&y.isNodeMaterial&&L.setObject($,y),Fe===!0&&ye.setState(y,ne,!1),y.transparent===!0&&y.side===un&&y.forceSinglePass===!1?(y.side=Bt,y.needsUpdate=!0,mr(y,B,$),y.side=jn,y.needsUpdate=!0,mr(y,B,$),y.side=un):mr(y,B,$)}this.compile=function(y,B,ne=null){ne===null&&(ne=y),L!==null&&L.renderStart(y,B,ne),E=ue.get(ne),E.init(B),S.push(E),ne.traverseVisible(function(K){K.isLight&&K.layers.test(B.layers)&&(E.pushLight(K),K.castShadow&&E.pushShadow(K))}),y!==ne&&y.traverseVisible(function(K){K.isLight&&K.layers.test(B.layers)&&(E.pushLight(K),K.castShadow&&E.pushShadow(K))}),E.setupLights(),L!==null&&L.updateLights(E.state.lightsArray),Xe=this.localClippingEnabled,Fe=ye.init(this.clippingPlanes,Xe),Fe===!0&&ye.setGlobalState(this.clippingPlanes,B),L!==null&&Ue.render(E.state.shadowsArray,ne,B);const $=new Set;return y.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const Se=K.material;if(Se)if(Array.isArray(Se))for(let be=0;be<Se.length;be++){const xe=Se[be];qo(xe,ne,B,K),$.add(xe)}else qo(Se,ne,B,K),$.add(Se)}),E=S.pop(),L!==null&&L.renderEnd(),$},this.compileAsync=function(y,B,ne=null){const $=this.compile(y,B,ne);return new Promise(K=>{function Se(){if($.forEach(function(be){const Ae=j.get(be).currentProgram;(Ae===void 0||Ae.isReady())&&$.delete(be)}),$.size===0){K(y);return}setTimeout(Se,10)}Ke.get("KHR_parallel_shader_compile")!==null?Se():setTimeout(Se,10)})};let Ts=null;function zu(y){Ts&&Ts(y)}function Yo(){Hn.stop()}function $o(){Hn.start()}const Hn=new vu;Hn.setAnimationLoop(zu),typeof self<"u"&&Hn.setContext(self),this.setAnimationLoop=function(y){Ts=y,Re.setAnimationLoop(y),y===null?Hn.stop():Hn.start()},Re.addEventListener("sessionstart",Yo),Re.addEventListener("sessionend",$o),this.render=function(y,B){if(B!==void 0&&B.isCamera!==!0){Je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;L!==null&&L.renderStart(y,B);const ne=Re.enabled===!0&&Re.isPresenting===!0,$=b!==null&&(U===null||ne)&&b.begin(I,U);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Re.enabled===!0&&Re.isPresenting===!0&&(b===null||b.isCompositing()===!1)&&(Re.cameraAutoUpdate===!0&&Re.updateCamera(B),B=Re.getCamera()),y.isScene===!0&&y.onBeforeRender(I,y,B,U),E=ue.get(y,S.length),E.init(B),E.state.textureUnits=re.getTextureUnits(),S.push(E),Ie.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Ne.setFromProjectionMatrix(Ie,fn,B.reversedDepth),Xe=this.localClippingEnabled,Fe=ye.init(this.clippingPlanes,Xe),T=pe.get(y,C.length),T.init(),C.push(T),Re.enabled===!0&&Re.isPresenting===!0){const be=I.xr.getDepthSensingMesh();be!==null&&As(be,B,-1/0,I.sortObjects)}As(y,B,0,I.sortObjects),T.finish(),L!==null&&L.updateLights(E.state.lightsArray),I.sortObjects===!0&&T.sort(se,he),ot=Re.enabled===!1||Re.isPresenting===!1||Re.hasDepthSensing()===!1,ot&&ke.addToRenderList(T,y),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Fe===!0&&ye.beginShadows();const K=E.state.shadowsArray;if(Ue.render(K,y,B),Fe===!0&&ye.endShadows(),($&&b.hasRenderPass())===!1){const be=T.opaque,xe=T.transmissive;if(E.setupLights(),B.isArrayCamera){const Ae=B.cameras;if(xe.length>0)for(let Le=0,Ve=Ae.length;Le<Ve;Le++){const qe=Ae[Le];Zo(be,xe,y,qe)}ot&&ke.render(y);for(let Le=0,Ve=Ae.length;Le<Ve;Le++){const qe=Ae[Le];Ko(T,y,qe,qe.viewport)}}else xe.length>0&&Zo(be,xe,y,B),ot&&ke.render(y),Ko(T,y,B)}U!==null&&J===0&&(re.updateMultisampleRenderTarget(U),re.updateRenderTargetMipmap(U)),$&&b.end(I),y.isScene===!0&&y.onAfterRender(I,y,B),Me.resetDefaultState(),X=-1,te=null,S.pop(),S.length>0?(E=S[S.length-1],re.setTextureUnits(E.state.textureUnits),Fe===!0&&ye.setGlobalState(I.clippingPlanes,E.state.camera)):E=null,C.pop(),C.length>0?T=C[C.length-1]:T=null,L!==null&&L.renderEnd()};function As(y,B,ne,$){if(y.visible===!1)return;if(y.layers.test(B.layers)){if(y.isGroup)ne=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(B);else if(y.isLightProbeGrid)E.pushLightProbeGrid(y);else if(y.isLight)E.pushLight(y),y.castShadow&&E.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||y.intersectsFrustum(Ne)){$&&pt.setFromMatrixPosition(y.matrixWorld).applyMatrix4(Ie);const be=V.update(y),xe=y.material;xe.visible&&T.push(y,be,xe,ne,pt.z,null,B)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||y.intersectsFrustum(Ne))){const be=V.update(y),xe=y.material;if($&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),pt.copy(y.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),pt.copy(be.boundingSphere.center)),pt.applyMatrix4(y.matrixWorld).applyMatrix4(Ie)),Array.isArray(xe)){const Ae=be.groups;for(let Le=0,Ve=Ae.length;Le<Ve;Le++){const qe=Ae[Le],we=xe[qe.materialIndex];we&&we.visible&&T.push(y,be,we,ne,pt.z,qe,B)}}else xe.visible&&T.push(y,be,xe,ne,pt.z,null,B)}}const Se=y.children;for(let be=0,xe=Se.length;be<xe;be++)As(Se[be],B,ne,$)}function Ko(y,B,ne,$){const{opaque:K,transmissive:Se,transparent:be}=y;E.setupLightsView(ne),Fe===!0&&ye.setGlobalState(I.clippingPlanes,ne),$&&_.viewport(Q.copy($)),K.length>0&&pr(K,B,ne),Se.length>0&&pr(Se,B,ne),be.length>0&&pr(be,B,ne),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Zo(y,B,ne,$){if((ne.isScene===!0?ne.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[$.id]===void 0){const we=Ke.has("EXT_color_buffer_half_float")||Ke.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[$.id]=new tn(1,1,{generateMipmaps:!0,type:we?pn:qt,minFilter:Yn,samples:Math.max(4,w.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:$e.workingColorSpace})}const Se=E.state.transmissionRenderTarget[$.id],be=$.viewport||Q;Se.setSize(be.z*I.transmissionResolutionScale,be.w*I.transmissionResolutionScale);const xe=I.getRenderTarget(),Ae=I.getActiveCubeFace(),Le=I.getActiveMipmapLevel();I.setRenderTarget(Se),I.getClearColor(Ce),_e=I.getClearAlpha(),_e<1&&I.setClearColor(16777215,.5),I.clear(),ot&&ke.render(ne);const Ve=I.toneMapping;I.toneMapping=en;const qe=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),E.setupLightsView($),Fe===!0&&ye.setGlobalState(I.clippingPlanes,$),pr(y,ne,$),re.updateMultisampleRenderTarget(Se),re.updateRenderTargetMipmap(Se),Ke.has("WEBGL_multisampled_render_to_texture")===!1){let we=!1;for(let je=0,_t=B.length;je<_t;je++){const lt=B[je],{object:it,geometry:Rt,material:Ee,group:Ut}=lt;if(Ee.side===un&&it.layers.test($.layers)){const Ze=Ee.side;Ee.side=Bt,Ee.needsUpdate=!0,Jo(it,ne,$,Rt,Ee,Ut),Ee.side=Ze,Ee.needsUpdate=!0,we=!0}}we===!0&&(re.updateMultisampleRenderTarget(Se),re.updateRenderTargetMipmap(Se))}I.setRenderTarget(xe,Ae,Le),I.setClearColor(Ce,_e),qe!==void 0&&($.viewport=qe),I.toneMapping=Ve}function pr(y,B,ne){const $=B.isScene===!0?B.overrideMaterial:null;for(let K=0,Se=y.length;K<Se;K++){const be=y[K],{object:xe,geometry:Ae,group:Le}=be;let Ve=be.material;Ve.allowOverride===!0&&$!==null&&(Ve=$),xe.layers.test(ne.layers)&&Jo(xe,B,ne,Ae,Ve,Le)}}function Jo(y,B,ne,$,K,Se){L!==null&&K.isNodeMaterial&&L.setObject(y,K),y.onBeforeRender(I,B,ne,$,K,Se),y.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),K.onBeforeRender(I,B,ne,$,y,Se),K.transparent===!0&&K.side===un&&K.forceSinglePass===!1?(K.side=Bt,K.needsUpdate=!0,I.renderBufferDirect(ne,B,$,K,y,Se),K.side=jn,K.needsUpdate=!0,I.renderBufferDirect(ne,B,$,K,y,Se),K.side=un):I.renderBufferDirect(ne,B,$,K,y,Se),y.onAfterRender(I,B,ne,$,K,Se)}function mr(y,B,ne){B.isScene!==!0&&(B=Ct);const $=j.get(y),K=E.state.lights,Se=E.state.shadowsArray,be=K.state.version,xe=oe.getParameters(y,K.state,Se,B,ne,E.state.lightProbeGridArray),Ae=oe.getProgramCacheKey(xe);let Le=$.programs;$.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?B.environment:null,$.fog=B.fog;const Ve=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;$.envMap=P.get(y.envMap||$.environment,Ve),$.envMapRotation=$.environment!==null&&y.envMap===null?B.environmentRotation:y.envMapRotation,Le===void 0&&(y.addEventListener("dispose",nn),Le=new Map,$.programs=Le);let qe=Le.get(Ae);if(qe!==void 0){if($.currentProgram===qe&&$.lightsStateVersion===be)return jo(y,xe),qe}else xe.uniforms=oe.getUniforms(y),L!==null&&y.isNodeMaterial&&L.build(y,ne,xe),y.onBeforeCompile(xe,I),qe=oe.acquireProgram(xe,Ae),Le.set(Ae,qe),$.uniforms=xe.uniforms;const we=$.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(we.clippingPlanes=ye.uniform),jo(y,xe),$.needsLights=Wu(y),$.lightsStateVersion=be,$.needsLights&&(we.ambientLightColor.value=K.state.ambient,we.lightProbe.value=K.state.probe,we.sunLights.value=K.state.sun,we.sunLightShadows.value=K.state.sunShadow,we.directionalLights.value=K.state.directional,we.directionalLightShadows.value=K.state.directionalShadow,we.spotLights.value=K.state.spot,we.spotLightShadows.value=K.state.spotShadow,we.rectAreaLights.value=K.state.rectArea,we.ltc_1.value=K.state.rectAreaLTC1,we.ltc_2.value=K.state.rectAreaLTC2,we.pointLights.value=K.state.point,we.pointLightShadows.value=K.state.pointShadow,we.hemisphereLights.value=K.state.hemi,we.sunShadowMatrix.value=K.state.sunShadowMatrix,we.sunShadowCascade.value=K.state.sunShadowCascade,we.directionalShadowMatrix.value=K.state.directionalShadowMatrix,we.spotLightMatrix.value=K.state.spotLightMatrix,we.spotLightMap.value=K.state.spotLightMap,we.pointShadowMatrix.value=K.state.pointShadowMatrix),$.lightProbeGrid=E.state.lightProbeGridArray.length>0,$.currentProgram=qe,$.uniformsList=null,qe}function Qo(y){if(y.uniformsList===null){const B=y.currentProgram.getUniforms();y.uniformsList=ss.seqWithValue(B.seq,y.uniforms)}return y.uniformsList}function jo(y,B){const ne=j.get(y);ne.outputColorSpace=B.outputColorSpace,ne.batching=B.batching,ne.batchingColor=B.batchingColor,ne.instancing=B.instancing,ne.instancingColor=B.instancingColor,ne.instancingMorph=B.instancingMorph,ne.skinning=B.skinning,ne.morphTargets=B.morphTargets,ne.morphNormals=B.morphNormals,ne.morphColors=B.morphColors,ne.morphTargetsCount=B.morphTargetsCount,ne.numClippingPlanes=B.numClippingPlanes,ne.numIntersection=B.numClipIntersection,ne.vertexAlphas=B.vertexAlphas,ne.vertexTangents=B.vertexTangents,ne.toneMapping=B.toneMapping}function Hu(y,B){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;x.setFromMatrixPosition(B.matrixWorld);for(let ne=0,$=y.length;ne<$;ne++){const K=y[ne];if(K.texture!==null&&K.boundingBox.containsPoint(x))return K}return null}function Vu(y,B,ne,$,K){B.isScene!==!0&&(B=Ct),re.resetTextureUnits();const Se=B.fog,be=$.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial?B.environment:null,xe=U===null?I.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:$e.workingColorSpace,Ae=$.isMeshStandardMaterial||$.isMeshLambertMaterial&&!$.envMap||$.isMeshPhongMaterial&&!$.envMap,Le=P.get($.envMap||be,Ae),Ve=$.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,qe=!!ne.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),we=!!ne.morphAttributes.position,je=!!ne.morphAttributes.normal,_t=!!ne.morphAttributes.color;let lt=en;$.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(lt=I.toneMapping);const it=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,Rt=it!==void 0?it.length:0,Ee=j.get($),Ut=E.state.lights;if(Fe===!0&&(Xe===!0||y!==te)){const at=y===te&&$.id===X;ye.setState($,y,at)}let Ze=!1;$.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==Ut.state.version||Ee.outputColorSpace!==xe||K.isBatchedMesh&&Ee.batching===!1||!K.isBatchedMesh&&Ee.batching===!0||K.isBatchedMesh&&Ee.batchingColor===!0&&K._colorsTexture===null||K.isBatchedMesh&&Ee.batchingColor===!1&&K._colorsTexture!==null||K.isInstancedMesh&&Ee.instancing===!1||!K.isInstancedMesh&&Ee.instancing===!0||K.isSkinnedMesh&&Ee.skinning===!1||!K.isSkinnedMesh&&Ee.skinning===!0||K.isInstancedMesh&&Ee.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Ee.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Ee.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Ee.instancingMorph===!1&&K.morphTexture!==null||Ee.envMap!==Le||$.fog===!0&&Ee.fog!==Se||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==ye.numPlanes||Ee.numIntersection!==ye.numIntersection)||Ee.vertexAlphas!==Ve||Ee.vertexTangents!==qe||Ee.morphTargets!==we||Ee.morphNormals!==je||Ee.morphColors!==_t||Ee.toneMapping!==lt||Ee.morphTargetsCount!==Rt||!!Ee.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(Ze=!0):(Ze=!0,Ee.__version=$.version);let Gt=Ee.currentProgram;Ze===!0&&(Gt=mr($,B,K),L&&$.isNodeMaterial&&L.onUpdateProgram($,Gt,Ee));let rn=!1,Rn=!1,si=!1;const nt=Gt.getUniforms(),mt=Ee.uniforms;if(_.useProgram(Gt.program)&&(rn=!0,Rn=!0,si=!0),$.id!==X&&(X=$.id,Rn=!0),Ee.needsLights){const at=Hu(E.state.lightProbeGridArray,K);Ee.lightProbeGrid!==at&&(Ee.lightProbeGrid=at,Rn=!0)}if(rn||te!==y){_.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),nt.setValue(z,"projectionMatrix",y.projectionMatrix),nt.setValue(z,"viewMatrix",y.matrixWorldInverse);const Pn=nt.map.cameraPosition;Pn!==void 0&&Pn.setValue(z,tt.setFromMatrixPosition(y.matrixWorld)),w.logarithmicDepthBuffer&&nt.setValue(z,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&nt.setValue(z,"isOrthographic",y.isOrthographicCamera===!0),te!==y&&(te=y,Rn=!0,si=!0)}if(Ee.needsLights&&(Ut.state.sunShadowMap.length>0&&nt.setValue(z,"sunShadowMap",Ut.state.sunShadowMap,re),Ut.state.directionalShadowMap.length>0&&nt.setValue(z,"directionalShadowMap",Ut.state.directionalShadowMap,re),Ut.state.spotShadowMap.length>0&&nt.setValue(z,"spotShadowMap",Ut.state.spotShadowMap,re),Ut.state.pointShadowMap.length>0&&nt.setValue(z,"pointShadowMap",Ut.state.pointShadowMap,re)),K.isSkinnedMesh){nt.setOptional(z,K,"bindMatrix"),nt.setOptional(z,K,"bindMatrixInverse");const at=K.skeleton;at&&(at.boneTexture===null&&at.computeBoneTexture(),nt.setValue(z,"boneTexture",at.boneTexture,re))}K.isBatchedMesh&&(nt.setOptional(z,K,"batchingTexture"),nt.setValue(z,"batchingTexture",K._matricesTexture,re),nt.setOptional(z,K,"batchingIdTexture"),nt.setValue(z,"batchingIdTexture",K._indirectTexture,re),nt.setOptional(z,K,"batchingColorTexture"),K._colorsTexture!==null&&nt.setValue(z,"batchingColorTexture",K._colorsTexture,re));const Ln=ne.morphAttributes;if((Ln.position!==void 0||Ln.normal!==void 0||Ln.color!==void 0)&&k.update(K,ne,Gt),(Rn||Ee.receiveShadow!==K.receiveShadow)&&(Ee.receiveShadow=K.receiveShadow,nt.setValue(z,"receiveShadow",K.receiveShadow)),($.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial)&&$.envMap===null&&B.environment!==null&&(mt.envMapIntensity.value=B.environmentIntensity),mt.dfgLUT!==void 0&&(mt.dfgLUT.value=pv()),Rn){if(nt.setValue(z,"toneMappingExposure",I.toneMappingExposure),Ee.needsLights&&Gu(mt,si),Se&&$.fog===!0&&Te.refreshFogUniforms(mt,Se),Te.refreshMaterialUniforms(mt,$,Y,G,E.state.transmissionRenderTarget[y.id]),Ee.needsLights&&Ee.lightProbeGrid){const at=Ee.lightProbeGrid;mt.probesSH.value=at.texture,mt.probesMin.value.copy(at.boundingBox.min),mt.probesMax.value.copy(at.boundingBox.max),mt.probesResolution.value.copy(at.resolution)}ss.upload(z,Qo(Ee),mt,re)}if($.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(ss.upload(z,Qo(Ee),mt,re),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&nt.setValue(z,"center",K.center),nt.setValue(z,"modelViewMatrix",K.modelViewMatrix),nt.setValue(z,"normalMatrix",K.normalMatrix),nt.setValue(z,"modelMatrix",K.matrixWorld),$.uniformsGroups!==void 0){const at=$.uniformsGroups;for(let Pn=0,ai=at.length;Pn<ai;Pn++){const tl=at[Pn];le.update(tl,Gt),le.bind(tl,Gt)}}return Gt}function Gu(y,B){y.ambientLightColor.needsUpdate=B,y.lightProbe.needsUpdate=B,y.sunLights.needsUpdate=B,y.sunLightShadows.needsUpdate=B,y.directionalLights.needsUpdate=B,y.directionalLightShadows.needsUpdate=B,y.pointLights.needsUpdate=B,y.pointLightShadows.needsUpdate=B,y.spotLights.needsUpdate=B,y.spotLightShadows.needsUpdate=B,y.rectAreaLights.needsUpdate=B,y.hemisphereLights.needsUpdate=B}function Wu(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return J},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(y,B,ne){const $=j.get(y);$.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),j.get(y.texture).__webglTexture=B,j.get(y.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:ne,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,B){const ne=j.get(y);ne.__webglFramebuffer=B,ne.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(y,B=0,ne=0){U=y,Z=B,J=ne;let $=null,K=!1,Se=!1;if(y){const xe=j.get(y);if(xe.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(z.FRAMEBUFFER,xe.__webglFramebuffer),Q.copy(y.viewport),ee.copy(y.scissor),ie=y.scissorTest,_.viewport(Q),_.scissor(ee),_.setScissorTest(ie),X=-1;return}else if(xe.__webglFramebuffer===void 0)re.setupRenderTarget(y);else if(xe.__hasExternalTextures)re.rebindTextures(y,j.get(y.texture).__webglTexture,j.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const Ve=y.depthTexture;if(xe.__boundDepthTexture!==Ve){if(Ve!==null&&j.has(Ve)&&(y.width!==Ve.image.width||y.height!==Ve.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");re.setupDepthRenderbuffer(y)}}const Ae=y.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(Se=!0);const Le=j.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Le[B])?$=Le[B][ne]:$=Le[B],K=!0):y.samples>0&&re.useMultisampledRTT(y)===!1?$=j.get(y).__webglMultisampledFramebuffer:Array.isArray(Le)?$=Le[ne]:$=Le,Q.copy(y.viewport),ee.copy(y.scissor),ie=y.scissorTest}else Q.copy(ce).multiplyScalar(Y).floor(),ee.copy(de).multiplyScalar(Y).floor(),ie=Oe;if(ne!==0&&($=D),_.bindFramebuffer(z.FRAMEBUFFER,$)&&_.drawBuffers(y,$),_.viewport(Q),_.scissor(ee),_.setScissorTest(ie),K){const xe=j.get(y.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+B,xe.__webglTexture,ne)}else if(Se){const xe=B;for(let Ae=0;Ae<y.textures.length;Ae++){const Le=j.get(y.textures[Ae]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+Ae,Le.__webglTexture,ne,xe)}}else if(y!==null&&ne!==0){const xe=j.get(y.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,xe.__webglTexture,ne)}X=-1};function el(y){const B=j.get(y);return(B.__readFormat!==y.format||B.__readType!==y.type)&&(B.__readFormat=y.format,B.__readType=y.type,B.__formatReadable=w.textureFormatReadable(y.format),B.__typeReadable=w.textureTypeReadable(y.type)),B}this.readRenderTargetPixels=function(y,B,ne,$,K,Se,be,xe=0){if(!(y&&y.isWebGLRenderTarget)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=j.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&be!==void 0&&(Ae=Ae[be]),Ae){_.bindFramebuffer(z.FRAMEBUFFER,Ae);try{const Le=y.textures[xe],Ve=Le.format,qe=Le.type;y.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+xe);const we=el(Le);if(we.__formatReadable===!1){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(we.__typeReadable===!1){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=y.width-$&&ne>=0&&ne<=y.height-K&&z.readPixels(B,ne,$,K,ge.convert(Ve),ge.convert(qe),Se)}finally{const Le=U!==null?j.get(U).__webglFramebuffer:null;_.bindFramebuffer(z.FRAMEBUFFER,Le)}}},this.readRenderTargetPixelsAsync=async function(y,B,ne,$,K,Se,be,xe=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=j.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&be!==void 0&&(Ae=Ae[be]),Ae)if(B>=0&&B<=y.width-$&&ne>=0&&ne<=y.height-K){_.bindFramebuffer(z.FRAMEBUFFER,Ae);const Le=y.textures[xe],Ve=Le.format,qe=Le.type;y.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+xe);const we=el(Le);if(we.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(we.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const je=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,je),z.bufferData(z.PIXEL_PACK_BUFFER,Se.byteLength,z.STREAM_READ),z.readPixels(B,ne,$,K,ge.convert(Ve),ge.convert(qe),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);const _t=U!==null?j.get(U).__webglFramebuffer:null;_.bindFramebuffer(z.FRAMEBUFFER,_t);const lt=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await tf(z,lt,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,je),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,Se),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(je),z.deleteSync(lt),Se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,B=null,ne=0){const $=Math.pow(2,-ne),K=Math.floor(y.image.width*$),Se=Math.floor(y.image.height*$),be=B!==null?B.x:0,xe=B!==null?B.y:0;re.setTexture2D(y,0),z.copyTexSubImage2D(z.TEXTURE_2D,ne,0,0,be,xe,K,Se),_.unbindTexture()},this.copyTextureToTexture=function(y,B,ne=null,$=null,K=0,Se=0){let be,xe,Ae,Le,Ve,qe,we,je,_t;const lt=y.isCompressedTexture?y.mipmaps[Se]:y.image;if(ne!==null)be=ne.max.x-ne.min.x,xe=ne.max.y-ne.min.y,Ae=ne.isBox3?ne.max.z-ne.min.z:1,Le=ne.min.x,Ve=ne.min.y,qe=ne.isBox3?ne.min.z:0;else{const mt=Math.pow(2,-K);be=Math.floor(lt.width*mt),xe=Math.floor(lt.height*mt),y.isDataArrayTexture?Ae=lt.depth:y.isData3DTexture?Ae=Math.floor(lt.depth*mt):Ae=1,Le=0,Ve=0,qe=0}$!==null?(we=$.x,je=$.y,_t=$.z):(we=0,je=0,_t=0);const it=ge.convert(B.format),Rt=ge.convert(B.type);let Ee;B.isData3DTexture?(re.setTexture3D(B,0),Ee=z.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(re.setTexture2DArray(B,0),Ee=z.TEXTURE_2D_ARRAY):(re.setTexture2D(B,0),Ee=z.TEXTURE_2D),_.activeTexture(z.TEXTURE0),_.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,B.flipY),_.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),_.pixelStorei(z.UNPACK_ALIGNMENT,B.unpackAlignment);const Ut=_.getParameter(z.UNPACK_ROW_LENGTH),Ze=_.getParameter(z.UNPACK_IMAGE_HEIGHT),Gt=_.getParameter(z.UNPACK_SKIP_PIXELS),rn=_.getParameter(z.UNPACK_SKIP_ROWS),Rn=_.getParameter(z.UNPACK_SKIP_IMAGES);_.pixelStorei(z.UNPACK_ROW_LENGTH,lt.width),_.pixelStorei(z.UNPACK_IMAGE_HEIGHT,lt.height),_.pixelStorei(z.UNPACK_SKIP_PIXELS,Le),_.pixelStorei(z.UNPACK_SKIP_ROWS,Ve),_.pixelStorei(z.UNPACK_SKIP_IMAGES,qe);const si=y.isDataArrayTexture||y.isData3DTexture,nt=B.isDataArrayTexture||B.isData3DTexture;if(y.isDepthTexture){const mt=j.get(y),Ln=j.get(B),at=j.get(mt.__renderTarget),Pn=j.get(Ln.__renderTarget);_.bindFramebuffer(z.READ_FRAMEBUFFER,at.__webglFramebuffer),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,Pn.__webglFramebuffer);for(let ai=0;ai<Ae;ai++)si&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,j.get(y).__webglTexture,K,qe+ai),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,j.get(B).__webglTexture,Se,_t+ai)),z.blitFramebuffer(Le,Ve,be,xe,we,je,be,xe,z.DEPTH_BUFFER_BIT,z.NEAREST);_.bindFramebuffer(z.READ_FRAMEBUFFER,null),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(K!==0||y.isRenderTargetTexture||j.has(y)){const mt=j.get(y),Ln=j.get(B);_.bindFramebuffer(z.READ_FRAMEBUFFER,N),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,H);for(let at=0;at<Ae;at++)si?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,mt.__webglTexture,K,qe+at):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,mt.__webglTexture,K),nt?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ln.__webglTexture,Se,_t+at):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Ln.__webglTexture,Se),K!==0?z.blitFramebuffer(Le,Ve,be,xe,we,je,be,xe,z.COLOR_BUFFER_BIT,z.NEAREST):nt?z.copyTexSubImage3D(Ee,Se,we,je,_t+at,Le,Ve,be,xe):z.copyTexSubImage2D(Ee,Se,we,je,Le,Ve,be,xe);_.bindFramebuffer(z.READ_FRAMEBUFFER,null),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else nt?y.isDataTexture||y.isData3DTexture?z.texSubImage3D(Ee,Se,we,je,_t,be,xe,Ae,it,Rt,lt.data):B.isCompressedArrayTexture?z.compressedTexSubImage3D(Ee,Se,we,je,_t,be,xe,Ae,it,lt.data):z.texSubImage3D(Ee,Se,we,je,_t,be,xe,Ae,it,Rt,lt):y.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,Se,we,je,be,xe,it,Rt,lt.data):y.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,Se,we,je,lt.width,lt.height,it,lt.data):z.texSubImage2D(z.TEXTURE_2D,Se,we,je,be,xe,it,Rt,lt);_.pixelStorei(z.UNPACK_ROW_LENGTH,Ut),_.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Ze),_.pixelStorei(z.UNPACK_SKIP_PIXELS,Gt),_.pixelStorei(z.UNPACK_SKIP_ROWS,rn),_.pixelStorei(z.UNPACK_SKIP_IMAGES,Rn),Se===0&&B.generateMipmaps&&z.generateMipmap(Ee),_.unbindTexture()},this.initRenderTarget=function(y){j.get(y).__webglFramebuffer===void 0&&re.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?re.setTextureCube(y,0):y.isData3DTexture?re.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?re.setTexture2DArray(y,0):re.setTexture2D(y,0),_.unbindTexture()},this.resetState=function(){Z=0,J=0,U=null,_.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}}function Es(n,e){const t=[[0,n],[n,0],[0,-n],[-n,0]];if(e<=0)return t.map(([s,a])=>[s,a,0]);const i=Math.min(.24,Math.max(0,e/n)),r=[];for(let s=0;s<4;s++){const a=t[s],o=t[(s+3)%4],l=t[(s+1)%4],c=a.map((h,d)=>h+(o[d]-h)*i),f=a.map((h,d)=>h+(l[d]-h)*i);for(let h=0;h<=8;h++){const d=h/8,u=1-d;r.push([u*u*c[0]+2*u*d*a[0]+d*d*f[0],u*u*c[1]+2*u*d*a[1]+d*d*f[1],0])}}return r}function Tu(n,e=50,t=38){const i=dr[n],r=i.u-i.v,s=i.u+i.v,a=Math.hypot(r,s)||1,o={x:r/a,y:s/a},l={x:-o.y,y:o.x},c={x:o.x*e/2,y:o.y*e/2},f={x:-o.x*e*.08,y:-o.y*e*.08},h={x:-o.x*e/2,y:-o.y*e/2},d=[c,{x:f.x+l.x*t/2,y:f.y+l.y*t/2},{x:f.x+l.x*t*.22,y:f.y+l.y*t*.22},{x:h.x+l.x*t*.22,y:h.y+l.y*t*.22},{x:h.x-l.x*t*.22,y:h.y-l.y*t*.22},{x:f.x-l.x*t*.22,y:f.y-l.y*t*.22},{x:f.x-l.x*t/2,y:f.y-l.y*t/2}];return wu(d,3.5)}function Au(n,e=40,t=11){const i=dr[n],r=i.u-i.v,s=i.u+i.v,a=Math.hypot(r,s)||1,o={x:r/a,y:s/a},l={x:-o.y,y:o.x},c=t/2,f=[[e*.38,0],[-e*.12,e*.48],[-e*.12-c*1.4,e*.48-c*1.4],[e*.38-c*2.8,0],[-e*.12-c*1.4,-e*.48+c*1.4],[-e*.12,-e*.48]];return wu(f.map(([h,d])=>({x:o.x*h+l.x*d,y:o.y*h+l.y*d})),4)}function wu(n,e){const t=new cu;n.forEach((r,s)=>{const a=n[(s+n.length-1)%n.length],o=n[(s+1)%n.length],l=h=>{const d=Math.hypot(h.x-r.x,h.y-r.y),u=Math.min(.45,e/d);return{x:r.x+(h.x-r.x)*u,y:r.y+(h.y-r.y)*u}},c=l(a),f=l(o);s===0?t.moveTo(c.x,c.y):t.lineTo(c.x,c.y),t.quadraticCurveTo(r.x,r.y,f.x,f.y)}),t.closePath();const i=new Oo(t,8).toNonIndexed();return i.computeBoundingSphere(),i}function gv(n,e){const t=[...n.cells].filter(r=>r.kind!=="blocked").sort(ls).map(r=>({kind:"floor",cell:r})),i=[...e].sort((r,s)=>+!!r.collecting-+!!s.collecting||ls(r,s));return[...t,...i.map(r=>({kind:"stack",stack:r,firstLayer:0,endLayer:Math.ceil(r.height)}))]}function ma(n,e){return{rise:e+(n.lift??0)+(n.layerOffsets?.[e]??0),scale:n.layerScales?.[e]??1}}const Cu=420,Ru=n=>Math.min(32,240/Math.max(1,n-1));function pc(n){return Math.max(0,n-1)*Ru(n)+Cu}function mc(n,e){const t=[],i=[],r=Ru(n);for(let s=0;s<n;s++){const a=(e-s*r)/Cu,o=a>0&&a<1?Math.sin(a*Math.PI*3)*(1-a)**2:0;t.push(o*.3),i.push(1+o*.22)}return{layerOffsets:t,layerScales:i}}function vv(n,e){if(e)return{offset:0,intensity:1};const t=(n%.9+.9)%.9/.9,i=Math.cos(t*Math.PI*2);return{offset:-7*i,intensity:(1-i)/2}}function bs(n,e,t){const i=new kt;return i.setAttribute("position",new St(n.flatMap(r=>[r[0],r[1],0]),3)),i.setAttribute("color",new St(n.flatMap(r=>{const s=e(r);return t?[s.r,s.g,s.b,t(r)]:[s.r,s.g,s.b]}),t?4:3)),i.computeBoundingSphere(),i}function ko(n){const e=[];for(let t=1;t<n.length;t++){const i=n[t-1],r=n[t];for(let s=0;s<i.length;s++){const a=(s+1)%i.length;e.push(i[s],i[a],r[a],i[s],r[a],r[s])}}return e}function Lu(n,e,t){const i=new He(t?"#ffc729":"#f2ebdf"),r=new He(t?"#ffe878":"#fffdf7"),s=Math.exp(-((n-.28)**2+(e-.3)**2)*1.3);return i.lerp(r,.25+.65*s)}function uo(n,e,t=!1){const i=[0,.2,.4,.6,.8,1].map(r=>Es(n,e).map(s=>[s[0]*r,s[1]*r,r]));return bs(ko(i),r=>Lu(r[0]/n,r[1]/n,t))}function fo(n,e,t,i=!1){const r=[0,.2,.4,.6,.8,1].map(o=>Es(n-e*o,t*(n-e*o)/n).map(l=>[l[0],l[1],o])),s=new He(i?"#dca02a":"#c2c1ba"),a=new He(i?"#fff19c":"#fffef9");return bs(ko(r),o=>{const l=Math.max(0,Math.min(1,.65+(o[1]+o[0]*.65)/(n*2))),c=o[2];return s.clone().lerp(a,.2+l*.6).lerp(Lu(o[0]/(n-e),o[1]/(n-e),i),c*c*(3-2*c))})}function ho(n,e,t,i=!1){const r=[0,.12,.5,.85,1].map(l=>Es(n-(l>.85?(l-.85)*10:0),t).map(c=>[c[0],c[1]-e*l,l])),s=[];for(let l=1;l<r.length;l++){const c=r[l-1],f=r[l];for(let h=0;h<c.length;h++){const d=(h+1)%c.length;c[d][0]>=c[h][0]||s.push(c[h],c[d],f[d],c[h],f[d],f[h])}}const a=new He(i?"#b78224":"#a6acb4"),o=new He(i?"#f6c440":"#eee9df");return bs(s,l=>{const c=.7+l[0]/n*.18,f=.6+.25*Math.sin(l[2]*Math.PI)-.4*l[2];return a.clone().lerp(o,Math.max(0,Math.min(1,c*f)))})}function _v(n,e){const t=[0,.65,.85,1,1.1].map(i=>Es(n,e).map(r=>[r[0]*i,r[1]*i,i]));return bs(ko(t),()=>new He("#716c60"),i=>Math.max(0,1-i[2]/1.1)**1.4)}const as=_o.length;function xv(n,e){return((n+e*5)%as+as)%as}function Sv(n,e){const{rect:t,solid:i}=_o[n],r=e*2/(i[2]-i[0]),s=(e*2+So)/(i[3]-i[1]),a=-e-i[0]*r,o=a+r,l=e+i[1]*s,c=l-s,[f,h,d,u]=t,g=f/sl,v=d/sl,p=1-u/al,m=1-h/al,M=new kt;return M.setAttribute("position",new St([a,l,0,o,l,0,o,c,0,a,l,0,o,c,0,a,c,0],3)),M.setAttribute("uv",new St([g,m,v,m,v,p,g,m,v,p,g,p],2)),M.computeBoundingSphere(),M}function Mv(n){const e=[ho(n,xo,12),fo(n,4,12),uo(n-4,11)],t=[],i=[],r=new He("#64778b"),s=new He("#c7cdd0");for(const o of e){const l=o.getAttribute("position"),c=o.getAttribute("color");for(let f=0;f<l.count;f++){t.push(l.getX(f),l.getY(f),l.getZ(f));const h=r.clone().lerp(s,Math.min(1,(c.getX(f)+c.getY(f)+c.getZ(f))/3));i.push(h.r,h.g,h.b)}o.dispose()}const a=new kt;return a.setAttribute("position",new St(t,3)),a.setAttribute("color",new St(i,3)),a.computeBoundingSphere(),a}const Pu={tiles:[2048,512],markers:[1024,512]},yv={white:{rect:[16,49,496,462],solid:[.024635036496350366,.028631519414644493,.9753649635036497,.9724112334529259]},yellow:{rect:[528,55,1008,457],solid:[.024280575539568344,.02899173198754429,.9757194244604316,.9717599055084291]},"white-shadow":{rect:[1040,131,1520,380],solid:[.024104234527687295,.04646599427024057,.9758957654723126,.9519249636984419]},"yellow-shadow":{rect:[1552,136,2032,376],solid:[.024025974025974024,.04805194805194805,.9759740259740259,.9532467532467532]},"orange-up":{rect:[8,69,120,186],solid:[.024915062287655717,.0238503160360465,.9750849377123442,.9756947469291749]},"orange-up-right":{rect:[136,74,248,182],solid:[.024020227560050567,.024909865617830217,.9759797724399494,.9780399868895444]},"orange-right":{rect:[264,86,376,170],solid:[.024177949709864605,.032237266279819474,.9758220502901355,.9722759509993553]},"orange-down-right":{rect:[392,74,504,182],solid:[.02408256880733945,.024974515800203875,.9759174311926605,.9704383282364935]},"orange-down":{rect:[520,70,632,185],solid:[.025246981339187707,.02458836443468716,.9747530186608123,.97818928077125]},"orange-down-left":{rect:[648,76,760,180],solid:[.024364406779661018,.026238591916558023,.975635593220339,.973109517601043]},"orange-left":{rect:[776,85,888,171],solid:[.024557956777996073,.03198245533878558,.9754420432220039,.9697080458719788]},"orange-up-left":{rect:[904,74,1016,182],solid:[.02378255945639864,.02466339499182081,.9762174405436014,.9724424311060778]},"white-up":{rect:[8,347,120,421],solid:[.02586206896551724,.0391425908667288,.9741379310344829,.9589934762348556]},"white-up-right":{rect:[136,334,248,434],solid:[.027624309392265196,.030939226519337018,.9723756906077348,.9714917127071823]},"white-right":{rect:[264,317,376,450],solid:[.02958579881656805,.024914356898162567,.9704142011834321,.9766427904079727]},"white-down-right":{rect:[392,334,504,434],solid:[.027624309392265196,.030939226519337018,.9723756906077348,.965303867403315]},"white-down":{rect:[520,347,632,421],solid:[.02586206896551724,.0391425908667288,.9741379310344829,.9589934762348556]},"white-down-left":{rect:[648,334,760,434],solid:[.027624309392265196,.030939226519337018,.9723756906077348,.965303867403315]},"white-left":{rect:[776,317,888,450],solid:[.02958579881656805,.024914356898162567,.9704142011834321,.9766427904079727]},"white-up-left":{rect:[904,334,1016,434],solid:[.027624309392265196,.030939226519337018,.9723756906077348,.9714917127071823]}},Ev={SE:"up-right",SW:"up-left",NW:"down-left",NE:"down-right",E:"right",W:"left",N:"down",S:"up"},Iu={white:.94,yellow:.96};function Du(n,e,t,i){const{rect:r,solid:s}=yv[n],a=s[2]-s[0],o=s[3]-s[1],l=(i.right-i.left)/a,c=(i.top-i.bottom)/o,f=i.left-s[0]*l,h=f+l,d=i.top+s[1]*c,u=d-c,g=r[0]/e,v=r[2]/e,p=1-r[3]/t,m=1-r[1]/t,M=new kt;return M.setAttribute("position",new St([f,d,0,h,d,0,h,u,0,f,d,0,h,u,0,f,u,0],3)),M.setAttribute("uv",new St([g,m,v,m,v,p,g,m,v,p,g,p],2)),M.computeBoundingSphere(),M}function Yr(n=!1,e=!1){const t=((n?Ei:Tt)-1)*Iu[n?"yellow":"white"],i=n?12:Qn;return Du(n?e?"yellow-shadow":"yellow":e?"white-shadow":"white",...Pu.tiles,{left:-t,right:t,top:e?n?8:Mo-Qn:t,bottom:-t-i})}function gc(n,e=!1){const t=e?Au(n):Tu(n);t.computeBoundingBox();const i=t.boundingBox,r=e?1.2:1.25,s=Du(`${e?"white":"orange"}-${Ev[n]}`,...Pu.markers,{left:i.min.x*r,right:i.max.x*r,top:i.max.y*r,bottom:i.min.y*r});return t.dispose(),s}const ct={transparent:!0,depthTest:!1,depthWrite:!1,side:un};function vc(n,e,t,i){const r=yo(n,e,t,i);return{x:r.x-ut.width/2,y:ut.height/2-r.y}}function _c(n,e,t,i){const r=cs(n,e,t,i);return{x:r.x-ut.width/2,y:ut.height/2-r.y}}function bv(){return{tileTop:new rt({vertexColors:!0,...ct}),tileBevel:new rt({vertexColors:!0,...ct}),sideLight:new rt({vertexColors:!0,...ct}),floor:new rt({vertexColors:!0,...ct}),floorBevel:new rt({vertexColors:!0,...ct}),floorSide:new rt({vertexColors:!0,...ct}),coveredFloorSide:new rt({vertexColors:!0,color:"#cda756",...ct}),coveredFloorBevel:new rt({vertexColors:!0,color:"#d6b251",...ct}),landscape:new rt({vertexColors:!0,...ct}),stoneArt:new rt({...ct}),shadow:new rt({vertexColors:!0,opacity:.28,...ct}),arrowShadow:new rt({color:"#786f58",opacity:.16,...ct}),arrowSide:new rt({color:"#ca641c",...ct}),arrowBevel:new rt({color:"#ffbb69",...ct}),chevronSide:new rt({color:"#cba52c",...ct}),selectedArrow:new rt({color:Ri.arrow,...ct}),hintTop:new rt({vertexColors:!0,...ct}),hintBevel:new rt({vertexColors:!0,...ct}),hintSide:new rt({vertexColors:!0,...ct}),hintArt:new rt({...ct}),arrow:new rt({color:Ri.arrow,...ct}),chevron:new rt({color:Ri.chevron,...ct}),tileArt:new rt({...ct}),markerArt:new rt({...ct}),chevronArt:new rt({...ct})}}function Tv(n){const e=new mv({canvas:n,antialias:!0,alpha:!0,powerPreference:"high-performance"});e.outputColorSpace=It,e.toneMapping=en,e.setClearColor(Ri.background,0),e.autoClear=!1;const t=new Ws,i=new Bo(-360,360,640,-640,.1,1e3);i.position.set(0,0,100),i.lookAt(0,0,0);const r=bv(),s={stoneSprites:Array.from({length:as},(ee,ie)=>Sv(ie,Ti)),stoneSlab:Mv(Ti),floor:uo(Ei-5,12*(Ei-5)/(Ei-1),!0),floorBevel:fo(Ei-1,4,12,!0),floorSide:ho(Ei-1,12,12,!0),tileTop:uo(Tt-6,12*(Tt-6)/(Tt-1)),tileBevel:fo(Tt-1,5,12),tileSide:ho(Tt-1,Qn,12),shadow:_v((Tt-2)*Iu.white,12),arrows:Object.fromEntries(Sr.map(ee=>[ee,Tu(ee)])),chevrons:Object.fromEntries(Sr.map(ee=>[ee,Au(ee)])),whiteSprite:Yr(),coveredWhiteSprite:Yr(!1,!0),yellowSprite:Yr(!0),coveredYellowSprite:Yr(!0,!0),arrowSprites:Object.fromEntries(Sr.map(ee=>[ee,gc(ee)])),chevronSprites:Object.fromEntries(Sr.map(ee=>[ee,gc(ee,!0)]))},a=new Ws,o=new Ws;let l;a.scale.y=bn,t.add(a),t.add(o);let c={width:1,height:1,pixelRatio:1},f,h,d=!1,u="loading",g="loading";const v=new mu,p=new Promise((ee,ie)=>{v.onLoad=()=>ee(),v.onError=()=>ie(new Error("Could not load board textures."))});p.catch(()=>{});const m=new la(v).load(new URL("/White-Tower-Play/assets/tiles-atlas-Bgn-GxWF.webp",import.meta.url).href,ee=>{if(d){ee.dispose();return}u="ready",h&&Z(h)},void 0,()=>{u="failed"});m.colorSpace=It,r.tileArt.map=m,r.hintArt.map=m;const M=new la(v).load(new URL("/White-Tower-Play/assets/markers-atlas-M4FshpTr.webp",import.meta.url).href,ee=>{if(d){ee.dispose();return}g="ready",h&&Z(h)},void 0,()=>{g="failed"});M.colorSpace=It,r.markerArt.map=M,r.chevronArt.map=M;let A=!1;const x=new la(v).load(new URL("/White-Tower-Play/assets/stone-atlas-C2ucdoOf.webp",import.meta.url).href,ee=>{if(d){ee.dispose();return}A=!0,l=void 0,h&&Z(h)},void 0,()=>{A=!1});x.colorSpace=It,r.stoneArt.map=x;let T=0,E=!1;const C=[],S=new He(Ri.floor),b=new He(Ri.chevron);let I={lost(){},restored(){}};const R=ee=>{ee.preventDefault(),I.lost()},L=()=>{h&&Z(h),I.restored()};n.addEventListener("webglcontextlost",R),n.addEventListener("webglcontextrestored",L);function D(ee,ie,Ce,_e,fe=1,G=1,Y=a){const se=new mn(ee,ie);return se.position.set(Ce.x,Ce.y,Ce.z),se.scale.set(fe,G,1),se.renderOrder=_e,Y.add(se),se}function N(ee,ie,Ce,_e,fe,G){const Y=(ee.u+ee.v+1e3)*1e-5;let se=_e+1;for(let ce=fe;ce<G;ce++){const de=ma(ee,ce),Oe=_c(ee.u,ee.v,de.rise,Ce),Ne=Y+.01+ce*1e-5,Fe=ee.id===h?.hintStackId&&ce===Math.ceil(ee.height)-1;if(D(s.shadow,r.shadow,{x:Oe.x-4,y:Oe.y-Qn-4,z:Ne},se++,de.scale,de.scale),u==="ready"){const Xe=ce<Math.ceil(ee.height)-1;D(s.whiteSprite,Fe?r.hintArt:r.tileArt,{x:Oe.x,y:Oe.y,z:Ne},se++,de.scale,de.scale),Xe&&D(s.coveredWhiteSprite,r.tileArt,{x:Oe.x,y:Oe.y,z:Ne},se++,de.scale,de.scale);continue}D(s.tileSide,Fe?r.hintSide:r.sideLight,{x:Oe.x,y:Oe.y,z:Ne},se++,de.scale,de.scale),D(s.tileBevel,Fe?r.hintBevel:r.tileBevel,{x:Oe.x,y:Oe.y,z:Ne+.001},se++,de.scale,de.scale),D(s.tileTop,Fe?r.hintTop:r.tileTop,{x:Oe.x,y:Oe.y,z:Ne+.002},se++,de.scale,de.scale)}const he=ee.launchDirection;if(he&&G===Math.ceil(ee.height)){const ce=ma(ee,ee.height-1),de=_c(ee.u,ee.v,ce.rise,Ce),Oe=ce.scale*(ee.arrowScale??1),Ne=-(ee.turnRotation??0);if(g==="ready")return D(s.arrowSprites[he],r.markerArt,{x:de.x,y:de.y,z:Y},se++,Oe,Oe).rotation.z=Ne,se+Math.max(1,ie.cells.length);D(s.arrows[he],r.arrowShadow,{x:de.x-2,y:de.y-5,z:Y},se++,Oe*1.06,Oe*1.06).rotation.z=Ne,D(s.arrows[he],r.arrowSide,{x:de.x,y:de.y-3,z:Y},se++,Oe,Oe).rotation.z=Ne,D(s.arrows[he],r.arrowBevel,{x:de.x,y:de.y,z:Y},se++,Oe,Oe).rotation.z=Ne,D(s.arrows[he],ee.id===h?.selectedStackId?r.selectedArrow:r.arrow,{x:de.x,y:de.y+1,z:Y+.03+ee.height*1e-5},se++,Oe*.9,Oe*.9).rotation.z=Ne}return se+Math.max(1,ie.cells.length)}function H(ee){f=ee,h&&(h={...h,projection:f}),a.position.set(f.originX-ut.width/2,(ut.height/2-f.originY)*bn,0),a.scale.set(f.scale,f.scale*bn,1),o.position.copy(a.position),o.scale.copy(a.scale)}function Z(ee){if(d||(a.clear(),C.length=0,h=ee,H(ee.projection??cn(ee.level,ee.stacks)),!f))return;const ie={...f,originX:ut.width/2,originY:ut.height/2,scale:1},Ce=[...ee.level.cells].sort(ls);if(l!==ee.level){o.clear(),l=ee.level;let fe=-8500;for(const G of Ce){if(G.kind==="blocked")continue;const Y=vc(G.u,G.v,0,ie);if(A){D(s.stoneSprites[xv(G.u,G.v)],r.stoneArt,{x:Y.x,y:Y.y-12-tr,z:0},fe++,1,1,o);continue}for(let se=Cc-1;se>=0;se--)D(s.stoneSlab,r.landscape,{x:Y.x,y:Y.y-12-tr-se*xo,z:0},fe++,1,1,o)}}let _e=1;for(const fe of gv(ee.level,ee.stacks)){if(fe.kind==="stack"){_e=N(fe.stack,ee.level,ie,_e+2,fe.firstLayer,fe.endLayer);continue}const G=fe.cell,Y=vc(G.u,G.v,0,ie),se=(G.u+G.v+1e3)*1e-5,he=ee.stacks.some(ce=>Math.abs(ce.u-G.u)<.01&&Math.abs(ce.v-G.v)<.01&&ma(ce,0).rise<.15);if(u==="ready"?(D(s.yellowSprite,r.tileArt,{x:Y.x,y:Y.y,z:se},_e++),he&&D(s.coveredYellowSprite,r.tileArt,{x:Y.x,y:Y.y,z:se},_e++)):(D(s.floorSide,he?r.coveredFloorSide:r.floorSide,{x:Y.x,y:Y.y,z:se},_e++),D(s.floorBevel,he?r.coveredFloorBevel:r.floorBevel,{x:Y.x,y:Y.y,z:se},_e++),D(s.floor,r.floor,{x:Y.x,y:Y.y,z:se},_e++)),G.kind==="redirect"&&G.direction&&!ee.stacks.some(ce=>ce.u===G.u&&ce.v===G.v)){if(g==="ready"){const Oe=D(s.chevronSprites[G.direction],r.chevronArt,{x:Y.x,y:Y.y,z:se},_e++);C.push({mesh:Oe,x:Y.x,y:Y.y,direction:G.direction});continue}const ce=D(s.chevrons[G.direction],r.chevronSide,{x:Y.x,y:Y.y-3,z:se},_e++);C.push({mesh:ce,x:Y.x,y:Y.y-3,direction:G.direction});const de=D(s.chevrons[G.direction],r.chevron,{x:Y.x,y:Y.y,z:se+.002},_e++);C.push({mesh:de,x:Y.x,y:Y.y,direction:G.direction})}}U()}function J(ee){d||(c={width:Math.max(1,ee.width),height:Math.max(1,ee.height),pixelRatio:Math.min(Math.max(1,ee.pixelRatio),2)},e.setPixelRatio(c.pixelRatio),e.setSize(c.width,c.height,!1),U())}function U(){if(d||c.width<=0||c.height<=0)return;const ee=vv(T,E),ie=E?.7:(1-Math.cos(T*Math.PI*2/1.8))/2;for(const se of[r.hintArt,r.hintTop,r.hintBevel,r.hintSide])se.color.setRGB(1.2+ie*.6,.72+ie*.4,.22+ie*.12);r.chevron.color.copy(S).lerp(b,.85+ee.intensity*.15),r.chevronArt.color.setScalar(.94+ee.intensity*.06);for(const se of C){const he=dr[se.direction],ce=he.u-he.v,de=he.u+he.v,Oe=Math.hypot(ce,de)||1;se.mesh.position.x=se.x+ce/Oe*ee.offset,se.mesh.position.y=se.y+de/Oe*ee.offset}e.setScissorTest(!1),e.setViewport(0,0,c.width,c.height),e.clear(!0,!0,!0);const Ce=Math.min(c.width/ut.width,c.height/ut.height),_e=ut.width*Ce,fe=ut.height*Ce,G=(c.width-_e)/2,Y=(c.height-fe)/2;e.setScissorTest(!0),e.setScissor(G,Y,_e,fe),e.setViewport(G,Y,_e,fe),h&&e.render(t,i),e.setScissorTest(!1)}function X(ee,ie){return f=ie.projection??cn(ie.level,ie.stacks),rd(ad(ee),ie.stacks,f)}function te(){return Object.freeze({geometries:e.info.memory.geometries,textures:e.info.memory.textures,programs:e.info.programs?.length??0,children:a.children.length+o.children.length})}function Q(){d||(d=!0,n.removeEventListener("webglcontextlost",R),n.removeEventListener("webglcontextrestored",L),a.clear(),o.clear(),s.stoneSprites.forEach(ee=>ee.dispose()),x.dispose(),s.stoneSlab.dispose(),s.floor.dispose(),s.floorBevel.dispose(),s.floorSide.dispose(),s.whiteSprite.dispose(),s.coveredWhiteSprite.dispose(),s.yellowSprite.dispose(),s.coveredYellowSprite.dispose(),Object.values(s.arrowSprites).forEach(ee=>ee.dispose()),Object.values(s.chevronSprites).forEach(ee=>ee.dispose()),m.dispose(),M.dispose(),s.shadow.dispose(),s.tileTop.dispose(),s.tileBevel.dispose(),s.tileSide.dispose(),Object.values(s.arrows).forEach(ee=>ee.dispose()),Object.values(s.chevrons).forEach(ee=>ee.dispose()),Object.values(r).forEach(ee=>ee.dispose()),e.dispose())}return Object.freeze({ready:p,setView:Z,setProjection:H,resize:J,render:U,pickStack:X,resourceCounts:te,artworkStatus:()=>({tiles:u,markers:g}),setPresentationTime(ee,ie){T=ee,E=ie},setContextCallbacks(ee){I=ee},dispose:Q})}function Av(){return Object.freeze({setView(){},resize(){},render(){},pickStack(){},resourceCounts:()=>Object.freeze({geometries:0,textures:0,programs:0,children:0}),dispose(){}})}function xc(n,e={}){const t=e.replaceCanvas?n.cloneNode(!1):n;t!==n&&n.parentNode?.replaceChild(t,n);try{if(e.mode==="unsupported")throw new Error("Simulated unavailable WebGL");return Object.freeze({renderer:(e.webglFactory??Tv)(t),canvas:t,mode:"webgl",supported:!0})}catch{return Object.freeze({renderer:Av(),canvas:t,mode:"unsupported",supported:!1,message:"Не удалось запустить Three.js: WebGL недоступен. Перезагрузите игру или откройте другой браузер."})}}const ga=["scale","originX","originY"],va=16,wv={scale:5e-6,originX:.005,originY:.005},Cv={scale:5e-5,originX:.05,originY:.05};function Rv(){let n,e,t;const i={scale:0,originX:0,originY:0};return{reset(r){n=e=t=r;for(const s of ga)i[s]=0},synchronize(r=n){n=e=r},target(r){if(!n){n=e=t=r;return}t=r},update(r){if(!n||!t||!Number.isFinite(r)||r<=0)return!1;e=n;const s={...n,layerRise:t.layerRise},a=Math.exp(-va*r);for(const o of ga){const l=n[o]-t[o],c=i[o]+va*l;s[o]=t[o]+(l+c*r)*a,i[o]=(i[o]-va*c*r)*a,Math.abs(s[o]-t[o])<wv[o]&&Math.abs(i[o])<Cv[o]&&(s[o]=t[o],i[o]=0)}return n=Object.freeze(s),ga.some(o=>n[o]!==e[o])},snapshot(r=1){if(!n||!e||r===1)return n;const s=Math.max(0,Math.min(1,r));return Object.freeze({scale:e.scale+(n.scale-e.scale)*s,originX:e.originX+(n.originX-e.originX)*s,originY:e.originY+(n.originY-e.originY)*s,layerRise:n.layerRise})}}}const gt=Object.freeze({stepMs:200,contact:.65,turnMs:80,arrowAppearMs:160,stopMs:700,reducedStepMs:80,reducedTurnMs:60,reducedArrowCollapseMs:30,reducedArrowAppearMs:30,reducedStopMs:70}),Sc=Object.freeze({victoryDelayMs:100,failureDelayMs:600,ribbonMs:250,shineDelayMs:300,shineMs:250,fadeMs:180}),er=n=>n*n*(3-2*n);function Lv(n,e){const t=Math.max(0,Math.min(1,n));return e?er(t):t<.65?1.12*er(t/.65):1.12-.12*er((t-.65)/.35)}function Pv(n={}){let e=[],t=0,i=0,r=0,s=!1,a=!1,o=!1,l=!1,c=1,f=!1,h=[],d=[],u=[],g=Object.freeze({active:!1,elapsedMs:0,durationMs:0,stacks:[]});function v(){if(!a||!e.length)return Object.freeze({active:!1,elapsedMs:t,durationMs:i,stacks:d});const x=f?i-t:t;if(f&&t===0)return Object.freeze({active:!0,elapsedMs:t,durationMs:i,stacks:h});let T=0;for(const E of e){const C=Math.max(0,Math.min(1,(x-T)/E.duration));if(C<1){if((E.kind==="stop"||E.kind==="turn")&&E.stackId){const D=C*E.duration*c,N=l?gt.reducedArrowCollapseMs:gt.turnMs,H=l?gt.reducedArrowAppearMs:gt.arrowAppearMs,Z=E.from.map(J=>{if(J.id!==E.stackId)return J;const U=D+1e-9<N,X=U?1-er(D/N):E.direction?Lv((D-E.revealAtMs)/H,l):0;return{...J,...U?{}:{launchDirection:E.direction},...!l&&(E.kind==="stop"||E.waveElapsedMs!==void 0)?mc(J.height,(E.waveElapsedMs??0)+D):{},arrowScale:X}});return Object.freeze({active:!0,elapsedMs:t,durationMs:i,stacks:Z,event:E.kind})}if(E.kind!=="move"||!E.stackId||!E.start||!E.end)return Object.freeze({active:!0,elapsedMs:t,durationMs:i,stacks:E.from,event:E.kind});const S=Math.min(1,C/gt.contact),b=er(S),I=C>=gt.contact,R=E.heightTo-E.heightFrom,L=E.from.flatMap(D=>{if(D.id===E.absorbedId&&I)return[];if(D.id!==E.stackId)return[D];const N=I?E.heightTo:E.heightFrom,H=R>0?Math.max(3,R*.75):1.1,Z=I?0:R*b+(l?0:4*H*b*(1-b));return[{...D,u:E.start.u+(E.end.u-E.start.u)*b,v:E.start.v+(E.end.v-E.start.v)*b,height:N,lift:Z,collecting:!!E.absorbedId&&!I,...!l&&I&&R?mc(N,(C-gt.contact)*E.duration*c):{}}]});return Object.freeze({active:!0,elapsedMs:t,durationMs:i,stacks:L,event:E.absorbedId&&I?"merge":"move"})}T+=E.duration}return Object.freeze({active:!1,elapsedMs:t,durationMs:i,stacks:e.at(-1)?.to??d})}function p(x){if(o)return;A(),r=x.generationId,f=!!x.reverse,l=!!x.reducedMotion,c=Math.max(.25,Math.min(3,x.speed??1)),d=x.stacks.map(U=>({...U}));let T=d.map(U=>({...U,...U.u===x.steps[0]?.from.u&&U.v===x.steps[0]?.from.v?{launchDirection:x.steps[0].direction}:{}}));const E=[],C=[];let S=0;const b=U=>{E.push(U),T=U.to.map(X=>({...X}))};x.steps.forEach((U,X)=>{const te=T.find(fe=>fe.u===U.from.u&&fe.v===U.from.v);if(!te)return;const Q=U.absorbed?T.find(fe=>fe.u===U.to.u&&fe.v===U.to.v):void 0,ee=T;let ie=T.filter(fe=>fe.id!==Q?.id).map(fe=>fe.id===te.id?{...fe,u:U.to.u,v:U.to.v,height:U.movingHeightAfter}:fe);const Ce=(l?gt.reducedStepMs:gt.stepMs)/c;b({kind:"move",duration:Ce,from:ee,to:ie,stackId:te.id,start:U.from,end:U.to,heightFrom:U.movingHeightBefore,heightTo:U.movingHeightAfter,...Q?{absorbedId:Q.id}:{}}),U.absorbed&&C.push(Object.freeze({atMs:S+Ce*gt.contact,cue:"merge"})),S+=Ce;const _e=x.events.find(fe=>fe.type==="turn"&&fe.stepIndex===X);if(_e?.type==="turn"&&_e.direction!==te.launchDirection){C.push(Object.freeze({atMs:S,cue:"turn"}));const fe=T.map(he=>he.id===te.id?{...he,launchDirection:_e.direction}:he),G=!l&&U.absorbed?(1-gt.contact)*gt.stepMs:void 0,Y=l?gt.reducedArrowCollapseMs:Math.max(gt.turnMs,G===void 0?0:pc(U.movingHeightAfter)-G),se=(Y+(l?gt.reducedArrowAppearMs:gt.arrowAppearMs))/c;b({kind:"turn",duration:se,from:T,to:fe,stackId:te.id,direction:_e.direction,revealAtMs:Y,...G!==void 0?{waveElapsedMs:G}:{}}),S+=se}});const I=x.steps.length?d.find(U=>U.u===x.steps[0]?.from.u&&U.v===x.steps[0]?.from.v)?.id:void 0,R=T.find(U=>U.id===I)?.id??I,L=x.steps.at(-1),N=(L?.absorbed?d.find(U=>U.u===L.to.u&&U.v===L.to.v&&U.id!==R):void 0)?.launchDirection,H=T.map(U=>U.id===R?{id:U.id,u:U.u,v:U.v,height:U.height,...N?{launchDirection:N}:{}}:U),Z=l?gt.reducedArrowCollapseMs:pc(T.find(U=>U.id===R)?.height??1),J=Math.max(l?gt.reducedStopMs:gt.stopMs,N?Z+(l?gt.reducedArrowAppearMs:gt.arrowAppearMs):0)/c;Math.max(0,...T.map(U=>U.height))>=3&&C.push(Object.freeze({atMs:S+Math.min(120/c,J),cue:"settle"})),E.push({kind:"stop",duration:J,from:T,to:H,...N?{direction:N}:{},revealAtMs:Z,...R?{stackId:R}:{}}),h=x.finalStacks??H,u=Object.freeze(f?[]:C.sort((U,X)=>U.atMs-X.atMs)),e=E,t=0,i=E.reduce((U,X)=>U+X.duration,0),a=!0,s=!1,g=v(),e.length||m()}function m(){a&&(a=!1,t=i,g=Object.freeze({active:!1,elapsedMs:t,durationMs:i,stacks:f?d:h}),n.onComplete?.(r))}function M(x){if(o||!a||s||!Number.isFinite(x)||x<=0)return g;const T=t;t=Math.min(i,t+x*1e3);for(const E of u)if(E.atMs>T&&E.atMs<=t)try{n.onCue?.(E.cue)}catch{}return g=v(),t>=i&&m(),g}function A(){a=!1,s=!1,e=[],t=0,i=0,d=[],h=[],u=[],f=!1,g=Object.freeze({active:!1,elapsedMs:0,durationMs:0,stacks:[]})}return Object.freeze({start:p,update:M,snapshot:()=>g,pause(x){s=x},reset:A,dispose(){o||(A(),o=!0)}})}const po="__whiteTowerStorage";class mo extends Error{constructor(e){super("Another tab saved newer progress. Reload to continue from that save."),this.current=e}}function gs(n){if(!n||typeof n!="object"||Array.isArray(n))return{revision:0,value:n};const e=n,t=e[po];if(!t||!Number.isSafeInteger(t.revision)||t.revision<0)return{revision:0,value:n};const i={...e};return delete i[po],{revision:t.revision,value:t.deleted?void 0:t.primitive?i.value:i}}function Nu(n,e){const t=!!n&&typeof n=="object"&&!Array.isArray(n);return{...t?n:{value:n},[po]:{revision:e,deleted:n===void 0,primitive:!t}}}function Uu(n,e,t){let i=0,r=!1,s=!1;async function a(o,l){if(s&&!l?.replace)throw new mo(gs(await e()).value);const c=await t(o,l?.replace?void 0:i);if(!c.accepted)throw s=!0,new mo(c.value);i=c.revision,s=!1}return{mode:n,async read(){const o=gs(await e());return r||(i=o.revision,r=!0),o.value},write:a,clear:()=>a(void 0,{replace:!0})}}const Kn="white-tower.save.v1";function Iv(){return new Promise((n,e)=>{if(typeof indexedDB>"u"){e(new Error("IndexedDB unavailable"));return}const t=indexedDB.open("white-tower",1);t.onupgradeneeded=()=>{t.result.objectStoreNames.contains("save")||t.result.createObjectStore("save")},t.onerror=()=>e(t.error??new Error("IndexedDB open failed")),t.onsuccess=()=>{const i=t.result;n(Uu("indexeddb",()=>new Promise((a,o)=>{const c=i.transaction("save","readonly").objectStore("save").get(Kn);c.onsuccess=()=>a(c.result),c.onerror=()=>o(c.error)}),(a,o)=>new Promise((l,c)=>{const f=i.transaction("save","readwrite"),h=f.objectStore("save"),d=h.get(Kn);let u;d.onsuccess=()=>{const g=gs(d.result),v=o===void 0||g.revision===o;u={accepted:v,revision:g.revision+(v?1:0),value:v?a:g.value},v&&h.put(Nu(a,u.revision),Kn)},f.oncomplete=()=>l(u),f.onerror=f.onabort=()=>c(f.error??new Error("IndexedDB write failed"))})))}})}function Dv(){if(typeof localStorage>"u")throw new Error("localStorage unavailable");if(typeof navigator>"u"||!navigator.locks)throw new Error("Safe localStorage saves require Web Locks; using temporary progress.");const n=`${Kn}.probe`;localStorage.setItem(n,"1"),localStorage.removeItem(n);const e=async()=>{const t=localStorage.getItem(Kn);return t===null?void 0:JSON.parse(t)};return Uu("localStorage",e,(t,i)=>navigator.locks.request(Kn,async()=>{const r=gs(await e()),s=i===void 0||r.revision===i,a=r.revision+(s?1:0);return s&&localStorage.setItem(Kn,JSON.stringify(Nu(t,a))),{accepted:s,revision:a,value:s?t:r.value}}))}function Nv(n={}){const e=n.adapters??[Iv,Dv];let t={mode:"memory",async read(){return r},async write(u){r=u}},i=-1,r,s="memory",a=Promise.resolve(),o="",l=!1;const c=(async()=>{for(let u=0;u<e.length;u++)try{const g=await e[u]();await g.read(),t=g,i=u,s=g.mode;break}catch(g){o=g instanceof Error?g.message:String(g)}return s})();async function f(){await c;try{const u=await t.read();return r=u,u}catch(u){o=u instanceof Error?u.message:String(u);for(let g=i+1;g<e.length;g++)try{const v=await e[g](),p=await v.read();return t=v,i=g,s=v.mode,r=p,p}catch(v){o=v instanceof Error?v.message:String(v)}return t={mode:"memory",async read(){return r},async write(g){r=g}},s="memory",r}}function h(u,g){return a=a.then(async()=>{await c,r=u;try{await t.write(u,g),l=!1}catch(v){if(v instanceof mo){l=!0,r=v.current,o=v.message;return}o=v instanceof Error?v.message:String(v);let p=!1;for(let m=i+1;m<e.length;m++)try{const M=await e[m]();await M.read(),await M.write(u,g),t=M,i=m,s=M.mode,p=!0;break}catch(M){o=M instanceof Error?M.message:String(M)}p||(t={mode:"memory",async read(){return r},async write(m){r=m}},i=e.length,s="memory")}}),a}function d(){return a=a.then(async()=>{await c,r=void 0,l=!1;try{await t.clear?.();return}catch(u){o=u instanceof Error?u.message:String(u)}for(let u=i+1;u<e.length;u++)try{const g=await e[u]();await g.read(),await g.clear?.(),t=g,i=u,s=g.mode;return}catch(g){o=g instanceof Error?g.message:String(g)}t={mode:"memory",async read(){return r},async write(u){r=u},async clear(){r=void 0}},i=e.length,s="memory"}),a}return Object.freeze({ready:c,read:f,write:h,clear:d,mode:()=>s,memoryOnly:()=>s==="memory",conflicted:()=>l,unavailableReason:()=>o,flush:()=>a})}const zo=1,Uv=new Set(["SE","SW","NW","NE","E","W","N","S"]),ur=n=>typeof n=="object"&&n!==null&&!Array.isArray(n);function Ou(n){return Object.freeze({schemaVersion:zo,...n})}function $r(n,e,t){if(!ur(n)||n.schemaVersion!==zo||!["1.0.0","1.1.0","1.2.0","1.3.0","1.4.0"].includes(String(n.contentVersion))||typeof n.selectedLevelId!="string")return n;const i=e.levels.find(r=>r.id===n.selectedLevelId);if(!i)return n;if(n.levelChecksum!==i.sha256){if(!t||t.id!==i.id)return n;const r={...n,contentVersion:e.contentVersion,levelChecksum:i.sha256,committedState:xa(t),history:[]};return go(r,e,new Map([[t.id,t]])).ok?r:n}return{...n,contentVersion:e.contentVersion}}function Mc(n,e){if(!ur(n)||n.levelId!==e.id||!Number.isSafeInteger(n.moveCount)||Number(n.moveCount)<0||!Array.isArray(n.stacks)||!n.stacks.length)return!1;let t=0;const i=new Set,r=new Set(e.cells.map(s=>`${s.u},${s.v}`));for(const s of n.stacks){if(!ur(s)||!Number.isSafeInteger(s.u)||!Number.isSafeInteger(s.v)||!Number.isSafeInteger(s.height)||Number(s.height)<1||!r.has(`${s.u},${s.v}`)||typeof s.id!="string"||!s.id||s.launchDirection!==void 0&&!Uv.has(String(s.launchDirection)))return!1;const a=`${s.u},${s.v}`;if(i.has(a))return!1;i.add(a),t+=Number(s.height)}return t===e.totalTiles}function go(n,e,t){if(!ur(n))return{ok:!1,reason:"Save must be an object."};if(n.schemaVersion!==zo)return{ok:!1,reason:`Unsupported save schema: ${String(n.schemaVersion)}.`};if(n.contentVersion!==e.contentVersion||typeof n.selectedLevelId!="string")return{ok:!1,reason:"Save content version or selected level is invalid."};const i=e.levels.find(s=>s.id===n.selectedLevelId),r=t.get(n.selectedLevelId);return!i||!r||n.levelChecksum!==i.sha256?{ok:!1,reason:"Saved level checksum does not match current content."}:!Number.isSafeInteger(n.unlockedLevel)||Number(n.unlockedLevel)<1||Number(n.unlockedLevel)>e.levels.length+1?{ok:!1,reason:"Unlocked level is outside the catalog."}:!Array.isArray(n.completedLevelIds)||n.completedLevelIds.some(s=>typeof s!="string"||!e.levels.some(a=>a.id===s))?{ok:!1,reason:"Completed levels contain unknown IDs."}:!ur(n.settings)||!Mc(n.committedState,r)||!Array.isArray(n.history)||n.history.length>50||n.history.some(s=>!Mc(s,r))?{ok:!1,reason:"Saved game state or undo history is invalid."}:{ok:!0,value:Ou({contentVersion:n.contentVersion,levelChecksum:n.levelChecksum,selectedLevelId:n.selectedLevelId,unlockedLevel:Number(n.unlockedLevel),completedLevelIds:Object.freeze([...new Set(n.completedLevelIds)]),settings:Object.freeze({...n.settings}),committedState:n.committedState,history:Object.freeze(n.history.slice(-50))})}}const Fu={en:{"service.loading":"Loading level…","service.contentError":"Could not load White Tower content. Check the connection and retry.","service.graphicsError":"Graphics could not start. Try another browser or reload.","service.nextError":"Could not load the next level. Try again.","service.notReady":"Next level is not ready.","service.moreLevels":"More levels are coming soon.",settings:"Settings",back:"BACK TO GAME",levels:"Choose level",backSettings:"BACK TO SETTINGS",hint:"Hint",fail:"FAIL!",reducedMotion:"Reduce motion",language:"Language",highContrast:"High contrast",sound:"Sound effects",music:"Music",volume:"Volume",progress:"Campaign progress",clearProgress:"Clear progress",clearQuestion:"Clear all completed levels and saved attempts?",confirmClear:"CLEAR PROGRESS",cancel:"CANCEL",locked:"Locked",completed:"Completed",current:"Current level",memory:"Progress is temporary because browser storage is unavailable.",retry:"Retry storage",audioLater:"Short synthesized effects play after your first input.",level:"Level",undo:"BACK",next:"NEXT",win:"COMPLETED!",campaignComplete:"Campaign complete. Choose any unlocked level.",chooseLevel:"CHOOSE LEVEL",tapHighlighted:"Tap the highlighted arrow",searching:"Searching for a safe move…",hintTimeout:"Search timed out. You can try Undo; no dead end was proven.",noSolution:"No solution exists from this state.",searchingPrevious:"Checking whether the previous move can be undone…","action.undo":"UNDO","action.next":"NEXT","win.title":"LEVEL COMPLETED!","tutorial.tap":"Tap the arrow","hint.undo":"Undo the last move","game.stuck":"Try undoing a move","action.retry":"Retry","hint.loading":"Searching for a safe move…","a11y.selection":"Selected stack {index} of {count}.","a11y.move":"Move started.","a11y.undo":"Move undone.","a11y.restart":"Level restarted.","a11y.menu":"Settings opened. Press Escape to return to the game."},ru:{"service.loading":"Загрузка уровня…","service.contentError":"Не удалось загрузить игру. Проверьте соединение и повторите попытку.","service.graphicsError":"Не удалось запустить графику. Попробуйте другой браузер или повторите загрузку.","service.nextError":"Не удалось загрузить следующий уровень. Повторите попытку.","service.notReady":"Следующий уровень ещё не готов.","service.moreLevels":"Новые уровни скоро появятся.",settings:"Настройки",back:"ВЕРНУТЬСЯ В ИГРУ",levels:"Выбор уровня",backSettings:"К НАСТРОЙКАМ",hint:"Подсказка",fail:"НЕУДАЧА!",reducedMotion:"Уменьшить движение",language:"Язык",highContrast:"Высокая контрастность",sound:"Звуковые эффекты",music:"Музыка",volume:"Громкость",progress:"Прогресс кампании",clearProgress:"Сбросить прогресс",clearQuestion:"Удалить пройденные уровни и сохранённые попытки?",confirmClear:"СБРОСИТЬ ПРОГРЕСС",cancel:"ОТМЕНА",locked:"Закрыт",completed:"Пройден",current:"Текущий уровень",memory:"Прогресс временный: хранилище браузера недоступно.",retry:"Повторить загрузку",audioLater:"Короткие синтезированные звуки включаются после первого действия.",level:"Уровень",undo:"НАЗАД",next:"ДАЛЕЕ",win:"ПРОЙДЕН!",campaignComplete:"Кампания пройдена. Выберите открытый уровень.",chooseLevel:"ВЫБРАТЬ УРОВЕНЬ",tapHighlighted:"Нажмите на выделенную стрелку",searching:"Ищу безопасный ход…",hintTimeout:"Поиск не завершился. Можно отменить ход; тупик не доказан.",noSolution:"Из этого состояния решения нет.",searchingPrevious:"Проверяю, можно ли отменить предыдущий ход…","action.undo":"НАЗАД","action.next":"ДАЛЕЕ","win.title":"УРОВЕНЬ ПРОЙДЕН!","tutorial.tap":"Нажмите на стрелку","hint.undo":"Отмените последний ход","game.stuck":"Попробуйте отменить ход","action.retry":"Повторить","hint.loading":"Ищу безопасный ход…","a11y.selection":"Выбрана стопка {index} из {count}.","a11y.move":"Ход запущен.","a11y.undo":"Ход отменён.","a11y.restart":"Уровень перезапущен.","a11y.menu":"Настройки открыты. Нажмите Escape, чтобы вернуться в игру."}};function Ov(n,e){return Fu[n][e]}function We(n,e){return Fu.en[e]}function yi(n){const e=typeof n=="object"&&n!==null?n:{};return Object.freeze({language:"en",reducedMotion:e.reducedMotion===!0,highContrast:e.highContrast===!0,soundEnabled:e.soundEnabled!==!1,musicEnabled:typeof e.musicEnabled=="boolean"?e.musicEnabled:e.soundEnabled!==!1,soundVolume:typeof e.soundVolume=="number"&&Number.isFinite(e.soundVolume)?Math.max(0,Math.min(1,e.soundVolume)):.4,tutorialCompleted:e.tutorialCompleted===!0})}const qi=(n,e)=>({status:"cancelled",requestId:n,generationId:e,explored:0,elapsedMs:0});function Fv(n=()=>new Worker(new URL("/White-Tower-Play/assets/solver-worker-DPcwYnWJ.js",import.meta.url),{type:"module"})){let e,t=0,i=!1;const r=new Map;function s(h){for(const[d,u]of r)u.resolve(h?{status:"error",requestId:d,generationId:u.generationId,explored:0,elapsedMs:0,message:h}:qi(d,u.generationId));r.clear()}function a(){return e||(e=n(),e.onmessage=h=>{const d=h.data,u=r.get(d.requestId);u&&(r.delete(d.requestId),u.generationId!==t||d.generationId!==t?u.resolve(qi(d.requestId,u.generationId)):u.resolve(d))},e.onerror=h=>s(h.message||"Solver worker failed."),e)}function o(h,d,u){return i?Promise.resolve(qi(u.requestId,u.generationId)):!u.requestId||!Number.isFinite(u.budgetMs)||u.budgetMs<0?Promise.resolve({status:"error",requestId:u.requestId,generationId:u.generationId,explored:0,elapsedMs:0,message:"Invalid request options."}):u.generationId<t?Promise.resolve(qi(u.requestId,u.generationId)):(u.generationId>t&&c(u.generationId),r.has(u.requestId)?Promise.resolve({status:"error",requestId:u.requestId,generationId:u.generationId,explored:0,elapsedMs:0,message:"Duplicate request ID."}):new Promise(g=>{r.set(u.requestId,{generationId:u.generationId,resolve:g});try{a().postMessage({type:"solve",requestId:u.requestId,generationId:u.generationId,budgetMs:u.budgetMs,level:h,state:d})}catch(v){r.delete(u.requestId),g({status:"error",requestId:u.requestId,generationId:u.generationId,explored:0,elapsedMs:0,message:v instanceof Error?v.message:String(v)})}}))}function l(h){if(!(!r.has(h)||!e))try{e.postMessage({type:"cancel",requestId:h})}catch{}}function c(h){if(!(i||h<=t)){t=h;for(const[d,u]of r)if(u.generationId!==t){try{e?.postMessage({type:"cancel",requestId:d})}catch{}u.resolve(qi(d,u.generationId)),r.delete(d)}}}function f(){i||(i=!0,s(),e?.terminate(),e=void 0)}return Object.freeze({solve:o,cancel:l,invalidate:c,dispose:f})}const Kr=Object.freeze({kind:"idle"});function Bv(n,e){let t=0,i=0,r="",s,a=!1;function o(){a||(s!==void 0&&clearTimeout(s),s=void 0,r&&n.cancel(r),r="",t++,n.invalidate(t),e(Kr))}async function l(f,h,d){if(a)return;o();const u=t,g=performance.now(),v=`hint-${++i}`;r=v,e({kind:"idle"}),s=setTimeout(()=>{!a&&t===u&&r&&e({kind:"searching"})},300);const p=()=>!a&&t===u;try{const m=await n.solve(f,h,{requestId:v,generationId:u,budgetMs:2e3});if(!p())return;if(m.status==="solved"){s!==void 0&&clearTimeout(s),s=void 0;const M=m.path[0];e(M?{kind:"move",move:M}:Kr),r="";return}if(m.status==="unsolvable"){const M=d.at(-1),A=Math.max(0,2e3-(performance.now()-g));if(!M||A<=0){s!==void 0&&clearTimeout(s),s=void 0,e({kind:"deadlock"}),r="";return}s===void 0&&e({kind:"searching"});const x=`hint-${i}-undo`;r=x;const T=await n.solve(f,M,{requestId:x,generationId:u,budgetMs:A});if(!p())return;s!==void 0&&clearTimeout(s),s=void 0,T.status==="solved"?e({kind:"undo-proven"}):T.status==="unsolvable"?e({kind:"deadlock"}):T.status==="timeout"?e({kind:"undo-suggestion"}):e(T.status==="cancelled"?Kr:{kind:"error"}),r="";return}s!==void 0&&clearTimeout(s),s=void 0,m.status==="timeout"?e(d.length?{kind:"undo-suggestion"}:{kind:"timeout"}):e(m.status==="cancelled"?Kr:{kind:"error"}),r=""}catch{p()&&(e({kind:"error"}),r="")}}function c(){a||(o(),a=!0)}return Object.freeze({request:l,cancel:o,dispose:c})}function kv(n,e="webgl",t={}){const i=t.audio,r=t.analytics;let s=0;const a=new Set;function o(P,F={}){const O=u.snapshot();r?.track(P,{...r.context(),level_id:O.level?.id??null,content_version:M?.contentVersion??null,active_ms:Math.round(s*1e3),move_count:O.committedState?.moveCount??0,...F})}function l(P=!0,F=!1){s=0,A&&M&&r?.beginAttempt(A.id,M.contentVersion,F,P)}function c(P){const F=r?.context().attempt_id;P.phase==="Won"&&F&&!a.has(F)&&(a.add(F),o("wt_level_completed"),M?.levels.at(-1)?.id===P.level?.id&&o("wt_campaign_completed"))}let f=n,h=xc(n,{mode:e}),d=h.renderer;const u=_d(),g=Nv();let v=Promise.resolve();const p=Pv({onCue:P=>i?.play(P),onComplete:P=>{const F=u.snapshot().animation?.reverse,O=u.finishAnimation(P);O.phase==="Won"&&!F&&(i?.play("victory"),c(O)),Ie(O),Fe(),de(O)}});function m(P){const F=P.animation;p.start({stacks:F.sourceState.stacks,steps:F.steps,events:F.events,generationId:P.generationId,reducedMotion:Q.reducedMotion,reverse:F.reverse,finalStacks:F.nextState.stacks}),tt(p.snapshot().stacks,P)}let M,A,x=0,T=0,E,C,S;const b=Rv();let I=!1,R=!1,L=!1,D,N=!1,H="",Z=0,J,U=!1,X=1,Q=yi({reducedMotion:typeof window<"u"&&!!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches}),ee=0,ie=!1,Ce=Object.freeze({kind:"idle"}),_e,fe=0,G;const Y=Fv();let se;const he=Bv(Y,P=>{if(!R)if(Ce=P,P.kind!=="idle"&&P.kind!=="searching"&&(o("wt_hint_result",{result:P.kind,hint_latency_ms:se===void 0?0:Math.round(performance.now()-se)}),se=void 0),_e=void 0,fe=["move","undo-proven","undo-suggestion","deadlock","timeout","error"].includes(P.kind)?2.5:0,P.kind==="move"){const F=Xe().find(O=>O.u===P.move.u&&O.v===P.move.v);F&&(_e=F.id,pt(F.id))}else u.snapshot().phase!=="Animating"&&Ie()});function ce(){G!==void 0&&clearTimeout(G),G=void 0}function de(P=u.snapshot()){if(ce(),P.phase!=="Idle"||!P.committedState||P.committedState.stacks.length<2||Xe(P).length)return;const F=P.generationId;G=setTimeout(()=>{G=void 0;const O=u.snapshot();R||O.phase!=="Idle"||O.generationId!==F||Xe(O).length||(Ce=Object.freeze({kind:"deadlock"}),fe=2,o("wt_deadlock"))},600)}function Oe(){let P=u.snapshot();return P.phase==="Menu"&&(P=u.closeMenu(),Ie(P)),P.phase!=="Idle"||!P.level||!P.committedState?!1:(ce(),se=performance.now(),o("wt_hint_requested"),he.request(P.level,P.committedState,u.historySnapshot()),i?.play("hint"),!0)}function Ne(){Q.tutorialCompleted||(Q=yi({...Q,tutorialCompleted:!0}),ie=!1)}function Fe(){const P=u.snapshot(),F=M?.levels.find(Te=>Te.id===P.level?.id);if(!F||!P.level||!P.committedState)return v;const O=P.completedLevelIds;let V=1;for(;V<=M.levels.length&&O.includes(M.levels[V-1]?.id??"");)V++;X=Math.max(X,V);const oe=Ou({contentVersion:M.contentVersion,levelChecksum:F.sha256,selectedLevelId:P.level.id,unlockedLevel:X,completedLevelIds:O,settings:Q,committedState:P.committedState,history:u.historySnapshot()});return v=g.write(oe),v}function Xe(P=u.snapshot()){if(P.phase!=="Idle"||!P.level||!P.displayedState)return[];const F=new Map(P.level.cells.map(V=>[`${V.u},${V.v}`,V])),O=E??cn(P.level,P.displayedState.stacks);return P.displayedState.stacks.filter(V=>!!V.launchDirection||F.get(`${V.u},${V.v}`)?.kind==="redirect").map(V=>({stack:V,center:cs(V.u,V.v,V.height-1,O)})).sort((V,oe)=>V.center.y-oe.center.y||V.center.x-oe.center.x||V.stack.id.localeCompare(oe.stack.id)).map(({stack:V})=>V)}function Ie(P=u.snapshot()){if(!P.level||!P.committedState||R)return;T++;const F=Xe(P);F.length&&!F.some(oe=>oe.id===D)&&(D=F[0]?.id);const O=L?{...P.committedState,stacks:[{...P.committedState.stacks[0],height:P.level.totalTiles}]}:P.committedState,V=cn(P.level,O.stacks);S!==P.level?(S=P.level,b.reset(V),E=V):b.target(V),d.setView({...Mr(P.level,O,T,D,O.stacks,E),hintStackId:_e})}function tt(P,F=u.snapshot()){if(!(!F.level||!F.committedState||R)){if(T++,C!==F.generationId||!E){C=F.generationId;const O=F.animation?.steps.flatMap(V=>[V.from,V.to].map(oe=>({...oe,height:V.movingHeightAfter,lift:Math.max(3,V.movingHeightAfter*.75)})))??[];b.target(cn(F.level,[...F.displayedState.stacks,...F.committedState.stacks,...O]))}d.setView(Mr(F.level,F.committedState,T,D,P,E))}}function pt(P){return Xe().some(F=>F.id===P)?(D=P,Ie(),!0):!1}function Ct(P){if(U||!h.supported)return!1;const F=Xe().find(V=>V.id===P);if(!F)return!1;D=P,ce();const O=u.launch({u:F.u,v:F.v});return O.phase!=="Animating"?!1:(_e===P&&o("wt_hint_applied"),O.committedState.moveCount===1&&r?.track("wt_first_move",{...r.context(),active_ms:Math.round(s*1e3)},"first:"+r.context().attempt_id),o("wt_move_accepted",{input:matchMedia("(pointer:coarse)").matches?"touch":"pointer"}),i?.play("launch"),he.cancel(),Ne(),Fe(),m(O),!0)}function ot(){const P=u.snapshot();return he.cancel(),ie=!1,P.phase==="Menu"?(Ie(u.closeMenu()),o("wt_menu_closed"),i?.play("ui"),!0):P.phase==="Idle"||P.phase==="Won"?(Ie(u.openMenu()),o("wt_menu_opened"),i?.play("ui"),!0):!1}function ft(P){const F=u.snapshot(),O=F.displayedState?.stacks.find(V=>V.id===P);if(!(!O||!F.level))return Qr(cs(O.u,O.v,O.height-1,E??cn(F.level,F.displayedState.stacks)))}function z(P){const F=u.snapshot();if(R||!["webgl","unsupported"].includes(P)||!["Idle","Won","Menu"].includes(F.phase))return!1;const O=xc(f,{mode:P,replaceCanvas:!0}),V=d;return U=!1,h=O,d=O.renderer,f=O.canvas,Mt(),V?.dispose(),Ie(F),!0}function Mt(){d?.setContextCallbacks?.({lost(){R||(U=!0,o("wt_graphics_lost"),b.synchronize(E),H="Graphics context lost. Attempting to restore the current board.",Fe())},restored(){o("wt_graphics_restored"),!R&&(U=!1,H="",u.snapshot().phase==="Animating"?tt(p.snapshot().stacks):Ie(u.snapshot()))}})}async function Ke(P,F=!1){if(!M||R)throw new Error("Каталог ещё загружается.");const O=++Z;J?.abort(),J=new AbortController;const V=J;p.reset(),he.cancel(),ee=0,ie=!1,ce();const oe=u.snapshot();oe.phase==="Animating"&&Ie(u.finishAnimation(oe.generationId));const Te=await Jr(M,P,fetch,V.signal);R||O!==Z||(A=Te,L=!1,Ie(u.loadLevel(A)),F&&u.restoreCompleted([]),l(),await Fe(),de(u.snapshot()))}async function w(P){const F=M?.levels.findIndex(O=>O.id===P)??-1;return F<0||F+1>X||!["Menu","Idle","Won"].includes(u.snapshot().phase)?!1:(await Ke(P),!0)}function _(P){return Q=yi({...Q,...P}),o("wt_settings_changed",{sound:Q.soundEnabled,music:Q.musicEnabled}),i?.configure(Q),Fe(),Q}async function W(){return R||!M?!1:(await g.clear(),X=1,H="",await Ke(M.levels[0].id,!0),!0)}async function j(){const P=u.snapshot();if(R||P.phase!=="Won"||N)return{advanced:!1,message:We(Q.language,"service.notReady")};const F=M?.levels.findIndex(V=>V.id===P.level?.id)??-1,O=M?.levels[F+1];if(!O)return{advanced:!1,message:We(Q.language,"service.moreLevels")};N=!0;try{return await v,o("wt_next_level_requested"),await Ke(O.id),o("wt_next_level_started"),{advanced:!0}}catch{return o("wt_content_error",{stage:"next"}),{advanced:!1,message:We(Q.language,"service.nextError")}}finally{N=!1}}Mt();const re=(t.catalogReady??Ac()).then(async P=>{if(R)return;M=P,await g.ready;const F=await g.read();let O=$r(F,M);const V=O&&typeof O=="object"&&"selectedLevelId"in O&&typeof O.selectedLevelId=="string"?O.selectedLevelId:M.levels[0]?.id,oe=M.levels.some(ue=>ue.id===V)?M.levels.find(ue=>ue.id===V):M.levels[0];if(!oe)throw new Error("Catalog has no starting level.");if(A=await Jr(M,oe.id),R)return;if(O=$r(F,M,A),Ie(u.loadLevel(A)),O!==void 0){const ue=go(O,M,new Map([[A.id,A]]));if(ue.ok)X=ue.value.unlockedLevel,Q=yi(ue.value.settings),O!==F&&O.committedState!==F?.committedState&&(H=Q.language==="ru"?"Уровень обновлён. Попытка начата заново; прогресс и настройки сохранены.":"Level updated. This attempt was restarted; campaign progress and settings are preserved."),u.restoreCompleted(ue.value.completedLevelIds),u.restoreAttempt(ue.value.committedState,ue.value.history);else if(H=Q.language==="ru"?`Сохранение не восстановлено: ${ue.reason}`:`Save could not be restored: ${ue.reason}`,typeof O=="object"&&O!==null&&!Array.isArray(O)){const ye=O;Q=yi(ye.settings);const Ue=Array.isArray(ye.completedLevelIds)?ye.completedLevelIds.filter(ke=>typeof ke=="string"&&M.levels.some(k=>k.id===ke)):[];u.restoreCompleted(Ue),Number.isSafeInteger(ye.unlockedLevel)&&ye.unlockedLevel>=1&&ye.unlockedLevel<=M.levels.length+1&&(X=ye.unlockedLevel)}}Ie(u.snapshot()),(O===void 0||O!==F||O?.settings?.rendererMode!==void 0)&&Fe(),(Q.tutorialCompleted||u.snapshot().committedState?.moveCount)&&(ie=!1,Q.tutorialCompleted||(Ne(),Fe())),de(u.snapshot());let Te,pe;try{pe=await Promise.race([Y.solve(A,u.snapshot().committedState,{requestId:"startup-warmup",generationId:0,budgetMs:0}),new Promise((ue,ye)=>{Te=setTimeout(()=>ye(new Error("Hint worker startup timed out.")),15e3)})])}finally{clearTimeout(Te)}if(pe.status==="error")throw new Error("Could not prepare hint worker.");return l(!0,O!==void 0),A});return Object.freeze({ready:re,startAnalytics:l,resourceReady:()=>d.ready??Promise.resolve(),contentVersion:()=>M?.contentVersion,get canvas(){return f},rendererInfo(){return Object.freeze({mode:h.mode,supported:h.supported&&!U,artwork:d.artworkStatus?.(),message:U?"Восстанавливаем графику Three.js…":h.message})},setRendererMode:z,selectableStacks:Xe,selectedStackId(){return D},pointForStack:ft,selectStack:pt,launchStack:Ct,toggleMenu:ot,update(P){if(U||!h.supported)return;x+=P,(u.snapshot().phase==="Idle"||u.snapshot().phase==="Animating")&&(s+=P);const F=b.update(P);d.setPresentationTime?.(x,Q.reducedMotion);const O=u.snapshot();O.phase==="Animating"?tt(p.update(P).stacks):(F&&Ie(O),O.phase==="Idle"&&O.level?.id==="level-001"&&!Q.tutorialCompleted&&(ee+=P,ee>=2&&!ie&&(ie=!0,o("wt_tutorial_shown")))),fe>0&&(fe=Math.max(0,fe-P),fe||(Ce=Object.freeze({kind:"idle"})))},pause(P){I=P,b.synchronize(E),p.pause(P),P&&(he.cancel(),ce(),ie=!1)},render(P){U||(!I&&P!==void 0&&(E=b.snapshot(P)),E&&d.setProjection?.(E),d.render())},resize(P){d.resize(P)},reset(){x=0,L=!1,p.reset(),E&&b.reset(E),he.cancel(),ee=0,ie=!1,ce();const P=u.snapshot();if(P.phase==="Animating"&&u.finishAnimation(P.generationId),A){const F=u.restart();Ie(F),Fe(),de(F),F.attemptId!==P.attemptId&&(o("wt_restart"),l(),i?.play("restart"))}},async setLevelById(P){return Ke(P)},async selectLevel(P){return w(P)},updateSettings:_,async clearProgress(){return W()},async exportProgress(){await v;const P=await g.read();if(!P)throw new Error("No saved progress to export.");return JSON.stringify(P,null,2)},async importProgress(P){if(R||!M||u.snapshot().phase==="Animating")return!1;const F=$r(P,M);if(!F||typeof F!="object"||typeof F.selectedLevelId!="string")return!1;const O=await Jr(M,F.selectedLevelId),V=$r(P,M,O),oe=go(V,M,new Map([[O.id,O]]));return!oe.ok||R?!1:(Z++,J?.abort(),p.reset(),he.cancel(),ce(),A=O,X=oe.value.unlockedLevel,Q=yi(oe.value.settings),H=V!==P&&V.committedState!==P?.committedState?Q.language==="ru"?"Уровень обновлён. Попытка начата заново; прогресс и настройки сохранены.":"Level updated. This attempt was restarted; campaign progress and settings are preserved.":"",u.loadLevel(O),u.restoreCompleted(oe.value.completedLevelIds),u.restoreAttempt(oe.value.committedState,oe.value.history),i?.configure(Q),l(!1),o("wt_progress_imported"),Ie(u.snapshot()),v=g.write({...oe.value,settings:Q},{replace:!0}),await v,!0)},async nextLevel(){return j()},debugLoadLevel(P){const F=bc(P);if(!F.ok)throw new Error(`Invalid debug level: ${F.errors.map(V=>V.message).join(" ")}`);A=F.value,he.cancel(),ce(),ee=0,ie=!1,L=!1,p.reset();const O=u.loadLevel(A);return Ie(O),de(O),O},setTowerDemo(P){if(!A)return!1;L=!0;const F=u.snapshot();if(F.level&&F.committedState){const O=F.committedState.stacks[0];if(O){T++;const V={...F.committedState,stacks:[{...O,height:Math.max(1,Math.min(P??A.totalTiles,A.totalTiles))}]};E=cn(F.level,V.stacks),b.reset(E),d.setView(Mr(F.level,V,T,void 0,V.stacks,E))}}return!0},snapshot(){const P=u.snapshot(),F=M?.levels.findIndex(oe=>oe.id===P.level?.id)??-1,O=P.level?new Map(P.level.cells.filter(oe=>oe.kind==="redirect").map(oe=>[`${oe.u},${oe.v}`,oe.direction])):new Map,V=P.level&&P.committedState?P.committedState.stacks.filter(oe=>!!oe.launchDirection||O.has(`${oe.u},${oe.v}`)).map(oe=>({stack:oe,direction:O.get(`${oe.u},${oe.v}`)??oe.launchDirection??"unknown"})):[];return{elapsed:x,loaded:!!A,levelId:A?.id??null,...P,selectedStackId:D,hintStackId:_e,activeStacks:V,levelNumber:F>=0?F+1:1,levelCount:M?.levels.length??0,unlockedLevel:X,settings:Q,tutorialVisible:ie&&P.phase==="Idle",hintView:Ce,persistence:{memoryOnly:g.memoryOnly(),recoveryNotice:H}}},presentationSnapshot(){return p.snapshot()},cameraProjection(){return E},foundationScreenBounds(){if(!A||!E)return;const P=Lc(A,[]),F=E,O=Qr({x:F.originX+P.minX*F.scale,y:F.originY+P.minY*F.scale}),V=Qr({x:F.originX+P.maxX*F.scale,y:F.originY+P.maxY*F.scale});return{left:O.x,top:O.y,right:V.x,bottom:V.y}},resourceCounts(){return d.resourceCounts()},pickStack(P){const F=u.snapshot();if(F.phase!=="Idle"||!F.level||!F.displayedState)return;const O=d.pickStack(P,Mr(F.level,F.displayedState,T,D,F.displayedState.stacks,E));return O&&Xe(F).some(V=>V.id===O)?O:void 0},debugLaunch(P){he.cancel(),ce();const F=u.launch(P);return F.phase==="Animating"?(i?.play("launch"),Ne(),Fe(),m(F)):Ie(F),F},debugFinishAnimation(P){p.reset();const F=u.finishAnimation(P);return Ie(F),c(F),Fe(),de(F),F},requestHint:Oe,undo(){if(U||!h.supported||!u.snapshot().canUndo)return u.snapshot();he.cancel(),ce();const P=u.undo();return o("wt_undo"),i?.play("undo"),P.phase==="Animating"?m(P):(Ie(P),de(P)),Fe(),P},persistenceInfo(){return Object.freeze({mode:g.mode(),memoryOnly:g.memoryOnly(),reason:g.unavailableReason(),recoveryNotice:g.conflicted?.()?g.unavailableReason():H})},flushPersistence(){return g.flush()},dispose(){R||(R=!0,Z++,J?.abort(),ce(),he.dispose(),Y.dispose(),p.dispose(),u.dispose(),d.dispose())}})}const zv={logo:new URL("/White-Tower-Play/assets/355affb8c11cbb90975c14eb6c2192e6f34e46913a1e0c5e55ab20be8d6119cc-BPHyFsGU.webp",import.meta.url).href,campaignTower:new URL("/White-Tower-Play/assets/d6389becbf587108e4995d85529b8012cdf9e625d02c9fb18c2d08a774cca5f7-BE4OdW_V.webp",import.meta.url).href,reset:new URL("/White-Tower-Play/assets/78d87d2be35eb6a94cec4854b5c9b10c257ae22f9a137880e98d2b6b6ecf9769-DJKPyP_H.webp",import.meta.url).href,storage:new URL("/White-Tower-Play/assets/6c1235bb2dcf98a276996de08fecf8785802acc28ab984510e5351dad6eb3ddd-D5Yi741C.webp",import.meta.url).href,loading:new URL("/White-Tower-Play/assets/87741b2bb30ade096ea6a0dcfc8280924f18cc5558f77145767c19ab80735c55-DIgfvB0J.webp",import.meta.url).href,graphics:new URL("/White-Tower-Play/assets/f159b239eb9cb99c770be2f36d5b675574cb0737bb439d7987926b805affaa5b-vPy0jOxz.webp",import.meta.url).href};function Jn(n,e){const t=document.createElement("img");return t.src=zv[n],t.className=e,t.alt="",n!=="logo"&&n!=="loading"&&(t.loading="lazy"),t.draggable=!1,t.setAttribute("aria-hidden","true"),t}function Hv(n,e){const t=document.createElement("section");t.className="victory-layer",t.setAttribute("aria-label","Level completed"),t.innerHTML=`
    <div class="victory-shade" aria-hidden="true"></div>
    <div class="victory-ribbon" aria-live="polite"><span>LEVEL</span><span>COMPLETED!</span></div>
    <p class="campaign-end" role="status"></p>`,n.append(t),t.append(Jn("campaignTower","campaign-tower"));const i=document.createElement("button");i.type="button",i.className="next-button",i.setAttribute("aria-label","Next level"),i.innerHTML="<span>NEXT</span>",n.append(i);const r=document.createElement("button");r.type="button",r.className="next-button victory-choose",r.addEventListener("click",e.chooseLevels),n.append(r);const s=document.createElement("button");s.type="button",s.className="victory-undo",s.setAttribute("aria-label","Undo last move"),s.innerHTML="<span>BACK</span>",n.append(s);const a=t.querySelector(".campaign-end");s.addEventListener("click",e.undo);let o=!1;const l=()=>o?e.retry():e.next();i.addEventListener("click",l);let c=-1,f=0,h=!1,d="",u="en",g=-1;function v(m,M,A=!1,x="",T=!1,E=!1,C=!1){o=E&&m.phase==="Idle";const S=o?"Failed":m.phase;(S!==d||m.generationId!==c)&&(d=S,c=m.generationId,f=0,h=!1),(m.phase==="Won"||o)&&!h&&(f+=Math.max(0,Math.min(M,.1)),f*1e3>=(o?Sc.failureDelayMs:Sc.victoryDelayMs)&&(h=!0,o&&g!==c&&(g=c,e.failure?.())));const b=(m.phase==="Won"||o)&&h;n.parentElement?.classList.toggle("is-failed",b&&o),t.classList.toggle("is-failed",o),i.classList.toggle("is-failed",o),n.parentElement?.classList.toggle("is-campaign-complete",b&&T),t.classList.toggle("is-campaign-complete",T),t.classList.toggle("has-load-error",!!x),t.lang=u,t.setAttribute("aria-label",o?u==="ru"?"Нет доступных ходов":"No available moves":T?u==="ru"?"Кампания пройдена":"Campaign complete":u==="ru"?"Уровень пройден":"Level completed"),i.setAttribute("aria-label",o||x?We(u,"action.retry"):u==="ru"?"Следующий уровень":"Next level"),r.setAttribute("aria-label",We(u,"chooseLevel")),s.setAttribute("aria-label",u==="ru"?"Отменить последний ход":"Undo last move"),t.querySelector(".victory-ribbon span").textContent=o||T?"":u==="en"?"LEVEL":"УРОВЕНЬ";const I=t.querySelector(".victory-ribbon span:last-child");I.textContent=o?Ov(u,"fail"):T?u==="ru"?"Кампания пройдена!":"Campaign complete!":We(u,"win"),t.style.setProperty("--failure-title-size",`${Math.min(15,63/Math.max(1,I.textContent.length))}cqw`),i.querySelector("span").textContent=A?"…":o||x?We(u,"action.retry"):We(u,"next"),i.classList.toggle("has-load-error",!!x),i.classList.toggle("is-pending",A),r.textContent=We(u,"chooseLevel"),s.querySelector("span").textContent=We(u,"undo"),t.classList.toggle("is-visible",b),t.setAttribute("aria-hidden",String(!b)),i.hidden=!b,r.hidden=!b||!T&&!x,r.classList.toggle("error-choose",!T&&!!x),i.hidden=!b||T,s.hidden=!b,i.disabled=A||m.phase!=="Won"&&!o,s.disabled=!m.canUndo||m.phase!=="Won"&&!o,a.textContent=T?"All levels completed!":x}function p(){s.removeEventListener("click",e.undo),i.removeEventListener("click",l),r.removeEventListener("click",e.chooseLevels),t.remove(),r.remove(),i.remove(),s.remove()}return Object.freeze({update:v,setLanguage(m){u=m},dispose:p})}const yc={lock:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10V7a5 5 0 0 1 10 0v3" fill="none" stroke="#99601d" stroke-width="4"/><path d="M7 9V7a5 5 0 0 1 10 0v2" fill="none" stroke="#ffe9a1" stroke-width="2.5"/><rect x="3" y="9" width="18" height="13" rx="4" fill="#b77b26"/><rect x="3" y="8" width="18" height="12" rx="4" fill="#ffd05e" stroke="#fff0ab"/><path d="M6 11h12" stroke="#fff3c1" stroke-width="2" stroke-linecap="round"/><path d="M12 13v4" stroke="#885014" stroke-width="3" stroke-linecap="round"/></svg>',completed:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 13 5 5L20 6" fill="none" stroke="#806a36" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="m4 11 5 5L20 4" fill="none" stroke="#fff7d9" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>'};function Vv(n,e){const t=document.createElement("h3");t.id="level-select-title";const i=document.createElement("div");i.className="level-grid";const r=document.createElement("p");r.className="level-progress";const s=document.createElement("nav");s.className="level-pagination";const a=document.createElement("button");a.type="button",a.textContent="‹";const o=document.createElement("button");o.type="button",o.textContent="›";const l=document.createElement("span");l.setAttribute("role","status"),s.append(a,l,o);const c=document.createElement("button");c.type="button",c.className="menu-secondary",c.addEventListener("click",e.back),n.append(t,r,i,s,c);let f="en",h=[],d=1,u=[],g="",v="",p=0;a.addEventListener("click",()=>{p=Math.max(0,p-1),m(),(a.disabled?o:a).focus()}),o.addEventListener("click",()=>{p=Math.min(Math.max(0,Math.ceil(h.length/30)-1),p+1),m(),(o.disabled?a:o).focus()});function m(){t.textContent=We(f,"levels"),c.textContent=We(f,"backSettings"),i.replaceChildren(),r.textContent=f==="ru"?`${u.length} из ${h.length} пройдено`:`${u.length} of ${h.length} completed`,a.setAttribute("aria-label",f==="ru"?"Предыдущая страница уровней":"Previous levels page"),o.setAttribute("aria-label",f==="ru"?"Следующая страница уровней":"Next levels page"),a.disabled=p===0,o.disabled=(p+1)*30>=h.length,l.textContent=`${p*30+1}–${Math.min((p+1)*30,h.length)} / ${h.length}`;for(const M of h.slice(p*30,(p+1)*30)){const A=M.index<=d,x=u.includes(M.id),T=document.createElement("button");T.type="button",T.className="level-card",T.disabled=!A,T.setAttribute("aria-label",`${We(f,"level")} ${M.index}${A?x?`, ${We(f,"completed")}`:"":`, ${We(f,"locked")}`}`),x&&T.classList.add("is-completed"),M.id===g&&T.classList.add("is-selected"),T.setAttribute("data-level",String(M.index));const E=document.createElement("span");E.className="level-number",E.textContent=String(M.index);const C=document.createElement("span");C.className="level-badge",C.setAttribute("aria-hidden","true"),C.innerHTML=x?yc.completed:A?"":yc.lock,T.append(E,C),T.addEventListener("click",()=>{A&&e.select(M.id)}),i.append(T)}}return Object.freeze({update(M){const A=JSON.stringify(M);if(A!==v){if(M.selectedLevelId!==g){const x=M.choices.findIndex(T=>T.id===M.selectedLevelId);p=Math.floor(Math.max(0,x)/30)}v=A,f=M.language,h=M.choices,d=M.unlockedLevel,u=M.completed,g=M.selectedLevelId,m()}},render:m})}function Gv(n,e){const t=document.createElement("section");t.className="settings-panel",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-labelledby","settings-title"),t.tabIndex=-1;const i=document.createElement("div");i.className="settings-card";const r=document.createElement("div");r.className="settings-page";const s=document.createElement("h2");s.id="settings-title";const a=document.createElement("p");a.className="settings-status",a.setAttribute("role","status");const o=document.createElement("div");o.className="settings-controls";const l=document.createElement("label");l.className="setting-row";const c=document.createElement("span");l.append(c);const f=document.createElement("input");f.type="checkbox",l.append(f);const h=document.createElement("label");h.className="setting-row setting-music";const d=document.createElement("span");h.append(d);const u=document.createElement("input");u.type="checkbox",h.append(u);const g=document.createElement("label");g.className="setting-row volume-row";const v=document.createElement("span");g.append(v);const p=document.createElement("input");p.type="range",p.min="0",p.max="1",p.step="0.05",g.append(p);const m=document.createElement("output");m.className="volume-value",g.append(m);const M=document.createElement("button");M.type="button",M.className="menu-secondary";const A=document.createElement("button");A.type="button",A.className="menu-secondary";const x=document.createElement("button");x.type="button",x.className="settings-close",l.classList.add("setting-sound"),g.classList.add("setting-volume"),M.classList.add("settings-levels"),A.classList.add("settings-hint"),o.append(l,h,g,M,A,x),r.append(s,a,o);const T=document.createElement("div");T.className="level-select-page",T.hidden=!0,i.append(r,T),t.append(i),n.append(t),t.prepend(Jn("logo","menu-logo"));const E=document.createElement("button");E.type="button",E.className="storage-dismiss",E.addEventListener("click",e.close),t.append(E),t.dataset.page="settings";const C=Jn("storage","storage-icon");a.before(C);const S=Vv(T,{select:e.selectLevel,back(){e.navigate?.(),t.dataset.page="settings",t.setAttribute("aria-labelledby","settings-title"),T.hidden=!0,r.hidden=!1,e.motion.reveal(i),x.focus()}});let b;function I(){return[...t.querySelectorAll("button:not([disabled]):not([hidden]), select:not([disabled]):not([hidden]), input:not([disabled]):not([hidden])")].filter(U=>U.offsetParent!==null&&!U.closest("[inert]"))}function R(U){if(!t.classList.contains("is-visible"))return;if(U.key==="Escape"){U.preventDefault(),U.stopPropagation(),e.close();return}if(U.key!=="Tab")return;const X=I();if(!X.length){U.preventDefault(),t.focus();return}const te=X[0],Q=X.at(-1);U.shiftKey&&(document.activeElement===te||!t.contains(document.activeElement))?(U.preventDefault(),Q.focus()):!U.shiftKey&&(document.activeElement===Q||!t.contains(document.activeElement))&&(U.preventDefault(),te.focus())}function L(U){b=U;const{settings:X}=U,te=X.language;t.lang=te,t.dir="ltr",s.textContent=We(te,"settings"),E.setAttribute("aria-label",te==="ru"?"Закрыть настройки":"Close settings"),t.classList.toggle("has-storage-notice",U.memoryOnly||!!U.recoveryNotice),C.hidden=!U.memoryOnly&&!U.recoveryNotice,g.dataset.original=String(Math.round(X.soundVolume*100)===40),f.checked=X.soundEnabled,p.value=String(X.soundVolume),m.value=`${Math.round(X.soundVolume*100)}%`,c.textContent=We(te,"sound"),f.setAttribute("aria-label",We(te,"sound")),u.checked=X.musicEnabled,d.textContent=We(te,"music"),u.setAttribute("aria-label",We(te,"music")),v.textContent=We(te,"volume"),p.setAttribute("aria-label",We(te,"volume")),M.textContent=We(te,"levels"),M.title=`${U.unlockedLevel}/${U.choices.length} levels unlocked`,A.textContent=We(te,"hint"),A.disabled=!U.canHint,x.textContent=We(te,"back"),a.textContent=U.memoryOnly?te==="ru"?"Хранилище браузера недоступно":"Browser storage is unavailable":U.recoveryNotice?te==="ru"?"Сохранение не восстановлено.":"The save could not be restored.":"",a.title=U.recoveryNotice,a.classList.toggle("is-warning",U.memoryOnly||!!U.recoveryNotice);let Q=a.nextElementSibling instanceof HTMLButtonElement&&a.nextElementSibling.classList.contains("storage-retry")?a.nextElementSibling:null;Q||(Q=document.createElement("button"),Q.type="button",Q.className="storage-retry menu-secondary",Q.addEventListener("click",e.retry),a.after(Q)),Q.textContent=We(te,"retry"),Q.hidden=!U.memoryOnly&&!U.recoveryNotice,S.update({language:te,choices:U.choices,unlockedLevel:U.unlockedLevel,completed:U.completed,selectedLevelId:U.selectedLevelId})}function D(U){if(!b)return;const X=Object.freeze({...b.settings,...U});b=Object.freeze({...b,settings:X}),e.update(X)}f.addEventListener("change",()=>D({soundEnabled:f.checked})),u.addEventListener("change",()=>D({musicEnabled:u.checked})),p.addEventListener("input",()=>{m.value=`${Math.round(Number(p.value)*100)}%`,g.dataset.original=String(Math.round(Number(p.value)*100)===40),D({soundVolume:Number(p.value)})}),p.addEventListener("change",()=>D({soundVolume:Number(p.value)})),M.addEventListener("click",()=>{e.navigate?.(),t.dataset.page="levels",t.setAttribute("aria-labelledby","level-select-title"),r.hidden=!0,T.hidden=!1,S.render(),e.motion.reveal(i),I()[0]?.focus()}),A.addEventListener("click",e.hint),x.addEventListener("click",e.close),t.addEventListener("keydown",R);function N(){t.dataset.page="settings",t.setAttribute("aria-labelledby","settings-title"),t.inert=!1,t.classList.add("is-visible"),e.motion.reveal(t),t.setAttribute("aria-hidden","false"),r.hidden=!1,T.hidden=!0,x.hidden=!1,f.focus(),i.scrollTop=0}function H(){t.setAttribute("aria-hidden","true"),t.inert=!0,t.classList.remove("is-visible"),e.motion.hide(t,()=>t.removeAttribute("data-ui-leaving"))}function Z(){t.dataset.page="levels",t.setAttribute("aria-labelledby","level-select-title"),r.hidden=!0,T.hidden=!1,S.render(),e.motion.reveal(i),I()[0]?.focus()}function J(){e.motion.cancel(t),e.motion.cancel(i),t.removeEventListener("keydown",R),t.remove()}return Object.freeze({update:L,open:N,close:H,showLevels:Z,dispose:J,isVisible:()=>t.classList.contains("is-visible")})}function Wv(n,e){const t=document.createElement("p");t.className="hint-toast",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.hidden=!0,n.append(t);function i(r,s){const o={idle:"",searching:"searching",move:"tapHighlighted","undo-proven":"hint.undo","undo-suggestion":"hintTimeout",deadlock:"game.stuck",timeout:"hintTimeout",error:"hintTimeout"}[r.kind];t.textContent=o?We(s,o):"",o&&t.hidden&&e?.reveal(t),t.hidden=!o,t.dataset.kind=r.kind,t.lang=s}return Object.freeze({update:i,dispose(){e?.cancel(t),t.remove()}})}function Xv(n,e){const t=document.createElement("p");t.className="tutorial-tip",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.hidden=!0,n.append(t);function i(r,s){t.textContent=r?We(s,"tutorial.tap"):"",r&&t.hidden&&e?.reveal(t),t.hidden=!r,t.lang=s}return Object.freeze({update:i,dispose(){e?.cancel(t),t.remove()}})}function qv(n){const{level:e,state:t,levelNumber:i,selectedStackId:r,activeStacks:s}=n,a=Math.max(0,...t.stacks.map(f=>Math.floor(f.height))),o=a<2?0:a,l=`Level ${i}. ${o} of ${e.totalTiles} tiles gathered.`,c=s.length===0?"No active arrows.":s.map(({stack:f,direction:h},d)=>`${f.id===r?"Selected arrow":"Arrow"} ${d+1}: coordinates ${f.u}, ${f.v}, height ${f.height}, direction ${h}.`).join(" ");return`${l} ${c}`}function Yv(n,e,t,i){return We(n,e==="selection"?"a11y.selection":e==="move"?"a11y.move":e==="undo"?"a11y.undo":e==="restart"?"a11y.restart":"a11y.menu").replace("{index}",String(t??"")).replace("{count}",String(i??""))}function $v(n){const e=document.createElement("p");e.id="board-description",e.className="visually-hidden",n.append(e);const t=n.querySelector("canvas");t?.setAttribute("aria-describedby",e.id);let i="";return Object.freeze({update(r){const s=qv(r);s!==i&&(i=s,e.textContent=s)},dispose(){t?.removeAttribute("aria-describedby"),e.remove()}})}const _a={settings:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M20 4h8l1.3 5.1a16 16 0 0 1 3.2 1.3l4.7-2.3 5.7 5.7-2.3 4.7a16 16 0 0 1 1.3 3.2L47 27v8l-5.1 1.3a16 16 0 0 1-1.3 3.2l2.3 4.7-5.7 5.7-4.7-2.3a16 16 0 0 1-3.2 1.3L28 54h-8l-1.3-5.1a16 16 0 0 1-3.2-1.3l-4.7 2.3-5.7-5.7 2.3-4.7a16 16 0 0 1-1.3-3.2L1 35v-8l5.1-1.3a16 16 0 0 1 1.3-3.2l-2.3-4.7 5.7-5.7 4.7 2.3a16 16 0 0 1 3.2-1.3z" transform="translate(1 -5) scale(.85)"/><circle cx="24" cy="24" r="7" class="icon-cutout"/></svg>',restart:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M39 18A16 16 0 0 0 11 12l-4 4m0 0V6m0 10h10M9 30a16 16 0 0 0 28 6l4-4m0 0v10m0-10H31"/></svg>',undo:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M19 13 8 23l11 10M9 23h19a12 12 0 0 1 0 24h-5"/></svg>'};function Zr(n,e,t){const i=document.createElement("button");return i.type="button",i.className=t,i.setAttribute("aria-label",n),i.innerHTML=e,i}function Kv(n){const{root:e}=n,t=Jn("logo","game-logo"),i=Zr("Hint","<span>?</span>","hud-hint");i.addEventListener("click",n.onHint);const r=Zr("Settings",_a.settings,"hud-icon settings-button"),s=Zr("Restart level",_a.restart,"hud-icon restart-button"),a=document.createElement("div");a.className="hud-counter",a.setAttribute("role","status"),a.setAttribute("aria-live","polite");const o=document.createElement("div");o.className="hud-level";const l=Zr("Undo last move",_a.undo+"<span>BACK</span>","hud-undo");e.append(t,r,s,a,o,l,i);const c=Gv(e,{motion:n.motion,close:n.onMenu,update:n.onSettings,selectLevel:n.onSelectLevel,clearProgress:n.onClearProgress,retry:n.onRetry,hint:n.onHint,exportProgress:n.onExportProgress,importProgress:n.onImportProgress,navigate:()=>n.onMenuNavigate?.()});let f=!1;const h=Hv(e,{undo:n.onUndo,next:()=>{T()},retry:n.onReset,chooseLevels:()=>{f=!0,n.onChooseLevels()},failure:()=>n.onFailure?.()}),d=Wv(e,n.motion),u=Xv(e,n.motion),g=$v(e.parentElement??e);let v=!1,p=!1,m="",M="",A="",x="";async function T(){if(!p){p=!0,m="";try{const b=await n.onNext();b.advanced||(m=b.message??We(n.getSettings().language,"service.moreLevels"))}catch{m=We(n.getSettings().language,"service.nextError")}finally{p=!1}}}const E=()=>{r.focus(),n.onMenu()};r.addEventListener("click",E),s.addEventListener("click",n.onReset),l.addEventListener("click",n.onUndo);function C(b,I,R){const L=b.phase==="Idle"||b.phase==="Won",D=b.phase==="Menu",N=b.phase==="Animating"&&I.active?I.stacks:b.displayedState?.stacks??b.committedState?.stacks??[],H=Math.max(0,...N.map(_e=>Math.floor(_e.height))),Z=H<2?0:H,J=`${Z}/${b.level?.totalTiles??0}`,U=b.settings?.language??n.getSettings().language;e.lang=U,e.parentElement.dataset.screen=Zv(b),i.textContent=We(U,"hint"),i.setAttribute("aria-label",We(U,"hint")),i.disabled=b.phase!=="Idle",i.hidden=b.phase==="Won"||D,r.setAttribute("aria-label",U==="ru"?"Настройки":"Settings"),s.setAttribute("aria-label",U==="ru"?"Перезапустить уровень":"Restart level"),l.setAttribute("aria-label",U==="ru"?"Отменить ход":"Undo last move");const X=b.level?`${U==="ru"?"Уровень":"Level"} ${b.levelNumber??1}`:U==="ru"?"Уровень":"Level";e.dataset.tutorialOriginal=String(U==="ru"&&(b.levelNumber??1)===1&&J==="0/4"),(M!==J||A!==U)&&(A=U,M=J,a.textContent=J,a.setAttribute("aria-label",U==="ru"?`Собрано ${Z} из ${b.level?.totalTiles??0} плиток`:`${Z} of ${b.level?.totalTiles??0} tiles gathered`)),x!==X&&(x=X,o.textContent=X);const te=b.phase==="Won";e.parentElement?.classList.toggle("is-won",te);for(const _e of[a,o,l])_e.classList.toggle("is-hidden",te);s.disabled=!L,l.disabled=!L||!b.canUndo,r.disabled=!["Idle","Won","Menu"].includes(b.phase),b.settings&&h.setLanguage(b.settings.language);const Q=b.settings??n.getSettings();e.parentElement?.classList.toggle("high-contrast",!!Q.highContrast),e.parentElement?.classList.toggle("reduced-motion",!!Q.reducedMotion),b.level&&b.committedState&&g.update({level:b.level,state:b.committedState,levelNumber:b.levelNumber??1,language:U,...b.selectedStackId?{selectedStackId:b.selectedStackId}:{},activeStacks:b.activeStacks??[]}),d.update(b.hintView??{kind:"idle"},U),u.update(!!b.tutorialVisible,U);const ee=b.persistence??{memoryOnly:!1,recoveryNotice:""};c.update({settings:Q,choices:Array.from({length:b.levelCount??0},(_e,fe)=>({id:`level-${String(fe+1).padStart(3,"0")}`,index:fe+1})),unlockedLevel:b.unlockedLevel??1,completed:b.completedLevelIds,selectedLevelId:b.level?.id??"",memoryOnly:ee.memoryOnly,recoveryNotice:ee.recoveryNotice,canHint:b.phase==="Menu"&&b.menuReturn==="Idle"}),D&&!v?(c.open(),f&&(c.showLevels(),f=!1)):!D&&v&&(c.close(),r.focus()),v=D;const ie=te&&!!b.levelCount&&b.levelNumber===b.levelCount,Ce=b.phase==="Idle"&&(b.committedState?.stacks.length??0)>1&&b.activeStacks?.length===0;h.update(b,R,p,m,ie,Ce,Q.reducedMotion)}function S(){r.removeEventListener("click",E),s.removeEventListener("click",n.onReset),l.removeEventListener("click",n.onUndo),h.dispose(),c.dispose(),d.dispose(),u.dispose(),g.dispose(),i.removeEventListener("click",n.onHint),r.remove(),s.remove(),a.remove(),o.remove(),l.remove(),i.remove(),t.remove()}return Object.freeze({update:C,dispose:S})}function Zv(n){return n.phase==="Won"?n.levelNumber===n.levelCount?"campaign":"victory":n.tutorialVisible?"tutorial":n.hintView?.kind==="move"?"hint":"gameplay"}const vo=Object.freeze({ui:Object.freeze({startHz:620,endHz:540,durationMs:34,waveform:"sine",gain:.16}),launch:Object.freeze({startHz:300,endHz:365,durationMs:72,waveform:"triangle",gain:.18}),merge:Object.freeze({startHz:540,endHz:880,durationMs:115,waveform:"sine",gain:.22}),settle:Object.freeze({startHz:230,endHz:105,durationMs:190,waveform:"triangle",gain:.24}),turn:Object.freeze({startHz:420,endHz:535,durationMs:84,waveform:"sine",gain:.16}),undo:Object.freeze({startHz:455,endHz:305,durationMs:130,waveform:"triangle",gain:.2}),victory:Object.freeze({startHz:520,endHz:790,durationMs:230,waveform:"sine",gain:.2}),failure:Object.freeze({startHz:440,endHz:440,durationMs:340,waveform:"sine",gain:.12}),hint:Object.freeze({startHz:740,endHz:740,durationMs:145,waveform:"sine",gain:.12}),restart:Object.freeze({startHz:370,endHz:440,durationMs:150,waveform:"triangle",gain:.12})});function Jv(n){const e={at:0,tone:vo[n]};return n==="failure"?[e,{at:.29,tone:{startHz:370,endHz:370,durationMs:400,waveform:"sine",gain:.1}}]:n==="hint"?[e,{at:.12,tone:{startHz:988,endHz:988,durationMs:190,waveform:"sine",gain:.1}}]:n==="restart"?[e,{at:.1,tone:{startHz:494,endHz:440,durationMs:180,waveform:"sine",gain:.1}}]:[e]}const Qv=84,jv=64,wi=60/Qv,Bn=jv*wi,e_=12,t_=3.6,n_=12,i_=n=>440*2**((n-69)/12),r_=[[50,57,61,64],[55,62,66,69],[47,54,57,62],[57,64,69,71]],s_=[[[0,74,1.25],[1.5,78,.75],[3,76,1.5],[6,73,1],[8.5,74,1.5],[11,71,1.25],[14,73,1.5]],[[0,74,1.25],[1.5,78,.75],[3,81,1.5],[6,78,1],[8.5,76,1.5],[11,74,1.25],[14,73,1.5]],[[.5,78,1.5],[3,81,1],[5,83,1.5],[8,81,1.5],[10.5,78,1.25],[13,76,1.5]],[[0,74,1.25],[1.5,78,.75],[3,76,1.5],[6,73,1],[8.5,74,1.5],[11,76,1],[13.5,73,2]]],Ci=[];for(let n=0;n<16;n++){const e=r_[n%4];for(const t of e)Ci.push({beat:n*4,midi:t,beats:4.8,instrument:"pad",gain:.003});n%2===0?(Ci.push({beat:n*4+.5,midi:e[1]+12,beats:1.4,instrument:"keys",gain:.009}),Ci.push({beat:n*4+2.5,midi:e[2]+12,beats:1.4,instrument:"keys",gain:.008})):Ci.push({beat:n*4+2,midi:e[3]+12,beats:1.5,instrument:"glass",gain:.008})}s_.forEach((n,e)=>n.forEach(([t,i,r])=>Ci.push({beat:e*16+t,midi:i,beats:r,instrument:"keys",gain:.024})));const Ec=Object.freeze(Ci.sort((n,e)=>n.beat-e.beat).map(n=>Object.freeze(n)));function a_(n){let e=!1,t=0,i=0,r=0,s;const a=new Set;function o(h=!1){if(!e)return;const d=n.now(),u=d-t+.15;h||(r=Math.max(r,d-t-.001));const g=Math.floor(r/Bn)-1,v=Math.floor(u/Bn);for(let p=g;p<=v;p++)for(const m of Ec){const M=p*Bn+m.beat*wi;if(M<r||M>=u)continue;const A=Math.max(0,d-t-M);A<m.beats*wi&&l(m,Math.max(d,t+M),A)}r=u}function l(h,d,u){if(!(a.size>=e_))try{let g;g=n.play(h,d,u,()=>{g&&a.delete(g)}),a.add(g)}catch{}}function c(){if(!e){e=!0,t=n.now()-i,r=i;for(let h=-1;h<=0;h++)for(const d of Ec){const u=h*Bn+d.beat*wi;u<i&&u+d.beats*wi>i&&l(d,n.now(),i-u)}o(!0),s=n.every(o)}}function f(){e&&(i=((n.now()-t)%Bn+Bn)%Bn),e=!1,s?.(),s=void 0;for(const h of a)h.stop();a.clear()}return Object.freeze({start:c,stop:f,snapshot:()=>({running:e,voices:a.size,position:e?(n.now()-t)%Bn:i})})}const o_=n=>.85*Math.tanh(Math.max(-1,Math.min(1,n))/.85);function l_(n,e){const t=n.durationMs/1e3,i=new Float32Array(Math.ceil(t*e)),r=Math.min(.012,t*.25),s=Math.log(Math.max(1,n.endHz)/n.startHz)/t;for(let a=0;a<i.length;a++){const o=a/e,l=Math.abs(s)<1e-10?n.startHz*o:n.startHz*Math.expm1(s*o)/s,c=2*Math.PI*l,f=n.waveform==="triangle"?2/Math.PI*Math.asin(Math.sin(c)):Math.sin(c),h=o<r?o/r:Math.exp(-9*(o-r)/(t-r)),d=Math.min(1,Math.max(0,(t-o)/.012));i[a]=f*h*d*n.gain*t_}return i}function c_(n,e){const t=n.beats*wi,i=new Float32Array(Math.ceil(t*e)),r=i_(n.midi);for(let s=0;s<i.length;s++){const a=s/e,o=2*Math.PI*r*a;let l,c;if(n.instrument==="pad")l=(Math.sin(o)+.18*Math.sin(o*2))/1.18,c=Math.min(1,a/.45)*Math.min(1,(t-a)/.65);else{const f=n.instrument==="glass";l=(Math.sin(o)+(f?.24:.12)*Math.sin(o*2)*Math.exp(-a*5)+(f?.1:.04)*Math.sin(o*3)*Math.exp(-a*8))/(f?1.34:1.16),c=Math.min(1,a/.009)*Math.exp(-a*(f?2.6:2.1))*Math.min(1,(t-a)/.12)}i[s]=l*Math.max(0,c)*n.gain*n_}return i}function u_(){if(typeof AudioContext>"u")throw new Error("Web Audio is unavailable.");const n=new AudioContext,e=n.createGain(),t=n.createWaveShaper();t.curve=Float32Array.from({length:4097},(l,c)=>o_(c/2048-1)),t.connect(e),e.gain.value=.4,e.connect(n.destination);const i=new Map,r=new Set;function s(l,c){let f=i.get(l);if(!f){const h=c();f=n.createBuffer(1,h.length,n.sampleRate),f.getChannelData(0).set(h),i.set(l,f)}return f}function a(l,c,f,h){const d=n.createBufferSource(),u=n.createGain();d.buffer=l,d.connect(u),u.connect(t);const g=Math.max(c,n.currentTime);u.gain.setValueAtTime(f>0?0:1,g),f>0&&u.gain.linearRampToValueAtTime(1,g+.012);let v=!1;const p=Object.freeze({stop(){if(!v){v=!0,u.gain.cancelScheduledValues(n.currentTime),u.gain.setTargetAtTime(0,n.currentTime,.003);try{d.stop(n.currentTime+.015)}catch{}}}});return d.onended=()=>{d.disconnect(),u.disconnect(),r.delete(p),h()},r.add(p),d.start(g,f),p}const o=a_({now:()=>n.currentTime,play:(l,c,f,h)=>a(s(JSON.stringify([l.midi,l.beats,l.instrument,l.gain]),()=>c_(l,n.sampleRate)),c,f,h),every:l=>{const c=setInterval(l,40);return()=>clearInterval(c)}});return Object.freeze({resume:()=>n.resume(),suspend:()=>n.suspend(),async close(){o.stop();for(const l of r)l.stop();await n.close(),r.clear(),i.clear(),t.disconnect(),e.disconnect()},setVolume(l){e.gain.setTargetAtTime(l,n.currentTime,.012)},startMusic:o.start,stopMusic:o.stop,musicSnapshot:o.snapshot,playTone(l,c,f,h){const d=h?Jv(h):[{at:0,tone:l}],u=[];let g=d.length;const v=n.currentTime;for(const p of d)u.push(a(s(JSON.stringify(p.tone),()=>l_(p.tone,n.sampleRate)),v+p.at,0,()=>{--g===0&&f()}));return Object.freeze({stop(){for(const p of u)p.stop()}})}})}function d_(n={}){const e=n.createAdapter??u_,t=Math.max(1,n.maxVoices??5),i=Math.max(0,n.rateLimitMs??40),r=n.now??(()=>performance.now());let s,a=!0,o=!0,l=.4,c=!0,f=!1,h=!1,d=!1,u;const g=new Set,v=new Map,p={},m=()=>!f&&c&&l>0&&(a||o)&&h;function M(){for(const I of g)try{I.stop()}catch{}g.clear()}function A(){s?.setVolume?.(l),(!a||!m()||!d)&&M(),o&&m()&&d?s?.startMusic?.():s?.stopMusic?.()}function x(){return!s&&!m()?Promise.resolve(!1):u||(u=(async()=>{try{if(!s&&m()&&(s=e()),!s)return!1;for(;;){const R=m();if(R===d)return A(),R;R?await s.resume():await s.suspend(),d=R,A()}}catch{return d=!1,s?.stopMusic?.(),M(),!1}})().finally(()=>{u=void 0}),u)}function T(I){a=I.soundEnabled===!0,o=typeof I.musicEnabled=="boolean"?I.musicEnabled:a,l=Number.isFinite(I.soundVolume)?Math.max(0,Math.min(1,I.soundVolume)):.4,A(),x()}async function E(){if(f)return!1;if(h=!0,u&&s&&!d&&m())try{s.resume().catch(()=>{})}catch{}return x()}function C(I){if(!a||!m()||!d||!s||!vo[I])return!1;const R=r();if(R-(v.get(I)??-1/0)<i)return!1;if(v.set(I,R),g.size>=t){const L=g.values().next().value;if(L){try{L.stop()}catch{}g.delete(L)}}try{let L;return L=s.playTone(vo[I],l,()=>{L&&g.delete(L)},I),g.add(L),p[I]=(p[I]??0)+1,!0}catch{return!1}}async function S(I){f||(c=I,A(),await x())}async function b(){if(!f){f=!0,M(),s?.stopMusic?.(),await u,h=!1,d=!1;try{await s?.close()}catch{}s=void 0}}return Object.freeze({configure:T,unlock:E,play:C,setVisible:S,dispose:b,snapshot:()=>Object.freeze({enabled:a,musicEnabled:o,volume:l,visible:c,unlocked:h,resumed:d,activeVoices:g.size,disposed:f,played:{...p},music:s?.musicSnapshot?.()??{running:!1,voices:0,position:0}})})}function f_(n,e,t){if(t){const p=n.querySelector("#load-error");let m=!1;return{update(M,A,x){t.loading.hidden=M||m||!A,p.hidden=A&&!m,p.dataset.kind=A?"content":"graphics",p.querySelector("p").textContent=We(x,A?"service.contentError":"service.graphicsError"),p.querySelector("button").textContent=We(x,"action.retry")},setProgress:t.setProgress,fail(){m=!0,t.fail()},dispose(){e?.cancel(p)}}}const i=document.createElement("section");i.className="loading-screen",i.setAttribute("role","status");const r=document.createElement("p"),s=document.createElement("progress");s.setAttribute("aria-label","Loading");const a=document.createElement("div");a.className="loading-meter is-indeterminate",a.setAttribute("aria-hidden","true");const o=document.createElement("img");o.className="loading-meter-track",o.alt="",o.src=new URL("/White-Tower-Play/assets/f1d2caab9353742b8df59b148673ac47b38bb5998d9de5a6ee53c8288c6e2024-MRB15IwW.webp",import.meta.url).href;const l=document.createElement("div");l.className="loading-meter-window";const c=document.createElement("img");c.className="loading-meter-fill",c.alt="",c.src=new URL("/White-Tower-Play/assets/69b4ccfea980602ee46d81df9f0d725e82d3a67b7254f91b2a682cd941a9b511-C7MzZ56N.webp",import.meta.url).href,l.append(c),a.append(o,l);let f;i.append(Jn("logo","game-logo"),Jn("loading","loading-tower"),a,s,r),n.append(i);const h=n.querySelector("#load-error");h.prepend(Jn("graphics","service-illustration"));let d=!1,u;function g(){const p=h.hidden?i.hidden?void 0:i:h;p!==u&&(u&&e?.cancel(u),p&&e?.reveal(p),u=p)}function v(p,m,M){i.lang=M,h.lang=M,h.dataset.kind=m?"content":"graphics",r.textContent=We(M,"service.loading")+(f===void 0?"":` ${f}%`),s.setAttribute("aria-label",r.textContent),i.hidden=p||d||!m,!m||d?(h.hidden=!1,h.querySelector("p").textContent=We(M,m?"service.contentError":"service.graphicsError"),h.querySelector("button").textContent=We(M,"action.retry")):h.hidden=!0,g()}return{update:v,setProgress(p,m){!Number.isFinite(m)||m<=0||(s.max=m,s.value=Math.max(0,Math.min(p,m)),f=Math.floor(s.value/m*100),a.classList.remove("is-indeterminate"),a.style.setProperty("--loaded",f+"%"))},fail(){d=!0,i.hidden=!0,h.hidden=!1,g()},dispose(){e?.cancel(i),e?.cancel(h),i.remove()}}}function h_(n,e){let t=!1,i=!1;return{busy:()=>t,pause(r){},async run(r){if(!(t||i)){t=!0;try{return await r()}finally{t=!1}}},dispose(){i=!0}}}function p_(n,e,t,i,r){let s=!!e.controller,a=!1,o=!1,l=!1,c=-1/0;function f(){s&&(a=!0),s=!0}return e.addEventListener("controllerchange",f),Object.freeze({update(h){if(!l){if(n.waiting&&h-c>=500){const d=n.waiting;c=h,t()?i().then(()=>{l||d.postMessage({type:"WHITE_TOWER_UPDATE_STATE",safe:t()})},()=>{l||d.postMessage({type:"WHITE_TOWER_UPDATE_STATE",safe:!1})}):d.postMessage({type:"WHITE_TOWER_UPDATE_STATE",safe:!1})}a&&!o&&t()&&(o=!0,i().then(()=>{!l&&t()?r():o=!1},()=>{o=!1}))}},dispose(){l=!0,e.removeEventListener("controllerchange",f)}})}function g_(n){let e;function t(){"serviceWorker"in navigator&&navigator.serviceWorker.register("/White-Tower-Play/sw.js").then(ie=>{if(x)return;const Ce=()=>g&&v.snapshot().loaded&&!v.persistenceInfo().memoryOnly&&["Idle","Won","Menu"].includes(v.snapshot().phase);e=p_(ie,navigator.serviceWorker,Ce,()=>v.flushPersistence(),()=>location.reload())}).catch(()=>{})}let i=document.querySelector("canvas");const r=document.querySelector("#status"),s=cd(),a=d_(),o=Yu();o.track("wt_boot_started",{device:matchMedia("(pointer:coarse)").matches?"touch":"pointer"});const l=td(),c=od();document.querySelector("main").classList.add("world-scene");function f(){document.querySelector("main").classList.remove("keyboard-focus")}function h(ie){(ie.key==="Tab"||ie.key.startsWith("Arrow"))&&document.querySelector("main").classList.add("keyboard-focus")}document.addEventListener("pointerdown",f,!0),document.addEventListener("keydown",h,!0);const d=f_(document.querySelector("main"),c,n),u=Ju(ie=>d.setProgress(ie.completed,ie.total),"/White-Tower-Play/");let g=!1,v;try{v=kv(i,"webgl",{audio:a,analytics:o,catalogReady:u.catalog}),i=v.canvas}catch(ie){throw r.textContent=ie instanceof Error?`WebGL unavailable: ${ie.message}`:"WebGL unavailable.",ie}const p=ld();let m=!1,M=null,A,x=!1,T,E;const C=h_(document.querySelector("main"));function S(){T?.dispose(),i=v.canvas,i.tabIndex=0,i.setAttribute("role","application"),T=ud(i,{pickStack:ie=>v.pickStack(ie),activate:ie=>g&&!m&&!C.busy()&&v.rendererInfo().supported&&v.launchStack(ie)})}S();const b=Kv({root:document.querySelector("#hud"),motion:c,onReset:()=>{C.run(N)},onUndo:()=>v.undo(),onNext:async()=>(a.play("ui"),await C.run(()=>v.nextLevel())??{advanced:!1}),onMenu:()=>v.toggleMenu(),getSettings:()=>v.snapshot().settings,onSettings:ie=>{const Ce=v.canvas;v.updateSettings(ie),a.configure(ie),v.canvas!==Ce&&(S(),D())},onSelectLevel:ie=>{a.play("ui"),v.selectLevel(ie).catch(()=>{r.textContent="Could not load that level. Select it again to retry."})},onClearProgress:()=>{a.play("ui"),v.clearProgress().then(()=>{S(),D()})},onRetry:()=>window.location.reload(),onChooseLevels:()=>{v.toggleMenu()},onHint:()=>v.requestHint(),onFailure:()=>a.play("failure"),onMenuNavigate:()=>a.play("ui"),onExportProgress:()=>v.exportProgress(),onImportProgress:ie=>v.importProgress(ie)}),I=hd({canvas:()=>v.canvas,scene:v,enabled:()=>g&&!m&&!C.busy()&&v.rendererInfo().supported,announce:(ie,Ce,_e)=>{r.textContent=Yv(v.snapshot().settings.language,ie,Ce,_e)},reset:N});function R(){M=null,p.reset(),s.reset()}function L(ie){ie.isTrusted&&(a.setVisible(!document.hidden),a.unlock())}document.addEventListener("pointerdown",L,{capture:!0}),document.addEventListener("pointerup",L,{capture:!0}),document.addEventListener("click",L,{capture:!0}),document.addEventListener("keydown",L,{capture:!0});function D(){i=v.canvas;const ie=Math.min(window.devicePixelRatio||1,2);v.resize({width:i.clientWidth,height:i.clientHeight,pixelRatio:ie}),E=i.getBoundingClientRect(),l.refreshLayout(),J="",v.render()}function N(){v.reset(),R(),v.render()}function H(){const ie=v.snapshot().settings.reducedMotion||window.matchMedia("(prefers-reduced-motion: reduce)").matches;l.update(ie,document.hidden),c.update(ie,document.hidden)}function Z(){H(),v.pause(document.hidden||m),document.querySelector("main").classList.toggle("motion-paused",document.hidden||m),a.setVisible(!document.hidden&&!m),R()}let J="",U;function X(ie){if(e?.update(ie),x)return;const Ce=M===null?0:(ie-M)/1e3;M=ie;let _e=0;g&&!m&&!document.hidden&&(_e=p.advance(Ce,se=>v.update(se,s)).alpha),H(),b.update(v.snapshot(),v.presentationSnapshot(),document.hidden?0:Math.min(Ce,.1)),d.update(g&&v.snapshot().loaded,v.rendererInfo().supported,v.snapshot().settings.language);const fe=v.persistenceInfo();fe.memoryOnly?r.textContent=v.snapshot().settings.language==="ru"?"Прогресс временный: хранилище браузера недоступно.":"Progress is temporary because browser storage is unavailable.":fe.recoveryNotice&&(r.textContent=fe.recoveryNotice),v.render(_e);const G=v.snapshot().level,Y=`${G?.id}:${E?.width}:${E?.height}`;if(E&&G&&(U!==G||J!==Y)){J=Y,U=G;const se=Math.min(E.width/720,E.height/1280),he=E.left+(E.width-720*se)/2,ce=E.top+(E.height-1280*se)/2;l.setExclusion(sd(G).map(de=>({left:he+de.left*se-6,top:ce+de.top*se-6,right:he+de.right*se+6,bottom:ce+de.bottom*se+6})))}A=requestAnimationFrame(X)}document.addEventListener("visibilitychange",Z),window.addEventListener("resize",D);const te=new ResizeObserver(D);te.observe(document.querySelector("main")),D(),A=requestAnimationFrame(X);const Q=v.ready.then(async()=>{if(await v.resourceReady(),await document.fonts.ready,x||(v.render(),u.complete(),await n.finish(),x))return;g=!0,t(),performance.mark("game-ready"),o.track("wt_game_ready",{loading_ms:Math.round(performance.now()),content_version:v.contentVersion()??"unknown"}),o.onEnable(()=>{o.track("wt_observation_started"),v.startAnalytics(!1)}),o.showChoice(),a.configure(v.snapshot().settings),document.hidden&&a.setVisible(!1),S(),D();const ie=new URLSearchParams(window.location.search);{const Ce=ie.get("level");Ce&&await v.setLevelById(Ce),ie.has("tower")&&v.setTowerDemo(Number(ie.get("tower"))||void 0)}r.textContent=v.rendererInfo().message??"Ready"}).catch(ie=>{o.track("wt_content_error",{stage:"startup"}),r.textContent=ie instanceof Error?`Level error: ${ie.message}`:"Could not load level.",d.fail(),n.fail()});function ee(){e?.dispose(),x=!0,u.dispose(),o.dispose(),cancelAnimationFrame(A),s.dispose(),T?.dispose(),I.dispose(),b.dispose(),C.dispose(),d.dispose(),c.dispose(),l.dispose(),v.dispose(),document.removeEventListener("pointerdown",L,!0),document.removeEventListener("pointerup",L,!0),document.removeEventListener("click",L,!0),document.removeEventListener("keydown",L,!0),a.dispose(),document.removeEventListener("pointerdown",f,!0),document.removeEventListener("keydown",h,!0),window.removeEventListener("resize",D),te.disconnect(),document.removeEventListener("visibilitychange",Z)}return{dispose:ee,ready:Q}}export{g_ as startGame};
