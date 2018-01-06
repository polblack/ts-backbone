// A named JavaScript function.
function TpltWebpackPlugin() {

};

// Defines `apply` method in it's prototype.
TpltWebpackPlugin.prototype.apply = function(compiler) {
  // Specifies webpack's event hook to attach itself.
  compiler.plugin('webpacksEventHook', function(compilation /* Manipulates webpack internal instance specific data. */, callback) {
    console.log("This is an example plugin!!!");

    // Invokes webpack provided callback after functionality is complete.
    callback();
  });
};
