import { Repository } from "../common/repository";
import { PlayerBetEntity } from "../types/playerBet.entity";
import { ParseBetType } from "../types/parseBet.type";
import { PlayerInterface } from "../interfaces/player.interface";

export class Player implements PlayerInterface {
  public balance: number;
  public readonly name: string;
  private readonly repository: Repository<PlayerBetEntity>;

  constructor(balance: number, name: string = "Игрок") {
    this.balance = balance;
    this.name = name;
    this.repository = new Repository<PlayerBetEntity>();
  }

  public makeBet(bet: ParseBetType): number | null {
    this.saveBet(bet);
    if (this.canWithdrawAmount(bet.sum)) {
      return null;
    }

    this.balance -= bet.sum;
    return bet.sum;
  }

  public takeMoney(sum: number) {
    this.balance += sum;
  }

  private canWithdrawAmount(sum: number): boolean {
    return this.balance < sum ? true : false;
  }

  private saveBet(bet: ParseBetType) {
    this.repository.save({
      createAt: Date.now(),
      name: this.name,
      sum: bet.sum,
      prediction: bet.prediction,
    });
  }
}
