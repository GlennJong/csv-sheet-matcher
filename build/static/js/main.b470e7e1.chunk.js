(this["webpackJsonpcsv-matcher"]=this["webpackJsonpcsv-matcher"]||[]).push([[0],{16:function(e,t,a){e.exports=a(44)},21:function(e,t,a){},22:function(e,t,a){},43:function(e,t,a){},44:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),l=a(13),s=a.n(l),r=(a(21),a(22),a(3)),i=(a(23),a(15));a(43);function o(e){var t=e.titleName,a=e.className,l=e.getFileInfo,s=e.children,o=Object(n.useState)(null),m=Object(r.a)(o,2),u=m[0],f=m[1],d=Object(n.useState)(""),E=Object(r.a)(d,2),b=E[0],h=E[1],p=Object(n.useCallback)((function(e){"text/csv"===e[0].type?(h(""),f(e[0]),l(e)):(f(null),h("\u9019\u500b\u6a94\u6848\u4e0d\u662f .csv \u5594\uff01"))}),[]),N=Object(i.a)({onDrop:p}),v=N.getRootProps,O=N.getInputProps,k=N.isDragActive;return c.a.createElement("div",Object.assign({},v(),{className:"".concat(a," ").concat(k?"-active":"")}),c.a.createElement("input",Object.assign({},O(),{multiple:!1,accept:".csv"})),c.a.createElement("div",{className:"icon"},c.a.createElement("i",{className:"far fa-file-alt"})),k?c.a.createElement("p",{className:"msg"},"\u62d6\u66f3\u5230\u9019\u88e1"):c.a.createElement("p",{className:"msg"},"\u9ede\u64ca\u6216\u62d6\u66f3\u5230\u9019\u88e1"),""!==b&&c.a.createElement("p",{className:"error"},c.a.createElement("i",{className:"fas fa-times"})," ",b),u&&c.a.createElement("p",{className:"name"},c.a.createElement("i",{className:"fas fa-check-circle"})," ",t," ",u.name),c.a.createElement("p",{className:"info"},s))}var m=function(){var e={tagSelector:Object(n.useRef)(null),additionSelector:Object(n.useRef)(null),editSheetA:Object(n.useRef)(null),editSheetB:Object(n.useRef)(null),editSheetC:Object(n.useRef)(null)},t=Object(n.useState)([]),a=Object(r.a)(t,2),l=a[0],s=a[1],i=Object(n.useState)([]),m=Object(r.a)(i,2),u=m[0],f=m[1],d=Object(n.useState)([]),E=Object(r.a)(d,2),b=E[0],h=E[1],p=Object(n.useState)("normal"),N=Object(r.a)(p,2),v=N[0],O=N[1],k=Object(n.useState)("normal"),g=Object(r.a)(k,2),S=g[0],j=g[1],C=Object(n.useState)(!1),x=Object(r.a)(C,2),y=x[0],w=x[1],A=Object(n.useState)(!1),B=Object(r.a)(A,2),F=B[0],I=B[1],J=Object(n.useState)(null),R=Object(r.a)(J,2),L=R[0],$=R[1],D=Object(n.useState)(null),P=Object(r.a)(D,2),T=P[0],W=P[1],z=Object(n.useState)(null),U=Object(r.a)(z,2),q=U[0],G=U[1];Object(n.useEffect)((function(){}),[l,b]);var H=function(e,t){var a=e[0],n=new FileReader;n.onload=function(){var e=function(e){var t=/,(?=(?:(?:[^"]*"){2})*[^"]*$)/g;return e.split(/\n(?=(?:(?:[^"]*"){2})*[^"]*$)/g).map((function(e){var a=e.split(t);return a=a.filter((function(e){return void 0!==e}))}))}(n.result);switch(t){case"sheetA":$({name:a.name,sheet:e});break;case"sheetB":W({name:a.name,sheet:e})}},n.readAsText(a)},K=function(){var e=JSON.parse(JSON.stringify(T.sheet)),t=T.name,a=JSON.parse(JSON.stringify(L.sheet)),n=L.name;$({name:t,sheet:e}),W({name:n,sheet:a})},M=function(e){var t=l.slice();if(-1===t.indexOf(e))t.push(e);else{var a=t.findIndex((function(t){return t===e}));t.splice(a,1)}s(t)},Q=function(e){var t=b.slice();if(-1===t.indexOf(e))t.push(e);else{var a=t.findIndex((function(t){return t===e}));t.splice(a,1)}h(t)},V=function(t,a){var n=t.currentTarget,c=e[a].current;c.classList.contains("-active")?c.classList.remove("-active"):c.classList.add("-active"),n.classList.contains("-active")?n.classList.remove("-active"):n.classList.add("-active")},X=function(e){switch(e){case"sheetA":Y(L.name,L.sheet);break;case"sheetB":Y(T.name,T.sheet);break;case"sheetC":Y("merge-".concat(L.name),q)}},Y=function(e,t){var a="";t.forEach((function(e){var t="";e.forEach((function(e,a){0===a&&console.log(e);var n=e.replace(/#/gi,"\uff03");n=0===a?n:",".concat(n),t+=n})),a+=t+"\n"})),function(e,t){var a=document.createElement("a");a.setAttribute("download",e),a.setAttribute("href",t),a.click(),document.body.append(a)}("".concat(e),"data:text/csv;charset=utf-8,%EF%BB%BF"+encodeURI(a))};return c.a.createElement("div",{className:"csv-matcher"},c.a.createElement("div",{className:"upload-wrapper ".concat(y?"-active":"")},c.a.createElement("div",{className:"drop-zone ".concat(L&&T?"-active":"")},c.a.createElement(o,{titleName:"\u57fa\u790e\u8868\u683c",className:"file",getFileInfo:function(e){return H(e,"sheetA")}},"\u3010\u57fa\u790e\u8868\u683c\u3011\u7528\u4f86\u88ab\u6bd4\u5c0d\u8868\u683c\u5167\u7684\u8cc7\u6599\uff0c\u4e5f\u53ef\u4ee5\u5e6b\u8868\u683c\u5167\u64f4\u5145\u66f4\u591a\u5167\u5bb9\u3002"),c.a.createElement(o,{titleName:"\u5c0d\u7167\u8868\u683c",className:"file",getFileInfo:function(e){return H(e,"sheetB")}},"\u3010\u5c0d\u7167\u8868\u683c\u3011\u7528\u4f86\u6bd4\u5c0d\u57fa\u790e\u8868\u683c\u5167\u7684\u8cc7\u6599\uff0c\u4e5f\u53ef\u4ee5\u7528\u5c0d\u7167\u8868\u683c\u7684\u6b04\u4f4d\u64f4\u5145\u5230\u57fa\u790e\u8868\u683c\u3002"),c.a.createElement("button",{className:"start ".concat(L&&T?"-active":""),onClick:function(){w(!0)}},c.a.createElement("i",{className:"fas fa-table"})," \u958b\u59cb\u88fd\u4f5c\u8868\u683c"))),c.a.createElement("div",{className:"application ".concat(F?"-result":""," -").concat(S)},c.a.createElement("div",{className:"options-bar"},c.a.createElement("div",{className:"controller-wrapper"},c.a.createElement("div",{className:"tag-selector controller"},c.a.createElement("div",{className:"dropdown"},c.a.createElement("div",{className:"head",onClick:function(e){return V(e,"tagSelector")}},c.a.createElement("i",{className:"fas fa-thumbtack"}),c.a.createElement("span",null,"\u6838\u5c0d\u6b04\u4f4d")),c.a.createElement("div",{className:"items",ref:e.tagSelector},T&&T.sheet[0].map((function(e,t){return c.a.createElement("button",{key:t,className:-1!==l.indexOf(t)?"-tag":"",onClick:function(){return M(t)}},e)})))),c.a.createElement("div",{className:"selected"},l&&l.map((function(e,t){return c.a.createElement("button",{key:t,onClick:function(){return M(e)}},c.a.createElement("i",{className:"fa fa-times"}),T.sheet[0][e])})))),c.a.createElement("div",{className:"addition-selector controller"},c.a.createElement("div",{className:"dropdown"},c.a.createElement("div",{className:"head",onClick:function(e){return V(e,"additionSelector")}},c.a.createElement("i",{className:"fas fa-file-import"}),c.a.createElement("span",null,"\u6dfb\u52a0\u6b04\u4f4d")),c.a.createElement("div",{className:"items",ref:e.additionSelector},T&&T.sheet[0].map((function(e,t){return c.a.createElement("button",{key:t,className:-1!==b.indexOf(t)?"-tag":"",onClick:function(){return Q(t)}},e)})))),c.a.createElement("div",{className:"selected"},b&&b.map((function(e,t){return c.a.createElement("button",{key:t,onClick:function(){return Q(e)}},c.a.createElement("i",{className:"fa fa-times"}),T.sheet[0][e])}))))),c.a.createElement("button",{className:"options-submit",onClick:function(){return function(){var e=JSON.parse(JSON.stringify(L.sheet)),t=[],a=e[0].length+b.length,n=e[0].length;b.forEach((function(t){e[0].push(T.sheet[0][t])})),T.sheet.forEach((function(c){var s=l.map((function(e){return c[e]}));e.forEach((function(e,l){0!==l&&(function(e,t){return t.map((function(t){return-1!==e.indexOf(t)})).includes(!0)}(e,s)&&b.forEach((function(s,r){e.length<a?e.push(c[s]):(-1===t.indexOf(l)&&t.push(l),e[n+r]+=" \uff0f ".concat(c[s]))})))}))})),e.forEach((function(e){if(e.length<a)for(var t=0;t<a;t++)e[t]=void 0===e[t]?"":e[t]})),G(e),f(t),I(!0)}()}},c.a.createElement("i",{className:"fas fa-edit"}),c.a.createElement("span",null,"\u88fd\u4f5c\u8868\u683c"))),c.a.createElement("div",{className:"table-wrapper -".concat(v," ")},c.a.createElement("div",{className:"item left"},c.a.createElement("div",{className:"table-head"},c.a.createElement("div",{className:"name"},c.a.createElement("i",{className:"icon fas fa-table"}),c.a.createElement("span",null,"\u57fa\u790e\u8868\u683c ",L&&L.name)),c.a.createElement("div",{className:"dropdown"},c.a.createElement("button",{onClick:function(e){return V(e,"editSheetA")}},"\u7de8\u8f2f"),c.a.createElement("div",{className:"items",ref:e.editSheetA},c.a.createElement("button",{className:"file-selector"},c.a.createElement("label",{htmlFor:"sheet-a-upload"},"\u91cd\u65b0\u9078\u64c7\u8868\u683c"),c.a.createElement("input",{onChange:function(e){H(e.target.files,"sheetA"),V(e,"editSheetA")},id:"sheet-a-upload",className:"button",type:"file"})),c.a.createElement("button",{onClick:K},"\u8868\u683c\u4e92\u63db"),c.a.createElement("button",{onClick:function(e){X("sheetA"),V(e,"editSheetA")}},"\u4e0b\u8f09\u6b64\u8868\u683c")))),c.a.createElement("div",{className:"table"},c.a.createElement("table",null,c.a.createElement("tbody",null,L&&L.sheet.map((function(e,t){return c.a.createElement("tr",{key:"l".concat(t)},e.map((function(e,t){return c.a.createElement("td",{key:"c".concat(t)},e)})))}))))),"normal"===v&&c.a.createElement("button",{className:"expand-button",onClick:function(){return O("left")}},c.a.createElement("i",{className:"fa fa-expand-alt"})),"normal"!==v&&c.a.createElement("button",{className:"expand-button -reverse",onClick:function(){return O("normal")}},c.a.createElement("i",{className:"fa fa-compress-alt"}))),c.a.createElement("div",{className:"item right"},c.a.createElement("div",{className:"table-head"},c.a.createElement("div",{className:"name"},c.a.createElement("i",{className:"icon fas fa-angle-double-left"}),c.a.createElement("span",null,"\u5c0d\u7167\u8868\u683c ",T&&T.name)),c.a.createElement("div",{className:"dropdown"},c.a.createElement("button",{onClick:function(e){return V(e,"editSheetB")}},"\u7de8\u8f2f"),c.a.createElement("div",{className:"items",ref:e.editSheetB},c.a.createElement("button",{className:"file-selector"},c.a.createElement("label",{htmlFor:"sheet-b-upload"},"\u91cd\u65b0\u9078\u64c7\u8868\u683c"),c.a.createElement("input",{onChange:function(e){H(e.target.files,"sheetB"),V(e,"editSheetB")},id:"sheet-b-upload",className:"button",type:"file"})),c.a.createElement("button",{onClick:K},"\u8868\u683c\u4e92\u63db"),c.a.createElement("button",{onClick:function(e){X("sheetB"),V(e,"editSheetB")}},"\u4e0b\u8f09\u6b64\u8868\u683c")))),c.a.createElement("div",{className:"table"},c.a.createElement("table",null,c.a.createElement("tbody",null,T&&T.sheet.map((function(e,t){return c.a.createElement("tr",{key:"l".concat(t)},e.map((function(e,t){return c.a.createElement("td",{key:"c".concat(t),className:"".concat(-1!==l.indexOf(t)?"-tag":""," ").concat(-1!==b.indexOf(t)?"-addition":"")},e)})))}))))),"normal"===v&&c.a.createElement("button",{className:"expand-button",onClick:function(){return O("right")}},c.a.createElement("i",{className:"fa fa-expand-alt"})),"normal"!==v&&c.a.createElement("button",{className:"expand-button -reverse",onClick:function(){return O("normal")}},c.a.createElement("i",{className:"fa fa-compress-alt"})))),c.a.createElement("div",{className:"result-wrapper"},c.a.createElement("div",{className:"table-head"},c.a.createElement("div",{className:"name"},c.a.createElement("i",{className:"icon fas fa-columns"}),c.a.createElement("span",null,"\u5408\u4f75\u5f8c\u8868\u683c")),c.a.createElement("div",{className:"dropdown"},c.a.createElement("button",{onClick:function(e){return V(e,"editSheetC")}},"\u7de8\u8f2f"),c.a.createElement("div",{className:"items",ref:e.editSheetC},c.a.createElement("button",{onClick:function(e){X("sheetC"),V(e,"editSheetC")}},"\u4e0b\u8f09\u6b64\u8868\u683c"))),c.a.createElement("button",{className:"close",onClick:function(){G([]),I(!1)}},c.a.createElement("i",{className:"fas fa-times"}))),c.a.createElement("div",{className:"table"},c.a.createElement("table",null,c.a.createElement("tbody",null,q&&q.map((function(e,t){return c.a.createElement("tr",{key:"l".concat(t),className:-1!==u.indexOf(t)?"-conflict":""},e.map((function(e,t){return c.a.createElement("td",{key:"c".concat(t),className:t+1>L.sheet[0].length?"-increase":""},e)})))}))))),"fill"===S&&c.a.createElement("button",{className:"expand-button",onClick:function(){return j("normal")}},c.a.createElement("i",{className:"fa fa-compress-alt"})),"fill"!==S&&c.a.createElement("button",{className:"expand-button -reverse",onClick:function(){return j("fill")}},c.a.createElement("i",{className:"fa fa-expand-alt"})))))};var u=function(){return c.a.createElement("div",{className:"App"},c.a.createElement(m,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(c.a.createElement(u,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[16,1,2]]]);
//# sourceMappingURL=main.b470e7e1.chunk.js.map