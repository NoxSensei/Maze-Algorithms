(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[757],{55043:function(e,t,r){Promise.resolve().then(r.bind(r,5071))},50551:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return s}});let n=r(99920);r(57437),r(2265);let o=n._(r(40148));function s(e,t){var r;let n={loading:e=>{let{error:t,isLoading:r,pastDelay:n}=e;return null}};"function"==typeof e&&(n.loader=e);let s={...n,...t};return(0,o.default)({...s,modules:null==(r=s.loadableGenerated)?void 0:r.modules})}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},10912:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"BailoutToCSR",{enumerable:!0,get:function(){return o}});let n=r(55592);function o(e){let{reason:t,children:r}=e;if("undefined"==typeof window)throw new n.BailoutToCSRError(t);return r}},40148:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return l}});let n=r(57437),o=r(2265),s=r(10912),u=r(61481);function a(e){return{default:e&&"default"in e?e.default:e}}let i={loader:()=>Promise.resolve(a(()=>null)),loading:null,ssr:!0},l=function(e){let t={...i,...e},r=(0,o.lazy)(()=>t.loader().then(a)),l=t.loading;function d(e){let a=l?(0,n.jsx)(l,{isLoading:!0,pastDelay:!0,error:null}):null,i=t.ssr?(0,n.jsxs)(n.Fragment,{children:["undefined"==typeof window?(0,n.jsx)(u.PreloadCss,{moduleIds:t.modules}):null,(0,n.jsx)(r,{...e})]}):(0,n.jsx)(s.BailoutToCSR,{reason:"next/dynamic",children:(0,n.jsx)(r,{...e})});return(0,n.jsx)(o.Suspense,{fallback:a,children:i})}return d.displayName="LoadableComponent",d}},61481:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"PreloadCss",{enumerable:!0,get:function(){return s}});let n=r(57437),o=r(58512);function s(e){let{moduleIds:t}=e;if("undefined"!=typeof window)return null;let r=(0,o.getExpectedRequestStore)("next/dynamic css"),s=[];if(r.reactLoadableManifest&&t){let e=r.reactLoadableManifest;for(let r of t){if(!e[r])continue;let t=e[r].files.filter(e=>e.endsWith(".css"));s.push(...t)}}return 0===s.length?null:(0,n.jsx)(n.Fragment,{children:s.map(e=>(0,n.jsx)("link",{precedence:"dynamic",rel:"stylesheet",href:r.assetPrefix+"/_next/"+encodeURI(e),as:"style"},e))})}},20920:function(e,t,r){"use strict";r.d(t,{Z:function(){return i}});for(var n,o={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)},s=new Uint8Array(16),u=[],a=0;a<256;++a)u.push((a+256).toString(16).slice(1));var i=function(e,t,r){if(o.randomUUID&&!t&&!e)return o.randomUUID();var a=(e=e||{}).random||(e.rng||function(){if(!n&&!(n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)))throw Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return n(s)})();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,t){r=r||0;for(var i=0;i<16;++i)t[r+i]=a[i];return t}return function(e,t=0){return(u[e[t+0]]+u[e[t+1]]+u[e[t+2]]+u[e[t+3]]+"-"+u[e[t+4]]+u[e[t+5]]+"-"+u[e[t+6]]+u[e[t+7]]+"-"+u[e[t+8]]+u[e[t+9]]+"-"+u[e[t+10]]+u[e[t+11]]+u[e[t+12]]+u[e[t+13]]+u[e[t+14]]+u[e[t+15]]).toLowerCase()}(a)}},35569:function(e,t,r){"use strict";var n,o;r.d(t,{N:function(){return n}}),(o=n||(n={})).North="N",o.East="E",o.South="S",o.West="W"},97277:function(e,t,r){"use strict";r.d(t,{J:function(){return n}});class n{static randomInt(e,t){return Math.floor(Math.random()*(t+1-e)+e)}static isRandomChanceMet(e){return Math.random()<=e}static shuffleArray(e){return Array.from(e).map(e=>({value:e,sort:Math.random()})).sort((e,t)=>e.sort-t.sort).map(e=>{let{value:t}=e;return t})}static getRandomElementFromArray(e){return this.shuffleArray(e).at(0)}static popRandomElementFromSet(e){if(!e.size)return;let t=this.getRandomElementFromArray([...e.values()]);return e.delete(t),t}static async sleep(e){await new Promise(t=>setTimeout(t,e))}static wrapWithDebounce(e,t){let r;return function(){for(var n=arguments.length,o=Array(n),s=0;s<n;s++)o[s]=arguments[s];clearTimeout(r),r=setTimeout(()=>e(...o),t)}}}},86637:function(e,t,r){"use strict";r.d(t,{S:function(){return o}});var n=r(50551);let o=r.n(n)()(()=>Promise.all([r.e(3676),r.e(9399),r.e(4735)]).then(r.bind(r,24735)),{loadableGenerated:{webpack:()=>[24735]},ssr:!1})},38299:function(e,t,r){"use strict";r.d(t,{e:function(){return a}});var n=r(35569);class o{constructor(e,t){this.rowIndex=e,this.columnIndex=t,this.isWallOnNorth=!0,this.isWallOnEast=!0,this.isWallOnSouth=!0,this.isWallOnWest=!0}}class s{constructor(e,t){this.rowsCount=e,this.columnsCount=t;let r=Array.from(Array(e),()=>Array(t).fill(void 0));for(let n=0;n<e;n++)for(let e=0;e<t;e++)r[n][e]=new o(n,e);this.grid=r,this.history=[]}}class u{add(e){let t=structuredClone(e);return this.nodesHistorySet.add(t),this}toArray(){return Array.from(this.nodesHistorySet)}constructor(){this.nodesHistorySet=new Set}}class a{buildPath(e,t){let r=new s(e,t),n=new u;return this.removeWalls(r,n),r.history=n.toArray(),r}constructor(){this.directions=Object.values(n.N)}}},5071:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return l}});var n=r(57437),o=r(38299),s=r(97277),u=r(20920);class a extends o.e{removeWalls(e,t){let r=e.grid,n=new Map;for(let[e,o]of r.entries()){let s=new Map,u=e===o.length-1;for(let[e,r]of(this.assignGroupIdForEachNodeInRow(o,n),o.entries()))t.add(r),this.buildEasternPassages(n,r,e,o,u),this.addNodeToTheCurrentRowNodesGroup(s,r);u||this.buildSouthernPassages(s,r,t,n)}}buildEasternPassages(e,t,r,n,o){if(r===n.length-1)return;let u=n[r+1];u.groupId!==t.groupId&&(o||s.J.isRandomChanceMet(.5))&&(t.isWallOnEast=!1,u.isWallOnWest=!1,this.assignNodesToTheSameGroup(e,u,t))}addNodeToTheCurrentRowNodesGroup(e,t){if(!t.groupId)throw Error("Node is missing the group id");if(!e.has(t.groupId)){e.set(t.groupId,{nodes:[t]});return}e.get(t.groupId).nodes.push(t)}buildSouthernPassages(e,t,r,n){for(let[o,u]of e){let e=s.J.randomInt(1,u.nodes.length);s.J.shuffleArray(u.nodes).slice(0,e).forEach(e=>{let o=t[e.rowIndex+1][e.columnIndex];e.isWallOnSouth=!1,o.isWallOnNorth=!1,r.add(o),this.assignNodesToTheSameGroup(n,o,e)})}}assignGroupIdForEachNodeInRow(e,t){for(let r of e)r.groupId||(r.groupId=(0,u.Z)(),t.set(r.groupId,{nodes:[r]}))}assignNodesToTheSameGroup(e,t,r){if(!r.groupId)throw Error("Second node is missing the group id");let n=e.get(r.groupId);if(!n)throw Error("Second node is not a part of any group");if(t.groupId){let o=e.get(t.groupId);o&&(e.delete(t.groupId),o.nodes.forEach(e=>e.groupId=r.groupId),n.nodes.push(...o.nodes))}else t.groupId=r.groupId,n.nodes.push(t)}}var i=r(86637);function l(){return(0,n.jsx)(i.S,{mazeAlgorithm:new a})}}},function(e){e.O(0,[2971,7023,1744],function(){return e(e.s=55043)}),_N_E=e.O()}]);