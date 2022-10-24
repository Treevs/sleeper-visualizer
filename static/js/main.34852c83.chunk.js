(this["webpackJsonpsleeper-visualizer"]=this["webpackJsonpsleeper-visualizer"]||[]).push([[0],{26:function(e,t,n){},28:function(e,t,n){},49:function(e,t,n){"use strict";n.r(t);var r=n(1),s=n.n(r),a=n(20),c=n.n(a),i=(n(26),n(21)),o=n(6),u=n(4),l=n.n(u),j=n(8),d=n(3),b=(n(28),n(0));var f=function(e){return Object(b.jsxs)("div",{className:"row",children:[Object(b.jsxs)("div",{className:"team",children:[Object(b.jsx)("span",{className:"team-name",children:e.user.teamName})," ",Object(b.jsxs)("span",{className:"user-name",children:["@",e.user.userName]})]}),Object(b.jsxs)("div",{className:"points",children:[" ",e.user.points.toFixed(2)," points"]})]})};var p=function(e){var t=e.medians2021,n=e.medians2022;return Object(b.jsx)("div",{className:"median-container",children:Object(b.jsxs)("table",{children:[Object(b.jsx)("thead",{children:Object(b.jsxs)("tr",{children:[Object(b.jsx)("th",{children:"Week"}),Object(b.jsx)("th",{children:"Median 2021"}),Object(b.jsx)("th",{children:"Median 2022"}),Object(b.jsx)("th",{children:"Change"})]})}),Object(b.jsx)("tbody",{children:n.map((function(e,n){var r,s=(e-t[n]).toFixed(2);return r=0===e?Object(b.jsx)("td",{children:"N/A"}):s>0?Object(b.jsxs)("td",{className:"positive",children:["+",s]}):Object(b.jsx)("td",{className:"negative",children:s}),Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:n+1}),Object(b.jsx)("td",{children:t[n].toFixed(2)}),Object(b.jsx)("td",{children:e.toFixed(2)}),r]},n)}))})]})})};var h=function(e){return Object(b.jsxs)("div",{className:"treevors-container",children:[Object(b.jsx)("h1",{children:"Treevors"}),Object(b.jsxs)("table",{children:[Object(b.jsx)("thead",{children:Object(b.jsxs)("tr",{children:[Object(b.jsx)("th",{children:"Player"}),Object(b.jsx)("th",{children:"Week"}),Object(b.jsx)("th",{children:"Season"}),Object(b.jsx)("th",{children:"Points"})]})}),Object(b.jsx)("tbody",{children:e.treevors.map((function(e,t){return Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:e.playerName}),Object(b.jsx)("td",{children:e.week}),Object(b.jsx)("td",{children:e.year}),Object(b.jsx)("td",{children:e.points})]},t)}))})]})]})},O=n(30);var x=function(){var e="846861408397283328",t=Object(r.useState)([]),n=Object(d.a)(t,2),s=n[0],a=n[1],c=Object(r.useState)([]),u=Object(d.a)(c,2),x=u[0],v=u[1],m=Object(r.useState)([]),g=Object(d.a)(m,2),k=g[0],y=g[1],N=Object(r.useState)([]),w=Object(d.a)(N,2),S=w[0],F=w[1],P=Object(r.useState)([]),_=Object(d.a)(P,2),C=_[0],I=_[1],E=Object(r.useState)([]),M=Object(d.a)(E,2),B=M[0],T=M[1],z=Object(r.useState)([]),A=Object(d.a)(z,2),J=A[0],L=A[1],U=Object(r.useState)([]),W=Object(d.a)(U,2),D=W[0],R=W[1],q=Object(r.useState)([]),G=Object(d.a)(q,2),H=G[0],K=G[1],Q=Object(r.useState)("after"),V=Object(d.a)(Q,2),X=V[0],Y=V[1],Z=Object(r.useState)(0),$=Object(d.a)(Z,2),ee=$[0],te=$[1],ne=Object(r.useRef)(null),re=function(e){Y(e.target.dataset.operation)},se=function(){var e=Object(j.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=X,e.next="after"===e.t0?3:"before"===e.t0?5:7;break;case 3:return oe(),e.abrupt("break",9);case 5:return ue(),e.abrupt("break",9);case 7:console.log("Unknown operation, defaulting to 'after'"),oe();case 9:je();case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ae=function(){var e=Object(j.a)(l.a.mark((function e(t){var n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.get("https://api.sleeper.app/v1/league/".concat(t,"/users"));case 2:return n=e.sent,e.next=5,O.get("https://api.sleeper.app/v1/league/".concat(t,"/rosters"));case 5:return r=e.sent,e.abrupt("return",{users:n.data,rosters:r.data});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ce=function(){var e=Object(j.a)(l.a.mark((function e(t){var n,r,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=[],r=1;case 2:if(!(r<=18)){e.next=10;break}return e.next=5,O.get("https://api.sleeper.app/v1/league/".concat(t,"/matchups/").concat(r));case 5:s=e.sent,n.push(s.data);case 7:r++,e.next=2;break;case 10:return e.abrupt("return",n);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ie=function(e){var t,n=e.users,r=e.rosters,s=e.matchups,a=[],c=Object(o.a)(n);try{var i=function(){var e,n=t.value,s=n.user_id,c=r.find((function(e){return e.owner_id===s})).roster_id,i={userId:s,userName:null===n||void 0===n?void 0:n.display_name,teamName:null===n||void 0===n||null===(e=n.metadata)||void 0===e?void 0:e.team_name,weeklyPointsScored:[],rosterId:c};a[c-1]=i};for(c.s();!(t=c.n()).done;)i()}catch(b){c.e(b)}finally{c.f()}var u,l=Object(o.a)(s);try{for(l.s();!(u=l.n()).done;)for(var j=u.value,d=0;d<a.length;d++)a[d].weeklyPointsScored.push(j[d].points)}catch(b){l.e(b)}finally{l.f()}return a},oe=function(){var e,t=s,n=Object(o.a)(t);try{for(n.s();!(e=n.n()).done;)for(var r=e.value,a=0,c=r.weeklyPointsScored,i=ee;i<17;i++)a+=c[i],r.points=a}catch(u){n.e(u)}finally{n.f()}},ue=function(){var e,t=s,n=Object(o.a)(t);try{for(n.s();!(e=n.n()).done;){var r=e.value,a=0;r.points=0;for(var c=r.weeklyPointsScored,i=0;i<ee;i++)a+=c[i],r.points=a}}catch(u){n.e(u)}finally{n.f()}},le=function(e){var t,n=[],r=Object(o.a)(e);try{for(r.s();!(t=r.n()).done;){var s=t.value.sort((function(e,t){return e.points-t.points})),a=s.length/2,c=s.length/2-1,i=(s[a].points+s[c].points)/2;n.push(i)}}catch(u){r.e(u)}finally{r.f()}return n},je=function(){var e=Object(i.a)(s);e.sort((function(e,t){return parseFloat(t.points)-parseFloat(e.points)})),v(e)},de=function(){var t=Object(j.a)(l.a.mark((function t(){var n,r,s;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,ae(e);case 2:return n=t.sent,r=n.users,s=n.rosters,t.next=7,R(r);case 7:return t.next=9,K(s);case 9:return t.t0=I,t.next=12,ce("735219808769003520");case 12:return t.t1=t.sent,t.next=15,(0,t.t0)(t.t1);case 15:return t.t2=T,t.next=18,ce(e);case 18:return t.t3=t.sent,t.next=21,(0,t.t2)(t.t3);case 21:a(ie({users:r,rosters:s,matchups:B}));case 22:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(r.useEffect)((function(){de()}),[]),Object(r.useEffect)((function(){var e;null===(e=ne.current)||void 0===e||e.focus(),se()}),[s,ee,X]),Object(r.useEffect)((function(){D.length>0&&H.length>0&&B.length>0&&a(ie({users:D,rosters:H,matchups:B}))}),[B]),Object(r.useEffect)((function(){y(le(C)),F(le(B)),s.length>0&&function(){var e=C.concat(B);console.log("rosters",H),console.log("mappedUsers",s);var t=e.map((function(e,t){var n=Math.floor(2021+t/17),r=t%18+1,a=e.sort((function(e,t){return t.points-e.points}));return r<18&&0!==a[0].points&&a[0].matchup_id===a[1].matchup_id&&{playerName:s.find((function(e){return e.rosterId===a[1].roster_id})).userName,roster_id:a[1].roster_id,points:a[1].points,year:n,week:r,index:t}})).filter(Boolean);console.log("treevors",t),L(t)}()}),[s,C,B]),Object(b.jsx)("div",{className:"App",children:Object(b.jsxs)("div",{className:"content",children:[Object(b.jsxs)("div",{className:"points-scored-container",children:[Object(b.jsxs)("div",{className:"form-group",children:[Object(b.jsxs)("div",{className:"left",children:["after"===X&&Object(b.jsx)("span",{children:"Points scored after week"}),"before"===X&&Object(b.jsx)("span",{children:"Points scored before (and including) week"}),Object(b.jsx)("input",{type:"text",ref:ne,value:ee,onChange:function(e){var t=parseInt(e.target.value);(""===t||isNaN(t))&&(t=0),t>18&&(t%=10),t<0&&(t=0),te(t)}})]}),Object(b.jsxs)("div",{className:"right",children:["after"===X&&Object(b.jsx)("span",{className:"fake-link","data-operation":"before",onClick:re,children:"Switch to before"}),"before"===X&&Object(b.jsx)("span",{className:"fake-link","data-operation":"after",onClick:re,children:"Switch to after"})]})]}),x.map((function(e){return Object(b.jsx)(f,{user:e,week:ee},e.userId)}))]}),Object(b.jsx)(p,{medians2021:k,medians2022:S}),Object(b.jsx)(h,{treevors:J})]})})},v=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,50)).then((function(t){var n=t.getCLS,r=t.getFID,s=t.getFCP,a=t.getLCP,c=t.getTTFB;n(e),r(e),s(e),a(e),c(e)}))};c.a.render(Object(b.jsx)(s.a.StrictMode,{children:Object(b.jsx)(x,{})}),document.getElementById("root")),v()}},[[49,1,2]]]);
//# sourceMappingURL=main.34852c83.chunk.js.map