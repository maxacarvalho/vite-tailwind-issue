import{aS as t,aU as e}from"./vendor.6668b54f.js";import{a as n}from"./javascript.97e798f0.js";var r={};!function(t){function e(t,e,n,r){this.state=t,this.mode=e,this.depth=n,this.prev=r}function n(r){return new e(t.copyState(r.mode,r.state),r.mode,r.depth,r.prev&&n(r.prev))}t.defineMode("jsx",(function(r,a){var s=t.getMode(r,{name:"xml",allowMissing:!0,multilineTagIndentPastTag:!1,allowMissingTagName:!0}),o=t.getMode(r,a&&a.base||"javascript");function i(t){var e=t.tagName;t.tagName=null;var n=s.indent(t,"","");return t.tagName=e,n}function c(t,e){return e.context.mode==s?p(t,e,e.context):u(t,e,e.context)}function p(n,a,p){if(2==p.depth)return n.match(/^.*?\*\//)?p.depth=1:n.skipToEnd(),"comment";if("{"==n.peek()){s.skipAttribute(p.state);var u=i(p.state),d=p.state.context;if(d&&n.match(/^[^>]*>\s*$/,!1)){for(;d.prev&&!d.startOfLine;)d=d.prev;d.startOfLine?u-=r.indentUnit:p.prev.state.lexical&&(u=p.prev.state.lexical.indented)}else 1==p.depth&&(u+=r.indentUnit);return a.context=new e(t.startState(o,u),o,0,a.context),null}if(1==p.depth){if("<"==n.peek())return s.skipAttribute(p.state),a.context=new e(t.startState(s,i(p.state)),s,0,a.context),null;if(n.match("//"))return n.skipToEnd(),"comment";if(n.match("/*"))return p.depth=2,c(n,a)}var x,f=s.token(n,p.state),l=n.current();return/\btag\b/.test(f)?/>$/.test(l)?p.state.context?p.depth=0:a.context=a.context.prev:/^</.test(l)&&(p.depth=1):!f&&(x=l.indexOf("{"))>-1&&n.backUp(l.length-x),f}function u(n,r,a){if("<"==n.peek()&&o.expressionAllowed(n,a.state))return r.context=new e(t.startState(s,o.indent(a.state,"","")),s,0,r.context),o.skipExpression(a.state),null;var i=o.token(n,a.state);if(!i&&null!=a.depth){var c=n.current();"{"==c?a.depth++:"}"==c&&0==--a.depth&&(r.context=r.context.prev)}return i}return{startState:function(){return{context:new e(t.startState(o),o)}},copyState:function(t){return{context:n(t.context)}},token:c,indent:function(t,e,n){return t.context.mode.indent(t.context.state,e,n)},innerMode:function(t){return t.context}}}),"xml","javascript"),t.defineMIME("text/jsx","jsx"),t.defineMIME("text/typescript-jsx",{name:"jsx",base:{name:"javascript",typescript:!0}})}(t.exports,e.exports,n.exports);var a=r,s=Object.freeze(Object.assign(Object.create(null),r,{[Symbol.toStringTag]:"Module",default:a}));export{s as j};
