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
    'in',
    'out',
    'middle',
    'top',
    'bottom',
    'left',
    'right'
  ];

  /**
  * Developer friendly console.log / throw Error
  *
  */
  function _error (msg) {
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
    //clear old elements first
    _elements = [];

    var elements = document.querySelectorAll('*[data-kui-position]');

    for (var i = 0;i < elements.length;i++) {
      var element = elements[i];
      var event = element.getAttribute(_options.attribute);

      _elements.push({
        element: element,
        event: event
      });
    }
  };

  /**
  * To bind an event to browser
  *
  */
  function _addEventListener (event, fn) {
    if (window.addEventListener) { // modern browsers including IE9+
      window.addEventListener(event, fn, false);
    } else if (window.attachEvent) { // IE8 and below
      window.attachEvent('on' + event, fn);
    }
  };

  /**
  * Check a single element position and return the correct event name
  *
  */
  function _position (element, event) {
    //because we can have compound events
    var elementEvents = event.split(' ');

    //a boolean flag to check if we should trigger the event
    var trigger = true;

    //element's position
    var top = element.getBoundingClientRect().top;
    var bottom = element.getBoundingClientRect().bottom;
    var left = element.getBoundingClientRect().left;
    var right = element.getBoundingClientRect().right;

    //browser's width and height
    var height = window.innerHeight || document.documentElement.clientHeight;
    var width = window.innerWidth || document.documentElement.clienWidth;

    // check `in` event
    if (elementEvents.indexOf('in') > -1) {
     if (top >= 0 && left >= 0 && bottom <= height && right <= width) {
       trigger = trigger && true;
     } else {
       trigger = false;
     }
    }

    // check `top` event
    if (elementEvents.indexOf('top') > -1) {
     if (top == 0) {
       trigger = trigger && true;
     } else {
       trigger = false;
     }
    }

    // check `left` event
    if (elementEvents.indexOf('left') > -1) {
     if (left == 0) {
       trigger = trigger && true;
     } else {
       trigger = false;
     }
    }

    // check `right` event
    if (elementEvents.indexOf('right') > -1) {
     if (right == width) {
       trigger = trigger && true;
     } else {
       trigger = false;
     }
    }

    // check `bottom` event
    if (elementEvents.indexOf('bottom') > -1) {
     if (bottom == height) {
       trigger = trigger && true;
     } else {
       trigger = false;
     }
    }

    if (trigger) {
      if (element.getAttribute('id')) {
        _emit(element.getAttribute('id'), element);
      }
      _emit(event, element);
      _emit('*', element, event);
    }
  };

  /**
  * Checks a list of elements and emits the correct event name
  *
  */
  function _positions (elements) {
    for (var i = 0; i < elements.length; i++) {
      _position.call(this, elements[i].element, elements[i].event);
    };
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
    _populate.call(this);

    if (_options.triggerOnInit == true) {
      _positions.call(this, _elements);
    }

    //after scrolling
    _addEventListener('scroll', _positions.bind(this, _elements));

    //after resizing the browser
    _addEventListener('resize', _positions.bind(this, _elements));
  };

  return {
    _options: _options,
    _elements: _elements,
    on: _on,
    once: _once,
    removeListener: _removeListener,
    init: _init,
    positions: _positions
  };
}));
