var Ze=Object.defineProperty;var qe=(e,t,n)=>t in e?Ze(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var F=(e,t,n)=>qe(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();function z(){}function Ge(e){return e()}function Te(){return Object.create(null)}function Q(e){e.forEach(Ge)}function Re(e){return typeof e=="function"}function Je(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function Xe(e){return Object.keys(e).length===0}function c(e,t){e.appendChild(t)}function E(e,t,n){e.insertBefore(t,n||null)}function $(e){e.parentNode&&e.parentNode.removeChild(e)}function ge(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function m(e){return document.createElement(e)}function P(e){return document.createTextNode(e)}function O(){return P(" ")}function ze(){return P("")}function T(e,t,n,i){return e.addEventListener(t,n,i),()=>e.removeEventListener(t,n,i)}function p(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function Ke(e){return Array.from(e.childNodes)}function oe(e,t){t=""+t,e.data!==t&&(e.data=t)}function x(e,t){e.value=t??""}function Ee(e,t,n){for(let i=0;i<e.options.length;i+=1){const r=e.options[i];if(r.__value===t){r.selected=!0;return}}e.selectedIndex=-1}let _e;function ee(e){_e=e}const J=[],he=[];let X=[];const Ie=[],He=Promise.resolve();let me=!1;function Ue(){me||(me=!0,He.then(Ve))}function Qe(){return Ue(),He}function pe(e){X.push(e)}const fe=new Set;let q=0;function Ve(){if(q!==0)return;const e=_e;do{try{for(;q<J.length;){const t=J[q];q++,ee(t),Ye(t.$$)}}catch(t){throw J.length=0,q=0,t}for(ee(null),J.length=0,q=0;he.length;)he.pop()();for(let t=0;t<X.length;t+=1){const n=X[t];fe.has(n)||(fe.add(n),n())}X.length=0}while(J.length);for(;Ie.length;)Ie.pop()();me=!1,fe.clear(),ee(e)}function Ye(e){if(e.fragment!==null){e.update(),Q(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(pe)}}function We(e){const t=[],n=[];X.forEach(i=>e.indexOf(i)===-1?t.push(i):n.push(i)),n.forEach(i=>i()),X=t}const xe=new Set;function et(e,t){e&&e.i&&(xe.delete(e),e.i(t))}function K(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}function tt(e,t,n){const{fragment:i,after_update:r}=e.$$;i&&i.m(t,n),pe(()=>{const o=e.$$.on_mount.map(Ge).filter(Re);e.$$.on_destroy?e.$$.on_destroy.push(...o):Q(o),e.$$.on_mount=[]}),r.forEach(pe)}function nt(e,t){const n=e.$$;n.fragment!==null&&(We(n.after_update),Q(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function it(e,t){e.$$.dirty[0]===-1&&(J.push(e),Ue(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function rt(e,t,n,i,r,o,u=null,a=[-1]){const s=_e;ee(e);const l=e.$$={fragment:null,ctx:[],props:o,update:z,not_equal:r,bound:Te(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(s?s.$$.context:[])),callbacks:Te(),dirty:a,skip_bound:!1,root:t.target||s.$$.root};u&&u(l.root);let d=!1;if(l.ctx=n?n(e,t.props||{},(g,N,...M)=>{const j=M.length?M[0]:N;return l.ctx&&r(l.ctx[g],l.ctx[g]=j)&&(!l.skip_bound&&l.bound[g]&&l.bound[g](j),d&&it(e,g)),N}):[],l.update(),d=!0,Q(l.before_update),l.fragment=i?i(l.ctx):!1,t.target){if(t.hydrate){const g=Ke(t.target);l.fragment&&l.fragment.l(g),g.forEach($)}else l.fragment&&l.fragment.c();t.intro&&et(e.$$.fragment),tt(e,t.target,t.anchor),Ve()}ee(s)}class ot{constructor(){F(this,"$$");F(this,"$$set")}$destroy(){nt(this,1),this.$destroy=z}$on(t,n){if(!Re(n))return z;const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(t){this.$$set&&!Xe(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const lt="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(lt);const De=Object.freeze(["adlm","ahom","arab","arabext","armn","armnlow","bali","beng","bhks","brah","cakm","cham","cyrl","deva","ethi","finance","fullwide","geor","gong","gonm","grek","greklow","gujr","guru","hanidays","hanidec","hans","hansfin","hant","hantfin","hebr","hmng","hmnp","java","jpan","jpanfin","jpanyear","kali","khmr","knda","lana","lanatham","laoo","latn","lepc","limb","mathbold","mathdbl","mathmono","mathsanb","mathsans","mlym","modi","mong","mroo","mtei","mymr","mymrshan","mymrtlng","native","newa","nkoo","olck","orya","osma","rohg","roman","romanlow","saur","shrd","sind","sinh","sora","sund","takr","talu","taml","tamldec","telu","thai","tirh","tibt","traditio","vaii","wara","wcho"]),le={dates:{locale:{localeMatcher:["best fit","lookup"],calendar:["buddhist","chinese","coptic","dangi","ethioaa","ethiopic","gregory","hebrew","indian","islamic","islamic-umalqura","islamic-tbla","islamic-civil","islamic-rgsa","iso8601","japanese","persian","roc","islamicc"],numberingSystem:De,hour12:["undefined","true","false"],hourCycle:["undefined","h11","h12","h23","h24"],timeZone:{type:"string"}},dateTimeComponents:{weekday:["undefined","long","short","narrow"],era:["undefined","long","short","narrow"],year:["undefined","numeric","2-digit"],month:["undefined","numeric","2-digit","long","short","narrow"],day:["undefined","numeric","2-digit"],dayPeriod:["undefined","narrow","short","long"],hour:["undefined","numeric","2-digit"],minute:["undefined","numeric","2-digit"],second:["undefined","numeric","2-digit"],fractionalSecondDigits:["undefined",1,2,3],timeZoneName:["undefined","long","short","shortOffset","longOffset","shortGeneric","longGeneric"],formatMatcher:["undefined","basic","best fit"]},styleShortcuts:{dateStyle:["full","long","medium","short"],timeStyle:["full","long","medium","short"]}},numbers:{locale:{localeMatcher:["best fit","lookup"],numberingSystem:De},stylingOptions:{style:["decimal","currency","percent","unit"],currency:{type:"string"},currencyDisplay:["code","symbol","narrowSymbol","name"],currencySign:["standard","accounting"],unit:["acre","bit","byte","celsius","centimeter","day","degree","fahrenheit","fluid-ounce","foot","gallon","gigabit","gigabyte","gram","hectare","hour","inch","kilobit","kilobyte","kilogram","kilometer","liter","megabit","megabyte","meter","microsecond","mile","mile-scandinavian","milliliter","millimeter","millisecond","minute","month","nanosecond","ounce","percent","petabyte","pound","second","stone","terabit","terabyte","week","yard","year"],unitDisplay:["short","narrow","long"]},digitOptions:{minimumIntegerDigits:{type:"number",min:1,max:21},minimumFractionDigits:{type:"number",min:0,max:100},maximumFractionDigits:{type:"number",min:0,max:100},minimumSignificantDigits:{type:"number",min:1,max:21},maximumSignificantDigits:{type:"number",min:1,max:21},roundingPriority:["auto","morePrecision","lessPrecision"],roundingIncrement:[1,2,5,10,20,25,50,100,200,250,500,1e3,2e3,2500,5e3],roundingMode:["ceil","floor","expand","trunc","halfCeil","halfFloor","halfExpand","halfTrunc","halfEven"],trailingZeroDisplay:["auto","stripIfInteger"]},otherOptions:{notation:["standard","scientific","engineering","compact"],compactDisplay:["short","long"],useGrouping:["always","auto","min2",!0,!1],signDisplay:["auto","always","exceptZero","negative","never"]}}},B="  ",st=/^['"`](.*)['"`]$/;class at{constructor(){F(this,"_formatter");F(this,"_locale");F(this,"_dateInput");F(this,"_dateIsEmpty");F(this,"_errorMessages");this._formatter=new Intl.DateTimeFormat,this._locale=void 0,this._dateInput="07/02/1997",this._dateIsEmpty=!1,this._errorMessages={locale:"",date:""}}get locale(){return this._getProcessedOutputString(this._locale)}set locale(t){this._locale=this._getProcessedValue(t);try{this._errorMessages.locale="",this._formatter=new Intl.DateTimeFormat(this._locale,this.options)}catch({message:n}){this._errorMessages.locale=n}}set dateString(t){this._dateIsEmpty=t==="",this._dateInput=this._getProcessedValue(t)}get dateString(){return this._dateIsEmpty?"":this._getProcessedOutputString(this._dateInput)}get options(){return this._formatter.resolvedOptions()}get optionsText(){return Object.entries(this.options).filter(t=>this._showOption(t)).map(t=>`${t[0]}: ${this._getProcessedOutputString(t[1])}`).join(`,
${B}${B}`)}get expressionText(){const t=this.optionsText.length?`,
${B}{
${B}${B}${this.optionsText}
${B}}`:"";return`Intl.DateTimeFormat(
${B}${this.locale}${t}
).format(new Date(${this.dateString}));`}get outputText(){let t="";try{this._errorMessages.date="";let n=this._dateIsEmpty?new Date:new Date(this._dateInput);t=this._formatter.format(n)}catch({message:n}){this._errorMessages.date=n}return Object.values(this._errorMessages).some(n=>n.length)?"😢":t}get errorMessages(){return this._errorMessages}setOption(t,n){this._formatter=new Intl.DateTimeFormat(this._locale,{...structuredClone(this.options),[t]:this._getProcessedValue(n)})}_showOption({0:t,1:n}){let i;try{i=new Intl.DateTimeFormat(this._locale).resolvedOptions()}catch{return!1}switch(t){case"month":case"day":case"year":const r=Object.entries(le.dates.dateTimeComponents).filter(a=>!["month","year","day"].includes(a[0])).some(a=>this.options[a[0]]!==i[a[0]]);return!(this.options.month===i.month&&this.options.day===i.day&&this.options.year===i.year&&!r);case"locale":return!1;case"hour12":let o={};try{return o=new Intl.DateTimeFormat(this._locale,{hour:this.options.hour}).resolvedOptions(),this.options.hour12!==o.hour12}catch{return!1}case"hourCycle":let u={};try{return u=new Intl.DateTimeFormat(this._locale,{hour:this.options.hour,hour12:this.options.hour12}).resolvedOptions(),this.options.hourCycle!==u.hourCycle}catch{return!1}default:return n!==i[t]}}_getProcessedValue(t){try{return JSON.parse(t)}catch{let n=t.match(st);return n?n[1]:t==="undefined"?void 0:t}}_getProcessedOutputString(t){return t===void 0?"undefined":JSON.stringify(t)}}function Pe(e,t,n){const i=e.slice();return i[17]=t[n][1],i[19]=n,i}function je(e,t,n){const i=e.slice();return i[20]=t[n][0],i[21]=t[n][1],i}function Ce(e,t,n){const i=e.slice();return i[24]=t[n],i}function Fe(e){let t,n=e[0].errorMessages.date+"",i;return{c(){t=m("p"),i=P(n),p(t,"class","error-message")},m(r,o){E(r,t,o),c(t,i)},p(r,o){o&1&&n!==(n=r[0].errorMessages.date+"")&&oe(i,n)},d(r){r&&$(t)}}}function Ne(e){let t,n=e[0].errorMessages.locale+"",i;return{c(){t=m("p"),i=P(n),p(t,"class","error-message")},m(r,o){E(r,t,o),c(t,i)},p(r,o){o&1&&n!==(n=r[0].errorMessages.locale+"")&&oe(i,n)},d(r){r&&$(t)}}}function ut(e){let t,n,i,r;function o(...a){return e[14](e[20],...a)}function u(...a){return e[15](e[20],...a)}return{c(){t=m("input"),t.value=n=e[0].options[e[20]],p(t,"type","text"),p(t,"id",`option-${e[20]}`)},m(a,s){E(a,t,s),i||(r=[T(t,"blur",o),T(t,"keydown",u),T(t,"focus",e[8])],i=!0)},p(a,s){e=a,s&1&&n!==(n=e[0].options[e[20]])&&t.value!==n&&(t.value=n)},d(a){a&&$(t),i=!1,Q(r)}}}function ct(e){let t,n,i,r,o=K(e[21]),u=[];for(let s=0;s<o.length;s+=1)u[s]=Le(Ce(e,o,s));function a(...s){return e[13](e[20],...s)}return{c(){t=m("select");for(let s=0;s<u.length;s+=1)u[s].c();p(t,"id",`option-${e[20]}`),p(t,"class","input")},m(s,l){E(s,t,l);for(let d=0;d<u.length;d+=1)u[d]&&u[d].m(t,null);Ee(t,e[0].options[e[20]]||"undefined"),i||(r=T(t,"change",a),i=!0)},p(s,l){if(e=s,l&0){o=K(e[21]);let d;for(d=0;d<o.length;d+=1){const g=Ce(e,o,d);u[d]?u[d].p(g,l):(u[d]=Le(g),u[d].c(),u[d].m(t,null))}for(;d<u.length;d+=1)u[d].d(1);u.length=o.length}l&1&&n!==(n=e[0].options[e[20]]||"undefined")&&Ee(t,e[0].options[e[20]]||"undefined")},d(s){s&&$(t),ge(u,s),i=!1,r()}}}function Le(e){let t,n=e[24]+"",i;return{c(){t=m("option"),i=P(n),t.__value=e[24],x(t,t.__value)},m(r,o){E(r,t,o),c(t,i)},p:z,d(r){r&&$(t)}}}function Ae(e){let t,n,i=e[20]+"",r,o;function u(l,d){return Array.isArray(l[21])?ct:ut}let s=u(e)(e);return{c(){t=m("div"),n=m("label"),r=P(i),o=O(),s.c(),p(n,"for",`option-${e[20]}`),p(t,"class","labelled-input")},m(l,d){E(l,t,d),c(t,n),c(n,r),c(t,o),s.m(t,null)},p(l,d){s.p(l,d)},d(l){l&&$(t),s.d()}}}function dt(e){let t;return{c(){t=m("hr")},m(n,i){E(n,t,i)},d(n){n&&$(t)}}}function Be(e){let t,n=e[19]<Object.keys(le.dates).length-1,i,r=K(Object.entries(e[17])),o=[];for(let a=0;a<r.length;a+=1)o[a]=Ae(je(e,r,a));let u=n&&dt();return{c(){for(let a=0;a<o.length;a+=1)o[a].c();t=O(),u&&u.c(),i=ze()},m(a,s){for(let l=0;l<o.length;l+=1)o[l]&&o[l].m(a,s);E(a,t,s),u&&u.m(a,s),E(a,i,s)},p(a,s){if(s&897){r=K(Object.entries(a[17]));let l;for(l=0;l<r.length;l+=1){const d=je(a,r,l);o[l]?o[l].p(d,s):(o[l]=Ae(d),o[l].c(),o[l].m(t.parentNode,t))}for(;l<o.length;l+=1)o[l].d(1);o.length=r.length}},d(a){a&&($(t),$(i)),ge(o,a),u&&u.d(a)}}}function ft(e){let t,n,i,r,o,u,a,s,l=e[0].expressionText+"",d,g,N,M,j,te,G,C,R=e[0].outputText+"",Y,f,_,S,L,H,se,ye,I,ne,be,ve,U,V,ae,we,D,ie,ke,Oe,A,ue,Se,W,ce,re,de,$e,w=e[0].errorMessages.date&&Fe(e),k=e[0].errorMessages.locale&&Ne(e),Z=K(Object.entries(le.dates)),b=[];for(let h=0;h<Z.length;h+=1)b[h]=Be(Pe(e,Z,h));return{c(){t=m("main"),n=m("div"),i=m("article"),r=m("h1"),r.textContent="code",o=O(),u=m("pre"),a=P(""),s=m("code"),d=P(l),g=P(`\r
      `),N=O(),M=m("article"),j=m("div"),j.innerHTML="<h1>output</h1>",te=O(),G=m("div"),C=m("code"),Y=P(R),_=O(),S=m("div"),L=m("article"),H=m("div"),se=m("h1"),se.textContent="date",ye=O(),I=m("input"),be=O(),w&&w.c(),ve=O(),U=m("article"),V=m("div"),ae=m("h1"),ae.textContent="locale",we=O(),D=m("input"),ke=O(),k&&k.c(),Oe=O(),A=m("article"),ue=m("h1"),ue.textContent="options",Se=O(),W=m("div");for(let h=0;h<b.length;h+=1)b[h].c();ce=O(),re=m("footer"),re.innerHTML='Taylor Plewe, 2024 - <a href="https://github.com/taylorplewe/intlformat.me" target="_blank">GitHub repo</a>',p(s,"id","expression"),p(i,"class","overflow-auto"),p(j,"id","output-header"),p(C,"id","output"),p(C,"class",f=e[2]?"shrink":""),p(G,"id","output-container"),p(M,"class","flex-grow"),p(n,"id","preview"),p(I,"class",ne=e[0].errorMessages.date?"invalid":""),p(H,"class","labelled-input--full"),p(L,"id","date-section"),p(D,"class",ie=e[0].errorMessages.locale?"invalid":""),p(V,"class","labelled-input--full"),p(W,"id","options-list"),p(A,"id","options"),p(A,"class","flex-grow overflow-auto"),p(S,"id","controls")},m(h,v){E(h,t,v),c(t,n),c(n,i),c(i,r),c(i,o),c(i,u),c(u,a),c(u,s),c(s,d),c(u,g),c(n,N),c(n,M),c(M,j),c(M,te),c(M,G),c(G,C),c(C,Y),e[10](C),c(t,_),c(t,S),c(S,L),c(L,H),c(H,se),c(H,ye),c(H,I),x(I,e[4]),c(L,be),w&&w.m(L,null),c(S,ve),c(S,U),c(U,V),c(V,ae),c(V,we),c(V,D),x(D,e[3]),c(U,ke),k&&k.m(U,null),c(S,Oe),c(S,A),c(A,ue),c(A,Se),c(A,W);for(let y=0;y<b.length;y+=1)b[y]&&b[y].m(W,null);E(h,ce,v),E(h,re,v),de||($e=[T(I,"input",e[11]),T(I,"blur",e[6]),T(I,"keydown",e[6]),T(I,"focus",e[8]),T(D,"input",e[12]),T(D,"blur",e[5]),T(D,"keydown",e[5]),T(D,"focus",e[8])],de=!0)},p(h,[v]){if(v&1&&l!==(l=h[0].expressionText+"")&&oe(d,l),v&1&&R!==(R=h[0].outputText+"")&&oe(Y,R),v&4&&f!==(f=h[2]?"shrink":"")&&p(C,"class",f),v&1&&ne!==(ne=h[0].errorMessages.date?"invalid":"")&&p(I,"class",ne),v&16&&I.value!==h[4]&&x(I,h[4]),h[0].errorMessages.date?w?w.p(h,v):(w=Fe(h),w.c(),w.m(L,null)):w&&(w.d(1),w=null),v&1&&ie!==(ie=h[0].errorMessages.locale?"invalid":"")&&p(D,"class",ie),v&8&&D.value!==h[3]&&x(D,h[3]),h[0].errorMessages.locale?k?k.p(h,v):(k=Ne(h),k.c(),k.m(U,null)):k&&(k.d(1),k=null),v&897){Z=K(Object.entries(le.dates));let y;for(y=0;y<Z.length;y+=1){const Me=Pe(h,Z,y);b[y]?b[y].p(Me,v):(b[y]=Be(Me),b[y].c(),b[y].m(W,null))}for(;y<b.length;y+=1)b[y].d(1);b.length=Z.length}},i:z,o:z,d(h){h&&($(t),$(ce),$(re)),e[10](null),w&&w.d(),k&&k.d(),ge(b,h),de=!1,Q($e)}}}function ht(e,t,n){const i=new at;let r=null,o=!1;const u=async()=>{await Qe(),!(!r||!r.parentNode)&&n(2,o=r.getBoundingClientRect().width>r.parentNode.getBoundingClientRect().width*.75)};let a=i.locale,s=i.dateString;const l=f=>{var _;if("key"in f){f.key==="Enter"&&((_=f.target)==null||_.blur());return}n(0,i.locale=a,i),n(3,a=i.locale)},d=f=>{var _;if("key"in f){f.key==="Enter"&&((_=f.target)==null||_.blur());return}n(0,i.dateString=s,i),n(4,s=i.dateString)},g=(f,_)=>{var S;if("key"in f){f.key==="Enter"&&((S=f.target)==null||S.blur());return}i.setOption(_,f.target.value)},N=({target:f})=>f==null?void 0:f.select(),M=(f,_)=>{const{value:S}=f.target;i.setOption(_,S),n(0,i.dateString=s,i)};function j(f){he[f?"unshift":"push"](()=>{r=f,n(1,r)})}function te(){s=this.value,n(4,s)}function G(){a=this.value,n(3,a)}const C=(f,_)=>M(_,f),R=(f,_)=>g(_,f),Y=(f,_)=>g(_,f);return e.$$.update=()=>{e.$$.dirty&1&&i.outputText&&u()},[i,r,o,a,s,l,d,g,N,M,j,te,G,C,R,Y]}class mt extends ot{constructor(t){super(),rt(this,t,ht,ft,Je,{})}}new mt({target:document.getElementById("app")});
