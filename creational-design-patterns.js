(function(win, $) {
  'use strict';

  function RedCircle() {}

  RedCircle.prototype.create = function() {
    this.item = $('<div class="circle -red"></div>');

    return this;
  };

  function BlueCircle() {}

  BlueCircle.prototype.create = function() {
    this.item = $('<div class="circle -blue"></div>');

    return this;
  };

  // Abstract Factory
  var CircleFactory = function() {
    this.types = {};
    this.create = function(type) {
      return new this.types[type]().create();
    };

    this.register = function(type, cls) {
      if (cls.prototype.create) {
        this.types[type] = cls;
      }
    };
  };

  // Singleton
  var CircleGeneratorSingleton = (function() {
    var instance;

    function init() {
      var _aCircle = [],
          _state = $('body'),
          _circleFactory = new CircleFactory();

      _circleFactory.register('red', RedCircle);
      _circleFactory.register('blue', BlueCircle);

      function _position(circle, left, top) {
        circle.css('left', left);
        circle.css('top', top);
      }

      function create(left, top, type) {
        var circle = _circleFactory.create(type).item;
        _position(circle, left, top);

        return circle;
      }

      function add(circle) {
        _state.append(circle);
        _aCircle.push(circle);
      }

      function index() {
        return _aCircle.length;
      }

      return {
        create: create,
        add: add,
        index: index
      };
    }

    return {
      getInstance: function() {
        if (instance === undefined) {
          instance = init();
        }

        return instance;
      }
    };
  }());

  $(win.document).ready(function(){
    // click
    $('body').click(function(e) {
      var cgInstance = CircleGeneratorSingleton.getInstance();
      var circle = cgInstance.create(e.pageX-25, e.pageY-25, "red");
      cgInstance.add(circle);
    });

    // keypress
    $(document).keypress(function(e) {
      if(e.key === 'a') {
        var cgInstance = CircleGeneratorSingleton.getInstance();
        var circle = cgInstance.create(Math.floor(Math.random() * e.target.clientWidth),
                                       Math.floor(Math.random() * e.target.clientHeight), "blue");
        cgInstance.add(circle);
      }
    });
  });
}(window, jQuery));

// // OLD
// $(window.document).ready(function(){
//   "use strict";
//
//   $('html').click(function(e) {
//    // Creation
//       var circle = $('<div class="cirle"></div>');
//
//       // position
//       circle.css('left', e.pageX-25);
//       circle.css('top', e.pageY-25);
//
//       $('html').append(circle);
//   });
// });
