import{aS as e}from"./vendor.6668b54f.js";var t,r={};(t=e.exports).defineMode("elm",(function(){function e(e,t,r){return t(r),r(e,t)}var t=/[a-z]/,r=/[A-Z]/,n=/[a-zA-Z0-9_]/,i=/[0-9]/,o=/[0-9A-Fa-f]/,a=/[-&*+.\\/<>=?^|:]/,f=/[(),[\]{}]/,u=/[ \v\f]/;function s(){return function(s,d){if(s.eatWhile(u))return null;var g=s.next();if(f.test(g))return"{"===g&&s.eat("-")?e(s,d,l(1)):"["===g&&s.match("glsl|")?e(s,d,x):"builtin";if("'"===g)return e(s,d,p);if('"'===g)return s.eat('"')?s.eat('"')?e(s,d,c):"string":e(s,d,m);if(r.test(g))return s.eatWhile(n),"variable-2";if(t.test(g)){var h=1===s.pos;return s.eatWhile(n),h?"def":"variable"}if(i.test(g)){if("0"===g){if(s.eat(/[xX]/))return s.eatWhile(o),"number"}else s.eatWhile(i);return s.eat(".")&&s.eatWhile(i),s.eat(/[eE]/)&&(s.eat(/[-+]/),s.eatWhile(i)),"number"}return a.test(g)?"-"===g&&s.eat("-")?(s.skipToEnd(),"comment"):(s.eatWhile(a),"keyword"):"_"===g?"keyword":"error"}}function l(e){return 0==e?s():function(t,r){for(;!t.eol();){var n=t.next();if("{"==n&&t.eat("-"))++e;else if("-"==n&&t.eat("}")&&0==--e)return r(s()),"comment"}return r(l(e)),"comment"}}function c(e,t){for(;!e.eol();)if('"'===e.next()&&e.eat('"')&&e.eat('"'))return t(s()),"string";return"string"}function m(e,t){for(;e.skipTo('\\"');)e.next(),e.next();return e.skipTo('"')?(e.next(),t(s()),"string"):(e.skipToEnd(),t(s()),"error")}function p(e,t){for(;e.skipTo("\\'");)e.next(),e.next();return e.skipTo("'")?(e.next(),t(s()),"string"):(e.skipToEnd(),t(s()),"error")}function x(e,t){for(;!e.eol();)if("|"===e.next()&&e.eat("]"))return t(s()),"string";return"string"}var d={case:1,of:1,as:1,if:1,then:1,else:1,let:1,in:1,type:1,alias:1,module:1,where:1,import:1,exposing:1,port:1};return{startState:function(){return{f:s()}},copyState:function(e){return{f:e.f}},token:function(e,t){var r=t.f(e,(function(e){t.f=e})),n=e.current();return d.hasOwnProperty(n)?"keyword":r}}})),t.defineMIME("text/x-elm","elm");var n=r,i=Object.freeze(Object.assign(Object.create(null),r,{[Symbol.toStringTag]:"Module",default:n}));export{i as e};
