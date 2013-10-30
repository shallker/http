var eventy = require('eventy');

module.exports = function Http() {
  var xhr = new XHR;
  var option = {
    url: null,
    data: null,
    async: true,
    method: 'GET',
    header: {}
  }

  var http = function () {
    return this;
  }.call(eventy(xhr));

  function XHR() {
    if (window.XMLHttpRequest) {
      return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      return new ActiveXObject("Microsoft.XMLHTTP")
    } else {
      throw new Error("Cannot creat a XHR instance");
    }
  }

  function makeRequest() {
    xhr.onreadystatechange = onReadyStateChange;
    xhr.open(option.method, option.url, option.async);

    for (var key in option.header) {
      xhr.setRequestHeader(key, option.header[key]);
    }

    xhr.send(option.data);
    return http;
  }

  function onReadyStateChange(xhr) {
    if (http.readyState === 4) {
      http.trigger('complete', http.responseText);
      http.trigger(http.status, http.responseText);
      if (http.status === 200) http.trigger('Ok').trigger('success');
      if (http.status === 201) http.trigger('Created').trigger('success');
      if (http.status === 202) http.trigger('Accepted').trigger('success');
      if (http.status === 204) http.trigger('No Content').trigger('success');
      if (http.status === 301) http.trigger('Moved Permanently');
      if (http.status === 302) http.trigger('Found');
      if (http.status === 303) http.trigger('See Other ');
      if (http.status === 304) http.trigger('Not Modified');
      if (http.status === 403) http.trigger('Forbidden').trigger('fail');
      if (http.status === 404) http.trigger('Not Found').trigger('fail');
      if (http.status === 500) http.trigger('Internal Server Error').trigger('fail');
    }
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

  /*
    @arguments String address, [Function callback]
  */
  http.GET = function (address, callback) {
    return this.method('GET').url(address).request(callback);
  }

  /**
   * Alias of GET
   */
  http.get = http.GET;

  /*
    @arguments String address, Mix data, [Function callback]
  */
  http.POST = function (address, data, callback) {
    return this.method('POST').url(address).data(data).request(callback);
  }

  /**
   * Alias of POST
   */
  http.post = http.POST;

  http.PUSH = function (address, data, callback) {
    return this.method('PUSH').url(address).data(data).request(callback);
  }

  /**
   * Alias of PUSH
   */
  http.push = http.PUSH;

  http.PATCH = function (address, callback) {
    return this.method('PATCH').url(address).request(callback);
  }

  /**
   * Alias of PATCH
   */
  http.patch = http.PATCH;

  http.DELETE = function (address, callback) {
    return this.method('DELETE').url(address).request(callback);
  }

  /**
   * Alias of DELETE
   */
  http.delete = http.DELETE;

  http.OPTIONS = function (address, callback) {
    return this.method('OPTIONS').url(address).request(callback);
  }

  /**
   * Alias of OPTIONS
   */
  http.options = http.OPTIONS;

  http.HEAD = function (address, callback) {
    return this.method('HEAD').url(address).request(callback);
  }

  /**
   * Alias of HEAD
   */
  http.head = http.HEAD;

  http.TRACE = function (address, callback) {
    return this.method('TRACE').url(address).request(callback);
  }

  /**
   * Alias of TRACE
   */
  http.trace = http.TRACE;

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

    makeRequest();
    return this;
  }

  return http;
}
