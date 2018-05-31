// This code is injected into a Fractive story's output HTML file as the first
// sequence of JavaScript that will be executed.
// args.width, .height, .transparent, and .antialias will be set before
// this code is invoked.

window.onload = function() {
  window.Phaser = require('phaser');

  // Helper creates a function that wraps another function in a null-check
  var undefinedFunctions = [];
  function checkAndCall(functionName) {
    return function() {
      if (window[functionName] !== undefined) {
        window[functionName]();
      } else if (undefinedFunctions.indexOf(functionName) == -1) {
        console.log("Function " + functionName + " is not defined. Skipping it.");
        undefinedFunctions.push(functionName);
      }
    };
  }

  // Create a Phaser game object.
  __phaserArgs.type = Phaser.AUTO;
  __phaserArgs.scene = {
    preload: checkAndCall('__preload'),
    create: function() {
      checkAndCall('__create')();
      // Start the story after the Phaser game is fully prepared
      Core.BeginStory();
    },
    update: checkAndCall('__update'),
    render: checkAndCall('__render')
  }

  // In Phaser 3, GameConfig.canvas needs to lead to a reference of an existing
  // canvas element, not the id of the div to store in, so we have to generate
  // a canvas element inside the template __phaser div and add it to __phaserArgs
  var canvas = document.createElement('canvas');
  canvas.id = "__phaserCanvas";

  var phaserDiv = document.getElementById("__phaser");
  phaserDiv.appendChild(canvas);
  __phaserArgs.canvas = canvas;

  window.phaser = new Phaser.Game(__phaserArgs);
};
