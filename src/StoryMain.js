// This code is injected into a Fractive story's output HTML file as the first
// sequence of JavaScript that will be executed.
// args.width, .height, .transparent, and .antialias will be set before
// this code is invoked.

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
phaser = new Phaser.Game(args.width, args.height, Phaser.AUTO, '__phaser',
{
  preload: checkAndCall('__preload'),
  create: function() {
    checkAndCall('__create')();
    // Start the story after the Phaser game is fully prepared
    Core.BeginStory();
  },
  update: checkAndCall('__update'),
  render: checkAndCall('__render')
}, args.transparent, args.antialias);
