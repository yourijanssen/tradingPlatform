import { Fund } from "./fund";
import { Transaction } from "./transaction";

/**
 * Abstract class representing a trader.
 */
export abstract class Trader {
  protected fund: Fund;
  protected traderId: number;

  /**
   * Performs a transaction for the trader.
   * @param amount - The amount of the transaction.
   * @returns A transaction object.
   */
  abstract transaction(amount: number): Transaction;

  /**
   * Gets the current balance of the trader.
   * @returns The current balance.
   */
  abstract getBalance(): number;

  /**
   * Sets the trader's ID.
   * @param traderId - The trader's ID to set.
   */
  public setTraderId(traderId: number): void {
    this.traderId = traderId;
  }

  /**
   * Gets the trader's ID.
   * @returns The trader's ID.
   */
  public getTraderId(): number {
    return this.traderId;
  }

  /**
   * Gets the fund associated with the trader.
   * @returns The fund.
   */
  public getFund(): Fund {
    return this.fund;
  }
}

/**
 * Class representing a day trader.
 */
export class DayTrader extends Trader {
  /**
   * Creates a day trader with the specified fund.
   * @param fund - The fund to associate with the trader.
   */
  public constructor(fund: Fund) {
    super();
    this.fund = fund;
  }

  /**
   * Performs a transaction for the day trader.
   * @param amount - The amount of the transaction.
   * @returns A transaction object.
   */
  public transaction(amount: number): Transaction {
    let transaction: Transaction = null;

    if (amount >= 2000 && amount <= 200000) {
      transaction = this.fund.doTransaction(amount);
    }

    if (amount >= -2000 && amount <= -1000) {
      transaction = this.fund.doTransaction(amount);
    }

    if (transaction == null) {
      transaction = new Transaction();
    }
    transaction.traderId = this.traderId;
    return transaction;
  }

  /**
   * Gets the current balance of the day trader.
   * @returns The current balance.
   */
  public getBalance(): number {
    return this.fund.getBalance();
  }
}

/**
 * Class representing a stock trader.
 */
export class StockTrader extends Trader {
  /**
   * Creates a stock trader with the specified fund.
   * @param fund - The fund to associate with the trader.
   */
  public constructor(fund: Fund) {
    super();
    this.fund = fund;
  }

  /**
   * Performs a transaction for the stock trader.
   * @param amount - The amount of the transaction.
   * @returns A transaction object.
   */
  public transaction(amount: number): Transaction {
    let transaction: Transaction = null;

    if (amount >= 500 && amount <= 2000) {
      transaction = this.fund.doTransaction(amount);
    }

    if (amount >= -2000 && amount <= -500) {
      transaction = this.fund.doTransaction(amount);
    }

    if (transaction == null) {
      transaction = new Transaction();
    }
    transaction.traderId = this.traderId;

    return transaction;
  }

  /**
   * Gets the current balance of the stock trader.
   * @returns The current balance.
   */
  public getBalance(): number {
    return this.fund.getBalance();
  }
}

/**
 * Class representing an investor.
 */
export class Investor extends Trader {
  /**
   * Creates an investor with the specified fund.
   * @param fund - The fund to associate with the investor.
   */
  public constructor(fund: Fund) {
    super();
    this.fund = fund;
  }

  /**
   * Performs a transaction for the investor.
   * @param amount - The amount of the transaction.
   * @returns A transaction object.
   */
  public transaction(amount: number): Transaction {
    let transaction: Transaction = null;

    if (amount >= 50000) {
      transaction = this.fund.doTransaction(amount);
    }

    if (amount < 0 && -1 * amount < this.fund.getBalance() * 0.5) {
      transaction = this.fund.doTransaction(amount);
    }
    if (transaction == null) {
      transaction = new Transaction();
    }
    transaction.traderId = this.traderId;
    return transaction;
  }

  /**
   * Gets the current balance of the investor.
   * @returns The current balance.
   */
  public getBalance(): number {
    return this.fund.getBalance();
  }
}
