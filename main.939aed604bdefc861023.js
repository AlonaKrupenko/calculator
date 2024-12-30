(()=>{"use strict";var n={365:(n,e,t)=>{t.d(e,{A:()=>s});var r=t(601),o=t.n(r),i=t(314),a=t.n(i)()(o());a.push([n.id,"body {\n  background-color: #f5f5f5;\n  min-height: 90vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-family: sans-serif;\n  /* box-sizing: border-box; */\n}\n\n.container {\n  box-sizing: border-box;\n  background-color: #535353;\n  max-width: 300px;\n  height: auto;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border-radius: 16px;\n  user-select: none;\n  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;\n}\n\n#answerArea {\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  justify-content: end;\n  align-items: end;\n  gap: 4px;\n  width: 100%;\n  height: 96px;\n  padding: 8px;\n  overflow: hidden;\n}\n\n.inputHistory {\n  text-align: right;\n  font-size: large;\n  color: #7d7d7d;\n  width: 100%;\n  white-space: nowrap;\n  overflow-x: scroll;\n  overflow-y: hidden;\n}\n\n.inputHistory::-webkit-scrollbar {\n  height: 2px;\n}\n\n.inputHistory::-webkit-scrollbar-thumb {\n  background: #7d7d7d;\n}\n\n.inputHistory::-webkit-scrollbar-track {\n  background: #ff9d0b8c;\n}\n\n.displayValue {\n  font-size: xx-large;\n  color: white;\n  white-space: nowrap;\n}\n\n.keypad-btns {\n  display: grid;\n  grid: repeat(5, 75px) / repeat(4, 75px);\n  width: 100%;\n}\n\n.keypad-btns button {\n  outline: none;\n  border: none;\n  background-color: #7d7d7d;\n  color: white;\n  font-size: x-large;\n  border: 1px solid #535353;\n}\n\n.keypad-btns button:last-child {\n  border-bottom-right-radius: 16px;\n}\n\n.keypad-btns button:nth-last-child(4) {\n  border-bottom-left-radius: 16px;\n}\n\n.keypad-btns .accent_btn_top {\n  background-color: #646464;\n}\n\n.keypad-btns .accent_btn_side {\n  background-color: #ff9f0b;\n}\n\n.accent_btn_side:hover,\n.accent_btn_top:hover,\n.basic_btn:hover {\n  filter: brightness(90%);\n}\n",""]);const s=a},314:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",r=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),r&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),r&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,r,o,i){"string"==typeof n&&(n=[[null,n,void 0]]);var a={};if(r)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(a[c]=!0)}for(var l=0;l<n.length;l++){var d=[].concat(n[l]);r&&a[d[0]]||(void 0!==i&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=i),t&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=t):d[2]=t),o&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=o):d[4]="".concat(o)),e.push(d))}},e}},601:n=>{n.exports=function(n){return n[1]}},72:n=>{var e=[];function t(n){for(var t=-1,r=0;r<e.length;r++)if(e[r].identifier===n){t=r;break}return t}function r(n,r){for(var i={},a=[],s=0;s<n.length;s++){var c=n[s],l=r.base?c[0]+r.base:c[0],d=i[l]||0,u="".concat(l," ").concat(d);i[l]=d+1;var p=t(u),f={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==p)e[p].references++,e[p].updater(f);else{var h=o(f,r);r.byIndex=s,e.splice(s,0,{identifier:u,updater:h,references:1})}a.push(u)}return a}function o(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,o){var i=r(n=n||[],o=o||{});return function(n){n=n||[];for(var a=0;a<i.length;a++){var s=t(i[a]);e[s].references--}for(var c=r(n,o),l=0;l<i.length;l++){var d=t(i[l]);0===e[d].references&&(e[d].updater(),e.splice(d,1))}i=c}}},659:n=>{var e={};n.exports=function(n,t){var r=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},540:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},56:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},825:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var o=void 0!==t.layer;o&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,o&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var i=t.sourceMap;i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleTagTransform(r,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},113:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},e={};function t(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={id:r,exports:{}};return n[r](i,i.exports,t),i.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var r in e)t.o(e,r)&&!t.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:e[r]})},t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),t.nc=void 0;var r=t(72),o=t.n(r),i=t(825),a=t.n(i),s=t(659),c=t.n(s),l=t(56),d=t.n(l),u=t(540),p=t.n(u),f=t(113),h=t.n(f),b=t(365),g={};g.styleTagTransform=h(),g.setAttributes=d(),g.insert=c().bind(null,"head"),g.domAPI=a(),g.insertStyleElement=p(),o()(b.A,g),b.A&&b.A.locals&&b.A.locals;const v=n=>{if(n)return n.toString().startsWith("(-")?n.toString().endsWith(")")?n.slice(1,-1):n.toString().endsWith("%")?`${n.slice(1,-2)}%`:n:n},m=(n,e,t)=>{const r=v(n),o=v(e);return"+"===t?r+o:"-"===t?r-o:"*"===t?r*o:"/"===t?0===o?NaN:r/o:void 0},y=n=>n.toString().endsWith("%")?+n.slice(0,-1)/100:+n,x=(n,e,t)=>n.slice(0,e-1).concat(t,n.slice(e+2));let w=document.querySelector(".displayValue"),k=document.querySelector(".inputHistory"),S=document.querySelectorAll("button"),T="",W=[];const _=()=>{w.innerHTML=W.join("")+T||"0"},A=()=>{T&&(T=(n=>{if(n.includes(",")){const[e,t]=n.split(","),r=t.replace(/0+$/,"");return r?`${e},${r}`:e}return n.replace(/^0+/,"")||"0"})(T),T.startsWith("(-")&&!T.includes(")")?W.push(T+")"):W.push(T),T="")};S.forEach((n=>{n.addEventListener("click",(()=>{if(n.classList.contains("figure_btn")){if(T.endsWith("%")||T.endsWith(")"))return void alert("Cannot add numbers after '%' or')'.");T+=n.value,/^0[0-9]/.test(T)&&(T=T.replace(/^0+/,"0")),_()}if(n.classList.contains("basic_operator")){if(A(),0===W.length&&""===T)return void alert("Please enter a number first.");W.length>0&&["+","-","*","/"].includes(W[W.length-1])?W[W.length-1]=n.value:(A(),W.push(n.value)),_()}"clear"===n.id&&(T="",W=[],_(),k.innerHTML=""),"erase"===n.id&&(()=>{if(T)T=T.slice(0,-1);else if(W.length>0){const n=W.pop();T=W.pop(),n.length>1&&W.push(n.slice(0,-1))}_()})(),"invert"===n.id&&(T?T.startsWith("(-")?T.endsWith(")")?T=T.slice(2,-1):T.includes(")")||(T=T.slice(2)):T=`(-${T})`:alert("The last element is symbol, not possible to invert"),_()),"comma"===n.id&&(()=>{if(T){if(T.endsWith("%")||T.endsWith(")"))return void alert("Cannot add comma after '%' or ')'.");if(T.includes(",")){if(!T.endsWith(","))return void alert("Too many commas")}else T=`${T},`}else T="0,";_()})(),"percent"===n.id&&(T||alert("You cannot add '%' without a number."),T.includes("%")?alert("The percentage sign is already added."):(T+="%",_())),"calculate"===n.id&&(()=>{if(A(),0===W.length)return void alert("You need to input something before calculation");let n=W.map((n=>n.includes(",")?n.replace(",","."):n)),e=(n=>{const[e,t]=n.toString().split(".");return!t||t.length<=4?n:+`${e}.${t.slice(0,4)}`})((t=n,function n(e){if(1===e.length)return e[0].toString().includes("%")&&e[0].startsWith("(-")?+v(e[0]).slice(0,-1)/100:e[0].toString().includes("%")?+e[0].slice(0,-1)/100:+e[0];for(let t=1;t<e.length;t++){let r=v(e[t-1]),o=v(e[t+1]);if("*"===e[t]||"/"===e[t]){r=y(r),o=y(o);const i=m(r,o,e[t]);return n(x(e,t,i))}}for(let t=1;t<e.length;t++){let r=v(e[t-1]),o=v(e[t+1]);if("+"===e[t]||"-"===e[t]){r=y(r),o.toString().includes("%")&&(o=r*+o.slice(0,-1)/100);let i=m(+r,+o,e[t]);return n(x(e,t,i))}}}(t))).toString().replace(".",",");var t;w.innerHTML=e,k.innerHTML=W.join(""),T=e,W=[]})()}))}))})();