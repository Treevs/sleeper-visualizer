(this["webpackJsonpsleeper-visualizer"]=this["webpackJsonpsleeper-visualizer"]||[]).push([[0],{26:function(e,t,n){},28:function(e,t,n){},49:function(e,t,n){"use strict";n.r(t);var r=n(2),a=n.n(r),s=n(20),c=n.n(s),o=(n(26),n(21)),i=n(6),u=n(3),l=n.n(u),f=n(7),p=n(8),d=(n(28),n(0));var b=function(e){return Object(d.jsxs)("div",{className:"row",children:[Object(d.jsxs)("div",{className:"team",children:[Object(d.jsx)("span",{className:"team-name",children:e.user.teamName})," ",Object(d.jsxs)("span",{className:"user-name",children:["@",e.user.userName]})]}),Object(d.jsxs)("div",{className:"points",children:[" ",e.user.points.toFixed(2)," points"]})]})},j=n(30);var v=function(){var e="846861408397283328",t=Object(r.useState)([]),n=Object(p.a)(t,2),a=n[0],s=n[1],c=Object(r.useState)([]),u=Object(p.a)(c,2),v=u[0],h=u[1],O=Object(r.useState)("after"),m=Object(p.a)(O,2),x=m[0],k=m[1],g=Object(r.useState)(0),w=Object(p.a)(g,2),y=w[0],N=w[1],S=Object(r.useRef)(null),P=function(e){k(e.target.dataset.operation)},F=function(){var e=Object(f.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=x,e.next="after"===e.t0?3:"before"===e.t0?5:7;break;case 3:return E(),e.abrupt("break",9);case 5:return z(),e.abrupt("break",9);case 7:console.log("Unknown operation, defaulting to 'after'"),E();case 9:B();case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),C=function(){var e=Object(f.a)(l.a.mark((function e(t){var n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.get("https://api.sleeper.app/v1/league/".concat(t,"/users"));case 2:return n=e.sent,console.log("users",n.data),e.next=6,j.get("https://api.sleeper.app/v1/league/".concat(t,"/rosters"));case 6:return r=e.sent,e.abrupt("return",{users:n.data,rosters:r.data});case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),I=function(){var e=Object(f.a)(l.a.mark((function e(t){var n,r,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=[],r=1;case 2:if(!(r<=18)){e.next=10;break}return e.next=5,j.get("https://api.sleeper.app/v1/league/".concat(t,"/matchups/").concat(r));case 5:a=e.sent,n.push(a.data);case 7:r++,e.next=2;break;case 10:return e.abrupt("return",n);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),_=function(e){var t,n=e.users,r=e.rosters,a=e.matchups,s=[],c=Object(i.a)(n);try{var o=function(){var e,n=t.value,a=n.user_id,c=r.find((function(e){return e.owner_id===a})).roster_id,o={userId:a,userName:null===n||void 0===n?void 0:n.display_name,teamName:null===n||void 0===n||null===(e=n.metadata)||void 0===e?void 0:e.team_name,weeklyPointsScored:[],rosterId:c};s[c-1]=o};for(c.s();!(t=c.n()).done;)o()}catch(d){c.e(d)}finally{c.f()}var u,l=Object(i.a)(a);try{for(l.s();!(u=l.n()).done;)for(var f=u.value,p=0;p<s.length;p++)s[p].weeklyPointsScored.push(f[p].points)}catch(d){l.e(d)}finally{l.f()}return s},E=function(){var e,t=a,n=Object(i.a)(t);try{for(n.s();!(e=n.n()).done;)for(var r=e.value,s=0,c=r.weeklyPointsScored,o=y;o<17;o++)s+=c[o],r.points=s}catch(u){n.e(u)}finally{n.f()}},z=function(){var e,t=a,n=Object(i.a)(t);try{for(n.s();!(e=n.n()).done;){var r=e.value,s=0;r.points=0;for(var c=r.weeklyPointsScored,o=0;o<y;o++)s+=c[o],r.points=s}}catch(u){n.e(u)}finally{n.f()}},B=function(){var e=Object(o.a)(a);e.sort((function(e,t){return parseFloat(t.points)-parseFloat(e.points)})),h(e)},J=function(){var t=Object(f.a)(l.a.mark((function t(){var n,r,a,c;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,C(e);case 2:return n=t.sent,r=n.users,a=n.rosters,t.next=7,I(e);case 7:return c=t.sent,t.next=10,s(_({users:r,rosters:a,matchups:c}));case 10:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(r.useEffect)((function(){J()}),[]),Object(r.useEffect)((function(){var e;null===(e=S.current)||void 0===e||e.focus(),F()}),[a,y,x]),Object(d.jsx)("div",{className:"App",children:Object(d.jsxs)("div",{className:"content",children:[Object(d.jsxs)("div",{className:"form-group",children:[Object(d.jsxs)("div",{className:"left",children:["after"===x&&Object(d.jsx)("span",{children:"Points scored after week"}),"before"===x&&Object(d.jsx)("span",{children:"Points scored before (and including) week"}),Object(d.jsx)("input",{type:"text",ref:S,value:y,onChange:function(e){var t=parseInt(e.target.value);(""===t||isNaN(t))&&(t=0),t>18&&(t%=10),t<0&&(t=0),N(t)}})]}),Object(d.jsxs)("div",{className:"right",children:["after"===x&&Object(d.jsx)("span",{className:"fake-link","data-operation":"before",onClick:P,children:"Switch to before"}),"before"===x&&Object(d.jsx)("span",{className:"fake-link","data-operation":"after",onClick:P,children:"Switch to after"})]})]}),v.map((function(e){return Object(d.jsx)(b,{user:e,week:y},e.userId)}))]})})},h=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,50)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,s=t.getLCP,c=t.getTTFB;n(e),r(e),a(e),s(e),c(e)}))};c.a.render(Object(d.jsx)(a.a.StrictMode,{children:Object(d.jsx)(v,{})}),document.getElementById("root")),h()}},[[49,1,2]]]);
//# sourceMappingURL=main.947b9e60.chunk.js.map