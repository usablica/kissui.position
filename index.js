/**
 * Track your elements on the page like a boss.
 *
 * MIT licensed. By Afshin Mehrabani <afshin.meh@gmail.com>
 *
 * This project is a part of Kissui framework.
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return (root.kissuiPosition = factory());
    });
  } else {
    root.kissuiPosition = factory(root);
  }
}(this, function () {

  /**
  * To store all available elements with their options
  */
  var _elements = [];

    /**
  * EventListener
  */
  var _events = [];

  /**
  * options
  */
  var _options = {
    //trigger the events on module init?
    //e.g. when an element is already in the viewport and there is a data-kui-position = "in"
    triggerOnInit: true,
    attribute: 'data-kui-position',
    // to use console.log instead of throw Error
    safeMode: false
  };

  /**
  * all possible events
  */
  _options.events = [
    //element is in the viewport
    'in',
    //element is out of viewport
    'out',
    //element is in the viewport and it's in the middle of the page
    'in middle',
    //element is in the viewport and it's in the very top of the page
    'in top',
    //element is in the viewport and it's in the very bottom of the page
    'in bottom',
    //element is in the viewport and it's in the left side of the page
    'in left',
    //element is in the viewport and it's in the right side of the page
    'in right'
  ];

  /**
  * Developer friendly console.log / throw Error
  *
  */
  function _debug (msg) {
    msg = 'Kissui.position: ' + msg;

    if (_options.safeMode == true) {
      console.log(msg);
    } else {
      throw Error(msg);
    }
  };

  /**
  * Find elements or import them via options (later)
  */
  function _populate () {
    var elements = document.querySelectorAll('*[data-kui-position]');

    for (var i = 0;i < elements.length;i++) {
      var element = elements[i];
      var event = element.getAttribute(_options.attribute);

      if (_options.events.indexOf(event) >= 0) {
        _elements.push({
          element: element,
          event: event
        });
      } else {
        _debug('Unknown value for data-kui-position attribute.');
      }

    }
  };

  /**
  * Check a single element position and return the correct event name
  *
  */
  function _position (element) {

  };

  /**
  * Checks a list of elements and emits the correct event name
  *
  */
  function _positions (elements) {

  };

  /**
  * listen to an event
  */
  function _on (event, listener) {
    if (typeof _events[event] !== 'object') {
      _events[event] = [];
    }

    _events[event].push(listener);
  };

  /**
  * Emits an event
  */
  function _emit (event) {
    var i, listeners, length, args = [].slice.call(arguments, 1);

    if (typeof _events[event] === 'object') {
      listeners = _events[event].slice();
      length = listeners.length;

      for (i = 0; i < length; i++) {
        listeners[i].apply(this, args);
      }
    }
  };

  /**
  * Removes a listener
  */
  _removeListener = function (event, listener) {
    var idx;

    if (typeof _events[event] === 'object') {
      idx = _events[event].indexOf(listener);

      if (idx > -1) {
        _events[event].splice(idx, 1);
      }
    }
  };

  /**
  * Listen to an event once
  */
  function _once (event, listener) {
    _on(event, function fn () {
      _removeListener(event, fn);
      listener.apply(this, arguments);
    });
  };

  /**
  * Start the module
  */
  function _init () {
    _populate.call();
  };

  // init the module
  _init();

  return {
    _options: _options,
    _elements: _elements,
    on: _on,
    once: _once,
    removeListener: _removeListener
  };
}));
