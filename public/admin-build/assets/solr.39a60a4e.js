import{aS as e}from"./vendor.6668b54f.js";var t,n={};(t=e.exports).defineMode("solr",(function(){var e=/[^\s\|\!\+\-\*\?\~\^\&\:\(\)\[\]\{\}\"\\]/,t=/[\|\!\+\-\*\?\~\^\&]/,n=/^(OR|AND|NOT|TO)$/i;function r(e){return parseFloat(e).toString()===e}function o(e){return function(t,n){for(var r,o=!1;null!=(r=t.next())&&(r!=e||o);)o=!o&&"\\"==r;return o||(n.tokenize=a),"string"}}function i(e){return function(t,n){var r="operator";return"+"==e?r+=" positive":"-"==e?r+=" negative":"|"==e?t.eat(/\|/):"&"==e?t.eat(/\&/):"^"==e&&(r+=" boost"),n.tokenize=a,r}}function u(t){return function(o,i){for(var u=t;(t=o.peek())&&null!=t.match(e);)u+=o.next();return i.tokenize=a,n.test(u)?"operator":r(u)?"number":":"==o.peek()?"field":"string"}}function a(n,r){var f=n.next();return'"'==f?r.tokenize=o(f):t.test(f)?r.tokenize=i(f):e.test(f)&&(r.tokenize=u(f)),r.tokenize!=a?r.tokenize(n,r):null}return{startState:function(){return{tokenize:a}},token:function(e,t){return e.eatSpace()?null:t.tokenize(e,t)}}})),t.defineMIME("text/x-solr","solr");var r=n,o=Object.freeze(Object.assign(Object.create(null),n,{[Symbol.toStringTag]:"Module",default:r}));export{o as s};
