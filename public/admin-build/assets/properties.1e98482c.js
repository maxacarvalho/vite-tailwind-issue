import{aS as e}from"./vendor.6668b54f.js";var t,i={};(t=e.exports).defineMode("properties",(function(){return{token:function(e,t){var i=e.sol()||t.afterSection,n=e.eol();if(t.afterSection=!1,i&&(t.nextMultiline?(t.inMultiline=!0,t.nextMultiline=!1):t.position="def"),n&&!t.nextMultiline&&(t.inMultiline=!1,t.position="def"),i)for(;e.eatSpace(););var o=e.next();return!i||"#"!==o&&"!"!==o&&";"!==o?i&&"["===o?(t.afterSection=!0,e.skipTo("]"),e.eat("]"),"header"):"="===o||":"===o?(t.position="quote",null):("\\"===o&&"quote"===t.position&&e.eol()&&(t.nextMultiline=!0),t.position):(t.position="comment",e.skipToEnd(),"comment")},startState:function(){return{position:"def",nextMultiline:!1,inMultiline:!1,afterSection:!1}}}})),t.defineMIME("text/x-properties","properties"),t.defineMIME("text/x-ini","properties");var n=i,o=Object.freeze(Object.assign(Object.create(null),i,{[Symbol.toStringTag]:"Module",default:n}));export{o as p};
