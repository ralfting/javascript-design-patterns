(function(win, $) {
  'use strict';

  var RedCircle = function() {
    this.item = $('<div class="circle -red"></div>');
  };
  var BlueCircle = function() {
    this.item = $('<div class="circle -blue"></div>');
  };

  // Factory
  var CircleFactory = function() {
    this.create = function(color) {
      if (color === "red") {
        return new RedCircle();
      } else {
        return new BlueCircle();
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

      function _position(circle, left, top) {
        circle.css('left', left);
        circle.css('top', top);
      }

      function create(left, top, color) {
        var circle = _circleFactory.create(color).item;
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
