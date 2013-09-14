
# http

  Ultimate XHR request


## Installation

  Install with [component(1)](http://component.io):

    $ component install shallker/http


## API
```javascript
var HTTP = require('http');
var http = new HTTP;
```

#### http.url(String address)

#### http.header(String name, String value)

#### http.data(Mix value)

#### http.method(String name)

#### http.on(String event, Function callback)

#### http.off(String event, Function callback)

#### http.complete(Function callback)

#### http.success(Function callback)

#### http.fail(Function callback)

#### http.post([String address], [Function callback])

#### http.get([String address], [Function callback])

#### http.request([String address], [Function callback])


## Test
```javascript
f(http.url)
f(http.header)
f(http.data)
f(http.method)
f(http.on)
f(http.off)
f(http.complete)
f(http.success)
f(http.fail)
f(http.post)
f(http.get)
f(http.request)

ok(http.on('complete', function () { log('complete') }))
ok(http.on('success', function () { log('success') }))
ok(http.on('fail', function () { log('fail') }))

ok(http.on(200, function () { log(200) }))
ok(http.on('Ok', function () { log('Ok') }))

ok(http.on(304, function () { log(304) }))
ok(http.on('Not Modified', function () { log('Not Modified') }))

ok(http.get('http://lc:3000/test/http.js', function () { log('done') }))
```

## License

  MIT
