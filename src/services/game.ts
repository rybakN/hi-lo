import { CardType } from "../types/card.type";
import { Deck } from "./deck";
import { Player } from "./player";
import { askQuestion } from "../common/askQuestion";
import { betValidator } from "../common/validators";
import { timeoutPromise } from "../common/timeoutPromise";
import { parseBet } from "../common/parseBet";
import { ParseBetType } from "../types/parseBet.type";
import { colorText } from "../common/colorText";
import { ColorEnum } from "../types/color.enum";
import { Repository } from "../common/repository";
import { GameEntity } from "../types/game.entity";
import { GameInterface } from "../interfaces/game.interface";

export class Game implements GameInterface {
  private currentCard: CardType;
  private nextCard: CardType;
  private currentBet: number = 0;
  private readonly deck: Deck;
  private readonly player: Player;
  private readonly repository: Repository<GameEntity>;

  constructor(deck: Deck, player: Player) {
    this.deck = deck;
    this.player = player;
    this.currentCard = this.deck.getRandomCard();
    this.nextCard = this.currentCard;
    this.repository = new Repository<GameEntity>();
  }

  public async startGame() {
    console.log(`Текущая карта: ${this.currentCard.cardName}`);

    const betResult = await this.getBet();
    if (!betResult) {
      this.currentCard = this.nextCard;
      return;
    }

    const parseBetResult = parseBet(betResult);
    const betAmount = this.player.makeBet(parseBetResult);

    if (!betAmount) {
      this.handleInsufficientFunds(betResult);
      this.currentCard = this.nextCard;
      return;
    }

    this.currentBet = parseBetResult.sum;
    console.log(colorText(`Ставка принята: ${betResult} \n`, ColorEnum.yellow));

    this.getNextCard();

    const timer = timeoutPromise(1000);
    await timer.timer;

    const isWin = this.shouldPayOut(parseBetResult);
    this.processOutcome(isWin);
    this.currentCard = this.nextCard;
  }

  private async getBet(): Promise<string | null> {
    const bet = askQuestion(`Сделайте ставку: `, betValidator);
    const timer = timeoutPromise(5000);

    const result = await Promise.race([bet, timer.timer]);

    if (!result) {
      console.log(colorText(`\nСтавки нет\n`, ColorEnum.yellow));
      this.getNextCard();
      this.saveGameState(null, false);
      return null;
    }

    clearTimeout(timer.timeoutId);
    return result;
  }

  private handleInsufficientFunds(betResult: string) {
    console.log(colorText("Недостаточно средств\n", ColorEnum.red));
    this.getNextCard();

    this.saveGameState(betResult, false);
  }

  private saveGameState(bet: string | null, isWin: boolean) {
    this.repository.save({
      bet,
      createAt: Date.now(),
      currentCard: this.currentCard,
      nextCard: this.nextCard,
      isWin,
    });
  }

  private getNextCard() {
    let newCard;
    do {
      newCard = this.deck.getRandomCard();
    } while (newCard.rankIndex === this.currentCard.rankIndex);

    this.nextCard = newCard;
    console.log(`Крупье достает следующую карту: ${this.nextCard.cardName}\n`);
  }

  private shouldPayOut(bet: ParseBetType): boolean {
    const actualComparison =
      this.nextCard.rankIndex > this.currentCard.rankIndex ? ">" : "<";

    return actualComparison === bet.prediction;
  }

  private processOutcome(isWin: boolean) {
    if (isWin) {
      const winAmount = this.currentBet * 1.7;
      this.player.takeMoney(winAmount);
      console.log(
        colorText(`Ваш выигрыш составил: ${winAmount}\n`, ColorEnum.green),
      );
      this.saveGameState(null, true);
    } else {
      console.log(colorText("Вы проиграли\n", ColorEnum.red));
      this.saveGameState(null, false);
    }
  }
}
