import { Transaction } from "./transaction";

/**
 * Class representing a fund.
 */
export class Fund {
  private balance: number = 0;
  private fundId: number;

  /**
   * Sets the fund's ID.
   * @param fundId - The fund's ID to set.
   */
  public setFundId(fundId: number): void {
    this.fundId = fundId;
  }

  /**
   * Gets the fund's ID.
   * @returns The fund's ID.
   */
  public getFundId(): number {
    return this.fundId;
  }

  /**
   * Performs a transaction and updates the balance.
   * @param amount - The amount of the transaction.
   * @returns A transaction object containing old and new balances.
   */
  public doTransaction(amount: number): Transaction {
    let transaction: Transaction = new Transaction();
    transaction.oldBalance = this.balance;
    this.balance += amount;
    transaction.newBalance = this.balance;
    return transaction;
  }

  /**
   * Gets the current balance of the fund.
   * @returns The current balance.
   */
  public getBalance(): number {
    return this.balance;
  }
}
