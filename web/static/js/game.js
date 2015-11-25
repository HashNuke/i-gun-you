import World from "./game/world"
import Player from "./game/player"

class Game {
  constructor() {
    console.log("game started");
  }


  start() {
    this.player = new Player("/images/joker.png", 1);
    this.world = new World(this);
  }
}

export default Game;
