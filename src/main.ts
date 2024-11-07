import { Deck } from "./services/deck";
import { Player } from "./services/player";
import { Game } from "./services/game";
import { askQuestion } from "./common/askQuestion";
import { nameValidator, numberValidator } from "./common/validators";

async function main() {
  const name = await askQuestion("Введите имя: ", nameValidator);
  const balance = +(await askQuestion("Введите баланс: ", numberValidator));
  const player = new Player(balance, name);
  const decks = new Deck(6);

  const game = new Game(decks, player);

  do {
    await game.startGame();
  } while (true);
}

main();
