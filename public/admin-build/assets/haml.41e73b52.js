import{aS as e}from"./vendor.6668b54f.js";import{a as t}from"./htmlmixed.f3b0975e.js";import{a as n}from"./ruby.f26fb92b.js";var r,i={};r=e.exports,t.exports,n.exports,r.defineMode("haml",(function(e){var t=r.getMode(e,{name:"htmlmixed"}),n=r.getMode(e,"ruby");function i(e){return function(t,n){return t.peek()==e&&1==n.rubyState.tokenize.length?(t.next(),n.tokenize=a,"closeAttributeTag"):o(t,n)}}function o(e,t){return e.match("-#")?(e.skipToEnd(),"comment"):n.token(e,t.rubyState)}function a(e,n){var r=e.peek();if("comment"==n.previousToken.style&&n.indented>n.previousToken.indented)return e.skipToEnd(),"commentLine";if(n.startOfLine){if("!"==r&&e.match("!!"))return e.skipToEnd(),"tag";if(e.match(/^%[\w:#\.]+=/))return n.tokenize=o,"hamlTag";if(e.match(/^%[\w:]+/))return"hamlTag";if("/"==r)return e.skipToEnd(),"comment"}if((n.startOfLine||"hamlTag"==n.previousToken.style)&&("#"==r||"."==r))return e.match(/[\w-#\.]*/),"hamlAttribute";if(n.startOfLine&&!e.match("--\x3e",!1)&&("="==r||"-"==r))return n.tokenize=o,n.tokenize(e,n);if("hamlTag"==n.previousToken.style||"closeAttributeTag"==n.previousToken.style||"hamlAttribute"==n.previousToken.style){if("("==r)return n.tokenize=i(")"),n.tokenize(e,n);if("{"==r&&!e.match(/^\{%.*/))return n.tokenize=i("}"),n.tokenize(e,n)}return t.token(e,n.htmlState)}return{startState:function(){return{htmlState:r.startState(t),rubyState:r.startState(n),indented:0,previousToken:{style:null,indented:0},tokenize:a}},copyState:function(e){return{htmlState:r.copyState(t,e.htmlState),rubyState:r.copyState(n,e.rubyState),indented:e.indented,previousToken:e.previousToken,tokenize:e.tokenize}},token:function(e,t){if(e.sol()&&(t.indented=e.indentation(),t.startOfLine=!0),e.eatSpace())return null;var n=t.tokenize(e,t);if(t.startOfLine=!1,n&&"commentLine"!=n&&(t.previousToken={style:n,indented:t.indented}),e.eol()&&t.tokenize==o){e.backUp(1);var r=e.peek();e.next(),r&&","!=r&&(t.tokenize=a)}return"hamlTag"==n?n="tag":"commentLine"==n?n="comment":"hamlAttribute"==n?n="attribute":"closeAttributeTag"==n&&(n=null),n}}}),"htmlmixed","ruby"),r.defineMIME("text/x-haml","haml");var o=i,a=Object.freeze(Object.assign(Object.create(null),i,{[Symbol.toStringTag]:"Module",default:o}));export{a as h};
