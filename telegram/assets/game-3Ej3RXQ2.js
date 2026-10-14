import{v as mc,p as Pu,D as co,a as gr,c as Iu,t as Ms,b as Du,d as Nu,r as $o,e as Uu,f as Fu}from"./index-DwAQcwdo.js";const ys="white-tower-analytics-",Es=864e5,Ko=200;function Ou(n){const e=n.now??Date.now,t=n.id??(()=>crypto.randomUUID()),i=n.storage,r=P=>{try{return i?.getItem(ys+P)??null}catch{return null}},s=(P,F)=>{try{F===null?i?.removeItem(ys+P):i?.setItem(ys+P,F)}catch{}};let a=r("consent")==="yes",o="",l="",c=0,u=0,h=!1,f=!1,d=0,p=0,v,m,g=!1,y=!1,w=[];const S=new Set,T=n.send??(async(P,F)=>{const N=await fetch(n.host+"/batch/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({api_key:n.key,batch:P}),credentials:"omit",signal:F});return N.ok?!(await N.json().catch(()=>null))?.quota_limited?.length:!1});function b(){s("queue",JSON.stringify(w.slice(-Ko)))}function I(){if(!o){o=r("player")||t(),s("player",o);try{const P=JSON.parse(r("session")||"null");P&&typeof P.id=="string"&&e()-P.last<Es&&e()-P.last<18e5&&(l=P.id,c=P.last)}catch{}try{const P=JSON.parse(r("attempt")||"null");P&&typeof P.id=="string"&&typeof P.level=="string"&&typeof P.version=="string"&&(m=P)}catch{}try{const P=JSON.parse(r("queue")||"[]");Array.isArray(P)&&(w=P.filter(F=>typeof F?.uuid=="string"&&typeof F?.event=="string"&&F.properties?.distinct_id===o&&e()-Date.parse(F.timestamp)<Es&&e()>=Date.parse(F.timestamp)).slice(-Ko))}catch{}}}function x(P,F={},N){return h||!a||!n.key||!/^wt_[a-z_]+$/.test(P)||(I(),N&&S.has(N))?!1:(N&&(S.add(N),S.size>1e3&&S.delete(S.values().next().value)),(!l||e()-c>=18e5)&&(l=t(),u=0),c=e(),s("session",JSON.stringify({id:l,last:c})),w=w.filter(H=>e()-Date.parse(H.timestamp)<Es).slice(-199),w.push({uuid:t(),event:P,timestamp:new Date(e()).toISOString(),properties:{...F,distinct_id:o,session_id:l,$session_id:l,event_sequence:++u,schema_version:1,build_version:n.build,environment:n.environment,consent:!0,$process_person_profile:!1,$geoip_disable:!0}}),b(),!0)}async function M(){if(h||!a||f||!w.length||d>=4)return;const P=w.slice(0,20),F=p;f=!0,v=new AbortController;const N=setTimeout(()=>v?.abort(),8e3);try{const H=await T(P,v.signal);if(F!==p)return;if(H){const Q=new Set(P.map(G=>G.uuid));w=w.filter(G=>!Q.has(G.uuid)),d=0,b()}else d++}catch{F===p&&d++}finally{clearTimeout(N),f=!1}}function R(P){if(!h&&(a=P,p++,v?.abort(),d=0,S.clear(),s("consent",P?"yes":"no"),!P)){w=[],o="",l="",m=void 0;for(const F of["player","session","attempt","queue"])s(F,null)}}function D(P,F,N=!1,H=!0){if(!a)return;I();const Q=N&&m?.level===P&&m.version===F;g=H&&!N,y=H&&!N,Q||(m={id:t(),level:P,version:F},s("attempt",JSON.stringify(m))),x(Q?"wt_level_resumed":"wt_level_started",{level_id:P,content_version:F,attempt_id:m.id,observed_from_start:y},"start:"+m.id)}return Object.freeze({track:x,flush:M,setConsent:R,beginAttempt:D,context:()=>m?{attempt_id:m.id,level_id:m.level,content_version:m.version,continuous_observation:g,observed_from_start:y}:{},consent:()=>a,resetRetry(){d=0},retryDelay:()=>Math.min(6e4,5e3*2**d),snapshot:()=>({consent:a,queued:w.length,retries:d,flight:f}),dispose(){h=!0,p++,v?.abort()}})}function Bu(){let n;try{n=localStorage}catch{}const e=Ou({key:"",host:"https://eu.i.posthog.com",environment:"production",build:"12f331f",...n?{storage:n}:{}});return e.setConsent(!1),e}function gc(n,e="/White-Tower-Play/telegram/"){return`${e.replace(/\/$/,"")}/${n.replace(/^\//,"")}`}const Zo=new Map;class Rt extends Error{constructor(e,t){super(t),this.code=e,this.name="ContentLoadError"}}function ku(n){if(typeof n!="object"||n===null||Array.isArray(n))throw new Rt("catalog","Catalog must be an object.");const e=n;if(e.schemaVersion!==1||typeof e.contentVersion!="string"||!Array.isArray(e.levels)||e.levels.length<1||e.levels.length>120)throw new Rt("catalog","Catalog version or level list is invalid (expected 1–120 entries).");const t=new Set,i=[];return e.levels.forEach((r,s)=>{if(typeof r!="object"||r===null||Array.isArray(r))throw new Rt("catalog",`Entry ${s} must be an object.`);const a=r,o=`level-${String(s+1).padStart(3,"0")}`,l=`/content/levels/${String(s+1).padStart(3,"0")}.json`;if(a.id!==o||a.path!==l||typeof a.sha256!="string"||!/^[a-f0-9]{64}$/.test(a.sha256))throw new Rt("catalog",`Entry ${s} has invalid order, path or checksum.`);if(t.has(o))throw new Rt("catalog",`Duplicate level ${o}.`);t.add(o),i.push(Object.freeze({id:o,path:l,sha256:a.sha256}))}),Object.freeze({schemaVersion:1,contentVersion:e.contentVersion,levels:Object.freeze(i)})}async function vc(n=gc("/content/catalog.json"),e=fetch){let t;try{t=await e(n)}catch(r){throw new Rt("network",r instanceof Error?r.message:String(r))}if(!t.ok)throw new Rt("network",`Catalog request failed (${t.status}).`);let i;try{i=await t.json()}catch(r){throw new Rt("json",r instanceof Error?r.message:"Invalid catalog JSON.")}return ku(i)}async function kn(n,e,t=fetch,i){const r=n.levels.find(d=>d.id===e);if(!r)throw new Rt("missing-level",`Level ${e} is not in the catalog.`);const s=`${n.contentVersion}:${r.sha256}`,a=Zo.get(s);if(a)return a;let o;try{o=await t(gc(r.path),i?{signal:i}:void 0)}catch(d){throw new Rt("network",d instanceof Error?d.message:String(d))}if(!o.ok)throw new Rt("network",`Level request failed (${o.status}).`);let l;try{l=new Uint8Array(await o.arrayBuffer())}catch(d){throw new Rt("network",d instanceof Error?d.message:`Could not read ${e}.`)}let c;try{c=await crypto.subtle.digest("SHA-256",l)}catch(d){throw new Rt("checksum",d instanceof Error?d.message:"SHA-256 is unavailable.")}if([...new Uint8Array(c)].map(d=>d.toString(16).padStart(2,"0")).join("")!==r.sha256)throw new Rt("checksum",`Checksum mismatch for ${e}.`);let h;try{h=JSON.parse(new TextDecoder().decode(l))}catch(d){throw new Rt("json",d instanceof Error?d.message:`Invalid JSON for ${e}.`)}const f=mc(h);if(!f.ok)throw new Rt("schema",f.errors.map(d=>`${d.path}: ${d.message}`).join("; "));if(f.value.id!==r.id)throw new Rt("identity",`Catalog ID does not match level ${e}.`);return Zo.set(s,f.value),f.value}async function zu(n,e,t,i=4){let r=0,s=0;const a=n.length;e({completed:s,total:a}),await Promise.all(Array.from({length:Math.min(Math.max(1,i),n.length)},async()=>{for(;r<n.length;){t.throwIfAborted();const o=n[r++];await new Promise((l,c)=>{const u=()=>c(t.reason);t.addEventListener("abort",u,{once:!0}),Promise.resolve().then(o).then(l,c).finally(()=>t.removeEventListener("abort",u))}),t.throwIfAborted(),e({completed:++s,total:a})}}))}function Hu(n,e){const t=new AbortController,i=[],r=setTimeout(()=>t.abort(new Error("Game resources took too long to load. Please retry.")),9e4);let s={total:1};const a=l=>{s=l,n({completed:l.completed,total:l.total+1})},o=(async()=>{const[l,c]=await Promise.all([vc(),fetch(e+"runtime-assets.json",{signal:t.signal})]);if(!c.ok)throw new Error("Could not load resource manifest.");const u=await c.json();if(!Array.isArray(u)||u.some(d=>typeof d!="string"||!d.startsWith("/assets/")||d.includes("..")))throw new Error("Invalid resource manifest.");const f=[...new Set(u)].map(d=>e+d.replace(/^\//,"")).map(d=>async()=>{if(/\.(png|webp|jpg|svg)$/.test(d))await Pu(d),t.signal.throwIfAborted();else{const p=await fetch(d,{signal:t.signal});if(!p.ok)throw new Error("A game resource could not load.");await p.arrayBuffer()}});return f.push(...l.levels.map(d=>async()=>{await kn(l,d.id,fetch,t.signal)})),f.push(async()=>{await document.fonts.ready}),await zu(f,a,t.signal),l})();return o.catch(()=>{clearTimeout(r),t.abort()}),{catalog:o,complete(){clearTimeout(r),n({completed:s.total+1,total:s.total+1}),i.length=0},dispose(){clearTimeout(r),t.abort();for(const l of i)l.src="";i.length=0}}}const Jo=1536,Qo=1024,uo=[{rect:[32,16,479,496],solid:[.015609756097560976,.014532243415077202,.984390243902439,.9854677565849228]},{rect:[544,16,991,496],solid:[.015655577299412915,.014585232452142206,.9843444227005871,.9854147675478578]},{rect:[1053,16,1506,496],solid:[.01557935735150925,.014692378328741965,.9844206426484907,.9853076216712581]},{rect:[31,528,481,1008],solid:[.015503875968992248,.014545454545454545,.9844961240310077,.9854545454545455]},{rect:[544,528,992,1008],solid:[.015533980582524271,.014505893019038985,.9844660194174757,.985494106980961]},{rect:[1055,528,1505,1008],solid:[.015549076773566569,.014585232452142206,.9844509232264335,.9854147675478578]}],_c=3,fo=22,ho=_c*fo,bi=76,nr=26,vr=Object.freeze(uo.reduce((n,{solid:e})=>{const t=bi*2/(e[2]-e[0]),i=(bi*2+ho)/(e[3]-e[1]),r=-bi-e[0]*t,s=bi+e[1]*i;return{left:Math.min(n.left,r),right:Math.max(n.right,r+t),top:Math.max(n.top,s),bottom:Math.min(n.bottom,s-i)}},{left:0,right:0,top:0,bottom:0})),ht=Object.freeze({width:720,height:1280}),Qn=72,En=.82,Ct=Qn,yi=Ct,jn=22,xc=12+nr+ho,jo=30,po=.44*Qn,Vu=1.33;function ns(n,e){return e.u+e.v-n.u-n.v||n.u-e.u||n.v-e.v}function mo(n,e,t,i){return Object.freeze({x:i.originX+(n-e)*Qn*i.scale,y:i.originY-(n+e)*Qn*i.scale-t*i.layerRise*i.scale})}function is(n,e,t,i){return mo(n,e,t+jn/i.layerRise,i)}function Gu(n,e,t){if(t.width<=0||t.height<=0)return;const i=Math.min(t.width/ht.width,t.height/ht.height),r=(t.width-ht.width*i)/2,s=(t.height-ht.height*i)/2,a=(n-t.left-r)/i,o=(e-t.top-s)/i;if(!(a<0||o<0||a>ht.width||o>ht.height))return Object.freeze({x:a,y:o})}function el(n,e){let t=!1;for(let i=0,r=e.length-1;i<e.length;r=i++){const s=e[i],a=e[r];s.y>n.y!=a.y>n.y&&n.x<(a.x-s.x)*(n.y-s.y)/(a.y-s.y)+s.x&&(t=!t)}return t}function Wu(n,e,t){const i=[...e].sort((a,o)=>ns(o,a)),r=Ct*t.scale,s=jn*t.scale;for(const a of i)for(let o=a.height-1;o>=0;o--){const l=is(a.u,a.v,o,t),c=Math.abs(n.x-l.x),u=Math.abs(n.y-l.y);if(c+u<=r)return a.id;const h={x:l.x,y:l.y+r},f={x:l.x+r,y:l.y},d={x:l.x-r,y:l.y},p={x:h.x,y:h.y+s},v={x:f.x,y:f.y+s},m={x:d.x,y:d.y+s};if(el(n,[f,h,p,v])||el(n,[h,d,m,p]))return a.id}}const In=Object.freeze({left:60,right:660,top:320,bottom:1020});function Sc(n,e){const t=n.cells.filter(u=>u.kind!=="blocked"),i=t.map(u=>(u.u-u.v)*Qn),r=t.map(u=>-(u.u+u.v)*Qn),s=e.map(u=>-(u.u+u.v)*Qn-Ct-(Math.max(0,u.height-1)+(u.lift??0))*po-jn),a=Math.min(...i)+Math.min(-Ct,vr.left)-jo,o=Math.max(...i)+Math.max(Ct,vr.right)+jo,l=Math.min(...r.map(u=>Math.min(u-Ct,u+12+nr-vr.top-1)),...s),c=Math.max(...r)+Math.max(Ct+xc,13+nr-vr.bottom);return Object.freeze({minX:a,minY:l,maxX:o,maxY:c,width:o-a,height:c-l})}function ln(n,e){const t=Sc(n,e),i=Math.min(Vu,(In.right-In.left)/t.width,(In.bottom-In.top)/(t.height*En)),r=(In.top+In.bottom)/2;return Object.freeze({scale:i,layerRise:po,originX:(In.left+In.right)/2-(t.minX+t.maxX)/2*i,originY:ht.height/2+(r-ht.height/2)/En-(t.minY+t.maxY)/2*i})}function Xu(n){const e=n.cells.filter(i=>i.kind!=="blocked"),t=[ln(n,[]),...e.map(i=>ln(n,[{...i,height:n.totalTiles,lift:Math.max(3,n.totalTiles*.75)}]))];return e.map(i=>{const r=t.map(s=>{const a=Yr(mo(i.u,i.v,0,s));return{left:a.x-Ct*s.scale,right:a.x+Ct*s.scale,top:a.y-Ct*s.scale*En,bottom:a.y+(Ct+xc)*s.scale*En}});return{left:Math.min(...r.map(s=>s.left)),right:Math.max(...r.map(s=>s.right)),top:Math.min(...r.map(s=>s.top)),bottom:Math.max(...r.map(s=>s.bottom))}})}function Yr(n){return Object.freeze({x:n.x,y:ht.height/2+(n.y-ht.height/2)*En})}function qu(n){return Object.freeze({x:n.x,y:ht.height/2+(n.y-ht.height/2)/En})}function Yu(){const n=new Map,e=new Map;let t=typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,i=!1;function r(a){const o=n.get(a);n.delete(a),e.delete(a),o?.cancel(),a.removeAttribute("data-ui-leaving")}function s(a,o,l){if(r(a),t||typeof a.animate!="function"){l?.();return}o&&a.setAttribute("data-ui-leaving","");const c=a.animate(o?[{opacity:1,scale:1},{opacity:0,scale:.98}]:[{opacity:0,scale:.96,translate:"0 6px"},{opacity:1,scale:1,translate:"0 0"}],{duration:o?180:280,easing:"cubic-bezier(.2,.8,.2,1)",fill:"both"});n.set(a,c),l&&e.set(a,l),i&&c.pause(),c.finished.then(()=>{if(n.get(a)!==c)return;const u=e.get(a);r(a),u?.()}).catch(()=>{})}return Object.freeze({reveal(a){s(a,!1)},hide(a,o){s(a,!0,o)},cancel:r,update(a,o){if(t=a,i=o,t)for(const l of[...n.keys()]){const c=e.get(l);r(l),c?.()}else for(const l of n.values())i?l.pause():l.playState==="paused"&&l.play()},dispose(){for(const a of[...n.keys()])r(a)}})}function $u({step:n=1/60,maxSteps:e=8}={}){if(!Number.isFinite(n)||n<=0||!Number.isInteger(e)||e<1)throw new RangeError("Invalid fixed-step configuration");let t=0;return{reset(){t=0},advance(i,r){if(!Number.isFinite(i)||i<0)throw new RangeError("Invalid frame delta");t+=i;let s=0;for(;t+n*1e-9>=n&&s<e;)r(n),t=Math.max(0,t-n),s++;const a=Math.floor((t+n*1e-9)/n)*n;return t=Math.max(0,t-a),{steps:s,alpha:Math.min(t/n,1),dropped:a}}}}function Ku(n=window){const e=new Set,t=s=>e.add(s.code),i=s=>e.delete(s.code),r=()=>e.clear();return n.addEventListener("keydown",t),n.addEventListener("keyup",i),n.addEventListener("blur",r),{keys:e,reset:r,dispose(){n.removeEventListener("keydown",t),n.removeEventListener("keyup",i),n.removeEventListener("blur",r),r()}}}function Zu(n,e){const t=e.maxMovement??12,i=e.duplicateWindowMs??220,r=e.environment?.windowTarget??window,s=e.environment?.documentTarget??document;let a,o;const l=n.style.touchAction;n.style.touchAction="none";function c(v){const m=Gu(v.clientX,v.clientY,n.getBoundingClientRect());return m?e.pickStack(m):void 0}function u(v){if(!v.isPrimary||a||v.pointerType==="mouse"&&v.button!==0)return;const m=c(v);if(m){a={pointerId:v.pointerId,stackId:m,x:v.clientX,y:v.clientY},v.preventDefault(),n.focus({preventScroll:!0});try{n.setPointerCapture(v.pointerId)}catch{}}}function h(v){if(!a||a.pointerId!==v.pointerId)return;const m=a;a=void 0,v.preventDefault();const g=Math.hypot(v.clientX-m.x,v.clientY-m.y),y=Number.isFinite(v.timeStamp)?v.timeStamp:performance.now(),w=o?.stackId===m.stackId&&y-o.at<i;g<=t&&c(v)===m.stackId&&!w&&e.activate(m.stackId)&&(o={stackId:m.stackId,at:y})}function f(v){if(v&&a?.pointerId!==v.pointerId)return;const m=a?.pointerId;if(a=void 0,m!==void 0)try{n.hasPointerCapture(m)&&n.releasePointerCapture(m)}catch{}}const d=()=>f(),p=()=>{s.hidden&&f()};return n.addEventListener("pointerdown",u),n.addEventListener("pointerup",h),n.addEventListener("pointercancel",f),n.addEventListener("lostpointercapture",f),r.addEventListener("blur",d),s.addEventListener("visibilitychange",p),Object.freeze({cancel:f,dispose(){f(),n.removeEventListener("pointerdown",u),n.removeEventListener("pointerup",h),n.removeEventListener("pointercancel",f),n.removeEventListener("lostpointercapture",f),r.removeEventListener("blur",d),s.removeEventListener("visibilitychange",p),n.style.touchAction=l}})}function Ju(n,e,t=!1){if(!(!e||t)){if(["ArrowRight","ArrowUp"].includes(n.key))return"next";if(["ArrowLeft","ArrowDown"].includes(n.key))return"previous";if(n.key==="Enter"||n.code==="Space")return"launch";if(n.key.toLowerCase()==="z"||n.ctrlKey&&n.key.toLowerCase()==="z"||n.metaKey&&n.key.toLowerCase()==="z")return"undo";if(n.key.toLowerCase()==="r")return"restart";if(n.key==="Escape")return"menu"}}function Qu(n){return n instanceof HTMLElement?n.isContentEditable||!!n.closest('input, textarea, select, [contenteditable="true"], [role="textbox"]'):!1}function ju(n){const e=n.target??window;function t(i){const r=n.canvas();if(n.enabled&&!n.enabled())return;const s=n.scene.snapshot(),a=i.key==="Escape"&&s.phase==="Menu",o=Ju(i,document.activeElement===r||a,Qu(i.target));if(!(!o||i.repeat&&o!=="next"&&o!=="previous"))if(o==="next"||o==="previous"){const l=n.scene.selectableStacks();if(!l.length)return;const c=o==="next"?1:-1,u=l.findIndex(d=>d.id===n.scene.selectedStackId()),h=u<0?c===1?l.length-1:0:u,f=l[(h+c+l.length)%l.length];n.scene.selectStack(f.id)&&(i.preventDefault(),n.announce("selection",l.indexOf(f)+1,l.length))}else if(o==="launch"&&s.phase==="Idle"){const l=n.scene.selectedStackId();l&&n.scene.launchStack(l)&&(i.preventDefault(),n.announce("move"))}else o==="undo"&&s.canUndo?(n.scene.undo(),i.preventDefault(),n.announce("undo")):o==="restart"&&["Idle","Won"].includes(s.phase)?(n.reset(),i.preventDefault(),n.announce("restart")):o==="menu"&&n.scene.toggleMenu()&&(i.preventDefault(),n.announce("menu"))}return e.addEventListener("keydown",t),Object.freeze({dispose(){e.removeEventListener("keydown",t)}})}const Ci=Object.freeze({background:"#60C0FE",tileTop:"#FFFAF1",tileBevel:"#FFFDF6",tileSideLight:"#EEE8DF",tileSideDark:"#CED0D0",floor:"#FFDA45",floorSeam:"#EEB229",arrow:"#FF922D",chevron:"#FFFFFF",shadow:"#3D83D2"});function _r(n,e,t=e.moveCount,i,r=e.stacks,s=ln(n,r)){const a=r===e.stacks?r.map(o=>{const l=n.cells.find(c=>c.u===o.u&&c.v===o.v);return l?.kind==="redirect"&&l.direction?{...o,launchDirection:l.direction}:o}):r;return Object.freeze({revision:t,level:n,projection:s,stacks:a,...i?{selectedStackId:i}:{}})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const go="186",ed=0,tl=1,td=2,$r=1,nd=2,$i=3,ei=0,zt=1,cn=2,bn=0,Ji=1,nl=2,il=3,rl=4,id=5,Ei=100,rd=101,sd=102,ad=103,od=104,ld=200,cd=201,ud=202,dd=203,Mc=204,yc=205,fd=206,hd=207,pd=208,md=209,gd=210,vd=211,_d=212,xd=213,Sd=214,fa=0,ha=1,pa=2,ir=3,ma=4,ga=5,va=6,_a=7,Ec=0,Md=1,yd=2,tn=0,bc=1,Tc=2,wc=3,Ac=4,Cc=5,Rc=6,Lc=7,Pc=300,ti=301,Pi=302,bs=303,Ts=304,fs=306,xa=1e3,yn=1001,Sa=1002,Lt=1003,Ed=1004,xr=1005,Ut=1006,ws=1007,Kn=1008,Yt=1009,Ic=1010,Dc=1011,rr=1012,vo=1013,fn=1014,un=1015,hn=1016,_o=1017,xo=1018,sr=1020,Nc=35902,Uc=35899,Fc=1021,Oc=1022,en=1023,Cn=1026,Zn=1027,Bc=1028,So=1029,ni=1030,Mo=1031,yo=1033,Kr=33776,Zr=33777,Jr=33778,Qr=33779,Ma=35840,ya=35841,Ea=35842,ba=35843,Ta=36196,wa=37492,Aa=37496,Ca=37488,Ra=37489,rs=37490,La=37491,Pa=37808,Ia=37809,Da=37810,Na=37811,Ua=37812,Fa=37813,Oa=37814,Ba=37815,ka=37816,za=37817,Ha=37818,Va=37819,Ga=37820,Wa=37821,Xa=36492,qa=36494,Ya=36495,$a=36283,Ka=36284,ss=36285,Za=36286,bd=3200,sl=0,Td=1,Hn="",Nt="srgb",as="srgb-linear",os="linear",rt="srgb",As=7680,wd=519,Ad=512,Cd=513,Rd=514,Eo=515,Ld=516,Pd=517,bo=518,Id=519,Dd=35044,al="300 es",dn=2e3,ls=2001;function Nd(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ar(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Ud(){const n=ar("canvas");return n.style.display="block",n}const ol={};function ll(...n){const e="THREE."+n.shift();console.log(e,...n)}function kc(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Be(...n){n=kc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function nt(...n){n=kc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Ri(...n){const e=n.join(" ");e in ol||(ol[e]=!0,Be(...n))}function Fd(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const Od={[fa]:ha,[pa]:va,[ma]:_a,[ir]:ga,[ha]:fa,[va]:pa,[_a]:ma,[ga]:ir};class si{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const It=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Cs=Math.PI/180,Ja=180/Math.PI;function Ni(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(It[n&255]+It[n>>8&255]+It[n>>16&255]+It[n>>24&255]+"-"+It[e&255]+It[e>>8&255]+"-"+It[e>>16&15|64]+It[e>>24&255]+"-"+It[t&63|128]+It[t>>8&255]+"-"+It[t>>16&255]+It[t>>24&255]+It[i&255]+It[i>>8&255]+It[i>>16&255]+It[i>>24&255]).toLowerCase()}function Qe(n,e,t){return Math.max(e,Math.min(t,n))}function Bd(n,e){return(n%e+e)%e}function Rs(n,e,t){return(1-t)*n+t*e}function ki(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function kt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const No=class No{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};No.prototype.isVector2=!0;let Ne=No;class Ui{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],h=i[r+3],f=s[a+0],d=s[a+1],p=s[a+2],v=s[a+3];if(h!==v||l!==f||c!==d||u!==p){let m=l*f+c*d+u*p+h*v;m<0&&(f=-f,d=-d,p=-p,v=-v,m=-m);let g=1-o;if(m<.9995){const y=Math.acos(m),w=Math.sin(y);g=Math.sin(g*y)/w,o=Math.sin(o*y)/w,l=l*g+f*o,c=c*g+d*o,u=u*g+p*o,h=h*g+v*o}else{l=l*g+f*o,c=c*g+d*o,u=u*g+p*o,h=h*g+v*o;const y=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=y,c*=y,u*=y,h*=y}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],h=s[a],f=s[a+1],d=s[a+2],p=s[a+3];return e[t]=o*p+u*h+l*d-c*f,e[t+1]=l*p+u*f+c*h-o*d,e[t+2]=c*p+u*d+o*f-l*h,e[t+3]=u*p-o*h-l*f-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),h=o(s/2),f=l(i/2),d=l(r/2),p=l(s/2);switch(a){case"XYZ":this._x=f*u*h+c*d*p,this._y=c*d*h-f*u*p,this._z=c*u*p+f*d*h,this._w=c*u*h-f*d*p;break;case"YXZ":this._x=f*u*h+c*d*p,this._y=c*d*h-f*u*p,this._z=c*u*p-f*d*h,this._w=c*u*h+f*d*p;break;case"ZXY":this._x=f*u*h-c*d*p,this._y=c*d*h+f*u*p,this._z=c*u*p+f*d*h,this._w=c*u*h-f*d*p;break;case"ZYX":this._x=f*u*h-c*d*p,this._y=c*d*h+f*u*p,this._z=c*u*p-f*d*h,this._w=c*u*h+f*d*p;break;case"YZX":this._x=f*u*h+c*d*p,this._y=c*d*h+f*u*p,this._z=c*u*p-f*d*h,this._w=c*u*h-f*d*p;break;case"XZY":this._x=f*u*h-c*d*p,this._y=c*d*h-f*u*p,this._z=c*u*p+f*d*h,this._w=c*u*h+f*d*p;break;default:Be("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=i+o+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(a-r)*d}else if(i>o&&i>h){const d=2*Math.sqrt(1+i-o-h);this._w=(u-l)/d,this._x=.25*d,this._y=(r+a)/d,this._z=(s+c)/d}else if(o>h){const d=2*Math.sqrt(1+o-i-h);this._w=(s-c)/d,this._x=(r+a)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-i-o);this._w=(a-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Qe(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Uo=class Uo{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(cl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(cl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),u=2*(o*t-s*r),h=2*(s*i-a*t);return this.x=t+l*c+a*h-o*u,this.y=i+l*u+o*c-s*h,this.z=r+l*h+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this.z=Qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this.z=Qe(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ls.copy(this).projectOnVector(e),this.sub(Ls)}reflect(e){return this.sub(Ls.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Uo.prototype.isVector3=!0;let X=Uo;const Ls=new X,cl=new Ui,Fo=class Fo{constructor(e,t,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],d=i[5],p=i[8],v=r[0],m=r[3],g=r[6],y=r[1],w=r[4],S=r[7],T=r[2],b=r[5],I=r[8];return s[0]=a*v+o*y+l*T,s[3]=a*m+o*w+l*b,s[6]=a*g+o*S+l*I,s[1]=c*v+u*y+h*T,s[4]=c*m+u*w+h*b,s[7]=c*g+u*S+h*I,s[2]=f*v+d*y+p*T,s[5]=f*m+d*w+p*b,s[8]=f*g+d*S+p*I,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,f=o*l-u*s,d=c*s-a*l,p=t*h+i*f+r*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return e[0]=h*v,e[1]=(r*c-u*i)*v,e[2]=(o*i-r*a)*v,e[3]=f*v,e[4]=(u*t-r*l)*v,e[5]=(r*s-o*t)*v,e[6]=d*v,e[7]=(i*l-c*t)*v,e[8]=(a*t-i*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Ri("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ps.makeScale(e,t)),this}rotate(e){return Ri("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ps.makeRotation(-e)),this}translate(e,t){return Ri("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ps.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Fo.prototype.isMatrix3=!0;let Ve=Fo;const Ps=new Ve,ul=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),dl=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function kd(){const n={enabled:!0,workingColorSpace:as,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===rt&&(r.r=Tn(r.r),r.g=Tn(r.g),r.b=Tn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===rt&&(r.r=Li(r.r),r.g=Li(r.g),r.b=Li(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Hn?os:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ri("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ri("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[as]:{primaries:e,whitePoint:i,transfer:os,toXYZ:ul,fromXYZ:dl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Nt},outputColorSpaceConfig:{drawingBufferColorSpace:Nt}},[Nt]:{primaries:e,whitePoint:i,transfer:rt,toXYZ:ul,fromXYZ:dl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Nt}}}),n}const je=kd();function Tn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Li(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let li;class zd{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{li===void 0&&(li=ar("canvas")),li.width=e.width,li.height=e.height;const r=li.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=li}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ar("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Tn(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Tn(t[i]/255)*255):t[i]=Tn(t[i]);return{data:t,width:e.width,height:e.height}}else return Be("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Hd=0;class To{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Hd++}),this.uuid=Ni(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Is(r[a].image)):s.push(Is(r[a]))}else s=Is(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Is(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?zd.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Be("Texture: Unable to serialize Texture."),{})}let Vd=0;const Ds=new X;class Ft extends si{constructor(e=Ft.DEFAULT_IMAGE,t=Ft.DEFAULT_MAPPING,i=yn,r=yn,s=Ut,a=Kn,o=en,l=Yt,c=Ft.DEFAULT_ANISOTROPY,u=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Vd++}),this.uuid=Ni(),this.name="",this.source=new To(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ne(0,0),this.repeat=new Ne(1,1),this.center=new Ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ds).x}get height(){return this.source.getSize(Ds).y}get depth(){return this.source.getSize(Ds).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Be(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Be(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Pc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case xa:e.x=e.x-Math.floor(e.x);break;case yn:e.x=e.x<0?0:1;break;case Sa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case xa:e.y=e.y-Math.floor(e.y);break;case yn:e.y=e.y<0?0:1;break;case Sa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ft.DEFAULT_IMAGE=null;Ft.DEFAULT_MAPPING=Pc;Ft.DEFAULT_ANISOTROPY=1;const Oo=class Oo{constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],p=l[9],v=l[2],m=l[6],g=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-v)<.01&&Math.abs(p-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+v)<.1&&Math.abs(p+m)<.1&&Math.abs(c+d+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,S=(d+1)/2,T=(g+1)/2,b=(u+f)/4,I=(h+v)/4,x=(p+m)/4;return w>S&&w>T?w<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(w),r=b/i,s=I/i):S>T?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=b/r,s=x/r):T<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(T),i=I/s,r=x/s),this.set(i,r,s,t),this}let y=Math.sqrt((m-p)*(m-p)+(h-v)*(h-v)+(f-u)*(f-u));return Math.abs(y)<.001&&(y=1),this.x=(m-p)/y,this.y=(h-v)/y,this.z=(f-u)/y,this.w=Math.acos((c+d+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this.z=Qe(this.z,e.z,t.z),this.w=Qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this.z=Qe(this.z,e,t),this.w=Qe(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Oo.prototype.isVector4=!0;let gt=Oo;class Gd extends si{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ut,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new gt(0,0,e,t),this.scissorTest=!1,this.viewport=new gt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new Ft(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Ut,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new To(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class nn extends Gd{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class zc extends Ft{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Wd extends Ft{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const ds=class ds{constructor(e,t,i,r,s,a,o,l,c,u,h,f,d,p,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,u,h,f,d,p,v,m)}set(e,t,i,r,s,a,o,l,c,u,h,f,d,p,v,m){const g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=r,g[1]=s,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=u,g[10]=h,g[14]=f,g[3]=d,g[7]=p,g[11]=v,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ds().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/ci.setFromMatrixColumn(e,0).length(),s=1/ci.setFromMatrixColumn(e,1).length(),a=1/ci.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=a*u,d=a*h,p=o*u,v=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=d+p*c,t[5]=f-v*c,t[9]=-o*l,t[2]=v-f*c,t[6]=p+d*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*u,d=l*h,p=c*u,v=c*h;t[0]=f+v*o,t[4]=p*o-d,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=d*o-p,t[6]=v+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*u,d=l*h,p=c*u,v=c*h;t[0]=f-v*o,t[4]=-a*h,t[8]=p+d*o,t[1]=d+p*o,t[5]=a*u,t[9]=v-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*u,d=a*h,p=o*u,v=o*h;t[0]=l*u,t[4]=p*c-d,t[8]=f*c+v,t[1]=l*h,t[5]=v*c+f,t[9]=d*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,d=a*c,p=o*l,v=o*c;t[0]=l*u,t[4]=v-f*h,t[8]=p*h+d,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=d*h+p,t[10]=f-v*h}else if(e.order==="XZY"){const f=a*l,d=a*c,p=o*l,v=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+v,t[5]=a*u,t[9]=d*h-p,t[2]=p*h-d,t[6]=o*u,t[10]=v*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Xd,e,qd)}lookAt(e,t,i){const r=this.elements;return Vt.subVectors(e,t),Vt.lengthSq()===0&&(Vt.z=1),Vt.normalize(),Dn.crossVectors(i,Vt),Dn.lengthSq()===0&&(Math.abs(i.z)===1?Vt.x+=1e-4:Vt.z+=1e-4,Vt.normalize(),Dn.crossVectors(i,Vt)),Dn.normalize(),Sr.crossVectors(Vt,Dn),r[0]=Dn.x,r[4]=Sr.x,r[8]=Vt.x,r[1]=Dn.y,r[5]=Sr.y,r[9]=Vt.y,r[2]=Dn.z,r[6]=Sr.z,r[10]=Vt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],d=i[13],p=i[2],v=i[6],m=i[10],g=i[14],y=i[3],w=i[7],S=i[11],T=i[15],b=r[0],I=r[4],x=r[8],M=r[12],R=r[1],D=r[5],P=r[9],F=r[13],N=r[2],H=r[6],Q=r[10],G=r[14],U=r[3],V=r[7],ee=r[11],te=r[15];return s[0]=a*b+o*R+l*N+c*U,s[4]=a*I+o*D+l*H+c*V,s[8]=a*x+o*P+l*Q+c*ee,s[12]=a*M+o*F+l*G+c*te,s[1]=u*b+h*R+f*N+d*U,s[5]=u*I+h*D+f*H+d*V,s[9]=u*x+h*P+f*Q+d*ee,s[13]=u*M+h*F+f*G+d*te,s[2]=p*b+v*R+m*N+g*U,s[6]=p*I+v*D+m*H+g*V,s[10]=p*x+v*P+m*Q+g*ee,s[14]=p*M+v*F+m*G+g*te,s[3]=y*b+w*R+S*N+T*U,s[7]=y*I+w*D+S*H+T*V,s[11]=y*x+w*P+S*Q+T*ee,s[15]=y*M+w*F+S*G+T*te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],d=e[14],p=e[3],v=e[7],m=e[11],g=e[15],y=l*d-c*f,w=o*d-c*h,S=o*f-l*h,T=a*d-c*u,b=a*f-l*u,I=a*h-o*u;return t*(v*y-m*w+g*S)-i*(p*y-m*T+g*b)+r*(p*w-v*T+g*I)-s*(p*S-v*b+m*I)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-i*(s*u-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],d=e[11],p=e[12],v=e[13],m=e[14],g=e[15],y=t*o-i*a,w=t*l-r*a,S=t*c-s*a,T=i*l-r*o,b=i*c-s*o,I=r*c-s*l,x=u*v-h*p,M=u*m-f*p,R=u*g-d*p,D=h*m-f*v,P=h*g-d*v,F=f*g-d*m,N=y*F-w*P+S*D+T*R-b*M+I*x;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const H=1/N;return e[0]=(o*F-l*P+c*D)*H,e[1]=(r*P-i*F-s*D)*H,e[2]=(v*I-m*b+g*T)*H,e[3]=(f*b-h*I-d*T)*H,e[4]=(l*R-a*F-c*M)*H,e[5]=(t*F-r*R+s*M)*H,e[6]=(m*S-p*I-g*w)*H,e[7]=(u*I-f*S+d*w)*H,e[8]=(a*P-o*R+c*x)*H,e[9]=(i*R-t*P-s*x)*H,e[10]=(p*b-v*S+g*y)*H,e[11]=(h*S-u*b-d*y)*H,e[12]=(o*M-a*D-l*x)*H,e[13]=(t*D-i*M+r*x)*H,e[14]=(v*w-p*T-m*y)*H,e[15]=(u*T-h*w+f*y)*H,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,h=o+o,f=s*c,d=s*u,p=s*h,v=a*u,m=a*h,g=o*h,y=l*c,w=l*u,S=l*h,T=i.x,b=i.y,I=i.z;return r[0]=(1-(v+g))*T,r[1]=(d+S)*T,r[2]=(p-w)*T,r[3]=0,r[4]=(d-S)*b,r[5]=(1-(f+g))*b,r[6]=(m+y)*b,r[7]=0,r[8]=(p+w)*I,r[9]=(m-y)*I,r[10]=(1-(f+v))*I,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=ci.set(r[0],r[1],r[2]).length();const o=ci.set(r[4],r[5],r[6]).length(),l=ci.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Kt.copy(this);const c=1/a,u=1/o,h=1/l;return Kt.elements[0]*=c,Kt.elements[1]*=c,Kt.elements[2]*=c,Kt.elements[4]*=u,Kt.elements[5]*=u,Kt.elements[6]*=u,Kt.elements[8]*=h,Kt.elements[9]*=h,Kt.elements[10]*=h,t.setFromRotationMatrix(Kt),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,r,s,a,o=dn,l=!1){const c=this.elements,u=2*s/(t-e),h=2*s/(i-r),f=(t+e)/(t-e),d=(i+r)/(i-r);let p,v;if(l)p=s/(a-s),v=a*s/(a-s);else if(o===dn)p=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===ls)p=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=dn,l=!1){const c=this.elements,u=2/(t-e),h=2/(i-r),f=-(t+e)/(t-e),d=-(i+r)/(i-r);let p,v;if(l)p=1/(a-s),v=a/(a-s);else if(o===dn)p=-2/(a-s),v=-(a+s)/(a-s);else if(o===ls)p=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=h,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};ds.prototype.isMatrix4=!0;let xt=ds;const ci=new X,Kt=new xt,Xd=new X(0,0,0),qd=new X(1,1,1),Dn=new X,Sr=new X,Vt=new X,fl=new xt,hl=new Ui;class ii{constructor(e=0,t=0,i=0,r=ii.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],h=r[2],f=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(Qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Qe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Qe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:Be("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return fl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(fl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return hl.setFromEuler(this),this.setFromQuaternion(hl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ii.DEFAULT_ORDER="XYZ";class Hc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Yd=0;const pl=new X,ui=new Ui,vn=new xt,Mr=new X,zi=new X,$d=new X,Kd=new Ui,ml=new X(1,0,0),gl=new X(0,1,0),vl=new X(0,0,1),_l={type:"added"},Zd={type:"removed"},di={type:"childadded",child:null},Ns={type:"childremoved",child:null};class Wt extends si{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yd++}),this.uuid=Ni(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Wt.DEFAULT_UP.clone();const e=new X,t=new ii,i=new Ui,r=new X(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new xt},normalMatrix:{value:new Ve}}),this.matrix=new xt,this.matrixWorld=new xt,this.matrixAutoUpdate=Wt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Hc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ui.setFromAxisAngle(e,t),this.quaternion.multiply(ui),this}rotateOnWorldAxis(e,t){return ui.setFromAxisAngle(e,t),this.quaternion.premultiply(ui),this}rotateX(e){return this.rotateOnAxis(ml,e)}rotateY(e){return this.rotateOnAxis(gl,e)}rotateZ(e){return this.rotateOnAxis(vl,e)}translateOnAxis(e,t){return pl.copy(e).applyQuaternion(this.quaternion),this.position.add(pl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ml,e)}translateY(e){return this.translateOnAxis(gl,e)}translateZ(e){return this.translateOnAxis(vl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(vn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Mr.copy(e):Mr.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),zi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vn.lookAt(zi,Mr,this.up):vn.lookAt(Mr,zi,this.up),this.quaternion.setFromRotationMatrix(vn),r&&(vn.extractRotation(r.matrixWorld),ui.setFromRotationMatrix(vn),this.quaternion.premultiply(ui.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(nt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(_l),di.child=e,this.dispatchEvent(di),di.child=null):nt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Zd),Ns.child=e,this.dispatchEvent(Ns),Ns.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),vn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),vn.multiply(e.parent.matrixWorld)),e.applyMatrix4(vn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(_l),di.child=e,this.dispatchEvent(di),di.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zi,e,$d),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zi,Kd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),f=a(e.skeletons),d=a(e.animations),p=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),p.length>0&&(i.nodes=p)}return i.object=r,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Wt.DEFAULT_UP=new X(0,1,0);Wt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class yr extends Wt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Jd={type:"move"};class Us{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new yr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new yr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new X,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new X),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new yr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new X,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new X,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,i),g=this._getHandJoint(c,v);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,p=.005;c.inputState.pinching&&f>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Jd)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new yr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Vc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nn={h:0,s:0,l:0},Er={h:0,s:0,l:0};function Fs(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class qe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Nt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=je.workingColorSpace){return this.r=e,this.g=t,this.b=i,je.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=je.workingColorSpace){if(e=Bd(e,1),t=Qe(t,0,1),i=Qe(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Fs(a,s,e+1/3),this.g=Fs(a,s,e),this.b=Fs(a,s,e-1/3)}return je.colorSpaceToWorking(this,r),this}setStyle(e,t=Nt){function i(s){s!==void 0&&parseFloat(s)<1&&Be("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Be("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Be("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Nt){const i=Vc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Be("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Tn(e.r),this.g=Tn(e.g),this.b=Tn(e.b),this}copyLinearToSRGB(e){return this.r=Li(e.r),this.g=Li(e.g),this.b=Li(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Nt){return je.workingToColorSpace(Dt.copy(this),e),Math.round(Qe(Dt.r*255,0,255))*65536+Math.round(Qe(Dt.g*255,0,255))*256+Math.round(Qe(Dt.b*255,0,255))}getHexString(e=Nt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=je.workingColorSpace){je.workingToColorSpace(Dt.copy(this),t);const i=Dt.r,r=Dt.g,s=Dt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=je.workingColorSpace){return je.workingToColorSpace(Dt.copy(this),t),e.r=Dt.r,e.g=Dt.g,e.b=Dt.b,e}getStyle(e=Nt){je.workingToColorSpace(Dt.copy(this),e);const t=Dt.r,i=Dt.g,r=Dt.b;return e!==Nt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Nn),this.setHSL(Nn.h+e,Nn.s+t,Nn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Nn),e.getHSL(Er);const i=Rs(Nn.h,Er.h,t),r=Rs(Nn.s,Er.s,t),s=Rs(Nn.l,Er.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Dt=new qe;qe.NAMES=Vc;class Os extends Wt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ii,this.environmentIntensity=1,this.environmentRotation=new ii,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Zt=new X,_n=new X,Bs=new X,xn=new X,fi=new X,hi=new X,xl=new X,ks=new X,zs=new X,Hs=new X,Vs=new gt,Gs=new gt,Ws=new gt;class jt{constructor(e=new X,t=new X,i=new X){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Zt.subVectors(e,t),r.cross(Zt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Zt.subVectors(r,t),_n.subVectors(i,t),Bs.subVectors(e,t);const a=Zt.dot(Zt),o=Zt.dot(_n),l=Zt.dot(Bs),c=_n.dot(_n),u=_n.dot(Bs),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const f=1/h,d=(c*l-o*u)*f,p=(a*u-o*l)*f;return s.set(1-d-p,p,d)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,xn)===null?!1:xn.x>=0&&xn.y>=0&&xn.x+xn.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,xn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,xn.x),l.addScaledVector(a,xn.y),l.addScaledVector(o,xn.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return Vs.setScalar(0),Gs.setScalar(0),Ws.setScalar(0),Vs.fromBufferAttribute(e,t),Gs.fromBufferAttribute(e,i),Ws.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Vs,s.x),a.addScaledVector(Gs,s.y),a.addScaledVector(Ws,s.z),a}static isFrontFacing(e,t,i,r){return Zt.subVectors(i,t),_n.subVectors(e,t),Zt.cross(_n).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Zt.subVectors(this.c,this.b),_n.subVectors(this.a,this.b),Zt.cross(_n).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return jt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return jt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return jt.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return jt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return jt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;fi.subVectors(r,i),hi.subVectors(s,i),ks.subVectors(e,i);const l=fi.dot(ks),c=hi.dot(ks);if(l<=0&&c<=0)return t.copy(i);zs.subVectors(e,r);const u=fi.dot(zs),h=hi.dot(zs);if(u>=0&&h<=u)return t.copy(r);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(fi,a);Hs.subVectors(e,s);const d=fi.dot(Hs),p=hi.dot(Hs);if(p>=0&&d<=p)return t.copy(s);const v=d*c-l*p;if(v<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(i).addScaledVector(hi,o);const m=u*p-d*h;if(m<=0&&h-u>=0&&d-p>=0)return xl.subVectors(s,r),o=(h-u)/(h-u+(d-p)),t.copy(r).addScaledVector(xl,o);const g=1/(m+v+f);return a=v*g,o=f*g,t.copy(i).addScaledVector(fi,a).addScaledVector(hi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class fr{constructor(e=new X(1/0,1/0,1/0),t=new X(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Jt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Jt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Jt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Jt):Jt.fromBufferAttribute(s,a),Jt.applyMatrix4(e.matrixWorld),this.expandByPoint(Jt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),br.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),br.copy(i.boundingBox)),br.applyMatrix4(e.matrixWorld),this.union(br)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Jt),Jt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Hi),Tr.subVectors(this.max,Hi),pi.subVectors(e.a,Hi),mi.subVectors(e.b,Hi),gi.subVectors(e.c,Hi),Un.subVectors(mi,pi),Fn.subVectors(gi,mi),Gn.subVectors(pi,gi);let t=[0,-Un.z,Un.y,0,-Fn.z,Fn.y,0,-Gn.z,Gn.y,Un.z,0,-Un.x,Fn.z,0,-Fn.x,Gn.z,0,-Gn.x,-Un.y,Un.x,0,-Fn.y,Fn.x,0,-Gn.y,Gn.x,0];return!Xs(t,pi,mi,gi,Tr)||(t=[1,0,0,0,1,0,0,0,1],!Xs(t,pi,mi,gi,Tr))?!1:(wr.crossVectors(Un,Fn),t=[wr.x,wr.y,wr.z],Xs(t,pi,mi,gi,Tr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Jt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Jt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Sn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Sn=[new X,new X,new X,new X,new X,new X,new X,new X],Jt=new X,br=new fr,pi=new X,mi=new X,gi=new X,Un=new X,Fn=new X,Gn=new X,Hi=new X,Tr=new X,wr=new X,Wn=new X;function Xs(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Wn.fromArray(n,s);const o=r.x*Math.abs(Wn.x)+r.y*Math.abs(Wn.y)+r.z*Math.abs(Wn.z),l=e.dot(Wn),c=t.dot(Wn),u=i.dot(Wn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const yt=new X,Ar=new Ne;let Qd=0;class wn extends si{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Qd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Dd,this.updateRanges=[],this.gpuType=un,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ar.fromBufferAttribute(this,t),Ar.applyMatrix3(e),this.setXY(t,Ar.x,Ar.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix3(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix4(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.applyNormalMatrix(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.transformDirection(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ki(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=kt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ki(t,this.array)),t}setX(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ki(t,this.array)),t}setY(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ki(t,this.array)),t}setZ(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ki(t,this.array)),t}setW(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),i=kt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),i=kt(i,this.array),r=kt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),i=kt(i,this.array),r=kt(r,this.array),s=kt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Gc extends wn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Wc extends wn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Et extends wn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const jd=new fr,Vi=new X,qs=new X;class wo{constructor(e=new X,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):jd.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Vi.subVectors(e,this.center);const t=Vi.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Vi,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(qs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Vi.copy(e.center).add(qs)),this.expandByPoint(Vi.copy(e.center).sub(qs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let ef=0;const qt=new xt,Ys=new Wt,vi=new X,Gt=new fr,Gi=new fr,At=new X;class Ht extends si{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ef++}),this.uuid=Ni(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Nd(e)?Wc:Gc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ve().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return qt.makeRotationFromQuaternion(e),this.applyMatrix4(qt),this}rotateX(e){return qt.makeRotationX(e),this.applyMatrix4(qt),this}rotateY(e){return qt.makeRotationY(e),this.applyMatrix4(qt),this}rotateZ(e){return qt.makeRotationZ(e),this.applyMatrix4(qt),this}translate(e,t,i){return qt.makeTranslation(e,t,i),this.applyMatrix4(qt),this}scale(e,t,i){return qt.makeScale(e,t,i),this.applyMatrix4(qt),this}lookAt(e){return Ys.lookAt(e),Ys.updateMatrix(),this.applyMatrix4(Ys.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vi).negate(),this.translate(vi.x,vi.y,vi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Et(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Be("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){nt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new X(-1/0,-1/0,-1/0),new X(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Gt.setFromBufferAttribute(s),this.morphTargetsRelative?(At.addVectors(this.boundingBox.min,Gt.min),this.boundingBox.expandByPoint(At),At.addVectors(this.boundingBox.max,Gt.max),this.boundingBox.expandByPoint(At)):(this.boundingBox.expandByPoint(Gt.min),this.boundingBox.expandByPoint(Gt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&nt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new wo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){nt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new X,1/0);return}if(e){const i=this.boundingSphere.center;if(Gt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Gi.setFromBufferAttribute(o),this.morphTargetsRelative?(At.addVectors(Gt.min,Gi.min),Gt.expandByPoint(At),At.addVectors(Gt.max,Gi.max),Gt.expandByPoint(At)):(Gt.expandByPoint(Gi.min),Gt.expandByPoint(Gi.max))}Gt.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)At.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(At));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)At.fromBufferAttribute(o,c),l&&(vi.fromBufferAttribute(e,c),At.add(vi)),r=Math.max(r,i.distanceToSquared(At))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&nt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){nt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new wn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let x=0;x<i.count;x++)o[x]=new X,l[x]=new X;const c=new X,u=new X,h=new X,f=new Ne,d=new Ne,p=new Ne,v=new X,m=new X;function g(x,M,R){c.fromBufferAttribute(i,x),u.fromBufferAttribute(i,M),h.fromBufferAttribute(i,R),f.fromBufferAttribute(s,x),d.fromBufferAttribute(s,M),p.fromBufferAttribute(s,R),u.sub(c),h.sub(c),d.sub(f),p.sub(f);const D=1/(d.x*p.y-p.x*d.y);isFinite(D)&&(v.copy(u).multiplyScalar(p.y).addScaledVector(h,-d.y).multiplyScalar(D),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-p.x).multiplyScalar(D),o[x].add(v),o[M].add(v),o[R].add(v),l[x].add(m),l[M].add(m),l[R].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let x=0,M=y.length;x<M;++x){const R=y[x],D=R.start,P=R.count;for(let F=D,N=D+P;F<N;F+=3)g(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const w=new X,S=new X,T=new X,b=new X;function I(x){T.fromBufferAttribute(r,x),b.copy(T);const M=o[x];w.copy(M),w.sub(T.multiplyScalar(T.dot(M))).normalize(),S.crossVectors(b,M);const D=S.dot(l[x])<0?-1:1;a.setXYZW(x,w.x,w.y,w.z,D)}for(let x=0,M=y.length;x<M;++x){const R=y[x],D=R.start,P=R.count;for(let F=D,N=D+P;F<N;F+=3)I(e.getX(F+0)),I(e.getX(F+1)),I(e.getX(F+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new wn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);const r=new X,s=new X,a=new X,o=new X,l=new X,c=new X,u=new X,h=new X;if(e)for(let f=0,d=e.count;f<d;f+=3){const p=e.getX(f+0),v=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,p),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(i,p),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(p,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=t.count;f<d;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)At.fromBufferAttribute(e,t),At.normalize(),e.setXYZ(t,At.x,At.y,At.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,f=new c.constructor(l.length*u);let d=0,p=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?d=l[v]*o.data.stride+o.offset:d=l[v]*u;for(let g=0;g<u;g++)f[p++]=c[d++]}return new wn(f,u,h)}if(this.index===null)return Be("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ht,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=e(f,i);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const $s=new X,tf=new X,nf=new Ve;class zn{constructor(e=new X(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=$s.subVectors(i,t).cross(tf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta($s),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||nf.getNormalMatrix(e),r=this.coplanarPoint($s).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let rf=0;class hs extends si{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:rf++}),this.uuid=Ni(),this.name="",this.type="Material",this.blending=Ji,this.side=ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Mc,this.blendDst=yc,this.blendEquation=Ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=ir,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=wd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=As,this.stencilZFail=As,this.stencilZPass=As,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Be(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Be(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new qe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new zn().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ne().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ne().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Mn=new X,Ks=new X,Cr=new X,Rr=new X;class sf{constructor(e=new X,t=new X(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Mn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Mn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Mn.copy(this.origin).addScaledVector(this.direction,t),Mn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Ks.copy(e).add(t).multiplyScalar(.5),Cr.copy(t).sub(e).normalize(),Rr.copy(this.origin).sub(Ks);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Cr),o=Rr.dot(this.direction),l=-Rr.dot(Cr),c=Rr.lengthSq(),u=Math.abs(1-a*a);let h,f,d,p;if(u>0)if(h=a*l-o,f=a*o-l,p=s*u,h>=0)if(f>=-p)if(f<=p){const v=1/u;h*=v,f*=v,d=h*(h+a*f+2*o)+f*(a*h+f+2*l)+c}else f=s,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*l)+c;else f<=-p?(h=Math.max(0,-(-a*s+o)),f=h>0?-s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c):f<=p?(h=0,f=Math.min(Math.max(-s,-l),s),d=f*(f+2*l)+c):(h=Math.max(0,-(a*s+o)),f=h>0?s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c);else f=a>0?-s:s,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Ks).addScaledVector(Cr,f),d}intersectSphere(e,t){if(e.radius<0)return null;Mn.subVectors(e.center,this.origin);const i=Mn.dot(this.direction),r=Mn.dot(Mn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Mn)!==null}intersectTriangle(e,t,i,r,s){const a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,h=e.x-a.x,f=e.y-a.y,d=e.z-a.z,p=t.x-a.x,v=t.y-a.y,m=t.z-a.z,g=i.x-a.x,y=i.y-a.y,w=i.z-a.z,S=Math.abs(l),T=Math.abs(c),b=Math.abs(u);let I,x,M,R,D,P,F,N,H,Q,G,U;if(S>=T&&S>=b?(M=l,P=h,H=p,U=g,l>=0?(I=c,x=u,R=f,D=d,F=v,N=m,Q=y,G=w):(I=u,x=c,R=d,D=f,F=m,N=v,Q=w,G=y)):T>=b?(M=c,P=f,H=v,U=y,c>=0?(I=u,x=l,R=d,D=h,F=m,N=p,Q=w,G=g):(I=l,x=u,R=h,D=d,F=p,N=m,Q=g,G=w)):(M=u,P=d,H=m,U=w,u>=0?(I=l,x=c,R=h,D=f,F=p,N=v,Q=g,G=y):(I=c,x=l,R=f,D=h,F=v,N=p,Q=y,G=g)),M===0)return null;const V=I/M,ee=x/M,te=1/M,Z=R-V*P,ue=D-ee*P,Le=F-V*H,Se=N-ee*H,me=Q-V*U,O=G-ee*U,q=me*Se-O*Le,ae=Z*O-ue*me,be=Le*ue-Se*Z;if(r){if(q<0||ae<0||be<0)return null}else if((q<0||ae<0||be<0)&&(q>0||ae>0||be>0))return null;const j=q+ae+be;if(j===0)return null;const ce=te*(q*P+ae*H+be*U);return(j>0?ce<0:ce>0)?null:this.at(ce/j,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ot extends hs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ii,this.combine=Ec,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Sl=new xt,Xn=new sf,Lr=new wo,Ml=new X,Pr=new X,Ir=new X,Dr=new X,Zs=new X,Nr=new X,yl=new X,Ur=new X;class pn extends Wt{constructor(e=new Ht,t=new ot){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Nr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],h=s[l];u!==0&&(Zs.fromBufferAttribute(h,e),a?Nr.addScaledVector(Zs,u):Nr.addScaledVector(Zs.sub(t),u))}t.add(Nr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Lr.copy(i.boundingSphere),Lr.applyMatrix4(s),Xn.copy(e.ray).recast(e.near),!(Lr.containsPoint(Xn.origin)===!1&&(Xn.intersectSphere(Lr,Ml)===null||Xn.origin.distanceToSquared(Ml)>(e.far-e.near)**2))&&(Sl.copy(s).invert(),Xn.copy(e.ray).applyMatrix4(Sl),!(i.boundingBox!==null&&Xn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Xn)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,v=f.length;p<v;p++){const m=f[p],g=a[m.materialIndex],y=Math.max(m.start,d.start),w=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let S=y,T=w;S<T;S+=3){const b=o.getX(S),I=o.getX(S+1),x=o.getX(S+2);r=Fr(this,g,e,i,c,u,h,b,I,x),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const p=Math.max(0,d.start),v=Math.min(o.count,d.start+d.count);for(let m=p,g=v;m<g;m+=3){const y=o.getX(m),w=o.getX(m+1),S=o.getX(m+2);r=Fr(this,a,e,i,c,u,h,y,w,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,v=f.length;p<v;p++){const m=f[p],g=a[m.materialIndex],y=Math.max(m.start,d.start),w=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let S=y,T=w;S<T;S+=3){const b=S,I=S+1,x=S+2;r=Fr(this,g,e,i,c,u,h,b,I,x),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const p=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let m=p,g=v;m<g;m+=3){const y=m,w=m+1,S=m+2;r=Fr(this,a,e,i,c,u,h,y,w,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function af(n,e,t,i,r,s,a,o){let l;if(e.side===zt?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===ei,o),l===null)return null;Ur.copy(o),Ur.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Ur);return c<t.near||c>t.far?null:{distance:c,point:Ur.clone(),object:n}}function Fr(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,Pr),n.getVertexPosition(l,Ir),n.getVertexPosition(c,Dr);const u=af(n,e,t,i,Pr,Ir,Dr,yl);if(u){const h=new X;jt.getBarycoord(yl,Pr,Ir,Dr,h),r&&(u.uv=jt.getInterpolatedAttribute(r,o,l,c,h,new Ne)),s&&(u.uv1=jt.getInterpolatedAttribute(s,o,l,c,h,new Ne)),a&&(u.normal=jt.getInterpolatedAttribute(a,o,l,c,h,new X),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new X,materialIndex:0};jt.getNormal(Pr,Ir,Dr,f.normal),u.face=f,u.barycoord=h}return u}class of extends Ft{constructor(e=null,t=1,i=1,r,s,a,o,l,c=Lt,u=Lt,h,f){super(null,a,o,l,c,u,r,s,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const qn=new wo,lf=new Ne(.5,.5),Or=new X;class Xc{constructor(e=new zn,t=new zn,i=new zn,r=new zn,s=new zn,a=new zn){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=dn,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],h=s[5],f=s[6],d=s[7],p=s[8],v=s[9],m=s[10],g=s[11],y=s[12],w=s[13],S=s[14],T=s[15];if(r[0].setComponents(c-a,d-u,g-p,T-y).normalize(),r[1].setComponents(c+a,d+u,g+p,T+y).normalize(),r[2].setComponents(c+o,d+h,g+v,T+w).normalize(),r[3].setComponents(c-o,d-h,g-v,T-w).normalize(),i)r[4].setComponents(l,f,m,S).normalize(),r[5].setComponents(c-l,d-f,g-m,T-S).normalize();else if(r[4].setComponents(c-l,d-f,g-m,T-S).normalize(),t===dn)r[5].setComponents(c+l,d+f,g+m,T+S).normalize();else if(t===ls)r[5].setComponents(l,f,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),qn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),qn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(qn)}intersectsSprite(e){qn.center.set(0,0,0);const t=lf.distanceTo(e.center);return qn.radius=.7071067811865476+t,qn.applyMatrix4(e.matrixWorld),this.intersectsSphere(qn)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Or.x=r.normal.x>0?e.max.x:e.min.x,Or.y=r.normal.y>0?e.max.y:e.min.y,Or.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Or)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class qc extends Ft{constructor(e=[],t=ti,i,r,s,a,o,l,c,u){super(e,t,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class or extends Ft{constructor(e,t,i=fn,r,s,a,o=Lt,l=Lt,c,u=Cn,h=1){if(u!==Cn&&u!==Zn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:h};super(f,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new To(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class cf extends or{constructor(e,t=fn,i=ti,r,s,a=Lt,o=Lt,l,c=Cn){const u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,i,r,s,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Yc extends Ft{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class hr extends Ht{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],h=[];let f=0,d=0;p("z","y","x",-1,-1,i,t,e,a,s,0),p("z","y","x",1,-1,i,t,-e,a,s,1),p("x","z","y",1,1,e,i,t,r,a,2),p("x","z","y",1,-1,e,i,-t,r,a,3),p("x","y","z",1,-1,e,t,i,r,s,4),p("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Et(c,3)),this.setAttribute("normal",new Et(u,3)),this.setAttribute("uv",new Et(h,2));function p(v,m,g,y,w,S,T,b,I,x,M){const R=S/I,D=T/x,P=S/2,F=T/2,N=b/2,H=I+1,Q=x+1;let G=0,U=0;const V=new X;for(let ee=0;ee<Q;ee++){const te=ee*D-F;for(let Z=0;Z<H;Z++){const ue=Z*R-P;V[v]=ue*y,V[m]=te*w,V[g]=N,c.push(V.x,V.y,V.z),V[v]=0,V[m]=0,V[g]=b>0?1:-1,u.push(V.x,V.y,V.z),h.push(Z/I),h.push(1-ee/x),G+=1}}for(let ee=0;ee<x;ee++)for(let te=0;te<I;te++){const Z=f+te+H*ee,ue=f+te+H*(ee+1),Le=f+(te+1)+H*(ee+1),Se=f+(te+1)+H*ee;l.push(Z,ue,Se),l.push(ue,Le,Se),U+=6}o.addGroup(d,U,M),d+=U,f+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class gn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Be("Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let r=0;const s=i.length;let a;t?a=t:a=e*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=i[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===a)return r/(s-1);const u=i[r],f=i[r+1]-u,d=(a-u)/f;return(r+d)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new Ne:new X);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new X,r=[],s=[],a=[],o=new X,l=new xt;for(let d=0;d<=e;d++){const p=d/e;r[d]=this.getTangentAt(p,new X)}s[0]=new X,a[0]=new X;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),h=Math.abs(r[0].y),f=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),f<=c&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(r[d-1],r[d]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos(Qe(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(o,p))}a[d].crossVectors(r[d],s[d])}if(t===!0){let d=Math.acos(Qe(s[0].dot(s[e]),-1,1));d/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(d=-d);for(let p=1;p<=e;p++)s[p].applyMatrix4(l.makeRotationAxis(r[p],d*p)),a[p].crossVectors(r[p],s[p])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Ao extends gn{constructor(e=0,t=0,i=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new Ne){const i=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*u-d*h+this.aX,c=f*h+d*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class uf extends Ao{constructor(e,t,i,r,s,a){super(e,t,i,i,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Co(){let n=0,e=0,t=0,i=0;function r(s,a,o,l){n=s,e=o,t=-3*s+3*a-2*o-l,i=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,h){let f=(a-s)/c-(o-s)/(c+u)+(o-a)/u,d=(o-a)/u-(l-a)/(u+h)+(l-o)/h;f*=u,d*=u,r(a,o,f,d)},calc:function(s){const a=s*s,o=a*s;return n+e*s+t*a+i*o}}}const El=new X,bl=new X,Js=new Co,Qs=new Co,js=new Co;class df extends gn{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new X){const i=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=r[(o-1)%s]:(bl.subVectors(r[0],r[1]).add(r[0]),c=bl);const h=r[o%s],f=r[(o+1)%s];if(this.closed||o+2<s?u=r[(o+2)%s]:(El.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=El),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(h),d),v=Math.pow(h.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(u),d);v<1e-4&&(v=1),p<1e-4&&(p=v),m<1e-4&&(m=v),Js.initNonuniformCatmullRom(c.x,h.x,f.x,u.x,p,v,m),Qs.initNonuniformCatmullRom(c.y,h.y,f.y,u.y,p,v,m),js.initNonuniformCatmullRom(c.z,h.z,f.z,u.z,p,v,m)}else this.curveType==="catmullrom"&&(Js.initCatmullRom(c.x,h.x,f.x,u.x,this.tension),Qs.initCatmullRom(c.y,h.y,f.y,u.y,this.tension),js.initCatmullRom(c.z,h.z,f.z,u.z,this.tension));return i.set(Js.calc(l),Qs.calc(l),js.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new X().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Tl(n,e,t,i,r){const s=(i-e)*.5,a=(r-t)*.5,o=n*n,l=n*o;return(2*t-2*i+s+a)*l+(-3*t+3*i-2*s-a)*o+s*n+t}function ff(n,e){const t=1-n;return t*t*e}function hf(n,e){return 2*(1-n)*n*e}function pf(n,e){return n*n*e}function Qi(n,e,t,i){return ff(n,e)+hf(n,t)+pf(n,i)}function mf(n,e){const t=1-n;return t*t*t*e}function gf(n,e){const t=1-n;return 3*t*t*n*e}function vf(n,e){return 3*(1-n)*n*n*e}function _f(n,e){return n*n*n*e}function ji(n,e,t,i,r){return mf(n,e)+gf(n,t)+vf(n,i)+_f(n,r)}class $c extends gn{constructor(e=new Ne,t=new Ne,i=new Ne,r=new Ne){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new Ne){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(ji(e,r.x,s.x,a.x,o.x),ji(e,r.y,s.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class xf extends gn{constructor(e=new X,t=new X,i=new X,r=new X){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new X){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(ji(e,r.x,s.x,a.x,o.x),ji(e,r.y,s.y,a.y,o.y),ji(e,r.z,s.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Kc extends gn{constructor(e=new Ne,t=new Ne){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Ne){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Ne){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Sf extends gn{constructor(e=new X,t=new X){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new X){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new X){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Zc extends gn{constructor(e=new Ne,t=new Ne,i=new Ne){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Ne){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(Qi(e,r.x,s.x,a.x),Qi(e,r.y,s.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Mf extends gn{constructor(e=new X,t=new X,i=new X){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new X){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(Qi(e,r.x,s.x,a.x),Qi(e,r.y,s.y,a.y),Qi(e,r.z,s.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Jc extends gn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Ne){const i=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],u=r[a>r.length-2?r.length-1:a+1],h=r[a>r.length-3?r.length-1:a+2];return i.set(Tl(o,l.x,c.x,u.x,h.x),Tl(o,l.y,c.y,u.y,h.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new Ne().fromArray(r))}return this}}var wl=Object.freeze({__proto__:null,ArcCurve:uf,CatmullRomCurve3:df,CubicBezierCurve:$c,CubicBezierCurve3:xf,EllipseCurve:Ao,LineCurve:Kc,LineCurve3:Sf,QuadraticBezierCurve:Zc,QuadraticBezierCurve3:Mf,SplineCurve:Jc});class yf extends gn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new wl[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const a=r[s]-i,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(new wl[r.type]().fromJSON(r))}return this}}class Al extends yf{constructor(e){super(),this.type="Path",this.currentPoint=new Ne,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new Kc(this.currentPoint.clone(),new Ne(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){const s=new Zc(this.currentPoint.clone(),new Ne(e,t),new Ne(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,s,a){const o=new $c(this.currentPoint.clone(),new Ne(e,t),new Ne(i,r),new Ne(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new Jc(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,r,s,a),this}absarc(e,t,i,r,s,a){return this.absellipse(e,t,i,i,r,s,a),this}ellipse(e,t,i,r,s,a,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,i,r,s,a,o,l),this}absellipse(e,t,i,r,s,a,o,l){const c=new Ao(e,t,i,r,s,a,o,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Qc extends Al{constructor(e){super(e),this.uuid=Ni(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(new Al().fromJSON(r))}return this}}function Ef(n,e,t=2){const i=e&&e.length,r=i?e[0]*t:n.length;let s=jc(n,0,r,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(i&&(s=Cf(n,e,s,t)),n.length>80*t){o=n[0],l=n[1];let u=o,h=l;for(let f=t;f<r;f+=t){const d=n[f],p=n[f+1];d<o&&(o=d),p<l&&(l=p),d>u&&(u=d),p>h&&(h=p)}c=Math.max(u-o,h-l),c=c!==0?32767/c:0}return lr(s,a,t,o,l,c,0),a}function jc(n,e,t,i,r){let s;if(r===kf(n,e,t,i)>0)for(let a=e;a<t;a+=i)s=Cl(a/i|0,n[a],n[a+1],s);else for(let a=t-i;a>=e;a-=i)s=Cl(a/i|0,n[a],n[a+1],s);return s&&Ii(s,s.next)&&(ur(s),s=s.next),s}function ri(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(Ii(t,t.next)||mt(t.prev,t,t.next)===0)){if(ur(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function lr(n,e,t,i,r,s,a){if(!n)return;!a&&s&&Df(n,i,r,s);let o=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(s?Tf(n,i,r,s):bf(n)){e.push(l.i,n.i,c.i),ur(n),n=c.next,o=c.next;continue}if(n=c,n===o){a?a===1?(n=wf(ri(n),e),lr(n,e,t,i,r,s,2)):a===2&&Af(n,e,t,i,r,s):lr(ri(n),e,t,i,r,s,1);break}}}function bf(n){const e=n.prev,t=n,i=n.next;if(mt(e,t,i)>=0)return!1;const r=e.x,s=t.x,a=i.x,o=e.y,l=t.y,c=i.y,u=Math.min(r,s,a),h=Math.min(o,l,c),f=Math.max(r,s,a),d=Math.max(o,l,c);let p=i.next;for(;p!==e;){if(p.x>=u&&p.x<=f&&p.y>=h&&p.y<=d&&Ki(r,o,s,l,a,c,p.x,p.y)&&mt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Tf(n,e,t,i){const r=n.prev,s=n,a=n.next;if(mt(r,s,a)>=0)return!1;const o=r.x,l=s.x,c=a.x,u=r.y,h=s.y,f=a.y,d=Math.min(o,l,c),p=Math.min(u,h,f),v=Math.max(o,l,c),m=Math.max(u,h,f),g=Qa(d,p,e,t,i),y=Qa(v,m,e,t,i);let w=n.prevZ,S=n.nextZ;for(;w&&w.z>=g&&S&&S.z<=y;){if(w.x>=d&&w.x<=v&&w.y>=p&&w.y<=m&&w!==r&&w!==a&&Ki(o,u,l,h,c,f,w.x,w.y)&&mt(w.prev,w,w.next)>=0||(w=w.prevZ,S.x>=d&&S.x<=v&&S.y>=p&&S.y<=m&&S!==r&&S!==a&&Ki(o,u,l,h,c,f,S.x,S.y)&&mt(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;w&&w.z>=g;){if(w.x>=d&&w.x<=v&&w.y>=p&&w.y<=m&&w!==r&&w!==a&&Ki(o,u,l,h,c,f,w.x,w.y)&&mt(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;S&&S.z<=y;){if(S.x>=d&&S.x<=v&&S.y>=p&&S.y<=m&&S!==r&&S!==a&&Ki(o,u,l,h,c,f,S.x,S.y)&&mt(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function wf(n,e){let t=n;do{const i=t.prev,r=t.next.next;!Ii(i,r)&&tu(i,t,t.next,r)&&cr(i,r)&&cr(r,i)&&(e.push(i.i,t.i,r.i),ur(t),ur(t.next),t=n=r),t=t.next}while(t!==n);return ri(t)}function Af(n,e,t,i,r,s){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Ff(a,o)){let l=nu(a,o);a=ri(a,a.next),l=ri(l,l.next),lr(a,e,t,i,r,s,0),lr(l,e,t,i,r,s,0);return}o=o.next}a=a.next}while(a!==n)}function Cf(n,e,t,i){const r=[];for(let s=0,a=e.length;s<a;s++){const o=e[s]*i,l=s<a-1?e[s+1]*i:n.length,c=jc(n,o,l,i,!1);c===c.next&&(c.steiner=!0),r.push(Uf(c))}r.sort(Rf);for(let s=0;s<r.length;s++)t=Lf(r[s],t);return t}function Rf(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=i-r}return t}function Lf(n,e){const t=Pf(n,e);if(!t)return e;const i=nu(t,n);return ri(i,i.next),ri(t,t.next)}function Pf(n,e){let t=e;const i=n.x,r=n.y;let s=-1/0,a;if(Ii(n,t))return t;do{if(Ii(n,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const h=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=i&&h>s&&(s=h,a=t.x<t.next.x?t:t.next,h===i))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let u=1/0;t=a;do{if(i>=t.x&&t.x>=l&&i!==t.x&&eu(r<c?i:s,r,l,c,r<c?s:i,r,t.x,t.y)){const h=Math.abs(r-t.y)/(i-t.x);cr(t,n)&&(h<u||h===u&&(t.x>a.x||t.x===a.x&&If(a,t)))&&(a=t,u=h)}t=t.next}while(t!==o);return a}function If(n,e){return mt(n.prev,n,e.prev)<0&&mt(e.next,n,n.next)<0}function Df(n,e,t,i){let r=n;do r.z===0&&(r.z=Qa(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,Nf(r)}function Nf(n){let e,t=1;do{let i=n,r;n=null;let s=null;for(e=0;i;){e++;let a=i,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||i.z<=a.z)?(r=i,i=i.nextZ,o--):(r=a,a=a.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;i=a}s.nextZ=null,t*=2}while(e>1);return n}function Qa(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function Uf(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function eu(n,e,t,i,r,s,a,o){return(r-a)*(e-o)>=(n-a)*(s-o)&&(n-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(i-o)}function Ki(n,e,t,i,r,s,a,o){return!(n===a&&e===o)&&eu(n,e,t,i,r,s,a,o)}function Ff(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!Of(n,e)&&(cr(n,e)&&cr(e,n)&&Bf(n,e)&&(mt(n.prev,n,e.prev)||mt(n,e.prev,e))||Ii(n,e)&&mt(n.prev,n,n.next)>0&&mt(e.prev,e,e.next)>0)}function mt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function Ii(n,e){return n.x===e.x&&n.y===e.y}function tu(n,e,t,i){const r=kr(mt(n,e,t)),s=kr(mt(n,e,i)),a=kr(mt(t,i,n)),o=kr(mt(t,i,e));return!!(r!==s&&a!==o||r===0&&Br(n,t,e)||s===0&&Br(n,i,e)||a===0&&Br(t,n,i)||o===0&&Br(t,e,i))}function Br(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function kr(n){return n>0?1:n<0?-1:0}function Of(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&tu(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function cr(n,e){return mt(n.prev,n,n.next)<0?mt(n,e,n.next)>=0&&mt(n,n.prev,e)>=0:mt(n,e,n.prev)<0||mt(n,n.next,e)<0}function Bf(n,e){let t=n,i=!1;const r=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function nu(n,e){const t=ja(n.i,n.x,n.y),i=ja(e.i,e.x,e.y),r=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function Cl(n,e,t,i){const r=ja(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function ur(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function ja(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function kf(n,e,t,i){let r=0;for(let s=e,a=t-i;s<t;s+=i)r+=(n[a]-n[s])*(n[s+1]+n[a+1]),a=s;return r}class zf{static triangulate(e,t,i=2){return Ef(e,t,i)}}class er{static area(e){const t=e.length;let i=0;for(let r=t-1,s=0;s<t;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return er.area(e)<0}static triangulateShape(e,t){const i=[],r=[],s=[];Rl(e),Ll(i,e);let a=e.length;t.forEach(Rl);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,Ll(i,t[l]);const o=zf.triangulate(i,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function Rl(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function Ll(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class ps extends Ht{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,h=e/o,f=t/l,d=[],p=[],v=[],m=[];for(let g=0;g<u;g++){const y=g*f-a;for(let w=0;w<c;w++){const S=w*h-s;p.push(S,-y,0),v.push(0,0,1),m.push(w/o),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let y=0;y<o;y++){const w=y+c*g,S=y+c*(g+1),T=y+1+c*(g+1),b=y+1+c*g;d.push(w,S,b),d.push(S,T,b)}this.setIndex(d),this.setAttribute("position",new Et(p,3)),this.setAttribute("normal",new Et(v,3)),this.setAttribute("uv",new Et(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ps(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ro extends Ht{constructor(e=new Qc([new Ne(0,.5),new Ne(-.5,-.5),new Ne(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const i=[],r=[],s=[],a=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(i),this.setAttribute("position",new Et(r,3)),this.setAttribute("normal",new Et(s,3)),this.setAttribute("uv",new Et(a,2));function c(u){const h=r.length/3,f=u.extractPoints(t);let d=f.shape;const p=f.holes;er.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,g=p.length;m<g;m++){const y=p[m];er.isClockWise(y)===!0&&(p[m]=y.reverse())}const v=er.triangulateShape(d,p);for(let m=0,g=p.length;m<g;m++){const y=p[m];d=d.concat(y)}for(let m=0,g=d.length;m<g;m++){const y=d[m];r.push(y.x,y.y,0),s.push(0,0,1),a.push(y.x,y.y)}for(let m=0,g=v.length;m<g;m++){const y=v[m],w=y[0]+h,S=y[1]+h,T=y[2]+h;i.push(w,S,T),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return Hf(t,e)}static fromJSON(e,t){const i=[];for(let r=0,s=e.shapes.length;r<s;r++){const a=t[e.shapes[r]];i.push(a)}return new Ro(i,e.curveSegments)}}function Hf(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){const r=n[t];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e}function Di(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(Pl(r))r.isRenderTargetTexture?(Be("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(Pl(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Bt(n){const e={};for(let t=0;t<n.length;t++){const i=Di(n[t]);for(const r in i)e[r]=i[r]}return e}function Pl(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Vf(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function iu(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:je.workingColorSpace}const Gf={clone:Di,merge:Bt};var Wf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Xf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class mn extends hs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Wf,this.fragmentShader=Xf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Di(e.uniforms),this.uniformsGroups=Vf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new qe().setHex(r.value);break;case"v2":this.uniforms[i].value=new Ne().fromArray(r.value);break;case"v3":this.uniforms[i].value=new X().fromArray(r.value);break;case"v4":this.uniforms[i].value=new gt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Ve().fromArray(r.value);break;case"m4":this.uniforms[i].value=new xt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class qf extends mn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Yf extends hs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=bd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class $f extends hs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ea={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(Il(n)||(this.files[n]=e))},get:function(n){if(this.enabled!==!1&&!Il(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function Il(n){try{const e=n.slice(n.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class ru{constructor(e,t,i){const r=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=c.length;h<f;h+=2){const d=c[h],p=c[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Kf=new ru;class Lo{constructor(e){this.manager=e!==void 0?e:Kf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Lo.DEFAULT_MATERIAL_NAME="__DEFAULT";const _i=new WeakMap;class Zf extends Lo{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=ea.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let h=_i.get(a);h===void 0&&(h=[],_i.set(a,h)),h.push({onLoad:t,onError:r})}return a}const o=ar("img");function l(){u(),t&&t(this);const h=_i.get(this)||[];for(let f=0;f<h.length;f++){const d=h[f];d.onLoad&&d.onLoad(this)}_i.delete(this),s.manager.itemEnd(e)}function c(h){u(),r&&r(h),ea.remove(`image:${e}`);const f=_i.get(this)||[];for(let d=0;d<f.length;d++){const p=f[d];p.onError&&p.onError(h)}_i.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),ea.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class ta extends Lo{constructor(e){super(e)}load(e,t,i,r){const s=new Ft,a=new Zf(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},i,r),s}}const zr=new X,Hr=new Ui,sn=new X;class su extends Wt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new xt,this.projectionMatrix=new xt,this.projectionMatrixInverse=new xt,this.coordinateSystem=dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(zr,Hr,sn),sn.x===1&&sn.y===1&&sn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(zr,Hr,sn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(zr,Hr,sn),sn.x===1&&sn.y===1&&sn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(zr,Hr,sn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const On=new X,Dl=new Ne,Nl=new Ne;class Qt extends su{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ja*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Cs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ja*2*Math.atan(Math.tan(Cs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){On.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(On.x,On.y).multiplyScalar(-e/On.z),On.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(On.x,On.y).multiplyScalar(-e/On.z)}getViewSize(e,t){return this.getViewBounds(e,Dl,Nl),t.subVectors(Nl,Dl)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Cs*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Po extends su{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const xi=-90,Si=1;class Jf extends Wt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Qt(xi,Si,e,t);r.layers=this.layers,this.add(r);const s=new Qt(xi,Si,e,t);s.layers=this.layers,this.add(s);const a=new Qt(xi,Si,e,t);a.layers=this.layers,this.add(a);const o=new Qt(xi,Si,e,t);o.layers=this.layers,this.add(o);const l=new Qt(xi,Si,e,t);l.layers=this.layers,this.add(l);const c=new Qt(xi,Si,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===dn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ls)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class Qf extends Qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Bo=class Bo{constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};Bo.prototype.isMatrix2=!0;let Ul=Bo;function Fl(n,e,t,i){const r=jf(i);switch(t){case Fc:return n*e;case Bc:return n*e/r.components*r.byteLength;case So:return n*e/r.components*r.byteLength;case ni:return n*e*2/r.components*r.byteLength;case Mo:return n*e*2/r.components*r.byteLength;case Oc:return n*e*3/r.components*r.byteLength;case en:return n*e*4/r.components*r.byteLength;case yo:return n*e*4/r.components*r.byteLength;case Kr:case Zr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Jr:case Qr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ya:case ba:return Math.max(n,16)*Math.max(e,8)/4;case Ma:case Ea:return Math.max(n,8)*Math.max(e,8)/2;case Ta:case wa:case Ca:case Ra:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Aa:case rs:case La:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Pa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ia:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Da:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Na:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Ua:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Fa:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Oa:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Ba:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case ka:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case za:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Ha:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Va:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ga:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Wa:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Xa:case qa:case Ya:return Math.ceil(n/4)*Math.ceil(e/4)*16;case $a:case Ka:return Math.ceil(n/4)*Math.ceil(e/4)*8;case ss:case Za:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function jf(n){switch(n){case Yt:case Ic:return{byteLength:1,components:1};case rr:case Dc:case hn:return{byteLength:2,components:1};case _o:case xo:return{byteLength:2,components:4};case fn:case vo:case un:return{byteLength:4,components:1};case Nc:case Uc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:go}}));typeof window<"u"&&(window.__THREE__?Be("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=go);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function au(){let n=null,e=!1,t=null,i=null;function r(s,a){i=n.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function eh(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,h=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),o.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,o),h.length===0)n.bufferSubData(c,0,u);else{h.sort((d,p)=>d.start-p.start);let f=0;for(let d=1;d<h.length;d++){const p=h[f],v=h[d];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++f,h[f]=v)}h.length=f+1;for(let d=0,p=h.length;d<p;d++){const v=h[d];n.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var th=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,nh=`#ifdef USE_ALPHAHASH
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
#endif`,ih=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,rh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ah=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,oh=`#ifdef USE_AOMAP
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
#endif`,lh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ch=`#ifdef USE_BATCHING
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
#endif`,uh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,dh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,fh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,hh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ph=`#ifdef USE_IRIDESCENCE
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
#endif`,mh=`#ifdef USE_BUMPMAP
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
#endif`,gh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,vh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_h=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Sh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Mh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,yh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Eh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,bh=`#define PI 3.141592653589793
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
} // validated`,Th=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,wh=`vec3 transformedNormal = objectNormal;
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
#endif`,Ah=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ch=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Lh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ph="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ih=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Dh=`#ifdef USE_ENVMAP
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
#endif`,Nh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Uh=`#ifdef USE_ENVMAP
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
#endif`,Fh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Oh=`#ifdef USE_ENVMAP
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
#endif`,Bh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,kh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Hh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Vh=`#ifdef USE_GRADIENTMAP
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
}`,Gh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Wh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Xh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,qh=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Yh=`#ifdef USE_ENVMAP
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
#endif`,$h=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Kh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Zh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Qh=`PhysicalMaterial material;
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
#endif`,jh=`uniform sampler2D dfgLUT;
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
}`,ep=`
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
#endif`,tp=`#if defined( RE_IndirectDiffuse )
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
#endif`,np=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ip=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,rp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ap=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,op=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,lp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,up=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,dp=`#if defined( USE_POINTS_UV )
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
#endif`,fp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,hp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,mp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vp=`#ifdef USE_MORPHTARGETS
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
#endif`,_p=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Sp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Mp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ep=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,bp=`#ifdef USE_NORMALMAP
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
#endif`,Tp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,wp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ap=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Cp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Rp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Lp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Pp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ip=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Dp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Np=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Up=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Fp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Op=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Bp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,kp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,zp=`float getShadowMask() {
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
}`,Hp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Vp=`#ifdef USE_SKINNING
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
#endif`,Gp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Wp=`#ifdef USE_SKINNING
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
#endif`,Xp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,qp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Yp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$p=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Kp=`#ifdef USE_TRANSMISSION
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
#endif`,Zp=`#ifdef USE_TRANSMISSION
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
#endif`,Jp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,em=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const tm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,nm=`uniform sampler2D t2D;
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
}`,im=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,sm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,am=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,om=`#include <common>
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
}`,lm=`#if DEPTH_PACKING == 3200
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
}`,cm=`#define DISTANCE
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
}`,um=`#define DISTANCE
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
}`,dm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,fm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hm=`uniform float scale;
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
}`,pm=`uniform vec3 diffuse;
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
}`,mm=`#include <common>
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
}`,gm=`uniform vec3 diffuse;
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
}`,vm=`#define LAMBERT
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
}`,_m=`#define LAMBERT
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
}`,xm=`#define MATCAP
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
}`,Sm=`#define MATCAP
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
}`,Mm=`#define NORMAL
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
}`,ym=`#define NORMAL
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
}`,Em=`#define PHONG
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
}`,bm=`#define PHONG
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
}`,Tm=`#define STANDARD
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
}`,wm=`#define STANDARD
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
}`,Am=`#define TOON
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
}`,Cm=`#define TOON
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
}`,Rm=`uniform float size;
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
}`,Lm=`uniform vec3 diffuse;
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
}`,Pm=`#include <common>
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
}`,Im=`uniform vec3 color;
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
}`,Dm=`uniform float rotation;
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
}`,Nm=`uniform vec3 diffuse;
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
}`,$e={alphahash_fragment:th,alphahash_pars_fragment:nh,alphamap_fragment:ih,alphamap_pars_fragment:rh,alphatest_fragment:sh,alphatest_pars_fragment:ah,aomap_fragment:oh,aomap_pars_fragment:lh,batching_pars_vertex:ch,batching_vertex:uh,begin_vertex:dh,beginnormal_vertex:fh,bsdfs:hh,iridescence_fragment:ph,bumpmap_pars_fragment:mh,clipping_planes_fragment:gh,clipping_planes_pars_fragment:vh,clipping_planes_pars_vertex:_h,clipping_planes_vertex:xh,color_fragment:Sh,color_pars_fragment:Mh,color_pars_vertex:yh,color_vertex:Eh,common:bh,cube_uv_reflection_fragment:Th,defaultnormal_vertex:wh,displacementmap_pars_vertex:Ah,displacementmap_vertex:Ch,emissivemap_fragment:Rh,emissivemap_pars_fragment:Lh,colorspace_fragment:Ph,colorspace_pars_fragment:Ih,envmap_fragment:Dh,envmap_common_pars_fragment:Nh,envmap_pars_fragment:Uh,envmap_pars_vertex:Fh,envmap_physical_pars_fragment:Yh,envmap_vertex:Oh,fog_vertex:Bh,fog_pars_vertex:kh,fog_fragment:zh,fog_pars_fragment:Hh,gradientmap_pars_fragment:Vh,lightmap_pars_fragment:Gh,lights_lambert_fragment:Wh,lights_lambert_pars_fragment:Xh,lights_pars_begin:qh,lights_toon_fragment:$h,lights_toon_pars_fragment:Kh,lights_phong_fragment:Zh,lights_phong_pars_fragment:Jh,lights_physical_fragment:Qh,lights_physical_pars_fragment:jh,lights_fragment_begin:ep,lights_fragment_maps:tp,lights_fragment_end:np,lightprobes_pars_fragment:ip,logdepthbuf_fragment:rp,logdepthbuf_pars_fragment:sp,logdepthbuf_pars_vertex:ap,logdepthbuf_vertex:op,map_fragment:lp,map_pars_fragment:cp,map_particle_fragment:up,map_particle_pars_fragment:dp,metalnessmap_fragment:fp,metalnessmap_pars_fragment:hp,morphinstance_vertex:pp,morphcolor_vertex:mp,morphnormal_vertex:gp,morphtarget_pars_vertex:vp,morphtarget_vertex:_p,normal_fragment_begin:xp,normal_fragment_maps:Sp,normal_pars_fragment:Mp,normal_pars_vertex:yp,normal_vertex:Ep,normalmap_pars_fragment:bp,clearcoat_normal_fragment_begin:Tp,clearcoat_normal_fragment_maps:wp,clearcoat_pars_fragment:Ap,iridescence_pars_fragment:Cp,opaque_fragment:Rp,packing:Lp,premultiplied_alpha_fragment:Pp,project_vertex:Ip,dithering_fragment:Dp,dithering_pars_fragment:Np,roughnessmap_fragment:Up,roughnessmap_pars_fragment:Fp,shadowmap_pars_fragment:Op,shadowmap_pars_vertex:Bp,shadowmap_vertex:kp,shadowmask_pars_fragment:zp,skinbase_vertex:Hp,skinning_pars_vertex:Vp,skinning_vertex:Gp,skinnormal_vertex:Wp,specularmap_fragment:Xp,specularmap_pars_fragment:qp,tonemapping_fragment:Yp,tonemapping_pars_fragment:$p,transmission_fragment:Kp,transmission_pars_fragment:Zp,uv_pars_fragment:Jp,uv_pars_vertex:Qp,uv_vertex:jp,worldpos_vertex:em,background_vert:tm,background_frag:nm,backgroundCube_vert:im,backgroundCube_frag:rm,cube_vert:sm,cube_frag:am,depth_vert:om,depth_frag:lm,distance_vert:cm,distance_frag:um,equirect_vert:dm,equirect_frag:fm,linedashed_vert:hm,linedashed_frag:pm,meshbasic_vert:mm,meshbasic_frag:gm,meshlambert_vert:vm,meshlambert_frag:_m,meshmatcap_vert:xm,meshmatcap_frag:Sm,meshnormal_vert:Mm,meshnormal_frag:ym,meshphong_vert:Em,meshphong_frag:bm,meshphysical_vert:Tm,meshphysical_frag:wm,meshtoon_vert:Am,meshtoon_frag:Cm,points_vert:Rm,points_frag:Lm,shadow_vert:Pm,shadow_frag:Im,sprite_vert:Dm,sprite_frag:Nm},Me={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new Ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new X},probesMax:{value:new X},probesResolution:{value:new X}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new Ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},on={basic:{uniforms:Bt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.fog]),vertexShader:$e.meshbasic_vert,fragmentShader:$e.meshbasic_frag},lambert:{uniforms:Bt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new qe(0)},envMapIntensity:{value:1}}]),vertexShader:$e.meshlambert_vert,fragmentShader:$e.meshlambert_frag},phong:{uniforms:Bt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:$e.meshphong_vert,fragmentShader:$e.meshphong_frag},standard:{uniforms:Bt([Me.common,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.roughnessmap,Me.metalnessmap,Me.fog,Me.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag},toon:{uniforms:Bt([Me.common,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.gradientmap,Me.fog,Me.lights,{emissive:{value:new qe(0)}}]),vertexShader:$e.meshtoon_vert,fragmentShader:$e.meshtoon_frag},matcap:{uniforms:Bt([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,{matcap:{value:null}}]),vertexShader:$e.meshmatcap_vert,fragmentShader:$e.meshmatcap_frag},points:{uniforms:Bt([Me.points,Me.fog]),vertexShader:$e.points_vert,fragmentShader:$e.points_frag},dashed:{uniforms:Bt([Me.common,Me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$e.linedashed_vert,fragmentShader:$e.linedashed_frag},depth:{uniforms:Bt([Me.common,Me.displacementmap]),vertexShader:$e.depth_vert,fragmentShader:$e.depth_frag},normal:{uniforms:Bt([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,{opacity:{value:1}}]),vertexShader:$e.meshnormal_vert,fragmentShader:$e.meshnormal_frag},sprite:{uniforms:Bt([Me.sprite,Me.fog]),vertexShader:$e.sprite_vert,fragmentShader:$e.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$e.background_vert,fragmentShader:$e.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:$e.backgroundCube_vert,fragmentShader:$e.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$e.cube_vert,fragmentShader:$e.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$e.equirect_vert,fragmentShader:$e.equirect_frag},distance:{uniforms:Bt([Me.common,Me.displacementmap,{referencePosition:{value:new X},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$e.distance_vert,fragmentShader:$e.distance_frag},shadow:{uniforms:Bt([Me.lights,Me.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:$e.shadow_vert,fragmentShader:$e.shadow_frag}};on.physical={uniforms:Bt([on.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new Ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new Ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new Ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag};const Vr={r:0,b:0,g:0},Um=new xt,ou=new Ve;ou.set(-1,0,0,0,1,0,0,0,1);function Fm(n,e,t,i,r,s){const a=new qe(0);let o=r===!0?0:1,l,c,u=null,h=0,f=null;function d(y){let w=y.isScene===!0?y.background:null;if(w&&w.isTexture){const S=y.backgroundBlurriness>0;w=e.get(w,S)}return w}function p(y){let w=!1;const S=d(y);S===null?m(a,o):S&&S.isColor&&(m(S,1),w=!0);const T=n.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,s):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(y,w){const S=d(w);S&&(S.isCubeTexture||S.mapping===fs)?(c===void 0&&(c=new pn(new hr(1,1,1),new mn({name:"BackgroundCubeMaterial",uniforms:Di(on.backgroundCube.uniforms),vertexShader:on.backgroundCube.vertexShader,fragmentShader:on.backgroundCube.fragmentShader,side:zt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,b,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Um.makeRotationFromEuler(w.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(ou),c.material.toneMapped=je.getTransfer(S.colorSpace)!==rt,(u!==S||h!==S.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=S,h=S.version,f=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new pn(new ps(2,2),new mn({name:"BackgroundMaterial",uniforms:Di(on.background.uniforms),vertexShader:on.background.vertexShader,fragmentShader:on.background.fragmentShader,side:ei,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=je.getTransfer(S.colorSpace)!==rt,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||h!==S.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,u=S,h=S.version,f=n.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function m(y,w){y.getRGB(Vr,iu(n)),t.buffers.color.setClear(Vr.r,Vr.g,Vr.b,w,s)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,w=1){a.set(y),o=w,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,m(a,o)},render:p,addToRenderList:v,dispose:g}}function Om(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,a=!1;function o(D,P,F,N,H){let Q=!1;const G=h(D,N,F,P);s!==G&&(s=G,c(s.object)),Q=d(D,N,F,H),Q&&p(D,N,F,H),H!==null&&e.update(H,n.ELEMENT_ARRAY_BUFFER),(Q||a)&&(a=!1,S(D,P,F,N),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return n.createVertexArray()}function c(D){return n.bindVertexArray(D)}function u(D){return n.deleteVertexArray(D)}function h(D,P,F,N){const H=N.wireframe===!0;let Q=i[P.id];Q===void 0&&(Q={},i[P.id]=Q);const G=D.isInstancedMesh===!0?D.id:0;let U=Q[G];U===void 0&&(U={},Q[G]=U);let V=U[F.id];V===void 0&&(V={},U[F.id]=V);let ee=V[H];return ee===void 0&&(ee=f(l()),V[H]=ee),ee}function f(D){const P=[],F=[],N=[];for(let H=0;H<t;H++)P[H]=0,F[H]=0,N[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:F,attributeDivisors:N,object:D,attributes:{},index:null}}function d(D,P,F,N){const H=s.attributes,Q=P.attributes;let G=0;const U=F.getAttributes();for(const V in U)if(U[V].location>=0){const te=H[V];let Z=Q[V];if(Z===void 0&&(V==="instanceMatrix"&&D.instanceMatrix&&(Z=D.instanceMatrix),V==="instanceColor"&&D.instanceColor&&(Z=D.instanceColor)),te===void 0||te.attribute!==Z||Z&&te.data!==Z.data)return!0;G++}return s.attributesNum!==G||s.index!==N}function p(D,P,F,N){const H={},Q=P.attributes;let G=0;const U=F.getAttributes();for(const V in U)if(U[V].location>=0){let te=Q[V];te===void 0&&(V==="instanceMatrix"&&D.instanceMatrix&&(te=D.instanceMatrix),V==="instanceColor"&&D.instanceColor&&(te=D.instanceColor));const Z={};Z.attribute=te,te&&te.data&&(Z.data=te.data),H[V]=Z,G++}s.attributes=H,s.attributesNum=G,s.index=N}function v(){const D=s.newAttributes;for(let P=0,F=D.length;P<F;P++)D[P]=0}function m(D){g(D,0)}function g(D,P){const F=s.newAttributes,N=s.enabledAttributes,H=s.attributeDivisors;F[D]=1,N[D]===0&&(n.enableVertexAttribArray(D),N[D]=1),H[D]!==P&&(n.vertexAttribDivisor(D,P),H[D]=P)}function y(){const D=s.newAttributes,P=s.enabledAttributes;for(let F=0,N=P.length;F<N;F++)P[F]!==D[F]&&(n.disableVertexAttribArray(F),P[F]=0)}function w(D,P,F,N,H,Q,G){G===!0?n.vertexAttribIPointer(D,P,F,H,Q):n.vertexAttribPointer(D,P,F,N,H,Q)}function S(D,P,F,N){v();const H=N.attributes,Q=F.getAttributes(),G=P.defaultAttributeValues;for(const U in Q){const V=Q[U];if(V.location>=0){let ee=H[U];if(ee===void 0&&(U==="instanceMatrix"&&D.instanceMatrix&&(ee=D.instanceMatrix),U==="instanceColor"&&D.instanceColor&&(ee=D.instanceColor)),ee!==void 0){const te=ee.normalized,Z=ee.itemSize,ue=e.get(ee);if(ue===void 0)continue;const Le=ue.buffer,Se=ue.type,me=ue.bytesPerElement,O=Se===n.INT||Se===n.UNSIGNED_INT||ee.gpuType===vo;if(ee.isInterleavedBufferAttribute){const q=ee.data,ae=q.stride,be=ee.offset;if(q.isInstancedInterleavedBuffer){for(let j=0;j<V.locationSize;j++)g(V.location+j,q.meshPerAttribute);D.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let j=0;j<V.locationSize;j++)m(V.location+j);n.bindBuffer(n.ARRAY_BUFFER,Le);for(let j=0;j<V.locationSize;j++)w(V.location+j,Z/V.locationSize,Se,te,ae*me,(be+Z/V.locationSize*j)*me,O)}else{if(ee.isInstancedBufferAttribute){for(let q=0;q<V.locationSize;q++)g(V.location+q,ee.meshPerAttribute);D.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let q=0;q<V.locationSize;q++)m(V.location+q);n.bindBuffer(n.ARRAY_BUFFER,Le);for(let q=0;q<V.locationSize;q++)w(V.location+q,Z/V.locationSize,Se,te,Z*me,Z/V.locationSize*q*me,O)}}else if(G!==void 0){const te=G[U];if(te!==void 0)switch(te.length){case 2:n.vertexAttrib2fv(V.location,te);break;case 3:n.vertexAttrib3fv(V.location,te);break;case 4:n.vertexAttrib4fv(V.location,te);break;default:n.vertexAttrib1fv(V.location,te)}}}}y()}function T(){M();for(const D in i){const P=i[D];for(const F in P){const N=P[F];for(const H in N){const Q=N[H];for(const G in Q)u(Q[G].object),delete Q[G];delete N[H]}}delete i[D]}}function b(D){if(i[D.id]===void 0)return;const P=i[D.id];for(const F in P){const N=P[F];for(const H in N){const Q=N[H];for(const G in Q)u(Q[G].object),delete Q[G];delete N[H]}}delete i[D.id]}function I(D){for(const P in i){const F=i[P];for(const N in F){const H=F[N];if(H[D.id]===void 0)continue;const Q=H[D.id];for(const G in Q)u(Q[G].object),delete Q[G];delete H[D.id]}}}function x(D){for(const P in i){const F=i[P],N=D.isInstancedMesh===!0?D.id:0,H=F[N];if(H!==void 0){for(const Q in H){const G=H[Q];for(const U in G)u(G[U].object),delete G[U];delete H[Q]}delete F[N],Object.keys(F).length===0&&delete i[P]}}}function M(){R(),a=!0,s!==r&&(s=r,c(s.object))}function R(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:M,resetDefaultState:R,dispose:T,releaseStatesOfGeometry:b,releaseStatesOfObject:x,releaseStatesOfProgram:I,initAttributes:v,enableAttribute:m,disableUnusedAttributes:y}}function Bm(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let f=0;for(let d=0;d<u;d++)f+=c[d];t.update(f,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function km(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const I=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(I){return!(I!==en&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(I){const x=I===hn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==Yt&&I!==un&&!x&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(I){if(I==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Be("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&Be("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=n.getParameter(n.MAX_SAMPLES),b=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:y,maxVaryings:w,maxFragmentUniforms:S,maxSamples:T,samples:b}}function zm(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new zn,o=new Ve,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||i!==0||r;return r=f,i=h.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){const p=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,g=n.get(h);if(!r||p===null||p.length===0||s&&!m)s?u(null):c();else{const y=s?0:i,w=y*4;let S=g.clippingState||null;l.value=S,S=u(p,f,w,d);for(let T=0;T!==w;++T)S[T]=t[T];g.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,f,d,p){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=l.value,p!==!0||m===null){const g=d+v*4,y=f.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<g)&&(m=new Float32Array(g));for(let w=0,S=d;w!==v;++w,S+=4)a.copy(h[w]).applyMatrix4(y,o),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}const Ti=4,Hm=6,Vm=20,Gm=256,Wi=new Po,Ol=new qe;let na=null,ia=0,ra=0,sa=!1;const Wm=new X,Yn=new X;class Bl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=Wm}=s;na=this._renderer.getRenderTarget(),ia=this._renderer.getActiveCubeFace(),ra=this._renderer.getActiveMipmapLevel(),sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Hl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=zl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(na,ia,ra),this._renderer.xr.enabled=sa,e.scissorTest=!1,Mi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ti||e.mapping===Pi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),na=this._renderer.getRenderTarget(),ia=this._renderer.getActiveCubeFace(),ra=this._renderer.getActiveMipmapLevel(),sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ut,minFilter:Ut,generateMipmaps:!1,type:hn,format:en,colorSpace:as,depthBuffer:!1},r=kl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=kl(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Xm(s)),this._blurMaterial=Ym(s,e,t),this._ggxMaterial=qm(s,e,t)}return r}_compileMaterial(e){const t=new pn(new Ht,e);this._renderer.compile(t,Wi)}_sceneToCubeUV(e,t,i,r,s){const l=new Qt(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(Ol),h.toneMapping=tn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new pn(new hr,new ot({name:"PMREM.Background",side:zt,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,m=v.material;let g=!1;const y=e.background;y?y.isColor&&(m.color.copy(y),e.background=null,g=!0):(m.color.copy(Ol),g=!0);for(let w=0;w<6;w++){const S=w%3;S===0?(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[w],s.y,s.z)):S===1?(l.up.set(0,0,c[w]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[w],s.z)):(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[w]));const T=this._cubeSize;Mi(r,S*T,w>2?T:0,T,T),h.setRenderTarget(r),g&&h.render(v,l),h.render(e,l)}h.toneMapping=d,h.autoClear=f,e.background=y}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===ti||e.mapping===Pi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Hl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=zl());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Mi(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Wi)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-u*u),f=c*1.25,d=h*f,{_lodMax:p}=this,v=this._sizeLods[i],m=3*v*(i>p-Ti?i-p+Ti:0),g=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=d,l.mipInt.value=p-t,Mi(s,m,g,3*v,2*v),r.setRenderTarget(s),r.render(o,Wi),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=p-i,Mi(e,m,g,3*v,2*v),r.setRenderTarget(e),r.render(o,Wi)}_blur(e,t,i,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,i,a),this._blurPass(s,e,i,i,a)}_blurPass(e,t,i,r,s){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[r];l.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-i;const u=this._sizeLods[r],h=3*u*(r>this._lodMax-Ti?r-this._lodMax+Ti:0),f=4*(this._cubeSize-u);Mi(t,h,f,3*u,2*u),a.setRenderTarget(t),a.render(l,Wi)}}function Xm(n){const e=[],t=[];let i=n;const r=n-Ti+1+Hm;for(let s=0;s<r;s++){const a=Math.pow(2,i);e.push(a);const o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],h=6,f=6,d=3,p=new Float32Array(d*f*h),v=new Float32Array(d*f*h);for(let g=0;g<h;g++){const y=g%3*2/3-1,w=g>2?0:-1,S=[y,w,0,y+2/3,w,0,y+2/3,w+1,0,y,w,0,y+2/3,w+1,0,y,w+1,0];p.set(S,d*f*g);for(let T=0;T<f;T++){const b=u[T*2]*2-1,I=u[T*2+1]*2-1;g===0?Yn.set(1,I,b):g===1?Yn.set(-b,1,-I):g===2?Yn.set(-b,I,1):g===3?Yn.set(-1,I,-b):g===4?Yn.set(-b,-1,I):Yn.set(b,I,-1),Yn.toArray(v,(g*f+T)*d)}}const m=new Ht;m.setAttribute("position",new wn(p,d)),m.setAttribute("outputDirection",new wn(v,d)),t.push(new pn(m,null)),i>Ti&&i--}return{lodMeshes:t,sizeLods:e}}function kl(n,e,t){const i=new nn(n,e,t);return i.texture.mapping=fs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Mi(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function qm(n,e,t){return new mn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Gm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ms(),fragmentShader:`

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
		`,blending:bn,depthTest:!1,depthWrite:!1})}function Ym(n,e,t){return new mn({name:"SphericalGaussianBlur",defines:{SAMPLES:Vm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:ms(),fragmentShader:`

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
		`,blending:bn,depthTest:!1,depthWrite:!1})}function zl(){return new mn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ms(),fragmentShader:`

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
		`,blending:bn,depthTest:!1,depthWrite:!1})}function Hl(){return new mn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ms(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function ms(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class lu extends nn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new qc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new hr(5,5,5),s=new mn({name:"CubemapFromEquirect",uniforms:Di(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:zt,blending:bn});s.uniforms.tEquirect.value=t;const a=new pn(r,s),o=t.minFilter;return t.minFilter===Kn&&(t.minFilter=Ut),new Jf(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function $m(n){let e=new WeakMap,t=new WeakMap,i=null;function r(f,d=!1){return f==null?null:d?a(f):s(f)}function s(f){if(f&&f.isTexture){const d=f.mapping;if(d===bs||d===Ts)if(e.has(f)){const p=e.get(f).texture;return o(p,f.mapping)}else{const p=f.image;if(p&&p.height>0){const v=new lu(p.height);return v.fromEquirectangularTexture(n,f),e.set(f,v),f.addEventListener("dispose",c),o(v.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){const d=f.mapping,p=d===bs||d===Ts,v=d===ti||d===Pi;if(p||v){let m=t.get(f);const g=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==g)return i===null&&(i=new Bl(n)),m=p?i.fromEquirectangular(f,m):i.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),m.texture;if(m!==void 0)return m.texture;{const y=f.image;return p&&y&&y.height>0||v&&y&&l(y)?(i===null&&(i=new Bl(n)),m=p?i.fromEquirectangular(f):i.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),f.addEventListener("dispose",u),m.texture):null}}}return f}function o(f,d){return d===bs?f.mapping=ti:d===Ts&&(f.mapping=Pi),f}function l(f){let d=0;const p=6;for(let v=0;v<p;v++)f[v]!==void 0&&d++;return d===p}function c(f){const d=f.target;d.removeEventListener("dispose",c);const p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function u(f){const d=f.target;d.removeEventListener("dispose",u);const p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function h(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function Km(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Ri("WebGLRenderer: "+i+" extension not supported."),r}}}function Zm(n,e,t,i){const r={},s=new WeakMap;function a(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const p in f.attributes)e.remove(f.attributes[p]);f.removeEventListener("dispose",a),delete r[f.id];const d=s.get(f);d&&(e.remove(d),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(h,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const d in f)e.update(f[d],n.ARRAY_BUFFER)}function c(h){const f=[],d=h.index,p=h.attributes.position;let v=0;if(p===void 0)return;if(d!==null){const y=d.array;v=d.version;for(let w=0,S=y.length;w<S;w+=3){const T=y[w+0],b=y[w+1],I=y[w+2];f.push(T,b,b,I,I,T)}}else{const y=p.array;v=p.version;for(let w=0,S=y.length/3-1;w<S;w+=3){const T=w+0,b=w+1,I=w+2;f.push(T,b,b,I,I,T)}}const m=new(p.count>=65535?Wc:Gc)(f,1);m.version=v;const g=s.get(h);g&&e.remove(g),s.set(h,m)}function u(h){const f=s.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function Jm(n,e,t){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,f){n.drawElements(i,f,s,h*a),t.update(f,i,1)}function c(h,f,d){d!==0&&(n.drawElementsInstanced(i,f,s,h*a,d),t.update(f,i,d))}function u(h,f,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,h,0,d);let v=0;for(let m=0;m<d;m++)v+=f[m];t.update(v,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function Qm(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:nt("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function jm(n,e,t){const i=new WeakMap,r=new gt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(o);if(f===void 0||f.count!==h){let M=function(){I.dispose(),i.delete(o),o.removeEventListener("dispose",M)};f!==void 0&&f.texture.dispose();const d=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let w=0;d===!0&&(w=1),p===!0&&(w=2),v===!0&&(w=3);let S=o.attributes.position.count*w,T=1;S>e.maxTextureSize&&(T=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const b=new Float32Array(S*T*4*h),I=new zc(b,S,T,h);I.type=un,I.needsUpdate=!0;const x=w*4;for(let R=0;R<h;R++){const D=m[R],P=g[R],F=y[R],N=S*T*4*R;for(let H=0;H<D.count;H++){const Q=H*x;d===!0&&(r.fromBufferAttribute(D,H),b[N+Q+0]=r.x,b[N+Q+1]=r.y,b[N+Q+2]=r.z,b[N+Q+3]=0),p===!0&&(r.fromBufferAttribute(P,H),b[N+Q+4]=r.x,b[N+Q+5]=r.y,b[N+Q+6]=r.z,b[N+Q+7]=0),v===!0&&(r.fromBufferAttribute(F,H),b[N+Q+8]=r.x,b[N+Q+9]=r.y,b[N+Q+10]=r.z,b[N+Q+11]=F.itemSize===4?r.w:1)}}f={count:h,texture:I,size:new Ne(S,T)},i.set(o,f),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let d=0;for(let v=0;v<c.length;v++)d+=c[v];const p=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(n,"morphTargetBaseInfluence",p),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function eg(n,e,t,i,r){let s=new WeakMap;function a(c){const u=r.render.frame,h=c.geometry,f=e.get(c,h);if(s.get(f)!==u&&(e.update(f),s.set(f,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==u&&(d.update(),s.set(d,u))}return f}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const tg={[bc]:"LINEAR_TONE_MAPPING",[Tc]:"REINHARD_TONE_MAPPING",[wc]:"CINEON_TONE_MAPPING",[Ac]:"ACES_FILMIC_TONE_MAPPING",[Rc]:"AGX_TONE_MAPPING",[Lc]:"NEUTRAL_TONE_MAPPING",[Cc]:"CUSTOM_TONE_MAPPING"};function ng(n,e,t,i,r,s){const a=new nn(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new Ht;c.setAttribute("position",new Et([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Et([0,2,0,0,2,0],2));const u=new qf({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new pn(c,u),f=new Po(-1,1,1,-1,0,1);let d=null,p=null,v=!1,m,g=null,y=[],w=!1;this.setSize=function(S,T){a.setSize(S,T),o!==null&&o.setSize(S,T),l!==null&&l.setSize(S,T);for(let b=0;b<y.length;b++){const I=y[b];I.setSize&&I.setSize(S,T)}},this.setEffects=function(S){y=S,w=y.length>0&&y[0].isRenderPass===!0;const T=a.width,b=a.height;y.length>0&&o===null&&(o=new nn(T,b,{type:hn,depthBuffer:!1,stencilBuffer:!1}),l=new nn(T,b,{type:hn,depthBuffer:!1,stencilBuffer:!1}));for(let I=0;I<y.length;I++){const x=y[I];x.setSize&&x.setSize(T,b)}},this.begin=function(S,T){if(v||S.toneMapping===tn&&y.length===0)return!1;if(g=T,T!==null){const b=T.width,I=T.height;(a.width!==b||a.height!==I)&&this.setSize(b,I)}return w===!1&&S.setRenderTarget(a),m=S.toneMapping,S.toneMapping=tn,!0},this.hasRenderPass=function(){return w},this.end=function(S,T){S.toneMapping=m,v=!0;let b=a,I=o;for(let x=0;x<y.length;x++){const M=y[x];M.enabled!==!1&&(M.render(S,I,b,T),M.needsSwap!==!1&&(b=I,I=I===o?l:o))}if(d!==S.outputColorSpace||p!==S.toneMapping){d=S.outputColorSpace,p=S.toneMapping,u.defines={},je.getTransfer(d)===rt&&(u.defines.SRGB_TRANSFER="");const x=tg[p];x&&(u.defines[x]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=b.texture,S.setRenderTarget(g),S.render(h,f),g=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}const cu=new Ft,eo=new or(1,1),uu=new zc,du=new Wd,fu=new qc,Vl=[],Gl=[],Wl=new Float32Array(16),Xl=new Float32Array(9),ql=new Float32Array(4);function Fi(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Vl[r];if(s===void 0&&(s=new Float32Array(r),Vl[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Tt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function wt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function gs(n,e){let t=Gl[e];t===void 0&&(t=new Int32Array(e),Gl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function ig(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function rg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;n.uniform2fv(this.addr,e),wt(t,e)}}function sg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Tt(t,e))return;n.uniform3fv(this.addr,e),wt(t,e)}}function ag(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;n.uniform4fv(this.addr,e),wt(t,e)}}function og(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Tt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),wt(t,e)}else{if(Tt(t,i))return;ql.set(i),n.uniformMatrix2fv(this.addr,!1,ql),wt(t,i)}}function lg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Tt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),wt(t,e)}else{if(Tt(t,i))return;Xl.set(i),n.uniformMatrix3fv(this.addr,!1,Xl),wt(t,i)}}function cg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Tt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),wt(t,e)}else{if(Tt(t,i))return;Wl.set(i),n.uniformMatrix4fv(this.addr,!1,Wl),wt(t,i)}}function ug(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function dg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;n.uniform2iv(this.addr,e),wt(t,e)}}function fg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tt(t,e))return;n.uniform3iv(this.addr,e),wt(t,e)}}function hg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;n.uniform4iv(this.addr,e),wt(t,e)}}function pg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function mg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;n.uniform2uiv(this.addr,e),wt(t,e)}}function gg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tt(t,e))return;n.uniform3uiv(this.addr,e),wt(t,e)}}function vg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;n.uniform4uiv(this.addr,e),wt(t,e)}}function _g(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(eo.compareFunction=t.isReversedDepthBuffer()?bo:Eo,s=eo):s=cu,t.setTexture2D(e||s,r)}function xg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||du,r)}function Sg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||fu,r)}function Mg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||uu,r)}function yg(n){switch(n){case 5126:return ig;case 35664:return rg;case 35665:return sg;case 35666:return ag;case 35674:return og;case 35675:return lg;case 35676:return cg;case 5124:case 35670:return ug;case 35667:case 35671:return dg;case 35668:case 35672:return fg;case 35669:case 35673:return hg;case 5125:return pg;case 36294:return mg;case 36295:return gg;case 36296:return vg;case 35678:case 36198:case 36298:case 36306:case 35682:return _g;case 35679:case 36299:case 36307:return xg;case 35680:case 36300:case 36308:case 36293:return Sg;case 36289:case 36303:case 36311:case 36292:return Mg}}function Eg(n,e){n.uniform1fv(this.addr,e)}function bg(n,e){const t=Fi(e,this.size,2);n.uniform2fv(this.addr,t)}function Tg(n,e){const t=Fi(e,this.size,3);n.uniform3fv(this.addr,t)}function wg(n,e){const t=Fi(e,this.size,4);n.uniform4fv(this.addr,t)}function Ag(n,e){const t=Fi(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Cg(n,e){const t=Fi(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Rg(n,e){const t=Fi(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Lg(n,e){n.uniform1iv(this.addr,e)}function Pg(n,e){n.uniform2iv(this.addr,e)}function Ig(n,e){n.uniform3iv(this.addr,e)}function Dg(n,e){n.uniform4iv(this.addr,e)}function Ng(n,e){n.uniform1uiv(this.addr,e)}function Ug(n,e){n.uniform2uiv(this.addr,e)}function Fg(n,e){n.uniform3uiv(this.addr,e)}function Og(n,e){n.uniform4uiv(this.addr,e)}function Bg(n,e,t){const i=this.cache,r=e.length,s=gs(t,r);Tt(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=eo:a=cu;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function kg(n,e,t){const i=this.cache,r=e.length,s=gs(t,r);Tt(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||du,s[a])}function zg(n,e,t){const i=this.cache,r=e.length,s=gs(t,r);Tt(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||fu,s[a])}function Hg(n,e,t){const i=this.cache,r=e.length,s=gs(t,r);Tt(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||uu,s[a])}function Vg(n){switch(n){case 5126:return Eg;case 35664:return bg;case 35665:return Tg;case 35666:return wg;case 35674:return Ag;case 35675:return Cg;case 35676:return Rg;case 5124:case 35670:return Lg;case 35667:case 35671:return Pg;case 35668:case 35672:return Ig;case 35669:case 35673:return Dg;case 5125:return Ng;case 36294:return Ug;case 36295:return Fg;case 36296:return Og;case 35678:case 36198:case 36298:case 36306:case 35682:return Bg;case 35679:case 36299:case 36307:return kg;case 35680:case 36300:case 36308:case 36293:return zg;case 36289:case 36303:case 36311:case 36292:return Hg}}class Gg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=yg(t.type)}}class Wg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Vg(t.type)}}class Xg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const aa=/(\w+)(\])?(\[|\.)?/g;function Yl(n,e){n.seq.push(e),n.map[e.id]=e}function qg(n,e,t){const i=n.name,r=i.length;for(aa.lastIndex=0;;){const s=aa.exec(i),a=aa.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Yl(t,c===void 0?new Gg(o,n,e):new Wg(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new Xg(o),Yl(t,h)),t=h}}}class jr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);qg(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function $l(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Yg=37297;let $g=0;function Kg(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Kl=new Ve;function Zg(n){je._getMatrix(Kl,je.workingColorSpace,n);const e=`mat3( ${Kl.elements.map(t=>t.toFixed(4))} )`;switch(je.getTransfer(n)){case os:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return Be("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Zl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+Kg(n.getShaderSource(e),o)}else return s}function Jg(n,e){const t=Zg(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Qg={[bc]:"Linear",[Tc]:"Reinhard",[wc]:"Cineon",[Ac]:"ACESFilmic",[Rc]:"AgX",[Lc]:"Neutral",[Cc]:"Custom"};function jg(n,e){const t=Qg[e];return t===void 0?(Be("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Gr=new X;function e0(){je.getLuminanceCoefficients(Gr);const n=Gr.x.toFixed(4),e=Gr.y.toFixed(4),t=Gr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function t0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Zi).join(`
`)}function n0(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function i0(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Zi(n){return n!==""}function Jl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ql(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const r0=/^[ \t]*#include +<([\w\d./]+)>/gm;function to(n){return n.replace(r0,a0)}const s0=new Map;function a0(n,e){let t=$e[e];if(t===void 0){const i=s0.get(e);if(i!==void 0)t=$e[i],Be('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return to(t)}const o0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function jl(n){return n.replace(o0,l0)}function l0(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function ec(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const c0={[$r]:"SHADOWMAP_TYPE_PCF",[$i]:"SHADOWMAP_TYPE_VSM"};function u0(n){return c0[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const d0={[ti]:"ENVMAP_TYPE_CUBE",[Pi]:"ENVMAP_TYPE_CUBE",[fs]:"ENVMAP_TYPE_CUBE_UV"};function f0(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":d0[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const h0={[Pi]:"ENVMAP_MODE_REFRACTION"};function p0(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":h0[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const m0={[Ec]:"ENVMAP_BLENDING_MULTIPLY",[Md]:"ENVMAP_BLENDING_MIX",[yd]:"ENVMAP_BLENDING_ADD"};function g0(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":m0[n.combine]||"ENVMAP_BLENDING_NONE"}function v0(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function _0(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=u0(t),c=f0(t),u=p0(t),h=g0(t),f=v0(t),d=t0(t),p=n0(s),v=r.createProgram();let m,g,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Zi).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Zi).join(`
`),g.length>0&&(g+=`
`)):(m=[ec(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zi).join(`
`),g=[ec(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==tn?"#define TONE_MAPPING":"",t.toneMapping!==tn?$e.tonemapping_pars_fragment:"",t.toneMapping!==tn?jg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",$e.colorspace_pars_fragment,Jg("linearToOutputTexel",t.outputColorSpace),e0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Zi).join(`
`)),a=to(a),a=Jl(a,t),a=Ql(a,t),o=to(o),o=Jl(o,t),o=Ql(o,t),a=jl(a),o=jl(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===al?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===al?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const w=y+m+a,S=y+g+o,T=$l(r,r.VERTEX_SHADER,w),b=$l(r,r.FRAGMENT_SHADER,S);r.attachShader(v,T),r.attachShader(v,b),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function I(D){if(n.debug.checkShaderErrors){const P=r.getProgramInfoLog(v)||"",F=r.getShaderInfoLog(T)||"",N=r.getShaderInfoLog(b)||"",H=P.trim(),Q=F.trim(),G=N.trim();let U=!0,V=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(U=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,v,T,b);else{const ee=Zl(r,T,"vertex"),te=Zl(r,b,"fragment");nt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+H+`
`+ee+`
`+te)}else H!==""?Be("WebGLProgram: Program Info Log:",H):(Q===""||G==="")&&(V=!1);V&&(D.diagnostics={runnable:U,programLog:H,vertexShader:{log:Q,prefix:m},fragmentShader:{log:G,prefix:g}})}r.deleteShader(T),r.deleteShader(b),x=new jr(r,v),M=i0(r,v)}let x;this.getUniforms=function(){return x===void 0&&I(this),x};let M;this.getAttributes=function(){return M===void 0&&I(this),M};let R=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=r.getProgramParameter(v,Yg)),R},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=$g++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=T,this.fragmentShader=b,this}let x0=0;class S0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new M0(e),t.set(e,i)),i}}class M0{constructor(e){this.id=x0++,this.code=e,this.usedTimes=0}}function y0(n){return n===ni||n===rs||n===ss}function E0(n,e,t,i,r,s){const a=new Hc,o=new S0,l=new Set,c=[],u=new Map,h=i.logarithmicDepthBuffer;let f=i.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(x){return l.add(x),x===0?"uv":`uv${x}`}function v(x,M,R,D,P,F){const N=D.fog,H=P.geometry,Q=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?D.environment:null,G=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,U=e.get(x.envMap||Q,G),V=U&&U.mapping===fs?U.image.height:null,ee=d[x.type];x.precision!==null&&(f=i.getMaxPrecision(x.precision),f!==x.precision&&Be("WebGLProgram.getParameters:",x.precision,"not supported, using",f,"instead."));const te=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Z=te!==void 0?te.length:0;let ue=0;H.morphAttributes.position!==void 0&&(ue=1),H.morphAttributes.normal!==void 0&&(ue=2),H.morphAttributes.color!==void 0&&(ue=3);let Le,Se,me,O;if(ee){const _e=on[ee];Le=_e.vertexShader,Se=_e.fragmentShader}else{Le=x.vertexShader,Se=x.fragmentShader;const _e=o.getVertexShaderStage(x),Xe=o.getFragmentShaderStage(x);o.update(x,_e,Xe),me=_e.id,O=Xe.id}const q=n.getRenderTarget(),ae=n.state.buffers.depth.getReversed(),be=P.isInstancedMesh===!0,j=P.isBatchedMesh===!0,ce=!!x.map,Re=!!x.matcap,Ue=!!U,ke=!!x.aoMap,Oe=!!x.lightMap,ze=!!x.bumpMap&&x.wireframe===!1,Ge=!!x.normalMap,pt=!!x.displacementMap,lt=!!x.emissiveMap,Ke=!!x.metalnessMap,et=!!x.roughnessMap,k=x.anisotropy>0,St=x.clearcoat>0,We=x.dispersion>0,A=x.retroreflectivity>0,_=x.iridescence>0,W=x.sheen>0,J=x.transmission>0,re=k&&!!x.anisotropyMap,de=St&&!!x.clearcoatMap,he=St&&!!x.clearcoatNormalMap,se=St&&!!x.clearcoatRoughnessMap,le=_&&!!x.iridescenceMap,fe=_&&!!x.iridescenceThicknessMap,Pe=W&&!!x.sheenColorMap,xe=W&&!!x.sheenRoughnessMap,ge=!!x.specularMap,Ie=!!x.specularColorMap,Fe=!!x.specularIntensityMap,He=J&&!!x.transmissionMap,z=J&&!!x.thicknessMap,ve=!!x.gradientMap,oe=!!x.alphaMap,pe=x.alphaTest>0,C=!!x.alphaHash,L=!!x.extensions;let Y=tn;x.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(Y=n.toneMapping);const ie={shaderID:ee,shaderType:x.type,shaderName:x.name,vertexShader:Le,fragmentShader:Se,defines:x.defines,customVertexShaderID:me,customFragmentShaderID:O,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:f,batching:j,batchingColor:j&&P._colorsTexture!==null,instancing:be,instancingColor:be&&P.instanceColor!==null,instancingMorph:be&&P.morphTexture!==null,outputColorSpace:q===null?n.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:je.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:ce,matcap:Re,envMap:Ue,envMapMode:Ue&&U.mapping,envMapCubeUVHeight:V,aoMap:ke,lightMap:Oe,bumpMap:ze,normalMap:Ge,displacementMap:pt,emissiveMap:lt,normalMapObjectSpace:Ge&&x.normalMapType===Td,normalMapTangentSpace:Ge&&x.normalMapType===sl,packedNormalMap:Ge&&x.normalMapType===sl&&y0(x.normalMap.format),metalnessMap:Ke,roughnessMap:et,anisotropy:k,anisotropyMap:re,clearcoat:St,clearcoatMap:de,clearcoatNormalMap:he,clearcoatRoughnessMap:se,dispersion:We,retroreflection:A,iridescence:_,iridescenceMap:le,iridescenceThicknessMap:fe,sheen:W,sheenColorMap:Pe,sheenRoughnessMap:xe,specularMap:ge,specularColorMap:Ie,specularIntensityMap:Fe,transmission:J,transmissionMap:He,thicknessMap:z,gradientMap:ve,opaque:x.transparent===!1&&x.blending===Ji&&x.alphaToCoverage===!1,alphaMap:oe,alphaTest:pe,alphaHash:C,combine:x.combine,mapUv:ce&&p(x.map.channel),aoMapUv:ke&&p(x.aoMap.channel),lightMapUv:Oe&&p(x.lightMap.channel),bumpMapUv:ze&&p(x.bumpMap.channel),normalMapUv:Ge&&p(x.normalMap.channel),displacementMapUv:pt&&p(x.displacementMap.channel),emissiveMapUv:lt&&p(x.emissiveMap.channel),metalnessMapUv:Ke&&p(x.metalnessMap.channel),roughnessMapUv:et&&p(x.roughnessMap.channel),anisotropyMapUv:re&&p(x.anisotropyMap.channel),clearcoatMapUv:de&&p(x.clearcoatMap.channel),clearcoatNormalMapUv:he&&p(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:se&&p(x.clearcoatRoughnessMap.channel),iridescenceMapUv:le&&p(x.iridescenceMap.channel),iridescenceThicknessMapUv:fe&&p(x.iridescenceThicknessMap.channel),sheenColorMapUv:Pe&&p(x.sheenColorMap.channel),sheenRoughnessMapUv:xe&&p(x.sheenRoughnessMap.channel),specularMapUv:ge&&p(x.specularMap.channel),specularColorMapUv:Ie&&p(x.specularColorMap.channel),specularIntensityMapUv:Fe&&p(x.specularIntensityMap.channel),transmissionMapUv:He&&p(x.transmissionMap.channel),thicknessMapUv:z&&p(x.thicknessMap.channel),alphaMapUv:oe&&p(x.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(Ge||k),vertexNormals:!!H.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!H.attributes.uv&&(ce||oe),fog:!!N,useFog:x.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||H.attributes.normal===void 0&&Ge===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:ae,skinning:P.isSkinnedMesh===!0,hasPositionAttribute:H.attributes.position!==void 0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:ue,numSunLights:M.sun.length,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numSunLightShadows:M.sunShadowMap.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:F.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:Y,decodeVideoTexture:ce&&x.map.isVideoTexture===!0&&je.getTransfer(x.map.colorSpace)===rt,decodeVideoTextureEmissive:lt&&x.emissiveMap.isVideoTexture===!0&&je.getTransfer(x.emissiveMap.colorSpace)===rt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===cn,flipSided:x.side===zt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:L&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(L&&x.extensions.multiDraw===!0||j)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return ie.vertexUv1s=l.has(1),ie.vertexUv2s=l.has(2),ie.vertexUv3s=l.has(3),l.clear(),ie}function m(x){const M=[];if(x.shaderID?M.push(x.shaderID):(M.push(x.customVertexShaderID),M.push(x.customFragmentShaderID)),x.defines!==void 0)for(const R in x.defines)M.push(R),M.push(x.defines[R]);return x.isRawShaderMaterial===!1&&(g(M,x),y(M,x),M.push(n.outputColorSpace)),M.push(x.customProgramCacheKey),M.join()}function g(x,M){x.push(M.precision),x.push(M.outputColorSpace),x.push(M.envMapMode),x.push(M.envMapCubeUVHeight),x.push(M.mapUv),x.push(M.alphaMapUv),x.push(M.lightMapUv),x.push(M.aoMapUv),x.push(M.bumpMapUv),x.push(M.normalMapUv),x.push(M.displacementMapUv),x.push(M.emissiveMapUv),x.push(M.metalnessMapUv),x.push(M.roughnessMapUv),x.push(M.anisotropyMapUv),x.push(M.clearcoatMapUv),x.push(M.clearcoatNormalMapUv),x.push(M.clearcoatRoughnessMapUv),x.push(M.iridescenceMapUv),x.push(M.iridescenceThicknessMapUv),x.push(M.sheenColorMapUv),x.push(M.sheenRoughnessMapUv),x.push(M.specularMapUv),x.push(M.specularColorMapUv),x.push(M.specularIntensityMapUv),x.push(M.transmissionMapUv),x.push(M.thicknessMapUv),x.push(M.combine),x.push(M.fogExp2),x.push(M.sizeAttenuation),x.push(M.morphTargetsCount),x.push(M.morphAttributeCount),x.push(M.numSunLights),x.push(M.numDirLights),x.push(M.numPointLights),x.push(M.numSpotLights),x.push(M.numSpotLightMaps),x.push(M.numHemiLights),x.push(M.numRectAreaLights),x.push(M.numSunLightShadows),x.push(M.numDirLightShadows),x.push(M.numPointLightShadows),x.push(M.numSpotLightShadows),x.push(M.numSpotLightShadowsWithMaps),x.push(M.numLightProbes),x.push(M.shadowMapType),x.push(M.toneMapping),x.push(M.numClippingPlanes),x.push(M.numClipIntersection),x.push(M.depthPacking)}function y(x,M){a.disableAll(),M.instancing&&a.enable(0),M.instancingColor&&a.enable(1),M.instancingMorph&&a.enable(2),M.matcap&&a.enable(3),M.envMap&&a.enable(4),M.normalMapObjectSpace&&a.enable(5),M.normalMapTangentSpace&&a.enable(6),M.clearcoat&&a.enable(7),M.iridescence&&a.enable(8),M.alphaTest&&a.enable(9),M.vertexColors&&a.enable(10),M.vertexAlphas&&a.enable(11),M.vertexUv1s&&a.enable(12),M.vertexUv2s&&a.enable(13),M.vertexUv3s&&a.enable(14),M.vertexTangents&&a.enable(15),M.anisotropy&&a.enable(16),M.alphaHash&&a.enable(17),M.batching&&a.enable(18),M.dispersion&&a.enable(19),M.retroreflection&&a.enable(24),M.batchingColor&&a.enable(20),M.gradientMap&&a.enable(21),M.packedNormalMap&&a.enable(22),M.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),M.numLightProbeGrids>0&&a.enable(22),M.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function w(x){const M=d[x.type];let R;if(M){const D=on[M];R=Gf.clone(D.uniforms)}else R=x.uniforms;return R}function S(x,M){let R=u.get(M);return R!==void 0?++R.usedTimes:(R=new _0(n,M,x,r),c.push(R),u.set(M,R)),R}function T(x){if(--x.usedTimes===0){const M=c.indexOf(x);c[M]=c[c.length-1],c.pop(),u.delete(x.cacheKey),x.destroy()}}function b(x){o.remove(x)}function I(){o.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:w,acquireProgram:S,releaseProgram:T,releaseShaderCache:b,programs:c,dispose:I}}function b0(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function T0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function tc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function nc(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function o(f,d,p,v,m,g){let y=n[e];return y===void 0?(y={id:f.id,object:f,geometry:d,material:p,materialVariant:a(f),groupOrder:v,renderOrder:f.renderOrder,z:m,group:g},n[e]=y):(y.id=f.id,y.object=f,y.geometry=d,y.material=p,y.materialVariant=a(f),y.groupOrder=v,y.renderOrder=f.renderOrder,y.z=m,y.group=g),e++,y}function l(f,d,p,v,m,g,y){y.reversedDepth===!0&&(m=-m);const w=o(f,d,p,v,m,g);p.transmission>0?i.push(w):p.transparent===!0?r.push(w):t.push(w)}function c(f,d,p,v,m,g){const y=o(f,d,p,v,m,g);p.transmission>0?i.unshift(y):p.transparent===!0?r.unshift(y):t.unshift(y)}function u(f,d){t.length>1&&t.sort(f||T0),i.length>1&&i.sort(d||tc),r.length>1&&r.sort(d||tc)}function h(){for(let f=e,d=n.length;f<d;f++){const p=n[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:h,sort:u}}function w0(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new nc,n.set(i,[a])):r>=s.length?(a=new nc,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function A0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new X,color:new qe};break;case"SpotLight":t={position:new X,direction:new X,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new X,color:new qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new X,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":t={color:new qe,position:new X,halfWidth:new X,halfHeight:new X};break}return n[e.id]=t,t}}}function C0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let R0=0;function L0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function P0(n){const e=new A0,t=C0(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new X);const r=new X,s=new xt,a=new xt;function o(c){let u=0,h=0,f=0;for(let P=0;P<9;P++)i.probe[P].set(0,0,0);let d=0,p=0,v=0,m=0,g=0,y=0,w=0,S=0,T=0,b=0,I=0,x=0,M=0,R=0;c.sort(L0);for(let P=0,F=c.length;P<F;P++){const N=c[P],H=N.color,Q=N.intensity,G=N.distance;let U=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===ni?U=N.shadow.map.texture:U=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)u+=H.r*Q,h+=H.g*Q,f+=H.b*Q;else if(N.isLightProbe){for(let V=0;V<9;V++)i.probe[V].addScaledVector(N.sh.coefficients[V],Q);R++}else if(N.isSunLight){const V=e.get(N);if(V.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const ee=N.shadow,te=t.get(N);te.shadowIntensity=ee.intensity,te.shadowBias=ee.bias,te.shadowNormalBias=ee.normalBias,te.shadowRadius=ee.radius,te.shadowMapSize.copy(ee.mapSize).multiply(ee.getFrameExtents()),i.sunShadow[p]=te,i.sunShadowMap[p]=U;const Z=ee.getViewportCount();for(let ue=0;ue<Z;ue++)i.sunShadowMatrix[v+ue]=ee.getMatrix(ue),i.sunShadowCascade[v+ue]=ee._cascadeData[ue];v+=Z,p++}i.sun[d]=V,d++}else if(N.isDirectionalLight){const V=e.get(N);if(V.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const ee=N.shadow,te=t.get(N);te.shadowIntensity=ee.intensity,te.shadowBias=ee.bias,te.shadowNormalBias=ee.normalBias,te.shadowRadius=ee.radius,te.shadowMapSize=ee.mapSize,i.directionalShadow[m]=te,i.directionalShadowMap[m]=U,i.directionalShadowMatrix[m]=N.shadow.matrix,T++}i.directional[m]=V,m++}else if(N.isSpotLight){const V=e.get(N);V.position.setFromMatrixPosition(N.matrixWorld),V.color.copy(H).multiplyScalar(Q),V.distance=G,V.coneCos=Math.cos(N.angle),V.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),V.decay=N.decay,i.spot[y]=V;const ee=N.shadow;if(N.map&&(i.spotLightMap[x]=N.map,x++,ee.updateMatrices(N),N.castShadow&&M++),i.spotLightMatrix[y]=ee.matrix,N.castShadow){const te=t.get(N);te.shadowIntensity=ee.intensity,te.shadowBias=ee.bias,te.shadowNormalBias=ee.normalBias,te.shadowRadius=ee.radius,te.shadowMapSize=ee.mapSize,i.spotShadow[y]=te,i.spotShadowMap[y]=U,I++}y++}else if(N.isRectAreaLight){const V=e.get(N);V.color.copy(H).multiplyScalar(Q),V.halfWidth.set(N.width*.5,0,0),V.halfHeight.set(0,N.height*.5,0),i.rectArea[w]=V,w++}else if(N.isPointLight){const V=e.get(N);if(V.color.copy(N.color).multiplyScalar(N.intensity),V.distance=N.distance,V.decay=N.decay,N.castShadow){const ee=N.shadow,te=t.get(N);te.shadowIntensity=ee.intensity,te.shadowBias=ee.bias,te.shadowNormalBias=ee.normalBias,te.shadowRadius=ee.radius,te.shadowMapSize=ee.mapSize,te.shadowCameraNear=ee.camera.near,te.shadowCameraFar=ee.camera.far,i.pointShadow[g]=te,i.pointShadowMap[g]=U,i.pointShadowMatrix[g]=N.shadow.matrix,b++}i.point[g]=V,g++}else if(N.isHemisphereLight){const V=e.get(N);V.skyColor.copy(N.color).multiplyScalar(Q),V.groundColor.copy(N.groundColor).multiplyScalar(Q),i.hemi[S]=V,S++}}w>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Me.LTC_FLOAT_1,i.rectAreaLTC2=Me.LTC_FLOAT_2):(i.rectAreaLTC1=Me.LTC_HALF_1,i.rectAreaLTC2=Me.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;const D=i.hash;(D.sunLength!==d||D.directionalLength!==m||D.pointLength!==g||D.spotLength!==y||D.rectAreaLength!==w||D.hemiLength!==S||D.numSunShadows!==p||D.numDirectionalShadows!==T||D.numPointShadows!==b||D.numSpotShadows!==I||D.numSpotMaps!==x||D.numLightProbes!==R)&&(i.sun.length=d,i.directional.length=m,i.spot.length=y,i.rectArea.length=w,i.point.length=g,i.hemi.length=S,i.sunShadow.length=p,i.sunShadowMap.length=p,i.sunShadowMatrix.length=v,i.sunShadowCascade.length=v,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.directionalShadowMatrix.length=T,i.pointShadow.length=b,i.pointShadowMap.length=b,i.pointShadowMatrix.length=b,i.spotShadow.length=I,i.spotShadowMap.length=I,i.spotLightMatrix.length=I+x-M,i.spotLightMap.length=x,i.numSpotLightShadowsWithMaps=M,i.numLightProbes=R,D.sunLength=d,D.directionalLength=m,D.pointLength=g,D.spotLength=y,D.rectAreaLength=w,D.hemiLength=S,D.numSunShadows=p,D.numDirectionalShadows=T,D.numPointShadows=b,D.numSpotShadows=I,D.numSpotMaps=x,D.numLightProbes=R,i.version=R0++)}function l(c,u){let h=0,f=0,d=0,p=0,v=0,m=0;const g=u.matrixWorldInverse;for(let y=0,w=c.length;y<w;y++){const S=c[y];if(S.isSunLight){const T=i.sun[h];T.direction.setFromMatrixPosition(S.matrixWorld),T.direction.transformDirection(g),h++}else if(S.isDirectionalLight){const T=i.directional[f];T.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(g),f++}else if(S.isSpotLight){const T=i.spot[p];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(g),T.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(g),p++}else if(S.isRectAreaLight){const T=i.rectArea[v];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(g),a.identity(),s.copy(S.matrixWorld),s.premultiply(g),a.extractRotation(s),T.halfWidth.set(S.width*.5,0,0),T.halfHeight.set(0,S.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),v++}else if(S.isPointLight){const T=i.point[d];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(g),d++}else if(S.isHemisphereLight){const T=i.hemi[m];T.direction.setFromMatrixPosition(S.matrixWorld),T.direction.transformDirection(g),m++}}}return{setup:o,setupView:l,state:i}}function ic(n){const e=new P0(n),t=[],i=[],r=[];function s(f){h.camera=f,t.length=0,i.length=0,r.length=0}function a(f){t.push(f)}function o(f){i.push(f)}function l(f){r.push(f)}function c(){e.setup(t)}function u(f){e.setupView(t,f)}const h={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function I0(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new ic(n),e.set(r,[o])):s>=a.length?(o=new ic(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const D0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,N0=`uniform sampler2D shadow_pass;
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
}`,U0=[new X(1,0,0),new X(-1,0,0),new X(0,1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1)],F0=[new X(0,-1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1),new X(0,-1,0),new X(0,-1,0)],rc=new xt,Xi=new X,oa=new X;function O0(n,e,t){let i=new Xc;const r=new Ne,s=new Ne,a=new gt,o=new Yf,l=new $f,c={},u=t.maxTextureSize,h={[ei]:zt,[zt]:ei,[cn]:cn},f=new mn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ne},radius:{value:4}},vertexShader:D0,fragmentShader:N0}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const p=new Ht;p.setAttribute("position",new wn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new pn(p,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$r;let g=this.type;this.render=function(b,I,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;this.type===nd&&(Be("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=$r);const M=n.getRenderTarget(),R=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),P=n.state;P.setBlending(bn),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const F=g!==this.type;F&&I.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(H=>H.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,H=b.length;N<H;N++){const Q=b[N],G=Q.shadow;if(G===void 0){Be("WebGLShadowMap:",Q,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);const U=G.getFrameExtents();r.multiply(U),s.copy(G.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/U.x),r.x=s.x*U.x,G.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/U.y),r.y=s.y*U.y,G.mapSize.y=s.y));const V=n.state.buffers.depth.getReversed();if(G.camera._reversedDepth=V,G.map===null||F===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===$i){if(Q.isPointLight){Be("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new nn(r.x,r.y,{format:ni,type:hn,minFilter:Ut,magFilter:Ut,generateMipmaps:!1}),G.map.texture.name=Q.name+".shadowMap",G.map.depthTexture=new or(r.x,r.y,un),G.map.depthTexture.name=Q.name+".shadowMapDepth",G.map.depthTexture.format=Cn,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Lt,G.map.depthTexture.magFilter=Lt}else Q.isPointLight?(G.map=new lu(r.x),G.map.depthTexture=new cf(r.x,fn)):(G.map=new nn(r.x,r.y),G.map.depthTexture=new or(r.x,r.y,fn)),G.map.depthTexture.name=Q.name+".shadowMap",G.map.depthTexture.format=Cn,this.type===$r?(G.map.depthTexture.compareFunction=V?bo:Eo,G.map.depthTexture.minFilter=Ut,G.map.depthTexture.magFilter=Ut):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Lt,G.map.depthTexture.magFilter=Lt);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget!==!0&&(G.map.width!==r.x||G.map.height!==r.y)&&G.map.setSize(r.x,r.y);const ee=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();Q.isPointLight!==!0&&G.updateMatrices(Q,x);for(let te=0;te<ee;te++){const Z=G.getCamera(te);if(Q.isPointLight){const ue=G.camera,Le=G.matrix,Se=Q.distance||ue.far;Se!==ue.far&&(ue.far=Se,ue.updateProjectionMatrix()),Xi.setFromMatrixPosition(Q.matrixWorld),ue.position.copy(Xi),oa.copy(ue.position),oa.add(U0[te]),ue.up.copy(F0[te]),ue.lookAt(oa),ue.updateMatrixWorld(),Le.makeTranslation(-Xi.x,-Xi.y,-Xi.z),rc.multiplyMatrices(ue.projectionMatrix,ue.matrixWorldInverse),G._frustum.setFromProjectionMatrix(rc,ue.coordinateSystem,ue.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)n.setRenderTarget(G.map,te),n.clear();else{te===0&&(n.setRenderTarget(G.map),n.clear());const ue=G.getViewport(te);a.set(s.x*ue.x,s.y*ue.y,s.x*ue.z,s.y*ue.w),P.viewport(a)}i=G.getFrustum(te),S(I,x,Z,Q,this.type)}G.isPointLightShadow!==!0&&this.type===$i&&y(G,x),G.needsUpdate=!1}g=this.type,m.needsUpdate=!1,n.setRenderTarget(M,R,D)};function y(b,I){const x=e.update(v);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null?b.mapPass=new nn(r.x,r.y,{format:ni,type:hn}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),f.uniforms.shadow_pass.value=b.map.depthTexture,f.uniforms.resolution.value.set(b.map.width,b.map.height),f.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(I,null,x,f,v,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value.set(b.map.width,b.map.height),d.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(I,null,x,d,v,null)}function w(b,I,x,M){let R=null;const D=x.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(D!==void 0)R=D;else if(R=x.isPointLight===!0?l:o,n.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){const P=R.uuid,F=I.uuid;let N=c[P];N===void 0&&(N={},c[P]=N);let H=N[F];H===void 0&&(H=R.clone(),N[F]=H,I.addEventListener("dispose",T)),R=H}if(R.visible=I.visible,R.wireframe=I.wireframe,M===$i?R.side=I.shadowSide!==null?I.shadowSide:I.side:R.side=I.shadowSide!==null?I.shadowSide:h[I.side],R.alphaMap=I.alphaMap,R.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,R.map=I.map,R.clipShadows=I.clipShadows,R.clippingPlanes=I.clippingPlanes,R.clipIntersection=I.clipIntersection,R.displacementMap=I.displacementMap,R.displacementScale=I.displacementScale,R.displacementBias=I.displacementBias,R.wireframeLinewidth=I.wireframeLinewidth,R.linewidth=I.linewidth,x.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const P=n.properties.get(R);P.light=x}return R}function S(b,I,x,M,R){if(b.visible===!1)return;if(b.layers.test(I.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&R===$i)&&(!b.frustumCulled||b.intersectsFrustum(i))){b.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,b.matrixWorld);const F=e.update(b),N=b.material;if(Array.isArray(N)){const H=F.groups;for(let Q=0,G=H.length;Q<G;Q++){const U=H[Q],V=N[U.materialIndex];if(V&&V.visible){const ee=w(b,V,M,R);b.onBeforeShadow(n,b,I,x,F,ee,U),n.renderBufferDirect(x,null,F,ee,b,U),b.onAfterShadow(n,b,I,x,F,ee,U)}}}else if(N.visible){const H=w(b,N,M,R);b.onBeforeShadow(n,b,I,x,F,H,null),n.renderBufferDirect(x,null,F,H,b,null),b.onAfterShadow(n,b,I,x,F,H,null)}}const P=b.children;for(let F=0,N=P.length;F<N;F++)S(P[F],I,x,M,R)}function T(b){b.target.removeEventListener("dispose",T);for(const x in c){const M=c[x],R=b.target.uuid;R in M&&(M[R].dispose(),delete M[R])}}}function B0(n,e){function t(){let z=!1;const ve=new gt;let oe=null;const pe=new gt(0,0,0,0);return{setMask:function(C){oe!==C&&!z&&(n.colorMask(C,C,C,C),oe=C)},setLocked:function(C){z=C},setClear:function(C,L,Y,ie,_e){_e===!0&&(C*=ie,L*=ie,Y*=ie),ve.set(C,L,Y,ie),pe.equals(ve)===!1&&(n.clearColor(C,L,Y,ie),pe.copy(ve))},reset:function(){z=!1,oe=null,pe.set(-1,0,0,0)}}}function i(){let z=!1,ve=!1,oe=null,pe=null,C=null;return{setReversed:function(L){if(ve!==L){const Y=e.get("EXT_clip_control");L?Y.clipControlEXT(Y.LOWER_LEFT_EXT,Y.ZERO_TO_ONE_EXT):Y.clipControlEXT(Y.LOWER_LEFT_EXT,Y.NEGATIVE_ONE_TO_ONE_EXT),ve=L;const ie=C;C=null,this.setClear(ie)}},getReversed:function(){return ve},setTest:function(L){L?q(n.DEPTH_TEST):ae(n.DEPTH_TEST)},setMask:function(L){oe!==L&&!z&&(n.depthMask(L),oe=L)},setFunc:function(L){if(ve&&(L=Od[L]),pe!==L){switch(L){case fa:n.depthFunc(n.NEVER);break;case ha:n.depthFunc(n.ALWAYS);break;case pa:n.depthFunc(n.LESS);break;case ir:n.depthFunc(n.LEQUAL);break;case ma:n.depthFunc(n.EQUAL);break;case ga:n.depthFunc(n.GEQUAL);break;case va:n.depthFunc(n.GREATER);break;case _a:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}pe=L}},setLocked:function(L){z=L},setClear:function(L){C!==L&&(C=L,ve&&(L=1-L),n.clearDepth(L))},reset:function(){z=!1,oe=null,pe=null,C=null,ve=!1}}}function r(){let z=!1,ve=null,oe=null,pe=null,C=null,L=null,Y=null,ie=null,_e=null;return{setTest:function(Xe){z||(Xe?q(n.STENCIL_TEST):ae(n.STENCIL_TEST))},setMask:function(Xe){ve!==Xe&&!z&&(n.stencilMask(Xe),ve=Xe)},setFunc:function(Xe,bt,ft){(oe!==Xe||pe!==bt||C!==ft)&&(n.stencilFunc(Xe,bt,ft),oe=Xe,pe=bt,C=ft)},setOp:function(Xe,bt,ft){(L!==Xe||Y!==bt||ie!==ft)&&(n.stencilOp(Xe,bt,ft),L=Xe,Y=bt,ie=ft)},setLocked:function(Xe){z=Xe},setClear:function(Xe){_e!==Xe&&(n.clearStencil(Xe),_e=Xe)},reset:function(){z=!1,ve=null,oe=null,pe=null,C=null,L=null,Y=null,ie=null,_e=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let u={},h={},f={},d=new WeakMap,p=[],v=null,m=!1,g=null,y=null,w=null,S=null,T=null,b=null,I=null,x=new qe(0,0,0),M=0,R=!1,D=null,P=null,F=null,N=null,H=null;const Q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,U=0;const V=n.getParameter(n.VERSION);V.indexOf("WebGL")!==-1?(U=parseFloat(/^WebGL (\d)/.exec(V)[1]),G=U>=1):V.indexOf("OpenGL ES")!==-1&&(U=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),G=U>=2);let ee=null,te={};const Z=n.getParameter(n.SCISSOR_BOX),ue=n.getParameter(n.VIEWPORT),Le=new gt().fromArray(Z),Se=new gt().fromArray(ue);function me(z,ve,oe,pe){const C=new Uint8Array(4),L=n.createTexture();n.bindTexture(z,L),n.texParameteri(z,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(z,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Y=0;Y<oe;Y++)z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY?n.texImage3D(ve,0,n.RGBA,1,1,pe,0,n.RGBA,n.UNSIGNED_BYTE,C):n.texImage2D(ve+Y,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,C);return L}const O={};O[n.TEXTURE_2D]=me(n.TEXTURE_2D,n.TEXTURE_2D,1),O[n.TEXTURE_CUBE_MAP]=me(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),O[n.TEXTURE_2D_ARRAY]=me(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),O[n.TEXTURE_3D]=me(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),q(n.DEPTH_TEST),a.setFunc(ir),ze(!1),Ge(tl),q(n.CULL_FACE),ke(bn);function q(z){u[z]!==!0&&(n.enable(z),u[z]=!0)}function ae(z){u[z]!==!1&&(n.disable(z),u[z]=!1)}function be(z,ve){return f[z]!==ve?(n.bindFramebuffer(z,ve),f[z]=ve,z===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=ve),z===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=ve),!0):!1}function j(z,ve){let oe=p,pe=!1;if(z){oe=d.get(ve),oe===void 0&&(oe=[],d.set(ve,oe));const C=z.textures;if(oe.length!==C.length||oe[0]!==n.COLOR_ATTACHMENT0){for(let L=0,Y=C.length;L<Y;L++)oe[L]=n.COLOR_ATTACHMENT0+L;oe.length=C.length,pe=!0}}else oe[0]!==n.BACK&&(oe[0]=n.BACK,pe=!0);pe&&n.drawBuffers(oe)}function ce(z){return v!==z?(n.useProgram(z),v=z,!0):!1}const Re={[Ei]:n.FUNC_ADD,[rd]:n.FUNC_SUBTRACT,[sd]:n.FUNC_REVERSE_SUBTRACT};Re[ad]=n.MIN,Re[od]=n.MAX;const Ue={[ld]:n.ZERO,[cd]:n.ONE,[ud]:n.SRC_COLOR,[Mc]:n.SRC_ALPHA,[gd]:n.SRC_ALPHA_SATURATE,[pd]:n.DST_COLOR,[fd]:n.DST_ALPHA,[dd]:n.ONE_MINUS_SRC_COLOR,[yc]:n.ONE_MINUS_SRC_ALPHA,[md]:n.ONE_MINUS_DST_COLOR,[hd]:n.ONE_MINUS_DST_ALPHA,[vd]:n.CONSTANT_COLOR,[_d]:n.ONE_MINUS_CONSTANT_COLOR,[xd]:n.CONSTANT_ALPHA,[Sd]:n.ONE_MINUS_CONSTANT_ALPHA};function ke(z,ve,oe,pe,C,L,Y,ie,_e,Xe){if(z===bn){m===!0&&(ae(n.BLEND),m=!1);return}if(m===!1&&(q(n.BLEND),m=!0),z!==id){if(z!==g||Xe!==R){if((y!==Ei||T!==Ei)&&(n.blendEquation(n.FUNC_ADD),y=Ei,T=Ei),Xe)switch(z){case Ji:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case nl:n.blendFunc(n.ONE,n.ONE);break;case il:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case rl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:nt("WebGLState: Invalid blending: ",z);break}else switch(z){case Ji:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case nl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case il:nt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case rl:nt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:nt("WebGLState: Invalid blending: ",z);break}w=null,S=null,b=null,I=null,x.set(0,0,0),M=0,g=z,R=Xe}return}C=C||ve,L=L||oe,Y=Y||pe,(ve!==y||C!==T)&&(n.blendEquationSeparate(Re[ve],Re[C]),y=ve,T=C),(oe!==w||pe!==S||L!==b||Y!==I)&&(n.blendFuncSeparate(Ue[oe],Ue[pe],Ue[L],Ue[Y]),w=oe,S=pe,b=L,I=Y),(ie.equals(x)===!1||_e!==M)&&(n.blendColor(ie.r,ie.g,ie.b,_e),x.copy(ie),M=_e),g=z,R=!1}function Oe(z,ve){z.side===cn?ae(n.CULL_FACE):q(n.CULL_FACE);let oe=z.side===zt;ve&&(oe=!oe),ze(oe),z.blending===Ji&&z.transparent===!1?ke(bn):ke(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),a.setFunc(z.depthFunc),a.setTest(z.depthTest),a.setMask(z.depthWrite),s.setMask(z.colorWrite);const pe=z.stencilWrite;o.setTest(pe),pe&&(o.setMask(z.stencilWriteMask),o.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),o.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),lt(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?q(n.SAMPLE_ALPHA_TO_COVERAGE):ae(n.SAMPLE_ALPHA_TO_COVERAGE)}function ze(z){D!==z&&(z?n.frontFace(n.CW):n.frontFace(n.CCW),D=z)}function Ge(z){z!==ed?(q(n.CULL_FACE),z!==P&&(z===tl?n.cullFace(n.BACK):z===td?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ae(n.CULL_FACE),P=z}function pt(z){z!==F&&(G&&n.lineWidth(z),F=z)}function lt(z,ve,oe){z?(q(n.POLYGON_OFFSET_FILL),(N!==ve||H!==oe)&&(N=ve,H=oe,a.getReversed()&&(ve=-ve),n.polygonOffset(ve,oe))):ae(n.POLYGON_OFFSET_FILL)}function Ke(z){z?q(n.SCISSOR_TEST):ae(n.SCISSOR_TEST)}function et(z){z===void 0&&(z=n.TEXTURE0+Q-1),ee!==z&&(n.activeTexture(z),ee=z)}function k(z,ve,oe){oe===void 0&&(ee===null?oe=n.TEXTURE0+Q-1:oe=ee);let pe=te[oe];pe===void 0&&(pe={type:void 0,texture:void 0},te[oe]=pe),(pe.type!==z||pe.texture!==ve)&&(ee!==oe&&(n.activeTexture(oe),ee=oe),n.bindTexture(z,ve||O[z]),pe.type=z,pe.texture=ve)}function St(){const z=te[ee];z!==void 0&&z.type!==void 0&&(n.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function We(){try{n.compressedTexImage2D(...arguments)}catch(z){nt("WebGLState:",z)}}function A(){try{n.compressedTexImage3D(...arguments)}catch(z){nt("WebGLState:",z)}}function _(){try{n.texSubImage2D(...arguments)}catch(z){nt("WebGLState:",z)}}function W(){try{n.texSubImage3D(...arguments)}catch(z){nt("WebGLState:",z)}}function J(){try{n.compressedTexSubImage2D(...arguments)}catch(z){nt("WebGLState:",z)}}function re(){try{n.compressedTexSubImage3D(...arguments)}catch(z){nt("WebGLState:",z)}}function de(){try{n.texStorage2D(...arguments)}catch(z){nt("WebGLState:",z)}}function he(){try{n.texStorage3D(...arguments)}catch(z){nt("WebGLState:",z)}}function se(){try{n.texImage2D(...arguments)}catch(z){nt("WebGLState:",z)}}function le(){try{n.texImage3D(...arguments)}catch(z){nt("WebGLState:",z)}}function fe(z){return h[z]!==void 0?h[z]:n.getParameter(z)}function Pe(z,ve){h[z]!==ve&&(n.pixelStorei(z,ve),h[z]=ve)}function xe(z){Le.equals(z)===!1&&(n.scissor(z.x,z.y,z.z,z.w),Le.copy(z))}function ge(z){Se.equals(z)===!1&&(n.viewport(z.x,z.y,z.z,z.w),Se.copy(z))}function Ie(z,ve){let oe=c.get(ve);oe===void 0&&(oe=new WeakMap,c.set(ve,oe));let pe=oe.get(z);pe===void 0&&(pe=n.getUniformBlockIndex(ve,z.name),oe.set(z,pe))}function Fe(z,ve){const pe=c.get(ve).get(z);l.get(ve)!==pe&&(n.uniformBlockBinding(ve,pe,z.__bindingPointIndex),l.set(ve,pe))}function He(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},h={},ee=null,te={},f={},d=new WeakMap,p=[],v=null,m=!1,g=null,y=null,w=null,S=null,T=null,b=null,I=null,x=new qe(0,0,0),M=0,R=!1,D=null,P=null,F=null,N=null,H=null,Le.set(0,0,n.canvas.width,n.canvas.height),Se.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:q,disable:ae,bindFramebuffer:be,drawBuffers:j,useProgram:ce,setBlending:ke,setMaterial:Oe,setFlipSided:ze,setCullFace:Ge,setLineWidth:pt,setPolygonOffset:lt,setScissorTest:Ke,activeTexture:et,bindTexture:k,unbindTexture:St,compressedTexImage2D:We,compressedTexImage3D:A,texImage2D:se,texImage3D:le,pixelStorei:Pe,getParameter:fe,updateUBOMapping:Ie,uniformBlockBinding:Fe,texStorage2D:de,texStorage3D:he,texSubImage2D:_,texSubImage3D:W,compressedTexSubImage2D:J,compressedTexSubImage3D:re,scissor:xe,viewport:ge,reset:He}}function k0(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ne,u=new WeakMap,h=new Set;let f;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(A,_){return p?new OffscreenCanvas(A,_):ar("canvas")}function m(A,_,W){let J=1;const re=We(A);if((re.width>W||re.height>W)&&(J=W/Math.max(re.width,re.height)),J<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const de=Math.floor(J*re.width),he=Math.floor(J*re.height);f===void 0&&(f=v(de,he));const se=_?v(de,he):f;return se.width=de,se.height=he,se.getContext("2d").drawImage(A,0,0,de,he),Be("WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+de+"x"+he+")."),se}else return"data"in A&&Be("WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),A;return A}function g(A){return A.generateMipmaps}function y(A){n.generateMipmap(A)}function w(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(A,_,W,J,re,de=!1){if(A!==null){if(n[A]!==void 0)return n[A];Be("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let he;J&&(he=e.get("EXT_texture_norm16"),he||Be("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let se=_;if(_===n.RED&&(W===n.FLOAT&&(se=n.R32F),W===n.HALF_FLOAT&&(se=n.R16F),W===n.UNSIGNED_BYTE&&(se=n.R8),W===n.UNSIGNED_SHORT&&he&&(se=he.R16_EXT),W===n.SHORT&&he&&(se=he.R16_SNORM_EXT)),_===n.RED_INTEGER&&(W===n.UNSIGNED_BYTE&&(se=n.R8UI),W===n.UNSIGNED_SHORT&&(se=n.R16UI),W===n.UNSIGNED_INT&&(se=n.R32UI),W===n.BYTE&&(se=n.R8I),W===n.SHORT&&(se=n.R16I),W===n.INT&&(se=n.R32I)),_===n.RG&&(W===n.FLOAT&&(se=n.RG32F),W===n.HALF_FLOAT&&(se=n.RG16F),W===n.UNSIGNED_BYTE&&(se=n.RG8),W===n.UNSIGNED_SHORT&&he&&(se=he.RG16_EXT),W===n.SHORT&&he&&(se=he.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(W===n.UNSIGNED_BYTE&&(se=n.RG8UI),W===n.UNSIGNED_SHORT&&(se=n.RG16UI),W===n.UNSIGNED_INT&&(se=n.RG32UI),W===n.BYTE&&(se=n.RG8I),W===n.SHORT&&(se=n.RG16I),W===n.INT&&(se=n.RG32I)),_===n.RGB_INTEGER&&(W===n.UNSIGNED_BYTE&&(se=n.RGB8UI),W===n.UNSIGNED_SHORT&&(se=n.RGB16UI),W===n.UNSIGNED_INT&&(se=n.RGB32UI),W===n.BYTE&&(se=n.RGB8I),W===n.SHORT&&(se=n.RGB16I),W===n.INT&&(se=n.RGB32I)),_===n.RGBA_INTEGER&&(W===n.UNSIGNED_BYTE&&(se=n.RGBA8UI),W===n.UNSIGNED_SHORT&&(se=n.RGBA16UI),W===n.UNSIGNED_INT&&(se=n.RGBA32UI),W===n.BYTE&&(se=n.RGBA8I),W===n.SHORT&&(se=n.RGBA16I),W===n.INT&&(se=n.RGBA32I)),_===n.RGB&&(W===n.UNSIGNED_SHORT&&he&&(se=he.RGB16_EXT),W===n.SHORT&&he&&(se=he.RGB16_SNORM_EXT),W===n.UNSIGNED_INT_5_9_9_9_REV&&(se=n.RGB9_E5),W===n.UNSIGNED_INT_10F_11F_11F_REV&&(se=n.R11F_G11F_B10F)),_===n.RGBA){const le=de?os:je.getTransfer(re);W===n.FLOAT&&(se=n.RGBA32F),W===n.HALF_FLOAT&&(se=n.RGBA16F),W===n.UNSIGNED_BYTE&&(se=le===rt?n.SRGB8_ALPHA8:n.RGBA8),W===n.UNSIGNED_SHORT&&he&&(se=he.RGBA16_EXT),W===n.SHORT&&he&&(se=he.RGBA16_SNORM_EXT),W===n.UNSIGNED_SHORT_4_4_4_4&&(se=n.RGBA4),W===n.UNSIGNED_SHORT_5_5_5_1&&(se=n.RGB5_A1)}return(se===n.R16F||se===n.R32F||se===n.RG16F||se===n.RG32F||se===n.RGBA16F||se===n.RGBA32F)&&e.get("EXT_color_buffer_float"),se}function T(A,_){let W;return A?_===null||_===fn||_===sr?W=n.DEPTH24_STENCIL8:_===un?W=n.DEPTH32F_STENCIL8:_===rr&&(W=n.DEPTH24_STENCIL8,Be("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===fn||_===sr?W=n.DEPTH_COMPONENT24:_===un?W=n.DEPTH_COMPONENT32F:_===rr&&(W=n.DEPTH_COMPONENT16),W}function b(A,_){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==Lt&&A.minFilter!==Ut?Math.log2(Math.max(_.width,_.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?_.mipmaps.length:1}function I(A){const _=A.target;_.removeEventListener("dispose",I),M(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&h.delete(_)}function x(A){const _=A.target;_.removeEventListener("dispose",x),D(_)}function M(A){const _=i.get(A);if(_.__webglInit===void 0)return;const W=A.source,J=d.get(W);if(J){const re=J[_.__cacheKey];re.usedTimes--,re.usedTimes===0&&R(A),Object.keys(J).length===0&&d.delete(W)}i.remove(A)}function R(A){const _=i.get(A);n.deleteTexture(_.__webglTexture);const W=A.source,J=d.get(W);delete J[_.__cacheKey],a.memory.textures--}function D(A){const _=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(_.__webglFramebuffer[J]))for(let re=0;re<_.__webglFramebuffer[J].length;re++)n.deleteFramebuffer(_.__webglFramebuffer[J][re]);else n.deleteFramebuffer(_.__webglFramebuffer[J]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[J])}else{if(Array.isArray(_.__webglFramebuffer))for(let J=0;J<_.__webglFramebuffer.length;J++)n.deleteFramebuffer(_.__webglFramebuffer[J]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let J=0;J<_.__webglColorRenderbuffer.length;J++)_.__webglColorRenderbuffer[J]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[J]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const W=A.textures;for(let J=0,re=W.length;J<re;J++){const de=i.get(W[J]);de.__webglTexture&&(n.deleteTexture(de.__webglTexture),a.memory.textures--),i.remove(W[J])}i.remove(A)}let P=0;function F(){P=0}function N(){return P}function H(A){P=A}function Q(){const A=P;return A>=r.maxTextures&&Be("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+r.maxTextures),P+=1,A}function G(A){const _=[];return _.push(A.wrapS),_.push(A.wrapT),_.push(A.wrapR||0),_.push(A.magFilter),_.push(A.minFilter),_.push(A.anisotropy),_.push(A.internalFormat),_.push(A.format),_.push(A.type),_.push(A.generateMipmaps),_.push(A.premultiplyAlpha),_.push(A.flipY),_.push(A.unpackAlignment),_.push(A.colorSpace),_.join()}function U(A,_){const W=i.get(A);if(A.isVideoTexture&&k(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&W.__version!==A.version){const J=A.image;if(J===null)Be("WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)Be("WebGLRenderer: Texture marked for update but image is incomplete");else{ae(W,A,_);return}}else A.isExternalTexture&&(W.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,W.__webglTexture,n.TEXTURE0+_)}function V(A,_){const W=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&W.__version!==A.version){ae(W,A,_);return}else A.isExternalTexture&&(W.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,W.__webglTexture,n.TEXTURE0+_)}function ee(A,_){const W=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&W.__version!==A.version){ae(W,A,_);return}t.bindTexture(n.TEXTURE_3D,W.__webglTexture,n.TEXTURE0+_)}function te(A,_){const W=i.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&W.__version!==A.version){be(W,A,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture,n.TEXTURE0+_)}const Z={[xa]:n.REPEAT,[yn]:n.CLAMP_TO_EDGE,[Sa]:n.MIRRORED_REPEAT},ue={[Lt]:n.NEAREST,[Ed]:n.NEAREST_MIPMAP_NEAREST,[xr]:n.NEAREST_MIPMAP_LINEAR,[Ut]:n.LINEAR,[ws]:n.LINEAR_MIPMAP_NEAREST,[Kn]:n.LINEAR_MIPMAP_LINEAR},Le={[Ad]:n.NEVER,[Id]:n.ALWAYS,[Cd]:n.LESS,[Eo]:n.LEQUAL,[Rd]:n.EQUAL,[bo]:n.GEQUAL,[Ld]:n.GREATER,[Pd]:n.NOTEQUAL};function Se(A,_){if(_.type===un&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Ut||_.magFilter===ws||_.magFilter===xr||_.magFilter===Kn||_.minFilter===Ut||_.minFilter===ws||_.minFilter===xr||_.minFilter===Kn)&&Be("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,Z[_.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,Z[_.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,Z[_.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,ue[_.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,ue[_.minFilter]),_.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,Le[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Lt||_.minFilter!==xr&&_.minFilter!==Kn||_.type===un&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");n.texParameterf(A,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function me(A,_){let W=!1;A.__webglInit===void 0&&(A.__webglInit=!0,_.addEventListener("dispose",I));const J=_.source;let re=d.get(J);re===void 0&&(re={},d.set(J,re));const de=G(_);if(de!==A.__cacheKey){re[de]===void 0&&(re[de]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,W=!0),re[de].usedTimes++;const he=re[A.__cacheKey];he!==void 0&&(re[A.__cacheKey].usedTimes--,he.usedTimes===0&&R(_)),A.__cacheKey=de,A.__webglTexture=re[de].texture}return W}function O(A,_,W){return Math.floor(Math.floor(A/W)/_)}function q(A,_,W,J){const de=A.updateRanges;if(de.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,W,J,_.data);else{de.sort((Pe,xe)=>Pe.start-xe.start);let he=0;for(let Pe=1;Pe<de.length;Pe++){const xe=de[he],ge=de[Pe],Ie=xe.start+xe.count,Fe=O(ge.start,_.width,4),He=O(xe.start,_.width,4);ge.start<=Ie+1&&Fe===He&&O(ge.start+ge.count-1,_.width,4)===Fe?xe.count=Math.max(xe.count,ge.start+ge.count-xe.start):(++he,de[he]=ge)}de.length=he+1;const se=t.getParameter(n.UNPACK_ROW_LENGTH),le=t.getParameter(n.UNPACK_SKIP_PIXELS),fe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let Pe=0,xe=de.length;Pe<xe;Pe++){const ge=de[Pe],Ie=Math.floor(ge.start/4),Fe=Math.ceil(ge.count/4),He=Ie%_.width,z=Math.floor(Ie/_.width),ve=Fe,oe=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,He),t.pixelStorei(n.UNPACK_SKIP_ROWS,z),t.texSubImage2D(n.TEXTURE_2D,0,He,z,ve,oe,W,J,_.data)}A.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,se),t.pixelStorei(n.UNPACK_SKIP_PIXELS,le),t.pixelStorei(n.UNPACK_SKIP_ROWS,fe)}}function ae(A,_,W){let J=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(J=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(J=n.TEXTURE_3D);const re=me(A,_),de=_.source;t.bindTexture(J,A.__webglTexture,n.TEXTURE0+W);const he=i.get(de);if(de.version!==he.__version||re===!0){if(t.activeTexture(n.TEXTURE0+W),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const oe=je.getPrimaries(je.workingColorSpace),pe=_.colorSpace===Hn?null:je.getPrimaries(_.colorSpace),C=_.colorSpace===Hn||oe===pe?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,C)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let le=m(_.image,!1,r.maxTextureSize);le=St(_,le);const fe=s.convert(_.format,_.colorSpace),Pe=s.convert(_.type);let xe=S(_.internalFormat,fe,Pe,_.normalized,_.colorSpace,_.isVideoTexture);Se(J,_);let ge;const Ie=_.mipmaps,Fe=_.isVideoTexture!==!0,He=he.__version===void 0||re===!0,z=de.dataReady,ve=b(_,le);if(_.isDepthTexture)xe=T(_.format===Zn,_.type),He&&(Fe?t.texStorage2D(n.TEXTURE_2D,1,xe,le.width,le.height):t.texImage2D(n.TEXTURE_2D,0,xe,le.width,le.height,0,fe,Pe,null));else if(_.isDataTexture)if(Ie.length>0){Fe&&He&&t.texStorage2D(n.TEXTURE_2D,ve,xe,Ie[0].width,Ie[0].height);for(let oe=0,pe=Ie.length;oe<pe;oe++)ge=Ie[oe],Fe?z&&t.texSubImage2D(n.TEXTURE_2D,oe,0,0,ge.width,ge.height,fe,Pe,ge.data):t.texImage2D(n.TEXTURE_2D,oe,xe,ge.width,ge.height,0,fe,Pe,ge.data);_.generateMipmaps=!1}else Fe?(He&&t.texStorage2D(n.TEXTURE_2D,ve,xe,le.width,le.height),z&&q(_,le,fe,Pe)):t.texImage2D(n.TEXTURE_2D,0,xe,le.width,le.height,0,fe,Pe,le.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Fe&&He&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ve,xe,Ie[0].width,Ie[0].height,le.depth);for(let oe=0,pe=Ie.length;oe<pe;oe++)if(ge=Ie[oe],_.format!==en)if(fe!==null)if(Fe){if(z)if(_.layerUpdates.size>0){const C=Fl(ge.width,ge.height,_.format,_.type);for(const L of _.layerUpdates){const Y=ge.data.subarray(L*C/ge.data.BYTES_PER_ELEMENT,(L+1)*C/ge.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,oe,0,0,L,ge.width,ge.height,1,fe,Y)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,oe,0,0,0,ge.width,ge.height,le.depth,fe,ge.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,oe,xe,ge.width,ge.height,le.depth,0,ge.data,0,0);else Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Fe?z&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,oe,0,0,0,ge.width,ge.height,le.depth,fe,Pe,ge.data):t.texImage3D(n.TEXTURE_2D_ARRAY,oe,xe,ge.width,ge.height,le.depth,0,fe,Pe,ge.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Fe&&He&&t.texStorage2D(n.TEXTURE_2D,ve,xe,Ie[0].width,Ie[0].height);for(let oe=0,pe=Ie.length;oe<pe;oe++)ge=Ie[oe],_.format!==en?fe!==null?Fe?z&&t.compressedTexSubImage2D(n.TEXTURE_2D,oe,0,0,ge.width,ge.height,fe,ge.data):t.compressedTexImage2D(n.TEXTURE_2D,oe,xe,ge.width,ge.height,0,ge.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Fe?z&&t.texSubImage2D(n.TEXTURE_2D,oe,0,0,ge.width,ge.height,fe,Pe,ge.data):t.texImage2D(n.TEXTURE_2D,oe,xe,ge.width,ge.height,0,fe,Pe,ge.data)}else if(_.isDataArrayTexture)if(Fe){if(He&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ve,xe,le.width,le.height,le.depth),z)if(_.layerUpdates.size>0){const oe=Fl(le.width,le.height,_.format,_.type);for(const pe of _.layerUpdates){const C=le.data.subarray(pe*oe/le.data.BYTES_PER_ELEMENT,(pe+1)*oe/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,pe,le.width,le.height,1,fe,Pe,C)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,fe,Pe,le.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,xe,le.width,le.height,le.depth,0,fe,Pe,le.data);else if(_.isData3DTexture)Fe?(He&&t.texStorage3D(n.TEXTURE_3D,ve,xe,le.width,le.height,le.depth),z&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,fe,Pe,le.data)):t.texImage3D(n.TEXTURE_3D,0,xe,le.width,le.height,le.depth,0,fe,Pe,le.data);else if(_.isFramebufferTexture){if(He)if(Fe)t.texStorage2D(n.TEXTURE_2D,ve,xe,le.width,le.height);else{let oe=le.width,pe=le.height;for(let C=0;C<ve;C++)t.texImage2D(n.TEXTURE_2D,C,xe,oe,pe,0,fe,Pe,null),oe>>=1,pe>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){const oe=n.canvas;if(oe.hasAttribute("layoutsubtree")||oe.setAttribute("layoutsubtree","true"),le.parentNode!==oe){oe.appendChild(le),h.add(_),oe.onpaint=pe=>{const C=pe.changedElements;for(const L of h)C.includes(L.image)&&(L.needsUpdate=!0)},oe.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,le);else{const C=n.RGBA,L=n.RGBA,Y=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,C,L,Y,le)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ie.length>0){if(Fe&&He){const oe=We(Ie[0]);t.texStorage2D(n.TEXTURE_2D,ve,xe,oe.width,oe.height)}for(let oe=0,pe=Ie.length;oe<pe;oe++)ge=Ie[oe],Fe?z&&t.texSubImage2D(n.TEXTURE_2D,oe,0,0,fe,Pe,ge):t.texImage2D(n.TEXTURE_2D,oe,xe,fe,Pe,ge);_.generateMipmaps=!1}else if(Fe){if(He){const oe=We(le);t.texStorage2D(n.TEXTURE_2D,ve,xe,oe.width,oe.height)}z&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,fe,Pe,le)}else t.texImage2D(n.TEXTURE_2D,0,xe,fe,Pe,le);g(_)&&y(J),he.__version=de.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function be(A,_,W){if(_.image.length!==6)return;const J=me(A,_),re=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+W);const de=i.get(re);if(re.version!==de.__version||J===!0){t.activeTexture(n.TEXTURE0+W);const he=je.getPrimaries(je.workingColorSpace),se=_.colorSpace===Hn?null:je.getPrimaries(_.colorSpace),le=_.colorSpace===Hn||he===se?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,le);const fe=_.isCompressedTexture||_.image[0].isCompressedTexture,Pe=_.image[0]&&_.image[0].isDataTexture,xe=[];for(let L=0;L<6;L++)!fe&&!Pe?xe[L]=m(_.image[L],!0,r.maxCubemapSize):xe[L]=Pe?_.image[L].image:_.image[L],xe[L]=St(_,xe[L]);const ge=xe[0],Ie=s.convert(_.format,_.colorSpace),Fe=s.convert(_.type),He=S(_.internalFormat,Ie,Fe,_.normalized,_.colorSpace),z=_.isVideoTexture!==!0,ve=de.__version===void 0||J===!0,oe=re.dataReady;let pe=b(_,ge);Se(n.TEXTURE_CUBE_MAP,_);let C;if(fe){z&&ve&&t.texStorage2D(n.TEXTURE_CUBE_MAP,pe,He,ge.width,ge.height);for(let L=0;L<6;L++){C=xe[L].mipmaps;for(let Y=0;Y<C.length;Y++){const ie=C[Y];_.format!==en?Ie!==null?z?oe&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+L,Y,0,0,ie.width,ie.height,Ie,ie.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+L,Y,He,ie.width,ie.height,0,ie.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+L,Y,0,0,ie.width,ie.height,Ie,Fe,ie.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+L,Y,He,ie.width,ie.height,0,Ie,Fe,ie.data)}}}else{if(C=_.mipmaps,z&&ve){C.length>0&&pe++;const L=We(xe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,pe,He,L.width,L.height)}for(let L=0;L<6;L++)if(Pe){z?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+L,0,0,0,xe[L].width,xe[L].height,Ie,Fe,xe[L].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+L,0,He,xe[L].width,xe[L].height,0,Ie,Fe,xe[L].data);for(let Y=0;Y<C.length;Y++){const _e=C[Y].image[L].image;z?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+L,Y+1,0,0,_e.width,_e.height,Ie,Fe,_e.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+L,Y+1,He,_e.width,_e.height,0,Ie,Fe,_e.data)}}else{z?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+L,0,0,0,Ie,Fe,xe[L]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+L,0,He,Ie,Fe,xe[L]);for(let Y=0;Y<C.length;Y++){const ie=C[Y];z?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+L,Y+1,0,0,Ie,Fe,ie.image[L]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+L,Y+1,He,Ie,Fe,ie.image[L])}}}g(_)&&y(n.TEXTURE_CUBE_MAP),de.__version=re.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function j(A,_,W,J,re,de){const he=s.convert(W.format,W.colorSpace),se=s.convert(W.type),le=S(W.internalFormat,he,se,W.normalized,W.colorSpace),fe=i.get(_),Pe=i.get(W);if(Pe.__renderTarget=_,!fe.__hasExternalTextures){const xe=Math.max(1,_.width>>de),ge=Math.max(1,_.height>>de);re===n.TEXTURE_3D||re===n.TEXTURE_2D_ARRAY?t.texImage3D(re,de,le,xe,ge,_.depth,0,he,se,null):t.texImage2D(re,de,le,xe,ge,0,he,se,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),et(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,J,re,Pe.__webglTexture,0,Ke(_)):(re===n.TEXTURE_2D||re>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,J,re,Pe.__webglTexture,de),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ce(A,_,W){if(n.bindRenderbuffer(n.RENDERBUFFER,A),_.depthBuffer){const J=_.depthTexture,re=J&&J.isDepthTexture?J.type:null,de=T(_.stencilBuffer,re),he=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;et(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ke(_),de,_.width,_.height):W?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ke(_),de,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,de,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,he,n.RENDERBUFFER,A)}else{const J=_.textures;for(let re=0;re<J.length;re++){const de=J[re],he=s.convert(de.format,de.colorSpace),se=s.convert(de.type),le=S(de.internalFormat,he,se,de.normalized,de.colorSpace);et(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ke(_),le,_.width,_.height):W?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ke(_),le,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,le,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Re(A,_,W){const J=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const re=i.get(_.depthTexture);if(re.__renderTarget=_,(!re.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),J){if(re.__webglInit===void 0&&(re.__webglInit=!0,_.depthTexture.addEventListener("dispose",I)),re.__webglTexture===void 0){re.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,re.__webglTexture),Se(n.TEXTURE_CUBE_MAP,_.depthTexture);const fe=s.convert(_.depthTexture.format),Pe=s.convert(_.depthTexture.type);let xe;_.depthTexture.format===Cn?xe=n.DEPTH_COMPONENT24:_.depthTexture.format===Zn&&(xe=n.DEPTH24_STENCIL8);for(let ge=0;ge<6;ge++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,xe,_.width,_.height,0,fe,Pe,null)}}else U(_.depthTexture,0);const de=re.__webglTexture,he=Ke(_),se=J?n.TEXTURE_CUBE_MAP_POSITIVE_X+W:n.TEXTURE_2D,le=_.depthTexture.format===Zn?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===Cn)et(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,le,se,de,0,he):n.framebufferTexture2D(n.FRAMEBUFFER,le,se,de,0);else if(_.depthTexture.format===Zn)et(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,le,se,de,0,he):n.framebufferTexture2D(n.FRAMEBUFFER,le,se,de,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ue(A){const _=i.get(A),W=A.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==A.depthTexture){const J=A.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),J){const re=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,J.removeEventListener("dispose",re)};J.addEventListener("dispose",re),_.__depthDisposeCallback=re}_.__boundDepthTexture=J}if(A.depthTexture&&!_.__autoAllocateDepthBuffer)if(W)for(let J=0;J<6;J++)Re(_.__webglFramebuffer[J],A,J);else{const J=A.texture.mipmaps;J&&J.length>0?Re(_.__webglFramebuffer[0],A,0):Re(_.__webglFramebuffer,A,0)}else if(W){_.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[J]),_.__webglDepthbuffer[J]===void 0)_.__webglDepthbuffer[J]=n.createRenderbuffer(),ce(_.__webglDepthbuffer[J],A,!1);else{const re=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,de=_.__webglDepthbuffer[J];n.bindRenderbuffer(n.RENDERBUFFER,de),n.framebufferRenderbuffer(n.FRAMEBUFFER,re,n.RENDERBUFFER,de)}}else{const J=A.texture.mipmaps;if(J&&J.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),ce(_.__webglDepthbuffer,A,!1);else{const re=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,de=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,de),n.framebufferRenderbuffer(n.FRAMEBUFFER,re,n.RENDERBUFFER,de)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function ke(A,_,W){const J=i.get(A);_!==void 0&&j(J.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),W!==void 0&&Ue(A)}function Oe(A){const _=A.texture,W=i.get(A),J=i.get(_);A.addEventListener("dispose",x);const re=A.textures,de=A.isWebGLCubeRenderTarget===!0,he=re.length>1;if(he||(J.__webglTexture===void 0&&(J.__webglTexture=n.createTexture()),J.__version=_.version,a.memory.textures++),de){W.__webglFramebuffer=[];for(let se=0;se<6;se++)if(_.mipmaps&&_.mipmaps.length>0){W.__webglFramebuffer[se]=[];for(let le=0;le<_.mipmaps.length;le++)W.__webglFramebuffer[se][le]=n.createFramebuffer()}else W.__webglFramebuffer[se]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){W.__webglFramebuffer=[];for(let se=0;se<_.mipmaps.length;se++)W.__webglFramebuffer[se]=n.createFramebuffer()}else W.__webglFramebuffer=n.createFramebuffer();if(he)for(let se=0,le=re.length;se<le;se++){const fe=i.get(re[se]);fe.__webglTexture===void 0&&(fe.__webglTexture=n.createTexture(),a.memory.textures++)}if(A.samples>0&&et(A)===!1){W.__webglMultisampledFramebuffer=n.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let se=0;se<re.length;se++){const le=re[se];W.__webglColorRenderbuffer[se]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,W.__webglColorRenderbuffer[se]);const fe=s.convert(le.format,le.colorSpace),Pe=s.convert(le.type),xe=S(le.internalFormat,fe,Pe,le.normalized,le.colorSpace,A.isXRRenderTarget===!0),ge=Ke(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,ge,xe,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+se,n.RENDERBUFFER,W.__webglColorRenderbuffer[se])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(W.__webglDepthRenderbuffer=n.createRenderbuffer(),ce(W.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(de){t.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture),Se(n.TEXTURE_CUBE_MAP,_);for(let se=0;se<6;se++)if(_.mipmaps&&_.mipmaps.length>0)for(let le=0;le<_.mipmaps.length;le++)j(W.__webglFramebuffer[se][le],A,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+se,le);else j(W.__webglFramebuffer[se],A,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);g(_)&&y(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(he){for(let se=0,le=re.length;se<le;se++){const fe=re[se],Pe=i.get(fe);let xe=n.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(xe=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(xe,Pe.__webglTexture),Se(xe,fe),j(W.__webglFramebuffer,A,fe,n.COLOR_ATTACHMENT0+se,xe,0),g(fe)&&y(xe)}t.unbindTexture()}else{let se=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(se=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(se,J.__webglTexture),Se(se,_),_.mipmaps&&_.mipmaps.length>0)for(let le=0;le<_.mipmaps.length;le++)j(W.__webglFramebuffer[le],A,_,n.COLOR_ATTACHMENT0,se,le);else j(W.__webglFramebuffer,A,_,n.COLOR_ATTACHMENT0,se,0);g(_)&&y(se),t.unbindTexture()}A.depthBuffer&&Ue(A)}function ze(A){const _=A.textures;for(let W=0,J=_.length;W<J;W++){const re=_[W];if(g(re)){const de=w(A),he=i.get(re).__webglTexture;t.bindTexture(de,he),y(de),t.unbindTexture()}}}const Ge=[],pt=[];function lt(A){if(A.samples>0){if(et(A)===!1){const _=A.textures,W=A.width,J=A.height;let re=n.COLOR_BUFFER_BIT;const de=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,he=i.get(A),se=_.length>1;if(se)for(let fe=0;fe<_.length;fe++)t.bindFramebuffer(n.FRAMEBUFFER,he.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,he.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,he.__webglMultisampledFramebuffer);const le=A.texture.mipmaps;le&&le.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,he.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let fe=0;fe<_.length;fe++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(re|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(re|=n.STENCIL_BUFFER_BIT)),se){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,he.__webglColorRenderbuffer[fe]);const Pe=i.get(_[fe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Pe,0)}n.blitFramebuffer(0,0,W,J,0,0,W,J,re,n.NEAREST),l===!0&&(Ge.length=0,pt.length=0,Ge.push(n.COLOR_ATTACHMENT0+fe),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&(Ge.push(de),pt.push(de),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,pt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ge))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),se)for(let fe=0;fe<_.length;fe++){t.bindFramebuffer(n.FRAMEBUFFER,he.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,he.__webglColorRenderbuffer[fe]);const Pe=i.get(_[fe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,he.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,Pe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,he.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&l){const _=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function Ke(A){return Math.min(r.maxSamples,A.samples)}function et(A){const _=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function k(A){const _=a.render.frame;u.get(A)!==_&&(u.set(A,_),A.update())}function St(A,_){const W=A.colorSpace,J=A.format,re=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||W!==as&&W!==Hn&&(je.getTransfer(W)===rt?(J!==en||re!==Yt)&&Be("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):nt("WebGLTextures: Unsupported texture color space:",W)),_}function We(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=Q,this.resetTextureUnits=F,this.getTextureUnits=N,this.setTextureUnits=H,this.setTexture2D=U,this.setTexture2DArray=V,this.setTexture3D=ee,this.setTextureCube=te,this.rebindTextures=ke,this.setupRenderTarget=Oe,this.updateRenderTargetMipmap=ze,this.updateMultisampleRenderTarget=lt,this.setupDepthRenderbuffer=Ue,this.setupFrameBufferTexture=j,this.useMultisampledRTT=et,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function z0(n,e){function t(i,r=Hn){let s;const a=je.getTransfer(r);if(i===Yt)return n.UNSIGNED_BYTE;if(i===_o)return n.UNSIGNED_SHORT_4_4_4_4;if(i===xo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Nc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Uc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Ic)return n.BYTE;if(i===Dc)return n.SHORT;if(i===rr)return n.UNSIGNED_SHORT;if(i===vo)return n.INT;if(i===fn)return n.UNSIGNED_INT;if(i===un)return n.FLOAT;if(i===hn)return n.HALF_FLOAT;if(i===Fc)return n.ALPHA;if(i===Oc)return n.RGB;if(i===en)return n.RGBA;if(i===Cn)return n.DEPTH_COMPONENT;if(i===Zn)return n.DEPTH_STENCIL;if(i===Bc)return n.RED;if(i===So)return n.RED_INTEGER;if(i===ni)return n.RG;if(i===Mo)return n.RG_INTEGER;if(i===yo)return n.RGBA_INTEGER;if(i===Kr||i===Zr||i===Jr||i===Qr)if(a===rt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Kr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Zr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Jr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Qr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Kr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Zr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Jr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Qr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ma||i===ya||i===Ea||i===ba)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Ma)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ya)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ea)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ba)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ta||i===wa||i===Aa||i===Ca||i===Ra||i===rs||i===La)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Ta||i===wa)return a===rt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Aa)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ca)return s.COMPRESSED_R11_EAC;if(i===Ra)return s.COMPRESSED_SIGNED_R11_EAC;if(i===rs)return s.COMPRESSED_RG11_EAC;if(i===La)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Pa||i===Ia||i===Da||i===Na||i===Ua||i===Fa||i===Oa||i===Ba||i===ka||i===za||i===Ha||i===Va||i===Ga||i===Wa)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Pa)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ia)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Da)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Na)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ua)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Fa)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Oa)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ba)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ka)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===za)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ha)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Va)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ga)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Wa)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Xa||i===qa||i===Ya)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Xa)return a===rt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===qa)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ya)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===$a||i===Ka||i===ss||i===Za)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===$a)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Ka)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ss)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Za)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===sr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const H0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,V0=`
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

}`;class G0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Yc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new mn({vertexShader:H0,fragmentShader:V0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new pn(new ps(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class W0 extends si{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,p=null;const v=typeof XRWebGLBinding<"u",m=new G0,g={},y=t.getContextAttributes();let w=null,S=null;const T=[],b=[],I=new Ne;let x=null,M=null;const R=new Qt;R.viewport=new gt;const D=new Qt;D.viewport=new gt;const P=[R,D],F=new Qf;let N=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(O){let q=T[O];return q===void 0&&(q=new Us,T[O]=q),q.getTargetRaySpace()},this.getControllerGrip=function(O){let q=T[O];return q===void 0&&(q=new Us,T[O]=q),q.getGripSpace()},this.getHand=function(O){let q=T[O];return q===void 0&&(q=new Us,T[O]=q),q.getHandSpace()};function Q(O){const q=b.indexOf(O.inputSource);if(q===-1)return;const ae=T[q];ae!==void 0&&(ae.update(O.inputSource,O.frame,c||a),ae.dispatchEvent({type:O.type,data:O.inputSource}))}function G(){r.removeEventListener("select",Q),r.removeEventListener("selectstart",Q),r.removeEventListener("selectend",Q),r.removeEventListener("squeeze",Q),r.removeEventListener("squeezestart",Q),r.removeEventListener("squeezeend",Q),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",U);for(let O=0;O<T.length;O++){const q=b[O];q!==null&&(b[O]=null,T[O].disconnect(q))}N=null,H=null,m.reset();for(const O in g)delete g[O];if(e.setRenderTarget(w),d=null,f=null,h=null,r=null,S=null,me.stop(),i.isPresenting=!1,e.setPixelRatio(x),e.setSize(I.width,I.height,!1),M!==null){const O=M.camera;O.fov=M.fov,O.zoom=M.zoom,O.updateProjectionMatrix(),M=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(O){s=O,i.isPresenting===!0&&Be("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(O){o=O,i.isPresenting===!0&&Be("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(O){c=O},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h===null&&v&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(O){if(r=O,r!==null){if(w=e.getRenderTarget(),r.addEventListener("select",Q),r.addEventListener("selectstart",Q),r.addEventListener("selectend",Q),r.addEventListener("squeeze",Q),r.addEventListener("squeezestart",Q),r.addEventListener("squeezeend",Q),r.addEventListener("end",G),r.addEventListener("inputsourceschange",U),y.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(I),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ae=null,be=null,j=null;y.depth&&(j=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=y.stencil?Zn:Cn,be=y.stencil?sr:fn);const ce={colorFormat:t.RGBA8,depthFormat:j,scaleFactor:s};h=this.getBinding(),f=h.createProjectionLayer(ce),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new nn(f.textureWidth,f.textureHeight,{format:en,type:Yt,depthTexture:new or(f.textureWidth,f.textureHeight,be,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{const ae={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,ae),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),S=new nn(d.framebufferWidth,d.framebufferHeight,{format:en,type:Yt,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),me.setContext(r),me.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function U(O){for(let q=0;q<O.removed.length;q++){const ae=O.removed[q],be=b.indexOf(ae);be>=0&&(b[be]=null,T[be].disconnect(ae))}for(let q=0;q<O.added.length;q++){const ae=O.added[q];let be=b.indexOf(ae);if(be===-1){for(let ce=0;ce<T.length;ce++)if(ce>=b.length){b.push(ae),be=ce;break}else if(b[ce]===null){b[ce]=ae,be=ce;break}if(be===-1)break}const j=T[be];j&&j.connect(ae)}}const V=new X,ee=new X;function te(O,q,ae){V.setFromMatrixPosition(q.matrixWorld),ee.setFromMatrixPosition(ae.matrixWorld);const be=V.distanceTo(ee),j=q.projectionMatrix.elements,ce=ae.projectionMatrix.elements,Re=j[14]/(j[10]-1),Ue=j[14]/(j[10]+1),ke=(j[9]+1)/j[5],Oe=(j[9]-1)/j[5],ze=(j[8]-1)/j[0],Ge=(ce[8]+1)/ce[0],pt=Re*ze,lt=Re*Ge,Ke=be/(-ze+Ge),et=Ke*-ze;if(q.matrixWorld.decompose(O.position,O.quaternion,O.scale),O.translateX(et),O.translateZ(Ke),O.matrixWorld.compose(O.position,O.quaternion,O.scale),O.matrixWorldInverse.copy(O.matrixWorld).invert(),j[10]===-1)O.projectionMatrix.copy(q.projectionMatrix),O.projectionMatrixInverse.copy(q.projectionMatrixInverse);else{const k=Re+Ke,St=Ue+Ke,We=pt-et,A=lt+(be-et),_=ke*Ue/St*k,W=Oe*Ue/St*k;O.projectionMatrix.makePerspective(We,A,_,W,k,St),O.projectionMatrixInverse.copy(O.projectionMatrix).invert()}}function Z(O,q){q===null?O.matrixWorld.copy(O.matrix):O.matrixWorld.multiplyMatrices(q.matrixWorld,O.matrix),O.matrixWorldInverse.copy(O.matrixWorld).invert()}this.updateCamera=function(O){if(r===null)return;let q=O.near,ae=O.far;m.texture!==null&&(m.depthNear>0&&(q=m.depthNear),m.depthFar>0&&(ae=m.depthFar)),F.near=D.near=R.near=q,F.far=D.far=R.far=ae,(N!==F.near||H!==F.far)&&(r.updateRenderState({depthNear:F.near,depthFar:F.far}),N=F.near,H=F.far),F.layers.mask=O.layers.mask|6,R.layers.mask=F.layers.mask&-5,D.layers.mask=F.layers.mask&-3;const be=O.parent,j=F.cameras;Z(F,be);for(let ce=0;ce<j.length;ce++)Z(j[ce],be);j.length===2?te(F,R,D):F.projectionMatrix.copy(R.projectionMatrix),M===null&&O.isPerspectiveCamera&&(M={camera:O,fov:O.fov,zoom:O.zoom}),ue(O,F,be)};function ue(O,q,ae){ae===null?O.matrix.copy(q.matrixWorld):(O.matrix.copy(ae.matrixWorld),O.matrix.invert(),O.matrix.multiply(q.matrixWorld)),O.matrix.decompose(O.position,O.quaternion,O.scale),O.updateMatrixWorld(!0),O.projectionMatrix.copy(q.projectionMatrix),O.projectionMatrixInverse.copy(q.projectionMatrixInverse),O.isPerspectiveCamera&&(O.fov=Ja*2*Math.atan(1/O.projectionMatrix.elements[5]),O.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(O){l=O,f!==null&&(f.fixedFoveation=O),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=O)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(O){return g[O]};let Le=null;function Se(O,q){if(u=q.getViewerPose(c||a),p=q,u!==null){const ae=u.views;d!==null&&(e.setRenderTargetFramebuffer(S,d.framebuffer),e.setRenderTarget(S));let be=!1;ae.length!==F.cameras.length&&(F.cameras.length=0,be=!0);for(let Ue=0;Ue<ae.length;Ue++){const ke=ae[Ue];let Oe=null;if(d!==null)Oe=d.getViewport(ke);else{const Ge=h.getViewSubImage(f,ke);Oe=Ge.viewport,Ue===0&&(e.setRenderTargetTextures(S,Ge.colorTexture,Ge.depthStencilTexture),e.setRenderTarget(S))}let ze=P[Ue];ze===void 0&&(ze=new Qt,ze.layers.enable(Ue),ze.viewport=new gt,P[Ue]=ze),ze.matrix.fromArray(ke.transform.matrix),ze.matrix.decompose(ze.position,ze.quaternion,ze.scale),ze.projectionMatrix.fromArray(ke.projectionMatrix),ze.projectionMatrixInverse.copy(ze.projectionMatrix).invert(),ze.viewport.set(Oe.x,Oe.y,Oe.width,Oe.height),Ue===0&&(F.matrix.copy(ze.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),be===!0&&F.cameras.push(ze)}const j=r.enabledFeatures;if(j&&j.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){h=i.getBinding();const Ue=h.getDepthInformation(ae[0]);Ue&&Ue.isValid&&Ue.texture&&m.init(Ue,r.renderState)}if(j&&j.includes("camera-access")&&v){e.state.unbindTexture(),h=i.getBinding();for(let Ue=0;Ue<ae.length;Ue++){const ke=ae[Ue].camera;if(ke){let Oe=g[ke];Oe||(Oe=new Yc,g[ke]=Oe);const ze=h.getCameraImage(ke);Oe.sourceTexture=ze}}}}for(let ae=0;ae<T.length;ae++){const be=b[ae],j=T[ae];be!==null&&j!==void 0&&j.update(be,q,c||a)}Le&&Le(O,q),q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:q}),p=null}const me=new au;me.setAnimationLoop(Se),this.setAnimationLoop=function(O){Le=O},this.dispose=function(){}}}const X0=new xt,hu=new Ve;hu.set(-1,0,0,0,1,0,0,0,1);function q0(n,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function i(m,g){g.color.getRGB(m.fogColor.value,iu(n)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function r(m,g,y,w,S){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?s(m,g):g.isMeshLambertMaterial?(s(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(s(m,g),h(m,g)):g.isMeshPhongMaterial?(s(m,g),u(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(s(m,g),f(m,g),g.isMeshPhysicalMaterial&&d(m,g,S)):g.isMeshMatcapMaterial?(s(m,g),p(m,g)):g.isMeshDepthMaterial?s(m,g):g.isMeshDistanceMaterial?(s(m,g),v(m,g)):g.isMeshNormalMaterial?s(m,g):g.isLineBasicMaterial?(a(m,g),g.isLineDashedMaterial&&o(m,g)):g.isPointsMaterial?l(m,g,y,w):g.isSpriteMaterial?c(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function s(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===zt&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===zt&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);const y=e.get(g),w=y.envMap,S=y.envMapRotation;w&&(m.envMap.value=w,m.envMapRotation.value.setFromMatrix4(X0.makeRotationFromEuler(S)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(hu),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function a(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function o(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,y,w){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*y,m.scale.value=w*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function u(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function h(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function f(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function d(m,g,y){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===zt&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.retroreflectivity>0&&(m.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function v(m,g){const y=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Y0(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,T){const b=T.program;i.uniformBlockBinding(S,b)}function c(S,T){let b=r[S.id];b===void 0&&(m(S),b=u(S),r[S.id]=b,S.addEventListener("dispose",y));const I=T.program;i.updateUBOMapping(S,I);const x=e.render.frame;s[S.id]!==x&&(f(S),s[S.id]=x)}function u(S){const T=h();S.__bindingPointIndex=T;const b=n.createBuffer(),I=S.__size,x=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,I,x),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,b),b}function h(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return nt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(S){const T=r[S.id],b=S.uniforms,I=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let x=0,M=b.length;x<M;x++){const R=b[x];if(Array.isArray(R))for(let D=0,P=R.length;D<P;D++)d(R[D],x,D,I);else d(R,x,0,I)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(S,T,b,I){if(v(S,T,b,I)===!0){const x=S.__offset,M=S.value;if(Array.isArray(M)){let R=0;for(let D=0;D<M.length;D++){const P=M[D],F=g(P);p(P,S.__data,R),typeof P!="number"&&typeof P!="boolean"&&!P.isMatrix3&&!ArrayBuffer.isView(P)&&(R+=F.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(M,S.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,x,S.__data)}}function p(S,T,b){typeof S=="number"||typeof S=="boolean"?T[0]=S:S.isMatrix3?(T[0]=S.elements[0],T[1]=S.elements[1],T[2]=S.elements[2],T[3]=0,T[4]=S.elements[3],T[5]=S.elements[4],T[6]=S.elements[5],T[7]=0,T[8]=S.elements[6],T[9]=S.elements[7],T[10]=S.elements[8],T[11]=0):ArrayBuffer.isView(S)?T.set(new S.constructor(S.buffer,S.byteOffset,T.length)):S.toArray(T,b)}function v(S,T,b,I){const x=S.value,M=T+"_"+b;if(I[M]===void 0)return typeof x=="number"||typeof x=="boolean"?I[M]=x:ArrayBuffer.isView(x)?I[M]=x.slice():I[M]=x.clone(),!0;{const R=I[M];if(typeof x=="number"||typeof x=="boolean"){if(R!==x)return I[M]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(R.equals(x)===!1)return R.copy(x),!0}}return!1}function m(S){const T=S.uniforms;let b=0;const I=16;for(let M=0,R=T.length;M<R;M++){const D=Array.isArray(T[M])?T[M]:[T[M]];for(let P=0,F=D.length;P<F;P++){const N=D[P],H=Array.isArray(N.value)?N.value:[N.value];for(let Q=0,G=H.length;Q<G;Q++){const U=H[Q],V=g(U),ee=b%I,te=ee%V.boundary,Z=ee+te;b+=te,Z!==0&&I-Z<V.storage&&(b+=I-Z),N.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=b,b+=V.storage}}}const x=b%I;return x>0&&(b+=I-x),S.__size=b,S.__cache={},this}function g(S){const T={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(T.boundary=4,T.storage=4):S.isVector2?(T.boundary=8,T.storage=8):S.isVector3||S.isColor?(T.boundary=16,T.storage=12):S.isVector4?(T.boundary=16,T.storage=16):S.isMatrix3?(T.boundary=48,T.storage=48):S.isMatrix4?(T.boundary=64,T.storage=64):S.isTexture?Be("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(T.boundary=16,T.storage=S.byteLength):Be("WebGLRenderer: Unsupported uniform value type.",S),T}function y(S){const T=S.target;T.removeEventListener("dispose",y);const b=a.indexOf(T.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(r[T.id]),delete r[T.id],delete s[T.id]}function w(){for(const S in r)n.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:l,update:c,dispose:w}}const $0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let an=null;function K0(){return an===null&&(an=new of($0,16,16,ni,hn),an.name="DFG_LUT",an.minFilter=Ut,an.magFilter=Ut,an.wrapS=yn,an.wrapT=yn,an.generateMipmaps=!1,an.needsUpdate=!0),an}class Z0{constructor(e={}){const{canvas:t=Ud(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1,outputBufferType:d=Yt}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const v=d,m=new Set([yo,Mo,So]),g=new Set([Yt,fn,rr,sr,_o,xo]),y=new Uint32Array(4),w=new Int32Array(4),S=new X;let T=null,b=null;const I=[],x=[];let M=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=tn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const R=this;let D=!1,P=null,F=null,N=null,H=null;this._outputColorSpace=Nt;let Q=0,G=0,U=null,V=-1,ee=null;const te=new gt,Z=new gt;let ue=null;const Le=new qe(0);let Se=0,me=t.width,O=t.height,q=1,ae=null,be=null;const j=new gt(0,0,me,O),ce=new gt(0,0,me,O);let Re=!1;const Ue=new Xc;let ke=!1,Oe=!1;const ze=new xt,Ge=new X,pt=new gt,lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ke=!1;function et(){return U===null?q:1}let k=i;function St(E,B){return t.getContext(E,B)}let We,A,_,W,J,re,de,he,se,le,fe,Pe,xe,ge,Ie,Fe,He,z,ve,oe,pe,C,L;try{const E={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${go}`),t.addEventListener("webglcontextlost",_e,!1),t.addEventListener("webglcontextrestored",Xe,!1),t.addEventListener("webglcontextcreationerror",bt,!1),k===null){const B="webgl2";if(k=St(B,E),k===null)throw St(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Y()}catch(E){throw t.removeEventListener("webglcontextlost",_e,!1),t.removeEventListener("webglcontextrestored",Xe,!1),t.removeEventListener("webglcontextcreationerror",bt,!1),nt("WebGLRenderer: "+E.message),E}function Y(){We=new Km(k),We.init(),pe=new z0(k,We),A=new km(k,We,e,pe),_=new B0(k,We),A.reversedDepthBuffer&&f&&_.buffers.depth.setReversed(!0),F=k.createFramebuffer(),N=k.createFramebuffer(),H=k.createFramebuffer(),W=new Qm(k),J=new b0,re=new k0(k,We,_,J,A,pe,W),de=new $m(R),he=new eh(k),C=new Om(k,he),se=new Zm(k,he,W,C),le=new eg(k,se,he,C,W),z=new jm(k,A,re),Ie=new zm(J),fe=new E0(R,de,We,A,C,Ie),Pe=new q0(R,J),xe=new w0,ge=new I0(We),He=new Fm(R,de,_,le,p,l),Fe=new O0(R,le,A),L=new Y0(k,W,A,_),ve=new Bm(k,We,W),oe=new Jm(k,We,W),W.programs=fe.programs,R.capabilities=A,R.extensions=We,R.properties=J,R.renderLists=xe,R.shadowMap=Fe,R.state=_,R.info=W}v!==Yt&&(M=new ng(v,t.width,t.height,o,r,s));const ie=new W0(R,k);this.xr=ie,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const E=We.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=We.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(E){E!==void 0&&(q=E,this.setSize(me,O,!1))},this.getSize=function(E){return E.set(me,O)},this.setSize=function(E,B,ne=!0){if(ie.isPresenting){Be("WebGLRenderer: Can't change size while VR device is presenting.");return}me=E,O=B,t.width=Math.floor(E*q),t.height=Math.floor(B*q),ne===!0&&(t.style.width=E+"px",t.style.height=B+"px"),M!==null&&M.setSize(t.width,t.height),this.setViewport(0,0,E,B)},this.getDrawingBufferSize=function(E){return E.set(me*q,O*q).floor()},this.setDrawingBufferSize=function(E,B,ne){me=E,O=B,q=ne,t.width=Math.floor(E*ne),t.height=Math.floor(B*ne),this.setViewport(0,0,E,B)},this.setEffects=function(E){if(v===Yt){nt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let B=0;B<E.length;B++)if(E[B].isOutputPass===!0){Be("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}M.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(te)},this.getViewport=function(E){return E.copy(j)},this.setViewport=function(E,B,ne,$){E.isVector4?j.set(E.x,E.y,E.z,E.w):j.set(E,B,ne,$),_.viewport(te.copy(j).multiplyScalar(q).round())},this.getScissor=function(E){return E.copy(ce)},this.setScissor=function(E,B,ne,$){E.isVector4?ce.set(E.x,E.y,E.z,E.w):ce.set(E,B,ne,$),_.scissor(Z.copy(ce).multiplyScalar(q).round())},this.getScissorTest=function(){return Re},this.setScissorTest=function(E){_.setScissorTest(Re=E)},this.setOpaqueSort=function(E){ae=E},this.setTransparentSort=function(E){be=E},this.getClearColor=function(E){return E.copy(He.getClearColor())},this.setClearColor=function(){He.setClearColor(...arguments)},this.getClearAlpha=function(){return He.getClearAlpha()},this.setClearAlpha=function(){He.setClearAlpha(...arguments)},this.clear=function(E=!0,B=!0,ne=!0){let $=0;if(E){let K=!1;if(U!==null){const Ee=U.texture.format;K=m.has(Ee)}if(K){const Ee=U.texture.type,we=g.has(Ee),ye=He.getClearColor(),Ae=He.getClearAlpha(),De=ye.r,Ye=ye.g,Je=ye.b;we?(y[0]=De,y[1]=Ye,y[2]=Je,y[3]=Ae,k.clearBufferuiv(k.COLOR,0,y)):(w[0]=De,w[1]=Ye,w[2]=Je,w[3]=Ae,k.clearBufferiv(k.COLOR,0,w))}else $|=k.COLOR_BUFFER_BIT}B&&($|=k.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ne&&($|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$!==0&&k.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),P=E},this.dispose=function(){t.removeEventListener("webglcontextlost",_e,!1),t.removeEventListener("webglcontextrestored",Xe,!1),t.removeEventListener("webglcontextcreationerror",bt,!1),He.dispose(),xe.dispose(),ge.dispose(),J.dispose(),de.dispose(),le.dispose(),C.dispose(),L.dispose(),fe.dispose(),ie.dispose(),ie.removeEventListener("sessionstart",ko),ie.removeEventListener("sessionend",zo),Vn.stop()};function _e(E){E.preventDefault(),ll("WebGLRenderer: Context Lost."),D=!0}function Xe(){ll("WebGLRenderer: Context Restored."),D=!1;const E=W.autoReset,B=Fe.enabled,ne=Fe.autoUpdate,$=Fe.needsUpdate,K=Fe.type;Y(),W.autoReset=E,Fe.enabled=B,Fe.autoUpdate=ne,Fe.needsUpdate=$,Fe.type=K}function bt(E){nt("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function ft(E){const B=E.target;B.removeEventListener("dispose",ft),$t(B)}function $t(E){xs(E),J.remove(E)}function xs(E){const B=J.get(E).programs;B!==void 0&&(B.forEach(function(ne){fe.releaseProgram(ne)}),E.isShaderMaterial&&fe.releaseShaderCache(E))}this.renderBufferDirect=function(E,B,ne,$,K,Ee){B===null&&(B=lt);const we=K.isMesh&&K.matrixWorld.determinantAffine()<0,ye=Cu(E,B,ne,$,K);_.setMaterial($,we);let Ae=ne.index,De=1;if($.wireframe===!0){if(Ae=se.getWireframeAttribute(ne),Ae===void 0)return;De=2}const Ye=ne.drawRange,Je=ne.attributes.position;let Ce=Ye.start*De,it=(Ye.start+Ye.count)*De;Ee!==null&&(Ce=Math.max(Ce,Ee.start*De),it=Math.min(it,(Ee.start+Ee.count)*De)),Ae!==null?(Ce=Math.max(Ce,0),it=Math.min(it,Ae.count)):Je!=null&&(Ce=Math.max(Ce,0),it=Math.min(it,Je.count));const Mt=it-Ce;if(Mt<0||Mt===1/0)return;C.setup(K,$,ye,ne,Ae);let ut,at=ve;if(Ae!==null&&(ut=he.get(Ae),at=oe,at.setIndex(ut)),K.isMesh)$.wireframe===!0?(_.setLineWidth($.wireframeLinewidth*et()),at.setMode(k.LINES)):at.setMode(k.TRIANGLES);else if(K.isLine){let Pt=$.linewidth;Pt===void 0&&(Pt=1),_.setLineWidth(Pt*et()),K.isLineSegments?at.setMode(k.LINES):K.isLineLoop?at.setMode(k.LINE_LOOP):at.setMode(k.LINE_STRIP)}else K.isPoints?at.setMode(k.POINTS):K.isSprite&&at.setMode(k.TRIANGLES);if(K.isBatchedMesh)if(We.get("WEBGL_multi_draw"))at.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const Pt=K._multiDrawStarts,Te=K._multiDrawCounts,Ot=K._multiDrawCount,tt=Ae?he.get(Ae).bytesPerElement:1,Xt=J.get($).currentProgram.getUniforms();for(let rn=0;rn<Ot;rn++)Xt.setValue(k,"_gl_DrawID",rn),at.render(Pt[rn]/tt,Te[rn])}else if(K.isInstancedMesh)at.renderInstances(Ce,Mt,K.count);else if(ne.isInstancedBufferGeometry){const Pt=ne._maxInstanceCount!==void 0?ne._maxInstanceCount:1/0,Te=Math.min(ne.instanceCount,Pt);at.renderInstances(Ce,Mt,Te)}else at.render(Ce,Mt)};function Oi(E,B,ne,$){P!==null&&E.isNodeMaterial&&P.setObject($,E),ke===!0&&Ie.setState(E,ne,!1),E.transparent===!0&&E.side===cn&&E.forceSinglePass===!1?(E.side=zt,E.needsUpdate=!0,mr(E,B,$),E.side=ei,E.needsUpdate=!0,mr(E,B,$),E.side=cn):mr(E,B,$)}this.compile=function(E,B,ne=null){ne===null&&(ne=E),P!==null&&P.renderStart(E,B,ne),b=ge.get(ne),b.init(B),x.push(b),ne.traverseVisible(function(K){K.isLight&&K.layers.test(B.layers)&&(b.pushLight(K),K.castShadow&&b.pushShadow(K))}),E!==ne&&E.traverseVisible(function(K){K.isLight&&K.layers.test(B.layers)&&(b.pushLight(K),K.castShadow&&b.pushShadow(K))}),b.setupLights(),P!==null&&P.updateLights(b.state.lightsArray),Oe=this.localClippingEnabled,ke=Ie.init(this.clippingPlanes,Oe),ke===!0&&Ie.setGlobalState(this.clippingPlanes,B),P!==null&&Fe.render(b.state.shadowsArray,ne,B);const $=new Set;return E.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const Ee=K.material;if(Ee)if(Array.isArray(Ee))for(let we=0;we<Ee.length;we++){const ye=Ee[we];Oi(ye,ne,B,K),$.add(ye)}else Oi(Ee,ne,B,K),$.add(Ee)}),b=x.pop(),P!==null&&P.renderEnd(),$},this.compileAsync=function(E,B,ne=null){const $=this.compile(E,B,ne);return new Promise(K=>{function Ee(){if($.forEach(function(we){const Ae=J.get(we).currentProgram;(Ae===void 0||Ae.isReady())&&$.delete(we)}),$.size===0){K(E);return}setTimeout(Ee,10)}We.get("KHR_parallel_shader_compile")!==null?Ee():setTimeout(Ee,10)})};let Bi=null;function wu(E){Bi&&Bi(E)}function ko(){Vn.stop()}function zo(){Vn.start()}const Vn=new au;Vn.setAnimationLoop(wu),typeof self<"u"&&Vn.setContext(self),this.setAnimationLoop=function(E){Bi=E,ie.setAnimationLoop(E),E===null?Vn.stop():Vn.start()},ie.addEventListener("sessionstart",ko),ie.addEventListener("sessionend",zo),this.render=function(E,B){if(B!==void 0&&B.isCamera!==!0){nt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;P!==null&&P.renderStart(E,B);const ne=ie.enabled===!0&&ie.isPresenting===!0,$=M!==null&&(U===null||ne)&&M.begin(R,U);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),ie.enabled===!0&&ie.isPresenting===!0&&(M===null||M.isCompositing()===!1)&&(ie.cameraAutoUpdate===!0&&ie.updateCamera(B),B=ie.getCamera()),E.isScene===!0&&E.onBeforeRender(R,E,B,U),b=ge.get(E,x.length),b.init(B),b.state.textureUnits=re.getTextureUnits(),x.push(b),ze.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Ue.setFromProjectionMatrix(ze,dn,B.reversedDepth),Oe=this.localClippingEnabled,ke=Ie.init(this.clippingPlanes,Oe),T=xe.get(E,I.length),T.init(),I.push(T),ie.enabled===!0&&ie.isPresenting===!0){const we=R.xr.getDepthSensingMesh();we!==null&&Ss(we,B,-1/0,R.sortObjects)}Ss(E,B,0,R.sortObjects),T.finish(),P!==null&&P.updateLights(b.state.lightsArray),R.sortObjects===!0&&T.sort(ae,be),Ke=ie.enabled===!1||ie.isPresenting===!1||ie.hasDepthSensing()===!1,Ke&&He.addToRenderList(T,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ke===!0&&Ie.beginShadows();const K=b.state.shadowsArray;if(Fe.render(K,E,B),ke===!0&&Ie.endShadows(),($&&M.hasRenderPass())===!1){const we=T.opaque,ye=T.transmissive;if(b.setupLights(),B.isArrayCamera){const Ae=B.cameras;if(ye.length>0)for(let De=0,Ye=Ae.length;De<Ye;De++){const Je=Ae[De];Vo(we,ye,E,Je)}Ke&&He.render(E);for(let De=0,Ye=Ae.length;De<Ye;De++){const Je=Ae[De];Ho(T,E,Je,Je.viewport)}}else ye.length>0&&Vo(we,ye,E,B),Ke&&He.render(E),Ho(T,E,B)}U!==null&&G===0&&(re.updateMultisampleRenderTarget(U),re.updateRenderTargetMipmap(U)),$&&M.end(R),E.isScene===!0&&E.onAfterRender(R,E,B),C.resetDefaultState(),V=-1,ee=null,x.pop(),x.length>0?(b=x[x.length-1],re.setTextureUnits(b.state.textureUnits),ke===!0&&Ie.setGlobalState(R.clippingPlanes,b.state.camera)):b=null,I.pop(),I.length>0?T=I[I.length-1]:T=null,P!==null&&P.renderEnd()};function Ss(E,B,ne,$){if(E.visible===!1)return;if(E.layers.test(B.layers)){if(E.isGroup)ne=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(B);else if(E.isLightProbeGrid)b.pushLightProbeGrid(E);else if(E.isLight)b.pushLight(E),E.castShadow&&b.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||E.intersectsFrustum(Ue)){$&&pt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ze);const we=le.update(E),ye=E.material;ye.visible&&T.push(E,we,ye,ne,pt.z,null,B)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||E.intersectsFrustum(Ue))){const we=le.update(E),ye=E.material;if($&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),pt.copy(E.boundingSphere.center)):(we.boundingSphere===null&&we.computeBoundingSphere(),pt.copy(we.boundingSphere.center)),pt.applyMatrix4(E.matrixWorld).applyMatrix4(ze)),Array.isArray(ye)){const Ae=we.groups;for(let De=0,Ye=Ae.length;De<Ye;De++){const Je=Ae[De],Ce=ye[Je.materialIndex];Ce&&Ce.visible&&T.push(E,we,Ce,ne,pt.z,Je,B)}}else ye.visible&&T.push(E,we,ye,ne,pt.z,null,B)}}const Ee=E.children;for(let we=0,ye=Ee.length;we<ye;we++)Ss(Ee[we],B,ne,$)}function Ho(E,B,ne,$){const{opaque:K,transmissive:Ee,transparent:we}=E;b.setupLightsView(ne),ke===!0&&Ie.setGlobalState(R.clippingPlanes,ne),$&&_.viewport(te.copy($)),K.length>0&&pr(K,B,ne),Ee.length>0&&pr(Ee,B,ne),we.length>0&&pr(we,B,ne),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Vo(E,B,ne,$){if((ne.isScene===!0?ne.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[$.id]===void 0){const Ce=We.has("EXT_color_buffer_half_float")||We.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[$.id]=new nn(1,1,{generateMipmaps:!0,type:Ce?hn:Yt,minFilter:Kn,samples:Math.max(4,A.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:je.workingColorSpace})}const Ee=b.state.transmissionRenderTarget[$.id],we=$.viewport||te;Ee.setSize(we.z*R.transmissionResolutionScale,we.w*R.transmissionResolutionScale);const ye=R.getRenderTarget(),Ae=R.getActiveCubeFace(),De=R.getActiveMipmapLevel();R.setRenderTarget(Ee),R.getClearColor(Le),Se=R.getClearAlpha(),Se<1&&R.setClearColor(16777215,.5),R.clear(),Ke&&He.render(ne);const Ye=R.toneMapping;R.toneMapping=tn;const Je=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),b.setupLightsView($),ke===!0&&Ie.setGlobalState(R.clippingPlanes,$),pr(E,ne,$),re.updateMultisampleRenderTarget(Ee),re.updateRenderTargetMipmap(Ee),We.has("WEBGL_multisampled_render_to_texture")===!1){let Ce=!1;for(let it=0,Mt=B.length;it<Mt;it++){const ut=B[it],{object:at,geometry:Pt,material:Te,group:Ot}=ut;if(Te.side===cn&&at.layers.test($.layers)){const tt=Te.side;Te.side=zt,Te.needsUpdate=!0,Go(at,ne,$,Pt,Te,Ot),Te.side=tt,Te.needsUpdate=!0,Ce=!0}}Ce===!0&&(re.updateMultisampleRenderTarget(Ee),re.updateRenderTargetMipmap(Ee))}R.setRenderTarget(ye,Ae,De),R.setClearColor(Le,Se),Je!==void 0&&($.viewport=Je),R.toneMapping=Ye}function pr(E,B,ne){const $=B.isScene===!0?B.overrideMaterial:null;for(let K=0,Ee=E.length;K<Ee;K++){const we=E[K],{object:ye,geometry:Ae,group:De}=we;let Ye=we.material;Ye.allowOverride===!0&&$!==null&&(Ye=$),ye.layers.test(ne.layers)&&Go(ye,B,ne,Ae,Ye,De)}}function Go(E,B,ne,$,K,Ee){P!==null&&K.isNodeMaterial&&P.setObject(E,K),E.onBeforeRender(R,B,ne,$,K,Ee),E.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),K.onBeforeRender(R,B,ne,$,E,Ee),K.transparent===!0&&K.side===cn&&K.forceSinglePass===!1?(K.side=zt,K.needsUpdate=!0,R.renderBufferDirect(ne,B,$,K,E,Ee),K.side=ei,K.needsUpdate=!0,R.renderBufferDirect(ne,B,$,K,E,Ee),K.side=cn):R.renderBufferDirect(ne,B,$,K,E,Ee),E.onAfterRender(R,B,ne,$,K,Ee)}function mr(E,B,ne){B.isScene!==!0&&(B=lt);const $=J.get(E),K=b.state.lights,Ee=b.state.shadowsArray,we=K.state.version,ye=fe.getParameters(E,K.state,Ee,B,ne,b.state.lightProbeGridArray),Ae=fe.getProgramCacheKey(ye);let De=$.programs;$.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?B.environment:null,$.fog=B.fog;const Ye=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;$.envMap=de.get(E.envMap||$.environment,Ye),$.envMapRotation=$.environment!==null&&E.envMap===null?B.environmentRotation:E.envMapRotation,De===void 0&&(E.addEventListener("dispose",ft),De=new Map,$.programs=De);let Je=De.get(Ae);if(Je!==void 0){if($.currentProgram===Je&&$.lightsStateVersion===we)return Xo(E,ye),Je}else ye.uniforms=fe.getUniforms(E),P!==null&&E.isNodeMaterial&&P.build(E,ne,ye),E.onBeforeCompile(ye,R),Je=fe.acquireProgram(ye,Ae),De.set(Ae,Je),$.uniforms=ye.uniforms;const Ce=$.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ce.clippingPlanes=Ie.uniform),Xo(E,ye),$.needsLights=Lu(E),$.lightsStateVersion=we,$.needsLights&&(Ce.ambientLightColor.value=K.state.ambient,Ce.lightProbe.value=K.state.probe,Ce.sunLights.value=K.state.sun,Ce.sunLightShadows.value=K.state.sunShadow,Ce.directionalLights.value=K.state.directional,Ce.directionalLightShadows.value=K.state.directionalShadow,Ce.spotLights.value=K.state.spot,Ce.spotLightShadows.value=K.state.spotShadow,Ce.rectAreaLights.value=K.state.rectArea,Ce.ltc_1.value=K.state.rectAreaLTC1,Ce.ltc_2.value=K.state.rectAreaLTC2,Ce.pointLights.value=K.state.point,Ce.pointLightShadows.value=K.state.pointShadow,Ce.hemisphereLights.value=K.state.hemi,Ce.sunShadowMatrix.value=K.state.sunShadowMatrix,Ce.sunShadowCascade.value=K.state.sunShadowCascade,Ce.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Ce.spotLightMatrix.value=K.state.spotLightMatrix,Ce.spotLightMap.value=K.state.spotLightMap,Ce.pointShadowMatrix.value=K.state.pointShadowMatrix),$.lightProbeGrid=b.state.lightProbeGridArray.length>0,$.currentProgram=Je,$.uniformsList=null,Je}function Wo(E){if(E.uniformsList===null){const B=E.currentProgram.getUniforms();E.uniformsList=jr.seqWithValue(B.seq,E.uniforms)}return E.uniformsList}function Xo(E,B){const ne=J.get(E);ne.outputColorSpace=B.outputColorSpace,ne.batching=B.batching,ne.batchingColor=B.batchingColor,ne.instancing=B.instancing,ne.instancingColor=B.instancingColor,ne.instancingMorph=B.instancingMorph,ne.skinning=B.skinning,ne.morphTargets=B.morphTargets,ne.morphNormals=B.morphNormals,ne.morphColors=B.morphColors,ne.morphTargetsCount=B.morphTargetsCount,ne.numClippingPlanes=B.numClippingPlanes,ne.numIntersection=B.numClipIntersection,ne.vertexAlphas=B.vertexAlphas,ne.vertexTangents=B.vertexTangents,ne.toneMapping=B.toneMapping}function Au(E,B){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;S.setFromMatrixPosition(B.matrixWorld);for(let ne=0,$=E.length;ne<$;ne++){const K=E[ne];if(K.texture!==null&&K.boundingBox.containsPoint(S))return K}return null}function Cu(E,B,ne,$,K){B.isScene!==!0&&(B=lt),re.resetTextureUnits();const Ee=B.fog,we=$.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial?B.environment:null,ye=U===null?R.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:je.workingColorSpace,Ae=$.isMeshStandardMaterial||$.isMeshLambertMaterial&&!$.envMap||$.isMeshPhongMaterial&&!$.envMap,De=de.get($.envMap||we,Ae),Ye=$.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,Je=!!ne.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Ce=!!ne.morphAttributes.position,it=!!ne.morphAttributes.normal,Mt=!!ne.morphAttributes.color;let ut=tn;$.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(ut=R.toneMapping);const at=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,Pt=at!==void 0?at.length:0,Te=J.get($),Ot=b.state.lights;if(ke===!0&&(Oe===!0||E!==ee)){const ct=E===ee&&$.id===V;Ie.setState($,E,ct)}let tt=!1;$.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==Ot.state.version||Te.outputColorSpace!==ye||K.isBatchedMesh&&Te.batching===!1||!K.isBatchedMesh&&Te.batching===!0||K.isBatchedMesh&&Te.batchingColor===!0&&K._colorsTexture===null||K.isBatchedMesh&&Te.batchingColor===!1&&K._colorsTexture!==null||K.isInstancedMesh&&Te.instancing===!1||!K.isInstancedMesh&&Te.instancing===!0||K.isSkinnedMesh&&Te.skinning===!1||!K.isSkinnedMesh&&Te.skinning===!0||K.isInstancedMesh&&Te.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Te.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Te.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Te.instancingMorph===!1&&K.morphTexture!==null||Te.envMap!==De||$.fog===!0&&Te.fog!==Ee||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==Ie.numPlanes||Te.numIntersection!==Ie.numIntersection)||Te.vertexAlphas!==Ye||Te.vertexTangents!==Je||Te.morphTargets!==Ce||Te.morphNormals!==it||Te.morphColors!==Mt||Te.toneMapping!==ut||Te.morphTargetsCount!==Pt||!!Te.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(tt=!0):(tt=!0,Te.__version=$.version);let Xt=Te.currentProgram;tt===!0&&(Xt=mr($,B,K),P&&$.isNodeMaterial&&P.onUpdateProgram($,Xt,Te));let rn=!1,Rn=!1,ai=!1;const st=Xt.getUniforms(),vt=Te.uniforms;if(_.useProgram(Xt.program)&&(rn=!0,Rn=!0,ai=!0),$.id!==V&&(V=$.id,Rn=!0),Te.needsLights){const ct=Au(b.state.lightProbeGridArray,K);Te.lightProbeGrid!==ct&&(Te.lightProbeGrid=ct,Rn=!0)}if(rn||ee!==E){_.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),st.setValue(k,"projectionMatrix",E.projectionMatrix),st.setValue(k,"viewMatrix",E.matrixWorldInverse);const Pn=st.map.cameraPosition;Pn!==void 0&&Pn.setValue(k,Ge.setFromMatrixPosition(E.matrixWorld)),A.logarithmicDepthBuffer&&st.setValue(k,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&st.setValue(k,"isOrthographic",E.isOrthographicCamera===!0),ee!==E&&(ee=E,Rn=!0,ai=!0)}if(Te.needsLights&&(Ot.state.sunShadowMap.length>0&&st.setValue(k,"sunShadowMap",Ot.state.sunShadowMap,re),Ot.state.directionalShadowMap.length>0&&st.setValue(k,"directionalShadowMap",Ot.state.directionalShadowMap,re),Ot.state.spotShadowMap.length>0&&st.setValue(k,"spotShadowMap",Ot.state.spotShadowMap,re),Ot.state.pointShadowMap.length>0&&st.setValue(k,"pointShadowMap",Ot.state.pointShadowMap,re)),K.isSkinnedMesh){st.setOptional(k,K,"bindMatrix"),st.setOptional(k,K,"bindMatrixInverse");const ct=K.skeleton;ct&&(ct.boneTexture===null&&ct.computeBoneTexture(),st.setValue(k,"boneTexture",ct.boneTexture,re))}K.isBatchedMesh&&(st.setOptional(k,K,"batchingTexture"),st.setValue(k,"batchingTexture",K._matricesTexture,re),st.setOptional(k,K,"batchingIdTexture"),st.setValue(k,"batchingIdTexture",K._indirectTexture,re),st.setOptional(k,K,"batchingColorTexture"),K._colorsTexture!==null&&st.setValue(k,"batchingColorTexture",K._colorsTexture,re));const Ln=ne.morphAttributes;if((Ln.position!==void 0||Ln.normal!==void 0||Ln.color!==void 0)&&z.update(K,ne,Xt),(Rn||Te.receiveShadow!==K.receiveShadow)&&(Te.receiveShadow=K.receiveShadow,st.setValue(k,"receiveShadow",K.receiveShadow)),($.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial)&&$.envMap===null&&B.environment!==null&&(vt.envMapIntensity.value=B.environmentIntensity),vt.dfgLUT!==void 0&&(vt.dfgLUT.value=K0()),Rn){if(st.setValue(k,"toneMappingExposure",R.toneMappingExposure),Te.needsLights&&Ru(vt,ai),Ee&&$.fog===!0&&Pe.refreshFogUniforms(vt,Ee),Pe.refreshMaterialUniforms(vt,$,q,O,b.state.transmissionRenderTarget[E.id]),Te.needsLights&&Te.lightProbeGrid){const ct=Te.lightProbeGrid;vt.probesSH.value=ct.texture,vt.probesMin.value.copy(ct.boundingBox.min),vt.probesMax.value.copy(ct.boundingBox.max),vt.probesResolution.value.copy(ct.resolution)}jr.upload(k,Wo(Te),vt,re)}if($.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(jr.upload(k,Wo(Te),vt,re),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&st.setValue(k,"center",K.center),st.setValue(k,"modelViewMatrix",K.modelViewMatrix),st.setValue(k,"normalMatrix",K.normalMatrix),st.setValue(k,"modelMatrix",K.matrixWorld),$.uniformsGroups!==void 0){const ct=$.uniformsGroups;for(let Pn=0,oi=ct.length;Pn<oi;Pn++){const Yo=ct[Pn];L.update(Yo,Xt),L.bind(Yo,Xt)}}return Xt}function Ru(E,B){E.ambientLightColor.needsUpdate=B,E.lightProbe.needsUpdate=B,E.sunLights.needsUpdate=B,E.sunLightShadows.needsUpdate=B,E.directionalLights.needsUpdate=B,E.directionalLightShadows.needsUpdate=B,E.pointLights.needsUpdate=B,E.pointLightShadows.needsUpdate=B,E.spotLights.needsUpdate=B,E.spotLightShadows.needsUpdate=B,E.rectAreaLights.needsUpdate=B,E.hemisphereLights.needsUpdate=B}function Lu(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return Q},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(E,B,ne){const $=J.get(E);$.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),J.get(E.texture).__webglTexture=B,J.get(E.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:ne,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,B){const ne=J.get(E);ne.__webglFramebuffer=B,ne.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(E,B=0,ne=0){U=E,Q=B,G=ne;let $=null,K=!1,Ee=!1;if(E){const ye=J.get(E);if(ye.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(k.FRAMEBUFFER,ye.__webglFramebuffer),te.copy(E.viewport),Z.copy(E.scissor),ue=E.scissorTest,_.viewport(te),_.scissor(Z),_.setScissorTest(ue),V=-1;return}else if(ye.__webglFramebuffer===void 0)re.setupRenderTarget(E);else if(ye.__hasExternalTextures)re.rebindTextures(E,J.get(E.texture).__webglTexture,J.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Ye=E.depthTexture;if(ye.__boundDepthTexture!==Ye){if(Ye!==null&&J.has(Ye)&&(E.width!==Ye.image.width||E.height!==Ye.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");re.setupDepthRenderbuffer(E)}}const Ae=E.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(Ee=!0);const De=J.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(De[B])?$=De[B][ne]:$=De[B],K=!0):E.samples>0&&re.useMultisampledRTT(E)===!1?$=J.get(E).__webglMultisampledFramebuffer:Array.isArray(De)?$=De[ne]:$=De,te.copy(E.viewport),Z.copy(E.scissor),ue=E.scissorTest}else te.copy(j).multiplyScalar(q).floor(),Z.copy(ce).multiplyScalar(q).floor(),ue=Re;if(ne!==0&&($=F),_.bindFramebuffer(k.FRAMEBUFFER,$)&&_.drawBuffers(E,$),_.viewport(te),_.scissor(Z),_.setScissorTest(ue),K){const ye=J.get(E.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+B,ye.__webglTexture,ne)}else if(Ee){const ye=B;for(let Ae=0;Ae<E.textures.length;Ae++){const De=J.get(E.textures[Ae]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+Ae,De.__webglTexture,ne,ye)}}else if(E!==null&&ne!==0){const ye=J.get(E.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,ye.__webglTexture,ne)}V=-1};function qo(E){const B=J.get(E);return(B.__readFormat!==E.format||B.__readType!==E.type)&&(B.__readFormat=E.format,B.__readType=E.type,B.__formatReadable=A.textureFormatReadable(E.format),B.__typeReadable=A.textureTypeReadable(E.type)),B}this.readRenderTargetPixels=function(E,B,ne,$,K,Ee,we,ye=0){if(!(E&&E.isWebGLRenderTarget)){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=J.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&we!==void 0&&(Ae=Ae[we]),Ae){_.bindFramebuffer(k.FRAMEBUFFER,Ae);try{const De=E.textures[ye],Ye=De.format,Je=De.type;E.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+ye);const Ce=qo(De);if(Ce.__formatReadable===!1){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ce.__typeReadable===!1){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=E.width-$&&ne>=0&&ne<=E.height-K&&k.readPixels(B,ne,$,K,pe.convert(Ye),pe.convert(Je),Ee)}finally{const De=U!==null?J.get(U).__webglFramebuffer:null;_.bindFramebuffer(k.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(E,B,ne,$,K,Ee,we,ye=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=J.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&we!==void 0&&(Ae=Ae[we]),Ae)if(B>=0&&B<=E.width-$&&ne>=0&&ne<=E.height-K){_.bindFramebuffer(k.FRAMEBUFFER,Ae);const De=E.textures[ye],Ye=De.format,Je=De.type;E.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+ye);const Ce=qo(De);if(Ce.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ce.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const it=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,it),k.bufferData(k.PIXEL_PACK_BUFFER,Ee.byteLength,k.STREAM_READ),k.readPixels(B,ne,$,K,pe.convert(Ye),pe.convert(Je),0),k.bindBuffer(k.PIXEL_PACK_BUFFER,null);const Mt=U!==null?J.get(U).__webglFramebuffer:null;_.bindFramebuffer(k.FRAMEBUFFER,Mt);const ut=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await Fd(k,ut,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,it),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,Ee),k.bindBuffer(k.PIXEL_PACK_BUFFER,null),k.deleteBuffer(it),k.deleteSync(ut),Ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,B=null,ne=0){const $=Math.pow(2,-ne),K=Math.floor(E.image.width*$),Ee=Math.floor(E.image.height*$),we=B!==null?B.x:0,ye=B!==null?B.y:0;re.setTexture2D(E,0),k.copyTexSubImage2D(k.TEXTURE_2D,ne,0,0,we,ye,K,Ee),_.unbindTexture()},this.copyTextureToTexture=function(E,B,ne=null,$=null,K=0,Ee=0){let we,ye,Ae,De,Ye,Je,Ce,it,Mt;const ut=E.isCompressedTexture?E.mipmaps[Ee]:E.image;if(ne!==null)we=ne.max.x-ne.min.x,ye=ne.max.y-ne.min.y,Ae=ne.isBox3?ne.max.z-ne.min.z:1,De=ne.min.x,Ye=ne.min.y,Je=ne.isBox3?ne.min.z:0;else{const vt=Math.pow(2,-K);we=Math.floor(ut.width*vt),ye=Math.floor(ut.height*vt),E.isDataArrayTexture?Ae=ut.depth:E.isData3DTexture?Ae=Math.floor(ut.depth*vt):Ae=1,De=0,Ye=0,Je=0}$!==null?(Ce=$.x,it=$.y,Mt=$.z):(Ce=0,it=0,Mt=0);const at=pe.convert(B.format),Pt=pe.convert(B.type);let Te;B.isData3DTexture?(re.setTexture3D(B,0),Te=k.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(re.setTexture2DArray(B,0),Te=k.TEXTURE_2D_ARRAY):(re.setTexture2D(B,0),Te=k.TEXTURE_2D),_.activeTexture(k.TEXTURE0),_.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,B.flipY),_.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),_.pixelStorei(k.UNPACK_ALIGNMENT,B.unpackAlignment);const Ot=_.getParameter(k.UNPACK_ROW_LENGTH),tt=_.getParameter(k.UNPACK_IMAGE_HEIGHT),Xt=_.getParameter(k.UNPACK_SKIP_PIXELS),rn=_.getParameter(k.UNPACK_SKIP_ROWS),Rn=_.getParameter(k.UNPACK_SKIP_IMAGES);_.pixelStorei(k.UNPACK_ROW_LENGTH,ut.width),_.pixelStorei(k.UNPACK_IMAGE_HEIGHT,ut.height),_.pixelStorei(k.UNPACK_SKIP_PIXELS,De),_.pixelStorei(k.UNPACK_SKIP_ROWS,Ye),_.pixelStorei(k.UNPACK_SKIP_IMAGES,Je);const ai=E.isDataArrayTexture||E.isData3DTexture,st=B.isDataArrayTexture||B.isData3DTexture;if(E.isDepthTexture){const vt=J.get(E),Ln=J.get(B),ct=J.get(vt.__renderTarget),Pn=J.get(Ln.__renderTarget);_.bindFramebuffer(k.READ_FRAMEBUFFER,ct.__webglFramebuffer),_.bindFramebuffer(k.DRAW_FRAMEBUFFER,Pn.__webglFramebuffer);for(let oi=0;oi<Ae;oi++)ai&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,J.get(E).__webglTexture,K,Je+oi),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,J.get(B).__webglTexture,Ee,Mt+oi)),k.blitFramebuffer(De,Ye,we,ye,Ce,it,we,ye,k.DEPTH_BUFFER_BIT,k.NEAREST);_.bindFramebuffer(k.READ_FRAMEBUFFER,null),_.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(K!==0||E.isRenderTargetTexture||J.has(E)){const vt=J.get(E),Ln=J.get(B);_.bindFramebuffer(k.READ_FRAMEBUFFER,N),_.bindFramebuffer(k.DRAW_FRAMEBUFFER,H);for(let ct=0;ct<Ae;ct++)ai?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,vt.__webglTexture,K,Je+ct):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,vt.__webglTexture,K),st?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ln.__webglTexture,Ee,Mt+ct):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Ln.__webglTexture,Ee),K!==0?k.blitFramebuffer(De,Ye,we,ye,Ce,it,we,ye,k.COLOR_BUFFER_BIT,k.NEAREST):st?k.copyTexSubImage3D(Te,Ee,Ce,it,Mt+ct,De,Ye,we,ye):k.copyTexSubImage2D(Te,Ee,Ce,it,De,Ye,we,ye);_.bindFramebuffer(k.READ_FRAMEBUFFER,null),_.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else st?E.isDataTexture||E.isData3DTexture?k.texSubImage3D(Te,Ee,Ce,it,Mt,we,ye,Ae,at,Pt,ut.data):B.isCompressedArrayTexture?k.compressedTexSubImage3D(Te,Ee,Ce,it,Mt,we,ye,Ae,at,ut.data):k.texSubImage3D(Te,Ee,Ce,it,Mt,we,ye,Ae,at,Pt,ut):E.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,Ee,Ce,it,we,ye,at,Pt,ut.data):E.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,Ee,Ce,it,ut.width,ut.height,at,ut.data):k.texSubImage2D(k.TEXTURE_2D,Ee,Ce,it,we,ye,at,Pt,ut);_.pixelStorei(k.UNPACK_ROW_LENGTH,Ot),_.pixelStorei(k.UNPACK_IMAGE_HEIGHT,tt),_.pixelStorei(k.UNPACK_SKIP_PIXELS,Xt),_.pixelStorei(k.UNPACK_SKIP_ROWS,rn),_.pixelStorei(k.UNPACK_SKIP_IMAGES,Rn),Ee===0&&B.generateMipmaps&&k.generateMipmap(Te),_.unbindTexture()},this.initRenderTarget=function(E){J.get(E).__webglFramebuffer===void 0&&re.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?re.setTextureCube(E,0):E.isData3DTexture?re.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?re.setTexture2DArray(E,0):re.setTexture2D(E,0),_.unbindTexture()},this.resetState=function(){Q=0,G=0,U=null,_.reset(),C.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=je._getDrawingBufferColorSpace(e),t.unpackColorSpace=je._getUnpackColorSpace()}}function vs(n,e){const t=[[0,n],[n,0],[0,-n],[-n,0]];if(e<=0)return t.map(([s,a])=>[s,a,0]);const i=Math.min(.24,Math.max(0,e/n)),r=[];for(let s=0;s<4;s++){const a=t[s],o=t[(s+3)%4],l=t[(s+1)%4],c=a.map((h,f)=>h+(o[f]-h)*i),u=a.map((h,f)=>h+(l[f]-h)*i);for(let h=0;h<=8;h++){const f=h/8,d=1-f;r.push([d*d*c[0]+2*d*f*a[0]+f*f*u[0],d*d*c[1]+2*d*f*a[1]+f*f*u[1],0])}}return r}function pu(n,e=50,t=38){const i=co[n],r=i.u-i.v,s=i.u+i.v,a=Math.hypot(r,s)||1,o={x:r/a,y:s/a},l={x:-o.y,y:o.x},c={x:o.x*e/2,y:o.y*e/2},u={x:-o.x*e*.08,y:-o.y*e*.08},h={x:-o.x*e/2,y:-o.y*e/2},f=[c,{x:u.x+l.x*t/2,y:u.y+l.y*t/2},{x:u.x+l.x*t*.22,y:u.y+l.y*t*.22},{x:h.x+l.x*t*.22,y:h.y+l.y*t*.22},{x:h.x-l.x*t*.22,y:h.y-l.y*t*.22},{x:u.x-l.x*t*.22,y:u.y-l.y*t*.22},{x:u.x-l.x*t/2,y:u.y-l.y*t/2}];return gu(f,3.5)}function mu(n,e=40,t=11){const i=co[n],r=i.u-i.v,s=i.u+i.v,a=Math.hypot(r,s)||1,o={x:r/a,y:s/a},l={x:-o.y,y:o.x},c=t/2,u=[[e*.38,0],[-e*.12,e*.48],[-e*.12-c*1.4,e*.48-c*1.4],[e*.38-c*2.8,0],[-e*.12-c*1.4,-e*.48+c*1.4],[-e*.12,-e*.48]];return gu(u.map(([h,f])=>({x:o.x*h+l.x*f,y:o.y*h+l.y*f})),4)}function gu(n,e){const t=new Qc;n.forEach((r,s)=>{const a=n[(s+n.length-1)%n.length],o=n[(s+1)%n.length],l=h=>{const f=Math.hypot(h.x-r.x,h.y-r.y),d=Math.min(.45,e/f);return{x:r.x+(h.x-r.x)*d,y:r.y+(h.y-r.y)*d}},c=l(a),u=l(o);s===0?t.moveTo(c.x,c.y):t.lineTo(c.x,c.y),t.quadraticCurveTo(r.x,r.y,u.x,u.y)}),t.closePath();const i=new Ro(t,8).toNonIndexed();return i.computeBoundingSphere(),i}function J0(n,e){const t=[...n.cells].filter(r=>r.kind!=="blocked").sort(ns).map(r=>({kind:"floor",cell:r})),i=[...e].sort((r,s)=>+!!r.collecting-+!!s.collecting||ns(r,s));return[...t,...i.map(r=>({kind:"stack",stack:r,firstLayer:0,endLayer:Math.ceil(r.height)}))]}function la(n,e){return{rise:e+(n.lift??0)+(n.layerOffsets?.[e]??0),scale:n.layerScales?.[e]??1}}const vu=420,_u=n=>Math.min(32,240/Math.max(1,n-1));function sc(n){return Math.max(0,n-1)*_u(n)+vu}function ac(n,e){const t=[],i=[],r=_u(n);for(let s=0;s<n;s++){const a=(e-s*r)/vu,o=a>0&&a<1?Math.sin(a*Math.PI*3)*(1-a)**2:0;t.push(o*.3),i.push(1+o*.22)}return{layerOffsets:t,layerScales:i}}function Q0(n,e){if(e)return{offset:0,intensity:1};const t=(n%.9+.9)%.9/.9,i=Math.cos(t*Math.PI*2);return{offset:-7*i,intensity:(1-i)/2}}function _s(n,e,t){const i=new Ht;return i.setAttribute("position",new Et(n.flatMap(r=>[r[0],r[1],0]),3)),i.setAttribute("color",new Et(n.flatMap(r=>{const s=e(r);return t?[s.r,s.g,s.b,t(r)]:[s.r,s.g,s.b]}),t?4:3)),i.computeBoundingSphere(),i}function Io(n){const e=[];for(let t=1;t<n.length;t++){const i=n[t-1],r=n[t];for(let s=0;s<i.length;s++){const a=(s+1)%i.length;e.push(i[s],i[a],r[a],i[s],r[a],r[s])}}return e}function xu(n,e,t){const i=new qe(t?"#ffc729":"#f2ebdf"),r=new qe(t?"#ffe878":"#fffdf7"),s=Math.exp(-((n-.28)**2+(e-.3)**2)*1.3);return i.lerp(r,.25+.65*s)}function no(n,e,t=!1){const i=[0,.2,.4,.6,.8,1].map(r=>vs(n,e).map(s=>[s[0]*r,s[1]*r,r]));return _s(Io(i),r=>xu(r[0]/n,r[1]/n,t))}function io(n,e,t,i=!1){const r=[0,.2,.4,.6,.8,1].map(o=>vs(n-e*o,t*(n-e*o)/n).map(l=>[l[0],l[1],o])),s=new qe(i?"#dca02a":"#c2c1ba"),a=new qe(i?"#fff19c":"#fffef9");return _s(Io(r),o=>{const l=Math.max(0,Math.min(1,.65+(o[1]+o[0]*.65)/(n*2))),c=o[2];return s.clone().lerp(a,.2+l*.6).lerp(xu(o[0]/(n-e),o[1]/(n-e),i),c*c*(3-2*c))})}function ro(n,e,t,i=!1){const r=[0,.12,.5,.85,1].map(l=>vs(n-(l>.85?(l-.85)*10:0),t).map(c=>[c[0],c[1]-e*l,l])),s=[];for(let l=1;l<r.length;l++){const c=r[l-1],u=r[l];for(let h=0;h<c.length;h++){const f=(h+1)%c.length;c[f][0]>=c[h][0]||s.push(c[h],c[f],u[f],c[h],u[f],u[h])}}const a=new qe(i?"#b78224":"#a6acb4"),o=new qe(i?"#f6c440":"#eee9df");return _s(s,l=>{const c=.7+l[0]/n*.18,u=.6+.25*Math.sin(l[2]*Math.PI)-.4*l[2];return a.clone().lerp(o,Math.max(0,Math.min(1,c*u)))})}function j0(n,e){const t=[0,.65,.85,1,1.1].map(i=>vs(n,e).map(r=>[r[0]*i,r[1]*i,i]));return _s(Io(t),()=>new qe("#716c60"),i=>Math.max(0,1-i[2]/1.1)**1.4)}const es=uo.length;function ev(n,e){return((n+e*5)%es+es)%es}function tv(n,e){const{rect:t,solid:i}=uo[n],r=e*2/(i[2]-i[0]),s=(e*2+ho)/(i[3]-i[1]),a=-e-i[0]*r,o=a+r,l=e+i[1]*s,c=l-s,[u,h,f,d]=t,p=u/Jo,v=f/Jo,m=1-d/Qo,g=1-h/Qo,y=new Ht;return y.setAttribute("position",new Et([a,l,0,o,l,0,o,c,0,a,l,0,o,c,0,a,c,0],3)),y.setAttribute("uv",new Et([p,g,v,g,v,m,p,g,v,m,p,m],2)),y.computeBoundingSphere(),y}function nv(n){const e=[ro(n,fo,12),io(n,4,12),no(n-4,11)],t=[],i=[],r=new qe("#64778b"),s=new qe("#c7cdd0");for(const o of e){const l=o.getAttribute("position"),c=o.getAttribute("color");for(let u=0;u<l.count;u++){t.push(l.getX(u),l.getY(u),l.getZ(u));const h=r.clone().lerp(s,Math.min(1,(c.getX(u)+c.getY(u)+c.getZ(u))/3));i.push(h.r,h.g,h.b)}o.dispose()}const a=new Ht;return a.setAttribute("position",new Et(t,3)),a.setAttribute("color",new Et(i,3)),a.computeBoundingSphere(),a}const cs={tiles:[2048,512],markers:[1024,512]},Su={white:{rect:[16,49,496,462],solid:[.024635036496350366,.028631519414644493,.9753649635036497,.9724112334529259]},yellow:{rect:[528,55,1008,457],solid:[.024280575539568344,.02899173198754429,.9757194244604316,.9717599055084291]},"white-shadow":{rect:[1040,131,1520,380],solid:[.024104234527687295,.04646599427024057,.9758957654723126,.9519249636984419]},"yellow-shadow":{rect:[1552,136,2032,376],solid:[.024025974025974024,.04805194805194805,.9759740259740259,.9532467532467532]},"orange-up":{rect:[8,69,120,186],solid:[.024915062287655717,.0238503160360465,.9750849377123442,.9756947469291749]},"orange-up-right":{rect:[136,74,248,182],solid:[.024020227560050567,.024909865617830217,.9759797724399494,.9780399868895444]},"orange-right":{rect:[264,86,376,170],solid:[.024177949709864605,.032237266279819474,.9758220502901355,.9722759509993553]},"orange-down-right":{rect:[392,74,504,182],solid:[.02408256880733945,.024974515800203875,.9759174311926605,.9704383282364935]},"orange-down":{rect:[520,70,632,185],solid:[.025246981339187707,.02458836443468716,.9747530186608123,.97818928077125]},"orange-down-left":{rect:[648,76,760,180],solid:[.024364406779661018,.026238591916558023,.975635593220339,.973109517601043]},"orange-left":{rect:[776,85,888,171],solid:[.024557956777996073,.03198245533878558,.9754420432220039,.9697080458719788]},"orange-up-left":{rect:[904,74,1016,182],solid:[.02378255945639864,.02466339499182081,.9762174405436014,.9724424311060778]},"white-up":{rect:[8,347,120,421],solid:[.02586206896551724,.0391425908667288,.9741379310344829,.9589934762348556]},"white-up-right":{rect:[136,334,248,434],solid:[.027624309392265196,.030939226519337018,.9723756906077348,.9714917127071823]},"white-right":{rect:[264,317,376,450],solid:[.02958579881656805,.024914356898162567,.9704142011834321,.9766427904079727]},"white-down-right":{rect:[392,334,504,434],solid:[.027624309392265196,.030939226519337018,.9723756906077348,.965303867403315]},"white-down":{rect:[520,347,632,421],solid:[.02586206896551724,.0391425908667288,.9741379310344829,.9589934762348556]},"white-down-left":{rect:[648,334,760,434],solid:[.027624309392265196,.030939226519337018,.9723756906077348,.965303867403315]},"white-left":{rect:[776,317,888,450],solid:[.02958579881656805,.024914356898162567,.9704142011834321,.9766427904079727]},"white-up-left":{rect:[904,334,1016,434],solid:[.027624309392265196,.030939226519337018,.9723756906077348,.9714917127071823]}},iv={SE:"up-right",SW:"up-left",NW:"down-left",NE:"down-right",E:"right",W:"left",N:"down",S:"up"},Mu={white:.94,yellow:.96};function yu(n,e,t,i){const{rect:r,solid:s}=Su[n],a=s[2]-s[0],o=s[3]-s[1],l=(i.right-i.left)/a,c=(i.top-i.bottom)/o,u=i.left-s[0]*l,h=u+l,f=i.top+s[1]*c,d=f-c,p=r[0]/e,v=r[2]/e,m=1-r[3]/t,g=1-r[1]/t,y=new Ht;return y.setAttribute("position",new Et([u,f,0,h,f,0,h,d,0,u,f,0,h,d,0,u,d,0],3)),y.setAttribute("uv",new Et([p,g,v,g,v,m,p,g,v,m,p,m],2)),y.computeBoundingSphere(),y}function Wr(n=!1,e=!1){const t=((n?yi:Ct)-1)*Mu[n?"yellow":"white"],i=n?12:jn;return yu(n?e?"yellow-shadow":"yellow":e?"white-shadow":"white",...cs.tiles,{left:-t,right:t,top:e?n?8:po-jn:t,bottom:-t-i})}function oc(n,e=!1){const t=e?mu(n):pu(n);t.computeBoundingBox();const i=t.boundingBox,r=e?1.2:1.25,s=yu(`${e?"white":"orange"}-${iv[n]}`,...cs.markers,{left:i.min.x*r,right:i.max.x*r,top:i.max.y*r,bottom:i.min.y*r});return t.dispose(),s}const dt={transparent:!0,depthTest:!1,depthWrite:!1,side:cn};function lc(n,e,t,i){const r=mo(n,e,t,i);return{x:r.x-ht.width/2,y:ht.height/2-r.y}}function cc(n,e,t,i){const r=is(n,e,t,i);return{x:r.x-ht.width/2,y:ht.height/2-r.y}}function rv(){return{tileTop:new ot({vertexColors:!0,...dt}),tileBevel:new ot({vertexColors:!0,...dt}),sideLight:new ot({vertexColors:!0,...dt}),floor:new ot({vertexColors:!0,...dt}),floorBevel:new ot({vertexColors:!0,...dt}),floorSide:new ot({vertexColors:!0,...dt}),coveredFloorSide:new ot({vertexColors:!0,color:"#cda756",...dt}),coveredFloorBevel:new ot({vertexColors:!0,color:"#d6b251",...dt}),landscape:new ot({vertexColors:!0,...dt}),stoneArt:new ot({...dt}),shadow:new ot({vertexColors:!0,opacity:.28,...dt}),arrowShadow:new ot({color:"#786f58",opacity:.16,...dt}),arrowSide:new ot({color:"#ca641c",...dt}),arrowBevel:new ot({color:"#ffbb69",...dt}),chevronSide:new ot({color:"#cba52c",...dt}),selectedArrow:new ot({color:Ci.arrow,...dt}),hintTop:new ot({vertexColors:!0,...dt}),hintBevel:new ot({vertexColors:!0,...dt}),hintSide:new ot({vertexColors:!0,...dt}),hintArt:new ot({...dt}),arrow:new ot({color:Ci.arrow,...dt}),chevron:new ot({color:Ci.chevron,...dt}),tileArt:new ot({...dt}),markerArt:new ot({...dt}),chevronArt:new ot({...dt})}}function sv(n){const e=new Z0({canvas:n,antialias:!0,alpha:!0,powerPreference:"high-performance"});e.outputColorSpace=Nt,e.toneMapping=tn,e.setClearColor(Ci.background,0),e.autoClear=!1;const t=new Os,i=new Po(-360,360,640,-640,.1,1e3);i.position.set(0,0,100),i.lookAt(0,0,0);const r=rv(),s={stoneSprites:Array.from({length:es},(Z,ue)=>tv(ue,bi)),stoneSlab:nv(bi),floor:no(yi-5,12*(yi-5)/(yi-1),!0),floorBevel:io(yi-1,4,12,!0),floorSide:ro(yi-1,12,12,!0),tileTop:no(Ct-6,12*(Ct-6)/(Ct-1)),tileBevel:io(Ct-1,5,12),tileSide:ro(Ct-1,jn,12),shadow:j0((Ct-2)*Mu.white,12),arrows:Object.fromEntries(gr.map(Z=>[Z,pu(Z)])),chevrons:Object.fromEntries(gr.map(Z=>[Z,mu(Z)])),whiteSprite:Wr(),coveredWhiteSprite:Wr(!1,!0),yellowSprite:Wr(!0),coveredYellowSprite:Wr(!0,!0),arrowSprites:Object.fromEntries(gr.map(Z=>[Z,oc(Z)])),chevronSprites:Object.fromEntries(gr.map(Z=>[Z,oc(Z,!0)]))},a=new Os,o=new Os;let l;a.scale.y=En,t.add(a),t.add(o);let c={width:1,height:1,pixelRatio:1},u,h,f=!1,d="loading",p="loading";const v=new ru,m=new Promise((Z,ue)=>{v.onLoad=()=>Z(),v.onError=()=>ue(new Error("Could not load board textures."))});m.catch(()=>{});const g=new ta(v).load(new URL("/White-Tower-Play/telegram/assets/tiles-atlas-Bgn-GxWF.webp",import.meta.url).href,Z=>{if(f){Z.dispose();return}d="ready",h&&Q(h)},void 0,()=>{d="failed"});g.colorSpace=Nt,r.tileArt.map=g,r.hintArt.map=g;const y=new ta(v).load(new URL("/White-Tower-Play/telegram/assets/markers-atlas-M4FshpTr.webp",import.meta.url).href,Z=>{if(f){Z.dispose();return}p="ready",h&&Q(h)},void 0,()=>{p="failed"});y.colorSpace=Nt,r.markerArt.map=y,r.chevronArt.map=y;let w=!1;const S=new ta(v).load(new URL("/White-Tower-Play/telegram/assets/stone-atlas-C2ucdoOf.webp",import.meta.url).href,Z=>{if(f){Z.dispose();return}w=!0,l=void 0,h&&Q(h)},void 0,()=>{w=!1});S.colorSpace=Nt,r.stoneArt.map=S;let T=0,b=!1;const I=[],x=new qe(Ci.floor),M=new qe(Ci.chevron);let R={lost(){},restored(){}};const D=Z=>{Z.preventDefault(),R.lost()},P=()=>{h&&Q(h),R.restored()};n.addEventListener("webglcontextlost",D),n.addEventListener("webglcontextrestored",P);function F(Z,ue,Le,Se,me=1,O=1,q=a){const ae=new pn(Z,ue);return ae.position.set(Le.x,Le.y,Le.z),ae.scale.set(me,O,1),ae.renderOrder=Se,q.add(ae),ae}function N(Z,ue,Le,Se,me,O){const q=(Z.u+Z.v+1e3)*1e-5;let ae=Se+1;for(let j=me;j<O;j++){const ce=la(Z,j),Re=cc(Z.u,Z.v,ce.rise,Le),Ue=q+.01+j*1e-5,ke=Z.id===h?.hintStackId&&j===Math.ceil(Z.height)-1;if(F(s.shadow,r.shadow,{x:Re.x-4,y:Re.y-jn-4,z:Ue},ae++,ce.scale,ce.scale),d==="ready"){const Oe=j<Math.ceil(Z.height)-1;F(s.whiteSprite,ke?r.hintArt:r.tileArt,{x:Re.x,y:Re.y,z:Ue},ae++,ce.scale,ce.scale),Oe&&F(s.coveredWhiteSprite,r.tileArt,{x:Re.x,y:Re.y,z:Ue},ae++,ce.scale,ce.scale);continue}F(s.tileSide,ke?r.hintSide:r.sideLight,{x:Re.x,y:Re.y,z:Ue},ae++,ce.scale,ce.scale),F(s.tileBevel,ke?r.hintBevel:r.tileBevel,{x:Re.x,y:Re.y,z:Ue+.001},ae++,ce.scale,ce.scale),F(s.tileTop,ke?r.hintTop:r.tileTop,{x:Re.x,y:Re.y,z:Ue+.002},ae++,ce.scale,ce.scale)}const be=Z.launchDirection;if(be&&O===Math.ceil(Z.height)){const j=la(Z,Z.height-1),ce=cc(Z.u,Z.v,j.rise,Le),Re=j.scale*(Z.arrowScale??1),Ue=-(Z.turnRotation??0);if(p==="ready")return F(s.arrowSprites[be],r.markerArt,{x:ce.x,y:ce.y,z:q},ae++,Re,Re).rotation.z=Ue,ae+Math.max(1,ue.cells.length);F(s.arrows[be],r.arrowShadow,{x:ce.x-2,y:ce.y-5,z:q},ae++,Re*1.06,Re*1.06).rotation.z=Ue,F(s.arrows[be],r.arrowSide,{x:ce.x,y:ce.y-3,z:q},ae++,Re,Re).rotation.z=Ue,F(s.arrows[be],r.arrowBevel,{x:ce.x,y:ce.y,z:q},ae++,Re,Re).rotation.z=Ue,F(s.arrows[be],Z.id===h?.selectedStackId?r.selectedArrow:r.arrow,{x:ce.x,y:ce.y+1,z:q+.03+Z.height*1e-5},ae++,Re*.9,Re*.9).rotation.z=Ue}return ae+Math.max(1,ue.cells.length)}function H(Z){u=Z,h&&(h={...h,projection:u}),a.position.set(u.originX-ht.width/2,(ht.height/2-u.originY)*En,0),a.scale.set(u.scale,u.scale*En,1),o.position.copy(a.position),o.scale.copy(a.scale)}function Q(Z){if(f||(a.clear(),I.length=0,h=Z,H(Z.projection??ln(Z.level,Z.stacks)),!u))return;const ue={...u,originX:ht.width/2,originY:ht.height/2,scale:1},Le=[...Z.level.cells].sort(ns);if(l!==Z.level){o.clear(),l=Z.level;let me=-8500;for(const O of Le){if(O.kind==="blocked")continue;const q=lc(O.u,O.v,0,ue);if(w){F(s.stoneSprites[ev(O.u,O.v)],r.stoneArt,{x:q.x,y:q.y-12-nr,z:0},me++,1,1,o);continue}for(let ae=_c-1;ae>=0;ae--)F(s.stoneSlab,r.landscape,{x:q.x,y:q.y-12-nr-ae*fo,z:0},me++,1,1,o)}}let Se=1;for(const me of J0(Z.level,Z.stacks)){if(me.kind==="stack"){Se=N(me.stack,Z.level,ue,Se+2,me.firstLayer,me.endLayer);continue}const O=me.cell,q=lc(O.u,O.v,0,ue),ae=(O.u+O.v+1e3)*1e-5,be=Z.stacks.some(j=>Math.abs(j.u-O.u)<.01&&Math.abs(j.v-O.v)<.01&&la(j,0).rise<.15);if(d==="ready"?(F(s.yellowSprite,r.tileArt,{x:q.x,y:q.y,z:ae},Se++),be&&F(s.coveredYellowSprite,r.tileArt,{x:q.x,y:q.y,z:ae},Se++)):(F(s.floorSide,be?r.coveredFloorSide:r.floorSide,{x:q.x,y:q.y,z:ae},Se++),F(s.floorBevel,be?r.coveredFloorBevel:r.floorBevel,{x:q.x,y:q.y,z:ae},Se++),F(s.floor,r.floor,{x:q.x,y:q.y,z:ae},Se++)),O.kind==="redirect"&&O.direction&&!Z.stacks.some(j=>j.u===O.u&&j.v===O.v)){if(p==="ready"){const Re=F(s.chevronSprites[O.direction],r.chevronArt,{x:q.x,y:q.y,z:ae},Se++);I.push({mesh:Re,x:q.x,y:q.y,direction:O.direction});continue}const j=F(s.chevrons[O.direction],r.chevronSide,{x:q.x,y:q.y-3,z:ae},Se++);I.push({mesh:j,x:q.x,y:q.y-3,direction:O.direction});const ce=F(s.chevrons[O.direction],r.chevron,{x:q.x,y:q.y,z:ae+.002},Se++);I.push({mesh:ce,x:q.x,y:q.y,direction:O.direction})}}U()}function G(Z){f||(c={width:Math.max(1,Z.width),height:Math.max(1,Z.height),pixelRatio:Math.min(Math.max(1,Z.pixelRatio),2)},e.setPixelRatio(c.pixelRatio),e.setSize(c.width,c.height,!1),U())}function U(){if(f||c.width<=0||c.height<=0)return;const Z=Q0(T,b),ue=b?.7:(1-Math.cos(T*Math.PI*2/1.8))/2;for(const ae of[r.hintArt,r.hintTop,r.hintBevel,r.hintSide])ae.color.setRGB(1.2+ue*.6,.72+ue*.4,.22+ue*.12);r.chevron.color.copy(x).lerp(M,.85+Z.intensity*.15),r.chevronArt.color.setScalar(.94+Z.intensity*.06);for(const ae of I){const be=co[ae.direction],j=be.u-be.v,ce=be.u+be.v,Re=Math.hypot(j,ce)||1;ae.mesh.position.x=ae.x+j/Re*Z.offset,ae.mesh.position.y=ae.y+ce/Re*Z.offset}e.setScissorTest(!1),e.setViewport(0,0,c.width,c.height),e.clear(!0,!0,!0);const Le=Math.min(c.width/ht.width,c.height/ht.height),Se=ht.width*Le,me=ht.height*Le,O=(c.width-Se)/2,q=(c.height-me)/2;e.setScissorTest(!0),e.setScissor(O,q,Se,me),e.setViewport(O,q,Se,me),h&&e.render(t,i),e.setScissorTest(!1)}function V(Z,ue){return u=ue.projection??ln(ue.level,ue.stacks),Wu(qu(Z),ue.stacks,u)}function ee(){return Object.freeze({geometries:e.info.memory.geometries,textures:e.info.memory.textures,programs:e.info.programs?.length??0,children:a.children.length+o.children.length})}function te(){f||(f=!0,n.removeEventListener("webglcontextlost",D),n.removeEventListener("webglcontextrestored",P),a.clear(),o.clear(),s.stoneSprites.forEach(Z=>Z.dispose()),S.dispose(),s.stoneSlab.dispose(),s.floor.dispose(),s.floorBevel.dispose(),s.floorSide.dispose(),s.whiteSprite.dispose(),s.coveredWhiteSprite.dispose(),s.yellowSprite.dispose(),s.coveredYellowSprite.dispose(),Object.values(s.arrowSprites).forEach(Z=>Z.dispose()),Object.values(s.chevronSprites).forEach(Z=>Z.dispose()),g.dispose(),y.dispose(),s.shadow.dispose(),s.tileTop.dispose(),s.tileBevel.dispose(),s.tileSide.dispose(),Object.values(s.arrows).forEach(Z=>Z.dispose()),Object.values(s.chevrons).forEach(Z=>Z.dispose()),Object.values(r).forEach(Z=>Z.dispose()),e.dispose())}return Object.freeze({ready:m,setView:Q,setProjection:H,resize:G,render:U,pickStack:V,resourceCounts:ee,artworkStatus:()=>({tiles:d,markers:p}),setPresentationTime(Z,ue){T=Z,b=ue},setContextCallbacks(Z){R=Z},dispose:te})}function av(){return Object.freeze({setView(){},resize(){},render(){},pickStack(){},resourceCounts:()=>Object.freeze({geometries:0,textures:0,programs:0,children:0}),dispose(){}})}function uc(n,e={}){const t=e.replaceCanvas?n.cloneNode(!1):n;t!==n&&n.parentNode?.replaceChild(t,n);try{if(e.mode==="unsupported")throw new Error("Simulated unavailable WebGL");return Object.freeze({renderer:(e.webglFactory??sv)(t),canvas:t,mode:"webgl",supported:!0})}catch{return Object.freeze({renderer:av(),canvas:t,mode:"unsupported",supported:!1,message:"Не удалось запустить Three.js: WebGL недоступен. Перезагрузите игру или откройте другой браузер."})}}const ca=["scale","originX","originY"],ua=16,ov={scale:5e-6,originX:.005,originY:.005},lv={scale:5e-5,originX:.05,originY:.05};function cv(){let n,e,t;const i={scale:0,originX:0,originY:0};return{reset(r){n=e=t=r;for(const s of ca)i[s]=0},synchronize(r=n){n=e=r},target(r){if(!n){n=e=t=r;return}t=r},update(r){if(!n||!t||!Number.isFinite(r)||r<=0)return!1;e=n;const s={...n,layerRise:t.layerRise},a=Math.exp(-ua*r);for(const o of ca){const l=n[o]-t[o],c=i[o]+ua*l;s[o]=t[o]+(l+c*r)*a,i[o]=(i[o]-ua*c*r)*a,Math.abs(s[o]-t[o])<ov[o]&&Math.abs(i[o])<lv[o]&&(s[o]=t[o],i[o]=0)}return n=Object.freeze(s),ca.some(o=>n[o]!==e[o])},snapshot(r=1){if(!n||!e||r===1)return n;const s=Math.max(0,Math.min(1,r));return Object.freeze({scale:e.scale+(n.scale-e.scale)*s,originX:e.originX+(n.originX-e.originX)*s,originY:e.originY+(n.originY-e.originY)*s,layerRise:n.layerRise})}}}const _t=Object.freeze({stepMs:200,contact:.65,turnMs:80,arrowAppearMs:160,stopMs:700,reducedStepMs:80,reducedTurnMs:60,reducedArrowCollapseMs:30,reducedArrowAppearMs:30,reducedStopMs:70}),dc=Object.freeze({victoryDelayMs:100,failureDelayMs:600,ribbonMs:250,shineDelayMs:300,shineMs:250,fadeMs:180}),tr=n=>n*n*(3-2*n);function uv(n,e){const t=Math.max(0,Math.min(1,n));return e?tr(t):t<.65?1.12*tr(t/.65):1.12-.12*tr((t-.65)/.35)}function dv(n={}){let e=[],t=0,i=0,r=0,s=!1,a=!1,o=!1,l=!1,c=1,u=!1,h=[],f=[],d=[],p=Object.freeze({active:!1,elapsedMs:0,durationMs:0,stacks:[]});function v(){if(!a||!e.length)return Object.freeze({active:!1,elapsedMs:t,durationMs:i,stacks:f});const S=u?i-t:t;if(u&&t===0)return Object.freeze({active:!0,elapsedMs:t,durationMs:i,stacks:h});let T=0;for(const b of e){const I=Math.max(0,Math.min(1,(S-T)/b.duration));if(I<1){if((b.kind==="stop"||b.kind==="turn")&&b.stackId){const F=I*b.duration*c,N=l?_t.reducedArrowCollapseMs:_t.turnMs,H=l?_t.reducedArrowAppearMs:_t.arrowAppearMs,Q=b.from.map(G=>{if(G.id!==b.stackId)return G;const U=F+1e-9<N,V=U?1-tr(F/N):b.direction?uv((F-b.revealAtMs)/H,l):0;return{...G,...U?{}:{launchDirection:b.direction},...!l&&(b.kind==="stop"||b.waveElapsedMs!==void 0)?ac(G.height,(b.waveElapsedMs??0)+F):{},arrowScale:V}});return Object.freeze({active:!0,elapsedMs:t,durationMs:i,stacks:Q,event:b.kind})}if(b.kind!=="move"||!b.stackId||!b.start||!b.end)return Object.freeze({active:!0,elapsedMs:t,durationMs:i,stacks:b.from,event:b.kind});const x=Math.min(1,I/_t.contact),M=tr(x),R=I>=_t.contact,D=b.heightTo-b.heightFrom,P=b.from.flatMap(F=>{if(F.id===b.absorbedId&&R)return[];if(F.id!==b.stackId)return[F];const N=R?b.heightTo:b.heightFrom,H=D>0?Math.max(3,D*.75):1.1,Q=R?0:D*M+(l?0:4*H*M*(1-M));return[{...F,u:b.start.u+(b.end.u-b.start.u)*M,v:b.start.v+(b.end.v-b.start.v)*M,height:N,lift:Q,collecting:!!b.absorbedId&&!R,...!l&&R&&D?ac(N,(I-_t.contact)*b.duration*c):{}}]});return Object.freeze({active:!0,elapsedMs:t,durationMs:i,stacks:P,event:b.absorbedId&&R?"merge":"move"})}T+=b.duration}return Object.freeze({active:!1,elapsedMs:t,durationMs:i,stacks:e.at(-1)?.to??f})}function m(S){if(o)return;w(),r=S.generationId,u=!!S.reverse,l=!!S.reducedMotion,c=Math.max(.25,Math.min(3,S.speed??1)),f=S.stacks.map(U=>({...U}));let T=f.map(U=>({...U,...U.u===S.steps[0]?.from.u&&U.v===S.steps[0]?.from.v?{launchDirection:S.steps[0].direction}:{}}));const b=[],I=[];let x=0;const M=U=>{b.push(U),T=U.to.map(V=>({...V}))};S.steps.forEach((U,V)=>{const ee=T.find(me=>me.u===U.from.u&&me.v===U.from.v);if(!ee)return;const te=U.absorbed?T.find(me=>me.u===U.to.u&&me.v===U.to.v):void 0,Z=T;let ue=T.filter(me=>me.id!==te?.id).map(me=>me.id===ee.id?{...me,u:U.to.u,v:U.to.v,height:U.movingHeightAfter}:me);const Le=(l?_t.reducedStepMs:_t.stepMs)/c;M({kind:"move",duration:Le,from:Z,to:ue,stackId:ee.id,start:U.from,end:U.to,heightFrom:U.movingHeightBefore,heightTo:U.movingHeightAfter,...te?{absorbedId:te.id}:{}}),U.absorbed&&I.push(Object.freeze({atMs:x+Le*_t.contact,cue:"merge"})),x+=Le;const Se=S.events.find(me=>me.type==="turn"&&me.stepIndex===V);if(Se?.type==="turn"&&Se.direction!==ee.launchDirection){I.push(Object.freeze({atMs:x,cue:"turn"}));const me=T.map(be=>be.id===ee.id?{...be,launchDirection:Se.direction}:be),O=!l&&U.absorbed?(1-_t.contact)*_t.stepMs:void 0,q=l?_t.reducedArrowCollapseMs:Math.max(_t.turnMs,O===void 0?0:sc(U.movingHeightAfter)-O),ae=(q+(l?_t.reducedArrowAppearMs:_t.arrowAppearMs))/c;M({kind:"turn",duration:ae,from:T,to:me,stackId:ee.id,direction:Se.direction,revealAtMs:q,...O!==void 0?{waveElapsedMs:O}:{}}),x+=ae}});const R=S.steps.length?f.find(U=>U.u===S.steps[0]?.from.u&&U.v===S.steps[0]?.from.v)?.id:void 0,D=T.find(U=>U.id===R)?.id??R,P=S.steps.at(-1),N=(P?.absorbed?f.find(U=>U.u===P.to.u&&U.v===P.to.v&&U.id!==D):void 0)?.launchDirection,H=T.map(U=>U.id===D?{id:U.id,u:U.u,v:U.v,height:U.height,...N?{launchDirection:N}:{}}:U),Q=l?_t.reducedArrowCollapseMs:sc(T.find(U=>U.id===D)?.height??1),G=Math.max(l?_t.reducedStopMs:_t.stopMs,N?Q+(l?_t.reducedArrowAppearMs:_t.arrowAppearMs):0)/c;Math.max(0,...T.map(U=>U.height))>=3&&I.push(Object.freeze({atMs:x+Math.min(120/c,G),cue:"settle"})),b.push({kind:"stop",duration:G,from:T,to:H,...N?{direction:N}:{},revealAtMs:Q,...D?{stackId:D}:{}}),h=S.finalStacks??H,d=Object.freeze(u?[]:I.sort((U,V)=>U.atMs-V.atMs)),e=b,t=0,i=b.reduce((U,V)=>U+V.duration,0),a=!0,s=!1,p=v(),e.length||g()}function g(){a&&(a=!1,t=i,p=Object.freeze({active:!1,elapsedMs:t,durationMs:i,stacks:u?f:h}),n.onComplete?.(r))}function y(S){if(o||!a||s||!Number.isFinite(S)||S<=0)return p;const T=t;t=Math.min(i,t+S*1e3);for(const b of d)if(b.atMs>T&&b.atMs<=t)try{n.onCue?.(b.cue)}catch{}return p=v(),t>=i&&g(),p}function w(){a=!1,s=!1,e=[],t=0,i=0,f=[],h=[],d=[],u=!1,p=Object.freeze({active:!1,elapsedMs:0,durationMs:0,stacks:[]})}return Object.freeze({start:m,update:y,snapshot:()=>p,pause(S){s=S},reset:w,dispose(){o||(w(),o=!0)}})}const so="__whiteTowerStorage";class ao extends Error{constructor(e){super("Another tab saved newer progress. Reload to continue from that save."),this.current=e}}function us(n){if(!n||typeof n!="object"||Array.isArray(n))return{revision:0,value:n};const e=n,t=e[so];if(!t||!Number.isSafeInteger(t.revision)||t.revision<0)return{revision:0,value:n};const i={...e};return delete i[so],{revision:t.revision,value:t.deleted?void 0:t.primitive?i.value:i}}function Eu(n,e){const t=!!n&&typeof n=="object"&&!Array.isArray(n);return{...t?n:{value:n},[so]:{revision:e,deleted:n===void 0,primitive:!t}}}function bu(n,e,t){let i=0,r=!1,s=!1;async function a(o,l){if(s&&!l?.replace)throw new ao(us(await e()).value);const c=await t(o,l?.replace?void 0:i);if(!c.accepted)throw s=!0,new ao(c.value);i=c.revision,s=!1}return{mode:n,async read(){const o=us(await e());return r||(i=o.revision,r=!0),o.value},write:a,clear:()=>a(void 0,{replace:!0})}}const Jn="white-tower.save.v1";function fv(){return new Promise((n,e)=>{if(typeof indexedDB>"u"){e(new Error("IndexedDB unavailable"));return}const t=indexedDB.open("white-tower",1);t.onupgradeneeded=()=>{t.result.objectStoreNames.contains("save")||t.result.createObjectStore("save")},t.onerror=()=>e(t.error??new Error("IndexedDB open failed")),t.onsuccess=()=>{const i=t.result;n(bu("indexeddb",()=>new Promise((a,o)=>{const c=i.transaction("save","readonly").objectStore("save").get(Jn);c.onsuccess=()=>a(c.result),c.onerror=()=>o(c.error)}),(a,o)=>new Promise((l,c)=>{const u=i.transaction("save","readwrite"),h=u.objectStore("save"),f=h.get(Jn);let d;f.onsuccess=()=>{const p=us(f.result),v=o===void 0||p.revision===o;d={accepted:v,revision:p.revision+(v?1:0),value:v?a:p.value},v&&h.put(Eu(a,d.revision),Jn)},u.oncomplete=()=>l(d),u.onerror=u.onabort=()=>c(u.error??new Error("IndexedDB write failed"))})))}})}function hv(){if(typeof localStorage>"u")throw new Error("localStorage unavailable");if(typeof navigator>"u"||!navigator.locks)throw new Error("Safe localStorage saves require Web Locks; using temporary progress.");const n=`${Jn}.probe`;localStorage.setItem(n,"1"),localStorage.removeItem(n);const e=async()=>{const t=localStorage.getItem(Jn);return t===null?void 0:JSON.parse(t)};return bu("localStorage",e,(t,i)=>navigator.locks.request(Jn,async()=>{const r=us(await e()),s=i===void 0||r.revision===i,a=r.revision+(s?1:0);return s&&localStorage.setItem(Jn,JSON.stringify(Eu(t,a))),{accepted:s,revision:a,value:s?t:r.value}}))}function pv(n={}){const e=n.adapters??[fv,hv];let t={mode:"memory",async read(){return r},async write(d){r=d}},i=-1,r,s="memory",a=Promise.resolve(),o="",l=!1;const c=(async()=>{for(let d=0;d<e.length;d++)try{const p=await e[d]();await p.read(),t=p,i=d,s=p.mode;break}catch(p){o=p instanceof Error?p.message:String(p)}return s})();async function u(){await c;try{const d=await t.read();return r=d,d}catch(d){o=d instanceof Error?d.message:String(d);for(let p=i+1;p<e.length;p++)try{const v=await e[p](),m=await v.read();return t=v,i=p,s=v.mode,r=m,m}catch(v){o=v instanceof Error?v.message:String(v)}return t={mode:"memory",async read(){return r},async write(p){r=p}},s="memory",r}}function h(d,p){return a=a.then(async()=>{await c,r=d;try{await t.write(d,p),l=!1}catch(v){if(v instanceof ao){l=!0,r=v.current,o=v.message;return}o=v instanceof Error?v.message:String(v);let m=!1;for(let g=i+1;g<e.length;g++)try{const y=await e[g]();await y.read(),await y.write(d,p),t=y,i=g,s=y.mode,m=!0;break}catch(y){o=y instanceof Error?y.message:String(y)}m||(t={mode:"memory",async read(){return r},async write(g){r=g}},i=e.length,s="memory")}}),a}function f(){return a=a.then(async()=>{await c,r=void 0,l=!1;try{await t.clear?.();return}catch(d){o=d instanceof Error?d.message:String(d)}for(let d=i+1;d<e.length;d++)try{const p=await e[d]();await p.read(),await p.clear?.(),t=p,i=d,s=p.mode;return}catch(p){o=p instanceof Error?p.message:String(p)}t={mode:"memory",async read(){return r},async write(d){r=d},async clear(){r=void 0}},i=e.length,s="memory"}),a}return Object.freeze({ready:c,read:u,write:h,clear:f,mode:()=>s,memoryOnly:()=>s==="memory",conflicted:()=>l,unavailableReason:()=>o,flush:()=>a})}const Do=1,mv=new Set(["SE","SW","NW","NE","E","W","N","S"]),dr=n=>typeof n=="object"&&n!==null&&!Array.isArray(n);function oo(n){return Object.freeze({schemaVersion:Do,...n})}function qi(n,e,t){if(!dr(n)||n.schemaVersion!==Do||!["1.0.0","1.1.0","1.2.0","1.3.0","1.4.0"].includes(String(n.contentVersion))||typeof n.selectedLevelId!="string")return n;const i=e.levels.find(r=>r.id===n.selectedLevelId);if(!i)return n;if(n.levelChecksum!==i.sha256){if(!t||t.id!==i.id)return n;const r={...n,contentVersion:e.contentVersion,levelChecksum:i.sha256,committedState:Iu(t),history:[]};return ts(r,e,new Map([[t.id,t]])).ok?r:n}return{...n,contentVersion:e.contentVersion}}function fc(n,e){if(!dr(n)||n.levelId!==e.id||!Number.isSafeInteger(n.moveCount)||Number(n.moveCount)<0||!Array.isArray(n.stacks)||!n.stacks.length)return!1;let t=0;const i=new Set,r=new Set(e.cells.map(s=>`${s.u},${s.v}`));for(const s of n.stacks){if(!dr(s)||!Number.isSafeInteger(s.u)||!Number.isSafeInteger(s.v)||!Number.isSafeInteger(s.height)||Number(s.height)<1||!r.has(`${s.u},${s.v}`)||typeof s.id!="string"||!s.id||s.launchDirection!==void 0&&!mv.has(String(s.launchDirection)))return!1;const a=`${s.u},${s.v}`;if(i.has(a))return!1;i.add(a),t+=Number(s.height)}return t===e.totalTiles}function ts(n,e,t){if(!dr(n))return{ok:!1,reason:"Save must be an object."};if(n.schemaVersion!==Do)return{ok:!1,reason:`Unsupported save schema: ${String(n.schemaVersion)}.`};if(n.contentVersion!==e.contentVersion||typeof n.selectedLevelId!="string")return{ok:!1,reason:"Save content version or selected level is invalid."};const i=e.levels.find(s=>s.id===n.selectedLevelId),r=t.get(n.selectedLevelId);return!i||!r||n.levelChecksum!==i.sha256?{ok:!1,reason:"Saved level checksum does not match current content."}:!Number.isSafeInteger(n.unlockedLevel)||Number(n.unlockedLevel)<1||Number(n.unlockedLevel)>e.levels.length+1?{ok:!1,reason:"Unlocked level is outside the catalog."}:!Array.isArray(n.completedLevelIds)||n.completedLevelIds.some(s=>typeof s!="string"||!e.levels.some(a=>a.id===s))?{ok:!1,reason:"Completed levels contain unknown IDs."}:!dr(n.settings)||!fc(n.committedState,r)||!Array.isArray(n.history)||n.history.length>50||n.history.some(s=>!fc(s,r))?{ok:!1,reason:"Saved game state or undo history is invalid."}:{ok:!0,value:oo({contentVersion:n.contentVersion,levelChecksum:n.levelChecksum,selectedLevelId:n.selectedLevelId,unlockedLevel:Number(n.unlockedLevel),completedLevelIds:Object.freeze([...new Set(n.completedLevelIds)]),settings:Object.freeze({...n.settings}),committedState:n.committedState,history:Object.freeze(n.history.slice(-50))})}}const Tu={en:{"service.loading":"Loading level…","service.contentError":"Could not load White Tower content. Check the connection and retry.","service.graphicsError":"Graphics could not start. Try another browser or reload.","service.nextError":"Could not load the next level. Try again.","service.notReady":"Next level is not ready.","service.moreLevels":"More levels are coming soon.",settings:"Settings",back:"BACK TO GAME",levels:"Choose level",backSettings:"BACK TO SETTINGS",hint:"Hint",fail:"FAIL!",reducedMotion:"Reduce motion",language:"Language",highContrast:"High contrast",sound:"Sound effects",music:"Music",volume:"Volume",progress:"Campaign progress",clearProgress:"Clear progress",clearQuestion:"Clear all completed levels and saved attempts?",confirmClear:"CLEAR PROGRESS",cancel:"CANCEL",locked:"Locked",completed:"Completed",current:"Current level",memory:"Progress is temporary because browser storage is unavailable.",retry:"Retry storage",audioLater:"Short synthesized effects play after your first input.",level:"Level",undo:"BACK",next:"NEXT",win:"COMPLETED!",campaignComplete:"Campaign complete. Choose any unlocked level.",chooseLevel:"CHOOSE LEVEL",tapHighlighted:"Tap the highlighted arrow",searching:"Searching for a safe move…",hintTimeout:"Search timed out. You can try Undo; no dead end was proven.",noSolution:"No solution exists from this state.",searchingPrevious:"Checking whether the previous move can be undone…","action.undo":"UNDO","action.next":"NEXT","win.title":"LEVEL COMPLETED!","tutorial.tap":"Tap the arrow","hint.undo":"Undo the last move","game.stuck":"Try undoing a move","action.retry":"Retry","hint.loading":"Searching for a safe move…","a11y.selection":"Selected stack {index} of {count}.","a11y.move":"Move started.","a11y.undo":"Move undone.","a11y.restart":"Level restarted.","a11y.menu":"Settings opened. Press Escape to return to the game."},ru:{"service.loading":"Загрузка уровня…","service.contentError":"Не удалось загрузить игру. Проверьте соединение и повторите попытку.","service.graphicsError":"Не удалось запустить графику. Попробуйте другой браузер или повторите загрузку.","service.nextError":"Не удалось загрузить следующий уровень. Повторите попытку.","service.notReady":"Следующий уровень ещё не готов.","service.moreLevels":"Новые уровни скоро появятся.",settings:"Настройки",back:"ВЕРНУТЬСЯ В ИГРУ",levels:"Выбор уровня",backSettings:"К НАСТРОЙКАМ",hint:"Подсказка",fail:"НЕУДАЧА!",reducedMotion:"Уменьшить движение",language:"Язык",highContrast:"Высокая контрастность",sound:"Звуковые эффекты",music:"Музыка",volume:"Громкость",progress:"Прогресс кампании",clearProgress:"Сбросить прогресс",clearQuestion:"Удалить пройденные уровни и сохранённые попытки?",confirmClear:"СБРОСИТЬ ПРОГРЕСС",cancel:"ОТМЕНА",locked:"Закрыт",completed:"Пройден",current:"Текущий уровень",memory:"Прогресс временный: хранилище браузера недоступно.",retry:"Повторить загрузку",audioLater:"Короткие синтезированные звуки включаются после первого действия.",level:"Уровень",undo:"НАЗАД",next:"ДАЛЕЕ",win:"ПРОЙДЕН!",campaignComplete:"Кампания пройдена. Выберите открытый уровень.",chooseLevel:"ВЫБРАТЬ УРОВЕНЬ",tapHighlighted:"Нажмите на выделенную стрелку",searching:"Ищу безопасный ход…",hintTimeout:"Поиск не завершился. Можно отменить ход; тупик не доказан.",noSolution:"Из этого состояния решения нет.",searchingPrevious:"Проверяю, можно ли отменить предыдущий ход…","action.undo":"НАЗАД","action.next":"ДАЛЕЕ","win.title":"УРОВЕНЬ ПРОЙДЕН!","tutorial.tap":"Нажмите на стрелку","hint.undo":"Отмените последний ход","game.stuck":"Попробуйте отменить ход","action.retry":"Повторить","hint.loading":"Ищу безопасный ход…","a11y.selection":"Выбрана стопка {index} из {count}.","a11y.move":"Ход запущен.","a11y.undo":"Ход отменён.","a11y.restart":"Уровень перезапущен.","a11y.menu":"Настройки открыты. Нажмите Escape, чтобы вернуться в игру."}};function gv(n,e){return Tu[n][e]}function Ze(n,e){return Tu.en[e]}function $n(n){const e=typeof n=="object"&&n!==null?n:{};return Object.freeze({language:"en",reducedMotion:e.reducedMotion===!0,highContrast:e.highContrast===!0,soundEnabled:e.soundEnabled!==!1,musicEnabled:typeof e.musicEnabled=="boolean"?e.musicEnabled:e.soundEnabled!==!1,soundVolume:typeof e.soundVolume=="number"&&Number.isFinite(e.soundVolume)?Math.max(0,Math.min(1,e.soundVolume)):.4,tutorialCompleted:e.tutorialCompleted===!0})}const Yi=(n,e)=>({status:"cancelled",requestId:n,generationId:e,explored:0,elapsedMs:0});function vv(n=()=>new Worker(new URL("/White-Tower-Play/telegram/assets/solver-worker-DPcwYnWJ.js",import.meta.url),{type:"module"})){let e,t=0,i=!1;const r=new Map;function s(h){for(const[f,d]of r)d.resolve(h?{status:"error",requestId:f,generationId:d.generationId,explored:0,elapsedMs:0,message:h}:Yi(f,d.generationId));r.clear()}function a(){return e||(e=n(),e.onmessage=h=>{const f=h.data,d=r.get(f.requestId);d&&(r.delete(f.requestId),d.generationId!==t||f.generationId!==t?d.resolve(Yi(f.requestId,d.generationId)):d.resolve(f))},e.onerror=h=>s(h.message||"Solver worker failed."),e)}function o(h,f,d){return i?Promise.resolve(Yi(d.requestId,d.generationId)):!d.requestId||!Number.isFinite(d.budgetMs)||d.budgetMs<0?Promise.resolve({status:"error",requestId:d.requestId,generationId:d.generationId,explored:0,elapsedMs:0,message:"Invalid request options."}):d.generationId<t?Promise.resolve(Yi(d.requestId,d.generationId)):(d.generationId>t&&c(d.generationId),r.has(d.requestId)?Promise.resolve({status:"error",requestId:d.requestId,generationId:d.generationId,explored:0,elapsedMs:0,message:"Duplicate request ID."}):new Promise(p=>{r.set(d.requestId,{generationId:d.generationId,resolve:p});try{a().postMessage({type:"solve",requestId:d.requestId,generationId:d.generationId,budgetMs:d.budgetMs,level:h,state:f})}catch(v){r.delete(d.requestId),p({status:"error",requestId:d.requestId,generationId:d.generationId,explored:0,elapsedMs:0,message:v instanceof Error?v.message:String(v)})}}))}function l(h){if(!(!r.has(h)||!e))try{e.postMessage({type:"cancel",requestId:h})}catch{}}function c(h){if(!(i||h<=t)){t=h;for(const[f,d]of r)if(d.generationId!==t){try{e?.postMessage({type:"cancel",requestId:f})}catch{}d.resolve(Yi(f,d.generationId)),r.delete(f)}}}function u(){i||(i=!0,s(),e?.terminate(),e=void 0)}return Object.freeze({solve:o,cancel:l,invalidate:c,dispose:u})}const Xr=Object.freeze({kind:"idle"});function _v(n,e){let t=0,i=0,r="",s,a=!1;function o(){a||(s!==void 0&&clearTimeout(s),s=void 0,r&&n.cancel(r),r="",t++,n.invalidate(t),e(Xr))}async function l(u,h,f){if(a)return;o();const d=t,p=performance.now(),v=`hint-${++i}`;r=v,e({kind:"idle"}),s=setTimeout(()=>{!a&&t===d&&r&&e({kind:"searching"})},300);const m=()=>!a&&t===d;try{const g=await n.solve(u,h,{requestId:v,generationId:d,budgetMs:2e3});if(!m())return;if(g.status==="solved"){s!==void 0&&clearTimeout(s),s=void 0;const y=g.path[0];e(y?{kind:"move",move:y}:Xr),r="";return}if(g.status==="unsolvable"){const y=f.at(-1),w=Math.max(0,2e3-(performance.now()-p));if(!y||w<=0){s!==void 0&&clearTimeout(s),s=void 0,e({kind:"deadlock"}),r="";return}s===void 0&&e({kind:"searching"});const S=`hint-${i}-undo`;r=S;const T=await n.solve(u,y,{requestId:S,generationId:d,budgetMs:w});if(!m())return;s!==void 0&&clearTimeout(s),s=void 0,T.status==="solved"?e({kind:"undo-proven"}):T.status==="unsolvable"?e({kind:"deadlock"}):T.status==="timeout"?e({kind:"undo-suggestion"}):e(T.status==="cancelled"?Xr:{kind:"error"}),r="";return}s!==void 0&&clearTimeout(s),s=void 0,g.status==="timeout"?e(f.length?{kind:"undo-suggestion"}:{kind:"timeout"}):e(g.status==="cancelled"?Xr:{kind:"error"}),r=""}catch{m()&&(e({kind:"error"}),r="")}}function c(){a||(o(),a=!0)}return Object.freeze({request:l,cancel:o,dispose:c})}function xv(n,e="webgl",t={}){const i=t.audio,r=t.analytics;let s=0;const a=new Set;function o(C,L={}){const Y=p.snapshot();r?.track(C,{...v?{mode:"challenge"}:r.context(),level_id:Y.level?.id??null,content_version:x?.contentVersion??null,active_ms:Math.round(s*1e3),move_count:Y.committedState?.moveCount??0,...L})}function l(C=!0,L=!1){s=0,!v&&M&&x&&r?.beginAttempt(M.id,x.contentVersion,L,C)}function c(C){const L=v?`challenge:${v.serial}:${C.attemptId}`:r?.context().attempt_id;C.phase==="Won"&&L&&!a.has(L)&&(a.add(L),v?Ms(r,"wt_challenge_completed",M.id,x.contentVersion,"challenge",L):o("wt_level_completed"),!v&&x?.levels.at(-1)?.id===C.level?.id&&o("wt_campaign_completed"))}let u=n,h=uc(n,{mode:e}),f=h.renderer;const d=Nu();let p=d.current,v,m=0,g=!1,y=!1;const w=new AbortController,S=t.store??pv();let T=Promise.resolve();const b=dv({onCue:C=>i?.play(C),onComplete:C=>{const L=p.snapshot().animation?.reverse,Y=p.finishAnimation(C);Y.phase==="Won"&&!L&&(i?.play("victory"),c(Y)),_(Y),We(),et(Y)}});function I(C){const L=C.animation;b.start({stacks:L.sourceState.stacks,steps:L.steps,events:L.events,generationId:C.generationId,reducedMotion:O.reducedMotion,reverse:L.reverse,finalStacks:L.nextState.stacks}),W(b.snapshot().stacks,C)}let x,M,R=0,D=0,P,F,N;const H=cv();let Q=!1,G=!1,U=!1,V,ee=!1,te="",Z=0,ue,Le=!1,Se=1;const me=$n({reducedMotion:typeof window<"u"&&!!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches});let O=me,q=0,ae=!1,be=Object.freeze({kind:"idle"}),j,ce=0,Re;const Ue=vv();let ke,Oe=!1;function ze(C){if(!G)if(be=C,C.kind!=="idle"&&C.kind!=="searching"&&(o("wt_hint_result",{result:C.kind,hint_latency_ms:ke===void 0?0:Math.round(performance.now()-ke)}),ke=void 0),j=void 0,ce=["move","undo-proven","undo-suggestion","deadlock","timeout","error"].includes(C.kind)?2.5:0,C.kind==="move"){const L=A().find(Y=>Y.u===C.move.u&&Y.v===C.move.v);L&&(j=L.id,J(L.id))}else p.snapshot().phase!=="Animating"&&_()}const Ge=_v(Ue,ze);function pt(C){const L=x.levels.find(Y=>Y.id===C.level.id);return oo({contentVersion:x.contentVersion,levelChecksum:L.sha256,selectedLevelId:C.level.id,unlockedLevel:Se,completedLevelIds:C.completedLevelIds,settings:O,committedState:C.committedState,history:p.historySnapshot()})}async function lt(C,L,Y){if(!Oe){Oe=!0,C==="hint"&&ze({kind:"searching"}),t.helpState?.(!0);try{const ie=L.generationId,_e=await t.help.perform(C,pt(L),()=>!G&&!Le&&p.snapshot().generationId===ie);_e&&Y(_e)}catch(ie){C==="hint"&&ze({kind:"idle"}),t.helpError?.(C,ie)}finally{Oe=!1,t.helpState?.(!1)}}}function Ke(){Re!==void 0&&clearTimeout(Re),Re=void 0}function et(C=p.snapshot()){if(Ke(),C.phase!=="Idle"||!C.committedState||C.committedState.stacks.length<2||A(C).length)return;const L=C.generationId;Re=setTimeout(()=>{Re=void 0;const Y=p.snapshot();G||Y.phase!=="Idle"||Y.generationId!==L||A(Y).length||(be=Object.freeze({kind:"deadlock"}),ce=2,o("wt_deadlock"))},600)}function k(){if(g||Oe)return;let C=p.snapshot();return C.phase==="Menu"&&(C=p.closeMenu(),_(C)),C.phase!=="Idle"||!C.level||!C.committedState?!1:(Ke(),ke=performance.now(),o("wt_hint_requested"),t.help?(lt("hint",C,ze),!0):(Ge.request(C.level,C.committedState,p.historySnapshot()),i?.play("hint"),!0))}function St(){O.tutorialCompleted||(O=$n({...O,tutorialCompleted:!0}),ae=!1)}function We(){if(v||g||y)return T;const C=p.snapshot(),L=x?.levels.find(Xe=>Xe.id===C.level?.id);if(!L||!C.level||!C.committedState)return T;const Y=C.completedLevelIds;let ie=1;for(;ie<=x.levels.length&&Y.includes(x.levels[ie-1]?.id??"");)ie++;Se=Math.max(Se,ie);const _e=oo({contentVersion:x.contentVersion,levelChecksum:L.sha256,selectedLevelId:C.level.id,unlockedLevel:Se,completedLevelIds:Y,settings:O,committedState:C.committedState,history:p.historySnapshot()});return T=S.write(_e),T}function A(C=p.snapshot()){if(C.phase!=="Idle"||!C.level||!C.displayedState)return[];const L=new Map(C.level.cells.map(ie=>[`${ie.u},${ie.v}`,ie])),Y=P??ln(C.level,C.displayedState.stacks);return C.displayedState.stacks.filter(ie=>!!ie.launchDirection||L.get(`${ie.u},${ie.v}`)?.kind==="redirect").map(ie=>({stack:ie,center:is(ie.u,ie.v,ie.height-1,Y)})).sort((ie,_e)=>ie.center.y-_e.center.y||ie.center.x-_e.center.x||ie.stack.id.localeCompare(_e.stack.id)).map(({stack:ie})=>ie)}function _(C=p.snapshot()){if(!C.level||!C.committedState||G)return;D++;const L=A(C);L.length&&!L.some(_e=>_e.id===V)&&(V=L[0]?.id);const Y=U?{...C.committedState,stacks:[{...C.committedState.stacks[0],height:C.level.totalTiles}]}:C.committedState,ie=ln(C.level,Y.stacks);N!==C.level?(N=C.level,H.reset(ie),P=ie):H.target(ie),f.setView({..._r(C.level,Y,D,V,Y.stacks,P),hintStackId:j})}function W(C,L=p.snapshot()){if(!(!L.level||!L.committedState||G)){if(D++,F!==L.generationId||!P){F=L.generationId;const Y=L.animation?.steps.flatMap(ie=>[ie.from,ie.to].map(_e=>({..._e,height:ie.movingHeightAfter,lift:Math.max(3,ie.movingHeightAfter*.75)})))??[];H.target(ln(L.level,[...L.displayedState.stacks,...L.committedState.stacks,...Y]))}f.setView(_r(L.level,L.committedState,D,V,C,P))}}function J(C){return A().some(L=>L.id===C)?(V=C,_(),!0):!1}function re(C){if(g||Oe||Le||!h.supported)return!1;const L=A().find(ie=>ie.id===C);if(!L)return!1;V=C,Ke();const Y=p.launch({u:L.u,v:L.v});return Y.phase!=="Animating"?!1:(j===C&&o("wt_hint_applied"),!v&&Y.committedState.moveCount===1&&r?.track("wt_first_move",{...r.context(),active_ms:Math.round(s*1e3)},"first:"+r.context().attempt_id),o("wt_move_accepted",{input:matchMedia("(pointer:coarse)").matches?"touch":"pointer"}),i?.play("launch"),Ge.cancel(),St(),We(),I(Y),!0)}function de(){if(g||Oe)return!1;const C=p.snapshot();return Ge.cancel(),ae=!1,C.phase==="Menu"?(_(p.closeMenu()),o("wt_menu_closed"),i?.play("ui"),!0):C.phase==="Idle"||C.phase==="Won"?(_(p.openMenu()),o("wt_menu_opened"),i?.play("ui"),!0):!1}function he(C){const L=p.snapshot(),Y=L.displayedState?.stacks.find(ie=>ie.id===C);if(!(!Y||!L.level))return Yr(is(Y.u,Y.v,Y.height-1,P??ln(L.level,L.displayedState.stacks)))}function se(C){if(Oe)return!1;const L=p.snapshot();if(G||!["webgl","unsupported"].includes(C)||!["Idle","Won","Menu"].includes(L.phase))return!1;const Y=uc(u,{mode:C,replaceCanvas:!0}),ie=f;return Le=!1,h=Y,f=Y.renderer,u=Y.canvas,le(),ie?.dispose(),_(L),!0}function le(){f?.setContextCallbacks?.({lost(){G||(Le=!0,o("wt_graphics_lost"),H.synchronize(P),te="Graphics context lost. Attempting to restore the current board.",We())},restored(){o("wt_graphics_restored"),!G&&(Le=!1,te="",p.snapshot().phase==="Animating"?W(b.snapshot().stacks):_(p.snapshot()))}})}async function fe(C,L=!1){if(v||g||Oe)throw new Error("Return to your campaign first.");if(!x||G)throw new Error("Каталог ещё загружается.");const Y=++Z;ue?.abort(),ue=new AbortController;const ie=ue;b.reset(),Ge.cancel(),q=0,ae=!1,Ke();const _e=p.snapshot();_e.phase==="Animating"&&_(p.finishAnimation(_e.generationId));const Xe=await kn(x,C,fetch,ie.signal);G||Y!==Z||(M=Xe,U=!1,_(p.loadLevel(M)),L&&p.restoreCompleted([]),l(),await We(),et(p.snapshot()))}async function Pe(C){if(v||g||Oe)return!1;const L=x?.levels.findIndex(Y=>Y.id===C)??-1;return L<0||L+1>Se||!["Menu","Idle","Won"].includes(p.snapshot().phase)?!1:(await fe(C),!0)}function xe(C){return Oe||(O=$n({...O,...C}),o("wt_settings_changed",{sound:O.soundEnabled,music:O.musicEnabled}),i?.configure(O),We()),O}async function ge(){return v||g||Oe||y||G||!x?!1:(await S.clear(),Se=1,te="",await fe(x.levels[0].id,!0),!0)}async function Ie(){if(v||g||Oe)return{advanced:!1,message:"Return to your campaign first."};const C=p.snapshot();if(G||C.phase!=="Won"||ee)return{advanced:!1,message:Ze(O.language,"service.notReady")};const L=x?.levels.findIndex(ie=>ie.id===C.level?.id)??-1,Y=x?.levels[L+1];if(!Y)return{advanced:!1,message:Ze(O.language,"service.moreLevels")};ee=!0;try{return await T,o("wt_next_level_requested"),await fe(Y.id),o("wt_next_level_started"),{advanced:!0}}catch{return o("wt_content_error",{stage:"next"}),{advanced:!1,message:Ze(O.language,"service.nextError")}}finally{ee=!1}}function Fe(){b.reset(),Ge.cancel(),Ke(),be=Object.freeze({kind:"idle"}),j=void 0,ce=0,V=void 0,ae=!1,q=0}async function He(C){const L=x&&$o(x,C);if(!L||G)return;const Y=await kn(x,L.levelId,fetch,w.signal);return G?void 0:{descriptor:L,level:Y}}async function z(C){if(G||v||g||Oe||!["Idle","Won"].includes(p.snapshot().phase))return!1;const L=x&&$o(x,C);if(!L)return!1;g=!0;try{await T,await S.flush();const Y=JSON.stringify(await S.read()),ie=await kn(x,L.levelId,fetch,w.signal);return G||!["Idle","Won"].includes(p.snapshot().phase)?!1:(v={level:M,settings:O,elapsed:R,analyticsTime:s,tutorialVisible:ae,tutorialElapsed:q,selectedStackId:V,stored:Y,serial:++m},Fe(),p=d.enter(ie),M=ie,R=0,s=0,U=!1,_(p.snapshot()),et(),Ms(r,"wt_challenge_started",M.id,x.contentVersion,"challenge"),!0)}finally{g=!1}}async function ve(){if(!v||g||Oe||G)return!1;g=!0;try{const C=await S.read(),L=JSON.stringify(C)!==v.stored;let Y,ie;if(L&&C){const Xe=x.levels.find(bt=>bt.id===C.selectedLevelId);if(Xe){ie=await kn(x,Xe.id,fetch,w.signal);const bt=ts(qi(C,x,ie),x,new Map([[Xe.id,ie]]));bt.ok&&(Y=bt.value)}}else L&&(ie=await kn(x,x.levels[0].id,fetch,w.signal));if(G)return!1;const _e=v;return Fe(),p=d.leave(),v=void 0,M=_e.level,O=_e.settings,R=_e.elapsed,s=_e.analyticsTime,ae=_e.tutorialVisible,q=_e.tutorialElapsed,V=_e.selectedStackId,L&&(y=!0,te="Another tab saved newer progress. Reload to continue from that save.",Y&&ie?(M=ie,O=$n(Y.settings),Se=Y.unlockedLevel,p.loadLevel(M),p.restoreCompleted(Y.completedLevelIds),p.restoreAttempt(Y.committedState,Y.history),l(!1,!0)):!C&&ie&&(M=ie,O=me,Se=1,p.loadLevel(M),p.restoreCompleted([]),l(!1))),i?.configure(O),U=!1,_(p.snapshot()),et(),!0}finally{g=!1}}le();const oe=(t.catalogReady??vc()).then(async C=>{if(G)return;x=C,await S.ready;const L=await S.read();let Y=qi(L,x);const ie=Y&&typeof Y=="object"&&"selectedLevelId"in Y&&typeof Y.selectedLevelId=="string"?Y.selectedLevelId:x.levels[0]?.id,_e=x.levels.some(ft=>ft.id===ie)?x.levels.find(ft=>ft.id===ie):x.levels[0];if(!_e)throw new Error("Catalog has no starting level.");if(M=await kn(x,_e.id),G)return;if(Y=qi(L,x,M),_(p.loadLevel(M)),Y!==void 0){const ft=ts(Y,x,new Map([[M.id,M]]));if(ft.ok)Se=ft.value.unlockedLevel,O=$n(ft.value.settings),Y!==L&&Y.committedState!==L?.committedState&&(te=O.language==="ru"?"Уровень обновлён. Попытка начата заново; прогресс и настройки сохранены.":"Level updated. This attempt was restarted; campaign progress and settings are preserved."),p.restoreCompleted(ft.value.completedLevelIds),p.restoreAttempt(ft.value.committedState,ft.value.history);else if(te=O.language==="ru"?`Сохранение не восстановлено: ${ft.reason}`:`Save could not be restored: ${ft.reason}`,typeof Y=="object"&&Y!==null&&!Array.isArray(Y)){const $t=Y;O=$n($t.settings);const xs=Array.isArray($t.completedLevelIds)?$t.completedLevelIds.filter(Oi=>typeof Oi=="string"&&x.levels.some(Bi=>Bi.id===Oi)):[];p.restoreCompleted(xs),Number.isSafeInteger($t.unlockedLevel)&&$t.unlockedLevel>=1&&$t.unlockedLevel<=x.levels.length+1&&(Se=$t.unlockedLevel)}}_(p.snapshot()),(Y===void 0||Y!==L||Y?.settings?.rendererMode!==void 0)&&We(),(O.tutorialCompleted||p.snapshot().committedState?.moveCount)&&(ae=!1,O.tutorialCompleted||(St(),We())),et(p.snapshot());let Xe,bt;try{bt=await Promise.race([Ue.solve(M,p.snapshot().committedState,{requestId:"startup-warmup",generationId:0,budgetMs:0}),new Promise((ft,$t)=>{Xe=setTimeout(()=>$t(new Error("Hint worker startup timed out.")),15e3)})])}finally{clearTimeout(Xe)}if(bt.status==="error")throw new Error("Could not prepare hint worker.");return l(!0,Y!==void 0),M});return Object.freeze({ready:oe,startAnalytics:l,previewChallenge:He,startChallenge:z,leaveChallenge:ve,challengeDescriptor:()=>x&&Du(x,p.snapshot().level?.id),trackChallenge(C){const L=p.snapshot();Ms(r,C,M?.id??"",x?.contentVersion??"",v?"challenge":"campaign",C==="wt_challenge_share_shown"?`${C}:${v?.serial??0}:${L.attemptId}`:void 0)},resourceReady:()=>f.ready??Promise.resolve(),contentVersion:()=>x?.contentVersion,get canvas(){return u},rendererInfo(){return Object.freeze({mode:h.mode,supported:h.supported&&!Le,artwork:f.artworkStatus?.(),message:Le?"Восстанавливаем графику Three.js…":h.message})},setRendererMode:se,selectableStacks:A,selectedStackId(){return V},pointForStack:he,selectStack:J,launchStack:re,toggleMenu:de,update(C){if(Le||!h.supported)return;R+=C,(p.snapshot().phase==="Idle"||p.snapshot().phase==="Animating")&&(s+=C);const L=H.update(C);f.setPresentationTime?.(R,O.reducedMotion);const Y=p.snapshot();Y.phase==="Animating"?W(b.update(C).stacks):(L&&_(Y),Y.phase==="Idle"&&Y.level?.id==="level-001"&&!O.tutorialCompleted&&(q+=C,q>=2&&!ae&&(ae=!0,o("wt_tutorial_shown")))),ce>0&&(ce=Math.max(0,ce-C),ce||(be=Object.freeze({kind:"idle"})))},pause(C){Q=C,H.synchronize(P),b.pause(C),C&&(Ge.cancel(),Ke(),ae=!1)},render(C){Le||(!Q&&C!==void 0&&(P=H.snapshot(C)),P&&f.setProjection?.(P),f.render())},resize(C){f.resize(C)},reset(){if(g||Oe)return;R=0,U=!1,b.reset(),P&&H.reset(P),Ge.cancel(),q=0,ae=!1,Ke();const C=p.snapshot();if(C.phase==="Animating"&&p.finishAnimation(C.generationId),M){const L=p.restart();_(L),We(),et(L),L.attemptId!==C.attemptId&&(o("wt_restart"),l(),i?.play("restart"))}},async setLevelById(C){return fe(C)},async selectLevel(C){return Pe(C)},updateSettings:xe,async clearProgress(){return ge()},async exportProgress(){if(v||g||Oe)throw new Error("Return to your campaign first.");await T;const C=await S.read();if(!C)throw new Error("No saved progress to export.");return JSON.stringify(C,null,2)},async importProgress(C){if(G||v||g||Oe||y||!x||p.snapshot().phase==="Animating")return!1;const L=qi(C,x);if(!L||typeof L!="object"||typeof L.selectedLevelId!="string")return!1;const Y=await kn(x,L.selectedLevelId),ie=qi(C,x,Y),_e=ts(ie,x,new Map([[Y.id,Y]]));return!_e.ok||G?!1:(Z++,ue?.abort(),b.reset(),Ge.cancel(),Ke(),M=Y,Se=_e.value.unlockedLevel,O=$n(_e.value.settings),te=ie!==C&&ie.committedState!==C?.committedState?O.language==="ru"?"Уровень обновлён. Попытка начата заново; прогресс и настройки сохранены.":"Level updated. This attempt was restarted; campaign progress and settings are preserved.":"",p.loadLevel(Y),p.restoreCompleted(_e.value.completedLevelIds),p.restoreAttempt(_e.value.committedState,_e.value.history),i?.configure(O),l(!1),o("wt_progress_imported"),_(p.snapshot()),T=S.write({..._e.value,settings:O},{replace:!0}),await T,!0)},async nextLevel(){return Ie()},debugLoadLevel(C){const L=mc(C);if(!L.ok)throw new Error(`Invalid debug level: ${L.errors.map(ie=>ie.message).join(" ")}`);M=L.value,Ge.cancel(),Ke(),q=0,ae=!1,U=!1,b.reset();const Y=p.loadLevel(M);return _(Y),et(Y),Y},setTowerDemo(C){if(!M)return!1;U=!0;const L=p.snapshot();if(L.level&&L.committedState){const Y=L.committedState.stacks[0];if(Y){D++;const ie={...L.committedState,stacks:[{...Y,height:Math.max(1,Math.min(C??M.totalTiles,M.totalTiles))}]};P=ln(L.level,ie.stacks),H.reset(P),f.setView(_r(L.level,ie,D,void 0,ie.stacks,P))}}return!0},snapshot(){const C=p.snapshot(),L=x?.levels.findIndex(_e=>_e.id===C.level?.id)??-1,Y=C.level?new Map(C.level.cells.filter(_e=>_e.kind==="redirect").map(_e=>[`${_e.u},${_e.v}`,_e.direction])):new Map,ie=C.level&&C.committedState?C.committedState.stacks.filter(_e=>!!_e.launchDirection||Y.has(`${_e.u},${_e.v}`)).map(_e=>({stack:_e,direction:Y.get(`${_e.u},${_e.v}`)??_e.launchDirection??"unknown"})):[];return{elapsed:R,loaded:!!M,levelId:M?.id??null,...C,challengeMode:!!v,challengeBusy:g,helpBusy:Oe,selectedStackId:V,hintStackId:j,activeStacks:ie,levelNumber:L>=0?L+1:1,levelCount:x?.levels.length??0,unlockedLevel:Se,settings:O,tutorialVisible:ae&&C.phase==="Idle",hintView:be,persistence:{memoryOnly:S.memoryOnly(),recoveryNotice:te}}},presentationSnapshot(){return b.snapshot()},cameraProjection(){return P},foundationScreenBounds(){if(!M||!P)return;const C=Sc(M,[]),L=P,Y=Yr({x:L.originX+C.minX*L.scale,y:L.originY+C.minY*L.scale}),ie=Yr({x:L.originX+C.maxX*L.scale,y:L.originY+C.maxY*L.scale});return{left:Y.x,top:Y.y,right:ie.x,bottom:ie.y}},resourceCounts(){return f.resourceCounts()},pickStack(C){const L=p.snapshot();if(L.phase!=="Idle"||!L.level||!L.displayedState)return;const Y=f.pickStack(C,_r(L.level,L.displayedState,D,V,L.displayedState.stacks,P));return Y&&A(L).some(ie=>ie.id===Y)?Y:void 0},debugLaunch(C){Ge.cancel(),Ke();const L=p.launch(C);return L.phase==="Animating"?(i?.play("launch"),St(),We(),I(L)):_(L),L},debugFinishAnimation(C){b.reset();const L=p.finishAnimation(C);return _(L),c(L),We(),et(L),L},requestHint:k,undo(){return g||Oe||Le||!h.supported||!p.snapshot().canUndo||t.help&&!["Idle","Won"].includes(p.snapshot().phase)?p.snapshot():t.help?(lt("undo",p.snapshot(),()=>pe()),p.snapshot()):pe()},persistenceInfo(){return Object.freeze({mode:S.mode(),memoryOnly:S.memoryOnly(),reason:S.unavailableReason(),recoveryNotice:S.conflicted?.()?S.unavailableReason():te})},flushPersistence(){return S.flush()},dispose(){G||(G=!0,w.abort(),Z++,ue?.abort(),Ke(),Ge.dispose(),Ue.dispose(),b.dispose(),d.dispose(),f.dispose())}});function pe(){Ge.cancel(),Ke();const C=p.undo();return o("wt_undo"),i?.play("undo"),C.phase==="Animating"?I(C):(_(C),et(C)),We(),C}}const Sv={challengeFriends:new URL("/White-Tower-Play/telegram/assets/12762149108b751ff432e30e1a92ffe78d490ee8ecdeb5b284314f256c22cd4a-CUoSaCoO.webp",import.meta.url).href,challengeWarning:new URL("/White-Tower-Play/telegram/assets/04b8ea77bf7d0effa0314861ccb896c78c6b0d5d30e2dfffcdb1157b07c01ba4-DLtiS1pS.webp",import.meta.url).href,logo:new URL("/White-Tower-Play/telegram/assets/355affb8c11cbb90975c14eb6c2192e6f34e46913a1e0c5e55ab20be8d6119cc-BPHyFsGU.webp",import.meta.url).href,campaignTower:new URL("/White-Tower-Play/telegram/assets/d6389becbf587108e4995d85529b8012cdf9e625d02c9fb18c2d08a774cca5f7-BE4OdW_V.webp",import.meta.url).href,reset:new URL("/White-Tower-Play/telegram/assets/78d87d2be35eb6a94cec4854b5c9b10c257ae22f9a137880e98d2b6b6ecf9769-DJKPyP_H.webp",import.meta.url).href,storage:new URL("/White-Tower-Play/telegram/assets/6c1235bb2dcf98a276996de08fecf8785802acc28ab984510e5351dad6eb3ddd-D5Yi741C.webp",import.meta.url).href,loading:new URL("/White-Tower-Play/telegram/assets/87741b2bb30ade096ea6a0dcfc8280924f18cc5558f77145767c19ab80735c55-DIgfvB0J.webp",import.meta.url).href,graphics:new URL("/White-Tower-Play/telegram/assets/f159b239eb9cb99c770be2f36d5b675574cb0737bb439d7987926b805affaa5b-vPy0jOxz.webp",import.meta.url).href};function An(n,e){const t=document.createElement("img");return t.src=Sv[n],t.className=e,t.alt="",n!=="logo"&&n!=="loading"&&(t.loading="lazy"),t.draggable=!1,t.setAttribute("aria-hidden","true"),t}const Mv=new URL("/White-Tower-Play/telegram/assets/d1f2d542aae4d205009fe3352a532efe0034f324095a4f15af2baf6647732ca7-CgvJqy-V.webp",import.meta.url).href;function yv(n,e){const t=document.createElement("section");t.className="victory-layer",t.setAttribute("aria-label","Level completed"),t.innerHTML=`
    <div class="victory-shade" aria-hidden="true"></div>
    <div class="victory-ribbon" aria-live="polite"><span>LEVEL</span><span>COMPLETED!</span></div>
    <p class="campaign-end" role="status"></p>`,n.append(t),t.append(An("campaignTower","campaign-tower"));const i=document.createElement("button");i.type="button",i.className="next-button",i.setAttribute("aria-label","Next level"),i.innerHTML="<span>NEXT</span>",n.append(i);const r=document.createElement("button");r.type="button",r.className="next-button victory-choose",r.addEventListener("click",e.chooseLevels),n.append(r);const s=document.createElement("button");s.type="button",s.className="victory-undo",s.setAttribute("aria-label","Undo last move"),s.innerHTML="<span>BACK</span>",n.append(s);const a=document.createElement("button");a.type="button",a.className="challenge-share",a.textContent="Challenge a friend",a.hidden=!0;const o=document.createElement("span");o.textContent=a.textContent,a.replaceChildren(An("challengeFriends","challenge-friends-icon"),o);const l=()=>e.share?.();a.addEventListener("click",l),n.append(a);const c=t.querySelector(".campaign-end");s.addEventListener("click",e.undo);let u=!1,h=!1,f="";const d=()=>u||h?e.retry():e.next();i.addEventListener("click",d);let p=-1,v=0,m=!1,g="",y="en",w=-1;function S(b,I,x=!1,M="",R=!1,D=!1,P=!1){h=!!b.challengeMode,n.classList.toggle("is-challenge",h),h?i.style.setProperty("background",`transparent url("${Mv}") center / 100% 100% no-repeat`,"important"):i.style.removeProperty("background"),u=D&&b.phase==="Idle";const F=u?"Failed":b.phase;(F!==g||b.generationId!==p)&&(g=F,p=b.generationId,v=0,m=!1),(b.phase==="Won"||u)&&!m&&(v+=Math.max(0,Math.min(I,.1)),v*1e3>=(u?dc.failureDelayMs:dc.victoryDelayMs)&&(m=!0,u&&w!==p&&(w=p,e.failure?.())));const N=(b.phase==="Won"||u)&&m;n.parentElement?.classList.toggle("is-failed",N&&u),t.classList.toggle("is-failed",u),i.classList.toggle("is-failed",u),n.parentElement?.classList.toggle("is-campaign-complete",N&&R),t.classList.toggle("is-campaign-complete",R),t.classList.toggle("has-load-error",!!M),t.lang=y,t.setAttribute("aria-label",u?y==="ru"?"Нет доступных ходов":"No available moves":R?y==="ru"?"Кампания пройдена":"Campaign complete":y==="ru"?"Уровень пройден":"Level completed"),i.setAttribute("aria-label",u||M?Ze(y,"action.retry"):y==="ru"?"Следующий уровень":"Next level"),h&&!u&&i.setAttribute("aria-label","Play again"),r.setAttribute("aria-label",Ze(y,"chooseLevel")),s.setAttribute("aria-label",y==="ru"?"Отменить последний ход":"Undo last move"),t.querySelector(".victory-ribbon span").textContent=u||R?"":y==="en"?"LEVEL":"УРОВЕНЬ";const H=t.querySelector(".victory-ribbon span:last-child");H.textContent=u?gv(y,"fail"):R?y==="ru"?"Кампания пройдена!":"Campaign complete!":Ze(y,"win"),t.style.setProperty("--failure-title-size",`${Math.min(15,63/Math.max(1,H.textContent.length))}cqw`),i.querySelector("span").textContent=x?"…":u||M?Ze(y,"action.retry"):Ze(y,"next"),h&&!u&&(i.querySelector("span").textContent="Play again"),i.classList.toggle("has-load-error",!!M),i.classList.toggle("is-pending",x),r.textContent=Ze(y,"chooseLevel"),s.querySelector("span").textContent=Ze(y,"undo"),t.classList.toggle("is-visible",N),t.setAttribute("aria-hidden",String(!N)),i.hidden=!N,r.hidden=!N||!R&&!M,r.classList.toggle("error-choose",!R&&!!M),i.hidden=!N||R,s.hidden=!N,i.disabled=x||b.phase!=="Won"&&!u,s.disabled=!b.canUndo||b.phase!=="Won"&&!u,c.textContent=R?"All levels completed!":M,a.hidden=!N||u||!e.share,a.disabled=!!b.challengeBusy||x;const Q=`${h}:${b.attemptId}`;!a.hidden&&f!==Q&&(f=Q,e.shareShown?.())}function T(){s.removeEventListener("click",e.undo),i.removeEventListener("click",d),r.removeEventListener("click",e.chooseLevels),t.remove(),r.remove(),i.remove(),s.remove(),a.removeEventListener("click",l),a.remove()}return Object.freeze({update:S,setLanguage(b){y=b},dispose:T})}const hc={lock:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10V7a5 5 0 0 1 10 0v3" fill="none" stroke="#99601d" stroke-width="4"/><path d="M7 9V7a5 5 0 0 1 10 0v2" fill="none" stroke="#ffe9a1" stroke-width="2.5"/><rect x="3" y="9" width="18" height="13" rx="4" fill="#b77b26"/><rect x="3" y="8" width="18" height="12" rx="4" fill="#ffd05e" stroke="#fff0ab"/><path d="M6 11h12" stroke="#fff3c1" stroke-width="2" stroke-linecap="round"/><path d="M12 13v4" stroke="#885014" stroke-width="3" stroke-linecap="round"/></svg>',completed:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 13 5 5L20 6" fill="none" stroke="#806a36" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="m4 11 5 5L20 4" fill="none" stroke="#fff7d9" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>'};function Ev(n,e){const t=document.createElement("h3");t.id="level-select-title";const i=document.createElement("div");i.className="level-grid";const r=document.createElement("p");r.className="level-progress";const s=document.createElement("nav");s.className="level-pagination";const a=document.createElement("button");a.type="button",a.textContent="‹";const o=document.createElement("button");o.type="button",o.textContent="›";const l=document.createElement("span");l.setAttribute("role","status"),s.append(a,l,o);const c=document.createElement("button");c.type="button",c.className="menu-secondary",c.addEventListener("click",e.back),n.append(t,r,i,s,c);let u="en",h=[],f=1,d=[],p="",v="",m=0;a.addEventListener("click",()=>{m=Math.max(0,m-1),g(),(a.disabled?o:a).focus()}),o.addEventListener("click",()=>{m=Math.min(Math.max(0,Math.ceil(h.length/30)-1),m+1),g(),(o.disabled?a:o).focus()});function g(){t.textContent=Ze(u,"levels"),c.textContent=Ze(u,"backSettings"),i.replaceChildren(),r.textContent=u==="ru"?`${d.length} из ${h.length} пройдено`:`${d.length} of ${h.length} completed`,a.setAttribute("aria-label",u==="ru"?"Предыдущая страница уровней":"Previous levels page"),o.setAttribute("aria-label",u==="ru"?"Следующая страница уровней":"Next levels page"),a.disabled=m===0,o.disabled=(m+1)*30>=h.length,l.textContent=`${m*30+1}–${Math.min((m+1)*30,h.length)} / ${h.length}`;for(const y of h.slice(m*30,(m+1)*30)){const w=y.index<=f,S=d.includes(y.id),T=document.createElement("button");T.type="button",T.className="level-card",T.disabled=!w,T.setAttribute("aria-label",`${Ze(u,"level")} ${y.index}${w?S?`, ${Ze(u,"completed")}`:"":`, ${Ze(u,"locked")}`}`),S&&T.classList.add("is-completed"),y.id===p&&T.classList.add("is-selected"),T.setAttribute("data-level",String(y.index));const b=document.createElement("span");b.className="level-number",b.textContent=String(y.index);const I=document.createElement("span");I.className="level-badge",I.setAttribute("aria-hidden","true"),I.innerHTML=S?hc.completed:w?"":hc.lock,T.append(b,I),T.addEventListener("click",()=>{w&&e.select(y.id)}),i.append(T)}}return Object.freeze({update(y){const w=JSON.stringify(y);if(w!==v){if(y.selectedLevelId!==p){const S=y.choices.findIndex(T=>T.id===y.selectedLevelId);m=Math.floor(Math.max(0,S)/30)}v=w,u=y.language,h=y.choices,f=y.unlockedLevel,d=y.completed,p=y.selectedLevelId,g()}},render:g})}function bv(n,e){const t=document.createElement("section");t.className="settings-panel",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-labelledby","settings-title"),t.tabIndex=-1;const i=document.createElement("div");i.className="settings-card";const r=document.createElement("div");r.className="settings-page";const s=document.createElement("h2");s.id="settings-title";const a=document.createElement("p");a.className="settings-status",a.setAttribute("role","status");const o=document.createElement("div");o.className="settings-controls";const l=document.createElement("label");l.className="setting-row";const c=document.createElement("span");l.append(c);const u=document.createElement("input");u.type="checkbox",l.append(u);const h=document.createElement("label");h.className="setting-row setting-music";const f=document.createElement("span");h.append(f);const d=document.createElement("input");d.type="checkbox",h.append(d);const p=document.createElement("label");p.className="setting-row volume-row";const v=document.createElement("span");p.append(v);const m=document.createElement("input");m.type="range",m.min="0",m.max="1",m.step="0.05",p.append(m);const g=document.createElement("output");g.className="volume-value",p.append(g);const y=document.createElement("button");y.type="button",y.className="menu-secondary";const w=document.createElement("button");w.type="button",w.className="menu-secondary";const S=document.createElement("button");S.type="button",S.className="settings-close",l.classList.add("setting-sound"),p.classList.add("setting-volume"),y.classList.add("settings-levels"),w.classList.add("settings-hint"),o.append(l,h,p,y,w,S),r.append(s,a,o);const T=document.createElement("div");T.className="level-select-page",T.hidden=!0,i.append(r,T),t.append(i),n.append(t),t.prepend(An("logo","menu-logo"));const b=document.createElement("button");b.type="button",b.className="storage-dismiss",b.addEventListener("click",e.close),t.append(b),t.dataset.page="settings";const I=An("storage","storage-icon");a.before(I);const x=Ev(T,{select:e.selectLevel,back(){e.navigate?.(),t.dataset.page="settings",t.setAttribute("aria-labelledby","settings-title"),T.hidden=!0,r.hidden=!1,e.motion.reveal(i),S.focus()}});let M;function R(){return[...t.querySelectorAll("button:not([disabled]):not([hidden]), select:not([disabled]):not([hidden]), input:not([disabled]):not([hidden])")].filter(U=>U.offsetParent!==null&&!U.closest("[inert]"))}function D(U){if(!t.classList.contains("is-visible"))return;if(U.key==="Escape"){U.preventDefault(),U.stopPropagation(),e.close();return}if(U.key!=="Tab")return;const V=R();if(!V.length){U.preventDefault(),t.focus();return}const ee=V[0],te=V.at(-1);U.shiftKey&&(document.activeElement===ee||!t.contains(document.activeElement))?(U.preventDefault(),te.focus()):!U.shiftKey&&(document.activeElement===te||!t.contains(document.activeElement))&&(U.preventDefault(),ee.focus())}function P(U){M=U;const{settings:V}=U,ee=V.language;t.lang=ee,t.dir="ltr",s.textContent=Ze(ee,"settings"),b.setAttribute("aria-label",ee==="ru"?"Закрыть настройки":"Close settings"),t.classList.toggle("has-storage-notice",U.memoryOnly||!!U.recoveryNotice),I.hidden=!U.memoryOnly&&!U.recoveryNotice,p.dataset.original=String(Math.round(V.soundVolume*100)===40),u.checked=V.soundEnabled,m.value=String(V.soundVolume),g.value=`${Math.round(V.soundVolume*100)}%`,c.textContent=Ze(ee,"sound"),u.setAttribute("aria-label",Ze(ee,"sound")),d.checked=V.musicEnabled,f.textContent=Ze(ee,"music"),d.setAttribute("aria-label",Ze(ee,"music")),v.textContent=Ze(ee,"volume"),m.setAttribute("aria-label",Ze(ee,"volume")),y.textContent=Ze(ee,"levels"),y.hidden=!!U.challengeMode,y.title=`${U.unlockedLevel}/${U.choices.length} levels unlocked`,w.textContent=Ze(ee,"hint"),w.disabled=!U.canHint,S.textContent=Ze(ee,"back"),a.textContent=U.memoryOnly?ee==="ru"?"Хранилище браузера недоступно":"Browser storage is unavailable":U.recoveryNotice?ee==="ru"?"Сохранение не восстановлено.":"The save could not be restored.":"",a.title=U.recoveryNotice,a.classList.toggle("is-warning",U.memoryOnly||!!U.recoveryNotice);let te=a.nextElementSibling instanceof HTMLButtonElement&&a.nextElementSibling.classList.contains("storage-retry")?a.nextElementSibling:null;te||(te=document.createElement("button"),te.type="button",te.className="storage-retry menu-secondary",te.addEventListener("click",e.retry),a.after(te)),te.textContent=Ze(ee,"retry"),te.hidden=!U.memoryOnly&&!U.recoveryNotice,x.update({language:ee,choices:U.choices,unlockedLevel:U.unlockedLevel,completed:U.completed,selectedLevelId:U.selectedLevelId})}function F(U){if(!M)return;const V=Object.freeze({...M.settings,...U});M=Object.freeze({...M,settings:V}),e.update(V)}u.addEventListener("change",()=>F({soundEnabled:u.checked})),d.addEventListener("change",()=>F({musicEnabled:d.checked})),m.addEventListener("input",()=>{g.value=`${Math.round(Number(m.value)*100)}%`,p.dataset.original=String(Math.round(Number(m.value)*100)===40),F({soundVolume:Number(m.value)})}),m.addEventListener("change",()=>F({soundVolume:Number(m.value)})),y.addEventListener("click",()=>{e.navigate?.(),t.dataset.page="levels",t.setAttribute("aria-labelledby","level-select-title"),r.hidden=!0,T.hidden=!1,x.render(),e.motion.reveal(i),R()[0]?.focus()}),w.addEventListener("click",e.hint),S.addEventListener("click",e.close),t.addEventListener("keydown",D);function N(){t.dataset.page="settings",t.setAttribute("aria-labelledby","settings-title"),t.inert=!1,t.classList.add("is-visible"),e.motion.reveal(t),t.setAttribute("aria-hidden","false"),r.hidden=!1,T.hidden=!0,S.hidden=!1,u.focus(),i.scrollTop=0}function H(){t.setAttribute("aria-hidden","true"),t.inert=!0,t.classList.remove("is-visible"),e.motion.hide(t,()=>t.removeAttribute("data-ui-leaving"))}function Q(){t.dataset.page="levels",t.setAttribute("aria-labelledby","level-select-title"),r.hidden=!0,T.hidden=!1,x.render(),e.motion.reveal(i),R()[0]?.focus()}function G(){e.motion.cancel(t),e.motion.cancel(i),t.removeEventListener("keydown",D),t.remove()}return Object.freeze({update:P,open:N,close:H,showLevels:Q,dispose:G,isVisible:()=>t.classList.contains("is-visible")})}function Tv(n,e){const t=document.createElement("p");t.className="hint-toast",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.hidden=!0,n.append(t);function i(r,s){const o={idle:"",searching:"searching",move:"tapHighlighted","undo-proven":"hint.undo","undo-suggestion":"hintTimeout",deadlock:"game.stuck",timeout:"hintTimeout",error:"hintTimeout"}[r.kind];t.textContent=o?Ze(s,o):"",o&&t.hidden&&e?.reveal(t),t.hidden=!o,t.dataset.kind=r.kind,t.lang=s}return Object.freeze({update:i,dispose(){e?.cancel(t),t.remove()}})}function wv(n,e){const t=document.createElement("p");t.className="tutorial-tip",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.hidden=!0,n.append(t);function i(r,s){t.textContent=r?Ze(s,"tutorial.tap"):"",r&&t.hidden&&e?.reveal(t),t.hidden=!r,t.lang=s}return Object.freeze({update:i,dispose(){e?.cancel(t),t.remove()}})}function Av(n){const{level:e,state:t,levelNumber:i,selectedStackId:r,activeStacks:s}=n,a=Math.max(0,...t.stacks.map(u=>Math.floor(u.height))),o=a<2?0:a,l=`Level ${i}. ${o} of ${e.totalTiles} tiles gathered.`,c=s.length===0?"No active arrows.":s.map(({stack:u,direction:h},f)=>`${u.id===r?"Selected arrow":"Arrow"} ${f+1}: coordinates ${u.u}, ${u.v}, height ${u.height}, direction ${h}.`).join(" ");return`${l} ${c}`}function Cv(n,e,t,i){return Ze(n,e==="selection"?"a11y.selection":e==="move"?"a11y.move":e==="undo"?"a11y.undo":e==="restart"?"a11y.restart":"a11y.menu").replace("{index}",String(t??"")).replace("{count}",String(i??""))}function Rv(n){const e=document.createElement("p");e.id="board-description",e.className="visually-hidden",n.append(e);const t=n.querySelector("canvas");t?.setAttribute("aria-describedby",e.id);let i="";return Object.freeze({update(r){const s=Av(r);s!==i&&(i=s,e.textContent=s)},dispose(){t?.removeAttribute("aria-describedby"),e.remove()}})}const da={settings:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M20 4h8l1.3 5.1a16 16 0 0 1 3.2 1.3l4.7-2.3 5.7 5.7-2.3 4.7a16 16 0 0 1 1.3 3.2L47 27v8l-5.1 1.3a16 16 0 0 1-1.3 3.2l2.3 4.7-5.7 5.7-4.7-2.3a16 16 0 0 1-3.2 1.3L28 54h-8l-1.3-5.1a16 16 0 0 1-3.2-1.3l-4.7 2.3-5.7-5.7 2.3-4.7a16 16 0 0 1-1.3-3.2L1 35v-8l5.1-1.3a16 16 0 0 1 1.3-3.2l-2.3-4.7 5.7-5.7 4.7 2.3a16 16 0 0 1 3.2-1.3z" transform="translate(1 -5) scale(.85)"/><circle cx="24" cy="24" r="7" class="icon-cutout"/></svg>',restart:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M39 18A16 16 0 0 0 11 12l-4 4m0 0V6m0 10h10M9 30a16 16 0 0 0 28 6l4-4m0 0v10m0-10H31"/></svg>',undo:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M19 13 8 23l11 10M9 23h19a12 12 0 0 1 0 24h-5"/></svg>'};function qr(n,e,t){const i=document.createElement("button");return i.type="button",i.className=t,i.setAttribute("aria-label",n),i.innerHTML=e,i}function Lv(n){const{root:e}=n,t=An("logo","game-logo"),i=qr("Hint","<span>?</span>","hud-hint");i.addEventListener("click",n.onHint);const r=qr("Settings",da.settings,"hud-icon settings-button"),s=qr("Restart level",da.restart,"hud-icon restart-button"),a=document.createElement("div");a.className="hud-counter",a.setAttribute("role","status"),a.setAttribute("aria-live","polite");const o=document.createElement("div");o.className="hud-level";const l=qr("Undo last move",da.undo+"<span>BACK</span>","hud-undo");e.append(t,r,s,a,o,l,i);const c=bv(e,{motion:n.motion,close:n.onMenu,update:n.onSettings,selectLevel:n.onSelectLevel,clearProgress:n.onClearProgress,retry:n.onRetry,hint:n.onHint,exportProgress:n.onExportProgress,importProgress:n.onImportProgress,navigate:()=>n.onMenuNavigate?.()});let u=!1;const h=yv(e,{undo:n.onUndo,next:()=>{T()},retry:n.onReset,chooseLevels:()=>{u=!0,n.onChooseLevels()},failure:()=>n.onFailure?.(),...n.onShareChallenge?{share:n.onShareChallenge}:{},...n.onShareChallengeShown?{shareShown:n.onShareChallengeShown}:{}}),f=Tv(e,n.motion),d=wv(e,n.motion),p=Rv(e.parentElement??e);let v=!1,m=!1,g="",y="",w="",S="";async function T(){if(!m){m=!0,g="";try{const M=await n.onNext();M.advanced||(g=M.message??Ze(n.getSettings().language,"service.moreLevels"))}catch{g=Ze(n.getSettings().language,"service.nextError")}finally{m=!1}}}const b=()=>{r.focus(),n.onMenu()};r.addEventListener("click",b),s.addEventListener("click",n.onReset),l.addEventListener("click",n.onUndo);function I(M,R,D){const P=M.phase==="Idle"||M.phase==="Won",F=M.phase==="Menu",N=M.phase==="Animating"&&R.active?R.stacks:M.displayedState?.stacks??M.committedState?.stacks??[],H=Math.max(0,...N.map(me=>Math.floor(me.height))),Q=H<2?0:H,G=`${Q}/${M.level?.totalTiles??0}`,U=M.settings?.language??n.getSettings().language;e.lang=U,e.parentElement.dataset.screen=Pv(M),i.textContent=Ze(U,"hint"),i.setAttribute("aria-label",Ze(U,"hint")),i.disabled=M.phase!=="Idle"||!!M.helpBusy,i.hidden=M.phase==="Won"||F,r.setAttribute("aria-label",U==="ru"?"Настройки":"Settings"),s.setAttribute("aria-label",U==="ru"?"Перезапустить уровень":"Restart level"),l.setAttribute("aria-label",U==="ru"?"Отменить ход":"Undo last move");const V=M.level?`${U==="ru"?"Уровень":"Level"} ${M.levelNumber??1}`:U==="ru"?"Уровень":"Level";e.dataset.tutorialOriginal=String(U==="ru"&&(M.levelNumber??1)===1&&G==="0/4"),(y!==G||w!==U)&&(w=U,y=G,a.textContent=G,a.setAttribute("aria-label",U==="ru"?`Собрано ${Q} из ${M.level?.totalTiles??0} плиток`:`${Q} of ${M.level?.totalTiles??0} tiles gathered`)),S!==V&&(S=V,o.textContent=V);const ee=M.phase==="Won";e.parentElement?.classList.toggle("is-won",ee);for(const me of[a,o,l])me.classList.toggle("is-hidden",ee);s.disabled=!P||!!M.helpBusy,l.disabled=!P||!M.canUndo||!!M.helpBusy,r.disabled=!!M.helpBusy||!["Idle","Won","Menu"].includes(M.phase);const te=n.getHelpBalance?.();if(e.toggleAttribute("data-account-help",!!te),te){i.style.setProperty("background",`transparent url("${new URL("/White-Tower-Play/telegram/assets/78914649143ccb104eb5b66294ea3f1a89092f9fcce7a603726b8c1ee2f61067-ChzTGM5V.webp",import.meta.url).href}") center / 100% 100% no-repeat`,"important");const me=te.free.hint?te.free.hint+" free":te.paid.hint?te.paid.hint+" paid":te.prices.hint+" Stars",O=te.free.undo?te.free.undo+" free":te.paid.undo?te.paid.undo+" paid":te.prices.undo+" Stars";i.textContent="Hint · "+me,i.setAttribute("aria-label","Hint: "+me),l.querySelector("span").textContent="BACK · "+O,l.setAttribute("aria-label","Undo: "+O)}M.settings&&h.setLanguage(M.settings.language);const Z=M.settings??n.getSettings();e.parentElement?.classList.toggle("high-contrast",!!Z.highContrast),e.parentElement?.classList.toggle("reduced-motion",!!Z.reducedMotion),M.level&&M.committedState&&p.update({level:M.level,state:M.committedState,levelNumber:M.levelNumber??1,language:U,...M.selectedStackId?{selectedStackId:M.selectedStackId}:{},activeStacks:M.activeStacks??[]}),f.update(M.hintView??{kind:"idle"},U),d.update(!!M.tutorialVisible,U);const ue=M.persistence??{memoryOnly:!1,recoveryNotice:""};c.update({settings:Z,choices:Array.from({length:M.levelCount??0},(me,O)=>({id:`level-${String(O+1).padStart(3,"0")}`,index:O+1})),unlockedLevel:M.unlockedLevel??1,completed:M.completedLevelIds,selectedLevelId:M.level?.id??"",memoryOnly:ue.memoryOnly,recoveryNotice:ue.recoveryNotice,canHint:M.phase==="Menu"&&M.menuReturn==="Idle",challengeMode:!!M.challengeMode}),F&&!v?(c.open(),u&&(c.showLevels(),u=!1)):!F&&v&&(c.close(),r.focus()),v=F;const Le=ee&&!M.challengeMode&&!!M.levelCount&&M.levelNumber===M.levelCount,Se=M.phase==="Idle"&&(M.committedState?.stacks.length??0)>1&&M.activeStacks?.length===0;h.update(M,D,m,g,Le,Se,Z.reducedMotion)}function x(){r.removeEventListener("click",b),s.removeEventListener("click",n.onReset),l.removeEventListener("click",n.onUndo),h.dispose(),c.dispose(),f.dispose(),d.dispose(),p.dispose(),i.removeEventListener("click",n.onHint),r.remove(),s.remove(),a.remove(),o.remove(),l.remove(),i.remove(),t.remove()}return Object.freeze({update:I,dispose:x})}function Pv(n){return n.phase==="Won"?!n.challengeMode&&n.levelNumber===n.levelCount?"campaign":"victory":n.tutorialVisible?"tutorial":n.hintView?.kind==="move"?"hint":"gameplay"}const lo=Object.freeze({ui:Object.freeze({startHz:620,endHz:540,durationMs:34,waveform:"sine",gain:.16}),launch:Object.freeze({startHz:300,endHz:365,durationMs:72,waveform:"triangle",gain:.18}),merge:Object.freeze({startHz:540,endHz:880,durationMs:115,waveform:"sine",gain:.22}),settle:Object.freeze({startHz:230,endHz:105,durationMs:190,waveform:"triangle",gain:.24}),turn:Object.freeze({startHz:420,endHz:535,durationMs:84,waveform:"sine",gain:.16}),undo:Object.freeze({startHz:455,endHz:305,durationMs:130,waveform:"triangle",gain:.2}),victory:Object.freeze({startHz:520,endHz:790,durationMs:230,waveform:"sine",gain:.2}),failure:Object.freeze({startHz:440,endHz:440,durationMs:340,waveform:"sine",gain:.12}),hint:Object.freeze({startHz:740,endHz:740,durationMs:145,waveform:"sine",gain:.12}),restart:Object.freeze({startHz:370,endHz:440,durationMs:150,waveform:"triangle",gain:.12})});function Iv(n){const e={at:0,tone:lo[n]};return n==="failure"?[e,{at:.29,tone:{startHz:370,endHz:370,durationMs:400,waveform:"sine",gain:.1}}]:n==="hint"?[e,{at:.12,tone:{startHz:988,endHz:988,durationMs:190,waveform:"sine",gain:.1}}]:n==="restart"?[e,{at:.1,tone:{startHz:494,endHz:440,durationMs:180,waveform:"sine",gain:.1}}]:[e]}const Dv=84,Nv=64,wi=60/Dv,Bn=Nv*wi,Uv=12,Fv=3.6,Ov=12,Bv=n=>440*2**((n-69)/12),kv=[[50,57,61,64],[55,62,66,69],[47,54,57,62],[57,64,69,71]],zv=[[[0,74,1.25],[1.5,78,.75],[3,76,1.5],[6,73,1],[8.5,74,1.5],[11,71,1.25],[14,73,1.5]],[[0,74,1.25],[1.5,78,.75],[3,81,1.5],[6,78,1],[8.5,76,1.5],[11,74,1.25],[14,73,1.5]],[[.5,78,1.5],[3,81,1],[5,83,1.5],[8,81,1.5],[10.5,78,1.25],[13,76,1.5]],[[0,74,1.25],[1.5,78,.75],[3,76,1.5],[6,73,1],[8.5,74,1.5],[11,76,1],[13.5,73,2]]],Ai=[];for(let n=0;n<16;n++){const e=kv[n%4];for(const t of e)Ai.push({beat:n*4,midi:t,beats:4.8,instrument:"pad",gain:.003});n%2===0?(Ai.push({beat:n*4+.5,midi:e[1]+12,beats:1.4,instrument:"keys",gain:.009}),Ai.push({beat:n*4+2.5,midi:e[2]+12,beats:1.4,instrument:"keys",gain:.008})):Ai.push({beat:n*4+2,midi:e[3]+12,beats:1.5,instrument:"glass",gain:.008})}zv.forEach((n,e)=>n.forEach(([t,i,r])=>Ai.push({beat:e*16+t,midi:i,beats:r,instrument:"keys",gain:.024})));const pc=Object.freeze(Ai.sort((n,e)=>n.beat-e.beat).map(n=>Object.freeze(n)));function Hv(n){let e=!1,t=0,i=0,r=0,s;const a=new Set;function o(h=!1){if(!e)return;const f=n.now(),d=f-t+.15;h||(r=Math.max(r,f-t-.001));const p=Math.floor(r/Bn)-1,v=Math.floor(d/Bn);for(let m=p;m<=v;m++)for(const g of pc){const y=m*Bn+g.beat*wi;if(y<r||y>=d)continue;const w=Math.max(0,f-t-y);w<g.beats*wi&&l(g,Math.max(f,t+y),w)}r=d}function l(h,f,d){if(!(a.size>=Uv))try{let p;p=n.play(h,f,d,()=>{p&&a.delete(p)}),a.add(p)}catch{}}function c(){if(!e){e=!0,t=n.now()-i,r=i;for(let h=-1;h<=0;h++)for(const f of pc){const d=h*Bn+f.beat*wi;d<i&&d+f.beats*wi>i&&l(f,n.now(),i-d)}o(!0),s=n.every(o)}}function u(){e&&(i=((n.now()-t)%Bn+Bn)%Bn),e=!1,s?.(),s=void 0;for(const h of a)h.stop();a.clear()}return Object.freeze({start:c,stop:u,snapshot:()=>({running:e,voices:a.size,position:e?(n.now()-t)%Bn:i})})}const Vv=n=>.85*Math.tanh(Math.max(-1,Math.min(1,n))/.85);function Gv(n,e){const t=n.durationMs/1e3,i=new Float32Array(Math.ceil(t*e)),r=Math.min(.012,t*.25),s=Math.log(Math.max(1,n.endHz)/n.startHz)/t;for(let a=0;a<i.length;a++){const o=a/e,l=Math.abs(s)<1e-10?n.startHz*o:n.startHz*Math.expm1(s*o)/s,c=2*Math.PI*l,u=n.waveform==="triangle"?2/Math.PI*Math.asin(Math.sin(c)):Math.sin(c),h=o<r?o/r:Math.exp(-9*(o-r)/(t-r)),f=Math.min(1,Math.max(0,(t-o)/.012));i[a]=u*h*f*n.gain*Fv}return i}function Wv(n,e){const t=n.beats*wi,i=new Float32Array(Math.ceil(t*e)),r=Bv(n.midi);for(let s=0;s<i.length;s++){const a=s/e,o=2*Math.PI*r*a;let l,c;if(n.instrument==="pad")l=(Math.sin(o)+.18*Math.sin(o*2))/1.18,c=Math.min(1,a/.45)*Math.min(1,(t-a)/.65);else{const u=n.instrument==="glass";l=(Math.sin(o)+(u?.24:.12)*Math.sin(o*2)*Math.exp(-a*5)+(u?.1:.04)*Math.sin(o*3)*Math.exp(-a*8))/(u?1.34:1.16),c=Math.min(1,a/.009)*Math.exp(-a*(u?2.6:2.1))*Math.min(1,(t-a)/.12)}i[s]=l*Math.max(0,c)*n.gain*Ov}return i}function Xv(){if(typeof AudioContext>"u")throw new Error("Web Audio is unavailable.");const n=new AudioContext,e=n.createGain(),t=n.createWaveShaper();t.curve=Float32Array.from({length:4097},(l,c)=>Vv(c/2048-1)),t.connect(e),e.gain.value=.4,e.connect(n.destination);const i=new Map,r=new Set;function s(l,c){let u=i.get(l);if(!u){const h=c();u=n.createBuffer(1,h.length,n.sampleRate),u.getChannelData(0).set(h),i.set(l,u)}return u}function a(l,c,u,h){const f=n.createBufferSource(),d=n.createGain();f.buffer=l,f.connect(d),d.connect(t);const p=Math.max(c,n.currentTime);d.gain.setValueAtTime(u>0?0:1,p),u>0&&d.gain.linearRampToValueAtTime(1,p+.012);let v=!1;const m=Object.freeze({stop(){if(!v){v=!0,d.gain.cancelScheduledValues(n.currentTime),d.gain.setTargetAtTime(0,n.currentTime,.003);try{f.stop(n.currentTime+.015)}catch{}}}});return f.onended=()=>{f.disconnect(),d.disconnect(),r.delete(m),h()},r.add(m),f.start(p,u),m}const o=Hv({now:()=>n.currentTime,play:(l,c,u,h)=>a(s(JSON.stringify([l.midi,l.beats,l.instrument,l.gain]),()=>Wv(l,n.sampleRate)),c,u,h),every:l=>{const c=setInterval(l,40);return()=>clearInterval(c)}});return Object.freeze({resume:()=>n.resume(),suspend:()=>n.suspend(),async close(){o.stop();for(const l of r)l.stop();await n.close(),r.clear(),i.clear(),t.disconnect(),e.disconnect()},setVolume(l){e.gain.setTargetAtTime(l,n.currentTime,.012)},startMusic:o.start,stopMusic:o.stop,musicSnapshot:o.snapshot,playTone(l,c,u,h){const f=h?Iv(h):[{at:0,tone:l}],d=[];let p=f.length;const v=n.currentTime;for(const m of f)d.push(a(s(JSON.stringify(m.tone),()=>Gv(m.tone,n.sampleRate)),v+m.at,0,()=>{--p===0&&u()}));return Object.freeze({stop(){for(const m of d)m.stop()}})}})}function qv(n={}){const e=n.createAdapter??Xv,t=Math.max(1,n.maxVoices??5),i=Math.max(0,n.rateLimitMs??40),r=n.now??(()=>performance.now());let s,a=!0,o=!0,l=.4,c=!0,u=!1,h=!1,f=!1,d;const p=new Set,v=new Map,m={},g=()=>!u&&c&&l>0&&(a||o)&&h;function y(){for(const R of p)try{R.stop()}catch{}p.clear()}function w(){s?.setVolume?.(l),(!a||!g()||!f)&&y(),o&&g()&&f?s?.startMusic?.():s?.stopMusic?.()}function S(){return!s&&!g()?Promise.resolve(!1):d||(d=(async()=>{try{if(!s&&g()&&(s=e()),!s)return!1;for(;;){const D=g();if(D===f)return w(),D;D?await s.resume():await s.suspend(),f=D,w()}}catch{return f=!1,s?.stopMusic?.(),y(),!1}})().finally(()=>{d=void 0}),d)}function T(R){a=R.soundEnabled===!0,o=typeof R.musicEnabled=="boolean"?R.musicEnabled:a,l=Number.isFinite(R.soundVolume)?Math.max(0,Math.min(1,R.soundVolume)):.4,w(),S()}async function b(){if(u)return!1;if(h=!0,d&&s&&!f&&g())try{s.resume().catch(()=>{})}catch{}return S()}function I(R){if(!a||!g()||!f||!s||!lo[R])return!1;const D=r();if(D-(v.get(R)??-1/0)<i)return!1;if(v.set(R,D),p.size>=t){const P=p.values().next().value;if(P){try{P.stop()}catch{}p.delete(P)}}try{let P;return P=s.playTone(lo[R],l,()=>{P&&p.delete(P)},R),p.add(P),m[R]=(m[R]??0)+1,!0}catch{return!1}}async function x(R){u||(c=R,w(),await S())}async function M(){if(!u){u=!0,y(),s?.stopMusic?.(),await d,h=!1,f=!1;try{await s?.close()}catch{}s=void 0}}return Object.freeze({configure:T,unlock:b,play:I,setVisible:x,dispose:M,snapshot:()=>Object.freeze({enabled:a,musicEnabled:o,volume:l,visible:c,unlocked:h,resumed:f,activeVoices:p.size,disposed:u,played:{...m},music:s?.musicSnapshot?.()??{running:!1,voices:0,position:0}})})}function Yv(n,e,t){if(t){const m=n.querySelector("#load-error");let g=!1;return{update(y,w,S){(g||!w)&&(t.loading.hidden=!0),m.hidden=w&&!g,m.dataset.kind=w?"content":"graphics",m.querySelector("p").textContent=Ze(S,w?"service.contentError":"service.graphicsError"),m.querySelector("button").textContent=Ze(S,"action.retry")},setProgress:t.setProgress,fail(){g=!0,t.fail()},dispose(){e?.cancel(m)}}}const i=document.createElement("section");i.className="loading-screen",i.setAttribute("role","status");const r=document.createElement("p"),s=document.createElement("progress");s.setAttribute("aria-label","Loading");const a=document.createElement("div");a.className="loading-meter is-indeterminate",a.setAttribute("aria-hidden","true");const o=document.createElement("img");o.className="loading-meter-track",o.alt="",o.src=new URL("/White-Tower-Play/telegram/assets/f1d2caab9353742b8df59b148673ac47b38bb5998d9de5a6ee53c8288c6e2024-MRB15IwW.webp",import.meta.url).href;const l=document.createElement("div");l.className="loading-meter-window";const c=document.createElement("img");c.className="loading-meter-fill",c.alt="",c.src=new URL("/White-Tower-Play/telegram/assets/69b4ccfea980602ee46d81df9f0d725e82d3a67b7254f91b2a682cd941a9b511-C7MzZ56N.webp",import.meta.url).href,l.append(c),a.append(o,l);let u;i.append(An("logo","game-logo"),An("loading","loading-tower"),a,s,r),n.append(i);const h=n.querySelector("#load-error");h.prepend(An("graphics","service-illustration"));let f=!1,d;function p(){const m=h.hidden?i.hidden?void 0:i:h;m!==d&&(d&&e?.cancel(d),m&&e?.reveal(m),d=m)}function v(m,g,y){i.lang=y,h.lang=y,h.dataset.kind=g?"content":"graphics",r.textContent=Ze(y,"service.loading")+(u===void 0?"":` ${u}%`),s.setAttribute("aria-label",r.textContent),i.hidden=m||f||!g,!g||f?(h.hidden=!1,h.querySelector("p").textContent=Ze(y,g?"service.contentError":"service.graphicsError"),h.querySelector("button").textContent=Ze(y,"action.retry")):h.hidden=!0,p()}return{update:v,setProgress(m,g){!Number.isFinite(g)||g<=0||(s.max=g,s.value=Math.max(0,Math.min(m,g)),u=Math.floor(s.value/g*100),a.classList.remove("is-indeterminate"),a.style.setProperty("--loaded",u+"%"))},fail(){f=!0,i.hidden=!0,h.hidden=!1,p()},dispose(){e?.cancel(i),e?.cancel(h),i.remove()}}}function $v(n,e){let t=!1,i=!1;return{busy:()=>t,pause(r){},async run(r){if(!(t||i)){t=!0;try{return await r()}finally{t=!1}}},dispose(){i=!0}}}function Kv(n,e){const t=document.createElement("dialog");t.className="challenge-dialog",t.setAttribute("aria-label","Friend challenge");const i=document.createElement("h2");i.textContent="Friend challenge";const r=document.createElement("p");r.setAttribute("role","status");const s=document.createElement("div");s.className="challenge-preview";const a=document.createElement("button");a.type="button",a.textContent="Play challenge",a.className="challenge-primary";const o=document.createElement("button");o.type="button",o.textContent="Continue campaign";const l=document.createElement("input");l.readOnly=!0,l.setAttribute("aria-label","Challenge link"),l.hidden=!0;const c=document.createElement("button");c.type="button",c.textContent="Copy link",c.hidden=!0,c.className="challenge-primary",t.append(i,r,s,l,c,a,o),n.append(t);const u=document.createElement("button");u.type="button",u.textContent="Back to campaign",u.className="challenge-back",u.hidden=!0,n.append(u);const h=document.createElement("div");h.className="challenge-notice",h.hidden=!0;const f=document.createElement("p");f.setAttribute("role","status");const d=document.createElement("button");d.type="button",d.textContent="Dismiss";const p=()=>{h.hidden=!0};d.addEventListener("click",p),h.append(An("challengeWarning","challenge-warning-icon"),f,d),n.append(h);let v=!1,m=!1,g="";function y(D){m=D,a.disabled=D,o.disabled=D,u.disabled=D}function w(){s.replaceChildren(),a.hidden=!0,l.hidden=!0,c.hidden=!0}function S(){t.open||t.showModal()}function T(){m||t.close()}o.addEventListener("click",T);const b=D=>{m&&D.preventDefault()};t.addEventListener("cancel",b);async function I(D){g=D,w(),i.textContent="Friend challenge",r.textContent="Loading challenge…",S(),y(!0);try{const P=await e.preview(D);if(v)return;if(!P){t.close(),f.textContent="This challenge is unavailable. Continue your campaign.",h.hidden=!1;return}r.textContent=`White Tower level ${P.descriptor.number}. Solve the same tower as your friend. Your campaign stays saved.`,Zv(P.level,s),a.hidden=!1,a.textContent="Play challenge"}catch{v||(r.textContent="Could not load the challenge. Retry or continue your campaign.",a.hidden=!1,a.textContent="Retry")}finally{v||y(!1)}}const x=async()=>{if(!(m||v)){if(a.textContent==="Retry"){await I(g);return}y(!0);try{await e.start(g)?v||t.close():v||(r.textContent="This challenge is unavailable. Continue your campaign.")}catch{v||(r.textContent="Could not start the challenge. Retry or continue your campaign.")}finally{v||y(!1)}}},M=async()=>{if(!(m||v)){y(!0);try{await e.leave()}catch{v||(w(),i.textContent="Campaign",r.textContent="Could not return yet. Close this message and try Back to campaign again.",S())}finally{v||y(!1)}}},R=async()=>{try{await navigator.clipboard.writeText(l.value),v||(r.textContent="Link copied. Choose a friend to share it with.")}catch{v||(l.focus(),l.select(),r.textContent="Select and copy the link to share it with a friend.")}};return a.addEventListener("click",x),u.addEventListener("click",M),c.addEventListener("click",R),{busy:()=>m||t.open,async launch(D){if(!(!D||v)){if(!Uu(D)){f.textContent="This challenge is unavailable. Continue your campaign.",h.hidden=!1;return}e.opened(),await I(D)}},share(){if(m||v)return;const D=e.share();!D||D.opened||(w(),i.textContent="Challenge a friend",r.textContent="Share this link to invite a friend to the same tower.",l.value=D.url,l.hidden=!1,c.hidden=!1,S(),l.setSelectionRange(0,0),l.scrollLeft=0)},update(D,P,F,N){u.hidden=!D||N,u.disabled=F||m,a.disabled=F||m,u.dataset.position=P?"result":"play"},dispose(){v=!0,t.close(),t.remove(),u.remove(),h.remove(),d.removeEventListener("click",p),o.removeEventListener("click",T),t.removeEventListener("cancel",b),a.removeEventListener("click",x),u.removeEventListener("click",M),c.removeEventListener("click",R)}}}function Zv(n,e){const t="http://www.w3.org/2000/svg",i=document.createElementNS(t,"svg");i.setAttribute("role","img"),i.setAttribute("aria-label","Challenge board preview");const r=new URL("/White-Tower-Play/telegram/assets/tiles-atlas-Bgn-GxWF.webp",import.meta.url).href,s=new URL("/White-Tower-Play/telegram/assets/markers-atlas-M4FshpTr.webp",import.meta.url).href,a=n.cells.map(d=>({cell:d,x:(d.u-d.v)*30,y:-(d.u+d.v)*17})),o=Math.min(...a.map(d=>d.x)),l=Math.min(...a.map(d=>d.y)),c=Math.max(...a.map(d=>d.x)),u=Math.max(...a.map(d=>d.y));i.setAttribute("viewBox",`${o-8} ${l-8} ${c-o+80} ${u-l+72}`);function h(d,p,v,m,g=!1){const y=Su[d].rect,w=document.createElementNS(t,"svg");w.setAttribute("x",String(p)),w.setAttribute("y",String(v)),w.setAttribute("width",String(m)),w.setAttribute("height",String(m)),w.setAttribute("viewBox",`${y[0]} ${y[1]} ${y[2]-y[0]} ${y[3]-y[1]}`);const S=document.createElementNS(t,"image"),T=g?cs.markers:cs.tiles;S.setAttribute("href",g?s:r),S.setAttribute("width",String(T[0])),S.setAttribute("height",String(T[1])),w.append(S),i.append(w)}const f={SE:"orange-up-right",SW:"orange-up-left",NW:"orange-down-left",NE:"orange-down-right",E:"orange-right",W:"orange-left",N:"orange-down",S:"orange-up"};for(const{cell:d,x:p,y:v}of a.sort((m,g)=>m.y-g.y)){const m=n.stacks.find(y=>y.u===d.u&&y.v===d.v);h(m?"white":"yellow",p,v,64);const g=d.direction??m?.launchDirection;g&&h(f[g],p+17,v+8,28,!0)}e.append(i)}function Qv(n,e){let t,i=document.querySelector("canvas");const r=document.querySelector("#status"),s=Ku(),a=qv(),o=Bu();o.track("wt_boot_started",{device:matchMedia("(pointer:coarse)").matches?"touch":"pointer"});const l=Fu(),c=Yu();document.querySelector("main").classList.add("world-scene");function u(){document.querySelector("main").classList.remove("keyboard-focus")}function h(j){(j.key==="Tab"||j.key.startsWith("Arrow"))&&document.querySelector("main").classList.add("keyboard-focus")}document.addEventListener("pointerdown",u,!0),document.addEventListener("keydown",h,!0);const f=Yv(document.querySelector("main"),c,n),d=Hu(j=>f.setProgress(j.completed,j.total),"/White-Tower-Play/telegram/");let p=!1,v,m,g;e.getHelpAccess?.();const y=void 0;try{v=xv(i,"webgl",{audio:a,analytics:o,catalogReady:d.catalog,store:e.createStore?.(),help:y,helpState:ce=>m?.busy(ce),helpError:(ce,Re)=>{m?.show(ce,Re)}}),i=v.canvas}catch(j){throw r.textContent=j instanceof Error?`WebGL unavailable: ${j.message}`:"WebGL unavailable.",d.dispose(),s.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose(),f.dispose(),document.removeEventListener("pointerdown",u,!0),document.removeEventListener("keydown",h,!0),j}const w=$u();let S=!1,T=!1,b=!1,I=null,x,M=!1,R,D;const P=$v(document.querySelector("main")),F=Kv(document.querySelector("#hud"),{preview:j=>v.previewChallenge(j),start:async j=>{const ce=await v.startChallenge(j);return G(),ce},leave:async()=>{const j=await v.leaveChallenge();return G(),j},opened:()=>v.trackChallenge("wt_challenge_opened"),share:()=>{const j=v.challengeDescriptor();if(!j||v.snapshot().phase!=="Won")return;const ce=e.shareChallenge?.(j);return ce?.opened&&v.trackChallenge("wt_challenge_share_opened"),ce}});function N(){R?.dispose(),i=v.canvas,i.tabIndex=0,i.setAttribute("role","application"),R=Zu(i,{pickStack:j=>v.pickStack(j),activate:j=>p&&!S&&!F.busy()&&!v.snapshot().challengeBusy&&!P.busy()&&v.rendererInfo().supported&&v.launchStack(j)})}N();const H=Lv({root:document.querySelector("#hud"),motion:c,onReset:()=>{P.run(te)},onUndo:()=>v.undo(),onNext:async()=>(a.play("ui"),await P.run(()=>v.nextLevel())??{advanced:!1}),onMenu:()=>v.toggleMenu(),getSettings:()=>v.snapshot().settings,onSettings:j=>{const ce=v.canvas;v.updateSettings(j),a.configure(j),v.canvas!==ce&&(N(),V())},onSelectLevel:j=>{a.play("ui"),v.selectLevel(j).catch(()=>{r.textContent="Could not load that level. Select it again to retry."})},onClearProgress:()=>{a.play("ui"),v.clearProgress().then(()=>{N(),V()})},onRetry:()=>window.location.reload(),onChooseLevels:()=>{v.toggleMenu()},onHint:()=>v.requestHint(),getHelpBalance:()=>g,onFailure:()=>a.play("failure"),onMenuNavigate:()=>a.play("ui"),onExportProgress:()=>v.exportProgress(),onImportProgress:j=>v.importProgress(j),...e.shareChallenge?{onShareChallenge:()=>F.share(),onShareChallengeShown:()=>v.trackChallenge("wt_challenge_share_shown")}:{}}),Q=ju({canvas:()=>v.canvas,scene:v,enabled:()=>p&&!S&&!F.busy()&&!v.snapshot().challengeBusy&&!P.busy()&&v.rendererInfo().supported,announce:(j,ce,Re)=>{r.textContent=Cv(v.snapshot().settings.language,j,ce,Re)},reset:te});function G(){I=null,w.reset(),s.reset()}function U(j){j.isTrusted&&(a.setVisible(!S&&!document.hidden),a.unlock())}document.addEventListener("pointerdown",U,{capture:!0}),document.addEventListener("pointerup",U,{capture:!0}),document.addEventListener("click",U,{capture:!0}),document.addEventListener("keydown",U,{capture:!0});function V(){i=v.canvas;const j=Math.min(window.devicePixelRatio||1,2);v.resize({width:i.clientWidth,height:i.clientHeight,pixelRatio:j}),D=i.getBoundingClientRect(),l.refreshLayout(),Le="",v.render()}function ee(j){T=j,S=T||b,v.pause(S||document.hidden),a.setVisible(!S&&!document.hidden),Z(),document.querySelector("main").classList.toggle("motion-paused",S||document.hidden),G(),r.textContent=S?"Paused":"Ready"}function te(){v.reset(),G(),v.render()}function Z(){const j=v.snapshot().settings.reducedMotion||window.matchMedia("(prefers-reduced-motion: reduce)").matches;l.update(j,S||document.hidden),c.update(j,S||document.hidden)}function ue(){Z(),v.pause(document.hidden||S),document.querySelector("main").classList.toggle("motion-paused",document.hidden||S),a.setVisible(!document.hidden&&!S),G()}let Le="",Se;function me(j){if(t?.update(j),M)return;const ce=I===null?0:(j-I)/1e3;I=j;let Re=0;p&&!S&&!document.hidden&&(Re=w.advance(ce,lt=>v.update(lt,s)).alpha);const Ue=document.querySelector("#hud"),ke=!p||S||document.hidden;Ue.inert!==ke&&(Ue.inert=ke),Z(),H.update(v.snapshot(),v.presentationSnapshot(),!S&&!document.hidden?Math.min(ce,.1):0);const Oe=v.snapshot();F.update(Oe.challengeMode,Oe.phase==="Won",Oe.challengeBusy||S||document.hidden,Oe.phase==="Menu"),f.update(p&&v.snapshot().loaded,v.rendererInfo().supported,v.snapshot().settings.language);const ze=v.persistenceInfo();ze.memoryOnly?r.textContent=v.snapshot().settings.language==="ru"?"Прогресс временный: хранилище браузера недоступно.":"Progress is temporary because browser storage is unavailable.":ze.recoveryNotice&&(r.textContent=ze.recoveryNotice),v.render(Re);const Ge=v.snapshot().level,pt=`${Ge?.id}:${D?.width}:${D?.height}`;if(D&&Ge&&(Se!==Ge||Le!==pt)){Le=pt,Se=Ge;const lt=Math.min(D.width/720,D.height/1280),Ke=D.left+(D.width-720*lt)/2,et=D.top+(D.height-1280*lt)/2;l.setExclusion(Xu(Ge).map(k=>({left:Ke+k.left*lt-6,top:et+k.top*lt-6,right:Ke+k.right*lt+6,bottom:et+k.bottom*lt+6})))}x=requestAnimationFrame(me)}document.addEventListener("visibilitychange",ue),window.addEventListener("resize",V);const O=new ResizeObserver(V);O.observe(document.querySelector("main")),V(),x=requestAnimationFrame(me);const q=e.subscribePause(j=>{b=j,ee(T)}),ae=v.ready.then(async()=>{if(await v.resourceReady(),await document.fonts.ready,M||(v.render(),d.complete(),n.setReducedMotion(v.snapshot().settings.reducedMotion),await n.finish(),M))return;p=!0,t=e.installOffline?.({snapshot:()=>v.snapshot(),persistenceInfo:()=>v.persistenceInfo(),flushPersistence:()=>v.flushPersistence()}),performance.mark("game-ready"),o.track("wt_game_ready",{loading_ms:Math.round(performance.now()),content_version:v.contentVersion()??"unknown"}),a.configure(v.snapshot().settings),document.hidden&&a.setVisible(!1),N(),V(),n.reveal(),F.launch(e.getLaunchChallenge?.()??"");const j=new URLSearchParams(window.location.search);{const ce=j.get("level");ce&&await v.setLevelById(ce),j.has("tower")&&v.setTowerDemo(Number(j.get("tower"))||void 0)}r.textContent=v.rendererInfo().message??"Ready"}).catch(async j=>{if(!M)throw o.track("wt_content_error",{stage:"startup"}),r.textContent=j instanceof Error?`Level error: ${j.message}`:"Could not load level.",f.fail(),n.fail(),await o.flush(),j});function be(){M||(t?.dispose(),q(),M=!0,d.dispose(),o.dispose(),cancelAnimationFrame(x),s.dispose(),R?.dispose(),Q.dispose(),F.dispose(),H.dispose(),P.dispose(),f.dispose(),c.dispose(),l.dispose(),v.dispose(),document.removeEventListener("pointerdown",U,!0),document.removeEventListener("pointerup",U,!0),document.removeEventListener("click",U,!0),document.removeEventListener("keydown",U,!0),a.dispose(),document.removeEventListener("pointerdown",u,!0),document.removeEventListener("keydown",h,!0),window.removeEventListener("resize",V),O.disconnect(),document.removeEventListener("visibilitychange",ue))}return{dispose:be,ready:ae}}export{Qv as startGame};
