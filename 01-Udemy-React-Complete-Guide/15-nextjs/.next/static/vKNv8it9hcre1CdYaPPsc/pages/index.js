(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{216:function(e,t,n){__NEXT_REGISTER_PAGE("/",function(){return e.exports=n(217),{page:e.exports.default}})},217:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),u=n(46),i=n.n(u),a=n(73),c=n.n(a);function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function l(e,t){return!t||"object"!==f(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function s(e){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e,t){return(y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var b=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),l(this,s(t).apply(this,arguments))}var n,o,u;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&y(e,t)}(t,r.a.Component),n=t,u=[{key:"getInitialProps",value:function(e){return console.log(e),new Promise(function(e,t){setTimeout(function(){e({appName:"Super App"})},2e3)})}}],(o=[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"The main page of ",this.props.appName),r.a.createElement("p",null,"Go to ",r.a.createElement(i.a,{href:"/auth/user"},r.a.createElement("a",null,"Auth/User"))),r.a.createElement("button",{onClick:function(){c.a.push("/auth/user")}},"Go to Auth/User"))}}])&&p(n.prototype,o),u&&p(n,u),t}();t.default=b}},[[216,1,0]]]);