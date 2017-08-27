(function(win, $) {
  'use strict';

  // Builder
  function Circle() {
    this.item = $('<div class="circle" style="background: red;"></div>');
  }

  Circle.prototype.get = function() {
    return this.item;
  };

  Circle.prototype.color = function(color) {
    $(this.item).css('background', color);
  };

  Circle.prototype.move = function(left, top) {
    this.item.css('left', left);
    this.item.css('top', top);
  };

  function RedCircleBuilder() {
    this.item = new Circle();
    this.init();
  }

  RedCircleBuilder.prototype.init = function() {
    // nothing
  };

  RedCircleBuilder.prototype.get = function() {
    return this.item;
  };

  function BlueCircleBuilder() {
    this.item = new Circle();
    this.init();
  }

  BlueCircleBuilder.prototype.init= function() {
    this.item.color('blue');
  };

  BlueCircleBuilder.prototype.get = function() {
    return this.item;
  };

  // Abstract Factory
  var CircleFactory = function() {
    this.types = {};
    this.create = function(type) {
      return new this.types[type]().get();
    };

    this.register = function(type, cls) {
      if (cls.prototype.init && cls.prototype.get) {
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

      _circleFactory.register('red', RedCircleBuilder);
      _circleFactory.register('blue', BlueCircleBuilder);

      function _position(circle, left, top) {
        circle.css('left', left);
        circle.css('top', top);
      }

      function create(left, top, type) {
        var circle = _circleFactory.create(type).get();
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
