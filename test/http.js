var er = function (m) {throw new Error(m)},
    ok = function (x) {if (!x) throw new Error(x + ' is not ok'); return 1;},
    eq = function (x, y) {if (x !== y) er(x + ' not equal ' + y); return 1;},
    mc = function(ox, oy) {for (var i in ox) {if (!eq(ox[i], oy[i])) er(ox[i] + ' not match ' + oy[i])}}
    s = function (x) {eq(Object.prototype.toString.call(x), '[object String]')},
    f = function (x) {eq(Object.prototype.toString.call(x), '[object Function]')},
    a = function (x) {eq(Object.prototype.toString.call(x), '[object Array]')},
    b = function (x) {eq(Object.prototype.toString.call(x), '[object Boolean]')},
    o = function (x) {eq(Object.prototype.toString.call(x), '[object Object]')},
    log = function () {console.log.apply(console, arguments)};


/*
http
  .url('')
  .header(name, value)
  .data()
  .method()
  .on('complete')
  .on('201')
  .on(404)
  .off()
  .success(callback)
  .fail(callback)
  .complete(callback)
  .POST([url], callback)
  .GET([url], callback)
  .request(callback)
*/

var HTTP = require('http')
var http = new HTTP

f(http.url)
f(http.header)
f(http.data)
f(http.method)
f(http.on)
f(http.off)
f(http.success)
f(http.fail)
f(http.complete)
f(http.POST)
f(http.GET)
f(http.request)

ok(http.on('complete', function () {log('complete')}))

ok(http.on(200, function () {log(200)}))
ok(http.on('Ok', function () {log('Ok')}))

ok(http.on(304, function () {log(304)}))
ok(http.on('Not Modified', function () {log('Not Modified')}))

ok(http.GET('http://lc:3000/test/http.js', function () {log('done')}))
