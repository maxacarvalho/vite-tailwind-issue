var e=Object.defineProperty,t=Object.defineProperties,a=Object.getOwnPropertyDescriptors,o=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,s=(t,a,o)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[a]=o,i=(e,t)=>{for(var a in t||(t={}))n.call(t,a)&&s(e,a,t[a]);if(o)for(var a of o(t))l.call(t,a)&&s(e,a,t[a]);return e},r=(e,o)=>t(e,a(o));import{e as c,u as d,v as u,q as v,p,f,r as m,E as g,F as b,o as y,g as _,w as k,G as h,i as O,I as w,ac as I,h as L,S,J as P,D as $,j as A,t as B,l as x,aO as C,Q as U,ae as j,B as V,a6 as N,K as E,O as q,aq as F,as as D,P as M,z as T,C as Q,L as R,M as G}from"./vendor.6668b54f.js";import{u as H,g as W,a as z,b as J,c as K,_ as X,d as Y}from"./main.d54f2605.js";const Z=c({setup(){d();return{customLogoPath:u((()=>null)),showLoader:v(!1),stopSpinnerIfQueueIsEmpty:function(){},url:u((()=>null)),urlTooltip:u((()=>!1))}}});p("data-v-63306530");const ee=["src"];f(),Z.render=function(e,t,a,o,n,l){const s=m("v-progress-linear"),i=g("tooltip");return b((y(),_($(e.url?"a":"div"),{ref:"noopener noreferer",href:e.url,target:"_blank",class:P(["module-bar-logo",{loading:e.showLoader}])},{default:k((()=>[e.customLogoPath?(y(),h(S,{key:0},[O(I,{name:"fade"},{default:k((()=>[e.showLoader?(y(),_(s,{key:0,indeterminate:"",rounded:"",onAnimationiteration:e.stopSpinnerIfQueueIsEmpty},null,8,["onAnimationiteration"])):w("",!0)])),_:1}),L("img",{class:"custom-logo",src:e.customLogoPath,alt:"Project Logo"},null,8,ee)],64)):(y(),h("div",{key:1,class:P(["logo",{running:e.showLoader}]),onAnimationiteration:t[0]||(t[0]=(...t)=>e.stopSpinnerIfQueueIsEmpty&&e.stopSpinnerIfQueueIsEmpty(...t))},null,34))])),_:1},8,["href","class"])),[[i,e.urlTooltip,void 0,{right:!0}]])},Z.__scopeId="data-v-63306530";const te=c({setup(){const{t:e}=d(),t=H(),a=v(!1),o=u((()=>null===t.currentUser||null===t.currentUser.avatar||void 0===t.currentUser.avatar?null:`assets/${t.currentUser.avatar.id}?key=system-medium-cover`)),n=u((()=>{var e;return`/users/${null==(e=t.currentUser)?void 0:e.id}`})),l=u((()=>"/logout"));return{t:e,userFullName:t.fullName,avatarURL:o,userProfileLink:n,signOutActive:a,signOutLink:l}}});p("data-v-361d874f");const ae=["src","alt"];f(),te.render=function(e,t,a,o,n,l){const s=m("v-icon"),i=m("v-button"),r=m("v-card-title"),c=m("v-card-actions"),d=m("v-card"),u=m("v-dialog"),v=m("v-avatar"),p=m("router-link"),f=m("v-hover"),w=g("tooltip");return y(),_(f,{class:"module-bar-avatar"},{default:k((({hover:a})=>[O(u,{modelValue:e.signOutActive,"onUpdate:modelValue":t[1]||(t[1]=t=>e.signOutActive=t),onEsc:t[2]||(t[2]=t=>e.signOutActive=!1)},{activator:k((({on:t})=>[b(O(i,{onClick:t,tile:"",icon:"","x-large":"",class:P([{show:a},"sign-out"])},{default:k((()=>[O(s,{name:"logout"})])),_:2},1032,["onClick","class"]),[[w,e.t("sign_out"),void 0,{right:!0}]])])),default:k((()=>[O(d,null,{default:k((()=>[O(r,null,{default:k((()=>[A(B(e.t("sign_out_confirm")),1)])),_:1}),O(c,null,{default:k((()=>[O(i,{secondary:"",onClick:t[0]||(t[0]=t=>e.signOutActive=!e.signOutActive)},{default:k((()=>[A(B(e.t("cancel")),1)])),_:1}),O(i,{to:e.signOutLink},{default:k((()=>[A(B(e.t("sign_out")),1)])),_:1},8,["to"])])),_:1})])),_:1})])),_:2},1032,["modelValue"]),O(p,{to:e.userProfileLink},{default:k((()=>[b(O(v,{tile:"",large:"",class:P({"no-avatar":!e.avatarURL})},{default:k((()=>[e.avatarURL?(y(),h("img",{key:0,src:e.avatarURL,alt:e.userFullName,class:"avatar-image"},null,8,ae)):(y(),_(s,{key:1,name:"account_circle",outline:""}))])),_:1},8,["class"]),[[w,e.userFullName,void 0,{right:!0}]])])),_:1},8,["to"])])),_:1})},te.__scopeId="data-v-361d874f";const oe=c({components:{ModuleBarLogo:Z,ModuleBarAvatar:te},setup(){const e=H(),{modules:t}=W();return{internalModules:u((()=>{var a;const o=null==(a=e.currentUser)?void 0:a.role.module_list,n=x.exports.orderBy(t.value.map((e=>r(i({},e),{href:e.link||null,to:void 0===e.link?`/${e.id}`:null}))).filter((e=>void 0===e.hidden||!0!==C(e.hidden))),["order"],["asc"]);return o&&Array.isArray(o)&&o.length>0?[...o.map((e=>{var t,a;return(null==(t=e.link)?void 0:t.startsWith("http"))||(null==(a=e.link)?void 0:a.startsWith("//"))?r(i({},e),{href:e.link}):r(i({},e),{to:e.link})})),...n.filter((e=>!0===e.persistent))]:n})),modules:t}}});p("data-v-7c59d982");const ne={class:"module-bar"},le={class:"modules"};f(),oe.render=function(e,t,a,o,n,l){const s=m("module-bar-logo"),i=m("v-icon"),r=m("v-button"),c=m("module-bar-avatar"),d=g("tooltip");return y(),h("div",ne,[O(s),L("div",le,[(y(!0),h(S,null,U(e.internalModules,(e=>b((y(),_(r,{key:e.id,icon:"","x-large":"",to:e.to,href:e.href,tile:"",style:j(e.color?{"--v-button-color-active":e.color}:null)},{default:k((()=>[O(i,{name:e.icon,outline:""},null,8,["name"])])),_:2},1032,["to","href","style"])),[[d,e.name,void 0,{right:!0}]]))),128))]),O(c)])},oe.__scopeId="data-v-7c59d982";const se=c({props:{sidebarOpen:{type:Boolean,default:!1}},setup(e){const t=v([]),a=v(!1);return V((()=>e.sidebarOpen),(async e=>{!1===e?t.value=[]:(a.value=!0,await N(),a.value=!1)})),{openDetail:t,mandatory:a}}});se.render=function(e,t,a,o,n,l){const s=m("v-item-group");return y(),_(s,{modelValue:e.openDetail,"onUpdate:modelValue":t[0]||(t[0]=t=>e.openDetail=t),class:"sidebar-detail-group",scope:"sidebar-detail",mandatory:e.mandatory},{default:k((()=>[E(e.$slots,"default",{},void 0,!0)])),_:3},8,["modelValue","mandatory"])},se.__scopeId="data-v-3e159e5c";const ie=c({setup(){const{t:e}=d(),t=v(!0),a=v("20ms"),o=u((()=>!0===t.value?`${e("connection_excellent")}\n(${a.value} ${e("latency")})`:`${e("connection_poor")}\n(${a.value} ${e("latency")})`));return{icon:u((()=>!0===t.value?"signal_wifi_4_bar":"signal_wifi_no_internet")),latencyTooltip:o}}});p("data-v-626d0b9b");const re={class:"latency-indicator"};f(),ie.render=function(e,t,a,o,n,l){const s=m("v-icon"),i=g("tooltip");return b((y(),h("div",re,[O(s,{name:e.icon},null,8,["name"])],512)),[[i,e.latencyTooltip,void 0,{bottom:!0,end:!0}]])},ie.__scopeId="data-v-626d0b9b";const ce=c({components:{LatencyIndicator:ie},setup(){const e=z();return{name:u((()=>{var t,a;return null==(a=null==(t=e.info)?void 0:t.project)?void 0:a.project_name}))}}});p("data-v-407c71d5");const de={class:"project-info"},ue={class:"name"};f(),ce.render=function(e,t,a,o,n,l){const s=m("latency-indicator");return y(),h("div",de,[O(s),L("span",ue,B(e.name),1)])},ce.__scopeId="data-v-407c71d5";const ve=c({props:{id:{type:String,required:!0},title:{type:String,required:!0},text:{type:String,default:null},icon:{type:String,default:null},type:{type:String,default:"info",validator:e=>["info","success","warning","error"].includes(e)},tail:{type:Boolean,default:!1},dense:{type:Boolean,default:!1},showClose:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},progress:{type:Number,default:void 0}},setup(e){const t=J();return{close:function(){!0===e.showClose&&t.remove(e.id)}}}});p("data-v-8b71fbb6");const pe={key:0,class:"icon"},fe={class:"content"},me={class:"title selectable"},ge={key:0,class:"text selectable"};f(),ve.render=function(e,t,a,o,n,l){const s=m("v-progress-circular"),i=m("v-icon");return y(),h("div",{class:P(["notification-item",[e.type,{tail:e.tail,dense:e.dense}]]),onClick:t[0]||(t[0]=(...t)=>e.close&&e.close(...t))},[e.loading||e.progress||e.icon?(y(),h("div",pe,[e.loading?(y(),_(s,{key:0,indeterminate:"",small:""})):e.progress?(y(),_(s,{key:1,small:"",value:e.progress},null,8,["value"])):(y(),_(i,{key:2,name:e.icon},null,8,["name"]))])):w("",!0),L("div",fe,[L("p",me,B(e.title),1),e.text?(y(),h("p",ge,B(e.text),1)):w("",!0)]),e.showClose?(y(),_(i,{key:1,name:"close",clickable:"",class:"close",onClick:e.close},null,8,["onClick"])):w("",!0)],2)},ve.__scopeId="data-v-8b71fbb6";const be=c({components:{NotificationItem:ve},props:{dense:{type:Boolean,default:!1}},setup(){const e=J();return{queue:q(e).queue}}});be.render=function(e,t,a,o,n,l){const s=m("notification-item");return y(),_(D,{class:"notifications-group",name:"slide-fade",tag:"div"},{default:k((()=>[E(e.$slots,"default",{},void 0,!0),(y(!0),h(S,null,U(e.queue,((t,a)=>(y(),_(s,F({key:t.id},t,{tail:a===e.queue.length-1,dense:e.dense,"show-close":!0===t.persist&&!1!==t.closeable}),null,16,["tail","dense","show-close"])))),128))])),_:3})},be.__scopeId="data-v-1491e39b";const ye=c({props:{to:{type:String,default:null},icon:{type:String,default:"box"},active:{type:Boolean,default:!1}},emits:["click"],setup(){const e=K(),{sidebarOpen:t}=q(e);return{sidebarOpen:t}}});p("data-v-ea2a7524");const _e={class:"icon"},ke={key:0,class:"title"};f(),ye.render=function(e,t,a,o,n,l){const s=m("v-icon");return y(),_($(e.to?"router-link":"button"),{class:P(["sidebar-button",{active:e.active}]),onClick:t[0]||(t[0]=t=>e.$emit("click",t))},{default:k((()=>[L("div",_e,[O(s,{name:e.icon,outline:""},null,8,["name"])]),e.sidebarOpen?(y(),h("div",ke,[E(e.$slots,"default",{},void 0,!0)])):w("",!0)])),_:3},8,["class"])},ye.__scopeId="data-v-ea2a7524";const he=c({components:{SidebarButton:ye,NotificationItem:ve},props:{sidebarOpen:{type:Boolean,default:!1},modelValue:{type:Boolean,default:!1}},emits:["update:modelValue"],setup(){const{t:e}=d();return{t:e,lastFour:J().lastFour}}});p("data-v-1a418006");const Oe={class:"notifications-preview"},we={key:0,class:"inline"},Ie={class:"padding-box"};f(),he.render=function(e,t,a,o,n,l){const s=m("router-link"),i=m("notification-item"),r=m("transition-expand"),c=m("sidebar-button"),d=g("tooltip");return y(),h("div",Oe,[O(r,{tag:"div"},{default:k((()=>[e.modelValue?(y(),h("div",we,[L("div",Ie,[O(s,{class:P(["link",{"has-items":e.lastFour.length>0}]),to:"/activity"},{default:k((()=>[A(B(e.t("show_all_activity")),1)])),_:1},8,["class"]),O(D,{tag:"div",name:"notification",class:"transition"},{default:k((()=>[(y(!0),h(S,null,U(e.lastFour,(e=>(y(),_(i,F({key:e.id},e),null,16)))),128))])),_:1})])])):w("",!0)])),_:1}),b(O(c,{active:e.modelValue,class:"toggle",icon:"notifications",onClick:t[0]||(t[0]=t=>e.$emit("update:modelValue",!e.modelValue))},{default:k((()=>[A(B(e.t("notifications")),1)])),_:1},8,["active"]),[[d,e.t("notifications"),void 0,{left:!0}]])])},he.__scopeId="data-v-1a418006";const Le=c({setup(){const{t:e}=d(),t=J();return{t:e,notifications:u((()=>t.dialogs)),done:function(e){t.remove(e)}}}});p("data-v-5aff133b");const Se={class:"notification-dialogs"};f(),Le.render=function(e,t,a,o,n,l){const s=m("v-card-title"),i=m("v-error"),r=m("v-card-text"),c=m("v-button"),d=m("v-card-actions"),u=m("v-card"),v=m("v-dialog");return y(),h("div",Se,[(y(!0),h(S,null,U(e.notifications,(t=>(y(),_(v,{key:t.id,"model-value":!0,persist:""},{default:k((()=>[O(u,{class:P([t.type])},{default:k((()=>[O(s,null,{default:k((()=>[A(B(t.title),1)])),_:2},1024),t.text?(y(),_(r,{key:0},{default:k((()=>[A(B(t.text)+" ",1),t.error?(y(),_(i,{key:0,error:t.error},null,8,["error"])):w("",!0)])),_:2},1024)):w("",!0),O(d,null,{default:k((()=>[O(c,{onClick:a=>e.done(t.id)},{default:k((()=>[A(B(e.t("dismiss")),1)])),_:2},1032,["onClick"])])),_:2},1024)])),_:2},1032,["class"])])),_:2},1024)))),128))])},Le.__scopeId="data-v-5aff133b";const Pe=c({components:{ModuleBar:oe,NotificationsGroup:be,NotificationsPreview:he,NotificationDialogs:Le,ProjectInfo:ce,HeaderBar:X,SidebarDetailGroup:se},props:{title:{type:String,default:null},smallHeader:{type:Boolean,default:!1}},setup(e){const{t:t}=d(),a=M(),{title:o}=q(e),n=v(!1),l=v(),s=H(),i=K(),r=u((()=>{var e,t;return!s.currentUser||((null==(t=null==(e=s.currentUser)?void 0:e.role)?void 0:t.app_access)||!1)})),c=v(!1),{sidebarOpen:p}=q(i),f=u((()=>{var e;return(null==(e=s.currentUser)?void 0:e.theme)||"auto"}));return T("main-element",l),a.afterEach((async()=>{var e;null==(e=l.value)||e.scrollTo({top:0})})),Y(o),{t:t,theme:f,navOpen:n,appAccess:r,sidebarOpen:p,openSidebar:function(e){e.target&&!1===e.target.classList.contains("close")&&(p.value=!0)},notificationsPreviewActive:c}}});p("data-v-b51ed99c");const $e={class:"module-nav alt-colors"},Ae={class:"module-nav-content"},Be={class:"content",ref:"contentEl"},xe={class:"flex-container"},Ce=L("div",{class:"spacer"},null,-1);f(),Pe.render=function(e,t,a,o,n,l){const s=m("v-button"),i=m("v-info"),r=m("module-bar"),c=m("project-info"),d=m("header-bar"),u=m("sidebar-detail-group"),v=m("notifications-preview"),p=m("v-overlay"),f=m("notifications-group"),g=m("notification-dialogs");return!1===e.appAccess?(y(),_(i,{key:0,center:"",title:e.t("no_app_access"),type:"danger",icon:"block"},{append:k((()=>[O(s,{to:"/logout"},{default:k((()=>[A(B(e.t("switch_user")),1)])),_:1})])),default:k((()=>[A(B(e.t("no_app_access_copy"))+" ",1)])),_:1},8,["title"])):(y(),h("div",{key:1,class:P(["private-view",{theme:e.theme}])},[L("aside",{role:"navigation","aria-label":"Navigation",class:P(["navigation",{"is-open":e.navOpen}])},[O(r),L("div",$e,[O(c),L("div",Ae,[E(e.$slots,"navigation",{},void 0,!0)])])],2),L("div",Be,[O(d,{small:e.smallHeader,"show-sidebar-toggle":"",title:e.title,"onToggle:sidebar":t[0]||(t[0]=t=>e.sidebarOpen=!e.sidebarOpen),onPrimary:t[1]||(t[1]=t=>e.navOpen=!e.navOpen)},Q({_:2},[U(e.$slots,((t,a)=>({name:a,fn:k((t=>[E(e.$slots,a,R(G(t)),void 0,!0)]))})))]),1032,["small","title"]),L("main",null,[E(e.$slots,"default",{},void 0,!0)])],512),L("aside",{role:"contentinfo",class:P(["sidebar alt-colors",{"is-open":e.sidebarOpen}]),"aria-label":"Module Sidebar",onClick:t[3]||(t[3]=(...t)=>e.openSidebar&&e.openSidebar(...t))},[L("div",xe,[O(u,{"sidebar-open":e.sidebarOpen},{default:k((()=>[E(e.$slots,"sidebar",{},void 0,!0)])),_:3},8,["sidebar-open"]),Ce,O(v,{modelValue:e.notificationsPreviewActive,"onUpdate:modelValue":t[2]||(t[2]=t=>e.notificationsPreviewActive=t),"sidebar-open":e.sidebarOpen},null,8,["modelValue","sidebar-open"])])],2),O(p,{class:"nav-overlay",active:e.navOpen,onClick:t[4]||(t[4]=t=>e.navOpen=!1)},null,8,["active"]),!1===e.notificationsPreviewActive?(y(),_(f,{key:0,dense:!1===e.sidebarOpen},null,8,["dense"])):w("",!0),O(g)],2))},Pe.__scopeId="data-v-b51ed99c";var Ue=Pe;export{Ue as PrivateView,Ue as default};
