import{aS as O}from"./vendor.6668b54f.js";var T,e={};(T=O.exports).defineMode("pig",(function(O,T){var e=T.keywords,E=T.builtins,t=T.types,I=T.multiLineStrings,N=/[*+\-%<>=&?:\/!|]/;function A(O,T,e){return T.tokenize=e,e(O,T)}function r(O,T){for(var e,E=!1;e=O.next();){if("/"==e&&E){T.tokenize=R;break}E="*"==e}return"comment"}function S(O){return function(T,e){for(var E,t=!1,N=!1;null!=(E=T.next());){if(E==O&&!t){N=!0;break}t=!t&&"\\"==E}return(N||!t&&!I)&&(e.tokenize=R),"error"}}function R(O,T){var I=O.next();return'"'==I||"'"==I?A(O,T,S(I)):/[\[\]{}\(\),;\.]/.test(I)?null:/\d/.test(I)?(O.eatWhile(/[\w\.]/),"number"):"/"==I?O.eat("*")?A(O,T,r):(O.eatWhile(N),"operator"):"-"==I?O.eat("-")?(O.skipToEnd(),"comment"):(O.eatWhile(N),"operator"):N.test(I)?(O.eatWhile(N),"operator"):(O.eatWhile(/[\w\$_]/),e&&e.propertyIsEnumerable(O.current().toUpperCase())&&!O.eat(")")&&!O.eat(".")?"keyword":E&&E.propertyIsEnumerable(O.current().toUpperCase())?"variable-2":t&&t.propertyIsEnumerable(O.current().toUpperCase())?"variable-3":"variable")}return{startState:function(){return{tokenize:R,startOfLine:!0}},token:function(O,T){return O.eatSpace()?null:T.tokenize(O,T)}}})),function(){function O(O){for(var T={},e=O.split(" "),E=0;E<e.length;++E)T[e[E]]=!0;return T}var e="ABS ACOS ARITY ASIN ATAN AVG BAGSIZE BINSTORAGE BLOOM BUILDBLOOM CBRT CEIL CONCAT COR COS COSH COUNT COUNT_STAR COV CONSTANTSIZE CUBEDIMENSIONS DIFF DISTINCT DOUBLEABS DOUBLEAVG DOUBLEBASE DOUBLEMAX DOUBLEMIN DOUBLEROUND DOUBLESUM EXP FLOOR FLOATABS FLOATAVG FLOATMAX FLOATMIN FLOATROUND FLOATSUM GENERICINVOKER INDEXOF INTABS INTAVG INTMAX INTMIN INTSUM INVOKEFORDOUBLE INVOKEFORFLOAT INVOKEFORINT INVOKEFORLONG INVOKEFORSTRING INVOKER ISEMPTY JSONLOADER JSONMETADATA JSONSTORAGE LAST_INDEX_OF LCFIRST LOG LOG10 LOWER LONGABS LONGAVG LONGMAX LONGMIN LONGSUM MAX MIN MAPSIZE MONITOREDUDF NONDETERMINISTIC OUTPUTSCHEMA  PIGSTORAGE PIGSTREAMING RANDOM REGEX_EXTRACT REGEX_EXTRACT_ALL REPLACE ROUND SIN SINH SIZE SQRT STRSPLIT SUBSTRING SUM STRINGCONCAT STRINGMAX STRINGMIN STRINGSIZE TAN TANH TOBAG TOKENIZE TOMAP TOP TOTUPLE TRIM TEXTLOADER TUPLESIZE UCFIRST UPPER UTF8STORAGECONVERTER ",E="VOID IMPORT RETURNS DEFINE LOAD FILTER FOREACH ORDER CUBE DISTINCT COGROUP JOIN CROSS UNION SPLIT INTO IF OTHERWISE ALL AS BY USING INNER OUTER ONSCHEMA PARALLEL PARTITION GROUP AND OR NOT GENERATE FLATTEN ASC DESC IS STREAM THROUGH STORE MAPREDUCE SHIP CACHE INPUT OUTPUT STDERROR STDIN STDOUT LIMIT SAMPLE LEFT RIGHT FULL EQ GT LT GTE LTE NEQ MATCHES TRUE FALSE DUMP",t="BOOLEAN INT LONG FLOAT DOUBLE CHARARRAY BYTEARRAY BAG TUPLE MAP ";T.defineMIME("text/x-pig",{name:"pig",builtins:O(e),keywords:O(E),types:O(t)}),T.registerHelper("hintWords","pig",(e+t+E).split(" "))}();var E=e,t=Object.freeze(Object.assign(Object.create(null),e,{[Symbol.toStringTag]:"Module",default:E}));export{t as p};
