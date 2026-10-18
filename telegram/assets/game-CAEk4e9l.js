import{v as uo,p as Du,D as fo,a as xr,c as _c,t as ys,b as Nu,d as Uu,r as Jo,e as Fu,f as Ou}from"./index-CtAJAUTZ.js";const bs="white-tower-analytics-",Es=864e5,Qo=200;function Bu(n){const e=n.now??Date.now,t=n.id??(()=>crypto.randomUUID()),i=n.storage,r=P=>{try{return i?.getItem(bs+P)??null}catch{return null}},s=(P,R)=>{try{R===null?i?.removeItem(bs+P):i?.setItem(bs+P,R)}catch{}};let a=r("consent")==="yes",o="",l="",c=0,u=0,f=!1,d=!1,h=0,m=0,_,p,g=!1,M=!1,T=[];const S=new Set,w=n.send??(async(P,R)=>{const U=await fetch(n.host+"/batch/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({api_key:n.key,batch:P}),credentials:"omit",signal:R});return U.ok?!(await U.json().catch(()=>null))?.quota_limited?.length:!1});function E(){s("queue",JSON.stringify(T.slice(-Qo)))}function N(){if(!o){o=r("player")||t(),s("player",o);try{const P=JSON.parse(r("session")||"null");P&&typeof P.id=="string"&&e()-P.last<Es&&e()-P.last<18e5&&(l=P.id,c=P.last)}catch{}try{const P=JSON.parse(r("attempt")||"null");P&&typeof P.id=="string"&&typeof P.level=="string"&&typeof P.version=="string"&&(p=P)}catch{}try{const P=JSON.parse(r("queue")||"[]");Array.isArray(P)&&(T=P.filter(R=>typeof R?.uuid=="string"&&typeof R?.event=="string"&&R.properties?.distinct_id===o&&e()-Date.parse(R.timestamp)<Es&&e()>=Date.parse(R.timestamp)).slice(-Qo))}catch{}}}function x(P,R={},U){return f||!a||!n.key||!/^wt_[a-z_]+$/.test(P)||(N(),U&&S.has(U))?!1:(U&&(S.add(U),S.size>1e3&&S.delete(S.values().next().value)),(!l||e()-c>=18e5)&&(l=t(),u=0),c=e(),s("session",JSON.stringify({id:l,last:c})),T=T.filter(B=>e()-Date.parse(B.timestamp)<Es).slice(-199),T.push({uuid:t(),event:P,timestamp:new Date(e()).toISOString(),properties:{...R,distinct_id:o,session_id:l,$session_id:l,event_sequence:++u,schema_version:1,build_version:n.build,environment:n.environment,consent:!0,$process_person_profile:!1,$geoip_disable:!0}}),E(),!0)}async function b(){if(f||!a||d||!T.length||h>=4)return;const P=T.slice(0,20),R=m;d=!0,_=new AbortController;const U=setTimeout(()=>_?.abort(),8e3);try{const B=await w(P,_.signal);if(R!==m)return;if(B){const Z=new Set(P.map(H=>H.uuid));T=T.filter(H=>!Z.has(H.uuid)),h=0,E()}else h++}catch{R===m&&h++}finally{clearTimeout(U),d=!1}}function I(P){if(!f&&(a=P,m++,_?.abort(),h=0,S.clear(),s("consent",P?"yes":"no"),!P)){T=[],o="",l="",p=void 0;for(const R of["player","session","attempt","queue"])s(R,null)}}function A(P,R,U=!1,B=!0){if(!a)return;N();const Z=U&&p?.level===P&&p.version===R;g=B&&!U,M=B&&!U,Z||(p={id:t(),level:P,version:R},s("attempt",JSON.stringify(p))),x(Z?"wt_level_resumed":"wt_level_started",{level_id:P,content_version:R,attempt_id:p.id,observed_from_start:M},"start:"+p.id)}return Object.freeze({track:x,flush:b,setConsent:I,beginAttempt:A,context:()=>p?{attempt_id:p.id,level_id:p.level,content_version:p.version,continuous_observation:g,observed_from_start:M}:{},consent:()=>a,resetRetry(){h=0},retryDelay:()=>Math.min(6e4,5e3*2**h),snapshot:()=>({consent:a,queued:T.length,retries:h,flight:d}),dispose(){f=!0,m++,_?.abort()}})}function ku(){let n;try{n=localStorage}catch{}const e=Bu({key:"",host:"https://eu.i.posthog.com",environment:"production",build:"9dde57a",...n?{storage:n}:{}});return e.setConsent(!1),e}function xc(n,e="/White-Tower-Play/telegram/"){return`${e.replace(/\/$/,"")}/${n.replace(/^\//,"")}`}const ho=new Map;class mt extends Error{constructor(e,t){super(t),this.code=e,this.name="ContentLoadError"}}function zu(n){if(typeof n!="object"||n===null||Array.isArray(n))throw new mt("catalog","Catalog must be an object.");const e=n;if(e.schemaVersion!==1||typeof e.contentVersion!="string"||!Array.isArray(e.levels)||e.levels.length<1||e.levels.length>120)throw new mt("catalog","Catalog version or level list is invalid (expected 1–120 entries).");const t=new Set,i=[];return e.levels.forEach((r,s)=>{if(typeof r!="object"||r===null||Array.isArray(r))throw new mt("catalog",`Entry ${s} must be an object.`);const a=r,o=`level-${String(s+1).padStart(3,"0")}`,l=`/content/levels/${String(s+1).padStart(3,"0")}.json`;if(a.id!==o||a.path!==l||typeof a.sha256!="string"||!/^[a-f0-9]{64}$/.test(a.sha256))throw new mt("catalog",`Entry ${s} has invalid order, path or checksum.`);if(t.has(o))throw new mt("catalog",`Duplicate level ${o}.`);t.add(o),i.push(Object.freeze({id:o,path:l,sha256:a.sha256}))}),Object.freeze({schemaVersion:1,contentVersion:e.contentVersion,levels:Object.freeze(i)})}async function Sc(n=xc("/content/catalog.json"),e=fetch){let t;try{t=await e(n)}catch(r){throw new mt("network",r instanceof Error?r.message:String(r))}if(!t.ok)throw new mt("network",`Catalog request failed (${t.status}).`);let i;try{i=await t.json()}catch(r){throw new mt("json",r instanceof Error?r.message:"Invalid catalog JSON.")}return zu(i)}async function Nn(n,e,t=fetch,i){const r=n.levels.find(c=>c.id===e);if(!r)throw new mt("missing-level",`Level ${e} is not in the catalog.`);const s=`${n.contentVersion}:${r.sha256}`,a=ho.get(s);if(a)return a;let o;try{o=await t(xc(r.path),i?{signal:i}:void 0)}catch(c){throw new mt("network",c instanceof Error?c.message:String(c))}if(!o.ok)throw new mt("network",`Level request failed (${o.status}).`);let l;try{l=new Uint8Array(await o.arrayBuffer())}catch(c){throw new mt("network",c instanceof Error?c.message:`Could not read ${e}.`)}return Hu(n,r,l)}async function Hu(n,e,t){const i=e.id;let r;try{r=await crypto.subtle.digest("SHA-256",t)}catch(l){throw new mt("checksum",l instanceof Error?l.message:"SHA-256 is unavailable.")}if([...new Uint8Array(r)].map(l=>l.toString(16).padStart(2,"0")).join("")!==e.sha256)throw new mt("checksum",`Checksum mismatch for ${i}.`);let a;try{a=JSON.parse(new TextDecoder().decode(t))}catch(l){throw new mt("json",l instanceof Error?l.message:`Invalid JSON for ${i}.`)}const o=uo(a);if(!o.ok)throw new mt("schema",o.errors.map(l=>`${l.path}: ${l.message}`).join("; "));if(o.value.id!==e.id)throw new mt("identity",`Catalog ID does not match level ${i}.`);return ho.set(`${n.contentVersion}:${e.sha256}`,o.value),o.value}async function Vu(n,e,t=fetch,i){const r=await t(e,i?{signal:i}:void 0);if(!r.ok)throw new mt("network",`Level pack request failed (${r.status}).`);const s=await r.json();if(!s||typeof s!="object"||Array.isArray(s))throw new mt("schema","Invalid level pack.");const a=s;if(a.contentVersion!==n.contentVersion||!Array.isArray(a.levels)||a.levels.length!==n.levels.length)throw new mt("catalog","Level pack does not match the catalog.");const o=[];for(let l=0;l<n.levels.length;l++){i?.throwIfAborted();const c=a.levels[l];if(typeof c!="string")throw new mt("schema","Level pack entry must contain original JSON bytes.");const u=new TextEncoder().encode(c),f=await crypto.subtle.digest("SHA-256",u),d=[...new Uint8Array(f)].map(_=>_.toString(16).padStart(2,"0")).join(""),h=n.levels[l];if(d!==h.sha256)throw new mt("checksum",`Checksum mismatch for ${h.id}.`);const m=uo(JSON.parse(c));if(!m.ok||m.value.id!==h.id)throw new mt("schema",`Invalid level ${h.id}.`);o.push({entry:h,level:m.value})}i?.throwIfAborted();for(const{entry:l,level:c}of o)ho.set(`${n.contentVersion}:${l.sha256}`,c)}const jo=[new URL("/White-Tower-Play/telegram/assets/355affb8c11cbb90975c14eb6c2192e6f34e46913a1e0c5e55ab20be8d6119cc-BPHyFsGU.webp",import.meta.url).href,new URL("/White-Tower-Play/telegram/assets/87741b2bb30ade096ea6a0dcfc8280924f18cc5558f77145767c19ab80735c55-DIgfvB0J.webp",import.meta.url).href,new URL("/White-Tower-Play/telegram/assets/f1d2caab9353742b8df59b148673ac47b38bb5998d9de5a6ee53c8288c6e2024-MRB15IwW.webp",import.meta.url).href,new URL("/White-Tower-Play/telegram/assets/69b4ccfea980602ee46d81df9f0d725e82d3a67b7254f91b2a682cd941a9b511-C7MzZ56N.webp",import.meta.url).href,new URL("/White-Tower-Play/telegram/assets/9cc1a932cfce552c4c2d526092a585f9486a03a362d6a90b410743d5484a55b1-Cd2LLBwW.webp",import.meta.url).href,new URL("/White-Tower-Play/telegram/assets/islands-atlas-runtime-C2lwbZBA.webp",import.meta.url).href,new URL("/White-Tower-Play/telegram/assets/islands-extra-atlas-runtime-DeVHoyCf.webp",import.meta.url).href,new URL("/White-Tower-Play/telegram/assets/clouds-atlas-runtime-B8UjbPuj.webp",import.meta.url).href,new URL("/White-Tower-Play/telegram/assets/tiles-atlas-Bgn-GxWF.webp",import.meta.url).href,new URL("/White-Tower-Play/telegram/assets/markers-atlas-M4FshpTr.webp",import.meta.url).href,new URL("/White-Tower-Play/telegram/assets/stone-atlas-C2ucdoOf.webp",import.meta.url).href,new URL("/White-Tower-Play/telegram/assets/5cb8b3ca938c1e900dc9ecbc8ebdfd22e3b9de7e8df8443fc86e63fa4f9d8283-tnkvfidQ.webp",import.meta.url).href,new URL("/White-Tower-Play/telegram/assets/f2171e782a1bc595b764fbd99199b2850435ee02f4b8e30f9825c243511e09fa-DprCtDS6.webp",import.meta.url).href,new URL("/White-Tower-Play/telegram/assets/8ff21e1b89c5afdd55b6475019c0581cc38435505241d520ec24abe69b1d12f3-_tN9SNeq.webp",import.meta.url).href,new URL("/White-Tower-Play/telegram/assets/9dfb3c3ffcb438de5c5d6ea982a2e15cf85a2d9eec2b74de4f2aada98feebe10-BvfCePT7.webp",import.meta.url).href,new URL("/White-Tower-Play/telegram/assets/4ca748998f0a79ba5763d44a5f3d209fc95572515b02127a3a3e36c046d90cc5-DzVCZ-9k.webp",import.meta.url).href,new URL("/White-Tower-Play/telegram/assets/883cf26eb25f39aa993df58d196c745b1a4d341cdb15a9fa57154b905d3ea92b-DNyM58Xx.webp",import.meta.url).href];async function el(n,e,t,i=4){let r=0,s=0;const a=n.length;e({completed:s,total:a}),await Promise.all(Array.from({length:Math.min(Math.max(1,i),n.length)},async()=>{for(;r<n.length;){t.throwIfAborted();const o=n[r++];await new Promise((l,c)=>{const u=()=>c(t.reason);t.addEventListener("abort",u,{once:!0}),Promise.resolve().then(o).then(l,c).finally(()=>t.removeEventListener("abort",u))}),t.throwIfAborted(),e({completed:++s,total:a})}}))}function Gu(n,e){const t=new AbortController;let i=[],r;const s=setTimeout(()=>t.abort(new Error("Game resources took too long to load. Please retry.")),9e4);let a={total:1};const o=c=>{a=c,n({completed:c.completed,total:c.total+1})},l=(async()=>{const[c,u]=await Promise.all([Sc(),fetch(e+"runtime-assets.json",{signal:t.signal})]);if(!u.ok)throw new Error("Could not load resource manifest.");const f=await u.json();if(!Array.isArray(f)||f.some(_=>typeof _!="string"||!_.startsWith("/assets/")||_.includes("..")))throw new Error("Invalid resource manifest.");const d=[...new Set(f)].map(_=>e+_.replace(/^\//,"")),h=new Set(jo.map(_=>new URL(_,document.baseURI).href));i=d.filter(_=>!h.has(new URL(_,document.baseURI).href));const m=jo.map(_=>async()=>{if(/\.(png|webp|jpg|svg)$/.test(_))await Du(_),t.signal.throwIfAborted();else{const p=await fetch(_,{signal:t.signal});if(!p.ok)throw new Error("A game resource could not load.");await p.arrayBuffer()}});return m.push(async()=>{await Vu(c,e+"content/levels-pack.json",fetch,t.signal)}),m.push(async()=>{await document.fonts.ready}),await el(m,o,t.signal),c})();return l.catch(()=>{clearTimeout(s),t.abort()}),{catalog:l,complete(){clearTimeout(s),n({completed:a.total+1,total:a.total+1})},background(){return r??=el(i.map(c=>async()=>{try{const u=await fetch(c,{signal:t.signal,priority:"low"});u.ok&&await u.arrayBuffer()}catch{}}),()=>{},t.signal,2).catch(()=>{}),r},dispose(){clearTimeout(s),t.abort(),i=[]}}}function Wu(n){let e=!1,t,i,r;const s=()=>{const o=navigator.serviceWorker.controller;!e&&o?.scriptURL===new URL("/White-Tower-Play/telegram/resource-sw.js",location.href).href&&o.postMessage({type:"WHITE_TOWER_WARM_RESOURCES"})};"serviceWorker"in navigator&&navigator.serviceWorker.addEventListener("controllerchange",s);const a=(async()=>{if("serviceWorker"in navigator)try{const l=await navigator.serviceWorker.register("/White-Tower-Play/telegram/resource-sw.js");return e||!l?void 0:l}catch{return}})();return{warm(){return i??=(async()=>{const o=await a;if(!o||e)return!1;const l=o.installing??o.waiting??o.active;return l?new Promise(c=>{const u=setTimeout(()=>d(!1),15e3),f=()=>{l.state==="activated"?d(!0):l.state==="redundant"&&d(!1)};function d(h){clearTimeout(u),l.removeEventListener("statechange",f),r=void 0,h&&!e&&l.postMessage({type:"WHITE_TOWER_WARM_RESOURCES"}),c(h&&!e)}r=()=>d(!1),l.addEventListener("statechange",f),f()}):!1})(),i},update(o){t?.update(o)},dispose(){e=!0,r?.(),t?.dispose(),"serviceWorker"in navigator&&navigator.serviceWorker.removeEventListener("controllerchange",s)}}}const tl=1536,nl=1024,po=[{rect:[32,16,479,496],solid:[.015609756097560976,.014532243415077202,.984390243902439,.9854677565849228]},{rect:[544,16,991,496],solid:[.015655577299412915,.014585232452142206,.9843444227005871,.9854147675478578]},{rect:[1053,16,1506,496],solid:[.01557935735150925,.014692378328741965,.9844206426484907,.9853076216712581]},{rect:[31,528,481,1008],solid:[.015503875968992248,.014545454545454545,.9844961240310077,.9854545454545455]},{rect:[544,528,992,1008],solid:[.015533980582524271,.014505893019038985,.9844660194174757,.985494106980961]},{rect:[1055,528,1505,1008],solid:[.015549076773566569,.014585232452142206,.9844509232264335,.9854147675478578]}],Mc=3,mo=22,go=Mc*mo,Ci=76,sr=26,Sr=Object.freeze(po.reduce((n,{solid:e})=>{const t=Ci*2/(e[2]-e[0]),i=(Ci*2+go)/(e[3]-e[1]),r=-Ci-e[0]*t,s=Ci+e[1]*i;return{left:Math.min(n.left,r),right:Math.max(n.right,r+t),top:Math.max(n.top,s),bottom:Math.min(n.bottom,s-i)}},{left:0,right:0,top:0,bottom:0})),ft=Object.freeze({width:720,height:1280}),ti=72,wn=.82,Ct=ti,wi=Ct,ni=22,yc=12+sr+go,il=30,vo=.44*ti,Xu=1.33;function rs(n,e){return e.u+e.v-n.u-n.v||n.u-e.u||n.v-e.v}function _o(n,e,t,i){return Object.freeze({x:i.originX+(n-e)*ti*i.scale,y:i.originY-(n+e)*ti*i.scale-t*i.layerRise*i.scale})}function ss(n,e,t,i){return _o(n,e,t+ni/i.layerRise,i)}function qu(n,e,t){if(t.width<=0||t.height<=0)return;const i=Math.min(t.width/ft.width,t.height/ft.height),r=(t.width-ft.width*i)/2,s=(t.height-ft.height*i)/2,a=(n-t.left-r)/i,o=(e-t.top-s)/i;if(!(a<0||o<0||a>ft.width||o>ft.height))return Object.freeze({x:a,y:o})}function rl(n,e){let t=!1;for(let i=0,r=e.length-1;i<e.length;r=i++){const s=e[i],a=e[r];s.y>n.y!=a.y>n.y&&n.x<(a.x-s.x)*(n.y-s.y)/(a.y-s.y)+s.x&&(t=!t)}return t}function Yu(n,e,t){const i=[...e].sort((a,o)=>rs(o,a)),r=Ct*t.scale,s=ni*t.scale;for(const a of i)for(let o=a.height-1;o>=0;o--){const l=ss(a.u,a.v,o,t),c=Math.abs(n.x-l.x),u=Math.abs(n.y-l.y);if(c+u<=r)return a.id;const f={x:l.x,y:l.y+r},d={x:l.x+r,y:l.y},h={x:l.x-r,y:l.y},m={x:f.x,y:f.y+s},_={x:d.x,y:d.y+s},p={x:h.x,y:h.y+s};if(rl(n,[d,f,m,_])||rl(n,[f,h,p,m]))return a.id}}const Un=Object.freeze({left:60,right:660,top:320,bottom:1020});function bc(n,e){const t=n.cells.filter(u=>u.kind!=="blocked"),i=t.map(u=>(u.u-u.v)*ti),r=t.map(u=>-(u.u+u.v)*ti),s=e.map(u=>-(u.u+u.v)*ti-Ct-(Math.max(0,u.height-1)+(u.lift??0))*vo-ni),a=Math.min(...i)+Math.min(-Ct,Sr.left)-il,o=Math.max(...i)+Math.max(Ct,Sr.right)+il,l=Math.min(...r.map(u=>Math.min(u-Ct,u+12+sr-Sr.top-1)),...s),c=Math.max(...r)+Math.max(Ct+yc,13+sr-Sr.bottom);return Object.freeze({minX:a,minY:l,maxX:o,maxY:c,width:o-a,height:c-l})}function un(n,e){const t=bc(n,e),i=Math.min(Xu,(Un.right-Un.left)/t.width,(Un.bottom-Un.top)/(t.height*wn)),r=(Un.top+Un.bottom)/2;return Object.freeze({scale:i,layerRise:vo,originX:(Un.left+Un.right)/2-(t.minX+t.maxX)/2*i,originY:ft.height/2+(r-ft.height/2)/wn-(t.minY+t.maxY)/2*i})}function $u(n){const e=n.cells.filter(i=>i.kind!=="blocked"),t=[un(n,[]),...e.map(i=>un(n,[{...i,height:n.totalTiles,lift:Math.max(3,n.totalTiles*.75)}]))];return e.map(i=>{const r=t.map(s=>{const a=Zr(_o(i.u,i.v,0,s));return{left:a.x-Ct*s.scale,right:a.x+Ct*s.scale,top:a.y-Ct*s.scale*wn,bottom:a.y+(Ct+yc)*s.scale*wn}});return{left:Math.min(...r.map(s=>s.left)),right:Math.max(...r.map(s=>s.right)),top:Math.min(...r.map(s=>s.top)),bottom:Math.max(...r.map(s=>s.bottom))}})}function Zr(n){return Object.freeze({x:n.x,y:ft.height/2+(n.y-ft.height/2)*wn})}function Zu(n){return Object.freeze({x:n.x,y:ft.height/2+(n.y-ft.height/2)/wn})}function Ku(){const n=new Map,e=new Map;let t=typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,i=!1;function r(a){const o=n.get(a);n.delete(a),e.delete(a),o?.cancel(),a.removeAttribute("data-ui-leaving")}function s(a,o,l){if(r(a),t||typeof a.animate!="function"){l?.();return}o&&a.setAttribute("data-ui-leaving","");const c=a.animate(o?[{opacity:1,scale:1},{opacity:0,scale:.98}]:[{opacity:0,scale:.96,translate:"0 6px"},{opacity:1,scale:1,translate:"0 0"}],{duration:o?180:280,easing:"cubic-bezier(.2,.8,.2,1)",fill:"both"});n.set(a,c),l&&e.set(a,l),i&&c.pause(),c.finished.then(()=>{if(n.get(a)!==c)return;const u=e.get(a);r(a),u?.()}).catch(()=>{})}return Object.freeze({reveal(a){s(a,!1)},hide(a,o){s(a,!0,o)},cancel:r,update(a,o){if(t=a,i=o,t)for(const l of[...n.keys()]){const c=e.get(l);r(l),c?.()}else for(const l of n.values())i?l.pause():l.playState==="paused"&&l.play()},dispose(){for(const a of[...n.keys()])r(a)}})}function Ju({step:n=1/60,maxSteps:e=8}={}){if(!Number.isFinite(n)||n<=0||!Number.isInteger(e)||e<1)throw new RangeError("Invalid fixed-step configuration");let t=0;return{reset(){t=0},advance(i,r){if(!Number.isFinite(i)||i<0)throw new RangeError("Invalid frame delta");t+=i;let s=0;for(;t+n*1e-9>=n&&s<e;)r(n),t=Math.max(0,t-n),s++;const a=Math.floor((t+n*1e-9)/n)*n;return t=Math.max(0,t-a),{steps:s,alpha:Math.min(t/n,1),dropped:a}}}}function Qu(n=window){const e=new Set,t=s=>e.add(s.code),i=s=>e.delete(s.code),r=()=>e.clear();return n.addEventListener("keydown",t),n.addEventListener("keyup",i),n.addEventListener("blur",r),{keys:e,reset:r,dispose(){n.removeEventListener("keydown",t),n.removeEventListener("keyup",i),n.removeEventListener("blur",r),r()}}}function ju(n,e){const t=e.maxMovement??12,i=e.duplicateWindowMs??220,r=e.environment?.windowTarget??window,s=e.environment?.documentTarget??document;let a,o;const l=n.style.touchAction;n.style.touchAction="none";function c(_){const p=qu(_.clientX,_.clientY,n.getBoundingClientRect());return p?e.pickStack(p):void 0}function u(_){if(!_.isPrimary||a||_.pointerType==="mouse"&&_.button!==0)return;const p=c(_);if(p){a={pointerId:_.pointerId,stackId:p,x:_.clientX,y:_.clientY},_.preventDefault(),n.focus({preventScroll:!0});try{n.setPointerCapture(_.pointerId)}catch{}}}function f(_){if(!a||a.pointerId!==_.pointerId)return;const p=a;a=void 0,_.preventDefault();const g=Math.hypot(_.clientX-p.x,_.clientY-p.y),M=Number.isFinite(_.timeStamp)?_.timeStamp:performance.now(),T=o?.stackId===p.stackId&&M-o.at<i;g<=t&&c(_)===p.stackId&&!T&&e.activate(p.stackId)&&(o={stackId:p.stackId,at:M})}function d(_){if(_&&a?.pointerId!==_.pointerId)return;const p=a?.pointerId;if(a=void 0,p!==void 0)try{n.hasPointerCapture(p)&&n.releasePointerCapture(p)}catch{}}const h=()=>d(),m=()=>{s.hidden&&d()};return n.addEventListener("pointerdown",u),n.addEventListener("pointerup",f),n.addEventListener("pointercancel",d),n.addEventListener("lostpointercapture",d),r.addEventListener("blur",h),s.addEventListener("visibilitychange",m),Object.freeze({cancel:d,dispose(){d(),n.removeEventListener("pointerdown",u),n.removeEventListener("pointerup",f),n.removeEventListener("pointercancel",d),n.removeEventListener("lostpointercapture",d),r.removeEventListener("blur",h),s.removeEventListener("visibilitychange",m),n.style.touchAction=l}})}function ed(n,e,t=!1){if(!(!e||t)){if(["ArrowRight","ArrowUp"].includes(n.key))return"next";if(["ArrowLeft","ArrowDown"].includes(n.key))return"previous";if(n.key==="Enter"||n.code==="Space")return"launch";if(n.key.toLowerCase()==="z"||n.ctrlKey&&n.key.toLowerCase()==="z"||n.metaKey&&n.key.toLowerCase()==="z")return"undo";if(n.key.toLowerCase()==="r")return"restart";if(n.key==="Escape")return"menu"}}function td(n){return n instanceof HTMLElement?n.isContentEditable||!!n.closest('input, textarea, select, [contenteditable="true"], [role="textbox"]'):!1}function nd(n){const e=n.target??window;function t(i){const r=n.canvas();if(n.enabled&&!n.enabled())return;const s=n.scene.snapshot(),a=i.key==="Escape"&&s.phase==="Menu",o=ed(i,document.activeElement===r||a,td(i.target));if(!(!o||i.repeat&&o!=="next"&&o!=="previous"))if(o==="next"||o==="previous"){const l=n.scene.selectableStacks();if(!l.length)return;const c=o==="next"?1:-1,u=l.findIndex(h=>h.id===n.scene.selectedStackId()),f=u<0?c===1?l.length-1:0:u,d=l[(f+c+l.length)%l.length];n.scene.selectStack(d.id)&&(i.preventDefault(),n.announce("selection",l.indexOf(d)+1,l.length))}else if(o==="launch"&&s.phase==="Idle"){const l=n.scene.selectedStackId();l&&n.scene.launchStack(l)&&(i.preventDefault(),n.announce("move"))}else o==="undo"&&s.canUndo?(n.scene.undo(),i.preventDefault(),n.announce("undo")):o==="restart"&&["Idle","Won"].includes(s.phase)?(n.reset(),i.preventDefault(),n.announce("restart")):o==="menu"&&n.scene.toggleMenu()&&(i.preventDefault(),n.announce("menu"))}return e.addEventListener("keydown",t),Object.freeze({dispose(){e.removeEventListener("keydown",t)}})}const Ii=Object.freeze({background:"#60C0FE",tileTop:"#FFFAF1",tileBevel:"#FFFDF6",tileSideLight:"#EEE8DF",tileSideDark:"#CED0D0",floor:"#FFDA45",floorSeam:"#EEB229",arrow:"#FF922D",chevron:"#FFFFFF",shadow:"#3D83D2"});function Ji(n,e,t=e.moveCount,i,r=e.stacks,s=un(n,r)){const a=r===e.stacks?r.map(o=>{const l=n.cells.find(c=>c.u===o.u&&c.v===o.v);return l?.kind==="redirect"&&l.direction?{...o,launchDirection:l.direction}:o}):r;return Object.freeze({revision:t,level:n,projection:s,stacks:a,...i?{selectedStackId:i}:{}})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const xo="186",id=0,sl=1,rd=2,Kr=1,sd=2,Qi=3,ii=0,Ht=1,dn=2,Tn=0,tr=1,al=2,ol=3,ll=4,ad=5,Ti=100,od=101,ld=102,cd=103,ud=104,dd=200,fd=201,hd=202,pd=203,Ec=204,wc=205,md=206,gd=207,vd=208,_d=209,xd=210,Sd=211,Md=212,yd=213,bd=214,ha=0,pa=1,ma=2,ar=3,ga=4,va=5,_a=6,xa=7,Tc=0,Ed=1,wd=2,nn=0,Ac=1,Cc=2,Rc=3,Lc=4,Pc=5,Ic=6,Dc=7,Nc=300,ri=301,Fi=302,ws=303,Ts=304,hs=306,Sa=1e3,En=1001,Ma=1002,Rt=1003,Td=1004,Mr=1005,Nt=1006,As=1007,Qn=1008,Zt=1009,Uc=1010,Fc=1011,or=1012,So=1013,pn=1014,fn=1015,mn=1016,Mo=1017,yo=1018,lr=1020,Oc=35902,Bc=35899,kc=1021,zc=1022,tn=1023,Ln=1026,jn=1027,Hc=1028,bo=1029,si=1030,Eo=1031,wo=1033,Jr=33776,Qr=33777,jr=33778,es=33779,ya=35840,ba=35841,Ea=35842,wa=35843,Ta=36196,Aa=37492,Ca=37496,Ra=37488,La=37489,as=37490,Pa=37491,Ia=37808,Da=37809,Na=37810,Ua=37811,Fa=37812,Oa=37813,Ba=37814,ka=37815,za=37816,Ha=37817,Va=37818,Ga=37819,Wa=37820,Xa=37821,qa=36492,Ya=36494,$a=36495,Za=36283,Ka=36284,os=36285,Ja=36286,Ad=3200,cl=0,Cd=1,Gn="",Dt="srgb",ls="srgb-linear",cs="linear",rt="srgb",Cs=7680,Rd=519,Ld=512,Pd=513,Id=514,To=515,Dd=516,Nd=517,Ao=518,Ud=519,Fd=35044,ul="300 es",hn=2e3,us=2001;function Od(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function cr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Bd(){const n=cr("canvas");return n.style.display="block",n}const dl={};function fl(...n){const e="THREE."+n.shift();console.log(e,...n)}function Vc(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function ke(...n){n=Vc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function nt(...n){n=Vc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Di(...n){const e=n.join(" ");e in dl||(dl[e]=!0,ke(...n))}function kd(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const zd={[ha]:pa,[ma]:_a,[ga]:xa,[ar]:va,[pa]:ha,[_a]:ma,[xa]:ga,[va]:ar};class li{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Pt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Rs=Math.PI/180,Qa=180/Math.PI;function ki(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Pt[n&255]+Pt[n>>8&255]+Pt[n>>16&255]+Pt[n>>24&255]+"-"+Pt[e&255]+Pt[e>>8&255]+"-"+Pt[e>>16&15|64]+Pt[e>>24&255]+"-"+Pt[t&63|128]+Pt[t>>8&255]+"-"+Pt[t>>16&255]+Pt[t>>24&255]+Pt[i&255]+Pt[i>>8&255]+Pt[i>>16&255]+Pt[i>>24&255]).toLowerCase()}function Qe(n,e,t){return Math.max(e,Math.min(t,n))}function Hd(n,e){return(n%e+e)%e}function Ls(n,e,t){return(1-t)*n+t*e}function Vi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function zt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Oo=class Oo{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Oo.prototype.isVector2=!0;let Oe=Oo;class zi{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3],d=s[a+0],h=s[a+1],m=s[a+2],_=s[a+3];if(f!==_||l!==d||c!==h||u!==m){let p=l*d+c*h+u*m+f*_;p<0&&(d=-d,h=-h,m=-m,_=-_,p=-p);let g=1-o;if(p<.9995){const M=Math.acos(p),T=Math.sin(M);g=Math.sin(g*M)/T,o=Math.sin(o*M)/T,l=l*g+d*o,c=c*g+h*o,u=u*g+m*o,f=f*g+_*o}else{l=l*g+d*o,c=c*g+h*o,u=u*g+m*o,f=f*g+_*o;const M=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=M,c*=M,u*=M,f*=M}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[a],d=s[a+1],h=s[a+2],m=s[a+3];return e[t]=o*m+u*f+l*h-c*d,e[t+1]=l*m+u*d+c*f-o*h,e[t+2]=c*m+u*h+o*d-l*f,e[t+3]=u*m-o*f-l*d-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),f=o(s/2),d=l(i/2),h=l(r/2),m=l(s/2);switch(a){case"XYZ":this._x=d*u*f+c*h*m,this._y=c*h*f-d*u*m,this._z=c*u*m+d*h*f,this._w=c*u*f-d*h*m;break;case"YXZ":this._x=d*u*f+c*h*m,this._y=c*h*f-d*u*m,this._z=c*u*m-d*h*f,this._w=c*u*f+d*h*m;break;case"ZXY":this._x=d*u*f-c*h*m,this._y=c*h*f+d*u*m,this._z=c*u*m+d*h*f,this._w=c*u*f-d*h*m;break;case"ZYX":this._x=d*u*f-c*h*m,this._y=c*h*f+d*u*m,this._z=c*u*m-d*h*f,this._w=c*u*f+d*h*m;break;case"YZX":this._x=d*u*f+c*h*m,this._y=c*h*f+d*u*m,this._z=c*u*m-d*h*f,this._w=c*u*f-d*h*m;break;case"XZY":this._x=d*u*f-c*h*m,this._y=c*h*f-d*u*m,this._z=c*u*m+d*h*f,this._w=c*u*f+d*h*m;break;default:ke("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],d=i+o+f;if(d>0){const h=.5/Math.sqrt(d+1);this._w=.25/h,this._x=(u-l)*h,this._y=(s-c)*h,this._z=(a-r)*h}else if(i>o&&i>f){const h=2*Math.sqrt(1+i-o-f);this._w=(u-l)/h,this._x=.25*h,this._y=(r+a)/h,this._z=(s+c)/h}else if(o>f){const h=2*Math.sqrt(1+o-i-f);this._w=(s-c)/h,this._x=(r+a)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+f-i-o);this._w=(a-r)/h,this._x=(s+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Qe(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Bo=class Bo{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(hl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(hl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),u=2*(o*t-s*r),f=2*(s*i-a*t);return this.x=t+l*c+a*f-o*u,this.y=i+l*u+o*c-s*f,this.z=r+l*f+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this.z=Qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this.z=Qe(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ps.copy(this).projectOnVector(e),this.sub(Ps)}reflect(e){return this.sub(Ps.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Bo.prototype.isVector3=!0;let G=Bo;const Ps=new G,hl=new zi,ko=class ko{constructor(e,t,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],f=i[7],d=i[2],h=i[5],m=i[8],_=r[0],p=r[3],g=r[6],M=r[1],T=r[4],S=r[7],w=r[2],E=r[5],N=r[8];return s[0]=a*_+o*M+l*w,s[3]=a*p+o*T+l*E,s[6]=a*g+o*S+l*N,s[1]=c*_+u*M+f*w,s[4]=c*p+u*T+f*E,s[7]=c*g+u*S+f*N,s[2]=d*_+h*M+m*w,s[5]=d*p+h*T+m*E,s[8]=d*g+h*S+m*N,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,d=o*l-u*s,h=c*s-a*l,m=t*f+i*d+r*h;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return e[0]=f*_,e[1]=(r*c-u*i)*_,e[2]=(o*i-r*a)*_,e[3]=d*_,e[4]=(u*t-r*l)*_,e[5]=(r*s-o*t)*_,e[6]=h*_,e[7]=(i*l-c*t)*_,e[8]=(a*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Di("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Is.makeScale(e,t)),this}rotate(e){return Di("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Is.makeRotation(-e)),this}translate(e,t){return Di("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Is.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};ko.prototype.isMatrix3=!0;let Ge=ko;const Is=new Ge,pl=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ml=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Vd(){const n={enabled:!0,workingColorSpace:ls,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===rt&&(r.r=An(r.r),r.g=An(r.g),r.b=An(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===rt&&(r.r=Ni(r.r),r.g=Ni(r.g),r.b=Ni(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Gn?cs:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Di("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Di("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ls]:{primaries:e,whitePoint:i,transfer:cs,toXYZ:pl,fromXYZ:ml,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Dt},outputColorSpaceConfig:{drawingBufferColorSpace:Dt}},[Dt]:{primaries:e,whitePoint:i,transfer:rt,toXYZ:pl,fromXYZ:ml,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Dt}}}),n}const je=Vd();function An(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ni(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let di;class Gd{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{di===void 0&&(di=cr("canvas")),di.width=e.width,di.height=e.height;const r=di.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=di}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=cr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=An(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(An(t[i]/255)*255):t[i]=An(t[i]);return{data:t,width:e.width,height:e.height}}else return ke("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Wd=0;class Co{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Wd++}),this.uuid=ki(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Ds(r[a].image)):s.push(Ds(r[a]))}else s=Ds(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Ds(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Gd.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(ke("Texture: Unable to serialize Texture."),{})}let Xd=0;const Ns=new G;class Ut extends li{constructor(e=Ut.DEFAULT_IMAGE,t=Ut.DEFAULT_MAPPING,i=En,r=En,s=Nt,a=Qn,o=tn,l=Zt,c=Ut.DEFAULT_ANISOTROPY,u=Gn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xd++}),this.uuid=ki(),this.name="",this.source=new Co(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Oe(0,0),this.repeat=new Oe(1,1),this.center=new Oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ns).x}get height(){return this.source.getSize(Ns).y}get depth(){return this.source.getSize(Ns).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){ke(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){ke(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Nc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Sa:e.x=e.x-Math.floor(e.x);break;case En:e.x=e.x<0?0:1;break;case Ma:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Sa:e.y=e.y-Math.floor(e.y);break;case En:e.y=e.y<0?0:1;break;case Ma:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ut.DEFAULT_IMAGE=null;Ut.DEFAULT_MAPPING=Nc;Ut.DEFAULT_ANISOTROPY=1;const zo=class zo{constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],d=l[1],h=l[5],m=l[9],_=l[2],p=l[6],g=l[10];if(Math.abs(u-d)<.01&&Math.abs(f-_)<.01&&Math.abs(m-p)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+_)<.1&&Math.abs(m+p)<.1&&Math.abs(c+h+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const T=(c+1)/2,S=(h+1)/2,w=(g+1)/2,E=(u+d)/4,N=(f+_)/4,x=(m+p)/4;return T>S&&T>w?T<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(T),r=E/i,s=N/i):S>w?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=E/r,s=x/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=N/s,r=x/s),this.set(i,r,s,t),this}let M=Math.sqrt((p-m)*(p-m)+(f-_)*(f-_)+(d-u)*(d-u));return Math.abs(M)<.001&&(M=1),this.x=(p-m)/M,this.y=(f-_)/M,this.z=(d-u)/M,this.w=Math.acos((c+h+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this.z=Qe(this.z,e.z,t.z),this.w=Qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this.z=Qe(this.z,e,t),this.w=Qe(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};zo.prototype.isVector4=!0;let vt=zo;class qd extends li{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new vt(0,0,e,t),this.scissorTest=!1,this.viewport=new vt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new Ut(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Nt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Co(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class rn extends qd{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Gc extends Ut{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Yd extends Ut{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const fs=class fs{constructor(e,t,i,r,s,a,o,l,c,u,f,d,h,m,_,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,u,f,d,h,m,_,p)}set(e,t,i,r,s,a,o,l,c,u,f,d,h,m,_,p){const g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=r,g[1]=s,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=u,g[10]=f,g[14]=d,g[3]=h,g[7]=m,g[11]=_,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new fs().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/fi.setFromMatrixColumn(e,0).length(),s=1/fi.setFromMatrixColumn(e,1).length(),a=1/fi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const d=a*u,h=a*f,m=o*u,_=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=h+m*c,t[5]=d-_*c,t[9]=-o*l,t[2]=_-d*c,t[6]=m+h*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,h=l*f,m=c*u,_=c*f;t[0]=d+_*o,t[4]=m*o-h,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=h*o-m,t[6]=_+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,h=l*f,m=c*u,_=c*f;t[0]=d-_*o,t[4]=-a*f,t[8]=m+h*o,t[1]=h+m*o,t[5]=a*u,t[9]=_-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,h=a*f,m=o*u,_=o*f;t[0]=l*u,t[4]=m*c-h,t[8]=d*c+_,t[1]=l*f,t[5]=_*c+d,t[9]=h*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,h=a*c,m=o*l,_=o*c;t[0]=l*u,t[4]=_-d*f,t[8]=m*f+h,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=h*f+m,t[10]=d-_*f}else if(e.order==="XZY"){const d=a*l,h=a*c,m=o*l,_=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=d*f+_,t[5]=a*u,t[9]=h*f-m,t[2]=m*f-h,t[6]=o*u,t[10]=_*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose($d,e,Zd)}lookAt(e,t,i){const r=this.elements;return Wt.subVectors(e,t),Wt.lengthSq()===0&&(Wt.z=1),Wt.normalize(),Fn.crossVectors(i,Wt),Fn.lengthSq()===0&&(Math.abs(i.z)===1?Wt.x+=1e-4:Wt.z+=1e-4,Wt.normalize(),Fn.crossVectors(i,Wt)),Fn.normalize(),yr.crossVectors(Wt,Fn),r[0]=Fn.x,r[4]=yr.x,r[8]=Wt.x,r[1]=Fn.y,r[5]=yr.y,r[9]=Wt.y,r[2]=Fn.z,r[6]=yr.z,r[10]=Wt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],f=i[5],d=i[9],h=i[13],m=i[2],_=i[6],p=i[10],g=i[14],M=i[3],T=i[7],S=i[11],w=i[15],E=r[0],N=r[4],x=r[8],b=r[12],I=r[1],A=r[5],P=r[9],R=r[13],U=r[2],B=r[6],Z=r[10],H=r[14],X=r[3],W=r[7],J=r[11],te=r[15];return s[0]=a*E+o*I+l*U+c*X,s[4]=a*N+o*A+l*B+c*W,s[8]=a*x+o*P+l*Z+c*J,s[12]=a*b+o*R+l*H+c*te,s[1]=u*E+f*I+d*U+h*X,s[5]=u*N+f*A+d*B+h*W,s[9]=u*x+f*P+d*Z+h*J,s[13]=u*b+f*R+d*H+h*te,s[2]=m*E+_*I+p*U+g*X,s[6]=m*N+_*A+p*B+g*W,s[10]=m*x+_*P+p*Z+g*J,s[14]=m*b+_*R+p*H+g*te,s[3]=M*E+T*I+S*U+w*X,s[7]=M*N+T*A+S*B+w*W,s[11]=M*x+T*P+S*Z+w*J,s[15]=M*b+T*R+S*H+w*te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],d=e[10],h=e[14],m=e[3],_=e[7],p=e[11],g=e[15],M=l*h-c*d,T=o*h-c*f,S=o*d-l*f,w=a*h-c*u,E=a*d-l*u,N=a*f-o*u;return t*(_*M-p*T+g*S)-i*(m*M-p*w+g*E)+r*(m*T-_*w+g*N)-s*(m*S-_*E+p*N)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-i*(s*u-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],d=e[10],h=e[11],m=e[12],_=e[13],p=e[14],g=e[15],M=t*o-i*a,T=t*l-r*a,S=t*c-s*a,w=i*l-r*o,E=i*c-s*o,N=r*c-s*l,x=u*_-f*m,b=u*p-d*m,I=u*g-h*m,A=f*p-d*_,P=f*g-h*_,R=d*g-h*p,U=M*R-T*P+S*A+w*I-E*b+N*x;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/U;return e[0]=(o*R-l*P+c*A)*B,e[1]=(r*P-i*R-s*A)*B,e[2]=(_*N-p*E+g*w)*B,e[3]=(d*E-f*N-h*w)*B,e[4]=(l*I-a*R-c*b)*B,e[5]=(t*R-r*I+s*b)*B,e[6]=(p*S-m*N-g*T)*B,e[7]=(u*N-d*S+h*T)*B,e[8]=(a*P-o*I+c*x)*B,e[9]=(i*I-t*P-s*x)*B,e[10]=(m*E-_*S+g*M)*B,e[11]=(f*S-u*E-h*M)*B,e[12]=(o*b-a*A-l*x)*B,e[13]=(t*A-i*b+r*x)*B,e[14]=(_*T-m*w-p*M)*B,e[15]=(u*w-f*T+d*M)*B,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,f=o+o,d=s*c,h=s*u,m=s*f,_=a*u,p=a*f,g=o*f,M=l*c,T=l*u,S=l*f,w=i.x,E=i.y,N=i.z;return r[0]=(1-(_+g))*w,r[1]=(h+S)*w,r[2]=(m-T)*w,r[3]=0,r[4]=(h-S)*E,r[5]=(1-(d+g))*E,r[6]=(p+M)*E,r[7]=0,r[8]=(m+T)*N,r[9]=(p-M)*N,r[10]=(1-(d+_))*N,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=fi.set(r[0],r[1],r[2]).length();const o=fi.set(r[4],r[5],r[6]).length(),l=fi.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Kt.copy(this);const c=1/a,u=1/o,f=1/l;return Kt.elements[0]*=c,Kt.elements[1]*=c,Kt.elements[2]*=c,Kt.elements[4]*=u,Kt.elements[5]*=u,Kt.elements[6]*=u,Kt.elements[8]*=f,Kt.elements[9]*=f,Kt.elements[10]*=f,t.setFromRotationMatrix(Kt),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,r,s,a,o=hn,l=!1){const c=this.elements,u=2*s/(t-e),f=2*s/(i-r),d=(t+e)/(t-e),h=(i+r)/(i-r);let m,_;if(l)m=s/(a-s),_=a*s/(a-s);else if(o===hn)m=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===us)m=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=f,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=hn,l=!1){const c=this.elements,u=2/(t-e),f=2/(i-r),d=-(t+e)/(t-e),h=-(i+r)/(i-r);let m,_;if(l)m=1/(a-s),_=a/(a-s);else if(o===hn)m=-2/(a-s),_=-(a+s)/(a-s);else if(o===us)m=-1/(a-s),_=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=f,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};fs.prototype.isMatrix4=!0;let St=fs;const fi=new G,Kt=new St,$d=new G(0,0,0),Zd=new G(1,1,1),Fn=new G,yr=new G,Wt=new G,gl=new St,vl=new zi;class ai{constructor(e=0,t=0,i=0,r=ai.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],f=r[2],d=r[6],h=r[10];switch(t){case"XYZ":this._y=Math.asin(Qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Qe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,h),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Qe(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,h),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,h));break;case"XZY":this._z=Math.asin(-Qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,h),this._y=0);break;default:ke("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return gl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(gl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return vl.setFromEuler(this),this.setFromQuaternion(vl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ai.DEFAULT_ORDER="XYZ";class Wc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Kd=0;const _l=new G,hi=new zi,xn=new St,br=new G,Gi=new G,Jd=new G,Qd=new zi,xl=new G(1,0,0),Sl=new G(0,1,0),Ml=new G(0,0,1),yl={type:"added"},jd={type:"removed"},pi={type:"childadded",child:null},Us={type:"childremoved",child:null};class qt extends li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Kd++}),this.uuid=ki(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=qt.DEFAULT_UP.clone();const e=new G,t=new ai,i=new zi,r=new G(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new St},normalMatrix:{value:new Ge}}),this.matrix=new St,this.matrixWorld=new St,this.matrixAutoUpdate=qt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Wc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return hi.setFromAxisAngle(e,t),this.quaternion.multiply(hi),this}rotateOnWorldAxis(e,t){return hi.setFromAxisAngle(e,t),this.quaternion.premultiply(hi),this}rotateX(e){return this.rotateOnAxis(xl,e)}rotateY(e){return this.rotateOnAxis(Sl,e)}rotateZ(e){return this.rotateOnAxis(Ml,e)}translateOnAxis(e,t){return _l.copy(e).applyQuaternion(this.quaternion),this.position.add(_l.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(xl,e)}translateY(e){return this.translateOnAxis(Sl,e)}translateZ(e){return this.translateOnAxis(Ml,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?br.copy(e):br.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Gi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xn.lookAt(Gi,br,this.up):xn.lookAt(br,Gi,this.up),this.quaternion.setFromRotationMatrix(xn),r&&(xn.extractRotation(r.matrixWorld),hi.setFromRotationMatrix(xn),this.quaternion.premultiply(hi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(nt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(yl),pi.child=e,this.dispatchEvent(pi),pi.child=null):nt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(jd),Us.child=e,this.dispatchEvent(Us),Us.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xn.multiply(e.parent.matrixWorld)),e.applyMatrix4(xn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(yl),pi.child=e,this.dispatchEvent(pi),pi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gi,e,Jd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gi,Qd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),d=a(e.skeletons),h=a(e.animations),m=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),h.length>0&&(i.animations=h),m.length>0&&(i.nodes=m)}return i.object=r,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}qt.DEFAULT_UP=new G(0,1,0);qt.DEFAULT_MATRIX_AUTO_UPDATE=!0;qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Er extends qt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ef={type:"move"};class Fs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Er,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Er,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Er,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,i),g=this._getHandJoint(c,_);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=u.position.distanceTo(f.position),h=.02,m=.005;c.inputState.pinching&&d>h+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=h-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ef)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Er;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Xc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},On={h:0,s:0,l:0},wr={h:0,s:0,l:0};function Os(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class qe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Dt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=je.workingColorSpace){return this.r=e,this.g=t,this.b=i,je.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=je.workingColorSpace){if(e=Hd(e,1),t=Qe(t,0,1),i=Qe(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Os(a,s,e+1/3),this.g=Os(a,s,e),this.b=Os(a,s,e-1/3)}return je.colorSpaceToWorking(this,r),this}setStyle(e,t=Dt){function i(s){s!==void 0&&parseFloat(s)<1&&ke("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:ke("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);ke("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Dt){const i=Xc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):ke("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=An(e.r),this.g=An(e.g),this.b=An(e.b),this}copyLinearToSRGB(e){return this.r=Ni(e.r),this.g=Ni(e.g),this.b=Ni(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Dt){return je.workingToColorSpace(It.copy(this),e),Math.round(Qe(It.r*255,0,255))*65536+Math.round(Qe(It.g*255,0,255))*256+Math.round(Qe(It.b*255,0,255))}getHexString(e=Dt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=je.workingColorSpace){je.workingToColorSpace(It.copy(this),t);const i=It.r,r=It.g,s=It.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=je.workingColorSpace){return je.workingToColorSpace(It.copy(this),t),e.r=It.r,e.g=It.g,e.b=It.b,e}getStyle(e=Dt){je.workingToColorSpace(It.copy(this),e);const t=It.r,i=It.g,r=It.b;return e!==Dt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(On),this.setHSL(On.h+e,On.s+t,On.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(On),e.getHSL(wr);const i=Ls(On.h,wr.h,t),r=Ls(On.s,wr.s,t),s=Ls(On.l,wr.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const It=new qe;qe.NAMES=Xc;class Bs extends qt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ai,this.environmentIntensity=1,this.environmentRotation=new ai,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Jt=new G,Sn=new G,ks=new G,Mn=new G,mi=new G,gi=new G,bl=new G,zs=new G,Hs=new G,Vs=new G,Gs=new vt,Ws=new vt,Xs=new vt;class en{constructor(e=new G,t=new G,i=new G){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Jt.subVectors(e,t),r.cross(Jt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Jt.subVectors(r,t),Sn.subVectors(i,t),ks.subVectors(e,t);const a=Jt.dot(Jt),o=Jt.dot(Sn),l=Jt.dot(ks),c=Sn.dot(Sn),u=Sn.dot(ks),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const d=1/f,h=(c*l-o*u)*d,m=(a*u-o*l)*d;return s.set(1-h-m,m,h)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Mn)===null?!1:Mn.x>=0&&Mn.y>=0&&Mn.x+Mn.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,Mn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Mn.x),l.addScaledVector(a,Mn.y),l.addScaledVector(o,Mn.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return Gs.setScalar(0),Ws.setScalar(0),Xs.setScalar(0),Gs.fromBufferAttribute(e,t),Ws.fromBufferAttribute(e,i),Xs.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Gs,s.x),a.addScaledVector(Ws,s.y),a.addScaledVector(Xs,s.z),a}static isFrontFacing(e,t,i,r){return Jt.subVectors(i,t),Sn.subVectors(e,t),Jt.cross(Sn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Jt.subVectors(this.c,this.b),Sn.subVectors(this.a,this.b),Jt.cross(Sn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return en.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return en.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return en.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return en.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return en.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;mi.subVectors(r,i),gi.subVectors(s,i),zs.subVectors(e,i);const l=mi.dot(zs),c=gi.dot(zs);if(l<=0&&c<=0)return t.copy(i);Hs.subVectors(e,r);const u=mi.dot(Hs),f=gi.dot(Hs);if(u>=0&&f<=u)return t.copy(r);const d=l*f-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(mi,a);Vs.subVectors(e,s);const h=mi.dot(Vs),m=gi.dot(Vs);if(m>=0&&h<=m)return t.copy(s);const _=h*c-l*m;if(_<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(i).addScaledVector(gi,o);const p=u*m-h*f;if(p<=0&&f-u>=0&&h-m>=0)return bl.subVectors(s,r),o=(f-u)/(f-u+(h-m)),t.copy(r).addScaledVector(bl,o);const g=1/(p+_+d);return a=_*g,o=d*g,t.copy(i).addScaledVector(mi,a).addScaledVector(gi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class mr{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Qt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Qt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Qt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Qt):Qt.fromBufferAttribute(s,a),Qt.applyMatrix4(e.matrixWorld),this.expandByPoint(Qt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Tr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Tr.copy(i.boundingBox)),Tr.applyMatrix4(e.matrixWorld),this.union(Tr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Qt),Qt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Wi),Ar.subVectors(this.max,Wi),vi.subVectors(e.a,Wi),_i.subVectors(e.b,Wi),xi.subVectors(e.c,Wi),Bn.subVectors(_i,vi),kn.subVectors(xi,_i),qn.subVectors(vi,xi);let t=[0,-Bn.z,Bn.y,0,-kn.z,kn.y,0,-qn.z,qn.y,Bn.z,0,-Bn.x,kn.z,0,-kn.x,qn.z,0,-qn.x,-Bn.y,Bn.x,0,-kn.y,kn.x,0,-qn.y,qn.x,0];return!qs(t,vi,_i,xi,Ar)||(t=[1,0,0,0,1,0,0,0,1],!qs(t,vi,_i,xi,Ar))?!1:(Cr.crossVectors(Bn,kn),t=[Cr.x,Cr.y,Cr.z],qs(t,vi,_i,xi,Ar))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Qt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Qt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(yn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const yn=[new G,new G,new G,new G,new G,new G,new G,new G],Qt=new G,Tr=new mr,vi=new G,_i=new G,xi=new G,Bn=new G,kn=new G,qn=new G,Wi=new G,Ar=new G,Cr=new G,Yn=new G;function qs(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Yn.fromArray(n,s);const o=r.x*Math.abs(Yn.x)+r.y*Math.abs(Yn.y)+r.z*Math.abs(Yn.z),l=e.dot(Yn),c=t.dot(Yn),u=i.dot(Yn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const yt=new G,Rr=new Oe;let tf=0;class Cn extends li{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:tf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Fd,this.updateRanges=[],this.gpuType=fn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Rr.fromBufferAttribute(this,t),Rr.applyMatrix3(e),this.setXY(t,Rr.x,Rr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix3(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix4(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.applyNormalMatrix(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.transformDirection(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Vi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=zt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Vi(t,this.array)),t}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Vi(t,this.array)),t}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Vi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Vi(t,this.array)),t}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array),r=zt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array),r=zt(r,this.array),s=zt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class qc extends Cn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Yc extends Cn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class bt extends Cn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const nf=new mr,Xi=new G,Ys=new G;class Ro{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):nf.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Xi.subVectors(e,this.center);const t=Xi.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Xi,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ys.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Xi.copy(e.center).add(Ys)),this.expandByPoint(Xi.copy(e.center).sub(Ys))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let rf=0;const $t=new St,$s=new qt,Si=new G,Xt=new mr,qi=new mr,At=new G;class Vt extends li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rf++}),this.uuid=ki(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Od(e)?Yc:qc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ge().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return $t.makeRotationFromQuaternion(e),this.applyMatrix4($t),this}rotateX(e){return $t.makeRotationX(e),this.applyMatrix4($t),this}rotateY(e){return $t.makeRotationY(e),this.applyMatrix4($t),this}rotateZ(e){return $t.makeRotationZ(e),this.applyMatrix4($t),this}translate(e,t,i){return $t.makeTranslation(e,t,i),this.applyMatrix4($t),this}scale(e,t,i){return $t.makeScale(e,t,i),this.applyMatrix4($t),this}lookAt(e){return $s.lookAt(e),$s.updateMatrix(),this.applyMatrix4($s.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Si).negate(),this.translate(Si.x,Si.y,Si.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new bt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&ke("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new mr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){nt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Xt.setFromBufferAttribute(s),this.morphTargetsRelative?(At.addVectors(this.boundingBox.min,Xt.min),this.boundingBox.expandByPoint(At),At.addVectors(this.boundingBox.max,Xt.max),this.boundingBox.expandByPoint(At)):(this.boundingBox.expandByPoint(Xt.min),this.boundingBox.expandByPoint(Xt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&nt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ro);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){nt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(e){const i=this.boundingSphere.center;if(Xt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];qi.setFromBufferAttribute(o),this.morphTargetsRelative?(At.addVectors(Xt.min,qi.min),Xt.expandByPoint(At),At.addVectors(Xt.max,qi.max),Xt.expandByPoint(At)):(Xt.expandByPoint(qi.min),Xt.expandByPoint(qi.max))}Xt.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)At.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(At));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)At.fromBufferAttribute(o,c),l&&(Si.fromBufferAttribute(e,c),At.add(Si)),r=Math.max(r,i.distanceToSquared(At))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&nt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){nt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Cn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let x=0;x<i.count;x++)o[x]=new G,l[x]=new G;const c=new G,u=new G,f=new G,d=new Oe,h=new Oe,m=new Oe,_=new G,p=new G;function g(x,b,I){c.fromBufferAttribute(i,x),u.fromBufferAttribute(i,b),f.fromBufferAttribute(i,I),d.fromBufferAttribute(s,x),h.fromBufferAttribute(s,b),m.fromBufferAttribute(s,I),u.sub(c),f.sub(c),h.sub(d),m.sub(d);const A=1/(h.x*m.y-m.x*h.y);isFinite(A)&&(_.copy(u).multiplyScalar(m.y).addScaledVector(f,-h.y).multiplyScalar(A),p.copy(f).multiplyScalar(h.x).addScaledVector(u,-m.x).multiplyScalar(A),o[x].add(_),o[b].add(_),o[I].add(_),l[x].add(p),l[b].add(p),l[I].add(p))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let x=0,b=M.length;x<b;++x){const I=M[x],A=I.start,P=I.count;for(let R=A,U=A+P;R<U;R+=3)g(e.getX(R+0),e.getX(R+1),e.getX(R+2))}const T=new G,S=new G,w=new G,E=new G;function N(x){w.fromBufferAttribute(r,x),E.copy(w);const b=o[x];T.copy(b),T.sub(w.multiplyScalar(w.dot(b))).normalize(),S.crossVectors(E,b);const A=S.dot(l[x])<0?-1:1;a.setXYZW(x,T.x,T.y,T.z,A)}for(let x=0,b=M.length;x<b;++x){const I=M[x],A=I.start,P=I.count;for(let R=A,U=A+P;R<U;R+=3)N(e.getX(R+0)),N(e.getX(R+1)),N(e.getX(R+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Cn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,h=i.count;d<h;d++)i.setXYZ(d,0,0,0);const r=new G,s=new G,a=new G,o=new G,l=new G,c=new G,u=new G,f=new G;if(e)for(let d=0,h=e.count;d<h;d+=3){const m=e.getX(d+0),_=e.getX(d+1),p=e.getX(d+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,p),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(i,m),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,p),o.add(u),l.add(u),c.add(u),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,h=t.count;d<h;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)At.fromBufferAttribute(e,t),At.normalize(),e.setXYZ(t,At.x,At.y,At.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,f=o.normalized,d=new c.constructor(l.length*u);let h=0,m=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?h=l[_]*o.data.stride+o.offset:h=l[_]*u;for(let g=0;g<u;g++)d[m++]=c[h++]}return new Cn(d,u,f)}if(this.index===null)return ke("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Vt,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,f=c.length;u<f;u++){const d=c[u],h=e(d,i);l.push(h)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,d=c.length;f<d;f++){const h=c[f];u.push(h.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let d=0,h=f.length;d<h;d++)u.push(f[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Zs=new G,sf=new G,af=new Ge;class Vn{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Zs.subVectors(i,t).cross(sf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(Zs),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||af.getNormalMatrix(e),r=this.coplanarPoint(Zs).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let of=0;class ps extends li{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:of++}),this.uuid=ki(),this.name="",this.type="Material",this.blending=tr,this.side=ii,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ec,this.blendDst=wc,this.blendEquation=Ti,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=ar,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Rd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Cs,this.stencilZFail=Cs,this.stencilZPass=Cs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){ke(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){ke(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new qe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Vn().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Oe().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Oe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const bn=new G,Ks=new G,Lr=new G,Pr=new G;class lf{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,bn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=bn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(bn.copy(this.origin).addScaledVector(this.direction,t),bn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Ks.copy(e).add(t).multiplyScalar(.5),Lr.copy(t).sub(e).normalize(),Pr.copy(this.origin).sub(Ks);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Lr),o=Pr.dot(this.direction),l=-Pr.dot(Lr),c=Pr.lengthSq(),u=Math.abs(1-a*a);let f,d,h,m;if(u>0)if(f=a*l-o,d=a*o-l,m=s*u,f>=0)if(d>=-m)if(d<=m){const _=1/u;f*=_,d*=_,h=f*(f+a*d+2*o)+d*(a*f+d+2*l)+c}else d=s,f=Math.max(0,-(a*d+o)),h=-f*f+d*(d+2*l)+c;else d=-s,f=Math.max(0,-(a*d+o)),h=-f*f+d*(d+2*l)+c;else d<=-m?(f=Math.max(0,-(-a*s+o)),d=f>0?-s:Math.min(Math.max(-s,-l),s),h=-f*f+d*(d+2*l)+c):d<=m?(f=0,d=Math.min(Math.max(-s,-l),s),h=d*(d+2*l)+c):(f=Math.max(0,-(a*s+o)),d=f>0?s:Math.min(Math.max(-s,-l),s),h=-f*f+d*(d+2*l)+c);else d=a>0?-s:s,f=Math.max(0,-(a*d+o)),h=-f*f+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Ks).addScaledVector(Lr,d),h}intersectSphere(e,t){if(e.radius<0)return null;bn.subVectors(e.center,this.origin);const i=bn.dot(this.direction),r=bn.dot(bn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,bn)!==null}intersectTriangle(e,t,i,r,s){const a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,f=e.x-a.x,d=e.y-a.y,h=e.z-a.z,m=t.x-a.x,_=t.y-a.y,p=t.z-a.z,g=i.x-a.x,M=i.y-a.y,T=i.z-a.z,S=Math.abs(l),w=Math.abs(c),E=Math.abs(u);let N,x,b,I,A,P,R,U,B,Z,H,X;if(S>=w&&S>=E?(b=l,P=f,B=m,X=g,l>=0?(N=c,x=u,I=d,A=h,R=_,U=p,Z=M,H=T):(N=u,x=c,I=h,A=d,R=p,U=_,Z=T,H=M)):w>=E?(b=c,P=d,B=_,X=M,c>=0?(N=u,x=l,I=h,A=f,R=p,U=m,Z=T,H=g):(N=l,x=u,I=f,A=h,R=m,U=p,Z=g,H=T)):(b=u,P=h,B=p,X=T,u>=0?(N=l,x=c,I=f,A=d,R=m,U=_,Z=g,H=M):(N=c,x=l,I=d,A=f,R=_,U=m,Z=M,H=g)),b===0)return null;const W=N/b,J=x/b,te=1/b,fe=I-W*P,q=A-J*P,oe=R-W*B,he=U-J*B,Ae=Z-W*X,z=H-J*X,K=Ae*he-z*oe,ae=fe*z-q*Ae,ue=oe*q-he*fe;if(r){if(K<0||ae<0||ue<0)return null}else if((K<0||ae<0||ue<0)&&(K>0||ae>0||ue>0))return null;const de=K+ae+ue;if(de===0)return null;const pe=te*(K*P+ae*B+ue*X);return(de>0?pe<0:pe>0)?null:this.at(pe/de,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ot extends ps{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ai,this.combine=Tc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const El=new St,$n=new lf,Ir=new Ro,wl=new G,Dr=new G,Nr=new G,Ur=new G,Js=new G,Fr=new G,Tl=new G,Or=new G;class gn extends qt{constructor(e=new Vt,t=new ot){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Fr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],f=s[l];u!==0&&(Js.fromBufferAttribute(f,e),a?Fr.addScaledVector(Js,u):Fr.addScaledVector(Js.sub(t),u))}t.add(Fr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ir.copy(i.boundingSphere),Ir.applyMatrix4(s),$n.copy(e.ray).recast(e.near),!(Ir.containsPoint($n.origin)===!1&&($n.intersectSphere(Ir,wl)===null||$n.origin.distanceToSquared(wl)>(e.far-e.near)**2))&&(El.copy(s).invert(),$n.copy(e.ray).applyMatrix4(El),!(i.boundingBox!==null&&$n.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,$n)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,d=s.groups,h=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){const p=d[m],g=a[p.materialIndex],M=Math.max(p.start,h.start),T=Math.min(o.count,Math.min(p.start+p.count,h.start+h.count));for(let S=M,w=T;S<w;S+=3){const E=o.getX(S),N=o.getX(S+1),x=o.getX(S+2);r=Br(this,g,e,i,c,u,f,E,N,x),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const m=Math.max(0,h.start),_=Math.min(o.count,h.start+h.count);for(let p=m,g=_;p<g;p+=3){const M=o.getX(p),T=o.getX(p+1),S=o.getX(p+2);r=Br(this,a,e,i,c,u,f,M,T,S),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){const p=d[m],g=a[p.materialIndex],M=Math.max(p.start,h.start),T=Math.min(l.count,Math.min(p.start+p.count,h.start+h.count));for(let S=M,w=T;S<w;S+=3){const E=S,N=S+1,x=S+2;r=Br(this,g,e,i,c,u,f,E,N,x),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const m=Math.max(0,h.start),_=Math.min(l.count,h.start+h.count);for(let p=m,g=_;p<g;p+=3){const M=p,T=p+1,S=p+2;r=Br(this,a,e,i,c,u,f,M,T,S),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function cf(n,e,t,i,r,s,a,o){let l;if(e.side===Ht?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===ii,o),l===null)return null;Or.copy(o),Or.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Or);return c<t.near||c>t.far?null:{distance:c,point:Or.clone(),object:n}}function Br(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,Dr),n.getVertexPosition(l,Nr),n.getVertexPosition(c,Ur);const u=cf(n,e,t,i,Dr,Nr,Ur,Tl);if(u){const f=new G;en.getBarycoord(Tl,Dr,Nr,Ur,f),r&&(u.uv=en.getInterpolatedAttribute(r,o,l,c,f,new Oe)),s&&(u.uv1=en.getInterpolatedAttribute(s,o,l,c,f,new Oe)),a&&(u.normal=en.getInterpolatedAttribute(a,o,l,c,f,new G),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new G,materialIndex:0};en.getNormal(Dr,Nr,Ur,d.normal),u.face=d,u.barycoord=f}return u}class uf extends Ut{constructor(e=null,t=1,i=1,r,s,a,o,l,c=Rt,u=Rt,f,d){super(null,a,o,l,c,u,r,s,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Zn=new Ro,df=new Oe(.5,.5),kr=new G;class $c{constructor(e=new Vn,t=new Vn,i=new Vn,r=new Vn,s=new Vn,a=new Vn){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=hn,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],f=s[5],d=s[6],h=s[7],m=s[8],_=s[9],p=s[10],g=s[11],M=s[12],T=s[13],S=s[14],w=s[15];if(r[0].setComponents(c-a,h-u,g-m,w-M).normalize(),r[1].setComponents(c+a,h+u,g+m,w+M).normalize(),r[2].setComponents(c+o,h+f,g+_,w+T).normalize(),r[3].setComponents(c-o,h-f,g-_,w-T).normalize(),i)r[4].setComponents(l,d,p,S).normalize(),r[5].setComponents(c-l,h-d,g-p,w-S).normalize();else if(r[4].setComponents(c-l,h-d,g-p,w-S).normalize(),t===hn)r[5].setComponents(c+l,h+d,g+p,w+S).normalize();else if(t===us)r[5].setComponents(l,d,p,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Zn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Zn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Zn)}intersectsSprite(e){Zn.center.set(0,0,0);const t=df.distanceTo(e.center);return Zn.radius=.7071067811865476+t,Zn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Zn)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(kr.x=r.normal.x>0?e.max.x:e.min.x,kr.y=r.normal.y>0?e.max.y:e.min.y,kr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(kr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Zc extends Ut{constructor(e=[],t=ri,i,r,s,a,o,l,c,u){super(e,t,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ur extends Ut{constructor(e,t,i=pn,r,s,a,o=Rt,l=Rt,c,u=Ln,f=1){if(u!==Ln&&u!==jn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:f};super(d,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Co(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class ff extends ur{constructor(e,t=pn,i=ri,r,s,a=Rt,o=Rt,l,c=Ln){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,i,r,s,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Kc extends Ut{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class gr extends Vt{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],f=[];let d=0,h=0;m("z","y","x",-1,-1,i,t,e,a,s,0),m("z","y","x",1,-1,i,t,-e,a,s,1),m("x","z","y",1,1,e,i,t,r,a,2),m("x","z","y",1,-1,e,i,-t,r,a,3),m("x","y","z",1,-1,e,t,i,r,s,4),m("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new bt(c,3)),this.setAttribute("normal",new bt(u,3)),this.setAttribute("uv",new bt(f,2));function m(_,p,g,M,T,S,w,E,N,x,b){const I=S/N,A=w/x,P=S/2,R=w/2,U=E/2,B=N+1,Z=x+1;let H=0,X=0;const W=new G;for(let J=0;J<Z;J++){const te=J*A-R;for(let fe=0;fe<B;fe++){const q=fe*I-P;W[_]=q*M,W[p]=te*T,W[g]=U,c.push(W.x,W.y,W.z),W[_]=0,W[p]=0,W[g]=E>0?1:-1,u.push(W.x,W.y,W.z),f.push(fe/N),f.push(1-J/x),H+=1}}for(let J=0;J<x;J++)for(let te=0;te<N;te++){const fe=d+te+B*J,q=d+te+B*(J+1),oe=d+(te+1)+B*(J+1),he=d+(te+1)+B*J;l.push(fe,q,he),l.push(q,oe,he),X+=6}o.addGroup(h,X,b),h+=X,d+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class _n{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){ke("Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let r=0;const s=i.length;let a;t?a=t:a=e*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=i[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===a)return r/(s-1);const u=i[r],d=i[r+1]-u,h=(a-u)/d;return(r+h)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new Oe:new G);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new G,r=[],s=[],a=[],o=new G,l=new St;for(let h=0;h<=e;h++){const m=h/e;r[h]=this.getTangentAt(m,new G)}s[0]=new G,a[0]=new G;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),f=Math.abs(r[0].y),d=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),f<=c&&(c=f,i.set(0,1,0)),d<=c&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let h=1;h<=e;h++){if(s[h]=s[h-1].clone(),a[h]=a[h-1].clone(),o.crossVectors(r[h-1],r[h]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(Qe(r[h-1].dot(r[h]),-1,1));s[h].applyMatrix4(l.makeRotationAxis(o,m))}a[h].crossVectors(r[h],s[h])}if(t===!0){let h=Math.acos(Qe(s[0].dot(s[e]),-1,1));h/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(h=-h);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(r[m],h*m)),a[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Lo extends _n{constructor(e=0,t=0,i=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new Oe){const i=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),d=l-this.aX,h=c-this.aY;l=d*u-h*f+this.aX,c=d*f+h*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class hf extends Lo{constructor(e,t,i,r,s,a){super(e,t,i,i,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Po(){let n=0,e=0,t=0,i=0;function r(s,a,o,l){n=s,e=o,t=-3*s+3*a-2*o-l,i=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,f){let d=(a-s)/c-(o-s)/(c+u)+(o-a)/u,h=(o-a)/u-(l-a)/(u+f)+(l-o)/f;d*=u,h*=u,r(a,o,d,h)},calc:function(s){const a=s*s,o=a*s;return n+e*s+t*a+i*o}}}const Al=new G,Cl=new G,Qs=new Po,js=new Po,ea=new Po;class pf extends _n{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new G){const i=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=r[(o-1)%s]:(Cl.subVectors(r[0],r[1]).add(r[0]),c=Cl);const f=r[o%s],d=r[(o+1)%s];if(this.closed||o+2<s?u=r[(o+2)%s]:(Al.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=Al),this.curveType==="centripetal"||this.curveType==="chordal"){const h=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(f),h),_=Math.pow(f.distanceToSquared(d),h),p=Math.pow(d.distanceToSquared(u),h);_<1e-4&&(_=1),m<1e-4&&(m=_),p<1e-4&&(p=_),Qs.initNonuniformCatmullRom(c.x,f.x,d.x,u.x,m,_,p),js.initNonuniformCatmullRom(c.y,f.y,d.y,u.y,m,_,p),ea.initNonuniformCatmullRom(c.z,f.z,d.z,u.z,m,_,p)}else this.curveType==="catmullrom"&&(Qs.initCatmullRom(c.x,f.x,d.x,u.x,this.tension),js.initCatmullRom(c.y,f.y,d.y,u.y,this.tension),ea.initCatmullRom(c.z,f.z,d.z,u.z,this.tension));return i.set(Qs.calc(l),js.calc(l),ea.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new G().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Rl(n,e,t,i,r){const s=(i-e)*.5,a=(r-t)*.5,o=n*n,l=n*o;return(2*t-2*i+s+a)*l+(-3*t+3*i-2*s-a)*o+s*n+t}function mf(n,e){const t=1-n;return t*t*e}function gf(n,e){return 2*(1-n)*n*e}function vf(n,e){return n*n*e}function nr(n,e,t,i){return mf(n,e)+gf(n,t)+vf(n,i)}function _f(n,e){const t=1-n;return t*t*t*e}function xf(n,e){const t=1-n;return 3*t*t*n*e}function Sf(n,e){return 3*(1-n)*n*n*e}function Mf(n,e){return n*n*n*e}function ir(n,e,t,i,r){return _f(n,e)+xf(n,t)+Sf(n,i)+Mf(n,r)}class Jc extends _n{constructor(e=new Oe,t=new Oe,i=new Oe,r=new Oe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new Oe){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(ir(e,r.x,s.x,a.x,o.x),ir(e,r.y,s.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class yf extends _n{constructor(e=new G,t=new G,i=new G,r=new G){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new G){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(ir(e,r.x,s.x,a.x,o.x),ir(e,r.y,s.y,a.y,o.y),ir(e,r.z,s.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Qc extends _n{constructor(e=new Oe,t=new Oe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Oe){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Oe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class bf extends _n{constructor(e=new G,t=new G){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new G){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new G){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class jc extends _n{constructor(e=new Oe,t=new Oe,i=new Oe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Oe){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(nr(e,r.x,s.x,a.x),nr(e,r.y,s.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ef extends _n{constructor(e=new G,t=new G,i=new G){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new G){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(nr(e,r.x,s.x,a.x),nr(e,r.y,s.y,a.y),nr(e,r.z,s.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class eu extends _n{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Oe){const i=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],u=r[a>r.length-2?r.length-1:a+1],f=r[a>r.length-3?r.length-1:a+2];return i.set(Rl(o,l.x,c.x,u.x,f.x),Rl(o,l.y,c.y,u.y,f.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new Oe().fromArray(r))}return this}}var Ll=Object.freeze({__proto__:null,ArcCurve:hf,CatmullRomCurve3:pf,CubicBezierCurve:Jc,CubicBezierCurve3:yf,EllipseCurve:Lo,LineCurve:Qc,LineCurve3:bf,QuadraticBezierCurve:jc,QuadraticBezierCurve3:Ef,SplineCurve:eu});class wf extends _n{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ll[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const a=r[s]-i,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(new Ll[r.type]().fromJSON(r))}return this}}class Pl extends wf{constructor(e){super(),this.type="Path",this.currentPoint=new Oe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new Qc(this.currentPoint.clone(),new Oe(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){const s=new jc(this.currentPoint.clone(),new Oe(e,t),new Oe(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,s,a){const o=new Jc(this.currentPoint.clone(),new Oe(e,t),new Oe(i,r),new Oe(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new eu(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,r,s,a),this}absarc(e,t,i,r,s,a){return this.absellipse(e,t,i,i,r,s,a),this}ellipse(e,t,i,r,s,a,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,i,r,s,a,o,l),this}absellipse(e,t,i,r,s,a,o,l){const c=new Lo(e,t,i,r,s,a,o,l);if(this.curves.length>0){const f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class tu extends Pl{constructor(e){super(e),this.uuid=ki(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(new Pl().fromJSON(r))}return this}}function Tf(n,e,t=2){const i=e&&e.length,r=i?e[0]*t:n.length;let s=nu(n,0,r,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(i&&(s=Pf(n,e,s,t)),n.length>80*t){o=n[0],l=n[1];let u=o,f=l;for(let d=t;d<r;d+=t){const h=n[d],m=n[d+1];h<o&&(o=h),m<l&&(l=m),h>u&&(u=h),m>f&&(f=m)}c=Math.max(u-o,f-l),c=c!==0?32767/c:0}return dr(s,a,t,o,l,c,0),a}function nu(n,e,t,i,r){let s;if(r===Vf(n,e,t,i)>0)for(let a=e;a<t;a+=i)s=Il(a/i|0,n[a],n[a+1],s);else for(let a=t-i;a>=e;a-=i)s=Il(a/i|0,n[a],n[a+1],s);return s&&Oi(s,s.next)&&(hr(s),s=s.next),s}function oi(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(Oi(t,t.next)||gt(t.prev,t,t.next)===0)){if(hr(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function dr(n,e,t,i,r,s,a){if(!n)return;!a&&s&&Ff(n,i,r,s);let o=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(s?Cf(n,i,r,s):Af(n)){e.push(l.i,n.i,c.i),hr(n),n=c.next,o=c.next;continue}if(n=c,n===o){a?a===1?(n=Rf(oi(n),e),dr(n,e,t,i,r,s,2)):a===2&&Lf(n,e,t,i,r,s):dr(oi(n),e,t,i,r,s,1);break}}}function Af(n){const e=n.prev,t=n,i=n.next;if(gt(e,t,i)>=0)return!1;const r=e.x,s=t.x,a=i.x,o=e.y,l=t.y,c=i.y,u=Math.min(r,s,a),f=Math.min(o,l,c),d=Math.max(r,s,a),h=Math.max(o,l,c);let m=i.next;for(;m!==e;){if(m.x>=u&&m.x<=d&&m.y>=f&&m.y<=h&&ji(r,o,s,l,a,c,m.x,m.y)&&gt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Cf(n,e,t,i){const r=n.prev,s=n,a=n.next;if(gt(r,s,a)>=0)return!1;const o=r.x,l=s.x,c=a.x,u=r.y,f=s.y,d=a.y,h=Math.min(o,l,c),m=Math.min(u,f,d),_=Math.max(o,l,c),p=Math.max(u,f,d),g=ja(h,m,e,t,i),M=ja(_,p,e,t,i);let T=n.prevZ,S=n.nextZ;for(;T&&T.z>=g&&S&&S.z<=M;){if(T.x>=h&&T.x<=_&&T.y>=m&&T.y<=p&&T!==r&&T!==a&&ji(o,u,l,f,c,d,T.x,T.y)&&gt(T.prev,T,T.next)>=0||(T=T.prevZ,S.x>=h&&S.x<=_&&S.y>=m&&S.y<=p&&S!==r&&S!==a&&ji(o,u,l,f,c,d,S.x,S.y)&&gt(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;T&&T.z>=g;){if(T.x>=h&&T.x<=_&&T.y>=m&&T.y<=p&&T!==r&&T!==a&&ji(o,u,l,f,c,d,T.x,T.y)&&gt(T.prev,T,T.next)>=0)return!1;T=T.prevZ}for(;S&&S.z<=M;){if(S.x>=h&&S.x<=_&&S.y>=m&&S.y<=p&&S!==r&&S!==a&&ji(o,u,l,f,c,d,S.x,S.y)&&gt(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function Rf(n,e){let t=n;do{const i=t.prev,r=t.next.next;!Oi(i,r)&&ru(i,t,t.next,r)&&fr(i,r)&&fr(r,i)&&(e.push(i.i,t.i,r.i),hr(t),hr(t.next),t=n=r),t=t.next}while(t!==n);return oi(t)}function Lf(n,e,t,i,r,s){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&kf(a,o)){let l=su(a,o);a=oi(a,a.next),l=oi(l,l.next),dr(a,e,t,i,r,s,0),dr(l,e,t,i,r,s,0);return}o=o.next}a=a.next}while(a!==n)}function Pf(n,e,t,i){const r=[];for(let s=0,a=e.length;s<a;s++){const o=e[s]*i,l=s<a-1?e[s+1]*i:n.length,c=nu(n,o,l,i,!1);c===c.next&&(c.steiner=!0),r.push(Bf(c))}r.sort(If);for(let s=0;s<r.length;s++)t=Df(r[s],t);return t}function If(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=i-r}return t}function Df(n,e){const t=Nf(n,e);if(!t)return e;const i=su(t,n);return oi(i,i.next),oi(t,t.next)}function Nf(n,e){let t=e;const i=n.x,r=n.y;let s=-1/0,a;if(Oi(n,t))return t;do{if(Oi(n,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const f=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=i&&f>s&&(s=f,a=t.x<t.next.x?t:t.next,f===i))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let u=1/0;t=a;do{if(i>=t.x&&t.x>=l&&i!==t.x&&iu(r<c?i:s,r,l,c,r<c?s:i,r,t.x,t.y)){const f=Math.abs(r-t.y)/(i-t.x);fr(t,n)&&(f<u||f===u&&(t.x>a.x||t.x===a.x&&Uf(a,t)))&&(a=t,u=f)}t=t.next}while(t!==o);return a}function Uf(n,e){return gt(n.prev,n,e.prev)<0&&gt(e.next,n,n.next)<0}function Ff(n,e,t,i){let r=n;do r.z===0&&(r.z=ja(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,Of(r)}function Of(n){let e,t=1;do{let i=n,r;n=null;let s=null;for(e=0;i;){e++;let a=i,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||i.z<=a.z)?(r=i,i=i.nextZ,o--):(r=a,a=a.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;i=a}s.nextZ=null,t*=2}while(e>1);return n}function ja(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function Bf(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function iu(n,e,t,i,r,s,a,o){return(r-a)*(e-o)>=(n-a)*(s-o)&&(n-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(i-o)}function ji(n,e,t,i,r,s,a,o){return!(n===a&&e===o)&&iu(n,e,t,i,r,s,a,o)}function kf(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!zf(n,e)&&(fr(n,e)&&fr(e,n)&&Hf(n,e)&&(gt(n.prev,n,e.prev)||gt(n,e.prev,e))||Oi(n,e)&&gt(n.prev,n,n.next)>0&&gt(e.prev,e,e.next)>0)}function gt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function Oi(n,e){return n.x===e.x&&n.y===e.y}function ru(n,e,t,i){const r=Hr(gt(n,e,t)),s=Hr(gt(n,e,i)),a=Hr(gt(t,i,n)),o=Hr(gt(t,i,e));return!!(r!==s&&a!==o||r===0&&zr(n,t,e)||s===0&&zr(n,i,e)||a===0&&zr(t,n,i)||o===0&&zr(t,e,i))}function zr(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function Hr(n){return n>0?1:n<0?-1:0}function zf(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&ru(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function fr(n,e){return gt(n.prev,n,n.next)<0?gt(n,e,n.next)>=0&&gt(n,n.prev,e)>=0:gt(n,e,n.prev)<0||gt(n,n.next,e)<0}function Hf(n,e){let t=n,i=!1;const r=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function su(n,e){const t=eo(n.i,n.x,n.y),i=eo(e.i,e.x,e.y),r=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function Il(n,e,t,i){const r=eo(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function hr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function eo(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Vf(n,e,t,i){let r=0;for(let s=e,a=t-i;s<t;s+=i)r+=(n[a]-n[s])*(n[s+1]+n[a+1]),a=s;return r}class Gf{static triangulate(e,t,i=2){return Tf(e,t,i)}}class rr{static area(e){const t=e.length;let i=0;for(let r=t-1,s=0;s<t;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return rr.area(e)<0}static triangulateShape(e,t){const i=[],r=[],s=[];Dl(e),Nl(i,e);let a=e.length;t.forEach(Dl);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,Nl(i,t[l]);const o=Gf.triangulate(i,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function Dl(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function Nl(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class ms extends Vt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,f=e/o,d=t/l,h=[],m=[],_=[],p=[];for(let g=0;g<u;g++){const M=g*d-a;for(let T=0;T<c;T++){const S=T*f-s;m.push(S,-M,0),_.push(0,0,1),p.push(T/o),p.push(1-g/l)}}for(let g=0;g<l;g++)for(let M=0;M<o;M++){const T=M+c*g,S=M+c*(g+1),w=M+1+c*(g+1),E=M+1+c*g;h.push(T,S,E),h.push(S,w,E)}this.setIndex(h),this.setAttribute("position",new bt(m,3)),this.setAttribute("normal",new bt(_,3)),this.setAttribute("uv",new bt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ms(e.width,e.height,e.widthSegments,e.heightSegments)}}class Io extends Vt{constructor(e=new tu([new Oe(0,.5),new Oe(-.5,-.5),new Oe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const i=[],r=[],s=[],a=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(i),this.setAttribute("position",new bt(r,3)),this.setAttribute("normal",new bt(s,3)),this.setAttribute("uv",new bt(a,2));function c(u){const f=r.length/3,d=u.extractPoints(t);let h=d.shape;const m=d.holes;rr.isClockWise(h)===!1&&(h=h.reverse());for(let p=0,g=m.length;p<g;p++){const M=m[p];rr.isClockWise(M)===!0&&(m[p]=M.reverse())}const _=rr.triangulateShape(h,m);for(let p=0,g=m.length;p<g;p++){const M=m[p];h=h.concat(M)}for(let p=0,g=h.length;p<g;p++){const M=h[p];r.push(M.x,M.y,0),s.push(0,0,1),a.push(M.x,M.y)}for(let p=0,g=_.length;p<g;p++){const M=_[p],T=M[0]+f,S=M[1]+f,w=M[2]+f;i.push(T,S,w),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return Wf(t,e)}static fromJSON(e,t){const i=[];for(let r=0,s=e.shapes.length;r<s;r++){const a=t[e.shapes[r]];i.push(a)}return new Io(i,e.curveSegments)}}function Wf(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){const r=n[t];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e}function Bi(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(Ul(r))r.isRenderTargetTexture?(ke("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(Ul(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Bt(n){const e={};for(let t=0;t<n.length;t++){const i=Bi(n[t]);for(const r in i)e[r]=i[r]}return e}function Ul(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Xf(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function au(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:je.workingColorSpace}const qf={clone:Bi,merge:Bt};var Yf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,$f=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class vn extends ps{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Yf,this.fragmentShader=$f,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Bi(e.uniforms),this.uniformsGroups=Xf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new qe().setHex(r.value);break;case"v2":this.uniforms[i].value=new Oe().fromArray(r.value);break;case"v3":this.uniforms[i].value=new G().fromArray(r.value);break;case"v4":this.uniforms[i].value=new vt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Ge().fromArray(r.value);break;case"m4":this.uniforms[i].value=new St().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Zf extends vn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Kf extends ps{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ad,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Jf extends ps{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ta={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(Fl(n)||(this.files[n]=e))},get:function(n){if(this.enabled!==!1&&!Fl(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function Fl(n){try{const e=n.slice(n.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class ou{constructor(e,t,i){const r=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,f){return c.push(u,f),this},this.removeHandler=function(u){const f=c.indexOf(u);return f!==-1&&c.splice(f,2),this},this.getHandler=function(u){for(let f=0,d=c.length;f<d;f+=2){const h=c[f],m=c[f+1];if(h.global&&(h.lastIndex=0),h.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Qf=new ou;class Do{constructor(e){this.manager=e!==void 0?e:Qf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Do.DEFAULT_MATERIAL_NAME="__DEFAULT";const Mi=new WeakMap;class jf extends Do{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=ta.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let f=Mi.get(a);f===void 0&&(f=[],Mi.set(a,f)),f.push({onLoad:t,onError:r})}return a}const o=cr("img");function l(){u(),t&&t(this);const f=Mi.get(this)||[];for(let d=0;d<f.length;d++){const h=f[d];h.onLoad&&h.onLoad(this)}Mi.delete(this),s.manager.itemEnd(e)}function c(f){u(),r&&r(f),ta.remove(`image:${e}`);const d=Mi.get(this)||[];for(let h=0;h<d.length;h++){const m=d[h];m.onError&&m.onError(f)}Mi.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),ta.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class na extends Do{constructor(e){super(e)}load(e,t,i,r){const s=new Ut,a=new jf(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},i,r),s}}const Vr=new G,Gr=new zi,on=new G;class lu extends qt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new St,this.projectionMatrix=new St,this.projectionMatrixInverse=new St,this.coordinateSystem=hn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Vr,Gr,on),on.x===1&&on.y===1&&on.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Vr,Gr,on.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Vr,Gr,on),on.x===1&&on.y===1&&on.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Vr,Gr,on.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const zn=new G,Ol=new Oe,Bl=new Oe;class jt extends lu{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Qa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Rs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Qa*2*Math.atan(Math.tan(Rs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){zn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(zn.x,zn.y).multiplyScalar(-e/zn.z),zn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(zn.x,zn.y).multiplyScalar(-e/zn.z)}getViewSize(e,t){return this.getViewBounds(e,Ol,Bl),t.subVectors(Bl,Ol)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Rs*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class No extends lu{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const yi=-90,bi=1;class eh extends qt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new jt(yi,bi,e,t);r.layers=this.layers,this.add(r);const s=new jt(yi,bi,e,t);s.layers=this.layers,this.add(s);const a=new jt(yi,bi,e,t);a.layers=this.layers,this.add(a);const o=new jt(yi,bi,e,t);o.layers=this.layers,this.add(o);const l=new jt(yi,bi,e,t);l.layers=this.layers,this.add(l);const c=new jt(yi,bi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===hn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===us)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,d,h),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class th extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Ho=class Ho{constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};Ho.prototype.isMatrix2=!0;let kl=Ho;function zl(n,e,t,i){const r=nh(i);switch(t){case kc:return n*e;case Hc:return n*e/r.components*r.byteLength;case bo:return n*e/r.components*r.byteLength;case si:return n*e*2/r.components*r.byteLength;case Eo:return n*e*2/r.components*r.byteLength;case zc:return n*e*3/r.components*r.byteLength;case tn:return n*e*4/r.components*r.byteLength;case wo:return n*e*4/r.components*r.byteLength;case Jr:case Qr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case jr:case es:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ba:case wa:return Math.max(n,16)*Math.max(e,8)/4;case ya:case Ea:return Math.max(n,8)*Math.max(e,8)/2;case Ta:case Aa:case Ra:case La:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ca:case as:case Pa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ia:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Da:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Na:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Ua:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Fa:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Oa:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Ba:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case ka:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case za:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Ha:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Va:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Ga:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Wa:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Xa:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case qa:case Ya:case $a:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Za:case Ka:return Math.ceil(n/4)*Math.ceil(e/4)*8;case os:case Ja:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function nh(n){switch(n){case Zt:case Uc:return{byteLength:1,components:1};case or:case Fc:case mn:return{byteLength:2,components:1};case Mo:case yo:return{byteLength:2,components:4};case pn:case So:case fn:return{byteLength:4,components:1};case Oc:case Bc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:xo}}));typeof window<"u"&&(window.__THREE__?ke("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=xo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function cu(){let n=null,e=!1,t=null,i=null;function r(s,a){i=n.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function ih(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,f=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,u),o.onUploadCallback();let h;if(c instanceof Float32Array)h=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=n.SHORT;else if(c instanceof Uint32Array)h=n.UNSIGNED_INT;else if(c instanceof Int32Array)h=n.INT;else if(c instanceof Int8Array)h=n.BYTE;else if(c instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){const u=l.array,f=l.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,u);else{f.sort((h,m)=>h.start-m.start);let d=0;for(let h=1;h<f.length;h++){const m=f[d],_=f[h];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++d,f[d]=_)}f.length=d+1;for(let h=0,m=f.length;h<m;h++){const _=f[h];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var rh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,sh=`#ifdef USE_ALPHAHASH
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
#endif`,ah=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,oh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ch=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,uh=`#ifdef USE_AOMAP
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
#endif`,dh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,fh=`#ifdef USE_BATCHING
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
#endif`,hh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ph=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,mh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,vh=`#ifdef USE_IRIDESCENCE
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
#endif`,_h=`#ifdef USE_BUMPMAP
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
#endif`,xh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Sh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Mh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Eh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,wh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Th=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Ah=`#define PI 3.141592653589793
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
} // validated`,Ch=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Rh=`vec3 transformedNormal = objectNormal;
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
#endif`,Lh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ph=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ih=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Dh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Nh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Uh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Fh=`#ifdef USE_ENVMAP
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
#endif`,Oh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Bh=`#ifdef USE_ENVMAP
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
#endif`,kh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,zh=`#ifdef USE_ENVMAP
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
#endif`,Hh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Vh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Gh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Wh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Xh=`#ifdef USE_GRADIENTMAP
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
}`,qh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Yh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,$h=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Zh=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Kh=`#ifdef USE_ENVMAP
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
#endif`,Jh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Qh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,jh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ep=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,tp=`PhysicalMaterial material;
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
#endif`,np=`uniform sampler2D dfgLUT;
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
}`,ip=`
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
#endif`,rp=`#if defined( RE_IndirectDiffuse )
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
#endif`,sp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ap=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,op=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,lp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,up=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,dp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,fp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,hp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,pp=`#if defined( USE_POINTS_UV )
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
#endif`,mp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,gp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,vp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_p=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,xp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sp=`#ifdef USE_MORPHTARGETS
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
#endif`,Mp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,bp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ep=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Ap=`#ifdef USE_NORMALMAP
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
#endif`,Cp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Rp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Lp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Pp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ip=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Dp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Np=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Up=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Fp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Op=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Bp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,kp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,zp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Hp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Vp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Gp=`float getShadowMask() {
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
}`,Wp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Xp=`#ifdef USE_SKINNING
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
#endif`,qp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Yp=`#ifdef USE_SKINNING
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
#endif`,$p=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Zp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Kp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Jp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Qp=`#ifdef USE_TRANSMISSION
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
#endif`,jp=`#ifdef USE_TRANSMISSION
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
#endif`,em=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,nm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,im=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const rm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sm=`uniform sampler2D t2D;
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
}`,am=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,om=`#ifdef ENVMAP_TYPE_CUBE
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
}`,lm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,um=`#include <common>
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
}`,dm=`#if DEPTH_PACKING == 3200
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
}`,fm=`#define DISTANCE
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
}`,hm=`#define DISTANCE
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
}`,pm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,mm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gm=`uniform float scale;
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
}`,vm=`uniform vec3 diffuse;
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
}`,_m=`#include <common>
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
}`,xm=`uniform vec3 diffuse;
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
}`,Sm=`#define LAMBERT
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
}`,Mm=`#define LAMBERT
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
}`,ym=`#define MATCAP
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
}`,bm=`#define MATCAP
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
}`,Em=`#define NORMAL
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
}`,wm=`#define NORMAL
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
}`,Tm=`#define PHONG
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
}`,Am=`#define PHONG
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
}`,Cm=`#define STANDARD
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
}`,Rm=`#define STANDARD
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
}`,Lm=`#define TOON
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
}`,Pm=`#define TOON
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
}`,Im=`uniform float size;
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
}`,Dm=`uniform vec3 diffuse;
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
}`,Nm=`#include <common>
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
}`,Um=`uniform vec3 color;
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
}`,Fm=`uniform float rotation;
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
}`,Om=`uniform vec3 diffuse;
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
}`,Ze={alphahash_fragment:rh,alphahash_pars_fragment:sh,alphamap_fragment:ah,alphamap_pars_fragment:oh,alphatest_fragment:lh,alphatest_pars_fragment:ch,aomap_fragment:uh,aomap_pars_fragment:dh,batching_pars_vertex:fh,batching_vertex:hh,begin_vertex:ph,beginnormal_vertex:mh,bsdfs:gh,iridescence_fragment:vh,bumpmap_pars_fragment:_h,clipping_planes_fragment:xh,clipping_planes_pars_fragment:Sh,clipping_planes_pars_vertex:Mh,clipping_planes_vertex:yh,color_fragment:bh,color_pars_fragment:Eh,color_pars_vertex:wh,color_vertex:Th,common:Ah,cube_uv_reflection_fragment:Ch,defaultnormal_vertex:Rh,displacementmap_pars_vertex:Lh,displacementmap_vertex:Ph,emissivemap_fragment:Ih,emissivemap_pars_fragment:Dh,colorspace_fragment:Nh,colorspace_pars_fragment:Uh,envmap_fragment:Fh,envmap_common_pars_fragment:Oh,envmap_pars_fragment:Bh,envmap_pars_vertex:kh,envmap_physical_pars_fragment:Kh,envmap_vertex:zh,fog_vertex:Hh,fog_pars_vertex:Vh,fog_fragment:Gh,fog_pars_fragment:Wh,gradientmap_pars_fragment:Xh,lightmap_pars_fragment:qh,lights_lambert_fragment:Yh,lights_lambert_pars_fragment:$h,lights_pars_begin:Zh,lights_toon_fragment:Jh,lights_toon_pars_fragment:Qh,lights_phong_fragment:jh,lights_phong_pars_fragment:ep,lights_physical_fragment:tp,lights_physical_pars_fragment:np,lights_fragment_begin:ip,lights_fragment_maps:rp,lights_fragment_end:sp,lightprobes_pars_fragment:ap,logdepthbuf_fragment:op,logdepthbuf_pars_fragment:lp,logdepthbuf_pars_vertex:cp,logdepthbuf_vertex:up,map_fragment:dp,map_pars_fragment:fp,map_particle_fragment:hp,map_particle_pars_fragment:pp,metalnessmap_fragment:mp,metalnessmap_pars_fragment:gp,morphinstance_vertex:vp,morphcolor_vertex:_p,morphnormal_vertex:xp,morphtarget_pars_vertex:Sp,morphtarget_vertex:Mp,normal_fragment_begin:yp,normal_fragment_maps:bp,normal_pars_fragment:Ep,normal_pars_vertex:wp,normal_vertex:Tp,normalmap_pars_fragment:Ap,clearcoat_normal_fragment_begin:Cp,clearcoat_normal_fragment_maps:Rp,clearcoat_pars_fragment:Lp,iridescence_pars_fragment:Pp,opaque_fragment:Ip,packing:Dp,premultiplied_alpha_fragment:Np,project_vertex:Up,dithering_fragment:Fp,dithering_pars_fragment:Op,roughnessmap_fragment:Bp,roughnessmap_pars_fragment:kp,shadowmap_pars_fragment:zp,shadowmap_pars_vertex:Hp,shadowmap_vertex:Vp,shadowmask_pars_fragment:Gp,skinbase_vertex:Wp,skinning_pars_vertex:Xp,skinning_vertex:qp,skinnormal_vertex:Yp,specularmap_fragment:$p,specularmap_pars_fragment:Zp,tonemapping_fragment:Kp,tonemapping_pars_fragment:Jp,transmission_fragment:Qp,transmission_pars_fragment:jp,uv_pars_fragment:em,uv_pars_vertex:tm,uv_vertex:nm,worldpos_vertex:im,background_vert:rm,background_frag:sm,backgroundCube_vert:am,backgroundCube_frag:om,cube_vert:lm,cube_frag:cm,depth_vert:um,depth_frag:dm,distance_vert:fm,distance_frag:hm,equirect_vert:pm,equirect_frag:mm,linedashed_vert:gm,linedashed_frag:vm,meshbasic_vert:_m,meshbasic_frag:xm,meshlambert_vert:Sm,meshlambert_frag:Mm,meshmatcap_vert:ym,meshmatcap_frag:bm,meshnormal_vert:Em,meshnormal_frag:wm,meshphong_vert:Tm,meshphong_frag:Am,meshphysical_vert:Cm,meshphysical_frag:Rm,meshtoon_vert:Lm,meshtoon_frag:Pm,points_vert:Im,points_frag:Dm,shadow_vert:Nm,shadow_frag:Um,sprite_vert:Fm,sprite_frag:Om},be={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new Oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new G},probesMax:{value:new G},probesResolution:{value:new G}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new Oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},cn={basic:{uniforms:Bt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:Bt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new qe(0)},envMapIntensity:{value:1}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:Bt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:Bt([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:Bt([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new qe(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:Bt([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:Bt([be.points,be.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:Bt([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:Bt([be.common,be.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:Bt([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:Bt([be.sprite,be.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distance:{uniforms:Bt([be.common,be.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distance_vert,fragmentShader:Ze.distance_frag},shadow:{uniforms:Bt([be.lights,be.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};cn.physical={uniforms:Bt([cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new Oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new Oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new Oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const Wr={r:0,b:0,g:0},Bm=new St,uu=new Ge;uu.set(-1,0,0,0,1,0,0,0,1);function km(n,e,t,i,r,s){const a=new qe(0);let o=r===!0?0:1,l,c,u=null,f=0,d=null;function h(M){let T=M.isScene===!0?M.background:null;if(T&&T.isTexture){const S=M.backgroundBlurriness>0;T=e.get(T,S)}return T}function m(M){let T=!1;const S=h(M);S===null?p(a,o):S&&S.isColor&&(p(S,1),T=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||T)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(M,T){const S=h(T);S&&(S.isCubeTexture||S.mapping===hs)?(c===void 0&&(c=new gn(new gr(1,1,1),new vn({name:"BackgroundCubeMaterial",uniforms:Bi(cn.backgroundCube.uniforms),vertexShader:cn.backgroundCube.vertexShader,fragmentShader:cn.backgroundCube.fragmentShader,side:Ht,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,E,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Bm.makeRotationFromEuler(T.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(uu),c.material.toneMapped=je.getTransfer(S.colorSpace)!==rt,(u!==S||f!==S.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=S,f=S.version,d=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new gn(new ms(2,2),new vn({name:"BackgroundMaterial",uniforms:Bi(cn.background.uniforms),vertexShader:cn.background.vertexShader,fragmentShader:cn.background.fragmentShader,side:ii,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=je.getTransfer(S.colorSpace)!==rt,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||f!==S.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=S,f=S.version,d=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function p(M,T){M.getRGB(Wr,au(n)),t.buffers.color.setClear(Wr.r,Wr.g,Wr.b,T,s)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,T=1){a.set(M),o=T,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,p(a,o)},render:m,addToRenderList:_,dispose:g}}function zm(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,a=!1;function o(A,P,R,U,B){let Z=!1;const H=f(A,U,R,P);s!==H&&(s=H,c(s.object)),Z=h(A,U,R,B),Z&&m(A,U,R,B),B!==null&&e.update(B,n.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,S(A,P,R,U),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return n.createVertexArray()}function c(A){return n.bindVertexArray(A)}function u(A){return n.deleteVertexArray(A)}function f(A,P,R,U){const B=U.wireframe===!0;let Z=i[P.id];Z===void 0&&(Z={},i[P.id]=Z);const H=A.isInstancedMesh===!0?A.id:0;let X=Z[H];X===void 0&&(X={},Z[H]=X);let W=X[R.id];W===void 0&&(W={},X[R.id]=W);let J=W[B];return J===void 0&&(J=d(l()),W[B]=J),J}function d(A){const P=[],R=[],U=[];for(let B=0;B<t;B++)P[B]=0,R[B]=0,U[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:R,attributeDivisors:U,object:A,attributes:{},index:null}}function h(A,P,R,U){const B=s.attributes,Z=P.attributes;let H=0;const X=R.getAttributes();for(const W in X)if(X[W].location>=0){const te=B[W];let fe=Z[W];if(fe===void 0&&(W==="instanceMatrix"&&A.instanceMatrix&&(fe=A.instanceMatrix),W==="instanceColor"&&A.instanceColor&&(fe=A.instanceColor)),te===void 0||te.attribute!==fe||fe&&te.data!==fe.data)return!0;H++}return s.attributesNum!==H||s.index!==U}function m(A,P,R,U){const B={},Z=P.attributes;let H=0;const X=R.getAttributes();for(const W in X)if(X[W].location>=0){let te=Z[W];te===void 0&&(W==="instanceMatrix"&&A.instanceMatrix&&(te=A.instanceMatrix),W==="instanceColor"&&A.instanceColor&&(te=A.instanceColor));const fe={};fe.attribute=te,te&&te.data&&(fe.data=te.data),B[W]=fe,H++}s.attributes=B,s.attributesNum=H,s.index=U}function _(){const A=s.newAttributes;for(let P=0,R=A.length;P<R;P++)A[P]=0}function p(A){g(A,0)}function g(A,P){const R=s.newAttributes,U=s.enabledAttributes,B=s.attributeDivisors;R[A]=1,U[A]===0&&(n.enableVertexAttribArray(A),U[A]=1),B[A]!==P&&(n.vertexAttribDivisor(A,P),B[A]=P)}function M(){const A=s.newAttributes,P=s.enabledAttributes;for(let R=0,U=P.length;R<U;R++)P[R]!==A[R]&&(n.disableVertexAttribArray(R),P[R]=0)}function T(A,P,R,U,B,Z,H){H===!0?n.vertexAttribIPointer(A,P,R,B,Z):n.vertexAttribPointer(A,P,R,U,B,Z)}function S(A,P,R,U){_();const B=U.attributes,Z=R.getAttributes(),H=P.defaultAttributeValues;for(const X in Z){const W=Z[X];if(W.location>=0){let J=B[X];if(J===void 0&&(X==="instanceMatrix"&&A.instanceMatrix&&(J=A.instanceMatrix),X==="instanceColor"&&A.instanceColor&&(J=A.instanceColor)),J!==void 0){const te=J.normalized,fe=J.itemSize,q=e.get(J);if(q===void 0)continue;const oe=q.buffer,he=q.type,Ae=q.bytesPerElement,z=he===n.INT||he===n.UNSIGNED_INT||J.gpuType===So;if(J.isInterleavedBufferAttribute){const K=J.data,ae=K.stride,ue=J.offset;if(K.isInstancedInterleavedBuffer){for(let de=0;de<W.locationSize;de++)g(W.location+de,K.meshPerAttribute);A.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let de=0;de<W.locationSize;de++)p(W.location+de);n.bindBuffer(n.ARRAY_BUFFER,oe);for(let de=0;de<W.locationSize;de++)T(W.location+de,fe/W.locationSize,he,te,ae*Ae,(ue+fe/W.locationSize*de)*Ae,z)}else{if(J.isInstancedBufferAttribute){for(let K=0;K<W.locationSize;K++)g(W.location+K,J.meshPerAttribute);A.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let K=0;K<W.locationSize;K++)p(W.location+K);n.bindBuffer(n.ARRAY_BUFFER,oe);for(let K=0;K<W.locationSize;K++)T(W.location+K,fe/W.locationSize,he,te,fe*Ae,fe/W.locationSize*K*Ae,z)}}else if(H!==void 0){const te=H[X];if(te!==void 0)switch(te.length){case 2:n.vertexAttrib2fv(W.location,te);break;case 3:n.vertexAttrib3fv(W.location,te);break;case 4:n.vertexAttrib4fv(W.location,te);break;default:n.vertexAttrib1fv(W.location,te)}}}}M()}function w(){b();for(const A in i){const P=i[A];for(const R in P){const U=P[R];for(const B in U){const Z=U[B];for(const H in Z)u(Z[H].object),delete Z[H];delete U[B]}}delete i[A]}}function E(A){if(i[A.id]===void 0)return;const P=i[A.id];for(const R in P){const U=P[R];for(const B in U){const Z=U[B];for(const H in Z)u(Z[H].object),delete Z[H];delete U[B]}}delete i[A.id]}function N(A){for(const P in i){const R=i[P];for(const U in R){const B=R[U];if(B[A.id]===void 0)continue;const Z=B[A.id];for(const H in Z)u(Z[H].object),delete Z[H];delete B[A.id]}}}function x(A){for(const P in i){const R=i[P],U=A.isInstancedMesh===!0?A.id:0,B=R[U];if(B!==void 0){for(const Z in B){const H=B[Z];for(const X in H)u(H[X].object),delete H[X];delete B[Z]}delete R[U],Object.keys(R).length===0&&delete i[P]}}}function b(){I(),a=!0,s!==r&&(s=r,c(s.object))}function I(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:b,resetDefaultState:I,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfObject:x,releaseStatesOfProgram:N,initAttributes:_,enableAttribute:p,disableUnusedAttributes:M}}function Hm(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let d=0;for(let h=0;h<u;h++)d+=c[h];t.update(d,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function Vm(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const N=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(N.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(N){return!(N!==tn&&i.convert(N)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(N){const x=N===mn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(N!==Zt&&N!==fn&&!x&&i.convert(N)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(N){if(N==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";N="mediump"}return N==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(ke("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&ke("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:h,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:M,maxVaryings:T,maxFragmentUniforms:S,maxSamples:w,samples:E}}function Gm(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new Vn,o=new Ge,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const h=f.length!==0||d||i!==0||r;return r=d,i=f.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,h){const m=f.clippingPlanes,_=f.clipIntersection,p=f.clipShadows,g=n.get(f);if(!r||m===null||m.length===0||s&&!p)s?u(null):c();else{const M=s?0:i,T=M*4;let S=g.clippingState||null;l.value=S,S=u(m,d,T,h);for(let w=0;w!==T;++w)S[w]=t[w];g.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,d,h,m){const _=f!==null?f.length:0;let p=null;if(_!==0){if(p=l.value,m!==!0||p===null){const g=h+_*4,M=d.matrixWorldInverse;o.getNormalMatrix(M),(p===null||p.length<g)&&(p=new Float32Array(g));for(let T=0,S=h;T!==_;++T,S+=4)a.copy(f[T]).applyMatrix4(M,o),a.normal.toArray(p,S),p[S+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}const Ri=4,Wm=6,Xm=20,qm=256,Yi=new No,Hl=new qe;let ia=null,ra=0,sa=0,aa=!1;const Ym=new G,Kn=new G;class Vl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=Ym}=s;ia=this._renderer.getRenderTarget(),ra=this._renderer.getActiveCubeFace(),sa=this._renderer.getActiveMipmapLevel(),aa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ia,ra,sa),this._renderer.xr.enabled=aa,e.scissorTest=!1,Ei(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ri||e.mapping===Fi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ia=this._renderer.getRenderTarget(),ra=this._renderer.getActiveCubeFace(),sa=this._renderer.getActiveMipmapLevel(),aa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Nt,minFilter:Nt,generateMipmaps:!1,type:mn,format:tn,colorSpace:ls,depthBuffer:!1},r=Gl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gl(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=$m(s)),this._blurMaterial=Km(s,e,t),this._ggxMaterial=Zm(s,e,t)}return r}_compileMaterial(e){const t=new gn(new Vt,e);this._renderer.compile(t,Yi)}_sceneToCubeUV(e,t,i,r,s){const l=new jt(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,h=f.toneMapping;f.getClearColor(Hl),f.toneMapping=nn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new gn(new gr,new ot({name:"PMREM.Background",side:Ht,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,p=_.material;let g=!1;const M=e.background;M?M.isColor&&(p.color.copy(M),e.background=null,g=!0):(p.color.copy(Hl),g=!0);for(let T=0;T<6;T++){const S=T%3;S===0?(l.up.set(0,c[T],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[T],s.y,s.z)):S===1?(l.up.set(0,0,c[T]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[T],s.z)):(l.up.set(0,c[T],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[T]));const w=this._cubeSize;Ei(r,S*w,T>2?w:0,w,w),f.setRenderTarget(r),g&&f.render(_,l),f.render(e,l)}f.toneMapping=h,f.autoClear=d,e.background=M}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===ri||e.mapping===Fi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wl());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Ei(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Yi)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),d=c*1.25,h=f*d,{_lodMax:m}=this,_=this._sizeLods[i],p=3*_*(i>m-Ri?i-m+Ri:0),g=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=h,l.mipInt.value=m-t,Ei(s,p,g,3*_,2*_),r.setRenderTarget(s),r.render(o,Yi),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=m-i,Ei(e,p,g,3*_,2*_),r.setRenderTarget(e),r.render(o,Yi)}_blur(e,t,i,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,i,a),this._blurPass(s,e,i,i,a)}_blurPass(e,t,i,r,s){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[r];l.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-i;const u=this._sizeLods[r],f=3*u*(r>this._lodMax-Ri?r-this._lodMax+Ri:0),d=4*(this._cubeSize-u);Ei(t,f,d,3*u,2*u),a.setRenderTarget(t),a.render(l,Yi)}}function $m(n){const e=[],t=[];let i=n;const r=n-Ri+1+Wm;for(let s=0;s<r;s++){const a=Math.pow(2,i);e.push(a);const o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],f=6,d=6,h=3,m=new Float32Array(h*d*f),_=new Float32Array(h*d*f);for(let g=0;g<f;g++){const M=g%3*2/3-1,T=g>2?0:-1,S=[M,T,0,M+2/3,T,0,M+2/3,T+1,0,M,T,0,M+2/3,T+1,0,M,T+1,0];m.set(S,h*d*g);for(let w=0;w<d;w++){const E=u[w*2]*2-1,N=u[w*2+1]*2-1;g===0?Kn.set(1,N,E):g===1?Kn.set(-E,1,-N):g===2?Kn.set(-E,N,1):g===3?Kn.set(-1,N,-E):g===4?Kn.set(-E,-1,N):Kn.set(E,N,-1),Kn.toArray(_,(g*d+w)*h)}}const p=new Vt;p.setAttribute("position",new Cn(m,h)),p.setAttribute("outputDirection",new Cn(_,h)),t.push(new gn(p,null)),i>Ri&&i--}return{lodMeshes:t,sizeLods:e}}function Gl(n,e,t){const i=new rn(n,e,t);return i.texture.mapping=hs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ei(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Zm(n,e,t){return new vn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:qm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:gs(),fragmentShader:`

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
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Km(n,e,t){return new vn({name:"SphericalGaussianBlur",defines:{SAMPLES:Xm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:gs(),fragmentShader:`

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
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Wl(){return new vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:gs(),fragmentShader:`

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
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Xl(){return new vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:gs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function gs(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class du extends rn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Zc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new gr(5,5,5),s=new vn({name:"CubemapFromEquirect",uniforms:Bi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ht,blending:Tn});s.uniforms.tEquirect.value=t;const a=new gn(r,s),o=t.minFilter;return t.minFilter===Qn&&(t.minFilter=Nt),new eh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function Jm(n){let e=new WeakMap,t=new WeakMap,i=null;function r(d,h=!1){return d==null?null:h?a(d):s(d)}function s(d){if(d&&d.isTexture){const h=d.mapping;if(h===ws||h===Ts)if(e.has(d)){const m=e.get(d).texture;return o(m,d.mapping)}else{const m=d.image;if(m&&m.height>0){const _=new du(m.height);return _.fromEquirectangularTexture(n,d),e.set(d,_),d.addEventListener("dispose",c),o(_.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const h=d.mapping,m=h===ws||h===Ts,_=h===ri||h===Fi;if(m||_){let p=t.get(d);const g=p!==void 0?p.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==g)return i===null&&(i=new Vl(n)),p=m?i.fromEquirectangular(d,p):i.fromCubemap(d,p),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),p.texture;if(p!==void 0)return p.texture;{const M=d.image;return m&&M&&M.height>0||_&&M&&l(M)?(i===null&&(i=new Vl(n)),p=m?i.fromEquirectangular(d):i.fromCubemap(d),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),d.addEventListener("dispose",u),p.texture):null}}}return d}function o(d,h){return h===ws?d.mapping=ri:h===Ts&&(d.mapping=Fi),d}function l(d){let h=0;const m=6;for(let _=0;_<m;_++)d[_]!==void 0&&h++;return h===m}function c(d){const h=d.target;h.removeEventListener("dispose",c);const m=e.get(h);m!==void 0&&(e.delete(h),m.dispose())}function u(d){const h=d.target;h.removeEventListener("dispose",u);const m=t.get(h);m!==void 0&&(t.delete(h),m.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function Qm(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Di("WebGLRenderer: "+i+" extension not supported."),r}}}function jm(n,e,t,i){const r={},s=new WeakMap;function a(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",a),delete r[d.id];const h=s.get(d);h&&(e.remove(h),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(f,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function l(f){const d=f.attributes;for(const h in d)e.update(d[h],n.ARRAY_BUFFER)}function c(f){const d=[],h=f.index,m=f.attributes.position;let _=0;if(m===void 0)return;if(h!==null){const M=h.array;_=h.version;for(let T=0,S=M.length;T<S;T+=3){const w=M[T+0],E=M[T+1],N=M[T+2];d.push(w,E,E,N,N,w)}}else{const M=m.array;_=m.version;for(let T=0,S=M.length/3-1;T<S;T+=3){const w=T+0,E=T+1,N=T+2;d.push(w,E,E,N,N,w)}}const p=new(m.count>=65535?Yc:qc)(d,1);p.version=_;const g=s.get(f);g&&e.remove(g),s.set(f,p)}function u(f){const d=s.get(f);if(d){const h=f.index;h!==null&&d.version<h.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function eg(n,e,t){let i;function r(f){i=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,d){n.drawElements(i,d,s,f*a),t.update(d,i,1)}function c(f,d,h){h!==0&&(n.drawElementsInstanced(i,d,s,f*a,h),t.update(d,i,h))}function u(f,d,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,f,0,h);let _=0;for(let p=0;p<h;p++)_+=d[p];t.update(_,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function tg(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:nt("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function ng(n,e,t){const i=new WeakMap,r=new vt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let d=i.get(o);if(d===void 0||d.count!==f){let b=function(){N.dispose(),i.delete(o),o.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();const h=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let T=0;h===!0&&(T=1),m===!0&&(T=2),_===!0&&(T=3);let S=o.attributes.position.count*T,w=1;S>e.maxTextureSize&&(w=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const E=new Float32Array(S*w*4*f),N=new Gc(E,S,w,f);N.type=fn,N.needsUpdate=!0;const x=T*4;for(let I=0;I<f;I++){const A=p[I],P=g[I],R=M[I],U=S*w*4*I;for(let B=0;B<A.count;B++){const Z=B*x;h===!0&&(r.fromBufferAttribute(A,B),E[U+Z+0]=r.x,E[U+Z+1]=r.y,E[U+Z+2]=r.z,E[U+Z+3]=0),m===!0&&(r.fromBufferAttribute(P,B),E[U+Z+4]=r.x,E[U+Z+5]=r.y,E[U+Z+6]=r.z,E[U+Z+7]=0),_===!0&&(r.fromBufferAttribute(R,B),E[U+Z+8]=r.x,E[U+Z+9]=r.y,E[U+Z+10]=r.z,E[U+Z+11]=R.itemSize===4?r.w:1)}}d={count:f,texture:N,size:new Oe(S,w)},i.set(o,d),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let h=0;for(let _=0;_<c.length;_++)h+=c[_];const m=o.morphTargetsRelative?1:1-h;l.getUniforms().setValue(n,"morphTargetBaseInfluence",m),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function ig(n,e,t,i,r){let s=new WeakMap;function a(c){const u=r.render.frame,f=c.geometry,d=e.get(c,f);if(s.get(d)!==u&&(e.update(d),s.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const h=c.skeleton;s.get(h)!==u&&(h.update(),s.set(h,u))}return d}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const rg={[Ac]:"LINEAR_TONE_MAPPING",[Cc]:"REINHARD_TONE_MAPPING",[Rc]:"CINEON_TONE_MAPPING",[Lc]:"ACES_FILMIC_TONE_MAPPING",[Ic]:"AGX_TONE_MAPPING",[Dc]:"NEUTRAL_TONE_MAPPING",[Pc]:"CUSTOM_TONE_MAPPING"};function sg(n,e,t,i,r,s){const a=new rn(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new Vt;c.setAttribute("position",new bt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new bt([0,2,0,0,2,0],2));const u=new Zf({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new gn(c,u),d=new No(-1,1,1,-1,0,1);let h=null,m=null,_=!1,p,g=null,M=[],T=!1;this.setSize=function(S,w){a.setSize(S,w),o!==null&&o.setSize(S,w),l!==null&&l.setSize(S,w);for(let E=0;E<M.length;E++){const N=M[E];N.setSize&&N.setSize(S,w)}},this.setEffects=function(S){M=S,T=M.length>0&&M[0].isRenderPass===!0;const w=a.width,E=a.height;M.length>0&&o===null&&(o=new rn(w,E,{type:mn,depthBuffer:!1,stencilBuffer:!1}),l=new rn(w,E,{type:mn,depthBuffer:!1,stencilBuffer:!1}));for(let N=0;N<M.length;N++){const x=M[N];x.setSize&&x.setSize(w,E)}},this.begin=function(S,w){if(_||S.toneMapping===nn&&M.length===0)return!1;if(g=w,w!==null){const E=w.width,N=w.height;(a.width!==E||a.height!==N)&&this.setSize(E,N)}return T===!1&&S.setRenderTarget(a),p=S.toneMapping,S.toneMapping=nn,!0},this.hasRenderPass=function(){return T},this.end=function(S,w){S.toneMapping=p,_=!0;let E=a,N=o;for(let x=0;x<M.length;x++){const b=M[x];b.enabled!==!1&&(b.render(S,N,E,w),b.needsSwap!==!1&&(E=N,N=N===o?l:o))}if(h!==S.outputColorSpace||m!==S.toneMapping){h=S.outputColorSpace,m=S.toneMapping,u.defines={},je.getTransfer(h)===rt&&(u.defines.SRGB_TRANSFER="");const x=rg[m];x&&(u.defines[x]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=E.texture,S.setRenderTarget(g),S.render(f,d),g=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}const fu=new Ut,to=new ur(1,1),hu=new Gc,pu=new Yd,mu=new Zc,ql=[],Yl=[],$l=new Float32Array(16),Zl=new Float32Array(9),Kl=new Float32Array(4);function Hi(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=ql[r];if(s===void 0&&(s=new Float32Array(r),ql[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function wt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Tt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function vs(n,e){let t=Yl[e];t===void 0&&(t=new Int32Array(e),Yl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function ag(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function og(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;n.uniform2fv(this.addr,e),Tt(t,e)}}function lg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(wt(t,e))return;n.uniform3fv(this.addr,e),Tt(t,e)}}function cg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;n.uniform4fv(this.addr,e),Tt(t,e)}}function ug(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(wt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Tt(t,e)}else{if(wt(t,i))return;Kl.set(i),n.uniformMatrix2fv(this.addr,!1,Kl),Tt(t,i)}}function dg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(wt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Tt(t,e)}else{if(wt(t,i))return;Zl.set(i),n.uniformMatrix3fv(this.addr,!1,Zl),Tt(t,i)}}function fg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(wt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Tt(t,e)}else{if(wt(t,i))return;$l.set(i),n.uniformMatrix4fv(this.addr,!1,$l),Tt(t,i)}}function hg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function pg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;n.uniform2iv(this.addr,e),Tt(t,e)}}function mg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;n.uniform3iv(this.addr,e),Tt(t,e)}}function gg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;n.uniform4iv(this.addr,e),Tt(t,e)}}function vg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function _g(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;n.uniform2uiv(this.addr,e),Tt(t,e)}}function xg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;n.uniform3uiv(this.addr,e),Tt(t,e)}}function Sg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;n.uniform4uiv(this.addr,e),Tt(t,e)}}function Mg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(to.compareFunction=t.isReversedDepthBuffer()?Ao:To,s=to):s=fu,t.setTexture2D(e||s,r)}function yg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||pu,r)}function bg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||mu,r)}function Eg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||hu,r)}function wg(n){switch(n){case 5126:return ag;case 35664:return og;case 35665:return lg;case 35666:return cg;case 35674:return ug;case 35675:return dg;case 35676:return fg;case 5124:case 35670:return hg;case 35667:case 35671:return pg;case 35668:case 35672:return mg;case 35669:case 35673:return gg;case 5125:return vg;case 36294:return _g;case 36295:return xg;case 36296:return Sg;case 35678:case 36198:case 36298:case 36306:case 35682:return Mg;case 35679:case 36299:case 36307:return yg;case 35680:case 36300:case 36308:case 36293:return bg;case 36289:case 36303:case 36311:case 36292:return Eg}}function Tg(n,e){n.uniform1fv(this.addr,e)}function Ag(n,e){const t=Hi(e,this.size,2);n.uniform2fv(this.addr,t)}function Cg(n,e){const t=Hi(e,this.size,3);n.uniform3fv(this.addr,t)}function Rg(n,e){const t=Hi(e,this.size,4);n.uniform4fv(this.addr,t)}function Lg(n,e){const t=Hi(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Pg(n,e){const t=Hi(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Ig(n,e){const t=Hi(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Dg(n,e){n.uniform1iv(this.addr,e)}function Ng(n,e){n.uniform2iv(this.addr,e)}function Ug(n,e){n.uniform3iv(this.addr,e)}function Fg(n,e){n.uniform4iv(this.addr,e)}function Og(n,e){n.uniform1uiv(this.addr,e)}function Bg(n,e){n.uniform2uiv(this.addr,e)}function kg(n,e){n.uniform3uiv(this.addr,e)}function zg(n,e){n.uniform4uiv(this.addr,e)}function Hg(n,e,t){const i=this.cache,r=e.length,s=vs(t,r);wt(i,s)||(n.uniform1iv(this.addr,s),Tt(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=to:a=fu;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function Vg(n,e,t){const i=this.cache,r=e.length,s=vs(t,r);wt(i,s)||(n.uniform1iv(this.addr,s),Tt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||pu,s[a])}function Gg(n,e,t){const i=this.cache,r=e.length,s=vs(t,r);wt(i,s)||(n.uniform1iv(this.addr,s),Tt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||mu,s[a])}function Wg(n,e,t){const i=this.cache,r=e.length,s=vs(t,r);wt(i,s)||(n.uniform1iv(this.addr,s),Tt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||hu,s[a])}function Xg(n){switch(n){case 5126:return Tg;case 35664:return Ag;case 35665:return Cg;case 35666:return Rg;case 35674:return Lg;case 35675:return Pg;case 35676:return Ig;case 5124:case 35670:return Dg;case 35667:case 35671:return Ng;case 35668:case 35672:return Ug;case 35669:case 35673:return Fg;case 5125:return Og;case 36294:return Bg;case 36295:return kg;case 36296:return zg;case 35678:case 36198:case 36298:case 36306:case 35682:return Hg;case 35679:case 36299:case 36307:return Vg;case 35680:case 36300:case 36308:case 36293:return Gg;case 36289:case 36303:case 36311:case 36292:return Wg}}class qg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=wg(t.type)}}class Yg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Xg(t.type)}}class $g{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const oa=/(\w+)(\])?(\[|\.)?/g;function Jl(n,e){n.seq.push(e),n.map[e.id]=e}function Zg(n,e,t){const i=n.name,r=i.length;for(oa.lastIndex=0;;){const s=oa.exec(i),a=oa.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Jl(t,c===void 0?new qg(o,n,e):new Yg(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new $g(o),Jl(t,f)),t=f}}}class ts{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Zg(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Ql(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Kg=37297;let Jg=0;function Qg(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const jl=new Ge;function jg(n){je._getMatrix(jl,je.workingColorSpace,n);const e=`mat3( ${jl.elements.map(t=>t.toFixed(4))} )`;switch(je.getTransfer(n)){case cs:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return ke("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function ec(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+Qg(n.getShaderSource(e),o)}else return s}function e0(n,e){const t=jg(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const t0={[Ac]:"Linear",[Cc]:"Reinhard",[Rc]:"Cineon",[Lc]:"ACESFilmic",[Ic]:"AgX",[Dc]:"Neutral",[Pc]:"Custom"};function n0(n,e){const t=t0[e];return t===void 0?(ke("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Xr=new G;function i0(){je.getLuminanceCoefficients(Xr);const n=Xr.x.toFixed(4),e=Xr.y.toFixed(4),t=Xr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function r0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(er).join(`
`)}function s0(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function a0(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function er(n){return n!==""}function tc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function nc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const o0=/^[ \t]*#include +<([\w\d./]+)>/gm;function no(n){return n.replace(o0,c0)}const l0=new Map;function c0(n,e){let t=Ze[e];if(t===void 0){const i=l0.get(e);if(i!==void 0)t=Ze[i],ke('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return no(t)}const u0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ic(n){return n.replace(u0,d0)}function d0(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function rc(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const f0={[Kr]:"SHADOWMAP_TYPE_PCF",[Qi]:"SHADOWMAP_TYPE_VSM"};function h0(n){return f0[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const p0={[ri]:"ENVMAP_TYPE_CUBE",[Fi]:"ENVMAP_TYPE_CUBE",[hs]:"ENVMAP_TYPE_CUBE_UV"};function m0(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":p0[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const g0={[Fi]:"ENVMAP_MODE_REFRACTION"};function v0(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":g0[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const _0={[Tc]:"ENVMAP_BLENDING_MULTIPLY",[Ed]:"ENVMAP_BLENDING_MIX",[wd]:"ENVMAP_BLENDING_ADD"};function x0(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":_0[n.combine]||"ENVMAP_BLENDING_NONE"}function S0(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function M0(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=h0(t),c=m0(t),u=v0(t),f=x0(t),d=S0(t),h=r0(t),m=s0(s),_=r.createProgram();let p,g,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(er).join(`
`),p.length>0&&(p+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(er).join(`
`),g.length>0&&(g+=`
`)):(p=[rc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(er).join(`
`),g=[rc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==nn?"#define TONE_MAPPING":"",t.toneMapping!==nn?Ze.tonemapping_pars_fragment:"",t.toneMapping!==nn?n0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,e0("linearToOutputTexel",t.outputColorSpace),i0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(er).join(`
`)),a=no(a),a=tc(a,t),a=nc(a,t),o=no(o),o=tc(o,t),o=nc(o,t),a=ic(a),o=ic(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,p=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,g=["#define varying in",t.glslVersion===ul?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ul?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const T=M+p+a,S=M+g+o,w=Ql(r,r.VERTEX_SHADER,T),E=Ql(r,r.FRAGMENT_SHADER,S);r.attachShader(_,w),r.attachShader(_,E),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function N(A){if(n.debug.checkShaderErrors){const P=r.getProgramInfoLog(_)||"",R=r.getShaderInfoLog(w)||"",U=r.getShaderInfoLog(E)||"",B=P.trim(),Z=R.trim(),H=U.trim();let X=!0,W=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(X=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,w,E);else{const J=ec(r,w,"vertex"),te=ec(r,E,"fragment");nt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+B+`
`+J+`
`+te)}else B!==""?ke("WebGLProgram: Program Info Log:",B):(Z===""||H==="")&&(W=!1);W&&(A.diagnostics={runnable:X,programLog:B,vertexShader:{log:Z,prefix:p},fragmentShader:{log:H,prefix:g}})}r.deleteShader(w),r.deleteShader(E),x=new ts(r,_),b=a0(r,_)}let x;this.getUniforms=function(){return x===void 0&&N(this),x};let b;this.getAttributes=function(){return b===void 0&&N(this),b};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=r.getProgramParameter(_,Kg)),I},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Jg++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=E,this}let y0=0;class b0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new E0(e),t.set(e,i)),i}}class E0{constructor(e){this.id=y0++,this.code=e,this.usedTimes=0}}function w0(n){return n===si||n===as||n===os}function T0(n,e,t,i,r,s){const a=new Wc,o=new b0,l=new Set,c=[],u=new Map,f=i.logarithmicDepthBuffer;let d=i.precision;const h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return l.add(x),x===0?"uv":`uv${x}`}function _(x,b,I,A,P,R){const U=A.fog,B=P.geometry,Z=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?A.environment:null,H=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,X=e.get(x.envMap||Z,H),W=X&&X.mapping===hs?X.image.height:null,J=h[x.type];x.precision!==null&&(d=i.getMaxPrecision(x.precision),d!==x.precision&&ke("WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));const te=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,fe=te!==void 0?te.length:0;let q=0;B.morphAttributes.position!==void 0&&(q=1),B.morphAttributes.normal!==void 0&&(q=2),B.morphAttributes.color!==void 0&&(q=3);let oe,he,Ae,z;if(J){const Me=cn[J];oe=Me.vertexShader,he=Me.fragmentShader}else{oe=x.vertexShader,he=x.fragmentShader;const Me=o.getVertexShaderStage(x),We=o.getFragmentShaderStage(x);o.update(x,Me,We),Ae=Me.id,z=We.id}const K=n.getRenderTarget(),ae=n.state.buffers.depth.getReversed(),ue=P.isInstancedMesh===!0,de=P.isBatchedMesh===!0,pe=!!x.map,Le=!!x.matcap,ie=!!X,Ee=!!x.aoMap,Pe=!!x.lightMap,ze=!!x.bumpMap&&x.wireframe===!1,Ye=!!x.normalMap,ct=!!x.displacementMap,_t=!!x.emissiveMap,Xe=!!x.metalnessMap,et=!!x.roughnessMap,F=x.anisotropy>0,pt=x.clearcoat>0,He=x.dispersion>0,C=x.retroreflectivity>0,v=x.iridescence>0,V=x.sheen>0,Q=x.transmission>0,re=F&&!!x.anisotropyMap,me=pt&&!!x.clearcoatMap,ve=pt&&!!x.clearcoatNormalMap,se=pt&&!!x.clearcoatRoughnessMap,ce=v&&!!x.iridescenceMap,ge=v&&!!x.iridescenceThicknessMap,Ne=V&&!!x.sheenColorMap,ye=V&&!!x.sheenRoughnessMap,xe=!!x.specularMap,Ue=!!x.specularColorMap,Be=!!x.specularIntensityMap,Ve=Q&&!!x.transmissionMap,k=Q&&!!x.thicknessMap,Se=!!x.gradientMap,le=!!x.alphaMap,_e=x.alphaTest>0,L=!!x.alphaHash,D=!!x.extensions;let ee=nn;x.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(ee=n.toneMapping);const j={shaderID:J,shaderType:x.type,shaderName:x.name,vertexShader:oe,fragmentShader:he,defines:x.defines,customVertexShaderID:Ae,customFragmentShaderID:z,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:de,batchingColor:de&&P._colorsTexture!==null,instancing:ue,instancingColor:ue&&P.instanceColor!==null,instancingMorph:ue&&P.morphTexture!==null,outputColorSpace:K===null?n.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:je.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:pe,matcap:Le,envMap:ie,envMapMode:ie&&X.mapping,envMapCubeUVHeight:W,aoMap:Ee,lightMap:Pe,bumpMap:ze,normalMap:Ye,displacementMap:ct,emissiveMap:_t,normalMapObjectSpace:Ye&&x.normalMapType===Cd,normalMapTangentSpace:Ye&&x.normalMapType===cl,packedNormalMap:Ye&&x.normalMapType===cl&&w0(x.normalMap.format),metalnessMap:Xe,roughnessMap:et,anisotropy:F,anisotropyMap:re,clearcoat:pt,clearcoatMap:me,clearcoatNormalMap:ve,clearcoatRoughnessMap:se,dispersion:He,retroreflection:C,iridescence:v,iridescenceMap:ce,iridescenceThicknessMap:ge,sheen:V,sheenColorMap:Ne,sheenRoughnessMap:ye,specularMap:xe,specularColorMap:Ue,specularIntensityMap:Be,transmission:Q,transmissionMap:Ve,thicknessMap:k,gradientMap:Se,opaque:x.transparent===!1&&x.blending===tr&&x.alphaToCoverage===!1,alphaMap:le,alphaTest:_e,alphaHash:L,combine:x.combine,mapUv:pe&&m(x.map.channel),aoMapUv:Ee&&m(x.aoMap.channel),lightMapUv:Pe&&m(x.lightMap.channel),bumpMapUv:ze&&m(x.bumpMap.channel),normalMapUv:Ye&&m(x.normalMap.channel),displacementMapUv:ct&&m(x.displacementMap.channel),emissiveMapUv:_t&&m(x.emissiveMap.channel),metalnessMapUv:Xe&&m(x.metalnessMap.channel),roughnessMapUv:et&&m(x.roughnessMap.channel),anisotropyMapUv:re&&m(x.anisotropyMap.channel),clearcoatMapUv:me&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:ve&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:se&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:ce&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:ge&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:Ne&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:ye&&m(x.sheenRoughnessMap.channel),specularMapUv:xe&&m(x.specularMap.channel),specularColorMapUv:Ue&&m(x.specularColorMap.channel),specularIntensityMapUv:Be&&m(x.specularIntensityMap.channel),transmissionMapUv:Ve&&m(x.transmissionMap.channel),thicknessMapUv:k&&m(x.thicknessMap.channel),alphaMapUv:le&&m(x.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Ye||F),vertexNormals:!!B.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!B.attributes.uv&&(pe||le),fog:!!U,useFog:x.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||B.attributes.normal===void 0&&Ye===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ae,skinning:P.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:fe,morphTextureStride:q,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:R.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:ee,decodeVideoTexture:pe&&x.map.isVideoTexture===!0&&je.getTransfer(x.map.colorSpace)===rt,decodeVideoTextureEmissive:_t&&x.emissiveMap.isVideoTexture===!0&&je.getTransfer(x.emissiveMap.colorSpace)===rt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===dn,flipSided:x.side===Ht,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:D&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(D&&x.extensions.multiDraw===!0||de)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return j.vertexUv1s=l.has(1),j.vertexUv2s=l.has(2),j.vertexUv3s=l.has(3),l.clear(),j}function p(x){const b=[];if(x.shaderID?b.push(x.shaderID):(b.push(x.customVertexShaderID),b.push(x.customFragmentShaderID)),x.defines!==void 0)for(const I in x.defines)b.push(I),b.push(x.defines[I]);return x.isRawShaderMaterial===!1&&(g(b,x),M(b,x),b.push(n.outputColorSpace)),b.push(x.customProgramCacheKey),b.join()}function g(x,b){x.push(b.precision),x.push(b.outputColorSpace),x.push(b.envMapMode),x.push(b.envMapCubeUVHeight),x.push(b.mapUv),x.push(b.alphaMapUv),x.push(b.lightMapUv),x.push(b.aoMapUv),x.push(b.bumpMapUv),x.push(b.normalMapUv),x.push(b.displacementMapUv),x.push(b.emissiveMapUv),x.push(b.metalnessMapUv),x.push(b.roughnessMapUv),x.push(b.anisotropyMapUv),x.push(b.clearcoatMapUv),x.push(b.clearcoatNormalMapUv),x.push(b.clearcoatRoughnessMapUv),x.push(b.iridescenceMapUv),x.push(b.iridescenceThicknessMapUv),x.push(b.sheenColorMapUv),x.push(b.sheenRoughnessMapUv),x.push(b.specularMapUv),x.push(b.specularColorMapUv),x.push(b.specularIntensityMapUv),x.push(b.transmissionMapUv),x.push(b.thicknessMapUv),x.push(b.combine),x.push(b.fogExp2),x.push(b.sizeAttenuation),x.push(b.morphTargetsCount),x.push(b.morphAttributeCount),x.push(b.numSunLights),x.push(b.numDirLights),x.push(b.numPointLights),x.push(b.numSpotLights),x.push(b.numSpotLightMaps),x.push(b.numHemiLights),x.push(b.numRectAreaLights),x.push(b.numSunLightShadows),x.push(b.numDirLightShadows),x.push(b.numPointLightShadows),x.push(b.numSpotLightShadows),x.push(b.numSpotLightShadowsWithMaps),x.push(b.numLightProbes),x.push(b.shadowMapType),x.push(b.toneMapping),x.push(b.numClippingPlanes),x.push(b.numClipIntersection),x.push(b.depthPacking)}function M(x,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.retroreflection&&a.enable(24),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),b.packedNormalMap&&a.enable(22),b.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),b.numLightProbeGrids>0&&a.enable(22),b.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function T(x){const b=h[x.type];let I;if(b){const A=cn[b];I=qf.clone(A.uniforms)}else I=x.uniforms;return I}function S(x,b){let I=u.get(b);return I!==void 0?++I.usedTimes:(I=new M0(n,b,x,r),c.push(I),u.set(b,I)),I}function w(x){if(--x.usedTimes===0){const b=c.indexOf(x);c[b]=c[c.length-1],c.pop(),u.delete(x.cacheKey),x.destroy()}}function E(x){o.remove(x)}function N(){o.dispose()}return{getParameters:_,getProgramCacheKey:p,getUniforms:T,acquireProgram:S,releaseProgram:w,releaseShaderCache:E,programs:c,dispose:N}}function A0(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function C0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function sc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function ac(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(d){let h=0;return d.isInstancedMesh&&(h+=2),d.isSkinnedMesh&&(h+=1),h}function o(d,h,m,_,p,g){let M=n[e];return M===void 0?(M={id:d.id,object:d,geometry:h,material:m,materialVariant:a(d),groupOrder:_,renderOrder:d.renderOrder,z:p,group:g},n[e]=M):(M.id=d.id,M.object=d,M.geometry=h,M.material=m,M.materialVariant=a(d),M.groupOrder=_,M.renderOrder=d.renderOrder,M.z=p,M.group=g),e++,M}function l(d,h,m,_,p,g,M){M.reversedDepth===!0&&(p=-p);const T=o(d,h,m,_,p,g);m.transmission>0?i.push(T):m.transparent===!0?r.push(T):t.push(T)}function c(d,h,m,_,p,g){const M=o(d,h,m,_,p,g);m.transmission>0?i.unshift(M):m.transparent===!0?r.unshift(M):t.unshift(M)}function u(d,h){t.length>1&&t.sort(d||C0),i.length>1&&i.sort(h||sc),r.length>1&&r.sort(h||sc)}function f(){for(let d=e,h=n.length;d<h;d++){const m=n[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:f,sort:u}}function R0(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new ac,n.set(i,[a])):r>=s.length?(a=new ac,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function L0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new G,color:new qe};break;case"SpotLight":t={position:new G,direction:new G,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new G,color:new qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new G,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":t={color:new qe,position:new G,halfWidth:new G,halfHeight:new G};break}return n[e.id]=t,t}}}function P0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let I0=0;function D0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function N0(n){const e=new L0,t=P0(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new G);const r=new G,s=new St,a=new St;function o(c){let u=0,f=0,d=0;for(let P=0;P<9;P++)i.probe[P].set(0,0,0);let h=0,m=0,_=0,p=0,g=0,M=0,T=0,S=0,w=0,E=0,N=0,x=0,b=0,I=0;c.sort(D0);for(let P=0,R=c.length;P<R;P++){const U=c[P],B=U.color,Z=U.intensity,H=U.distance;let X=null;if(U.shadow&&U.shadow.map&&(U.shadow.map.texture.format===si?X=U.shadow.map.texture:X=U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)u+=B.r*Z,f+=B.g*Z,d+=B.b*Z;else if(U.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(U.sh.coefficients[W],Z);I++}else if(U.isSunLight){const W=e.get(U);if(W.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const J=U.shadow,te=t.get(U);te.shadowIntensity=J.intensity,te.shadowBias=J.bias,te.shadowNormalBias=J.normalBias,te.shadowRadius=J.radius,te.shadowMapSize.copy(J.mapSize).multiply(J.getFrameExtents()),i.sunShadow[m]=te,i.sunShadowMap[m]=X;const fe=J.getViewportCount();for(let q=0;q<fe;q++)i.sunShadowMatrix[_+q]=J.getMatrix(q),i.sunShadowCascade[_+q]=J._cascadeData[q];_+=fe,m++}i.sun[h]=W,h++}else if(U.isDirectionalLight){const W=e.get(U);if(W.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const J=U.shadow,te=t.get(U);te.shadowIntensity=J.intensity,te.shadowBias=J.bias,te.shadowNormalBias=J.normalBias,te.shadowRadius=J.radius,te.shadowMapSize=J.mapSize,i.directionalShadow[p]=te,i.directionalShadowMap[p]=X,i.directionalShadowMatrix[p]=U.shadow.matrix,w++}i.directional[p]=W,p++}else if(U.isSpotLight){const W=e.get(U);W.position.setFromMatrixPosition(U.matrixWorld),W.color.copy(B).multiplyScalar(Z),W.distance=H,W.coneCos=Math.cos(U.angle),W.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),W.decay=U.decay,i.spot[M]=W;const J=U.shadow;if(U.map&&(i.spotLightMap[x]=U.map,x++,J.updateMatrices(U),U.castShadow&&b++),i.spotLightMatrix[M]=J.matrix,U.castShadow){const te=t.get(U);te.shadowIntensity=J.intensity,te.shadowBias=J.bias,te.shadowNormalBias=J.normalBias,te.shadowRadius=J.radius,te.shadowMapSize=J.mapSize,i.spotShadow[M]=te,i.spotShadowMap[M]=X,N++}M++}else if(U.isRectAreaLight){const W=e.get(U);W.color.copy(B).multiplyScalar(Z),W.halfWidth.set(U.width*.5,0,0),W.halfHeight.set(0,U.height*.5,0),i.rectArea[T]=W,T++}else if(U.isPointLight){const W=e.get(U);if(W.color.copy(U.color).multiplyScalar(U.intensity),W.distance=U.distance,W.decay=U.decay,U.castShadow){const J=U.shadow,te=t.get(U);te.shadowIntensity=J.intensity,te.shadowBias=J.bias,te.shadowNormalBias=J.normalBias,te.shadowRadius=J.radius,te.shadowMapSize=J.mapSize,te.shadowCameraNear=J.camera.near,te.shadowCameraFar=J.camera.far,i.pointShadow[g]=te,i.pointShadowMap[g]=X,i.pointShadowMatrix[g]=U.shadow.matrix,E++}i.point[g]=W,g++}else if(U.isHemisphereLight){const W=e.get(U);W.skyColor.copy(U.color).multiplyScalar(Z),W.groundColor.copy(U.groundColor).multiplyScalar(Z),i.hemi[S]=W,S++}}T>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=be.LTC_FLOAT_1,i.rectAreaLTC2=be.LTC_FLOAT_2):(i.rectAreaLTC1=be.LTC_HALF_1,i.rectAreaLTC2=be.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=d;const A=i.hash;(A.sunLength!==h||A.directionalLength!==p||A.pointLength!==g||A.spotLength!==M||A.rectAreaLength!==T||A.hemiLength!==S||A.numSunShadows!==m||A.numDirectionalShadows!==w||A.numPointShadows!==E||A.numSpotShadows!==N||A.numSpotMaps!==x||A.numLightProbes!==I)&&(i.sun.length=h,i.directional.length=p,i.spot.length=M,i.rectArea.length=T,i.point.length=g,i.hemi.length=S,i.sunShadow.length=m,i.sunShadowMap.length=m,i.sunShadowMatrix.length=_,i.sunShadowCascade.length=_,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.directionalShadowMatrix.length=w,i.pointShadow.length=E,i.pointShadowMap.length=E,i.pointShadowMatrix.length=E,i.spotShadow.length=N,i.spotShadowMap.length=N,i.spotLightMatrix.length=N+x-b,i.spotLightMap.length=x,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=I,A.sunLength=h,A.directionalLength=p,A.pointLength=g,A.spotLength=M,A.rectAreaLength=T,A.hemiLength=S,A.numSunShadows=m,A.numDirectionalShadows=w,A.numPointShadows=E,A.numSpotShadows=N,A.numSpotMaps=x,A.numLightProbes=I,i.version=I0++)}function l(c,u){let f=0,d=0,h=0,m=0,_=0,p=0;const g=u.matrixWorldInverse;for(let M=0,T=c.length;M<T;M++){const S=c[M];if(S.isSunLight){const w=i.sun[f];w.direction.setFromMatrixPosition(S.matrixWorld),w.direction.transformDirection(g),f++}else if(S.isDirectionalLight){const w=i.directional[d];w.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(g),d++}else if(S.isSpotLight){const w=i.spot[m];w.position.setFromMatrixPosition(S.matrixWorld),w.position.applyMatrix4(g),w.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(g),m++}else if(S.isRectAreaLight){const w=i.rectArea[_];w.position.setFromMatrixPosition(S.matrixWorld),w.position.applyMatrix4(g),a.identity(),s.copy(S.matrixWorld),s.premultiply(g),a.extractRotation(s),w.halfWidth.set(S.width*.5,0,0),w.halfHeight.set(0,S.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),_++}else if(S.isPointLight){const w=i.point[h];w.position.setFromMatrixPosition(S.matrixWorld),w.position.applyMatrix4(g),h++}else if(S.isHemisphereLight){const w=i.hemi[p];w.direction.setFromMatrixPosition(S.matrixWorld),w.direction.transformDirection(g),p++}}}return{setup:o,setupView:l,state:i}}function oc(n){const e=new N0(n),t=[],i=[],r=[];function s(d){f.camera=d,t.length=0,i.length=0,r.length=0}function a(d){t.push(d)}function o(d){i.push(d)}function l(d){r.push(d)}function c(){e.setup(t)}function u(d){e.setupView(t,d)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function U0(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new oc(n),e.set(r,[o])):s>=a.length?(o=new oc(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const F0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,O0=`uniform sampler2D shadow_pass;
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
}`,B0=[new G(1,0,0),new G(-1,0,0),new G(0,1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1)],k0=[new G(0,-1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1),new G(0,-1,0),new G(0,-1,0)],lc=new St,$i=new G,la=new G;function z0(n,e,t){let i=new $c;const r=new Oe,s=new Oe,a=new vt,o=new Kf,l=new Jf,c={},u=t.maxTextureSize,f={[ii]:Ht,[Ht]:ii,[dn]:dn},d=new vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Oe},radius:{value:4}},vertexShader:F0,fragmentShader:O0}),h=d.clone();h.defines.HORIZONTAL_PASS=1;const m=new Vt;m.setAttribute("position",new Cn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new gn(m,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Kr;let g=this.type;this.render=function(E,N,x){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;this.type===sd&&(ke("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Kr);const b=n.getRenderTarget(),I=n.getActiveCubeFace(),A=n.getActiveMipmapLevel(),P=n.state;P.setBlending(Tn),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const R=g!==this.type;R&&N.traverse(function(U){U.material&&(Array.isArray(U.material)?U.material.forEach(B=>B.needsUpdate=!0):U.material.needsUpdate=!0)});for(let U=0,B=E.length;U<B;U++){const Z=E[U],H=Z.shadow;if(H===void 0){ke("WebGLShadowMap:",Z,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const X=H.getFrameExtents();r.multiply(X),s.copy(H.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/X.x),r.x=s.x*X.x,H.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/X.y),r.y=s.y*X.y,H.mapSize.y=s.y));const W=n.state.buffers.depth.getReversed();if(H.camera._reversedDepth=W,H.map===null||R===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===Qi){if(Z.isPointLight){ke("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new rn(r.x,r.y,{format:si,type:mn,minFilter:Nt,magFilter:Nt,generateMipmaps:!1}),H.map.texture.name=Z.name+".shadowMap",H.map.depthTexture=new ur(r.x,r.y,fn),H.map.depthTexture.name=Z.name+".shadowMapDepth",H.map.depthTexture.format=Ln,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Rt,H.map.depthTexture.magFilter=Rt}else Z.isPointLight?(H.map=new du(r.x),H.map.depthTexture=new ff(r.x,pn)):(H.map=new rn(r.x,r.y),H.map.depthTexture=new ur(r.x,r.y,pn)),H.map.depthTexture.name=Z.name+".shadowMap",H.map.depthTexture.format=Ln,this.type===Kr?(H.map.depthTexture.compareFunction=W?Ao:To,H.map.depthTexture.minFilter=Nt,H.map.depthTexture.magFilter=Nt):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Rt,H.map.depthTexture.magFilter=Rt);H.camera.updateProjectionMatrix()}H.map.isWebGLCubeRenderTarget!==!0&&(H.map.width!==r.x||H.map.height!==r.y)&&H.map.setSize(r.x,r.y);const J=H.map.isWebGLCubeRenderTarget?6:H.getViewportCount();Z.isPointLight!==!0&&H.updateMatrices(Z,x);for(let te=0;te<J;te++){const fe=H.getCamera(te);if(Z.isPointLight){const q=H.camera,oe=H.matrix,he=Z.distance||q.far;he!==q.far&&(q.far=he,q.updateProjectionMatrix()),$i.setFromMatrixPosition(Z.matrixWorld),q.position.copy($i),la.copy(q.position),la.add(B0[te]),q.up.copy(k0[te]),q.lookAt(la),q.updateMatrixWorld(),oe.makeTranslation(-$i.x,-$i.y,-$i.z),lc.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),H._frustum.setFromProjectionMatrix(lc,q.coordinateSystem,q.reversedDepth)}if(H.map.isWebGLCubeRenderTarget)n.setRenderTarget(H.map,te),n.clear();else{te===0&&(n.setRenderTarget(H.map),n.clear());const q=H.getViewport(te);a.set(s.x*q.x,s.y*q.y,s.x*q.z,s.y*q.w),P.viewport(a)}i=H.getFrustum(te),S(N,x,fe,Z,this.type)}H.isPointLightShadow!==!0&&this.type===Qi&&M(H,x),H.needsUpdate=!1}g=this.type,p.needsUpdate=!1,n.setRenderTarget(b,I,A)};function M(E,N){const x=e.update(_);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,h.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,h.needsUpdate=!0),E.mapPass===null?E.mapPass=new rn(r.x,r.y,{format:si,type:mn}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),d.uniforms.shadow_pass.value=E.map.depthTexture,d.uniforms.resolution.value.set(E.map.width,E.map.height),d.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(N,null,x,d,_,null),h.uniforms.shadow_pass.value=E.mapPass.texture,h.uniforms.resolution.value.set(E.map.width,E.map.height),h.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(N,null,x,h,_,null)}function T(E,N,x,b){let I=null;const A=x.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(A!==void 0)I=A;else if(I=x.isPointLight===!0?l:o,n.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0||N.alphaToCoverage===!0){const P=I.uuid,R=N.uuid;let U=c[P];U===void 0&&(U={},c[P]=U);let B=U[R];B===void 0&&(B=I.clone(),U[R]=B,N.addEventListener("dispose",w)),I=B}if(I.visible=N.visible,I.wireframe=N.wireframe,b===Qi?I.side=N.shadowSide!==null?N.shadowSide:N.side:I.side=N.shadowSide!==null?N.shadowSide:f[N.side],I.alphaMap=N.alphaMap,I.alphaTest=N.alphaToCoverage===!0?.5:N.alphaTest,I.map=N.map,I.clipShadows=N.clipShadows,I.clippingPlanes=N.clippingPlanes,I.clipIntersection=N.clipIntersection,I.displacementMap=N.displacementMap,I.displacementScale=N.displacementScale,I.displacementBias=N.displacementBias,I.wireframeLinewidth=N.wireframeLinewidth,I.linewidth=N.linewidth,x.isPointLight===!0&&I.isMeshDistanceMaterial===!0){const P=n.properties.get(I);P.light=x}return I}function S(E,N,x,b,I){if(E.visible===!1)return;if(E.layers.test(N.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&I===Qi)&&(!E.frustumCulled||E.intersectsFrustum(i))){E.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,E.matrixWorld);const R=e.update(E),U=E.material;if(Array.isArray(U)){const B=R.groups;for(let Z=0,H=B.length;Z<H;Z++){const X=B[Z],W=U[X.materialIndex];if(W&&W.visible){const J=T(E,W,b,I);E.onBeforeShadow(n,E,N,x,R,J,X),n.renderBufferDirect(x,null,R,J,E,X),E.onAfterShadow(n,E,N,x,R,J,X)}}}else if(U.visible){const B=T(E,U,b,I);E.onBeforeShadow(n,E,N,x,R,B,null),n.renderBufferDirect(x,null,R,B,E,null),E.onAfterShadow(n,E,N,x,R,B,null)}}const P=E.children;for(let R=0,U=P.length;R<U;R++)S(P[R],N,x,b,I)}function w(E){E.target.removeEventListener("dispose",w);for(const x in c){const b=c[x],I=E.target.uuid;I in b&&(b[I].dispose(),delete b[I])}}}function H0(n,e){function t(){let k=!1;const Se=new vt;let le=null;const _e=new vt(0,0,0,0);return{setMask:function(L){le!==L&&!k&&(n.colorMask(L,L,L,L),le=L)},setLocked:function(L){k=L},setClear:function(L,D,ee,j,Me){Me===!0&&(L*=j,D*=j,ee*=j),Se.set(L,D,ee,j),_e.equals(Se)===!1&&(n.clearColor(L,D,ee,j),_e.copy(Se))},reset:function(){k=!1,le=null,_e.set(-1,0,0,0)}}}function i(){let k=!1,Se=!1,le=null,_e=null,L=null;return{setReversed:function(D){if(Se!==D){const ee=e.get("EXT_clip_control");D?ee.clipControlEXT(ee.LOWER_LEFT_EXT,ee.ZERO_TO_ONE_EXT):ee.clipControlEXT(ee.LOWER_LEFT_EXT,ee.NEGATIVE_ONE_TO_ONE_EXT),Se=D;const j=L;L=null,this.setClear(j)}},getReversed:function(){return Se},setTest:function(D){D?K(n.DEPTH_TEST):ae(n.DEPTH_TEST)},setMask:function(D){le!==D&&!k&&(n.depthMask(D),le=D)},setFunc:function(D){if(Se&&(D=zd[D]),_e!==D){switch(D){case ha:n.depthFunc(n.NEVER);break;case pa:n.depthFunc(n.ALWAYS);break;case ma:n.depthFunc(n.LESS);break;case ar:n.depthFunc(n.LEQUAL);break;case ga:n.depthFunc(n.EQUAL);break;case va:n.depthFunc(n.GEQUAL);break;case _a:n.depthFunc(n.GREATER);break;case xa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}_e=D}},setLocked:function(D){k=D},setClear:function(D){L!==D&&(L=D,Se&&(D=1-D),n.clearDepth(D))},reset:function(){k=!1,le=null,_e=null,L=null,Se=!1}}}function r(){let k=!1,Se=null,le=null,_e=null,L=null,D=null,ee=null,j=null,Me=null;return{setTest:function(We){k||(We?K(n.STENCIL_TEST):ae(n.STENCIL_TEST))},setMask:function(We){Se!==We&&!k&&(n.stencilMask(We),Se=We)},setFunc:function(We,Et,Gt){(le!==We||_e!==Et||L!==Gt)&&(n.stencilFunc(We,Et,Gt),le=We,_e=Et,L=Gt)},setOp:function(We,Et,Gt){(D!==We||ee!==Et||j!==Gt)&&(n.stencilOp(We,Et,Gt),D=We,ee=Et,j=Gt)},setLocked:function(We){k=We},setClear:function(We){Me!==We&&(n.clearStencil(We),Me=We)},reset:function(){k=!1,Se=null,le=null,_e=null,L=null,D=null,ee=null,j=null,Me=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let u={},f={},d={},h=new WeakMap,m=[],_=null,p=!1,g=null,M=null,T=null,S=null,w=null,E=null,N=null,x=new qe(0,0,0),b=0,I=!1,A=null,P=null,R=null,U=null,B=null;const Z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,X=0;const W=n.getParameter(n.VERSION);W.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(W)[1]),H=X>=1):W.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),H=X>=2);let J=null,te={};const fe=n.getParameter(n.SCISSOR_BOX),q=n.getParameter(n.VIEWPORT),oe=new vt().fromArray(fe),he=new vt().fromArray(q);function Ae(k,Se,le,_e){const L=new Uint8Array(4),D=n.createTexture();n.bindTexture(k,D),n.texParameteri(k,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(k,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ee=0;ee<le;ee++)k===n.TEXTURE_3D||k===n.TEXTURE_2D_ARRAY?n.texImage3D(Se,0,n.RGBA,1,1,_e,0,n.RGBA,n.UNSIGNED_BYTE,L):n.texImage2D(Se+ee,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,L);return D}const z={};z[n.TEXTURE_2D]=Ae(n.TEXTURE_2D,n.TEXTURE_2D,1),z[n.TEXTURE_CUBE_MAP]=Ae(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),z[n.TEXTURE_2D_ARRAY]=Ae(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),z[n.TEXTURE_3D]=Ae(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),K(n.DEPTH_TEST),a.setFunc(ar),ze(!1),Ye(sl),K(n.CULL_FACE),Ee(Tn);function K(k){u[k]!==!0&&(n.enable(k),u[k]=!0)}function ae(k){u[k]!==!1&&(n.disable(k),u[k]=!1)}function ue(k,Se){return d[k]!==Se?(n.bindFramebuffer(k,Se),d[k]=Se,k===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=Se),k===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=Se),!0):!1}function de(k,Se){let le=m,_e=!1;if(k){le=h.get(Se),le===void 0&&(le=[],h.set(Se,le));const L=k.textures;if(le.length!==L.length||le[0]!==n.COLOR_ATTACHMENT0){for(let D=0,ee=L.length;D<ee;D++)le[D]=n.COLOR_ATTACHMENT0+D;le.length=L.length,_e=!0}}else le[0]!==n.BACK&&(le[0]=n.BACK,_e=!0);_e&&n.drawBuffers(le)}function pe(k){return _!==k?(n.useProgram(k),_=k,!0):!1}const Le={[Ti]:n.FUNC_ADD,[od]:n.FUNC_SUBTRACT,[ld]:n.FUNC_REVERSE_SUBTRACT};Le[cd]=n.MIN,Le[ud]=n.MAX;const ie={[dd]:n.ZERO,[fd]:n.ONE,[hd]:n.SRC_COLOR,[Ec]:n.SRC_ALPHA,[xd]:n.SRC_ALPHA_SATURATE,[vd]:n.DST_COLOR,[md]:n.DST_ALPHA,[pd]:n.ONE_MINUS_SRC_COLOR,[wc]:n.ONE_MINUS_SRC_ALPHA,[_d]:n.ONE_MINUS_DST_COLOR,[gd]:n.ONE_MINUS_DST_ALPHA,[Sd]:n.CONSTANT_COLOR,[Md]:n.ONE_MINUS_CONSTANT_COLOR,[yd]:n.CONSTANT_ALPHA,[bd]:n.ONE_MINUS_CONSTANT_ALPHA};function Ee(k,Se,le,_e,L,D,ee,j,Me,We){if(k===Tn){p===!0&&(ae(n.BLEND),p=!1);return}if(p===!1&&(K(n.BLEND),p=!0),k!==ad){if(k!==g||We!==I){if((M!==Ti||w!==Ti)&&(n.blendEquation(n.FUNC_ADD),M=Ti,w=Ti),We)switch(k){case tr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case al:n.blendFunc(n.ONE,n.ONE);break;case ol:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ll:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:nt("WebGLState: Invalid blending: ",k);break}else switch(k){case tr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case al:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case ol:nt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ll:nt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:nt("WebGLState: Invalid blending: ",k);break}T=null,S=null,E=null,N=null,x.set(0,0,0),b=0,g=k,I=We}return}L=L||Se,D=D||le,ee=ee||_e,(Se!==M||L!==w)&&(n.blendEquationSeparate(Le[Se],Le[L]),M=Se,w=L),(le!==T||_e!==S||D!==E||ee!==N)&&(n.blendFuncSeparate(ie[le],ie[_e],ie[D],ie[ee]),T=le,S=_e,E=D,N=ee),(j.equals(x)===!1||Me!==b)&&(n.blendColor(j.r,j.g,j.b,Me),x.copy(j),b=Me),g=k,I=!1}function Pe(k,Se){k.side===dn?ae(n.CULL_FACE):K(n.CULL_FACE);let le=k.side===Ht;Se&&(le=!le),ze(le),k.blending===tr&&k.transparent===!1?Ee(Tn):Ee(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),s.setMask(k.colorWrite);const _e=k.stencilWrite;o.setTest(_e),_e&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),_t(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?K(n.SAMPLE_ALPHA_TO_COVERAGE):ae(n.SAMPLE_ALPHA_TO_COVERAGE)}function ze(k){A!==k&&(k?n.frontFace(n.CW):n.frontFace(n.CCW),A=k)}function Ye(k){k!==id?(K(n.CULL_FACE),k!==P&&(k===sl?n.cullFace(n.BACK):k===rd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ae(n.CULL_FACE),P=k}function ct(k){k!==R&&(H&&n.lineWidth(k),R=k)}function _t(k,Se,le){k?(K(n.POLYGON_OFFSET_FILL),(U!==Se||B!==le)&&(U=Se,B=le,a.getReversed()&&(Se=-Se),n.polygonOffset(Se,le))):ae(n.POLYGON_OFFSET_FILL)}function Xe(k){k?K(n.SCISSOR_TEST):ae(n.SCISSOR_TEST)}function et(k){k===void 0&&(k=n.TEXTURE0+Z-1),J!==k&&(n.activeTexture(k),J=k)}function F(k,Se,le){le===void 0&&(J===null?le=n.TEXTURE0+Z-1:le=J);let _e=te[le];_e===void 0&&(_e={type:void 0,texture:void 0},te[le]=_e),(_e.type!==k||_e.texture!==Se)&&(J!==le&&(n.activeTexture(le),J=le),n.bindTexture(k,Se||z[k]),_e.type=k,_e.texture=Se)}function pt(){const k=te[J];k!==void 0&&k.type!==void 0&&(n.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function He(){try{n.compressedTexImage2D(...arguments)}catch(k){nt("WebGLState:",k)}}function C(){try{n.compressedTexImage3D(...arguments)}catch(k){nt("WebGLState:",k)}}function v(){try{n.texSubImage2D(...arguments)}catch(k){nt("WebGLState:",k)}}function V(){try{n.texSubImage3D(...arguments)}catch(k){nt("WebGLState:",k)}}function Q(){try{n.compressedTexSubImage2D(...arguments)}catch(k){nt("WebGLState:",k)}}function re(){try{n.compressedTexSubImage3D(...arguments)}catch(k){nt("WebGLState:",k)}}function me(){try{n.texStorage2D(...arguments)}catch(k){nt("WebGLState:",k)}}function ve(){try{n.texStorage3D(...arguments)}catch(k){nt("WebGLState:",k)}}function se(){try{n.texImage2D(...arguments)}catch(k){nt("WebGLState:",k)}}function ce(){try{n.texImage3D(...arguments)}catch(k){nt("WebGLState:",k)}}function ge(k){return f[k]!==void 0?f[k]:n.getParameter(k)}function Ne(k,Se){f[k]!==Se&&(n.pixelStorei(k,Se),f[k]=Se)}function ye(k){oe.equals(k)===!1&&(n.scissor(k.x,k.y,k.z,k.w),oe.copy(k))}function xe(k){he.equals(k)===!1&&(n.viewport(k.x,k.y,k.z,k.w),he.copy(k))}function Ue(k,Se){let le=c.get(Se);le===void 0&&(le=new WeakMap,c.set(Se,le));let _e=le.get(k);_e===void 0&&(_e=n.getUniformBlockIndex(Se,k.name),le.set(k,_e))}function Be(k,Se){const _e=c.get(Se).get(k);l.get(Se)!==_e&&(n.uniformBlockBinding(Se,_e,k.__bindingPointIndex),l.set(Se,_e))}function Ve(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},J=null,te={},d={},h=new WeakMap,m=[],_=null,p=!1,g=null,M=null,T=null,S=null,w=null,E=null,N=null,x=new qe(0,0,0),b=0,I=!1,A=null,P=null,R=null,U=null,B=null,oe.set(0,0,n.canvas.width,n.canvas.height),he.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:K,disable:ae,bindFramebuffer:ue,drawBuffers:de,useProgram:pe,setBlending:Ee,setMaterial:Pe,setFlipSided:ze,setCullFace:Ye,setLineWidth:ct,setPolygonOffset:_t,setScissorTest:Xe,activeTexture:et,bindTexture:F,unbindTexture:pt,compressedTexImage2D:He,compressedTexImage3D:C,texImage2D:se,texImage3D:ce,pixelStorei:Ne,getParameter:ge,updateUBOMapping:Ue,uniformBlockBinding:Be,texStorage2D:me,texStorage3D:ve,texSubImage2D:v,texSubImage3D:V,compressedTexSubImage2D:Q,compressedTexSubImage3D:re,scissor:ye,viewport:xe,reset:Ve}}function V0(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Oe,u=new WeakMap,f=new Set;let d;const h=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(C,v){return m?new OffscreenCanvas(C,v):cr("canvas")}function p(C,v,V){let Q=1;const re=He(C);if((re.width>V||re.height>V)&&(Q=V/Math.max(re.width,re.height)),Q<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const me=Math.floor(Q*re.width),ve=Math.floor(Q*re.height);d===void 0&&(d=_(me,ve));const se=v?_(me,ve):d;return se.width=me,se.height=ve,se.getContext("2d").drawImage(C,0,0,me,ve),ke("WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+me+"x"+ve+")."),se}else return"data"in C&&ke("WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),C;return C}function g(C){return C.generateMipmaps}function M(C){n.generateMipmap(C)}function T(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(C,v,V,Q,re,me=!1){if(C!==null){if(n[C]!==void 0)return n[C];ke("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let ve;Q&&(ve=e.get("EXT_texture_norm16"),ve||ke("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let se=v;if(v===n.RED&&(V===n.FLOAT&&(se=n.R32F),V===n.HALF_FLOAT&&(se=n.R16F),V===n.UNSIGNED_BYTE&&(se=n.R8),V===n.UNSIGNED_SHORT&&ve&&(se=ve.R16_EXT),V===n.SHORT&&ve&&(se=ve.R16_SNORM_EXT)),v===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&(se=n.R8UI),V===n.UNSIGNED_SHORT&&(se=n.R16UI),V===n.UNSIGNED_INT&&(se=n.R32UI),V===n.BYTE&&(se=n.R8I),V===n.SHORT&&(se=n.R16I),V===n.INT&&(se=n.R32I)),v===n.RG&&(V===n.FLOAT&&(se=n.RG32F),V===n.HALF_FLOAT&&(se=n.RG16F),V===n.UNSIGNED_BYTE&&(se=n.RG8),V===n.UNSIGNED_SHORT&&ve&&(se=ve.RG16_EXT),V===n.SHORT&&ve&&(se=ve.RG16_SNORM_EXT)),v===n.RG_INTEGER&&(V===n.UNSIGNED_BYTE&&(se=n.RG8UI),V===n.UNSIGNED_SHORT&&(se=n.RG16UI),V===n.UNSIGNED_INT&&(se=n.RG32UI),V===n.BYTE&&(se=n.RG8I),V===n.SHORT&&(se=n.RG16I),V===n.INT&&(se=n.RG32I)),v===n.RGB_INTEGER&&(V===n.UNSIGNED_BYTE&&(se=n.RGB8UI),V===n.UNSIGNED_SHORT&&(se=n.RGB16UI),V===n.UNSIGNED_INT&&(se=n.RGB32UI),V===n.BYTE&&(se=n.RGB8I),V===n.SHORT&&(se=n.RGB16I),V===n.INT&&(se=n.RGB32I)),v===n.RGBA_INTEGER&&(V===n.UNSIGNED_BYTE&&(se=n.RGBA8UI),V===n.UNSIGNED_SHORT&&(se=n.RGBA16UI),V===n.UNSIGNED_INT&&(se=n.RGBA32UI),V===n.BYTE&&(se=n.RGBA8I),V===n.SHORT&&(se=n.RGBA16I),V===n.INT&&(se=n.RGBA32I)),v===n.RGB&&(V===n.UNSIGNED_SHORT&&ve&&(se=ve.RGB16_EXT),V===n.SHORT&&ve&&(se=ve.RGB16_SNORM_EXT),V===n.UNSIGNED_INT_5_9_9_9_REV&&(se=n.RGB9_E5),V===n.UNSIGNED_INT_10F_11F_11F_REV&&(se=n.R11F_G11F_B10F)),v===n.RGBA){const ce=me?cs:je.getTransfer(re);V===n.FLOAT&&(se=n.RGBA32F),V===n.HALF_FLOAT&&(se=n.RGBA16F),V===n.UNSIGNED_BYTE&&(se=ce===rt?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT&&ve&&(se=ve.RGBA16_EXT),V===n.SHORT&&ve&&(se=ve.RGBA16_SNORM_EXT),V===n.UNSIGNED_SHORT_4_4_4_4&&(se=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&(se=n.RGB5_A1)}return(se===n.R16F||se===n.R32F||se===n.RG16F||se===n.RG32F||se===n.RGBA16F||se===n.RGBA32F)&&e.get("EXT_color_buffer_float"),se}function w(C,v){let V;return C?v===null||v===pn||v===lr?V=n.DEPTH24_STENCIL8:v===fn?V=n.DEPTH32F_STENCIL8:v===or&&(V=n.DEPTH24_STENCIL8,ke("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===pn||v===lr?V=n.DEPTH_COMPONENT24:v===fn?V=n.DEPTH_COMPONENT32F:v===or&&(V=n.DEPTH_COMPONENT16),V}function E(C,v){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==Rt&&C.minFilter!==Nt?Math.log2(Math.max(v.width,v.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?v.mipmaps.length:1}function N(C){const v=C.target;v.removeEventListener("dispose",N),b(v),v.isVideoTexture&&u.delete(v),v.isHTMLTexture&&f.delete(v)}function x(C){const v=C.target;v.removeEventListener("dispose",x),A(v)}function b(C){const v=i.get(C);if(v.__webglInit===void 0)return;const V=C.source,Q=h.get(V);if(Q){const re=Q[v.__cacheKey];re.usedTimes--,re.usedTimes===0&&I(C),Object.keys(Q).length===0&&h.delete(V)}i.remove(C)}function I(C){const v=i.get(C);n.deleteTexture(v.__webglTexture);const V=C.source,Q=h.get(V);delete Q[v.__cacheKey],a.memory.textures--}function A(C){const v=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(v.__webglFramebuffer[Q]))for(let re=0;re<v.__webglFramebuffer[Q].length;re++)n.deleteFramebuffer(v.__webglFramebuffer[Q][re]);else n.deleteFramebuffer(v.__webglFramebuffer[Q]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[Q])}else{if(Array.isArray(v.__webglFramebuffer))for(let Q=0;Q<v.__webglFramebuffer.length;Q++)n.deleteFramebuffer(v.__webglFramebuffer[Q]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Q=0;Q<v.__webglColorRenderbuffer.length;Q++)v.__webglColorRenderbuffer[Q]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[Q]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const V=C.textures;for(let Q=0,re=V.length;Q<re;Q++){const me=i.get(V[Q]);me.__webglTexture&&(n.deleteTexture(me.__webglTexture),a.memory.textures--),i.remove(V[Q])}i.remove(C)}let P=0;function R(){P=0}function U(){return P}function B(C){P=C}function Z(){const C=P;return C>=r.maxTextures&&ke("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+r.maxTextures),P+=1,C}function H(C){const v=[];return v.push(C.wrapS),v.push(C.wrapT),v.push(C.wrapR||0),v.push(C.magFilter),v.push(C.minFilter),v.push(C.anisotropy),v.push(C.internalFormat),v.push(C.format),v.push(C.type),v.push(C.generateMipmaps),v.push(C.premultiplyAlpha),v.push(C.flipY),v.push(C.unpackAlignment),v.push(C.colorSpace),v.join()}function X(C,v){const V=i.get(C);if(C.isVideoTexture&&F(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&V.__version!==C.version){const Q=C.image;if(Q===null)ke("WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)ke("WebGLRenderer: Texture marked for update but image is incomplete");else{ae(V,C,v);return}}else C.isExternalTexture&&(V.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+v)}function W(C,v){const V=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&V.__version!==C.version){ae(V,C,v);return}else C.isExternalTexture&&(V.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+v)}function J(C,v){const V=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&V.__version!==C.version){ae(V,C,v);return}t.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+v)}function te(C,v){const V=i.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&V.__version!==C.version){ue(V,C,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+v)}const fe={[Sa]:n.REPEAT,[En]:n.CLAMP_TO_EDGE,[Ma]:n.MIRRORED_REPEAT},q={[Rt]:n.NEAREST,[Td]:n.NEAREST_MIPMAP_NEAREST,[Mr]:n.NEAREST_MIPMAP_LINEAR,[Nt]:n.LINEAR,[As]:n.LINEAR_MIPMAP_NEAREST,[Qn]:n.LINEAR_MIPMAP_LINEAR},oe={[Ld]:n.NEVER,[Ud]:n.ALWAYS,[Pd]:n.LESS,[To]:n.LEQUAL,[Id]:n.EQUAL,[Ao]:n.GEQUAL,[Dd]:n.GREATER,[Nd]:n.NOTEQUAL};function he(C,v){if(v.type===fn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Nt||v.magFilter===As||v.magFilter===Mr||v.magFilter===Qn||v.minFilter===Nt||v.minFilter===As||v.minFilter===Mr||v.minFilter===Qn)&&ke("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,fe[v.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,fe[v.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,fe[v.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,q[v.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,q[v.minFilter]),v.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,oe[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Rt||v.minFilter!==Mr&&v.minFilter!==Qn||v.type===fn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");n.texParameterf(C,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function Ae(C,v){let V=!1;C.__webglInit===void 0&&(C.__webglInit=!0,v.addEventListener("dispose",N));const Q=v.source;let re=h.get(Q);re===void 0&&(re={},h.set(Q,re));const me=H(v);if(me!==C.__cacheKey){re[me]===void 0&&(re[me]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,V=!0),re[me].usedTimes++;const ve=re[C.__cacheKey];ve!==void 0&&(re[C.__cacheKey].usedTimes--,ve.usedTimes===0&&I(v)),C.__cacheKey=me,C.__webglTexture=re[me].texture}return V}function z(C,v,V){return Math.floor(Math.floor(C/V)/v)}function K(C,v,V,Q){const me=C.updateRanges;if(me.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,V,Q,v.data);else{me.sort((Ne,ye)=>Ne.start-ye.start);let ve=0;for(let Ne=1;Ne<me.length;Ne++){const ye=me[ve],xe=me[Ne],Ue=ye.start+ye.count,Be=z(xe.start,v.width,4),Ve=z(ye.start,v.width,4);xe.start<=Ue+1&&Be===Ve&&z(xe.start+xe.count-1,v.width,4)===Be?ye.count=Math.max(ye.count,xe.start+xe.count-ye.start):(++ve,me[ve]=xe)}me.length=ve+1;const se=t.getParameter(n.UNPACK_ROW_LENGTH),ce=t.getParameter(n.UNPACK_SKIP_PIXELS),ge=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let Ne=0,ye=me.length;Ne<ye;Ne++){const xe=me[Ne],Ue=Math.floor(xe.start/4),Be=Math.ceil(xe.count/4),Ve=Ue%v.width,k=Math.floor(Ue/v.width),Se=Be,le=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Ve),t.pixelStorei(n.UNPACK_SKIP_ROWS,k),t.texSubImage2D(n.TEXTURE_2D,0,Ve,k,Se,le,V,Q,v.data)}C.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,se),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ce),t.pixelStorei(n.UNPACK_SKIP_ROWS,ge)}}function ae(C,v,V){let Q=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Q=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Q=n.TEXTURE_3D);const re=Ae(C,v),me=v.source;t.bindTexture(Q,C.__webglTexture,n.TEXTURE0+V);const ve=i.get(me);if(me.version!==ve.__version||re===!0){if(t.activeTexture(n.TEXTURE0+V),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const le=je.getPrimaries(je.workingColorSpace),_e=v.colorSpace===Gn?null:je.getPrimaries(v.colorSpace),L=v.colorSpace===Gn||le===_e?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,L)}t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment);let ce=p(v.image,!1,r.maxTextureSize);ce=pt(v,ce);const ge=s.convert(v.format,v.colorSpace),Ne=s.convert(v.type);let ye=S(v.internalFormat,ge,Ne,v.normalized,v.colorSpace,v.isVideoTexture);he(Q,v);let xe;const Ue=v.mipmaps,Be=v.isVideoTexture!==!0,Ve=ve.__version===void 0||re===!0,k=me.dataReady,Se=E(v,ce);if(v.isDepthTexture)ye=w(v.format===jn,v.type),Ve&&(Be?t.texStorage2D(n.TEXTURE_2D,1,ye,ce.width,ce.height):t.texImage2D(n.TEXTURE_2D,0,ye,ce.width,ce.height,0,ge,Ne,null));else if(v.isDataTexture)if(Ue.length>0){Be&&Ve&&t.texStorage2D(n.TEXTURE_2D,Se,ye,Ue[0].width,Ue[0].height);for(let le=0,_e=Ue.length;le<_e;le++)xe=Ue[le],Be?k&&t.texSubImage2D(n.TEXTURE_2D,le,0,0,xe.width,xe.height,ge,Ne,xe.data):t.texImage2D(n.TEXTURE_2D,le,ye,xe.width,xe.height,0,ge,Ne,xe.data);v.generateMipmaps=!1}else Be?(Ve&&t.texStorage2D(n.TEXTURE_2D,Se,ye,ce.width,ce.height),k&&K(v,ce,ge,Ne)):t.texImage2D(n.TEXTURE_2D,0,ye,ce.width,ce.height,0,ge,Ne,ce.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Be&&Ve&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Se,ye,Ue[0].width,Ue[0].height,ce.depth);for(let le=0,_e=Ue.length;le<_e;le++)if(xe=Ue[le],v.format!==tn)if(ge!==null)if(Be){if(k)if(v.layerUpdates.size>0){const L=zl(xe.width,xe.height,v.format,v.type);for(const D of v.layerUpdates){const ee=xe.data.subarray(D*L/xe.data.BYTES_PER_ELEMENT,(D+1)*L/xe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,le,0,0,D,xe.width,xe.height,1,ge,ee)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,le,0,0,0,xe.width,xe.height,ce.depth,ge,xe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,le,ye,xe.width,xe.height,ce.depth,0,xe.data,0,0);else ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Be?k&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,le,0,0,0,xe.width,xe.height,ce.depth,ge,Ne,xe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,le,ye,xe.width,xe.height,ce.depth,0,ge,Ne,xe.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{Be&&Ve&&t.texStorage2D(n.TEXTURE_2D,Se,ye,Ue[0].width,Ue[0].height);for(let le=0,_e=Ue.length;le<_e;le++)xe=Ue[le],v.format!==tn?ge!==null?Be?k&&t.compressedTexSubImage2D(n.TEXTURE_2D,le,0,0,xe.width,xe.height,ge,xe.data):t.compressedTexImage2D(n.TEXTURE_2D,le,ye,xe.width,xe.height,0,xe.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Be?k&&t.texSubImage2D(n.TEXTURE_2D,le,0,0,xe.width,xe.height,ge,Ne,xe.data):t.texImage2D(n.TEXTURE_2D,le,ye,xe.width,xe.height,0,ge,Ne,xe.data)}else if(v.isDataArrayTexture)if(Be){if(Ve&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Se,ye,ce.width,ce.height,ce.depth),k)if(v.layerUpdates.size>0){const le=zl(ce.width,ce.height,v.format,v.type);for(const _e of v.layerUpdates){const L=ce.data.subarray(_e*le/ce.data.BYTES_PER_ELEMENT,(_e+1)*le/ce.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,_e,ce.width,ce.height,1,ge,Ne,L)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,ge,Ne,ce.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ye,ce.width,ce.height,ce.depth,0,ge,Ne,ce.data);else if(v.isData3DTexture)Be?(Ve&&t.texStorage3D(n.TEXTURE_3D,Se,ye,ce.width,ce.height,ce.depth),k&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,ge,Ne,ce.data)):t.texImage3D(n.TEXTURE_3D,0,ye,ce.width,ce.height,ce.depth,0,ge,Ne,ce.data);else if(v.isFramebufferTexture){if(Ve)if(Be)t.texStorage2D(n.TEXTURE_2D,Se,ye,ce.width,ce.height);else{let le=ce.width,_e=ce.height;for(let L=0;L<Se;L++)t.texImage2D(n.TEXTURE_2D,L,ye,le,_e,0,ge,Ne,null),le>>=1,_e>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in n){const le=n.canvas;if(le.hasAttribute("layoutsubtree")||le.setAttribute("layoutsubtree","true"),ce.parentNode!==le){le.appendChild(ce),f.add(v),le.onpaint=_e=>{const L=_e.changedElements;for(const D of f)L.includes(D.image)&&(D.needsUpdate=!0)},le.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ce);else{const L=n.RGBA,D=n.RGBA,ee=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,L,D,ee,ce)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ue.length>0){if(Be&&Ve){const le=He(Ue[0]);t.texStorage2D(n.TEXTURE_2D,Se,ye,le.width,le.height)}for(let le=0,_e=Ue.length;le<_e;le++)xe=Ue[le],Be?k&&t.texSubImage2D(n.TEXTURE_2D,le,0,0,ge,Ne,xe):t.texImage2D(n.TEXTURE_2D,le,ye,ge,Ne,xe);v.generateMipmaps=!1}else if(Be){if(Ve){const le=He(ce);t.texStorage2D(n.TEXTURE_2D,Se,ye,le.width,le.height)}k&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ge,Ne,ce)}else t.texImage2D(n.TEXTURE_2D,0,ye,ge,Ne,ce);g(v)&&M(Q),ve.__version=me.version,v.onUpdate&&v.onUpdate(v)}C.__version=v.version}function ue(C,v,V){if(v.image.length!==6)return;const Q=Ae(C,v),re=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+V);const me=i.get(re);if(re.version!==me.__version||Q===!0){t.activeTexture(n.TEXTURE0+V);const ve=je.getPrimaries(je.workingColorSpace),se=v.colorSpace===Gn?null:je.getPrimaries(v.colorSpace),ce=v.colorSpace===Gn||ve===se?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);const ge=v.isCompressedTexture||v.image[0].isCompressedTexture,Ne=v.image[0]&&v.image[0].isDataTexture,ye=[];for(let D=0;D<6;D++)!ge&&!Ne?ye[D]=p(v.image[D],!0,r.maxCubemapSize):ye[D]=Ne?v.image[D].image:v.image[D],ye[D]=pt(v,ye[D]);const xe=ye[0],Ue=s.convert(v.format,v.colorSpace),Be=s.convert(v.type),Ve=S(v.internalFormat,Ue,Be,v.normalized,v.colorSpace),k=v.isVideoTexture!==!0,Se=me.__version===void 0||Q===!0,le=re.dataReady;let _e=E(v,xe);he(n.TEXTURE_CUBE_MAP,v);let L;if(ge){k&&Se&&t.texStorage2D(n.TEXTURE_CUBE_MAP,_e,Ve,xe.width,xe.height);for(let D=0;D<6;D++){L=ye[D].mipmaps;for(let ee=0;ee<L.length;ee++){const j=L[ee];v.format!==tn?Ue!==null?k?le&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+D,ee,0,0,j.width,j.height,Ue,j.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+D,ee,Ve,j.width,j.height,0,j.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+D,ee,0,0,j.width,j.height,Ue,Be,j.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+D,ee,Ve,j.width,j.height,0,Ue,Be,j.data)}}}else{if(L=v.mipmaps,k&&Se){L.length>0&&_e++;const D=He(ye[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,_e,Ve,D.width,D.height)}for(let D=0;D<6;D++)if(Ne){k?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+D,0,0,0,ye[D].width,ye[D].height,Ue,Be,ye[D].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+D,0,Ve,ye[D].width,ye[D].height,0,Ue,Be,ye[D].data);for(let ee=0;ee<L.length;ee++){const Me=L[ee].image[D].image;k?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+D,ee+1,0,0,Me.width,Me.height,Ue,Be,Me.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+D,ee+1,Ve,Me.width,Me.height,0,Ue,Be,Me.data)}}else{k?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+D,0,0,0,Ue,Be,ye[D]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+D,0,Ve,Ue,Be,ye[D]);for(let ee=0;ee<L.length;ee++){const j=L[ee];k?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+D,ee+1,0,0,Ue,Be,j.image[D]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+D,ee+1,Ve,Ue,Be,j.image[D])}}}g(v)&&M(n.TEXTURE_CUBE_MAP),me.__version=re.version,v.onUpdate&&v.onUpdate(v)}C.__version=v.version}function de(C,v,V,Q,re,me){const ve=s.convert(V.format,V.colorSpace),se=s.convert(V.type),ce=S(V.internalFormat,ve,se,V.normalized,V.colorSpace),ge=i.get(v),Ne=i.get(V);if(Ne.__renderTarget=v,!ge.__hasExternalTextures){const ye=Math.max(1,v.width>>me),xe=Math.max(1,v.height>>me);re===n.TEXTURE_3D||re===n.TEXTURE_2D_ARRAY?t.texImage3D(re,me,ce,ye,xe,v.depth,0,ve,se,null):t.texImage2D(re,me,ce,ye,xe,0,ve,se,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),et(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Q,re,Ne.__webglTexture,0,Xe(v)):(re===n.TEXTURE_2D||re>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Q,re,Ne.__webglTexture,me),t.bindFramebuffer(n.FRAMEBUFFER,null)}function pe(C,v,V){if(n.bindRenderbuffer(n.RENDERBUFFER,C),v.depthBuffer){const Q=v.depthTexture,re=Q&&Q.isDepthTexture?Q.type:null,me=w(v.stencilBuffer,re),ve=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;et(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Xe(v),me,v.width,v.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,Xe(v),me,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,me,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ve,n.RENDERBUFFER,C)}else{const Q=v.textures;for(let re=0;re<Q.length;re++){const me=Q[re],ve=s.convert(me.format,me.colorSpace),se=s.convert(me.type),ce=S(me.internalFormat,ve,se,me.normalized,me.colorSpace);et(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Xe(v),ce,v.width,v.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,Xe(v),ce,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,ce,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Le(C,v,V){const Q=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const re=i.get(v.depthTexture);if(re.__renderTarget=v,(!re.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),Q){if(re.__webglInit===void 0&&(re.__webglInit=!0,v.depthTexture.addEventListener("dispose",N)),re.__webglTexture===void 0){re.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,re.__webglTexture),he(n.TEXTURE_CUBE_MAP,v.depthTexture);const ge=s.convert(v.depthTexture.format),Ne=s.convert(v.depthTexture.type);let ye;v.depthTexture.format===Ln?ye=n.DEPTH_COMPONENT24:v.depthTexture.format===jn&&(ye=n.DEPTH24_STENCIL8);for(let xe=0;xe<6;xe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,ye,v.width,v.height,0,ge,Ne,null)}}else X(v.depthTexture,0);const me=re.__webglTexture,ve=Xe(v),se=Q?n.TEXTURE_CUBE_MAP_POSITIVE_X+V:n.TEXTURE_2D,ce=v.depthTexture.format===jn?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===Ln)et(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ce,se,me,0,ve):n.framebufferTexture2D(n.FRAMEBUFFER,ce,se,me,0);else if(v.depthTexture.format===jn)et(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ce,se,me,0,ve):n.framebufferTexture2D(n.FRAMEBUFFER,ce,se,me,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ie(C){const v=i.get(C),V=C.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==C.depthTexture){const Q=C.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Q){const re=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Q.removeEventListener("dispose",re)};Q.addEventListener("dispose",re),v.__depthDisposeCallback=re}v.__boundDepthTexture=Q}if(C.depthTexture&&!v.__autoAllocateDepthBuffer)if(V)for(let Q=0;Q<6;Q++)Le(v.__webglFramebuffer[Q],C,Q);else{const Q=C.texture.mipmaps;Q&&Q.length>0?Le(v.__webglFramebuffer[0],C,0):Le(v.__webglFramebuffer,C,0)}else if(V){v.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[Q]),v.__webglDepthbuffer[Q]===void 0)v.__webglDepthbuffer[Q]=n.createRenderbuffer(),pe(v.__webglDepthbuffer[Q],C,!1);else{const re=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,me=v.__webglDepthbuffer[Q];n.bindRenderbuffer(n.RENDERBUFFER,me),n.framebufferRenderbuffer(n.FRAMEBUFFER,re,n.RENDERBUFFER,me)}}else{const Q=C.texture.mipmaps;if(Q&&Q.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),pe(v.__webglDepthbuffer,C,!1);else{const re=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,me=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,me),n.framebufferRenderbuffer(n.FRAMEBUFFER,re,n.RENDERBUFFER,me)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ee(C,v,V){const Q=i.get(C);v!==void 0&&de(Q.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&ie(C)}function Pe(C){const v=C.texture,V=i.get(C),Q=i.get(v);C.addEventListener("dispose",x);const re=C.textures,me=C.isWebGLCubeRenderTarget===!0,ve=re.length>1;if(ve||(Q.__webglTexture===void 0&&(Q.__webglTexture=n.createTexture()),Q.__version=v.version,a.memory.textures++),me){V.__webglFramebuffer=[];for(let se=0;se<6;se++)if(v.mipmaps&&v.mipmaps.length>0){V.__webglFramebuffer[se]=[];for(let ce=0;ce<v.mipmaps.length;ce++)V.__webglFramebuffer[se][ce]=n.createFramebuffer()}else V.__webglFramebuffer[se]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){V.__webglFramebuffer=[];for(let se=0;se<v.mipmaps.length;se++)V.__webglFramebuffer[se]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(ve)for(let se=0,ce=re.length;se<ce;se++){const ge=i.get(re[se]);ge.__webglTexture===void 0&&(ge.__webglTexture=n.createTexture(),a.memory.textures++)}if(C.samples>0&&et(C)===!1){V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let se=0;se<re.length;se++){const ce=re[se];V.__webglColorRenderbuffer[se]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[se]);const ge=s.convert(ce.format,ce.colorSpace),Ne=s.convert(ce.type),ye=S(ce.internalFormat,ge,Ne,ce.normalized,ce.colorSpace,C.isXRRenderTarget===!0),xe=Xe(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,xe,ye,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+se,n.RENDERBUFFER,V.__webglColorRenderbuffer[se])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),pe(V.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(me){t.bindTexture(n.TEXTURE_CUBE_MAP,Q.__webglTexture),he(n.TEXTURE_CUBE_MAP,v);for(let se=0;se<6;se++)if(v.mipmaps&&v.mipmaps.length>0)for(let ce=0;ce<v.mipmaps.length;ce++)de(V.__webglFramebuffer[se][ce],C,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+se,ce);else de(V.__webglFramebuffer[se],C,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);g(v)&&M(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ve){for(let se=0,ce=re.length;se<ce;se++){const ge=re[se],Ne=i.get(ge);let ye=n.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ye=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ye,Ne.__webglTexture),he(ye,ge),de(V.__webglFramebuffer,C,ge,n.COLOR_ATTACHMENT0+se,ye,0),g(ge)&&M(ye)}t.unbindTexture()}else{let se=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(se=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(se,Q.__webglTexture),he(se,v),v.mipmaps&&v.mipmaps.length>0)for(let ce=0;ce<v.mipmaps.length;ce++)de(V.__webglFramebuffer[ce],C,v,n.COLOR_ATTACHMENT0,se,ce);else de(V.__webglFramebuffer,C,v,n.COLOR_ATTACHMENT0,se,0);g(v)&&M(se),t.unbindTexture()}C.depthBuffer&&ie(C)}function ze(C){const v=C.textures;for(let V=0,Q=v.length;V<Q;V++){const re=v[V];if(g(re)){const me=T(C),ve=i.get(re).__webglTexture;t.bindTexture(me,ve),M(me),t.unbindTexture()}}}const Ye=[],ct=[];function _t(C){if(C.samples>0){if(et(C)===!1){const v=C.textures,V=C.width,Q=C.height;let re=n.COLOR_BUFFER_BIT;const me=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ve=i.get(C),se=v.length>1;if(se)for(let ge=0;ge<v.length;ge++)t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer);const ce=C.texture.mipmaps;ce&&ce.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ve.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let ge=0;ge<v.length;ge++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(re|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(re|=n.STENCIL_BUFFER_BIT)),se){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ve.__webglColorRenderbuffer[ge]);const Ne=i.get(v[ge]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ne,0)}n.blitFramebuffer(0,0,V,Q,0,0,V,Q,re,n.NEAREST),l===!0&&(Ye.length=0,ct.length=0,Ye.push(n.COLOR_ATTACHMENT0+ge),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(Ye.push(me),ct.push(me),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,ct)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ye))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),se)for(let ge=0;ge<v.length;ge++){t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.RENDERBUFFER,ve.__webglColorRenderbuffer[ge]);const Ne=i.get(v[ge]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.TEXTURE_2D,Ne,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&l){const v=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function Xe(C){return Math.min(r.maxSamples,C.samples)}function et(C){const v=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function F(C){const v=a.render.frame;u.get(C)!==v&&(u.set(C,v),C.update())}function pt(C,v){const V=C.colorSpace,Q=C.format,re=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||V!==ls&&V!==Gn&&(je.getTransfer(V)===rt?(Q!==tn||re!==Zt)&&ke("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):nt("WebGLTextures: Unsupported texture color space:",V)),v}function He(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=Z,this.resetTextureUnits=R,this.getTextureUnits=U,this.setTextureUnits=B,this.setTexture2D=X,this.setTexture2DArray=W,this.setTexture3D=J,this.setTextureCube=te,this.rebindTextures=Ee,this.setupRenderTarget=Pe,this.updateRenderTargetMipmap=ze,this.updateMultisampleRenderTarget=_t,this.setupDepthRenderbuffer=ie,this.setupFrameBufferTexture=de,this.useMultisampledRTT=et,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function G0(n,e){function t(i,r=Gn){let s;const a=je.getTransfer(r);if(i===Zt)return n.UNSIGNED_BYTE;if(i===Mo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===yo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Oc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Bc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Uc)return n.BYTE;if(i===Fc)return n.SHORT;if(i===or)return n.UNSIGNED_SHORT;if(i===So)return n.INT;if(i===pn)return n.UNSIGNED_INT;if(i===fn)return n.FLOAT;if(i===mn)return n.HALF_FLOAT;if(i===kc)return n.ALPHA;if(i===zc)return n.RGB;if(i===tn)return n.RGBA;if(i===Ln)return n.DEPTH_COMPONENT;if(i===jn)return n.DEPTH_STENCIL;if(i===Hc)return n.RED;if(i===bo)return n.RED_INTEGER;if(i===si)return n.RG;if(i===Eo)return n.RG_INTEGER;if(i===wo)return n.RGBA_INTEGER;if(i===Jr||i===Qr||i===jr||i===es)if(a===rt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Jr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Qr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===jr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===es)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Jr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Qr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===jr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===es)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ya||i===ba||i===Ea||i===wa)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===ya)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ba)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ea)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===wa)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ta||i===Aa||i===Ca||i===Ra||i===La||i===as||i===Pa)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Ta||i===Aa)return a===rt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Ca)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ra)return s.COMPRESSED_R11_EAC;if(i===La)return s.COMPRESSED_SIGNED_R11_EAC;if(i===as)return s.COMPRESSED_RG11_EAC;if(i===Pa)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ia||i===Da||i===Na||i===Ua||i===Fa||i===Oa||i===Ba||i===ka||i===za||i===Ha||i===Va||i===Ga||i===Wa||i===Xa)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Ia)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Da)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Na)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ua)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Fa)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Oa)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ba)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ka)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===za)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ha)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Va)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ga)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Wa)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Xa)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===qa||i===Ya||i===$a)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===qa)return a===rt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ya)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===$a)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Za||i===Ka||i===os||i===Ja)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Za)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Ka)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===os)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ja)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===lr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const W0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,X0=`
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

}`;class q0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Kc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new vn({vertexShader:W0,fragmentShader:X0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new gn(new ms(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Y0 extends li{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,d=null,h=null,m=null;const _=typeof XRWebGLBinding<"u",p=new q0,g={},M=t.getContextAttributes();let T=null,S=null;const w=[],E=[],N=new Oe;let x=null,b=null;const I=new jt;I.viewport=new vt;const A=new jt;A.viewport=new vt;const P=[I,A],R=new th;let U=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let K=w[z];return K===void 0&&(K=new Fs,w[z]=K),K.getTargetRaySpace()},this.getControllerGrip=function(z){let K=w[z];return K===void 0&&(K=new Fs,w[z]=K),K.getGripSpace()},this.getHand=function(z){let K=w[z];return K===void 0&&(K=new Fs,w[z]=K),K.getHandSpace()};function Z(z){const K=E.indexOf(z.inputSource);if(K===-1)return;const ae=w[K];ae!==void 0&&(ae.update(z.inputSource,z.frame,c||a),ae.dispatchEvent({type:z.type,data:z.inputSource}))}function H(){r.removeEventListener("select",Z),r.removeEventListener("selectstart",Z),r.removeEventListener("selectend",Z),r.removeEventListener("squeeze",Z),r.removeEventListener("squeezestart",Z),r.removeEventListener("squeezeend",Z),r.removeEventListener("end",H),r.removeEventListener("inputsourceschange",X);for(let z=0;z<w.length;z++){const K=E[z];K!==null&&(E[z]=null,w[z].disconnect(K))}U=null,B=null,p.reset();for(const z in g)delete g[z];if(e.setRenderTarget(T),h=null,d=null,f=null,r=null,S=null,Ae.stop(),i.isPresenting=!1,e.setPixelRatio(x),e.setSize(N.width,N.height,!1),b!==null){const z=b.camera;z.fov=b.fov,z.zoom=b.zoom,z.updateProjectionMatrix(),b=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){s=z,i.isPresenting===!0&&ke("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){o=z,i.isPresenting===!0&&ke("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(z){c=z},this.getBaseLayer=function(){return d!==null?d:h},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(z){if(r=z,r!==null){if(T=e.getRenderTarget(),r.addEventListener("select",Z),r.addEventListener("selectstart",Z),r.addEventListener("selectend",Z),r.addEventListener("squeeze",Z),r.addEventListener("squeezestart",Z),r.addEventListener("squeezeend",Z),r.addEventListener("end",H),r.addEventListener("inputsourceschange",X),M.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(N),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ae=null,ue=null,de=null;M.depth&&(de=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=M.stencil?jn:Ln,ue=M.stencil?lr:pn);const pe={colorFormat:t.RGBA8,depthFormat:de,scaleFactor:s};f=this.getBinding(),d=f.createProjectionLayer(pe),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new rn(d.textureWidth,d.textureHeight,{format:tn,type:Zt,depthTexture:new ur(d.textureWidth,d.textureHeight,ue,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{const ae={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(r,t,ae),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),S=new rn(h.framebufferWidth,h.framebufferHeight,{format:tn,type:Zt,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Ae.setContext(r),Ae.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function X(z){for(let K=0;K<z.removed.length;K++){const ae=z.removed[K],ue=E.indexOf(ae);ue>=0&&(E[ue]=null,w[ue].disconnect(ae))}for(let K=0;K<z.added.length;K++){const ae=z.added[K];let ue=E.indexOf(ae);if(ue===-1){for(let pe=0;pe<w.length;pe++)if(pe>=E.length){E.push(ae),ue=pe;break}else if(E[pe]===null){E[pe]=ae,ue=pe;break}if(ue===-1)break}const de=w[ue];de&&de.connect(ae)}}const W=new G,J=new G;function te(z,K,ae){W.setFromMatrixPosition(K.matrixWorld),J.setFromMatrixPosition(ae.matrixWorld);const ue=W.distanceTo(J),de=K.projectionMatrix.elements,pe=ae.projectionMatrix.elements,Le=de[14]/(de[10]-1),ie=de[14]/(de[10]+1),Ee=(de[9]+1)/de[5],Pe=(de[9]-1)/de[5],ze=(de[8]-1)/de[0],Ye=(pe[8]+1)/pe[0],ct=Le*ze,_t=Le*Ye,Xe=ue/(-ze+Ye),et=Xe*-ze;if(K.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(et),z.translateZ(Xe),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert(),de[10]===-1)z.projectionMatrix.copy(K.projectionMatrix),z.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{const F=Le+Xe,pt=ie+Xe,He=ct-et,C=_t+(ue-et),v=Ee*ie/pt*F,V=Pe*ie/pt*F;z.projectionMatrix.makePerspective(He,C,v,V,F,pt),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}}function fe(z,K){K===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(K.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(r===null)return;let K=z.near,ae=z.far;p.texture!==null&&(p.depthNear>0&&(K=p.depthNear),p.depthFar>0&&(ae=p.depthFar)),R.near=A.near=I.near=K,R.far=A.far=I.far=ae,(U!==R.near||B!==R.far)&&(r.updateRenderState({depthNear:R.near,depthFar:R.far}),U=R.near,B=R.far),R.layers.mask=z.layers.mask|6,I.layers.mask=R.layers.mask&-5,A.layers.mask=R.layers.mask&-3;const ue=z.parent,de=R.cameras;fe(R,ue);for(let pe=0;pe<de.length;pe++)fe(de[pe],ue);de.length===2?te(R,I,A):R.projectionMatrix.copy(I.projectionMatrix),b===null&&z.isPerspectiveCamera&&(b={camera:z,fov:z.fov,zoom:z.zoom}),q(z,R,ue)};function q(z,K,ae){ae===null?z.matrix.copy(K.matrixWorld):(z.matrix.copy(ae.matrixWorld),z.matrix.invert(),z.matrix.multiply(K.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(K.projectionMatrix),z.projectionMatrixInverse.copy(K.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=Qa*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(d===null&&h===null))return l},this.setFoveation=function(z){l=z,d!==null&&(d.fixedFoveation=z),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=z)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(R)},this.getCameraTexture=function(z){return g[z]};let oe=null;function he(z,K){if(u=K.getViewerPose(c||a),m=K,u!==null){const ae=u.views;h!==null&&(e.setRenderTargetFramebuffer(S,h.framebuffer),e.setRenderTarget(S));let ue=!1;ae.length!==R.cameras.length&&(R.cameras.length=0,ue=!0);for(let ie=0;ie<ae.length;ie++){const Ee=ae[ie];let Pe=null;if(h!==null)Pe=h.getViewport(Ee);else{const Ye=f.getViewSubImage(d,Ee);Pe=Ye.viewport,ie===0&&(e.setRenderTargetTextures(S,Ye.colorTexture,Ye.depthStencilTexture),e.setRenderTarget(S))}let ze=P[ie];ze===void 0&&(ze=new jt,ze.layers.enable(ie),ze.viewport=new vt,P[ie]=ze),ze.matrix.fromArray(Ee.transform.matrix),ze.matrix.decompose(ze.position,ze.quaternion,ze.scale),ze.projectionMatrix.fromArray(Ee.projectionMatrix),ze.projectionMatrixInverse.copy(ze.projectionMatrix).invert(),ze.viewport.set(Pe.x,Pe.y,Pe.width,Pe.height),ie===0&&(R.matrix.copy(ze.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),ue===!0&&R.cameras.push(ze)}const de=r.enabledFeatures;if(de&&de.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){f=i.getBinding();const ie=f.getDepthInformation(ae[0]);ie&&ie.isValid&&ie.texture&&p.init(ie,r.renderState)}if(de&&de.includes("camera-access")&&_){e.state.unbindTexture(),f=i.getBinding();for(let ie=0;ie<ae.length;ie++){const Ee=ae[ie].camera;if(Ee){let Pe=g[Ee];Pe||(Pe=new Kc,g[Ee]=Pe);const ze=f.getCameraImage(Ee);Pe.sourceTexture=ze}}}}for(let ae=0;ae<w.length;ae++){const ue=E[ae],de=w[ae];ue!==null&&de!==void 0&&de.update(ue,K,c||a)}oe&&oe(z,K),K.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:K}),m=null}const Ae=new cu;Ae.setAnimationLoop(he),this.setAnimationLoop=function(z){oe=z},this.dispose=function(){}}}const $0=new St,gu=new Ge;gu.set(-1,0,0,0,1,0,0,0,1);function Z0(n,e){function t(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function i(p,g){g.color.getRGB(p.fogColor.value,au(n)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function r(p,g,M,T,S){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?s(p,g):g.isMeshLambertMaterial?(s(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(s(p,g),f(p,g)):g.isMeshPhongMaterial?(s(p,g),u(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(s(p,g),d(p,g),g.isMeshPhysicalMaterial&&h(p,g,S)):g.isMeshMatcapMaterial?(s(p,g),m(p,g)):g.isMeshDepthMaterial?s(p,g):g.isMeshDistanceMaterial?(s(p,g),_(p,g)):g.isMeshNormalMaterial?s(p,g):g.isLineBasicMaterial?(a(p,g),g.isLineDashedMaterial&&o(p,g)):g.isPointsMaterial?l(p,g,M,T):g.isSpriteMaterial?c(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function s(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,t(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===Ht&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,t(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===Ht&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,t(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,t(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);const M=e.get(g),T=M.envMap,S=M.envMapRotation;T&&(p.envMap.value=T,p.envMapRotation.value.setFromMatrix4($0.makeRotationFromEuler(S)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(gu),p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,p.aoMapTransform))}function a(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform))}function o(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function l(p,g,M,T){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*M,p.scale.value=T*.5,g.map&&(p.map.value=g.map,t(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function c(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function u(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function f(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function d(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function h(p,g,M){p.ior.value=g.ior,g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Ht&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.retroreflectivity>0&&(p.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function _(p,g){const M=e.get(g).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function K0(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,w){const E=w.program;i.uniformBlockBinding(S,E)}function c(S,w){let E=r[S.id];E===void 0&&(p(S),E=u(S),r[S.id]=E,S.addEventListener("dispose",M));const N=w.program;i.updateUBOMapping(S,N);const x=e.render.frame;s[S.id]!==x&&(d(S),s[S.id]=x)}function u(S){const w=f();S.__bindingPointIndex=w;const E=n.createBuffer(),N=S.__size,x=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,N,x),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,E),E}function f(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return nt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const w=r[S.id],E=S.uniforms,N=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let x=0,b=E.length;x<b;x++){const I=E[x];if(Array.isArray(I))for(let A=0,P=I.length;A<P;A++)h(I[A],x,A,N);else h(I,x,0,N)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(S,w,E,N){if(_(S,w,E,N)===!0){const x=S.__offset,b=S.value;if(Array.isArray(b)){let I=0;for(let A=0;A<b.length;A++){const P=b[A],R=g(P);m(P,S.__data,I),typeof P!="number"&&typeof P!="boolean"&&!P.isMatrix3&&!ArrayBuffer.isView(P)&&(I+=R.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(b,S.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,x,S.__data)}}function m(S,w,E){typeof S=="number"||typeof S=="boolean"?w[0]=S:S.isMatrix3?(w[0]=S.elements[0],w[1]=S.elements[1],w[2]=S.elements[2],w[3]=0,w[4]=S.elements[3],w[5]=S.elements[4],w[6]=S.elements[5],w[7]=0,w[8]=S.elements[6],w[9]=S.elements[7],w[10]=S.elements[8],w[11]=0):ArrayBuffer.isView(S)?w.set(new S.constructor(S.buffer,S.byteOffset,w.length)):S.toArray(w,E)}function _(S,w,E,N){const x=S.value,b=w+"_"+E;if(N[b]===void 0)return typeof x=="number"||typeof x=="boolean"?N[b]=x:ArrayBuffer.isView(x)?N[b]=x.slice():N[b]=x.clone(),!0;{const I=N[b];if(typeof x=="number"||typeof x=="boolean"){if(I!==x)return N[b]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(I.equals(x)===!1)return I.copy(x),!0}}return!1}function p(S){const w=S.uniforms;let E=0;const N=16;for(let b=0,I=w.length;b<I;b++){const A=Array.isArray(w[b])?w[b]:[w[b]];for(let P=0,R=A.length;P<R;P++){const U=A[P],B=Array.isArray(U.value)?U.value:[U.value];for(let Z=0,H=B.length;Z<H;Z++){const X=B[Z],W=g(X),J=E%N,te=J%W.boundary,fe=J+te;E+=te,fe!==0&&N-fe<W.storage&&(E+=N-fe),U.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=E,E+=W.storage}}}const x=E%N;return x>0&&(E+=N-x),S.__size=E,S.__cache={},this}function g(S){const w={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(w.boundary=4,w.storage=4):S.isVector2?(w.boundary=8,w.storage=8):S.isVector3||S.isColor?(w.boundary=16,w.storage=12):S.isVector4?(w.boundary=16,w.storage=16):S.isMatrix3?(w.boundary=48,w.storage=48):S.isMatrix4?(w.boundary=64,w.storage=64):S.isTexture?ke("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(w.boundary=16,w.storage=S.byteLength):ke("WebGLRenderer: Unsupported uniform value type.",S),w}function M(S){const w=S.target;w.removeEventListener("dispose",M);const E=a.indexOf(w.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function T(){for(const S in r)n.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:l,update:c,dispose:T}}const J0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ln=null;function Q0(){return ln===null&&(ln=new uf(J0,16,16,si,mn),ln.name="DFG_LUT",ln.minFilter=Nt,ln.magFilter=Nt,ln.wrapS=En,ln.wrapT=En,ln.generateMipmaps=!1,ln.needsUpdate=!0),ln}class j0{constructor(e={}){const{canvas:t=Bd(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:h=Zt}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;const _=h,p=new Set([wo,Eo,bo]),g=new Set([Zt,pn,or,lr,Mo,yo]),M=new Uint32Array(4),T=new Int32Array(4),S=new G;let w=null,E=null;const N=[],x=[];let b=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=nn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const I=this;let A=!1,P=null,R=null,U=null,B=null;this._outputColorSpace=Dt;let Z=0,H=0,X=null,W=-1,J=null;const te=new vt,fe=new vt;let q=null;const oe=new qe(0);let he=0,Ae=t.width,z=t.height,K=1,ae=null,ue=null;const de=new vt(0,0,Ae,z),pe=new vt(0,0,Ae,z);let Le=!1;const ie=new $c;let Ee=!1,Pe=!1;const ze=new St,Ye=new G,ct=new vt,_t={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Xe=!1;function et(){return X===null?K:1}let F=i;function pt(y,O){return t.getContext(y,O)}let He,C,v,V,Q,re,me,ve,se,ce,ge,Ne,ye,xe,Ue,Be,Ve,k,Se,le,_e,L,D;try{const y={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${xo}`),t.addEventListener("webglcontextlost",Me,!1),t.addEventListener("webglcontextrestored",We,!1),t.addEventListener("webglcontextcreationerror",Et,!1),F===null){const O="webgl2";if(F=pt(O,y),F===null)throw pt(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ee()}catch(y){throw t.removeEventListener("webglcontextlost",Me,!1),t.removeEventListener("webglcontextrestored",We,!1),t.removeEventListener("webglcontextcreationerror",Et,!1),nt("WebGLRenderer: "+y.message),y}function ee(){He=new Qm(F),He.init(),_e=new G0(F,He),C=new Vm(F,He,e,_e),v=new H0(F,He),C.reversedDepthBuffer&&d&&v.buffers.depth.setReversed(!0),R=F.createFramebuffer(),U=F.createFramebuffer(),B=F.createFramebuffer(),V=new tg(F),Q=new A0,re=new V0(F,He,v,Q,C,_e,V),me=new Jm(I),ve=new ih(F),L=new zm(F,ve),se=new jm(F,ve,V,L),ce=new ig(F,se,ve,L,V),k=new ng(F,C,re),Ue=new Gm(Q),ge=new T0(I,me,He,C,L,Ue),Ne=new Z0(I,Q),ye=new R0,xe=new U0(He),Ve=new km(I,me,v,ce,m,l),Be=new z0(I,ce,C),D=new K0(F,V,C,v),Se=new Hm(F,He,V),le=new eg(F,He,V),V.programs=ge.programs,I.capabilities=C,I.extensions=He,I.properties=Q,I.renderLists=ye,I.shadowMap=Be,I.state=v,I.info=V}_!==Zt&&(b=new sg(_,t.width,t.height,o,r,s));const j=new Y0(I,F);this.xr=j,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const y=He.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=He.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(y){y!==void 0&&(K=y,this.setSize(Ae,z,!1))},this.getSize=function(y){return y.set(Ae,z)},this.setSize=function(y,O,ne=!0){if(j.isPresenting){ke("WebGLRenderer: Can't change size while VR device is presenting.");return}Ae=y,z=O,t.width=Math.floor(y*K),t.height=Math.floor(O*K),ne===!0&&(t.style.width=y+"px",t.style.height=O+"px"),b!==null&&b.setSize(t.width,t.height),this.setViewport(0,0,y,O)},this.getDrawingBufferSize=function(y){return y.set(Ae*K,z*K).floor()},this.setDrawingBufferSize=function(y,O,ne){Ae=y,z=O,K=ne,t.width=Math.floor(y*ne),t.height=Math.floor(O*ne),this.setViewport(0,0,y,O)},this.setEffects=function(y){if(_===Zt){nt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let O=0;O<y.length;O++)if(y[O].isOutputPass===!0){ke("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}b.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(te)},this.getViewport=function(y){return y.copy(de)},this.setViewport=function(y,O,ne,Y){y.isVector4?de.set(y.x,y.y,y.z,y.w):de.set(y,O,ne,Y),v.viewport(te.copy(de).multiplyScalar(K).round())},this.getScissor=function(y){return y.copy(pe)},this.setScissor=function(y,O,ne,Y){y.isVector4?pe.set(y.x,y.y,y.z,y.w):pe.set(y,O,ne,Y),v.scissor(fe.copy(pe).multiplyScalar(K).round())},this.getScissorTest=function(){return Le},this.setScissorTest=function(y){v.setScissorTest(Le=y)},this.setOpaqueSort=function(y){ae=y},this.setTransparentSort=function(y){ue=y},this.getClearColor=function(y){return y.copy(Ve.getClearColor())},this.setClearColor=function(){Ve.setClearColor(...arguments)},this.getClearAlpha=function(){return Ve.getClearAlpha()},this.setClearAlpha=function(){Ve.setClearAlpha(...arguments)},this.clear=function(y=!0,O=!0,ne=!0){let Y=0;if(y){let $=!1;if(X!==null){const Te=X.texture.format;$=p.has(Te)}if($){const Te=X.texture.type,Re=g.has(Te),we=Ve.getClearColor(),Ie=Ve.getClearAlpha(),Fe=we.r,$e=we.g,Je=we.b;Re?(M[0]=Fe,M[1]=$e,M[2]=Je,M[3]=Ie,F.clearBufferuiv(F.COLOR,0,M)):(T[0]=Fe,T[1]=$e,T[2]=Je,T[3]=Ie,F.clearBufferiv(F.COLOR,0,T))}else Y|=F.COLOR_BUFFER_BIT}O&&(Y|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ne&&(Y|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Y!==0&&F.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),P=y},this.dispose=function(){t.removeEventListener("webglcontextlost",Me,!1),t.removeEventListener("webglcontextrestored",We,!1),t.removeEventListener("webglcontextcreationerror",Et,!1),Ve.dispose(),ye.dispose(),xe.dispose(),Q.dispose(),me.dispose(),ce.dispose(),L.dispose(),D.dispose(),ge.dispose(),j.dispose(),j.removeEventListener("sessionstart",Vo),j.removeEventListener("sessionend",Go),Xn.stop()};function Me(y){y.preventDefault(),fl("WebGLRenderer: Context Lost."),A=!0}function We(){fl("WebGLRenderer: Context Restored."),A=!1;const y=V.autoReset,O=Be.enabled,ne=Be.autoUpdate,Y=Be.needsUpdate,$=Be.type;ee(),V.autoReset=y,Be.enabled=O,Be.autoUpdate=ne,Be.needsUpdate=Y,Be.type=$}function Et(y){nt("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Gt(y){const O=y.target;O.removeEventListener("dispose",Gt),Ft(O)}function Ft(y){kt(y),Q.remove(y)}function kt(y){const O=Q.get(y).programs;O!==void 0&&(O.forEach(function(ne){ge.releaseProgram(ne)}),y.isShaderMaterial&&ge.releaseShaderCache(y))}this.renderBufferDirect=function(y,O,ne,Y,$,Te){O===null&&(O=_t);const Re=$.isMesh&&$.matrixWorld.determinantAffine()<0,we=Lu(y,O,ne,Y,$);v.setMaterial(Y,Re);let Ie=ne.index,Fe=1;if(Y.wireframe===!0){if(Ie=se.getWireframeAttribute(ne),Ie===void 0)return;Fe=2}const $e=ne.drawRange,Je=ne.attributes.position;let De=$e.start*Fe,it=($e.start+$e.count)*Fe;Te!==null&&(De=Math.max(De,Te.start*Fe),it=Math.min(it,(Te.start+Te.count)*Fe)),Ie!==null?(De=Math.max(De,0),it=Math.min(it,Ie.count)):Je!=null&&(De=Math.max(De,0),it=Math.min(it,Je.count));const Mt=it-De;if(Mt<0||Mt===1/0)return;L.setup($,Y,we,ne,Ie);let ut,at=Se;if(Ie!==null&&(ut=ve.get(Ie),at=le,at.setIndex(ut)),$.isMesh)Y.wireframe===!0?(v.setLineWidth(Y.wireframeLinewidth*et()),at.setMode(F.LINES)):at.setMode(F.TRIANGLES);else if($.isLine){let Lt=Y.linewidth;Lt===void 0&&(Lt=1),v.setLineWidth(Lt*et()),$.isLineSegments?at.setMode(F.LINES):$.isLineLoop?at.setMode(F.LINE_LOOP):at.setMode(F.LINE_STRIP)}else $.isPoints?at.setMode(F.POINTS):$.isSprite&&at.setMode(F.TRIANGLES);if($.isBatchedMesh)if(He.get("WEBGL_multi_draw"))at.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const Lt=$._multiDrawStarts,Ce=$._multiDrawCounts,Ot=$._multiDrawCount,tt=Ie?ve.get(Ie).bytesPerElement:1,Yt=Q.get(Y).currentProgram.getUniforms();for(let an=0;an<Ot;an++)Yt.setValue(F,"_gl_DrawID",an),at.render(Lt[an]/tt,Ce[an])}else if($.isInstancedMesh)at.renderInstances(De,Mt,$.count);else if(ne.isInstancedBufferGeometry){const Lt=ne._maxInstanceCount!==void 0?ne._maxInstanceCount:1/0,Ce=Math.min(ne.instanceCount,Lt);at.renderInstances(De,Mt,Ce)}else at.render(De,Mt)};function Wn(y,O,ne,Y){P!==null&&y.isNodeMaterial&&P.setObject(Y,y),Ee===!0&&Ue.setState(y,ne,!1),y.transparent===!0&&y.side===dn&&y.forceSinglePass===!1?(y.side=Ht,y.needsUpdate=!0,_r(y,O,Y),y.side=ii,y.needsUpdate=!0,_r(y,O,Y),y.side=dn):_r(y,O,Y)}this.compile=function(y,O,ne=null){ne===null&&(ne=y),P!==null&&P.renderStart(y,O,ne),E=xe.get(ne),E.init(O),x.push(E),ne.traverseVisible(function($){$.isLight&&$.layers.test(O.layers)&&(E.pushLight($),$.castShadow&&E.pushShadow($))}),y!==ne&&y.traverseVisible(function($){$.isLight&&$.layers.test(O.layers)&&(E.pushLight($),$.castShadow&&E.pushShadow($))}),E.setupLights(),P!==null&&P.updateLights(E.state.lightsArray),Pe=this.localClippingEnabled,Ee=Ue.init(this.clippingPlanes,Pe),Ee===!0&&Ue.setGlobalState(this.clippingPlanes,O),P!==null&&Be.render(E.state.shadowsArray,ne,O);const Y=new Set;return y.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const Te=$.material;if(Te)if(Array.isArray(Te))for(let Re=0;Re<Te.length;Re++){const we=Te[Re];Wn(we,ne,O,$),Y.add(we)}else Wn(Te,ne,O,$),Y.add(Te)}),E=x.pop(),P!==null&&P.renderEnd(),Y},this.compileAsync=function(y,O,ne=null){const Y=this.compile(y,O,ne);return new Promise($=>{function Te(){if(Y.forEach(function(Re){const Ie=Q.get(Re).currentProgram;(Ie===void 0||Ie.isReady())&&Y.delete(Re)}),Y.size===0){$(y);return}setTimeout(Te,10)}He.get("KHR_parallel_shader_compile")!==null?Te():setTimeout(Te,10)})};let sn=null;function Ss(y){sn&&sn(y)}function Vo(){Xn.stop()}function Go(){Xn.start()}const Xn=new cu;Xn.setAnimationLoop(Ss),typeof self<"u"&&Xn.setContext(self),this.setAnimationLoop=function(y){sn=y,j.setAnimationLoop(y),y===null?Xn.stop():Xn.start()},j.addEventListener("sessionstart",Vo),j.addEventListener("sessionend",Go),this.render=function(y,O){if(O!==void 0&&O.isCamera!==!0){nt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;P!==null&&P.renderStart(y,O);const ne=j.enabled===!0&&j.isPresenting===!0,Y=b!==null&&(X===null||ne)&&b.begin(I,X);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),j.enabled===!0&&j.isPresenting===!0&&(b===null||b.isCompositing()===!1)&&(j.cameraAutoUpdate===!0&&j.updateCamera(O),O=j.getCamera()),y.isScene===!0&&y.onBeforeRender(I,y,O,X),E=xe.get(y,x.length),E.init(O),E.state.textureUnits=re.getTextureUnits(),x.push(E),ze.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),ie.setFromProjectionMatrix(ze,hn,O.reversedDepth),Pe=this.localClippingEnabled,Ee=Ue.init(this.clippingPlanes,Pe),w=ye.get(y,N.length),w.init(),N.push(w),j.enabled===!0&&j.isPresenting===!0){const Re=I.xr.getDepthSensingMesh();Re!==null&&Ms(Re,O,-1/0,I.sortObjects)}Ms(y,O,0,I.sortObjects),w.finish(),P!==null&&P.updateLights(E.state.lightsArray),I.sortObjects===!0&&w.sort(ae,ue),Xe=j.enabled===!1||j.isPresenting===!1||j.hasDepthSensing()===!1,Xe&&Ve.addToRenderList(w,y),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ee===!0&&Ue.beginShadows();const $=E.state.shadowsArray;if(Be.render($,y,O),Ee===!0&&Ue.endShadows(),(Y&&b.hasRenderPass())===!1){const Re=w.opaque,we=w.transmissive;if(E.setupLights(),O.isArrayCamera){const Ie=O.cameras;if(we.length>0)for(let Fe=0,$e=Ie.length;Fe<$e;Fe++){const Je=Ie[Fe];Xo(Re,we,y,Je)}Xe&&Ve.render(y);for(let Fe=0,$e=Ie.length;Fe<$e;Fe++){const Je=Ie[Fe];Wo(w,y,Je,Je.viewport)}}else we.length>0&&Xo(Re,we,y,O),Xe&&Ve.render(y),Wo(w,y,O)}X!==null&&H===0&&(re.updateMultisampleRenderTarget(X),re.updateRenderTargetMipmap(X)),Y&&b.end(I),y.isScene===!0&&y.onAfterRender(I,y,O),L.resetDefaultState(),W=-1,J=null,x.pop(),x.length>0?(E=x[x.length-1],re.setTextureUnits(E.state.textureUnits),Ee===!0&&Ue.setGlobalState(I.clippingPlanes,E.state.camera)):E=null,N.pop(),N.length>0?w=N[N.length-1]:w=null,P!==null&&P.renderEnd()};function Ms(y,O,ne,Y){if(y.visible===!1)return;if(y.layers.test(O.layers)){if(y.isGroup)ne=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(O);else if(y.isLightProbeGrid)E.pushLightProbeGrid(y);else if(y.isLight)E.pushLight(y),y.castShadow&&E.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||y.intersectsFrustum(ie)){Y&&ct.setFromMatrixPosition(y.matrixWorld).applyMatrix4(ze);const Re=ce.update(y),we=y.material;we.visible&&w.push(y,Re,we,ne,ct.z,null,O)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||y.intersectsFrustum(ie))){const Re=ce.update(y),we=y.material;if(Y&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),ct.copy(y.boundingSphere.center)):(Re.boundingSphere===null&&Re.computeBoundingSphere(),ct.copy(Re.boundingSphere.center)),ct.applyMatrix4(y.matrixWorld).applyMatrix4(ze)),Array.isArray(we)){const Ie=Re.groups;for(let Fe=0,$e=Ie.length;Fe<$e;Fe++){const Je=Ie[Fe],De=we[Je.materialIndex];De&&De.visible&&w.push(y,Re,De,ne,ct.z,Je,O)}}else we.visible&&w.push(y,Re,we,ne,ct.z,null,O)}}const Te=y.children;for(let Re=0,we=Te.length;Re<we;Re++)Ms(Te[Re],O,ne,Y)}function Wo(y,O,ne,Y){const{opaque:$,transmissive:Te,transparent:Re}=y;E.setupLightsView(ne),Ee===!0&&Ue.setGlobalState(I.clippingPlanes,ne),Y&&v.viewport(te.copy(Y)),$.length>0&&vr($,O,ne),Te.length>0&&vr(Te,O,ne),Re.length>0&&vr(Re,O,ne),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function Xo(y,O,ne,Y){if((ne.isScene===!0?ne.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[Y.id]===void 0){const De=He.has("EXT_color_buffer_half_float")||He.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[Y.id]=new rn(1,1,{generateMipmaps:!0,type:De?mn:Zt,minFilter:Qn,samples:Math.max(4,C.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:je.workingColorSpace})}const Te=E.state.transmissionRenderTarget[Y.id],Re=Y.viewport||te;Te.setSize(Re.z*I.transmissionResolutionScale,Re.w*I.transmissionResolutionScale);const we=I.getRenderTarget(),Ie=I.getActiveCubeFace(),Fe=I.getActiveMipmapLevel();I.setRenderTarget(Te),I.getClearColor(oe),he=I.getClearAlpha(),he<1&&I.setClearColor(16777215,.5),I.clear(),Xe&&Ve.render(ne);const $e=I.toneMapping;I.toneMapping=nn;const Je=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),E.setupLightsView(Y),Ee===!0&&Ue.setGlobalState(I.clippingPlanes,Y),vr(y,ne,Y),re.updateMultisampleRenderTarget(Te),re.updateRenderTargetMipmap(Te),He.has("WEBGL_multisampled_render_to_texture")===!1){let De=!1;for(let it=0,Mt=O.length;it<Mt;it++){const ut=O[it],{object:at,geometry:Lt,material:Ce,group:Ot}=ut;if(Ce.side===dn&&at.layers.test(Y.layers)){const tt=Ce.side;Ce.side=Ht,Ce.needsUpdate=!0,qo(at,ne,Y,Lt,Ce,Ot),Ce.side=tt,Ce.needsUpdate=!0,De=!0}}De===!0&&(re.updateMultisampleRenderTarget(Te),re.updateRenderTargetMipmap(Te))}I.setRenderTarget(we,Ie,Fe),I.setClearColor(oe,he),Je!==void 0&&(Y.viewport=Je),I.toneMapping=$e}function vr(y,O,ne){const Y=O.isScene===!0?O.overrideMaterial:null;for(let $=0,Te=y.length;$<Te;$++){const Re=y[$],{object:we,geometry:Ie,group:Fe}=Re;let $e=Re.material;$e.allowOverride===!0&&Y!==null&&($e=Y),we.layers.test(ne.layers)&&qo(we,O,ne,Ie,$e,Fe)}}function qo(y,O,ne,Y,$,Te){P!==null&&$.isNodeMaterial&&P.setObject(y,$),y.onBeforeRender(I,O,ne,Y,$,Te),y.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),$.onBeforeRender(I,O,ne,Y,y,Te),$.transparent===!0&&$.side===dn&&$.forceSinglePass===!1?($.side=Ht,$.needsUpdate=!0,I.renderBufferDirect(ne,O,Y,$,y,Te),$.side=ii,$.needsUpdate=!0,I.renderBufferDirect(ne,O,Y,$,y,Te),$.side=dn):I.renderBufferDirect(ne,O,Y,$,y,Te),y.onAfterRender(I,O,ne,Y,$,Te)}function _r(y,O,ne){O.isScene!==!0&&(O=_t);const Y=Q.get(y),$=E.state.lights,Te=E.state.shadowsArray,Re=$.state.version,we=ge.getParameters(y,$.state,Te,O,ne,E.state.lightProbeGridArray),Ie=ge.getProgramCacheKey(we);let Fe=Y.programs;Y.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?O.environment:null,Y.fog=O.fog;const $e=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;Y.envMap=me.get(y.envMap||Y.environment,$e),Y.envMapRotation=Y.environment!==null&&y.envMap===null?O.environmentRotation:y.envMapRotation,Fe===void 0&&(y.addEventListener("dispose",Gt),Fe=new Map,Y.programs=Fe);let Je=Fe.get(Ie);if(Je!==void 0){if(Y.currentProgram===Je&&Y.lightsStateVersion===Re)return $o(y,we),Je}else we.uniforms=ge.getUniforms(y),P!==null&&y.isNodeMaterial&&P.build(y,ne,we),y.onBeforeCompile(we,I),Je=ge.acquireProgram(we,Ie),Fe.set(Ie,Je),Y.uniforms=we.uniforms;const De=Y.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(De.clippingPlanes=Ue.uniform),$o(y,we),Y.needsLights=Iu(y),Y.lightsStateVersion=Re,Y.needsLights&&(De.ambientLightColor.value=$.state.ambient,De.lightProbe.value=$.state.probe,De.sunLights.value=$.state.sun,De.sunLightShadows.value=$.state.sunShadow,De.directionalLights.value=$.state.directional,De.directionalLightShadows.value=$.state.directionalShadow,De.spotLights.value=$.state.spot,De.spotLightShadows.value=$.state.spotShadow,De.rectAreaLights.value=$.state.rectArea,De.ltc_1.value=$.state.rectAreaLTC1,De.ltc_2.value=$.state.rectAreaLTC2,De.pointLights.value=$.state.point,De.pointLightShadows.value=$.state.pointShadow,De.hemisphereLights.value=$.state.hemi,De.sunShadowMatrix.value=$.state.sunShadowMatrix,De.sunShadowCascade.value=$.state.sunShadowCascade,De.directionalShadowMatrix.value=$.state.directionalShadowMatrix,De.spotLightMatrix.value=$.state.spotLightMatrix,De.spotLightMap.value=$.state.spotLightMap,De.pointShadowMatrix.value=$.state.pointShadowMatrix),Y.lightProbeGrid=E.state.lightProbeGridArray.length>0,Y.currentProgram=Je,Y.uniformsList=null,Je}function Yo(y){if(y.uniformsList===null){const O=y.currentProgram.getUniforms();y.uniformsList=ts.seqWithValue(O.seq,y.uniforms)}return y.uniformsList}function $o(y,O){const ne=Q.get(y);ne.outputColorSpace=O.outputColorSpace,ne.batching=O.batching,ne.batchingColor=O.batchingColor,ne.instancing=O.instancing,ne.instancingColor=O.instancingColor,ne.instancingMorph=O.instancingMorph,ne.skinning=O.skinning,ne.morphTargets=O.morphTargets,ne.morphNormals=O.morphNormals,ne.morphColors=O.morphColors,ne.morphTargetsCount=O.morphTargetsCount,ne.numClippingPlanes=O.numClippingPlanes,ne.numIntersection=O.numClipIntersection,ne.vertexAlphas=O.vertexAlphas,ne.vertexTangents=O.vertexTangents,ne.toneMapping=O.toneMapping}function Ru(y,O){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;S.setFromMatrixPosition(O.matrixWorld);for(let ne=0,Y=y.length;ne<Y;ne++){const $=y[ne];if($.texture!==null&&$.boundingBox.containsPoint(S))return $}return null}function Lu(y,O,ne,Y,$){O.isScene!==!0&&(O=_t),re.resetTextureUnits();const Te=O.fog,Re=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial?O.environment:null,we=X===null?I.outputColorSpace:X.isXRRenderTarget===!0?X.texture.colorSpace:je.workingColorSpace,Ie=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial&&!Y.envMap||Y.isMeshPhongMaterial&&!Y.envMap,Fe=me.get(Y.envMap||Re,Ie),$e=Y.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,Je=!!ne.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),De=!!ne.morphAttributes.position,it=!!ne.morphAttributes.normal,Mt=!!ne.morphAttributes.color;let ut=nn;Y.toneMapped&&(X===null||X.isXRRenderTarget===!0)&&(ut=I.toneMapping);const at=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,Lt=at!==void 0?at.length:0,Ce=Q.get(Y),Ot=E.state.lights;if(Ee===!0&&(Pe===!0||y!==J)){const lt=y===J&&Y.id===W;Ue.setState(Y,y,lt)}let tt=!1;Y.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==Ot.state.version||Ce.outputColorSpace!==we||$.isBatchedMesh&&Ce.batching===!1||!$.isBatchedMesh&&Ce.batching===!0||$.isBatchedMesh&&Ce.batchingColor===!0&&$._colorsTexture===null||$.isBatchedMesh&&Ce.batchingColor===!1&&$._colorsTexture!==null||$.isInstancedMesh&&Ce.instancing===!1||!$.isInstancedMesh&&Ce.instancing===!0||$.isSkinnedMesh&&Ce.skinning===!1||!$.isSkinnedMesh&&Ce.skinning===!0||$.isInstancedMesh&&Ce.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&Ce.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&Ce.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&Ce.instancingMorph===!1&&$.morphTexture!==null||Ce.envMap!==Fe||Y.fog===!0&&Ce.fog!==Te||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==Ue.numPlanes||Ce.numIntersection!==Ue.numIntersection)||Ce.vertexAlphas!==$e||Ce.vertexTangents!==Je||Ce.morphTargets!==De||Ce.morphNormals!==it||Ce.morphColors!==Mt||Ce.toneMapping!==ut||Ce.morphTargetsCount!==Lt||!!Ce.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(tt=!0):(tt=!0,Ce.__version=Y.version);let Yt=Ce.currentProgram;tt===!0&&(Yt=_r(Y,O,$),P&&Y.isNodeMaterial&&P.onUpdateProgram(Y,Yt,Ce));let an=!1,Pn=!1,ci=!1;const st=Yt.getUniforms(),xt=Ce.uniforms;if(v.useProgram(Yt.program)&&(an=!0,Pn=!0,ci=!0),Y.id!==W&&(W=Y.id,Pn=!0),Ce.needsLights){const lt=Ru(E.state.lightProbeGridArray,$);Ce.lightProbeGrid!==lt&&(Ce.lightProbeGrid=lt,Pn=!0)}if(an||J!==y){v.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),st.setValue(F,"projectionMatrix",y.projectionMatrix),st.setValue(F,"viewMatrix",y.matrixWorldInverse);const Dn=st.map.cameraPosition;Dn!==void 0&&Dn.setValue(F,Ye.setFromMatrixPosition(y.matrixWorld)),C.logarithmicDepthBuffer&&st.setValue(F,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&st.setValue(F,"isOrthographic",y.isOrthographicCamera===!0),J!==y&&(J=y,Pn=!0,ci=!0)}if(Ce.needsLights&&(Ot.state.sunShadowMap.length>0&&st.setValue(F,"sunShadowMap",Ot.state.sunShadowMap,re),Ot.state.directionalShadowMap.length>0&&st.setValue(F,"directionalShadowMap",Ot.state.directionalShadowMap,re),Ot.state.spotShadowMap.length>0&&st.setValue(F,"spotShadowMap",Ot.state.spotShadowMap,re),Ot.state.pointShadowMap.length>0&&st.setValue(F,"pointShadowMap",Ot.state.pointShadowMap,re)),$.isSkinnedMesh){st.setOptional(F,$,"bindMatrix"),st.setOptional(F,$,"bindMatrixInverse");const lt=$.skeleton;lt&&(lt.boneTexture===null&&lt.computeBoneTexture(),st.setValue(F,"boneTexture",lt.boneTexture,re))}$.isBatchedMesh&&(st.setOptional(F,$,"batchingTexture"),st.setValue(F,"batchingTexture",$._matricesTexture,re),st.setOptional(F,$,"batchingIdTexture"),st.setValue(F,"batchingIdTexture",$._indirectTexture,re),st.setOptional(F,$,"batchingColorTexture"),$._colorsTexture!==null&&st.setValue(F,"batchingColorTexture",$._colorsTexture,re));const In=ne.morphAttributes;if((In.position!==void 0||In.normal!==void 0||In.color!==void 0)&&k.update($,ne,Yt),(Pn||Ce.receiveShadow!==$.receiveShadow)&&(Ce.receiveShadow=$.receiveShadow,st.setValue(F,"receiveShadow",$.receiveShadow)),(Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial)&&Y.envMap===null&&O.environment!==null&&(xt.envMapIntensity.value=O.environmentIntensity),xt.dfgLUT!==void 0&&(xt.dfgLUT.value=Q0()),Pn){if(st.setValue(F,"toneMappingExposure",I.toneMappingExposure),Ce.needsLights&&Pu(xt,ci),Te&&Y.fog===!0&&Ne.refreshFogUniforms(xt,Te),Ne.refreshMaterialUniforms(xt,Y,K,z,E.state.transmissionRenderTarget[y.id]),Ce.needsLights&&Ce.lightProbeGrid){const lt=Ce.lightProbeGrid;xt.probesSH.value=lt.texture,xt.probesMin.value.copy(lt.boundingBox.min),xt.probesMax.value.copy(lt.boundingBox.max),xt.probesResolution.value.copy(lt.resolution)}ts.upload(F,Yo(Ce),xt,re)}if(Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(ts.upload(F,Yo(Ce),xt,re),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&st.setValue(F,"center",$.center),st.setValue(F,"modelViewMatrix",$.modelViewMatrix),st.setValue(F,"normalMatrix",$.normalMatrix),st.setValue(F,"modelMatrix",$.matrixWorld),Y.uniformsGroups!==void 0){const lt=Y.uniformsGroups;for(let Dn=0,ui=lt.length;Dn<ui;Dn++){const Ko=lt[Dn];D.update(Ko,Yt),D.bind(Ko,Yt)}}return Yt}function Pu(y,O){y.ambientLightColor.needsUpdate=O,y.lightProbe.needsUpdate=O,y.sunLights.needsUpdate=O,y.sunLightShadows.needsUpdate=O,y.directionalLights.needsUpdate=O,y.directionalLightShadows.needsUpdate=O,y.pointLights.needsUpdate=O,y.pointLightShadows.needsUpdate=O,y.spotLights.needsUpdate=O,y.spotLightShadows.needsUpdate=O,y.rectAreaLights.needsUpdate=O,y.hemisphereLights.needsUpdate=O}function Iu(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return X},this.setRenderTargetTextures=function(y,O,ne){const Y=Q.get(y);Y.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,Y.__autoAllocateDepthBuffer===!1&&(Y.__useRenderToTexture=!1),Q.get(y.texture).__webglTexture=O,Q.get(y.depthTexture).__webglTexture=Y.__autoAllocateDepthBuffer?void 0:ne,Y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,O){const ne=Q.get(y);ne.__webglFramebuffer=O,ne.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(y,O=0,ne=0){X=y,Z=O,H=ne;let Y=null,$=!1,Te=!1;if(y){const we=Q.get(y);if(we.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(F.FRAMEBUFFER,we.__webglFramebuffer),te.copy(y.viewport),fe.copy(y.scissor),q=y.scissorTest,v.viewport(te),v.scissor(fe),v.setScissorTest(q),W=-1;return}else if(we.__webglFramebuffer===void 0)re.setupRenderTarget(y);else if(we.__hasExternalTextures)re.rebindTextures(y,Q.get(y.texture).__webglTexture,Q.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const $e=y.depthTexture;if(we.__boundDepthTexture!==$e){if($e!==null&&Q.has($e)&&(y.width!==$e.image.width||y.height!==$e.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");re.setupDepthRenderbuffer(y)}}const Ie=y.texture;(Ie.isData3DTexture||Ie.isDataArrayTexture||Ie.isCompressedArrayTexture)&&(Te=!0);const Fe=Q.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Fe[O])?Y=Fe[O][ne]:Y=Fe[O],$=!0):y.samples>0&&re.useMultisampledRTT(y)===!1?Y=Q.get(y).__webglMultisampledFramebuffer:Array.isArray(Fe)?Y=Fe[ne]:Y=Fe,te.copy(y.viewport),fe.copy(y.scissor),q=y.scissorTest}else te.copy(de).multiplyScalar(K).floor(),fe.copy(pe).multiplyScalar(K).floor(),q=Le;if(ne!==0&&(Y=R),v.bindFramebuffer(F.FRAMEBUFFER,Y)&&v.drawBuffers(y,Y),v.viewport(te),v.scissor(fe),v.setScissorTest(q),$){const we=Q.get(y.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+O,we.__webglTexture,ne)}else if(Te){const we=O;for(let Ie=0;Ie<y.textures.length;Ie++){const Fe=Q.get(y.textures[Ie]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Ie,Fe.__webglTexture,ne,we)}}else if(y!==null&&ne!==0){const we=Q.get(y.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,we.__webglTexture,ne)}W=-1};function Zo(y){const O=Q.get(y);return(O.__readFormat!==y.format||O.__readType!==y.type)&&(O.__readFormat=y.format,O.__readType=y.type,O.__formatReadable=C.textureFormatReadable(y.format),O.__typeReadable=C.textureTypeReadable(y.type)),O}this.readRenderTargetPixels=function(y,O,ne,Y,$,Te,Re,we=0){if(!(y&&y.isWebGLRenderTarget)){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ie=Q.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Re!==void 0&&(Ie=Ie[Re]),Ie){v.bindFramebuffer(F.FRAMEBUFFER,Ie);try{const Fe=y.textures[we],$e=Fe.format,Je=Fe.type;y.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+we);const De=Zo(Fe);if(De.__formatReadable===!1){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(De.__typeReadable===!1){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=y.width-Y&&ne>=0&&ne<=y.height-$&&F.readPixels(O,ne,Y,$,_e.convert($e),_e.convert(Je),Te)}finally{const Fe=X!==null?Q.get(X).__webglFramebuffer:null;v.bindFramebuffer(F.FRAMEBUFFER,Fe)}}},this.readRenderTargetPixelsAsync=async function(y,O,ne,Y,$,Te,Re,we=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ie=Q.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Re!==void 0&&(Ie=Ie[Re]),Ie)if(O>=0&&O<=y.width-Y&&ne>=0&&ne<=y.height-$){v.bindFramebuffer(F.FRAMEBUFFER,Ie);const Fe=y.textures[we],$e=Fe.format,Je=Fe.type;y.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+we);const De=Zo(Fe);if(De.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(De.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const it=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,it),F.bufferData(F.PIXEL_PACK_BUFFER,Te.byteLength,F.STREAM_READ),F.readPixels(O,ne,Y,$,_e.convert($e),_e.convert(Je),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);const Mt=X!==null?Q.get(X).__webglFramebuffer:null;v.bindFramebuffer(F.FRAMEBUFFER,Mt);const ut=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await kd(F,ut,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,it),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,Te),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(it),F.deleteSync(ut),Te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,O=null,ne=0){const Y=Math.pow(2,-ne),$=Math.floor(y.image.width*Y),Te=Math.floor(y.image.height*Y),Re=O!==null?O.x:0,we=O!==null?O.y:0;re.setTexture2D(y,0),F.copyTexSubImage2D(F.TEXTURE_2D,ne,0,0,Re,we,$,Te),v.unbindTexture()},this.copyTextureToTexture=function(y,O,ne=null,Y=null,$=0,Te=0){let Re,we,Ie,Fe,$e,Je,De,it,Mt;const ut=y.isCompressedTexture?y.mipmaps[Te]:y.image;if(ne!==null)Re=ne.max.x-ne.min.x,we=ne.max.y-ne.min.y,Ie=ne.isBox3?ne.max.z-ne.min.z:1,Fe=ne.min.x,$e=ne.min.y,Je=ne.isBox3?ne.min.z:0;else{const xt=Math.pow(2,-$);Re=Math.floor(ut.width*xt),we=Math.floor(ut.height*xt),y.isDataArrayTexture?Ie=ut.depth:y.isData3DTexture?Ie=Math.floor(ut.depth*xt):Ie=1,Fe=0,$e=0,Je=0}Y!==null?(De=Y.x,it=Y.y,Mt=Y.z):(De=0,it=0,Mt=0);const at=_e.convert(O.format),Lt=_e.convert(O.type);let Ce;O.isData3DTexture?(re.setTexture3D(O,0),Ce=F.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(re.setTexture2DArray(O,0),Ce=F.TEXTURE_2D_ARRAY):(re.setTexture2D(O,0),Ce=F.TEXTURE_2D),v.activeTexture(F.TEXTURE0),v.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,O.flipY),v.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),v.pixelStorei(F.UNPACK_ALIGNMENT,O.unpackAlignment);const Ot=v.getParameter(F.UNPACK_ROW_LENGTH),tt=v.getParameter(F.UNPACK_IMAGE_HEIGHT),Yt=v.getParameter(F.UNPACK_SKIP_PIXELS),an=v.getParameter(F.UNPACK_SKIP_ROWS),Pn=v.getParameter(F.UNPACK_SKIP_IMAGES);v.pixelStorei(F.UNPACK_ROW_LENGTH,ut.width),v.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ut.height),v.pixelStorei(F.UNPACK_SKIP_PIXELS,Fe),v.pixelStorei(F.UNPACK_SKIP_ROWS,$e),v.pixelStorei(F.UNPACK_SKIP_IMAGES,Je);const ci=y.isDataArrayTexture||y.isData3DTexture,st=O.isDataArrayTexture||O.isData3DTexture;if(y.isDepthTexture){const xt=Q.get(y),In=Q.get(O),lt=Q.get(xt.__renderTarget),Dn=Q.get(In.__renderTarget);v.bindFramebuffer(F.READ_FRAMEBUFFER,lt.__webglFramebuffer),v.bindFramebuffer(F.DRAW_FRAMEBUFFER,Dn.__webglFramebuffer);for(let ui=0;ui<Ie;ui++)ci&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Q.get(y).__webglTexture,$,Je+ui),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Q.get(O).__webglTexture,Te,Mt+ui)),F.blitFramebuffer(Fe,$e,Re,we,De,it,Re,we,F.DEPTH_BUFFER_BIT,F.NEAREST);v.bindFramebuffer(F.READ_FRAMEBUFFER,null),v.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if($!==0||y.isRenderTargetTexture||Q.has(y)){const xt=Q.get(y),In=Q.get(O);v.bindFramebuffer(F.READ_FRAMEBUFFER,U),v.bindFramebuffer(F.DRAW_FRAMEBUFFER,B);for(let lt=0;lt<Ie;lt++)ci?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,xt.__webglTexture,$,Je+lt):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,xt.__webglTexture,$),st?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,In.__webglTexture,Te,Mt+lt):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,In.__webglTexture,Te),$!==0?F.blitFramebuffer(Fe,$e,Re,we,De,it,Re,we,F.COLOR_BUFFER_BIT,F.NEAREST):st?F.copyTexSubImage3D(Ce,Te,De,it,Mt+lt,Fe,$e,Re,we):F.copyTexSubImage2D(Ce,Te,De,it,Fe,$e,Re,we);v.bindFramebuffer(F.READ_FRAMEBUFFER,null),v.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else st?y.isDataTexture||y.isData3DTexture?F.texSubImage3D(Ce,Te,De,it,Mt,Re,we,Ie,at,Lt,ut.data):O.isCompressedArrayTexture?F.compressedTexSubImage3D(Ce,Te,De,it,Mt,Re,we,Ie,at,ut.data):F.texSubImage3D(Ce,Te,De,it,Mt,Re,we,Ie,at,Lt,ut):y.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,Te,De,it,Re,we,at,Lt,ut.data):y.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,Te,De,it,ut.width,ut.height,at,ut.data):F.texSubImage2D(F.TEXTURE_2D,Te,De,it,Re,we,at,Lt,ut);v.pixelStorei(F.UNPACK_ROW_LENGTH,Ot),v.pixelStorei(F.UNPACK_IMAGE_HEIGHT,tt),v.pixelStorei(F.UNPACK_SKIP_PIXELS,Yt),v.pixelStorei(F.UNPACK_SKIP_ROWS,an),v.pixelStorei(F.UNPACK_SKIP_IMAGES,Pn),Te===0&&O.generateMipmaps&&F.generateMipmap(Ce),v.unbindTexture()},this.initRenderTarget=function(y){Q.get(y).__webglFramebuffer===void 0&&re.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?re.setTextureCube(y,0):y.isData3DTexture?re.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?re.setTexture2DArray(y,0):re.setTexture2D(y,0),v.unbindTexture()},this.resetState=function(){Z=0,H=0,X=null,v.reset(),L.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=je._getDrawingBufferColorSpace(e),t.unpackColorSpace=je._getUnpackColorSpace()}}function _s(n,e){const t=[[0,n],[n,0],[0,-n],[-n,0]];if(e<=0)return t.map(([s,a])=>[s,a,0]);const i=Math.min(.24,Math.max(0,e/n)),r=[];for(let s=0;s<4;s++){const a=t[s],o=t[(s+3)%4],l=t[(s+1)%4],c=a.map((f,d)=>f+(o[d]-f)*i),u=a.map((f,d)=>f+(l[d]-f)*i);for(let f=0;f<=8;f++){const d=f/8,h=1-d;r.push([h*h*c[0]+2*h*d*a[0]+d*d*u[0],h*h*c[1]+2*h*d*a[1]+d*d*u[1],0])}}return r}function vu(n,e=50,t=38){const i=fo[n],r=i.u-i.v,s=i.u+i.v,a=Math.hypot(r,s)||1,o={x:r/a,y:s/a},l={x:-o.y,y:o.x},c={x:o.x*e/2,y:o.y*e/2},u={x:-o.x*e*.08,y:-o.y*e*.08},f={x:-o.x*e/2,y:-o.y*e/2},d=[c,{x:u.x+l.x*t/2,y:u.y+l.y*t/2},{x:u.x+l.x*t*.22,y:u.y+l.y*t*.22},{x:f.x+l.x*t*.22,y:f.y+l.y*t*.22},{x:f.x-l.x*t*.22,y:f.y-l.y*t*.22},{x:u.x-l.x*t*.22,y:u.y-l.y*t*.22},{x:u.x-l.x*t/2,y:u.y-l.y*t/2}];return xu(d,3.5)}function _u(n,e=40,t=11){const i=fo[n],r=i.u-i.v,s=i.u+i.v,a=Math.hypot(r,s)||1,o={x:r/a,y:s/a},l={x:-o.y,y:o.x},c=t/2,u=[[e*.38,0],[-e*.12,e*.48],[-e*.12-c*1.4,e*.48-c*1.4],[e*.38-c*2.8,0],[-e*.12-c*1.4,-e*.48+c*1.4],[-e*.12,-e*.48]];return xu(u.map(([f,d])=>({x:o.x*f+l.x*d,y:o.y*f+l.y*d})),4)}function xu(n,e){const t=new tu;n.forEach((r,s)=>{const a=n[(s+n.length-1)%n.length],o=n[(s+1)%n.length],l=f=>{const d=Math.hypot(f.x-r.x,f.y-r.y),h=Math.min(.45,e/d);return{x:r.x+(f.x-r.x)*h,y:r.y+(f.y-r.y)*h}},c=l(a),u=l(o);s===0?t.moveTo(c.x,c.y):t.lineTo(c.x,c.y),t.quadraticCurveTo(r.x,r.y,u.x,u.y)}),t.closePath();const i=new Io(t,8).toNonIndexed();return i.computeBoundingSphere(),i}function ev(n,e){const t=[...n.cells].filter(r=>r.kind!=="blocked").sort(rs).map(r=>({kind:"floor",cell:r})),i=[...e].sort((r,s)=>+!!r.collecting-+!!s.collecting||rs(r,s));return[...t,...i.map(r=>({kind:"stack",stack:r,firstLayer:0,endLayer:Math.ceil(r.height)}))]}function tv(n){const e=document.createElement("canvas");e.width=n.width,e.height=n.height;const t=e.getContext("2d",{willReadFrequently:!0});if(!t)throw new Error("Could not capture the challenge board.");t.drawImage(n,0,0);const{data:i}=t.getImageData(0,0,e.width,e.height);let r=e.width,s=e.height,a=-1,o=-1;for(let h=0;h<e.height;h++)for(let m=0;m<e.width;m++)i[(h*e.width+m)*4+3]&&(r=Math.min(r,m),a=Math.max(a,m),s=Math.min(s,h),o=Math.max(o,h));if(a<r)throw new Error("The challenge board is empty.");const l=a-r+1,c=o-s+1,u=Math.ceil(Math.max(l,c)*.04),f=document.createElement("canvas");f.width=l+u*2,f.height=c+u*2;const d=f.getContext("2d");if(!d)throw new Error("Could not capture the challenge board.");return d.drawImage(e,r,s,l,c,u,u,l,c),f.toDataURL("image/png")}function ca(n,e){return{rise:e+(n.lift??0)+(n.layerOffsets?.[e]??0),scale:n.layerScales?.[e]??1}}const Su=420,Mu=n=>Math.min(32,240/Math.max(1,n-1));function nv(n){return Math.max(0,n-1)*Mu(n)+Su}function cc(n,e){const t=[],i=[],r=Mu(n);for(let s=0;s<n;s++){const a=(e-s*r)/Su,o=a>0&&a<1?Math.sin(a*Math.PI*3)*(1-a)**2:0;t.push(o*.3),i.push(1+o*.22)}return{layerOffsets:t,layerScales:i}}function iv(n,e){if(e)return{offset:0,intensity:1};const t=(n%.9+.9)%.9/.9,i=Math.cos(t*Math.PI*2);return{offset:-7*i,intensity:(1-i)/2}}function xs(n,e,t){const i=new Vt;return i.setAttribute("position",new bt(n.flatMap(r=>[r[0],r[1],0]),3)),i.setAttribute("color",new bt(n.flatMap(r=>{const s=e(r);return t?[s.r,s.g,s.b,t(r)]:[s.r,s.g,s.b]}),t?4:3)),i.computeBoundingSphere(),i}function Uo(n){const e=[];for(let t=1;t<n.length;t++){const i=n[t-1],r=n[t];for(let s=0;s<i.length;s++){const a=(s+1)%i.length;e.push(i[s],i[a],r[a],i[s],r[a],r[s])}}return e}function yu(n,e,t){const i=new qe(t?"#ffc729":"#f2ebdf"),r=new qe(t?"#ffe878":"#fffdf7"),s=Math.exp(-((n-.28)**2+(e-.3)**2)*1.3);return i.lerp(r,.25+.65*s)}function io(n,e,t=!1){const i=[0,.2,.4,.6,.8,1].map(r=>_s(n,e).map(s=>[s[0]*r,s[1]*r,r]));return xs(Uo(i),r=>yu(r[0]/n,r[1]/n,t))}function ro(n,e,t,i=!1){const r=[0,.2,.4,.6,.8,1].map(o=>_s(n-e*o,t*(n-e*o)/n).map(l=>[l[0],l[1],o])),s=new qe(i?"#dca02a":"#c2c1ba"),a=new qe(i?"#fff19c":"#fffef9");return xs(Uo(r),o=>{const l=Math.max(0,Math.min(1,.65+(o[1]+o[0]*.65)/(n*2))),c=o[2];return s.clone().lerp(a,.2+l*.6).lerp(yu(o[0]/(n-e),o[1]/(n-e),i),c*c*(3-2*c))})}function so(n,e,t,i=!1){const r=[0,.12,.5,.85,1].map(l=>_s(n-(l>.85?(l-.85)*10:0),t).map(c=>[c[0],c[1]-e*l,l])),s=[];for(let l=1;l<r.length;l++){const c=r[l-1],u=r[l];for(let f=0;f<c.length;f++){const d=(f+1)%c.length;c[d][0]>=c[f][0]||s.push(c[f],c[d],u[d],c[f],u[d],u[f])}}const a=new qe(i?"#b78224":"#a6acb4"),o=new qe(i?"#f6c440":"#eee9df");return xs(s,l=>{const c=.7+l[0]/n*.18,u=.6+.25*Math.sin(l[2]*Math.PI)-.4*l[2];return a.clone().lerp(o,Math.max(0,Math.min(1,c*u)))})}function rv(n,e){const t=[0,.65,.85,1,1.1].map(i=>_s(n,e).map(r=>[r[0]*i,r[1]*i,i]));return xs(Uo(t),()=>new qe("#716c60"),i=>Math.max(0,1-i[2]/1.1)**1.4)}const ns=po.length;function sv(n,e){return((n+e*5)%ns+ns)%ns}function av(n,e){const{rect:t,solid:i}=po[n],r=e*2/(i[2]-i[0]),s=(e*2+go)/(i[3]-i[1]),a=-e-i[0]*r,o=a+r,l=e+i[1]*s,c=l-s,[u,f,d,h]=t,m=u/tl,_=d/tl,p=1-h/nl,g=1-f/nl,M=new Vt;return M.setAttribute("position",new bt([a,l,0,o,l,0,o,c,0,a,l,0,o,c,0,a,c,0],3)),M.setAttribute("uv",new bt([m,g,_,g,_,p,m,g,_,p,m,p],2)),M.computeBoundingSphere(),M}function ov(n){const e=[so(n,mo,12),ro(n,4,12),io(n-4,11)],t=[],i=[],r=new qe("#64778b"),s=new qe("#c7cdd0");for(const o of e){const l=o.getAttribute("position"),c=o.getAttribute("color");for(let u=0;u<l.count;u++){t.push(l.getX(u),l.getY(u),l.getZ(u));const f=r.clone().lerp(s,Math.min(1,(c.getX(u)+c.getY(u)+c.getZ(u))/3));i.push(f.r,f.g,f.b)}o.dispose()}const a=new Vt;return a.setAttribute("position",new bt(t,3)),a.setAttribute("color",new bt(i,3)),a.computeBoundingSphere(),a}const bu={tiles:[2048,512],markers:[1024,512]},lv={white:{rect:[16,49,496,462],solid:[.024635036496350366,.028631519414644493,.9753649635036497,.9724112334529259]},yellow:{rect:[528,55,1008,457],solid:[.024280575539568344,.02899173198754429,.9757194244604316,.9717599055084291]},"white-shadow":{rect:[1040,131,1520,380],solid:[.024104234527687295,.04646599427024057,.9758957654723126,.9519249636984419]},"yellow-shadow":{rect:[1552,136,2032,376],solid:[.024025974025974024,.04805194805194805,.9759740259740259,.9532467532467532]},"orange-up":{rect:[8,69,120,186],solid:[.024915062287655717,.0238503160360465,.9750849377123442,.9756947469291749]},"orange-up-right":{rect:[136,74,248,182],solid:[.024020227560050567,.024909865617830217,.9759797724399494,.9780399868895444]},"orange-right":{rect:[264,86,376,170],solid:[.024177949709864605,.032237266279819474,.9758220502901355,.9722759509993553]},"orange-down-right":{rect:[392,74,504,182],solid:[.02408256880733945,.024974515800203875,.9759174311926605,.9704383282364935]},"orange-down":{rect:[520,70,632,185],solid:[.025246981339187707,.02458836443468716,.9747530186608123,.97818928077125]},"orange-down-left":{rect:[648,76,760,180],solid:[.024364406779661018,.026238591916558023,.975635593220339,.973109517601043]},"orange-left":{rect:[776,85,888,171],solid:[.024557956777996073,.03198245533878558,.9754420432220039,.9697080458719788]},"orange-up-left":{rect:[904,74,1016,182],solid:[.02378255945639864,.02466339499182081,.9762174405436014,.9724424311060778]},"white-up":{rect:[8,347,120,421],solid:[.02586206896551724,.0391425908667288,.9741379310344829,.9589934762348556]},"white-up-right":{rect:[136,334,248,434],solid:[.027624309392265196,.030939226519337018,.9723756906077348,.9714917127071823]},"white-right":{rect:[264,317,376,450],solid:[.02958579881656805,.024914356898162567,.9704142011834321,.9766427904079727]},"white-down-right":{rect:[392,334,504,434],solid:[.027624309392265196,.030939226519337018,.9723756906077348,.965303867403315]},"white-down":{rect:[520,347,632,421],solid:[.02586206896551724,.0391425908667288,.9741379310344829,.9589934762348556]},"white-down-left":{rect:[648,334,760,434],solid:[.027624309392265196,.030939226519337018,.9723756906077348,.965303867403315]},"white-left":{rect:[776,317,888,450],solid:[.02958579881656805,.024914356898162567,.9704142011834321,.9766427904079727]},"white-up-left":{rect:[904,334,1016,434],solid:[.027624309392265196,.030939226519337018,.9723756906077348,.9714917127071823]}},cv={SE:"up-right",SW:"up-left",NW:"down-left",NE:"down-right",E:"right",W:"left",N:"down",S:"up"},Eu={white:.94,yellow:.96};function wu(n,e,t,i){const{rect:r,solid:s}=lv[n],a=s[2]-s[0],o=s[3]-s[1],l=(i.right-i.left)/a,c=(i.top-i.bottom)/o,u=i.left-s[0]*l,f=u+l,d=i.top+s[1]*c,h=d-c,m=r[0]/e,_=r[2]/e,p=1-r[3]/t,g=1-r[1]/t,M=new Vt;return M.setAttribute("position",new bt([u,d,0,f,d,0,f,h,0,u,d,0,f,h,0,u,h,0],3)),M.setAttribute("uv",new bt([m,g,_,g,_,p,m,g,_,p,m,p],2)),M.computeBoundingSphere(),M}function qr(n=!1,e=!1){const t=((n?wi:Ct)-1)*Eu[n?"yellow":"white"],i=n?12:ni;return wu(n?e?"yellow-shadow":"yellow":e?"white-shadow":"white",...bu.tiles,{left:-t,right:t,top:e?n?8:vo-ni:t,bottom:-t-i})}function uc(n,e=!1){const t=e?_u(n):vu(n);t.computeBoundingBox();const i=t.boundingBox,r=e?1.2:1.25,s=wu(`${e?"white":"orange"}-${cv[n]}`,...bu.markers,{left:i.min.x*r,right:i.max.x*r,top:i.max.y*r,bottom:i.min.y*r});return t.dispose(),s}const dt={transparent:!0,depthTest:!1,depthWrite:!1,side:dn};function dc(n,e,t,i){const r=_o(n,e,t,i);return{x:r.x-ft.width/2,y:ft.height/2-r.y}}function fc(n,e,t,i){const r=ss(n,e,t,i);return{x:r.x-ft.width/2,y:ft.height/2-r.y}}function uv(){return{tileTop:new ot({vertexColors:!0,...dt}),tileBevel:new ot({vertexColors:!0,...dt}),sideLight:new ot({vertexColors:!0,...dt}),floor:new ot({vertexColors:!0,...dt}),floorBevel:new ot({vertexColors:!0,...dt}),floorSide:new ot({vertexColors:!0,...dt}),coveredFloorSide:new ot({vertexColors:!0,color:"#cda756",...dt}),coveredFloorBevel:new ot({vertexColors:!0,color:"#d6b251",...dt}),landscape:new ot({vertexColors:!0,...dt}),stoneArt:new ot({...dt}),shadow:new ot({vertexColors:!0,opacity:.28,...dt}),arrowShadow:new ot({color:"#786f58",opacity:.16,...dt}),arrowSide:new ot({color:"#ca641c",...dt}),arrowBevel:new ot({color:"#ffbb69",...dt}),chevronSide:new ot({color:"#cba52c",...dt}),selectedArrow:new ot({color:Ii.arrow,...dt}),hintTop:new ot({vertexColors:!0,...dt}),hintBevel:new ot({vertexColors:!0,...dt}),hintSide:new ot({vertexColors:!0,...dt}),hintArt:new ot({...dt}),arrow:new ot({color:Ii.arrow,...dt}),chevron:new ot({color:Ii.chevron,...dt}),tileArt:new ot({...dt}),markerArt:new ot({...dt}),chevronArt:new ot({...dt})}}function dv(n){const e=new j0({canvas:n,antialias:!0,alpha:!0,powerPreference:"high-performance"});e.outputColorSpace=Dt,e.toneMapping=nn,e.setClearColor(Ii.background,0),e.autoClear=!1;const t=new Bs,i=new No(-360,360,640,-640,.1,1e3);i.position.set(0,0,100),i.lookAt(0,0,0);const r=uv(),s={stoneSprites:Array.from({length:ns},(q,oe)=>av(oe,Ci)),stoneSlab:ov(Ci),floor:io(wi-5,12*(wi-5)/(wi-1),!0),floorBevel:ro(wi-1,4,12,!0),floorSide:so(wi-1,12,12,!0),tileTop:io(Ct-6,12*(Ct-6)/(Ct-1)),tileBevel:ro(Ct-1,5,12),tileSide:so(Ct-1,ni,12),shadow:rv((Ct-2)*Eu.white,12),arrows:Object.fromEntries(xr.map(q=>[q,vu(q)])),chevrons:Object.fromEntries(xr.map(q=>[q,_u(q)])),whiteSprite:qr(),coveredWhiteSprite:qr(!1,!0),yellowSprite:qr(!0),coveredYellowSprite:qr(!0,!0),arrowSprites:Object.fromEntries(xr.map(q=>[q,uc(q)])),chevronSprites:Object.fromEntries(xr.map(q=>[q,uc(q,!0)]))},a=new Bs,o=new Bs;let l;a.scale.y=wn,t.add(a),t.add(o);let c={width:1,height:1,pixelRatio:1},u,f,d=!1,h="loading",m="loading";const _=new ou,p=new Promise((q,oe)=>{_.onLoad=()=>q(),_.onError=()=>oe(new Error("Could not load board textures."))});p.catch(()=>{});const g=new na(_).load(new URL("/White-Tower-Play/telegram/assets/tiles-atlas-Bgn-GxWF.webp",import.meta.url).href,q=>{if(d){q.dispose();return}h="ready",f&&Z(f)},void 0,()=>{h="failed"});g.colorSpace=Dt,r.tileArt.map=g,r.hintArt.map=g;const M=new na(_).load(new URL("/White-Tower-Play/telegram/assets/markers-atlas-M4FshpTr.webp",import.meta.url).href,q=>{if(d){q.dispose();return}m="ready",f&&Z(f)},void 0,()=>{m="failed"});M.colorSpace=Dt,r.markerArt.map=M,r.chevronArt.map=M;let T=!1;const S=new na(_).load(new URL("/White-Tower-Play/telegram/assets/stone-atlas-C2ucdoOf.webp",import.meta.url).href,q=>{if(d){q.dispose();return}T=!0,l=void 0,f&&Z(f)},void 0,()=>{T=!1});S.colorSpace=Dt,r.stoneArt.map=S;let w=0,E=!1;const N=[],x=new qe(Ii.floor),b=new qe(Ii.chevron);let I={lost(){},restored(){}};const A=q=>{q.preventDefault(),I.lost()},P=()=>{f&&Z(f),I.restored()};n.addEventListener("webglcontextlost",A),n.addEventListener("webglcontextrestored",P);function R(q,oe,he,Ae,z=1,K=1,ae=a){const ue=new gn(q,oe);return ue.position.set(he.x,he.y,he.z),ue.scale.set(z,K,1),ue.renderOrder=Ae,ae.add(ue),ue}function U(q,oe,he,Ae,z,K){const ae=(q.u+q.v+1e3)*1e-5;let ue=Ae+1;for(let pe=z;pe<K;pe++){const Le=ca(q,pe),ie=fc(q.u,q.v,Le.rise,he),Ee=ae+.01+pe*1e-5,Pe=q.id===f?.hintStackId&&pe===Math.ceil(q.height)-1;if(R(s.shadow,r.shadow,{x:ie.x-4,y:ie.y-ni-4,z:Ee},ue++,Le.scale,Le.scale),h==="ready"){const ze=pe<Math.ceil(q.height)-1;R(s.whiteSprite,Pe?r.hintArt:r.tileArt,{x:ie.x,y:ie.y,z:Ee},ue++,Le.scale,Le.scale),ze&&R(s.coveredWhiteSprite,r.tileArt,{x:ie.x,y:ie.y,z:Ee},ue++,Le.scale,Le.scale);continue}R(s.tileSide,Pe?r.hintSide:r.sideLight,{x:ie.x,y:ie.y,z:Ee},ue++,Le.scale,Le.scale),R(s.tileBevel,Pe?r.hintBevel:r.tileBevel,{x:ie.x,y:ie.y,z:Ee+.001},ue++,Le.scale,Le.scale),R(s.tileTop,Pe?r.hintTop:r.tileTop,{x:ie.x,y:ie.y,z:Ee+.002},ue++,Le.scale,Le.scale)}const de=q.launchDirection;if(de&&K===Math.ceil(q.height)){const pe=ca(q,q.height-1),Le=fc(q.u,q.v,pe.rise,he),ie=pe.scale*(q.arrowScale??1),Ee=-(q.turnRotation??0);if(m==="ready")return R(s.arrowSprites[de],r.markerArt,{x:Le.x,y:Le.y,z:ae},ue++,ie,ie).rotation.z=Ee,ue+Math.max(1,oe.cells.length);R(s.arrows[de],r.arrowShadow,{x:Le.x-2,y:Le.y-5,z:ae},ue++,ie*1.06,ie*1.06).rotation.z=Ee,R(s.arrows[de],r.arrowSide,{x:Le.x,y:Le.y-3,z:ae},ue++,ie,ie).rotation.z=Ee,R(s.arrows[de],r.arrowBevel,{x:Le.x,y:Le.y,z:ae},ue++,ie,ie).rotation.z=Ee,R(s.arrows[de],q.id===f?.selectedStackId?r.selectedArrow:r.arrow,{x:Le.x,y:Le.y+1,z:ae+.03+q.height*1e-5},ue++,ie*.9,ie*.9).rotation.z=Ee}return ue+Math.max(1,oe.cells.length)}function B(q){u=q,f&&(f={...f,projection:u}),a.position.set(u.originX-ft.width/2,(ft.height/2-u.originY)*wn,0),a.scale.set(u.scale,u.scale*wn,1),o.position.copy(a.position),o.scale.copy(a.scale)}function Z(q){if(d||(a.clear(),N.length=0,f=q,B(q.projection??un(q.level,q.stacks)),!u))return;const oe={...u,originX:ft.width/2,originY:ft.height/2,scale:1},he=[...q.level.cells].sort(rs);if(l!==q.level){o.clear(),l=q.level;let z=-8500;for(const K of he){if(K.kind==="blocked")continue;const ae=dc(K.u,K.v,0,oe);if(T){R(s.stoneSprites[sv(K.u,K.v)],r.stoneArt,{x:ae.x,y:ae.y-12-sr,z:0},z++,1,1,o);continue}for(let ue=Mc-1;ue>=0;ue--)R(s.stoneSlab,r.landscape,{x:ae.x,y:ae.y-12-sr-ue*mo,z:0},z++,1,1,o)}}let Ae=1;for(const z of ev(q.level,q.stacks)){if(z.kind==="stack"){Ae=U(z.stack,q.level,oe,Ae+2,z.firstLayer,z.endLayer);continue}const K=z.cell,ae=dc(K.u,K.v,0,oe),ue=(K.u+K.v+1e3)*1e-5,de=q.stacks.some(pe=>Math.abs(pe.u-K.u)<.01&&Math.abs(pe.v-K.v)<.01&&ca(pe,0).rise<.15);if(h==="ready"?(R(s.yellowSprite,r.tileArt,{x:ae.x,y:ae.y,z:ue},Ae++),de&&R(s.coveredYellowSprite,r.tileArt,{x:ae.x,y:ae.y,z:ue},Ae++)):(R(s.floorSide,de?r.coveredFloorSide:r.floorSide,{x:ae.x,y:ae.y,z:ue},Ae++),R(s.floorBevel,de?r.coveredFloorBevel:r.floorBevel,{x:ae.x,y:ae.y,z:ue},Ae++),R(s.floor,r.floor,{x:ae.x,y:ae.y,z:ue},Ae++)),K.kind==="redirect"&&K.direction&&!q.stacks.some(pe=>pe.u===K.u&&pe.v===K.v)){if(m==="ready"){const ie=R(s.chevronSprites[K.direction],r.chevronArt,{x:ae.x,y:ae.y,z:ue},Ae++);N.push({mesh:ie,x:ae.x,y:ae.y,direction:K.direction});continue}const pe=R(s.chevrons[K.direction],r.chevronSide,{x:ae.x,y:ae.y-3,z:ue},Ae++);N.push({mesh:pe,x:ae.x,y:ae.y-3,direction:K.direction});const Le=R(s.chevrons[K.direction],r.chevron,{x:ae.x,y:ae.y,z:ue+.002},Ae++);N.push({mesh:Le,x:ae.x,y:ae.y,direction:K.direction})}}X()}function H(q){d||(c={width:Math.max(1,q.width),height:Math.max(1,q.height),pixelRatio:Math.min(Math.max(1,q.pixelRatio),2)},e.setPixelRatio(c.pixelRatio),e.setSize(c.width,c.height,!1),X())}function X(){if(d||c.width<=0||c.height<=0)return;const q=iv(w,E),oe=E?.7:(1-Math.cos(w*Math.PI*2/1.8))/2;for(const ue of[r.hintArt,r.hintTop,r.hintBevel,r.hintSide])ue.color.setRGB(1.2+oe*.6,.72+oe*.4,.22+oe*.12);r.chevron.color.copy(x).lerp(b,.85+q.intensity*.15),r.chevronArt.color.setScalar(.94+q.intensity*.06);for(const ue of N){const de=fo[ue.direction],pe=de.u-de.v,Le=de.u+de.v,ie=Math.hypot(pe,Le)||1;ue.mesh.position.x=ue.x+pe/ie*q.offset,ue.mesh.position.y=ue.y+Le/ie*q.offset}e.setScissorTest(!1),e.setViewport(0,0,c.width,c.height),e.clear(!0,!0,!0);const he=Math.min(c.width/ft.width,c.height/ft.height),Ae=ft.width*he,z=ft.height*he,K=(c.width-Ae)/2,ae=(c.height-z)/2;e.setScissorTest(!0),e.setScissor(K,ae,Ae,z),e.setViewport(K,ae,Ae,z),f&&e.render(t,i),e.setScissorTest(!1)}function W(q,oe){return u=oe.projection??un(oe.level,oe.stacks),Yu(Zu(q),oe.stacks,u)}function J(){return Object.freeze({geometries:e.info.memory.geometries,textures:e.info.memory.textures,programs:e.info.programs?.length??0,children:a.children.length+o.children.length})}function te(q){if(d||!f)throw new Error("The board renderer is unavailable.");const oe=f,he=c,Ae=w,z=E;try{return w=0,E=!0,H({...ft,pixelRatio:1}),Z(Ji(q,_c(q))),tv(n)}finally{w=Ae,E=z,Z(oe),H(he)}}function fe(){d||(d=!0,n.removeEventListener("webglcontextlost",A),n.removeEventListener("webglcontextrestored",P),a.clear(),o.clear(),s.stoneSprites.forEach(q=>q.dispose()),S.dispose(),s.stoneSlab.dispose(),s.floor.dispose(),s.floorBevel.dispose(),s.floorSide.dispose(),s.whiteSprite.dispose(),s.coveredWhiteSprite.dispose(),s.yellowSprite.dispose(),s.coveredYellowSprite.dispose(),Object.values(s.arrowSprites).forEach(q=>q.dispose()),Object.values(s.chevronSprites).forEach(q=>q.dispose()),g.dispose(),M.dispose(),s.shadow.dispose(),s.tileTop.dispose(),s.tileBevel.dispose(),s.tileSide.dispose(),Object.values(s.arrows).forEach(q=>q.dispose()),Object.values(s.chevrons).forEach(q=>q.dispose()),Object.values(r).forEach(q=>q.dispose()),e.dispose())}return Object.freeze({ready:p,setView:Z,setProjection:B,resize:H,render:X,capturePreview:te,pickStack:W,resourceCounts:J,artworkStatus:()=>({tiles:h,markers:m}),setPresentationTime(q,oe){w=q,E=oe},setContextCallbacks(q){I=q},dispose:fe})}function fv(){return Object.freeze({setView(){},resize(){},render(){},pickStack(){},resourceCounts:()=>Object.freeze({geometries:0,textures:0,programs:0,children:0}),dispose(){}})}function hc(n,e={}){const t=e.replaceCanvas?n.cloneNode(!1):n;t!==n&&n.parentNode?.replaceChild(t,n);try{if(e.mode==="unsupported")throw new Error("Simulated unavailable WebGL");return Object.freeze({renderer:(e.webglFactory??dv)(t),canvas:t,mode:"webgl",supported:!0})}catch{return Object.freeze({renderer:fv(),canvas:t,mode:"unsupported",supported:!1,message:"Не удалось запустить Three.js: WebGL недоступен. Перезагрузите игру или откройте другой браузер."})}}const ua=["scale","originX","originY"],da=16,hv={scale:5e-6,originX:.005,originY:.005},pv={scale:5e-5,originX:.05,originY:.05};function mv(){let n,e,t;const i={scale:0,originX:0,originY:0};return{reset(r){n=e=t=r;for(const s of ua)i[s]=0},synchronize(r=n){n=e=r},target(r){if(!n){n=e=t=r;return}t=r},update(r){if(!n||!t||!Number.isFinite(r)||r<=0)return!1;e=n;const s={...n,layerRise:t.layerRise},a=Math.exp(-da*r);for(const o of ua){const l=n[o]-t[o],c=i[o]+da*l;s[o]=t[o]+(l+c*r)*a,i[o]=(i[o]-da*c*r)*a,Math.abs(s[o]-t[o])<hv[o]&&Math.abs(i[o])<pv[o]&&(s[o]=t[o],i[o]=0)}return n=Object.freeze(s),ua.some(o=>n[o]!==e[o])},snapshot(r=1){if(!n||!e||r===1)return n;const s=Math.max(0,Math.min(1,r));return Object.freeze({scale:e.scale+(n.scale-e.scale)*s,originX:e.originX+(n.originX-e.originX)*s,originY:e.originY+(n.originY-e.originY)*s,layerRise:n.layerRise})}}}const ht=Object.freeze({stepMs:200,contact:.65,turnMs:80,arrowAppearMs:160,stopMs:700,reducedStepMs:80,reducedTurnMs:60,reducedArrowCollapseMs:30,reducedArrowAppearMs:30,reducedStopMs:70}),pc=Object.freeze({victoryDelayMs:100,failureDelayMs:600,ribbonMs:250,shineDelayMs:300,shineMs:250,fadeMs:180}),Ui=n=>n*n*(3-2*n);function gv(n,e){const t=Math.max(0,Math.min(1,n));return e?Ui(t):t<.65?1.12*Ui(t/.65):1.12-.12*Ui((t-.65)/.35)}function vv(n={}){let e=[],t=0,i=0,r=0,s=!1,a=!1,o=!1,l=!1,c=1,u=!1,f=[],d=[],h=[],m=1/0,_=!1,p=[];const g=160;let M=Object.freeze({active:!1,elapsedMs:0,durationMs:0,stacks:[]});function T(){const b=S();if(!p.length||t>=g)return p=[],b;const I=1-Ui(t/g);return Object.freeze({...b,stacks:b.stacks.map(A=>{const P=p.find(U=>U.id===A.id);if(!P)return A;const R=Math.max(0,A.height-P.height);return{...A,layerOffsets:Array.from({length:A.height},(U,B)=>(A.layerOffsets?.[B]??0)+(P.layerOffsets?.[B-R]??0)*I),layerScales:Array.from({length:A.height},(U,B)=>(A.layerScales?.[B]??1)+((P.layerScales?.[B-R]??1)-1)*I)}})})}function S(){if(!a||!e.length)return Object.freeze({active:!1,elapsedMs:t,durationMs:i,stacks:d});const b=u?i-t:t;if(u&&t===0)return Object.freeze({active:!0,elapsedMs:t,durationMs:i,stacks:f});let I=0;for(const A of e){const P=Math.max(0,Math.min(1,(b-I)/A.duration));if(P<1){if((A.kind==="stop"||A.kind==="turn")&&A.stackId){const X=P*A.duration*c,W=l?ht.reducedArrowCollapseMs:ht.turnMs,J=l?ht.reducedArrowAppearMs:ht.arrowAppearMs,te=A.from.map(fe=>{if(fe.id!==A.stackId)return fe;const q=X+1e-9<W,oe=q?1-Ui(X/W):A.direction?gv((X-A.revealAtMs)/J,l):0;return{...fe,...q?{}:{launchDirection:A.direction},...!l&&(A.kind==="stop"||A.waveElapsedMs!==void 0)?cc(fe.height,(A.waveElapsedMs??0)+X):{},arrowScale:oe}});return Object.freeze({active:!0,elapsedMs:t,durationMs:i,stacks:te,event:A.kind})}if(A.kind!=="move"||!A.stackId||!A.start||!A.end)return Object.freeze({active:!0,elapsedMs:t,durationMs:i,stacks:A.from,event:A.kind});const R=Math.min(1,P/ht.contact),U=Ui(R),B=P>=ht.contact,Z=A.heightTo-A.heightFrom,H=A.from.flatMap(X=>{if(X.id===A.absorbedId&&B)return[];if(X.id!==A.stackId)return[X];const W=B?A.heightTo:A.heightFrom,J=Z>0?Math.max(3,Z*.75):1.1,te=B?0:Z*U+(l?0:4*J*U*(1-U));return[{...X,u:A.start.u+(A.end.u-A.start.u)*U,v:A.start.v+(A.end.v-A.start.v)*U,height:W,lift:te,collecting:!!A.absorbedId&&!B,...!l&&B&&Z?cc(W,(P-ht.contact)*A.duration*c):{}}]});return Object.freeze({active:!0,elapsedMs:t,durationMs:i,stacks:H,event:A.absorbedId&&B?"merge":"move"})}I+=A.duration}return Object.freeze({active:!1,elapsedMs:t,durationMs:i,stacks:e.at(-1)?.to??d})}function w(b){if(o)return;const I=a&&_&&!b.reverse&&!b.reducedMotion?M.stacks:[];x(),p=I.filter(oe=>oe.layerOffsets||oe.layerScales),r=b.generationId,u=!!b.reverse,l=!!b.reducedMotion,c=Math.max(.25,Math.min(3,b.speed??1)),d=b.stacks.map(oe=>({...oe}));let A=d.map(oe=>({...oe,...oe.u===b.steps[0]?.from.u&&oe.v===b.steps[0]?.from.v?{launchDirection:b.steps[0].direction}:{}}));const P=[],R=[];let U=0;const B=oe=>{P.push(oe),A=oe.to.map(he=>({...he}))};b.steps.forEach((oe,he)=>{const Ae=A.find(pe=>pe.u===oe.from.u&&pe.v===oe.from.v);if(!Ae)return;const z=oe.absorbed?A.find(pe=>pe.u===oe.to.u&&pe.v===oe.to.v):void 0,K=A;let ae=A.filter(pe=>pe.id!==z?.id).map(pe=>pe.id===Ae.id?{...pe,u:oe.to.u,v:oe.to.v,height:oe.movingHeightAfter}:pe);const ue=(l?ht.reducedStepMs:ht.stepMs)/c;B({kind:"move",duration:ue,from:K,to:ae,stackId:Ae.id,start:oe.from,end:oe.to,heightFrom:oe.movingHeightBefore,heightTo:oe.movingHeightAfter,...z?{absorbedId:z.id}:{}}),oe.absorbed&&R.push(Object.freeze({atMs:U+ue*ht.contact,cue:"merge"})),U+=ue;const de=b.events.find(pe=>pe.type==="turn"&&pe.stepIndex===he);if(de?.type==="turn"&&de.direction!==Ae.launchDirection){R.push(Object.freeze({atMs:U,cue:"turn"}));const pe=A.map(Pe=>Pe.id===Ae.id?{...Pe,launchDirection:de.direction}:Pe),Le=!l&&oe.absorbed?(1-ht.contact)*ht.stepMs:void 0,ie=l?ht.reducedArrowCollapseMs:Math.max(ht.turnMs,Le===void 0?0:nv(oe.movingHeightAfter)-Le),Ee=(ie+(l?ht.reducedArrowAppearMs:ht.arrowAppearMs))/c;B({kind:"turn",duration:Ee,from:A,to:pe,stackId:Ae.id,direction:de.direction,revealAtMs:ie,...Le!==void 0?{waveElapsedMs:Le}:{}}),U+=Ee}});const Z=b.steps.length?d.find(oe=>oe.u===b.steps[0]?.from.u&&oe.v===b.steps[0]?.from.v)?.id:void 0,H=A.find(oe=>oe.id===Z)?.id??Z,X=b.steps.at(-1),J=(X?.absorbed?d.find(oe=>oe.u===X.to.u&&oe.v===X.to.v&&oe.id!==H):void 0)?.launchDirection,te=A.map(oe=>oe.id===H?{id:oe.id,u:oe.u,v:oe.v,height:oe.height,...J?{launchDirection:J}:{}}:oe),fe=l?ht.reducedArrowCollapseMs:ht.turnMs,q=Math.max(l?ht.reducedStopMs:ht.stopMs,J?fe+(l?ht.reducedArrowAppearMs:ht.arrowAppearMs):0)/c;Math.max(0,...A.map(oe=>oe.height))>=3&&R.push(Object.freeze({atMs:U+Math.min(120/c,q),cue:"settle"})),P.push({kind:"stop",duration:q,from:A,to:te,...J?{direction:J}:{},revealAtMs:fe,...H?{stackId:H}:{}}),m=u?1/0:U+(l?ht.reducedArrowCollapseMs:ht.turnMs)/c,f=b.finalStacks??te,h=Object.freeze(u?[]:R.sort((oe,he)=>oe.atMs-he.atMs)),e=P,t=0,i=P.reduce((oe,he)=>oe+he.duration,0),a=!0,s=!1,M=T(),e.length||E()}function E(){a&&(a=!1,t=i,M=Object.freeze({active:!1,elapsedMs:t,durationMs:i,stacks:u?d:f}),n.onComplete?.(r))}function N(b){if(o||!a||s||!Number.isFinite(b)||b<=0)return M;const I=t;t=Math.min(i,t+b*1e3);for(const A of h)if(A.atMs>I&&A.atMs<=t)try{n.onCue?.(A.cue)}catch{}return M=T(),!_&&t>=m&&(_=!0,n.onReady?.(r)),M=Object.freeze({...M,inputReady:_}),t>=i&&E(),M}function x(){a=!1,s=!1,e=[],t=0,i=0,d=[],f=[],h=[],u=!1,p=[],m=1/0,_=!1,M=Object.freeze({active:!1,elapsedMs:0,durationMs:0,stacks:[]})}return Object.freeze({start:w,update:N,snapshot:()=>M,pause(b){s=b},reset:x,dispose(){o||(x(),o=!0)}})}const ao="__whiteTowerStorage";class oo extends Error{constructor(e){super("Another tab saved newer progress. Reload to continue from that save."),this.current=e}}function ds(n){if(!n||typeof n!="object"||Array.isArray(n))return{revision:0,value:n};const e=n,t=e[ao];if(!t||!Number.isSafeInteger(t.revision)||t.revision<0)return{revision:0,value:n};const i={...e};return delete i[ao],{revision:t.revision,value:t.deleted?void 0:t.primitive?i.value:i}}function Tu(n,e){const t=!!n&&typeof n=="object"&&!Array.isArray(n);return{...t?n:{value:n},[ao]:{revision:e,deleted:n===void 0,primitive:!t}}}function Au(n,e,t){let i=0,r=!1,s=!1;async function a(o,l){if(s&&!l?.replace)throw new oo(ds(await e()).value);const c=await t(o,l?.replace?void 0:i);if(!c.accepted)throw s=!0,new oo(c.value);i=c.revision,s=!1}return{mode:n,async read(){const o=ds(await e());return r||(i=o.revision,r=!0),o.value},write:a,clear:()=>a(void 0,{replace:!0})}}const ei="white-tower.save.v1";function _v(){return new Promise((n,e)=>{if(typeof indexedDB>"u"){e(new Error("IndexedDB unavailable"));return}const t=indexedDB.open("white-tower",1);t.onupgradeneeded=()=>{t.result.objectStoreNames.contains("save")||t.result.createObjectStore("save")},t.onerror=()=>e(t.error??new Error("IndexedDB open failed")),t.onsuccess=()=>{const i=t.result;n(Au("indexeddb",()=>new Promise((a,o)=>{const c=i.transaction("save","readonly").objectStore("save").get(ei);c.onsuccess=()=>a(c.result),c.onerror=()=>o(c.error)}),(a,o)=>new Promise((l,c)=>{const u=i.transaction("save","readwrite"),f=u.objectStore("save"),d=f.get(ei);let h;d.onsuccess=()=>{const m=ds(d.result),_=o===void 0||m.revision===o;h={accepted:_,revision:m.revision+(_?1:0),value:_?a:m.value},_&&f.put(Tu(a,h.revision),ei)},u.oncomplete=()=>l(h),u.onerror=u.onabort=()=>c(u.error??new Error("IndexedDB write failed"))})))}})}function xv(){if(typeof localStorage>"u")throw new Error("localStorage unavailable");if(typeof navigator>"u"||!navigator.locks)throw new Error("Safe localStorage saves require Web Locks; using temporary progress.");const n=`${ei}.probe`;localStorage.setItem(n,"1"),localStorage.removeItem(n);const e=async()=>{const t=localStorage.getItem(ei);return t===null?void 0:JSON.parse(t)};return Au("localStorage",e,(t,i)=>navigator.locks.request(ei,async()=>{const r=ds(await e()),s=i===void 0||r.revision===i,a=r.revision+(s?1:0);return s&&localStorage.setItem(ei,JSON.stringify(Tu(t,a))),{accepted:s,revision:a,value:s?t:r.value}}))}function Sv(n={}){const e=n.adapters??[_v,xv];let t={mode:"memory",async read(){return r},async write(h){r=h}},i=-1,r,s="memory",a=Promise.resolve(),o="",l=!1;const c=(async()=>{for(let h=0;h<e.length;h++)try{const m=await e[h]();await m.read(),t=m,i=h,s=m.mode;break}catch(m){o=m instanceof Error?m.message:String(m)}return s})();async function u(){await c;try{const h=await t.read();return r=h,h}catch(h){o=h instanceof Error?h.message:String(h);for(let m=i+1;m<e.length;m++)try{const _=await e[m](),p=await _.read();return t=_,i=m,s=_.mode,r=p,p}catch(_){o=_ instanceof Error?_.message:String(_)}return t={mode:"memory",async read(){return r},async write(m){r=m}},s="memory",r}}function f(h,m){return a=a.then(async()=>{await c,r=h;try{await t.write(h,m),l=!1}catch(_){if(_ instanceof oo){l=!0,r=_.current,o=_.message;return}o=_ instanceof Error?_.message:String(_);let p=!1;for(let g=i+1;g<e.length;g++)try{const M=await e[g]();await M.read(),await M.write(h,m),t=M,i=g,s=M.mode,p=!0;break}catch(M){o=M instanceof Error?M.message:String(M)}p||(t={mode:"memory",async read(){return r},async write(g){r=g}},i=e.length,s="memory")}}),a}function d(){return a=a.then(async()=>{await c,r=void 0,l=!1;try{await t.clear?.();return}catch(h){o=h instanceof Error?h.message:String(h)}for(let h=i+1;h<e.length;h++)try{const m=await e[h]();await m.read(),await m.clear?.(),t=m,i=h,s=m.mode;return}catch(m){o=m instanceof Error?m.message:String(m)}t={mode:"memory",async read(){return r},async write(h){r=h},async clear(){r=void 0}},i=e.length,s="memory"}),a}return Object.freeze({ready:c,read:u,write:f,clear:d,mode:()=>s,memoryOnly:()=>s==="memory",conflicted:()=>l,unavailableReason:()=>o,flush:()=>a})}const Fo=1,Mv=new Set(["SE","SW","NW","NE","E","W","N","S"]),pr=n=>typeof n=="object"&&n!==null&&!Array.isArray(n);function lo(n){return Object.freeze({schemaVersion:Fo,...n})}function Zi(n,e,t){if(!pr(n)||n.schemaVersion!==Fo||!["1.0.0","1.1.0","1.2.0","1.3.0","1.4.0","1.5.0"].includes(String(n.contentVersion))||typeof n.selectedLevelId!="string")return n;const i=e.levels.find(r=>r.id===n.selectedLevelId);if(!i)return n;if(n.levelChecksum!==i.sha256){if(!t||t.id!==i.id)return n;const r={...n,contentVersion:e.contentVersion,levelChecksum:i.sha256,committedState:_c(t),history:[]};return is(r,e,new Map([[t.id,t]])).ok?r:n}return{...n,contentVersion:e.contentVersion}}function mc(n,e){if(!pr(n)||n.levelId!==e.id||!Number.isSafeInteger(n.moveCount)||Number(n.moveCount)<0||!Array.isArray(n.stacks)||!n.stacks.length)return!1;let t=0;const i=new Set,r=new Set(e.cells.map(s=>`${s.u},${s.v}`));for(const s of n.stacks){if(!pr(s)||!Number.isSafeInteger(s.u)||!Number.isSafeInteger(s.v)||!Number.isSafeInteger(s.height)||Number(s.height)<1||!r.has(`${s.u},${s.v}`)||typeof s.id!="string"||!s.id||s.launchDirection!==void 0&&!Mv.has(String(s.launchDirection)))return!1;const a=`${s.u},${s.v}`;if(i.has(a))return!1;i.add(a),t+=Number(s.height)}return t===e.totalTiles}function is(n,e,t){if(!pr(n))return{ok:!1,reason:"Save must be an object."};if(n.schemaVersion!==Fo)return{ok:!1,reason:`Unsupported save schema: ${String(n.schemaVersion)}.`};if(n.contentVersion!==e.contentVersion||typeof n.selectedLevelId!="string")return{ok:!1,reason:"Save content version or selected level is invalid."};const i=e.levels.find(s=>s.id===n.selectedLevelId),r=t.get(n.selectedLevelId);return!i||!r||n.levelChecksum!==i.sha256?{ok:!1,reason:"Saved level checksum does not match current content."}:!Number.isSafeInteger(n.unlockedLevel)||Number(n.unlockedLevel)<1||Number(n.unlockedLevel)>e.levels.length+1?{ok:!1,reason:"Unlocked level is outside the catalog."}:!Array.isArray(n.completedLevelIds)||n.completedLevelIds.some(s=>typeof s!="string"||!e.levels.some(a=>a.id===s))?{ok:!1,reason:"Completed levels contain unknown IDs."}:!pr(n.settings)||!mc(n.committedState,r)||!Array.isArray(n.history)||n.history.length>50||n.history.some(s=>!mc(s,r))?{ok:!1,reason:"Saved game state or undo history is invalid."}:{ok:!0,value:lo({contentVersion:n.contentVersion,levelChecksum:n.levelChecksum,selectedLevelId:n.selectedLevelId,unlockedLevel:Number(n.unlockedLevel),completedLevelIds:Object.freeze([...new Set(n.completedLevelIds)]),settings:Object.freeze({...n.settings}),committedState:n.committedState,history:Object.freeze(n.history.slice(-50))})}}const Cu={en:{"service.loading":"Loading level…","service.contentError":"Could not load White Tower content. Check the connection and retry.","service.graphicsError":"Graphics could not start. Try another browser or reload.","service.nextError":"Could not load the next level. Try again.","service.notReady":"Next level is not ready.","service.moreLevels":"More levels are coming soon.",settings:"Settings",back:"BACK TO GAME",levels:"Choose level",backSettings:"BACK TO SETTINGS",hint:"Hint",fail:"FAIL!",reducedMotion:"Reduce motion",language:"Language",highContrast:"High contrast",sound:"Sound effects",music:"Music",volume:"Volume",progress:"Campaign progress",clearProgress:"Clear progress",clearQuestion:"Clear all completed levels and saved attempts?",confirmClear:"CLEAR PROGRESS",cancel:"CANCEL",locked:"Locked",completed:"Completed",current:"Current level",memory:"Progress is temporary because browser storage is unavailable.",retry:"Retry storage",audioLater:"Short synthesized effects play after your first input.",level:"Level",undo:"BACK",next:"NEXT",win:"COMPLETED!",campaignComplete:"Campaign complete. Choose any unlocked level.",chooseLevel:"CHOOSE LEVEL",tapHighlighted:"Tap the highlighted arrow",searching:"Searching for a safe move…",hintTimeout:"Search timed out. You can try Undo; no dead end was proven.",noSolution:"No solution exists from this state.",searchingPrevious:"Checking whether the previous move can be undone…","action.undo":"UNDO","action.next":"NEXT","win.title":"LEVEL COMPLETED!","tutorial.tap":"Tap the arrow","hint.undo":"Undo the last move","game.stuck":"Try undoing a move","action.retry":"Retry","hint.loading":"Searching for a safe move…","a11y.selection":"Selected stack {index} of {count}.","a11y.move":"Move started.","a11y.undo":"Move undone.","a11y.restart":"Level restarted.","a11y.menu":"Settings opened. Press Escape to return to the game."},ru:{"service.loading":"Загрузка уровня…","service.contentError":"Не удалось загрузить игру. Проверьте соединение и повторите попытку.","service.graphicsError":"Не удалось запустить графику. Попробуйте другой браузер или повторите загрузку.","service.nextError":"Не удалось загрузить следующий уровень. Повторите попытку.","service.notReady":"Следующий уровень ещё не готов.","service.moreLevels":"Новые уровни скоро появятся.",settings:"Настройки",back:"ВЕРНУТЬСЯ В ИГРУ",levels:"Выбор уровня",backSettings:"К НАСТРОЙКАМ",hint:"Подсказка",fail:"НЕУДАЧА!",reducedMotion:"Уменьшить движение",language:"Язык",highContrast:"Высокая контрастность",sound:"Звуковые эффекты",music:"Музыка",volume:"Громкость",progress:"Прогресс кампании",clearProgress:"Сбросить прогресс",clearQuestion:"Удалить пройденные уровни и сохранённые попытки?",confirmClear:"СБРОСИТЬ ПРОГРЕСС",cancel:"ОТМЕНА",locked:"Закрыт",completed:"Пройден",current:"Текущий уровень",memory:"Прогресс временный: хранилище браузера недоступно.",retry:"Повторить загрузку",audioLater:"Короткие синтезированные звуки включаются после первого действия.",level:"Уровень",undo:"НАЗАД",next:"ДАЛЕЕ",win:"ПРОЙДЕН!",campaignComplete:"Кампания пройдена. Выберите открытый уровень.",chooseLevel:"ВЫБРАТЬ УРОВЕНЬ",tapHighlighted:"Нажмите на выделенную стрелку",searching:"Ищу безопасный ход…",hintTimeout:"Поиск не завершился. Можно отменить ход; тупик не доказан.",noSolution:"Из этого состояния решения нет.",searchingPrevious:"Проверяю, можно ли отменить предыдущий ход…","action.undo":"НАЗАД","action.next":"ДАЛЕЕ","win.title":"УРОВЕНЬ ПРОЙДЕН!","tutorial.tap":"Нажмите на стрелку","hint.undo":"Отмените последний ход","game.stuck":"Попробуйте отменить ход","action.retry":"Повторить","hint.loading":"Ищу безопасный ход…","a11y.selection":"Выбрана стопка {index} из {count}.","a11y.move":"Ход запущен.","a11y.undo":"Ход отменён.","a11y.restart":"Уровень перезапущен.","a11y.menu":"Настройки открыты. Нажмите Escape, чтобы вернуться в игру."}};function yv(n,e){return Cu[n][e]}function Ke(n,e){return Cu.en[e]}function Jn(n){const e=typeof n=="object"&&n!==null?n:{};return Object.freeze({language:"en",reducedMotion:e.reducedMotion===!0,highContrast:e.highContrast===!0,soundEnabled:e.soundEnabled!==!1,musicEnabled:typeof e.musicEnabled=="boolean"?e.musicEnabled:e.soundEnabled!==!1,soundVolume:typeof e.soundVolume=="number"&&Number.isFinite(e.soundVolume)?Math.max(0,Math.min(1,e.soundVolume)):.4,tutorialCompleted:e.tutorialCompleted===!0})}const Ki=(n,e)=>({status:"cancelled",requestId:n,generationId:e,explored:0,elapsedMs:0});function bv(n=()=>new Worker(new URL("/White-Tower-Play/telegram/assets/solver-worker-B2mz6gOz.js",import.meta.url),{type:"module"})){let e,t=0,i=!1;const r=new Map;function s(f){for(const[d,h]of r)h.resolve(f?{status:"error",requestId:d,generationId:h.generationId,explored:0,elapsedMs:0,message:f}:Ki(d,h.generationId));r.clear()}function a(){return e||(e=n(),e.onmessage=f=>{const d=f.data,h=r.get(d.requestId);h&&(r.delete(d.requestId),h.generationId!==t||d.generationId!==t?h.resolve(Ki(d.requestId,h.generationId)):h.resolve(d))},e.onerror=f=>s(f.message||"Solver worker failed."),e)}function o(f,d,h){return i?Promise.resolve(Ki(h.requestId,h.generationId)):!h.requestId||!Number.isFinite(h.budgetMs)||h.budgetMs<0?Promise.resolve({status:"error",requestId:h.requestId,generationId:h.generationId,explored:0,elapsedMs:0,message:"Invalid request options."}):h.generationId<t?Promise.resolve(Ki(h.requestId,h.generationId)):(h.generationId>t&&c(h.generationId),r.has(h.requestId)?Promise.resolve({status:"error",requestId:h.requestId,generationId:h.generationId,explored:0,elapsedMs:0,message:"Duplicate request ID."}):new Promise(m=>{r.set(h.requestId,{generationId:h.generationId,resolve:m});try{a().postMessage({type:"solve",requestId:h.requestId,generationId:h.generationId,budgetMs:h.budgetMs,level:f,state:d})}catch(_){r.delete(h.requestId),m({status:"error",requestId:h.requestId,generationId:h.generationId,explored:0,elapsedMs:0,message:_ instanceof Error?_.message:String(_)})}}))}function l(f){if(!(!r.has(f)||!e))try{e.postMessage({type:"cancel",requestId:f})}catch{}}function c(f){if(!(i||f<=t)){t=f;for(const[d,h]of r)if(h.generationId!==t){try{e?.postMessage({type:"cancel",requestId:d})}catch{}h.resolve(Ki(d,h.generationId)),r.delete(d)}}}function u(){i||(i=!0,s(),e?.terminate(),e=void 0)}return Object.freeze({solve:o,cancel:l,invalidate:c,dispose:u})}const Yr=Object.freeze({kind:"idle"});function Ev(n,e){let t=0,i=0,r="",s,a=!1;function o(){a||(s!==void 0&&clearTimeout(s),s=void 0,r&&n.cancel(r),r="",t++,n.invalidate(t),e(Yr))}async function l(u,f,d){if(a)return;o();const h=t,m=performance.now(),_=`hint-${++i}`;r=_,e({kind:"idle"}),s=setTimeout(()=>{!a&&t===h&&r&&e({kind:"searching"})},300);const p=()=>!a&&t===h;try{const g=await n.solve(u,f,{requestId:_,generationId:h,budgetMs:2e3});if(!p())return;if(g.status==="solved"){s!==void 0&&clearTimeout(s),s=void 0;const M=g.path[0];e(M?{kind:"move",move:M}:Yr),r="";return}if(g.status==="unsolvable"){const M=d.at(-1),T=Math.max(0,2e3-(performance.now()-m));if(!M||T<=0){s!==void 0&&clearTimeout(s),s=void 0,e({kind:"deadlock"}),r="";return}s===void 0&&e({kind:"searching"});const S=`hint-${i}-undo`;r=S;const w=await n.solve(u,M,{requestId:S,generationId:h,budgetMs:T});if(!p())return;s!==void 0&&clearTimeout(s),s=void 0,w.status==="solved"?e({kind:"undo-proven"}):w.status==="unsolvable"?e({kind:"deadlock"}):w.status==="timeout"?e({kind:"undo-suggestion"}):e(w.status==="cancelled"?Yr:{kind:"error"}),r="";return}s!==void 0&&clearTimeout(s),s=void 0,g.status==="timeout"?e(d.length?{kind:"undo-suggestion"}:{kind:"timeout"}):e(g.status==="cancelled"?Yr:{kind:"error"}),r=""}catch{p()&&(e({kind:"error"}),r="")}}function c(){a||(o(),a=!0)}return Object.freeze({request:l,cancel:o,dispose:c})}function wv(n,e="webgl",t={}){const i=t.audio,r=t.analytics;let s=0;const a=new Set;function o(L,D={}){const ee=m.snapshot();r?.track(L,{..._?{mode:"challenge"}:r.context(),level_id:ee.level?.id??null,content_version:x?.contentVersion??null,active_ms:Math.round(s*1e3),move_count:ee.committedState?.moveCount??0,...D})}function l(L=!0,D=!1){s=0,!_&&b&&x&&r?.beginAttempt(b.id,x.contentVersion,D,L)}function c(L){const D=_?`challenge:${_.serial}:${L.attemptId}`:r?.context().attempt_id;L.phase==="Won"&&D&&!a.has(D)&&(a.add(D),_?ys(r,"wt_challenge_completed",b.id,x.contentVersion,"challenge",D):o("wt_level_completed"),!_&&x?.levels.at(-1)?.id===L.level?.id&&o("wt_campaign_completed"))}let u=n,f=hc(n,{mode:e}),d=f.renderer;const h=Uu();let m=h.current,_,p=0,g=!1,M=!1;const T=new AbortController,S=t.store??Sv();let w=Promise.resolve();const E=vv({onCue:L=>i?.play(L),onReady:L=>{const D=m.snapshot();if(D.phase!=="Animating"||D.generationId!==L||D.animation?.won||D.animation?.reverse)return;const ee=m.finishAnimation(L);He(),et(ee)},onComplete:L=>{if(m.snapshot().phase!=="Animating"||m.snapshot().generationId!==L)return;const D=m.snapshot().animation?.reverse,ee=m.finishAnimation(L);ee.phase==="Won"&&!D&&(i?.play("victory"),c(ee)),v(ee),He(),et(ee)}});function N(L){const D=L.animation;E.start({stacks:D.sourceState.stacks,steps:D.steps,events:D.events,generationId:L.generationId,reducedMotion:z.reducedMotion,reverse:D.reverse,finalStacks:D.nextState.stacks}),V(E.snapshot().stacks,L)}let x,b,I=0,A=0,P,R,U;const B=mv();let Z=!1,H=!1,X=!1,W,J=!1,te="",fe=0,q,oe=!1,he=1;const Ae=Jn({reducedMotion:typeof window<"u"&&!!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches});let z=Ae,K=0,ae=!1,ue=Object.freeze({kind:"idle"}),de,pe=0,Le;const ie=bv();let Ee,Pe=!1;function ze(L){if(!H)if(ue=L,L.kind!=="idle"&&L.kind!=="searching"&&(o("wt_hint_result",{result:L.kind,hint_latency_ms:Ee===void 0?0:Math.round(performance.now()-Ee)}),Ee=void 0),de=void 0,pe=["move","undo-proven","undo-suggestion","deadlock","timeout","error"].includes(L.kind)?2.5:0,L.kind==="move"){const D=C().find(ee=>ee.u===L.move.u&&ee.v===L.move.v);D&&(de=D.id,Q(D.id))}else m.snapshot().phase!=="Animating"&&v()}const Ye=Ev(ie,ze);function ct(L){const D=x.levels.find(ee=>ee.id===L.level.id);return lo({contentVersion:x.contentVersion,levelChecksum:D.sha256,selectedLevelId:L.level.id,unlockedLevel:he,completedLevelIds:L.completedLevelIds,settings:z,committedState:L.committedState,history:m.historySnapshot()})}async function _t(L,D,ee){if(!Pe){Pe=!0,L==="hint"&&ze({kind:"searching"}),t.helpState?.(!0);try{const j=D.generationId,Me=await t.help.perform(L,ct(D),()=>!H&&!oe&&m.snapshot().generationId===j);Me&&ee(Me)}catch(j){L==="hint"&&ze({kind:"idle"}),await t.helpError?.(L,j)}finally{Pe=!1,t.helpState?.(!1)}}}function Xe(){Le!==void 0&&clearTimeout(Le),Le=void 0}function et(L=m.snapshot()){if(Xe(),L.phase!=="Idle"||!L.committedState||L.committedState.stacks.length<2||C(L).length)return;const D=L.generationId;Le=setTimeout(()=>{Le=void 0;const ee=m.snapshot();H||ee.phase!=="Idle"||ee.generationId!==D||C(ee).length||(ue=Object.freeze({kind:"deadlock"}),pe=2,o("wt_deadlock"))},600)}function F(){if(g||Pe)return;let L=m.snapshot();return L.phase==="Menu"&&(L=m.closeMenu(),v(L)),L.phase!=="Idle"||!L.level||!L.committedState?!1:(Xe(),Ee=performance.now(),o("wt_hint_requested"),t.help?(_t("hint",L,ze),!0):(Ye.request(L.level,L.committedState,m.historySnapshot()),i?.play("hint"),!0))}function pt(){z.tutorialCompleted||(z=Jn({...z,tutorialCompleted:!0}),ae=!1)}function He(){if(_||g||M)return w;const L=m.snapshot(),D=x?.levels.find(We=>We.id===L.level?.id);if(!D||!L.level||!L.committedState)return w;const ee=L.completedLevelIds;let j=1;for(;j<=x.levels.length&&ee.includes(x.levels[j-1]?.id??"");)j++;he=Math.max(he,j);const Me=lo({contentVersion:x.contentVersion,levelChecksum:D.sha256,selectedLevelId:L.level.id,unlockedLevel:he,completedLevelIds:ee,settings:z,committedState:L.committedState,history:m.historySnapshot()});return w=S.write(Me),w}function C(L=m.snapshot()){if(L.phase!=="Idle"||!L.level||!L.displayedState)return[];const D=new Map(L.level.cells.map(j=>[`${j.u},${j.v}`,j])),ee=P??un(L.level,L.displayedState.stacks);return L.displayedState.stacks.filter(j=>!!j.launchDirection||D.get(`${j.u},${j.v}`)?.kind==="redirect").map(j=>({stack:j,center:ss(j.u,j.v,j.height-1,ee)})).sort((j,Me)=>j.center.y-Me.center.y||j.center.x-Me.center.x||j.stack.id.localeCompare(Me.stack.id)).map(({stack:j})=>j)}function v(L=m.snapshot()){if(!L.level||!L.committedState||H)return;A++;const D=C(L);D.length&&!D.some(We=>We.id===W)&&(W=D[0]?.id);const ee=X?{...L.committedState,stacks:[{...L.committedState.stacks[0],height:L.level.totalTiles}]}:L.committedState,j=un(L.level,ee.stacks);U!==L.level?(U=L.level,B.reset(j),P=j):B.target(j);const Me=L.phase==="Idle"&&E.snapshot().active&&E.snapshot().inputReady?E.snapshot().stacks:ee.stacks;d.setView({...Ji(L.level,ee,A,W,Me,P),hintStackId:de})}function V(L,D=m.snapshot()){if(!(!D.level||!D.committedState||H)){if(A++,R!==D.generationId||!P){R=D.generationId;const ee=D.animation?.steps.flatMap(j=>[j.from,j.to].map(Me=>({...Me,height:j.movingHeightAfter,lift:Math.max(3,j.movingHeightAfter*.75)})))??[];B.target(un(D.level,[...D.displayedState.stacks,...D.committedState.stacks,...ee]))}d.setView({...Ji(D.level,D.committedState,A,W,L,P),hintStackId:de})}}function Q(L){return C().some(D=>D.id===L)?(W=L,v(),!0):!1}function re(L){if(g||Pe||oe||!f.supported)return!1;const D=C().find(j=>j.id===L);if(!D)return!1;W=L,Xe();const ee=m.launch({u:D.u,v:D.v});return ee.phase!=="Animating"?!1:(de===L&&o("wt_hint_applied"),!_&&ee.committedState.moveCount===1&&r?.track("wt_first_move",{...r.context(),active_ms:Math.round(s*1e3)},"first:"+r.context().attempt_id),o("wt_move_accepted",{input:matchMedia("(pointer:coarse)").matches?"touch":"pointer"}),i?.play("launch"),Ye.cancel(),pt(),He(),N(ee),!0)}function me(){if(g||Pe)return!1;const L=m.snapshot();return Ye.cancel(),ae=!1,L.phase==="Menu"?(v(m.closeMenu()),o("wt_menu_closed"),i?.play("ui"),!0):L.phase==="Idle"||L.phase==="Won"?(v(m.openMenu()),o("wt_menu_opened"),i?.play("ui"),!0):!1}function ve(L){const D=m.snapshot(),ee=D.displayedState?.stacks.find(j=>j.id===L);if(!(!ee||!D.level))return Zr(ss(ee.u,ee.v,ee.height-1,P??un(D.level,D.displayedState.stacks)))}function se(L){if(Pe)return!1;const D=m.snapshot();if(H||!["webgl","unsupported"].includes(L)||!["Idle","Won","Menu"].includes(D.phase))return!1;const ee=hc(u,{mode:L,replaceCanvas:!0}),j=d;return oe=!1,f=ee,d=ee.renderer,u=ee.canvas,ce(),j?.dispose(),v(D),!0}function ce(){d?.setContextCallbacks?.({lost(){H||(oe=!0,o("wt_graphics_lost"),B.synchronize(P),te="Graphics context lost. Attempting to restore the current board.",He())},restored(){o("wt_graphics_restored"),!H&&(oe=!1,te="",m.snapshot().phase==="Animating"?V(E.snapshot().stacks):v(m.snapshot()))}})}async function ge(L,D=!1){if(_||g||Pe)throw new Error("Return to your campaign first.");if(!x||H)throw new Error("Каталог ещё загружается.");const ee=++fe;q?.abort(),q=new AbortController;const j=q;E.reset(),Ye.cancel(),K=0,ae=!1,Xe();const Me=m.snapshot();Me.phase==="Animating"&&v(m.finishAnimation(Me.generationId));const We=await Nn(x,L,fetch,j.signal);H||ee!==fe||(b=We,X=!1,v(m.loadLevel(b)),D&&m.restoreCompleted([]),l(),await He(),et(m.snapshot()))}async function Ne(L){if(_||g||Pe)return!1;const D=x?.levels.findIndex(ee=>ee.id===L)??-1;return D<0||D+1>he||!["Menu","Idle","Won"].includes(m.snapshot().phase)?!1:(await ge(L),!0)}function ye(L){return Pe||(z=Jn({...z,...L}),z.reducedMotion&&E.snapshot().inputReady&&m.snapshot().phase!=="Animating"&&(E.reset(),v()),o("wt_settings_changed",{sound:z.soundEnabled,music:z.musicEnabled}),i?.configure(z),He()),z}async function xe(){return _||g||Pe||M||H||!x?!1:(await S.clear(),he=1,te="",await ge(x.levels[0].id,!0),!0)}async function Ue(){if(_||g||Pe)return{advanced:!1,message:"Return to your campaign first."};const L=m.snapshot();if(H||L.phase!=="Won"||J)return{advanced:!1,message:Ke(z.language,"service.notReady")};const D=x?.levels.findIndex(j=>j.id===L.level?.id)??-1,ee=x?.levels[D+1];if(!ee)return{advanced:!1,message:Ke(z.language,"service.moreLevels")};J=!0;try{return await w,o("wt_next_level_requested"),await ge(ee.id),o("wt_next_level_started"),{advanced:!0}}catch{return o("wt_content_error",{stage:"next"}),{advanced:!1,message:Ke(z.language,"service.nextError")}}finally{J=!1}}function Be(){E.reset(),Ye.cancel(),Xe(),ue=Object.freeze({kind:"idle"}),de=void 0,pe=0,W=void 0,ae=!1,K=0}async function Ve(L){const D=x&&Jo(x,L);if(!D||H)return;const ee=await Nn(x,D.levelId,fetch,T.signal);if(await d.ready,!H){if(!d.capturePreview)throw new Error("The board preview is unavailable.");return{descriptor:D,level:ee,image:d.capturePreview(ee)}}}async function k(L){if(H||_||g||Pe||!["Idle","Won"].includes(m.snapshot().phase))return!1;const D=x&&Jo(x,L);if(!D)return!1;g=!0;try{await w,await S.flush();const ee=JSON.stringify(await S.read()),j=await Nn(x,D.levelId,fetch,T.signal);return H||!["Idle","Won"].includes(m.snapshot().phase)?!1:(_={level:b,settings:z,elapsed:I,analyticsTime:s,tutorialVisible:ae,tutorialElapsed:K,selectedStackId:W,stored:ee,serial:++p},Be(),m=h.enter(j),b=j,I=0,s=0,X=!1,v(m.snapshot()),et(),ys(r,"wt_challenge_started",b.id,x.contentVersion,"challenge"),!0)}finally{g=!1}}async function Se(){if(!_||g||Pe||H)return!1;g=!0;try{const L=await S.read(),D=JSON.stringify(L)!==_.stored;let ee,j;if(D&&L){const We=x.levels.find(Et=>Et.id===L.selectedLevelId);if(We){j=await Nn(x,We.id,fetch,T.signal);const Et=is(Zi(L,x,j),x,new Map([[We.id,j]]));Et.ok&&(ee=Et.value)}}else D&&(j=await Nn(x,x.levels[0].id,fetch,T.signal));if(H)return!1;const Me=_;return Be(),m=h.leave(),_=void 0,b=Me.level,z=Me.settings,I=Me.elapsed,s=Me.analyticsTime,ae=Me.tutorialVisible,K=Me.tutorialElapsed,W=Me.selectedStackId,D&&(M=!0,te="Another tab saved newer progress. Reload to continue from that save.",ee&&j?(b=j,z=Jn(ee.settings),he=ee.unlockedLevel,m.loadLevel(b),m.restoreCompleted(ee.completedLevelIds),m.restoreAttempt(ee.committedState,ee.history),l(!1,!0)):!L&&j&&(b=j,z=Ae,he=1,m.loadLevel(b),m.restoreCompleted([]),l(!1))),i?.configure(z),X=!1,v(m.snapshot()),et(),!0}finally{g=!1}}ce();const le=(t.catalogReady??Sc()).then(async L=>{if(H)return;x=L,await S.ready;const D=await S.read();let ee=!1,j=Zi(D,x);const Me=j&&typeof j=="object"&&"selectedLevelId"in j&&typeof j.selectedLevelId=="string"?j.selectedLevelId:x.levels[0]?.id,We=x.levels.some(Ft=>Ft.id===Me)?x.levels.find(Ft=>Ft.id===Me):x.levels[0];if(!We)throw new Error("Catalog has no starting level.");if(b=await Nn(x,We.id),H)return;if(j=Zi(D,x,b),v(m.loadLevel(b)),j!==void 0){const Ft=is(j,x,new Map([[b.id,b]]));if(Ft.ok){if(he=Ft.value.unlockedLevel,z=Jn(Ft.value.settings),j!==D&&j.committedState!==D?.committedState&&(te=z.language==="ru"?"Уровень обновлён. Попытка начата заново; прогресс и настройки сохранены.":"Level updated. This attempt was restarted; campaign progress and settings are preserved."),m.restoreCompleted(Ft.value.completedLevelIds),m.restoreAttempt(Ft.value.committedState,Ft.value.history),m.snapshot().phase==="Won"){const kt=x.levels.findIndex(sn=>sn.id===b.id)+1,Wn=x.levels[kt];if(Wn){const sn=await Nn(x,Wn.id);if(H)return;b=sn,m.loadLevel(b),he=Math.max(he,kt+1),ee=!0}}}else if(te=z.language==="ru"?`Сохранение не восстановлено: ${Ft.reason}`:`Save could not be restored: ${Ft.reason}`,typeof j=="object"&&j!==null&&!Array.isArray(j)){const kt=j;z=Jn(kt.settings);const Wn=Array.isArray(kt.completedLevelIds)?kt.completedLevelIds.filter(sn=>typeof sn=="string"&&x.levels.some(Ss=>Ss.id===sn)):[];m.restoreCompleted(Wn),Number.isSafeInteger(kt.unlockedLevel)&&kt.unlockedLevel>=1&&kt.unlockedLevel<=x.levels.length+1&&(he=kt.unlockedLevel)}}v(m.snapshot()),ee?await He():(j===void 0||j!==D||j?.settings?.rendererMode!==void 0)&&He(),(z.tutorialCompleted||m.snapshot().committedState?.moveCount)&&(ae=!1,z.tutorialCompleted||(pt(),He())),et(m.snapshot());let Et,Gt;try{Gt=await Promise.race([ie.solve(b,m.snapshot().committedState,{requestId:"startup-warmup",generationId:0,budgetMs:0}),new Promise((Ft,kt)=>{Et=setTimeout(()=>kt(new Error("Hint worker startup timed out.")),15e3)})])}finally{clearTimeout(Et)}if(Gt.status==="error")throw new Error("Could not prepare hint worker.");return l(!0,j!==void 0&&!ee),b});return Object.freeze({ready:le,startAnalytics:l,previewChallenge:Ve,startChallenge:k,leaveChallenge:Se,challengeDescriptor:()=>x&&Nu(x,m.snapshot().level?.id),trackChallenge(L){const D=m.snapshot();ys(r,L,b?.id??"",x?.contentVersion??"",_?"challenge":"campaign",L==="wt_challenge_share_shown"?`${L}:${_?.serial??0}:${D.attemptId}`:void 0)},resourceReady:()=>d.ready??Promise.resolve(),contentVersion:()=>x?.contentVersion,get canvas(){return u},rendererInfo(){return Object.freeze({mode:f.mode,supported:f.supported&&!oe,artwork:d.artworkStatus?.(),message:oe?"Восстанавливаем графику Three.js…":f.message})},setRendererMode:se,selectableStacks:C,selectedStackId(){return W},pointForStack:ve,selectStack:Q,launchStack:re,toggleMenu:me,update(L){if(oe||!f.supported)return;I+=L,(m.snapshot().phase==="Idle"||m.snapshot().phase==="Animating")&&(s+=L);const D=B.update(L);d.setPresentationTime?.(I,z.reducedMotion);const ee=m.snapshot();ee.phase==="Animating"||ee.phase==="Idle"&&E.snapshot().active?V(E.update(L).stacks):(D&&v(ee),ee.phase==="Idle"&&ee.level?.id==="level-001"&&!z.tutorialCompleted&&(K+=L,K>=2&&!ae&&(ae=!0,o("wt_tutorial_shown")))),pe>0&&(pe=Math.max(0,pe-L),pe||(ue=Object.freeze({kind:"idle"})))},pause(L){Z=L,B.synchronize(P),E.pause(L),L&&(Ye.cancel(),Xe(),ae=!1)},render(L){oe||(!Z&&L!==void 0&&(P=B.snapshot(L)),P&&d.setProjection?.(P),d.render())},resize(L){d.resize(L)},reset(){if(g||Pe)return;I=0,X=!1,E.reset(),P&&B.reset(P),Ye.cancel(),K=0,ae=!1,Xe();const L=m.snapshot();if(L.phase==="Animating"&&m.finishAnimation(L.generationId),b){const D=m.restart();v(D),He(),et(D),D.attemptId!==L.attemptId&&(o("wt_restart"),l(),i?.play("restart"))}},async setLevelById(L){return ge(L)},async selectLevel(L){return Ne(L)},updateSettings:ye,async clearProgress(){return xe()},async exportProgress(){if(_||g||Pe)throw new Error("Return to your campaign first.");await w;const L=await S.read();if(!L)throw new Error("No saved progress to export.");return JSON.stringify(L,null,2)},async importProgress(L){if(H||_||g||Pe||M||!x||m.snapshot().phase==="Animating")return!1;const D=Zi(L,x);if(!D||typeof D!="object"||typeof D.selectedLevelId!="string")return!1;const ee=await Nn(x,D.selectedLevelId),j=Zi(L,x,ee),Me=is(j,x,new Map([[ee.id,ee]]));return!Me.ok||H?!1:(fe++,q?.abort(),E.reset(),Ye.cancel(),Xe(),b=ee,he=Me.value.unlockedLevel,z=Jn(Me.value.settings),te=j!==L&&j.committedState!==L?.committedState?z.language==="ru"?"Уровень обновлён. Попытка начата заново; прогресс и настройки сохранены.":"Level updated. This attempt was restarted; campaign progress and settings are preserved.":"",m.loadLevel(ee),m.restoreCompleted(Me.value.completedLevelIds),m.restoreAttempt(Me.value.committedState,Me.value.history),i?.configure(z),l(!1),o("wt_progress_imported"),v(m.snapshot()),w=S.write({...Me.value,settings:z},{replace:!0}),await w,!0)},async nextLevel(){return Ue()},debugLoadLevel(L){const D=uo(L);if(!D.ok)throw new Error(`Invalid debug level: ${D.errors.map(j=>j.message).join(" ")}`);b=D.value,Ye.cancel(),Xe(),K=0,ae=!1,X=!1,E.reset();const ee=m.loadLevel(b);return v(ee),et(ee),ee},setTowerDemo(L){if(!b)return!1;X=!0;const D=m.snapshot();if(D.level&&D.committedState){const ee=D.committedState.stacks[0];if(ee){A++;const j={...D.committedState,stacks:[{...ee,height:Math.max(1,Math.min(L??b.totalTiles,b.totalTiles))}]};P=un(D.level,j.stacks),B.reset(P),d.setView(Ji(D.level,j,A,void 0,j.stacks,P))}}return!0},snapshot(){const L=m.snapshot(),D=x?.levels.findIndex(Me=>Me.id===L.level?.id)??-1,ee=L.level?new Map(L.level.cells.filter(Me=>Me.kind==="redirect").map(Me=>[`${Me.u},${Me.v}`,Me.direction])):new Map,j=L.level&&L.committedState?L.committedState.stacks.filter(Me=>!!Me.launchDirection||ee.has(`${Me.u},${Me.v}`)).map(Me=>({stack:Me,direction:ee.get(`${Me.u},${Me.v}`)??Me.launchDirection??"unknown"})):[];return{elapsed:I,loaded:!!b,levelId:b?.id??null,...L,challengeMode:!!_,challengeBusy:g,helpBusy:Pe,selectedStackId:W,hintStackId:de,activeStacks:j,levelNumber:D>=0?D+1:1,levelCount:x?.levels.length??0,unlockedLevel:he,settings:z,tutorialVisible:ae&&L.phase==="Idle",hintView:ue,persistence:{memoryOnly:S.memoryOnly(),recoveryNotice:te}}},presentationSnapshot(){return E.snapshot()},cameraProjection(){return P},foundationScreenBounds(){if(!b||!P)return;const L=bc(b,[]),D=P,ee=Zr({x:D.originX+L.minX*D.scale,y:D.originY+L.minY*D.scale}),j=Zr({x:D.originX+L.maxX*D.scale,y:D.originY+L.maxY*D.scale});return{left:ee.x,top:ee.y,right:j.x,bottom:j.y}},resourceCounts(){return d.resourceCounts()},pickStack(L){const D=m.snapshot();if(D.phase!=="Idle"||!D.level||!D.displayedState)return;const ee=d.pickStack(L,Ji(D.level,D.displayedState,A,W,D.displayedState.stacks,P));return ee&&C(D).some(j=>j.id===ee)?ee:void 0},debugLaunch(L){Ye.cancel(),Xe();const D=m.launch(L);return D.phase==="Animating"?(i?.play("launch"),pt(),He(),N(D)):v(D),D},debugFinishAnimation(L){E.reset();const D=m.finishAnimation(L);return v(D),c(D),He(),et(D),D},requestHint:F,undo(){return g||Pe||oe||!f.supported||!m.snapshot().canUndo||t.help&&!["Idle","Won"].includes(m.snapshot().phase)?m.snapshot():t.help?(_t("undo",m.snapshot(),()=>_e()),m.snapshot()):_e()},persistenceInfo(){return Object.freeze({mode:S.mode(),memoryOnly:S.memoryOnly(),reason:S.unavailableReason(),recoveryNotice:S.conflicted?.()?S.unavailableReason():te})},flushPersistence(){return S.flush()},dispose(){H||(H=!0,T.abort(),fe++,q?.abort(),Xe(),Ye.dispose(),ie.dispose(),E.dispose(),h.dispose(),d.dispose())}});function _e(){Ye.cancel(),Xe();const L=m.undo();return o("wt_undo"),i?.play("undo"),L.phase==="Animating"?N(L):(v(L),et(L)),He(),L}}const Tv={challengeFriends:new URL("/White-Tower-Play/telegram/assets/12762149108b751ff432e30e1a92ffe78d490ee8ecdeb5b284314f256c22cd4a-CUoSaCoO.webp",import.meta.url).href,challengeWarning:new URL("/White-Tower-Play/telegram/assets/04b8ea77bf7d0effa0314861ccb896c78c6b0d5d30e2dfffcdb1157b07c01ba4-DLtiS1pS.webp",import.meta.url).href,logo:new URL("/White-Tower-Play/telegram/assets/355affb8c11cbb90975c14eb6c2192e6f34e46913a1e0c5e55ab20be8d6119cc-BPHyFsGU.webp",import.meta.url).href,campaignTower:new URL("/White-Tower-Play/telegram/assets/d6389becbf587108e4995d85529b8012cdf9e625d02c9fb18c2d08a774cca5f7-BE4OdW_V.webp",import.meta.url).href,reset:new URL("/White-Tower-Play/telegram/assets/78d87d2be35eb6a94cec4854b5c9b10c257ae22f9a137880e98d2b6b6ecf9769-DJKPyP_H.webp",import.meta.url).href,storage:new URL("/White-Tower-Play/telegram/assets/6c1235bb2dcf98a276996de08fecf8785802acc28ab984510e5351dad6eb3ddd-D5Yi741C.webp",import.meta.url).href,loading:new URL("/White-Tower-Play/telegram/assets/87741b2bb30ade096ea6a0dcfc8280924f18cc5558f77145767c19ab80735c55-DIgfvB0J.webp",import.meta.url).href,graphics:new URL("/White-Tower-Play/telegram/assets/f159b239eb9cb99c770be2f36d5b675574cb0737bb439d7987926b805affaa5b-vPy0jOxz.webp",import.meta.url).href};function Rn(n,e){const t=document.createElement("img");return t.src=Tv[n],t.className=e,t.alt="",n!=="logo"&&n!=="loading"&&(t.loading="lazy"),t.draggable=!1,t.setAttribute("aria-hidden","true"),t}function Av(n,e){const t=document.createElement("section");t.className="victory-layer",t.setAttribute("aria-label","Level completed"),t.innerHTML=`
    <div class="victory-shade" aria-hidden="true"></div>
    <div class="victory-ribbon" aria-live="polite"><span>LEVEL</span><span>COMPLETED!</span></div>
    <p class="campaign-end" role="status"></p>`,n.append(t),t.append(Rn("campaignTower","campaign-tower"));const i=document.createElement("button");i.type="button",i.className="next-button",i.setAttribute("aria-label","Next level"),i.innerHTML="<span>NEXT</span>",n.append(i);const r=document.createElement("button");r.type="button",r.className="next-button victory-choose",r.addEventListener("click",e.chooseLevels),n.append(r);const s=document.createElement("button");s.type="button",s.className="victory-undo",s.setAttribute("aria-label","Undo last move"),s.innerHTML="<span>BACK</span>",n.append(s);const a=document.createElement("button");a.type="button",a.className="challenge-share",a.textContent="Challenge a friend",a.hidden=!0;const o=document.createElement("span");o.textContent=a.textContent,a.replaceChildren(Rn("challengeFriends","challenge-friends-icon"),o);const l=()=>e.share?.();a.addEventListener("click",l),n.append(a);const c=t.querySelector(".campaign-end");s.addEventListener("click",e.undo);let u=!1,f=!1,d="";const h=()=>u||f?e.retry():e.next();i.addEventListener("click",h);let m=-1,_=0,p=!1,g="",M="en",T=-1;function S(E,N,x=!1,b="",I=!1,A=!1,P=!1){f=!!E.challengeMode,n.classList.toggle("is-challenge",f),u=A&&E.phase==="Idle";const R=u?"Failed":E.phase;(R!==g||E.generationId!==m)&&(g=R,m=E.generationId,_=0,p=!1),(E.phase==="Won"||u)&&!p&&(_+=Math.max(0,Math.min(N,.1)),_*1e3>=(u?pc.failureDelayMs:pc.victoryDelayMs)&&(p=!0,u&&T!==m&&(T=m,e.failure?.())));const U=(E.phase==="Won"||u)&&p;n.parentElement?.classList.toggle("is-failed",U&&u),t.classList.toggle("is-failed",u),i.classList.toggle("is-failed",u),n.parentElement?.classList.toggle("is-campaign-complete",U&&I),t.classList.toggle("is-campaign-complete",I),t.classList.toggle("has-load-error",!!b),t.lang=M,t.setAttribute("aria-label",u?M==="ru"?"Нет доступных ходов":"No available moves":I?M==="ru"?"Кампания пройдена":"Campaign complete":M==="ru"?"Уровень пройден":"Level completed"),i.setAttribute("aria-label",u||b?Ke(M,"action.retry"):M==="ru"?"Следующий уровень":"Next level"),f&&!u&&i.setAttribute("aria-label","Play again"),r.setAttribute("aria-label",Ke(M,"chooseLevel")),s.setAttribute("aria-label",M==="ru"?"Отменить последний ход":"Undo last move"),t.querySelector(".victory-ribbon span").textContent=u||I?"":M==="en"?"LEVEL":"УРОВЕНЬ";const B=t.querySelector(".victory-ribbon span:last-child");B.textContent=u?yv(M,"fail"):I?M==="ru"?"Кампания пройдена!":"Campaign complete!":Ke(M,"win"),t.style.setProperty("--failure-title-size",`${Math.min(15,63/Math.max(1,B.textContent.length))}cqw`),i.querySelector("span").textContent=x?"…":u||b?Ke(M,"action.retry"):Ke(M,"next"),f&&!u&&(i.querySelector("span").textContent="Play again"),i.classList.toggle("has-load-error",!!b),i.classList.toggle("is-pending",x),r.textContent=Ke(M,"chooseLevel"),s.querySelector("span").textContent=Ke(M,"undo"),t.classList.toggle("is-visible",U),t.setAttribute("aria-hidden",String(!U)),i.hidden=!U,r.hidden=!U||!I&&!b,r.classList.toggle("error-choose",!I&&!!b),i.hidden=!U||I,s.hidden=!U,i.disabled=x||E.phase!=="Won"&&!u,s.disabled=!E.canUndo||E.phase!=="Won"&&!u,c.textContent=I?"All levels completed!":b,a.hidden=!U||u||!e.share,a.disabled=!!E.challengeBusy||x;const Z=`${f}:${E.attemptId}`;!a.hidden&&d!==Z&&(d=Z,e.shareShown?.())}function w(){s.removeEventListener("click",e.undo),i.removeEventListener("click",h),r.removeEventListener("click",e.chooseLevels),t.remove(),r.remove(),i.remove(),s.remove(),a.removeEventListener("click",l),a.remove()}return Object.freeze({update:S,setLanguage(E){M=E},dispose:w})}const gc={lock:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10V7a5 5 0 0 1 10 0v3" fill="none" stroke="#99601d" stroke-width="4"/><path d="M7 9V7a5 5 0 0 1 10 0v2" fill="none" stroke="#ffe9a1" stroke-width="2.5"/><rect x="3" y="9" width="18" height="13" rx="4" fill="#b77b26"/><rect x="3" y="8" width="18" height="12" rx="4" fill="#ffd05e" stroke="#fff0ab"/><path d="M6 11h12" stroke="#fff3c1" stroke-width="2" stroke-linecap="round"/><path d="M12 13v4" stroke="#885014" stroke-width="3" stroke-linecap="round"/></svg>',completed:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 13 5 5L20 6" fill="none" stroke="#806a36" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="m4 11 5 5L20 4" fill="none" stroke="#fff7d9" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>'};function Cv(n,e){const t=document.createElement("h3");t.id="level-select-title";const i=document.createElement("div");i.className="level-grid";const r=document.createElement("p");r.className="level-progress";const s=document.createElement("nav");s.className="level-pagination";const a=document.createElement("button");a.type="button",a.textContent="‹";const o=document.createElement("button");o.type="button",o.textContent="›";const l=document.createElement("span");l.setAttribute("role","status"),s.append(a,l,o);const c=document.createElement("button");c.type="button",c.className="menu-secondary",c.addEventListener("click",e.back),n.append(t,r,i,s,c);let u="en",f=[],d=1,h=[],m="",_="",p=0;a.addEventListener("click",()=>{p=Math.max(0,p-1),g(),(a.disabled?o:a).focus()}),o.addEventListener("click",()=>{p=Math.min(Math.max(0,Math.ceil(f.length/30)-1),p+1),g(),(o.disabled?a:o).focus()});function g(){t.textContent=Ke(u,"levels"),c.textContent=Ke(u,"backSettings"),i.replaceChildren(),r.textContent=u==="ru"?`${h.length} из ${f.length} пройдено`:`${h.length} of ${f.length} completed`,a.setAttribute("aria-label",u==="ru"?"Предыдущая страница уровней":"Previous levels page"),o.setAttribute("aria-label",u==="ru"?"Следующая страница уровней":"Next levels page"),a.disabled=p===0,o.disabled=(p+1)*30>=f.length,l.textContent=`${p*30+1}–${Math.min((p+1)*30,f.length)} / ${f.length}`;for(const M of f.slice(p*30,(p+1)*30)){const T=M.index<=d,S=h.includes(M.id),w=document.createElement("button");w.type="button",w.className="level-card",w.disabled=!T,w.setAttribute("aria-label",`${Ke(u,"level")} ${M.index}${T?S?`, ${Ke(u,"completed")}`:"":`, ${Ke(u,"locked")}`}`),S&&w.classList.add("is-completed"),M.id===m&&w.classList.add("is-selected"),w.setAttribute("data-level",String(M.index));const E=document.createElement("span");E.className="level-number",E.textContent=String(M.index);const N=document.createElement("span");N.className="level-badge",N.setAttribute("aria-hidden","true"),N.innerHTML=S?gc.completed:T?"":gc.lock,w.append(E,N),w.addEventListener("click",()=>{T&&e.select(M.id)}),i.append(w)}}return Object.freeze({update(M){const T=JSON.stringify(M);if(T!==_){if(M.selectedLevelId!==m){const S=M.choices.findIndex(w=>w.id===M.selectedLevelId);p=Math.floor(Math.max(0,S)/30)}_=T,u=M.language,f=M.choices,d=M.unlockedLevel,h=M.completed,m=M.selectedLevelId,g()}},render:g})}function Rv(n,e){const t=document.createElement("section");t.className="settings-panel",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-labelledby","settings-title"),t.tabIndex=-1;const i=document.createElement("div");i.className="settings-card";const r=document.createElement("div");r.className="settings-page";const s=document.createElement("h2");s.id="settings-title";const a=document.createElement("p");a.className="settings-status",a.setAttribute("role","status");const o=document.createElement("div");o.className="settings-controls";const l=document.createElement("label");l.className="setting-row";const c=document.createElement("span");l.append(c);const u=document.createElement("input");u.type="checkbox",l.append(u);const f=document.createElement("label");f.className="setting-row setting-music";const d=document.createElement("span");f.append(d);const h=document.createElement("input");h.type="checkbox",f.append(h);const m=document.createElement("label");m.className="setting-row volume-row";const _=document.createElement("span");m.append(_);const p=document.createElement("input");p.type="range",p.min="0",p.max="1",p.step="0.05",m.append(p);const g=document.createElement("output");g.className="volume-value",m.append(g);const M=document.createElement("button");M.type="button",M.className="menu-secondary";const T=document.createElement("button");T.type="button",T.className="menu-secondary";const S=document.createElement("button");S.type="button",S.className="settings-close",l.classList.add("setting-sound"),m.classList.add("setting-volume"),M.classList.add("settings-levels"),T.classList.add("settings-hint"),o.append(l,f,m,M,T,S),r.append(s,a,o);const w=document.createElement("div");w.className="level-select-page",w.hidden=!0,i.append(r,w),t.append(i),n.append(t),t.prepend(Rn("logo","menu-logo"));const E=document.createElement("button");E.type="button",E.className="storage-dismiss",E.addEventListener("click",e.close),t.append(E),t.dataset.page="settings";const N=Rn("storage","storage-icon");a.before(N);const x=Cv(w,{select:e.selectLevel,back(){e.navigate?.(),t.dataset.page="settings",t.setAttribute("aria-labelledby","settings-title"),w.hidden=!0,r.hidden=!1,e.motion.reveal(i),S.focus()}});let b;function I(){return[...t.querySelectorAll("button:not([disabled]):not([hidden]), select:not([disabled]):not([hidden]), input:not([disabled]):not([hidden])")].filter(X=>X.offsetParent!==null&&!X.closest("[inert]"))}function A(X){if(!t.classList.contains("is-visible"))return;if(X.key==="Escape"){X.preventDefault(),X.stopPropagation(),e.close();return}if(X.key!=="Tab")return;const W=I();if(!W.length){X.preventDefault(),t.focus();return}const J=W[0],te=W.at(-1);X.shiftKey&&(document.activeElement===J||!t.contains(document.activeElement))?(X.preventDefault(),te.focus()):!X.shiftKey&&(document.activeElement===te||!t.contains(document.activeElement))&&(X.preventDefault(),J.focus())}function P(X){b=X;const{settings:W}=X,J=W.language;t.lang=J,t.dir="ltr",s.textContent=Ke(J,"settings"),E.setAttribute("aria-label",J==="ru"?"Закрыть настройки":"Close settings"),t.classList.toggle("has-storage-notice",X.memoryOnly||!!X.recoveryNotice),N.hidden=!X.memoryOnly&&!X.recoveryNotice,m.dataset.original=String(Math.round(W.soundVolume*100)===40),u.checked=W.soundEnabled,p.value=String(W.soundVolume),g.value=`${Math.round(W.soundVolume*100)}%`,c.textContent=Ke(J,"sound"),u.setAttribute("aria-label",Ke(J,"sound")),h.checked=W.musicEnabled,d.textContent=Ke(J,"music"),h.setAttribute("aria-label",Ke(J,"music")),_.textContent=Ke(J,"volume"),p.setAttribute("aria-label",Ke(J,"volume")),M.textContent=Ke(J,"levels"),M.hidden=!!X.challengeMode,M.title=`${X.unlockedLevel}/${X.choices.length} levels unlocked`,T.textContent=Ke(J,"hint"),T.disabled=!X.canHint,S.textContent=Ke(J,"back"),a.textContent=X.memoryOnly?J==="ru"?"Хранилище браузера недоступно":"Browser storage is unavailable":X.recoveryNotice?J==="ru"?"Сохранение не восстановлено.":"The save could not be restored.":"",a.title=X.recoveryNotice,a.classList.toggle("is-warning",X.memoryOnly||!!X.recoveryNotice);let te=a.nextElementSibling instanceof HTMLButtonElement&&a.nextElementSibling.classList.contains("storage-retry")?a.nextElementSibling:null;te||(te=document.createElement("button"),te.type="button",te.className="storage-retry menu-secondary",te.addEventListener("click",e.retry),a.after(te)),te.textContent=Ke(J,"retry"),te.hidden=!X.memoryOnly&&!X.recoveryNotice,x.update({language:J,choices:X.choices,unlockedLevel:X.unlockedLevel,completed:X.completed,selectedLevelId:X.selectedLevelId})}function R(X){if(!b)return;const W=Object.freeze({...b.settings,...X});b=Object.freeze({...b,settings:W}),e.update(W)}u.addEventListener("change",()=>R({soundEnabled:u.checked})),h.addEventListener("change",()=>R({musicEnabled:h.checked})),p.addEventListener("input",()=>{g.value=`${Math.round(Number(p.value)*100)}%`,m.dataset.original=String(Math.round(Number(p.value)*100)===40),R({soundVolume:Number(p.value)})}),p.addEventListener("change",()=>R({soundVolume:Number(p.value)})),M.addEventListener("click",()=>{e.navigate?.(),t.dataset.page="levels",t.setAttribute("aria-labelledby","level-select-title"),r.hidden=!0,w.hidden=!1,x.render(),e.motion.reveal(i),I()[0]?.focus()}),T.addEventListener("click",e.hint),S.addEventListener("click",e.close),t.addEventListener("keydown",A);function U(){t.dataset.page="settings",t.setAttribute("aria-labelledby","settings-title"),t.inert=!1,t.classList.add("is-visible"),e.motion.reveal(t),t.setAttribute("aria-hidden","false"),r.hidden=!1,w.hidden=!0,S.hidden=!1,u.focus(),i.scrollTop=0}function B(){t.setAttribute("aria-hidden","true"),t.inert=!0,t.classList.remove("is-visible"),e.motion.hide(t,()=>t.removeAttribute("data-ui-leaving"))}function Z(){t.dataset.page="levels",t.setAttribute("aria-labelledby","level-select-title"),r.hidden=!0,w.hidden=!1,x.render(),e.motion.reveal(i),I()[0]?.focus()}function H(){e.motion.cancel(t),e.motion.cancel(i),t.removeEventListener("keydown",A),t.remove()}return Object.freeze({update:P,open:U,close:B,showLevels:Z,dispose:H,isVisible:()=>t.classList.contains("is-visible")})}function Lv(n,e){const t=document.createElement("p");t.className="hint-toast",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.hidden=!0,n.append(t);function i(r,s){const o={idle:"",searching:"searching",move:"tapHighlighted","undo-proven":"hint.undo","undo-suggestion":"hintTimeout",deadlock:"game.stuck",timeout:"hintTimeout",error:"hintTimeout"}[r.kind];t.textContent=o?Ke(s,o):"",o&&t.hidden&&e?.reveal(t),t.hidden=!o,t.dataset.kind=r.kind,t.lang=s}return Object.freeze({update:i,dispose(){e?.cancel(t),t.remove()}})}function Pv(n,e){const t=document.createElement("p");t.className="tutorial-tip",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.hidden=!0,n.append(t);function i(r,s){t.textContent=r?Ke(s,"tutorial.tap"):"",r&&t.hidden&&e?.reveal(t),t.hidden=!r,t.lang=s}return Object.freeze({update:i,dispose(){e?.cancel(t),t.remove()}})}function Iv(n){const{level:e,state:t,levelNumber:i,selectedStackId:r,activeStacks:s}=n,a=Math.max(0,...t.stacks.map(u=>Math.floor(u.height))),o=a<2?0:a,l=`Level ${i}. ${o} of ${e.totalTiles} tiles gathered.`,c=s.length===0?"No active arrows.":s.map(({stack:u,direction:f},d)=>`${u.id===r?"Selected arrow":"Arrow"} ${d+1}: coordinates ${u.u}, ${u.v}, height ${u.height}, direction ${f}.`).join(" ");return`${l} ${c}`}function Dv(n,e,t,i){return Ke(n,e==="selection"?"a11y.selection":e==="move"?"a11y.move":e==="undo"?"a11y.undo":e==="restart"?"a11y.restart":"a11y.menu").replace("{index}",String(t??"")).replace("{count}",String(i??""))}function Nv(n){const e=document.createElement("p");e.id="board-description",e.className="visually-hidden",n.append(e);const t=n.querySelector("canvas");t?.setAttribute("aria-describedby",e.id);let i="";return Object.freeze({update(r){const s=Iv(r);s!==i&&(i=s,e.textContent=s)},dispose(){t?.removeAttribute("aria-describedby"),e.remove()}})}const fa={settings:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M20 4h8l1.3 5.1a16 16 0 0 1 3.2 1.3l4.7-2.3 5.7 5.7-2.3 4.7a16 16 0 0 1 1.3 3.2L47 27v8l-5.1 1.3a16 16 0 0 1-1.3 3.2l2.3 4.7-5.7 5.7-4.7-2.3a16 16 0 0 1-3.2 1.3L28 54h-8l-1.3-5.1a16 16 0 0 1-3.2-1.3l-4.7 2.3-5.7-5.7 2.3-4.7a16 16 0 0 1-1.3-3.2L1 35v-8l5.1-1.3a16 16 0 0 1 1.3-3.2l-2.3-4.7 5.7-5.7 4.7 2.3a16 16 0 0 1 3.2-1.3z" transform="translate(1 -5) scale(.85)"/><circle cx="24" cy="24" r="7" class="icon-cutout"/></svg>',restart:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M39 18A16 16 0 0 0 11 12l-4 4m0 0V6m0 10h10M9 30a16 16 0 0 0 28 6l4-4m0 0v10m0-10H31"/></svg>',undo:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M19 13 8 23l11 10M9 23h19a12 12 0 0 1 0 24h-5"/></svg>'};function $r(n,e,t){const i=document.createElement("button");return i.type="button",i.className=t,i.setAttribute("aria-label",n),i.innerHTML=e,i}function Uv(n){const{root:e}=n,t=Rn("logo","game-logo"),i=$r("Hint","<span>?</span>","hud-hint"),r=document.createTextNode(""),s=document.createElement("span");s.className="help-count",s.hidden=!0,s.setAttribute("aria-hidden","true"),i.replaceChildren(r,s),i.addEventListener("click",n.onHint);const a=$r("Settings",fa.settings,"hud-icon settings-button"),o=$r("Restart level",fa.restart,"hud-icon restart-button"),l=document.createElement("div");l.className="hud-counter",l.setAttribute("role","status"),l.setAttribute("aria-live","polite");const c=document.createElement("div");c.className="hud-level";const u=$r("Undo last move",fa.undo+"<span>BACK</span>","hud-undo"),f=u.querySelector("span"),d=document.createElement("span");d.className="help-count",d.hidden=!0,d.setAttribute("aria-hidden","true"),u.append(d),e.append(t,a,o,l,c,u,i);const h=Rv(e,{motion:n.motion,close:n.onMenu,update:n.onSettings,selectLevel:n.onSelectLevel,clearProgress:n.onClearProgress,retry:n.onRetry,hint:n.onHint,exportProgress:n.onExportProgress,importProgress:n.onImportProgress,navigate:()=>n.onMenuNavigate?.()});let m=!1;const _=Av(e,{undo:n.onUndo,next:()=>{b()},retry:n.onReset,chooseLevels:()=>{m=!0,n.onChooseLevels()},failure:()=>n.onFailure?.(),...n.onShareChallenge?{share:n.onShareChallenge}:{},...n.onShareChallengeShown?{shareShown:n.onShareChallengeShown}:{}}),p=Lv(e,n.motion),g=Pv(e,n.motion),M=Nv(e.parentElement??e);let T=!1,S=!1,w="",E="",N="",x="";async function b(){if(!S){S=!0,w="";try{const R=await n.onNext();R.advanced||(w=R.message??Ke(n.getSettings().language,"service.moreLevels"))}catch{w=Ke(n.getSettings().language,"service.nextError")}finally{S=!1}}}const I=()=>{a.focus(),n.onMenu()};a.addEventListener("click",I),o.addEventListener("click",n.onReset),u.addEventListener("click",n.onUndo);function A(R,U,B){const Z=R.phase==="Idle"||R.phase==="Won",H=R.phase==="Menu",X=R.phase==="Animating"&&U.active?U.stacks:R.displayedState?.stacks??R.committedState?.stacks??[],W=Math.max(0,...X.map(ue=>Math.floor(ue.height))),J=W<2?0:W,te=`${J}/${R.level?.totalTiles??0}`,fe=R.settings?.language??n.getSettings().language;e.lang=fe,e.parentElement.dataset.screen=Fv(R),r.textContent=Ke(fe,"hint"),i.setAttribute("aria-label",Ke(fe,"hint")),f.textContent="BACK",i.disabled=R.phase!=="Idle"||!!R.helpBusy,i.hidden=R.phase==="Won"||H,a.setAttribute("aria-label",fe==="ru"?"Настройки":"Settings"),o.setAttribute("aria-label",fe==="ru"?"Перезапустить уровень":"Restart level"),u.setAttribute("aria-label",fe==="ru"?"Отменить ход":"Undo last move");const q=R.level?`${fe==="ru"?"Уровень":"Level"} ${R.levelNumber??1}`:fe==="ru"?"Уровень":"Level";e.dataset.tutorialOriginal=String(fe==="ru"&&(R.levelNumber??1)===1&&te==="0/4"),(E!==te||N!==fe)&&(N=fe,E=te,l.textContent=te,l.setAttribute("aria-label",fe==="ru"?`Собрано ${J} из ${R.level?.totalTiles??0} плиток`:`${J} of ${R.level?.totalTiles??0} tiles gathered`)),x!==q&&(x=q,c.textContent=q);const oe=R.phase==="Won";e.parentElement?.classList.toggle("is-won",oe);for(const ue of[l,c,u])ue.classList.toggle("is-hidden",oe);o.disabled=!Z||!!R.helpBusy,u.disabled=!Z||!R.canUndo||!!R.helpBusy,a.disabled=!!R.helpBusy||!["Idle","Won","Menu"].includes(R.phase);const he=n.getHelpBalance?.();if(e.toggleAttribute("data-account-help",!!he),s.hidden=d.hidden=!he,he){const ue=he.free.hint?he.free.hint+" free":he.paid.hint?he.paid.hint+" paid":he.prices.hint+" Stars",de=he.free.undo?he.free.undo+" free":he.paid.undo?he.paid.undo+" paid":he.prices.undo+" Stars";for(const[pe,Le]of[[s,"hint"],[d,"undo"]]){const ie=he.free[Le]+he.paid[Le];pe.textContent=ie>99?"99+":String(ie),pe.toggleAttribute("data-wide",ie>9)}i.setAttribute("aria-label","Hint: "+ue),u.setAttribute("aria-label","Undo: "+de)}R.settings&&_.setLanguage(R.settings.language);const Ae=R.settings??n.getSettings();e.parentElement?.classList.toggle("high-contrast",!!Ae.highContrast),e.parentElement?.classList.toggle("reduced-motion",!!Ae.reducedMotion),R.level&&R.committedState&&M.update({level:R.level,state:R.committedState,levelNumber:R.levelNumber??1,language:fe,...R.selectedStackId?{selectedStackId:R.selectedStackId}:{},activeStacks:R.activeStacks??[]}),p.update(R.hintView??{kind:"idle"},fe),g.update(!!R.tutorialVisible,fe);const z=R.persistence??{memoryOnly:!1,recoveryNotice:""};h.update({settings:Ae,choices:Array.from({length:R.levelCount??0},(ue,de)=>({id:`level-${String(de+1).padStart(3,"0")}`,index:de+1})),unlockedLevel:R.unlockedLevel??1,completed:R.completedLevelIds,selectedLevelId:R.level?.id??"",memoryOnly:z.memoryOnly,recoveryNotice:z.recoveryNotice,canHint:R.phase==="Menu"&&R.menuReturn==="Idle",challengeMode:!!R.challengeMode}),H&&!T?(h.open(),m&&(h.showLevels(),m=!1)):!H&&T&&(h.close(),a.focus()),T=H;const K=oe&&!R.challengeMode&&!!R.levelCount&&R.levelNumber===R.levelCount,ae=R.phase==="Idle"&&(R.committedState?.stacks.length??0)>1&&R.activeStacks?.length===0;_.update(R,B,S,w,K,ae,Ae.reducedMotion)}function P(){a.removeEventListener("click",I),o.removeEventListener("click",n.onReset),u.removeEventListener("click",n.onUndo),_.dispose(),h.dispose(),p.dispose(),g.dispose(),M.dispose(),i.removeEventListener("click",n.onHint),a.remove(),o.remove(),l.remove(),c.remove(),u.remove(),i.remove(),t.remove()}return Object.freeze({update:A,dispose:P})}function Fv(n){return n.phase==="Won"?!n.challengeMode&&n.levelNumber===n.levelCount?"campaign":"victory":n.tutorialVisible?"tutorial":n.hintView?.kind==="move"?"hint":"gameplay"}const co=Object.freeze({ui:Object.freeze({startHz:620,endHz:540,durationMs:34,waveform:"sine",gain:.16}),launch:Object.freeze({startHz:300,endHz:365,durationMs:72,waveform:"triangle",gain:.18}),merge:Object.freeze({startHz:540,endHz:880,durationMs:115,waveform:"sine",gain:.22}),settle:Object.freeze({startHz:230,endHz:105,durationMs:190,waveform:"triangle",gain:.24}),turn:Object.freeze({startHz:420,endHz:535,durationMs:84,waveform:"sine",gain:.16}),undo:Object.freeze({startHz:455,endHz:305,durationMs:130,waveform:"triangle",gain:.2}),victory:Object.freeze({startHz:520,endHz:790,durationMs:230,waveform:"sine",gain:.2}),failure:Object.freeze({startHz:440,endHz:440,durationMs:340,waveform:"sine",gain:.12}),hint:Object.freeze({startHz:740,endHz:740,durationMs:145,waveform:"sine",gain:.12}),restart:Object.freeze({startHz:370,endHz:440,durationMs:150,waveform:"triangle",gain:.12})});function Ov(n){const e={at:0,tone:co[n]};return n==="failure"?[e,{at:.29,tone:{startHz:370,endHz:370,durationMs:400,waveform:"sine",gain:.1}}]:n==="hint"?[e,{at:.12,tone:{startHz:988,endHz:988,durationMs:190,waveform:"sine",gain:.1}}]:n==="restart"?[e,{at:.1,tone:{startHz:494,endHz:440,durationMs:180,waveform:"sine",gain:.1}}]:[e]}const Bv=84,kv=64,Li=60/Bv,Hn=kv*Li,zv=12,Hv=3.6,Vv=12,Gv=n=>440*2**((n-69)/12),Wv=[[50,57,61,64],[55,62,66,69],[47,54,57,62],[57,64,69,71]],Xv=[[[0,74,1.25],[1.5,78,.75],[3,76,1.5],[6,73,1],[8.5,74,1.5],[11,71,1.25],[14,73,1.5]],[[0,74,1.25],[1.5,78,.75],[3,81,1.5],[6,78,1],[8.5,76,1.5],[11,74,1.25],[14,73,1.5]],[[.5,78,1.5],[3,81,1],[5,83,1.5],[8,81,1.5],[10.5,78,1.25],[13,76,1.5]],[[0,74,1.25],[1.5,78,.75],[3,76,1.5],[6,73,1],[8.5,74,1.5],[11,76,1],[13.5,73,2]]],Pi=[];for(let n=0;n<16;n++){const e=Wv[n%4];for(const t of e)Pi.push({beat:n*4,midi:t,beats:4.8,instrument:"pad",gain:.003});n%2===0?(Pi.push({beat:n*4+.5,midi:e[1]+12,beats:1.4,instrument:"keys",gain:.009}),Pi.push({beat:n*4+2.5,midi:e[2]+12,beats:1.4,instrument:"keys",gain:.008})):Pi.push({beat:n*4+2,midi:e[3]+12,beats:1.5,instrument:"glass",gain:.008})}Xv.forEach((n,e)=>n.forEach(([t,i,r])=>Pi.push({beat:e*16+t,midi:i,beats:r,instrument:"keys",gain:.024})));const vc=Object.freeze(Pi.sort((n,e)=>n.beat-e.beat).map(n=>Object.freeze(n)));function qv(n){let e=!1,t=0,i=0,r=0,s;const a=new Set;function o(f=!1){if(!e)return;const d=n.now(),h=d-t+.15;f||(r=Math.max(r,d-t-.001));const m=Math.floor(r/Hn)-1,_=Math.floor(h/Hn);for(let p=m;p<=_;p++)for(const g of vc){const M=p*Hn+g.beat*Li;if(M<r||M>=h)continue;const T=Math.max(0,d-t-M);T<g.beats*Li&&l(g,Math.max(d,t+M),T)}r=h}function l(f,d,h){if(!(a.size>=zv))try{let m;m=n.play(f,d,h,()=>{m&&a.delete(m)}),a.add(m)}catch{}}function c(){if(!e){e=!0,t=n.now()-i,r=i;for(let f=-1;f<=0;f++)for(const d of vc){const h=f*Hn+d.beat*Li;h<i&&h+d.beats*Li>i&&l(d,n.now(),i-h)}o(!0),s=n.every(o)}}function u(){e&&(i=((n.now()-t)%Hn+Hn)%Hn),e=!1,s?.(),s=void 0;for(const f of a)f.stop();a.clear()}return Object.freeze({start:c,stop:u,snapshot:()=>({running:e,voices:a.size,position:e?(n.now()-t)%Hn:i})})}const Yv=n=>.85*Math.tanh(Math.max(-1,Math.min(1,n))/.85);function $v(n,e){const t=n.durationMs/1e3,i=new Float32Array(Math.ceil(t*e)),r=Math.min(.012,t*.25),s=Math.log(Math.max(1,n.endHz)/n.startHz)/t;for(let a=0;a<i.length;a++){const o=a/e,l=Math.abs(s)<1e-10?n.startHz*o:n.startHz*Math.expm1(s*o)/s,c=2*Math.PI*l,u=n.waveform==="triangle"?2/Math.PI*Math.asin(Math.sin(c)):Math.sin(c),f=o<r?o/r:Math.exp(-9*(o-r)/(t-r)),d=Math.min(1,Math.max(0,(t-o)/.012));i[a]=u*f*d*n.gain*Hv}return i}function Zv(n,e){const t=n.beats*Li,i=new Float32Array(Math.ceil(t*e)),r=Gv(n.midi);for(let s=0;s<i.length;s++){const a=s/e,o=2*Math.PI*r*a;let l,c;if(n.instrument==="pad")l=(Math.sin(o)+.18*Math.sin(o*2))/1.18,c=Math.min(1,a/.45)*Math.min(1,(t-a)/.65);else{const u=n.instrument==="glass";l=(Math.sin(o)+(u?.24:.12)*Math.sin(o*2)*Math.exp(-a*5)+(u?.1:.04)*Math.sin(o*3)*Math.exp(-a*8))/(u?1.34:1.16),c=Math.min(1,a/.009)*Math.exp(-a*(u?2.6:2.1))*Math.min(1,(t-a)/.12)}i[s]=l*Math.max(0,c)*n.gain*Vv}return i}function Kv(){if(typeof AudioContext>"u")throw new Error("Web Audio is unavailable.");const n=new AudioContext,e=n.createGain(),t=n.createWaveShaper();t.curve=Float32Array.from({length:4097},(l,c)=>Yv(c/2048-1)),t.connect(e),e.gain.value=.4,e.connect(n.destination);const i=new Map,r=new Set;function s(l,c){let u=i.get(l);if(!u){const f=c();u=n.createBuffer(1,f.length,n.sampleRate),u.getChannelData(0).set(f),i.set(l,u)}return u}function a(l,c,u,f){const d=n.createBufferSource(),h=n.createGain();d.buffer=l,d.connect(h),h.connect(t);const m=Math.max(c,n.currentTime);h.gain.setValueAtTime(u>0?0:1,m),u>0&&h.gain.linearRampToValueAtTime(1,m+.012);let _=!1;const p=Object.freeze({stop(){if(!_){_=!0,h.gain.cancelScheduledValues(n.currentTime),h.gain.setTargetAtTime(0,n.currentTime,.003);try{d.stop(n.currentTime+.015)}catch{}}}});return d.onended=()=>{d.disconnect(),h.disconnect(),r.delete(p),f()},r.add(p),d.start(m,u),p}const o=qv({now:()=>n.currentTime,play:(l,c,u,f)=>a(s(JSON.stringify([l.midi,l.beats,l.instrument,l.gain]),()=>Zv(l,n.sampleRate)),c,u,f),every:l=>{const c=setInterval(l,40);return()=>clearInterval(c)}});return Object.freeze({resume:()=>n.resume(),suspend:()=>n.suspend(),async close(){o.stop();for(const l of r)l.stop();await n.close(),r.clear(),i.clear(),t.disconnect(),e.disconnect()},setVolume(l){e.gain.setTargetAtTime(l,n.currentTime,.012)},startMusic:o.start,stopMusic:o.stop,musicSnapshot:o.snapshot,playTone(l,c,u,f){const d=f?Ov(f):[{at:0,tone:l}],h=[];let m=d.length;const _=n.currentTime;for(const p of d)h.push(a(s(JSON.stringify(p.tone),()=>$v(p.tone,n.sampleRate)),_+p.at,0,()=>{--m===0&&u()}));return Object.freeze({stop(){for(const p of h)p.stop()}})}})}function Jv(n={}){const e=n.createAdapter??Kv,t=Math.max(1,n.maxVoices??5),i=Math.max(0,n.rateLimitMs??40),r=n.now??(()=>performance.now());let s,a=!0,o=!0,l=.4,c=!0,u=!1,f=!1,d=!1,h;const m=new Set,_=new Map,p={},g=()=>!u&&c&&l>0&&(a||o)&&f;function M(){for(const I of m)try{I.stop()}catch{}m.clear()}function T(){s?.setVolume?.(l),(!a||!g()||!d)&&M(),o&&g()&&d?s?.startMusic?.():s?.stopMusic?.()}function S(){return!s&&!g()?Promise.resolve(!1):h||(h=(async()=>{try{if(!s&&g()&&(s=e()),!s)return!1;for(;;){const A=g();if(A===d)return T(),A;A?await s.resume():await s.suspend(),d=A,T()}}catch{return d=!1,s?.stopMusic?.(),M(),!1}})().finally(()=>{h=void 0}),h)}function w(I){a=I.soundEnabled===!0,o=typeof I.musicEnabled=="boolean"?I.musicEnabled:a,l=Number.isFinite(I.soundVolume)?Math.max(0,Math.min(1,I.soundVolume)):.4,T(),S()}async function E(){if(u)return!1;if(f=!0,h&&s&&!d&&g())try{s.resume().catch(()=>{})}catch{}return S()}function N(I){if(!a||!g()||!d||!s||!co[I])return!1;const A=r();if(A-(_.get(I)??-1/0)<i)return!1;if(_.set(I,A),m.size>=t){const P=m.values().next().value;if(P){try{P.stop()}catch{}m.delete(P)}}try{let P;return P=s.playTone(co[I],l,()=>{P&&m.delete(P)},I),m.add(P),p[I]=(p[I]??0)+1,!0}catch{return!1}}async function x(I){u||(c=I,T(),await S())}async function b(){if(!u){u=!0,M(),s?.stopMusic?.(),await h,f=!1,d=!1;try{await s?.close()}catch{}s=void 0}}return Object.freeze({configure:w,unlock:E,play:N,setVisible:x,dispose:b,snapshot:()=>Object.freeze({enabled:a,musicEnabled:o,volume:l,visible:c,unlocked:f,resumed:d,activeVoices:m.size,disposed:u,played:{...p},music:s?.musicSnapshot?.()??{running:!1,voices:0,position:0}})})}function Qv(n,e,t){if(t){const p=n.querySelector("#load-error");let g=!1;return{update(M,T,S){(g||!T)&&(t.loading.hidden=!0),p.hidden=T&&!g,p.dataset.kind=T?"content":"graphics",p.querySelector("p").textContent=Ke(S,T?"service.contentError":"service.graphicsError"),p.querySelector("button").textContent=Ke(S,"action.retry")},setProgress:t.setProgress,fail(){g=!0,t.fail()},dispose(){e?.cancel(p)}}}const i=document.createElement("section");i.className="loading-screen",i.setAttribute("role","status");const r=document.createElement("p"),s=document.createElement("progress");s.setAttribute("aria-label","Loading");const a=document.createElement("div");a.className="loading-meter is-indeterminate",a.setAttribute("aria-hidden","true");const o=document.createElement("img");o.className="loading-meter-track",o.alt="",o.src=new URL("/White-Tower-Play/telegram/assets/f1d2caab9353742b8df59b148673ac47b38bb5998d9de5a6ee53c8288c6e2024-MRB15IwW.webp",import.meta.url).href;const l=document.createElement("div");l.className="loading-meter-window";const c=document.createElement("img");c.className="loading-meter-fill",c.alt="",c.src=new URL("/White-Tower-Play/telegram/assets/69b4ccfea980602ee46d81df9f0d725e82d3a67b7254f91b2a682cd941a9b511-C7MzZ56N.webp",import.meta.url).href,l.append(c),a.append(o,l);let u;i.append(Rn("logo","game-logo"),Rn("loading","loading-tower"),a,s,r),n.append(i);const f=n.querySelector("#load-error");f.prepend(Rn("graphics","service-illustration"));let d=!1,h;function m(){const p=f.hidden?i.hidden?void 0:i:f;p!==h&&(h&&e?.cancel(h),p&&e?.reveal(p),h=p)}function _(p,g,M){i.lang=M,f.lang=M,f.dataset.kind=g?"content":"graphics",r.textContent=Ke(M,"service.loading")+(u===void 0?"":` ${u}%`),s.setAttribute("aria-label",r.textContent),i.hidden=p||d||!g,!g||d?(f.hidden=!1,f.querySelector("p").textContent=Ke(M,g?"service.contentError":"service.graphicsError"),f.querySelector("button").textContent=Ke(M,"action.retry")):f.hidden=!0,m()}return{update:_,setProgress(p,g){!Number.isFinite(g)||g<=0||(s.max=g,s.value=Math.max(0,Math.min(p,g)),u=Math.floor(s.value/g*100),a.classList.remove("is-indeterminate"),a.style.setProperty("--loaded",u+"%"))},fail(){d=!0,i.hidden=!0,f.hidden=!1,m()},dispose(){e?.cancel(i),e?.cancel(f),i.remove()}}}function jv(n,e){let t=!1,i=!1;return{busy:()=>t,pause(r){},async run(r){if(!(t||i)){t=!0;try{return await r()}finally{t=!1}}},dispose(){i=!0}}}function e_(n,e){const t=document.createElement("dialog");t.className="challenge-dialog",t.setAttribute("aria-label","Friend challenge");const i=document.createElement("h2");i.textContent="Friend challenge";const r=document.createElement("p");r.setAttribute("role","status");const s=document.createElement("div");s.className="challenge-preview";const a=document.createElement("button");a.type="button",a.textContent="Play challenge",a.className="challenge-primary";const o=document.createElement("button");o.type="button",o.textContent="Continue campaign";const l=document.createElement("input");l.readOnly=!0,l.setAttribute("aria-label","Challenge link"),l.hidden=!0;const c=document.createElement("button");c.type="button",c.textContent="Copy link",c.hidden=!0,c.className="challenge-primary",t.append(i,r,s,l,c,a,o),n.append(t);const u=document.createElement("button");u.type="button",u.textContent="Back to campaign",u.className="challenge-back",u.hidden=!0,n.append(u);const f=document.createElement("div");f.className="challenge-notice",f.hidden=!0;const d=document.createElement("p");d.setAttribute("role","status");const h=document.createElement("button");h.type="button",h.textContent="Dismiss";const m=()=>{f.hidden=!0};h.addEventListener("click",m),f.append(Rn("challengeWarning","challenge-warning-icon"),d,h),n.append(f);let _=!1,p=!1,g="";function M(A){p=A,a.disabled=A,o.disabled=A,u.disabled=A}function T(){s.replaceChildren(),a.hidden=!0,l.hidden=!0,c.hidden=!0}function S(){t.open||t.showModal()}function w(){p||t.close()}o.addEventListener("click",w);const E=A=>{p&&A.preventDefault()};t.addEventListener("cancel",E);async function N(A){g=A,T(),i.textContent="Friend challenge",r.textContent="Loading challenge…",S(),M(!0);try{const P=await e.preview(A);if(_)return;if(!P){t.close(),d.textContent="This challenge is unavailable. Continue your campaign.",f.hidden=!1;return}r.textContent=`White Tower level ${P.descriptor.number}. Solve the same tower as your friend. Your campaign stays saved.`;const R=document.createElement("img");if(R.alt="Challenge board preview",R.src=P.image,await R.decode(),_)return;s.append(R),a.hidden=!1,a.textContent="Play challenge"}catch{_||(r.textContent="Could not load the challenge. Retry or continue your campaign.",a.hidden=!1,a.textContent="Retry")}finally{_||M(!1)}}const x=async()=>{if(!(p||_)){if(a.textContent==="Retry"){await N(g);return}M(!0);try{await e.start(g)?_||t.close():_||(r.textContent="This challenge is unavailable. Continue your campaign.")}catch{_||(r.textContent="Could not start the challenge. Retry or continue your campaign.")}finally{_||M(!1)}}},b=async()=>{if(!(p||_)){M(!0);try{await e.leave()}catch{_||(T(),i.textContent="Campaign",r.textContent="Could not return yet. Close this message and try Back to campaign again.",S())}finally{_||M(!1)}}},I=async()=>{try{await navigator.clipboard.writeText(l.value),_||(r.textContent="Link copied. Choose a friend to share it with.")}catch{_||(l.focus(),l.select(),r.textContent="Select and copy the link to share it with a friend.")}};return a.addEventListener("click",x),u.addEventListener("click",b),c.addEventListener("click",I),{busy:()=>p||t.open,async launch(A){if(!(!A||_)){if(!Fu(A)){d.textContent="This challenge is unavailable. Continue your campaign.",f.hidden=!1;return}e.opened(),await N(A)}},share(){if(p||_)return;const A=e.share();!A||A.opened||(T(),i.textContent="Challenge a friend",r.textContent="Share this link to invite a friend to the same tower.",l.value=A.url,l.hidden=!1,c.hidden=!1,S(),l.setSelectionRange(0,0),l.scrollLeft=0)},update(A,P,R,U){u.hidden=!A||U,u.disabled=R||p,a.disabled=R||p,u.dataset.position=P?"result":"play"},dispose(){_=!0,t.close(),t.remove(),u.remove(),f.remove(),h.removeEventListener("click",m),o.removeEventListener("click",w),t.removeEventListener("cancel",E),a.removeEventListener("click",x),u.removeEventListener("click",b),c.removeEventListener("click",I)}}}class Ai extends Error{constructor(e,t){super(e),this.status=t}}function t_(n,e,t=()=>{}){let i,r=!1;const s=new AbortController;async function a(c,u={}){if(r)throw new Ai("Service closed",503);const f=await fetch(`${n.replace(/\/$/,"")}${c}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...u,initData:e.initData()}),signal:AbortSignal.any([s.signal,AbortSignal.timeout(7e3)])}),d=await f.json();if(!f.ok)throw new Ai(d.error??"Help service unavailable",f.status);return d}function o(c){const u={...i,...c};return i=u,t(u),u}async function l(){return o(await a("/account"))}return{refresh:l,async perform(c,u,f){const d=crypto.randomUUID();let h=!1;try{const m=await a("/action/prepare",{kind:c,id:d,game:u});if(o(m.balance),!m.useful)return f()?m.result:void 0;if(!f())return;let _;try{_=await a("/action/commit",{id:d})}catch(p){if(p instanceof Ai)throw p;_=await a("/action/commit",{id:d})}return h=!0,o(_.balance),f()?_.result:void 0}finally{h||a("/action/release",{id:d}).then(o).catch(()=>{})}},async purchase(c){if(!(await l()).paymentsEnabled)throw new Ai("Purchases are temporarily unavailable. You can keep playing.",503);const f=await a("/invoice",{id:crypto.randomUUID(),kind:c}),d=await new Promise((h,m)=>{try{e.openInvoice(f.url,h)}catch(_){m(_)}});if(d==="cancelled"||d==="failed")return await l(),!1;for(let h=0;h<12&&!r;h++){const m=await a("/order",{id:f.id});if(o(m.balance),["paid","reserved","spent"].includes(m.status))return!0;await new Promise(_=>setTimeout(_,1e3))}throw new Ai("Payment is awaiting server confirmation. Your credit will appear when you reopen help.",503)},dispose(){r=!0,s.abort()}}}function n_(n,e,t){let i=!1,r=!1;async function s(a,o){if(!(r||i)){if(!(o instanceof Ai)||o.status!==402){t(o instanceof Error?o.message:"Help is temporarily unavailable. You can keep playing.");return}i=!0,t("Opening Telegram checkout…");try{const l=await e.purchase(a);r||t(l?"Credit received. Tap help to use it.":"Payment cancelled. You can keep playing.")}catch(l){r||t(l instanceof Error?l.message:"Payment unavailable. Try again.")}finally{i=!1}}}return{show:s,busy(a){n.classList.toggle("help-processing",a)},dispose(){r=!0,n.classList.remove("help-processing")}}}function r_(n,e,t){let i,r=document.querySelector("canvas");const s=document.querySelector("#status"),a=Qu(),o=Jv(),l=ku();l.track("wt_boot_started",{device:matchMedia("(pointer:coarse)").matches?"touch":"pointer"});const c=Ou(),u=Ku();document.querySelector("main").classList.add("world-scene");function f(){document.querySelector("main").classList.remove("keyboard-focus")}function d(ie){(ie.key==="Tab"||ie.key.startsWith("Arrow"))&&document.querySelector("main").classList.add("keyboard-focus")}document.addEventListener("pointerdown",f,!0),document.addEventListener("keydown",d,!0);const h=Qv(document.querySelector("main"),u,n),m=Gu(ie=>h.setProgress(ie.completed,ie.total),"/White-Tower-Play/telegram/");let _=!1,p,g,M;const T=e.getHelpAccess?.(),S="https://api.plusvibegames.com",w=T&&S?t_(S,T,ie=>{M=ie}):void 0;w&&(g=n_(document.querySelector("#hud"),w,ie=>{s.textContent=ie}),w.refresh().catch(()=>{}));try{p=wv(r,"webgl",{audio:o,analytics:l,catalogReady:m.catalog,store:e.createStore?.(),help:w,helpState:Ee=>g?.busy(Ee),helpError:(Ee,Pe)=>g?.show(Ee,Pe)}),r=p.canvas}catch(ie){throw s.textContent=ie instanceof Error?`WebGL unavailable: ${ie.message}`:"WebGL unavailable.",m.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose(),u.dispose(),h.dispose(),document.removeEventListener("pointerdown",f,!0),document.removeEventListener("keydown",d,!0),ie}const E=Ju();let N=!1,x=!1,b=!1,I=null,A,P=!1,R,U;const B=jv(document.querySelector("main")),Z=e_(document.querySelector("#hud"),{preview:ie=>p.previewChallenge(ie),start:async ie=>{const Ee=await p.startChallenge(ie);return J(),Ee},leave:async()=>{const ie=await p.leaveChallenge();return J(),ie},opened:()=>p.trackChallenge("wt_challenge_opened"),share:()=>{const ie=p.challengeDescriptor();if(!ie||p.snapshot().phase!=="Won")return;const Ee=e.shareChallenge?.(ie);return Ee?.opened&&p.trackChallenge("wt_challenge_share_opened"),Ee}});function H(){R?.dispose(),r=p.canvas,r.tabIndex=0,r.setAttribute("role","application"),R=ju(r,{pickStack:ie=>p.pickStack(ie),activate:ie=>_&&!N&&!Z.busy()&&!p.snapshot().challengeBusy&&!B.busy()&&p.rendererInfo().supported&&p.launchStack(ie)})}H();const X=Uv({root:document.querySelector("#hud"),motion:u,onReset:()=>{B.run(oe)},onUndo:()=>p.undo(),onNext:async()=>(o.play("ui"),await B.run(()=>p.nextLevel())??{advanced:!1}),onMenu:()=>p.toggleMenu(),getSettings:()=>p.snapshot().settings,onSettings:ie=>{const Ee=p.canvas;p.updateSettings(ie),o.configure(ie),p.canvas!==Ee&&(H(),fe())},onSelectLevel:ie=>{o.play("ui"),p.selectLevel(ie).catch(()=>{s.textContent="Could not load that level. Select it again to retry."})},onClearProgress:()=>{o.play("ui"),p.clearProgress().then(()=>{H(),fe()})},onRetry:()=>window.location.reload(),onChooseLevels:()=>{p.toggleMenu()},onHint:()=>p.requestHint(),getHelpBalance:()=>M,onFailure:()=>o.play("failure"),onMenuNavigate:()=>o.play("ui"),onExportProgress:()=>p.exportProgress(),onImportProgress:ie=>p.importProgress(ie),...e.shareChallenge?{onShareChallenge:()=>Z.share(),onShareChallengeShown:()=>p.trackChallenge("wt_challenge_share_shown")}:{}}),W=nd({canvas:()=>p.canvas,scene:p,enabled:()=>_&&!N&&!Z.busy()&&!p.snapshot().challengeBusy&&!B.busy()&&p.rendererInfo().supported,announce:(ie,Ee,Pe)=>{s.textContent=Dv(p.snapshot().settings.language,ie,Ee,Pe)},reset:oe});function J(){I=null,E.reset(),a.reset()}function te(ie){ie.isTrusted&&(o.setVisible(!N&&!document.hidden),o.unlock())}document.addEventListener("pointerdown",te,{capture:!0}),document.addEventListener("pointerup",te,{capture:!0}),document.addEventListener("click",te,{capture:!0}),document.addEventListener("keydown",te,{capture:!0});function fe(){r=p.canvas;const ie=Math.min(window.devicePixelRatio||1,2);p.resize({width:r.clientWidth,height:r.clientHeight,pixelRatio:ie}),U=r.getBoundingClientRect(),c.refreshLayout(),z="",p.render()}function q(ie){x=ie,N=x||b,p.pause(N||document.hidden),o.setVisible(!N&&!document.hidden),he(),document.querySelector("main").classList.toggle("motion-paused",N||document.hidden),J(),s.textContent=N?"Paused":"Ready"}function oe(){p.reset(),J(),p.render()}function he(){const ie=p.snapshot().settings.reducedMotion||window.matchMedia("(prefers-reduced-motion: reduce)").matches;c.update(ie,N||document.hidden),u.update(ie,N||document.hidden),t?.update(ie,N||document.hidden)}function Ae(){he(),p.pause(document.hidden||N),document.querySelector("main").classList.toggle("motion-paused",document.hidden||N),o.setVisible(!document.hidden&&!N),J()}let z="",K;function ae(ie){if(i?.update(ie),P)return;const Ee=I===null?0:(ie-I)/1e3;I=ie;let Pe=0;_&&!N&&!document.hidden&&(Pe=E.advance(Ee,F=>p.update(F,a)).alpha);const ze=document.querySelector("#hud"),Ye=!_||N||document.hidden;ze.inert!==Ye&&(ze.inert=Ye),he(),X.update(p.snapshot(),p.presentationSnapshot(),!N&&!document.hidden?Math.min(Ee,.1):0);const ct=p.snapshot();Z.update(ct.challengeMode,ct.phase==="Won",ct.challengeBusy||N||document.hidden,ct.phase==="Menu"),h.update(_&&p.snapshot().loaded,p.rendererInfo().supported,p.snapshot().settings.language);const _t=p.persistenceInfo();_t.memoryOnly?s.textContent=p.snapshot().settings.language==="ru"?"Прогресс временный: хранилище браузера недоступно.":"Progress is temporary because browser storage is unavailable.":_t.recoveryNotice&&(s.textContent=_t.recoveryNotice),p.render(Pe);const Xe=p.snapshot().level,et=`${Xe?.id}:${U?.width}:${U?.height}`;if(U&&Xe&&(K!==Xe||z!==et)){z=et,K=Xe;const F=Math.min(U.width/720,U.height/1280),pt=U.left+(U.width-720*F)/2,He=U.top+(U.height-1280*F)/2;c.setExclusion($u(Xe).map(C=>({left:pt+C.left*F-6,top:He+C.top*F-6,right:pt+C.right*F+6,bottom:He+C.bottom*F+6})))}A=requestAnimationFrame(ae)}document.addEventListener("visibilitychange",Ae),window.addEventListener("resize",fe);const ue=new ResizeObserver(fe);ue.observe(document.querySelector("main")),fe(),A=requestAnimationFrame(ae);const de=e.subscribePause(ie=>{b=ie,q(x)}),pe=p.ready.then(async()=>{if(await p.resourceReady(),await document.fonts.ready,P||(p.render(),m.complete(),n.setReducedMotion(p.snapshot().settings.reducedMotion),await n.finish(),P))return;_=!0,performance.mark("game-ready"),l.track("wt_game_ready",{loading_ms:Math.round(performance.now()),content_version:p.contentVersion()??"unknown"}),o.configure(p.snapshot().settings),document.hidden&&o.setVisible(!1),H(),fe(),n.reveal(),i=Wu({snapshot:()=>p.snapshot(),persistenceInfo:()=>p.persistenceInfo(),flushPersistence:()=>p.flushPersistence()}),i.warm().then(Ee=>{!Ee&&!P&&m.background()}),Z.launch(e.getLaunchChallenge?.()??"");const ie=new URLSearchParams(window.location.search);{const Ee=ie.get("level");Ee&&await p.setLevelById(Ee),ie.has("tower")&&p.setTowerDemo(Number(ie.get("tower"))||void 0)}s.textContent=p.rendererInfo().message??"Ready"}).catch(async ie=>{if(!P)throw l.track("wt_content_error",{stage:"startup"}),s.textContent=ie instanceof Error?`Level error: ${ie.message}`:"Could not load level.",h.fail(),n.fail(),await l.flush(),ie});function Le(){P||(i?.dispose(),de(),P=!0,g?.dispose(),w?.dispose(),m.dispose(),l.dispose(),cancelAnimationFrame(A),a.dispose(),R?.dispose(),W.dispose(),Z.dispose(),X.dispose(),B.dispose(),h.dispose(),u.dispose(),c.dispose(),p.dispose(),document.removeEventListener("pointerdown",te,!0),document.removeEventListener("pointerup",te,!0),document.removeEventListener("click",te,!0),document.removeEventListener("keydown",te,!0),o.dispose(),document.removeEventListener("pointerdown",f,!0),document.removeEventListener("keydown",d,!0),window.removeEventListener("resize",fe),ue.disconnect(),document.removeEventListener("visibilitychange",Ae))}return{dispose:Le,ready:pe}}export{r_ as startGame};
