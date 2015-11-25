// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "deps/phoenix_html/web/static/js/phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"

import Game   from "./game"
import World  from "./game/world"
import Player from "./game/player"

window.onload = function() {

  // get player skin here
  var textureLoader = new THREE.TextureLoader();
  textureLoader.load("/images/steve.png", (texture)=> {
    var player = new Player(texture, 1);
    window.game = new Game(player);
    window.world = new World(game, {debug: true});
  });
};
