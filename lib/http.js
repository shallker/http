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
  }.call(eventy(Object.create(xhr)));

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
      http.trigger('complete');
      http.trigger(http.status);
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
    @arguments String address, [Mix data], [Function callback]
  */
  http.post = function (address) {
    var data, callback;

    if (arguments.length === 2) {
      if (typeof arguments[1] === 'Function') callback = arguments[1];
      else data = arguments[1];
    }

    if (arguments.length === 3) {
      data = arguments[1];
      callback = arguments[2];
    }

    this.method('POST');
    if (data) this.data(data);
    return this.request(address, callback);
  }

  /*
    @arguments String address, [Function callback]
  */
  http.get = function (address, callback) {
    this.method('GET');
    return this.request(address, callback);
  }

  /*
    @arguments [String address], [Function callback]
  */
  http.request = function () {
    var address, callback;

    if (arguments.length === 1) {
      if (typeof arguments[0] === 'String') address = arguments[0];
      else callback = arguments[0];
    }

    if (arguments.length === 2) {
      address = arguments[0];
      callback = arguments[1];
    }

    if (address) this.url(address);
    if (callback) this.on('complete', callback);

    return makeRequest();
  }

  return http;
}
