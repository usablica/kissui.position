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
  *
  *
  */

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
    _elements: _elements
  };
}));
