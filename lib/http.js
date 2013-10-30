var eventy = require('eventy');
var ObjectXHR = require('object-xhr');
var supportProto = Object.getPrototypeOf({__proto__: null}) === null;

module.exports = Http;

function Http() {
  var option = {
    url: null,
    data: null,
    async: true,
    method: 'GET',
    header: {}
  }

  var http = function () {
    ObjectXHR.call(this);

    return this;
  }.call(eventy(this));

  function onReadyStateChange(XMLHttpRequestProgressEvent) {
    if (http.readyState === 4) {
      http.trigger('complete', http.responseText, http);
      http.trigger(http.status, http.responseText, http);

      var status = Math.floor(http.status);

      if (status === 1) http.trigger('Information');
      if (status === 2) http.trigger('Success').trigger('success');
      if (status === 3) http.trigger('Redirection');
      if (status === 4) http.trigger('Client Error').trigger('fail');
      if (status === 5) http.trigger('Server Error').trigger('fail');
      if (http.status === 100) http.trigger('Continue');
      if (http.status === 101) http.trigger('Switching Protocols');
      if (http.status === 102) http.trigger('Processing');
      if (http.status === 200) http.trigger('Ok');
      if (http.status === 201) http.trigger('Created');
      if (http.status === 202) http.trigger('Accepted');
      if (http.status === 204) http.trigger('No Content');
      if (http.status === 205) http.trigger('Reset Content');
      if (http.status === 206) http.trigger('Partial Content');
      if (http.status === 208) http.trigger('Already Reported');
      if (http.status === 226) http.trigger('IM Used');
      if (http.status === 300) http.trigger('Multiple Choices');
      if (http.status === 301) http.trigger('Moved Permanently');
      if (http.status === 302) http.trigger('Found');
      if (http.status === 303) http.trigger('See Other');
      if (http.status === 304) http.trigger('Not Modified');
      if (http.status === 403) http.trigger('Forbidden');
      if (http.status === 404) http.trigger('Not Found');
      if (http.status === 500) http.trigger('Internal Server Error');
    }
  }

  http.makeRequest = function () {
    this.onreadystatechange = onReadyStateChange;
    this.open(option.method, option.url, option.async);

    for (var key in option.header) {
      this.setRequestHeader(key, option.header[key]);
    }

    this.send(option.data);
    return this;
  }

  /*
    @arguments Boolean yes
  */
  http.async = function (yes) {
    option.async = yes;
    return this;
  }

  http.url = function (address) {
    option.url = address;
    return this;
  }

  http.header = function (name, value) {
    option.header[name] = value;
    return this;
  }

  /*
    @arguments Mix value
  */
  http.data = function (value) {
    if (typeof value !== 'string') value = JSON.stringify(value);
    option.data = value;
    return this;
  }

  http.method = function (name) {
    option.method = name;
    return this;
  }

  http.success = function (callback) {
    this.on('success', callback);
    return this;
  }

  http.fail = function (callback) {
    this.on('fail', callback);
    return this;
  }

  http.complete = function (callback) {
    this.on('complete', callback);
    return this;
  }

  /**
   * @param [String address]
   * @param [Function callback]
   */
  http.request = function () {
    var address, callback;

    if (arguments.length === 1) {
      if (typeof arguments[0] === 'string') address = arguments[0];
      else callback = arguments[0];
    }

    if (arguments.length === 2) {
      address = arguments[0];
      callback = arguments[1];
    }

    if (address) this.url(address);
    if (callback) this.on('complete', callback);

    return this.makeRequest();
  }
}

if (supportProto) {
  Http.prototype.__proto__ = ObjectXHR.prototype;
} else {
  Http.prototype = Object.create(ObjectXHR.prototype);
}

/*
  @arguments String address, [Function callback]
*/
Http.prototype.GET = function (address, callback) {
  return this.method('GET').url(address).request(callback);
}

/**
 * Alias of GET
 */
Http.prototype.get = Http.prototype.GET;

/*
  @arguments String address, Mix data, [Function callback]
*/
Http.prototype.POST = function (address, data, callback) {
  return this.method('POST').url(address).data(data).request(callback);
}

/**
 * Alias of POST
 */
Http.prototype.post = Http.prototype.POST;

Http.prototype.PUSH = function (address, data, callback) {
  return this.method('PUSH').url(address).data(data).request(callback);
}

/**
 * Alias of PUSH
 */
Http.prototype.push = Http.prototype.PUSH;

Http.prototype.PATCH = function (address, callback) {
  return this.method('PATCH').url(address).request(callback);
}

/**
 * Alias of PATCH
 */
Http.prototype.patch = Http.prototype.PATCH;

Http.prototype.DELETE = function (address, callback) {
  return this.method('DELETE').url(address).request(callback);
}

/**
 * Alias of DELETE
 */
Http.prototype.delete = Http.prototype.DELETE;

Http.prototype.OPTIONS = function (address, callback) {
  return this.method('OPTIONS').url(address).request(callback);
}

/**
 * Alias of OPTIONS
 */
Http.prototype.options = Http.prototype.OPTIONS;

Http.prototype.HEAD = function (address, callback) {
  return this.method('HEAD').url(address).request(callback);
}

/**
 * Alias of HEAD
 */
Http.prototype.head = Http.prototype.HEAD;

Http.prototype.TRACE = function (address, callback) {
  return this.method('TRACE').url(address).request(callback);
}

/**
 * Alias of TRACE
 */
Http.prototype.trace = Http.prototype.TRACE;
