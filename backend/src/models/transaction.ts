/**
 * Class representing a transaction.
 */
export class Transaction {
  private _traderId: number;
  private _oldBalance: number;
  private _newBalance: number;
  private _date: string;

  /**
   * Gets the transaction date.
   * @returns The transaction date as a string.
   */
  public getDate(): string {
    return this._date;
  }

  /**
   * Sets the transaction date to the current date.
   */
  public setDate(): void {
    let dateObj = new Date();
    this._date = dateObj.toDateString();
  }

  /**
   * Gets the trader ID associated with the transaction.
   * @returns The trader ID.
   */
  public get traderId(): number {
    return this._traderId;
  }

  /**
   * Sets the trader ID associated with the transaction.
   * @param value - The trader ID to set.
   */
  public set traderId(value: number) {
    this._traderId = value;
  }

  /**
   * Gets the old balance before the transaction.
   * @returns The old balance.
   */
  public get oldBalance(): number {
    return this._oldBalance;
  }

  /**
   * Sets the old balance before the transaction.
   * @param value - The old balance to set.
   */
  public set oldBalance(value: number) {
    this._oldBalance = value;
  }

  /**
   * Gets the new balance after the transaction.
   * @returns The new balance.
   */
  public get newBalance(): number {
    return this._newBalance;
  }

  /**
   * Sets the new balance after the transaction.
   * @param value - The new balance to set.
   */
  public set newBalance(value: number) {
    this._newBalance = value;
  }
}
